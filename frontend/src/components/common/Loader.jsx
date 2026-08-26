import { Loader2 } from 'lucide-react';

const Loader = ({ fullScreen = false, text = "Loading..." }) => {
  const content = (
    <div className="flex flex-col items-center justify-center text-brand-gold gap-4">
      <Loader2 className="animate-spin w-10 h-10" />
      <span className="font-serif text-xl text-brand-charcoal">{text}</span>
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
    <div className="py-20 flex items-center justify-center w-full">
      {content}
    </div>
  );
};

export default Loader;
