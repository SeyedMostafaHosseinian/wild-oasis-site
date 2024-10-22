import { auth } from "../_lib/auth";

export const metadata = {
  title: "account",
};

export default async function page() {
  const session = await auth();
  return <div>Hello {session?.user?.name}</div>;
}
