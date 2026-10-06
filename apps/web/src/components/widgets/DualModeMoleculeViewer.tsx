import React, { useState, useEffect, useRef } from 'react';
import { Segmented, Tag, Typography, Tooltip } from 'antd';
import { CompassOutlined, ExperimentOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { realtimeTelemetry } from '../../services/realtimeTelemetryService';

const { Text } = Typography;

export interface MoleculeData {
  id: string;
  name: string;
  chemicalName: string;
  formula: string;
  smiles: string;
  slide: number;
  description: string;
  bindingSites: {
    group: string;
    interactionType: string;
    targetOnReceptor: string;
    slide: number;
  }[];
  atoms: {
    id: number;
    element: 'C' | 'N' | 'O' | 'H' | 'Cl' | 'P';
    x: number;
    y: number;
    z: number;
    color: string;
    radius: number;
    name: string;
  }[];
  bonds: [number, number, number][];
  svg2D: React.ReactNode;
}

export const MOLECULES: Record<string, MoleculeData> = {
  dibucaine: {
    id: 'dibucaine',
    name: 'Dibukain (Entegrasyon)',
    chemicalName: '2-Bütoksi-N-[2-(dietilamino)etil]kinolin-4-karboksamit',
    formula: 'C20H29N3O2',
    smiles: 'CCN(CC)CCOC(=O)c1c(OCCCC)nc2ccccc21',
    slide: 33,
    description: 'Slayt 33 entegrasyon örneği: Tek bir molekül üzerinde Van der Waals, hidrojen bağı, iyonik ve yük transferi mekanizmalarının tamamını sergiler.',
    bindingSites: [
      { group: 'Kinolin Aromatik Çekirdeği', interactionType: 'Yük Transferi & Pi-Pi', targetOnReceptor: 'Reseptör aromatik düzlemi', slide: 33 },
      { group: 'Bütoksi Yan Zinciri (-O(CH2)3CH3)', interactionType: 'Van der Waals & Hidrofobik', targetOnReceptor: 'Lipofilik membran cebi', slide: 33 },
      { group: 'Amit Grubu (-CONH-)', interactionType: 'Hidrojen Bağı & Dipol', targetOnReceptor: 'Peptit omurga karbonil/NH', slide: 33 },
      { group: 'Tersiyer Dietilamino (-N(C2H5)2)', interactionType: 'İyonik & İyon-Dipol', targetOnReceptor: 'Reseptör anyonik aspartat/glutamat', slide: 33 },
    ],
    atoms: [
      { id: 0, element: 'N', x: -0.5, y: -0.7, z: 0.0, color: '#3B82F6', radius: 17, name: 'Kinolin Azotu' },
      { id: 1, element: 'C', x: 0.7, y: -1.1, z: 0.0, color: '#4B5563', radius: 15, name: 'C2 (Bütoksi)' },
      { id: 2, element: 'C', x: 1.8, y: -0.3, z: 0.0, color: '#4B5563', radius: 15, name: 'C3' },
      { id: 3, element: 'C', x: 1.6, y: 1.1, z: 0.0, color: '#4B5563', radius: 15, name: 'C4 (Amit)' },
      { id: 4, element: 'C', x: 0.4, y: 1.6, z: 0.0, color: '#4B5563', radius: 15, name: 'C4a' },
      { id: 5, element: 'C', x: -0.7, y: 0.7, z: 0.0, color: '#4B5563', radius: 15, name: 'C8a' },
      { id: 6, element: 'C', x: -2.0, y: 1.1, z: 0.0, color: '#4B5563', radius: 15, name: 'C8' },
      { id: 7, element: 'C', x: -3.0, y: 0.2, z: 0.0, color: '#4B5563', radius: 15, name: 'C7' },
      { id: 8, element: 'C', x: -2.8, y: -1.2, z: 0.0, color: '#4B5563', radius: 15, name: 'C6' },
      { id: 9, element: 'C', x: -1.6, y: -1.6, z: 0.0, color: '#4B5563', radius: 15, name: 'C5' },
      { id: 10, element: 'O', x: 1.0, y: -2.4, z: 0.1, color: '#EF4444', radius: 16, name: 'Bütoksi Oksijeni' },
      { id: 11, element: 'C', x: 2.3, y: -2.9, z: 0.2, color: '#4B5563', radius: 14, name: 'Bütil C1' },
      { id: 12, element: 'C', x: 2.4, y: -4.3, z: -0.1, color: '#4B5563', radius: 14, name: 'Bütil C2' },
      { id: 13, element: 'C', x: 3.7, y: -4.9, z: 0.1, color: '#4B5563', radius: 14, name: 'Bütil C3' },
      { id: 14, element: 'C', x: 3.8, y: -6.3, z: -0.2, color: '#4B5563', radius: 14, name: 'Bütil C4' },
      { id: 15, element: 'C', x: 2.8, y: 1.9, z: 0.1, color: '#4B5563', radius: 15, name: 'Karbonil Karbonu' },
      { id: 16, element: 'O', x: 3.9, y: 1.4, z: 0.2, color: '#EF4444', radius: 16, name: 'Amit Oksijeni' },
      { id: 17, element: 'N', x: 2.6, y: 3.2, z: 0.1, color: '#3B82F6', radius: 16, name: 'Amit Azotu' },
      { id: 18, element: 'C', x: 3.7, y: 4.1, z: 0.2, color: '#4B5563', radius: 14, name: 'Zincir C1' },
      { id: 19, element: 'C', x: 3.4, y: 5.5, z: -0.2, color: '#4B5563', radius: 14, name: 'Zincir C2' },
      { id: 20, element: 'N', x: 4.5, y: 6.4, z: 0.1, color: '#3B82F6', radius: 18, name: 'Tersiyer Amin' },
    ],
    bonds: [
      [0, 1, 2], [1, 2, 1], [2, 3, 2], [3, 4, 1], [4, 5, 2], [5, 0, 1],
      [5, 6, 1], [6, 7, 2], [7, 8, 1], [8, 9, 2], [9, 0, 1],
      [1, 10, 1], [10, 11, 1], [11, 12, 1], [12, 13, 1], [13, 14, 1],
      [3, 15, 1], [15, 16, 2], [15, 17, 1], [17, 18, 1], [18, 19, 1], [19, 20, 1],
    ],
    svg2D: (
      <svg viewBox="0 0 400 170" className="w-full h-40">
        <polygon points="120,85 145,50 185,50 205,85 185,120 145,120" fill="none" stroke="currentColor" strokeWidth="2" />
        <polygon points="65,85 85,50 125,50 145,85 125,120 85,120" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="140" y="55" className="text-xs font-mono font-bold fill-blue-500">N</text>
        <line x1="185" y1="120" x2="210" y2="145" stroke="currentColor" strokeWidth="2" />
        <text x="215" y="150" className="text-xs font-mono fill-red-500 font-bold">O–(CH2)3–CH3</text>
        <line x1="185" y1="50" x2="220" y2="30" stroke="currentColor" strokeWidth="2" />
        <text x="225" y="32" className="text-xs font-mono font-bold fill-red-500">C=O</text>
        <line x1="240" y1="32" x2="265" y2="45" stroke="currentColor" strokeWidth="2" />
        <text x="270" y="50" className="text-xs font-mono font-bold fill-blue-500">NH–CH2CH2–N(C2H5)2</text>
        <rect x="10" y="10" width="130" height="20" rx="4" className="fill-purple-500/10 stroke-purple-500" strokeWidth="1" />
        <text x="15" y="24" className="text-[10px] font-mono fill-purple-500 font-bold">Pi-Pi / Yük Transferi</text>
        <rect x="250" y="80" width="135" height="20" rx="4" className="fill-blue-500/10 stroke-blue-500" strokeWidth="1" />
        <text x="255" y="94" className="text-[10px] font-mono fill-blue-500 font-bold">İyonik Bağ (S33)</text>
      </svg>
    ),
  },
  procaine: {
    id: 'procaine',
    name: 'Prokain (Ester Grubu)',
    chemicalName: '2-(Dietilamino)etil 4-aminobenzoat',
    formula: 'C13H20N2O2',
    smiles: 'CCN(CC)CCOC(=O)c1ccc(N)cc1',
    slide: 31,
    description: 'Slayt 31: Klasik ester tipi lokal anestezik. Ester köprüsü plazma psödokolinesterazı ile hızla hidroliz edilir (kısa etki süresi).',
    bindingSites: [
      { group: 'Aromatik Primer Amin (-NH2)', interactionType: 'H-Bağı Donörü & Dipol', targetOnReceptor: 'Reseptör H-akseptör cebi', slide: 31 },
      { group: 'Ester Köprüsü (-COO-)', interactionType: 'Dipol & H-Akseptör (Hızlı Hidroliz)', targetOnReceptor: 'Plazma esterazları', slide: 31 },
      { group: 'Tersiyer Dietilamino (-N(C2H5)2)', interactionType: 'İyonik Bağ (Aspartat)', targetOnReceptor: 'Reseptör anyonik bölge', slide: 31 },
    ],
    atoms: [
      { id: 0, element: 'N', x: -4.5, y: 0.0, z: 0.0, color: '#3B82F6', radius: 17, name: 'Primer Amin N' },
      { id: 1, element: 'C', x: -3.2, y: 0.0, z: 0.0, color: '#4B5563', radius: 15, name: 'C4 Benzen' },
      { id: 2, element: 'C', x: -2.5, y: 1.2, z: 0.0, color: '#4B5563', radius: 15, name: 'C3 Benzen' },
      { id: 3, element: 'C', x: -1.1, y: 1.2, z: 0.0, color: '#4B5563', radius: 15, name: 'C2 Benzen' },
      { id: 4, element: 'C', x: -0.4, y: 0.0, z: 0.0, color: '#4B5563', radius: 15, name: 'C1 Benzen' },
      { id: 5, element: 'C', x: -1.1, y: -1.2, z: 0.0, color: '#4B5563', radius: 15, name: 'C6 Benzen' },
      { id: 6, element: 'C', x: -2.5, y: -1.2, z: 0.0, color: '#4B5563', radius: 15, name: 'C5 Benzen' },
      { id: 7, element: 'C', x: 1.0, y: 0.0, z: 0.0, color: '#4B5563', radius: 15, name: 'Karbonil Karbonu' },
      { id: 8, element: 'O', x: 1.6, y: 1.1, z: 0.0, color: '#EF4444', radius: 16, name: 'Karbonil Oksijeni (=O)' },
      { id: 9, element: 'O', x: 1.8, y: -1.1, z: 0.0, color: '#EF4444', radius: 16, name: 'Ester Oksijeni (-O-)' },
      { id: 10, element: 'C', x: 3.1, y: -0.8, z: 0.1, color: '#4B5563', radius: 14, name: 'Etil C1' },
      { id: 11, element: 'C', x: 4.0, y: -1.9, z: -0.1, color: '#4B5563', radius: 14, name: 'Etil C2' },
      { id: 12, element: 'N', x: 5.3, y: -1.5, z: 0.0, color: '#3B82F6', radius: 18, name: 'Tersiyer Amin' },
    ],
    bonds: [
      [0, 1, 1], [1, 2, 2], [2, 3, 1], [3, 4, 2], [4, 5, 1], [5, 6, 2], [6, 1, 1],
      [4, 7, 1], [7, 8, 2], [7, 9, 1], [9, 10, 1], [10, 11, 1], [11, 12, 1],
    ],
    svg2D: (
      <svg viewBox="0 0 380 150" className="w-full h-36">
        <text x="15" y="75" className="text-xs font-mono font-bold fill-blue-500">H2N</text>
        <line x1="45" y1="70" x2="70" y2="70" stroke="currentColor" strokeWidth="2" />
        <polygon points="90,70 105,45 135,45 150,70 135,95 105,95" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="150" y1="70" x2="180" y2="70" stroke="currentColor" strokeWidth="2" />
        <line x1="180" y1="70" x2="180" y2="45" stroke="currentColor" strokeWidth="2" />
        <text x="175" y="40" className="text-xs font-mono font-bold fill-red-500">O</text>
        <line x1="180" y1="70" x2="205" y2="85" stroke="currentColor" strokeWidth="2" />
        <text x="210" y="90" className="text-xs font-mono font-bold fill-red-500">O</text>
        <line x1="225" y1="85" x2="255" y2="70" stroke="currentColor" strokeWidth="2" />
        <line x1="255" y1="70" x2="285" y2="85" stroke="currentColor" strokeWidth="2" />
        <text x="290" y="90" className="text-xs font-mono font-bold fill-blue-500">N(C2H5)2</text>
        <rect x="160" y="105" width="140" height="22" rx="4" className="fill-amber-500/10 stroke-amber-500" strokeWidth="1" />
        <text x="165" y="120" className="text-[10px] font-mono fill-amber-600 font-bold">Ester: Hızlı Hidroliz (S31)</text>
      </svg>
    ),
  },
  lidocaine: {
    id: 'lidocaine',
    name: 'Lidokain (Amit Grubu)',
    chemicalName: '2-(Dietilamino)-N-(2,6-dimetilfenil)asetamit',
    formula: 'C14H22N2O',
    smiles: 'CCN(CC)CC(=O)Nc1c(C)cccc1C',
    slide: 32,
    description: 'Slayt 32: Amit tipi lokal anestezik prototipi. Orto metil gruplarının oluşturduğu sterik engel sayesinde esterazlara dirençlidir (uzun etki süresi).',
    bindingSites: [
      { group: '2,6-Dimetilfenil Çekirdeği', interactionType: 'Sterik Engel & Pi-Pi', targetOnReceptor: 'Reseptör hidrofobik cebi', slide: 32 },
      { group: 'Amit Grubu (-CONH-)', interactionType: 'H-Bağı Donör/Akseptör (Stabil)', targetOnReceptor: 'Peptit omurga', slide: 32 },
      { group: 'Tersiyer Dietilamino (-N(C2H5)2)', interactionType: 'İyonik & İyon-Dipol', targetOnReceptor: 'Aspartat anyonu', slide: 32 },
    ],
    atoms: [
      { id: 0, element: 'C', x: -3.0, y: 0.0, z: 0.0, color: '#4B5563', radius: 15, name: 'C1 Fenil' },
      { id: 1, element: 'C', x: -2.3, y: 1.2, z: 0.0, color: '#4B5563', radius: 15, name: 'C2 (Metil)' },
      { id: 2, element: 'C', x: -0.9, y: 1.2, z: 0.0, color: '#4B5563', radius: 15, name: 'C3' },
      { id: 3, element: 'C', x: -0.2, y: 0.0, z: 0.0, color: '#4B5563', radius: 15, name: 'C4' },
      { id: 4, element: 'C', x: -0.9, y: -1.2, z: 0.0, color: '#4B5563', radius: 15, name: 'C5' },
      { id: 5, element: 'C', x: -2.3, y: -1.2, z: 0.0, color: '#4B5563', radius: 15, name: 'C6 (Metil)' },
      { id: 6, element: 'C', x: -3.0, y: 2.4, z: 0.1, color: '#4B5563', radius: 13, name: 'Orto Metil 1' },
      { id: 7, element: 'C', x: -3.0, y: -2.4, z: 0.1, color: '#4B5563', radius: 13, name: 'Orto Metil 2' },
      { id: 8, element: 'N', x: -4.4, y: 0.0, z: 0.0, color: '#3B82F6', radius: 16, name: 'Amit Azotu (NH)' },
      { id: 9, element: 'C', x: -5.3, y: 1.1, z: 0.1, color: '#4B5563', radius: 15, name: 'Karbonil C' },
      { id: 10, element: 'O', x: -5.0, y: 2.3, z: 0.1, color: '#EF4444', radius: 16, name: 'Amit Oksijeni' },
      { id: 11, element: 'C', x: -6.7, y: 0.6, z: 0.0, color: '#4B5563', radius: 14, name: 'Metilen CH2' },
      { id: 12, element: 'N', x: -7.7, y: 1.6, z: 0.0, color: '#3B82F6', radius: 18, name: 'Tersiyer Amin' },
    ],
    bonds: [
      [0, 1, 2], [1, 2, 1], [2, 3, 2], [3, 4, 1], [4, 5, 2], [5, 0, 1],
      [1, 6, 1], [5, 7, 1], [0, 8, 1], [8, 9, 1], [9, 10, 2], [9, 11, 1], [11, 12, 1],
    ],
    svg2D: (
      <svg viewBox="0 0 380 150" className="w-full h-36">
        <polygon points="90,70 105,45 135,45 150,70 135,95 105,95" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="105" y1="45" x2="95" y2="25" stroke="currentColor" strokeWidth="2" />
        <text x="85" y="20" className="text-[11px] font-mono fill-gray-500">CH3</text>
        <line x1="105" y1="95" x2="95" y2="115" stroke="currentColor" strokeWidth="2" />
        <text x="85" y="130" className="text-[11px] font-mono fill-gray-500">CH3</text>
        <line x1="150" y1="70" x2="180" y2="70" stroke="currentColor" strokeWidth="2" />
        <text x="185" y="75" className="text-xs font-mono font-bold fill-blue-500">NH</text>
        <line x1="205" y1="70" x2="230" y2="70" stroke="currentColor" strokeWidth="2" />
        <line x1="230" y1="70" x2="230" y2="45" stroke="currentColor" strokeWidth="2" />
        <text x="225" y="40" className="text-xs font-mono font-bold fill-red-500">O</text>
        <line x1="230" y1="70" x2="260" y2="70" stroke="currentColor" strokeWidth="2" />
        <text x="265" y="75" className="text-xs font-mono font-bold fill-blue-500">CH2–N(C2H5)2</text>
        <rect x="150" y="105" width="160" height="22" rx="4" className="fill-emerald-500/10 stroke-emerald-500" strokeWidth="1" />
        <text x="155" y="120" className="text-[10px] font-mono fill-emerald-600 font-bold">Amit: Esteraz Direnci (S32)</text>
      </svg>
    ),
  },
};

interface DualModeMoleculeViewerProps {
  initialMolecule?: string;
  onAskAboutSite?: (siteText: string) => void;
}

export const DualModeMoleculeViewer: React.FC<DualModeMoleculeViewerProps> = ({
  initialMolecule = 'dibucaine',
  onAskAboutSite,
}) => {
  const [selectedKey, setSelectedKey] = useState<string>(initialMolecule);
  const [mode, setMode] = useState<'2d' | '3d'>('3d');
  const [zoom, setZoom] = useState(1);

  // Rotation angles (radians)
  const [rotX, setRotX] = useState(0.3);
  const [rotY, setRotY] = useState(0.5);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const molecule: MoleculeData = MOLECULES[selectedKey] ?? MOLECULES.dibucaine!;

  // Smooth continuous ambient spin when not dragging
  useEffect(() => {
    if (mode !== '3d') return;
    const interval = setInterval(() => {
      if (!isDragging.current) {
        setRotY((prev) => (prev + 0.008) % (Math.PI * 2));
      }
    }, 35);
    return () => clearInterval(interval);
  }, [mode]);

  // Render 3D Canvas
  useEffect(() => {
    if (mode !== '3d' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const scale = 34 * zoom;

    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);

    // Project atoms
    const projected = molecule.atoms.map((atom) => {
      const x1 = atom.x * cosY + atom.z * sinY;
      const z1 = -atom.x * sinY + atom.z * cosY;
      const y2 = atom.y * cosX - z1 * sinX;
      const z2 = atom.y * sinX + z1 * cosX;

      const px = cx + x1 * scale;
      const py = cy - y2 * scale;
      const r = Math.max(8, atom.radius * (1 + z2 * 0.08) * zoom * 0.85);

      return {
        ...atom,
        px,
        py,
        pz: z2,
        r,
      };
    });

    // Draw Bonds
    molecule.bonds.forEach(([idA, idB, order]) => {
      const a = projected.find((p) => p.id === idA);
      const b = projected.find((p) => p.id === idB);
      if (!a || !b) return;

      const avgZ = (a.pz + b.pz) / 2;
      const alpha = Math.max(0.3, Math.min(1, 0.7 + avgZ * 0.08));

      ctx.save();
      ctx.strokeStyle = `rgba(100, 116, 139, ${alpha})`;
      ctx.lineWidth = order === 2 ? 5 : 3;
      ctx.beginPath();
      ctx.moveTo(a.px, a.py);
      ctx.lineTo(b.px, b.py);
      ctx.stroke();

      if (order === 2) {
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(a.px, a.py);
        ctx.lineTo(b.px, b.py);
        ctx.stroke();
      }
      ctx.restore();
    });

    // Sort atoms by Z depth for realistic occlusion
    const sortedAtoms = [...projected].sort((a, b) => a.pz - b.pz);

    // Draw Atoms with 3D Spherical Shading
    sortedAtoms.forEach((atom) => {
      ctx.save();
      const grad = ctx.createRadialGradient(
        atom.px - atom.r * 0.35,
        atom.py - atom.r * 0.35,
        atom.r * 0.1,
        atom.px,
        atom.py,
        atom.r
      );
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(0.3, atom.color);
      grad.addColorStop(1, '#0F172A');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(atom.px, atom.py, atom.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = `bold ${Math.max(10, Math.round(atom.r * 0.8))}px "JetBrains Mono", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(atom.element, atom.px, atom.py);

      ctx.restore();
    });
  }, [mode, rotX, rotY, zoom, molecule]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    setRotY((prev) => prev + dx * 0.015);
    setRotX((prev) => Math.max(-1.4, Math.min(1.4, prev + dy * 0.015)));
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 dark:border-[#2F2F2F] bg-white dark:bg-[#171717] p-4 sm:p-5 shadow-xs transition-colors">
      {/* Top Bar: Clean Molecule Tabs & 2D/3D Toggle (Gesture Based, Zero Clutter) */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-[#2F2F2F] pb-3">
        <Segmented
          value={selectedKey}
          onChange={(val) => {
            const key = val as string;
            setSelectedKey(key);
            realtimeTelemetry.emitTelemetry({
              widgetId: 'molecule_viewer',
              action: 'molecule_changed',
              summary: `Öğrenci aktif molekülü değiştirdi: ${key === 'dibucaine' ? 'Dibukain (Slayt 33)' : key === 'procaine' ? 'Prokain (Slayt 31)' : 'Lidokain (Slayt 32)'}`,
              metrics: { moleculeId: key },
            });
          }}
          options={[
            { label: 'Dibukain (Slayt 33)', value: 'dibucaine' },
            { label: 'Prokain (Slayt 31)', value: 'procaine' },
            { label: 'Lidokain (Slayt 32)', value: 'lidocaine' },
          ]}
        />

        <Segmented
          value={mode}
          onChange={(val) => setMode(val as '2d' | '3d')}
          options={[
            { label: '3D WebGL', value: '3d' },
            { label: '2D Yapı', value: '2d' },
          ]}
        />
      </div>

      {/* Main Visual Display */}
      <div
        className="relative rounded-xl bg-slate-50 dark:bg-[#212121] border border-slate-200 dark:border-[#2F2F2F] flex items-center justify-center min-h-[260px] overflow-hidden"
        onWheel={(e) => {
          if (mode === '3d') {
            e.preventDefault();
            setZoom((z) => Math.max(0.6, Math.min(2.0, z - e.deltaY * 0.001)));
          }
        }}
      >
        {mode === '3d' ? (
          <div
            className="w-full flex flex-col items-center cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <canvas
              ref={canvasRef}
              width={540}
              height={260}
              className="w-full max-w-[540px] h-[260px]"
            />
            <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 bg-black/60 dark:bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-xl text-[11px] font-mono pointer-events-none">
              <CompassOutlined className="text-blue-400" />
              <span>Sürükle: Döndür • Tekerlek: Yakınlaştır</span>
            </div>
          </div>
        ) : (
          <div className="w-full p-4 flex items-center justify-center">
            {molecule.svg2D}
          </div>
        )}
      </div>

      {/* Molecule Details & Functional Pharmacophore Groups */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-1">
          <div>
            <span className="font-bold text-sm text-slate-900 dark:text-white">{molecule.name}</span>
            <span className="ml-2 font-mono text-xs text-gray-500">{molecule.formula}</span>
          </div>
          <Text
            copyable={{ text: molecule.smiles, tooltips: ['SMILES Kopyala', 'Kopyalandı!'] }}
            code
            className="text-[11px] max-w-[260px] truncate"
          >
            {molecule.smiles}
          </Text>
        </div>

        <p className="text-xs text-gray-600 dark:text-gray-400 m-0">{molecule.description}</p>

        {/* Pharmacophore Interaction Badges */}
        <div className="mt-2 flex flex-col gap-1.5">
          <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
            Bağlanma Bölgeleri (Tıkla ve Tutor'a Sor):
          </span>
          <div className="flex flex-wrap gap-2">
            {molecule.bindingSites.map((site, idx) => (
              <Tooltip
                key={idx}
                title={`Slayt ${site.slide} • Hedef: ${site.targetOnReceptor} (Tıkla: Sokratik Eğitmene Sor)`}
                placement="top"
              >
                <button
                  type="button"
                  onClick={() => {
                    const query = `${molecule.name} molekülündeki ${site.group} (${site.interactionType}) nasıl etki gösterir?`;
                    realtimeTelemetry.emitTelemetry({
                      widgetId: 'molecule_viewer',
                      action: 'pharmacophore_clicked',
                      summary: `Öğrenci ${molecule.name} üzerindeki ${site.group} (${site.interactionType}) bölgesini inceledi [Slayt ${site.slide}].`,
                      metrics: { moleculeId: molecule.id, group: site.group, interactionType: site.interactionType, slide: site.slide },
                    });
                    onAskAboutSite?.(query);
                  }}
                  className="group flex items-center gap-1.5 text-xs bg-slate-50 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-700 hover:border-blue-400 rounded-xl px-3 py-1.5 transition-all text-start cursor-pointer shadow-sm"
                >
                  <ExperimentOutlined className="text-blue-500 opacity-70 group-hover:opacity-100" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{site.group}</span>
                  <Tag color="blue" className="text-[10px] m-0 border-0 rounded-lg">
                    {site.interactionType}
                  </Tag>
                </button>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
