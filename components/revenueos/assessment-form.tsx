"use client";
import { useEffect, useRef, useState } from "react";
import { aiPreferences, assessmentBudgets, deploymentPreferences, rfqVolumes, teamSizes } from "@/lib/revenueos-assessment";

type Status={kind:"idle"|"sending"|"success"|"error";message?:string;leadId?:string};

export function RevenueAssessmentForm(){
  const [token,setToken]=useState("");
  const [status,setStatus]=useState<Status>({kind:"idle"});
  const startedAt=useRef(0);
  useEffect(()=>{startedAt.current=Date.now();fetch("/api/contact/token",{cache:"no-store"}).then((response)=>response.json()).then((data)=>setToken(data.token)).catch(()=>setStatus({kind:"error",message:"The secure assessment form could not start. Please use email instead."}))},[]);
  async function submit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();setStatus({kind:"sending"});
    const form=new FormData(event.currentTarget);const payload:Record<string,unknown>=Object.fromEntries(form.entries());
    payload.consent=form.get("consent")==="on";payload.token=token;payload.startedAt=startedAt.current;
    try{const response=await fetch("/api/revenueos-assessment",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)});const result=await response.json();setStatus({kind:response.ok?"success":"error",message:result.message,leadId:result.leadId});if(response.ok)event.currentTarget.reset()}catch{setStatus({kind:"error",message:"The form could not connect. Please email elvnask@gmail.com."})}
  }
  if(status.kind==="success")return <div className="form-state success" role="status"><p className="eyebrow">Assessment request received</p><h2>Your commercial workflow now has a reference.</h2><p>{status.message}</p>{status.leadId&&<small>Lead reference: {status.leadId}</small>}<button className="button-quiet" onClick={()=>{startedAt.current=Date.now();setStatus({kind:"idle"})}}>Send another request</button></div>;
  return <form className="contact-form assessment-form" onSubmit={submit} noValidate>
    <fieldset><legend>01 · Company</legend><div className="field-grid"><label>Name <input name="name" required minLength={2} maxLength={80} autoComplete="name"/></label><label>Work email <input name="email" type="email" required maxLength={160} autoComplete="email"/></label><label>Company <input name="company" required minLength={2} maxLength={160} autoComplete="organization"/></label><label>Company website <input name="companyWebsite" type="url" required placeholder="https://" maxLength={300}/></label><label>Country <input name="country" required maxLength={100} autoComplete="country-name"/></label><label>Commercial team size <select name="teamSize" required defaultValue=""><option value="" disabled>Select range</option>{teamSizes.map((item)=><option key={item}>{item}</option>)}</select></label></div></fieldset>
    <fieldset><legend>02 · Current operation</legend><div className="field-grid"><label>Monthly RFQ volume <select name="monthlyRfqVolume" required defaultValue=""><option value="" disabled>Select range</option>{rfqVolumes.map((item)=><option key={item}>{item}</option>)}</select></label><label>Current CRM <input name="currentCrm" maxLength={160} placeholder="CRM or none"/></label><label>Current ERP <input name="currentErp" maxLength={160} placeholder="ERP or none"/></label><label>Catalog platform <input name="catalogPlatform" maxLength={160} placeholder="Custom PHP, Magento, Shopify…"/></label><label className="field-wide">Biggest revenue-operations problem <textarea name="problem" required minLength={40} maxLength={2500} rows={5} placeholder="Where RFQs, sourcing, quotes, ownership, or revenue tracking currently fail."/></label><label className="field-wide">Required integrations <textarea name="integrations" required minLength={2} maxLength={1000} rows={3} placeholder="Website, CRM, ERP, mailbox, BI, messaging…"/></label></div></fieldset>
    <fieldset><legend>03 · Delivery boundary</legend><div className="field-grid"><label>Deployment preference <select name="deployment" required defaultValue=""><option value="" disabled>Select preference</option>{deploymentPreferences.map((item)=><option key={item}>{item}</option>)}</select></label><label>AI preference <select name="aiPreference" required defaultValue=""><option value="" disabled>Select preference</option>{aiPreferences.map((item)=><option key={item}>{item}</option>)}</select></label><label>Target timeline <input name="timeline" required maxLength={160} placeholder="For example: pilot this quarter"/></label><label>Indicative one-time implementation budget <select name="budget" required defaultValue=""><option value="" disabled>Select range</option>{assessmentBudgets.map((item)=><option key={item}>{item}</option>)}</select></label><label className="field-wide">Additional context <textarea name="message" maxLength={2500} rows={4}/></label></div></fieldset>
    <div className="honeypot" aria-hidden="true"><label>Leave empty <input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <label className="check"><input type="checkbox" name="consent" required/><span>I agree that ELVN Studio may use these details to assess and answer this inquiry. No marketing list.</span></label>
    {status.kind==="error"&&<div className="form-error" role="alert">{status.message}</div>}
    <button className="button" type="submit" disabled={!token||status.kind==="sending"}>{status.kind==="sending"?"Sending…":"Request the assessment"}<span aria-hidden="true">↗</span></button>
  </form>;
}
