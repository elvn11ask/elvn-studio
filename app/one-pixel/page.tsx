import type { Metadata } from "next";
import Image from "next/image";
import { OnePixelWitness } from "@/components/one-pixel-witness";
import { site } from "@/lib/site";
import "./one-pixel.css";

export const metadata: Metadata = {
  title: "ONE PIXEL — Cosmic Narrative RPG",
  description: "ONE PIXEL is an iPhone-first cosmic narrative RPG about memory, mercy and a universe capable of forgetting its own history. Follow the honest development log.",
  alternates: { canonical: "/one-pixel" },
  openGraph: {
    type: "website",
    url: "/one-pixel",
    title: "ONE PIXEL — Cosmic Narrative RPG | ELVN Studio",
    description: "A costly choice. A missing person. One impossible street. See the playable Dock Nine story slice and development roadmap.",
    images: [{ url: "/one-pixel/dock-nine-live-simulator.png", width: 2532, height: 1170, alt: "Live ONE PIXEL Dock Nine gameplay in iPhone Simulator, showing Mara warning the party as Extra Street is erased" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ONE PIXEL — Dock Nine is playable",
    description: "The first story slice now runs from contradiction to costly choice. Development remains honest and in progress.",
    images: ["/one-pixel/dock-nine-live-simulator.png"],
  },
};

const party = [
  { name: "Mara", role: "She gives impossible things weight.", image: "/one-pixel/mara-concept.webp", width: 1200, height: 676, position: "center" },
  { name: "Cael", role: "She knows the cost of an official truth.", image: "/one-pixel/cael-concept.webp", width: 1200, height: 800, position: "center" },
  { name: "Witness", role: "You can hold two impossible truths long enough to act.", image: "/one-pixel/witness-concept.webp", width: 1200, height: 676, position: "center" },
  { name: "Tavi", role: "The missing route remembers her, even when the world does not.", image: "/one-pixel/tavi-concept.png", width: 1536, height: 1024, position: "center 18%" },
] as const;

const journey = [
  { name: "Sentence", image: "/one-pixel/sentence-concept.webp", width: 1600, height: 901, alt: "Concept sheet for the crew's weathered ring-shaped ship Sentence" },
  { name: "Myr", image: "/one-pixel/myr-concept.webp", width: 1600, height: 901, alt: "Early environment concept for a bright floating settlement above an alien sea" },
  { name: "Vesper", image: "/one-pixel/vesper-concept.webp", width: 1600, height: 901, alt: "Early environment concept for a distant cosmic city" },
] as const;

const milestones = [
  ["Story campaign", "Locked"],
  ["Localization architecture", "134 semantic IDs · 8 layout locales"],
  ["Dock Nine story slice", "Playable · clarity rescue in validation"],
  ["Physical iPhone", "Install/launch proven · full retest pending"],
  ["Blind player gate", "Pending"],
  ["Alpha campaign", "Not announced"],
] as const;

const updates = [
  { date: "01 SEP 2026", tag: "PLAYABLE BUILD", title: "Dock Nine rescue pass", body: "The opening now centers on a dead man standing at his own funeral. Faster grounded movement, close-up facial animation, seven narrative 8-bit arrangements and restrained ambient ships, lamps, trams and cloth were rebuilt around first-time clarity.", href: "#dock-nine-live" },
  { date: "31 AUG 2026", tag: "CHARACTERS", title: "The cast gets its own motion language", body: "Witness, Mara, Sera and Olan now use distinct concept-derived runtime atlases, authored walk cadence and scene-specific reactions instead of a shared placeholder body.", href: "#characters" },
  { date: "30 AUG 2026", tag: "WORLD", title: "The signal goes public", body: "The first official ONE PIXEL page established the world, Witness mechanic, Sentence, Myr and Vesper without presenting concept art as final gameplay.", href: "#world" },
] as const;

const roadmap = [
  { step: "01", state: "COMPLETE", title: "Narrative foundation", body: "Six-to-eight-hour campaign, canonical cast, Witness, failure-forward and three ending families." },
  { step: "02", state: "VALIDATING", title: "Dock Nine vertical slice", body: "A complete story loop from Olan's contradiction through Extra Street to one costly decision." },
  { step: "03", state: "GATED", title: "Unfinished Sentence", body: "Party hub and first expedition begin only after uncoached clarity, grounded feel and music pass on iPhone." },
  { step: "04", state: "PLANNED", title: "Campaign production", body: "Expeditions, ship encounters, worlds and branching consequences produced from the validated core." },
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
          <p className="op-lede">A cosmic narrative RPG about memory, mercy and a universe that can forget its own history.</p>
          <div className="op-actions">
            <a className="op-primary" href="#dock-nine-live">See live gameplay <span aria-hidden="true">↓</span></a>
            <a className="op-secondary" href="#devlog">Latest update</a>
          </div>
        </div>
      </section>

      <nav className="op-subnav" aria-label="ONE PIXEL page navigation">
        <div className="op-shell"><span>ONE PIXEL</span><a href="#the-game">Game</a><a href="#dock-nine-live">Gameplay</a><a href="#characters">Characters</a><a href="#devlog">Devlog</a><a href="#roadmap">Roadmap</a><a href="#follow">Follow</a></div>
      </nav>

      <div className="op-main">
        <section className="op-intro op-shell" id="world" aria-labelledby="world-title">
          <p className="op-kicker">The world</p>
          <h2 id="world-title">The universe does not end.<br />It revises itself.</h2>
          <p>Travel with a damaged crew through places built from remembered laws. Every contradiction has witnesses. Every mercy leaves evidence. Sometimes survival means deciding which truth the world is allowed to keep.</p>
        </section>

        <OnePixelWitness />

        <section className="op-section op-live" id="dock-nine-live" aria-labelledby="live-title">
          <div className="op-shell">
            <header className="op-section-heading"><div><p className="op-kicker">Live build · Simulator</p><h2 id="live-title">A street is being erased under their feet.</h2></div><p>This is a real frame from the current Swift/SpriteKit executable—not a cinematic mockup. The debug launch only places the build at a reproducible story beat.</p></header>
            <figure className="op-live-frame">
              <Image src="/one-pixel/dock-nine-live-simulator.png" alt="Live ONE PIXEL gameplay in iPhone Simulator: Mara's animated portrait warns that Correction is deleting Extra Street, while the far door remains visible ahead" width={2532} height={1170} sizes="(max-width: 760px) 100vw, 1240px" priority />
              <figcaption><span>DOCK NINE · EXTRA STREET</span><small>Playable development build 0.2.1 · September 2026</small></figcaption>
            </figure>
            <div className="op-live-facts"><p><strong>Immediate question</strong><span>What is disappearing?</span></p><p><strong>Player action</strong><span>Preserve human truths. Reach the far door.</span></p><p><strong>Current gate</strong><span>Uncoached iPhone retest pending.</span></p></div>
          </div>
        </section>

        <section className="op-section op-shell" id="characters" aria-labelledby="party-title">
          <header className="op-section-heading"><div><p className="op-kicker">The party</p><h2 id="party-title">No one survives a contradiction alone.</h2></div><p>Concept development feeds distinct runtime silhouettes, portraits and animation. These sheets are direction—not a claim of final production art.</p></header>
          <div className="op-party-grid">
            {party.map((member) => <article key={member.name} className="op-party-card">
              <div className="op-image-wrap"><Image src={member.image} alt={`${member.name} pixel-art character concept sheet`} width={member.width} height={member.height} sizes="(max-width: 760px) 100vw, 25vw" style={{ objectPosition: member.position }} /></div>
              <div><span>Character concept · WIP</span><h3>{member.name}</h3><p>{member.role}</p></div>
            </article>)}
          </div>
          <figure className="op-target-sheet"><Image src="/one-pixel/core-party-target-sheet.png" alt="ONE PIXEL core party target sheet showing eight distinct pixel-art silhouettes, scale studies and palette references" width={1672} height={941} sizes="(max-width: 760px) 100vw, 1240px" /><figcaption>Core party target sheet · silhouette and palette direction</figcaption></figure>
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
            <li><span>02</span><strong>Witness</strong><p>Hold incompatible truths in view long enough to reveal an action the official world removed.</p></li>
            <li><span>03</span><strong>Failure-forward</strong><p>Contact can erase a name, detail or route without turning the story into a restart screen.</p></li>
            <li><span>04</span><strong>Costly decisions</strong><p>Every solution saves something, loses something and changes what the party remembers.</p></li>
          </ul>
        </section>

        <section className="op-section op-devlog" id="devlog" aria-labelledby="devlog-title"><div className="op-shell op-devlog-layout">
          <header><p className="op-kicker">Development log</p><h2 id="devlog-title">Signals from production.</h2><p>No invented release dates. No concept art labeled as gameplay. Every update states what runs, what changed and what remains unproven.</p></header>
          <div className="op-news-list">{updates.map((update) => <article key={update.date}><div><time>{update.date}</time><span>{update.tag}</span></div><h3>{update.title}</h3><p>{update.body}</p><a href={update.href}>View evidence <span aria-hidden="true">↗</span></a></article>)}</div>
        </div></section>

        <section className="op-section op-shell" id="roadmap" aria-labelledby="roadmap-title">
          <header className="op-section-heading"><div><p className="op-kicker">Roadmap</p><h2 id="roadmap-title">Prove the game before expanding it.</h2></div><p>Dates stay unannounced until scope and human validation support them. Gates are part of the roadmap, not footnotes.</p></header>
          <ol className="op-roadmap">{roadmap.map((item) => <li key={item.step}><span>{item.step}</span><small>{item.state}</small><h3>{item.title}</h3><p>{item.body}</p></li>)}</ol>
        </section>

        <section className="op-section op-development" aria-labelledby="development-title"><div className="op-shell">
          <header className="op-section-heading"><div><p className="op-kicker">Current state</p><h2 id="development-title">The honest state of the universe.</h2></div><p>Dock Nine is the active executable. The current source builds, installs and launches on iPhone 13; the next decisive evidence is a full speaker/headphone route and three uncoached playthroughs.</p></header>
          <dl>{milestones.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        </div></section>

        <section className="op-section op-shell op-follow" id="follow" aria-labelledby="follow-title">
          <div><p className="op-kicker">Follow</p><h2 id="follow-title">If the universe forgets,<br />we will leave a signal.</h2></div>
          <div><a className="op-primary" href={rememberHref}>REMEMBER ME <span aria-hidden="true">↗</span></a><p>Major development updates and possible future TestFlight invitations. This temporary link opens your email app; no address is collected on this page.</p><nav aria-label="ONE PIXEL social links"><a href={site.social.x} target="_blank" rel="noreferrer">X</a><a href={site.social.telegram} target="_blank" rel="noreferrer">Telegram</a><a href={site.social.github} target="_blank" rel="noreferrer">GitHub</a></nav></div>
        </section>
      </div>
    </div>
  );
}
