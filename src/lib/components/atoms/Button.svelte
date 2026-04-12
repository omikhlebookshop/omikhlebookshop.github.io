<script lang="ts">
  const { children, ...restProps } = $props();
</script>

<button hover="text-secondary cursor-pointer" {...restProps}>{@render children?.()}</button>
