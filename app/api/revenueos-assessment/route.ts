import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { isRateLimited, verifyContactToken } from "@/lib/contact";
import { persistAssessment } from "@/lib/assessment-lifecycle";
import { assessmentTimingValid, revenueAssessmentSchema } from "@/lib/revenueos-assessment";
import { site } from "@/lib/site";

function originAllowed(request:Request){const expected=new URL(process.env.NEXT_PUBLIC_SITE_URL||site.url).origin;const origin=request.headers.get("origin");return process.env.NODE_ENV!=="production"&&origin?.startsWith("http://localhost:")?true:origin===expected}
function clean(value:string){return value.replace(/[\u0000-\u001F\u007F]/g," ").replace(/\s+/g," ").trim()}

export async function POST(request:Request){
  const requestId=`ROS-${new Date().toISOString().slice(0,10).replaceAll("-","")}-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
  if(!originAllowed(request))return NextResponse.json({ok:false,message:"This request could not be verified.",requestId},{status:403});
  const address=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"unknown";
  const rateKey=crypto.createHash("sha256").update(`revenueos:${address}:${new Date().toISOString().slice(0,13)}`).digest("hex");
  if(isRateLimited(rateKey))return NextResponse.json({ok:false,message:"Too many attempts. Please try again later.",requestId},{status:429});
  let raw:unknown;try{raw=await request.json()}catch{return NextResponse.json({ok:false,message:"The form data could not be read.",requestId},{status:400})}
  const parsed=revenueAssessmentSchema.safeParse(raw);
  if(!parsed.success||!verifyContactToken(parsed.success?parsed.data.token:"")||!assessmentTimingValid(parsed.success?parsed.data.startedAt:Date.now()))return NextResponse.json({ok:false,message:"Please review the form and try again.",requestId},{status:400});
  const data={...parsed.data,name:clean(parsed.data.name),email:clean(parsed.data.email),company:clean(parsed.data.company),companyWebsite:clean(parsed.data.companyWebsite),country:clean(parsed.data.country),currentCrm:clean(parsed.data.currentCrm),currentErp:clean(parsed.data.currentErp),catalogPlatform:clean(parsed.data.catalogPlatform),problem:clean(parsed.data.problem),integrations:clean(parsed.data.integrations),message:clean(parsed.data.message),timeline:clean(parsed.data.timeline)};
  try{
    const lifecycle=persistAssessment(data,requestId);
    return NextResponse.json({ok:true,message:"Your assessment request is durably recorded. Delivery is tracked under the same reference.",...lifecycle},{status:lifecycle.duplicate?200:202,headers:{"Cache-Control":"no-store"}});
  }catch{return NextResponse.json({ok:false,message:`The request could not be recorded safely. Please email ${site.email} and include reference ${requestId}.`,requestId},{status:503})}
}
