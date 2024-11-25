import React from 'react';
import { styled } from '~/stitches.config';
import { motion } from 'framer-motion';

/**
 * ProjectNavigation Component
 * 
 * A reusable navigation component for switching between projects.
 * Based on the BackArrow component's implementation to ensure consistent
 * animation behavior across the application.
 */

const NavigationContainer = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  zIndex: 1,
});

const NavButton = styled(motion.button, {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '$gray11',
  padding: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: '1.5rem',
  opacity: 0.6,
  transition: 'opacity 0.2s ease-in-out',
  pointerEvents: 'auto',
  zIndex: 2,

  '&:hover': {
    opacity: 1,
    color: '$gray12',
  },

  variants: {
    direction: {
      left: {
        left: '1rem',
        borderRight: '1px solid $gray6',
        borderTopRightRadius: '$base',
        borderBottomRightRadius: '$base',
      },
      right: {
        right: '1rem',
        borderLeft: '1px solid $gray6',
        borderTopLeftRadius: '$base',
        borderBottomLeftRadius: '$base',
      },
    },
  },
});

interface ProjectNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
}

export const ProjectNavigation: React.FC<ProjectNavigationProps> = ({
  onPrevious,
  onNext,
}) => {
  return (
    <NavigationContainer>
      <NavButton
        direction="left"
        onClick={onPrevious}
      >
        <motion.div
          initial={{ x: 0 }}
          whileHover={{
            x: -4,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          ←
        </motion.div>
      </NavButton>
      <NavButton
        direction="right"
        onClick={onNext}
      >
        <motion.div
          initial={{ x: 0 }}
          whileHover={{
            x: 4,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          →
        </motion.div>
      </NavButton>
    </NavigationContainer>
  );
};
