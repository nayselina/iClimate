import { Ionicons } from '@expo/vector-icons';

// ---------- Officer ----------
export type StaffOfficer = {
  fullName: string;
  initials: string;
  role: string;
  office: string;
};

export const CURRENT_OFFICER: StaffOfficer = {
  fullName: 'Maria Ontiveros',
  initials: 'MO',
  role: 'MAO Officer',
  office: 'Municipal Agriculture Office',
};

// ---------- Dashboard stats ----------
export type StatCard = {
  id: string;
  label: string;
  value: string;
  trend: string;
  icon: keyof typeof Ionicons.glyphMap;
  bg: string;
  iconColor: string;
};

// ---------- Announcements ----------
export type AnnouncementCategory =
  | 'Seed Distribution'
  | 'Training Programs'
  | 'Fertilizer Distribution'
  | 'Events'
  | 'News';

export const ANNOUNCEMENT_FILTERS: (AnnouncementCategory | 'All')[] = [
  'All',
  'News',
  'Events',
  'Training Programs',
];

export type StaffAnnouncement = {
  id: string;
  category: AnnouncementCategory;
  title: string;
  excerpt: string;
  date: string;
};

export const STAFF_ANNOUNCEMENTS: StaffAnnouncement[] = [
  {
    id: 'a1',
    category: 'Seed Distribution',
    title: 'Free Certified Rice Seeds \u2014 Batch 2',
    excerpt: 'LUMANG TUBIGAN FA members may claim NSIC Rc 480 seeds at the barangay hall starting Monday.',
    date: 'May 22',
  },
  {
    id: 'a2',
    category: 'Training Programs',
    title: 'Climate-Smart Farming Workshop',
    excerpt: 'Free half-day session on drought-tolerant varieties, this Saturday at Lian Multipurpose Hall.',
    date: 'May 20',
  },
  {
    id: 'a3',
    category: 'Fertilizer Distribution',
    title: 'Subsidized Fertilizer Vouchers Available',
    excerpt: 'Claim your DA fertilizer discount voucher at the Municipal Agriculture Office before June 5.',
    date: 'May 18',
  },
];

// ---------- Advisories ----------
export type AdvisoryCategory = 'Planting Tips' | 'Irrigation Tips' | 'Climate Awareness' | 'Harvesting Tips';

export const ADVISORY_FILTERS: (AdvisoryCategory | 'All')[] = [
  'All',
  'Planting Tips',
  'Harvesting Tips',
  'Irrigation Tips',
];

export type StaffAdvisory = {
  id: string;
  category: AdvisoryCategory;
  title: string;
  excerpt: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export const STAFF_ADVISORIES: StaffAdvisory[] = [
  {
    id: 'v1',
    category: 'Planting Tips',
    title: 'Best Spacing for Wet-Season Transplanting',
    excerpt: 'Use 20\u00d720 cm spacing to balance tillering and airflow, reducing risk of blast disease.',
    icon: 'bulb-outline',
  },
  {
    id: 'v2',
    category: 'Irrigation Tips',
    title: 'Alternate Wetting and Drying to Save Water',
    excerpt: 'Let the field dry until soil cracks slightly before re-flooding \u2014 cuts water use by ~25%.',
    icon: 'water-outline',
  },
  {
    id: 'v3',
    category: 'Climate Awareness',
    title: 'Reading Cloud Signs Before Typhoon Season',
    excerpt: 'Learn the early signs of approaching tropical depressions to secure crops in time.',
    icon: 'warning-outline',
  },
];

// ---------- Calendar ----------
export type CalendarEvent = {
  id: string;
  day: number;
  month: string;
  title: string;
  description: string;
  type: 'planting' | 'harvest' | 'warning';
};

export const STAFF_CALENDAR_MARKED_DAYS = [15, 17, 22];

export const STAFF_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'c1',
    day: 15,
    month: 'MAY',
    title: 'Wet Season Transplanting Window Opens',
    description: 'Municipality-wide window for Lian, Batangas farmers.',
    type: 'planting',
  },
  {
    id: 'c2',
    day: 22,
    month: 'MAY',
    title: 'Typhoon Risk Window',
    description: 'Tropical depression expected \u2014 advisory published to all barangays.',
    type: 'warning',
  },
];

