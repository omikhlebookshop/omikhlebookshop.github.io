<script lang="ts">
  import { cursorCoords, state as cursorState } from '$lib/actions/useCursor.svelte';
  import { state as viewportState } from '$lib/states/viewport.svelte';
</script>

{#if viewportState.isMobile}
  <div class="cursor z-30 lg:hidden top-1/2 left-full"></div>
{:else if cursorState.visible}
  <div class="cursor z-20" style="top: {$cursorCoords.y}px; left: {$cursorCoords.x}px;"></div>
{/if}

<style>
  .cursor {
    pointer-events: none;
    position: fixed;
    width: 15em;
    height: 15em;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, transparent 70%);
    mix-blend-mode: difference;
  }
</style>
