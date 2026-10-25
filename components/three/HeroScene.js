'use client';
import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { archWallShape, brickTexture, COLORS as C, domeGeometry, starGeometry } from './shapes';

const T = 0.16; // wall thickness
const CS = 2.16 / 3; // roof cell size
// roof «۴»: kahgel cells stay flat, the rest rise like a crown (تاج)
const LIGHT = new Set(['0,2', '1,2', '2,1']);
const damp = THREE.MathUtils.damp;

function Chartaq({ ctl, night }) {
  const g = useRef();
  // narrow (portrait) canvases get a smaller chartaq so it never crowds the frame
  const fit = useThree((st) => Math.min(0.86, st.viewport.width / 6.4));
  const lamp = useRef();
  const { front, side, wall, roof, crown, cellMat } = useMemo(() => {
    const opts = { depth: T, bevelEnabled: false, curveSegments: 28 };
    return {
      front: new THREE.ExtrudeGeometry(archWallShape(2, 2.1, 0.56), opts),
      side: new THREE.ExtrudeGeometry(archWallShape(2 - 2 * T, 2.1, 0.5), opts),
      wall: new THREE.MeshStandardMaterial({ map: brickTexture(), roughness: 0.9 }),
      roof: new THREE.MeshStandardMaterial({ color: C.mid, roughness: 0.7 }),
      crown: new THREE.MeshStandardMaterial({ color: C.brick, roughness: 0.55 }),
      cellMat: new THREE.MeshPhysicalMaterial({ color: C.kahgel, roughness: 0.3, clearcoat: 1 }),
    };
  }, []);

  const cells = useMemo(() => {
    const out = [];
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) out.push({ i, j, x: (i - 1) * CS, z: (j - 1) * CS, light: LIGHT.has(`${i},${j}`) });
    return out;
  }, []);

  useFrame((state, dt) => {
    dt = Math.min(dt, 0.05);
    const c = ctl.current;
    c.vel *= Math.pow(0.08, dt);
    c.rot += (0.2 + c.vel) * dt;
    c.jv += (-c.jy * 70 - c.jv * 9) * dt;
    c.jy += c.jv * dt;
    const o = g.current;
    o.rotation.y = c.rot + state.pointer.x * 0.45;
    o.rotation.x = damp(o.rotation.x, -state.pointer.y * 0.2 + 0.1, 4, dt);
    o.position.y = c.jy;
    if (lamp.current) lamp.current.intensity = damp(lamp.current.intensity, night ? 5 : 0, 3, dt);
  });

  return (
    <group ref={g} rotation={[0.1, Math.PI / 4, 0]} scale={fit}>
      <group position={[0, -1.3, 0]}>
        <mesh geometry={front} material={wall} position={[0, 0, 1 - T]} />
        <mesh geometry={front} material={wall} position={[0, 0, -(1 - T)]} rotation={[0, Math.PI, 0]} />
        <mesh geometry={side} material={wall} position={[1 - T, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
        <mesh geometry={side} material={wall} position={[-(1 - T), 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
        <mesh material={roof} position={[0, 2.21, 0]}>
          <boxGeometry args={[2.16, 0.22, 2.16]} />
        </mesh>
        {cells.map((c) =>
          c.light ? (
            <mesh key={`${c.i}${c.j}`} material={cellMat} position={[c.x, 2.326, c.z]}>
              <boxGeometry args={[CS * 0.96, 0.012, CS * 0.96]} />
            </mesh>
          ) : (
            <mesh key={`${c.i}${c.j}`} material={crown} position={[c.x, 2.4, c.z]}>
              <boxGeometry args={[CS, 0.16, CS]} />
            </mesh>
          )
        )}
        {/* lantern under the dome — glows at night */}
        <mesh position={[0, 1.5, 0]}>
          <octahedronGeometry args={[0.14]} />
          <meshStandardMaterial color="#FFC98A" emissive="#FF9F43" emissiveIntensity={night ? 2.2 : 0.2} />
        </mesh>
        <pointLight ref={lamp} position={[0, 1.4, 0]} color="#FFB060" intensity={0} distance={6} decay={1.4} />
      </group>
    </group>
  );
}

const FLOATERS = [
  { type: 'star', pos: [-2.5, 1.35, -0.6], color: C.firuzeh, s: 0.5 },
  { type: 'star', pos: [2.55, -1.05, 0.3], color: C.lajvard, s: 0.38 },
  { type: 'dome', pos: [2.35, 1.45, -1.1], color: C.firuzeh, s: 0.55 },
  { type: 'gem', pos: [-2.55, -1.25, 0.5], color: C.brick, s: 0.32 },
  { type: 'arch', pos: [-1.65, -2.05, -1.4], color: C.kahgel, s: 0.42 },
  { type: 'gem', pos: [1.25, 2.35, -1.6], color: C.lajvard, s: 0.24 },
  { type: 'star', pos: [0.15, -2.45, -2], color: C.sand, s: 0.3 },
  { type: 'dome', pos: [-1.15, 2.4, -2.2], color: C.lajvard, s: 0.32 },
];

function Floaters({ ctl }) {
  const g = useRef();
  const geos = useMemo(
    () => ({
      star: starGeometry(0.5),
      dome: domeGeometry(),
      gem: new THREE.OctahedronGeometry(0.6),
      arch: new THREE.ExtrudeGeometry(archWallShape(1.2, 1.5, 0.34, 0.65, 1.2), { depth: 0.14, bevelEnabled: false }).center(),
    }),
    []
  );
  const mats = useMemo(() => {
    const m = {};
    FLOATERS.forEach((f) => (m[f.color] ??= new THREE.MeshPhysicalMaterial({ color: f.color, roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.15 })));
    return m;
  }, []);

  useFrame((state, dt) => {
    dt = Math.min(dt, 0.05);
    const c = ctl.current;
    c.pulse = damp(c.pulse, 0, 2.5, dt);
    const o = g.current;
    o.position.x = damp(o.position.x, -state.pointer.x * 0.35, 2.5, dt);
    o.position.y = damp(o.position.y, -state.pointer.y * 0.25, 2.5, dt);
    o.scale.setScalar(1 + c.pulse * 0.3);
    o.rotation.z += c.pulse * dt * 2;
  });

  return (
    <group ref={g}>
      {FLOATERS.map((f, i) => (
        <Float key={i} speed={1.3 + (i % 4) * 0.35} rotationIntensity={1.4} floatIntensity={1.3}>
          <mesh geometry={geos[f.type]} material={mats[f.color]} position={f.pos} scale={f.s} rotation={[0.4 * i, 0.7 * i, 0]} />
        </Float>
      ))}
    </group>
  );
}

// a slow orbit of tiny glazed tiles around the chartaq
function Orbit() {
  const g = useRef();
  const geo = useMemo(() => starGeometry(0.09, 0.04), []);
  const items = useMemo(() => Array.from({ length: 14 }, (_, i) => i), []);
  useFrame((_, dt) => (g.current.rotation.y -= Math.min(dt, 0.05) * 0.35));
  return (
    <group ref={g} rotation={[0.35, 0, 0.12]}>
      {items.map((i) => {
        const a = (i / items.length) * Math.PI * 2;
        return (
          <mesh key={i} geometry={geo} position={[Math.cos(a) * 2.35, Math.sin(a * 3) * 0.15, Math.sin(a) * 2.35]} rotation={[0, -a, 0]}>
            <meshStandardMaterial color={i % 2 ? C.firuzeh : C.kahgel} roughness={0.4} />
          </mesh>
        );
      })}
    </group>
  );
}

function MouseLight({ night }) {
  const l = useRef();
  useFrame((state, dt) => {
    l.current.position.x = damp(l.current.position.x, state.pointer.x * 5, 4, dt);
    l.current.position.y = damp(l.current.position.y, state.pointer.y * 3.5, 4, dt);
  });
  return <pointLight ref={l} position={[0, 0, 3.2]} color={night ? '#22B8B0' : '#FFE7D6'} intensity={night ? 14 : 9} distance={12} decay={1.6} />;
}

export default function HeroScene({ active = true, night = false }) {
  const wrap = useRef(null);
  const ctl = useRef({ rot: Math.PI / 4, vel: 0, jy: 0, jv: 0, pulse: 0 });

  // drag to spin, click to make it hop
  useEffect(() => {
    const el = wrap.current;
    let down = null;
    const pd = (e) => (down = { x: e.clientX, y: e.clientY, moved: 0 });
    const pm = (e) => {
      if (!down) return;
      const dx = e.clientX - down.x;
      down.moved += Math.abs(dx);
      down.x = e.clientX;
      ctl.current.vel = THREE.MathUtils.clamp(ctl.current.vel + dx * 0.06, -12, 12);
    };
    const pu = () => {
      if (down && down.moved < 6) {
        ctl.current.jv = 4.5;
        ctl.current.vel += 7;
        ctl.current.pulse = 1;
      }
      down = null;
    };
    el.addEventListener('pointerdown', pd);
    window.addEventListener('pointermove', pm, { passive: true });
    window.addEventListener('pointerup', pu);
    return () => {
      el.removeEventListener('pointerdown', pd);
      window.removeEventListener('pointermove', pm);
      window.removeEventListener('pointerup', pu);
    };
  }, []);

  return (
    <div ref={wrap} className="scene">
      <Canvas
        flat
        dpr={[1, 1.75]}
        frameloop={active ? 'always' : 'never'}
        camera={{ position: [0, 2.6, 8.6], fov: 36 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ camera }) => camera.lookAt(0, -0.2, 0)}
        aria-label="چارطاق سه‌بعدی؛ بکش تا بچرخه، کلیک کن تا بپره"
      >
        <ambientLight intensity={night ? 0.45 : 0.95} />
        <hemisphereLight args={[night ? '#3a4f9a' : '#fff4ea', night ? '#160b08' : '#c9a58c', night ? 0.6 : 0.8]} />
        <directionalLight position={[4, 6, 5]} intensity={night ? 1.1 : 2.2} color={night ? '#c9d6ff' : '#fff1e0'} />
        <directionalLight position={[-5, 2, -3]} intensity={night ? 0.6 : 0.7} color={C.firuzeh} />
        <MouseLight night={night} />
        <Chartaq ctl={ctl} night={night} />
        <Orbit />
        <Floaters ctl={ctl} />
        <ContactShadows position={[0, -1.4, 0]} opacity={night ? 0.6 : 0.35} blur={2.6} scale={9} far={3} color={night ? '#000000' : '#7E2414'} />
      </Canvas>
    </div>
  );
}
