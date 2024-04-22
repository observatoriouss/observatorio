import React from 'react';
import { animated, useSpring, config } from 'react-spring';
import { motion } from 'framer-motion';

const SearchIcon: React.FC = () => {
  const spring = useSpring({
    to: { fill: '#000', stroke: '#000' },
    from: { fill: '#ccc', stroke: '#ccc' },
    config: config.gentle,
  });

  const variants = {
    hover: {
      scale: 1.1,
      shadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    },
  };

  return (
    <motion.svg
      variants={variants}
      whileHover={variants.hover}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <animated.path
        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ fill: spring.fill, stroke: spring.stroke }}
      />
      <animated.path
        d="M20.9999 21.0004L16.6499 16.6504"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ fill: spring.fill, stroke: spring.stroke }}
      />
    </motion.svg>
  );
};

export default SearchIcon;
