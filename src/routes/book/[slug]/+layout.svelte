<script lang="ts">
  let { children } = $props();
</script>

<div relative class="w-full min-h-screen lg:pl-1/3 my-20">
  <!-- Inner container to fit the prose -->
  {@render children()}
</div>
