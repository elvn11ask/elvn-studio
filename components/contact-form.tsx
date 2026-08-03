"use client";
import { useEffect, useState } from "react";

type Status={kind:"idle"|"sending"|"success"|"error";message?:string;requestId?:string};
const budgets=["Under $2,500","$2,500–$5,000","$5,000–$10,000","$10,000–$25,000","$25,000+","Not sure yet"];
const types=["Business website","B2B platform","SaaS or MVP","Performance and SEO","Production recovery","Other"];
export function ContactForm(){
  const [token,setToken]=useState("");const[status,setStatus]=useState<Status>({kind:"idle"});
  useEffect(()=>{fetch("/api/contact/token",{cache:"no-store"}).then((r)=>r.json()).then((data)=>setToken(data.token)).catch(()=>setStatus({kind:"error",message:"The secure form could not start. Please use email instead."}))},[]);
  async function submit(event:React.FormEvent<HTMLFormElement>){event.preventDefault();setStatus({kind:"sending"});const form=new FormData(event.currentTarget);const payload:Record<string,unknown>=Object.fromEntries(form.entries());payload.consent=form.get("consent")==="on";payload.token=token;try{const response=await fetch("/api/contact",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(payload)});const result=await response.json();setStatus({kind:response.ok?"success":"error",message:result.message,requestId:result.requestId});if(response.ok)event.currentTarget.reset()}catch{setStatus({kind:"error",message:"The form could not connect. Please email elvnask@gmail.com."})}}
  if(status.kind==="success")return <div className="form-state success" role="status"><p className="eyebrow">Brief received</p><h2>Thank you. The next reply will be practical.</h2><p>{status.message}</p>{status.requestId&&<small>Reference: {status.requestId}</small>}<button className="button-quiet" onClick={()=>setStatus({kind:"idle"})}>Send another brief</button></div>;
  return <form className="contact-form" onSubmit={submit} noValidate>
    <fieldset><legend>01 · About you</legend><div className="field-grid"><label>Name <input name="name" required minLength={2} maxLength={80} autoComplete="name"/></label><label>Email <input name="email" type="email" required maxLength={160} autoComplete="email"/></label><label className="field-wide">Company <input name="company" maxLength={120} autoComplete="organization"/></label></div></fieldset>
    <fieldset><legend>02 · About the project</legend><div className="field-grid"><label>Project type <select name="projectType" required defaultValue=""><option value="" disabled>Select the closest fit</option>{types.map((item)=><option key={item}>{item}</option>)}</select></label><label>Target launch <input name="launchDate" maxLength={80} placeholder="For example: Q1 or flexible"/></label><label className="field-wide">What needs to change? <textarea name="description" required minLength={40} maxLength={4000} rows={7} placeholder="Current state, main constraint, and the outcome you need."/></label></div></fieldset>
    <fieldset><legend>03 · Timing and budget</legend><label>Working budget <select name="budget" defaultValue="Not sure yet">{budgets.map((item)=><option key={item}>{item}</option>)}</select></label></fieldset>
    <div className="honeypot" aria-hidden="true"><label>Website <input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <label className="check"><input type="checkbox" name="consent" required/><span>I agree that ELVN Studio may use these details to answer my inquiry. No marketing list.</span></label>
    {status.kind==="error"&&<div className="form-error" role="alert">{status.message}{status.requestId&&<small> Reference: {status.requestId}</small>}</div>}
    <button className="button" type="submit" disabled={!token||status.kind==="sending"}>{status.kind==="sending"?"Sending…":"Send project brief"}<span aria-hidden="true">↗</span></button>
  </form>
}
