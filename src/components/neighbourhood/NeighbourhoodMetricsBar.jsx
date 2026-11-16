import React from 'react';
import { Shield, Zap, Droplet, CloudRain, Wifi, Volume2, Info } from 'lucide-react';

export function NeighbourhoodMetricsBar({ metrics, showSummaries = true }) {
  if (!metrics) return null;

  const getScoreColor = (score) => {
    if (score >= 8.5) return 'bg-emerald-500 text-emerald-700';
    if (score >= 7.0) return 'bg-emerald-600 text-emerald-800';
    if (score >= 5.5) return 'bg-amber-500 text-amber-700';
    return 'bg-rose-500 text-rose-700';
  };

  const items = [
    {
      key: 'security',
      title: 'Security & Safety',
      icon: Shield,
      data: metrics.security
    },
    {
      key: 'electricity',
      title: 'Power & Grid Availability',
      icon: Zap,
      data: metrics.electricity
    },
    {
      key: 'water',
      title: 'Clean Water Supply',
      icon: Droplet,
      data: metrics.water
    },
    {
      key: 'roadsDrainage',
      title: 'Roads & Flood Resistance',
      icon: CloudRain,
      data: metrics.roadsDrainage
    },
    {
      key: 'internet',
      title: 'Broadband & Fiber Coverage',
      icon: Wifi,
      data: metrics.internet
    },
    {
      key: 'noiseVibe',
      title: 'Noise Levels & Atmosphere',
      icon: Volume2,
      data: metrics.noiseVibe
    }
  ];

  return (
    <div className="space-y-4">
      {items.map(({ key, title, icon: Icon, data }) => {
        if (!data) return null;
        const percentage = (data.score / 10) * 100;

        return (
          <div key={key} className="bg-navy-surface p-4 rounded-xl border border-navy-border">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-navy-card rounded-lg shadow-xs text-gold border border-gold/30">
                  <Icon className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-display">{title}</h4>
                  <span className="text-[11px] text-estate-400 font-medium">{data.rating}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-extrabold text-gold font-display">
                  {data.score}
                </span>
                <span className="text-[10px] text-estate-400">/10</span>
              </div>
            </div>

            {/* Score Bar */}
            <div className="w-full bg-navy-deep rounded-full h-2 overflow-hidden mb-2">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  data.score >= 8 ? 'bg-emerald' : data.score >= 6.5 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>

            {/* Qualitative honest summary */}
            {showSummaries && data.summary && (
              <p className="text-xs text-slate-300 leading-relaxed bg-navy-card p-2.5 rounded-lg border border-navy-border">
                <strong className="text-gold">Resident Consensus:</strong> {data.summary}
              </p>
            )}
          </div>
        );
      })}

      <div className="flex items-start gap-2 p-3 bg-navy-card rounded-xl text-[11px] text-slate-300 border border-navy-border">
        <Info className="w-4 h-4 text-gold shrink-0 mt-0.5" />
        <span>
          These indicators are calculated directly from verified resident questionnaires, crowd-sourced infrastructure reports, and physical inspections.
        </span>
      </div>
    </div>
  );
}

