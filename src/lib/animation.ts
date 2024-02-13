import { Transition } from "framer-motion";

export const animationEase = [1, 0.7, 0.24, 1];

export const animationDuration = 0.15;

export const layerTransition: Transition = {
  duration: animationDuration,
  ease: animationEase,
};
