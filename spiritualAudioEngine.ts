// Spiritual Meditative Sound & Frequency Engine using Web Audio API

export type FrequencyType = '432hz' | '528hz' | '639hz' | '741hz' | '852hz' | '963hz' | 'sufi_hu' | 'theta_6hz' | 'ocean_breeze';

export interface SoundscapeOption {
  id: FrequencyType;
  nameUrdu: string;
  nameEn: string;
  freq: number;
  description: string;
  purpose: string;
}

export const SOUNDSCAPE_OPTIONS: SoundscapeOption[] = [
  {
    id: '432hz',
    nameUrdu: '۴۳۲ ہرٹز (سُرِ کائناتی و سکونِ قلب)',
    nameEn: '432 Hz Harmonic Universe',
    freq: 432,
    description: 'کائناتی قدرتی ہم آہنگی، ذہنی انتشار کا خاتمہ اور دلی سکون۔',
    purpose: 'عمومی مراقبہ، تنفس اور ذہنی سکون'
  },
  {
    id: '528hz',
    nameUrdu: '۵۲۸ ہرٹز (فریکوئنسیِ اعجاز و شفاء)',
    nameEn: '528 Hz Miracle & Transformation',
    freq: 528,
    description: 'روحانی تطہیر، خلیاتی شفاء، اور باطنی توانائی کی تجدید۔',
    purpose: 'اعمالِ شفاء، سحر کشائی اور بیماریوں سے نجات'
  },
  {
    id: '639hz',
    nameUrdu: '۶۳۹ ہرٹز (فریکوئنسیِ الفت و اتصالِ قلوب)',
    nameEn: '639 Hz Harmonizing Hearts',
    freq: 639,
    description: 'قلبی رشتوں کی بحالی، محبت و الفت کی لہریں اور کشش۔',
    purpose: 'اعمالِ محبت، تسخیر اور رشتوں کے تصفیے'
  },
  {
    id: '741hz',
    nameUrdu: '۷۴۱ ہرٹز (صفائیِ باطن و انکشافِ بصیرت)',
    nameEn: '741 Hz Intuition Awakening',
    freq: 741,
    description: 'زہریلے و منفی اثرات کی صفائی اور باطنی حس کی بیداری۔',
    purpose: 'اعمالِ حصار، دفعِ اثرات اور صفائیِ چکرا'
  },
  {
    id: '852hz',
    nameUrdu: '۸۵۲ ہرٹز (کشف و مشاہدۂ نور)',
    nameEn: '852 Hz Spiritual Sight & Kashf',
    freq: 852,
    description: 'تیسری آنکھ کی بیداری، مشاہدۂ انوار اور کشفی بصیرت۔',
    purpose: 'اعمالِ کشف، استخارہ اور روحانی خواب'
  },
  {
    id: '963hz',
    nameUrdu: '۹۶۳ ہرٹز (اتصالِ نورِ الٰہی و حاضرات)',
    nameEn: '963 Hz Divine Connection & Hazirat',
    freq: 963,
    description: 'عالمِ بالا سے روحانی رابطہ اور ارواحِ طیبہ کے لیے ذہن کی آمادگی۔',
    purpose: 'حاضرات، ریاضتِ جلالی و جمالی'
  },
  {
    id: 'sufi_hu',
    nameUrdu: 'ذکرِ صوفیاء و صدا ئے ھُو (Sufi Zikr Drone)',
    nameEn: 'Sufi Deep Resonance Drone',
    freq: 108,
    description: 'گہری گونج دار سفیانہ لے جو باطنی ارتکاز کو مستحکم کرتی ہے۔',
    purpose: 'حبسِ دم اور طویل مراقبہ'
  },
  {
    id: 'theta_6hz',
    nameUrdu: 'تھیٹا برین ویوز ۶ ہرٹز (Theta Binaural)',
    nameEn: '6 Hz Deep Meditation Wave',
    freq: 216,
    description: 'گہرے مراقبے اور سحر انگیز باطنی حالت پیدا کرنے والی لہر۔',
    purpose: 'قوتِ ارادی اور گہرا سمادھی نما ارتکاز'
  }
];

