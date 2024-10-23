"use server";

import { User } from "next-auth";
import { auth, signIn, signOut } from "./auth";
import { getBookings, updateGuest } from "./data-service";
import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { NextResponse } from "next/server";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuestAction(formData: FormData) {
  const [nationality, countryFlag] = (
    formData.get("nationality") as string
  ).split("%");
  const nationalID = formData.get("nationalID");
  const session = await auth();

  await updateGuest(
    (session?.user as User & { guestId: number })["guestId"] as number,
    { nationality, countryFlag, nationalID }
  );
  revalidatePath("/account/profile");
}

export async function deleteReservationAction(id: number) {
  const session = await auth();
  const guestId = (session?.user as User & { guestId: number }).guestId;

  const userReservations = await getBookings(guestId);
  const userReservationIds = userReservations.map((r) => r.id);

  // check if reservation is should be for user
  if (!userReservationIds.includes(id))
    throw new Error("your are not allowed to delete this booking");

  const { data, error } = await supabase.from("bookings").delete().eq("id", id);
  revalidatePath("/account/reservations");

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
}
