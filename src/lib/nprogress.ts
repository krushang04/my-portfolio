import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure NProgress
NProgress.configure({
  minimum: 0.25,
  easing: 'ease',
  speed: 700,
  showSpinner: false,
  trickleSpeed: 100,
  // Set parent element to ensure our styling is applied
  parent: 'body',
  // Force transparent template to allow our gradient to show
  template: '<div class="bar" role="bar"></div>'
});

// Export utility functions to start, done, and set progress
export const startProgress = () => NProgress.start();
export const doneProgress = (force = true) => NProgress.done(force);
export const setProgress = (progress: number) => NProgress.set(progress); 