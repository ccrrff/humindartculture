'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlowingCities from '@/components/FlowingCities';

type CP = 'entering' | 'holding' | 'exiting';
const DUR: Record<CP, number> = { entering: 950, holding: 2800, exiting: 520 };
const SPRING = { type: 'spring' as const, stiffness: 220, damping: 26 };
const EASE   = { duration: 0.46, ease: [0.55, 0, 1, 0.45] as [number,number,number,number] };

const TZ_PAIRS = [
  [{ code: 'SEOUL',  tz: 'Asia/Seoul' },       { code: 'BERLIN', tz: 'Europe/Berlin' }],
  [{ code: 'PARIS',  tz: 'Europe/Paris' },      { code: 'AMS',    tz: 'Europe/Amsterdam' }],
] as const;

function TickingClock({ pairs }: { pairs: readonly { code: string; tz: string }[] }) {
  const [pidx, setPidx] = useState(0);
  const city = pairs[pidx];
  const [t, setT] = useState({ h: '--', m: '--', s: '--' });

  useEffect(() => {
    const tick = () => {
      const parts = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false, timeZone: city.tz,
      }).formatToParts(new Date());
      setT({
        h: parts.find(p => p.type === 'hour')?.value  ?? '--',
        m: parts.find(p => p.type === 'minute')?.value ?? '--',
        s: parts.find(p => p.type === 'second')?.value ?? '--',
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [city.tz]);

  useEffect(() => {
    const id = setInterval(() => setPidx(i => (i + 1) % pairs.length), 5000);
    return () => clearInterval(id);
  }, [pairs.length]);

  return (
    <div className="flex flex-col items-end gap-[3px] shrink-0 self-center">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={city.code}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.22 }}
          className="text-[12px] tracking-[0.35em] uppercase text-[var(--text-secondary)] font-semibold leading-none"
        >
          {city.code}
        </motion.span>
      </AnimatePresence>

      <div className="flex items-center font-mono text-[18px] font-medium text-[var(--text-secondary)] tabular-nums leading-none">
        <span>{t.h}</span>
        <span className="opacity-30 mx-[2px]">:</span>
        <span>{t.m}</span>
        <span className="opacity-30 mx-[2px]">:</span>
        <span className="inline-block overflow-hidden leading-none" style={{ height: '1em', width: '2ch' }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={t.s}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.13, ease: 'easeOut' }}
              className="block"
            >
              {t.s}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>
    </div>
  );
}

function useTypewriter(words: string[], speed=80, del=48, pause=1600) {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'typing'|'pausing'|'deleting'>('typing');
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const word = words[idx]; let id: ReturnType<typeof setTimeout>;
    if (phase==='typing') {
      if (text.length < word.length) id = setTimeout(()=>setText(word.slice(0,text.length+1)), speed);
      else id = setTimeout(()=>setPhase('pausing'), pause);
    } else if (phase==='pausing') {
      id = setTimeout(()=>setPhase('deleting'), 0);
    } else {
      if (text.length>0) id = setTimeout(()=>setText(p=>p.slice(0,-1)), del);
      else { setIdx(i=>(i+1)%words.length); setPhase('typing'); }
    }
    return ()=>clearTimeout(id);
  }, [text, phase, idx, words, speed, del, pause]);
  return { text, isDeleting: phase==='deleting' };
}

export default function LayoutD() {
  const [cp, setCp] = useState<CP>('entering');
  const [impact, setImpact] = useState(false);
  const { text: kw, isDeleting } = useTypewriter(['오케스트라로','국제교류로','크루즈로','예술로']);

  useEffect(() => {
    if (cp !== 'entering') return;
    const id = setTimeout(() => {
      setCp('holding');
      setImpact(true);
      setTimeout(() => setImpact(false), 420);
    }, DUR.entering);
    return () => clearTimeout(id);
  }, [cp]);

  const lAnim = cp==='exiting' ? {x:-700,opacity:0} : {x:0,opacity:1};
  const rAnim = cp==='exiting' ? {x:700,opacity:0}  : {x:0,opacity:1};
  const lTr = cp==='entering' ? SPRING : cp==='exiting' ? EASE : {duration:0};
  const rTr = cp==='entering' ? {...SPRING,delay:0.09} : cp==='exiting' ? EASE : {duration:0};
  const lineShow = cp !== 'exiting';

  return (
    <div className="glass rounded-[28px] px-5 py-5 md:px-16 md:py-9 flex flex-col gap-4 overflow-hidden">
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
      <p className="text-[10px] tracking-[0.45em] uppercase text-[var(--text-secondary)]">Humind Art Culture</p>

      <div className="flex flex-col gap-3 w-full">

        {/* 첫 번째 줄: 크고 왼쪽 끝 정렬 */}
        <motion.div
          className="flex items-center gap-4 w-full"
          initial={{ x: -700, opacity: 0 }}
          animate={lAnim}
          transition={lTr}
        >
          <span
            className="font-black leading-none text-[var(--text-main)] select-none shrink-0"
            style={{ fontSize: 'clamp(64px, 13vw, 190px)' }}
          >
            세계를
          </span>
          <motion.div
            className="flex-1 bg-black/25"
            style={{ height: '2px', transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: lineShow ? 1 : 0 }}
            transition={lineShow ? { delay: 0.55, duration: 0.55, ease: 'easeOut' } : { duration: 0.2 }}
          />
          <TickingClock pairs={TZ_PAIRS[0]} />
        </motion.div>

        {/* 두 번째 줄: 작고 들여쓰기 + 점선 */}
        <motion.div
          className="flex items-center gap-4 w-full"
          style={{ paddingLeft: 'clamp(32px, 7vw, 110px)' }}
          initial={{ x: 700, opacity: 0 }}
          animate={rAnim}
          transition={rTr}
        >
          <span
            className="font-black leading-none text-[var(--text-main)] select-none shrink-0"
            style={{ fontSize: 'clamp(40px, 8vw, 116px)' }}
          >
            무대로
          </span>
          <motion.div
            className="flex-1 border-b border-dashed border-black/20"
            style={{ transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: lineShow ? 1 : 0 }}
            transition={lineShow ? { delay: 0.7, duration: 0.45, ease: 'easeOut' } : { duration: 0.2 }}
          />
          <TickingClock pairs={TZ_PAIRS[1]} />
        </motion.div>

      </div>

      <AnimatePresence>
        {impact && (
          <motion.div key="sw" initial={{scaleX:0,opacity:1}} animate={{scaleX:1,opacity:0}}
            transition={{duration:0.38,ease:'easeOut'}} className="h-[1.5px] bg-[var(--text-main)] origin-center -mt-2" />
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <div className="h-px w-8 bg-black/20 shrink-0" />
        <p className="text-[15px] md:text-[18px] text-[var(--text-secondary)]">
          <span className="text-[var(--text-main)] font-bold">
            {kw}<span className="inline-block w-[2px] h-[0.78em] bg-[var(--text-main)] ml-0.5 align-middle"
              style={{animation:isDeleting?'none':'blink 0.85s step-end infinite'}} />
          </span>
          &nbsp;세계를 잇다
        </p>
      </div>

      <FlowingCities />
    </div>
  );
}
