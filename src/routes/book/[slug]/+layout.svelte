<script lang="ts">
  let { children } = $props();
</script>

<div relative class="h-dvh w-full lg:pl-1/3 overflow-y-scroll overflow-x-hidden scrollbar-none">
  <!-- Inner container to fit the prose -->
  {@render children()}
</div>
