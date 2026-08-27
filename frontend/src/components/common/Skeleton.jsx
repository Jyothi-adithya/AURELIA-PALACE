// Skeleton loader for cards / image areas
const Skeleton = ({ className = '' }) => (
  <div className={`skeleton ${className}`} aria-hidden="true" />
);

// Card skeleton
export const CardSkeleton = () => (
  <div className="flex flex-col bg-white overflow-hidden">
    <Skeleton className="aspect-[4/3] w-full" />
    <div className="p-6 space-y-3">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  </div>
);

// Stat card skeleton
export const StatSkeleton = () => (
  <div className="bg-white p-6 flex items-center gap-4">
    <Skeleton className="w-14 h-14 rounded-full" />
    <div className="space-y-2 flex-1">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-8 w-16" />
    </div>
  </div>
);

export default Skeleton;
