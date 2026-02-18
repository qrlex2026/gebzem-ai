
export enum CategoryType {
  CAFE = 'Kafeler',
  RESTAURANT = 'Restoranlar',
  SERVICE = 'Hizmetler',
  EVENT = 'Etkinlikler'
}

export interface Business {
  id: string;
  name: string;
  category: CategoryType;
  rating: number;
  reviewCount: number;
  address: string;
  image: string;
  description: string;
  workingHours: string;
  phone: string;
  isPromoted?: boolean;
}

export interface CityEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  category: string;
  description: string;
}

export type Screen = 'home' | 'category' | 'details' | 'events' | 'ai-guide';
