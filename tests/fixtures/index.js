import TestUsed from './TestUsed.vue';
import TestUnusedReact from './TestUsedReact';

export const createVueApp = () => {
  return TestUsed;
};

export const createReactApp = () => {
  return TestUnusedReact;
};
