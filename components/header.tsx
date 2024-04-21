export const Header = () => {
  return (
    <header className="flex items-center justify-between w-full p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">My App</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:underline">
              About
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
