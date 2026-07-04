import { Howl } from "howler";

type AmbientTrackKey = "rain" | "fire";

type AmbientTrackConfig = {
  src: string[];
  volume: number;
};

const TRACKS: Record<AmbientTrackKey, AmbientTrackConfig> = {
  rain: {
    src: ["/audio/rain-soft.mp3"],
    volume: 0.45,
  },
  fire: {
    src: ["/audio/fire-crackle.mp3"],
    volume: 0.3,
  },
};

class AmbientAudioManager {
  private sounds = new Map<AmbientTrackKey, Howl>();
  private isInitialized = false;
  private isPlaying = false;

  private initialize() {
    if (this.isInitialized) return;

    Object.entries(TRACKS).forEach(([key, config]) => {
      this.sounds.set(
        key as AmbientTrackKey,
        new Howl({
          src: config.src,
          loop: true,
          volume: 0,
          html5: true,
        }),
      );
    });

    this.isInitialized = true;
  }

  play() {
    this.initialize();

    this.sounds.forEach((sound, key) => {
      const targetVolume = TRACKS[key].volume;

      if (!sound.playing()) {
        sound.play();
      }

      sound.fade(sound.volume(), targetVolume, 1800);
    });

    this.isPlaying = true;
  }

  stop() {
    this.sounds.forEach((sound) => {
      sound.fade(sound.volume(), 0, 1200);

      window.setTimeout(() => {
        sound.stop();
      }, 1300);
    });

    this.isPlaying = false;
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    }

    this.play();
    return true;
  }

  getStatus() {
    return this.isPlaying;
  }
}

export const ambientAudioManager = new AmbientAudioManager();