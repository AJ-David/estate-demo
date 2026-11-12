# EstateLens — Full-Stack Real Estate & Neighbourhood Intelligence Platform

> **Find Your Next Home. Know Your Next Neighbourhood.**
> Discover properties, explore neighbourhoods, and hear real resident experiences before making your next property decision.

---

## 🌟 Overview & Signature Differentiator

EstateLens is not a generic property listing website. It couples high-trust property discovery (rent, sale, short-let) with a location-based **Neighbourhood Community** and **Livability Intelligence System**.

Prospective tenants and buyers can evaluate critical infrastructure realities—such as public grid electricity uptime, borehole water salinity, drainage flood risks, gated street security protocols, and internet broadband coverage—directly from vetted resident consensus before scheduling physical tours.

---

## 🛠 Technology Stack

- **Frontend Core**: React.js (v18.3) with Vite (v5.4) & Rollup code-splitting chunks
- **Backend & Database**: Supabase PostgreSQL, GoTrue Auth, Row Level Security (RLS)
- **Styling & Design System**: Tailwind CSS (custom deep navy, emerald green, and warm sand palette)
- **Routing**: React Router DOM (v6.28) with `ProtectedRoute` guards
- **Icons**: Lucide React
- **Analytics & Data Visualizations**: Recharts
- **Interactive Geospatial Mapping**: Leaflet & React-Leaflet with OpenStreetMap
- **State & Data Store**: React Context API (`AuthContext`, `SavedPropertiesContext`), modular demo datasets (`src/data/demoData.js`)

---

## 🚀 How to Run the Application

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## 🗄️ Database Architecture & Supabase Setup (Phase 2)

EstateLens includes production-grade PostgreSQL migration scripts in `supabase/`:
- **`supabase/schema.sql`**: Full schema definition with UUIDs, foreign keys, triggers, and comprehensive Row Level Security (RLS) policies.
- **`supabase/seed.sql`**: Seed data populating Nigerian urban neighbourhoods (Lekki Phase 1, Yaba, Ikeja GRA, Maitama Abuja, Surulere) with livability scores, diagnostic infrastructure metrics, and facilities.

### Setting Up Your Supabase Project:
1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in the Supabase dashboard.
3. Paste and run the contents of `supabase/schema.sql` followed by `supabase/seed.sql`.
4. Copy your **Project URL** and **Anon Public Key** from *Project Settings > API*.
5. Add them to your `.env` file:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
6. When configured, EstateLens automatically connects to your live Supabase cloud database. If not configured, it gracefully defaults to local browser storage mode.

---

## 📁 Project Architecture & Folder Structure

```
estate/
├── index.html                               # Entry HTML with Google Fonts & Leaflet styles
├── package.json                             # Dependencies & scripts
├── vite.config.js                           # Vite build configuration with chunk code-splitting
├── tailwind.config.js                       # Custom design system (navy, emerald, sand, shadows)
├── postcss.config.js                        # PostCSS plugins
├── .env.example                             # Supabase configuration template
├── README.md                                # Platform documentation and run guide
├── supabase/
│   ├── schema.sql                           # Production PostgreSQL schema, tables, triggers & RLS
│   └── seed.sql                             # Initial Nigerian neighbourhoods seed data
├── src/
│   ├── main.jsx                             # Application root mount
│   ├── App.jsx                              # Route registry, layout container & ProtectedRoute
│   ├── index.css                            # Tailwind directives & custom scrollbars
│   ├── lib/
│   │   └── supabase.js                      # Supabase client singleton & configuration check
│   ├── context/
│   │   ├── AuthContext.jsx                  # Multi-role authentication & user session state
│   │   └── SavedPropertiesContext.jsx       # Saved properties tracker (localStorage synced)
│   ├── data/
│   │   └── demoData.js                      # Realistic Nigerian real estate & neighbourhood data
│   ├── utils/
│   │   └── formatters.js                    # Currency (₦ Naira), dates, and privacy helpers
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.jsx           # Route guard enforcing authentication and roles
│   │   ├── common/
│   │   │   ├── Navbar.jsx                   # Navigation bar with role switcher & DB status pill
│   │   │   ├── Footer.jsx                   # Trust badges, links & anti-defamation notice
│   │   │   ├── Badge.jsx                    # Reusable status badges (verified, rent, sale)
│   │   │   ├── Modal.jsx                    # Accessible modal dialog with backdrop blur
│   │   │   └── DatabaseStatusModal.jsx      # Live Supabase vs Local Sandbox status modal
│   │   ├── property/
│   │   │   ├── PropertyCard.jsx             # Card with price, verification & livability score
│   │   │   ├── PropertyFilters.jsx          # Filter toolbar (types, beds, price, amenities)
│   │   │   ├── PropertyMapView.jsx          # Interactive Leaflet map with privacy boundaries
│   │   │   ├── InspectionModal.jsx          # Physical inspection request appointment form
│   │   │   └── EnquiryModal.jsx             # Direct agent messaging modal
│   │   ├── neighbourhood/
│   │   │   ├── NeighbourhoodCard.jsx        # Card with livability score, stats & price averages
│   │   │   └── NeighbourhoodMetricsBar.jsx  # Visual diagnostic bars for power, water, drainage
│   │   └── community/
│   │       ├── PostCard.jsx                 # Post card with upvotes, comments & report button
│   │       ├── CreatePostModal.jsx          # Post creation form with anti-doxxing validation
│   │       └── ReportModal.jsx              # Community moderation reporting dialog
│   └── pages/
│       ├── HomePage.jsx                     # Landing page with hero search & feature previews
│       ├── PropertiesPage.jsx               # Grid, List, and Split Map property discovery
│       ├── PropertyDetailPage.jsx           # Photo gallery, specs, intel, and booking
│       ├── NeighbourhoodsPage.jsx           # Directory of Nigerian urban communities
│       ├── NeighbourhoodDetailPage.jsx      # Detailed diagnostic metrics, homes & discussions
│       ├── CommunityFeedPage.jsx            # Signature community discussion feed & filters
│       ├── AuthPage.jsx                     # Multi-role registration, login, and forgot password
│       ├── ProfilePage.jsx                  # Profile management & multi-role configuration
│       ├── BuyerDashboardPage.jsx           # Saved homes, appointments, and followed areas
│       ├── LandlordAgentDashboardPage.jsx   # Portfolio management & Recharts analytics
│       └── AdminModerationPage.jsx          # Moderation console for community safety & reports
```

---

## 🔒 Security & Row Level Security (RLS) Guarantees

1. **User Identity Isolation**: `profiles` can only be updated by `auth.uid() = id`.
2. **Multi-Role Capability**: Users can hold multiple roles (`buyer_tenant`, `landlord_owner`, `agent`, `admin`) without separate accounts.
3. **Property Ownership Rules**: Listings can only be modified or deleted by the landlord or agent who created them (`auth.uid() = landlord_or_agent_id`).
4. **Approximate Public Markers**: Pinpoint house gates are obscured with approximate neighbourhood boundary circles on maps to prevent targeting occupants.
5. **Anti-Defamation & Anti-Doxxing Controls**: Client-side validation blocks publishing phone numbers or exact private residential addresses.

---

## 🔜 Next Steps: Phase 3 (Property Marketplace)
- Real-time property creation, editing, and draft management directly against Supabase.
- Supabase Storage bucket integration for multi-image uploads.
- Real-time search, filtering, and sorting queries against PostgreSQL tables.
- Saved properties synchronization with `public.saved_properties`.
- Direct enquiry messaging persistence with `public.enquiries`.
