<script lang="ts">
  import Link from '../atoms/Link.svelte';

  interface HeaderProps {
    showMobileMenu: boolean;
  }

  let { showMobileMenu = $bindable() }: HeaderProps = $props();
</script>

<header
  sticky
  top-0
  w-full
  py-5
  z-20
  items-end
  border="b-2 primary"
  bg="dark:dark"
  text-2xl
  leading-none
  class="pt-[calc(env(safe-area-inset-top)+1rem)] grid grid-cols-[30%_1fr] gap-5"
>
  <!-- home anchor -->
  <Link class="text-right text-secondary" href="/">Omíkhlē</Link>
  <!-- <ul class="flex flex-col lg:flex-row"> -->
  <ul flex flex-wrap>
    <li class="after:content-[','] after:mr-1">
      <Link href="/#about">About</Link>
    </li>
    <li class="after:content-[','] after:mr-1">
      <Link href="/#contact">Contact</Link>
    </li>
    <li class="after:content-[','] after:mr-1">
      <Link href="/#events">Events</Link>
    </li>
    <li>
      <Link href="/#books">Books</Link>
    </li>
  </ul>
</header>
