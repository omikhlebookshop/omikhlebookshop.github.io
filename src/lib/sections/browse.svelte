<script lang="ts">
  import { Image } from '@unpic/svelte';
  import { urlBuilder } from '$lib/sanity/image';
  import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

  interface Book {
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
    // tags: string[];
    filterCategory: string[];
    cover: SanityImageSource;
    coverUrl?: string;
  }

  interface Category {
    title: string;
  }

  interface Props {
    books: Book[];
    categories: Category[];
  }

  let { books, categories }: Props = $props();

  const getCategories = (cats) => cats?.map((c) => c.title);
  const allCategories = $derived(['All', ...getCategories(categories)]);
  // const coverColors = ['#c8c0b8', '#f0e8e0', '#2c2c2c', '#1a1a1a', '#4a6fa5', '#8b2e2e', '#7a8c7a'];

  let selectedCategory = $state('All');

  // const getTags = (tags) => tags.map((t) => t.value);

  const filteredBooks = $derived(
    selectedCategory === 'All'
      ? books
      : books.filter((b) => getCategories(b.filterCategory)?.includes(selectedCategory))
  );
</script>

<!-- Sidebar category nav -->
<nav flex lg:flex-col flex-wrap prose class="shrink-0 pr-5 dark:prose-invert">
  {#each allCategories as cat (cat)}
    <button
      text-right
      shrink-0
      mr-3
      class="text-right transition-colors duration-200 py-1 {cat === selectedCategory
        ? 'text-primary'
        : 'text-secondary hover:text-primary'}"
      onclick={() => (selectedCategory = cat)}
    >
      {cat}
    </button>
  {/each}
</nav>

<!-- Books grid -->
<div mb-30>
  {#if filteredBooks.length === 0}
    <p class="text-secondary italic">No books found in this category.</p>
  {/if}

  <div grid gap-10 style="grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));">
    {#each filteredBooks as book (book._id)}
      <a class="group cursor-pointer" href="/book/{book._id}">
        <!-- Book cover -->
        <div flex flex-col class="w-full aspect-[3/4] mb-4 overflow-hidden">
          <Image class="mt-auto" src={urlBuilder.image(book.cover).url()} />
        </div>

        <!-- Book info -->
        <div class="text-center leading-snug">
          <p
            class="text-sm font-medium text-primary group-hover:underline decoration-1 underline-offset-2 transition-all"
          >
            {book.title}
          </p>
          <p class="text-xs text-secondary mt-1">{book.author[0].value}</p>
          <p class="text-sm mt-2 text-primary">
            {book.price && `C$ ${book.price.toFixed(2)}`}
          </p>
        </div>
      </a>
    {/each}
  </div>
</div>
