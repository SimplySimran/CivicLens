import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const AREA_COORDINATES = [
  {
    match: 'yelahanka new town',
    position: [13.1007, 77.5963]
  },
  {
    match: 'avalahalli',
    position: [13.1035, 77.5685]
  },
  {
    match: 'bagalur road',
    position: [13.1350, 77.6200]
  },
  {
    match: 'yelahanka',
    position: [13.1005, 77.5960]
  }
]

const DEFAULT_POSITION = [13.1007, 77.5963]

const getCoordinates = (location = '') => {
  const normalizedLocation = location.toLowerCase()

  const matchedArea = AREA_COORDINATES.find(area =>
    normalizedLocation.includes(area.match)
  )

  return matchedArea ? matchedArea.position : DEFAULT_POSITION
}

const getStatusColor = (status) => {
  if (status === 'Resolved') return '#16a34a'
  if (status === 'In Progress') return '#9333ea'
  return '#f97316'
}

function MapView({ complaints = [], onSelectComplaint }) {
  return (
    <div className="w-full h-[480px] rounded-xl overflow-hidden border border-slate-200">
      <MapContainer
        center={DEFAULT_POSITION}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {complaints.map((complaint) => {
          const position = getCoordinates(complaint.location)

          return (
            <CircleMarker
              key={complaint.id}
              center={position}
              radius={9}
              pathOptions={{
                color: '#ffffff',
                weight: 2,
                fillColor: getStatusColor(complaint.status),
                fillOpacity: 0.95
              }}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <p className="font-bold text-slate-800">
                    {complaint.issue}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {complaint.id}
                  </p>
                  <p className="text-sm mt-2">
                    {complaint.location}
                  </p>
                  <p className="text-sm mt-1">
                    Status: <strong>{complaint.status}</strong>
                  </p>

                  <button
                    onClick={() => onSelectComplaint?.(complaint)}
                    className="mt-3 text-sm font-semibold text-teal-700"
                  >
                    View complaint details →
                  </button>
                </div>
              </Popup>
            </CircleMarker>
          )
        })}
      </MapContainer>
    </div>
  )
}

export default MapView
