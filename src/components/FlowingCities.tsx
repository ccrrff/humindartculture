'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CITIES = ['Seoul', 'Berlin', 'Paris', 'Amsterdam'];
const CITY_MS = 1500;
const CYCLE   = CITIES.length * CITY_MS;

function Connector({ idx }: { idx: number }) {
  const delay       = (idx + 1) * (CITY_MS / 1000);
  const repeatDelay = (CYCLE / 1000) - 0.7;

  return (
    <div className="relative flex-1 overflow-hidden min-w-[16px] md:min-w-[48px]" style={{ height: 28 }}>
      <div
        className="absolute top-1/2 left-0 right-0 -translate-y-1/2"
        style={{ height: 1, background: 'rgba(0,0,0,0.1)' }}
      />
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: 24,
          height: 3,
          marginTop: -1.5,
          borderRadius: 9999,
          background: 'linear-gradient(90deg, transparent, rgba(26,26,28,0.75), transparent)',
        }}
        animate={{ x: [-24, 600] }}
        transition={{
          duration: 0.7,
          delay,
          repeat: Infinity,
          repeatDelay,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

export default function FlowingCities() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActive(i => (i + 1) % CITIES.length),
      CITY_MS,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      className="flex items-center w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.0, duration: 0.6 }}
    >
      {CITIES.map((city, i) => (
        <div key={city} className="flex items-center flex-1 last:flex-none">
          <motion.span
            animate={
              active === i
                ? {
                    scale: 1.09,
                    backgroundColor: 'rgba(255,255,255,0.78)',
                    borderColor: 'rgba(255,255,255,0.9)',
                    color: 'var(--text-main)',
                  }
                : {
                    scale: 1,
                    backgroundColor: 'rgba(255,255,255,0.40)',
                    borderColor: 'rgba(255,255,255,0.60)',
                    color: 'var(--text-secondary)',
                  }
            }
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="px-2 py-0.5 md:px-4 md:py-1.5 rounded-full border text-[9px] md:text-[11px] tracking-[0.08em] md:tracking-widest uppercase font-medium cursor-default select-none shrink-0"
          >
            {city}
          </motion.span>

          {i < CITIES.length - 1 && <Connector idx={i} />}
        </div>
      ))}
    </motion.div>
  );
}
