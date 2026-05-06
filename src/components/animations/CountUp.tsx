import { motion, useInView, useAnimation, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

interface Props {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function CountUp({
  from = 0,
  to,
  duration = 2,
  suffix = "",
  prefix = "",
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const controls = useAnimation();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView || reduced) {
      if (ref.current) ref.current.textContent = `${prefix}${to}${suffix}`;
      return;
    }

    const start = Date.now();
    const update = () => {
      const elapsed = (Date.now() - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(from + (to - from) * eased);
      if (ref.current) ref.current.textContent = `${prefix}${current}${suffix}`;
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }, [inView, from, to, duration, prefix, suffix, reduced, controls]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {from}
      {suffix}
    </span>
  );
}
