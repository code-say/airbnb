// All content lives here so the site has no external data dependencies.
// Photos are from Unsplash (hotlinking is how Unsplash asks images to be used).

export const unsplash = (id, w = 800, h) =>
  `https://images.unsplash.com/photo-${id}?w=${w}${h ? `&h=${h}` : ''}&q=75&auto=format&fit=crop`

export const HERO_IMG = '1464822759023-fed622ff2c3b'
export const OUTDOORS_IMG = '1510798831971-661eb04b3739'

export const destinations = [
  { slug: 'london', name: 'London', drive: 'Where you are', lat: 51.5072, lng: -0.1276, img: '1533929736458-ca588d08c8be' },
  { slug: 'cotswolds', name: 'Cotswolds', drive: '2-hour drive', lat: 51.833, lng: -1.8433, img: '1480074568708-e7b720bb3f09' },
  { slug: 'brighton', name: 'Brighton', drive: '1.5-hour drive', lat: 50.8225, lng: -0.1372, img: '1499793983690-e29da59ef1c2' },
  { slug: 'york', name: 'York', drive: '4-hour drive', lat: 53.959, lng: -1.0815, img: '1467269204594-9661b134dd2b' },
  { slug: 'lake-district', name: 'Lake District', drive: '5-hour drive', lat: 54.4609, lng: -3.0886, img: '1501785888041-af3ef285b470' },
  { slug: 'cornwall', name: 'Cornwall', drive: '5.5-hour drive', lat: 50.266, lng: -5.0527, img: '1507525428034-b723cf961d3e' },
  { slug: 'snowdonia', name: 'Snowdonia', drive: '4.5-hour drive', lat: 52.9181, lng: -3.8913, img: '1506905925346-21bda4d32df4' },
  { slug: 'manchester', name: 'Manchester', drive: '4-hour drive', lat: 53.4808, lng: -2.2426, img: '1449824913935-59a10b8d2000' },
]

export const categories = [
  { title: 'Outdoor getaways', img: '1504280390367-361c6d9f38f4', query: 'Lake District' },
  { title: 'Unique stays', img: '1518780664697-55e3ad937233', query: 'Snowdonia' },
  { title: 'Entire homes', img: '1570129477492-45c003edd2be', query: 'Cotswolds' },
  { title: 'Pets allowed', img: '1587300003388-59208cc962cb', query: 'Cornwall' },
  { title: 'Amazing pools', img: '1600596542815-ffad4c1539a9', query: 'Brighton' },
]

const LISTING_PHOTOS = [
  '1502672260266-1c1ef2d93688', '1522708323590-d24dbb6b0267', '1505691938895-1758d7feb511',
  '1493809842364-78817add7ffb', '1513694203232-719a280e022f', '1560448204-e02f11c3d0e2',
  '1512917774080-9991f1c4c750', '1564013799919-ab600027ffc6', '1568605114967-8130f3a36994',
  '1449844908441-8829872d2607', '1600585154340-be6161a56a0c', '1586023492125-27b2c045efd7',
  '1484154218962-a197022b5858', '1536376072261-38c75010e6c9', '1475855581690-80accde3ae2b',
  '1523217582562-09d0def993a6', '1595877244574-e90ce41ce089', '1494526585095-c41746248156',
  '1449158743715-0a90ebb6d2d8', '1544620347-c4fd4a3d5957',
]

const TEMPLATES = [
  { type: 'Entire home', title: 'Bright family home with garden', desc: '3 guests · 2 bedrooms · 2 beds · 1 bath · Wifi · Kitchen · Free parking', base: 145 },
  { type: 'Private room', title: 'Cosy double room near the centre', desc: '2 guests · 1 bedroom · 1 bed · 1 shared bath · Wifi · Washing machine', base: 62 },
  { type: 'Entire flat', title: 'Stylish loft with skyline views', desc: '4 guests · 2 bedrooms · 2 beds · 1 bath · Wifi · Workspace · Lift', base: 128 },
  { type: 'Cabin', title: 'Hideaway cabin among the trees', desc: '2 guests · 1 bedroom · 1 bed · 1 bath · Wood burner · Hot tub', base: 118 },
  { type: 'Entire home', title: 'Modern house with private pool', desc: '6 guests · 3 bedrooms · 4 beds · 3 baths · Pool · Air conditioning', base: 265 },
  { type: 'Entire flat', title: 'Minimalist studio, perfect for two', desc: '2 guests · Studio · 1 bed · 1 bath · Wifi · Kitchenette', base: 84 },
  { type: 'Cottage', title: 'Character cottage with fireplace', desc: '4 guests · 2 bedrooms · 3 beds · 1 bath · Fireplace · Garden', base: 136 },
  { type: 'Private room', title: 'Quiet room in a Victorian townhouse', desc: '2 guests · 1 bedroom · 1 bed · 1 private bath · Breakfast', base: 74 },
  { type: 'Entire home', title: 'Architect-designed retreat', desc: '5 guests · 3 bedrooms · 3 beds · 2 baths · Sauna · EV charger', base: 210 },
  { type: 'Camper van', title: 'Converted van for slow travel', desc: '2 guests · 1 bed · Outdoor shower · Pets allowed', base: 69 },
]

// Small seeded PRNG so a given destination always shows the same listings.
function rng(seedText) {
  let h = 2166136261
  for (const c of seedText) h = Math.imul(h ^ c.charCodeAt(0), 16777619)
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    return ((h ^= h >>> 16) >>> 0) / 4294967296
  }
}

export function findDestination(query = '') {
  const q = String(query).trim().toLowerCase()
  if (!q) return null
  return (
    destinations.find((d) => d.name.toLowerCase() === q || d.slug === q) ||
    destinations.find((d) => d.name.toLowerCase().includes(q) || q.includes(d.name.toLowerCase())) ||
    null
  )
}

export function getListings(query) {
  const dest = findDestination(query) || destinations[0]
  const label = String(query || '').trim() || dest.name
  const rand = rng(dest.slug)
  const photos = [...LISTING_PHOTOS].sort(() => rand() - 0.5)
  const spread = dest.slug === 'london' || dest.slug === 'manchester' ? 0.06 : 0.12

  return TEMPLATES.map((t, i) => {
    const price = Math.round((t.base * (0.85 + rand() * 0.45)) / 5) * 5
    return {
      id: `${dest.slug}-${i}`,
      type: t.type,
      title: t.title,
      description: t.desc,
      location: `${t.type} in ${label}`,
      img: photos[i % photos.length],
      price,
      rating: Number((4.55 + rand() * 0.45).toFixed(2)),
      reviews: Math.floor(12 + rand() * 340),
      superhost: rand() > 0.55,
      lat: dest.lat + (rand() - 0.5) * spread,
      lng: dest.lng + (rand() - 0.5) * spread * 1.6,
    }
  })
}
