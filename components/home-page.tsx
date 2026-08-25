'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Download,
  BadgeCheck,
  Star,
  LayoutGrid,
  List,
  Flame,
  TrendingUp,
  Clock,
  Shield,
  Apple,
  Monitor,
  Smartphone,
  Terminal,
  ChevronRight,
} from 'lucide-react';
import { software } from '@/lib/data';
import type { Software, SortTab, ViewMode } from '@/lib/types';
import { SoftwareCard } from '@/components/software-card';
import { StarRating } from '@/components/star-rating';
import { cn } from '@/lib/utils';

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Windows: Monitor,
  Mac: Apple,
  Linux: Terminal,
  Android: Smartphone,
  iOS: Apple,
};

const tabs: { id: SortTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'latest', label: 'Latest Downloads', icon: Clock },
  { id: 'top-rated', label: 'Top Rated', icon: Star },
  { id: 'trending', label: 'Trending Software', icon: Flame },
];

function getSortedSoftware(tab: SortTab): Software[] {
  const sorted = [...software];
  if (tab === 'latest') {
    return sorted.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }
  if (tab === 'top-rated') {
    return sorted.sort((a, b) => b.rating - a.rating);
  }
  if (tab === 'trending') {
    return sorted.sort((a, b) => b.views - a.views);
  }
  return sorted;
}

export function HomePage() {
  const [activeTab, setActiveTab] = useState<SortTab>('latest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [visibleCount, setVisibleCount] = useState(8);

  const editorPick = software[0]; // VLC
  const sortedSoftware = getSortedSoftware(activeTab);
  const visibleSoftware = sortedSoftware.slice(0, visibleCount);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6">
      <div className="flex gap-6">
        {/* Left Sidebar */}
        <div className="hidden lg:block">
          <LeftSidebarWrapper />
        </div>

        {/* Main content */}
        <main className="min-w-0 flex-1 space-y-6">
          {/* Hero / Editor's Pick */}
          <div className="overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary/10 via-card to-card">
            <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary-foreground">
                    Editor&apos;s Pick
                  </span>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                    {editorPick.license}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className={cn(
                    'flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br text-2xl font-bold text-white shadow-lg',
                    editorPick.iconColor
                  )}>
                    {editorPick.name.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                      {editorPick.name} <span className="text-lg text-muted-foreground">v{editorPick.version}</span>
                    </h1>
                    <p className="text-sm text-muted-foreground">by {editorPick.developer}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <StarRating rating={editorPick.rating} size="md" showVotes votes={editorPick.votes} />
                  {editorPick.verified && (
                    <span className="flex items-center gap-1 text-sm font-medium text-success">
                      <BadgeCheck className="h-4 w-4" />
                      Verified Safe
                    </span>
                  )}
                </div>

                <p className="max-w-xl text-sm text-muted-foreground">
                  {editorPick.description}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {editorPick.platforms.map((p) => {
                    const Icon = platformIcons[p] || Monitor;
                    return (
                      <span key={p} className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground">
                        <Icon className="h-3.5 w-3.5" />
                        {p}
                      </span>
                    );
                  })}
                  <span className="rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground">
                    {editorPick.fileSize}
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Link href={`/software/${editorPick.slug}`}>
                    <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg">
                      <Download className="h-4 w-4" />
                      Download Now
                    </button>
                  </Link>
                  <Link href={`/software/${editorPick.slug}`}>
                    <button className="flex items-center gap-1 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent">
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Stats panel */}
              <div className="hidden md:block">
                <div className="rounded-xl border border-border bg-card/80 p-6 backdrop-blur">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase text-muted-foreground">Total Downloads</p>
                      <p className="text-2xl font-bold text-primary">{editorPick.downloads}</p>
                    </div>
                    <div className="h-px bg-border" />
                    <div>
                      <p className="text-xs uppercase text-muted-foreground">User Rating</p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-2xl font-bold">{editorPick.rating}</span>
                        <span className="text-sm text-muted-foreground">/ 5.0</span>
                      </div>
                    </div>
                    <div className="h-px bg-border" />
                    <div>
                      <p className="text-xs uppercase text-muted-foreground">Last Updated</p>
                      <p className="text-sm font-semibold">{editorPick.updatedAt}</p>
                    </div>
                    <div className="h-px bg-border" />
                    <div>
                      <p className="text-xs uppercase text-muted-foreground">File Size</p>
                      <p className="text-sm font-semibold">{editorPick.fileSize}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabbed sorting + view toggle */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setVisibleCount(8);
                    }}
                    className={cn(
                      'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'flex items-center justify-center rounded-md p-1.5 transition-colors',
                  viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
                aria-label="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'flex items-center justify-center rounded-md p-1.5 transition-colors',
                  viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Software grid/list */}
          {viewMode === 'grid' ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visibleSoftware.map((sw) => (
                <SoftwareCard key={sw.id} software={sw} view="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {visibleSoftware.map((sw) => (
                <SoftwareCard key={sw.id} software={sw} view="list" />
              ))}
            </div>
          )}

          {/* Load more */}
          {visibleCount < sortedSoftware.length && (
            <div className="flex justify-center pt-4">
              <button
                onClick={() => setVisibleCount((c) => c + 8)}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
              >
                Load More Software
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Stats banner */}
          <div className="grid grid-cols-2 gap-4 rounded-xl border border-border bg-card p-6 md:grid-cols-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">15K+</p>
              <p className="mt-1 text-xs text-muted-foreground">Software Titles</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">8 Platforms</p>
              <p className="mt-1 text-xs text-muted-foreground">Supported</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">240M+</p>
              <p className="mt-1 text-xs text-muted-foreground">Total Downloads</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">99.9%</p>
              <p className="mt-1 text-xs text-muted-foreground">Virus-Free Rate</p>
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <div className="hidden xl:block">
          <RightSidebarWrapper />
        </div>
      </div>
    </div>
  );
}

// Wrapper components to avoid circular imports
import { LeftSidebar } from '@/components/left-sidebar';
import { RightSidebar } from '@/components/right-sidebar';

function LeftSidebarWrapper() {
  return <LeftSidebar />;
}

function RightSidebarWrapper() {
  return <RightSidebar />;
}
