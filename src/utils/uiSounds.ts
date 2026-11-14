export interface PointerLikeEvent {
  pointerType?: string;
}

const SOUND_STORAGE_KEY = 'hg-klusjes-sound';

class UiSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private enabled = true;
  private unlocked = false;
  private lastHoverAt = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const saved = window.localStorage.getItem(SOUND_STORAGE_KEY);
        if (saved === 'off') {
          this.enabled = false;
        }
      } catch {
        // Ignore restricted storage environments
      }
      this.bindUnlockListeners();
    }
  }

  private bindUnlockListeners() {
    const unlock = () => {
      this.unlocked = true;
      const ctx = this.ensureContext(true);
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      if (ctx && ctx.state === 'running') {
        window.removeEventListener('pointerdown', unlock);
        window.removeEventListener('keydown', unlock);
        window.removeEventListener('touchstart', unlock);
      }
    };

    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('keydown', unlock, { passive: true });
    window.addEventListener('touchstart', unlock, { passive: true });
  }

  private ensureContext(fromGesture: boolean): AudioContext | null {
    if (typeof window === 'undefined' || !this.enabled) return null;

    if (!this.ctx) {
      if (!fromGesture && !this.unlocked) return null;
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;

      try {
        const ctx = new AudioCtx();
        const master = ctx.createGain();
        master.gain.value = 0.9;
        master.connect(ctx.destination);

        this.ctx = ctx;
        this.masterGain = master;
        this.noiseBuffer = this.createNoiseBuffer(ctx);
      } catch {
        return null;
      }
    }

    if (fromGesture && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  private createNoiseBuffer(ctx: AudioContext): AudioBuffer {
    const length = Math.max(1, Math.floor(ctx.sampleRate * 0.04));
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      // Exponentially weighted white noise impulse for a clean mechanical transient
      const decay = 1 - i / length;
      data[i] = (Math.random() * 2 - 1) * decay * decay;
    }
    return buffer;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(next: boolean): void {
    this.enabled = next;
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(SOUND_STORAGE_KEY, next ? 'on' : 'off');
      } catch {
        // Ignore restricted storage environments
      }
    }
  }

  private playTone(options: {
    type?: OscillatorType;
    startFreq: number;
    endFreq: number;
    duration: number;
    peakGain: number;
    delay?: number;
    fromGesture?: boolean;
    filterFreq?: number;
  }) {
    const ctx = this.ensureContext(Boolean(options.fromGesture));
    if (!ctx || !this.masterGain || ctx.state !== 'running') return;

    const {
      type = 'sine',
      startFreq,
      endFreq,
      duration,
      peakGain,
      delay = 0,
      filterFreq,
    } = options;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), now + duration);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(peakGain, now + Math.min(0.004, duration * 0.2));
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    if (filterFreq) {
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(filterFreq, now);
      osc.connect(filter);
      filter.connect(gain);
    } else {
      osc.connect(gain);
    }

    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + duration + 0.01);
  }

  private playNoiseTick(options: {
    centerFreq: number;
    q: number;
    duration: number;
    peakGain: number;
    fromGesture?: boolean;
  }) {
    const ctx = this.ensureContext(Boolean(options.fromGesture));
    if (!ctx || !this.masterGain || !this.noiseBuffer || ctx.state !== 'running') return;

    const now = ctx.currentTime;
    const source = ctx.createBufferSource();
    source.buffer = this.noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(options.centerFreq, now);
    filter.Q.setValueAtTime(options.q, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(options.peakGain, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + options.duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    source.start(now);
    source.stop(now + options.duration + 0.005);
  }

  /** Ultra-subtle air/ceramic hover micro-tick (desktop pointer only) */
  public hover = (event?: PointerLikeEvent): void => {
    if (!this.enabled) return;
    if (event?.pointerType === 'touch') return;

    const nowMs = performance.now();
    if (nowMs - this.lastHoverAt < 45) return;
    this.lastHoverAt = nowMs;

    // Never force AudioContext creation on hover alone to avoid browser autoplay warnings
    if (!this.ctx || this.ctx.state !== 'running') return;

    this.playTone({
      type: 'sine',
      startFreq: 1320,
      endFreq: 860,
      duration: 0.015,
      peakGain: 0.015,
      fromGesture: false,
    });
    this.playNoiseTick({
      centerFreq: 2600,
      q: 2.6,
      duration: 0.01,
      peakGain: 0.008,
      fromGesture: false,
    });
  };

  /** Crisp precision mechanical detent for primary actions & buttons */
  public click = (): void => {
    if (!this.enabled) return;
    this.unlocked = true;

    this.playTone({
      type: 'triangle',
      startFreq: 215,
      endFreq: 84,
      duration: 0.026,
      peakGain: 0.052,
      filterFreq: 950,
      fromGesture: true,
    });
    this.playNoiseTick({
      centerFreq: 1950,
      q: 1.9,
      duration: 0.012,
      peakGain: 0.022,
      fromGesture: true,
    });
  };

  /** Smooth sliding bionic step for navigation tabs and section jumps */
  public nav = (): void => {
    if (!this.enabled) return;
    this.unlocked = true;

    this.playTone({
      type: 'sine',
      startFreq: 430,
      endFreq: 620,
      duration: 0.036,
      peakGain: 0.036,
      fromGesture: true,
    });
    this.playTone({
      type: 'sine',
      startFreq: 860,
      endFreq: 1240,
      duration: 0.028,
      peakGain: 0.011,
      fromGesture: true,
    });
    this.playNoiseTick({
      centerFreq: 2200,
      q: 2.4,
      duration: 0.009,
      peakGain: 0.01,
      fromGesture: true,
    });
  };

  /** Directional precision switch for theme, sound, filter, and FAQ toggles */
  public toggle = (activating = true): void => {
    if (!this.enabled) return;
    this.unlocked = true;

    this.playTone({
      type: 'sine',
      startFreq: activating ? 380 : 520,
      endFreq: activating ? 560 : 340,
      duration: 0.038,
      peakGain: 0.038,
      fromGesture: true,
    });
    this.playNoiseTick({
      centerFreq: activating ? 2100 : 1600,
      q: 2.2,
      duration: 0.01,
      peakGain: 0.014,
      fromGesture: true,
    });
  };

  /** Soft pneumatic lift when opening drawers or modals */
  public open = (): void => {
    if (!this.enabled) return;
    this.unlocked = true;

    this.playTone({
      type: 'sine',
      startFreq: 295,
      endFreq: 475,
      duration: 0.055,
      peakGain: 0.034,
      fromGesture: true,
    });
    this.playNoiseTick({
      centerFreq: 1850,
      q: 1.7,
      duration: 0.012,
      peakGain: 0.014,
      fromGesture: true,
    });
  };

  /** Soft pneumatic settle when closing drawers or modals */
  public close = (): void => {
    if (!this.enabled) return;
    this.unlocked = true;

    this.playTone({
      type: 'sine',
      startFreq: 430,
      endFreq: 255,
      duration: 0.048,
      peakGain: 0.028,
      fromGesture: true,
    });
    this.playNoiseTick({
      centerFreq: 1450,
      q: 2.0,
      duration: 0.01,
      peakGain: 0.01,
      fromGesture: true,
    });
  };

  /** Clean two-note harmonic confirmation for form submissions */
  public success = (): void => {
    if (!this.enabled) return;
    this.unlocked = true;

    this.playTone({
      type: 'sine',
      startFreq: 523.25,
      endFreq: 523.25,
      duration: 0.09,
      peakGain: 0.035,
      fromGesture: true,
    });
    this.playTone({
      type: 'sine',
      startFreq: 659.25,
      endFreq: 659.25,
      duration: 0.14,
      peakGain: 0.04,
      delay: 0.05,
      fromGesture: true,
    });
  };
}

export const uiSounds = new UiSoundEngine();

export function getInitialSoundEnabled(): boolean {
  return uiSounds.isEnabled();
}
