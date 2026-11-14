import React, { useState, useEffect } from 'react';

const CountdownTimer = ({
  targetDate = '2026-12-20T23:59:59',
  label = 'Registration Closes In',
  variant = 'light',
  className = '',
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDate).getTime();
      const now = Date.now();
      const difference = target - now;

      if (isNaN(difference) || difference <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const isDark = variant === 'dark';

  return (
    <div className={`inline-flex flex-col ${className}`}>
      {label && (
        <div className="text-[10px] font-mono uppercase tracking-widest mb-1.5 font-bold flex items-center gap-1.5 text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {label}
        </div>
      )}
      <div className="flex items-center gap-1 sm:gap-1.5">
        <div className="px-2.5 py-1.5 rounded-[6px] border border-white/10 bg-[#0F172A]/90 text-center shadow-md">
          <span className="block text-base sm:text-lg font-bold font-mono leading-none tracking-tight text-white">
            {timeLeft.days}
          </span>
          <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-sans font-bold mt-1">
            Days
          </span>
        </div>
        <span className="font-mono font-bold text-xs text-cyan-400/60">:</span>
        <div className="px-2.5 py-1.5 rounded-[6px] border border-white/10 bg-[#0F172A]/90 text-center shadow-md">
          <span className="block text-base sm:text-lg font-bold font-mono leading-none tracking-tight text-white">
            {timeLeft.hours}
          </span>
          <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-sans font-bold mt-1">
            Hours
          </span>
        </div>
        <span className="font-mono font-bold text-xs text-cyan-400/60">:</span>
        <div className="px-2.5 py-1.5 rounded-[6px] border border-white/10 bg-[#0F172A]/90 text-center shadow-md">
          <span className="block text-base sm:text-lg font-bold font-mono leading-none tracking-tight text-white">
            {timeLeft.minutes}
          </span>
          <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-sans font-bold mt-1">
            Mins
          </span>
        </div>
        <span className="font-mono font-bold text-xs text-cyan-400/60">:</span>
        <div className="px-2.5 py-1.5 rounded-[6px] border border-cyan-500/30 bg-[#0F172A]/90 text-center shadow-[0_0_15px_rgba(56,189,248,0.15)]">
          <span className="block text-base sm:text-lg font-bold font-mono leading-none tracking-tight text-cyan-400">
            {timeLeft.seconds}
          </span>
          <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-sans font-bold mt-1">
            Secs
          </span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

