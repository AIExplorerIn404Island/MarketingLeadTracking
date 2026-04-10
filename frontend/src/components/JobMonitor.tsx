import React, { useEffect } from 'react';
import { Job } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { Loader2, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface JobMonitorProps {
  jobs: Job[];
}

export const JobMonitor = ({ jobs }: JobMonitorProps) => {
  if (jobs.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Recent Jobs
      </h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              {job.status === 'running' && (
                <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
              )}
              {job.status === 'completed' && (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              )}
              {job.status === 'failed' && (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              {job.status === 'pending' && (
                <Clock className="w-5 h-5 text-gray-500" />
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">Job #{job.id}</p>
                <p className="text-xs text-gray-500">
                  {new Date(job.created_at).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="text-sm font-medium uppercase">
              <span className={`px-2 py-1 rounded text-xs ${
                job.status === 'running' ? 'bg-blue-100 text-blue-800' :
                job.status === 'completed' ? 'bg-green-100 text-green-800' :
                job.status === 'failed' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {job.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
