export default function KPICard({
  label,
  value,
  change,
  icon,
}: {
  label: string;
  value: string | number;
  change: number;
  icon: string;
}) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white border border-border rounded-lg p-5 shadow-card hover:shadow-card-hover transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-xl">
          {icon}
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-xs text-text-secondary uppercase font-medium">{label}</p>
        <p className="text-3xl font-bold text-text-primary">{value}</p>
        <div className="flex items-center gap-1">
          <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '↑' : '↓'} {Math.abs(change)}%
          </span>
          <span className="text-xs text-text-tertiary">vs last period</span>
        </div>
      </div>
    </div>
  );
}
