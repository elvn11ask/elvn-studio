import { z } from "zod";

const evidenceSchema = z.object({
  label: z.string().min(2),
  detail: z.string().min(8),
  note: z.string().min(8),
});

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(2),
  eyebrow: z.string().min(2),
  summary: z.string().min(20),
  problem: z.string().min(20),
  solution: z.string().min(20),
  outcome: z.string().min(20),
  role: z.string().min(2),
  industry: z.string().min(2),
  platform: z.string().min(2),
  liveUrl: z.string().url(),
  featured: z.boolean(),
  published: z.boolean(),
  order: z.number().int().nonnegative(),
  skills: z.array(z.string().min(2)).min(2),
  technologies: z.array(z.string().min(1)).min(2),
  evidence: z.array(evidenceSchema).max(4),
  cover: z.string().startsWith("/projects/"),
  coverAlt: z.string().min(10),
  theme: z.enum(["lime", "blue", "amber", "rose", "mono"]),
});

export type Project = z.infer<typeof projectSchema> & { body: string };
