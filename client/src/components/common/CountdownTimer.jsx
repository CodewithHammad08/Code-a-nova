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
      const difference = new Date(targetDate) - new Date();
      if (difference <= 0) {
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
          className={`text-[10px] font-mono uppercase tracking-widest mb-1.5 font-bold ${
            isDark ? 'text-[#D6A64F]' : 'text-[#6B7280]'
          }`}
        >
          {label}
        </div>
      )}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div
          className={`px-2.5 py-1.5 rounded-[4px] border text-center ${
            isDark
              ? 'bg-white/10 border-white/15 text-white'
              : 'bg-white border-[#E5E7EB] text-[#17243A]'
          }`}
        >
          <span className="block text-base sm:text-lg font-bold font-mono leading-none">
            {timeLeft.days}
          </span>
          <span className="block text-[9px] uppercase tracking-wider text-[#6B7280] font-sans mt-0.5">
            Days
          </span>
        </div>
        <span className={`font-mono font-bold ${isDark ? 'text-white/40' : 'text-[#9CA3AF]'}`}>:</span>
        <div
          className={`px-2.5 py-1.5 rounded-[4px] border text-center ${
            isDark
              ? 'bg-white/10 border-white/15 text-white'
              : 'bg-white border-[#E5E7EB] text-[#17243A]'
          }`}
        >
          <span className="block text-base sm:text-lg font-bold font-mono leading-none">
            {timeLeft.hours}
          </span>
          <span className="block text-[9px] uppercase tracking-wider text-[#6B7280] font-sans mt-0.5">
            Hours
          </span>
        </div>
        <span className={`font-mono font-bold ${isDark ? 'text-white/40' : 'text-[#9CA3AF]'}`}>:</span>
        <div
          className={`px-2.5 py-1.5 rounded-[4px] border text-center ${
            isDark
              ? 'bg-white/10 border-white/15 text-white'
              : 'bg-white border-[#E5E7EB] text-[#17243A]'
          }`}
        >
          <span className="block text-base sm:text-lg font-bold font-mono leading-none">
            {timeLeft.minutes}
          </span>
          <span className="block text-[9px] uppercase tracking-wider text-[#6B7280] font-sans mt-0.5">
            Mins
          </span>
        </div>
        <span className={`font-mono font-bold ${isDark ? 'text-white/40' : 'text-[#9CA3AF]'}`}>:</span>
        <div
          className={`px-2.5 py-1.5 rounded-[4px] border text-center ${
            isDark
              ? 'bg-white/10 border-white/15 text-white'
              : 'bg-white border-[#E5E7EB] text-[#17243A]'
          }`}
        >
          <span className="block text-base sm:text-lg font-bold font-mono leading-none text-[#D6A64F]">
            {timeLeft.seconds}
          </span>
          <span className="block text-[9px] uppercase tracking-wider text-[#6B7280] font-sans mt-0.5">
            Secs
          </span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
