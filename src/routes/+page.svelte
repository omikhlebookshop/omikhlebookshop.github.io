<script lang="ts">
  import useScrollCalculator from '$lib/composables/scrollPercentage.svelte';
  import Books from '$lib/sections/browse.svelte';
  import Cursor from '$lib/components/atoms/Cursor.svelte';
  import { cursor } from '$lib/actions/useCursor.svelte';

  let { data } = $props();
  let bannerTitle: HTMLElement;
  let scrollY = $state(0);

  const { useCalculator } = useScrollCalculator();
  const books = $derived(data.books);
  const categories = $derived(data.categories);
</script>

<svelte:window bind:scrollY onscroll={() => useCalculator(scrollY, bannerTitle)} />

<svelte:head>
  <title>Omíkhlē Bookshop</title>
  <meta name="description" content="Homepage of the Omíkhlē Bookshop（雾中风景书店）" />
</svelte:head>

<div grid grid-cols-1 gap-5 class="lg:grid-cols-[30%_1fr]" {@attach cursor}>
  <!-- Custom cursor -->
  <Cursor />
  <!-- Home page content -->
  <section flex flex-col gap-16 pt-48 class="h-screen max-h-200 lg:col-start-2">
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
      Omikhle Bookshop <br />
      Online / Pop-up Bookstore <br />
      Asian Cinema, Photography, Artist-Zine
    </p>
  </section>

  <section prose flex flex-col mb-10 class="dark:prose-invert lg:col-start-2">
    <p id="about" scroll-mt-30 class="lg:scroll-mt-20">
      Omikhle Bookshop is an independent online and pop-up bookstore that curates a distinctive
      selection of books and printed materials centered on Asian cinema, photography, and artist
      zines.
    </p>
    <ul id="events" scroll-mt-30 class="lg:scroll-mt-20" border-l-2 border-secondary>
      <li><span text-secondary>2026/04/25</span> CONTACT Photobook Fair</li>
    </ul>
    <p id="contact" scroll-mt-30 class="lg:scroll-mt-20">
      <a href="mailto:omikhlebookshop@gmail.com" font-normal no-underline
        >omikhlebookshop@gmail.com</a
      >
      <br />
      You can also contact us through our
      <a href="https://www.instagram.com/omikhlebookshop/" target="_blank" font-normal no-underline
        >Instagram</a
      >.
    </p>
  </section>

  <Books {books} {categories} />
</div>
