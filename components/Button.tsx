export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}) {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover disabled:opacity-50',
    secondary: 'bg-white text-primary border border-primary hover:bg-primary-light',
    ghost: 'bg-transparent text-text-primary hover:bg-background-tertiary',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-lg font-medium transition-colors disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]}
      `}
    >
      {children}
    </button>
  );
}
