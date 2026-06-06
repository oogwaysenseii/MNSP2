import * as React from 'react';

export function Button({ children, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`px-4 py-2 border border-black bg-white text-black hover:bg-black hover:text-white transition-colors ${className}`} {...props}>
      {children}
    </button>
  );
}
