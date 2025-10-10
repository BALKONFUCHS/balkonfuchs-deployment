import React from 'react';
import { Mail, Shield, Lock, Award, CheckCircle } from 'lucide-react';

const Footer = () => {
  return (
    <>
      {/* Main Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-orange-500 mb-4">🦊 BALKONFUCHS</div>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Deutschlands führende Plattform für Balkon-Projekte. Über 850 zufriedene Kunden vertrauen uns.
              </p>
              <div className="flex space-x-4">
                <a href="mailto:post@balkonfuchs.de" className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                  <Mail className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Service</h4>
              <ul className="space-y-2">
                <li><a href="/kalkulator/" className="text-gray-400 hover:text-orange-400 transition-colors">Balkon-Kalkulator</a></li>
                <li><a href="/planer/" className="text-gray-400 hover:text-orange-400 transition-colors">Balkon-Planer</a></li>
                <li><a href="/express-angebot/" className="text-gray-400 hover:text-orange-400 transition-colors">Angebot</a></li>
                <li><a href="/genehmigung/" className="text-gray-400 hover:text-orange-400 transition-colors">Genehmigungscheck</a></li>
                <li><a href="/bauzeit-planung/" className="text-gray-400 hover:text-orange-400 transition-colors">Baustart Rechner</a></li>
                <li><a href="/konfigurator/" className="text-gray-400 hover:text-orange-400 transition-colors">Konfigurator</a></li>
                <li><a href="/erfahrungen/" className="text-gray-400 hover:text-orange-400 transition-colors">Erfahrungen</a></li>
                <li><a href="/galerie/" className="text-gray-400 hover:text-orange-400 transition-colors">Galerie</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Wissen</h4>
              <ul className="space-y-2">
                <li><a href="/news/" className="text-gray-400 hover:text-orange-400 transition-colors">News</a></li>
                <li><a href="/foerderung/" className="text-gray-400 hover:text-orange-400 transition-colors">Förderung</a></li>
                <li><a href="/baurecht-balkon/" className="text-gray-400 hover:text-orange-400 transition-colors">Baurecht & Genehmigungen</a></li>
                <li><a href="/ratgeber/" className="text-gray-400 hover:text-orange-400 transition-colors">Ratgeber</a></li>
                <li><a href="/lexikon/" className="text-gray-400 hover:text-orange-400 transition-colors">Lexikon</a></li>
                <li><a href="/faq/" className="text-gray-400 hover:text-orange-400 transition-colors">FAQ</a></li>
                <li><a href="/feedback/" className="text-gray-400 hover:text-orange-400 transition-colors">Feedback</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Unternehmen</h4>
              <ul className="space-y-2">
                <li><a href="/about/" className="text-gray-400 hover:text-orange-400 transition-colors">Über uns</a></li>
                <li><a href="/karriere/" className="text-gray-400 hover:text-orange-400 transition-colors">Karriere</a></li>
                <li><a href="/partner-werden/" className="text-gray-400 hover:text-orange-400 transition-colors">Partnerbewerbung</a></li>
                <li><a href="/partner-info/" className="text-gray-400 hover:text-orange-400 transition-colors">Partner Vorabinfos</a></li>
                <li><a href="/kontakt/" className="text-gray-400 hover:text-orange-400 transition-colors">Kontakt</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Sub Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-start space-x-6">
              <a href="/impressum/" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Impressum</a>
              <a href="/datenschutz/" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Datenschutz</a>
              <a href="/agb/" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">AGB</a>
              <a href="/disclaimer/" className="text-gray-400 hover:text-orange-400 transition-colors text-sm">Haftungsausschluss</a>
            </div>

            {/* Trust Symbols */}
            <div className="flex flex-wrap justify-center md:justify-end items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-400">
                <Shield className="w-4 h-4 text-red-400" />
                <span className="text-sm">Geprüfte Partner</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm">DSGVO konform</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="text-sm">4.8/5 Sterne</span>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2025 BALKONFUCHS GmbH. Alle Rechte vorbehalten.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
