import CabinCard from "./CabinCard";
import { getCabins } from "../_lib/data-service";

export default async function CabinsList({
  capacityFilter,
}: {
  capacityFilter: string;
}) {
  let cabins: Record<string, any>[] = await getCabins();

  cabins = cabins.filter((cabin) => {
    const { maxCapacity } = cabin;

    switch (capacityFilter) {
      case "all":
        return true;
      case "small":
        return maxCapacity <= 3;
      case "medium":
        return maxCapacity >= 4 && maxCapacity <= 7;
      case "large":
        return maxCapacity >= 8 && maxCapacity <= 12;
    }
  });

  return (
    <>
      {cabins.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {cabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </>
  );
}
