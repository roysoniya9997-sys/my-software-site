import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CategoryPage } from '@/components/category-page';
import { getCategoryBySlug, getSoftwareByCategory, categories } from '@/lib/data';
import { notFound } from 'next/navigation';

export default function Category({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const software = getSoftwareByCategory(category.id);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryPage
        categoryName={category.name}
        categorySlug={category.slug}
        categoryIcon={category.icon}
        categoryDescription={`Browse ${category.count.toLocaleString()} ${category.name.toLowerCase()} software titles across all platforms. Download free and open-source applications from trusted developers.`}
        subcategories={category.subcategories}
        software={software}
      />
      <Footer />
    </div>
  );
}
