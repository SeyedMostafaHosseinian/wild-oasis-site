"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export function CabinsCapacityFilter() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const router = useRouter();

  const currentCapacityFilter = params.get("capacity") || "all";

  function handleFilter(filter: string) {
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const filterData = [
    {
      value: "all",
      label: "All cabins",
    },
    {
      value: "small",
      label: "2-3 guests",
    },
    {
      value: "medium",
      label: "4-7 guests",
    },
    {
      value: "large",
      label: "8-12 guests",
    },
  ];

  return (
    <div className="w-full flex gap-x-4 items-center justify-start border border-primary-800">
      {filterData.map((filter) => (
        <button
          className={`py-2 px-4 ${
            filter.value === currentCapacityFilter ? "bg-primary-800" : ""
          }`}
          onClick={() => handleFilter(filter.value)}
          key={filter.value}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
