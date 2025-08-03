"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { Home, Briefcase, User } from 'lucide-react'; // Assuming lucide-react for icons

interface NavItem {
  id: string;
  icon: React.ElementType;
  label: string;
}

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'discovery', icon: Briefcase, label: 'Discovery' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <>
      <AnimatePresence>
        {pathname !== '/landing' && (
          <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full bg-white border-b-2 border-black shadow-md p-4 z-50 hidden md:block"
          >
            <ul className="flex justify-start items-center space-x-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => router.push(`/${item.id}`)}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200
                      ${pathname === `/${item.id}` ? 'text-main' : 'text-gray-500'}`} 
                    // For desktop, nav items are horizontal
                  >
                    <item.icon size={24} />
                    <span className="text-base ml-2">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Navbar */}
      <AnimatePresence>
        {pathname !== '/landing' && (
          <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black shadow-top rounded-t-2xl p-4 z-50 md:hidden"
          >
            <ul className="flex justify-around items-center">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => router.push(`/${item.id}`)}
                    className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200
                      ${pathname === `/${item.id}` ? 'text-main' : 'text-gray-500'}`}
                  >
                    <item.icon size={24} />
                    <span className="text-xs mt-1">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;