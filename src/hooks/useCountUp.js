import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * Lightweight count-up hook — no external dependency issues
 * @param {number} end - target value
 * @param {number} duration - ms
 * @param {string} separator - thousands separator
 */
export function useCountUp(end, duration = 2000, separator = '.') {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isInView || startedRef.current) return;
    startedRef.current = true;

    let startTime = null;
    const startVal = 0;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * (end - startVal) + startVal));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };

    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  const formatted = count.toLocaleString('id-ID').replace(/\./g, separator);
  return { ref, formatted, raw: count };
}
