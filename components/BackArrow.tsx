import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa';

/**
 * BackArrow Component
 * 
 * A reusable navigation component that provides a consistent back navigation experience
 * across the application. Features a smooth animation on hover and click.
 * 
 * Based on the existing implementation in [content].tsx, this component has been
 * extracted to avoid code duplication and maintain consistency.
 */
export const BackArrow = () => {
  const router = useRouter();
  const controls = useAnimation();

  return (
    <motion.button
      onClick={() => {
        controls.start({
          x: "-150%",
          scale: 0.8,
          transition: {
            duration: 0.4,
            ease: [0.32, 0, 0.67, 0]
          }
        }).then(() => {
          router.push('/');
        });
      }}
      style={{ 
        fontSize: "2rem",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        display: "flex",
        alignItems: "center",
        color: "var(--colors-gray11)",
        paddingRight: "1rem"
      }}
      whileHover={{
        color: "var(--colors-gray12)",
        x: -4,
        transition: { duration: 0.2 }
      }}
    >
      <motion.div
        initial={{ x: 0, scale: 1 }}
        animate={controls}
      >
        <FaArrowLeft />
      </motion.div>
    </motion.button>
  );
};
