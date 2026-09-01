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
        <span className="op-erased-line">{revealed ? "TAVI MARR WAS HERE" : "THE CUP AND OBITUARY CANNOT BOTH BE TRUE"}</span>
      </div>
      <div>
        <p className="op-kicker">A mechanic, not a filter</p>
        <h2 id="witness-title">History leaves pressure marks.</h2>
        <p>Witness does not choose which record is true. It holds two impossible records in view long enough for the party to act on what ordinary history removed.</p>
        <button className="op-witness-button" type="button" aria-pressed={revealed} onClick={() => setRevealed((value) => !value)}>
          <span aria-hidden="true">□</span> {revealed ? "RELEASE" : "WITNESS"}
        </button>
        <p className="op-control-note" aria-live="polite">{revealed ? "Two incompatible records are held for six seconds." : "Touch or press Enter. No data is collected."}</p>
      </div>
    </section>
  );
}
