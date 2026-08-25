import Link from 'next/link';
import { Boxes, Twitter, Github, Youtube, Rss } from 'lucide-react';

const footerLinks = {
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press Kit', href: '/press' },
  ],
  Software: [
    { label: 'Windows Apps', href: '/category/system' },
    { label: 'Mac Apps', href: '/category/multimedia' },
    { label: 'Linux Software', href: '/category/programming' },
    { label: 'Android Apps', href: '/category/security' },
    { label: 'iOS Apps', href: '/category/office' },
  ],
  Resources: [
    { label: 'Submit Software', href: '/submit' },
    { label: 'Developer Portal', href: '/developers' },
    { label: 'API Documentation', href: '/api-docs' },
    { label: 'Help Center', href: '/help' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'DMCA', href: '/dmca' },
  ],
};

export function Footer() {
  return (
    <footer className="mt-12 border-t border-border bg-card">
      <div className="mx-auto max-w-[1400px] px-4 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-600 text-primary-foreground shadow-md">
                <Boxes className="h-5 w-5" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight">SoftHub</span>
                <span className="ml-1 text-lg font-bold text-primary">Directory</span>
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Your trusted source for software downloads, tech news, and reviews since 2003.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                <Rss className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 SoftHub Directory. All rights reserved. All trademarks are property of their respective owners.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-success" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
