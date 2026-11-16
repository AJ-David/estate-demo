# VettedHomes — Full-Stack Real Estate & Neighbourhood Intelligence Platform

> **Verified Properties. Real Neighbourhood Truth.**  
> A premium, full-stack real estate discovery and location intelligence platform combining property transactions (rent, sale, short-let), interactive geospatial mapping, two-way agent communication, and location-based community forums where residents share ground-truth living experiences.

---

## 🌟 Executive Overview & Signature Differentiator

Most real estate platforms show pictures of an apartment but conceal the realities of living in that location. **VettedHomes** solves this asymmetric information problem.

VettedHomes bridges property discovery with a dedicated **Neighbourhood Intelligence** and **Community Discussion System**. Prospective tenants and buyers can evaluate critical infrastructure realities—such as public grid electricity uptime, borehole water salinity, drainage flood risks, gated street security protocols, and internet broadband coverage—directly from vetted resident consensus before scheduling physical tours.

Initial focus is on Nigerian urban centres (Lagos, Abuja) with architecture designed for global scalability.

---

## 🛠 Technology Stack

- **Frontend Core**: React 18.3, Vite 5.4 with Rollup manual chunk code-splitting
- **Styling & Design System**: Tailwind CSS (Executive Navy `#0E1A2B`, Emerald Green `#059669`, Warm Sand `#F8F7F4`)
- **Routing**: React Router DOM v6.28 with declarative `ProtectedRoute` guards
- **Backend & Database**: Supabase PostgreSQL 15, GoTrue Auth, Row Level Security (RLS)
- **Object Storage**: Supabase Storage (`property-images` bucket) with responsive data-URI fallback
- **Interactive Geospatial Mapping**: Leaflet v1.9, React-Leaflet v4, OpenStreetMap tiles
- **Analytics & Data Visualizations**: Recharts v2.13 (weekly views, inquiries, conversion funnel)
- **Icons**: Lucide React
- **Hosting & Deployment**: Vercel (configured with `vercel.json` SPA rewrites) & GitHub

---

## 🚀 Key Platform Features & Architecture

### 1. Multi-Role Authentication & User System (Section 3)
- **Multi-Role Accounts**: Users can hold multiple roles simultaneously under a single account (e.g., a landlord can also search for homes as a tenant) and switch views instantaneously via the UI role toggle.
- **Supported Roles**:
  - `Buyer / Tenant`: Saved wishlist, physical tour bookings, live chat with agents, neighbourhood following.
  - `Landlord / Property Owner`: Property listing creation, media uploads, tour scheduling, performance metrics.
  - `Real Estate Agent`: Portfolio management, client inquiry tracking, verification badges.
  - `Moderator / Admin`: Trust & safety console, reviewing community reports and flag queues.
- **Session Sync**: Integrated with Supabase Auth (`public.profiles`) with graceful offline fallback.

### 2. Comprehensive Property Marketplace (Section 4)
- **Transaction Types**: Rent, Sale, and Short-Let.
- **Property Typologies**: Duplexes, Apartments & Flats, Detached Houses, Bungalows, Self-Contained units, Land/Plots, and Commercial Properties.
- **Listing Details**: High-resolution gallery, price breakdown (annual rent, caution deposit, service charge), bedrooms/bathrooms/toilets, property size ($m^2$), furnishing status, video walkthrough support, and verified agent credentials.
- **Rich Search & Filtering**: Instant search by district, price range slider, bedroom counts, transaction type, and amenities (solar inverter, 24/7 security, swimming pool, treated water).

### 3. Interactive Location Map (Section 5)
- **Geospatial Discovery**: Leaflet-powered map displaying custom price-pill markers.
- **District Focus Switcher**: 1-click camera flyTo navigation for key enclaves (Lekki Phase 1, Yaba Tech Corridor, Ikeja GRA, Maitama Abuja, Surulere).
- **Nearby Facilities Overlay**: Dynamic toggle layers for Healthcare (🏥), Education (🏫), Malls & Markets (🛒), Transit Hubs (🚌), and Financial Institutions (🏦).
- **Occupant Privacy Protection**: Strict policy against pinpointing residential street gates publicly. Uses an approximate 260m privacy perimeter circle; exact coordinates are released only through approved inspection passes.

### 4. Neighbourhood Community Discussions (Section 6 — Signature Feature)
- **Location-Bound Forums**: Dedicated community hubs for every district (Lekki, Yaba, Ikeja, Maitama, Surulere).
- **Categorized Feeds**:
  - 🛡️ **Security**: Guard patrols, gate protocols, lighting, incident reports.
  - ⚡ **Infrastructure**: Grid electricity uptime, transformer health, treated water supply, broadband fiber.
  - 🌊 **Living Conditions**: Drainage flood safety, road motorability, noise levels, estate cleanliness.
  - 🤝 **Property & Landlord Experiences**: Service charge transparency, maintenance responsiveness.
  - 💬 **General Discussions**: Move-in recommendations, local commerce, community announcements.
- **Threaded Interactions**: Commenting, upvoting/downvoting (`public.community_votes`), and district following.
- **Trust & Anti-Doxxing Safeguards**:
  - Automated regex checks blocking personal telephone numbers (`+234...`) and private street addresses (`House X, Flat Y`).
  - Strict anti-defamation policy requiring objective, evidence-based descriptions.
  - Mandatory disclaimer labeling unverified community reports.
  - Integrated report modal with direct escalation to Admin Moderation.

