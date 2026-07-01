// Mock data for the farmer experience. Replace with real API calls
// once the backend endpoints are available — the shapes below are the
// contract the UI components expect.

export type FarmerProfile = {
  fullName: string;
  farmerId: string;
  initials: string;
  contactNumber: string;
  address: string;
  barangay: string;
  farmAreaHa: number;
  farmType: string;
  irrigationType: string;
  currentYieldTHa: number;
  association: string;
};

export const CURRENT_FARMER: FarmerProfile = {
  fullName: 'Avelino John Abellar III',
  farmerId: 'RF-2025-001',
  initials: 'AJ',
  contactNumber: '0917 · 234 5678',
  address: 'Purok 3, Lian',
  barangay: 'Lian, Batangas',
  farmAreaHa: 0.77,
  farmType: 'Rice',
  irrigationType: 'Irrigated',
  currentYieldTHa: 5.2,
  association: 'LUMANG TUBIGAN FA',
};

export type AnnouncementCategory = 'News' | 'Events' | 'Training Programs' | 'Seed Distribution' | 'Fertilizer Distribution';

export type Announcement = {
  id: string;
  category: AnnouncementCategory;
  title: string;
  excerpt: string;
  date: string;
};

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'a1',
    category: 'Seed Distribution',
    title: 'Free Certified Rice Seeds — Batch 2',
    excerpt:
      'LUMANG TUBIGAN FA members may claim NSIC Rc 480 seeds at the barangay hall starting Monday. Bring your farmer ID.',
    date: 'May 22',
  },
  {
    id: 'a2',
    category: 'Training Programs',
    title: 'Climate-Smart Farming Workshop',
    excerpt:
      'Free half-day session on drought-tolerant varieties and water-saving irrigation, this Saturday at Lian Multipurpose Hall.',
    date: 'May 20',
  },
  {
    id: 'a3',
    category: 'Fertilizer Distribution',
    title: 'Subsidized Fertilizer Vouchers Available',
    excerpt: 'Claim your DA fertilizer discount voucher at the Municipal Agriculture Office before June 5.',
    date: 'May 18',
  },
  {
    id: 'a4',
    category: 'Events',
    title: 'Barangay Harvest Festival Planning Meeting',
    excerpt: 'All members are invited to help plan this year\u2019s harvest festival. Agenda and venue to be confirmed.',
    date: 'May 12',
  },
];

export const ANNOUNCEMENT_FILTERS: (AnnouncementCategory | 'All')[] = [
  'All',
  'News',
  'Events',
  'Training Programs',
];

export type AdvisoryCategory = 'Planting Tips' | 'Harvesting Tips' | 'Irrigation Tips' | 'Climate Awareness';

export type Advisory = {
  id: string;
  category: AdvisoryCategory;
  icon: 'bulb-outline' | 'water-outline' | 'warning-outline';
  title: string;
  excerpt: string;
};

export const ADVISORIES: Advisory[] = [
  {
    id: 'v1',
    category: 'Planting Tips',
    icon: 'bulb-outline',
    title: 'Best Spacing for Wet-Season Transplanting',
    excerpt:
      'Use 20\u00d720 cm spacing to balance tillering and airflow, reducing risk of blast disease during humid weeks.',
  },
  {
    id: 'v2',
    category: 'Irrigation Tips',
    icon: 'water-outline',
    title: 'Alternate Wetting and Drying to Save Water',
    excerpt:
      'Let the field dry until soil cracks slightly before re-flooding \u2014 cuts water use by up to 25% with no yield loss.',
  },
  {
    id: 'v3',
    category: 'Climate Awareness',
    icon: 'warning-outline',
    title: 'Reading Cloud Signs Before Typhoon Season',
    excerpt: 'Learn the early signs of approaching tropical depressions so you can secure your crop and equipment in time.',
  },
];

export const ADVISORY_FILTERS: (AdvisoryCategory | 'All')[] = [
  'All',
  'Planting Tips',
  'Harvesting Tips',
  'Irrigation Tips',
];

export type CalendarEventType = 'planting' | 'harvest' | 'warning';

export type CalendarEvent = {
  id: string;
  type: CalendarEventType;
  day: number;
  month: string;
  title: string;
  description: string;
};

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'c1',
    type: 'planting',
    day: 15,
    month: 'MAY',
    title: 'Wet Season Transplanting Window Opens',
    description: 'Prepare seedlings and level the field for Lian, Batangas.',
  },
  {
    id: 'c2',
    type: 'harvest',
    day: 20,
    month: 'AUG',
    title: 'Expected Harvest \u2014 Field RF-2025-001',
    description: 'Based on Jan 15 planting date, ~105-day maturity variety.',
  },
  {
    id: 'c3',
    type: 'warning',
    day: 22,
    month: 'MAY',
    title: 'Typhoon Risk Window',
    description: 'Elevated tropical cyclone activity expected \u2014 secure equipment.',
  },
];

// Days (1-31) in the visible month that should show a dot marker on the grid.
export const CALENDAR_MARKED_DAYS = [15, 16, 17, 20];

export type NotificationType = 'warning' | 'info' | 'success' | 'announcement' | 'advisory';

export type AppNotification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timeAgo: string;
  unread: boolean;
};

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    type: 'warning',
    title: 'Heavy Rainfall Alert',
    message: 'Expected rainfall of 150mm in the next 48 hours. Farmers in low-lying areas should prepare drainage.',
    timeAgo: '30m ago',
    unread: true,
  },
  {
    id: 'n2',
    type: 'info',
    title: 'System Update',
    message: 'New 7-day weather forecast features are now available in Climate Monitoring.',
    timeAgo: '2h ago',
    unread: true,
  },
  {
    id: 'n3',
    type: 'success',
    title: 'Data Successfully Uploaded',
    message: 'Your rice production data for March 2026 has been processed and added to your history.',
    timeAgo: '5h ago',
    unread: false,
  },
  {
    id: 'n4',
    type: 'announcement',
    title: 'New Announcement Posted',
    message: '\u201cFree Certified Rice Seeds \u2014 Batch 2\u201d was just posted by your FA officer.',
    timeAgo: 'Yesterday',
    unread: false,
  },
  {
    id: 'n5',
    type: 'advisory',
    title: 'New Advisory Available',
    message: '\u201cAlternate Wetting and Drying to Save Water\u201d was added to Irrigation Tips.',
    timeAgo: '2 days ago',
    unread: false,
  },
];

export const UPDATES_PREVIEW = [
  {
    id: 'u1',
    icon: 'warning-outline' as const,
    tone: 'warning' as const,
    label: 'Announcement \u00b7 Typhoon Alert',
    excerpt: 'Tropical depression approaching Batangas. Secure equipment and check drainage.',
    time: 'Today \u00b7 2:30 PM',
  },
  {
    id: 'u2',
    icon: 'star-outline' as const,
    tone: 'info' as const,
    label: 'Advisory \u00b7 Planting Window Opening',
    excerpt: 'Wet season window for Lian opens May 15 \u2013 June 10. Prepare seedlings.',
    time: 'Yesterday \u00b7 10:15 AM',
  },
];