<script lang="ts">
  import { page } from '$app/state';
  import { fade } from 'svelte/transition';
  import Header from '$lib/components/molecules/Header.svelte';
  import Nav from '$lib/components/molecules/Nav.svelte';
  import MobileNav from '$lib/components/molecules/MobileNav.svelte';

  import 'virtual:uno.css';
  import '../app.css';
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { getBooksByLocale } from '$lib/sanity/fetch';
  import { useState } from '$lib/state.svelte';
  import Cursor from '$lib/components/atoms/Cursor.svelte';
  import { cursor } from '$lib/actions/useCursor.svelte';

  let { children } = $props();

  let navMobile = $state(false);
  let container: HTMLElement;

  onMount(() => {
    afterNavigate(() => {
      navMobile = false;
      // container.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // available books for the current locale
</script>

<div
  relative
  h-auto
  font-sans
  text="lg primary"
  overflow-y-scroll
  overflow-x-hidden
  scrollbar-none
  px-10
  class="dark:bg-dark lg:t-5"
  bind:this={container}
  {@attach cursor}
>
  <!-- <Header bind:showMobileMenu={navMobile} /> -->

  <main relative class="w-full">
    {#key page.url.pathname}
      {@render children()}
    {/key}
    <!-- Custom cursor -->
    <Cursor />
  </main>
</div>
