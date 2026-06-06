export function Card({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`border border-gray-300 p-6 ${className}`}>
      {children}
    </div>
  );
}
