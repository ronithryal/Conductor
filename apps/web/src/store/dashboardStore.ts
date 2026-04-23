import { create } from 'zustand'
import { MOCK_METRICS } from '../data/mockMetrics'

interface DashboardStore {
  metrics: typeof MOCK_METRICS
}

export const useDashboardStore = create<DashboardStore>(() => ({
  metrics: MOCK_METRICS,
}))
