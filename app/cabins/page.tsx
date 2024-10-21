import { Suspense } from "react";
import CabinsList from "@/app/_components/CabinsList";
import Spinner from "@/app/_components/Spinner";
import { CabinsCapacityFilter } from "../_components/CabinsCapacityFilter";

/**
 * revalidate after more seconds,
 * note that if time bigger than 0, after passing time,
 * first user is requested the page again and again see stale data
 * after first user request, new data will be render.
 */
// export const revalidate = 20;
// opt out DATA CACHE
// by zero value page build as dynamic page
// export const revalidate = 0;

export const metadata = {
  title: "cabins",
};

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, any>;
}) {
  // one way of disable 'DATA CACHE' that due to rendering page dynamically
  // noStore();

  const filter = searchParams.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <CabinsCapacityFilter />
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinsList capacityFilter={filter} />
      </Suspense>
    </div>
  );
}
