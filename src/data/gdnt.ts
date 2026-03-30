export type Category = 'Form' | 'Profile' | 'Orientation' | 'Location' | 'Runout';

export interface Tolerance {
  id: string;
  name: string;
  symbol: string;
  category: Category;
  description: string;
  latexExample: string;
}

export const gdntData: Tolerance[] = [
  {
    id: 'straightness',
    name: 'Straightness',
    symbol: '⏤',
    category: 'Form',
    description: 'ISO 1101: The extracted line must be contained within a zone bounded by two parallel lines. For Learners: Controls how straight a line or axis is. The actual line must fit entirely inside a 2D boundary made of two perfectly parallel lines.',
    latexExample: '\\begin{array}{|c|c|} \\hline \\text{⏤} & 0.05 \\\\ \\hline \\end{array}'
  },
  {
    id: 'flatness',
    name: 'Flatness',
    symbol: '⏥',
    category: 'Form',
    description: 'ISO 1101: The extracted surface must be contained within a zone bounded by two parallel planes. For Learners: Controls how flat a surface is. The entire actual surface must fit between two perfectly flat, parallel planes separated by the tolerance value.',
    latexExample: '\\begin{array}{|c|c|} \\hline \\text{⏥} & 0.1 \\\\ \\hline \\end{array}'
  },
  {
    id: 'circularity',
    name: 'Circularity',
    symbol: '◯',
    category: 'Form',
    description: 'ISO 1101: The extracted circumferential line must be contained within a zone bounded by two coplanar concentric circles. For Learners: Controls the roundness of a cross-section. At any single slice of a cylinder or sphere, the actual edge must fit between two perfectly concentric circles.',
    latexExample: '\\begin{array}{|c|c|} \\hline \\text{◯} & 0.02 \\\\ \\hline \\end{array}'
  },
  {
    id: 'cylindricity',
    name: 'Cylindricity',
    symbol: '⌭',
    category: 'Form',
    description: 'ISO 1101: The extracted cylindrical surface must be contained within a zone bounded by two coaxial cylinders. For Learners: Controls the overall 3D form of a cylinder. The entire surface must fit between two perfectly concentric cylinders, combining roundness, straightness, and taper.',
    latexExample: '\\begin{array}{|c|c|} \\hline \\text{⌭} & 0.05 \\\\ \\hline \\end{array}'
  },
  {
    id: 'profile-line',
    name: 'Profile of a Line',
    symbol: '⌒',
    category: 'Profile',
    description: 'ISO 1101: The extracted line must be contained within a zone enveloping circles centered on the theoretically exact profile. For Learners: Controls the shape of a specific 2D cross-section. The actual line must fall within a tolerance zone that perfectly follows the true intended shape.',
    latexExample: '\\begin{array}{|c|c|c|c|} \\hline \\text{⌒} & 0.1 & A & B \\\\ \\hline \\end{array}'
  },
  {
    id: 'profile-surface',
    name: 'Profile of a Surface',
    symbol: '⌓',
    category: 'Profile',
    description: 'ISO 1101: The extracted surface must be contained within a zone enveloping spheres centered on the theoretically exact profile. For Learners: Controls the exact 3D shape of an entire surface. The actual surface must fall within a 3D tolerance zone that perfectly follows the true intended shape.',
    latexExample: '\\begin{array}{|c|c|c|c|c|c|} \\hline \\text{⌓} & 0.2 & A & B & C \\\\ \\hline \\end{array}'
  },
  {
    id: 'perpendicularity',
    name: 'Perpendicularity',
    symbol: '⟂',
    category: 'Orientation',
    description: 'ISO 1101: The extracted feature must be contained within a zone perpendicular to a datum. For Learners: Controls the orientation of a feature at exactly 90 degrees to a datum. The surface or axis must fit within a tolerance zone that is perfectly perpendicular to your reference.',
    latexExample: '\\begin{array}{|c|c|c|} \\hline \\text{⟂} & 0.05 & A \\\\ \\hline \\end{array}'
  },
  {
    id: 'angularity',
    name: 'Angularity',
    symbol: '∠',
    category: 'Orientation',
    description: 'ISO 1101: The extracted feature must be contained within a zone inclined at the specified angle to a datum. For Learners: Controls the orientation of a feature at a specific angle. The surface or axis must fit within a tolerance zone tilted at the exact intended angle relative to your reference.',
    latexExample: '\\begin{array}{|c|c|c|c|} \\hline \\text{∠} & 0.1 & A & B \\\\ \\hline \\end{array}'
  },
  {
    id: 'parallelism',
    name: 'Parallelism',
    symbol: '∥',
    category: 'Orientation',
    description: 'ISO 1101: The extracted feature must be contained within a zone parallel to a datum. For Learners: Controls how parallel a feature is to a datum. The surface or axis must fit within a tolerance zone that is perfectly parallel to your reference.',
    latexExample: '\\begin{array}{|c|c|c|} \\hline \\text{∥} & 0.05 & A \\\\ \\hline \\end{array}'
  },
  {
    id: 'position',
    name: 'Position',
    symbol: '⌖',
    category: 'Location',
    description: 'ISO 1101: The extracted center point, median line, or median surface must be contained within a zone symmetrically disposed about the theoretically exact position. For Learners: Controls the location of a feature. The center of your feature (like a hole) must fall within a tolerance zone located at its exact intended position.',
    latexExample: '\\begin{array}{|c|c|c|c|c|c|} \\hline \\text{⌖} & \\varnothing 0.1 \\text{ M} & A & B & C \\\\ \\hline \\end{array}'
  },
  {
    id: 'concentricity',
    name: 'Concentricity',
    symbol: '◎',
    category: 'Location',
    description: 'ISO 1101 (Coaxiality): The extracted median line must be contained within a cylindrical zone coaxial with the datum axis. For Learners: Controls how well the axis of a feature aligns with a datum axis. The center axis of your feature must fall within a cylindrical zone perfectly centered on the datum.',
    latexExample: '\\begin{array}{|c|c|c|} \\hline \\text{◎} & \\varnothing 0.05 & A \\\\ \\hline \\end{array}'
  },
  {
    id: 'symmetry',
    name: 'Symmetry',
    symbol: '⌯',
    category: 'Location',
    description: 'ISO 1101: The extracted median surface must be contained within a zone symmetrically disposed about the datum median surface. For Learners: Controls how well a feature\'s center plane aligns with a datum center plane. The exact midpoint of your feature must fall within a tolerance zone perfectly centered on the datum.',
    latexExample: '\\begin{array}{|c|c|c|} \\hline \\text{⌯} & 0.1 & A \\\\ \\hline \\end{array}'
  },
  {
    id: 'circular-runout',
    name: 'Circular Runout',
    symbol: '↗',
    category: 'Runout',
    description: 'ISO 1101: The extracted line must be contained within a zone bounded by two coplanar concentric circles when rotated around the datum axis. For Learners: Measures the 2D "wobble" of a surface. At any single cross-section, the surface must stay within the tolerance zone when you spin the part 360 degrees.',
    latexExample: '\\begin{array}{|c|c|c|c|} \\hline \\text{↗} & 0.05 & A & B \\\\ \\hline \\end{array}'
  },
  {
    id: 'total-runout',
    name: 'Total Runout',
    symbol: '⌰',
    category: 'Runout',
    description: 'ISO 1101: The extracted surface must be contained within a zone bounded by two coaxial cylinders when rotated around the datum axis. For Learners: Measures the total 3D "wobble" of a surface. The entire cylindrical surface must stay within the tolerance zone when you spin the part 360 degrees.',
    latexExample: '\\begin{array}{|c|c|c|c|} \\hline \\text{⌰} & 0.1 & A & B \\\\ \\hline \\end{array}'
  }
];
