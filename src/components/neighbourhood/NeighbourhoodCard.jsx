import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Shield, Zap, Droplet, ArrowRight } from 'lucide-react';

export function NeighbourhoodCard({ neighbourhood }) {
  const { metrics } = neighbourhood;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-zinc-200 hover:border-zinc-400 hover:shadow-lg transition-all duration-300 flex flex-col text-zinc-900">
      {/* Image & Header */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={neighbourhood.heroImage}
          alt={neighbourhood.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        
        {/* Livability Score Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-xs border border-zinc-200 text-center">
          <span className="block text-[10px] uppercase font-bold text-zinc-500">Livability</span>
          <span className="text-base font-extrabold text-zinc-900 font-display">
            {neighbourhood.livabilityScore}<span className="text-xs text-zinc-400 font-normal">/10</span>
          </span>
        </div>

        {/* Location Title */}
        <div className="absolute bottom-3 left-4 right-4">
          <div className="flex items-center gap-1.5 text-xs text-zinc-200 font-medium mb-0.5">
            <MapPin className="w-3.5 h-3.5 text-white" />
            <span>{neighbourhood.city}, {neighbourhood.state}</span>
          </div>
          <h3 className="text-xl font-bold text-white font-display">
            {neighbourhood.name}
          </h3>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
          {neighbourhood.description}
        </p>

        {/* Quick Intelligence Score Pillars */}
        <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-zinc-50 rounded-xl border border-zinc-200 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-[11px] text-zinc-500 mb-0.5">
              <Shield className="w-3 h-3 text-zinc-700" />
              <span>Security</span>
            </div>
            <p className="text-xs font-bold text-zinc-900">{metrics.security.score}/10</p>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-[11px] text-zinc-500 mb-0.5">
              <Zap className="w-3 h-3 text-amber-600" />
              <span>Electricity</span>
            </div>
            <p className="text-xs font-bold text-zinc-900">{metrics.electricity.score}/10</p>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-[11px] text-zinc-500 mb-0.5">
              <Droplet className="w-3 h-3 text-sky-600" />
              <span>Water</span>
            </div>
            <p className="text-xs font-bold text-zinc-900">{metrics.water.score}/10</p>
          </div>
        </div>

        {/* Pricing & Activity Stats */}
        <div className="space-y-1.5 text-xs text-zinc-600">
          <div className="flex justify-between items-center">
            <span className="text-zinc-500">Avg 3-Bed Rent:</span>
            <span className="font-bold text-zinc-900">{neighbourhood.avgRent3Bed}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-500">Active Listings:</span>
            <span className="font-semibold text-zinc-900">{neighbourhood.activeListingsCount} homes</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-500">Verified Residents:</span>
            <span className="font-semibold text-zinc-900">{neighbourhood.verifiedResidentsCount} active</span>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-2 border-t border-zinc-200 flex items-center justify-between">
          <Link
            to={`/community?neighbourhood=${neighbourhood.id}`}
            className="text-xs font-semibold text-zinc-600 hover:text-black"
          >
            Read Community Feed
          </Link>
          <Link
            to={`/neighbourhoods/${neighbourhood.id}`}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
          >
            Explore Area
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

      </div>
    </div>
  );
}
export default NeighbourhoodCard;
