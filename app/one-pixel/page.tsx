import type { Metadata } from "next";
import Image from "next/image";
import { OnePixelWitness } from "@/components/one-pixel-witness";
import { site } from "@/lib/site";
import "./one-pixel.css";

export const metadata: Metadata = {
  title: "ONE PIXEL — Cosmic D&D Adventure",
  description: "ONE PIXEL is a story-driven cosmic RPG about memory, mercy and a universe capable of forgetting its own history. In development by ELVN Studio.",
  alternates: { canonical: "/one-pixel" },
  openGraph: {
    type: "website",
    url: "/one-pixel",
    title: "ONE PIXEL — Cosmic D&D Adventure | ELVN Studio",
    description: "A story-driven cosmic RPG about memory, mercy and a universe capable of forgetting its own history.",
    images: [{ url: "/one-pixel/one-pixel-og.webp", width: 1200, height: 676, alt: "ONE PIXEL early visual development concept" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ONE PIXEL — Cosmic D&D Adventure | ELVN Studio",
    description: "A story-driven cosmic RPG about memory, mercy and a universe capable of forgetting its own history.",
    images: ["/one-pixel/one-pixel-og.webp"],
  },
};

const party = [
  { name: "Mara", role: "She gives impossible things weight.", image: "/one-pixel/mara-concept.webp", width: 1200, height: 676, position: "center" },
  { name: "Cael", role: "She knows the cost of an official truth.", image: "/one-pixel/cael-concept.webp", width: 1200, height: 800, position: "center" },
  { name: "Witness", role: "You can see the history reality erased.", image: "/one-pixel/witness-concept.webp", width: 1200, height: 676, position: "center" },
] as const;

const journey = [
  { name: "Sentence", image: "/one-pixel/sentence-concept.webp", width: 1600, height: 901, alt: "Concept sheet for the crew's weathered ring-shaped ship Sentence" },
  { name: "Myr", image: "/one-pixel/myr-concept.webp", width: 1600, height: 901, alt: "Early environment concept for a bright floating settlement above an alien sea" },
  { name: "Vesper", image: "/one-pixel/vesper-concept.webp", width: 1600, height: 901, alt: "Early environment concept for a distant cosmic city" },
] as const;

const milestones = [
  ["Story", "Locked"],
  ["Localization architecture", "Complete"],
  ["Visual development", "In progress"],
  ["Gameplay model", "Locked for prototyping"],
  ["Relay Six prototype", "Simulator pass · iPhone validation blocked"],
  ["Alpha", "TBD"],
] as const;

export default function OnePixelPage() {
  const rememberHref = `mailto:${site.email}?subject=${encodeURIComponent("REMEMBER ME — ONE PIXEL updates")}&body=${encodeURIComponent("Please remember me for major ONE PIXEL development updates and future TestFlight invitations.\n\nI understand this opens my email app and that I can unsubscribe at any time.")}`;

  return (
    <div className="one-pixel-page">
      <section className="op-hero" aria-labelledby="one-pixel-title">
        <div className="op-starfield" aria-hidden="true" />
        <div className="op-pixel" aria-hidden="true" />
        <div className="op-hero-copy">
          <p className="op-kicker">ELVN Studio · In development</p>
          <h1 id="one-pixel-title">ONE PIXEL</h1>
          <p className="op-hook">Someone was saved.<br />Someone else was forgotten.</p>
          <p className="op-lede">A cosmic D&amp;D adventure about memory, mercy and a universe that can forget its own history.</p>
          <div className="op-actions">
            <a className="op-primary" href={rememberHref}>REMEMBER ME <span aria-hidden="true">↗</span></a>
            <a className="op-secondary" href="#the-game">Discover the game</a>
          </div>
          <p className="op-privacy-note">Opens your email app. No address is collected on this page.</p>
        </div>
      </section>

      <div className="op-main">
        <section className="op-intro op-shell" aria-labelledby="world-title">
          <p className="op-kicker">The world</p>
          <h2 id="world-title">The universe does not end.<br />It revises itself.</h2>
          <p>Travel with a damaged crew through places built from remembered laws. Every contradiction has witnesses. Every mercy leaves evidence. Sometimes survival means deciding which truth the world is allowed to keep.</p>
        </section>

        <OnePixelWitness />

        <section className="op-section op-shell" aria-labelledby="party-title">
          <header className="op-section-heading"><div><p className="op-kicker">The party</p><h2 id="party-title">No one survives a contradiction alone.</h2></div><p>Three spoiler-safe portraits from early visual development. Character appearance and animation remain work in progress.</p></header>
          <div className="op-party-grid">
            {party.map((member) => <article key={member.name} className="op-party-card">
              <div className="op-image-wrap"><Image src={member.image} alt={`${member.name} character concept art`} width={member.width} height={member.height} sizes="(max-width: 760px) 100vw, 33vw" style={{ objectPosition: member.position }} /></div>
              <div><span>Concept art · WIP</span><h3>{member.name}</h3><p>{member.role}</p></div>
            </article>)}
          </div>
        </section>

        <section className="op-section op-journey" aria-labelledby="journey-title">
          <div className="op-shell"><header className="op-section-heading"><div><p className="op-kicker">The journey</p><h2 id="journey-title">A ship, a sea, a city that remembers differently.</h2></div><p>Environment and ship target sheets guide scale, palette and atmosphere. They are not final gameplay screenshots.</p></header></div>
          <div className="op-journey-grid">
            {journey.map((place) => <figure key={place.name}><Image src={place.image} alt={place.alt} width={place.width} height={place.height} sizes="(max-width: 760px) 94vw, 65vw" /><figcaption><span>{place.name}</span><small>Early visual development</small></figcaption></figure>)}
          </div>
        </section>

        <section className="op-section op-shell op-game" id="the-game" aria-labelledby="game-title">
          <div><p className="op-kicker">The game</p><h2 id="game-title">Explore. Witness. Commit. Live with it.</h2><p className="op-game-lede">ONE PIXEL is being built as a premium, iPhone-first, story-driven cosmic RPG. The target is a branching six-to-eight-hour campaign where the party acts on your decisions—and sometimes refuses them.</p></div>
          <ul>
            <li><span>01</span><strong>Party-driven exploration</strong><p>Companions read the world, remember choices and act for reasons of their own.</p></li>
            <li><span>02</span><strong>Consequential decisions</strong><p>Success, success with cost and failure-forward all keep the story moving.</p></li>
            <li><span>03</span><strong>Witness</strong><p>Reveal contradictions that ordinary history has hidden, at a risk to yourself and the party.</p></li>
            <li><span>04</span><strong>Premium direction</strong><p>No ads. No invented release date. Gameplay is being proven before full production art.</p></li>
          </ul>
        </section>

        <section className="op-section op-development" aria-labelledby="development-title"><div className="op-shell">
          <header className="op-section-heading"><div><p className="op-kicker">Development</p><h2 id="development-title">The honest state of the universe.</h2></div><p>The current Relay Six prototype builds and runs in Simulator. Physical iPhone feel validation is still blocked, so the gameplay gate remains open.</p></header>
          <dl>{milestones.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        </div></section>

        <section className="op-section op-shell op-follow" aria-labelledby="follow-title">
          <div><p className="op-kicker">Follow</p><h2 id="follow-title">If the universe forgets,<br />we will leave a signal.</h2></div>
          <div><a className="op-primary" href={rememberHref}>REMEMBER ME <span aria-hidden="true">↗</span></a><p>Major development updates and possible future TestFlight invitations. This temporary link uses your email app; a consent-based mailing service has not been connected yet.</p><nav aria-label="ONE PIXEL social links"><a href={site.social.x} target="_blank" rel="noreferrer">X</a><a href={site.social.telegram} target="_blank" rel="noreferrer">Telegram</a><a href={site.social.github} target="_blank" rel="noreferrer">GitHub</a></nav></div>
        </section>
      </div>
    </div>
  );
}
