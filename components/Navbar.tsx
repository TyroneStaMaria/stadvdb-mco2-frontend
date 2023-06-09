import Link from "next/link";

const Navbar = () => {
  return (
    <header aria-label="Site Header" className="shadow-sm mb-10">
      <div className="mx-auto max-w-screen-xl p-4">
        <div className="flex items-center justify-between gap-4 lg:gap-10">
          <div className="flex lg:w-0 lg:flex-1">
            {/* <a href="#">
              <span className="sr-only">Logo</span>
              <span className="inline-block h-10 w-32 rounded-lg bg-gray-200"></span>
            </a> */}
          </div>

          <nav
            aria-label="Site Nav"
            className="hidden gap-8 text-sm font-medium md:flex"
          >
            <Link className="text-gray-500" href="/">
              View
            </Link>
            <Link className="text-gray-500" href="/add-movie">
              Insert
            </Link>
            <Link className="text-gray-500" href="/update-movie">
              Update
            </Link>
            <Link className="text-gray-500" href="/report">
              Report
            </Link>
          </nav>

          <div className="hidden flex-1 items-center justify-end gap-4 sm:flex"></div>

          <div className="lg:hidden">
            <button
              className="rounded-lg bg-gray-100 p-2 text-gray-600"
              type="button"
            >
              <span className="sr-only">Open menu</span>
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
