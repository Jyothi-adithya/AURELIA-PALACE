const fs = require('fs');

try {
  // 1. Simulate Email Dispatch in Backend
  let enquiryService = fs.readFileSync('C:/AURELIA PALACE/backend/src/services/enquiryService.js', 'utf8');
  
  // Inject console.log right before return enquiry
  if (!enquiryService.includes('[EMAIL DISPATCH]')) {
    enquiryService = enquiryService.replace('return enquiry;', 'console.log(`\\n📨 [EMAIL DISPATCH]: Simulated confirmation email sent to ${enquiry.email}`);\n    console.log(`🔔 [ADMIN NOTIFICATION]: New enquiry received from ${enquiry.name}\\n`);\n    return enquiry;');
    fs.writeFileSync('C:/AURELIA PALACE/backend/src/services/enquiryService.js', enquiryService);
    console.log('Updated enquiryService.js with email simulation log.');
  }

  // 2. Add loading="lazy" to frontend components (excluding hero sections)
  const filesToLazyLoad = [
    'C:/AURELIA PALACE/frontend/src/components/home/VenueIntro.jsx',
    'C:/AURELIA PALACE/frontend/src/pages/VenuePage.jsx',
    'C:/AURELIA PALACE/frontend/src/pages/EventsPage.jsx',
    'C:/AURELIA PALACE/frontend/src/pages/SpacesPage.jsx',
    'C:/AURELIA PALACE/frontend/src/pages/ServicesPage.jsx'
  ];

  filesToLazyLoad.forEach(file => {
    if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf8');
      
      // Regex to find <img> tags that DO NOT already have loading="lazy"
      // Note: This is a simple regex that works well for standardized JSX output.
      let updated = content.replace(/<img(?!.*?loading="lazy")([^>]*)>/g, '<img loading="lazy"$1>');
      
      if (content !== updated) {
        fs.writeFileSync(file, updated);
        console.log(`Added loading="lazy" to ${file}`);
      }
    }
  });

} catch (e) {
  console.error(e);
}
