// Web Audio API procedural soundscape synthesizer for SORA Luxury Resort

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private oceanNode: { filter: BiquadFilterNode; lfoGain: GainNode } | null = null;
  private windNode: BiquadFilterNode | null = null;
  private birdTimer: NodeJS.Timeout | null = null;
  private currentPreset: 'dawn' | 'spa' | 'night' | 'cliff' = 'dawn';
  private volume = 0.4;

  private init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();
    
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  public toggleSound(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) return;
    this.isPlaying = true;

    // Start Ocean Waves
    this.startOcean();
    // Start Gentle Breeze
    this.startWind();
    // Start Periodic Bird Song / Chime
    this.scheduleBirds();
  }

  public stop() {
    if (!this.ctx || !this.isPlaying) return;
    this.isPlaying = false;

    if (this.birdTimer) {
      clearInterval(this.birdTimer);
      this.birdTimer = null;
    }

    if (this.masterGain) {
      this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);
    }

    setTimeout(() => {
      if (!this.isPlaying && this.ctx) {
        this.ctx.suspend();
      }
    }, 1300);
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx && this.isPlaying) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public setPreset(preset: 'dawn' | 'spa' | 'night' | 'cliff') {
    this.currentPreset = preset;
    if (this.oceanNode && this.ctx) {
      if (preset === 'spa') {
        this.oceanNode.filter.frequency.setTargetAtTime(250, this.ctx.currentTime, 1);
      } else if (preset === 'night') {
        this.oceanNode.filter.frequency.setTargetAtTime(180, this.ctx.currentTime, 1);
      } else if (preset === 'cliff') {
        this.oceanNode.filter.frequency.setTargetAtTime(450, this.ctx.currentTime, 1);
      } else {
        // dawn
        this.oceanNode.filter.frequency.setTargetAtTime(320, this.ctx.currentTime, 1);
      }
    }
  }

  private startOcean() {
    if (!this.ctx || !this.masterGain) return;

    // Pink/White noise buffer generator (5 seconds loop)
    const bufferSize = this.ctx.sampleRate * 5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;
    whiteNoise.loop = true;

    // Filter for wave swell tone
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    // Wave swell LFO (Modulate gain & cutoff frequency every 7 seconds)
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.14, this.ctx.currentTime); // ~7.1 seconds cycle

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(0.25, this.ctx.currentTime);

    const oceanGain = this.ctx.createGain();
    oceanGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    lfo.connect(filter.frequency);
    whiteNoise.connect(filter);
    filter.connect(oceanGain);
    oceanGain.connect(this.masterGain);

    whiteNoise.start();
    lfo.start();

    this.oceanNode = { filter, lfoGain };
  }

  private startWind() {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * 4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.015;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.setValueAtTime(220, this.ctx.currentTime);
    windFilter.Q.setValueAtTime(3, this.ctx.currentTime);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    noiseSource.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(this.masterGain);

    noiseSource.start();
    this.windNode = windFilter;
  }

  private scheduleBirds() {
    if (this.birdTimer) clearInterval(this.birdTimer);

    this.birdTimer = setInterval(() => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      if (Math.random() > 0.45) return; // Trigger 55% of cycles

      const osc = this.ctx.createOscillator();
      const birdGain = this.ctx.createGain();

      const startFreq = 2200 + Math.random() * 800;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(startFreq + 300, this.ctx.currentTime + 0.1);
      osc.frequency.exponentialRampToValueAtTime(startFreq - 150, this.ctx.currentTime + 0.25);

      birdGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      birdGain.gain.linearRampToValueAtTime(0.03, this.ctx.currentTime + 0.05);
      birdGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);

      osc.connect(birdGain);
      birdGain.connect(this.masterGain);

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.4);
    }, 6000);
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const soundEngine = typeof window !== 'undefined' ? new SoundEngine() : null;
