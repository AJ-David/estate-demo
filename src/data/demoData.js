/**
 * ESTATELENS — TEMPORARY DEMO DATA (PHASE 1)
 * Clearly identified demo datasets representing properties, neighbourhoods,
 * community posts, reviews, and user profiles across key locations in Nigeria.
 * Scalable for international expansion in future phases.
 */

export const DEMO_NEIGHBOURHOODS = [
  {
    id: 'lekki-phase-1',
    name: 'Lekki Phase 1',
    city: 'Lagos',
    state: 'Lagos State',
    country: 'Nigeria',
    coordinates: { lat: 6.4474, lng: 3.4849 },
    slug: 'lekki-phase-1',
    description: 'An upscale, cosmopolitan coastal peninsula neighbourhood renowned for its vibrant commercial strips along Admiralty Way, modern gated residential estates, high-end culinary spots, and active tech/lifestyle community.',
    heroImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    livabilityScore: 8.4,
    activeListingsCount: 84,
    verifiedResidentsCount: 342,
    avgRent3Bed: '₦7,500,000 / yr',
    avgSale4Bed: '₦220,000,000',
    metrics: {
      security: { score: 8.6, rating: 'High', summary: 'Gated streets with private vigilante/estate security patrols. Moderate Admiralty Way traffic incidents reported at night.' },
      electricity: { score: 7.2, rating: 'Moderate-High', summary: '16–20 hrs public grid daily on average. Most estates require independent or centralised diesel/inverter backup.' },
      water: { score: 6.8, rating: 'Moderate', summary: 'Borehole with industrial water treatment plants standard across residential compounds due to saline aquifer.' },
      roadsDrainage: { score: 6.5, rating: 'Mixed', summary: 'Paved interlocking roads inside estates. Known flash pooling along lower Admiralty during torrential July rainy seasons.' },
      internet: { score: 9.1, rating: 'Excellent', summary: 'High-density fiber coverage (MainOne, ipNX, FiberOne, Starlink).' },
      noiseVibe: { score: 7.0, rating: 'Moderate', summary: 'Quiet on residential off-streets; high nightlife ambient sound near commercial lounges.' }
    },
    nearbyFacilities: [
      { type: 'Healthcare', name: 'Evercare Hospital Lekki', distance: '1.2 km' },
      { type: 'Education', name: 'Meadow Hall School', distance: '2.5 km' },
      { type: 'Shopping', name: 'Ebeano Supermarket & Centro Mall', distance: '0.8 km' },
      { type: 'Recreation', name: 'Lekki Coliseum & Filmhouse Cinema', distance: '1.5 km' },
      { type: 'Transit', name: 'Lekki-Ikoyi Link Bridge Toll Gate', distance: '1.8 km' }
    ]
  },
  {
    id: 'yaba',
    name: 'Yaba (Tech & Academic Corridor)',
    city: 'Lagos',
    state: 'Lagos State',
    country: 'Nigeria',
    coordinates: { lat: 6.5095, lng: 3.3711 },
    slug: 'yaba',
    description: 'The historic heart of Lagos innovation and academia—home to UNILAG, YabaTech, tech incubators, energetic coffee hubs, and accessible mainland transport links to both Island and Ikeja.',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    livabilityScore: 7.9,
    activeListingsCount: 52,
    verifiedResidentsCount: 420,
    avgRent3Bed: '₦3,800,000 / yr',
    avgSale4Bed: '₦110,000,000',
    metrics: {
      security: { score: 7.5, rating: 'Good', summary: 'Busy student & tech worker daytime traffic. Well-lit along Commercial Ave and Herbert Macaulay Way; cautious vigilance in back alleys.' },
      electricity: { score: 7.8, rating: 'Good', summary: 'Dedicated feeder line gives Alagomeji and Akoka areas 18+ hrs regular grid supply.' },
      water: { score: 7.9, rating: 'Good', summary: 'Lagos State Water Corporation connection combined with clean non-saline groundwater boreholes.' },
      roadsDrainage: { score: 7.2, rating: 'Fair', summary: 'Commercial roads well maintained. Occasional road-widening work around Tejuosho and Jibowu intersections.' },
      internet: { score: 9.4, rating: 'Exceptional', summary: 'Primary fiber trunk routes, co-working hubs (CcHUB), multiple Gigabit ISP options.' },
      noiseVibe: { score: 6.8, rating: 'Vibrant & Bustling', summary: 'High pedestrian and commercial rhythm by day; student nightlife and relaxed residential estates like Sabo GRA.' }
    },
    nearbyFacilities: [
      { type: 'Education', name: 'University of Lagos (UNILAG)', distance: '1.4 km' },
      { type: 'Healthcare', name: 'Military Hospital Yaba', distance: '0.9 km' },
      { type: 'Shopping', name: 'Tejuosho Ultra-Modern Shopping Centre', distance: '1.1 km' },
      { type: 'Transit', name: 'Jibowu Bus Terminal & Metro Red Line Yaba Station', distance: '1.0 km' }
    ]
  },
  {
    id: 'ikeja-gra',
    name: 'Ikeja GRA',
    city: 'Lagos',
    state: 'Lagos State',
    country: 'Nigeria',
    coordinates: { lat: 6.5922, lng: 3.3553 },
    slug: 'ikeja-gra',
    description: 'A serene, leafy government reservation area with wide tree-lined boulevards, colonial heritage charm, luxury boutique hotels, and close proximity to the Murtala Muhammed International Airport.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    livabilityScore: 8.8,
    activeListingsCount: 41,
    verifiedResidentsCount: 195,
    avgRent3Bed: '₦8,500,000 / yr',
    avgSale4Bed: '₦260,000,000',
    metrics: {
      security: { score: 9.2, rating: 'Excellent', summary: 'High diplomatic and senior executive presence. Police divisional checkpoints and strict private gate monitoring.' },
      electricity: { score: 8.5, rating: 'Very Good', summary: 'Priority industrial and administrative grid lines. Frequent 20–22 hr uptime.' },
      water: { score: 8.4, rating: 'Good', summary: 'Reliable freshwater table; standard domestic filtration systems work seamlessly.' },
      roadsDrainage: { score: 8.9, rating: 'Excellent', summary: 'Wide paved dual-carriage roads with underground drainage canals; practically flood-free.' },
      internet: { score: 8.8, rating: 'Very Good', summary: 'Extensive fiber broadband from multiple corporate tier-1 carriers.' },
      noiseVibe: { score: 8.9, rating: 'Quiet & Prestigious', summary: 'Zoned residential peace with bird sounds and tree canopy.' }
    },
    nearbyFacilities: [
      { type: 'Transit', name: 'Murtala Muhammed International Airport (LOS)', distance: '4.2 km' },
      { type: 'Healthcare', name: 'Lagos State University Teaching Hospital (LASUTH)', distance: '2.1 km' },
      { type: 'Recreation', name: 'Ikeja Golf Club', distance: '1.5 km' },
      { type: 'Shopping', name: 'Ikeja City Mall (ICM)', distance: '3.8 km' }
    ]
  },
  {
    id: 'maitama',
    name: 'Maitama District',
    city: 'Abuja',
    state: 'Federal Capital Territory',
    country: 'Nigeria',
    coordinates: { lat: 9.0882, lng: 7.4934 },
    slug: 'maitama',
    description: 'The diplomatic and political pinnacle of Abuja, characterised by grand mansions, diplomatic embassies, wide immaculate parkways, and stunning vistas of the Aso Rock foothills.',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    livabilityScore: 9.2,
    activeListingsCount: 38,
    verifiedResidentsCount: 160,
    avgRent3Bed: '₦12,000,000 / yr',
    avgSale4Bed: '₦450,000,000',
    metrics: {
      security: { score: 9.5, rating: 'Top Tier', summary: 'Embassy belt security patrols, active CCTV street coverage, minimal property crime.' },
      electricity: { score: 9.0, rating: 'Superb', summary: 'Fed directly from central FCT transmission lines; 22+ hours consistent grid availability.' },
      water: { score: 9.1, rating: 'Clean & Municipal', summary: 'Connected directly to Lower Usuma Dam municipal clean water network.' },
      roadsDrainage: { score: 9.6, rating: 'World Class', summary: 'Flawless multi-lane asphalt, landscaped medians, and deep concealed storm drains.' },
      internet: { score: 8.9, rating: 'High Speed', summary: 'Comprehensive 5G coverage and business-grade underground optical fiber.' },
      noiseVibe: { score: 9.3, rating: 'Serene & Low Density', summary: 'Diplomatic tranquillity, zero street touts, strictly enforced zoning.' }
    },
    nearbyFacilities: [
      { type: 'Hospital', name: 'Maitama District Hospital', distance: '1.1 km' },
      { type: 'Parks', name: 'Millennium Park & IBB Golf Course', distance: '2.8 km' },
      { type: 'Diplomacy', name: 'British High Commission & US Embassy', distance: '2.0 km' },
      { type: 'Shopping', name: 'Farmers Market Maitama & Dunes Centre', distance: '1.4 km' }
    ]
  },
  {
    id: 'surulere',
    name: 'Surulere (Bode Thomas / Adeniran Ogunsanya)',
    city: 'Lagos',
    state: 'Lagos State',
    country: 'Nigeria',
    coordinates: { lat: 6.4969, lng: 3.3551 },
    slug: 'surulere',
    description: 'A vibrant, culturally rich central Lagos mainland neighbourhood popular among young families, professionals, and creatives, featuring strong community bonds and active shopping avenues.',
    heroImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    livabilityScore: 7.7,
    activeListingsCount: 47,
    verifiedResidentsCount: 380,
    avgRent3Bed: '₦3,200,000 / yr',
    avgSale4Bed: '₦95,000,000',
    metrics: {
      security: { score: 7.4, rating: 'Good', summary: 'Neighbourhood vigilante gates locked by 11:00 PM across residential closes.' },
      electricity: { score: 7.3, rating: 'Moderate', summary: '14–18 hours daily on average; solar inverter solutions widespread.' },
      water: { score: 7.8, rating: 'Good', summary: 'Clean freshwater boreholes; minimal treatment required.' },
      roadsDrainage: { score: 6.9, rating: 'Fair', summary: 'Main arteries smooth; secondary roads vary by local council maintenance.' },
      internet: { score: 8.5, rating: 'Good', summary: 'FiberOne and Spectranet coverage widespread.' },
      noiseVibe: { score: 7.1, rating: 'Lively Community', summary: 'Warm communal atmosphere with weekend football viewings and local bistros.' }
    },
    nearbyFacilities: [
      { type: 'Sports', name: 'National Stadium & Teslim Balogun Stadium', distance: '1.3 km' },
      { type: 'Shopping', name: 'Adeniran Ogunsanya Mall (Leisure Mall)', distance: '0.9 km' },
      { type: 'Healthcare', name: 'Randle General Hospital', distance: '1.6 km' }
    ]
  }
];

