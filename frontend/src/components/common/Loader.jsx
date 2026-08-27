import { motion } from 'framer-motion';

const Loader = ({ fullScreen = false, text = '' }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Animated gold bar */}
      <div className="relative w-16 h-px bg-brand-stone overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 w-1/2 bg-brand-gold"
          animate={{ x: ['−100%', '300%'] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      {text && (
        <span className="label-xs text-brand-muted">{text}</span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-ivory">
        {content}
      </div>
    );
  }

  return (
    <div className="py-24 flex items-center justify-center w-full">
      {content}
    </div>
  );
};

export default Loader;
