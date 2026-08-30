"use client";

import { useEffect, useState } from "react";

export function OnePixelWitness() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!revealed) return;
    const timer = window.setTimeout(() => setRevealed(false), 6000);
    return () => window.clearTimeout(timer);
  }, [revealed]);

  return (
    <section className={revealed ? "op-witness revealed" : "op-witness"} aria-labelledby="witness-title">
      <div className="op-scar" aria-hidden="true">
        <span className="op-scar-pixel" />
        <span className="op-erased-line">THE SIXTH RELAY REMEMBERS YOU</span>
      </div>
      <div>
        <p className="op-kicker">A mechanic, not a filter</p>
        <h2 id="witness-title">History leaves pressure marks.</h2>
        <p>Witness lets you notice what ordinary reality has learned to ignore. Revealing a contradiction can help the party—and attract what lives inside the omission.</p>
        <button className="op-witness-button" type="button" aria-pressed={revealed} onClick={() => setRevealed((value) => !value)}>
          <span aria-hidden="true">□</span> {revealed ? "RELEASE" : "WITNESS"}
        </button>
        <p className="op-control-note" aria-live="polite">{revealed ? "A hidden fragment is visible for six seconds." : "Touch or press Enter. No data is collected."}</p>
      </div>
    </section>
  );
}

