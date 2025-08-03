import { useState, useEffect } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';
import { ArrowRight, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandingPageProps {
  onConnect: (user: { loggedIn: boolean }) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onConnect }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<{ loggedIn: boolean }>({ loggedIn: false });

  

  const handleConnectWallet = async () => {
    setIsLoading(true);
    try {
      const { openConnectModal } = useConnectModal();
      openConnectModal && openConnectModal();
       onConnect && onConnect({ loggedIn: true });
    } catch (error) {
      console.error('Error connecting wallet:', error);
      // You might want to show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md space-y-8"
      >
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-main rounded-2xl border-4 border-black shadow-light mx-auto flex items-center justify-center"
          >
            <span className="text-4xl">🚀</span>
          </motion.div>
          
          <h1 className="text-4xl font-heading">Welcome to Lisk Seeker</h1>
          <p className="text-gray-600">Your Web3 Career Hub</p>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-base p-4 border-2 border-black shadow-light"
          >
            <div className="flex items-center gap-3">
              <div className="bg-main p-2 rounded-full border-2 border-black">✨</div>
              <div>
                <h3 className="text-left font-heading">Decentralized Profile</h3>
                <p className="text-sm text-gray-600">Own your professional identity on Lisk</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-base p-4 border-2 border-black shadow-light"
          >
            <div className="flex items-center gap-3">
              <div className="bg-main p-2 rounded-full border-2 border-black">💼</div>
              <div>
                <h3 className="text-left font-heading">Web3 Job Market</h3>
                <p className="text-sm text-gray-600">Connect directly with Web3 employers</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Connect Wallet Button */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-6"
        >
          <Button
            onClick={handleConnectWallet}
            className="w-full py-6 bg-black text-white justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                <span>Connecting...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Wallet size={20} />
                <span>Connect Lisk Wallet</span>
                <ArrowRight size={20} />
              </div>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;