class SpiritualAudioEngine {
  private audioCtx: AudioContext | null = null;
  private primaryOsc: OscillatorNode | null = null;
  private secondaryOsc: OscillatorNode | null = null;
  private binauralOsc: OscillatorNode | null = null;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private isPlaying: boolean = false;
  private currentType: FrequencyType = '432hz';

  private initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public play(type: FrequencyType, volume: number = 0.35) {
    this.initContext();
    if (!this.audioCtx) return;

    this.stop();
    this.currentType = type;

    const selected = SOUNDSCAPE_OPTIONS.find(s => s.id === type) || SOUNDSCAPE_OPTIONS[0];
    const baseFreq = selected.freq;

    this.masterGain = this.audioCtx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(Math.max(0.01, volume), this.audioCtx.currentTime + 2.5);
    this.masterGain.connect(this.audioCtx.destination);

    // Primary Pure Sine Harmonic
    this.primaryOsc = this.audioCtx.createOscillator();
    this.primaryOsc.type = type === 'sufi_hu' ? 'triangle' : 'sine';
    this.primaryOsc.frequency.setValueAtTime(baseFreq, this.audioCtx.currentTime);

    const primaryGain = this.audioCtx.createGain();
    primaryGain.gain.setValueAtTime(0.7, this.audioCtx.currentTime);
    this.primaryOsc.connect(primaryGain);
    primaryGain.connect(this.masterGain);
    this.primaryOsc.start();

    // Sub-Harmonic / Warmth
    this.secondaryOsc = this.audioCtx.createOscillator();
    this.secondaryOsc.type = 'sine';
    const subFreq = type === 'sufi_hu' ? baseFreq / 2 : baseFreq / 2;
    this.secondaryOsc.frequency.setValueAtTime(subFreq, this.audioCtx.currentTime);

    const secondaryGain = this.audioCtx.createGain();
    secondaryGain.gain.setValueAtTime(0.35, this.audioCtx.currentTime);
    this.secondaryOsc.connect(secondaryGain);
    secondaryGain.connect(this.masterGain);
    this.secondaryOsc.start();

    // Binaural Beat generator (adds slight offset for brainwave entrainment)
    this.binauralOsc = this.audioCtx.createOscillator();
    this.binauralOsc.type = 'sine';
    const beatOffset = type === 'theta_6hz' ? 6 : (type === 'sufi_hu' ? 4.5 : 7.83); // Schumann resonance / Theta
    this.binauralOsc.frequency.setValueAtTime(baseFreq + beatOffset, this.audioCtx.currentTime);

    const binauralGain = this.audioCtx.createGain();
    binauralGain.gain.setValueAtTime(0.25, this.audioCtx.currentTime);
    this.binauralOsc.connect(binauralGain);
    binauralGain.connect(this.masterGain);
    this.binauralOsc.start();

    this.isPlaying = true;
  }

  public setVolume(volume: number) {
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setTargetAtTime(Math.max(0.001, Math.min(1, volume)), this.audioCtx.currentTime, 0.1);
    }
  }

  public stop() {
    if (this.masterGain && this.audioCtx) {
      try {
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.audioCtx.currentTime);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1.2);
        
        setTimeout(() => {
          this.primaryOsc?.stop();
          this.primaryOsc?.disconnect();
          this.secondaryOsc?.stop();
          this.secondaryOsc?.disconnect();
          this.binauralOsc?.stop();
          this.binauralOsc?.disconnect();
          this.noiseNode?.stop();
          this.noiseNode?.disconnect();
          this.masterGain?.disconnect();
          this.isPlaying = false;
        }, 1300);
      } catch {
        this.isPlaying = false;
      }
    } else {
      this.isPlaying = false;
    }
  }

  // Play a soft spiritual chime/bell (Tibetan Singing Bowl / Sufi Bell) for breath cues
  public playChime(freq: number = 528) {
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const chimeOsc = this.audioCtx.createOscillator();
      const chimeGain = this.audioCtx.createGain();
      
      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      
      // Harmonics
      chimeGain.gain.setValueAtTime(0.4, this.audioCtx.currentTime);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 3.0);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(this.audioCtx.destination);

      chimeOsc.start();
      chimeOsc.stop(this.audioCtx.currentTime + 3.2);
    } catch {
      // ignore
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentType(): FrequencyType {
    return this.currentType;
  }
}

export const spiritualAudio = new SpiritualAudioEngine();
