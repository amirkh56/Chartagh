'use client';
import { useEffect, useRef } from 'react';
import { starPoints } from '@/lib/patterns';

// Click on any empty spot → a burst of little glazed tiles. Fast mouse moves leave a faint tile trail.
const COLORS = ['#E2492D', '#B5391F', '#C0704C', '#7E2414', '#F8DDD3', '#D9C5A0'];
const STAR = starPoints(0, 0, 1);
const SKIP = 'a,button,input,textarea,select,label,summary,[role="button"],[data-no-fx]';

function shape(g, kind, s) {
  g.beginPath();
  if (kind === 0) STAR.forEach(([x, y], i) => (i ? g.lineTo(x * s, y * s) : g.moveTo(x * s, y * s)));
  else if (kind === 1) {
    g.moveTo(0, -s);
    g.lineTo(s * 0.7, 0);
    g.lineTo(0, s);
    g.lineTo(-s * 0.7, 0);
  } else g.rect(-s * 0.6, -s * 0.6, s * 1.2, s * 1.2);
  g.closePath();
}

export default function ClickFX() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.lite) return;
    const c = ref.current;
    const g = c.getContext('2d');
    const parts = [];
    const rings = [];
    let w = 0,
      h = 0,
      raf = 0,
      prev = 0,
      lx = 0,
      ly = 0;

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const loop = (t) => {
      const k = Math.min(3, (t - (prev || t)) / 16.67 || 1);
      prev = t;
      g.clearRect(0, 0, w, h);

      for (let i = rings.length - 1; i >= 0; i--) {
        const r = rings[i];
        r.t += 0.028 * k;
        if (r.t >= 1) {
          rings.splice(i, 1);
          continue;
        }
        const e = 1 - Math.pow(1 - r.t, 3);
        g.save();
        g.translate(r.x, r.y);
        g.rotate(e * 0.6);
        g.globalAlpha = 1 - r.t;
        g.strokeStyle = '#E2492D';
        g.lineWidth = 2;
        shape(g, 0, 12 + e * 60);
        g.stroke();
        g.strokeStyle = '#D9C5A0';
        g.lineWidth = 1.2;
        g.beginPath();
        g.arc(0, 0, 8 + e * 85, 0, Math.PI * 2);
        g.stroke();
        g.restore();
      }

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life -= p.decay * k;
        if (p.life <= 0) {
          parts.splice(i, 1);
          continue;
        }
        p.vy += p.grav * k;
        p.vx *= Math.pow(0.985, k);
        p.x += p.vx * k;
        p.y += p.vy * k;
        p.rot += p.vr * k;
        g.save();
        g.translate(p.x, p.y);
        g.rotate(p.rot);
        g.globalAlpha = Math.min(1, p.life * 1.6);
        g.fillStyle = p.color;
        shape(g, p.kind, p.size * (0.4 + 0.6 * p.life));
        g.fill();
        g.restore();
      }

      raf = parts.length || rings.length ? requestAnimationFrame(loop) : 0;
      if (!raf) prev = 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const burst = (x, y) => {
      rings.push({ x, y, t: 0 });
      for (let i = 0; i < 22; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 2.5 + Math.random() * 6.5;
        parts.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 2.5,
          rot: Math.random() * 6.3,
          vr: (Math.random() - 0.5) * 0.3,
          size: 4 + Math.random() * 7,
          kind: i % 3,
          color: COLORS[i % COLORS.length],
          grav: 0.22,
          life: 1,
          decay: 0.012 + Math.random() * 0.01,
        });
      }
      kick();
    };

    const down = (e) => {
      if (e.button !== 0 || e.target.closest?.(SKIP)) return;
      burst(e.clientX, e.clientY);
    };
    const move = (e) => {
      if (e.pointerType !== 'mouse' || parts.length > 160) return;
      if (Math.hypot(e.clientX - lx, e.clientY - ly) < 34) return;
      lx = e.clientX;
      ly = e.clientY;
      parts.push({
        x: lx,
        y: ly,
        vx: (Math.random() - 0.5) * 0.6,
        vy: 0.4,
        rot: Math.PI / 4,
        vr: 0.02,
        size: 3.2,
        kind: 1,
        color: COLORS[(Math.random() * 4) | 0],
        grav: 0.02,
        life: 0.6,
        decay: 0.018,
      });
      kick();
    };

    size();
    window.addEventListener('resize', size);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', size);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
    };
  }, []);

  return <canvas ref={ref} className="fx-canvas" aria-hidden />;
}
