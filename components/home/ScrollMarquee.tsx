"use client";

import { Fragment } from "react";

const ROW_TOP = ["Design", "Build", "Launch", "Grow", "Iterate"];
const ROW_BOTTOM = ["Strategy", "Identity", "Code", "Data", "AI"];

/** Flat sequence of word + accent-bullet spans (with a trailing bullet). */
function sequence(words: string[], keyPrefix: string) {
  return words.map((w, i) => (
    <Fragment key={`${keyPrefix}-${i}`}>
      <span>{w}</span>
      <span className="sep">•</span>
    </Fragment>
  ));
}

export default function ScrollMarquee() {
  return (
    <section
      className="keystrip py-[clamp(2.2rem,5vh,3.4rem)] overflow-hidden bg-bg-secondary border-b border-border-subtle"
      aria-hidden="true"
    >
      {/* duplicated content per row → seamless loop (track translates -50%) */}
      <div className="keyrow r1">
        {sequence(ROW_TOP, "t1")}
        {sequence(ROW_TOP, "t2")}
      </div>
      <div className="keyrow r2">
        {sequence(ROW_BOTTOM, "b1")}
        {sequence(ROW_BOTTOM, "b2")}
      </div>
    </section>
  );
}
