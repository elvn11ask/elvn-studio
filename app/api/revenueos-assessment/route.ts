import crypto from "node:crypto";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { isRateLimited, verifyContactToken } from "@/lib/contact";
import { sendTelegramMessage } from "@/lib/contact-delivery";
import { assessmentTimingValid, buildRevenueAssessmentBrief, revenueAssessmentSchema } from "@/lib/revenueos-assessment";
import { site } from "@/lib/site";

function originAllowed(request:Request){const expected=new URL(process.env.NEXT_PUBLIC_SITE_URL||site.url).origin;const origin=request.headers.get("origin");return process.env.NODE_ENV!=="production"&&origin?.startsWith("http://localhost:")?true:origin===expected}
function clean(value:string){return value.replace(/[\u0000-\u001F\u007F]/g," ").replace(/\s+/g," ").trim()}

export async function POST(request:Request){
  const leadId=`ROS-${new Date().toISOString().slice(0,10).replaceAll("-","")}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
  if(!originAllowed(request))return NextResponse.json({ok:false,message:"This request could not be verified.",leadId},{status:403});
  const address=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"unknown";
  const rateKey=crypto.createHash("sha256").update(`revenueos:${address}:${new Date().toISOString().slice(0,13)}`).digest("hex");
  if(isRateLimited(rateKey))return NextResponse.json({ok:false,message:"Too many attempts. Please try again later.",leadId},{status:429});
  let raw:unknown;try{raw=await request.json()}catch{return NextResponse.json({ok:false,message:"The form data could not be read.",leadId},{status:400})}
  const parsed=revenueAssessmentSchema.safeParse(raw);
  if(!parsed.success||!verifyContactToken(parsed.success?parsed.data.token:"")||!assessmentTimingValid(parsed.success?parsed.data.startedAt:Date.now()))return NextResponse.json({ok:false,message:"Please review the form and try again.",leadId},{status:400});
  const data={...parsed.data,name:clean(parsed.data.name),email:clean(parsed.data.email),company:clean(parsed.data.company),companyWebsite:clean(parsed.data.companyWebsite),country:clean(parsed.data.country),currentCrm:clean(parsed.data.currentCrm),currentErp:clean(parsed.data.currentErp),catalogPlatform:clean(parsed.data.catalogPlatform),problem:clean(parsed.data.problem),integrations:clean(parsed.data.integrations),message:clean(parsed.data.message),timeline:clean(parsed.data.timeline)};
  const brief=buildRevenueAssessmentBrief(data,leadId);const mode=process.env.CONTACT_MODE||"test";
  if(mode==="test")return NextResponse.json({ok:true,message:"The request passed validation in safe test mode. No external message was sent.",leadId});
  try{
    if(mode==="telegram")await sendTelegramMessage(`New ELVN Revenue Operations assessment\n\n${brief}`.slice(0,3900));
    else if(mode==="live"){
      const transporter=nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||587),secure:Number(process.env.SMTP_PORT)===465,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASSWORD}});
      const internal=await transporter.sendMail({from:process.env.SMTP_FROM,to:process.env.CONTACT_RECIPIENT||site.email,replyTo:data.email,subject:`Revenue Operations Assessment — ${data.company} — ${leadId}`,text:brief});
      if(!internal.accepted.length)throw new Error("Internal mailbox did not accept the message");
      const confirmation=await transporter.sendMail({from:process.env.SMTP_FROM,to:data.email,replyTo:site.email,subject:`ELVN Studio received your assessment request — ${leadId}`,text:`Hello ${data.name},\n\nELVN Studio received your Revenue Operations Assessment request. The reference is ${leadId}.\n\nThe next reply will focus on the current RFQ workflow, integration boundary, and the most practical discovery scope.\n\nELVN Studio\n${site.email}`});
      if(!confirmation.accepted.length)throw new Error("Confirmation mailbox did not accept the message");
      if(process.env.TELEGRAM_BOT_TOKEN&&process.env.TELEGRAM_CHAT_ID)await sendTelegramMessage(`New ELVN Revenue Operations assessment\n\n${brief}`.slice(0,3900));
    } else return NextResponse.json({ok:false,message:`Delivery is not configured. Please email ${site.email}.`,leadId},{status:503});
    return NextResponse.json({ok:true,message:"Your assessment request was delivered. Expect a practical scope response rather than an automated sales sequence.",leadId});
  }catch{return NextResponse.json({ok:false,message:`Delivery failed. Please email ${site.email} and include reference ${leadId}.`,leadId},{status:502})}
}
