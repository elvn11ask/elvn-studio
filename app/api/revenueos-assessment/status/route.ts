import { NextResponse } from "next/server";
import { assessmentLifecycleStatus, trackingTokenValid } from "@/lib/assessment-lifecycle";

export async function POST(request: Request) {
  let raw: unknown;
  try { raw = await request.json(); } catch { return NextResponse.json({ ok: false }, { status: 400 }); }
  const { leadId, trackingToken } = (raw || {}) as { leadId?: string; trackingToken?: string };
  if (!leadId || !/^ROS-[A-Z0-9-]{12,40}$/.test(leadId) || !trackingToken || !trackingTokenValid(leadId, trackingToken)) return NextResponse.json({ ok: false }, { status: 403 });
  const lifecycle = assessmentLifecycleStatus(leadId);
  return lifecycle ? NextResponse.json({ ok: true, lifecycle }, { headers: { "Cache-Control": "no-store" } }) : NextResponse.json({ ok: false }, { status: 404 });
}
