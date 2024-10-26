import { UpdateReservationButton } from "@/app/_components/UpdateReservationButton";
import { updateReservationAction } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({
  params,
}: {
  params: { bookingId: string };
}) {
  const reservationId = params.bookingId;
  const reservationData = await getBooking(+reservationId);
  const cabinData = await getCabin(reservationData?.cabinId);

  async function handleUpdateProfile(formData: FormData) {
    "use server";
    await updateReservationAction(formData, +reservationId);
  }
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <form
        action={handleUpdateProfile}
        // action={updateReservationAction}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={reservationData?.numGuests}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from(
              { length: cabinData?.maxCapacity },
              (_, i) => i + 1
            ).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            defaultValue={reservationData.observations}
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <UpdateReservationButton />
        </div>
      </form>
    </div>
  );
}
