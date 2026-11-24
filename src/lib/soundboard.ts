/**
 * DJ soundboard: every effect is synthesized live with the Web Audio API,
 * so there are no audio files to host. The AudioContext is created on the first tap
 * (browsers only allow sound after a user gesture).
 */
export type PadId = "airhorn" | "scratch" | "drop" | "siren" | "laser" | "applause";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;

function audio() {
  if (!ctx) {
    ctx = new AudioContext();
    master = ctx.createGain();
    master.gain.value = 0.55;
    const limiter = ctx.createDynamicsCompressor();
    master.connect(limiter).connect(ctx.destination);
  }
  if (ctx.state === "suspended") void ctx.resume();
  return { ctx, out: master! };
}

function noiseBuffer(c: AudioContext, seconds: number) {
  const buffer = c.createBuffer(1, c.sampleRate * seconds, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

function envelope(c: AudioContext, start: number, attack: number, hold: number, release: number, peak = 1) {
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(peak, start + attack);
  g.gain.setValueAtTime(peak, start + attack + hold);
  g.gain.exponentialRampToValueAtTime(0.0001, start + attack + hold + release);
  return g;
}

function airhorn() {
  const { ctx: c, out } = audio();
  const t0 = c.currentTime;
  // classic "bwaa-bwaa-bwaaaa" pattern
  const blasts: [number, number][] = [
    [0, 0.14],
    [0.2, 0.14],
    [0.4, 0.75],
  ];
  for (const [offset, length] of blasts) {
    const start = t0 + offset;
    const env = envelope(c, start, 0.015, length, 0.12, 0.5);
    const filter = c.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 2600;
    env.connect(filter).connect(out);
    for (const detune of [-14, 0, 9, 1200]) {
      const o = c.createOscillator();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(440, start);
      o.frequency.linearRampToValueAtTime(466, start + 0.05);
      o.detune.value = detune;
      const g = c.createGain();
      g.gain.value = detune === 1200 ? 0.12 : 0.3;
      o.connect(g).connect(env);
      o.start(start);
      o.stop(start + length + 0.2);
    }
  }
}

function scratch() {
  const { ctx: c, out } = audio();
  const t0 = c.currentTime;
  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c, 1);
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = 6;
  const g = c.createGain();
  g.gain.value = 0;
  // back-and-forth "wikka wikka" motion
  const moves = [0, 0.11, 0.2, 0.33, 0.42, 0.56];
  moves.forEach((t, i) => {
    const up = i % 2 === 0;
    bp.frequency.setValueAtTime(up ? 400 : 2400, t0 + t);
    bp.frequency.exponentialRampToValueAtTime(up ? 2400 : 400, t0 + t + 0.09);
    g.gain.setValueAtTime(0.0001, t0 + t);
    g.gain.exponentialRampToValueAtTime(1.6, t0 + t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + t + 0.1);
  });
  src.connect(bp).connect(g).connect(out);
  src.start(t0);
  src.stop(t0 + 0.75);
}

function drop() {
  const { ctx: c, out } = audio();
  const t0 = c.currentTime;
  // short riser…
  const riser = c.createBufferSource();
  riser.buffer = noiseBuffer(c, 0.6);
  const hp = c.createBiquadFilter();
  hp.type = "bandpass";
  hp.frequency.setValueAtTime(300, t0);
  hp.frequency.exponentialRampToValueAtTime(6000, t0 + 0.55);
  const rg = envelope(c, t0, 0.5, 0, 0.05, 0.35);
  riser.connect(hp).connect(rg).connect(out);
  riser.start(t0);
  // …then the sub-bass drop
  const start = t0 + 0.58;
  const o = c.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(140, start);
  o.frequency.exponentialRampToValueAtTime(32, start + 1.3);
  const shaper = c.createWaveShaper();
  const curve = new Float32Array(256);
  for (let i = 0; i < 256; i++) {
    const x = (i / 128) - 1;
    curve[i] = Math.tanh(x * 3);
  }
  shaper.curve = curve;
  const env = envelope(c, start, 0.01, 0.6, 0.8, 0.9);
  o.connect(shaper).connect(env).connect(out);
  o.start(start);
  o.stop(start + 1.5);
}

function siren() {
  const { ctx: c, out } = audio();
  const t0 = c.currentTime;
  const o = c.createOscillator();
  o.type = "square";
  o.frequency.value = 850;
  const lfo = c.createOscillator();
  lfo.frequency.value = 3;
  const depth = c.createGain();
  depth.gain.value = 300;
  lfo.connect(depth).connect(o.frequency);
  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 1800;
  const env = envelope(c, t0, 0.05, 1.5, 0.3, 0.22);
  o.connect(lp).connect(env).connect(out);
  o.start(t0);
  lfo.start(t0);
  o.stop(t0 + 1.9);
  lfo.stop(t0 + 1.9);
}

function laser() {
  const { ctx: c, out } = audio();
  const t0 = c.currentTime;
  for (let i = 0; i < 3; i++) {
    const start = t0 + i * 0.16;
    const o = c.createOscillator();
    o.type = "square";
    o.frequency.setValueAtTime(1900, start);
    o.frequency.exponentialRampToValueAtTime(110, start + 0.22);
    const env = envelope(c, start, 0.005, 0.05, 0.17, 0.25);
    o.connect(env).connect(out);
    o.start(start);
    o.stop(start + 0.3);
  }
}

function applause() {
  const { ctx: c, out } = audio();
  const t0 = c.currentTime;
  const buffer = noiseBuffer(c, 0.1);
  const crowd = envelope(c, t0, 0.25, 1.2, 0.8, 1);
  crowd.connect(out);
  // many short filtered noise bursts = hands clapping
  for (let i = 0; i < 70; i++) {
    const start = t0 + Math.random() * 2;
    const src = c.createBufferSource();
    src.buffer = buffer;
    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 900 + Math.random() * 1800;
    bp.Q.value = 1.2;
    const g = envelope(c, start, 0.002, 0.005, 0.06, 0.25 + Math.random() * 0.3);
    src.connect(bp).connect(g).connect(crowd);
    src.start(start);
    src.stop(start + 0.1);
  }
}

const PLAYERS: Record<PadId, () => void> = { airhorn, scratch, drop, siren, laser, applause };

export function playPad(id: PadId) {
  try {
    PLAYERS[id]();
  } catch (e) {
    console.error("[soundboard]", e);
  }
}
