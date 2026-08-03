import fs from "node:fs";
import path from "node:path";
import { getProjects } from "../lib/projects";
import { staticRoutes } from "../lib/site";
const expected=[...staticRoutes.filter(Boolean).map((route)=>path.join(process.cwd(),"app",route.slice(1),"page.tsx")),path.join(process.cwd(),"app","page.tsx")];
for(const file of expected){if(!fs.existsSync(file))throw new Error(`Missing route source: ${file}`)}
for(const project of getProjects()){if(!project.liveUrl.startsWith("https://"))throw new Error(`Insecure project URL: ${project.liveUrl}`)}
console.log(`Validated ${expected.length} static routes and project URLs.`);
