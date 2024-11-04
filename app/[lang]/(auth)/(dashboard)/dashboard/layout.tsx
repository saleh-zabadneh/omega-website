import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logout } from "./actions";

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
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-lg font-semibold">Dashboard</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  href={`/${lang}/dashboard`}
                  className="text-foreground inline-flex items-center px-1 pt-1 border-b-2 border-primary text-sm font-medium"
                >
                  Super Admins
                </Link>
                <Link
                  href={`/${lang}/dashboard/devices`}
                  className="text-muted-foreground hover:text-foreground inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-muted text-sm font-medium"
                >
                  Devices
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <form action={logout}>
                <input type="hidden" name="lang" value={lang} />
                <Button type="submit" variant="ghost">
                  Logout
                </Button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
