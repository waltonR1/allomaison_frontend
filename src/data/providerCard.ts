import { providerLabel } from "@/data/providerLabel.ts";

interface providerCard {
  id: number;
  category: string;
  city: string;
  provider: string;
  description: string;
  rating: number;
  avatarUrl: string;
  servicesOffered: string[];
  serviceArea: string;
  availabilityTime: string;
  customerReview: { author: string ; content: string }[];
  providerLabels: providerLabel[];
  priceRange: string;
}

export const providerCards: providerCard[] = [
  {
    id: 1,
    category: 'Cleaning',
    city: 'Paris',
    provider: 'Julie C.',
    description: 'Sparkling kitchens and spotless bathrooms — your home will shine like new.',
    rating: 4.9,
    avatarUrl: '/images/avatars/julie.png',
    servicesOffered: ['Kitchen deep cleaning', 'Bathroom sanitization', 'Dusting and vacuuming', 'Window cleaning (interior)'],
    serviceArea: 'Paris + 15km',
    availabilityTime: 'Mon–Fri: 09:00–18:00, Sat: 10:00–14:00',
    customerReview: [
      { content: 'Julie was incredibly thorough and left our apartment spotless.', author: 'Emma T., Paris' },
      { content: 'Punctual, kind, and efficient. Will book again!', author: 'Lucas D., Paris' }
    ],
    providerLabels: [providerLabel.LicensedCleaner, providerLabel.EcoFriendly],
    priceRange: '€25–€35/hour',
  },
  {
    id: 2,
    category: 'Childcare',
    city: 'Lyon',
    provider: 'Amélie B.',
    description: 'CPR-certified babysitter with 5 years of experience. Safe and caring environment guaranteed.',
    rating: 4.8,
    avatarUrl: '/images/avatars/amelie.png',
    servicesOffered: ['After-school care', 'Meal prep for kids', 'Storytime and creative play', 'Homework supervision'],
    serviceArea: 'Lyon center + 10km',
    availabilityTime: 'Mon–Fri: 15:00–20:00, Sat–Sun: 10:00–18:00',
    customerReview: [
      { content: 'My kids adore Amélie! She’s trustworthy and creative.', author: 'Sophie R., Lyon' },
      { content: 'Reliable and flexible. A real help for busy parents.', author: 'Karim M., Lyon' }
    ],
    providerLabels: [providerLabel.CPRCertified, providerLabel.EarlyEducationQualified],
    priceRange: '€20–€30/hour',
  },
  {
    id: 3,
    category: 'Home Repairs',
    city: 'Marseille',
    provider: 'Marc V.',
    description: 'Fixing appliances, plumbing issues, and home hardware with professionalism.',
    rating: 4.7,
    avatarUrl: '/images/avatars/marc.png',
    servicesOffered: ['Appliance repair', 'Leaky taps and plumbing fixes', 'Furniture assembly', 'Door & window repair'],
    serviceArea: 'Marseille city + 20km',
    availabilityTime: 'Daily: 08:00–20:00',
    customerReview: [
      { content: 'Marc fixed my washing machine quickly and explained everything clearly.', author: 'Nina G., Marseille' },
      { content: 'Very professional and polite. Honest pricing too.', author: 'Antoine F., Marseille' }
    ],
    providerLabels: [providerLabel.CertifiedHandyman, providerLabel.QuickEstimateProvided],
    priceRange: '€20–€30/hour',
  },
  {
    id: 4,
    category: 'Pet Sitting',
    city: 'Toulouse',
    provider: 'Camille R.',
    description: 'Loving care for your furry friends when you’re away.',
    rating: 5.0,
    avatarUrl: '/images/avatars/camille.png',
    servicesOffered: ['Daily dog walking', 'Cat feeding and playtime', 'Overnight pet sitting', 'Medication administration'],
    serviceArea: 'Toulouse + 10km',
    availabilityTime: 'Mon–Sun: 07:00–22:00',
    customerReview: [
      { content: 'Camille took such great care of my senior cat. Highly recommend!', author: 'Pauline L., Toulouse' },
      { content: 'Even sent daily photos and updates. Amazing!', author: 'Hugo V., Toulouse' }
    ],
    providerLabels: [providerLabel.CPRCertified, providerLabel.OvernightCare],
    priceRange: '€20–€30/hour',
  },
  {
    id: 5,
    category: 'Elderly Care',
    city: 'Nice',
    provider: 'Youssef A.',
    description: 'Compassionate support for seniors, including companionship and daily tasks.',
    rating: 4.6,
    avatarUrl: '/images/avatars/youssef.png',
    servicesOffered: ['Grocery shopping', 'Meal preparation', 'Medication reminders', 'Conversation & companionship'],
    serviceArea: 'Nice + 10km',
    availabilityTime: 'Mon–Fri: 08:00–19:00',
    customerReview: [
      { content: 'Youssef was a true companion for my father. Very patient and respectful.', author: 'Isabelle D., Nice' },
      { content: 'Always on time and attentive. Great support for our family.', author: 'Mickael S., Nice' }
    ],
    providerLabels: [providerLabel.CertifiedCaregiver, providerLabel.MobilityAssistance],
    priceRange: '€20–€30/hour',
  }
];
