import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

export default async function Reservation({
  cabin,
}: {
  cabin: Record<string, any>;
}) {
  const [settings, bookedDates] = await Promise.all([getSettings(),getBookedDatesByCabinId(cabin.id)]);

  return (
    <div className="grid grid-cols-2 w-full min-h-[400px]">
      <DateSelector cabin={cabin} settings={settings} bookedDates={bookedDates} />
      <ReservationForm cabin={cabin} />
    </div>
  );
}
