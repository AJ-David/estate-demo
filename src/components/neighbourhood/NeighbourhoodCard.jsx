import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Shield, Zap, Droplet, Users, Building2, ArrowRight } from 'lucide-react';

export function NeighbourhoodCard({ neighbourhood }) {
  const { metrics } = neighbourhood;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-estate-200 hover:border-emerald-300 hover:shadow-premium transition-all duration-300 flex flex-col">
      {/* Image & Header */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={neighbourhood.heroImage}
          alt={neighbourhood.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-estate-950/80 via-estate-950/20 to-transparent" />
        
        {/* Livability Score Badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-md border border-white/20 text-center">
          <span className="block text-[10px] uppercase font-bold text-estate-500">Livability</span>
          <span className="text-base font-extrabold text-navy font-display">
            {neighbourhood.livabilityScore}<span className="text-xs text-estate-400 font-normal">/10</span>
          </span>
        </div>

        {/* Location Title */}
        <div className="absolute bottom-3 left-4 right-4">
          <div className="flex items-center gap-1.5 text-xs text-emerald-light font-medium mb-0.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>{neighbourhood.city}, {neighbourhood.state}</span>
          </div>
          <h3 className="text-xl font-bold text-white font-display">
            {neighbourhood.name}
          </h3>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-xs text-estate-600 line-clamp-2 leading-relaxed">
          {neighbourhood.description}
        </p>

        {/* Quick Intelligence Score Pillars */}
        <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-sand-50 rounded-xl border border-sand-200/80 text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-[11px] text-estate-500 mb-0.5">
              <Shield className="w-3 h-3 text-emerald" />
              <span>Security</span>
            </div>
            <p className="text-xs font-bold text-navy">{metrics.security.score}/10</p>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-[11px] text-estate-500 mb-0.5">
              <Zap className="w-3 h-3 text-amber-500" />
              <span>Electricity</span>
            </div>
            <p className="text-xs font-bold text-navy">{metrics.electricity.score}/10</p>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-[11px] text-estate-500 mb-0.5">
              <Droplet className="w-3 h-3 text-blue-500" />
              <span>Water</span>
            </div>
            <p className="text-xs font-bold text-navy">{metrics.water.score}/10</p>
          </div>
        </div>

        {/* Pricing & Activity Stats */}
        <div className="space-y-1.5 text-xs text-estate-700">
          <div className="flex justify-between items-center">
            <span className="text-estate-500">Avg 3-Bed Rent:</span>
            <span className="font-bold text-navy">{neighbourhood.avgRent3Bed}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-estate-500">Active Listings:</span>
            <span className="font-semibold text-estate-800">{neighbourhood.activeListingsCount} homes</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-estate-500">Verified Residents:</span>
            <span className="font-semibold text-emerald-800">{neighbourhood.verifiedResidentsCount} active</span>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-2 border-t border-estate-100 flex items-center justify-between">
          <Link
            to={`/community?neighbourhood=${neighbourhood.id}`}
            className="text-xs font-semibold text-estate-600 hover:text-emerald"
          >
            Read Community Feed
          </Link>
          <Link
            to={`/neighbourhoods/${neighbourhood.id}`}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-navy text-white text-xs font-bold rounded-xl hover:bg-emerald transition-colors"
          >
            <span>Overview & Intel</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

      </div>
    </div>
  );
}
