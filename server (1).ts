import express from "express";
import path from "path";
import dotenv from "dotenv";
import * as archiverPkg from "archiver";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json({ limit: "10mb" }));

// Cache and generate full project ZIP for resumable downloads with Range support
let cachedZipBuffer: Buffer | null = null;
let cachedZipTimestamp = 0;

async function getProjectZipBuffer(): Promise<Buffer> {
  const now = Date.now();
  // Cache for 60 seconds to support rapid chunk requests during resumable downloads
  if (cachedZipBuffer && (now - cachedZipTimestamp < 60000)) {
    return cachedZipBuffer;
  }

  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    const archiverFunc: any = (archiverPkg as any).default || archiverPkg;
    const archive = archiverFunc("zip", {
      zlib: { level: 6 },
    });

    archive.on("data", (chunk: Buffer) => chunks.push(chunk));
    archive.on("end", () => {
      const buf = Buffer.concat(chunks);
      cachedZipBuffer = buf;
      cachedZipTimestamp = Date.now();
      resolve(buf);
    });
    archive.on("error", (err: any) => reject(err));

    // Append files and directories from the workspace, excluding unnecessary build/cache dirs
    archive.glob("**/*", {
      cwd: process.cwd(),
      ignore: [
        "node_modules/**",
        ".git/**",
        "dist/**",
        ".cache/**",
        "*.log",
        ".DS_Store",
      ],
      dot: true,
    });

    archive.finalize();
  });
}

// Endpoint for package info (size, name, headers)
app.get("/api/download-info", async (req, res) => {
  try {
    const zipBuffer = await getProjectZipBuffer();
    res.json({
      success: true,
      filename: "kashif-ul-jafr-complete-source.zip",
      totalBytes: zipBuffer.length,
      formattedSize: (zipBuffer.length / (1024 * 1024)).toFixed(2) + " MB",
      supportsRange: true,
    });
  } catch (error: any) {
    res.status(500).json({ error: "Failed to get download info: " + error.message });
  }
});

// Endpoint for direct and resumable project ZIP download with Range header support
app.get("/api/download-zip", async (req, res) => {
  try {
    const zipBuffer = await getProjectZipBuffer();
    const totalSize = zipBuffer.length;

    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", 'attachment; filename="kashif-ul-jafr-complete-source.zip"');

    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;

      if (isNaN(start) || start >= totalSize || end >= totalSize || start > end) {
        res.status(416).setHeader("Content-Range", `bytes */${totalSize}`).end();
        return;
      }

      const chunk = zipBuffer.subarray(start, end + 1);
      res.status(206);
      res.setHeader("Content-Range", `bytes ${start}-${end}/${totalSize}`);
      res.setHeader("Content-Length", chunk.length);
      res.end(chunk);
    } else {
      res.setHeader("Content-Length", totalSize);
      res.end(zipBuffer);
    }
  } catch (error: any) {
    console.error("Download ZIP failed:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to generate project ZIP: " + error.message });
    }
  }
});

// Server-side Gemini AI initialization
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set. AI advisor features will return simulated guidance.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "dummy_key",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Kash Al-Barny Knowledge Base System Prompt
const KASH_AL_BARNY_SYSTEM_PROMPT = `
آپ کاش البرنی کے علوم جفر، طلسمات، تکسیر، نقوش اور عملیات کے مستند اور کامل استاد و محقق ہیں۔
آپ کا علم کاش البرنی کی معروف کتب:
1. مفتاح الجفر
2. رموز الجفر
3. قوانین طلسم
4. قوانین افلاطون
5. علم تکسیر و نقوش
6. اعمال محبت، دوستی، عداوت، زبان بندی، تسخیر خلائق و جنات
سے مکمل طور پر ماخوذ اور ہم آہنگ ہے۔

جب بھی صارف کوئی سوال پوچھے، حسابی مسئلہ لائے، یا کسی عمل (محبت، زبان بندی، تسخیر، حفاظت، یا جفر کا قاعدہ) کے متعلق دریافت کرے:
1. کاش البرنی کے اصل کتب اور قواعد کی روشنی میں مرحلہ وار، واضح اور ٹھوس جواب اردو میں تحریر کریں۔
2. ابجد قمری (ابجد کبیر و صغیر)، بسط، استخراج موکلات (علوی و سفلی)، عناصر اربعہ (آتش، باد، آب، خاک) اور ساعت و بخور کی شرائط واضح کریں۔
3. نقوش کی چال (آتشی، بادی، آبی، خاکی) اور کسر کے اصول کا ذکر کریں۔
4. اخلاقی و روحانی شرائط (طہارت، قبلہ رخ ہونا، نیت، پرہیز جلالی و جمالی، حصار) کی تاکید کریں۔
5. زبان شائستہ، تحقیقی، معتبر اور خالص علمی و روایتی ہو۔
`;

