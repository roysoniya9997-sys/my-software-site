'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Shield,
  Film,
  Wrench,
  Globe,
  FileText,
  Code,
  Gamepad2,
  HardDrive,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { categories } from '@/lib/data';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Film,
  Wrench,
  Globe,
  FileText,
  Code,
  Gamepad2,
  HardDrive,
};

export function LeftSidebar() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <aside className="w-full lg:w-60 shrink-0">
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="text-sm font-bold uppercase tracking-wide">Categories</h2>
          <span className="text-xs text-muted-foreground">{categories.length} groups</span>
        </div>
        <nav className="p-2">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Shield;
            const isExpanded = expanded === cat.id;
            return (
              <div key={cat.id}>
                <div className="flex items-center">
                  <Link
                    href={`/category/${cat.slug}`}
                    className={cn(
                      'group flex flex-1 items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors hover:bg-accent',
                      isExpanded && 'bg-accent/50',
                    )}
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="flex-1 font-medium">{cat.name}</span>
                    <span className="text-xs text-muted-foreground">{cat.count.toLocaleString()}</span>
                  </Link>
                  <button
                    onClick={() => setExpanded(isExpanded ? null : cat.id)}
                    className="rounded-md p-1 text-muted-foreground hover:bg-accent"
                    aria-label="Toggle subcategories"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
                {isExpanded && (
                  <div className="ml-9 space-y-0.5 pb-1">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.name}
                        href={`/category/${cat.slug}?sub=${encodeURIComponent(sub.name)}`}
                        className="flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                      >
                        <span>{sub.name}</span>
                        <span className="text-[10px]">{sub.count}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Quick links */}
      <div className="mt-4 rounded-lg border border-border bg-card p-4">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide">Quick Links</h3>
        <div className="space-y-1.5">
          <Link href="/top-downloads" className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">
            Top Downloads
          </Link>
          <Link href="/latest" className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">
            Latest Updates
          </Link>
          <Link href="/editors-pick" className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">
            Editor&apos;s Picks
          </Link>
          <Link href="/submit" className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">
            Submit Software
          </Link>
        </div>
      </div>
    </aside>
  );
}
