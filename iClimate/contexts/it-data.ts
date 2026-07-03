import { Ionicons } from '@expo/vector-icons';

export type CurrentITUser = {
  fullName: string;
  initials: string;
  email: string;
  role: string;
  municipality: string;
  lastLogin: string;
};

export const CURRENT_IT_USER: CurrentITUser = {
  fullName: 'IT Admin',
  initials: 'IT',
  email: 'it.admin@iclimate.gov.ph',
  role: 'IT Personnel',
  municipality: 'Lian, Batangas',
  lastLogin: 'Today, 9:41 AM',
};

export type SystemStats = {
  totalUsers: number;
  totalUsersDelta: string;
  totalFarmers: number;
  farmersByOffice: { mao: number; it: number };
  announcements: number;
  announcementsStatus: string;
  advisories: number;
  advisoriesStatus: string;
  dbUsedGb: number;
  dbTotalGb: number;
  uptimePct: number;
  pagasaConnected: boolean;
};

export const SYSTEM_STATS: SystemStats = {
  totalUsers: 247,
  totalUsersDelta: '+12 this week',
  totalFarmers: 189,
  farmersByOffice: { mao: 55, it: 3 },
  announcements: 24,
  announcementsStatus: 'Active',
  advisories: 18,
  advisoriesStatus: 'Operational',
  dbUsedGb: 45,
  dbTotalGb: 100,
  uptimePct: 99.8,
  pagasaConnected: true,
};

export type ActivityTone = 'success' | 'warning' | 'info';

export type ActivityItem = {
  id: string;
  label: string;
  detail: string;
  time: string;
  tone: ActivityTone;
  icon: keyof typeof Ionicons.glyphMap;
};

export const RECENT_ACTIVITY: ActivityItem[] = [
  {
    id: 'a1',
    label: 'PAGASA API Connection',
    detail: 'Weather data sync completed successfully.',
    time: '5m ago',
    tone: 'success',
    icon: 'cloud-done-outline',
  },
  {
    id: 'a2',
    label: 'New Farmer Registered',
    detail: 'Jose Dela Cruz added under Barangay Prenza.',
    time: '32m ago',
    tone: 'info',
    icon: 'person-add-outline',
  },
  {
    id: 'a3',
    label: 'Database Backup',
    detail: 'Nightly backup finished, 45/100 GB used.',
    time: '3h ago',
    tone: 'success',
    icon: 'server-outline',
  },
  {
    id: 'a4',
    label: 'Failed Login Attempt',
    detail: 'Blocked after 3 tries from unrecognized device.',
    time: '6h ago',
    tone: 'warning',
    icon: 'shield-outline',
  },
];

export type ITNotificationType = 'warning' | 'info' | 'success';

export type ITNotification = {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  unread: boolean;
  type: ITNotificationType;
};

export const IT_NOTIFICATIONS: ITNotification[] = [
  {
    id: 'n1',
    title: 'Heavy Rainfall Alert',
    message: '150mm expected in the next 48 hours.',
    timeAgo: '36M AGO',
    unread: true,
    type: 'warning',
  },
  {
    id: 'n2',
    title: 'System Update',
    message: 'New 7-day forecast features available.',
    timeAgo: '2H AGO',
    unread: true,
    type: 'info',
  },
  {
    id: 'n3',
    title: 'Data Uploaded',
    message: 'March 2026 production data processed.',
    timeAgo: '5H AGO',
    unread: false,
    type: 'success',
  },
];

export type Farmer = {
  id: string;
  fullName: string;
  initials: string;
  farmerRefId: string;
  contactNumber: string;
  barangay: string;
  farmAreaHa: number;
  farmType: string;
  irrigationType: string;
};

export const BARANGAY_FILTERS = ['All', 'Lian', 'Matabungkay', 'Prenza', 'Luyahan'] as const;
export type BarangayFilter = (typeof BARANGAY_FILTERS)[number];

export const FARMERS: Farmer[] = [
  {
    id: 'f1',
    fullName: 'Avelino John Abellar III',
    initials: 'AJ',
    farmerRefId: 'RF-2025-001',
    contactNumber: '0917 · 234 5678',
    barangay: 'Lian',
    farmAreaHa: 0.77,
    farmType: 'Rice',
    irrigationType: 'Irrigated',
  },
  {
    id: 'f2',
    fullName: 'Maria Reyes',
    initials: 'MR',
    farmerRefId: 'RF-2025-014',
    contactNumber: '0918 · 552 1190',
    barangay: 'Matabungkay',
    farmAreaHa: 1.2,
    farmType: 'Rice',
    irrigationType: 'Rainfed',
  },
  {
    id: 'f3',
    fullName: 'Jose Dela Cruz',
    initials: 'JD',
    farmerRefId: 'RF-2025-027',
    contactNumber: '0920 · 887 3345',
    barangay: 'Prenza',
    farmAreaHa: 0.5,
    farmType: 'Rice',
    irrigationType: 'Irrigated',
  },
];

export type ReportBar = { label: string; value: number; max: number; color: string };

export const ANNOUNCEMENT_BREAKDOWN: ReportBar[] = [
  { label: 'News', value: 7, max: 24, color: '#F5B342' },
  { label: 'Events', value: 5, max: 24, color: '#3E6FD9' },
  { label: 'Training Programs', value: 4, max: 24, color: '#1E8A4C' },
  { label: 'Seed Distribution', value: 6, max: 24, color: '#7C5CD9' },
  { label: 'Fertilizer Dist.', value: 2, max: 24, color: '#D9453E' },
];

export const ADVISORY_BREAKDOWN: ReportBar[] = [
  { label: 'Planting Tips', value: 6, max: 18, color: '#1E8A4C' },
  { label: 'Harvesting Tips', value: 3, max: 18, color: '#123626' },
  { label: 'Irrigation Tips', value: 4, max: 18, color: '#3E6FD9' },
  { label: 'Climate Awareness', value: 5, max: 18, color: '#F5B342' },
];

export type BarangayRegistration = { barangay: string; count: number };

export const FARMER_REGISTRATIONS: BarangayRegistration[] = [
  { barangay: 'Lian', count: 72 },
  { barangay: 'Matabungkay', count: 55 },
  { barangay: 'Prenza', count: 38 },
  { barangay: 'Luyahan', count: 24 },
];

export const TOTAL_ANNOUNCEMENTS = 24;
export const TOTAL_ADVISORIES = 18;
export const TOTAL_FARMER_REGISTRATIONS = 189;