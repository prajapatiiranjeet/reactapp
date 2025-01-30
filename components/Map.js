import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function ChangeMapView({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position]);
  return null;
}

function SearchBar({ onLocationSelect }) {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = async (value) => {
    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
        );
        const data = await response.json();
        setSuggestions(data.slice(0, 5));
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearch(e.target.value);
            }}
            placeholder="Search location..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border-0 rounded-l-xl 
              focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button 
          onClick={() => onLocationSelect(search)}
          className="p-3 bg-blue-500 text-white rounded-r-xl hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg z-50">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSearch(suggestion.display_name);
                setShowSuggestions(false);
                onLocationSelect(suggestion);
              }}
            >
              {suggestion.display_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Map({ position }) {
  return (
    <MapContainer 
      center={position} 
      zoom={13} 
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          Selected Location
        </Popup>
      </Marker>
      <ChangeMapView position={position} />
    </MapContainer>
  );
}