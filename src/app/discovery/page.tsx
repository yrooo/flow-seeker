"use client";

import { useState, useEffect } from 'react';
import { Search, Building2, DollarSign, MapPin, Briefcase, Filter, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface JobListing {
  id: number;
  company: string;
  role: string;
  salary: string;
  location: string;
  skills: string[];
  applicants: number;
  posted: string;
  description: string;
  benefits: string[];
}

const Discovery: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [jobDialogOpen, setJobDialogOpen] = useState<boolean>(false);
  const [searchDialogOpen, setSearchDialogOpen] = useState<boolean>(false);
  const [filteredJobs, setFilteredJobs] = useState<JobListing[]>([]);
  
  const jobListings = [
    {
      id: 1,
      company: 'TechFlow Inc.',
      role: 'Frontend Developer',
      salary: '$80K - $120K',
      location: 'Remote',
      skills: ['React', 'TypeScript', 'Tailwind'],
      applicants: 12,
      posted: '2h ago',
      description: `We are looking for a Frontend Developer to join our growing team. 
      You'll be working on cutting-edge web applications using modern technologies.`,
      benefits: [
        'Competitive salary',
        'Remote work options',
        'Health insurance',
        'Unlimited PTO'
      ]
    },
    {
      id: 2,
      company: 'StartupX',
      role: 'Full Stack Engineer',
      salary: '$90K - $140K',
      location: 'New York, NY',
      skills: ['Node.js', 'React', 'MongoDB'],
      applicants: 8,
      posted: '5h ago',
      description: `StartupX is seeking a Full Stack Engineer to help build our next-generation platform.`,
      benefits: [
        'Equity package',
        'Flexible hours',
        '401(k) matching',
        'Professional development budget'
      ]
    },
    {
      id: 3,
      company: 'Flow',
      role: 'Social Media Manager',
      salary: '$10K - $14K',
      location: 'Remote',
      skills: ['Photoshop', 'UI/UX', 'Figma'],
      applicants: 2,
      posted: '1h ago',
      description: `StartupX is seeking a Full Stack Engineer to help build our next-generation platform.`,
      benefits: [
        'Equity package',
        'Flexible hours',
        '401(k) matching',
        'Professional development budget'
      ]
    },
    {
      id: 4,
      company: 'Flow',
      role: 'Social Media Manager',
      salary: '$10K - $14K',
      location: 'Remote',
      skills: ['Photoshop', 'UI/UX', 'Figma'],
      applicants: 2,
      posted: '1h ago',
      description: `StartupX is seeking a Full Stack Engineer to help build our next-generation platform.`,
      benefits: [
        'Equity package',
        'Flexible hours',
        '401(k) matching',
        'Professional development budget'
      ]
    },
    {
      id: 5,
      company: 'Tomat',
      role: 'Social Media/Graphic Designer',
      salary: '$10K - $14K',
      location: 'Remote',
      skills: ['Photoshop', 'UI/UX', 'Figma'],
      applicants: 2,
      posted: '1h ago',
      description: `StartupX is seeking a Full Stack Engineer to help build our next-generation platform.`,
      benefits: [
        'Equity package',
        'Flexible hours',
        '401(k) matching',
        'Professional development budget'
      ]
    },
    {
      id: 6,
      company: 'FlowX',
      role: 'Senior Social Media Manager',
      salary: '$10K - $14K',
      location: 'Remote',
      skills: ['Photoshop', 'UI/UX', 'Figma'],
      applicants: 2,
      posted: '1h ago',
      description: `StartupX is seeking a Full Stack Engineer to help build our next-generation platform.`,
      benefits: [
        'Equity package',
        'Flexible hours',
        '401(k) matching',
        'Professional development budget'
      ]
    }
  ];

  // Search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowercaseQuery = query.toLowerCase();
    
    const filtered = jobListings.filter(job => {
      return (
        job.role.toLowerCase().includes(lowercaseQuery) ||
        job.company.toLowerCase().includes(lowercaseQuery) ||
        job.location.toLowerCase().includes(lowercaseQuery) ||
        job.skills.some(skill => skill.toLowerCase().includes(lowercaseQuery))
      );
    });
    
    setFilteredJobs(filtered);
  };

  const handleJobClick = (job: JobListing) => {
    setSelectedJob(job);
    setJobDialogOpen(true);
  };

  // Reset filtered jobs when search drawer closes
  useEffect(() => {
    if (!searchDialogOpen) {
      setSearchQuery('');
      setFilteredJobs([]);
    }
  }, [searchDialogOpen]);

  const renderJobCard = (job: JobListing) => (
    <div
      key={job.id}
      onClick={() => handleJobClick(job)}
      className="bg-white rounded-base p-4 border-2 border-black shadow-shadow
        hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none 
        transition-all cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-heading text-lg mb-1">{job.role}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Building2 size={16} />
            <span>{job.company}</span>
          </div>
        </div>
        <div className="bg-main px-3 py-1 rounded-full border-2 border-black text-sm font-medium">
          {job.applicants} applied
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded-full">
          <DollarSign size={14} />
          {job.salary}
        </div>
        <div className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded-full">
          <MapPin size={14} />
          {job.location}
        </div>
        <div className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded-full">
          <Clock size={14} />
          {job.posted}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="bg-main px-3 py-1 rounded-full text-xs border border-black font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col p-4 gap-6 px-112">
      {/* Header */}
      <div className="text-left mt-2">
        <h1 className="text-3xl font-heading mb-2">Find Jobs 🎯</h1>
        <p className="text-gray-600">Discover your next opportunity</p>
      </div>

      {/* Search Button */}
      <Button 
        onClick={() => setSearchDialogOpen(true)}
        className="w-full justify-start bg-white text-gray-500 py-4"
      >
        <Search size={20} className="mr-2" />
        Search jobs, companies, skills...
      </Button>

      {/* Search Drawer */}
      <Dialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen}>
        <DialogContent className="h-[75vh]">
          <DialogHeader className="border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="text-gray-500" size={20} />
              </div>
              <input
                type="text"
                placeholder="Search jobs, companies, skills..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                autoFocus
                className="w-full p-4 rounded-base border-2 border-black bg-white pl-12 pr-4 
                  focus:outline-none focus:ring-2 focus:ring-main"
              />
            </div>
          </DialogHeader>

          <div className="p-4 overflow-y-auto flex-1">
            {searchQuery && (
              <div className="mb-4">
                <h3 className="font-heading text-sm text-gray-500 mb-2">
                  {filteredJobs.length} results found
                </h3>
              </div>
            )}
            
            <div className="space-y-4">
              {searchQuery ? (
                filteredJobs.length > 0 ? (
                  filteredJobs.map(renderJobCard)
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    No results found for "{searchQuery}"
                  </div>
                )
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Start typing to search for jobs
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quick Filters */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-heading text-lg">Quick Filters</h2>
          <Button className="text-sm py-1 px-3">
            <Filter size={16} className="mr-1" />
            All Filters
          </Button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['🌍 Remote', '⭐ Full-time', '🎯 Entry Level', '💻 Tech', '🎨 Design'].map((filter) => (
            <Button key={filter} className="whitespace-nowrap bg-white">
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        <h2 className="font-heading text-lg">Featured Jobs</h2>
        {jobListings.map(renderJobCard)}
      </div>

      {/* Job Details Drawer */}
      <Dialog open={jobDialogOpen} onOpenChange={setJobDialogOpen}>
        <DialogContent className="h-[75vh]">
          {selectedJob && (
            <>
              <DialogHeader className="flex flex-col gap-4 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <DialogTitle className="text-2xl mb-2">{selectedJob.role}</DialogTitle>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building2 size={16} />
                      <span>{selectedJob.company}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setJobDialogOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded-full">
                    <DollarSign size={14} />
                    {selectedJob.salary}
                  </div>
                  <div className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded-full">
                    <MapPin size={14} />
                    {selectedJob.location}
                  </div>
                  <div className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded-full">
                    <Clock size={14} />
                    {selectedJob.posted}
                  </div>
                </div>
              </DialogHeader>

              <div className="p-4 overflow-y-auto flex-1">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading text-lg mb-2">Description</h3>
                    <DialogDescription className="whitespace-pre-line">
                      {selectedJob.description}
                    </DialogDescription>
                  </div>

                  <div>
                    <h3 className="font-heading text-lg mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-main px-3 py-1 rounded-full text-xs border border-black font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading text-lg mb-2">Benefits</h3>
                    <ul className="list-disc pl-4 space-y-1">
                      {selectedJob.benefits.map((benefit, index) => (
                        <li key={index} className="text-gray-600">
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button 
                  onClick={() => console.log('Apply for job:', selectedJob.id)}
                  className="bg-black text-white hover:bg-gray-800 w-full"
                >
                  <Briefcase size={20} className="mr-2" />
                  Apply Now
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Discovery;