"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Bottomnav from '@/components/Navbar';
import Discovery from '@/components/pages/Discovery';
import Profile from '@/components/pages/Profile';
import LandingPage from '@/components/pages/LandingPage'; // Corrected typo
import LoadingScreen from '@/components/LoadingScreen';
import HomePage from '@/components/pages/HomePage'; // Assuming HomePage exists

interface PageProps {}

const Page: React.FC<PageProps> = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isChangingPage, setIsChangingPage] = useState<boolean>(false);
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  

  const handlePageChange = (newPage: string) => {
    setIsChangingPage(true)
    setTimeout(() => {
      setCurrentPage(newPage)
      setIsChangingPage(false)
    }, 300)
  }

  const handleWalletConnect = () => {
    setIsWalletConnected(true);
    // You could also store this in localStorage to persist the connection
    localStorage.setItem('walletConnected', 'true');
  }

  const pageVariants = {
    initial: {
      opacity: 0,
      x: 20,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: -20,
    },
  }

  const renderPage = () => {
    const props = {
      initial: "initial",
      animate: "animate",
      exit: "exit",
      variants: pageVariants,
      transition: { duration: 0.3 },
      className: "w-full",
    }

    switch(currentPage) {
      case 'home':
        return <motion.div key="home" {...props}><HomePage /></motion.div>
      case 'discovery':
        return <motion.div key="discovery" {...props}><Discovery /></motion.div>
      case 'profile':
        return <motion.div key="profile" {...props}><Profile /></motion.div>
      default:
        return <motion.div key="home" {...props}><HomePage /></motion.div>
    }
  }

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust loading time as needed

    // Check if wallet was previously connected
    const wasConnected = localStorage.getItem('walletConnected') === 'true';
    setIsWalletConnected(wasConnected);

    return () => clearTimeout(timer);
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!isWalletConnected) {
    return <LandingPage onConnect={handleWalletConnect} />
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-bg">
      <AnimatePresence mode="wait">
        <div className="w-full max-w-xl mx-auto relative">   
          <AnimatePresence mode="wait">
            {renderPage()}
          </AnimatePresence>
        </div>
        <Bottomnav 
          activePage={currentPage} 
          setActivePage={handlePageChange}
          disabled={isChangingPage}
        />
      </AnimatePresence>
    </div>
  )
}

export default Page