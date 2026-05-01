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

// tag referring to another schema
export interface ReferenceTag {
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
  filterCategory?: ReferenceTag[];
  info?: InternationalizedBlockObject[];
  description: InternationalizedBlockObject[];
  price?: number;
  publisher?: ReferenceTag[];
  coverUrl?: string;
  cover?: SanityImageSource;
  images?: SanityImageObject[];
}
