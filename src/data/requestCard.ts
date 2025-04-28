interface RequestCard {
  id: number;
  title: string;
  category: string;
  city: string;
  description: string;
  rating: number;
}

export const requests: RequestCard[] = [
  { id: 1, title: 'Deep Kitchen Cleaning',  category: 'Cleaning',     city: 'Paris',     description: 'We\'ll make your kitchen sparkle.', rating: 4.9 },
  { id: 2, title: 'Evening Childcare',      category: 'Childcare',    city: 'Lyon',      description: 'CPR‑certified, 5 yrs exp.',          rating: 4.8 },
  { id: 3, title: 'Appliance Maintenance',  category: 'Home Repairs', city: 'Marseille', description: 'Fix & tune all major appliances.',  rating: 4.7 },
]
