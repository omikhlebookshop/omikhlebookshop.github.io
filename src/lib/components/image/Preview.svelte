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
