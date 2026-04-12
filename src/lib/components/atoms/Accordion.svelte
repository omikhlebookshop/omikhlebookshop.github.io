<script lang="ts">
  import type { Snippet } from 'svelte';
  import Button from './Button.svelte';

  interface AccordionProps {
    category: string;
    children: Snippet;
  }
  const { category, children }: AccordionProps = $props();

  let expanded = $state(false);

  let id = $derived(`${category.toLowerCase()}-items`);

  /**
   * Toggle the state.
   */
  function toggle() {
    expanded = !expanded;
  }
</script>

<!-- See: https://cruip.com/building-a-simple-animated-accordion-component-with-tailwind-css/ -->

<Button aria-expanded={expanded} aria-controls={id} onclick={toggle}>{category}</Button>
<div
  {id}
  inert={!expanded}
  grid
  transition-all
  duration-300
  ease-in-out
  class={expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
>
  {@render children?.()}
</div>
