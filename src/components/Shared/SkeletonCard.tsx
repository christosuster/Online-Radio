import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="grid grid-cols-5 my-4 ">
      <Skeleton className="h-20 w-20 mx-auto rounded-full col-span-2" />
      <div className=" col-span-3 flex flex-col gap-3">
        <Skeleton className="h-6 w-4/5 " />
        <Skeleton className="h-3 w-3/4 " />
        <div className="flex gap-3 flex-wrap">
          <Skeleton className="h-3 w-10 " />
          <Skeleton className="h-3 w-14" />
          <Skeleton className="h-3 w-9 " />
          <Skeleton className="h-3 w-7 " />
        </div>
      </div>
    </div>
  );
}
