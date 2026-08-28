"use client";

import { useEffect, useRef, useState } from "react";
import { auditPageVolumes, auditSiteTypes } from "@/lib/revenueos-audit";

type Status = { kind: "idle" | "sending" | "success" | "error"; message?: string; leadId?: string };

export function RevenueAuditForm() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
    fetch("/api/contact/token", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => setToken(data.token))
      .catch(() => setStatus({ kind: "error", message: "The secure audit form could not start. Please use email instead." }));
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "sending" });
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload: Record<string, unknown> = Object.fromEntries(form.entries());
    payload.consent = form.get("consent") === "on";
    payload.token = token;
    payload.startedAt = startedAt.current;
    try {
      const response = await fetch("/api/revenueos-audit", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      setStatus({ kind: response.ok ? "success" : "error", message: result.message, leadId: result.leadId });
      if (response.ok) formElement.reset();
    } catch {
      setStatus({ kind: "error", message: "The form could not connect. Please email elvnask@gmail.com." });
    }
  }

  if (status.kind === "success") return <div className="form-state success" role="status"><p className="eyebrow">Audit request received</p><h2>Your request has a reference.</h2><p>{status.message}</p>{status.leadId && <small>Lead reference: {status.leadId}</small>}<button className="button-quiet" onClick={() => { startedAt.current = Date.now(); setStatus({ kind: "idle" }); }}>Send another request</button></div>;

  return <form className="contact-form assessment-form" onSubmit={submit} noValidate>
    <fieldset><legend>01 · Contact</legend><div className="field-grid"><label>Name<input name="name" required minLength={2} maxLength={80} autoComplete="name" /></label><label>Work email<input name="email" type="email" required maxLength={160} autoComplete="email" /></label><label>Company<input name="company" required minLength={2} maxLength={160} autoComplete="organization" /></label><label>Website<input name="companyWebsite" type="url" required placeholder="https://" maxLength={300} /></label></div></fieldset>
    <fieldset><legend>02 · Audit boundary</legend><div className="field-grid"><label>Site type<select name="siteType" required defaultValue=""><option value="" disabled>Select type</option>{auditSiteTypes.map((item) => <option key={item}>{item}</option>)}</select></label><label>Approximate pages / SKUs<select name="approximatePages" required defaultValue=""><option value="" disabled>Select range</option>{auditPageVolumes.map((item) => <option key={item}>{item}</option>)}</select></label><label className="field-wide">Main concern<textarea name="mainConcern" required minLength={20} maxLength={2500} rows={5} placeholder="What changed, disappeared, stopped being indexed, or is difficult to verify?" /></label></div></fieldset>
    <div className="honeypot" aria-hidden="true"><label>Leave empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <label className="check"><input type="checkbox" name="consent" required /><span>I agree that ELVN Studio may use these details to qualify and answer this audit request. No marketing list.</span></label>
    {status.kind === "error" && <div className="form-error" role="alert">{status.message}</div>}
    <button className="button" type="submit" disabled={!token || status.kind === "sending"}>{status.kind === "sending" ? "Sending…" : "Request Revenue Audit"}<span aria-hidden="true">↗</span></button>
  </form>;
}
