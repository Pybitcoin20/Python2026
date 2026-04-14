# Uzbekistan Heritage & Travel Guide: Monetization & Admin Strategy

## 1. Monetization Strategy

To ensure sustainability and growth, the "Modern Silk Road" ecosystem employs three primary monetization models:

### Model 1: Affiliate Commission (Bookings)
- **Mechanism**: Partner with local hotels, restaurants, and tour operators.
- **Revenue**: Earn a 5-10% commission on every successful booking made through the app.
- **Value Prop**: Seamless integration for tourists; increased visibility for local vendors.

### Model 2: Featured Listings for Local Artisans
- **Mechanism**: Artisans at Chorsu, Siyob, and other bazaars can pay for "Featured" status.
- **Revenue**: Monthly subscription or one-time fee for top-of-search placement.
- **Value Prop**: Direct access to high-intent foreign tourists; verified "Artisan" badge.

### Model 3: Premium Offline Ecosystem
- **Mechanism**: While basic text data is free, high-resolution offline map tiles (Mapbox) and curated audio guides are premium features.
- **Revenue**: One-time "Region Pack" purchase (e.g., $4.99 for Samarkand Premium Pack).
- **Value Prop**: Peace of mind for travelers in remote areas with limited connectivity.

---

## 2. Admin Dashboard (React-based)

The Admin Panel allows vendors and government officials to manage the ecosystem.

### Key Features:
- **Real-time Pricing**: Vendors can update hotel room rates or table availability instantly.
- **Plov Radar Management**: Plov centers can update their "Daily Special" or "Sold Out" status.
- **Analytics**: Heatmaps of tourist proximity to identify under-visited heritage sites.
- **Review Moderation**: AI-assisted filtering of reviews to ensure authenticity.

### Tech Stack:
- **Frontend**: React + Tailwind + Shadcn/UI.
- **State**: React Query for real-time data fetching.
- **Auth**: Role-Based Access Control (RBAC) via Firebase Auth.
