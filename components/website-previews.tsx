'use client';

import Image from 'next/image';

// Photography Studio - Dark, elegant, gallery-focused design
export function PhotographyPreview() {
  return (
    <div className="bg-black text-white rounded-lg overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <span className="text-xl font-light tracking-widest">SARAH CHEN</span>
        <div className="hidden sm:flex gap-8 text-sm text-white/70">
          <span>Portfolio</span>
          <span>About</span>
          <span>Book</span>
          <span>Contact</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative aspect-[16/9]">
        <Image
          src="/portfolio-photography.jpg"
          alt="Photography"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-light tracking-widest mb-4">MOMENTS</h1>
            <p className="text-white/70 text-sm tracking-wider">CAPTURED FOREVER</p>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-3 gap-1 p-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className="aspect-square bg-white/10" />
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 text-center text-white/50 text-xs">
        <span>SARAH CHEN PHOTOGRAPHY | LOS ANGELES</span>
      </div>
    </div>
  );
}

// Auto Repair Shop - Bold, trustworthy, blue/orange industrial design
export function AutoRepairPreview() {
  return (
    <div className="bg-slate-900 text-white rounded-lg overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-orange-500">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-orange-500 font-bold text-sm">M</span>
          </div>
          <span className="font-bold text-lg">MIKE&apos;S AUTO CARE</span>
        </div>
        <div className="hidden sm:flex gap-6 text-sm font-medium">
          <span>Services</span>
          <span>Pricing</span>
          <span>Reviews</span>
          <span className="bg-white text-orange-500 px-3 py-1 rounded">Book Now</span>
        </div>
      </div>

      {/* Hero */}
      <div className="px-6 py-10 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted Auto Repair<br />
              <span className="text-orange-500">Since 1998</span>
            </h1>
            <p className="text-slate-400 mb-6">Honest service, fair prices, quality work guaranteed.</p>
            <div className="flex gap-3">
              <button className="bg-orange-500 text-white px-6 py-2 rounded font-medium">Schedule Service</button>
              <button className="border border-white/30 px-6 py-2 rounded">Call Now</button>
            </div>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src="/portfolio-auto-repair.jpg"
              alt="Auto Repair"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="grid grid-cols-4 gap-px bg-slate-700">
        {['Oil Change', 'Brakes', 'Tires', 'Engine'].map((service) => (
          <div key={service} className="bg-slate-800 p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-orange-500/20 rounded-full" />
            <span className="text-xs text-slate-300">{service}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Salon & Spa - Soft, luxurious, rose gold/cream elegant design
export function SalonPreview() {
  return (
    <div className="bg-[#faf8f5] text-[#3d3d3d] rounded-lg overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#e5ddd3]">
        <span className="text-xl font-light tracking-[0.2em] text-[#c9a87c]">LUXE</span>
        <div className="hidden sm:flex gap-8 text-sm text-[#6b6b6b]">
          <span>Services</span>
          <span>Team</span>
          <span>Gift Cards</span>
          <span className="text-[#c9a87c]">Book Now</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f5] via-transparent to-transparent z-10" />
        <div className="relative aspect-[16/9]">
          <Image
            src="/portfolio-salon.jpg"
            alt="Salon"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="px-8 md:px-12 max-w-md">
            <h1 className="text-3xl md:text-5xl font-light text-[#3d3d3d] mb-4 leading-tight">
              Indulge in <span className="italic">Luxury</span>
            </h1>
            <p className="text-[#6b6b6b] text-sm mb-6">Premium beauty services in an oasis of calm</p>
            <button className="bg-[#c9a87c] text-white px-8 py-3 text-sm tracking-wider">
              BOOK APPOINTMENT
            </button>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="grid grid-cols-3 gap-6 p-6">
        {['Hair', 'Nails', 'Spa'].map((service) => (
          <div key={service} className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#c9a87c]/10 flex items-center justify-center">
              <span className="text-[#c9a87c] text-xs">{service.charAt(0)}</span>
            </div>
            <span className="text-sm font-light">{service}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Restaurant - Warm, inviting, earthy tones with elegant typography
export function RestaurantPreview() {
  return (
    <div className="bg-[#1a1a1a] text-white rounded-lg overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="text-center">
          <span className="text-2xl font-serif tracking-wide text-[#d4a574]">Harvest Table</span>
          <p className="text-[10px] tracking-[0.3em] text-white/50 mt-1">FARM TO TABLE</p>
        </div>
        <div className="hidden sm:flex gap-8 text-sm text-white/70 font-light">
          <span>Menu</span>
          <span>Story</span>
          <span>Events</span>
          <span className="text-[#d4a574]">Reserve</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative aspect-[16/9]">
        <Image
          src="/portfolio-restaurant.jpg"
          alt="Restaurant"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
          <p className="text-[#d4a574] text-xs tracking-[0.3em] mb-2">LOCALLY SOURCED</p>
          <h1 className="text-3xl md:text-5xl font-serif mb-4">A Seasonal Journey</h1>
          <p className="text-white/70 text-sm max-w-md mx-auto mb-6 font-light">
            Experience the finest ingredients from local farms
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-[#d4a574] text-[#1a1a1a] px-8 py-3 text-sm tracking-wider font-medium">
              RESERVE A TABLE
            </button>
            <button className="border border-white/30 px-8 py-3 text-sm tracking-wider">
              VIEW MENU
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="grid grid-cols-3 divide-x divide-white/10 text-center py-6">
        <div>
          <p className="text-[#d4a574] text-lg font-serif">Tue - Sun</p>
          <p className="text-white/50 text-xs">5PM - 10PM</p>
        </div>
        <div>
          <p className="text-[#d4a574] text-lg font-serif">Downtown</p>
          <p className="text-white/50 text-xs">123 Main Street</p>
        </div>
        <div>
          <p className="text-[#d4a574] text-lg font-serif">Reservations</p>
          <p className="text-white/50 text-xs">(555) 123-4567</p>
        </div>
      </div>
    </div>
  );
}
