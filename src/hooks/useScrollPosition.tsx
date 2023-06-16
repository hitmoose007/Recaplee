import { useEffect, useState } from 'react';

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);
    };

    document.addEventListener('scroll', updatePosition);
    updatePosition();
    return () => document.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
};

export default useScrollPosition;
