import type { MysticReadingInput } from "../core/mystic.types";
import type { MysticExperiencePreset } from "./experience.types";

export function createMysticExperience(
  input: MysticReadingInput,
): MysticExperiencePreset {
  const baseExperience: MysticExperiencePreset = {
    scene: "MYSTIC_ROOM",
    weather: "RAIN",
    lighting: "CANDLELIGHT",
    audio: ["MYSTIC_AMBIENCE", "RAIN_SOFT"],
    effects: ["SMOKE", "CANDLE_FLICKER", "DUST_PARTICLES"],
    timeline: [
      {
        at: 0,
        type: "VISUAL",
        key: "room_fade_in",
        duration: 1800,
      },
      {
        at: 800,
        type: "AUDIO",
        key: "ambient_fade_in",
        duration: 2400,
      },
      {
        at: 2200,
        type: "TEXT",
        key: "welcome_line",
        duration: 1800,
      },
      {
        at: 4200,
        type: "CAMERA",
        key: "move_to_table",
        duration: 2600,
      },
      {
        at: 7200,
        type: "VISUAL",
        key: "deck_reveal",
        duration: 1600,
      },
    ],
  };

  if (input.topic === "SPIRITUALITY") {
    return {
      ...baseExperience,
      lighting: "MOONLIGHT",
      audio: ["MYSTIC_AMBIENCE", "LOW_DRONE"],
      effects: [...baseExperience.effects, "LIGHT_PULSE"],
    };
  }

  if (input.topic === "LOVE") {
    return {
      ...baseExperience,
      lighting: "WARM",
      effects: [...baseExperience.effects, "CARD_GLOW"],
    };
  }

  return baseExperience;
}