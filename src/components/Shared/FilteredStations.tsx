import { Station } from "@/lib/types";
import Card from "./Card";
import { SkeletonCard } from "./SkeletonCard";
import HorizontalCard from "./HorizontalCard";

const FilteredStations = ({
  stations,
  loading,
}: {
  stations: Station[];
  loading: boolean;
}) => {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
      {loading && (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      )}
      {stations.map((station, i) => (
        <HorizontalCard key={i} station={station} />
      ))}
    </div>
  );
};

export default FilteredStations;
