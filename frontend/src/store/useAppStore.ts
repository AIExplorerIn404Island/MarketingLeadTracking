import { create } from 'zustand';
import { Lead, Job } from '../types';

interface AppState {
  leads: Lead[];
  jobs: Job[];
  isLoadingLeads: boolean;
  isLoadingJobs: boolean;
  setLeads: (leads: Lead[]) => void;
  setJobs: (jobs: Job[]) => void;
  addLead: (lead: Lead) => void;
  addJob: (job: Job) => void;
  updateJobStatus: (jobId: number, status: Job['status']) => void;
  setLoadingLeads: (loading: boolean) => void;
  setLoadingJobs: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  leads: [],
  jobs: [],
  isLoadingLeads: false,
  isLoadingJobs: false,
  setLeads: (leads) => set({ leads }),
  setJobs: (jobs) => set({ jobs }),
  addLead: (lead) => set((state) => ({ leads: [lead, ...state.leads] })),
  addJob: (job) => set((state) => ({ jobs: [job, ...state.jobs] })),
  updateJobStatus: (jobId, status) =>
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job.id === jobId ? { ...job, status } : job
      ),
    })),
  setLoadingLeads: (loading) => set({ isLoadingLeads: loading }),
  setLoadingJobs: (loading) => set({ isLoadingJobs: loading }),
}));
