'use client';
import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS as C, starGeometry } from './shapes';

const damp = THREE.MathUtils.damp;

// A 3D شمسه: rings of glazed tiles turning against each other like a minakari medallion.
function Medallion({ ctl }) {
  const g = useRef();
  const rings = [useRef(), useRef(), useRef(), useRef()];
  const geo = useMemo(
    () => ({
      big: starGeometry(1.05, 0.3),
      mid: starGeometry(0.62, 0.34),
      small: starGeometry(0.2, 0.08),
      gem: new THREE.OctahedronGeometry(0.17),
      dot: new THREE.SphereGeometry(0.055, 12, 12),
      ring: new THREE.TorusGeometry(2.62, 0.028, 8, 120),
      ring2: new THREE.TorusGeometry(1.32, 0.02, 8, 90),
    }),
    []
  );
  const mat = useMemo(() => {
    const glaze = (color) => new THREE.MeshPhysicalMaterial({ color, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.12 });
    // warm brick family, one small turquoise accent
    return { brick: glaze(C.brick), kahgel: glaze(C.kahgel), firuzeh: glaze(C.terracotta), lajvard: glaze(C.mid), sand: glaze(C.sand), accent: glaze(C.firuzeh) };
  }, []);

  useFrame((state, dt) => {
    dt = Math.min(dt, 0.05);
    const c = ctl.current;
    c.boost = damp(c.boost, c.hover ? 1 : 0, 3, dt);
    c.bv += (-c.burst * 40 - c.bv * 6) * dt;
    c.burst += c.bv * dt;
    const sp = 1 + c.boost * 2.5;
    rings[0].current.rotation.z += dt * 0.25 * sp;
    rings[1].current.rotation.z -= dt * 0.4 * sp;
    rings[2].current.rotation.z += dt * 0.18 * sp;
    rings[3].current.rotation.z -= dt * 0.1 * sp;
    [1, 2, 3].forEach((i) => rings[i].current.scale.setScalar(1 + c.burst * (0.15 + i * 0.1)));
    g.current.rotation.y = damp(g.current.rotation.y, state.pointer.x * 0.6, 3, dt);
    g.current.rotation.x = damp(g.current.rotation.x, -state.pointer.y * 0.5, 3, dt);
  });

  const around = (n, r, fn) =>
    Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2;
      return fn(i, [Math.cos(a) * r, Math.sin(a) * r, 0], a);
    });

  return (
    <group ref={g}>
      <group ref={rings[0]}>
        <mesh geometry={geo.big} material={mat.brick} />
        <mesh geometry={geo.mid} material={mat.kahgel} position={[0, 0, 0.12]} rotation={[0, 0, Math.PI / 8]} />
        <mesh position={[0, 0, 0.32]} rotation={[Math.PI / 2, 0, 0]} material={mat.accent}>
          <cylinderGeometry args={[0.22, 0.22, 0.1, 8]} />
        </mesh>
      </group>
      <group ref={rings[1]}>
        <mesh geometry={geo.ring2} material={mat.sand} />
        {around(8, 1.62, (i, p, a) => (
          <mesh key={i} geometry={geo.gem} material={i % 2 ? mat.firuzeh : mat.lajvard} position={p} rotation={[0, 0, a]} scale={[1, 1.6, 1]} />
        ))}
      </group>
      <group ref={rings[2]}>
        {around(12, 2.15, (i, p) => (
          <mesh key={i} geometry={geo.small} material={i % 3 ? mat.lajvard : mat.brick} position={p} />
        ))}
      </group>
      <group ref={rings[3]}>
        <mesh geometry={geo.ring} material={mat.firuzeh} />
        {around(24, 2.62, (i, p) => (
          <mesh key={i} geometry={geo.dot} material={i % 2 ? mat.kahgel : mat.brick} position={p} />
        ))}
      </group>
    </group>
  );
}

export default function ShamsehScene({ active = true, night = false }) {
  const ctl = useRef({ boost: 0, hover: false, burst: 0, bv: 0 });
  return (
    <div
      className="scene"
      onPointerEnter={() => (ctl.current.hover = true)}
      onPointerLeave={() => (ctl.current.hover = false)}
      onClick={() => (ctl.current.bv = 5)}
    >
      <Canvas flat dpr={[1, 1.75]} frameloop={active ? 'always' : 'never'} camera={{ position: [0, 0, 8.5], fov: 36 }} gl={{ antialias: true, alpha: true }} aria-label="شمسه؛ نشانگر را روی آن ببرید و کلیک کنید">
        <ambientLight intensity={night ? 0.5 : 0.9} />
        <directionalLight position={[3, 4, 6]} intensity={night ? 1.6 : 2.2} />
        <pointLight position={[-4, -2, 4]} intensity={night ? 12 : 6} color={C.sand} decay={1.5} distance={14} />
        <Medallion ctl={ctl} />
      </Canvas>
    </div>
  );
}
