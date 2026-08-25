'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Search,
  Sun,
  Moon,
  Menu,
  X,
  User,
  ChevronDown,
  Boxes,
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Windows', href: '/category/system?platform=Windows' },
  { label: 'Mac', href: '/category/multimedia?platform=Mac' },
  { label: 'Linux', href: '/category/programming?platform=Linux' },
  { label: 'Android', href: '/category/security?platform=Android' },
  { label: 'iOS', href: '/category/office?platform=iOS' },
  { label: 'News', href: '/news' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Drivers', href: '/category/drivers' },
];

const searchCategories = [
  { value: 'all', label: 'All Platforms' },
  { value: 'Windows', label: 'Windows' },
  { value: 'Mac', label: 'Mac' },
  { value: 'Android', label: 'Android' },
  { value: 'Linux', label: 'Linux' },
  { value: 'Drivers', label: 'Drivers' },
  { value: 'News', label: 'News' },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams();
      params.set('q', searchQuery.trim());
      if (searchCategory !== 'all') params.set('platform', searchCategory);
      router.push(`/search?${params.toString()}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      {/* Top bar */}
      <div className="border-b border-border bg-secondary/50">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-1.5 text-xs text-muted-foreground">
          <span>Trusted software downloads since 2003</span>
          <div className="hidden items-center gap-4 sm:flex">
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link href="/submit" className="hover:text-foreground transition-colors">Submit Software</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="flex items-center gap-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-600 text-primary-foreground shadow-md">
              <Boxes className="h-5 w-5" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold tracking-tight">SoftHub</span>
              <span className="ml-1 text-lg font-bold text-primary">Directory</span>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2">
            <div className="flex flex-1 items-center">
              <Select value={searchCategory} onValueChange={setSearchCategory}>
                <SelectTrigger className="w-[130px] shrink-0 rounded-r-none border-r-0 bg-muted/50 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {searchCategories.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search software, apps, games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-l-none pl-9"
                />
              </div>
            </div>
            <Button type="submit" size="default" className="shrink-0">
              <Search className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </form>

          {/* Right actions */}
          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" className="text-sm">
                <User className="mr-1.5 h-4 w-4" />
                Log In
              </Button>
              <Button size="sm" className="text-sm">
                Register
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="border-t border-border bg-card">
        <div className="mx-auto max-w-[1400px] px-4">
          <div className={cn(
            'flex items-center gap-1 overflow-x-auto scrollbar-thin',
            mobileMenuOpen ? 'flex-col py-2' : 'hidden lg:flex h-11',
          )}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'flex items-center whitespace-nowrap px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                  mobileMenuOpen && 'w-full rounded-md hover:bg-accent',
                )}
              >
                {link.label}
                {link.label === 'News' && (
                  <span className="ml-1.5 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                    NEW
                  </span>
                )}
              </Link>
            ))}
            <div className="ml-auto hidden items-center gap-1 lg:flex">
              <Link
                href="/category/games"
                className="flex items-center whitespace-nowrap px-3 py-2 text-sm font-bold text-primary transition-colors hover:text-primary/80"
              >
                <ChevronDown className="mr-1 h-3 w-3 rotate-[-90deg]" />
                Browse All Categories
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
