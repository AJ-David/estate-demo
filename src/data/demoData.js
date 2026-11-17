/**
 * VETTEDHOMES — ENTERPRISE GROUND-TRUTH DATASET
 * Production-grade catalog representing verified luxury properties, 
 * live neighbourhood intelligence, community audits, and resident reviews 
 * across premier Nigerian urban corridors (Lagos & Abuja).
 */

export const DEMO_NEIGHBOURHOODS = [
  {
    id: 'banana-island',
    name: 'Banana Island (Ikoyi)',
    city: 'Lagos',
    state: 'Lagos State',
    country: 'Nigeria',
    coordinates: { lat: 6.4552, lng: 3.4398 },
    slug: 'banana-island',
    description: 'Nigeria\'s most exclusive man-made luxury island enclave. Boasts private biometric gate barriers, 24/7 dedicated underground power generation, deep-water yacht jetties, zero surface flooding, and highest resident security index in West Africa.',
    heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    livabilityScore: 9.7,
    activeListingsCount: 32,
    verifiedResidentsCount: 280,
    avgRent3Bed: '₦22,000,000 / yr',
    avgSale4Bed: '₦1,250,000,000',
    metrics: {
      security: { score: 9.8, rating: 'Fortress Grade', summary: 'Armed Navy/Police joint checkpoints, biometric access card gate scanners, private patrol boats on waterways.' },
      electricity: { score: 9.7, rating: '24/7 Continuous', summary: 'Dedicated IPP underground power grid with 99.8% uptime. Centralised automated diesel turbine backup.' },
      water: { score: 9.4, rating: 'Fully Treated Municipal Plant', summary: 'Island-wide reverse osmosis central water filtration station pumped directly to all estates.' },
      roadsDrainage: { score: 9.8, rating: 'Zero Flood Record', summary: 'Engineered stormwater sub-drain canals discharging into the lagoon; zero recorded street pooling.' },
      internet: { score: 9.6, rating: 'Gigabit Fiber', summary: 'Underground fiber ducts (ipNX, MainOne, Starlink Ground Gateway, FiberOne) with redundant feeds.' },
      noiseVibe: { score: 9.6, rating: 'Ultra Serene & Private', summary: 'Strict quiet hours enforced by Residents Association; no commercial clubs or street hawkers permitted.' }
    },
    nearbyFacilities: [
      { type: 'Healthcare', name: 'Lagoon Hospital Ikoyi', distance: '2.1 km' },
      { type: 'Transit', name: 'Private Deep-Water Yacht Jetty', distance: '0.4 km' },
      { type: 'Education', name: 'St. Saviour\'s School Ikoyi', distance: '3.2 km' },
      { type: 'Recreation', name: 'Ikoyi Club 1938 Golf & Tennis', distance: '3.8 km' },
      { type: 'Shopping', name: 'Banana Island Central Clubhouse & Gourmet Mart', distance: '0.5 km' }
    ]
  },
  {
    id: 'ikoyi',
    name: 'Old Ikoyi & Bourdillon',
    city: 'Lagos',
    state: 'Lagos State',
    country: 'Nigeria',
    coordinates: { lat: 6.4501, lng: 3.4285 },
    slug: 'ikoyi',
    description: 'The historic seat of Nigerian aristocracy and high-finance power. Tree-canopied boulevards along Bourdillon and Alexander Avenue, colonial-heritage estates, high-rise architectural sky villas, and diplomatic residences.',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    livabilityScore: 9.4,
    activeListingsCount: 64,
    verifiedResidentsCount: 390,
    avgRent3Bed: '₦18,000,000 / yr',
    avgSale4Bed: '₦650,000,000',
    metrics: {
      security: { score: 9.4, rating: 'Very High', summary: 'Strict residential street gates closed 10 PM. Heavy diplomatic police patrols along Bourdillon and Kingsway.' },
      electricity: { score: 8.9, rating: 'High Grid + Estate IPP', summary: 'Average 20–22 hrs public grid supply. Top residential towers operate 24/7 dedicated generator plants.' },
      water: { score: 8.8, rating: 'Industrial Water Treatment', summary: 'Private industrial boreholes with water softening plants standard across residential compounds.' },
      roadsDrainage: { score: 9.2, rating: 'Excellent Drainage', summary: 'Deep concrete culverts along major avenues discharging to Five Cowrie Creek. Fast clearing.' },
      internet: { score: 9.3, rating: 'Ultra-Fast Fiber', summary: 'Main trunk optical fiber lines across Kingsway and Alexander. Tier-1 enterprise connectivity.' },
      noiseVibe: { score: 9.1, rating: 'Dignified & Quiet', summary: 'Peaceful residential closes with luxury boutique hotel dining along Glover and Cooper.' }
    },
    nearbyFacilities: [
      { type: 'Healthcare', name: 'First Cardiology Consultants', distance: '1.2 km' },
      { type: 'Shopping', name: 'The Wheatbaker & Southern Sun Marts', distance: '0.9 km' },
      { type: 'Recreation', name: 'Ikoyi Club 1938 Golf Course', distance: '1.5 km' },
      { type: 'Transit', name: 'Lekki-Ikoyi Cable-Stayed Link Bridge', distance: '1.4 km' },
      { type: 'Education', name: 'Corona International Primary School', distance: '1.8 km' }
    ]
  },
  {
    id: 'victoria-island',
    name: 'Victoria Island & Oniru',
    city: 'Lagos',
    state: 'Lagos State',
    country: 'Nigeria',
    coordinates: { lat: 6.4281, lng: 3.4219 },
    slug: 'victoria-island',
    description: 'The premier commercial and financial capital of Nigeria, fringed by oceanfront promenades, high-end corporate headquarters, diplomatic embassies, luxury beach clubs, and five-star hospitality towers.',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    livabilityScore: 8.9,
    activeListingsCount: 92,
    verifiedResidentsCount: 460,
    avgRent3Bed: '₦14,000,000 / yr',
    avgSale4Bed: '₦380,000,000',
    metrics: {
      security: { score: 8.9, rating: 'High Executive', summary: 'Constant private guard presence at corporate towers and residential gates. 24/7 street illumination.' },
      electricity: { score: 8.6, rating: 'Priority Feeder Line', summary: '18–21 hrs public supply; 100% of serviced apartment blocks carry 24/7 dual generator guarantees.' },
      water: { score: 8.2, rating: 'Fully Filtered', summary: 'Saline coastal aquifer requires Reverse Osmosis systems, which are universally standard in serviced towers.' },
      roadsDrainage: { score: 8.0, rating: 'Good', summary: 'Ahmadu Bello and Ozumba Mbadiwe dual carriageways well maintained. Upgraded canals along Oniru.' },
      internet: { score: 9.5, rating: 'Exceptional', summary: 'Submarine fiber landing point hub. Highest speed internet densities in West Africa.' },
      noiseVibe: { score: 7.6, rating: 'Vibrant Corporate & Nightlife', summary: 'Fast daytime business pace; exclusive nightlife along Bishop Oluwole and Adeola Odeku.' }
    },
    nearbyFacilities: [
      { type: 'Healthcare', name: 'Reddington Multi-Specialist Hospital', distance: '0.8 km' },
      { type: 'Shopping', name: 'The Palms Shopping Mall Oniru', distance: '1.2 km' },
      { type: 'Diplomacy', name: 'US Consulate & British Deputy High Commission', distance: '1.5 km' },
      { type: 'Recreation', name: 'Landmark Beach & Eco-Resort', distance: '1.6 km' },
      { type: 'Transit', name: 'Eko Hotel Helipad & Water Taxi Terminal', distance: '1.1 km' }
    ]
  },
  {
    id: 'eko-atlantic',
    name: 'Eko Atlantic City',
    city: 'Lagos',
    state: 'Lagos State',
    country: 'Nigeria',
    coordinates: { lat: 6.4172, lng: 3.4118 },
    slug: 'eko-atlantic',
    description: 'A 21st-century state-of-the-art master-planned coastal metropolis built on reclaimed land protected by the 8.5km Great Wall of Lagos. Self-contained underground utility infrastructure, clean power grid, and marina boardwalks.',
    heroImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    livabilityScore: 9.5,
    activeListingsCount: 45,
    verifiedResidentsCount: 190,
    avgRent3Bed: '₦20,000,000 / yr',
    avgSale4Bed: '₦750,000,000',
    metrics: {
      security: { score: 9.6, rating: 'Smart City Surveillance', summary: 'Centralised security control room, facial recognition entry barriers, dedicated private city police.' },
      electricity: { score: 9.8, rating: 'Dedicated Gas-Turbine IPP', summary: 'Internal 24/7 subterranean power grid independent of national transmission fluctuations.' },
      water: { score: 9.7, rating: 'Internal Water Treatment Network', summary: 'City-wide potable water distribution network complying with World Health Organization standards.' },
      roadsDrainage: { score: 9.9, rating: 'Master Engineered', summary: '8.5km Great Wall of Lagos sea revetment. Sub-surface stormwater conduits with zero pooling.' },
      internet: { score: 9.7, rating: 'Subsea Direct Optical', summary: 'Direct fiber connection to international submarine cables with multi-gigabit capability.' },
      noiseVibe: { score: 9.2, rating: 'Futuristic & Controlled', summary: 'Noise-absorbing architectural glass; strictly zoned marina leisure areas away from apartments.' }
    },
    nearbyFacilities: [
      { type: 'Transit', name: 'Eko Atlantic Marina & Helipad', distance: '0.3 km' },
      { type: 'Shopping', name: 'Eko Atlantic Central Boulevard Retail', distance: '0.6 km' },
      { type: 'Diplomacy', name: 'New US Consulate Mega-Campus (Eko Atlantic)', distance: '0.8 km' },
      { type: 'Healthcare', name: 'Eko Atlantic Medical Center', distance: '1.0 km' }
    ]
  },
  {
    id: 'lekki-phase-1',
    name: 'Lekki Phase 1',
    city: 'Lagos',
    state: 'Lagos State',
    country: 'Nigeria',
    coordinates: { lat: 6.4474, lng: 3.4849 },
    slug: 'lekki-phase-1',
    description: 'An upscale, cosmopolitan coastal peninsula neighbourhood renowned for its vibrant commercial strips along Admiralty Way, modern gated residential estates, high-end culinary spots, and active tech/lifestyle community.',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    livabilityScore: 8.5,
    activeListingsCount: 84,
    verifiedResidentsCount: 520,
    avgRent3Bed: '₦8,500,000 / yr',
    avgSale4Bed: '₦240,000,000',
    metrics: {
      security: { score: 8.6, rating: 'High', summary: 'Gated streets with private vigilante/estate security patrols. Admiralty Way night motorized patrols.' },
      electricity: { score: 7.4, rating: 'Moderate-High', summary: '16–20 hrs public grid daily. Most estates require independent or centralised diesel/inverter backup.' },
      water: { score: 7.0, rating: 'Moderate', summary: 'Borehole with industrial water treatment plants standard across residential compounds due to coastal aquifer.' },
      roadsDrainage: { score: 6.8, rating: 'Significant Improvement', summary: 'Recent Admiralty culvert desilting cleared major flood chokepoints. Elevated compound ramps advised.' },
      internet: { score: 9.1, rating: 'Excellent', summary: 'High-density fiber coverage (MainOne, ipNX, FiberOne, Starlink).' },
      noiseVibe: { score: 7.2, rating: 'Moderate', summary: 'Quiet on residential off-streets; active lifestyle and culinary scene on main thoroughfares.' }
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
    id: 'ikeja-gra',
    name: 'Ikeja GRA',
    city: 'Lagos',
    state: 'Lagos State',
    country: 'Nigeria',
    coordinates: { lat: 6.5922, lng: 3.3553 },
    slug: 'ikeja-gra',
    description: 'A serene, leafy government reservation area with wide tree-lined boulevards, colonial heritage charm, luxury boutique hotels, and close proximity to the Murtala Muhammed International Airport.',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    livabilityScore: 8.8,
    activeListingsCount: 41,
    verifiedResidentsCount: 245,
    avgRent3Bed: '₦9,000,000 / yr',
    avgSale4Bed: '₦280,000,000',
    metrics: {
      security: { score: 9.2, rating: 'Excellent', summary: 'High executive presence. Police divisional checkpoints and strict private gate monitoring on all closes.' },
      electricity: { score: 8.5, rating: 'Very Good', summary: 'Priority administrative grid lines. Frequent 20–22 hr uptime.' },
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
    id: 'yaba',
    name: 'Yaba (Tech & Academic Corridor)',
    city: 'Lagos',
    state: 'Lagos State',
    country: 'Nigeria',
    coordinates: { lat: 6.5095, lng: 3.3711 },
    slug: 'yaba',
    description: 'The historic heart of Lagos innovation and academia—home to UNILAG, YabaTech, tech incubators, energetic coffee hubs, and accessible mainland transport links to both Island and Ikeja.',
    heroImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    livabilityScore: 8.0,
    activeListingsCount: 52,
    verifiedResidentsCount: 480,
    avgRent3Bed: '₦4,200,000 / yr',
    avgSale4Bed: '₦120,000,000',
    metrics: {
      security: { score: 7.7, rating: 'Good', summary: 'Busy student & tech worker daytime traffic. Well-lit along Commercial Ave and Sabo GRA closes.' },
      electricity: { score: 8.0, rating: 'Good', summary: 'Dedicated feeder line gives Alagomeji and Akoka areas 18+ hrs regular grid supply.' },
      water: { score: 8.0, rating: 'Good', summary: 'Lagos State Water Corporation connection combined with clean non-saline groundwater boreholes.' },
      roadsDrainage: { score: 7.4, rating: 'Fair-Good', summary: 'Commercial roads paved. Minimal drainage issues in residential Sabo closes.' },
      internet: { score: 9.5, rating: 'Exceptional', summary: 'Primary fiber trunk routes, co-working hubs (CcHUB), multiple Gigabit ISP options.' },
      noiseVibe: { score: 7.0, rating: 'Vibrant & Bustling', summary: 'High pedestrian and commercial rhythm by day; student nightlife and relaxed residential estates.' }
    },
    nearbyFacilities: [
      { type: 'Education', name: 'University of Lagos (UNILAG)', distance: '1.4 km' },
      { type: 'Healthcare', name: 'Military Hospital Yaba', distance: '0.9 km' },
      { type: 'Shopping', name: 'Tejuosho Ultra-Modern Shopping Centre', distance: '1.1 km' },
      { type: 'Transit', name: 'Jibowu Bus Terminal & Metro Red Line Yaba Station', distance: '1.0 km' }
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
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    livabilityScore: 9.4,
    activeListingsCount: 38,
    verifiedResidentsCount: 210,
    avgRent3Bed: '₦14,000,000 / yr',
    avgSale4Bed: '₦520,000,000',
    metrics: {
      security: { score: 9.6, rating: 'Top Tier', summary: 'Embassy belt security patrols, active CCTV street coverage, minimal property crime.' },
      electricity: { score: 9.1, rating: 'Superb', summary: 'Fed directly from central FCT transmission lines; 22+ hours consistent grid availability.' },
      water: { score: 9.2, rating: 'Clean Municipal Network', summary: 'Connected directly to Lower Usuma Dam municipal clean water network.' },
      roadsDrainage: { score: 9.6, rating: 'World Class', summary: 'Flawless multi-lane asphalt, landscaped medians, and deep concealed storm drains.' },
      internet: { score: 9.0, rating: 'High Speed', summary: 'Comprehensive 5G coverage and business-grade underground optical fiber.' },
      noiseVibe: { score: 9.4, rating: 'Serene & Low Density', summary: 'Diplomatic tranquillity, zero street touts, strictly enforced zoning.' }
    },
    nearbyFacilities: [
      { type: 'Hospital', name: 'Maitama District Hospital', distance: '1.1 km' },
      { type: 'Parks', name: 'Millennium Park & IBB Golf Course', distance: '2.8 km' },
      { type: 'Diplomacy', name: 'British High Commission & US Embassy', distance: '2.0 km' },
      { type: 'Shopping', name: 'Farmers Market Maitama & Dunes Centre', distance: '1.4 km' }
    ]
  },
  {
    id: 'asokoro',
    name: 'Asokoro District',
    city: 'Abuja',
    state: 'Federal Capital Territory',
    country: 'Nigeria',
    coordinates: { lat: 9.0435, lng: 7.5256 },
    slug: 'asokoro',
    description: 'The executive power district of Abuja, home to the Presidential Villa (Aso Rock), ECOWAS headquarters, international embassies, and fortified hilltop residences with commanding valley views.',
    heroImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    livabilityScore: 9.5,
    activeListingsCount: 29,
    verifiedResidentsCount: 175,
    avgRent3Bed: '₦16,000,000 / yr',
    avgSale4Bed: '₦780,000,000',
    metrics: {
      security: { score: 9.8, rating: 'Maximum Protection', summary: 'Presidential villa perimeter security, elite military and diplomatic police checkpoints.' },
      electricity: { score: 9.3, rating: 'Near Flawless', summary: 'Priority national grid feed with 23+ hrs/day regular availability.' },
      water: { score: 9.2, rating: 'High Pressure Municipal', summary: 'Reliable treated municipal gravity-feed reservoirs across the hills.' },
      roadsDrainage: { score: 9.7, rating: 'Pristine Mountain Roads', summary: 'Engineered switchback asphalt boulevards with reinforced hillside drainage channels.' },
      internet: { score: 9.1, rating: 'Ultra Fast', summary: 'Direct government & diplomatic fiber backbone; seamless Starlink coverage.' },
      noiseVibe: { score: 9.6, rating: 'Diplomatic Silence', summary: 'Extreme privacy and discretion; strict residential covenants strictly enforced.' }
    },
    nearbyFacilities: [
      { type: 'Diplomacy', name: 'ECOWAS Secretariat Headquarters', distance: '1.2 km' },
      { type: 'Healthcare', name: 'Asokoro District Hospital', distance: '1.4 km' },
      { type: 'Recreation', name: 'Aso Rock Presidential Parkland', distance: '2.0 km' },
      { type: 'Shopping', name: 'Grand Square Mart & Asokoro Mall', distance: '1.6 km' }
    ]
  },
  {
    id: 'guzape',
    name: 'Guzape District',
    city: 'Abuja',
    state: 'Federal Capital Territory',
    country: 'Nigeria',
    coordinates: { lat: 9.0275, lng: 7.5098 },
    slug: 'guzape',
    description: 'Abuja\'s Beverly Hills. A dramatic, undulating hilltop district commanding panoramic vistas over the entire Federal Capital Territory, featuring contemporary glass-and-steel architectural residences.',
    heroImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
    livabilityScore: 8.8,
    activeListingsCount: 36,
    verifiedResidentsCount: 160,
    avgRent3Bed: '₦9,500,000 / yr',
    avgSale4Bed: '₦340,000,000',
    metrics: {
      security: { score: 8.8, rating: 'Very Good', summary: 'Gated hillside estate barriers, private security patrols, low pedestrian traffic.' },
      electricity: { score: 8.6, rating: 'Very Good', summary: 'Substation upgrades give Guzape 19–21 hrs public supply. Estates utilize hybrid solar.' },
      water: { score: 8.3, rating: 'Hillside Booster Pumps', summary: 'High elevation requires compound pressure pumps; municipal supply supplemented by deep rock boreholes.' },
      roadsDrainage: { score: 8.9, rating: 'Steep Natural Drainage', summary: 'Elevated topography prevents any water pooling; roads asphalted with safety barriers.' },
      internet: { score: 8.8, rating: 'High Speed', summary: 'Full 5G coverage and expanding optical fiber from top telecommunications providers.' },
      noiseVibe: { score: 9.1, rating: 'Breezy & Relaxing', summary: 'Cool mountain breezes, panoramic city nightlights, peaceful low-density luxury.' }
    },
    nearbyFacilities: [
      { type: 'Transit', name: 'Outer Southern Expressway (OSEX)', distance: '1.5 km' },
      { type: 'Shopping', name: 'Ceddi Plaza Central Area', distance: '4.5 km' },
      { type: 'Healthcare', name: 'National Hospital Abuja', distance: '4.8 km' },
      { type: 'Recreation', name: 'Guzape Hilltop Viewpoint Lounge', distance: '0.8 km' }
    ]
  },
  {
    id: 'surulere',
    name: 'Surulere (Bode Thomas)',
    city: 'Lagos',
    state: 'Lagos State',
    country: 'Nigeria',
    coordinates: { lat: 6.4969, lng: 3.3551 },
    slug: 'surulere',
    description: 'A vibrant, culturally rich central Lagos mainland neighbourhood popular among young families, professionals, and creatives, featuring strong community bonds and active shopping avenues.',
    heroImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    livabilityScore: 7.8,
    activeListingsCount: 46,
    verifiedResidentsCount: 310,
    avgRent3Bed: '₦3,200,000 / yr',
    avgSale4Bed: '₦95,000,000',
    metrics: {
      security: { score: 7.8, rating: 'Community Gated', summary: 'Streets feature active Landlord/Tenant Association security gates locked from 11 PM to 5 AM.' },
      electricity: { score: 7.2, rating: 'Moderate', summary: '14–17 hrs daily grid average. Inverter setups popular among residential apartments.' },
      water: { score: 7.6, rating: 'Good', summary: 'Clean freshwater table; standard domestic borehole water with regular domestic filtration.' },
      roadsDrainage: { score: 7.3, rating: 'Satisfactory', summary: 'Major roads paved; drainage cleared seasonally by Lagos State Ministry of Environment.' },
      internet: { score: 8.7, rating: 'Broadband Fiber', summary: 'FiberOne and IPNX lines available across Bode Thomas, Adeniran Ogunsanya, and Ogunlana Drive.' },
      noiseVibe: { score: 7.2, rating: 'Lively & Social', summary: 'Vibrant street life, iconic family restaurants, and peaceful gated inner closes.' }
    },
    nearbyFacilities: [
      { type: 'Healthcare', name: 'Lagos University Teaching Hospital (LUTH)', distance: '2.5 km' },
      { type: 'Shopping', name: 'Adeniran Ogunsanya Shopping Mall', distance: '0.8 km' },
      { type: 'Recreation', name: 'National Stadium & Teslim Balogun Stadium', distance: '1.2 km' },
      { type: 'Transit', name: 'Costain / Western Avenue Bridge to Island', distance: '2.0 km' }
    ]
  }
];

export const DEMO_PROPERTIES = [
  {
    id: 'prop-107',
    title: 'Sovereign 6-Bedroom Ultra-Luxury Waterfront Villa with Private Jetty',
    description: 'The pinnacle of Nigerian residential prestige. Situated on a private peninsula close within Banana Island, Ikoyi. Features 6 palatial en-suite bedrooms, private deep-water yacht jetty, Olympic infinity pool overlooking the Lagos lagoon, bulletproof panic room, 12-seater Dolby Atmos cinema, Italian marble kitchen, and separate 3-bedroom detached staff quarters. Zero surface flood risk, 24/7 dedicated clean power grid.',
    price: 1850000000,
    pricePeriod: 'outright purchase',
    transactionType: 'sale',
    category: 'Houses',
    location: {
      address: 'Waterfront Crescent, Zone A, Banana Island',
      neighbourhoodId: 'banana-island',
      neighbourhoodName: 'Banana Island (Ikoyi)',
      city: 'Lagos',
      state: 'Lagos State',
      coordinates: { lat: 6.4578, lng: 3.4412 },
      approximatePrecision: true
    },
    bedrooms: 6,
    bathrooms: 7,
    toilets: 8,
    sizeSqm: 1850,
    furnishingStatus: 'Semi-Furnished',
    availabilityStatus: 'Available for Sale',
    marketStatus: 'available',
    marketStatusLabel: 'Verified Exclusive Allocation',
    verificationStatus: 'VettedHomes Certified & LASRERA Verified',
    featured: true,
    listingDate: '2026-11-12',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    videoWalkthroughUrl: 'https://www.youtube.com/watch?v=F_fK89t3bOU',
    amenities: [
      'Private Deep-Water Yacht Jetty',
      'Infinity Pool Overlooking Lagoon',
      '24/7 Dedicated Power Grid (IPP)',
      '12-Seat Dolby Atmos Cinema',
      'Smart Home Automation System',
      'Bulletproof Security Guard Post',
      '3-Bedroom Staff Quarters (BQ)',
      'Underground Multi-Vehicle Garage'
    ],
    agent: {
      name: 'Adewale Bakare',
      company: 'PrimeStone Prestige Assets',
      role: 'Principal Broker',
      phone: '+234 803 555 0192',
      email: 'adewale@primestone.ng',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      verified: true,
      listingsCount: 28,
      rating: 5.0
    },
    neighbourhoodSnapshot: {
      id: 'banana-island',
      name: 'Banana Island (Ikoyi)',
      score: 9.7,
      safetyBadge: 'Fortress Grade Security',
      powerEstimate: '24/7 Dedicated IPP Grid',
      waterReliability: 'Island Reverse Osmosis Central Feed'
    }
  },
  {
    id: 'prop-108',
    title: 'Bourdillon Sky Villa: 4-Bedroom Triplex Penthouse with Private Pool',
    description: 'Suspended in the clouds over Old Ikoyi. This ultra-exclusive triplex penthouse occupies the top 3 levels of a landmark tower on Bourdillon Road. Offers double-height 7-meter ceilings, private rooftop cantilevered swimming pool, private direct high-speed elevator, bespoke Poliform kitchen, and 360-degree views stretching across Ikoyi to the Atlantic Ocean.',
    price: 680000000,
    pricePeriod: 'outright purchase',
    transactionType: 'sale',
    category: 'Apartments and flats',
    location: {
      address: 'Bourdillon Road, Old Ikoyi',
      neighbourhoodId: 'ikoyi',
      neighbourhoodName: 'Old Ikoyi & Bourdillon',
      city: 'Lagos',
      state: 'Lagos State',
      coordinates: { lat: 6.4518, lng: 3.4312 },
      approximatePrecision: true
    },
    bedrooms: 4,
    bathrooms: 5,
    toilets: 6,
    sizeSqm: 720,
    furnishingStatus: 'Fully Furnished',
    availabilityStatus: 'Under Offer / In Escrow',
    marketStatus: 'under_escrow',
    marketStatusLabel: 'Under Offer / In Escrow',
    escrowDate: 'Nov 2026',
    verificationStatus: 'VettedHomes Certified & LASRERA Verified',
    featured: true,
    listingDate: '2026-11-10',
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    videoWalkthroughUrl: 'https://www.youtube.com/watch?v=kR2g3121X7s',
    amenities: [
      'Private Direct High-Speed Lift',
      'Rooftop Cantilevered Pool',
      'Wrap-Around 360° Sky Terrace',
      'Poliform Italian Designer Kitchen',
      '24/7 Serviced Central Generator',
      'Commercial Grade Fitness Center',
      'Chauffeur\'s Lounge & 4 Parking Bays'
    ],
    agent: {
      name: 'Victoria Alabi',
      company: 'Apex Horizon Real Estate',
      role: 'Luxury Residential Director',
      phone: '+234 802 444 8831',
      email: 'victoria@apexhorizon.com',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      verified: true,
      listingsCount: 22,
      rating: 4.95
    },
    neighbourhoodSnapshot: {
      id: 'ikoyi',
      name: 'Old Ikoyi & Bourdillon',
      score: 9.4,
      safetyBadge: 'Diplomatic Zone Patrolled',
      powerEstimate: '20-22 hrs grid + 24/7 tower backup',
      waterReliability: 'Industrial Water Softening Plant'
    }
  },
  {
    id: 'prop-101',
    title: 'Contemporary 4-Bedroom Semi-Detached Duplex with BQ',
    description: 'Located in a secure gated close off Admiralty Way, Lekki Phase 1. This pristine duplex features high ceilings, stamp concrete compound with space for 4 vehicles, fitted chef-grade kitchen with marble countertops, all en-suite bedrooms, and dedicated automated security gates. Verified flood-free street with elevated concrete drainage culverts.',
    price: 9500000,
    pricePeriod: 'per annum',
    transactionType: 'rent',
    category: 'Duplexes',
    location: {
      address: 'Off Admiralty Way, Lekki Phase 1',
      neighbourhoodId: 'lekki-phase-1',
      neighbourhoodName: 'Lekki Phase 1',
      city: 'Lagos',
      state: 'Lagos State',
      coordinates: { lat: 6.4498, lng: 3.4862 },
      approximatePrecision: true
    },
    bedrooms: 4,
    bathrooms: 4,
    toilets: 5,
    sizeSqm: 380,
    furnishingStatus: 'Semi-Furnished',
    availabilityStatus: 'Available Immediately',
    marketStatus: 'available',
    marketStatusLabel: 'Verified Exclusive Allocation',
    verificationStatus: 'VettedHomes Certified & LASRERA Verified',
    featured: true,
    listingDate: '2026-11-08',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=80'
    ],
    videoWalkthroughUrl: 'https://www.youtube.com/watch?v=F_fK89t3bOU',
    amenities: [
      '24/7 Security Patrol',
      'Borehole & Water Treatment',
      'Prepaid Meter Installed',
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
      score: 8.5,
      safetyBadge: 'Low Crime Estate Close',
      powerEstimate: '18 hrs/day grid + backup',
      waterReliability: 'Industrial treatment verified'
    }
  },
  {
    id: 'prop-103',
    title: 'Diplomatic 5-Bedroom Fully Detached Mansion with Private Cinema',
    description: 'An architectural masterpiece situated in prestigious Maitama, Abuja. Boasts bulletproof entry doors, private 8-seater Dolby Atmos cinema, private swimming pool, smart home climate integration, lush landscaped courtyard, and two detached 2-bedroom staff quarters. Directly connected to the Lower Usuma clean municipal water network.',
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
    availabilityStatus: 'Recently Sold via VettedHomes',
    marketStatus: 'recently_sold',
    marketStatusLabel: 'Recently Sold via VettedHomes',
    closedDate: 'Closed Oct 2026',
    verificationStatus: 'VettedHomes Certified & LASRERA Verified',
    featured: true,
    listingDate: '2026-10-28',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80'
    ],
    videoWalkthroughUrl: 'https://www.youtube.com/watch?v=1F_s8f1uO70',
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
      score: 9.4,
      safetyBadge: 'Diplomatic Zone Patrolled',
      powerEstimate: '22+ hrs public grid',
      waterReliability: 'Municipal Dam Feed Direct'
    }
  },
  {
    id: 'prop-109',
    title: 'Oceanfront 3-Bedroom Executive Serviced Residence with Private Beach Club',
    description: 'Panoramic Atlantic Ocean and Five Cowrie Creek views in Victoria Island. High-floor corner residence featuring floor-to-ceiling soundproof glass, open-plan gourmet kitchen with Miele appliances, 24/7 central chiller climate control, Olympic pool, and direct access to Landmark Beach.',
    price: 16000000,
    pricePeriod: 'per annum',
    transactionType: 'rent',
    category: 'Apartments and flats',
    location: {
      address: 'Waterfront Boulevard, Victoria Island',
      neighbourhoodId: 'victoria-island',
      neighbourhoodName: 'Victoria Island & Oniru',
      city: 'Lagos',
      state: 'Lagos State',
      coordinates: { lat: 6.4255, lng: 3.4248 },
      approximatePrecision: true
    },
    bedrooms: 3,
    bathrooms: 3,
    toilets: 4,
    sizeSqm: 240,
    furnishingStatus: 'Fully Furnished',
    availabilityStatus: 'Available Immediately',
    marketStatus: 'available',
    marketStatusLabel: 'Verified Exclusive Allocation',
    verificationStatus: 'VettedHomes Certified & LASRERA Verified',
    featured: true,
    listingDate: '2026-11-09',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
    ],
    videoWalkthroughUrl: 'https://www.youtube.com/watch?v=d_U_o_K-z1g',
    amenities: [
      'Oceanfront Private Balcony',
      '24/7 Guaranteed Power Supply',
      'Beach Club Membership Pass',
      'Infinity Pool & Tennis Court',
      'Uniformed Concierge & Valet',
      'High-Speed Optical Internet'
    ],
    agent: {
      name: 'Victoria Alabi',
      company: 'Apex Horizon Real Estate',
      role: 'Principal Realtor',
      phone: '+234 802 444 8831',
      email: 'victoria@apexhorizon.com',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      verified: true,
      listingsCount: 22,
      rating: 4.95
    },
    neighbourhoodSnapshot: {
      id: 'victoria-island',
      name: 'Victoria Island & Oniru',
      score: 8.9,
      safetyBadge: 'High Executive Presence',
      powerEstimate: '24/7 Dual Serviced Generator',
      waterReliability: 'Industrial Reverse Osmosis'
    }
  },
  {
    id: 'prop-110',
    title: 'Smart Marina-Facing 2-Bedroom High-Rise Flat with Central Chilled Water AC',
    description: 'Located in the futuristic Alpha 1 Tower, Eko Atlantic City. Ultra-modern smart apartment featuring integrated iPad home control, Italian granite surfaces, central district cooling system (reducing electricity tariffs by 40%), floor-to-ceiling marina views, and subterranean utility supply.',
    price: 145000000,
    pricePeriod: 'outright purchase',
    transactionType: 'sale',
    category: 'Apartments and flats',
    location: {
      address: 'Central Boulevard, Eko Atlantic City',
      neighbourhoodId: 'eko-atlantic',
      neighbourhoodName: 'Eko Atlantic City',
      city: 'Lagos',
      state: 'Lagos State',
      coordinates: { lat: 6.4190, lng: 3.4145 },
      approximatePrecision: true
    },
    bedrooms: 2,
    bathrooms: 2,
    toilets: 3,
    sizeSqm: 165,
    furnishingStatus: 'Fully Furnished',
    availabilityStatus: 'Under Offer / In Escrow',
    marketStatus: 'under_escrow',
    marketStatusLabel: 'Under Offer / In Escrow',
    escrowDate: 'Nov 2026',
    verificationStatus: 'VettedHomes Certified & LASRERA Verified',
    featured: false,
    listingDate: '2026-11-06',
    images: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
    ],
    videoWalkthroughUrl: 'https://www.youtube.com/watch?v=F_fK89t3bOU',
    amenities: [
      'Autonomous Gas-Turbine Clean Power',
      'District Chilled Water Air-Conditioning',
      'Marina Boardwalk Access',
      'Underground Multi-Car Parking',
      '24/7 Smart City Security & CCTV',
      'High-Speed Subsea Fiber Optic'
    ],
    agent: {
      name: 'Adewale Bakare',
      company: 'PrimeStone Prestige Assets',
      role: 'Principal Broker',
      phone: '+234 803 555 0192',
      email: 'adewale@primestone.ng',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      verified: true,
      listingsCount: 28,
      rating: 5.0
    },
    neighbourhoodSnapshot: {
      id: 'eko-atlantic',
      name: 'Eko Atlantic City',
      score: 9.5,
      safetyBadge: 'Smart City Biometric Perimeter',
      powerEstimate: '24/7 Dedicated Gas Turbine',
      waterReliability: 'WHO Standard Potable Network'
    }
  },
  {
    id: 'prop-111',
    title: 'Presidential 6-Bedroom Hilltop Diplomatic Compound with Guard House',
    description: 'An elite fortress situated in high Asokoro, Abuja. Features perimeter anti-climb sensor fencing, dedicated diplomatic police guard post, 3-level split architectural design, Olympic heated swimming pool, 40kVA solar-hybrid battery backup, private banquet hall, and expansive 4-bedroom staff quarters.',
    price: 820000000,
    pricePeriod: 'outright purchase',
    transactionType: 'sale',
    category: 'Houses',
    location: {
      address: 'Asokoro Hills Enclave, Near ECOWAS',
      neighbourhoodId: 'asokoro',
      neighbourhoodName: 'Asokoro District',
      city: 'Abuja',
      state: 'FCT',
      coordinates: { lat: 9.0482, lng: 7.5289 },
      approximatePrecision: true
    },
    bedrooms: 6,
    bathrooms: 7,
    toilets: 8,
    sizeSqm: 1600,
    furnishingStatus: 'Semi-Furnished',
    availabilityStatus: 'Available for Sale',
    marketStatus: 'available',
    marketStatusLabel: 'Verified Exclusive Allocation',
    verificationStatus: 'VettedHomes Certified & LASRERA Verified',
    featured: false,
    listingDate: '2026-10-22',
    images: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    videoWalkthroughUrl: 'https://www.youtube.com/watch?v=1F_s8f1uO70',
    amenities: [
      'Diplomatic Security Gatehouse',
      '40kVA Hybrid Solar Inverter Plant',
      'Olympic Heated Swimming Pool',
      'Private Banquet Reception Hall',
      'Reinforced Panic Room & Bulletproof Glass',
      'Commanding Valley Views of Aso Rock'
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
      id: 'asokoro',
      name: 'Asokoro District',
      score: 9.5,
      safetyBadge: 'Maximum Protection Enclave',
      powerEstimate: '23+ hrs/day priority grid',
      waterReliability: 'High-Pressure Municipal Dam Supply'
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
      neighbourhoodName: 'Yaba (Tech & Academic Corridor)',
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
    marketStatus: 'available',
    marketStatusLabel: 'Verified Exclusive Allocation',
    verificationStatus: 'VettedHomes Certified & LASRERA Verified',
    featured: false,
    listingDate: '2026-11-04',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
    ],
    videoWalkthroughUrl: 'https://www.youtube.com/watch?v=kR2g3121X7s',
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
      name: 'Yaba (Tech & Academic Corridor)',
      score: 8.0,
      safetyBadge: 'High Activity Hub',
      powerEstimate: '24/7 Serviced Central Generator',
      waterReliability: 'Municipal + Clean Filtered Borehole'
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
    availabilityStatus: 'Recently Sold via VettedHomes',
    marketStatus: 'recently_sold',
    marketStatusLabel: 'Recently Sold via VettedHomes',
    closedDate: 'Closed Nov 2026',
    verificationStatus: 'VettedHomes Certified & LASRERA Verified',
    featured: false,
    listingDate: '2026-11-01',
    images: [
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80'
    ],
    videoWalkthroughUrl: 'https://www.youtube.com/watch?v=d_U_o_K-z1g',
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
    description: 'A stylish, high-yield short-let loft overlooking Five Cowrie Creek in Lekki Phase 1. Perfect for executive staycations and international business travelers. Equipped with 100Mbps uncapped fiber, smart lock self-check-in, chef-ready kitchen, and 24/7 continuous electricity.',
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
    availabilityStatus: 'Recently Leased via VettedHomes',
    marketStatus: 'recently_leased',
    marketStatusLabel: 'Recently Leased via VettedHomes',
    closedDate: 'Leased Nov 2026',
    verificationStatus: 'VettedHomes Certified & LASRERA Verified',
    featured: false,
    listingDate: '2026-11-05',
    images: [
      'https://images.unsplash.com/photo-1502005229762-ee15242ab839?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4b4f?auto=format&fit=crop&w=1200&q=80'
    ],
    videoWalkthroughUrl: 'https://www.youtube.com/watch?v=kR2g3121X7s',
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
      score: 8.5,
      safetyBadge: 'Low Crime Estate Close',
      powerEstimate: '24/7 Inverter + Auto-Generator',
      waterReliability: 'Industrial treatment verified'
    }
  },
  {
    id: 'prop-106',
    title: 'Spacious 3-Bedroom Family Flat with Large Balcony in Surulere',
    description: 'Well-ventilated and secured 3-bedroom upper-floor apartment in a serene gated street off Bode Thomas, Surulere. Features tiled flooring, borehole water supply, ample parking space for 2 cars, and quick access to Western Avenue and Island bridges.',
    price: 3200000,
    pricePeriod: 'per annum',
    transactionType: 'rent',
    category: 'Apartments and flats',
    location: {
      address: 'Off Bode Thomas Street',
      neighbourhoodId: 'surulere',
      neighbourhoodName: 'Surulere (Bode Thomas)',
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
    marketStatus: 'available',
    marketStatusLabel: 'Verified Exclusive Allocation',
    verificationStatus: 'VettedHomes Certified',
    featured: false,
    listingDate: '2026-11-03',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    videoWalkthroughUrl: 'https://www.youtube.com/watch?v=d_U_o_K-z1g',
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
      name: 'Surulere (Bode Thomas)',
      score: 7.8,
      safetyBadge: 'Gated Residential Street',
      powerEstimate: '15 hrs/day grid',
      waterReliability: 'Clean Borehole Supply'
    }
  }
];

