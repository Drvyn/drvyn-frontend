"use client";

import { useEffect, useState } from "react";
import { BsChevronDown, BsArrowLeft, BsSearch } from "react-icons/bs";
import SocialMedia from "@/components/SocialMedia";
import Image from 'next/image';

interface CarModel {
  name: string;
  imageUrl?: string;
  fuel_types?: string[];
}

interface CarBrand {
  brand: string;
  logoUrl?: string;
  models: CarModel[];
}

interface FuelType {
  type: string;
  url: string;
}

const Banner = () => {
  const [brands, setBrands] = useState<CarBrand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<CarBrand | null>(null);
  const [selectedModel, setSelectedModel] = useState<CarModel | null>(null);
  const [selectedFuel, setSelectedFuel] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<"form" | "brands" | "models" | "fuels" | "years">("form");
  const [brandSearch, setBrandSearch] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [fuelIcons, setFuelIcons] = useState<FuelType[]>([]);

  // Generate years from current year to 30 years back
  const years = Array.from({length: 30}, (_, i) => (new Date().getFullYear() - i).toString());

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        
        const [brandsRes, fuelsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/car/all-brands`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/car/fuel-icons`)
        ]);

        if (!brandsRes.ok || !fuelsRes.ok) throw new Error("Failed to fetch data");

        const [brandsData, fuelsData] = await Promise.all([
          brandsRes.json(),
          fuelsRes.json()
        ]);

        setBrands(brandsData);
        setFuelIcons(fuelsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);

  const filteredBrands = brands.filter(brand =>
    brand.brand.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const filteredModels = (selectedBrand?.models || []).filter(model =>
    model.name.toLowerCase().includes(modelSearch.toLowerCase())
  );

  const handleBrandSelect = (brand: CarBrand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setSelectedFuel(null);
    setSelectedYear(null);
    setCurrentView("models");
    setModelSearch("");
  };

  const handleModelSelect = (model: CarModel) => {
    setSelectedModel(model);
    setSelectedFuel(null);
    setSelectedYear(null);
    setCurrentView("fuels");
  };

  const handleFuelSelect = (fuel: string) => {
    setSelectedFuel(fuel);
    setCurrentView("years");
  };

  const handleYearSelect = (year: string) => {
    setSelectedYear(year);
    setCurrentView("form");
  };

  const handleBack = () => {
    if (currentView === "models") setCurrentView("brands");
    else if (currentView === "fuels") setCurrentView("models");
    else if (currentView === "years") setCurrentView("fuels");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBrand || !selectedModel || !selectedFuel || !selectedYear || !phone) {
      setError("Please fill all fields");
      return;
    }
  
    try {
      // Store form data
      sessionStorage.setItem('carFormData', JSON.stringify({
        brand: selectedBrand.brand,
        model: selectedModel.name,
        fuelType: selectedFuel,
        year: selectedYear,
        phone,
        image: selectedModel.imageUrl
      }));
  
      // Submit the request
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/car/submit-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: selectedBrand.brand,
          model: selectedModel.name,
          fuelType: selectedFuel,
          year: selectedYear,
          phone,
        }),
      });
  
      // Redirect only if submission succeeds
      window.location.href = '/service';
  
    } catch (err) {
      console.error("Submission error:", err);
      setError("Failed to submit. Please try again.");
    }
  };
  

