import type { SanityImageObject, SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { InputValue } from '@portabletext/svelte';

export interface InternationalizedObject {
  _key: string;
  language: 'en' | 'zh';
  value: string;
}

export interface InternationalizedBlockObject {
  _key: string;
  language: 'en' | 'zh';
  value: InputValue;
}

export interface CategoryTag {
  title: string;
}

export interface Tag {
  label: string;
  value: string;
}

export interface Book {
  _id: string;
  title: string;
  author?: Tag[];
  filterCategory?: CategoryTag[];
  info?: InternationalizedBlockObject[];
  description: InternationalizedBlockObject[];
  price?: number;
  publisher?: Tag[];
  coverUrl?: string;
  cover?: SanityImageSource;
  images?: SanityImageObject[];
}
