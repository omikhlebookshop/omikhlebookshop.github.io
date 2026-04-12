<script lang="ts">
  let { children } = $props();
</script>

<div prose mb-15 class="lg:max-w-sm">{@render children()}</div>
