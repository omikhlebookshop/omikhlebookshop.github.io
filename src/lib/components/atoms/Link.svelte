<script lang="ts">
  import { base } from '$app/paths';
  import type { Snippet } from 'svelte';
  import type { ClassValue } from 'svelte/elements';

  interface LinkProps {
    children: Snippet;
    href: string;
    class: ClassValue;
    isExternal?: boolean;
    sideEffect?: CallableFunction;
  }

  const props: LinkProps = $props();
</script>

<a
  href={base + props.href}
  class:no-underline={!props.isExternal}
  class={[props.class]}
  onclick={() => props.sideEffect && props.sideEffect()}>{@render props.children?.()}</a
>
