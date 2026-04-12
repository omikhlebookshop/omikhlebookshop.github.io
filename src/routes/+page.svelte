<script lang="ts">
  import { onMount } from 'svelte';

  import useScrollCalculator from '$lib/composables/scrollPercentage.svelte';
  import Books from '$lib/sections/browse.svelte';

  let { data } = $props();
  let bannerTitle: HTMLElement;
  let scrollY = $state(0);

  const { scrollState, useCalculator } = useScrollCalculator();
  const books = $derived(data.books);
  const categories = $derived(data.categories);

  function scrollToHash() {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onMount(() => {
    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
  });
</script>

<svelte:window bind:scrollY onscroll={() => useCalculator(scrollY, bannerTitle)} />

<svelte:head>
  <title>Omíkhlē Bookshop</title>
  <meta name="description" content="Homepage of the Omíkhlē Bookshop（雾中风景书店）" />
</svelte:head>

<section flex flex-col gap-16 pt-48 class="pl-1/3 h-screen max-h-200">
  <p
    absolute
    whitespace-nowrap
    overflow-hidden
    text-clip
    class="text-[11rem]/[11rem] h-[12rem]"
    m-0
    font-serif
    font-light
    bind:this={bannerTitle}
  >
    霧中風景
  </p>
  <p prose class="mt-[14rem] dark:prose-invert">
    Online / Pop-Up bookshop <br />
    Asian Cinema, Photography, Artist-Zine
  </p>
</section>

<section prose class="ml-1/3 w-full dark:prose-invert">
  Omikhle Bookshop is an independent online and pop-up bookstore that curates a distinctive
  selection of books and printed materials centered on Asian cinema, photography, and artist zines.
  <br />
  <ul>
    <li>omikhlebookshop@gmail.com</li>
  </ul>
</section>

<Books {books} {categories} />
