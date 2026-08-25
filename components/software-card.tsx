'use client';

import Link from 'next/link';
import {
  Download,
  BadgeCheck,
  Calendar,
  HardDrive,
  Apple,
  Monitor,
  Smartphone,
  Terminal,
} from 'lucide-react';
import type { Software } from '@/lib/types';
import { StarRating } from '@/components/star-rating';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Windows: Monitor,
  Mac: Apple,
  Linux: Terminal,
  Android: Smartphone,
  iOS: Apple,
};

const licenseColors: Record<string, string> = {
  'Freeware': 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
  'Open Source': 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
  'Shareware': 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
  'Trial': 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
  'Paid': 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
};

interface SoftwareCardProps {
  software: Software;
  view?: 'grid' | 'list';
}

export function SoftwareCard({ software: sw, view = 'grid' }: SoftwareCardProps) {
  if (view === 'list') {
    return (
      <Link
        href={`/software/${sw.slug}`}
        className="group flex items-center gap-4 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/50 hover:shadow-md"
      >
        {/* Icon */}
        <div className={cn(
          'flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-sm',
          sw.iconColor,
          'h-12 w-12'
        )}>
          <span className="text-lg font-bold">{sw.name.charAt(0)}</span>
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-bold group-hover:text-primary">
              {sw.name}
            </h3>
            <span className="shrink-0 text-xs text-muted-foreground">v{sw.version}</span>
            {sw.verified && (
              <BadgeCheck className="h-4 w-4 shrink-0 text-success" />
            )}
          </div>
          <p className="truncate text-xs text-muted-foreground">{sw.developer}</p>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{sw.description}</p>
          <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
            <StarRating rating={sw.rating} size="sm" />
            <span>{sw.downloads} downloads</span>
            <span className="hidden sm:inline">{sw.fileSize}</span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex shrink-0 flex-col items-end gap-2">
          <span className={cn('rounded px-2 py-0.5 text-[10px] font-bold', licenseColors[sw.license])}>
            {sw.license}
          </span>
          <div className="flex items-center gap-1">
            {sw.platforms.slice(0, 3).map((p) => {
              const Icon = platformIcons[p] || Monitor;
              return <Icon key={p} className="h-3.5 w-3.5 text-muted-foreground" />;
            })}
          </div>
          <div className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
            <Download className="h-3.5 w-3.5" />
            Download
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/software/${sw.slug}`}
      className="group flex flex-col rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
    >
      {/* Top: icon + title */}
      <div className="flex items-start gap-3">
        <div className={cn(
          'flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-sm',
          sw.iconColor,
          'h-12 w-12'
        )}>
          <span className="text-lg font-bold">{sw.name.charAt(0)}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-sm font-bold group-hover:text-primary">
              {sw.name}
            </h3>
            {sw.verified && (
              <BadgeCheck className="h-4 w-4 shrink-0 text-success" />
            )}
          </div>
          <p className="truncate text-xs text-muted-foreground">
            v{sw.version} · {sw.developer}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 line-clamp-2 flex-1 text-xs text-muted-foreground">
        {sw.description}
      </p>

      {/* Platforms */}
      <div className="mt-3 flex items-center gap-1.5">
        {sw.platforms.map((p) => {
          const Icon = platformIcons[p] || Monitor;
          return (
            <span key={p} className="flex h-6 w-6 items-center justify-center rounded bg-muted text-muted-foreground" title={p}>
              <Icon className="h-3.5 w-3.5" />
            </span>
          );
        })}
        <span className={cn('ml-auto rounded px-2 py-0.5 text-[10px] font-bold', licenseColors[sw.license])}>
          {sw.license}
        </span>
      </div>

      {/* Stats */}
      <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
        <StarRating rating={sw.rating} size="sm" />
        <span>{sw.downloads} downloads</span>
      </div>

      <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {formatDate(sw.updatedAt)}
        </span>
        <span className="flex items-center gap-1">
          <HardDrive className="h-3 w-3" />
          {sw.fileSize}
        </span>
      </div>

      {/* Download button */}
      <div className="mt-3 flex items-center justify-center gap-2 rounded-md bg-primary py-2 text-sm font-semibold text-primary-foreground transition-colors group-hover:bg-primary/90">
        <Download className="h-4 w-4" />
        Download Now
      </div>
    </Link>
  );
}
