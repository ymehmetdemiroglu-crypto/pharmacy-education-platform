import { StructureIdentifierConfig } from './schema';

export const structureIdentifierStandardDemo: StructureIdentifierConfig = {
  title: 'Identify the Hydrogen Bond Donor Pharmacophore',
  prompt: 'Select the heteroatom that acts as the essential hydrogen bond donor for beta-1 adrenergic receptor binding in propranolol.',
  moleculeName: 'Propranolol',
  smiles: 'CC(C)NCC(O)COC1=CC=CC2=CC=CC=C12',
  atoms: [
    { id: 'naph', label: 'Ar', x: 60, y: 120, isTarget: false, hintName: 'Naphthyl Ring' },
    { id: 'ether', label: 'O-Et', x: 130, y: 120, isTarget: false, hintName: 'Ether Oxygen' },
    { id: 'c_beta', label: 'C-OH', x: 200, y: 80, isTarget: false },
    { id: 'oh', label: 'OH', x: 200, y: 150, isTarget: true, hintName: 'Secondary Alcohol' },
    { id: 'nh', label: 'NH', x: 270, y: 120, isTarget: false, hintName: 'Secondary Amine' },
    { id: 'iprop', label: 'iPr', x: 340, y: 120, isTarget: false, hintName: 'Isopropyl Group' },
  ],
  bonds: [
    { from: 'naph', to: 'ether', order: 'single' },
    { from: 'ether', to: 'c_beta', order: 'single' },
    { from: 'c_beta', to: 'oh', order: 'single' },
    { from: 'c_beta', to: 'nh', order: 'single' },
    { from: 'nh', to: 'iprop', order: 'single' },
  ],
  targetDescription: 'Chiral secondary alcohol (-OH) donor',
  explanation:
    'The (S)-enantiomer secondary beta-hydroxyl group donates a crucial stereoselective hydrogen bond to Asn293 / Ser211 in the beta-adrenergic receptor pocket, conferring 100-fold greater affinity over the (R)-isomer.',
  source: {
    file: '2-reseptrler.pdf',
    page: 25,
  },
};
