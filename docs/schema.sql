-- Uzbekistan Heritage & Travel Guide: PostgreSQL Schema
-- Optimized for GIS support and tourism logistics

-- Enable PostGIS extension for GIS support
CREATE EXTENSION IF NOT EXISTS postgis;

-- 1. Locations Table (Hotels, Restaurants, Historical Sites)
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) CHECK (category IN ('hotel', 'restaurant', 'historical_site', 'plov_center')),
    region VARCHAR(50) NOT NULL, -- Tashkent, Samarkand, Bukhara, Khiva, etc.
    address TEXT,
    coordinates GEOGRAPHY(POINT, 4326), -- Lat/Long with GIS support
    rating DECIMAL(2, 1) DEFAULT 0.0,
    review_count INTEGER DEFAULT 0,
    opening_hours JSONB, -- Flexible hours storage
    contact_info JSONB, -- Phone, website, social media
    images TEXT[], -- Array of image URLs
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Reviews Table
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL, -- Assuming external auth like Firebase or Supabase
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    images TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Bookings Table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    location_id INTEGER REFERENCES locations(id),
    user_id UUID NOT NULL,
    booking_type VARCHAR(50) CHECK (booking_type IN ('hotel', 'table')),
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    guest_count INTEGER DEFAULT 1,
    special_requests TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Cultural Tips Table
CREATE TABLE cultural_tips (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) CHECK (category IN ('dos_and_donts', 'bargaining', 'ethics', 'legal')),
    region VARCHAR(50), -- Optional regional specificity
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Plov Radar (Specialized Gastronomy Data)
CREATE TABLE plov_radar (
    id SERIAL PRIMARY KEY,
    location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE,
    regional_style VARCHAR(50), -- Tashkent, Samarkand, etc.
    best_time_of_day VARCHAR(20) CHECK (best_time_of_day IN ('morning', 'lunch', 'all_day')),
    is_active BOOLEAN DEFAULT TRUE,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_locations_coordinates ON locations USING GIST (coordinates);
CREATE INDEX idx_locations_category ON locations(category);
CREATE INDEX idx_reviews_location_id ON reviews(location_id);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
