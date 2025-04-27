/** 服务人员资料 */
interface Provider {
  name: string
  rating: number
  specialty: string
}

export const providers: Provider[] = [
  {
    name: 'Auntie Zhang',
    rating: 4.9,
    specialty: 'Home cleaning and deep sanitization',
  },
  {
    name: 'Mr. Li',
    rating: 4.8,
    specialty: 'General home repairs and handyman services',
  },
  {
    name: 'Ms. Wang',
    rating: 4.7,
    specialty: 'Childcare and early childhood tutoring',
  },
]
