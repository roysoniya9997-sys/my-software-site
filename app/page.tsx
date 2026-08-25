import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HomePage } from '@/components/home-page';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}
