import { describe, expect, it } from "vitest";
import { buildContactBrief, buildTelegramMessage } from "@/lib/contact-delivery";

const brief = {
  name: "Project owner",
  email: "owner@example.com",
  company: "Example Company",
  projectType: "B2B platform",
  budget: "$5,000–$10,000",
  launchDate: "October",
  description: "A detailed project description with enough context for a practical follow-up.",
};

describe("contact delivery", () => {
  it("builds a complete plain-text brief", () => {
    const message = buildContactBrief(brief, "request-id");
    expect(message).toContain("Request request-id");
    expect(message).toContain("Email: owner@example.com");
    expect(message).toContain("Project: B2B platform");
    expect(message).toContain(brief.description);
  });

  it("keeps Telegram messages below the delivery limit", () => {
    const message = buildTelegramMessage({ ...brief, description: "x".repeat(4000) }, "request-id");
    expect(message.length).toBeLessThanOrEqual(3900);
    expect(message.endsWith("…")).toBe(true);
  });
});
