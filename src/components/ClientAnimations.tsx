"use client";

import { motion, Variants } from 'framer-motion';
import React from 'react';

// --- STAGGERED CONTAINER FOR GROUPS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const StaggeredContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- FADE IN UP FOR ITEMS (WITH HOVER LIFT) ---
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring", stiffness: 100, damping: 12
    },
  },
};

export const FadeInUp = ({ children, className, liftOnHover = false }: { children: React.ReactNode; className?: string, liftOnHover?: boolean }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={liftOnHover ? { y: -10 } : {}}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- FADE IN FROM LEFT FOR LIST ITEMS ---
const listItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
};

export const FadeInLeft = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <motion.div variants={listItemVariants} className={className}>
            {children}
        </motion.div>
    )
}


// --- FOR STANDALONE ELEMENTS THAT FADE IN ON VIEW ---
export const ViewFadeInUp = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// --- FOR DECORATIVE ELEMENTS THAT SCALE IN ---
export const ScaleIn = ({ children, className, delay = 0, duration = 0.5 }: { children: React.ReactNode; className?: string, delay?: number, duration?: number }) => {
    return (
        <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration, delay }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// --- FOR SVG UNDERLINES THAT ANIMATE ON VIEW ---
export const ScaleXOnView = ({ children, className, delay = 0, duration = 0.5 }: { children: React.ReactNode; className?: string, delay?: number, duration?: number }) => {
    return (
        <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration, delay, ease: "easeInOut" }}
            style={{ originX: 0.5 }}
            className={className}
        >
            {children}
        </motion.div>
    )
}


// --- FOR HOVER SCALE EFFECTS ---
export const HoverScale = ({ children, scale = 1.05 }: { children: React.ReactNode; scale?: number }) => {
  return (
    <motion.div whileHover={{ scale }}>
      {children}
    </motion.div>
  );
};