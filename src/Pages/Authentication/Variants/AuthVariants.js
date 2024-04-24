export const LoginpopupVariant = {
  hide: {
    x: 150,
    transition: { stiffness: 100, duration: 0.5 },
  },
  show: {
    x: 0,
    transition: { stiffness: 100, duration: 0.5, delay: 0.1 },
  },
  close: {
    x: 150,
    transition: { stiffness: 100, duration: 0.5 },
  },
};

export const SigninpopupVariant = {
  hide: {
    x: -150,
    transition: { stiffness: 100, duration: 0.5 },
  },
  show: {
    x: 0,
    transition: { stiffness: 100, duration: 0.5, delay: 0.1 },
  },
  close: {
    x: -150,
    transition: { stiffness: 100, duration: 0.5 },
  },
};
