<script lang="ts">
  import { Image } from '@unpic/svelte';
  import { urlBuilder } from '$lib/sanity/image';

  import type { Tag, Book, ReferenceTag } from '$lib/sanity/types';
  import Placeholder from '$lib/components/atoms/Placeholder.svelte';

  interface Props {
    books: Book[];
    categories: ReferenceTag[] | undefined;
    publishers: ReferenceTag[] | undefined;
  }

  let { books, categories, publishers }: Props = $props();
  let selectedCategory: string | null = $state('All');
  let selectedPublisher: string | null = $state(null);

  /* Utils for metadata filtering */
  const getCategories = (cats: ReferenceTag[] | undefined) => cats?.map((c) => c.title) ?? [];
  const filterByCategory = (targetCategory: string) =>
    targetCategory === 'All'
      ? books
      : books.filter((b) => getCategories(b.filterCategory).includes(targetCategory));
  const selectCategory = (category: string) => {
    selectedCategory = category;
    selectedPublisher = null;
  };

  const getPublishers = (publishers: ReferenceTag[] | undefined) =>
    publishers?.map((p) => p.title) ?? [];
  const filterByPublisher = (targetPublisher: string) =>
    books.filter((b) => getPublishers(b.publisher).includes(targetPublisher));
  const selectPublisher = (publisher: string) => {
    selectedPublisher = publisher;
    selectedCategory = null;
  };

  const applyFilter = (category: string | null, publisher: string | null) => {
    if (category !== null) {
      return filterByCategory(category);
    }

    if (publisher !== null) {
      return filterByPublisher(publisher);
    }

    return books;
  };

  const allCategories = $derived(['All', ...getCategories(categories)]);
  const allPublishers = $derived(getPublishers(publishers));

  /* Utils for filtering other metadata */
  const renderAuthors = (authors: Tag[] | undefined) => {
    if (authors === undefined) {
      return '';
    }

    const author = authors[0].value;
    return authors.length > 1 ? `${author}, et al.` : author;
  };

  const filteredBooks: Book[] = $derived(applyFilter(selectedCategory, selectedPublisher));
</script>

<!-- Sidebar category nav -->
<nav flex flex-wrap gap-5 prose leading-5 text-right class="dark:prose-invert lg:flex-col">
  <ul flex flex-wrap my-0 class="lg:flex-col">
    {#each allCategories as cat (cat)}
      <li py-0 my-0>
        <button
          text-right
          shrink-0
          class="transition-colors duration-200 py-1 {cat === selectedCategory
            ? 'text-primary'
            : 'text-secondary hover:text-primary'}"
          onclick={() => selectCategory(cat)}
        >
          {cat}
        </button>
      </li>
    {/each}
  </ul>
  <ul flex flex-wrap my-0 class="lg:flex-col">
    <li text-right>By Publisher</li>
    {#each allPublishers as pub (pub)}
      <li py-0 my-0>
        <button
          text-right
          shrink-0
          class="transition-colors duration-200 py-1 {pub === selectedPublisher
            ? 'text-primary'
            : 'text-secondary hover:text-primary'}"
          onclick={() => selectPublisher(pub)}
        >
          {pub}
        </button>
      </li>
    {/each}
  </ul>
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
