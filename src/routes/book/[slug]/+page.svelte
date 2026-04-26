<script lang="ts">
  import type { PageProps } from './$types';
  import Preview from '$lib/components/image/Preview.svelte';
  import Slideshow from '$lib/components/image/Slideshow.svelte';
  import { PortableText } from '@portabletext/svelte';

  import type { SanityImageObject } from '@sanity/image-url/lib/types/types';
  import type { Book } from '$lib/sanity/types';

  let { data }: PageProps = $props();
  let selectedIndex = $state(null);

  const entry: Book = $derived(data.curr);

  const safeImages: SanityImageObject[] | undefined = $derived(
    entry.images?.filter((img: SanityImageObject) => img.asset !== undefined)
  );

  const enDesc = $derived(entry.description?.find((d) => d._key === 'en')?.value);
  const zhDesc = $derived(entry.description?.find((d) => d._key === 'zh')?.value);

  const enInfo = $derived(entry.info?.find((d) => d._key === 'en')?.value);
  const zhInfo = $derived(entry.info?.find((d) => d._key === 'zh')?.value);
</script>

<svelte:head>
  <title>{entry.title} · Omíkhlē</title>
  <meta name="description" content={`Details and previews of the book – ${entry.title}`} />
</svelte:head>

{#if selectedIndex !== null && safeImages}
  <Slideshow images={safeImages} {selectedIndex} onClose={() => (selectedIndex = null)} />
{:else if selectedIndex === null}
  {#if safeImages}
    <Preview images={safeImages} bind:selectedIndex caption={`Image preview for ${entry.title}`} />
  {/if}
  <article prose flex flex-col gap-10 class="max-w-[100ch] dark:prose-invert" relative mt-10>
    {#if entry}
      <h1>{entry.title}</h1>
      <div grid="~ cols-2" gap-5>
        <div class="col-span-2 lg:col-span-1">
          <!-- publication details -->
          <section grid="~ cols-2">
            <ul col-start-2 m-0 class="leading-[1.25]">
              {#if entry.author}
                {#each entry.author as auth (auth)}
                  <li>{auth.label}</li>
                {/each}
              {/if}
              {#if entry.publisher}
                {#each entry.publisher as pub (pub)}
                  <li>{pub.label}</li>
                {/each}
              {/if}
              {#if entry.price}
                <li>C$ {entry.price}</li>
              {/if}
            </ul>
          </section>

          <!-- publication info -->
          <section>
            <div class="not-prose leading-6 text-secondary">
              <PortableText value={zhInfo} />
            </div>
            <PortableText value={zhDesc} />
          </section>
        </div>

        <div class="col-span-2 lg:col-span-1">
          <!-- description -->
          <section>
            <div class="not-prose leading-6 text-secondary">
              <PortableText value={enInfo} />
            </div>
            <PortableText value={enDesc} />
          </section>
        </div>
      </div>
    {:else}
      <p>Requested book cannot be found at the moment.</p>
    {/if}
  </article>
{/if}
