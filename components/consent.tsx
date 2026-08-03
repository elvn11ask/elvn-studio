"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";

const key = "elvn-studio-analytics-consent";
const eventName = "elvn-studio-consent-change";
const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID?.trim() || "G-NQHC45PCX5";
const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID?.trim() || "xwm2v3xvji";
const subscribe = (callback: () => void) => {
  window.addEventListener(eventName, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(eventName, callback);
    window.removeEventListener("storage", callback);
  };
};

const getChoice = () => localStorage.getItem(key);
const getServerChoice = () => "server";

function useAnalyticsConsent() {
  return useSyncExternalStore(subscribe, getChoice, getServerChoice);
}

export function ConsentControls() {
  const choice = useAnalyticsConsent();
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

export function AnalyticsMeasurement() {
  const choice = useAnalyticsConsent();

  if (choice !== "accepted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="elvn-studio-google-analytics" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${googleAnalyticsId}',{anonymize_ip:true});`}
      </Script>
      <Script id="elvn-studio-clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,'clarity','script','${clarityId}');`}
      </Script>
    </>
  );
}
