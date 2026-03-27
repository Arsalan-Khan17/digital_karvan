import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/data";

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-12 items-center py-12 md:py-16 border-b border-border-subtle last:border-0`}
    >
      {/* Content */}
      <div className="flex-1">
        <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-4">
          0{index + 1}
        </p>
        <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">{service.title}</h3>
        <p className="text-text-secondary leading-relaxed mb-6">{service.fullDescription}</p>
        <ul className="grid grid-cols-2 gap-2 mb-8">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white text-sm font-medium rounded-full hover:bg-red-700 transition-colors"
        >
          Learn More
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Visual */}
      <div className="flex-1 w-full">
        <div className="aspect-square rounded-2xl bg-gradient-to-br from-bg-elevated to-bg-card border border-border-subtle flex items-center justify-center max-w-md mx-auto">
          <div className="text-center px-8">
            <div className="w-16 h-16 rounded-2xl bg-bg-elevated border border-border-default mx-auto mb-6 flex items-center justify-center">
              <span className="text-text-primary/30 text-2xl font-bold">
                {service.title.charAt(0)}
              </span>
            </div>
            <div className="space-y-2">
              {service.approach.map((step, i) => (
                <div
                  key={step}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-bg-elevated/50 border border-border-subtle"
                >
                  <span className="text-xs font-bold text-text-muted">{i + 1}</span>
                  <span className="text-sm text-text-secondary">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
