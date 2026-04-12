export interface Entry {
  _id: string;
  title: string;
  titleAlternative: string[];
  author: string[];
  description: string[];
  languages?: string[];
  pages: number;
  price?: number;
  publisher: string;
  publishedYear: number;
  publishedMonth?: number;
  format: 'paperback' | 'hardback' | 'zine';
  width?: number;
  height?: number;
  unit?: 'in' | 'mm';
  tags: string[];
  coverUrl?: string;
}
