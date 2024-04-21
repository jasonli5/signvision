import logo from "@/public/icons/logo.png";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex items-center gap-12 w-full p-4 bg-slate-200 opacity-75 text-white z-10">
      <Link href="/" className="ml-4 z-10">
        <img src={logo.src} alt="Logo" className="opacity-100" />
      </Link>
      <nav className="text-black">
        <ul className="flex space-x-4 gap-4 font-bold">
          <li>
            <a href="/" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="/unit" className="hover:underline">
              Lessons
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
