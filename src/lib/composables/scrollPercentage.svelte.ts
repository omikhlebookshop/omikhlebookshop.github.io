/**
 * Calculate the scroll percentage of an element within its scroll container.
 */
export default function useScrollCalculator() {
  const scrollState = $state({
    percentage: 0,
    factor: 1 // 1 - percentage
  });

  const useCalculator = (scroll: number, target: HTMLElement) => {
    scrollState.percentage = Math.min(scroll / target.offsetTop, 1);
    scrollState.factor = 1 - scrollState.percentage;
  };

  return { scrollState, useCalculator };
}
