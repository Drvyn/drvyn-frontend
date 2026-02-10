import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ChevronRight, Shield, Clock, Star, ArrowRight } from "lucide-react";
import { ViewFadeInUp, StaggeredContainer, FadeInUp } from "@/components/ClientAnimations";

export const metadata: Metadata = {
  title: "Car Services in Coimbatore | Drvyn",
  description: "Explore our wide range of car services in Coimbatore. From Periodic Maintenance to AC Repair, Detailing, and Car Wash. Expert care for your vehicle.",
};

const services = [
  {
    title: "Periodic Car Services",
    description: "Keep your car running like new with our comprehensive maintenance packages.",
    image: "/serviceCategories/PeriodicCarServices.png",
    slug: "Periodic Car Services",
    color: "blue"
  },
  {
    title: "AC Service & Repair",
    description: "Stay cool with expert AC inspection, gas top-up, and cooling system repair.",
    image: "/serviceCategories/ACService&Repair.png",
    slug: "AC Service & Repair",
    color: "sky"
  },
  {
    title: "Denting & Painting",
    description: "Restore your car's look with high-quality paint and precision dent removal.",
    image: "/serviceCategories/Denting&Painting.png",
    slug: "Denting & Painting",
    color: "red"
  },
  {
    title: "Detailing Services",
    description: "Premium interior and exterior detailing, ceramic coating, and polishing.",
    image: "/serviceCategories/DetailingServices.png",
    slug: "Detailing Services",
    color: "purple"
  },
  {
    title: "Car Inspections",
    description: "Comprehensive 100+ point inspection for pre-owned cars or long trips.",
    image: "/serviceCategories/CarInspections.png",
    slug: "Car Inspections",
    color: "green"
  },
  {
    title: "Insurance Claims",
    description: "Hassle-free insurance assistance and accidental repair support.",
    image: "/serviceCategories/InsuranceClaims.png",
    slug: "Insurance Claims",
    color: "indigo"
  },
  {
    title: "Car Wash",
    description: "Professional deep cleaning services to keep your car shining.",
    image: "/serviceCategories/SOSService.png",
    slug: "Car Wash",
    color: "cyan"
  }
];

export default function ServicesHubPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ViewFadeInUp className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Our Professional <span className="text-blue-600">Services</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide a complete range of car care solutions in Coimbatore using genuine parts and expert technicians.
            </p>
          </ViewFadeInUp>

          <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <FadeInUp key={index}>
                <Link 
                  href={`/service?category=${encodeURIComponent(service.slug)}`}
                  className="group block bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                    <div className="bg-blue-50 text-blue-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center text-sm font-semibold text-blue-600">
                    View Packages <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              </FadeInUp>
            ))}
          </StaggeredContainer>

          {/* Trust Section */}
          <ViewFadeInUp className="mt-24 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold mb-2">Service Warranty</h4>
                <p className="text-gray-600 text-sm">Every service comes with a dedicated warranty for peace of mind.</p>
              </div>
              <div>
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-bold mb-2">Genuine Spares</h4>
                <p className="text-gray-600 text-sm">We use only certified and high-quality parts for your vehicle.</p>
              </div>
              <div>
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-bold mb-2">Timely Delivery</h4>
                <p className="text-gray-600 text-sm">Quick turnaround time without compromising on quality.</p>
              </div>
            </div>
          </ViewFadeInUp>
        </div>
      </main>
      <Footer />
    </>
  );
}