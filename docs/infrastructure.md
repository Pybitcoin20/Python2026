# Uzbekistan Heritage & Travel Guide: Infrastructure & API Design

## 1. Folder Structure (React Native & Node.js)

### Mobile (React Native)
```text
uzbekistan-travel-mobile/
├── src/
│   ├── api/                # API service layer (Axios/React Query)
│   ├── assets/             # Images, Fonts (Ikat/Ganch patterns)
│   ├── components/         # Reusable UI components
│   ├── constants/          # Colors (Samarkand Azure, Silk Gold)
│   ├── hooks/              # Custom hooks (useLocation, useOffline)
│   ├── i18n/               # Localization (i18next)
│   ├── navigation/         # React Navigation stacks
│   ├── screens/            # Main screens (Home, Map, PlovRadar, Guide)
│   ├── store/              # State management (Zustand/Redux)
│   └── utils/              # GIS helpers, formatting
├── App.tsx
└── package.json
```

### Backend (Node.js/Express)
```text
uzbekistan-travel-api/
├── src/
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Auth, Error handling, GIS validation
│   ├── models/             # Database models (Sequelize/Prisma)
│   ├── routes/             # API endpoints
│   ├── services/           # Business logic (Proximity Algorithm)
│   └── utils/              # Helpers
├── .env
├── server.ts
└── package.json
```

## 2. Key API Endpoints (RESTful)

### Locations
- `GET /api/locations` - List locations with filters (category, region).
- `GET /api/locations/proximity?lat={lat}&lng={lng}&radius=1000` - Smart Proximity search.
- `GET /api/locations/:id` - Get detailed location info.

### Gastronomy (Plov Radar)
- `GET /api/plov-radar` - Get ranked plov centers based on time and region.

### Cultural Guide
- `GET /api/cultural-tips` - Fetch Dos & Don'ts and legal guides.

### Bookings
- `POST /api/bookings` - Create a new reservation.
- `GET /api/bookings/user/:userId` - Fetch user's bookings.

## 3. Database ERD Description

- **Locations** (1) <--- (N) **Reviews**: One location can have many user reviews.
- **Locations** (1) <--- (N) **Bookings**: One location (hotel/restaurant) can have many bookings.
- **Locations** (1) <--- (1) **Plov_Radar**: Specialized gastronomy metadata for specific locations.
- **Users** (1) <--- (N) **Reviews**: One user can write many reviews.
- **Users** (1) <--- (N) **Bookings**: One user can make many bookings.

## 4. Smart Proximity Algorithm (Logic)

```javascript
// Node.js + PostGIS Proximity Logic
const getNearbyHighRated = async (lat, lng, radius = 1000) => {
  const query = `
    SELECT *, 
           ST_Distance(coordinates, ST_MakePoint($1, $2)::geography) AS distance
    FROM locations
    WHERE ST_DWithin(coordinates, ST_MakePoint($1, $2)::geography, $3)
      AND rating >= 4.5
    ORDER BY rating DESC, distance ASC;
  `;
  return await db.query(query, [lng, lat, radius]);
};
```
