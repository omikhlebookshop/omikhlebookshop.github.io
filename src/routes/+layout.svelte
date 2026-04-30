<script lang="ts">
  import { page } from '$app/state';
  import Header from '$lib/components/molecules/Header.svelte';

  import 'virtual:uno.css';
  import '../app.css';
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
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
  font-sans
  text-primary
  px-10
  class="dark:bg-dark lg:t-5"
  bind:this={container}
  {@attach cursor}
>
  <Header bind:showMobileMenu={navMobile} />

  <main relative overflow-x-hidden class="w-full">
    {#key page.url.pathname}
      {@render children()}
    {/key}
    <!-- Custom cursor -->
    <Cursor />
  </main>
</div>