export const DEMO_PROPERTIES = [
  {
    id: 'prop-101',
    title: 'Contemporary 4-Bedroom Semi-Detached Duplex with BQ',
    description: 'A newly built luxury home in a secure, access-controlled close in Lekki Phase 1. Features high ceilings, fully fitted modern kitchen with Italian marble countertops, expansive master suite with walk-in closet, automated gate, stamp concrete compound, and industrial water purification plant.',
    price: 9500000,
    pricePeriod: 'per annum',
    transactionType: 'rent',
    category: 'Duplexes',
    location: {
      address: 'Off Admiralty Way (Exact street released upon inspection booking for occupant security)',
      neighbourhoodId: 'lekki-phase-1',
      neighbourhoodName: 'Lekki Phase 1',
      city: 'Lagos',
      state: 'Lagos State',
      coordinates: { lat: 6.4485, lng: 3.4862 },
      approximatePrecision: true
    },
    bedrooms: 4,
    bathrooms: 4,
    toilets: 5,
    sizeSqm: 380,
    furnishingStatus: 'Semi-Furnished',
    availabilityStatus: 'Available Now',
    verificationStatus: 'EstateLens Verified',
    featured: true,
    listingDate: '2026-11-02',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    videoWalkthroughUrl: 'https://www.youtube.com/watch?v=demo',
    amenities: [
      '24/7 Gated Security',
      'Treated Water System',
      'Dedicated Transformer',
      'Inverter Pre-wired',
      'Fitted Kitchen',
      'Boys Quarters (BQ)',
      'Flood-Free Street',
      'Fiber Optic Ready'
    ],
    agent: {
      name: 'Adewale Bakare',
      company: 'PrimeStone Realty Partners',
      role: 'Verified Agent',
      phone: '+234 803 555 0192',
      email: 'adewale@primestone.ng',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      verified: true,
      listingsCount: 24,
      rating: 4.9
    },
    neighbourhoodSnapshot: {
      id: 'lekki-phase-1',
      name: 'Lekki Phase 1',
      score: 8.4,
      safetyBadge: 'Low Crime Estate Close',
      powerEstimate: '18 hrs/day grid + backup',
      waterReliability: 'Industrial treatment verified'
    }
  },
  {
    id: 'prop-102',
    title: 'Smart Executive 2-Bedroom Serviced Apartment with Pool & Gym',
    description: 'Designed for young professionals, tech founders, and corporate expatriates. This serviced apartment in Sabo/Alagomeji, Yaba boasts dual-source high-speed optic fiber lines, 24/7 central electricity, Olympic-style swimming pool, fully outfitted gymnasium, and concierge desk.',
    price: 4500000,
    pricePeriod: 'per annum',
    transactionType: 'rent',
    category: 'Apartments and flats',
    location: {
      address: 'Near Commercial Avenue, Sabo',
      neighbourhoodId: 'yaba',
      neighbourhoodName: 'Yaba',
      city: 'Lagos',
      state: 'Lagos State',
      coordinates: { lat: 6.5122, lng: 3.3745 },
      approximatePrecision: true
    },
    bedrooms: 2,
    bathrooms: 2,
    toilets: 3,
    sizeSqm: 140,
    furnishingStatus: 'Fully Furnished',
    availabilityStatus: 'Available Immediately',
    verificationStatus: 'EstateLens Verified',
    featured: true,
    listingDate: '2026-11-04',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
    ],
    videoWalkthroughUrl: 'https://www.youtube.com/watch?v=demo2',
    amenities: [
      '24/7 Guaranteed Power',
      'Swimming Pool',
      'Commercial Gym',
      'High-Speed Fiber',
      'CCTV & Biometric Access',
      'Facility Management Desk',
      'Elevator'
    ],
    agent: {
      name: 'Ngozi Chukwuemeka',
      company: 'HubSpace Living Solutions',
      role: 'Property Manager',
      phone: '+234 812 777 9043',
      email: 'ngozi@hubspaceliving.ng',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      verified: true,
      listingsCount: 16,
      rating: 4.8
    },
    neighbourhoodSnapshot: {
      id: 'yaba',
      name: 'Yaba',
      score: 7.9,
      safetyBadge: 'High Activity Hub',
      powerEstimate: '24/7 Serviced Central Generator',
      waterReliability: 'Municipal + Clean Filtered Borehole'
    }
  },
  {
    id: 'prop-103',
    title: 'Diplomatic 5-Bedroom Fully Detached Mansion with Private Cinema',
    description: 'An architectural masterpiece situated in prestigious Maitama, Abuja. Boasts bulletproof entry doors, private 8-seater Dolby Atmos cinema, private swimming pool, smart home climate integration, lush landscaped courtyard, and two detached 2-bedroom staff quarters.',
    price: 480000000,
    pricePeriod: 'outright purchase',
    transactionType: 'sale',
    category: 'Houses',
    location: {
      address: 'Diplomatic Zone, Maitama Hills',
      neighbourhoodId: 'maitama',
      neighbourhoodName: 'Maitama District',
      city: 'Abuja',
      state: 'FCT',
      coordinates: { lat: 9.0911, lng: 7.4981 },
      approximatePrecision: true
    },
    bedrooms: 5,
    bathrooms: 6,
    toilets: 7,
    sizeSqm: 1250,
    furnishingStatus: 'Semi-Furnished',
    availabilityStatus: 'Available for Sale',
    verificationStatus: 'EstateLens Verified',
    featured: true,
    listingDate: '2026-10-28',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80'
    ],
    videoWalkthroughUrl: 'https://www.youtube.com/watch?v=demo3',
    amenities: [
      'Diplomatic Guard Post',
      'Private Heated Pool',
      'Dolby Atmos Cinema',
      'Smart Home Automation',
      'Solar Hybrid 30kVA Plant',
      '2x 2-Bedroom BQ',
      'Perimeter Electric Fencing',
      'Double Garage'
    ],
    agent: {
      name: 'Ibrahim Danjuma',
      company: 'Savannah Crest Luxury Estates',
      role: 'Senior Managing Partner',
      phone: '+234 809 333 1188',
      email: 'ibrahim@savannahcrest.ng',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      verified: true,
      listingsCount: 31,
      rating: 5.0
    },
    neighbourhoodSnapshot: {
      id: 'maitama',
      name: 'Maitama District',
      score: 9.2,
      safetyBadge: 'Diplomatic Zone Patrolled',
      powerEstimate: '22+ hrs public grid',
      waterReliability: 'Municipal Dam Feed Direct'
    }
  },
  {
    id: 'prop-104',
    title: 'Luxury 3-Bedroom Penthouse with Panoramic Golf Course Views',
    description: 'Immaculately finished penthouse within an exclusive gated residential tower in Ikeja GRA. Offers wrap-around balcony with sweeping green views of the golf course, private lift access, Italian porcelain finishes, and high-efficiency VRF air conditioning throughout.',
    price: 185000000,
    pricePeriod: 'outright purchase',
    transactionType: 'sale',
    category: 'Apartments and flats',
    location: {
      address: 'GRA Residential Enclave, Ikeja',
      neighbourhoodId: 'ikeja-gra',
      neighbourhoodName: 'Ikeja GRA',
      city: 'Lagos',
      state: 'Lagos State',
      coordinates: { lat: 6.5898, lng: 3.3524 },
      approximatePrecision: true
    },
    bedrooms: 3,
    bathrooms: 3,
    toilets: 4,
    sizeSqm: 260,
    furnishingStatus: 'Unfurnished',
    availabilityStatus: 'Available for Sale',
    verificationStatus: 'EstateLens Verified',
    featured: false,
    listingDate: '2026-11-01',
    images: [
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80'
    ],
    videoWalkthroughUrl: 'https://www.youtube.com/watch?v=demo4',
    amenities: [
      'Private Direct Elevator',
      'Panoramic Wrap Balcony',
      'Golf Course Proximity',
      'Dedicated Car Parking x3',
      'Central Chilled Water A/C',
      '24/7 Security & Uniformed Concierge'
    ],
    agent: {
      name: 'Victoria Alabi',
      company: 'Apex Horizon Real Estate',
      role: 'Principal Realtor',
      phone: '+234 802 444 8831',
      email: 'victoria@apexhorizon.com',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      verified: true,
      listingsCount: 19,
      rating: 4.9
    },
    neighbourhoodSnapshot: {
      id: 'ikeja-gra',
      name: 'Ikeja GRA',
      score: 8.8,
      safetyBadge: 'Strict Gate Passes',
      powerEstimate: '20+ hrs/day priority grid',
      waterReliability: 'Pure Groundwater Treated'
    }
  },
  {
    id: 'prop-105',
    title: 'Exquisite Waterfront 1-Bedroom Short-Let Loft with Balcony',
    description: 'A stylish, Instagrammable short-let loft overlooking Five Cowrie Creek. Perfect for vacationers, business travelers, and weekend staycations. Equipped with 100Mbps uncapped internet, Netflix/DSTV premium, workspace, chef-ready kitchen, and daily housekeeping.',
    price: 85000,
    pricePeriod: 'per night',
    transactionType: 'short-let',
    category: 'Short-let properties',
    location: {
      address: 'Waterfront Crescent, Lekki Phase 1',
      neighbourhoodId: 'lekki-phase-1',
      neighbourhoodName: 'Lekki Phase 1',
      city: 'Lagos',
      state: 'Lagos State',
      coordinates: { lat: 6.4422, lng: 3.4891 },
      approximatePrecision: true
    },
    bedrooms: 1,
    bathrooms: 1,
    toilets: 2,
    sizeSqm: 85,
    furnishingStatus: 'Fully Furnished',
    availabilityStatus: 'Booking Calendar Open',
    verificationStatus: 'EstateLens Verified',
    featured: false,
    listingDate: '2026-11-05',
    images: [
      'https://images.unsplash.com/photo-1502005229762-ee15242ab839?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4b4f?auto=format&fit=crop&w=1200&q=80'
    ],
    videoWalkthroughUrl: '',
    amenities: [
      'Daily Housekeeping',
      'Superfast Starlink Wi-Fi',
      'Keyless Smart Lock',
      'Waterfront Sunset View',
      'Fully Equipped Kitchen',
      'Smart TV + Streaming'
    ],
    agent: {
      name: 'Chidi Okonkwo',
      company: 'Zenith Stays & Hospitality',
      role: 'Short-Let Superhost',
      phone: '+234 818 990 1234',
      email: 'host@zenithstays.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      verified: true,
      listingsCount: 8,
      rating: 4.95
    },
    neighbourhoodSnapshot: {
      id: 'lekki-phase-1',
      name: 'Lekki Phase 1',
      score: 8.4,
      safetyBadge: 'Low Crime Estate Close',
      powerEstimate: '24/7 Inverter + Auto-Generator',
      waterReliability: 'Industrial treatment verified'
    }
  },
  {
    id: 'prop-106',
    title: 'Spacious 3-Bedroom Family Flat with Large Balcony in Surulere',
    description: 'Well-ventilated and secured 3-bedroom upper-floor apartment in a serene gated street off Bode Thomas, Surulere. Features tiled flooring, borehole water supply, ample parking space for 2 cars, and quick access to Western Avenue and Island bridges.',
    price: 2800000,
    pricePeriod: 'per annum',
    transactionType: 'rent',
    category: 'Apartments and flats',
    location: {
      address: 'Off Bode Thomas Street',
      neighbourhoodId: 'surulere',
      neighbourhoodName: 'Surulere',
      city: 'Lagos',
      state: 'Lagos State',
      coordinates: { lat: 6.4942, lng: 3.3512 },
      approximatePrecision: true
    },
    bedrooms: 3,
    bathrooms: 2,
    toilets: 3,
    sizeSqm: 180,
    furnishingStatus: 'Unfurnished',
    availabilityStatus: 'Available Now',
    verificationStatus: 'Agent Verified',
    featured: false,
    listingDate: '2026-11-03',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    videoWalkthroughUrl: '',
    amenities: [
      'Night Gated Security Guard',
      'Clean Borehole Water',
      'Individual Prepaid Meter',
      'Parking for 2 Cars',
      'Cross Ventilation Balconies'
    ],
    agent: {
      name: 'Bolanle Adeleke',
      company: 'Heritage Realty Consult',
      role: 'Licensed Agent',
      phone: '+234 805 111 2233',
      email: 'bolanle@heritagerealty.ng',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80',
      verified: true,
      listingsCount: 12,
      rating: 4.7
    },
    neighbourhoodSnapshot: {
      id: 'surulere',
      name: 'Surulere',
      score: 7.7,
      safetyBadge: 'Gated Residential Street',
      powerEstimate: '15 hrs/day grid',
      waterReliability: 'Clean Borehole Supply'
    }
  }
];

