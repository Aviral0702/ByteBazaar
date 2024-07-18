// Footer.jsx
import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-blue-500 py-10 text-white rounded-t-3xl">
      <div className="container mx-auto flex flex-wrap justify-center">
        <div className="w-full sm:w-1/2 md:w-1/4 text-center md:text-left mb-6 md:mb-0">
          <h5 className="uppercase font-bold mb-2">Company</h5>
          <ul>
            <li><a href="#" className="text-gray-200 hover:text-white">About Us</a></li>
            <li><a href="#" className="text-gray-200 hover:text-white">Careers</a></li>
            <li><a href="#" className="text-gray-200 hover:text-white">Press</a></li>
            <li><a href="#" className="text-gray-200 hover:text-white">Blog</a></li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 text-center md:text-left mb-6 md:mb-0">
          <h5 className="uppercase font-bold mb-2">Features</h5>
          <ul>
            <li><a href="#" className="text-gray-200 hover:text-white">Feature 1</a></li>
            <li><a href="#" className="text-gray-200 hover:text-white">Feature 2</a></li>
            <li><a href="#" className="text-gray-200 hover:text-white">Feature 3</a></li>
            <li><a href="#" className="text-gray-200 hover:text-white">Feature 4</a></li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 text-center md:text-left mb-6 md:mb-0">
          <h5 className="uppercase font-bold mb-2">Use Cases</h5>
          <ul>
            <li><a href="#" className="text-gray-200 hover:text-white">Use Case 1</a></li>
            <li><a href="#" className="text-gray-200 hover:text-white">Use Case 2</a></li>
            <li><a href="#" className="text-gray-200 hover:text-white">Use Case 3</a></li>
            <li><a href="#" className="text-gray-200 hover:text-white">Use Case 4</a></li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 text-center md:text-left mb-6 md:mb-0">
          <h5 className="uppercase font-bold mb-2">Help</h5>
          <ul>
            <li><a href="#" className="text-gray-200 hover:text-white">Support</a></li>
            <li><a href="#" className="text-gray-200 hover:text-white">FAQs</a></li>
            <li><a href="#" className="text-gray-200 hover:text-white">Contact Us</a></li>
            <li><a href="#" className="text-gray-200 hover:text-white">Terms of Service</a></li>
          </ul>
        </div>
        <div className="w-full text-center md:text-left mt-6 md:mt-0">
          <h5 className="uppercase font-bold mb-2">Follow Us</h5>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="text-gray-200 hover:text-white"><FaFacebook size={24} /></a>
            <a href="#" className="text-gray-200 hover:text-white"><FaInstagram size={24} /></a>
            <a href="#" className="text-gray-200 hover:text-white"><FaYoutube size={24} /></a>
            <a href="#" className="text-gray-200 hover:text-white"><FaLinkedin size={24} /></a>
            <a href="#" className="text-gray-200 hover:text-white"><FaTwitter size={24} /></a>
          </div>
        </div>
      </div>
      <div className="container mx-auto text-center mt-6">
        <p className="text-gray-200">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
}
