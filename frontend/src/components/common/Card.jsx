import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Card = ({ 
  image, 
  title, 
  subtitle, 
  description, 
  to, 
  className,
  imageClassName
}) => {
  const content = (
    <>
      <div className="relative overflow-hidden aspect-[4/3]">
        <img 
          src={image} 
          alt={title}
          className={cn("w-full h-full object-cover transition-transform duration-700 hover:scale-105", imageClassName)}
          loading="lazy"
        />
      </div>
      <div className="p-6 md:p-8 bg-white flex flex-col flex-grow">
        {subtitle && (
          <span className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-2">
            {subtitle}
          </span>
        )}
        <h3 className="text-2xl font-serif text-brand-charcoal mb-3">
          {title}
        </h3>
        {description && (
          <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
            {description}
          </p>
        )}
        
        <span className="text-brand-charcoal text-sm font-medium uppercase tracking-wider group-hover:text-brand-gold transition-colors mt-auto flex items-center gap-2">
          Discover <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </>
  );

  const wrapperClasses = cn(
    "group flex flex-col overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-sm h-full",
    className
  );

  if (to) {
    return (
      <Link to={to} className={wrapperClasses}>
        {content}
      </Link>
    );
  }

  return (
    <div className={wrapperClasses}>
      {content}
    </div>
  );
};

export default Card;
