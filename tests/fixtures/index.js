import TestUsed from './TestUsed.vue';
import TestUnusedReact from './TestUnusedReact';

export const createVueApp = () => {
  return TestUsed;
};

export const createReactApp = () => {
  return TestUnusedReact;
};
