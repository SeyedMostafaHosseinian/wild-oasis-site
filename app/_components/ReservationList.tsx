"use client";
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservationAction } from "../_lib/actions";

export function ReservationList({ bookings }: { bookings: any[] }) {
  const [optimisticState, deleteOptimistic] = useOptimistic(
    bookings,
    (curBookings: any[], bookingId: number) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );
  async function handleDeleteReservation(bookingId: number) {
    deleteOptimistic(bookingId);
    await deleteReservationAction(bookingId);
  }
  return (
    <ul className="space-y-6">
      {optimisticState.map((booking) => (
        <ReservationCard
          onDelete={handleDeleteReservation}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}
