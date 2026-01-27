'use client';

import { useState, useEffect } from 'react';

const getWindowDimensions = () => {
  try {
    const { innerWidth: width, innerHeight: height } = window;

    return {
      width,
      height,
    };
  } catch (err) {
    return { width: 1920, height: 1080, error: err };
  }
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions);

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};
