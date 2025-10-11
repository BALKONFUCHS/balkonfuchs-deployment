import React, { useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
                <Image 
                  src="/images/Balkonfuchs-Logo_white.png" 
                  alt="BALKONFUCHS Logo" 
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="/kalkulator/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Kalkulator</a>
              <a href="/planer/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Planer</a>
              <a href="/express-angebot/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Angebot</a>
              <a href="/genehmigung/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Genehmigungscheck</a>
              <a href="/konfigurator/" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">Konfigurator</a>
            </nav>
            
            <div className="hidden md:flex items-center space-x-4">
              <a href="/gewerbe/" className="text-gray-300 hover:text-blue-400 font-medium transition-colors">Gewerbe</a>
              <a href="/partner-info-berlin/" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                Partner werden
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-orange-500 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 border-b border-gray-800 fixed top-16 left-0 right-0 z-40 shadow-lg">
          <div className="px-4 py-4 space-y-3 max-h-screen overflow-y-auto">
            <a 
              href="/kalkulator/" 
              className="block text-gray-300 hover:text-orange-500 font-medium py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kalkulator
            </a>
            <a 
              href="/planer/" 
              className="block text-gray-300 hover:text-orange-500 font-medium py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Planer
            </a>
            <a 
              href="/express-angebot/" 
              className="block text-gray-300 hover:text-orange-500 font-medium py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Express-Angebot
            </a>
            <a 
              href="/genehmigung/" 
              className="block text-gray-300 hover:text-orange-500 font-medium py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Genehmigungscheck
            </a>
            <a 
              href="/konfigurator/" 
              className="block text-gray-300 hover:text-orange-500 font-medium py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Konfigurator
            </a>
            <a 
              href="/gewerbe/" 
              className="block text-gray-300 hover:text-blue-400 font-medium py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gewerbe
            </a>
            <div className="pt-4 border-t border-gray-700">
              <a 
                href="/partner-info-berlin/" 
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-center block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Partner werden
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Burger Menu for Mobile */}
      <div className="md:hidden fixed top-20 right-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          aria-label="Navigation öffnen"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </>
  );
};

export default Header;
