import '@testing-library/jest-dom';

// framer-motion의 whileInView가 사용하는 IntersectionObserver 폴리필
global.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof IntersectionObserver;
