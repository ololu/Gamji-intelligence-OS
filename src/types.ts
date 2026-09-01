export type Category = 
  | 'Artificial Intelligence'
  | 'AI Engineering'
  | 'Mining & Minerals'
  | 'Education & EdTech'
  | 'Agriculture & AgriTech'
  | 'Renewable Energy'
  | 'Startups & Venture'
  | 'Research & Science'
  | 'Government & Policy'
  | 'Scholarships & Grants'
  | 'Hausa Tech';

export type VerificationStatus = 'verified' | 'needs_confirmation' | 'unverified';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type AutopilotMode = 'manual' | 'assisted' | 'trusted' | 'autopilot';

export interface VerificationData {
  status: VerificationStatus;
  confidenceScore: number; // 0 - 100
  sourceTrust: number;     // 0 - 100
  freshnessScore: number;  // 0 - 100
  accuracyScore: number;   // 0 - 100
  corroborationCount: number;
  flags: string[];
}

export interface QualityGateData {
  overallScore: number;
  riskLevel: RiskLevel;
  status: 'approved' | 'review_required' | 'published';
  autoPublished: boolean;
  reviewedBy?: string;
  notes?: string;
}

export interface BuildThisConcept {
  title: string;
  problem: string;
  architecture: string;
  techStack: string[];
  datasetConsideration: string;
  mvpRoadmap: string[];
  estimatedDevDays: number;
  potentialImpact: string;
}

export interface MineralData {
  mineralName: string;
  nigerianDeposits: string[]; // e.g. Nasarawa, Kaduna, Oyo, Kogi
  industrialUse: string;
  marketTrend: string;
  engineeringOpportunity: string;
  educationResearchTopic: string;
}

export interface IntelligenceArticle {
  id: string;
  title: string;
  originalHeadline: string;
  summary: string;
  whatHappened: string;
  whyItMatters: string;
  nigerianRelevance: string;
  targetBeneficiaries: string[]; // e.g. ["Students", "AI Developers", "Mining Companies", "Government"]
  possibleNigerianApplications: string[];
  opportunityAngle: string;
  buildThis?: BuildThisConcept;
  mineralData?: MineralData;
  category: Category;
  tags: string[];
  verification: VerificationData;
  qualityGate: QualityGateData;
  source: {
    name: string;
    url: string;
    trustLevel: 'high' | 'medium' | 'experimental';
    publishedDate: string;
  };
  imageUrl: string;
  imageCaption?: string;
  publishedAt: string;
  hausaSummary?: {
    title: string;
    summary: string;
    explanation: string;
  };
  frenchSummary?: {
    title: string;
    summary: string;
  };
  readTimeMinutes: number;
  bookmarked?: boolean;
  editionId?: string;
}

export interface OpportunityItem {
  id: string;
  title: string;
  organization: string;
  category: 'scholarship' | 'grant' | 'fellowship' | 'competition' | 'internship' | 'training';
  targetAudience: string;
  eligibility: string[];
  deadline: string;
  fundingAmount?: string;
  country: string;
  applicationUrl: string;
  verified: boolean;
  matchScore?: number; // for current subscriber
  tags: string[];
  description: string;
}

export interface SubscriberProfile {
  id: string;
  name: string;
  email: string;
  interests: Category[];
  language: 'English' | 'Hausa' | 'French' | 'Multilingual';
  experienceLevel: 'Student' | 'AI Engineer / Developer' | 'Mining Entrepreneur' | 'Teacher / Academic' | 'Government Official' | 'General Innovator';
  frequency: 'daily' | 'weekly';
  customFeedSummary?: string;
  lastDeliveredEdition?: string;
  joinedAt: string;
}

export interface SourceRegistryItem {
  id: string;
  name: string;
  url: string;
  feedUrl: string;
  category: Category;
  country: string;
  trustLevel: 'high' | 'medium' | 'experimental';
  updateFrequencyHours: number;
  status: 'active' | 'paused';
  lastScoutedAt: string;
  totalArticlesDiscovered: number;
}

export interface AgentStatus {
  id: string;
  name: string;
  code: string;
  role: string;
  status: 'active' | 'idle' | 'running' | 'scheduled';
  lastActivity: string;
  itemsProcessedToday: number;
  currentTask?: string;
  iconName: string;
}

export interface NewsletterEdition {
  id: string;
  editionNumber: number;
  title: string;
  subtitle: string;
  editionType: 'daily' | 'weekly' | 'personalized' | 'mines_special';
  date: string;
  targetAudience: string;
  bigStoryId: string;
  storyIds: string[];
  opportunityIds: string[];
  buildChallengeTitle?: string;
  mineralOfTheWeekName?: string;
  hausaTopicTitle?: string;
  status: 'draft' | 'scheduled' | 'sent';
  deliveredCount?: number;
  openRate?: string;
}

export interface BuildLabProject {
  id: string;
  title: string;
  problemStatement: string;
  submittedBy: string;
  category: Category;
  proposedSolution: string;
  architectureBlueprint: string;
  techStack: string[];
  requiredSkills: string[];
  mvpRoadmap: string[];
  businessModel: string;
  impactScore: number;
  status: 'ideation' | 'prototyping' | 'built';
  upvotes: number;
  createdAt: string;
}

export interface LearningLesson {
  id: string;
  title: string;
  topic: string;
  readTimeMinutes: number;
  summary: string;
  contentMarkdown: string;
  codeExample?: string;
  quizQuestions: {
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
  }[];
  certificateName: string;
}
