const axios = require('axios');
const FormData = require('form-data');

/**
 * NETLIFY FUNCTION: SEND PDF TO ZOHO DESK
 * 
 * Diese Funktion empfängt ein PDF, speichert es temporär und hängt es an ein Zoho Desk Ticket an.
 */

exports.handler = async (event, context) => {
  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // OPTIONS Request für CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Nur POST erlauben
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Method not allowed. Use POST.',
      }),
    };
  }

  try {
    const { email, metadata } = JSON.parse(event.body || '{}');
    
    console.log('=== SEND PDF REQUEST ===');
    console.log('Email:', email);
    console.log('Metadata:', metadata);
    
    // TODO: PDF an Zoho Desk anheften
    // 1. PDF aus FormData extrahieren
    // 2. An Zoho Desk Ticket anhängen
    // 3. Ticket-ID aus metadata verwenden
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'PDF erfolgreich gesendet'
      }),
    };
  } catch (error) {
    console.error('Fehler beim Senden des PDFs:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message,
      }),
    };
  }
};

