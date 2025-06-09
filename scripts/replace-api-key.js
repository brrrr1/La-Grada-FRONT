const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../src/environments/environment.ts');
const envContent = fs.readFileSync(envPath, 'utf8');

const apiKeyMatch = envContent.match(/googleMapsApiKey:\s*['"]([^'"]+)['"]/);
if (!apiKeyMatch) {
  console.error('Could not find Google Maps API key in environment file');
  process.exit(1);
}

const apiKey = apiKeyMatch[1];

const indexPath = path.join(__dirname, '../src/index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');

indexContent = indexContent.replace('GOOGLE_MAPS_API_KEY', apiKey);

fs.writeFileSync(indexPath, indexContent);

console.log('Successfully replaced Google Maps API key in index.html'); 