export const DEMO_COMMUNITY_POSTS = [
  {
    id: 'post-501',
    neighbourhoodId: 'banana-island',
    neighbourhoodName: 'Banana Island (Ikoyi)',
    category: 'SECURITY',
    title: 'Banana Island Residents Association 2026 biometric gate pass system update',
    content: 'Good day residents and homeowners. The BIPORAL security desk has completed the transition to digital QR access passes for all contractor trucks, domestic staff, and delivery riders. Gate wait times at the main barrier have dropped to under 45 seconds during peak morning hours. Please ensure your visitors are sent temporary pass links via the resident portal before arrival to prevent delays.',
    author: {
      name: 'Dr. Folake Adeleke',
      badge: 'Verified Resident (7 yrs)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    createdAt: '18 mins ago',
    upvotes: 114,
    downvotes: 1,
    commentsCount: 22,
    tags: ['Security', 'Banana Island', 'Access Control', 'BIPORAL'],
    verifiedResident: true,
    pinned: true,
    comments: [
      {
        id: 'c-101',
        author: 'Chief Emeka O.',
        badge: 'Verified Resident',
        createdAt: '12 mins ago',
        content: 'Commendable effort by the executive committee. The digital scanning process is seamless and eliminates the long queue on the access bridge.',
        upvotes: 24
      },
      {
        id: 'c-102',
        author: 'Amina S.',
        badge: 'Resident Homeowner',
        createdAt: '5 mins ago',
        content: 'Can confirm! Had international guests arrive from the airport last night, gate verification took literally 30 seconds.',
        upvotes: 16
      }
    ]
  },
  {
    id: 'post-502',
    neighbourhoodId: 'lekki-phase-1',
    neighbourhoodName: 'Lekki Phase 1',
    category: 'INFRASTRUCTURE',
    title: 'Admiralty Way drainage desilting: 85% completed ahead of heavy seasonal rainfall',
    content: 'Just wanted to share an update from the Lekki Residents Association (LERA) infrastructure committee meeting. The primary storm culverts along Admiralty Way up to the Lekki Coliseum junction have been dredged and desilted. The compound ramps along Fola Osibo and Omorinre Johnson have been inspected. The water evacuation rate during yesterday\'s brief storm was over 75% faster than last year.',
    author: {
      name: 'Dapo O.',
      badge: 'Verified Resident (4 yrs)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    createdAt: '42 mins ago',
    upvotes: 76,
    downvotes: 2,
    commentsCount: 18,
    tags: ['Drainage', 'Rainy Season', 'Admiralty Way', 'Infrastructure'],
    verifiedResident: true,
    pinned: true,
    comments: [
      {
        id: 'c-1',
        author: 'Chioma E.',
        badge: 'Verified Resident',
        createdAt: '30 mins ago',
        content: 'Thanks for this Dapo! Can confirm they finished the trench outside Centro Mall today. Much cleaner water flow now.',
        upvotes: 14
      },
      {
        id: 'c-2',
        author: 'Femi A.',
        badge: 'Prospective Tenant',
        createdAt: '15 mins ago',
        content: 'Very helpful context. I am inspecting a duplex on Fola Osibo this Saturday and was worried about flood history.',
        upvotes: 8
      }
    ]
  },
  {
    id: 'post-503',
    neighbourhoodId: 'ikoyi',
    neighbourhoodName: 'Old Ikoyi & Bourdillon',
    category: 'PROPERTY AND LANDLORD EXPERIENCES',
    title: 'Managing service charges in Bourdillon high-rise towers: 2026 Audit Report',
    content: 'For residents and prospective tenants leasing in Old Ikoyi towers: our residents association recently conducted an independent energy and diesel audit. By installing 150kVA rooftop hybrid solar installations to power common-area elevators, hallway lighting, and water treatment pumps during the day, our monthly service charge dropped from ₦420,000/mo to ₦290,000/mo per apartment. Demand your facility managers explore hybrid solar before paying inflated diesel surcharges.',
    author: {
      name: 'Engr. Babatunde Sanusi',
      badge: 'Verified Property Owner (10 yrs)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    },
    createdAt: '1 hour ago',
    upvotes: 94,
    downvotes: 0,
    commentsCount: 29,
    tags: ['Service Charge', 'Solar Energy', 'Old Ikoyi', 'Facility Management'],
    verifiedResident: true,
    pinned: false,
    comments: [
      {
        id: 'c-3',
        author: 'Kemi Martins',
        badge: 'Verified Resident',
        createdAt: '45 mins ago',
        content: 'This is brilliant. We are proposing the exact same solar hybrid conversion at our block on Alexander Avenue next month.',
        upvotes: 19
      }
    ]
  },
  {
    id: 'post-504',
    neighbourhoodId: 'maitama',
    neighbourhoodName: 'Maitama District',
    category: 'LIVING CONDITIONS',
    title: 'Maitama power grid stability update after Katampe 330kV transmission line upgrade',
    content: 'AEDC has officially energized the reinforced transmission line feeding the Maitama Diplomatic Zone and Gana Street. Over the last 45 days, our monitored grid availability has averaged 22.8 hours per day. Generator runtime has dropped significantly across our estate. For anyone moving from Lagos, the public grid in Maitama is remarkably consistent.',
    author: {
      name: 'Barrister Farouk S.',
      badge: 'Verified Resident (8 yrs)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    createdAt: '2 hours ago',
    upvotes: 68,
    downvotes: 1,
    commentsCount: 12,
    tags: ['Electricity', 'Maitama', 'Abuja Living', 'AEDC'],
    verifiedResident: true,
    pinned: false,
    comments: []
  },
  {
    id: 'post-505',
    neighbourhoodId: 'yaba',
    neighbourhoodName: 'Yaba (Tech & Academic Corridor)',
    category: 'INFRASTRUCTURE',
    title: 'FiberOne vs IPNX optical latency in Sabo/Akoka for remote engineering teams',
    content: 'Running a remote engineering squad from our apartment off Commercial Avenue. Over the past 6 months, we experienced 99.6% uptime with FiberOne (50Mbps plan at ₦24,500/mo). Ping to AWS London and Cloudflare edges has stayed under 85ms. Sabo GRA gives you Island-grade tech infrastructure at a fraction of Victoria Island rental rates.',
    author: {
      name: 'Tunde Adeleke',
      badge: 'Verified Tech Resident',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    createdAt: '4 hours ago',
    upvotes: 88,
    downvotes: 0,
    commentsCount: 16,
    tags: ['Internet', 'Tech Workers', 'Remote Work', 'Yaba'],
    verifiedResident: true,
    pinned: false,
    comments: []
  },
  {
    id: 'post-506',
    neighbourhoodId: 'asokoro',
    neighbourhoodName: 'Asokoro District',
    category: 'SECURITY',
    title: 'Night movement protocols along Yakubu Gowon Crescent & ECOWAS axis',
    content: 'Diplomatic security patrols have stepped up routine vehicle checks past midnight around the State House and ECOWAS axis. Residents with private security escorts or late guests should ensure drivers carry proper vehicle identity cards. The area remains one of the safest enclaves in the entire country.',
    author: {
      name: 'Hajia Halima B.',
      badge: 'Verified Resident (5 yrs)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    createdAt: '6 hours ago',
    upvotes: 52,
    downvotes: 0,
    commentsCount: 7,
    tags: ['Security', 'Asokoro', 'Diplomatic Enclave', 'Night Vigilance'],
    verifiedResident: true,
    pinned: false,
    comments: []
  }
];

export const DEMO_PROPERTY_REVIEWS = [
  {
    id: 'prev-1',
    propertyId: 'prop-107',
    author: 'Chief Kunle Adeleke',
    userRole: 'Verified Buyer / Resident',
    rating: 5.0,
    ratings: {
      condition: 5,
      accuracy: 5,
      maintenance: 5,
      valueForMoney: 5
    },
    date: '4 days ago',
    comment: 'Acquired through VettedHomes with zero hassle. The land title and Governor\'s Consent were independently verified through the platform before closing. The private yacht jetty and 24/7 dedicated underground power are as advertised. Exemplary standard of service.',
    verified: true
  },
  {
    id: 'prev-2',
    propertyId: 'prop-101',
    author: 'Gbenga Alao',
    userRole: 'Verified Tenant',
    rating: 4.8,
    ratings: {
      condition: 5,
      accuracy: 5,
      maintenance: 4.5,
      valueForMoney: 4.5
    },
    date: '2 weeks ago',
    comment: 'Lived here for 18 months before relocation. Landlord is responsive within 24 hours for any plumbing upkeep. The elevated concrete compound drains immediately even during heavy rainfall. Highly recommended.',
    verified: true
  },
  {
    id: 'prev-3',
    propertyId: 'prop-103',
    author: 'Dr. Mukhtar Bello',
    userRole: 'Verified Resident',
    rating: 4.9,
    ratings: {
      condition: 5,
      accuracy: 5,
      maintenance: 5,
      valueForMoney: 4.8
    },
    date: '3 weeks ago',
    comment: 'The private cinema and swimming pool are in pristine condition. The municipal water pressure in Maitama Hills is stellar. Transaction was documented with strict legal integrity.',
    verified: true
  }
];

export const DEMO_USER = {
  id: 'usr-vip-001',
  name: 'Babatunde Adeleke',
  email: 'babatunde@vettedhomes.ng',
  phone: '+234 803 123 4567',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  roles: ['buyer_tenant', 'landlord_owner'],
  activeRole: 'buyer_tenant',
  savedProperties: ['prop-107', 'prop-108', 'prop-101', 'prop-103'],
  followedNeighbourhoods: ['banana-island', 'ikoyi', 'lekki-phase-1', 'maitama'],
  enquiries: [
    {
      id: 'enq-1',
      propertyId: 'prop-107',
      propertyTitle: 'Sovereign 6-Bedroom Ultra-Luxury Waterfront Villa with Private Jetty',
      agentName: 'Adewale Bakare',
      status: 'Inspection Confirmed',
      inspectionDate: 'Saturday at 11:30 AM',
      lastMessage: 'Security gate code INS-892401 issued. Security desk notified for arrival.'
    },
    {
      id: 'enq-2',
      propertyId: 'prop-108',
      propertyTitle: 'Bourdillon Sky Villa: 4-Bedroom Triplex Penthouse with Private Pool',
      agentName: 'Victoria Alabi',
      status: 'Reviewing Terms',
      inspectionDate: 'Pending Schedule',
      lastMessage: 'Service charge schedule and facility audit forwarded to your email.'
    }
  ],
  myListings: [
    {
      id: 'my-prop-1',
      title: 'Modern 3-Bedroom Terrace Duplex in Oniru Victoria Island Extension',
      price: '₦8,500,000 / yr',
      status: 'Active Listing',
      views: 524,
      enquiriesCount: 14,
      inspectionsCount: 6
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
