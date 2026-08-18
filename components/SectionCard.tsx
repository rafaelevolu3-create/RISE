import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export function SectionCard({
  icon: Icon,
  title,
  subtitle,
  action,
  children,
}: {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="card-surface animate-fade-up flex flex-col rounded-2xl p-5 shadow-card">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 font-display text-base font-semibold text-ink-primary">
            {Icon && <Icon size={17} className="text-series-blue" strokeWidth={2.2} />}
            {title}
          </h2>
          {subtitle && <p className="mt-0.5 text-xs text-ink-muted">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
