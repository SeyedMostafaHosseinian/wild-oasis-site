import SideNavigation from "../_components/SideNavigation";

export const metadata = {
  title: {
    template: "%s | guest area",
  },
  description: "reserve cabins",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full">
      <SideNavigation />
      <div className="px-12">{children}</div>
    </div>
  );
}
