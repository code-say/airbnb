import { useEffect, useRef } from 'react'
import { unsplash } from '../data/destinations'

// Leaflet + OpenStreetMap: no API key needed. Leaflet touches `window`, so it is
// imported inside the effect and this component is loaded with ssr: false.
export default function Map({ listings, activeId, onSelect }) {
  const elRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef({})

  useEffect(() => {
    let cancelled = false
    let map
    import('leaflet').then((mod) => {
      const L = mod.default || mod
      if (cancelled || !elRef.current) return
      map = L.map(elRef.current, { scrollWheelZoom: true, zoomControl: true })
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      const bounds = []
      listings.forEach((l) => {
        const icon = L.divIcon({
          className: 'pin-wrap',
          html: `<span class="price-pin" data-id="${l.id}">£${l.price}</span>`,
          iconSize: [0, 0],
        })
        const marker = L.marker([l.lat, l.lng], { icon, title: l.title, riseOnHover: true }).addTo(map)
        marker.bindPopup(
          `<div style="width:220px">
             <img src="${unsplash(l.img, 440, 260)}" alt="" style="width:100%;height:130px;object-fit:cover;display:block"/>
             <div style="padding:10px 12px">
               <div style="font-weight:600;font-size:14px;margin-bottom:2px">${l.title}</div>
               <div style="color:#6b7280;font-size:12px">★ ${l.rating.toFixed(2)} · £${l.price} night</div>
             </div>
           </div>`,
          { closeButton: false, offset: [0, -8] }
        )
        marker.on('click', () => onSelect?.(l.id))
        markersRef.current[l.id] = marker
        bounds.push([l.lat, l.lng])
      })
      if (bounds.length) map.fitBounds(bounds, { padding: [40, 40] })
      mapRef.current = map
    })

    return () => {
      cancelled = true
      markersRef.current = {}
      if (map) map.remove()
      mapRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listings])

  // Highlight the marker for the listing being hovered in the list
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, m]) => {
      const el = m.getElement()?.querySelector('.price-pin')
      if (el) el.classList.toggle('active', id === activeId)
      m.setZIndexOffset(id === activeId ? 1000 : 0)
    })
  }, [activeId])

  return <div ref={elRef} className="h-full w-full" aria-label="Map of listings" />
}
