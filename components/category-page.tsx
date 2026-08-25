'use client';

import { useState, useMemo } from 'react';
import {
  LayoutGrid,
  List,
  Filter,
  ChevronDown,
  Shield,
  Film,
  Wrench,
  Globe,
  FileText,
  Code,
  Gamepad2,
  HardDrive,
} from 'lucide-react';
import type { Software, ViewMode, LicenseType } from '@/lib/types';
import { SoftwareCard } from '@/components/software-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

interface CategoryPageProps {
  categoryName: string;
  categorySlug: string;
  categoryIcon: string;
  categoryDescription: string;
  subcategories: { name: string; count: number }[];
  software: Software[];
}

const licenseOptions: LicenseType[] = ['Freeware', 'Open Source', 'Shareware', 'Trial', 'Paid'];
const archOptions = ['64-bit', '32-bit', 'ARM', 'ARM64'];
const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'recent', label: 'Recently Updated' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'downloads', label: 'Most Downloaded' },
];

export function CategoryPage({
  categoryName,
  categoryIcon,
  categoryDescription,
  subcategories,
  software: allSoftware,
}: CategoryPageProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedSub, setSelectedSub] = useState<string>('all');
  const [selectedLicense, setSelectedLicense] = useState<string>('all');
  const [selectedArch, setSelectedArch] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [visibleCount, setVisibleCount] = useState(10);

  const Icon = iconMap[categoryIcon] || Shield;

  const filteredSoftware = useMemo(() => {
    let result = [...allSoftware];

    if (selectedSub !== 'all') {
      result = result.filter((s) => s.subcategory === selectedSub);
    }
    if (selectedLicense !== 'all') {
      result = result.filter((s) => s.license === selectedLicense);
    }
    if (selectedArch !== 'all') {
      result = result.filter((s) =>
        s.architectures.some((a) => a.toLowerCase().includes(selectedArch.toLowerCase()))
      );
    }

    const downloadsValue = (d: string) => {
      const num = parseFloat(d);
      if (d.includes('M')) return num * 1000000;
      if (d.includes('K')) return num * 1000;
      return num;
    };

    switch (sortBy) {
      case 'recent':
        result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'downloads':
        result.sort((a, b) => downloadsValue(b.downloads) - downloadsValue(a.downloads));
        break;
      default:
        result.sort((a, b) => b.views - a.views);
    }

    return result;
  }, [allSoftware, selectedSub, selectedLicense, selectedArch, sortBy]);

  const visibleSoftware = filteredSoftware.slice(0, visibleCount);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <a href="/" className="hover:text-primary">Home</a>
        <span>/</span>
        <span className="font-medium text-foreground">{categoryName}</span>
      </nav>

      {/* Category header */}
      <div className="mt-4 rounded-xl border border-border bg-gradient-to-br from-primary/10 to-card p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
            <Icon className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{categoryName}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{categoryDescription}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-3xl font-bold text-primary">{allSoftware.length}</p>
            <p className="text-xs text-muted-foreground">apps available</p>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="mt-6 flex flex-col gap-3 rounded-lg border border-border bg-card p-4 lg:flex-row lg:items-center">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Filter className="h-4 w-4 text-primary" />
          Filters:
        </div>

        <Select value={selectedSub} onValueChange={setSelectedSub}>
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="Subcategory" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subcategories</SelectItem>
            {subcategories.map((sub) => (
              <SelectItem key={sub.name} value={sub.name}>
                {sub.name} ({sub.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedLicense} onValueChange={setSelectedLicense}>
          <SelectTrigger className="w-full lg:w-[150px]">
            <SelectValue placeholder="License" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Licenses</SelectItem>
            {licenseOptions.map((l) => (
              <SelectItem key={l} value={l}>{l}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedArch} onValueChange={setSelectedArch}>
          <SelectTrigger className="w-full lg:w-[140px]">
            <SelectValue placeholder="Architecture" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Architectures</SelectItem>
            {archOptions.map((a) => (
              <SelectItem key={a} value={a}>{a}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2 lg:ml-auto">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-1 rounded-lg border border-border p-1">
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
      </div>

      {/* Results count */}
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <p>
          Showing <span className="font-bold text-foreground">{visibleSoftware.length}</span> of{' '}
          <span className="font-bold text-foreground">{filteredSoftware.length}</span> results
        </p>
      </div>

      {/* Software list/grid */}
      {visibleSoftware.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleSoftware.map((sw) => (
              <SoftwareCard key={sw.id} software={sw} view="grid" />
            ))}
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {visibleSoftware.map((sw) => (
              <SoftwareCard key={sw.id} software={sw} view="list" />
            ))}
          </div>
        )
      ) : (
        <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
          <Filter className="h-10 w-10 text-muted-foreground/30" />
          <p className="mt-4 text-sm font-medium">No software matches your filters</p>
          <p className="mt-1 text-xs text-muted-foreground">Try adjusting or clearing your filter selections.</p>
          <button
            onClick={() => {
              setSelectedSub('all');
              setSelectedLicense('all');
              setSelectedArch('all');
            }}
            className="mt-4 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Load more */}
      {visibleCount < filteredSoftware.length && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setVisibleCount((c) => c + 10)}
            className="flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
          >
            Load More
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
