interface ProviderCard {
  id: number;
  category: string;
  city: string;
  provider: string;
  description: string;
  rating: number;
  avatarUrl: string;
}

export const providerCards: ProviderCard[] = [
  { id: 1,   category: 'Cleaning',     city: 'Paris',     provider:'User1', description: 'We\'ll make your kitchen sparkle.',  rating: 4.9,   avatarUrl:""},
  { id: 2,   category: 'Childcare',    city: 'Lyon',      provider:'User2', description: 'CPR‑certified, 5 yrs exp.',           rating: 4.8,  avatarUrl:""},
  { id: 3,   category: 'Home Repairs', city: 'Marseille', provider:'User3', description: 'Fix & tune all major appliances.',   rating: 4.7,  avatarUrl:""},
]