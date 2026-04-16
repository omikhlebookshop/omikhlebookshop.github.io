<script lang="ts">
  import type { PageProps } from './$types';
  import { toDate } from '$lib/utils/time';
  import ImageSlider from '$lib/components/atoms/ImageSlider.svelte';
  import { PortableText } from '@portabletext/svelte';

  // TODO: rename the data to something more semantic?
  let { data }: PageProps = $props();

  const entry = $derived(data.curr);

  const publishedMonth = $derived(
    entry?.publishedMonth
      ? toDate(entry.publishedYear, entry.publishedMonth).toLocaleString('default', {
          month: 'short'
        })
      : null
  );
  const size = $derived(entry?.unit && `${entry.width} x ${entry.height} ${entry.unit}`);

  const enDesc = $derived(entry?.description?.find((d) => d._key === 'en')?.value);
  const zhDesc = $derived(entry?.description?.find((d) => d._key === 'zh')?.value);

  const enInfo = $derived(entry?.info?.find((d) => d._key === 'en')?.value);
  const zhInfo = $derived(entry?.info?.find((d) => d._key === 'zh')?.value);
</script>

<svelte:head>
  <title>{entry?.title} · Omíkhlē</title>
  <meta name="description" content={`Details on the ${entry?.category} book – ${entry?.title}`} />
</svelte:head>

<article prose flex flex-col gap-10 class="max-w-[100ch] dark:prose-invert" relative>
  {#if entry}
    <ImageSlider images={entry.images} caption={`Image preview for ${entry.title}`} />
    <h1>{entry.title}</h1>
    <div grid="~ cols-2" gap-5>
      <div class="col-span-2 lg:col-span-1">
        <!-- publication details -->
        <section grid="~ cols-2">
          <ul col-start-2 m-0 class="leading-[1.25]">
            {#each entry.author as auth (auth)}
              <li>{auth.label}</li>
            {/each}
            {#each entry.publisher as pub (pub)}
              <li>{pub.label}</li>
            {/each}
            <!--
            <li>{entry.pages} pp</li>
            <li>{publishedMonth} {entry.publishedYear}</li>
            {#if size}
              <li>{size}</li>
            {/if}
            {#if entry.languages}
              {#each entry.languages as lang (lang)}
                <li>{lang.value}</li>
              {/each}
            {/if}
            -->
            {#if entry.price}
              <li>C$ {entry.price}</li>
            {/if}
          </ul>
        </section>

        <!-- description -->
        <section>
          <PortableText value={zhInfo} />
          <PortableText value={zhDesc} />
        </section>
      </div>
      <div class="col-span-2 lg:col-span-1">
        <!-- description in English -->
        <section>
          <PortableText value={enInfo} />
          <PortableText value={enDesc} />
        </section>
      </div>
    </div>
  {:else}
    <p>Requested book cannot be found at the moment.</p>
  {/if}
</article>
