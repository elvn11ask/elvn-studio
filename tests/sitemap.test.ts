import { describe,expect,it } from "vitest";
import sitemap from "@/app/sitemap";
describe("sitemap",()=>{it("contains canonical project and Revenue Operations routes without duplicates",()=>{const routes=sitemap().map(({url})=>url);expect(routes).toContain("https://studio.elvn.monster/work/chipfasteners");expect(routes).toContain("https://studio.elvn.monster/revenueos");expect(routes).toContain("https://studio.elvn.monster/revenueos/implementation");expect(routes).toContain("https://studio.elvn.monster/revenueos/faq");expect(new Set(routes).size).toBe(routes.length)})});