export const DEMO_COMMUNITY_POSTS = [
  {
    id: 'post-501',
    neighbourhoodId: 'lekki-phase-1',
    neighbourhoodName: 'Lekki Phase 1',
    category: 'INFRASTRUCTURE',
    title: 'Update on Admiralty Way drainage desilting ahead of rainy season',
    content: 'Just wanted to share an update from the Residents Association meeting yesterday. The local council contractors have started clearing the primary storm drainage culverts along Admiralty Way up to the Lekki Coliseum junction. For anyone looking to rent around Fola Osibo or Omorinre Johnson, make sure your compound has elevated ramps. Drainage has improved 60% compared to 2 years ago, but heavy July rain still causes temporary pooling for 1-2 hours.',
    author: {
      name: 'Dapo O.',
      badge: 'Verified Resident (4 yrs)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    createdAt: '2 hours ago',
    upvotes: 42,
    downvotes: 1,
    commentsCount: 14,
    tags: ['Drainage', 'Rainy Season', 'Admiralty Way'],
    verifiedResident: true,
    pinned: true,
    comments: [
      {
        id: 'c-1',
        author: 'Chioma E.',
        badge: 'Verified Resident',
        createdAt: '1 hour ago',
        content: 'Thanks for this Dapo! Can confirm they finished the trench outside Centro Mall today. Much cleaner flow now.',
        upvotes: 9
      },
      {
        id: 'c-2',
        author: 'Femi A.',
        badge: 'Prospective Tenant',
        createdAt: '35 mins ago',
        content: 'Very helpful context. I am inspecting a duplex on Fola Osibo this Saturday and was worried about flood history.',
        upvotes: 4
      }
    ]
  },
  {
    id: 'post-502',
    neighbourhoodId: 'lekki-phase-1',
    neighbourhoodName: 'Lekki Phase 1',
    category: 'SECURITY',
    title: 'Night patrol vigilance report: Lekki Phase 1 security gate protocols',
    content: 'A quick reminder to neighbours: Admiralty Gate 1 & 2 now require visitors to present gate pass codes generated from the Estate resident app after 10:30 PM. The private security team has also deployed two additional motorized motorcycle patrols covering the water-front streets. Feeling much safer taking evening walks.',
    author: {
      name: 'Engr. Kenneth M.',
      badge: 'Verified Resident (6 yrs)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    },
    createdAt: 'Yesterday',
    upvotes: 68,
    downvotes: 2,
    commentsCount: 9,
    tags: ['Security', 'Gate Protocols', 'Night Patrol'],
    verifiedResident: true,
    pinned: false,
    comments: [
      {
        id: 'c-3',
        author: 'Tolani B.',
        badge: 'Verified Resident',
        createdAt: '18 hours ago',
        content: 'The new gate code system was slightly delayed on Sunday night for delivery riders, but security handled it well.',
        upvotes: 12
      }
    ]
  },
  {
    id: 'post-503',
    neighbourhoodId: 'yaba',
    neighbourhoodName: 'Yaba',
    category: 'INFRASTRUCTURE',
    title: 'FiberOne vs MainOne optical stability in Sabo/Akoka area: 6-month review',
    content: 'Running a remote engineering team from our apartment off Commercial Avenue. Over the past 6 months, we experienced 99.4% uptime with FiberOne (50Mbps plan at ₦23,000/mo). MainOne redundancy kicked in during one submarine cable outage in March. Electricity on our transformer has been solid at roughly 18 hours/day. If you work in tech and need low latency, this strip is as reliable as Victoria Island at half the rent.',
    author: {
      name: 'Tunde Adeleke',
      badge: 'Verified Tech Resident',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    createdAt: '3 days ago',
    upvotes: 89,
    downvotes: 0,
    commentsCount: 23,
    tags: ['Internet', 'Tech Workers', 'Remote Work', 'Power'],
    verifiedResident: true,
    pinned: false,
    comments: []
  },
  {
    id: 'post-504',
    neighbourhoodId: 'yaba',
    neighbourhoodName: 'Yaba',
    category: 'LIVING CONDITIONS',
    title: 'Weekend noise levels around University road vs Sabo GRA',
    content: 'Prospective tenants frequently ask about student noise. If you are looking around University Road and St. Finbarrs, expect vibrant youth music and church/mosque services on weekends. If you want absolute calm, look at Sabo GRA or the gated closes behind Montgomery Road. Night and day difference!',
    author: {
      name: 'Amina Bello',
      badge: 'Community Contributor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    createdAt: '5 days ago',
    upvotes: 37,
    downvotes: 1,
    commentsCount: 8,
    tags: ['Noise Levels', 'Neighbourhood Vibe', 'Advice'],
    verifiedResident: false,
    pinned: false,
    comments: []
  },
  {
    id: 'post-505',
    neighbourhoodId: 'maitama',
    neighbourhoodName: 'Maitama District',
    category: 'PROPERTY AND LANDLORD EXPERIENCES',
    title: 'Understanding service charge expectations in Maitama residential blocks',
    content: 'For those relocating to Abuja: Service charges in Maitama apartment buildings usually range from ₦1.8M to ₦3.5M annually. Before signing, demand a transparent breakdown of: 1) Generator fuel allocation hours, 2) Water treatment maintenance cycles, 3) Security guard company credentialing. Trustworthy landlords are completely open about these accounts.',
    author: {
      name: 'Barrister Farouk S.',
      badge: 'Verified Resident (8 yrs)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    createdAt: '4 days ago',
    upvotes: 55,
    downvotes: 0,
    commentsCount: 11,
    tags: ['Service Charge', 'Tenant Rights', 'Due Diligence'],
    verifiedResident: true,
    pinned: false,
    comments: []
  },
  {
    id: 'post-506',
    neighbourhoodId: 'ikeja-gra',
    neighbourhoodName: 'Ikeja GRA',
    category: 'GENERAL DISCUSSIONS',
    title: 'Best early morning running routes with good tree shade & low traffic',
    content: 'Isaac John can get busy with hotel patrons, but Oduduwa Way and Oba Akinjobi Way are fantastic for 5km/10km morning jogs between 6:00 AM and 7:30 AM. Streetlights stay on until 6:45 AM, and security guards at the estate gates are very friendly.',
    author: {
      name: 'Sola Williams',
      badge: 'Verified Resident',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80'
    },
    createdAt: '6 days ago',
    upvotes: 31,
    downvotes: 0,
    commentsCount: 6,
    tags: ['Fitness', 'Lifestyle', 'Parks & Running'],
    verifiedResident: true,
    pinned: false,
    comments: []
  }
];

export const DEMO_PROPERTY_REVIEWS = [
  {
    id: 'prev-1',
    propertyId: 'prop-101',
    author: 'Gbenga A.',
    userRole: 'Verified Tenant (Former)',
    rating: 4.8,
    ratings: {
      condition: 5,
      accuracy: 5,
      maintenance: 4,
      valueForMoney: 4.5
    },
    date: '3 weeks ago',
    comment: 'Lived here for 18 months before job transfer. Landlord is very respectful and responds within 24 hours for plumbing/electrical upkeep. The stamp concrete compound drains fast during rain. Highly recommended.',
    verified: true
  },
  {
    id: 'prev-2',
    propertyId: 'prop-101',
    author: 'Kemi Martins',
    userRole: 'Verified Inspector',
    rating: 4.6,
    ratings: {
      condition: 4.5,
      accuracy: 5,
      maintenance: 4.5,
      valueForMoney: 4
    },
    date: '1 month ago',
    comment: 'Conducted a physical pre-lease inspection. Master bedroom is as expansive as the photos. Water treatment plant had new filter cartridges installed.',
    verified: true
  }
];

export const DEMO_USER = {
  id: 'usr-demo-001',
  name: 'Babatunde Adeleke',
  email: 'babatunde@estatelens.demo',
  phone: '+234 803 123 4567',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  roles: ['buyer_tenant', 'landlord_owner'], // Multiple roles supported!
  activeRole: 'buyer_tenant',
  savedProperties: ['prop-101', 'prop-102', 'prop-103'],
  followedNeighbourhoods: ['lekki-phase-1', 'yaba'],
  enquiries: [
    {
      id: 'enq-1',
      propertyId: 'prop-101',
      propertyTitle: 'Contemporary 4-Bedroom Semi-Detached Duplex with BQ',
      agentName: 'Adewale Bakare',
      status: 'Inspection Confirmed',
      inspectionDate: 'Saturday, Nov 14, 2026 at 11:30 AM',
      lastMessage: 'Looking forward to meeting you at the security gate at 11:30 AM.'
    },
    {
      id: 'enq-2',
      propertyId: 'prop-102',
      propertyTitle: 'Smart Executive 2-Bedroom Serviced Apartment with Pool & Gym',
      agentName: 'Ngozi Chukwuemeka',
      status: 'Awaiting Response',
      inspectionDate: 'Pending Schedule',
      lastMessage: 'Enquiry sent regarding service charge coverage.'
    }
  ],
  myListings: [
    {
      id: 'my-prop-1',
      title: 'Modern 3-Bedroom Terrace Duplex in Oniru Victoria Island Extension',
      price: '₦7,000,000 / yr',
      status: 'Active Listing',
      views: 342,
      enquiriesCount: 8,
      inspectionsCount: 3
    }
  ]
};

export const PROPERTY_TYPES = [
  'All Types',
  'Houses',
  'Apartments and flats',
  'Duplexes',
  'Bungalows',
  'Self-contained apartments',
  'Land and plots',
  'Commercial properties',
  'Short-let properties'
];

export const TRANSACTION_TYPES = [
  { label: 'All Transactions', value: 'all' },
  { label: 'For Rent', value: 'rent' },
  { label: 'For Sale', value: 'sale' },
  { label: 'Short-Let', value: 'short-let' }
];

export const COMMUNITY_CATEGORIES = [
  { id: 'ALL', label: 'All Discussions', icon: 'MessageSquare' },
  { id: 'SECURITY', label: 'Security & Safety', icon: 'ShieldAlert' },
  { id: 'INFRASTRUCTURE', label: 'Power & Infrastructure', icon: 'Zap' },
  { id: 'LIVING CONDITIONS', label: 'Living Conditions & Flooding', icon: 'CloudRain' },
  { id: 'PROPERTY AND LANDLORD EXPERIENCES', label: 'Landlord & Property Realities', icon: 'Home' },
  { id: 'GENERAL DISCUSSIONS', label: 'General & Q&A', icon: 'Compass' }
];

