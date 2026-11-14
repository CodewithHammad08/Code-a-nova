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
        <div
          className={`text-[10px] font-mono uppercase tracking-widest mb-1.5 font-bold flex items-center gap-1.5 ${
            isDark ? 'text-[#D6A64F]' : 'text-[#6B7280]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#21845B] animate-pulse" />
          {label}
        </div>
      )}
      <div className="flex items-center gap-1 sm:gap-1.5">
        <div
          className={`px-2.5 py-1.5 rounded-[5px] border text-center shadow-xs ${
            isDark
              ? 'bg-[#121c2e]/80 border-white/15 text-white shadow-inner'
              : 'bg-white border-[#E5E7EB] text-[#17243A] shadow-xs'
          }`}
        >
          <span className="block text-base sm:text-lg font-bold font-mono leading-none tracking-tight">
            {timeLeft.days}
          </span>
          <span className="block text-[8px] uppercase tracking-wider text-[#9CA3AF] font-sans font-bold mt-1">
            Days
          </span>
        </div>
        <span className={`font-mono font-bold text-xs ${isDark ? 'text-white/40' : 'text-[#9CA3AF]'}`}>:</span>
        <div
          className={`px-2.5 py-1.5 rounded-[5px] border text-center shadow-xs ${
            isDark
              ? 'bg-[#121c2e]/80 border-white/15 text-white shadow-inner'
              : 'bg-white border-[#E5E7EB] text-[#17243A] shadow-xs'
          }`}
        >
          <span className="block text-base sm:text-lg font-bold font-mono leading-none tracking-tight">
            {timeLeft.hours}
          </span>
          <span className="block text-[8px] uppercase tracking-wider text-[#9CA3AF] font-sans font-bold mt-1">
            Hours
          </span>
        </div>
        <span className={`font-mono font-bold text-xs ${isDark ? 'text-white/40' : 'text-[#9CA3AF]'}`}>:</span>
        <div
          className={`px-2.5 py-1.5 rounded-[5px] border text-center shadow-xs ${
            isDark
              ? 'bg-[#121c2e]/80 border-white/15 text-white shadow-inner'
              : 'bg-white border-[#E5E7EB] text-[#17243A] shadow-xs'
          }`}
        >
          <span className="block text-base sm:text-lg font-bold font-mono leading-none tracking-tight">
            {timeLeft.minutes}
          </span>
          <span className="block text-[8px] uppercase tracking-wider text-[#9CA3AF] font-sans font-bold mt-1">
            Mins
          </span>
        </div>
        <span className={`font-mono font-bold text-xs ${isDark ? 'text-white/40' : 'text-[#9CA3AF]'}`}>:</span>
        <div
          className={`px-2.5 py-1.5 rounded-[5px] border text-center shadow-xs ${
            isDark
              ? 'bg-[#121c2e]/80 border-white/15 text-[#D6A64F] shadow-inner'
              : 'bg-white border-[#E5E7EB] text-[#D6A64F] shadow-xs'
          }`}
        >
          <span className="block text-base sm:text-lg font-bold font-mono leading-none tracking-tight">
            {timeLeft.seconds}
          </span>
          <span className="block text-[8px] uppercase tracking-wider text-[#9CA3AF] font-sans font-bold mt-1">
            Secs
          </span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;

