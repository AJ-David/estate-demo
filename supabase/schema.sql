-- ==============================================================================
-- ESTATELENS DATABASE ARCHITECTURE & ROW LEVEL SECURITY (SUPABASE POSTGRESQL)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. CUSTOM TYPES
DO $$ BEGIN
    CREATE TYPE user_role_type AS ENUM ('buyer_tenant', 'landlord_owner', 'agent', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE transaction_type AS ENUM ('rent', 'sale', 'short-let');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE post_category AS ENUM (
        'SECURITY', 
        'INFRASTRUCTURE', 
        'LIVING CONDITIONS', 
        'PROPERTY AND LANDLORD EXPERIENCES', 
        'GENERAL DISCUSSIONS'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE inspection_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE moderation_status AS ENUM ('pending', 'under_review', 'resolved', 'dismissed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES TABLE (Linked directly to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    bio TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 4. USER ROLES TABLE (Allows multiple roles per account: tenant, landlord, agent)
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role user_role_type NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    UNIQUE(user_id, role)
);

-- 5. NEIGHBOURHOODS TABLE
CREATE TABLE IF NOT EXISTS public.neighbourhoods (
    id TEXT PRIMARY KEY, -- Slug ID, e.g. 'lekki-phase-1', 'yaba', 'ikeja-gra'
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT DEFAULT 'Nigeria' NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    description TEXT NOT NULL,
    hero_image_url TEXT,
    livability_score NUMERIC(3, 1) DEFAULT 7.5,
    active_listings_count INT DEFAULT 0,
    verified_residents_count INT DEFAULT 0,
    avg_rent_3bed TEXT,
    avg_sale_4bed TEXT,
    metrics JSONB DEFAULT '{}'::jsonb NOT NULL,
    nearby_facilities JSONB DEFAULT '[]'::jsonb NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 6. PROPERTIES TABLE
CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    landlord_or_agent_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(14, 2) NOT NULL,
    price_period TEXT DEFAULT 'per annum',
    transaction_type transaction_type NOT NULL,
    category TEXT NOT NULL,
    bedrooms INT NOT NULL DEFAULT 1,
    bathrooms INT NOT NULL DEFAULT 1,
    toilets INT DEFAULT 1,
    size_sqm INT,
    furnishing_status TEXT DEFAULT 'Unfurnished',
    availability_status TEXT DEFAULT 'Available Now',
    verification_status TEXT DEFAULT 'Pending Inspection',
    featured BOOLEAN DEFAULT false,
    location_address TEXT NOT NULL,
    neighbourhood_id TEXT NOT NULL REFERENCES public.neighbourhoods(id) ON DELETE RESTRICT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    approximate_precision BOOLEAN DEFAULT true, -- Privacy preservation rule
    video_url TEXT,
    views_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 7. PROPERTY IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.property_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 8. PROPERTY AMENITIES TABLE
CREATE TABLE IF NOT EXISTS public.property_amenities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    amenity TEXT NOT NULL,
    UNIQUE(property_id, amenity)
);

-- 9. SAVED PROPERTIES TABLE (Wishlist / Favorites)
CREATE TABLE IF NOT EXISTS public.saved_properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    UNIQUE(user_id, property_id)
);

-- 10. ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    recipient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    sender_name TEXT NOT NULL,
    sender_contact TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 11. INSPECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.inspections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    agent_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    preferred_date DATE NOT NULL,
    preferred_time_slot TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    notes TEXT,
    status inspection_status DEFAULT 'pending',
    gate_code TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 12. COMMUNITY POSTS TABLE (Signature Feature)
CREATE TABLE IF NOT EXISTS public.community_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    neighbourhood_id TEXT NOT NULL REFERENCES public.neighbourhoods(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    category post_category NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    is_verified_resident BOOLEAN DEFAULT false,
    pinned BOOLEAN DEFAULT false,
    upvotes_count INT DEFAULT 0,
    downvotes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    status TEXT DEFAULT 'active', -- 'active', 'flagged', 'hidden'
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 13. COMMUNITY COMMENTS TABLE
CREATE TABLE IF NOT EXISTS public.community_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    upvotes_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 14. COMMUNITY VOTES TABLE (Upvotes / Downvotes)
CREATE TABLE IF NOT EXISTS public.community_votes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES public.community_posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    vote_type TEXT CHECK (vote_type IN ('up', 'down')) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    UNIQUE(post_id, user_id)
);

-- 15. PROPERTY REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.property_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    rating NUMERIC(2, 1) NOT NULL,
    condition_rating NUMERIC(2, 1),
    accuracy_rating NUMERIC(2, 1),
    maintenance_rating NUMERIC(2, 1),
    value_rating NUMERIC(2, 1),
    comment TEXT NOT NULL,
    is_verified_experience BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 16. NEIGHBOURHOOD REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.neighbourhood_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    neighbourhood_id TEXT NOT NULL REFERENCES public.neighbourhoods(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    safety_rating NUMERIC(2, 1),
    infrastructure_rating NUMERIC(2, 1),
    accessibility_rating NUMERIC(2, 1),
    cleanliness_rating NUMERIC(2, 1),
    overall_rating NUMERIC(2, 1) NOT NULL,
    comment TEXT NOT NULL,
    is_verified_resident BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 17. MODERATION REPORTS TABLE (Trust & Safety)
CREATE TABLE IF NOT EXISTS public.moderation_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    target_type TEXT NOT NULL, -- 'post', 'comment', 'property', 'user'
    target_id TEXT NOT NULL,
    reason TEXT NOT NULL,
    details TEXT,
    status moderation_status DEFAULT 'pending',
    action_taken TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 18. VERIFICATION REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.verification_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    verification_type TEXT NOT NULL, -- 'resident', 'landlord', 'agent'
    neighbourhood_id TEXT REFERENCES public.neighbourhoods(id) ON DELETE SET NULL,
    document_urls TEXT[] DEFAULT '{}',
    status TEXT DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_properties_neighbourhood ON public.properties(neighbourhood_id);
CREATE INDEX IF NOT EXISTS idx_properties_transaction_type ON public.properties(transaction_type);
CREATE INDEX IF NOT EXISTS idx_properties_category ON public.properties(category);
CREATE INDEX IF NOT EXISTS idx_properties_price ON public.properties(price);
CREATE INDEX IF NOT EXISTS idx_saved_properties_user ON public.saved_properties(user_id);
CREATE INDEX IF NOT EXISTS idx_inspections_user ON public.inspections(user_id);
CREATE INDEX IF NOT EXISTS idx_inspections_agent ON public.inspections(agent_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_neighbourhood ON public.community_posts(neighbourhood_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_category ON public.community_posts(category);
CREATE INDEX IF NOT EXISTS idx_community_comments_post ON public.community_comments(post_id);

-- ==============================================================================
-- AUTOMATIC TIMESTAMPS TRIGGER FUNCTION
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_profiles_updated_at ON public.profiles;
CREATE TRIGGER trigger_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_properties_updated_at ON public.properties;
CREATE TRIGGER trigger_properties_updated_at
    BEFORE UPDATE ON public.properties
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_community_posts_updated_at ON public.community_posts;
CREATE TRIGGER trigger_community_posts_updated_at
    BEFORE UPDATE ON public.community_posts
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- AUTOMATIC PROFILE & USER ROLE CREATION ON AUTH.USERS SIGNUP
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    assigned_role user_role_type;
BEGIN
    -- Determine role from user_metadata or default to 'buyer_tenant'
    IF NEW.raw_user_meta_data->>'role' = 'landlord_owner' THEN
        assigned_role := 'landlord_owner'::user_role_type;
    ELSIF NEW.raw_user_meta_data->>'role' = 'agent' THEN
        assigned_role := 'agent'::user_role_type;
    ELSIF NEW.raw_user_meta_data->>'role' = 'admin' THEN
        assigned_role := 'admin'::user_role_type;
    ELSE
        assigned_role := 'buyer_tenant'::user_role_type;
    END IF;

    -- 1. Insert Profile
    INSERT INTO public.profiles (
        id, 
        email, 
        full_name, 
        phone, 
        avatar_url
    )
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        NEW.raw_user_meta_data->>'phone',
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80')
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = EXCLUDED.full_name,
        phone = COALESCE(EXCLUDED.phone, public.profiles.phone);

    -- 2. Insert User Role
    INSERT INTO public.user_roles (user_id, role, is_primary)
    VALUES (NEW.id, assigned_role, true)
    ON CONFLICT (user_id, role) DO NOTHING;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.neighbourhoods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.neighbourhood_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moderation_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_requests ENABLE ROW LEVEL SECURITY;

-- 1. PROFILES POLICIES
CREATE POLICY "Public profiles are readable by everyone"
    ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. USER ROLES POLICIES
CREATE POLICY "Public user roles are viewable by all"
    ON public.user_roles FOR SELECT USING (true);

CREATE POLICY "Users can insert roles for their own account"
    ON public.user_roles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own roles"
    ON public.user_roles FOR ALL USING (auth.uid() = user_id);

-- 3. NEIGHBOURHOODS POLICIES
CREATE POLICY "Neighbourhoods are viewable by everyone"
    ON public.neighbourhoods FOR SELECT USING (true);

-- 4. PROPERTIES POLICIES
CREATE POLICY "Properties are publicly viewable"
    ON public.properties FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create properties"
    ON public.properties FOR INSERT WITH CHECK (auth.uid() = landlord_or_agent_id);

CREATE POLICY "Owners and agents can update their own properties"
    ON public.properties FOR UPDATE USING (auth.uid() = landlord_or_agent_id);

CREATE POLICY "Owners and agents can delete their own properties"
    ON public.properties FOR DELETE USING (auth.uid() = landlord_or_agent_id);

-- 5. PROPERTY IMAGES & AMENITIES
CREATE POLICY "Property images are publicly viewable"
    ON public.property_images FOR SELECT USING (true);

CREATE POLICY "Owners can manage property images"
    ON public.property_images FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.properties 
            WHERE properties.id = property_images.property_id 
            AND properties.landlord_or_agent_id = auth.uid()
        )
    );

CREATE POLICY "Property amenities are viewable by everyone"
    ON public.property_amenities FOR SELECT USING (true);

CREATE POLICY "Owners can manage property amenities"
    ON public.property_amenities FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.properties 
            WHERE properties.id = property_amenities.property_id 
            AND properties.landlord_or_agent_id = auth.uid()
        )
    );

