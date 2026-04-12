<script lang="ts">
  interface PlaceholderProps {
    label?: string;
    classNames?: string;
  }
  let { classNames = '', label = 'A generic placeholder image' }: PlaceholderProps = $props();
</script>

<div relative overflow-hidden class={classNames} role="img" aria-label={label}>
  <div absolute w-full h-full class="diagonal"></div>
  <div absolute w-full h-full bg-tertiary></div>
</div>

<style scoped>
  .diagonal {
    background: linear-gradient(to top right, #fff calc(50% - 1px), #7a7a7a, #fff calc(50% + 1px));
  }
</style>
