<script lang="ts">
  let { children } = $props();
</script>

<div grid w-full min-h-screen py-20 class="lg:grid-cols-[30%_1fr] gap-5">
  <div justify-end items-start w-full class="hidden lg:flex">
    <button hidden text-2xl text-secondary class="hover:text-primary" onclick={() => history.back()}
      >Back 🡐</button
    >
  </div>
  <!-- Inner container to fit the prose -->
  <div w-full overflow-x-hidden>
    {@render children()}
  </div>
</div>
