import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Brands from "@/components/Brands";
import Choice from "@/components/Choice";
import Review from "@/components/Review";
import { CheckCircle2, Users, Wrench, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "About Drvyn | Best Car Service Experts in Coimbatore",
  description: "Learn about Drvyn's mission to revolutionize car care in Coimbatore. We combine expert mechanics with tech-enabled convenience for a hassle-free experience.",
  openGraph: {
    title: "About Drvyn - Car Care Experts",
    description: "Coimbatore's most trusted car service network.",
    url: "https://drvyn.in/about",
    images: ["/og-image.jpg"],
  },
};

export default function AboutPage() {
  // JSON-LD for About Page
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Drvyn",
      "foundingDate": "2023",
      "description": "Drvyn is a technology-enabled car service provider in Coimbatore offering doorstep repair, detailing, and maintenance.",
      "areaServed": {
        "@type": "City",
        "name": "Coimbatore"
      }
    }
  };

  const stats = [
    { label: "Happy Customers", value: "1000+", icon: Users },
    { label: "Services Completed", value: "5000+", icon: Wrench },
    { label: "Years Experience", value: "10+", icon: Clock },
    { label: "Satisfaction Rate", value: "98%", icon: CheckCircle2 },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      
      <Navbar />
      
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gray-50 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-blue-100 skew-x-12 transform origin-top-right" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Revolutionizing Car Care in <span className="text-blue-600">Coimbatore</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                At Drvyn, we believe car maintenance should be transparent, convenient, and affordable. 
                We are not just mechanics; we are your car's best friends.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Story */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  {/* Placeholder image - ensure this exists or use a generic one */}
                  <Image 
                    src="/favicon2.png" 
                    alt="Mechanic working on car" 
                    width={600} 
                    height={400}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <p className="text-white font-medium text-lg">"Quality is not an act, it is a habit."</p>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
                <div className="w-20 h-1.5 bg-blue-600 rounded-full" />
                <p className="text-gray-600 leading-relaxed">
                  Drvyn started with a simple problem: <strong>Why is finding a trustworthy mechanic so hard?</strong> 
                  Hidden costs, delayed deliveries, and poor workmanship were the norms. We decided to change that.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Today, Drvyn is Coimbatore's most trusted tech-enabled car service platform. 
                  Whether you need a quick wash, a major engine repair, or insurance assistance, 
                  we bring the workshop experience to your fingertips (and often, your doorstep).
                </p>
                
                <ul className="space-y-3 pt-4">
                  {[
                    "100% Genuine Spare Parts",
                    "Transparent Pricing (No Hidden Costs)",
                    "Real-time Service Updates",
                    "Certified & Trained Technicians"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-700 font-medium">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-blue-600 py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, idx) => (
                <div key={idx} className="p-4">
                  <stat.icon className="w-10 h-10 mx-auto mb-4 opacity-80" />
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-blue-100 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us (Reusing your component) */}
        <Choice />

        {/* Brands We Serve (Reusing your component) */}
        <Brands />
      </main>

      <Footer />
    </>
  );
}