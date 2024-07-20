// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-blue-500 py-10 text-white rounded-t-3xl">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center md:justify-between">
          <div className="w-full sm:w-1/2 md:w-1/4 text-center md:text-left mb-6 md:mb-0">
            <h5 className="uppercase font-bold mb-2">Company</h5>
            <ul>
              <li><Link to="/about-us" className="text-gray-200 hover:text-white">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-200 hover:text-white">Careers</Link></li>
              <li><Link to="/press" className="text-gray-200 hover:text-white">Press</Link></li>
              <li><Link to="/blog" className="text-gray-200 hover:text-white">Blog</Link></li>
            </ul>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 text-center md:text-left mb-6 md:mb-0">
            <h5 className="uppercase font-bold mb-2">Help</h5>
            <ul>
              <li><Link to="/support" className="text-gray-200 hover:text-white">Support</Link></li>
              <li><Link to="/faq" className="text-gray-200 hover:text-white">FAQs</Link></li>
              <li><Link to="/about" className="text-gray-200 hover:text-white">About Us</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-200 hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center md:justify-start space-x-4 mt-6 md:mt-0">
          <Link to="/facebook" className="text-gray-200 hover:text-white"><FaFacebook size={24} /></Link>
          <Link to="/instagram" className="text-gray-200 hover:text-white"><FaInstagram size={24} /></Link>
          <Link to="/youtube" className="text-gray-200 hover:text-white"><FaYoutube size={24} /></Link>
          <Link to="/linkedin" className="text-gray-200 hover:text-white"><FaLinkedin size={24} /></Link>
          <Link to="/twitter" className="text-gray-200 hover:text-white"><FaTwitter size={24} /></Link>
        </div>
        <div className="container mx-auto text-center mt-6">
          <p className="text-gray-200">© {new Date().getFullYear()} ByteBazaar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
