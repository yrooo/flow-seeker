import { Home, Briefcase, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Home, Briefcase, User } from 'lucide-react';

interface NavItem {
  id: string;
  icon: React.ElementType;
  label: string;
}

interface BottomnavProps {
  activePage: string;
  setActivePage: (page: string) => void;
  disabled: boolean;
}

const Bottomnav: React.FC<BottomnavProps> = ({ activePage, setActivePage, disabled }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'discovery', icon: Briefcase, label: 'Discovery' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: 100 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed bottom-0 left-0 right-0 flex justify-center w-full p-4 z-40"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <nav className="bg-white rounded-full px-8 py-3 border-2 border-black shadow-light max-w-60 w-full">
          <div className="flex justify-between items-center">
            {navItems.map(({ id, icon: Icon, label }) => (
              <motion.button
                key={id}
                variants={itemVariants}
                onClick={() => !disabled && setActivePage(id)}
                className={`cursor-pointer group flex flex-col items-center relative ${
                  disabled ? 'pointer-events-none' : ''
                }`}
                aria-label={label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon 
                  size={24} 
                  className={`
                    transition-all duration-300 
                    ${activePage === id 
                      ? 'text-black stroke-[2]' 
                      : 'stroke-[1.5] opacity-40'
                    }
                  `}
                />
                {activePage === id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-2 w-1 h-1 bg-black rounded-full"
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </nav>
      </motion.div>
    </AnimatePresence>
  );
};

export default Bottomnav;