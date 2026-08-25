'use client';

import Link from 'next/link';
import { TrendingUp, Newspaper, BadgeCheck, Download } from 'lucide-react';
import { getTopDownloads, newsItems } from '@/lib/data';
import { formatDate } from '@/lib/utils';

export function RightSidebar() {
  const topDownloads = getTopDownloads(10);

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-4">
      {/* Top 10 Daily Downloads */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-wide">Top 10 Downloads</h2>
        </div>
        <div className="p-2">
          {topDownloads.map((sw, index) => (
            <Link
              key={sw.id}
              href={`/software/${sw.slug}`}
              className="group flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-accent"
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                  index < 3
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium group-hover:text-primary">
                  {sw.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  v{sw.version} · {sw.downloads}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending News */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <Newspaper className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-bold uppercase tracking-wide">Tech News</h2>
        </div>
        <div className="divide-y divide-border">
          {newsItems.slice(0, 4).map((news) => (
            <Link
              key={news.id}
              href="/news"
              className="group block px-4 py-3 transition-colors hover:bg-accent"
            >
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary">
                  {news.category}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {formatDate(news.date)}
                </span>
              </div>
              <p className="text-sm font-medium leading-snug group-hover:text-primary">
                {news.title}
              </p>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                {news.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Sponsored / Ad placeholder */}
      <div className="rounded-lg border border-dashed border-border bg-secondary/30 p-6 text-center">
        <BadgeCheck className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
        <p className="text-xs font-medium text-muted-foreground">Sponsored Space</p>
        <p className="mt-1 text-[10px] text-muted-foreground/70">
          Your ad could be here. Reach millions of software users.
        </p>
      </div>

      {/* Safe download badge */}
      <div className="rounded-lg border border-success/30 bg-success/5 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success/10">
            <Download className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="text-sm font-semibold text-success">Verified Safe Downloads</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              All files are scanned for viruses and malware before publishing.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
