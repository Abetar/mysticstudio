import type {
  MysticDrawnSymbol,
  MysticInterpretation,
  MysticReadingInput,
  MysticSymbol,
} from "../core/mystic.types";

export type MysticProvider = {
  discipline: MysticReadingInput["discipline"];

  getSymbols(): Promise<MysticSymbol[]>;

  drawSymbols(symbols: MysticSymbol[]): MysticDrawnSymbol[];

  interpretSymbol(params: {
    drawnSymbol: MysticDrawnSymbol;
    input: MysticReadingInput;
  }): MysticInterpretation;
};