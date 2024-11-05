import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardNav from "./dashboard-nav";

export default function DashboardLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");

  if (!userCookie) {
    redirect(`/${lang}/login`);
  }

  const user = JSON.parse(userCookie.value);

  // Check if the cookie has expired
  if (new Date(user.expiresAt) < new Date()) {
    redirect(`/${lang}/login`);
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav lang={lang} />
      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
