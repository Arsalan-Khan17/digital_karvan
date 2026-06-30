import { readFileSync, writeFileSync } from "node:fs";

const TPL = "D:/Projects/DK/newdesign/hero-logo-animation.template.html";
const LOGO = "D:/Projects/DK/newdesign/design-reference/images/logo.svg";
const OUT = "D:/Projects/DK/newdesign/hero-logo-animation.html";

let tpl = readFileSync(TPL, "utf8");
let svg = readFileSync(LOGO, "utf8");

// strip XML prolog / doctype if present
svg = svg.replace(/<\?xml[^>]*\?>/i, "").replace(/<!DOCTYPE[^>]*>/i, "").trim();

// ensure the root <svg> scales: add viewBox, make width/height fluid
svg = svg.replace(/<svg\b([^>]*)>/i, (_m, attrs) => {
  let a = attrs;
  if (!/viewBox=/i.test(a)) a += ' viewBox="0 0 1744 2498"';
  a = a.replace(/\swidth="[^"]*"/i, "").replace(/\sheight="[^"]*"/i, "");
  a += ' width="100%" height="100%" preserveAspectRatio="xMidYMid meet"';
  return "<svg" + a + ">";
});

const out = tpl.replace("__LOGO_SVG__", svg);
writeFileSync(OUT, out);
console.log(`wrote ${OUT} (${(out.length / 1048576).toFixed(2)} MB)`);
