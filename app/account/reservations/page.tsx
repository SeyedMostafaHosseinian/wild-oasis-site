import { ReservationList } from "@/app/_components/ReservationList";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";
import { User } from "next-auth";
import Link from "next/link";

export const metadata = {
  title: "your reservations",
};
export default async function Page() {
  const session = await auth();
  const bookings: Record<string, any>[] = await getBookings(
    (session?.user as User & { guestId: number }).guestId as number
  );

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
