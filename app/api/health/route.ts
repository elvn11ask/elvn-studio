import { NextResponse } from "next/server";
import { assessmentLifecycleReady } from "@/lib/assessment-lifecycle";

export function GET(){
  try {
    if (!assessmentLifecycleReady()) throw new Error("Lifecycle database integrity check failed");
    return NextResponse.json({status:"ok",service:"elvn-studio",lifecycle:"ready"},{headers:{"Cache-Control":"no-store"}});
  } catch {
    return NextResponse.json({status:"degraded",service:"elvn-studio",lifecycle:"unavailable"},{status:503,headers:{"Cache-Control":"no-store"}});
  }
}
