
function readInput(fallback) {
  if (fallback != null && String(fallback).length) return String(fallback);
  if (process.stdin && process.stdin.isTTY) return "";
  try {
    const fs = require("fs");
    if (typeof fs.readFileSync === "function") {
      // Non-blocking when no piped data: use readFileSync only if fd 0 has size or isn't a TTY.
      return fs.readFileSync(0, "utf8");
    }
  } catch (_) {}
  return "";
}

function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }
function parseNumber(s) {
  const m = String(s).trim().match(/^(-?\d+(?:\.\d+)?)([kKmMbB])?$/);
  if (!m) return Number(s);
  const n = Number(m[1]);
  const u = (m[2] || "").toLowerCase();
  return n * ({ k: 1e3, m: 1e6, b: 1e9 }[u] || 1);
}
function run(argv) {
  const mode = argv[0] || "parse";
  if (mode === "clamp") return String(clamp(Number(argv[1]), Number(argv[2]), Number(argv[3])));
  return String(parseNumber(argv[1] || argv[0] || "1.5k"));
}

module.exports = { readInput, clamp, parseNumber, run };
