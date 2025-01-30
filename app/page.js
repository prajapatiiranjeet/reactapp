"use client";
import { useState } from "react";
import { Poppins, Inter, Montserrat } from 'next/font/google';  // Fixed Montserrat spelling
import Image from 'next/image';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import DonutChart from '../components/DonutChart';

const MapComponent = dynamic(
  () => import('../components/Map'),
  { ssr: false }
);

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const montserrat = Montserrat({  // Using correct variable name
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
});


const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 37.7749,
  lng: -122.4194
};

export default function Dashboard() {
  const [selected, setSelected] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [mapPosition, setMapPosition] = useState([37.7749, -122.4194]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchLocation}`
      );
      const data = await response.json();
      
      if (data.length > 0) {
        setMapPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      }
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  const position = [37.7749, -122.4194];
  const menuItems = [
    "Dashboard",
    "Show Maps",
    "Profiles",
    "Vehicles",
    "Clauses",
    "Manage Fee",
  ];

  const cards = [
    { title: "Accuracy", value: "98%" },
    { title: "Average Waiting Time", value: "5 mins" },
    { title: "AQI", value: "Good" },
  ];

  return (
    <div className={`bg-gray-100 ${poppins.className} min-h-screen
      lg:flex md:block sm:block`}>
      {/* Sidebar - Collapsible on mobile */}
      <aside className="bg-white text-black transition-all duration-300
        lg:w-48 lg:fixed lg:h-screen lg:p-5
        md:w-full md:relative md:h-auto md:p-4
        sm:w-full sm:relative sm:h-auto sm:p-3">
        <div className="flex items-center justify-center mb-4">
          <Image
            src="https://static.vecteezy.com/system/resources/previews/027/427/445/original/any-logo-design-inspiration-for-a-unique-identity-modern-elegance-and-creative-design-watermark-your-success-with-the-striking-this-logo-vector.jpg"
            alt="Transportation Logo"
            width={120}
            height={120}
            className="rounded-lg shadow-sm
              lg:w-30 lg:h-30
              md:w-24 md:h-24
              sm:w-20 sm:h-20"
            priority
            unoptimized={true}
            onError={(e) => {
              console.error('Image failed to load');
              e.target.src = "/fallback-image.png";
            }}
          />
        </div>
        <ul className="mt-8 space-y-8 bg-white p-6 rounded"> {/* Increased space-y and padding */}
          {menuItems.map((item) => (
            <button
              key={item}
              className={`
                w-full 
                text-left 
                p-5  /* Increased padding */
                rounded-lg 
                cursor-pointer 
                relative 
                overflow-hidden
                transition-all 
                duration-500 
                ease-in-out 
                transform 
                hover:translate-x-2
                hover:scale-105
                hover:rounded-xl
                mb-4  /* Increased bottom margin */
                group
                ${selected === item 
                  ? "bg-[#1564BF] text-white font-bold shadow-lg rounded-xl" 
                  : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-blue-500/20"
                }
              `}
              onClick={() => setSelected(item)}
            >
              <span className="absolute inset-0 w-0 bg-[#040d18] transition-all duration-300 ease-in-out group-hover:w-full -z-[1] opacity-25"></span>
              <div className="flex items-center justify-between relative z-10">
                <span>{item}</span>
                <span className="transform translate-x-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  →
                </span>
              </div>
            </button>
          ))}
        </ul>
      </aside>
  
        {/* Main Content */}
        <main className="transition-all duration-300
          lg:ml-56 lg:p-6 lg:w-[calc(100%-12rem)]
          md:ml-0 md:p-4 md:w-full
          sm:ml-0 sm:p-3 sm:w-full">
          {/* Header with Search and Profile */}
          <div className="bg-white rounded-xl shadow-md mb-8">
            <div className="flex flex-wrap items-center justify-between p-4 gap-4">
              <form onSubmit={handleSearch} className="search-container flex-1 min-w-[250px]">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="Search location..."
                    className="search-input"
                  />
                  <svg className="search-icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <button type="submit" className="search-button">Search</button>
                </div>
              </form>
              
              <div className="text-3xl ml-8 hover:scale-110 transition-transform duration-300 cursor-pointer">
                👤
              </div>
            </div>
          </div>
  
          {/* Dashboard Cards */}
          <section className="grid gap-8 mb-10
            lg:grid-cols-3
            md:grid-cols-2
            sm:grid-cols-1">
          {cards.map((card) => (
            <div 
              key={card.title}
              className={`
                bg-white p-6 rounded-xl shadow-sm
                transition-all duration-500 ease-in-out
                transform-gpu
                ${card.title === "Accuracy" ? `
                  relative
                  before:absolute before:inset-0
                  before:rounded-xl before:p-[2px]
                  before:bg-gradient-to-r before:from-purple-500 before:via-purple-600 before:to-purple-500
                  before:bg-[length:200%_100%]
                  before:animate-[gradientBorder_3s_ease-in-out_infinite]
                  before:-z-[1]
                  hover:before:bg-[length:100%_100%]
                  hover:translate-y-[-4px]
                  hover:shadow-2xl
                  hover:shadow-purple-500/20
                ` : card.title === "Average Waiting Time" ? `
                  relative
                  before:absolute before:inset-0
                  before:rounded-xl before:p-[2px]
                  before:bg-gradient-to-r before:from-emerald-500 before:via-emerald-600 before:to-emerald-500
                  before:bg-[length:200%_100%]
                  before:animate-[gradientBorderGreen_3s_ease-in-out_infinite]
                  before:-z-[1]
                  hover:before:bg-[length:100%_100%]
                  hover:translate-y-[-4px]
                  hover:shadow-2xl
                  hover:shadow-emerald-500/20
                ` : `
                  relative
                  before:absolute before:inset-0
                  before:rounded-xl before:p-[2px]
                  before:bg-gradient-to-r before:from-blue-500 before:via-blue-600 before:to-blue-500
                  before:bg-[length:200%_100%]
                  before:animate-[gradientBorderBlue_3s_ease-in-out_infinite]
                  before:-z-[1]
                  hover:before:bg-[length:100%_100%]
                  hover:translate-y-[-4px]
                  hover:shadow-2xl
                  hover:shadow-blue-500/20
                `}
                lg:p-8 md:p-6 sm:p-4
              `}
            >
              <h3 className={`
                ${montserrat.className}
                text-lg font-bold tracking-tight mb-4
                text-white
                transition-all duration-300
                group-hover:scale-105
                ${card.title === "Accuracy" 
                  ? "bg-clip-text text-white font-semibold" 
                  : card.title === "Average Waiting Time"
                  ? "from-emerald-600 to-emerald-800 group-hover:from-emerald-500 group-hover:to-emerald-700"
                  : "from-blue-600 to-blue-800 group-hover:from-blue-500 group-hover:to-blue-700"
                }
              `}>
                {card.title}
              </h3>
              {card.title === "Accuracy" ? (
                <DonutChart 
                  value={98} 
                  title="Accuracy" 
                  color="rgb(128, 196, 233)" 
                />
              ) : card.title === "Average Waiting Time" ? (
                <DonutChart 
                  value={75} 
                  title="Wait Time" 
                  color="rgb(212, 189, 172)" 
                />
              ) : (
                <p className={`
                  ${inter.className}
                  text-2xl font-bold mt-4
                  // ...existing code...
                `}>
                  {card.value}
                </p>
              )}
            </div>
          ))}
        </section>

        {/* Map Section */}
        <section className="bg-white rounded-xl shadow-lg overflow-hidden
          lg:h-[calc(100vh-300px)]
          md:h-[500px]
          sm:h-[400px]">
          <MapComponent position={mapPosition} />
        </section>
      </main>
    </div>
  );
}
