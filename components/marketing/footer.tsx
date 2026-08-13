import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const footerSections = [
  {
    title: "Platform",
    links: [
      { label: "Carbon Blueprint", href: ROUTES.HOME },
      { label: "AI Eco Coach", href: ROUTES.HOME },
      { label: "Community Challenges", href: ROUTES.HOME },
      { label: "Rewards", href: ROUTES.HOME },
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: ROUTES.HOME },
      { label: "Privacy Policy", href: ROUTES.HOME },
      { label: "Terms of Service", href: ROUTES.HOME },
      { label: "Contact Us", href: ROUTES.HOME },
    ]
  },
  {
    title: "Organizations",
    links: [
      { label: "Enterprise Solutions", href: ROUTES.HOME },
      { label: "Universities", href: ROUTES.HOME },
      { label: "NGOs", href: ROUTES.HOME },
      { label: "Success Stories", href: ROUTES.HOME },
    ]
  }
];

export function Footer() {
  return (
    <footer className="bg-[#030406] border-t border-white/10 pt-20 pb-10">
      <div className="container-eco">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="md:col-span-1">
            <Link href={ROUTES.HOME} className="flex items-center gap-2 mb-6 group inline-flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-eco-green to-eco-blue">
                <svg width="16" height="16" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4z" fill="rgba(255,255,255,0.15)" />
                  <path d="M16 8C11.582 8 8 11.582 8 16c0 2.804 1.372 5.29 3.49 6.835C12.558 20.102 14.13 18 16 18s3.442 2.102 4.51 4.835A7.965 7.965 0 0024 16c0-4.418-3.582-8-8-8z" fill="white" fillOpacity="0.9" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Eco<span className="text-eco-green">Nexus</span>
              </span>
            </Link>
            <p className="text-sm text-eco-text-muted leading-relaxed max-w-xs">
              An AI-powered sustainability platform helping individuals and organizations reduce their environmental impact.
            </p>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-wider">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <Link href={link.href} className="text-sm text-eco-text-secondary hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs text-eco-text-muted">
          <p>© {new Date().getFullYear()} EcoNexus. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href={ROUTES.HOME} className="hover:text-white transition-colors">Twitter</Link>
            <Link href={ROUTES.HOME} className="hover:text-white transition-colors">GitHub</Link>
            <Link href={ROUTES.HOME} className="hover:text-white transition-colors">LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
