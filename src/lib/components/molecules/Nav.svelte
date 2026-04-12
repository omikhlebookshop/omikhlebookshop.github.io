<script lang="ts">
  import Accordion from '../atoms/Accordion.svelte';
  import Link from '../atoms/Link.svelte';

  import type { Entry } from '$lib/catalogue/type';

  interface NavProps {
    books: Entry[];
  }

  const { books }: NavProps = $props();

  const categories: Record<string, string> = {
    Photography: 'photography',
    Cinema: 'cinema',
    Independent: 'self'
  };

  const filterCategories = (category: string, entries: Entry[]): Entry[] =>
    entries?.filter((entry) => entry.category === category.toLowerCase());
</script>

<nav data-sveltekit-keepfocus>
  <menu pt-6>
    <li class="lg:hidden"><Link href="/">霧</Link></li>
    <li h-10 border="l-2 primary" class="lg:hidden"></li>
    <li>
      <Link href="/intro" class="hover:text-secondary">Introduction</Link>
    </li>
    {#each Object.keys(categories) as category (category)}
      <li>
        <Accordion {category}>
          <ul border-l-2 border-primary pl-4 overflow-hidden>
            {#each filterCategories(categories[category], books) as entry (entry._id)}
              <li my-2>
                <Link
                  href={`/book/${entry._id}`}
                  classNames="hover:text-secondary leading-none line-clamp-2 lg:line-clamp-1"
                  >{entry.title}</Link
                >
              </li>
            {/each}
          </ul>
        </Accordion>
      </li>
    {/each}
    <li>
      <Link href="/index" classNames="hover:text-secondary">Index</Link>
    </li>
  </menu>
</nav>
