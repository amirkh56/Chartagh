import * as THREE from 'three';
import { starPoints } from '@/lib/patterns';

export const COLORS = {
  brick: '#E2492D',
  mid: '#B5391F',
  dark: '#7E2414',
  kahgel: '#F8DDD3',
  dood: '#24130E',
  firuzeh: '#22B8B0',
  lajvard: '#2C4FA0',
  sand: '#D9C5A0',
};

// A wall with a Persian pointed arch cut from its bottom edge. Shape lives in XY, y up from 0.
export function archWallShape(w, h, a = 0.56, spring = 1.05, apex = 1.78) {
  const s = new THREE.Shape();
  const x = w / 2;
  s.moveTo(-x, 0);
  s.lineTo(-a, 0);
  s.lineTo(-a, spring);
  s.bezierCurveTo(-a, spring + 0.42, -0.12, apex - 0.2, 0, apex);
  s.bezierCurveTo(0.12, apex - 0.2, a, spring + 0.42, a, spring);
  s.lineTo(a, 0);
  s.lineTo(x, 0);
  s.lineTo(x, h);
  s.lineTo(-x, h);
  s.closePath();
  return s;
}

export function starShape(R, n = 8) {
  const s = new THREE.Shape();
  starPoints(0, 0, R, n).forEach(([x, y], i) => (i ? s.lineTo(x, -y) : s.moveTo(x, -y)));
  s.closePath();
  return s;
}

export function starGeometry(R, depth = 0.14, n = 8) {
  return new THREE.ExtrudeGeometry(starShape(R, n), {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 2,
  }).center();
}

// Onion dome (گنبد پیازی) via lathe.
export function domeGeometry() {
  const pts = [new THREE.Vector2(0, 0), new THREE.Vector2(0.62, 0), new THREE.Vector2(0.62, 0.22)];
  for (let i = 0; i <= 28; i++) {
    const t = i / 28;
    const r = t < 0.45 ? 0.62 + 0.2 * Math.sin((t / 0.45) * (Math.PI / 2)) : 0.82 * Math.pow(Math.cos(((t - 0.45) / 0.55) * (Math.PI / 2)), 1.25);
    pts.push(new THREE.Vector2(Math.max(r, 0.001), 0.22 + t * 1.25));
  }
  pts.push(new THREE.Vector2(0, 1.62));
  return new THREE.LatheGeometry(pts, 40).center();
}

// Procedural brick texture (آجر) so the chartaq reads as real masonry.
export function brickTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#E9CDBF';
  g.fillRect(0, 0, 256, 256);
  const rows = 8;
  const bh = 256 / rows;
  const bw = 64;
  const tones = ['#C84B2E', '#BC4127', '#D25A3A', '#B33A22', '#C5522F', '#A9361F'];
  for (let r = 0; r < rows; r++) {
    const off = r % 2 ? bw / 2 : 0;
    for (let x = -bw; x < 256 + bw; x += bw) {
      g.fillStyle = tones[(r * 7 + ((x + 64) / bw) * 3) % tones.length];
      g.fillRect(x + off + 2, r * bh + 2, bw - 4, bh - 4);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}
