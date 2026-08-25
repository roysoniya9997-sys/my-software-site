export type Platform = 'Windows' | 'Mac' | 'Linux' | 'Android' | 'iOS';

export type LicenseType = 'Freeware' | 'Open Source' | 'Shareware' | 'Trial' | 'Paid';

export type SortTab = 'latest' | 'top-rated' | 'trending';

export type ViewMode = 'grid' | 'list';

export interface Software {
  id: string;
  name: string;
  slug: string;
  version: string;
  developer: string;
  description: string;
  longDescription: string;
  category: string;
  subcategory: string;
  platforms: Platform[];
  license: LicenseType;
  fileSize: string;
  updatedAt: string;
  rating: number;
  votes: number;
  downloads: string;
  iconColor: string;
  icon: string;
  features: string[];
  screenshots: string[];
  changelog: { version: string; date: string; changes: string[] }[];
  architectures: string[];
  techSpecs: { label: string; value: string }[];
  verified: boolean;
  views: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
  subcategories: { name: string; count: number }[];
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

export interface Review {
  id: string;
  softwareId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}
