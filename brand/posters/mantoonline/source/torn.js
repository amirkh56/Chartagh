// Torn-paper edges: deterministic jagged clip-path for every .torn element (data-edge="top|bottom|both")
(() => {
  let s = 7; const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  for (const el of document.querySelectorAll('.torn')) {
    const e = el.dataset.edge || 'both', d = +(el.dataset.depth || 14), pts = [];
    const edge = (y0, dir) => { const a = []; for (let x = 0; x <= 100; x += 1.6 + rnd() * 2.4) a.push(`${x.toFixed(1)}% calc(${y0} ${dir} ${(rnd() * d).toFixed(1)}px)`); return a; };
    const top = e === 'bottom' ? ['0 0', '100% 0'] : edge('0%', '+');
    const bot = e === 'top' ? ['100% 100%', '0 100%'] : edge('100%', '-').reverse();
    el.style.clipPath = `polygon(${[...top, ...bot].join(',')})`;
  }
})();
