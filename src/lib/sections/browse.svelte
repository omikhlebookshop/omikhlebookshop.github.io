<script lang="ts">
  import { Image } from '@unpic/svelte';
  import { urlBuilder } from '$lib/sanity/image';

  import type { Tag, Book, CategoryTag } from '$lib/sanity/types';
  import Placeholder from '$lib/components/atoms/Placeholder.svelte';

  interface Props {
    books: Book[];
    categories: CategoryTag[] | undefined;
  }

  let { books, categories }: Props = $props();
  let selectedCategory = $state('All');

  /* Utils for category filtering */
  const getCategories = (cats: CategoryTag[] | undefined) => cats?.map((c) => c.title) ?? [];
  const allCategories = $derived(['All', ...getCategories(categories)]);
  // const coverColors = ['#c8c0b8', '#f0e8e0', '#2c2c2c', '#1a1a1a', '#4a6fa5', '#8b2e2e', '#7a8c7a'];

  /* Utils for filtering other metadata */
  const renderAuthors = (authors: Tag[] | undefined) => {
    if (authors === undefined) {
      return '';
    }

    const author = authors[0].value;
    return authors.length > 1 ? `${author}, et al.` : author;
  };

  const filteredBooks: Book[] = $derived(
    selectedCategory === 'All'
      ? books
      : books.filter((b) => getCategories(b.filterCategory)?.includes(selectedCategory))
  );
</script>

<!-- Sidebar category nav -->
<nav flex flex-wrap prose class="dark:prose-invert lg:flex-col">
  {#each allCategories as cat (cat)}
    <button
      text-right
      shrink-0
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
<div id="books" mb-30 scroll-mt-30 class="lg:scroll-mt-20">
  {#if filteredBooks.length === 0}
    <p class="text-secondary italic">No books found in this category.</p>
  {/if}

  <div grid gap-10 style="grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));">
    {#each filteredBooks as book (book._id)}
      <a class="group cursor-pointer" href="/book/{book._id}">
        <!-- Book cover -->
        <div flex flex-col class="w-full aspect-[3/4] mb-4 overflow-hidden">
          {#if book.cover === undefined}
            <Placeholder label={book.title} />
          {:else}
            <Image class="mt-auto" src={urlBuilder.image(book.cover).url()} />
          {/if}
        </div>

        <!-- Book info -->
        <div class="text-center leading-snug">
          <p
            class="text-sm font-medium text-primary group-hover:underline decoration-1 underline-offset-2 transition-all"
          >
            {book.title}
          </p>
          <p class="text-xs text-secondary mt-1">{renderAuthors(book.author)}</p>
          <p class="text-sm mt-2 text-primary">
            {book.price && `C$ ${book.price.toFixed(2)}`}
          </p>
        </div>
      </a>
    {/each}
  </div>
</div>
