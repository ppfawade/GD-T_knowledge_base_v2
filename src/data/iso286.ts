/**
 * Engineering Notes:
 * ISO 286 defines the system of limits and fits.
 * Basic size ranges dictate the IT (International Tolerance) grade values in micrometers (µm).
 * Fundamental deviations define the position of the tolerance zone relative to the zero line.
 * H = Hole basis (EI = 0).
 * g, f = Clearance shafts (es < 0).
 * p = Interference shafts (ei > 0).
 */

const sizeRanges = [3, 6, 10, 18, 30, 50, 80, 120, 180, 250, 315, 400, 500];

// IT Grades in µm
const IT_GRADES = {
  6: [6, 8, 9, 11, 13, 16, 19, 22, 25, 29, 32, 36, 40],
  7: [10, 12, 15, 18, 21, 25, 30, 35, 40, 46, 52, 57, 63],
  8: [14, 18, 22, 27, 33, 39, 46, 54, 63, 72, 81, 89, 97],
};

// Fundamental Deviations in µm
const DEVIATIONS = {
  g: [-2, -4, -5, -6, -7, -9, -10, -12, -14, -15, -17, -18, -20], // es (upper deviation)
  f: [-6, -10, -13, -16, -20, -25, -30, -36, -43, -50, -56, -62, -68], // es (upper deviation)
  p: [6, 12, 15, 18, 22, 26, 32, 37, 43, 50, 56, 62, 68], // ei (lower deviation)
};

export interface ToleranceResult {
  nominal: number;
  hole: { class: string; IT: number; ES: number; EI: number };
  shaft: { class: string; IT: number; es: number; ei: number };
  fit: { type: 'Clearance' | 'Transition' | 'Interference'; maxClearance: number; minClearance: number };
}

export function calculateFit(nominal: number, fitPair: 'H7/g6' | 'H7/p6' | 'H8/f7'): ToleranceResult {
  let rangeIdx = sizeRanges.findIndex(max => nominal <= max);
  if (rangeIdx === -1) rangeIdx = sizeRanges.length - 1; // Cap at 500
  if (nominal <= 0) rangeIdx = 0; // Handle edge case

  let holeClass = '';
  let shaftClass = '';
  let holeIT = 0;
  let shaftIT = 0;
  let holeES = 0, holeEI = 0;
  let shaft_es = 0, shaft_ei = 0;

  if (fitPair === 'H7/g6') {
    holeClass = 'H7'; shaftClass = 'g6';
    holeIT = IT_GRADES[7][rangeIdx];
    shaftIT = IT_GRADES[6][rangeIdx];
    holeEI = 0; holeES = holeIT;
    shaft_es = DEVIATIONS.g[rangeIdx];
    shaft_ei = shaft_es - shaftIT;
  } else if (fitPair === 'H7/p6') {
    holeClass = 'H7'; shaftClass = 'p6';
    holeIT = IT_GRADES[7][rangeIdx];
    shaftIT = IT_GRADES[6][rangeIdx];
    holeEI = 0; holeES = holeIT;
    shaft_ei = DEVIATIONS.p[rangeIdx];
    shaft_es = shaft_ei + shaftIT;
  } else if (fitPair === 'H8/f7') {
    holeClass = 'H8'; shaftClass = 'f7';
    holeIT = IT_GRADES[8][rangeIdx];
    shaftIT = IT_GRADES[7][rangeIdx];
    holeEI = 0; holeES = holeIT;
    shaft_es = DEVIATIONS.f[rangeIdx];
    shaft_ei = shaft_es - shaftIT;
  }

  const maxClearance = holeES - shaft_ei;
  const minClearance = holeEI - shaft_es;

  let fitType: 'Clearance' | 'Transition' | 'Interference' = 'Transition';
  if (minClearance >= 0) fitType = 'Clearance';
  else if (maxClearance <= 0) fitType = 'Interference';

  return {
    nominal,
    hole: { class: holeClass, IT: holeIT, ES: holeES, EI: holeEI },
    shaft: { class: shaftClass, IT: shaftIT, es: shaft_es, ei: shaft_ei },
    fit: { type: fitType, maxClearance, minClearance }
  };
}
