<script lang="ts">
  import Button from '../atoms/Button.svelte';
  import Link from '../atoms/Link.svelte';
  import { useState } from '$lib/state.svelte';
  import { page } from '$app/state';

  interface HeaderProps {
    showMobileMenu: boolean;
  }

  let { showMobileMenu = $bindable() }: HeaderProps = $props();

  const locales: string[] = ['zh-CN', 'en'];

  // maps from locality to book id
  let locale2id = $derived(mapLocale2id(useState.curr));

  function mapLocale2id(curr) {
    const translations = curr?._translations;
    const mappings = locales.map((locale) => {
      // base url
      const base = page.url.pathname;
      // translation for the specified locale
      const search = translations?.filter((trans) => trans?.language === locale);
      if (!search?.length || !base.startsWith('/book')) return [locale, base];

      const translation = search[0]._id;
      return [locale, `/book/${translation}`];
    });
    return Object.fromEntries(mappings);
  }
</script>

<header
  sticky
  top-0
  z-20
  h-10
  grid="~ cols-2 lg:cols-3"
  gap-5
  items-end
  border="b-2 primary"
  bg="dark:dark"
>
  <!-- home anchor -->
  <Link href="/" classNames="lg:text-3xl">Omíkhlē</Link>

  <!-- news animation -->
  <aside class="hidden lg:block" h-full overflow-y-hidden>
    <div h-full flex items-end whitespace-nowrap overflow-x-hidden class="notification">
      Sat, Jul 26 · Momento X Omíkhlē @ OssFest
    </div>
    <div h-full flex items-end whitespace-nowrap overflow-x-hidden class="notification">
      New Arrival · 他们说你的歌有谁来听
    </div>
  </aside>

  <div class="hidden lg:flex" flex gap-2 justify-end>
    {#each locales as locale (locale)}
      <Link
        href={locale2id[locale]}
        class="hover:text-secondary"
        sideEffect={() => {
          useState.locale = locale;
        }}>{locale.toLowerCase()}</Link
      >
    {/each}
  </div>

  <!-- mobile menu -->
  <Button
    class="color-secondary text-right lg:hidden"
    onclick={() => (showMobileMenu = !showMobileMenu)}>Catalogue</Button
  >
</header>

<style>
  @keyframes scroll {
    0% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-100%);
    }
    90% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes flip {
    0% {
      transform: rotate3d(0, 0, 0, 0turn);
    }
    50% {
      transform: rotate3d(1, 0, 0, 0.25turn);
    }
    100% {
      transform: rotate3d(0, 0, 0, 0turn);
    }
  }

  .notification {
    animation: scroll 10s linear infinite;
  }
</style>
