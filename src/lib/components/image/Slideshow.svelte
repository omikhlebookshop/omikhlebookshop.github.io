<script lang="ts">
  import type { SanityImageObject } from '@sanity/image-url/lib/types/types';
  import { Image } from '@unpic/svelte';

  import { urlBuilder } from '$lib/sanity/image';
  import { onMount } from 'svelte';

  interface Props {
    images: SanityImageObject[];
    selectedIndex: number;
    onClose: () => void;
  }

  let { images, selectedIndex, onClose }: Props = $props();
  let currentIndex = $state(0);
  let slideEls = $state<HTMLLIElement[]>([]);
  let slideTrack = $state<HTMLUListElement | null>(null);

  onMount(() => {
    setTimeout(() => {
      scrollTo(selectedIndex);
    }, 300);
  });

  $effect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            currentIndex = slideEls.indexOf(entry.target as HTMLLIElement);
          }
        }
      },
      {
        // carve out a thin center strip
        rootMargin: '0px -45% 0px -45%', // only ~10% wide strip in center
        threshold: 0
      }
    );

    slideEls.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  });

  const scrollTo = (index: number, behavior: ScrollBehavior = 'smooth') => {
    slideEls[index].scrollIntoView({
      behavior,
      inline: 'center',
      block: 'nearest' // prevents vertical scroll jank
    });
  };
</script>

<ul
  fixed
  top-0
  left-0
  w-screen
  h-screen
  flex
  flex-col
  items-center
  overflow-x-scroll
  scrollbar-none
  snap-y
  bg-white
  z-30
  class="dark:bg-dark lg:flex-row lg:snap-x lg:gap-3 lg:px-[45%]"
  bind:this={slideTrack}
>
  {#each images as image, index (image._key)}
    <li shrink-0 flex flex-col items-start snap-center bind:this={slideEls[index]}>
      <Image src={urlBuilder.image(image).url()} alt={`Image ${index}`} class="lg:h-[600px]" />
      <span text-2xl class="hidden lg:block">
        {index + 1}
      </span>
    </li>
  {/each}
</ul>

<div fixed bottom-2 right-5 flex gap-3 text-3xl z-30 class="hidden lg:flex">
  <button
    disabled={currentIndex === 0}
    class="disabled:text-secondary"
    onclick={() => scrollTo(currentIndex - 1)}>Prev</button
  >
  /
  <button
    disabled={currentIndex === images.length - 1}
    class="disabled:text-secondary"
    onclick={() => scrollTo(currentIndex + 1)}>Next</button
  >
</div>
<div class="fixed top-2 right-5 text-3xl z-30">
  <button class="text-shadow-lg" onclick={onClose}>Close</button>
</div>
