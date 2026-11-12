# EstateLens — Full-Stack Real Estate & Neighbourhood Intelligence Platform

> **Find Your Next Home. Know Your Next Neighbourhood.**
> Discover properties, explore neighbourhoods, and hear real resident experiences before making your next property decision.

---

## 🌟 Overview & Signature Differentiator

EstateLens is not a generic property listing website. It couples high-trust property discovery (rent, sale, short-let) with a location-based **Neighbourhood Community** and **Livability Intelligence System**.

Prospective tenants and buyers can evaluate critical infrastructure realities—such as public grid electricity uptime, borehole water salinity, drainage flood risks, gated street security protocols, and internet broadband coverage—directly from vetted resident consensus before scheduling physical tours.

---

## 🛠 Technology Stack (Phase 1)

- **Frontend Core**: React.js (v18.3) with Vite (v5.4)
- **Styling & Design System**: Tailwind CSS (custom deep navy, emerald green, and warm sand palette)
- **Routing**: React Router DOM (v6.28)
- **Icons**: Lucide React
- **Analytics & Data Visualizations**: Recharts
- **Interactive Geospatial Mapping**: Leaflet & React-Leaflet with OpenStreetMap
- **State & Data Store**: React Context API (`AuthContext`, `SavedPropertiesContext`), modular demo datasets (`src/data/demoData.js`)
- **Ready for Phase 2 Backend**: `@supabase/supabase-js` installed & configured via `.env.example`

---

## 🚀 How to Run the Application

1. **Install Dependencies** (already installed in workspace):
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

## 📁 Project Architecture & Folder Structure

```
estate/
├── index.html                           # Entry HTML with Google Fonts & Leaflet styles
├── package.json                         # Dependencies & scripts
├── vite.config.js                       # Vite build configuration (port 3000)
├── tailwind.config.js                   # Custom design system (navy, emerald, sand, shadows)
├── postcss.config.js                    # PostCSS plugins
├── .env.example                         # Supabase configuration template for Phase 2
├── src/
│   ├── main.jsx                         # Application root mount
│   ├── App.jsx                          # Route registry & global layout providers
│   ├── index.css                        # Tailwind directives & custom scrollbars
│   ├── context/
│   │   ├── AuthContext.jsx              # Multi-role authentication & user session state
│   │   └── SavedPropertiesContext.jsx   # Saved properties tracker (localStorage synced)
│   ├── data/
│   │   └── demoData.js                  # Realistic Nigerian real estate & neighbourhood data
│   ├── utils/
│   │   └── formatters.js                # Currency (₦ Naira), dates, and privacy helpers
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx               # Navigation bar, role switcher & mobile drawer
│   │   │   ├── Footer.jsx               # Trust badges, links & anti-defamation notice
│   │   │   ├── Badge.jsx                # Reusable status badges (verified, rent, sale)
│   │   │   └── Modal.jsx                # Accessible modal dialog with backdrop blur
│   │   ├── property/
│   │   │   ├── PropertyCard.jsx         # Card with price, verification & livability score
│   │   │   ├── PropertyFilters.jsx      # Filter toolbar (types, beds, price, amenities)
│   │   │   ├── PropertyMapView.jsx      # Interactive Leaflet map with privacy boundaries
│   │   │   ├── InspectionModal.jsx      # Physical inspection request appointment form
│   │   │   └── EnquiryModal.jsx         # Direct agent messaging modal
│   │   ├── neighbourhood/
│   │   │   ├── NeighbourhoodCard.jsx    # Card with livability score, stats & price averages
│   │   │   └── NeighbourhoodMetricsBar.jsx # Visual diagnostic bars for power, water, drainage
│   │   └── community/
│   │       ├── PostCard.jsx             # Post card with upvotes, comments & report button
│   │       ├── CreatePostModal.jsx      # Post creation form with anti-doxxing validation
│   │       └── ReportModal.jsx          # Community moderation reporting dialog
│   └── pages/
│       ├── HomePage.jsx                 # Landing page with hero search & feature previews
│       ├── PropertiesPage.jsx           # Grid, List, and Split Map property discovery
│       ├── PropertyDetailPage.jsx       # Photo gallery, specs, intel, and booking
│       ├── NeighbourhoodsPage.jsx       # Directory of Nigerian urban communities
│       ├── NeighbourhoodDetailPage.jsx  # Detailed diagnostic metrics, homes & discussions
│       ├── CommunityFeedPage.jsx        # Signature community discussion feed & filters
│       ├── AuthPage.jsx                 # Multi-role registration, login, and forgot password
│       ├── BuyerDashboardPage.jsx       # Saved homes, appointments, and followed areas
│       ├── LandlordAgentDashboardPage.jsx # Portfolio management & Recharts analytics
│       └── AdminModerationPage.jsx      # Moderation console for community safety & reports
```

---

## 🔒 Privacy & Community Safety Architecture

- **Approximate Public Markers**: Pinpoint house gates are obscured with approximate neighbourhood boundary circles on maps to prevent targeting occupants.
- **Gate Code Dispatch Protocol**: Street-level access codes are issued only upon confirmed inspection bookings with verified agents.
- **Zero Advance Inspection Fees Policy**: Strict platform policy against fees before physical visits.
- **Anti-Defamation & Anti-Doxxing Controls**: Client-side validation blocks publishing phone numbers or exact private residential addresses.

---

## 🔜 Next Steps: Phase 2 (Authentication & Database)
- Configure Supabase project with environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
- Execute SQL migrations for `profiles`, `user_roles`, `properties`, `property_images`, `neighbourhoods`, `community_posts`, `community_comments`, and `inspections`.
- Enable Supabase Row Level Security (RLS) policies.
- Wire Supabase Auth for real email/password sign-in and email confirmation.

