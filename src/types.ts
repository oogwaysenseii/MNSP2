export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  imageUrl: string;
  publishedAt: string;
  updatedAt?: string;
  date: string;
  author?: string | { name: string; url?: string };
}

