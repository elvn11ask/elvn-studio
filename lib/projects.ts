import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import { projectSchema, type Project } from "./project-schema";

const projectsDirectory = path.join(process.cwd(), "content", "projects");

export function getProjects(): Project[] {
  const directories = fs
    .readdirSync(projectsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  const seenSlugs = new Set<string>();
  const seenTitles = new Set<string>();
  const projects = directories.map((directory) => {
    const directoryPath = path.join(projectsDirectory, directory);
    const metadataPath = path.join(directoryPath, "project.yaml");
    const bodyPath = path.join(directoryPath, "case-study.md");
    if (!fs.existsSync(metadataPath) || !fs.existsSync(bodyPath)) {
      throw new Error(`Project ${directory} requires project.yaml and case-study.md`);
    }
    const parsed = projectSchema.parse(YAML.parse(fs.readFileSync(metadataPath, "utf8")));
    if (parsed.slug !== directory) throw new Error(`Project directory ${directory} must match slug ${parsed.slug}`);
    if (seenSlugs.has(parsed.slug)) throw new Error(`Duplicate project slug: ${parsed.slug}`);
    if (seenTitles.has(parsed.title)) throw new Error(`Duplicate project title: ${parsed.title}`);
    const imagePath = path.join(process.cwd(), "public", parsed.cover);
    if (!fs.existsSync(imagePath)) throw new Error(`Missing project image: ${parsed.cover}`);
    seenSlugs.add(parsed.slug);
    seenTitles.add(parsed.title);
    return { ...parsed, body: fs.readFileSync(bodyPath, "utf8") };
  });

  return projects.filter((project) => project.published).sort((a, b) => a.order - b.order);
}

export function getProject(slug: string) {
  return getProjects().find((project) => project.slug === slug);
}
