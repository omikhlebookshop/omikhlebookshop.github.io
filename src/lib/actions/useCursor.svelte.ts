import { spring } from 'svelte/motion';
import { get } from 'svelte/store';

/**
 * Shared cursor state
 */
export const state = $state({
  hasMoved: false,
  visible: false
});

/**
 * Animated cursor position.
 */
export const cursorCoords = spring({ x: 0, y: 0 }, { stiffness: 0.15, damping: 0.8 });

/**
 * Attach cursor to an element
 */
export function cursor(node: HTMLElement): () => void {
  // Movement handlers
  function onMove(e: MouseEvent) {
    const options = state.hasMoved ? undefined : { hard: true };
    cursorCoords.set({ x: e.clientX, y: e.clientY }, options);
    state.hasMoved = true;
  }

  function display() {
    state.visible = true;
  }

  function hide() {
    state.visible = false;
  }

  // Edge cases
  const coords = get(cursorCoords);
  const hoveringPoint = document.elementFromPoint(coords.x, coords.y);
  const alreadyHovering = node.contains(hoveringPoint);
  if (state.hasMoved && alreadyHovering) {
    display();
  }

  // Attach & remove handlers
  node.addEventListener('mousemove', onMove);
  node.addEventListener('mouseenter', display);
  node.addEventListener('mouseleave', hide);

  return () => {
    node.removeEventListener('mousemove', onMove);
    node.removeEventListener('mouseenter', display);
    node.removeEventListener('mouseleave', hide);
  };
}
