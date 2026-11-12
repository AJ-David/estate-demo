-- ==============================================================================
-- ESTATELENS SEED DATA (INITIAL NIGERIAN NEIGHBOURHOODS & PROFILES)
-- ==============================================================================

-- 1. SEED NEIGHBOURHOODS
INSERT INTO public.neighbourhoods (
    id, name, city, state, country, latitude, longitude, description, hero_image_url, 
    livability_score, active_listings_count, verified_residents_count, avg_rent_3bed, avg_sale_4bed,
    metrics, nearby_facilities
) VALUES 
(
    'lekki-phase-1',
    'Lekki Phase 1',
    'Lagos',
    'Lagos State',
    'Nigeria',
    6.4474,
    3.4849,
    'An upscale, cosmopolitan coastal peninsula neighbourhood renowned for its vibrant commercial strips along Admiralty Way, modern gated residential estates, high-end culinary spots, and active tech/lifestyle community.',
    'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    8.4,
    84,
    342,
    '₦7,500,000 / yr',
    '₦220,000,000',
    '{
        "security": {"score": 8.6, "rating": "High", "summary": "Gated streets with private vigilante/estate security patrols. Moderate Admiralty Way traffic incidents reported at night."},
        "electricity": {"score": 7.2, "rating": "Moderate-High", "summary": "16–20 hrs public grid daily on average. Most estates require independent or centralised diesel/inverter backup."},
        "water": {"score": 6.8, "rating": "Moderate", "summary": "Borehole with industrial water treatment plants standard across residential compounds due to saline aquifer."},
        "roadsDrainage": {"score": 6.5, "rating": "Mixed", "summary": "Paved interlocking roads inside estates. Known flash pooling along lower Admiralty during torrential July rainy seasons."},
        "internet": {"score": 9.1, "rating": "Excellent", "summary": "High-density fiber coverage (MainOne, ipNX, FiberOne, Starlink)."},
        "noiseVibe": {"score": 7.0, "rating": "Moderate", "summary": "Quiet on residential off-streets; high nightlife ambient sound near commercial lounges."}
    }'::jsonb,
    '[
        {"type": "Healthcare", "name": "Evercare Hospital Lekki", "distance": "1.2 km"},
        {"type": "Education", "name": "Meadow Hall School", "distance": "2.5 km"},
        {"type": "Shopping", "name": "Ebeano Supermarket & Centro Mall", "distance": "0.8 km"},
        {"type": "Recreation", "name": "Lekki Coliseum & Filmhouse Cinema", "distance": "1.5 km"},
        {"type": "Transit", "name": "Lekki-Ikoyi Link Bridge Toll Gate", "distance": "1.8 km"}
    ]'::jsonb
),
(
    'yaba',
    'Yaba (Tech & Academic Corridor)',
    'Lagos',
    'Lagos State',
    'Nigeria',
    6.5095,
    3.3711,
    'The historic heart of Lagos innovation and academia—home to UNILAG, YabaTech, tech incubators, energetic coffee hubs, and accessible mainland transport links to both Island and Ikeja.',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    7.9,
    52,
    420,
    '₦3,800,000 / yr',
    '₦110,000,000',
    '{
        "security": {"score": 7.5, "rating": "Good", "summary": "Busy student & tech worker daytime traffic. Well-lit along Commercial Ave and Herbert Macaulay Way; cautious vigilance in back alleys."},
        "electricity": {"score": 7.8, "rating": "Good", "summary": "Dedicated feeder line gives Alagomeji and Akoka areas 18+ hrs regular grid supply."},
        "water": {"score": 7.9, "rating": "Good", "summary": "Lagos State Water Corporation connection combined with clean non-saline groundwater boreholes."},
        "roadsDrainage": {"score": 7.2, "rating": "Fair", "summary": "Commercial roads well maintained. Occasional road-widening work around Tejuosho and Jibowu intersections."},
        "internet": {"score": 9.4, "rating": "Exceptional", "summary": "Primary fiber trunk routes, co-working hubs (CcHUB), multiple Gigabit ISP options."},
        "noiseVibe": {"score": 6.8, "rating": "Vibrant & Bustling", "summary": "High pedestrian and commercial rhythm by day; student nightlife and relaxed residential estates like Sabo GRA."}
    }'::jsonb,
    '[
        {"type": "Education", "name": "University of Lagos (UNILAG)", "distance": "1.4 km"},
        {"type": "Healthcare", "name": "Military Hospital Yaba", "distance": "0.9 km"},
        {"type": "Shopping", "name": "Tejuosho Ultra-Modern Shopping Centre", "distance": "1.1 km"},
        {"type": "Transit", "name": "Jibowu Bus Terminal & Metro Red Line Yaba Station", "distance": "1.0 km"}
    ]'::jsonb
),
(
    'ikeja-gra',
    'Ikeja GRA',
    'Lagos',
    'Lagos State',
    'Nigeria',
    6.5922,
    3.3553,
    'A serene, leafy government reservation area with wide tree-lined boulevards, colonial heritage charm, luxury boutique hotels, and close proximity to the Murtala Muhammed International Airport.',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    8.8,
    41,
    195,
    '₦8,500,000 / yr',
    '₦260,000,000',
    '{
        "security": {"score": 9.2, "rating": "Excellent", "summary": "High diplomatic and senior executive presence. Police divisional checkpoints and strict private gate monitoring."},
        "electricity": {"score": 8.5, "rating": "Very Good", "summary": "Priority industrial and administrative grid lines. Frequent 20–22 hr uptime."},
        "water": {"score": 8.4, "rating": "Good", "summary": "Reliable freshwater table; standard domestic filtration systems work seamlessly."},
        "roadsDrainage": {"score": 8.9, "rating": "Excellent", "summary": "Wide paved dual-carriage roads with underground drainage canals; practically flood-free."},
        "internet": {"score": 8.8, "rating": "Very Good", "summary": "Extensive fiber broadband from multiple corporate tier-1 carriers."},
        "noiseVibe": {"score": 8.9, "rating": "Quiet & Prestigious", "summary": "Zoned residential peace with bird sounds and tree canopy."}
    }'::jsonb,
    '[
        {"type": "Transit", "name": "Murtala Muhammed International Airport (LOS)", "distance": "4.2 km"},
        {"type": "Healthcare", "name": "LASUTH", "distance": "2.1 km"},
        {"type": "Recreation", "name": "Ikeja Golf Club", "distance": "1.5 km"},
        {"type": "Shopping", "name": "Ikeja City Mall (ICM)", "distance": "3.8 km"}
    ]'::jsonb
),
(
    'maitama',
    'Maitama District',
    'Abuja',
    'Federal Capital Territory',
    'Nigeria',
    9.0882,
    7.4934,
    'The diplomatic and political pinnacle of Abuja, characterised by grand mansions, diplomatic embassies, wide immaculate parkways, and stunning vistas of the Aso Rock foothills.',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    9.2,
    38,
    160,
    '₦12,000,000 / yr',
    '₦450,000,000',
    '{
        "security": {"score": 9.5, "rating": "Top Tier", "summary": "Embassy belt security patrols, active CCTV street coverage, minimal property crime."},
        "electricity": {"score": 9.0, "rating": "Superb", "summary": "Fed directly from central FCT transmission lines; 22+ hours consistent grid availability."},
        "water": {"score": 9.1, "rating": "Clean & Municipal", "summary": "Connected directly to Lower Usuma Dam municipal clean water network."},
        "roadsDrainage": {"score": 9.6, "rating": "World Class", "summary": "Flawless multi-lane asphalt, landscaped medians, and deep concealed storm drains."},
        "internet": {"score": 8.9, "rating": "High Speed", "summary": "Comprehensive 5G coverage and business-grade underground optical fiber."},
        "noiseVibe": {"score": 9.3, "rating": "Serene & Low Density", "summary": "Diplomatic tranquillity, zero street touts, strictly enforced zoning."}
    }'::jsonb,
    '[
        {"type": "Hospital", "name": "Maitama District Hospital", "distance": "1.1 km"},
        {"type": "Parks", "name": "Millennium Park", "distance": "2.8 km"},
        {"type": "Diplomacy", "name": "British High Commission & US Embassy", "distance": "2.0 km"}
    ]'::jsonb
),
(
    'surulere',
    'Surulere (Bode Thomas / Adeniran Ogunsanya)',
    'Lagos',
    'Lagos State',
    'Nigeria',
    6.4969,
    3.3551,
    'A vibrant, culturally rich central Lagos mainland neighbourhood popular among young families, professionals, and creatives, featuring strong community bonds and active shopping avenues.',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
    7.7,
    47,
    380,
    '₦3,200,000 / yr',
    '₦95,000,000',
    '{
        "security": {"score": 7.4, "rating": "Good", "summary": "Neighbourhood vigilante gates locked by 11:00 PM across residential closes."},
        "electricity": {"score": 7.3, "rating": "Moderate", "summary": "14–18 hours daily on average; solar inverter solutions widespread."},
        "water": {"score": 7.8, "rating": "Good", "summary": "Clean freshwater boreholes; minimal treatment required."},
        "roadsDrainage": {"score": 6.9, "rating": "Fair", "summary": "Main arteries smooth; secondary roads vary by local council maintenance."},
        "internet": {"score": 8.5, "rating": "Good", "summary": "FiberOne and Spectranet coverage widespread."},
        "noiseVibe": {"score": 7.1, "rating": "Lively Community", "summary": "Warm communal atmosphere with weekend football viewings and local bistros."}
    }'::jsonb,
    '[
        {"type": "Sports", "name": "National Stadium & Teslim Balogun Stadium", "distance": "1.3 km"},
        {"type": "Shopping", "name": "Adeniran Ogunsanya Mall (Leisure Mall)", "distance": "0.9 km"},
        {"type": "Healthcare", "name": "Randle General Hospital", "distance": "1.6 km"}
    ]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    livability_score = EXCLUDED.livability_score,
    metrics = EXCLUDED.metrics,
    nearby_facilities = EXCLUDED.nearby_facilities;