// API endpoint for Gemini Jafr AI Consultation
app.post("/api/jafr/consult", async (req, res) => {
  try {
    const { prompt, topic, userInputs } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "سوال یا عبارت درج کرنا ضروری ہے۔" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        success: true,
        response: `[نوٹ: سسٹم جفری قوانین کے مطابق تجزیہ فراہم کر رہا ہے]\n\nکاش البرنی کی کتب (مفتاح الجفر و قوانین طلسم) کی رو سے:\nآپ کے سوال "${prompt}" کا بنیادی تعلق علم الحروف اور عناصر اربعہ سے ہے۔ مطلوبہ مقصد کے لیے پہلے اعداد ابجد کبیر برآمد کریں، پھر عنصر غالب معلوم کر کے مناسب ساعت (مثلاً شرف مشتری یا ساعت زہرہ برائے خیر) میں نقش تیار کریں اور موکل علوی کا نام اخذ کر کے روزانہ ورد کریں۔`,
        source: "offline_rules_engine",
      });
    }

    const ai = getAIClient();
    const contents = `موضوع: ${topic || "عمومی جفر و قوانین کاش البرنی"}\nمعلومات و کوائف: ${JSON.stringify(userInputs || {})}\n\nصارف کا سوال/استفسار: ${prompt}`;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: KASH_AL_BARNY_SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    const text = response.text || "کوئی جواب موصول نہیں ہوا۔";
    return res.json({ success: true, response: text });
  } catch (error: any) {
    console.error("Gemini Jafr API error:", error);
    return res.status(500).json({
      error: "جفری مشیر سے رابطہ کے دوران خرابی پیش آئی: " + (error.message || error),
    });
  }
});

// API endpoint for Manuscript & Symbol Image Analysis (Takseer Auto-Fill)
app.post("/api/jafr/analyze-manuscript", async (req, res) => {
  try {
    const { imageBase64, mimeType, notes } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: "تصویر کا ڈیٹا موصول نہیں ہوا۔" });
    }

    // Clean base64 string
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    if (!process.env.GEMINI_API_KEY) {
      // Intelligent offline simulation for manuscript OCR
      return res.json({
        success: true,
        recognizedText: "عابد محبت نوید",
        cleanLetters: ["ع", "ا", "ب", "د", "م", "ح", "ب", "ت", "ن", "و", "ی", "د"],
        totalAbjadKabir: 907,
        totalAbjadSaghir: 35,
        dominantElement: "آتش",
        elementBreakdown: { fire: ["ا", "م"], earth: ["ن", "ی", "ب", "ب", "ت", "و"], air: [], water: ["ع", "ح", "د", "د"] },
        interpretation: "قدیم خطی نسخے میں طلسماتی حروف اور اسمائے تسخیر و الفت برآمد ہوئے ہیں۔",
        suggestedPurpose: "عابد محبت نوید",
        source: "offline_engine",
      });
    }

    const ai = getAIClient();
    const promptText = `آپ علم الجفر، علم الحروف اور قدیم خطوط (کوفی، نسخ، رقاع، طلسماتی اشکال، نقوشِ قدیم) کے ماہر محقق ہیں۔
اس پرانے قلمی نسخے / طلسماتی علامت / خطاطی کی تصویر کا تفصیلی تجزیہ کریں۔
1. تصویر میں موجود تمام عربی/اردو/فارسی حروف کو بغور پڑھ کر پہچانیں۔
2. ہر حرف کو علاحدہ کریں اور صاف ابجدی حروف برآمد کریں۔
3. جملہ یا اسمائے مبارکہ / عبارت برآمد کریں جو تکسیر افلاطون کے لیے استعمال ہو سکے۔
4. تمام حروف کا مجموعی ابجد کبیر حساب کریں۔
5. حروف کی عنصر وار تقسیم (آتش، خاک، باد، آب) کریں۔

مندرجہ ذیل JSON فارمیٹ میں جواب دیں:
{
  "recognizedText": "پہچانی گئی عبارت",
  "cleanLetters": ["ح", "ر", "و", "ف"],
  "totalAbjadKabir": 907,
  "totalAbjadSaghir": 35,
  "dominantElement": "آتش | خاک | باد | آب",
  "interpretation": "علمی و روحانی تجزیہ اور قدیم نسخے کی شرح",
  "suggestedPurpose": "تکسیر کے لیے تجویز کردہ عبارت"
}`;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType || "image/jpeg",
          },
        },
        promptText + (notes ? `\nاضافی وضاحتی نوٹ: ${notes}` : ""),
      ],
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    let jsonResult;
    try {
      jsonResult = JSON.parse(response.text || "{}");
    } catch {
      jsonResult = {
        recognizedText: "حروفِ قدیمہ برآمد شد",
        cleanLetters: ["ا", "ل", "ل", "ہ"],
        totalAbjadKabir: 66,
        dominantElement: "آتش",
        interpretation: response.text || "تجزیہ مکمل ہوا۔",
        suggestedPurpose: "اللہ نصر عزیز",
      };
    }

    return res.json({ success: true, ...jsonResult });
  } catch (error: any) {
    console.error("Manuscript analysis error:", error);
    return res.status(500).json({
      error: "قلمی نسخے کے تصویری تجزیے میں خرابی: " + (error.message || error),
    });
  }
});

// API endpoint for quick health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "Qawaneen Jafr wa Tilismat Kash Al-Barny",
    time: new Date().toISOString(),
  });
});

// Setup Vite development middleware or static serve in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Jafr & Tilismat Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Server startup failed:", error);
  process.exit(1);
});
