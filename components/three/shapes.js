import * as THREE from 'three';
import { starPoints } from '@/lib/patterns';

export const COLORS = {
  brick: '#E2492D',
  mid: '#B5391F',
  dark: '#7E2414',
  kahgel: '#F8DDD3',
  dood: '#24130E',
  firuzeh: '#2E9E95',
  sand: '#D9C5A0',
  terracotta: '#C0704C',
};

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
