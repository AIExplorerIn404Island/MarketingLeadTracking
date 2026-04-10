import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Lead, LeadHuntParams } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { Search, Loader2, Play } from 'lucide-react';

export const LeadHuntForm = () => {
  const [params, setParams] = useState<LeadHuntParams>({
    industry: '',
    target_role: '',
    location: '',
    keywords: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const addJob = useAppStore((state) => state.addJob);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post('/jobs', params);
      addJob(response.data);
    } catch (error) {
      console.error('Failed to start lead hunt:', error);
      alert('Failed to start lead hunt. Please check the backend.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Search className="w-5 h-5" />
        New Lead Hunt
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Industry</label>
          <input
            type="text"
            name="industry"
            value={params.industry}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="e.g. SaaS, Fintech"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Target Role</label>
          <input
            type="text"
            name="target_role"
            value={params.target_role}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="e.g. CEO, Marketing Manager"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={params.location}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="e.g. USA, Remote"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Keywords</label>
          <input
            type="text"
            name="keywords"
            value={params.keywords}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="e.g. AI, automation"
          />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Starting Hunt...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start Lead Hunt
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
