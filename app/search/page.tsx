import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SearchPage } from '@/components/search-page';
import { Suspense } from 'react';

export default function Search() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={<div className="mx-auto max-w-[1400px] px-4 py-6 text-sm text-muted-foreground">Loading search results...</div>}>
        <SearchPage />
      </Suspense>
      <Footer />
    </div>
  );
}
