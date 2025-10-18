import { Skeleton } from "./Skeleton";

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white h-[135px] w-[380px] sm:h-[300px] sm:w-[250px] rounded-[5px] flex sm:flex-col gap-2 justify-evenly p-2">
      
      {/* Image Skeleton */}
      <Skeleton className="h-[120px] w-[150px] sm:h-[130px] sm:w-[230px] bg-gray-400 p-[1px] rounded-[3px]" />

      {/* Text & Buttons */}
      <div className="flex flex-col gap-2 w-full">
        {/* Name and Price */}
        <div className="flex gap-2 h-[30px]">
          <Skeleton className="h-5 w-3/4 sm:h-6 sm:w-3/4 rounded-[3px]" />
          <Skeleton className="h-5 w-1/4 sm:h-6 sm:w-1/4 rounded-[3px]" />
        </div>

        {/* Description */}
        <Skeleton className="h-4 w-full sm:h-6 sm:w-full rounded-[3px] opacity-50" />

        {/* Buttons */}
        <div className="flex flex-col gap-1 mt-2">
          <Skeleton className="sm:h-[32px] w-full rounded-[5px]" />
          <Skeleton className="sm:h-[32px] w-full rounded-[5px]" />
        </div>
      </div>
    </div>
  );
};
