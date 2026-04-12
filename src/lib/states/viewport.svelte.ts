import { browser } from '$app/environment';

export const state = $state({
  isMobile: false
});

const MOBILE_WIDTH = 768;

if (browser) {
  const checkIsMobile = () => {
    state.isMobile = window.innerWidth < MOBILE_WIDTH;
  };

  checkIsMobile();
  window.addEventListener('resize', checkIsMobile);
}
