export default function Badge({
  children,
  variant = 'info',
}: {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info';
}) {
  const variants = {
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