if (isLoading) {
  return (
    <section className="relative flex items-center justify-center h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 font-sans">
      <div className="absolute inset-0 z-0 blur-sm opacity-30 bg-[url('/media/bg2.png')] bg-cover bg-center" />
      <div className="relative z-10 w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl px-8 py-12 flex flex-col items-center text-center">
        {/* Round video container */}
        <div className="mb-6 rounded-full h-28 w-28 overflow-hidden ">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="h-full w-full object-cover"
            onPlay={(e: React.SyntheticEvent<HTMLVideoElement>) => {
              const video = e.currentTarget;
              video.playbackRate = 2.0;
            }}
            onLoadedMetadata={(e: React.SyntheticEvent<HTMLVideoElement>) => {
              const video = e.currentTarget;
              video.playbackRate = 2.0;
              video.play().catch((error) => {
                console.error("Autoplay prevented:", error);
              });
            }}
          >
            <source src="/animation.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading car data</h2>
        <p className="text-sm text-gray-500">Please wait while we fetch the latest information for you.</p>
      </div>
    </section>
  );
}

  const renderImage = (url: string, alt: string, className = "") => (
    <div className={`w-16 h-16 flex items-center justify-center ${className}`}>
      <Image 
        src={`${process.env.NEXT_PUBLIC_API_URL}${url}`}
        alt={alt}
        width={124}  
        height={124}
        className="max-w-full max-h-full object-contain"
        onError={(e) => {
          (e.target as HTMLImageElement).style.visibility = 'hidden';
        }}
      />
    </div>
  );

  return (
    <section className="relative flex flex-col lg:flex-row min-h-[400px] lg:min-h-screen w-full overflow-hidden font-sans">
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('/media/bg2.png')" }} />

      <div className="relative top-0 lg:-top-7 z-20 w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-md sm:max-w-lg bg-white shadow-xl p-6 sm:p-8 md:p-10 rounded-xl">
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
              {error}
            </div>
          )}

          {currentView === "form" && (
            <form onSubmit={handleSubmit} className="w-full">
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-black leading-tight">
                Experience Premier Car Services In Coimbatore
              </h2>
              <p className="mb-6 text-gray-600 text-base sm:text-lg">
                Get instant quotes for your car service
              </p>

              <div className="mb-4 p-3 sm:p-4 border border-gray-300 rounded-lg flex justify-between items-center">
                <span className="font-medium">COIMBATORE</span>
                <BsChevronDown className="text-gray-500" />
              </div>

              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => setCurrentView("brands")}
                  className="flex items-center justify-between w-full border p-3 sm:p-4 border-gray-300 hover:border-gray-400 rounded-lg text-sm sm:text-base"
                >
                  <span>
                    {selectedBrand?.brand || "SELECT YOUR CAR"}
                    {selectedModel && ` ${selectedModel.name}`}
                    {selectedFuel && ` (${selectedFuel})`}
                    {selectedYear && ` - ${selectedYear}`}
                  </span>
                  <BsChevronDown className="text-gray-500" />
                </button>
              </div>  

              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="ENTER MOBILE NUMBER"
                className="w-full border border-gray-300 p-3 sm:p-4 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white cursor-pointer font-semibold py-3 sm:py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md text-base sm:text-lg"
                disabled={isLoading}
              >
                {isLoading ? "PROCESSING..." : "CHECK PRICES FOR FREE"}
              </button>

              <div className="mt-6 sm:mt-8 flex justify-between text-xs sm:text-sm text-gray-600">
                <div className="text-center">
                  <span className="text-green-600 font-bold text-xl sm:text-2xl">4.5</span>/5
                  <br />
                  <span className="text-xs">Based on 100+ Reviews</span>
                </div>
                <div className="text-center">
                  <span className="font-bold text-xl sm:text-2xl">1000+</span>
                  <br />
                  Happy Customers
                </div>
              </div>
            </form>
          )}

          {currentView === "brands" && (
            <div className="w-full">
              <div className="flex items-center mb-4">
                <button onClick={() => setCurrentView("form")} className="mr-2 text-gray-500 hover:text-black">
                  <BsArrowLeft size={20} />
                </button>
                <h2 className="text-lg sm:text-xl font-bold">Select Manufacturer</h2>
              </div>
              
              <div className="relative mb-4">
                <BsSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Brands"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base"
                />
              </div>
              
              <div className="h-64 overflow-y-auto">
                {filteredBrands.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">
                    {brands.length === 0 ? "No brands available" : "No matching brands found"}
                  </p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    {filteredBrands.map((brand) => (
                      <div 
                        key={brand.brand} 
                        className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer" 
                        onClick={() => handleBrandSelect(brand)}
                      >
                        {brand.logoUrl && renderImage(brand.logoUrl, brand.brand)}
                        <p className="text-xs sm:text-sm font-medium text-center mt-2">{brand.brand}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {currentView === "models" && selectedBrand && (
            <div className="w-full">
              <div className="flex items-center mb-4">
                <button onClick={handleBack} className="mr-2 text-gray-500 hover:text-black">
                  <BsArrowLeft size={20} />
                </button>
                <h2 className="text-lg sm:text-xl font-bold">Select Model</h2>
              </div>
              
              <div className="relative mb-4">
                <BsSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Models"
                  value={modelSearch}
                  onChange={(e) => setModelSearch(e.target.value)}
                  className="w-full pl-10 border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base"
                />
              </div>
              
              <div className="h-64 overflow-y-auto">
                {filteredModels.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">
                    {selectedBrand.models.length === 0 ? "No models available" : "No matching models found"}
                  </p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {filteredModels.map((model) => (
                      <div
                        key={model.name}
                        className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer"
                        onClick={() => handleModelSelect(model)}
                      >
                        {model.imageUrl && renderImage(model.imageUrl, model.name, "mb-3 w-20 h-20 sm:w-24 sm:h-24")}
                        <p className="font-medium text-center text-sm sm:text-base">{model.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {currentView === "fuels" && selectedModel?.fuel_types && (
            <div className="w-full">
              <div className="flex items-center mb-4">
                <button onClick={handleBack} className="mr-2 text-gray-500 hover:text-black">
                  <BsArrowLeft size={20} />
                </button>
                <h2 className="text-lg sm:text-xl font-bold">Select Fuel Type</h2>
              </div>
              
              <div className="h-64 overflow-y-auto">
                {selectedModel.fuel_types.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">No fuel types available</p>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {selectedModel.fuel_types.map((fuel) => {
                      const fuelIcon = fuelIcons.find(f => 
                        f.type.toLowerCase() === fuel.toLowerCase()
                      );
                      return (
                        <div
                          key={fuel}
                          className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer"
                          onClick={() => handleFuelSelect(fuel)}
                        >
                          {fuelIcon?.url && renderImage(fuelIcon.url, fuel, "mb-2")}
                          <p className="font-medium text-center text-sm sm:text-base">{fuel}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {currentView === "years" && (
            <div className="w-full">
              <div className="flex items-center mb-4">
                <button onClick={handleBack} className="mr-2 text-gray-500 hover:text-black">
                  <BsArrowLeft size={20} />
                </button>
                <h2 className="text-lg sm:text-xl font-bold">Select Manufacturing Year</h2>
              </div>
              
              <div className="h-64 overflow-y-auto">
                {years.length === 0 ? (
                  <p className="text-center py-8 text-gray-500">No years available</p>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    {years.map((year) => (
                      <button
                        key={year}
                        className={`p-3 border rounded-lg hover:border-blue-500 cursor-pointer text-center ${
                          selectedYear === year ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                        onClick={() => handleYearSelect(year)}
                      >
                        <p className="font-medium text-sm sm:text-base">{year}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <SocialMedia />
    </section>
  );
};

export default Banner;