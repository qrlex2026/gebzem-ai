
import { Business, CategoryType, CityEvent } from './types';

export const BUSINESSES: Business[] = [
  {
    id: '1',
    name: 'Tarihi Gebze Simitçisi',
    category: CategoryType.CAFE,
    rating: 4.8,
    reviewCount: 1240,
    address: 'Hacı Halil, İsmet Paşa Cd. No:12, Gebze',
    image: 'https://picsum.photos/seed/simit/800/600',
    description: '1950\'den beri değişmeyen lezzet. Gebze\'nin en meşhur çıtır simitlerinin adresi.',
    workingHours: '06:00 - 20:00',
    phone: '0262 641 00 00',
    isPromoted: true
  },
  {
    id: '2',
    name: 'Ballıkayalar Et Mangal',
    category: CategoryType.RESTAURANT,
    rating: 4.6,
    reviewCount: 850,
    address: 'Tavşanlı Köyü, Ballıkayalar Tabiat Parkı Yanı',
    image: 'https://picsum.photos/seed/mangal/800/600',
    description: 'Doğa ile iç içe, muhteşem vadi manzarası eşliğinde enfes ızgara çeşitleri.',
    workingHours: '09:00 - 22:00',
    phone: '0262 751 00 00'
  },
  {
    id: '3',
    name: 'Gebze Teknik Çarşı',
    category: CategoryType.SERVICE,
    rating: 4.2,
    reviewCount: 450,
    address: 'Cumhuriyet Mah. 2254. Sk, Gebze',
    image: 'https://picsum.photos/seed/service/800/600',
    description: 'Tüm teknik ihtiyaçlarınız, elektronik tamiri ve bilgisayar servis hizmetleri.',
    workingHours: '08:30 - 19:00',
    phone: '0262 642 00 00'
  },
  {
    id: '4',
    name: 'Espresso Lab Gebze',
    category: CategoryType.CAFE,
    rating: 4.7,
    reviewCount: 2100,
    address: 'Güzeller, Yeni Bağdat Cd. No:500, Gebze',
    image: 'https://picsum.photos/seed/coffee/800/600',
    description: 'Üçüncü nesil kahve deneyimi, modern çalışma alanları ve taze pastalar.',
    workingHours: '07:30 - 00:00',
    phone: '0262 643 00 00',
    isPromoted: true
  },
  {
    id: '5',
    name: 'Kebapçı İskender',
    category: CategoryType.RESTAURANT,
    rating: 4.9,
    reviewCount: 3200,
    address: 'Sultan Orhan, Menzilhane Cd., Gebze',
    image: 'https://picsum.photos/seed/kebab/800/600',
    description: 'Geleneksel Bursa İskender kebabının Gebze\'deki en lezzetli durağı.',
    workingHours: '11:00 - 22:30',
    phone: '0262 644 00 00'
  }
];

export const EVENTS: CityEvent[] = [
  {
    id: 'e1',
    title: 'Osman Hamdi Bey Sergisi',
    date: '15 Mart 2024',
    location: 'Eskihisar Kalesi',
    image: 'https://picsum.photos/seed/museum/800/600',
    category: 'Kültür & Sanat',
    description: 'Ünlü ressam Osman Hamdi Bey\'in Gebze yıllarını anlatan özel dijital sergi.'
  },
  {
    id: 'e2',
    title: 'Gençlik Konseri: Mabel Matiz',
    date: '20 Mart 2024',
    location: 'Gebze Kent Meydanı',
    image: 'https://picsum.photos/seed/concert/800/600',
    category: 'Müzik',
    description: 'Baharın gelişini Gebze Kent Meydanı\'nda dev bir konserle kutluyoruz.'
  }
];
