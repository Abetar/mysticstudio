export type MysticScene = "MYSTIC_ROOM";

export type MysticWeather = "NONE" | "RAIN" | "STORM";

export type MysticLighting = "WARM" | "COLD" | "MOONLIGHT" | "CANDLELIGHT";

export type MysticAudioTrack = "MYSTIC_AMBIENCE" | "RAIN_SOFT" | "LOW_DRONE";

export type MysticVisualEffect =
  | "SMOKE"
  | "CANDLE_FLICKER"
  | "DUST_PARTICLES"
  | "CARD_GLOW"
  | "LIGHT_PULSE";

export type MysticTimelineEvent = {
  at: number;
  type: "AUDIO" | "VISUAL" | "CAMERA" | "TEXT";
  key: string;
  duration?: number;
};

export type MysticExperiencePreset = {
  scene: MysticScene;
  weather: MysticWeather;
  lighting: MysticLighting;
  audio: MysticAudioTrack[];
  effects: MysticVisualEffect[];
  timeline: MysticTimelineEvent[];
};