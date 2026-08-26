const fs = require('fs');

try {
  // 1. Update Prisma Schema
  let schema = fs.readFileSync('C:/AURELIA PALACE/backend/prisma/schema.prisma', 'utf8');
  schema = schema.replace(/model GalleryItem \{[\s\S]*?\}/, match => match.replace('}', '  @@index([category])\n}'));
  schema = schema.replace(/model Enquiry \{[\s\S]*?\}/, match => match.replace('}', '  @@index([status])\n}'));
  schema = schema.replace(/model Service \{[\s\S]*?\}/, match => match.replace('}', '  @@index([category])\n}'));
  fs.writeFileSync('C:/AURELIA PALACE/backend/prisma/schema.prisma', schema);
  console.log('Updated schema.prisma');

  // 2. Update Navbar (Aria labels)
  let navbar = fs.readFileSync('C:/AURELIA PALACE/frontend/src/components/layout/Navbar.jsx', 'utf8');
  navbar = navbar.replace('<button \n            className="lg:hidden text-brand-charcoal p-2"\n            onClick={() => setIsOpen(!isOpen)}\n          >', '<button \n            className="lg:hidden text-brand-charcoal p-2"\n            onClick={() => setIsOpen(!isOpen)}\n            aria-label="Toggle navigation menu"\n            aria-expanded={isOpen}\n          >');
  fs.writeFileSync('C:/AURELIA PALACE/frontend/src/components/layout/Navbar.jsx', navbar);
  console.log('Updated Navbar.jsx');

  // 3. Update AdminLayout (Aria labels)
  let admin = fs.readFileSync('C:/AURELIA PALACE/frontend/src/layouts/AdminLayout.jsx', 'utf8');
  admin = admin.replace('<button onClick={() => setSidebarOpen(!sidebarOpen)}>', '<button onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle sidebar" aria-expanded={sidebarOpen}>');
  fs.writeFileSync('C:/AURELIA PALACE/frontend/src/layouts/AdminLayout.jsx', admin);
  console.log('Updated AdminLayout.jsx');

  // 4. Update GalleryPage (Aria label + Escape key)
  let gallery = fs.readFileSync('C:/AURELIA PALACE/frontend/src/pages/GalleryPage.jsx', 'utf8');
  if (!gallery.includes('Escape')) {
    const hook = `\n  useEffect(() => {\n    const handleKeyDown = (e) => {\n      if (e.key === 'Escape' && selectedImage) setSelectedImage(null);\n    };\n    window.addEventListener('keydown', handleKeyDown);\n    return () => window.removeEventListener('keydown', handleKeyDown);\n  }, [selectedImage]);\n`;
    gallery = gallery.replace('const [selectedImage, setSelectedImage] = useState(null);', 'const [selectedImage, setSelectedImage] = useState(null);' + hook);
    gallery = gallery.replace("import { useState, useMemo } from 'react';", "import { useState, useMemo, useEffect } from 'react';");
    
    // Add aria-label to close button
    gallery = gallery.replace('<button \n            className="absolute top-6 right-6 text-white/70 hover:text-white"\n            onClick={() => setSelectedImage(null)}\n          >', '<button \n            className="absolute top-6 right-6 text-white/70 hover:text-white"\n            onClick={() => setSelectedImage(null)}\n            aria-label="Close lightbox"\n          >');
    fs.writeFileSync('C:/AURELIA PALACE/frontend/src/pages/GalleryPage.jsx', gallery);
    console.log('Updated GalleryPage.jsx');
  }

  // 5. Update App.jsx (HelmetProvider)
  let app = fs.readFileSync('C:/AURELIA PALACE/frontend/src/App.jsx', 'utf8');
  if (!app.includes('HelmetProvider')) {
    app = app.replace("import { BrowserRouter", "import { HelmetProvider } from 'react-helmet-async';\nimport { BrowserRouter");
    app = app.replace('<Router>', '<HelmetProvider>\n    <Router>');
    app = app.replace('</Router>', '</Router>\n    </HelmetProvider>');
    fs.writeFileSync('C:/AURELIA PALACE/frontend/src/App.jsx', app);
    console.log('Updated App.jsx');
  }

  // 6. Update HomePage.jsx (Inject SEO)
  let home = fs.readFileSync('C:/AURELIA PALACE/frontend/src/pages/HomePage.jsx', 'utf8');
  if (!home.includes('<SEO')) {
    home = home.replace("import Button from '../components/common/Button';", "import Button from '../components/common/Button';\nimport SEO from '../components/common/SEO';");
    home = home.replace("return (\n    <div>", "return (\n    <div>\n      <SEO title=\"Luxury Event Venue\" description=\"Experience unparalleled luxury and meticulous service at Aurelia Palace.\" />");
    fs.writeFileSync('C:/AURELIA PALACE/frontend/src/pages/HomePage.jsx', home);
    console.log('Updated HomePage.jsx');
  }
} catch (e) {
  console.error(e);
}
