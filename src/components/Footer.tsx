{/* import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, Wrench, Car, Shield, Battery } from "lucide-react";
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube } from "react-icons/fi";           

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const carServices = [
    { name: "Oil Change", icon: <Wrench className="h-4 w-4" /> },
    { name: "Tire Service", icon: <Car className="h-4 w-4" /> },
    { name: "Brake Repair", icon: <Shield className="h-4 w-4" /> },
    { name: "Battery Check", icon: <Battery className="h-4 w-4" /> },
    { name: "AC Service", icon: <Wrench className="h-4 w-4" /> },
  ];

  const workingHours = [
    { day: "Mon-Fri", hours: "9:00 AM - 7:00 PM" },
    { day: "Sunday", hours: "Closed" }
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto px-6 lg:px-8 py-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/favicon2.png"
                alt="Drvyn Logo"
                width={70}   
                height={70}  
                className="object-contain rounded-full mr-2"
                />

              <span className="text-2xl font-bold text-gray-900">DRVYN</span>
            </div>
            <div className="space-y-3">
             <p className="text-sm text-gray-600 mb-4">
                Premium car care, powered by certified experts and genuine parts. Drvyn brings you hassle-free service, repairs, and insurance support with trusted workshops and smart technology across India.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-blue-600 transition-colors" aria-label="Facebook">
                <FiFacebook  className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-600 transition-colors" aria-label="Twitter">
                <FiTwitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-600 transition-colors" aria-label="Instagram">
                <FiInstagram  className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-600 transition-colors" aria-label="YouTube">
                <FiYoutube  className="h-5 w-5" />
              </Link>
            </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-900 uppercase tracking-wider border-b pb-2">Explore</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600 hover:underline flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Home</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600 hover:underline flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Services</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600 hover:underline flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>About Us</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600 hover:underline flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Pricing</Link></li>
              <li><Link href="#" className="text-sm text-gray-600 hover:text-blue-600 hover:underline flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-900 uppercase tracking-wider border-b pb-2">Our Services</h3>
            <ul className="space-y-3">
              {carServices.map((service) => (
                <li key={service.name}>
                  <Link href="#" className="text-sm text-gray-600 hover:text-blue-600 hover:underline flex items-center">
                    <span className="text-blue-600 mr-2">{service.icon}</span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-900 uppercase tracking-wider border-b pb-2">Stay Connected</h3>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <a href="tel:+15551234567" className="hover:text-blue-600">+91 98402 77116</a>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                <a href="mailto:contact@autoelite.com" className="hover:text-blue-600">drvyn.in@gmail.com</a>
              </div>
              <div className="flex items-start text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>Sokkamputhur Rd, Shanmuga Nagar, Selvapuram North, Coimbatore, Ponnaiah Raja Puram, Tamil Nadu 641039</span>
              </div>
              <div className="flex items-start text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  {workingHours.map((item) => (
                    <div key={item.day} className="flex">
                      <span className="w-16">{item.day}:</span>
                      <span>{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500 mb-3 md:mb-0">
              © {currentYear} AutoElite®. All rights reserved. | Reg. No: 12345678
            </p>
            
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link href="#" className="text-xs text-gray-500 hover:text-blue-600 hover:underline">
                Terms of Service
              </Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-blue-600 hover:underline">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-blue-600 hover:underline">
                Cookie Policy
              </Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-blue-600 hover:underline">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

*/}