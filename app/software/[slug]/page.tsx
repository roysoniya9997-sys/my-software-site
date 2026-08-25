import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SoftwareDetailPage } from '@/components/software-detail-page';
import { getSoftwareBySlug, categories } from '@/lib/data';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return [];
}

export default function SoftwareDetail({ params }: { params: { slug: string } }) {
  const sw = getSoftwareBySlug(params.slug);
  if (!sw) notFound();

  const category = categories.find((c) => c.id === sw.category);
  const categoryName = category?.name || 'Software';
  const categorySlug = category?.slug || 'software';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SoftwareDetailPage software={sw} categoryName={categoryName} categorySlug={categorySlug} />
      <Footer />
    </div>
  );
}
