'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Search, LayoutGrid, List, X } from 'lucide-react';
import { software as allSoftware } from '@/lib/data';
import { SoftwareCard } from '@/components/software-card';
import { cn } from '@/lib/utils';

export function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const platform = searchParams.get('platform') || 'all';
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const results = useMemo(() => {
    let filtered = [...allSoftware];

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.developer.toLowerCase().includes(q) ||
          s.subcategory.toLowerCase().includes(q)
      );
    }

    if (platform && platform !== 'all') {
      filtered = filtered.filter((s) => s.platforms.includes(platform as any));
    }

    return filtered;
  }, [query, platform]);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <a href="/" className="hover:text-primary">Home</a>
        <span>/</span>
        <span className="font-medium text-foreground">Search</span>
      </nav>

      {/* Search header */}
      <div className="mt-4 rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Search className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">
              {query ? `Search results for "${query}"` : 'All Software'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {results.length} {results.length === 1 ? 'result' : 'results'} found
              {platform !== 'all' && ` for ${platform}`}
            </p>
          </div>
        </div>
      </div>

      {/* View toggle */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {query && (
            <span className="flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium">
              Query: "{query}"
              <a href={`/search${platform !== 'all' ? `?platform=${platform}` : ''}`}>
                <X className="h-3 w-3 cursor-pointer hover:text-destructive" />
              </a>
            </span>
          )}
          {platform !== 'all' && (
            <span className="flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium">
              Platform: {platform}
              <a href={`/search${query ? `?q=${encodeURIComponent(query)}` : ''}`}>
                <X className="h-3 w-3 cursor-pointer hover:text-destructive" />
              </a>
            </span>
          )}
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

      {/* Results */}
      {results.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((sw) => (
              <SoftwareCard key={sw.id} software={sw} view="grid" />
            ))}
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {results.map((sw) => (
              <SoftwareCard key={sw.id} software={sw} view="list" />
            ))}
          </div>
        )
      ) : (
        <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
          <Search className="h-10 w-10 text-muted-foreground/30" />
          <p className="mt-4 text-sm font-medium">No results found</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Try different keywords or remove filters.
          </p>
          <a
            href="/"
            className="mt-4 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Back to Home
          </a>
        </div>
      )}
    </div>
  );
}
