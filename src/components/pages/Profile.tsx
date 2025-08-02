import React, { useState, useEffect } from 'react';
import { User, Mail, Briefcase, Award, LogOut, Copy, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';

interface UserWalletState {
  loggedIn: boolean | null;
  addr: string;
}

interface UserData {
  name: string;
  email: string;
  applications: number;
  experience: string;
}

const Profile: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [user, setUser] = useState<UserWalletState>({ loggedIn: null, addr: '' });

  useEffect(() => {
    if (isConnected && address) {
      setUser({ loggedIn: true, addr: address });
    } else {
      setUser({ loggedIn: false, addr: '' });
    }
  }, [address, isConnected]);
  const [copied, setCopied] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    applications: 12,
    experience: '3 years'
  });

  const handleDisconnect = async () => {
    // await fcl.unauthenticate(); // Removed Flow authentication
    localStorage.removeItem('walletConnected');
    // localStorage.removeItem('flowAddress'); // Removed Flow address from local storage
    window.location.reload(); // Refresh to show welcome screen
  };

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(user.addr);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col p-2 gap-6 pb-24">
      {/* Profile Card */}
      <div className="bg-main rounded-base p-6 border-2 border-black shadow-light">
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-bg border-2 border-black flex items-center justify-center">
            <User size={48} />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-heading">{userData.name}</h2>
            <div className="flex items-center justify-center gap-2 text-sm">
              <Mail size={16} />
              <span>{userData.email}</span>
            </div>
            
            {/* Wallet Address */}
            <button 
              onClick={copyAddress}
              className="flex items-center justify-center gap-2 text-sm bg-white px-3 py-1 rounded-full border-2 border-black hover:bg-gray-50"
            >
              {copied ? (
                <>
                  <CheckCircle size={16} className="text-green-600" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span className="font-mono">
                    {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '...'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-bg rounded-base p-4 border-2 border-black shadow-light">
          <div className="flex items-center gap-2">
            <Briefcase size={20} />
            <span className="text-sm">Applications</span>
          </div>
          <div className="text-xl font-heading mt-2">{userData.applications}</div>
        </div>
        <div className="bg-bg rounded-base p-4 border-2 border-black shadow-light">
          <div className="flex items-center gap-2">
            <Award size={20} />
            <span className="text-sm">Experience</span>
          </div>
          <div className="text-xl font-heading mt-2">{userData.experience}</div>
        </div>
      </div>

      {/* Edit Profile Button */}
      <Button 
        onClick={() => console.log('Edit profile')}
        className="mt-4"
      >
        Edit Profile
      </Button>

      {/* Disconnect Wallet Button */}
      <Button 
        onClick={handleDisconnect}
        className="bg-red-100 hover:bg-red-200 border-red-600 text-red-600"
      >
        <LogOut size={20} className="mr-2" />
        Disconnect Wallet
      </Button>
    </div>
  );
};

export default Profile;