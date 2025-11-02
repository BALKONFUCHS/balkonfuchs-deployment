import React, { useState, useEffect } from 'react';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  label?: string;
  hintText?: string;
}

const COUNTRY_CODES = [
  { code: '+49', country: 'Deutschland', flag: '🇩🇪', example: '+49 30 12345 für Berlin' },
  { code: '+43', country: 'Österreich', flag: '🇦🇹', example: '+43 1 123456 für Wien' },
  { code: '+41', country: 'Schweiz', flag: '🇨🇭', example: '+41 44 123456 für Zürich' }
];

export default function PhoneInput({ 
  value, 
  onChange, 
  placeholder, 
  required = false,
  className = '',
  label,
  hintText
}: PhoneInputProps) {
  const [selectedCountryCode, setSelectedCountryCode] = useState('+49');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Parse existing value to extract country code and number
  useEffect(() => {
    if (value) {
      const codeMatch = value.match(/^(\+\d{1,4})\s?(.+)$/);
      if (codeMatch) {
        const code = codeMatch[1];
        const number = codeMatch[2];
        if (COUNTRY_CODES.find(c => c.code === code)) {
          setSelectedCountryCode(code);
          setPhoneNumber(number);
        } else {
          // If country code not in list, default to +49 and use full value as number
          setSelectedCountryCode('+49');
          setPhoneNumber(value.startsWith('+') ? value.replace(/^\+\d{1,4}\s?/, '') : value);
        }
      } else {
        // No country code, assume +49
        setSelectedCountryCode('+49');
        setPhoneNumber(value);
      }
    } else {
      setSelectedCountryCode('+49');
      setPhoneNumber('');
    }
  }, [value]);

  const handleCountryCodeChange = (code: string) => {
    setSelectedCountryCode(code);
    const fullNumber = phoneNumber ? `${code} ${phoneNumber}` : code;
    onChange(fullNumber);
  };

  const handlePhoneNumberChange = (number: string) => {
    // Remove country code if user types it
    const cleanNumber = number.replace(/^\+\d{1,4}\s?/, '');
    setPhoneNumber(cleanNumber);
    const fullNumber = cleanNumber ? `${selectedCountryCode} ${cleanNumber}` : selectedCountryCode;
    onChange(fullNumber);
  };

  const selectedCountry = COUNTRY_CODES.find(c => c.code === selectedCountryCode);
  const defaultHintText = hintText || `Bitte mit Ländervorwahl beginnen: z.B. ${selectedCountry?.example || '+49 30 12345'}`;

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-200 mb-2">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <div className="flex gap-2">
        {/* Country Code Dropdown */}
        <select
          value={selectedCountryCode}
          onChange={(e) => handleCountryCodeChange(e.target.value)}
          className="px-3 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none cursor-pointer"
          style={{ minWidth: '120px' }}
        >
          {COUNTRY_CODES.map((country) => (
            <option key={country.code} value={country.code} className="bg-gray-800">
              {country.flag} {country.code}
            </option>
          ))}
        </select>
        
        {/* Phone Number Input */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => handlePhoneNumberChange(e.target.value)}
          placeholder={placeholder || "123 456789"}
          required={required}
          className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>
      {defaultHintText && (
        <p className="text-xs text-gray-400 mt-1">
          {defaultHintText}
        </p>
      )}
    </div>
  );
}

