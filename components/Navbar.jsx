'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import PropertyPal from '@/assets/images/PropertyPal.png';
import profileDefault from '@/assets/images/profile.png';
import { FaGoogle } from 'react-icons/fa';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import UnreadMessageCount from './UnreadMessageCount';

const Navbar = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image || profileDefault;
  const [providers, setProviders] = useState(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  useEffect(() => {
    const setAuthProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    setAuthProviders();
  }, []);

  return (
    <nav className="bg-orange-500 border-b border-orange-300 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center md:justify-start md:items-center">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <Image
                src={PropertyPal}
                alt="PropertyPal"
                className="h-16 w-auto"
                width={80}
                height={80}
              />
              <span className="hidden md:block text-white text-3xl font-extrabold ml-2">
                PropertyPal
              </span>
            </Link>
            <div className="hidden md:ml-6 md:block">
              <div className="flex space-x-4">
                <Link
                  href="/"
                  className={`text-white hover:bg-orange-600 rounded-md px-3 py-2 text-lg font-medium ${pathname === '/' ? 'bg-orange-700' : ''}`}
                >
                  Home
                </Link>
                <Link
                  href="/properties"
                  className={`text-white hover:bg-orange-600 rounded-md px-3 py-2 text-lg font-medium ${pathname === '/properties' ? 'bg-orange-700' : ''}`}
                >
                  Properties
                </Link>
                {session && (
                  <Link
                    href="/properties/add"
                    className={`text-white hover:bg-orange-600 rounded-md px-3 py-2 text-lg font-medium ${pathname === '/properties/add' ? 'bg-orange-700' : ''}`}
                  >
                    Add Property
                  </Link>
                )}
              </div>
            </div>
          </div>

          {!session && (
            <div className="hidden md:block md:ml-6">
              <div className="flex items-center">
                {providers && Object.values(providers).map((provider, index) => (
                  <button
                    key={index}
                    className="flex items-center text-white bg-orange-600 hover:bg-orange-800 rounded-md px-3 py-2"
                    onClick={() => signIn(provider.id)}
                  >
                    <FaGoogle className="text-white mr-2" />
                    <span>Login or Register</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {session && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
              <Link href="/messages" className="relative group">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-white hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button>
                <UnreadMessageCount session={session} />
              </Link>
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={toggleProfileMenu}
                  >
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="h-8 w-8 rounded-full"
                      src={profileImage || profileDefault}
                      alt="Profile Picture"
                      width={40}
                      height={40}
                    />
                  </button>
                </div>

                {isProfileMenuOpen && (
                  <div
                    id="user-menu"
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                      }}
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/properties/saved"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                      }}
                    >
                      Saved Properties
                    </Link>
                    <button
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        signOut();
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-menu" className="bg-orange-500">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="/"
              className={`text-white block rounded-md px-3 py-2 text-base font-medium ${pathname === '/' ? 'bg-orange-700' : ''}`}
            >
              Home
            </Link>
            <Link
              href="/properties"
              className={`text-white hover:bg-orange-700 block rounded-md px-3 py-2 text-base font-medium ${pathname === '/properties' ? 'bg-orange-700' : ''}`}
            >
              Properties
            </Link>
            {session && (
              <Link
                href="/properties/add"
                className={`text-white hover:bg-orange-700 block rounded-md px-3 py-2 text-base font-medium ${pathname === '/properties/add' ? 'bg-orange-700' : ''}`}
              >
                Add Property
              </Link>
            )}
            {!session && providers && Object.values(providers).map((provider, index) => (
              <button
                key={index}
                className="flex items-center text-white bg-orange-700 hover:bg-orange-800 rounded-md px-3 py-2 my-4"
                onClick={() => signIn(provider.id)}
              >
                <FaGoogle className="text-white mr-2" />
                <span>Login or Register</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
