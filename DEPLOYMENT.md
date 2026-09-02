# قوانین جفر و طلسمات — Build Guide

## Web/Desktop
1. Install Node.js 20+.
2. Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY`.
3. Run `npm install`.
4. Run `npm run dev` for development.
5. Run `npm run build` then `npm start` for production.

## Android APK
This project is prepared for Capacitor. After `npm install`:

```bash
npm run android:add
npm run android:sync
npm run android:open
```

Open Android Studio, allow Gradle to finish, then use Build > Generate Signed Bundle / APK.

## Security
Never put the Gemini API key in browser-side React code or publish `.env.local`.
