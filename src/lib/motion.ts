const ease = [0.25, 0.46, 0.45, 0.94] as const;

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease },
});

export const fadeUpSm = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay, ease: "easeOut" as const },
});

export const slideRow = (delay = 0) => ({
  initial: { opacity: 0, x: -8 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 8, height: 0 },
  transition: { duration: 0.25, delay, ease: "easeOut" as const },
});
