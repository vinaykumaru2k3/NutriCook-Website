import { useState, useRef, useEffect } from 'react';

const LazySection = ({ 
  children, 
  fallback, 
  rootMargin = '100px',
  threshold = 0.1,
  className 
}) => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div ref={sectionRef} className={className}>
      {isInView ? children : fallback}
    </div>
  );
};

export default LazySection;