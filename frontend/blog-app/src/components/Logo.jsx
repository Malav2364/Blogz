import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7 text-slate-900"
      >
        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.37 2.63 14 7l-1.5-1.5L16.5 2l1.87.63Z" />
      </svg>
      <span className="text-2xl font-bold text-slate-900">BlogSpace</span>
    </div>
  );
};

export default Logo;
