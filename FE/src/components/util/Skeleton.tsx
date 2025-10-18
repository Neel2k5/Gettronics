export const Skeleton = ({ className }: { className?: string }) => {
  return <div className={`bg-gray-300 animate-pulse ${className}`} />;
};
