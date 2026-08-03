"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { primaryNavigation } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="ELVN Studio home">
          <span className="brand-mark" aria-hidden="true">E</span>
          <span>ELVN <em>Studio</em></span>
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          <span>{open ? "Close" : "Menu"}</span>
        </button>
        <nav id="site-navigation" className={open ? "nav open" : "nav"} aria-label="Primary navigation">
          {primaryNavigation.map((item) => (
            <Link className={pathname.startsWith(item.href) ? "active" : ""} href={item.href} key={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link className="button button-small" href="/contact" onClick={() => setOpen(false)}>Discuss a project</Link>
        </nav>
      </div>
    </header>
  );
}
