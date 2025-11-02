/**
 * Script zum Abrufen der Zoho Organization ID
 * 
 * Verwendung:
 * 1. Setze die Umgebungsvariablen oder passe die Werte unten an
 * 2. Führe aus: node scripts/get-zoho-org-id.js
 */

const axios = require('axios');

// Deine Zoho Credentials (aus Netlify)
const REFRESH_TOKEN = '1000.5fe4a0fab9d36558777296372e0a0b2f.0b20665d1ad1b9ca1709e6d5334ac803';
const CLIENT_ID = '1000.WDS1JZH36XZVVP8DN7W1C5KO6NGWNJ';
const CLIENT_SECRET = 'f34ff9fd60bc995b8a517224beeacd6f26d316ff34';

async function getOrganizationId() {
  try {
    console.log('🔄 Hole Access Token...');
    
    // 1. Access Token mit Refresh Token generieren
    const tokenResponse = await axios.post(
      'https://accounts.zoho.eu/oauth/v2/token',
      new URLSearchParams({
        refresh_token: REFRESH_TOKEN,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'refresh_token'
      })
    );
    
    const accessToken = tokenResponse.data.access_token;
    console.log('✅ Access Token erhalten');
    
    console.log('\n🔄 Hole Organization ID...');
    
    // 2. Organization ID abrufen
    const orgResponse = await axios.get(
      'https://desk.zoho.eu/api/v1/organizations',
      {
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`
        }
      }
    );
    
    const organizations = orgResponse.data.data;
    
    if (organizations && organizations.length > 0) {
      console.log('\n✅ ORGANIZATION ID GEFUNDEN:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      organizations.forEach((org, index) => {
        console.log(`\n📋 Organization ${index + 1}:`);
        console.log(`   Name: ${org.name}`);
        console.log(`   ID: ${org.id}`);
        console.log(`   Domain: ${org.domain || 'N/A'}`);
      });
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('\n💡 Kopiere die ID und füge sie in Netlify als ZOHO_ORGANIZATION_ID ein!');
      console.log(`\n   ZOHO_ORGANIZATION_ID=${organizations[0].id}`);
      
      return organizations[0].id;
    } else {
      console.log('❌ Keine Organizations gefunden');
      return null;
    }
    
  } catch (error) {
    console.error('❌ Fehler:', error.response?.data || error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', JSON.stringify(error.response.data, null, 2));
    }
    return null;
  }
}

// Script ausführen
getOrganizationId();

