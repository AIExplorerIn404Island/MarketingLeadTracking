"use client";

import React, { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { api } from '@/lib/api';
import { LeadHuntForm } from '@/components/LeadHuntForm';
import { LeadTable } from '@/components/LeadTable';
import { JobMonitor } from '@/components/JobMonitor';

export default function Dashboard() {
  const { leads, jobs, setLeads, setJobs, setLoadingLeads, setLoadingJobs } = useAppStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoadingLeads(true);
      setLoadingJobs(true);
      try {
        const [leadsRes, jobsRes] = await Promise.all([
          api.get('/leads'),
          api.get('/jobs'),
        ]);
        setLeads(leadsRes.data);
        setJobs(jobsRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoadingLeads(false);
        setLoadingJobs(false);
      }
    };

    fetchData();

    // Polling for job updates
    const interval = setInterval(async () => {
      try {
        const jobsRes = await api.get('/jobs');
        setJobs(jobsRes.data);
      } catch (error) {
        console.error('Error polling jobs:', error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [setLeads, setJobs, setLoadingLeads, setLoadingJobs]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Lead Hunter Dashboard</h1>
          <p className="text-gray-600">Automated lead generation and enrichment</p>
        </header>

        <div className="grid grid-cols-1 gap-8">
          <section>
            <LeadHuntForm />
          </section>

          <section>
            <JobMonitor jobs={jobs} />
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">Discovered Leads</h2>
            </div>
            <LeadTable leads={leads} isLoading={false} />
          </section>
        </div>
      </div>
    </div>
  );
}
