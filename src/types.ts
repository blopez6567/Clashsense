export interface ClashTask {
  id: string;
  description: string;
  discipline: 'MECH' | 'PL' | 'EL' | 'FP';
  severity: 'high' | 'medium' | 'low';
  status: 'new' | 'active' | 'approved' | 'resolved' | 'closed' | 'not-an-issue';
  location: string;
  level: string;
  date: string;
  modelSource: string;
  elementType: string;
  clashGroup: string;
  assignedTo: string;
  coordinates: string;
}

export interface ModelStats {
  total: number;
  updated: number;
  reviewing: number;
}

export interface ClashStats {
  total: number;
  critical: number;
  major: number;
  minor: number;
  resolved: number;
}

export interface DisciplineProgress {
  [key: string]: {
    total: number;
    resolved: number;
  };
}

export interface ProjectData {
  id: string;
  name: string;
  client: string;
  lastUpdated: string;
  teamSize: number;
  progress: number;
  phase: string;
  deadline: string;
  image: string;
  modelStats: ModelStats;
  clashStats: ClashStats;
  disciplineProgress: DisciplineProgress;
  clashes?: ClashTask[];
}