// ---------- Feedback ----------
export type FeedbackCategory = 'Suggestions' | 'Feedback' | 'Reported Issue';

export const FEEDBACK_FILTERS: (FeedbackCategory | 'All')[] = [
  'All',
  'Suggestions',
  'Feedback',
  'Reported Issue',
];

export type StaffFeedbackItem = {
  id: string;
  name: string;
  initials: string;
  barangay: string;
  category: FeedbackCategory;
  title: string;
  quote: string;
  date: string;
  status: 'Reply' | 'Replied';
};

export const STAFF_FEEDBACK: StaffFeedbackItem[] = [
  {
    id: 'f1',
    name: 'Maria R.',
    initials: 'MR',
    barangay: 'Brgy. Matabungkay',
    category: 'Reported Issue',
    title: 'Weather alerts arrive too late',
    quote: 'I only got the typhoon alert an hour before the rain started. Can it be sent earlier?',
    date: '2026-05-20',
    status: 'Reply',
  },
  {
    id: 'f2',
    name: 'Jose D.',
    initials: 'JD',
    barangay: 'Brgy. Prenza',
    category: 'Suggestions',
    title: 'Add Tagalog language option',
    quote: 'Many farmers here are more comfortable reading advisories in Tagalog.',
    date: '2026-05-19',
    status: 'Replied',
  },
  {
    id: 'f3',
    name: 'Lito C.',
    initials: 'LC',
    barangay: 'Brgy. Luyahan',
    category: 'Feedback',
    title: 'App works great during planting season',
    quote: 'The planting window notification helped me schedule my seedlings perfectly this year.',
    date: '2026-05-17',
    status: 'Reply',
  },
];

// ---------- Notifications ----------
export type NotificationType = 'warning' | 'info' | 'success' | 'announcement' | 'advisory';

export type AppNotification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timeAgo: string;
  unread: boolean;
};

export const STAFF_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    type: 'warning',
    title: 'Heavy Rainfall Alert',
    message: '150mm expected in the next 48 hours.',
    timeAgo: '3H AGO',
    unread: true,
  },
  {
    id: 'n2',
    type: 'info',
    title: 'System Update',
    message: 'New 7-day forecast features available.',
    timeAgo: '2H AGO',
    unread: true,
  },
  {
    id: 'n3',
    type: 'success',
    title: 'Data Uploaded',
    message: 'March 2026 production data processed.',
    timeAgo: '5H AGO',
    unread: false,
  },
];

// ---------- Dashboard content ----------
export const DASHBOARD_STATS: StatCard[] = [
  {
    id: 's1',
    label: 'Total Farmers',
    value: '189',
    trend: '\u2197 6 active',
    icon: 'people-outline',
    bg: '#E3ECFB',
    iconColor: '#3E6FD9',
  },
  {
    id: 's2',
    label: 'Announcements',
    value: '24',
    trend: '\u2197 +5 this week',
    icon: 'megaphone-outline',
    bg: '#FCEBD3',
    iconColor: '#C97A1F',
  },
  {
    id: 's3',
    label: 'Advisories',
    value: '18',
    trend: '\u2197 Positive trend',
    icon: 'help-buoy-outline',
    bg: '#E3ECFB',
    iconColor: '#3E6FD9',
  },
  {
    id: 's4',
    label: 'Feedback',
    value: '32',
    trend: '12 unread',
    icon: 'chatbubble-outline',
    bg: '#FBE3E3',
    iconColor: '#D9453E',
  },
];

export const QUICK_MANAGEMENT = [
  { id: 'q1', label: 'Announcements', countLabel: '24 posted', icon: 'megaphone-outline' as const, bg: '#FCEBD3', iconColor: '#C97A1F', route: '/staff/announcements' },
  { id: 'q2', label: 'Advisories', countLabel: '18 posted', icon: 'help-buoy-outline' as const, bg: '#E3ECFB', iconColor: '#3E6FD9', route: '/staff/advisories' },
  { id: 'q3', label: 'Calendar', countLabel: '2 upcoming', icon: 'calendar-outline' as const, bg: '#E1F3E7', iconColor: '#1E8E5A', route: '/staff/calendar' },
  { id: 'q4', label: 'Feedback', countLabel: '12 unread', icon: 'chatbubble-outline' as const, bg: '#FBE3E3', iconColor: '#D9453E', route: '/staff/feedback' },
];