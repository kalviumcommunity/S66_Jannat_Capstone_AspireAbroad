const accommodationsData = [
  {
    id: 1,
    image: 'https://source.unsplash.com/featured/?apartment',
    city: 'Toronto',
    country: 'Canada',
    price: 1200,
    type: 'Apartment',
    rating: 4.5
  },
  {
    id: 2,
    image: 'https://source.unsplash.com/featured/?house',
    city: 'Vancouver',
    country: 'Canada',
    price: 1500,
    type: 'House',
    rating: 4.2
  },
  {
    id: 3,
    image: 'https://source.unsplash.com/featured/?room',
    city: 'Montreal',
    country: 'Canada',
    price: 800,
    type: 'Shared Room',
    rating: 4.0
  },
  {
    id: 4,
    image: 'https://source.unsplash.com/featured/?residence',
    city: 'Calgary',
    country: 'Canada',
    price: 950,
    type: 'Student Residence',
    rating: 4.1
  },
  {
    id: 5,
    image: 'https://source.unsplash.com/featured/?homestay',
    city: 'Sydney',
    country: 'Australia',
    price: 1100,
    type: 'Homestay',
    rating: 4.3
  },
  {
    id: 6,
    image: 'https://source.unsplash.com/featured/?australia-house',
    city: 'Melbourne',
    country: 'Australia',
    price: 1350,
    type: 'House',
    rating: 4.6
  },
  {
    id: 7,
    image: 'https://source.unsplash.com/featured/?shared-room',
    city: 'Brisbane',
    country: 'Australia',
    price: 750,
    type: 'Shared Room',
    rating: 3.9
  },
  {
    id: 8,
    image: 'https://source.unsplash.com/featured/?student',
    city: 'Perth',
    country: 'Australia',
    price: 1050,
    type: 'Student Residence',
    rating: 4.0
  },
  {
    id: 9,
    image: 'https://source.unsplash.com/featured/?uk-apartment',
    city: 'London',
    country: 'UK',
    price: 1800,
    type: 'Apartment',
    rating: 4.7
  },
  {
    id: 10,
    image: 'https://source.unsplash.com/featured/?uk-house',
    city: 'Manchester',
    country: 'UK',
    price: 1300,
    type: 'House',
    rating: 4.4
  },
  {
    id: 11,
    image: 'https://source.unsplash.com/featured/?uk-shared',
    city: 'Birmingham',
    country: 'UK',
    price: 850,
    type: 'Shared Room',
    rating: 4.0
  },
  {
    id: 12,
    image: 'https://source.unsplash.com/featured/?uk-student',
    city: 'Edinburgh',
    country: 'UK',
    price: 1000,
    type: 'Student Residence',
    rating: 4.1
  },
  {
    id: 13,
    image: 'https://source.unsplash.com/featured/?usa-apartment',
    city: 'New York',
    country: 'USA',
    price: 2200,
    type: 'Apartment',
    rating: 4.8
  },
  {
    id: 14,
    image: 'https://source.unsplash.com/featured/?la-house',
    city: 'Los Angeles',
    country: 'USA',
    price: 1900,
    type: 'House',
    rating: 4.3
  },
  {
    id: 15,
    image: 'https://source.unsplash.com/featured/?usa-room',
    city: 'Chicago',
    country: 'USA',
    price: 950,
    type: 'Shared Room',
    rating: 4.0
  },
  {
    id: 16,
    image: 'https://source.unsplash.com/featured/?houston-student',
    city: 'Houston',
    country: 'USA',
    price: 1050,
    type: 'Student Residence',
    rating: 4.2
  },
  {
    id: 17,
    image: 'https://source.unsplash.com/featured/?cozy-room',
    city: 'Toronto',
    country: 'Canada',
    price: 1400,
    type: 'Homestay',
    rating: 4.1
  },
  {
    id: 18,
    image: 'https://source.unsplash.com/featured/?modern-apartment',
    city: 'Sydney',
    country: 'Australia',
    price: 1600,
    type: 'Apartment',
    rating: 4.5
  },
  {
    id: 19,
    image: 'https://source.unsplash.com/featured/?family-house',
    city: 'Manchester',
    country: 'UK',
    price: 1250,
    type: 'Homestay',
    rating: 4.0
  },
  {
    id: 20,
    image: 'https://source.unsplash.com/featured/?student-accommodation',
    city: 'Brisbane',
    country: 'Australia',
    price: 980,
    type: 'Student Residence',
    rating: 3.8
  },
  {
    id: 21,
    image: 'https://source.unsplash.com/featured/?downtown-apartment',
    city: 'New York',
    country: 'USA',
    price: 2500,
    type: 'Apartment',
    rating: 4.9
  },
  {
    id: 22,
    image: 'https://source.unsplash.com/featured/?co-living',
    city: 'Chicago',
    country: 'USA',
    price: 1000,
    type: 'Shared Room',
    rating: 4.2
  },
  {
    id: 23,
    image: 'https://source.unsplash.com/featured/?urban-living',
    city: 'London',
    country: 'UK',
    price: 2100,
    type: 'Apartment',
    rating: 4.6
  },
  {
    id: 24,
    image: 'https://source.unsplash.com/featured/?garden-house',
    city: 'Edinburgh',
    country: 'UK',
    price: 1200,
    type: 'House',
    rating: 4.3
  },
  {
    id: 25,
    image: 'https://source.unsplash.com/featured/?green-living',
    city: 'Melbourne',
    country: 'Australia',
    price: 1450,
    type: 'Homestay',
    rating: 4.2
  },
  {
    id: 26,
    image: 'https://source.unsplash.com/featured/?college-dorm',
    city: 'Montreal',
    country: 'Canada',
    price: 890,
    type: 'Student Residence',
    rating: 3.9
  },
  {
    id: 27,
    image: 'https://source.unsplash.com/featured/?quiet-room',
    city: 'Calgary',
    country: 'Canada',
    price: 920,
    type: 'Shared Room',
    rating: 4.0
  },
  {
    id: 28,
    image: 'https://source.unsplash.com/featured/?student-living',
    city: 'Houston',
    country: 'USA',
    price: 1080,
    type: 'Homestay',
    rating: 4.0
  },
  {
    id: 29,
    image: 'https://source.unsplash.com/featured/?apartment-interior',
    city: 'Perth',
    country: 'Australia',
    price: 1150,
    type: 'Apartment',
    rating: 4.3
  },
  {
    id: 30,
    image: 'https://source.unsplash.com/featured/?rental-home',
    city: 'Los Angeles',
    country: 'USA',
    price: 2000,
    type: 'House',
    rating: 4.5
  }
];
export default accommodationsData
