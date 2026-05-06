'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

export interface StaggerGridProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  maxItems?: number;
}

export function StaggerGrid({
  children,
  className,
  staggerDelay = 0.1,
  maxItems = 5
}: StaggerGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Convert children to array and add motion wrappers
  const childArray = Array.isArray(children) ? children : [children];
  const limitedChildren = childArray.slice(0, maxItems);

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {limitedChildren.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
      {/* Render remaining children without animation */}
      {childArray.slice(maxItems).map((child, index) => (
        <div key={maxItems + index}>{child}</div>
      ))}
    </motion.div>
  );
}
