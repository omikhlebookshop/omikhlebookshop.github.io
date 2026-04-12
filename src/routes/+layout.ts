import { fetchBooks, fetchCategories } from '$lib/sanity/fetch';
import type { LayoutData } from './$types';

// This can be false if you're using a fallback (i.e. SPA mode)
export const prerender = true;

export const load: LayoutData = async () => {
  const books = await fetchBooks();
  const categories = await fetchCategories();
  console.dir(books);
  return { books, categories };
};
