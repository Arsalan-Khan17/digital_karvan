import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  SplitText,
  ScrambleTextPlugin,
  CustomEase,
  DrawSVGPlugin,
  Flip
);

// Custom eases used throughout the site
CustomEase.create("karvan-out", "M0,0 C0.05,0 0.133,0.142 0.175,0.342 0.234,0.614 0.281,0.86 0.4,1 0.518,1.14 0.792,1 1,1");
CustomEase.create("magnetic", "M0,0 C0.2,0 0.3,1 1,1");

gsap.defaults({ ease: "power3.out" });

export { gsap, ScrollTrigger, SplitText, ScrambleTextPlugin, CustomEase, useGSAP };
