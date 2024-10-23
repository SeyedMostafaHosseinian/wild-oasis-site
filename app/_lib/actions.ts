"use server";

import { User } from "next-auth";
import { auth, signIn, signOut } from "./auth";
import { updateGuest } from "./data-service";

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

  console.log(formData.get("nationality"));
  // console.log(session?.user?.guestId);
  await updateGuest(
    (session?.user as User & { guestId: number })["guestId"] as number,
    { nationality, countryFlag, nationalID }
  );
}
