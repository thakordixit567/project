import { Plane, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Plane className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">VisaPath India</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your trusted partner for international student visa applications. Making dreams of studying abroad come true.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-blue-400 transition">Home</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-blue-400 transition">Services</a>
              </li>
              <li>
                <a href="#application-form" className="text-gray-400 hover:text-blue-400 transition">Apply Now</a>
              </li>
              <li>
                <a href="#track" className="text-gray-400 hover:text-blue-400 transition">Track Application</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Popular Destinations</h3>
            <ul className="space-y-2 text-gray-400">
              <li>United States</li>
              <li>United Kingdom</li>
              <li>Canada</li>
              <li>Australia</li>
              <li>Germany</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-5 w-5 text-blue-400" />
                <span>info@visapathindia.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-5 w-5 text-blue-400" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2025 VisaPath India. All rights reserved. | Empowering Indian students to achieve their global education dreams.
          </p>
        </div>
      </div>
    </footer>
  );
}
