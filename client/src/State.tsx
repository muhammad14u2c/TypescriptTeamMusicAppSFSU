// 3rd party
import { List, Map } from "immutable";

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { RhodesInstrument } from './instruments/rhodes';
import { KalimbaInstrument } from './instruments/Kalimba';
import { TromboneInstrument } from './instruments/Trombone';
import { WaveformVisualizer } from './visualizers/Waveform';
import { WavemanVisualizer } from './visualizers/Waveman';
import { OcarinaInstrument } from "./instruments/Ocarina";
import { GuitarInstrument } from "./instruments/Guitar";
import { krisVisualizer } from "./visualizers/krisbyington";
import { JiaVisualizer } from "./visualizers/Jia";
import { MuhammadVisualizer } from "./visualizers/muhammad14u2c";
import { DrumInstrument } from "./instruments/muhammad14u2c";

/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>; // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
      // similar to Instrument[]
const instruments = List([
  PianoInstrument,
  GuitarInstrument,
  OcarinaInstrument,
  KalimbaInstrument,
  TromboneInstrument,
  DrumInstrument
]); // similar to Instrument[]

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
 // similar to Visualizer[]

const visualizers = List([WaveformVisualizer, JiaVisualizer, krisVisualizer, WavemanVisualizer, MuhammadVisualizer]); // similar to Visualizer[]

/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
  instruments: instruments,
  visualizers: visualizers,
});