### 5. Ground-Truth Neighbourhood Intelligence (Section 7)
- **Verified Feedback Summary**: Synthesized from actual resident reports with explicit timestamps, contributor counts, and uncertainty disclosures.
- **Diagnostic Livability Metrics**: Concrete metrics across Electricity (average hours/day), Water Supply quality, Security rating, and Road/Drainage conditions.
- **Market Benchmarks**: Average rental rates, active inventory counts, and primary property typologies per district.

### 6. Property Inspection & Two-Way Communication (Section 8)
- **Physical Tour Booking**: Prospective tenants select preferred inspection dates and time slots.
- **Security Gate Passes**: Approved tours automatically generate a unique, cryptographically-formatted **Gate Pass Code** (e.g. `INS-784291`) for secure estate gate verification.
- **Slide-Over Live Chat Drawer**: Two-way messaging interface between clients and agents/landlords with counterparty details, instant tour booking shortcut, and persistent message history.
- **Anti-Fraud Security Warning**: Clear platform enforcement against paying advance inspection or gate fees prior to physical property visits.

### 7. Dual Multi-Criteria Reviews & Ratings (Section 9)
- **Property Reviews**: Multi-criteria ratings on Property Condition, Listing Accuracy, Landlord Maintenance, and Value for Money.
- **Neighbourhood Reviews**: Multi-criteria ratings on Safety Perception, Grid Power, Road/Transit Access, and General Cleanliness.
- **Verified Experience Badges**: Differentiates verified tenants/residents from unverified contributors.
- **Legal Subjectivity Disclosures**: Ratings are explicitly stated as individual subjective assessments rather than structural warranties.

### 8. Role-Tailored Dashboards (Section 10)
- **Buyer / Tenant Dashboard**: Saved properties wishlist, active inspection appointments with gate pass codes, open agent conversations, and followed neighbourhoods.
- **Landlord & Agent Portal**:
  - Full property portfolio management (Create, Edit, Pause, Delete listings).
  - Integrated image file upload to Supabase Storage with drag-and-drop support.
  - Tour schedule approval workflow with 1-click gate pass dispatch.
  - Direct inquiry conversation manager.
  - **Recharts Analytics Suite**: Visual weekly traffic, inquiry trends, and conversion funnel analytics.
- **Admin Moderation Dashboard**: Queue of flagged community reports with 1-click actions: Dismiss Report, Redact Violation, or Permanently Takedown Post.

---

## 🗄️ Database Architecture & Supabase Setup

VettedHomes includes enterprise-grade PostgreSQL scripts located in `supabase/`:

- **`supabase/schema.sql`**: 18 relational tables, foreign key constraints, automated timestamp triggers, and Row Level Security (RLS) policies.
- **`supabase/seed.sql`**: Pre-seeded data with Nigerian urban districts, infrastructure metrics, and sample community discussions.

### Setting Up Supabase:

1. Create a project on [Supabase](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Run the contents of `supabase/schema.sql`.
4. Run the contents of `supabase/seed.sql`.
5. Create a public storage bucket named **`property-images`**:
   - Go to **Storage** > **New bucket**.
   - Name: `property-images`.
   - Set to **Public**.
6. Retrieve your credentials from **Project Settings > API**:
   - `Project URL`
   - `anon / public` API Key
7. Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-publishable-key
   ```

*Note: VettedHomes features an automated hybrid storage fallback. If Supabase credentials are not provided or if the network is disconnected, the application operates gracefully with pre-populated demo records.*

---

## 💻 Local Development Guide

### Prerequisites
- Node.js (v18 or v20+ recommended)
- npm or pnpm

### Quick Start
```bash
# 1. Clone the repository
git clone https://github.com/your-username/vettedhomes.git
cd vettedhomes

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your web browser.

### Build & Verify
```bash
# Run production build (TypeScript-free Vite build with chunking)
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment Guide (Vercel)

VettedHomes is optimized for zero-configuration continuous deployment on **Vercel**:

1. Push your repository to **GitHub**:
   ```bash
   git add .
   git commit -m "feat: initial VettedHomes production release"
   git push origin main
   ```
2. Log into [Vercel](https://vercel.com) and click **Add New... > Project**.
3. Import your `vettedhomes` repository.
4. In the **Configure Project** screen:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL`: `https://your-project-ref.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `your-anon-publishable-key`
6. Click **Deploy**.

*The included `vercel.json` ensures client-side routing works seamlessly across all paths without `404 Not Found` errors on browser refresh.*

---

## 🔒 Security & Privacy Commitments

1. **Client Credential Safety**: Frontend code references only the Supabase `anon` public key. Never commit or expose the Supabase `service_role` key in frontend code.
2. **Strict RLS Enforcement**: Row Level Security ensures users can only mutate their own listings, enquiries, saved items, and reviews.
3. **No Advance Inspection Fees**: The platform explicitly warns against advance payment demands for property inspections.
4. **Anti-Doxxing Controls**: Automated filters block phone numbers and specific residential addresses from public discussion boards to prevent harassment.
5. **Geospatial Privacy**: Public map markers represent approximate 260m neighbourhood perimeters rather than vulnerable residential doorsteps.

---

## 📄 License & Attribution

Developed with ❤️ for transparent real estate discovery and community intelligence in Nigeria and beyond. Licensed under the MIT License.
