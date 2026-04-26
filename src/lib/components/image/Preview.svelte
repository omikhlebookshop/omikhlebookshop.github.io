<script lang="ts">
  import type { SanityImageObject } from '@sanity/image-url/lib/types/types';
  import { Image } from '@unpic/svelte';

  import { urlBuilder } from '$lib/sanity/image';

  interface Props {
    images: SanityImageObject[];
    selectedIndex: number | null;
    caption: string;
  }
  let { images, caption, selectedIndex = $bindable() }: Props = $props();

  let track = $state<HTMLUListElement | null>(null);
  let animId: number;

  function startScroll() {
    const el = track!;
    function step() {
      el.scrollLeft += 0.7;
      // when we've scrolled half (the duplicate), reset silently
      if (el.scrollLeft >= el.scrollWidth) {
        cancelAnimationFrame(animId);
      }
      animId = requestAnimationFrame(step);
    }
    animId = requestAnimationFrame(step);
  }

  $effect(() => {
    startScroll();
    return () => cancelAnimationFrame(animId);
  });
</script>

<ul
  flex
  items-center
  gap-5
  overflow-x-scroll
  scrollbar-none
  h-full
  class="animate-[scroll_2s_linear_infinite]"
  bind:this={track}
  onmouseenter={() => cancelAnimationFrame(animId)}
  onmouseleave={startScroll}
>
  {#each images as image, index (image._key)}
    <li shrink-0 flex items-center>
      <button onclick={() => (selectedIndex = index)}>
        <Image
          src={urlBuilder.image(image).url()}
          height={800}
          alt={`${caption} - ${index}`}
          class="h-[400px]"
        />
      </button>
    </li>
  {/each}
</ul>

<style scoped>
  ul::scroll-button(*) {
    display: none;
    border: 0;
    font-size: 1em;
    background: none;
    /* color: rgb(0 0 0 / 0.7); */
    color: #e0e0e0;
    cursor: pointer;
  }
  @media (min-width: 1024px) {
    ul::scroll-button(*) {
      display: block;
    }
  }

  ul::scroll-button(*):hover,
  ul::scroll-button(*):focus {
    color: rgb(0 0 0 / 1);
  }

  ul::scroll-button(*):active {
    translate: 1px 1px;
  }

  ul::scroll-button(*):disabled {
    /* color: rgb(0 0 0 / 0.2); */
    color: #7a7a7a;
    cursor: unset;
  }

  ul::scroll-button(left) {
    content: 'Prev';
  }

  ul::scroll-button(right) {
    content: 'Next';
  }

  ul {
    anchor-name: --myCarousel;
  }

  ul::scroll-button(*) {
    position: absolute;
    position-anchor: --myCarousel;
  }

  ul::scroll-button(left) {
    left: calc(anchor(right) - 4.6em);
    top: calc(anchor(bottom) + 13px);
  }

  ul::scroll-button(right) {
    left: calc(anchor(right) - 2.3em);
    top: calc(anchor(bottom) + 13px);
  }
</style>
