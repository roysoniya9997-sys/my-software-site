'use client';

import { useState } from 'react';
import {
  Download,
  BadgeCheck,
  Calendar,
  HardDrive,
  Star,
  Shield,
  CheckCircle2,
  ChevronDown,
  Monitor,
  Apple,
  Smartphone,
  Terminal,
  FileText,
  Image as ImageIcon,
  History,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Send,
} from 'lucide-react';
import type { Software, Review } from '@/lib/types';
import { getRelatedSoftware, getReviewsForSoftware } from '@/lib/data';
import { StarRating } from '@/components/star-rating';
import { SoftwareCard } from '@/components/software-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatDate, cn } from '@/lib/utils';

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

interface SoftwareDetailPageProps {
  software: Software;
  categoryName: string;
  categorySlug: string;
}

export function SoftwareDetailPage({
  software: sw,
  categoryName,
  categorySlug,
}: SoftwareDetailPageProps) {
  const [selectedArch, setSelectedArch] = useState(sw.architectures[0]);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [submittedReview, setSubmittedReview] = useState(false);

  const relatedSoftware = getRelatedSoftware(sw);
  const existingReviews = getReviewsForSoftware(sw.id);
  const allReviews: Review[] = submittedReview
    ? [
        ...existingReviews,
        {
          id: 'new',
          softwareId: sw.id,
          author: reviewAuthor || 'Anonymous',
          rating: reviewRating,
          date: new Date().toISOString().split('T')[0],
          title: reviewTitle,
          body: reviewBody,
        },
      ]
    : existingReviews;

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = allReviews.filter((r) => Math.round(r.rating) === star).length;
    const percent = allReviews.length > 0 ? (count / allReviews.length) * 100 : 0;
    return { star, count, percent };
  });

  const handleDownload = () => {
    setShowDownloadModal(true);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewTitle && reviewBody) {
      setSubmittedReview(true);
      setReviewTitle('');
      setReviewBody('');
      setReviewAuthor('');
      setReviewRating(5);
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <a href="/" className="hover:text-primary">Home</a>
        <span>/</span>
        <a href={`/category/${categorySlug}`} className="hover:text-primary">{categoryName}</a>
        <span>/</span>
        <a href={`/category/${categorySlug}?sub=${encodeURIComponent(sw.subcategory)}`} className="hover:text-primary">{sw.subcategory}</a>
        <span>/</span>
        <span className="font-medium text-foreground">{sw.name}</span>
      </nav>

      {/* Title bar */}
      <div className="mt-4 rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start">
          <div className={cn(
            'flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-3xl font-bold text-white shadow-lg',
            sw.iconColor
          )}>
            {sw.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{sw.name}</h1>
              <span className="text-lg text-muted-foreground">v{sw.version}</span>
              {sw.verified && (
                <span className="flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-1 text-xs font-bold text-success">
                  <BadgeCheck className="h-4 w-4" />
                  Verified Safe
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">by {sw.developer}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <StarRating rating={sw.rating} size="md" showVotes votes={sw.votes} />
              <span className={cn('rounded px-2.5 py-1 text-xs font-bold', licenseColors[sw.license])}>
                {sw.license}
              </span>
              <div className="flex items-center gap-1.5">
                {sw.platforms.map((p) => {
                  const Icon = platformIcons[p] || Monitor;
                  return (
                    <span key={p} className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-muted-foreground" title={p}>
                      <Icon className="h-4 w-4" />
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Quick stats bar */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-4 md:grid-cols-5">
          <div>
            <p className="text-xs uppercase text-muted-foreground">Total Downloads</p>
            <p className="mt-0.5 text-lg font-bold">{sw.downloads}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-muted-foreground">Rating</p>
            <p className="mt-0.5 text-lg font-bold">{sw.rating}/5</p>
          </div>
          <div>
            <p className="text-xs uppercase text-muted-foreground">License</p>
            <p className="mt-0.5 text-lg font-bold">{sw.license}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-muted-foreground">Last Updated</p>
            <p className="mt-0.5 text-lg font-bold">{formatDate(sw.updatedAt)}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-muted-foreground">File Size</p>
            <p className="mt-0.5 text-lg font-bold">{sw.fileSize}</p>
          </div>
        </div>

        {/* Download CTA */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Select Architecture / Format
            </label>
            <div className="flex flex-wrap gap-2">
              {sw.architectures.map((arch) => (
                <button
                  key={arch}
                  onClick={() => setSelectedArch(arch)}
                  className={cn(
                    'rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
                    selectedArch === arch
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/50'
                  )}
                >
                  {arch}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 text-base font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
          >
            <Download className="h-5 w-5" />
            Download Now
          </button>
        </div>
      </div>

      {/* Tabbed content */}
      <div className="mt-6">
        <Tabs defaultValue="overview">
          <TabsList className="flex h-auto w-full flex-wrap gap-1 border-b border-border bg-transparent p-0">
            <TabsTrigger value="overview" className="flex items-center gap-1.5 rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
              <FileText className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="specs" className="flex items-center gap-1.5 rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
              <HardDrive className="h-4 w-4" />
              Specifications
            </TabsTrigger>
            <TabsTrigger value="screenshots" className="flex items-center gap-1.5 rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
              <ImageIcon className="h-4 w-4" />
              Screenshots
            </TabsTrigger>
            <TabsTrigger value="changelog" className="flex items-center gap-1.5 rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
              <History className="h-4 w-4" />
              Changelog
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-1.5 rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">
              <MessageSquare className="h-4 w-4" />
              Reviews ({allReviews.length})
            </TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
              <div className="space-y-4">
                <h2 className="text-lg font-bold">About {sw.name}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{sw.longDescription}</p>

                <h3 className="pt-2 text-base font-bold">Key Features</h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {sw.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-card p-4">
                  <h3 className="mb-3 text-sm font-bold">Download Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Version</span>
                      <span className="font-medium">{sw.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">File Size</span>
                      <span className="font-medium">{sw.fileSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">License</span>
                      <span className="font-medium">{sw.license}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Updated</span>
                      <span className="font-medium">{formatDate(sw.updatedAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Developer</span>
                      <span className="font-medium">{sw.developer}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-success/30 bg-success/5 p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 shrink-0 text-success" />
                    <div>
                      <p className="text-sm font-semibold text-success">Virus Scan Report</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Last scanned: {formatDate(sw.updatedAt)}. No threats detected. File hash verified.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Specifications */}
          <TabsContent value="specs" className="mt-6">
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-sm">
                <tbody>
                  {sw.techSpecs.map((spec, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-card' : 'bg-secondary/30'}>
                      <td className="w-1/3 px-4 py-3 font-medium text-muted-foreground">{spec.label}</td>
                      <td className="px-4 py-3 font-medium">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Screenshots */}
          <TabsContent value="screenshots" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="flex aspect-video items-center justify-center rounded-lg border border-border bg-gradient-to-br from-secondary to-card"
                >
                  <div className="text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/30" />
                    <p className="mt-2 text-xs text-muted-foreground">Screenshot {i}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Click on a screenshot to view full size in a lightbox preview.
            </p>
          </TabsContent>

          {/* Changelog */}
          <TabsContent value="changelog" className="mt-6">
            <div className="space-y-6">
              {sw.changelog.map((entry, i) => (
                <div key={i} className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-3">
                    <span className="rounded-md bg-primary/10 px-2.5 py-1 text-sm font-bold text-primary">
                      v{entry.version}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatDate(entry.date)}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {entry.changes.map((change, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Reviews */}
          <TabsContent value="reviews" className="mt-6">
            <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
              {/* Rating summary */}
              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-card p-4 text-center">
                  <p className="text-4xl font-bold">{sw.rating}</p>
                  <StarRating rating={sw.rating} size="md" className="mt-2 justify-center" />
                  <p className="mt-1 text-xs text-muted-foreground">{sw.votes.toLocaleString()} votes</p>
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <h3 className="mb-3 text-sm font-bold">Rating Breakdown</h3>
                  <div className="space-y-2">
                    {ratingDistribution.map((d) => (
                      <div key={d.star} className="flex items-center gap-2">
                        <span className="flex w-8 items-center gap-0.5 text-xs">
                          {d.star}
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        </span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-amber-400 transition-all"
                            style={{ width: `${d.percent}%` }}
                          />
                        </div>
                        <span className="w-6 text-right text-xs text-muted-foreground">{d.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews list + form */}
              <div className="space-y-4">
                {/* Review form */}
                <form onSubmit={handleSubmitReview} className="rounded-lg border border-border bg-card p-4">
                  <h3 className="mb-3 text-sm font-bold">Write a Review</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Your Rating</Label>
                      <div className="mt-1 flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            className="p-0.5"
                          >
                            <Star
                              className={cn(
                                'h-6 w-6 transition-colors',
                                star <= reviewRating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-muted-foreground/30'
                              )}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="author" className="text-xs">Your Name</Label>
                      <Input
                        id="author"
                        value={reviewAuthor}
                        onChange={(e) => setReviewAuthor(e.target.value)}
                        placeholder="John Doe"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="title" className="text-xs">Review Title</Label>
                      <Input
                        id="title"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        placeholder="Great software!"
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="body" className="text-xs">Your Review</Label>
                      <Textarea
                        id="body"
                        value={reviewBody}
                        onChange={(e) => setReviewBody(e.target.value)}
                        placeholder="Share your experience..."
                        className="mt-1"
                        rows={4}
                        required
                      />
                    </div>
                    <Button type="submit" size="sm">
                      <Send className="mr-1.5 h-3.5 w-3.5" />
                      Submit Review
                    </Button>
                  </div>
                </form>

                {/* Reviews list */}
                {allReviews.map((review) => (
                  <div key={review.id} className="rounded-lg border border-border bg-card p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                            {review.author.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{review.author}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(review.date)}</p>
                          </div>
                        </div>
                      </div>
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <h4 className="mt-3 text-sm font-bold">{review.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{review.body}</p>
                    <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                      <button className="flex items-center gap-1 hover:text-foreground">
                        <ThumbsUp className="h-3.5 w-3.5" />
                        Helpful
                      </button>
                      <button className="flex items-center gap-1 hover:text-foreground">
                        <ThumbsDown className="h-3.5 w-3.5" />
                        Not helpful
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related software */}
      {relatedSoftware.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold">Related & Alternative Software</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedSoftware.map((rel) => (
              <SoftwareCard key={rel.id} software={rel} view="grid" />
            ))}
          </div>
        </div>
      )}

      {/* Download modal */}
      {showDownloadModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 animate-fade-in"
          onClick={() => setShowDownloadModal(false)}
        >
          <div
            className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                'flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br text-xl font-bold text-white',
                sw.iconColor
              )}>
                {sw.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-base font-bold">Downloading {sw.name}</h3>
                <p className="text-xs text-muted-foreground">v{sw.version} · {selectedArch}</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-sm">Virus scan passed</span>
                </div>
                <span className="text-xs text-muted-foreground">{sw.fileSize}</span>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Select Download Mirror:</p>
                {['Primary Mirror (US)', 'Mirror EU (Germany)', 'Mirror Asia (Singapore)'].map((mirror, i) => (
                  <button
                    key={mirror}
                    className="flex w-full items-center justify-between rounded-lg border border-border p-3 text-sm transition-colors hover:border-primary hover:bg-accent"
                  >
                    <span className="flex items-center gap-2">
                      <span className={cn('h-2 w-2 rounded-full', i === 0 ? 'bg-success' : 'bg-muted-foreground/40')} />
                      {mirror}
                    </span>
                    <Download className="h-4 w-4 text-primary" />
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-primary/5 p-3 text-xs text-muted-foreground">
                <Shield className="h-4 w-4 shrink-0 text-primary" />
                Your download will start automatically. If it does not, click one of the mirror links above.
              </div>
            </div>

            <Button
              className="mt-4 w-full"
              onClick={() => setShowDownloadModal(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
