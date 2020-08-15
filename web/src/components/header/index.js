import { h } from "preact";
import { Link } from "preact-router/match";

const Icon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" class="inbox w-auto h-8">
    <path
      fill-rule="evenodd"
      d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
      clip-rule="evenodd"
    ></path>
  </svg>
);

const HeaderItem = ({ to, children }) => (
  <Link
    href={to}
    class="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150"
    activeClassName="text-gray-900"
  >
    {children}
  </Link>
);

const HeaderButton = ({ to, children }) => (
  <Link
    href={to}
    class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
  >
    {children}
  </Link>
);

const Header = ({ children }) => (
  <div class="relative bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex justify-between items-center border-b-2 border-gray-100 py-4 space-x-10">
        <a href="/" class="flex">
          <Icon />
        </a>
        <HeaderButton to="/create">투표 만들기</HeaderButton>
      </div>
    </div>
  </div>
);

export default Header;
