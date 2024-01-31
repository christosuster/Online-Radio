import { Station } from "@/lib/types";
import Card from "./Card";
import { SkeletonCard } from "./SkeletonCard";

const FilteredStations = ({
  stations,
  loading,
}: {
  stations: Station[];
  loading: boolean;
}) => {
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
      {stations.map((station, i) => (
        <Card key={i} station={station} />
      ))}
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
    </div>
  );
};

export default FilteredStations;
