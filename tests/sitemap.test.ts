import { describe,expect,it } from "vitest";
import sitemap from "@/app/sitemap";
describe("sitemap",()=>{it("contains canonical project routes without duplicates",()=>{const routes=sitemap().map(({url})=>url);expect(routes).toContain("https://studio.elvn.monster/work/chipfasteners");expect(new Set(routes).size).toBe(routes.length)})});
