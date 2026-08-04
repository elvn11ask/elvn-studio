import type { Metadata } from "next";
import { GraphCTA, GraphHero } from "@/components/revenueos/graph-shell";
import { ProductSchema } from "@/components/revenueos/product-shell";
import { graphFaq } from "@/lib/revenue-knowledge-graph";
export const metadata:Metadata={title:"Revenue Knowledge Graph FAQ",description:"Answers about system ownership, AI, tenant isolation, pricing, GitHub publication, and production gates.",alternates:{canonical:"/revenueos/knowledge-graph/faq"}};
export default function Page(){return <><GraphHero eyebrow="Knowledge Graph · FAQ" title="The boundaries are part of the product." lede="Clear answers about authority, identity, security, AI, pricing, and what must be proven before production."/><section className="section shell faq-list">{graphFaq.map(([q,a],i)=><details key={q} open={i===0}><summary><span>{String(i+1).padStart(2,"0")}</span>{q}</summary><p>{a}</p></details>)}</section><GraphCTA/><ProductSchema path="/revenueos/knowledge-graph/faq" name="Revenue Knowledge Graph FAQ" description="Product and implementation answers." faq={graphFaq}/></>}
