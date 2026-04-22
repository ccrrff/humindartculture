// src/data/contact.ts
export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours: string;
  mapSrc: string;
}

export const contactInfo: ContactInfo = {
  phone: '02-000-0000',
  email: 'artcompany@example.com',
  address: '서울특별시 종로구 문화예술로 1길',
  hours: '평일 09:00 – 18:00',
  mapSrc:
    'https://maps.google.com/maps?q=서울특별시+종로구&t=&z=15&ie=UTF8&iwloc=&output=embed',
};