-- 6. SAVED PROPERTIES POLICIES
CREATE POLICY "Users can view their own saved properties"
    ON public.saved_properties FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved properties"
    ON public.saved_properties FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved properties"
    ON public.saved_properties FOR DELETE USING (auth.uid() = user_id);

-- 7. ENQUIRIES POLICIES
CREATE POLICY "Users can view enquiries they sent or received"
    ON public.enquiries FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Authenticated users can send enquiries"
    ON public.enquiries FOR INSERT WITH CHECK (auth.uid() = sender_id OR sender_id IS NULL);

-- 8. INSPECTIONS POLICIES
CREATE POLICY "Users can view inspections they requested or host"
    ON public.inspections FOR SELECT USING (auth.uid() = user_id OR auth.uid() = agent_id);

CREATE POLICY "Authenticated users can book inspections"
    ON public.inspections FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Agents and requesters can update inspection status"
    ON public.inspections FOR UPDATE USING (auth.uid() = user_id OR auth.uid() = agent_id);

-- 9. COMMUNITY POSTS POLICIES
CREATE POLICY "Active community posts are viewable by everyone"
    ON public.community_posts FOR SELECT USING (status != 'hidden' OR auth.uid() = author_id);

CREATE POLICY "Authenticated users can create community posts"
    ON public.community_posts FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own posts"
    ON public.community_posts FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own posts"
    ON public.community_posts FOR DELETE USING (auth.uid() = author_id);

