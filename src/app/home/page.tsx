"use client";
import { Briefcase, FileText, Eye, CalendarCheck, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Stats {
  totalScore: string;
  viewedBy: string;
  interviews: string;
}

interface RecentApplication {
  company: string;
  status: 'PENDING' | 'INTERVIEW';
  timeAgo: string;
  salary: string;
  change: string;
}

const HomePage: React.FC = () => {
  const stats = {
    totalScore: '1 Application',
    viewedBy: '48',
    interviews: '3'
  };

  const recentApplications = [
    {
      company: 'TechCorp',
      status: 'PENDING',
      timeAgo: '1H',
      salary: '$0.4121',
      change: '-2.46%'
    },
    {
      company: 'StartupX',
      status: 'INTERVIEW',
      timeAgo: '4H',
      salary: '$0.4121',
      change: '-2.14%'
    }
  ];

  return (
    <div className="flex flex-col p-4 gap-8 pb-24">
      {/* Welcome Section */}
      <div className="text-left mt-2">
        <h1 className="text-3xl font-heading mb-2">Welcome back! 👋</h1>
        <p className="text-gray-600">Track your job hunt progress</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-main rounded-base p-6 border-2 border-black shadow-light col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={24} className="text-black" />
            <h2 className="font-heading text-lg">Total Applications</h2>
          </div>
          <div className="text-3xl font-heading mb-2">{stats.totalScore}</div>
          <p className="text-sm text-gray-600">Keep pushing forward! 🚀</p>
        </div>
        
        <div className="bg-white rounded-base p-4 border-2 border-black shadow-light">
          <div className="flex items-center gap-2 mb-2">
            <Eye size={20} className="text-black" />
            <div className="text-sm font-heading">Profile Views</div>
          </div>
          <div className="text-2xl font-heading">{stats.viewedBy}</div>
        </div>
        
        <div className="bg-white rounded-base p-4 border-2 border-black shadow-light">
          <div className="flex items-center gap-2 mb-2">
            <CalendarCheck size={20} className="text-black" />
            <div className="text-sm font-heading">Interviews</div>
          </div>
          <div className="text-2xl font-heading">{stats.interviews}</div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-heading">Recent Applications</h2>
          <Button className="text-xs py-1">
            View All
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
        
        {recentApplications.map((app, index) => (
          <div 
            key={index}
            className="bg-white rounded-base p-4 border-2 border-black shadow-light hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-heading text-lg">{app.company}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    app.status === 'PENDING' 
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-800' 
                      : 'bg-green-100 text-green-800 border border-green-800'
                  }`}>
                    {app.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                  {app.timeAgo} ago
                </div>
              </div>
              <div className="text-right">
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <Button 
        onClick={() => console.log('New application')}
        className="bg-black text-white mt-2"
      >
        <Briefcase size={20} className="mr-2" />
        Apply for New Job
      </Button>
    </div>
  );
};

export default HomePage;