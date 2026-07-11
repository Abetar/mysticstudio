import { Howl } from "howler";

export type AmbientTrackKey = "rain" | "fire" | "music";

type AmbientTrackConfig = {
  src: string[];
  volume: number;
};

type AmbientTrackStatus = Record<AmbientTrackKey, boolean>;

const TRACKS: Record<AmbientTrackKey, AmbientTrackConfig> = {
  rain: {
    src: ["/audio/rain-soft.mp3"],
    volume: 0.45,
  },
  fire: {
    src: ["/audio/fire-crackle.mp3"],
    volume: 0.3,
  },
  music: {
    src: ["/audio/mystic-ambient.mp3"],
    volume: 0.22,
  },
};

class AmbientAudioManager {
  private sounds = new Map<AmbientTrackKey, Howl>();
  private activeTracks = new Set<AmbientTrackKey>();
  private stopTimers = new Map<AmbientTrackKey, number>();
  private isInitialized = false;

  private initialize() {
    if (this.isInitialized) return;

    Object.entries(TRACKS).forEach(([key, config]) => {
      const track = key as AmbientTrackKey;

      this.sounds.set(
        track,
        new Howl({
          src: config.src,
          loop: true,
          volume: 0,
          preload: true,
        }),
      );
    });

    this.isInitialized = true;
  }

  private clearStopTimer(track: AmbientTrackKey) {
    const timer = this.stopTimers.get(track);

    if (timer === undefined) return;

    window.clearTimeout(timer);
    this.stopTimers.delete(track);
  }

  playTrack(track: AmbientTrackKey) {
    this.initialize();
    this.clearStopTimer(track);

    const sound = this.sounds.get(track);

    if (!sound) return false;

    this.activeTracks.add(track);

    if (!sound.playing()) {
      sound.volume(0);
      sound.play();
    }

    sound.fade(sound.volume(), TRACKS[track].volume, 900);

    return true;
  }

  stopTrack(track: AmbientTrackKey) {
    this.initialize();
    this.clearStopTimer(track);

    const sound = this.sounds.get(track);

    this.activeTracks.delete(track);

    if (!sound || !sound.playing()) {
      return false;
    }

    sound.fade(sound.volume(), 0, 700);

    const timer = window.setTimeout(() => {
      /*
       * Solo pausamos si la pista continúa inactiva.
       * Si el usuario la encendió otra vez durante el fade,
       * no detenemos la nueva reproducción.
       */
      if (!this.activeTracks.has(track)) {
        sound.pause();
        sound.volume(0);
      }

      this.stopTimers.delete(track);
    }, 750);

    this.stopTimers.set(track, timer);

    return false;
  }

  toggleTrack(track: AmbientTrackKey) {
    if (this.activeTracks.has(track)) {
      return this.stopTrack(track);
    }

    return this.playTrack(track);
  }

  isTrackActive(track: AmbientTrackKey) {
    return this.activeTracks.has(track);
  }

  stopAll() {
    this.initialize();

    const tracks = Object.keys(TRACKS) as AmbientTrackKey[];

    tracks.forEach((track) => {
      this.stopTrack(track);
    });
  }

  getStatus(): AmbientTrackStatus {
    return {
      rain: this.activeTracks.has("rain"),
      fire: this.activeTracks.has("fire"),
      music: this.activeTracks.has("music"),
    };
  }
}

export const ambientAudioManager = new AmbientAudioManager();