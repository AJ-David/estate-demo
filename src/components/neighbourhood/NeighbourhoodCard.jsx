import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Shield, Zap, Droplet, Users, Building2, ArrowRight } from 'lucide-react';

export function NeighbourhoodCard({ neighbourhood }) {
  const { metrics } = neighbourhood;

  return (
    <div className="group bg-navy-card rounded-2xl overflow-hidden border border-navy-border hover:border-gold/50 hover:shadow-gold transition-all duration-300 flex flex-col text-white">
      {/* Image & Header */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={neighbourhood.heroImage}
          alt={neighbourhood.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/30 to-transparent" />
        
        {/* Livability Score Badge */}
        <div className="absolute top-3 right-3 bg-navy-deep/90 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-md border border-gold/40 text-center">
          <span className="block text-[10px] uppercase font-bold text-gold-light">Livability</span>
          <span className="text-base font-extrabold text-white font-display">
            {neighbourhood.livabilityScore}<span className="text-xs text-estate-400 font-normal">/10</span>
          </span>
        </div>

        {/* Location Title */}
        <div className="absolute bottom-3 left-4 right-4">
          <div className="flex items-center gap-1.5 text-xs text-gold-light font-medium mb-0.5">
            <MapPin className="w-3.5 h-3.5 text-gold" />
            <span>{neighbourhood.city}, {neighbourhood.state}</span>
          </div>
          <h3 className="text-xl font-bold text-white font-display">
            {neighbourhood.name}
          </h3>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-xs text-estate-300 line-clamp-2 leading-relaxed">
          {neighbourhood.description}
        </p>

        {/* Quick Intelligence Score Pillars */}
        <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-navy-surface rounded-xl border border-navy-border text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-[11px] text-estate-400 mb-0.5">
              <Shield className="w-3 h-3 text-gold" />
              <span>Security</span>
            </div>
            <p className="text-xs font-bold text-white">{metrics.security.score}/10</p>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-[11px] text-estate-400 mb-0.5">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Electricity</span>
            </div>
            <p className="text-xs font-bold text-white">{metrics.electricity.score}/10</p>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-[11px] text-estate-400 mb-0.5">
              <Droplet className="w-3 h-3 text-sky-400" />
              <span>Water</span>
            </div>
            <p className="text-xs font-bold text-white">{metrics.water.score}/10</p>
          </div>
        </div>

        {/* Pricing & Activity Stats */}
        <div className="space-y-1.5 text-xs text-estate-300">
          <div className="flex justify-between items-center">
            <span className="text-estate-400">Avg 3-Bed Rent:</span>
            <span className="font-bold text-white">{neighbourhood.avgRent3Bed}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-estate-400">Active Listings:</span>
            <span className="font-semibold text-white">{neighbourhood.activeListingsCount} homes</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-estate-400">Verified Residents:</span>
            <span className="font-semibold text-gold">{neighbourhood.verifiedResidentsCount} active</span>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-2 border-t border-navy-border flex items-center justify-between">
          <Link
            to={`/community?neighbourhood=${neighbourhood.id}`}
            className="text-xs font-semibold text-estate-400 hover:text-gold"
          >
            Read Community Feed
          </Link>
          <Link
            to={`/neighbourhoods/${neighbourhood.id}`}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-gradient-to-r from-gold to-gold-light text-navy-deep text-xs font-black rounded-xl hover:shadow-gold transition-colors"
          >
            <span>Overview & Intel</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

      </div>
    </div>
  );
}

