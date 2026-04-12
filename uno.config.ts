import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetWebFonts,
  presetWind3
} from 'unocss';
import presetRemToPx from '@unocss/preset-rem-to-px';
import extractorSvelte from '@unocss/extractor-svelte';
import { presetScrollbar } from 'unocss-preset-scrollbar';

export default defineConfig({
  theme: {
    colors: {
      // primary: '#1C1B1D',
      primary: '#E0E0E0',
      secondary: '#7A7A7A',
      tertiary: '#efeeec80',
      dark: '#121212'
    },
    animation: {
      keyframes: {
        color: '{0%, 100% {background: black} 50% {background: grey}}'
      },
      durations: {
        color: '12s'
      },
      timingFns: {
        color: 'linear'
      },
      counts: {
        color: 'infinite'
      }
    }
  },
  presets: [
    presetAttributify(), // required when using attributify mode
    presetWind3(), // required
    presetTypography({
      cssExtend: {
        p: {
          'line-height': 1.25
        },
        h1: {
          'font-weight': 500,
          'font-size': '1.75em',
          'letter-spacing': '-0.02em'
        },
        footer: {
          'font-size': '0.75em',
          'line-height': 1.1
        },
        ul: {
          'list-style-type': 'none',
          'padding-left': 0
        }
      }
    }),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: ['Helvetica Neue', 'Inter']
        // serif: ['Noto Serif SC']
      }
    }),
    presetRemToPx({ baseFontSize: 18 }),
    presetScrollbar()
  ],
  extractors: [extractorSvelte()]
});
