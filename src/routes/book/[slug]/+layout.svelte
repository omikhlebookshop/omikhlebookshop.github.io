<script lang="ts">
  let { children } = $props();
</script>

<div class="h-dvh w-full pl-1/3 overflow-y-scroll overflow-x-hidden scrollbar-none">
  <!-- Inner container to fit the prose -->
  <div>
    {@render children()}
  </div>
</div>
