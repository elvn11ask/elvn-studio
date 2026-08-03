import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
export const metadata:Metadata={title:"Process",description:"A practical product engineering process from business constraint to monitored release.",alternates:{canonical:"/process"}};
const steps=[
  ["Understand the business problem","We inspect the current state, users, constraints, and cost of doing nothing.","A short problem definition and evidence inventory.","Which outcome is worth building toward?"],
  ["Define the smallest reliable architecture","Critical paths, content, data, integrations, risk, and release boundaries become explicit.","Architecture note, scope, milestones, and exclusions.","What is the leanest system that can be operated responsibly?"],
  ["Build the critical product path","Design and engineering move together around the essential user journey.","Working increments with clear acceptance criteria.","Does the product solve the chosen problem before we widen scope?"],
  ["Validate usability, performance, and SEO","Real routes, breakpoints, keyboard use, crawl behavior, and failure states are checked.","Evidence-backed QA and release findings.","Is the candidate credible enough to launch?"],
  ["Launch with rollback and monitoring","The candidate starts in isolation, passes health checks, then receives production traffic.","Versioned release, health checks, monitoring, and rollback.","Can this release be operated and reversed safely?"],
  ["Improve based on real usage","Observed friction and operating cost replace assumptions in the next decision cycle.","Prioritized improvements tied to evidence.","What is now the highest-value constraint?"],
] as const;
export default function ProcessPage(){return <><PageIntro eyebrow="Process" title="A calm route from ambiguity to a stable release."><p>No ceremonial workshops or decorative timelines. Each stage creates a concrete artifact and closes one important decision.</p></PageIntro><section className="section shell process-list">{steps.map(([title,work,delivery,decision],index)=><article key={title}><span>0{index+1}</span><h2>{title}</h2><div><p>{work}</p><dl><dt>You receive</dt><dd>{delivery}</dd><dt>Decision</dt><dd>{decision}</dd></dl></div></article>)}</section></>}
