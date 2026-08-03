import { describe,expect,it } from "vitest";
import { getProjects } from "@/lib/projects";
describe("project content",()=>{it("publishes five unique case studies with evidence",()=>{const projects=getProjects();expect(projects).toHaveLength(5);expect(new Set(projects.map(({slug})=>slug)).size).toBe(5);for(const project of projects){expect(project.evidence.length).toBeGreaterThan(0);expect(project.body).toContain("## Business context")}})});
