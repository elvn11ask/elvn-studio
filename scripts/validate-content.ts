import { getProjects } from "../lib/projects";
const projects=getProjects();
if(projects.length!==5)throw new Error(`Expected five published projects, found ${projects.length}`);
console.log(`Validated ${projects.length} projects: ${projects.map(({slug})=>slug).join(", ")}`);
