import fs from "node:fs";

const read = f => fs.readFileSync(`demo/assets/${f}`, "utf8");

function group(svg, id) {
  const start = svg.indexOf(`<g id="${id}"`);
  let depth = 0;
  let i = start;
  const re = /<g\b|<\/g>/g;
  re.lastIndex = start;
  let m;
  while ((m = re.exec(svg))) {
    depth += m[0] === "</g>" ? -1 : 1;
    if (depth === 0) return svg.slice(start, m.index + 4);
  }
}

function icon(svg, id) {
  const g = group(svg, id);
  const paths = [...g.matchAll(/<path d="([^"]+)"/g)].map(m => m[1]);
  const xs = [], ys = [];
  for (const d of paths) {
    for (const [, cmd, args] of d.matchAll(/([MLHVCSQTAZ])([^MLHVCSQTAZ]*)/g)) {
      const n = (args.match(/-?\d*\.?\d+(?:e-?\d+)?/g) || []).map(Number);
      if (cmd === "H") xs.push(...n);
      else if (cmd === "V") ys.push(...n);
      else for (let i = 0; i + 1 < n.length; i += 2) { xs.push(n[i]); ys.push(n[i + 1]); }
    }
  }
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const w = x1 - x0, h = y1 - y0;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x0} ${y0} ${w} ${h}" width="${w}" height="${h}" fill="currentColor">${paths.map(d => `<path d="${d}"/>`).join("")}</svg>`;
}

const wb = read("writebar.svg");
const tb = read("toolbar.svg");
const flat = s => s.replace(/\s+/g, " ").trim();
const tail = f => flat(read(f)).replace(/fill="white"/g, 'fill="currentColor"');

const out = {
  paperclip: icon(wb, "Leading Symbol"),
  timer: icon(wb, "Symbol_2"),
  mic: icon(wb, "Trailing Symbol"),
  back: icon(tb, "Back"),
  tailIn: tail("tail_in.svg"),
  tailOut: tail("tail_out.svg"),
  cell: flat(read("cell.svg")),
  wifi: flat(read("wifi.svg")),
  battery: flat(read("battery.svg")),
  premium: flat(read("premium.svg")),
};

fs.writeFileSync("demo/assets.js", `window.ASSETS = ${JSON.stringify(out)};`);
for (const [k, v] of Object.entries(out)) console.log(k, v.length, v.slice(0, 90));

