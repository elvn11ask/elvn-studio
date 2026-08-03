"use client";

import { useSyncExternalStore } from "react";

const key = "elvn-studio-analytics-consent";
const eventName = "elvn-studio-consent-change";
const subscribe = (callback: () => void) => {
  window.addEventListener(eventName, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(eventName, callback);
    window.removeEventListener("storage", callback);
  };
};

export function ConsentControls() {
  const choice = useSyncExternalStore(subscribe, () => localStorage.getItem(key), () => "server");
  if (choice) return null;
  const choose = (value: "accepted" | "rejected") => {
    localStorage.setItem(key, value);
    localStorage.setItem(`${key}-at`, new Date().toISOString());
    window.dispatchEvent(new Event(eventName));
  };
  return (
    <aside className="consent" aria-label="Analytics privacy choice">
      <div><strong>Your privacy, your choice.</strong><p>No analytics run by default. You can allow anonymous measurement or keep it off.</p></div>
      <div className="button-row"><button className="button button-small" onClick={() => choose("accepted")}>Accept analytics</button><button className="button-quiet" onClick={() => choose("rejected")}>Reject</button></div>
    </aside>
  );
}
