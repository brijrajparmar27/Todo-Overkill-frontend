export const backdropVariant = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
  close: {
    opacity: 0,
  },
};
export const FolderpopupVariant = {
  hide: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
  },
  close: {
    scale: 0,
    opacity: 0,
  },
};
export const createPromptVariant = {
  hide: {
    x: -100,
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },
  close: {
    x: 100,
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
};
