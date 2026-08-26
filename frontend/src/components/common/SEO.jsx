import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description }) => {
  const defaultDescription = "A destination for celebrations that deserve more than a venue. Experience unparalleled luxury and meticulous service at Aurelia Palace.";
  
  return (
    <Helmet>
      <title>{title ? `${title} | Aurelia Palace` : 'Aurelia Palace | Luxury Event Venue'}</title>
      <meta name="description" content={description || defaultDescription} />
      {/* Open Graph Tags for Social Media */}
      <meta property="og:title" content={title ? `${title} | Aurelia Palace` : 'Aurelia Palace'} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
};

export default SEO;
