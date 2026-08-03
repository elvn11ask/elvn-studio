import { NextResponse } from "next/server";
import { issueContactToken } from "@/lib/contact";

export const dynamic = "force-dynamic";
export function GET(){return NextResponse.json({token:issueContactToken()},{headers:{"Cache-Control":"no-store"}})}
