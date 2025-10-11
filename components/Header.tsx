import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
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
        </div>
      </div>
    </header>
  );
};

export default Header;
