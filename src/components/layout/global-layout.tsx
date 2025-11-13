import { Link, Outlet } from "react-router";
import { SunIcon } from "lucide-react";
import logo from "@/assets/react.svg";
import defaultAvatar from "@/assets/default-avatar.png";

function GlobalLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="h-15 border-b">
        <div className="m-auto flex h-full max-w-175 justify-between px-4">
          <Link to={"/"} className="flex items-center gap-2">
            <img src={logo} className="h-5" alt="logo" />
            <div className="font-bold">Supabase 로그</div>
          </Link>
          <div className="flex items-center gap-5">
            <div className="hover:bg-muted cursor-pointer rounded-full p-2">
              <SunIcon />
            </div>
            <img src={defaultAvatar} className="h-6" />
          </div>
        </div>
      </header>
      <main className="m-auto w-full max-w-175 flex-1 border-x px-4 py-6">
        <Outlet />
      </main>
      <footer className="text-muted-foreground border-t py-10 text-center">
        @Supabase-log
      </footer>
    </div>
  );
}

export default GlobalLayout;