-- 10. COMMUNITY COMMENTS POLICIES
CREATE POLICY "Comments are viewable by everyone"
    ON public.community_comments FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create comments"
    ON public.community_comments FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own comments"
    ON public.community_comments FOR DELETE USING (auth.uid() = author_id);

-- 11. COMMUNITY VOTES POLICIES
CREATE POLICY "Votes are viewable by all"
    ON public.community_votes FOR SELECT USING (true);

CREATE POLICY "Authenticated users can register votes"
    ON public.community_votes FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can modify their own votes"
    ON public.community_votes FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can remove their own votes"
    ON public.community_votes FOR DELETE USING (auth.uid() = user_id);

-- 12. REVIEWS POLICIES
CREATE POLICY "Property reviews are viewable by all"
    ON public.property_reviews FOR SELECT USING (true);

CREATE POLICY "Authenticated users can post property reviews"
    ON public.property_reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Neighbourhood reviews are viewable by all"
    ON public.neighbourhood_reviews FOR SELECT USING (true);

CREATE POLICY "Authenticated users can post neighbourhood reviews"
    ON public.neighbourhood_reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

-- 13. MODERATION REPORTS POLICIES
CREATE POLICY "Users can submit moderation reports"
    ON public.moderation_reports FOR INSERT WITH CHECK (auth.uid() = reporter_id OR reporter_id IS NULL);

CREATE POLICY "Users can view reports they submitted"
    ON public.moderation_reports FOR SELECT USING (auth.uid() = reporter_id);
