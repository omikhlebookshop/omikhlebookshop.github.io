<script lang="ts">
  import type { ClassValue } from 'svelte/elements';
  import Nav from './Nav.svelte';

  interface MobileNavProps {
    shouldExpand: boolean;
    class: ClassValue;
  }

  const props: MobileNavProps = $props();
</script>

<div
  fixed
  top-0
  w-full
  h-dvh
  p-5
  bg-white
  dark:bg-dark
  z-30
  right-full
  class:translate-x-full={props.shouldExpand}
  class:translate-x-0={!props.shouldExpand}
  transition
  duration-400
  ease-out
  overflow-y-scroll
  scrollbar-none
  class={[props.class]}
>
  <Nav />
</div>
