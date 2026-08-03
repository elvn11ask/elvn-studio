import crypto from "node:crypto";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema, isRateLimited, verifyContactToken } from "@/lib/contact";
import { site } from "@/lib/site";

function requestOriginAllowed(request:Request){const expected=new URL(process.env.NEXT_PUBLIC_SITE_URL||site.url).origin;const origin=request.headers.get("origin");if(process.env.NODE_ENV!=="production"&&origin?.startsWith("http://localhost:"))return true;return origin===expected;}
function normalize(value:string){return value.replace(/[\u0000-\u001F\u007F]/g," ").replace(/\s+/g," ").trim()}

export async function POST(request:Request){
  const requestId=crypto.randomUUID();
  if(!requestOriginAllowed(request))return NextResponse.json({ok:false,message:"This request could not be verified.",requestId},{status:403});
  const forwarded=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"unknown";
  const rateKey=crypto.createHash("sha256").update(`${forwarded}:${new Date().toISOString().slice(0,13)}`).digest("hex");
  if(isRateLimited(rateKey))return NextResponse.json({ok:false,message:"Too many attempts. Please try again later.",requestId},{status:429});
  let raw:unknown;try{raw=await request.json()}catch{return NextResponse.json({ok:false,message:"The form data could not be read.",requestId},{status:400})}
  const parsed=contactSchema.safeParse(raw);
  if(!parsed.success||!verifyContactToken(parsed.success?parsed.data.token:""))return NextResponse.json({ok:false,message:"Please review the form and try again.",requestId},{status:400});
  const data={...parsed.data,name:normalize(parsed.data.name),company:normalize(parsed.data.company),description:normalize(parsed.data.description),launchDate:normalize(parsed.data.launchDate)};
  const mode=process.env.CONTACT_MODE||"test";
  if(mode==="test")return NextResponse.json({ok:true,message:"Test submission validated. No email or Telegram message was sent.",requestId});
  if(mode!=="live")return NextResponse.json({ok:false,message:"Contact delivery is not configured. Please email directly.",requestId},{status:503});
  try{
    const transporter=nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||587),secure:Number(process.env.SMTP_PORT)===465,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASSWORD}});
    const body=[`Request ${requestId}`,`Name: ${data.name}`,`Email: ${data.email}`,`Company: ${data.company||"—"}`,`Project: ${data.projectType}`,`Budget: ${data.budget}`,`Target launch: ${data.launchDate||"—"}`,"",data.description].join("\n");
    await transporter.sendMail({from:process.env.SMTP_FROM,to:process.env.CONTACT_RECIPIENT||site.email,replyTo:data.email,subject:`ELVN Studio inquiry — ${data.projectType}`,text:body});
    if(process.env.TELEGRAM_BOT_TOKEN&&process.env.TELEGRAM_CHAT_ID){await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({chat_id:process.env.TELEGRAM_CHAT_ID,text:`New ELVN Studio inquiry\n${data.name} · ${data.projectType}\nRequest ${requestId}`}),signal:AbortSignal.timeout(8000)});}
    return NextResponse.json({ok:true,message:"Thanks — your project brief was sent. Expect a practical next step by email.",requestId});
  }catch{return NextResponse.json({ok:false,message:`Delivery failed. Please email ${site.email} directly.`,requestId},{status:502})}
}
