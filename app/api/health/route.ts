import { NextResponse } from "next/server";
export function GET(){return NextResponse.json({status:"ok",service:"elvn-studio"},{headers:{"Cache-Control":"no-store"}})}
