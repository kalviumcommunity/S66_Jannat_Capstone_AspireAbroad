import { useState,useEffect } from 'react';
import Tips from '../components/CountrytTips';
import globe from "../assets/Globe.webp"; 
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';
const accommodationsData = [
  {
    "id": 1,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQARab6AyeX3XHfMdjJMwzuB9c4UyLdXCDxLg&s",
    "city": "Toronto",
    "country": "Canada",
    "price": 1200,
    "type": "Apartment",
    "rating": 4.5
  },
  {
    "id": 2,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQab9aWfCKsZN0dLv0spXstDWGYx1r_UBObKw&s",
    "city": "Vancouver",
    "country": "Canada",
    "price": 1500,
    "type": "House",
    "rating": 4.2
  },
  {
    "id": 3,
    "image": "https://q-xx.bstatic.com/xdata/images/hotel/max500/565695424.jpg?k=6348e7513563b9a36cec4c8298814dcee65de13ed7c21a9bb0bacfacb5b5f3e6&o=",
    "city": "Montreal",
    "country": "Canada",
    "price": 950,
    "type": "Shared Room",
    "rating": 3.9
  },
  {
    "id": 4,
    "image": "https://cdn.realtor.ca/listing/TS638509627600400000/reb5/highres/0/15154380_1.jpg",
    "city": "Calgary",
    "country": "Canada",
    "price": 1100,
    "type": "Apartment",
    "rating": 4.1
  },
  {
    "id": 5,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHgvnXxHV5wu0ZTd76GNuCXM88vRtKr9BwQg&s",
    "city": "Sydney",
    "country": "Australia",
    "price": 1400,
    "type": "House",
    "rating": 4.3
  },
  {
    "id": 6,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPt_ZEVy3VfLt3fmWLlRXn-8M-qjPLhN4PeQ&s",
    "city": "Melbourne",
    "country": "Australia",
    "price": 1300,
    "type": "Student Residence",
    "rating": 4.0
  },
  {
    "id": 7,
    "image": "https://img.jamesedition.com/listing_images/2025/05/22/14/40/07/541d42d7-d458-4ab4-a532-9c3444b1e915/je/760x470xc.jpg",
    "city": "Brisbane",
    "country": "Australia",
    "price": 900,
    "type": "Shared Room",
    "rating": 3.8
  },
  {
    "id": 8,
    "image": "https://i2.au.reastatic.net/800x600/ed88715061fbb07d43bac44da18735e6375c7c990d91bf5c6616461327cfc8b9/image.jpg",
    "city": "Perth",
    "country": "Australia",
    "price": 1000,
    "type": "Apartment",
    "rating": 4.2
  },
  {
    "id": 9,
    "image": "https://img.jamesedition.com/listing_images/2025/02/13/17/21/20/2a941924-baf0-4607-97f6-00ff4f9dac9a/je/760x470xc.jpg",
    "city": "London",
    "country": "UK",
    "price": 1800,
    "type": "Apartment",
    "rating": 4.7
  },
  {
    "id": 10,
    "image": "https://www.reuters.com/resizer/v2/https%3A%2F%2Fcloudfront-us-east-2.images.arcpublishing.com%2Freuters%2FM3HWONRJ5RPQDD3DFY7RX53PQ4.jpg?auth=151c282bbb46f567a73f39cd28d202b838de0101a9d8823234420bbf57c79220",
    "city": "Manchester",
    "country": "UK",
    "price": 1100,
    "type": "House",
    "rating": 4.1
  },
  {
    "id": 11,
    "image": "https://photos2.spareroom.co.uk/images/flatshare/listings/unmodified/96/35/96352749.jpg?width=648&fit=bounds&auto=webp&optimize=medium",
    "city": "Birmingham",
    "country": "UK",
    "price": 1050,
    "type": "Shared Room",
    "rating": 3.7
  },
  {
    "id": 12,
    "image": "https://q-xx.bstatic.com/xdata/images/hotel/max500/81801305.jpg?k=8db5b3f1db5e67c80485751b951a489d9547ad69a346f1c2bf3a166c25f2a1c7&o=",
    "city": "Edinburgh",
    "country": "UK",
    "price": 1250,
    "type": "Apartment",
    "rating": 4.3
  },
  {
    "id": 13,
    "image": "https://costar.brightspotcdn.com/dims4/default/de6f539/2147483647/strip/true/crop/2048x1364+0+0/resize/2048x1364!/quality/100/?url=http%3A%2F%2Fcostar-brightspot.s3.us-east-1.amazonaws.com%2F0f%2F6a%2F6c116c9b43f7aaada041a38e7fa5%2Fbroadstone-north-ridge.jpg",
    "city": "New York",
    "country": "USA",
    "price": 2000,
    "type": "Apartment",
    "rating": 4.8
  },
  {
    "id": 14,
    "image": "https://assets-news.housing.com/news/wp-content/uploads/2021/11/12005706/American-House-Designs-shutterstock_473306311-1200x700-compressed.jpg",
    "city": "Los Angeles",
    "country": "USA",
    "price": 1800,
    "type": "House",
    "rating": 4.4
  },
  {
    "id": 15,
    "image": "https://gradright.com/wp-content/uploads/2024/01/image2-60.png",
    "city": "Chicago",
    "country": "USA",
    "price": 1400,
    "type": "Student Residence",
    "rating": 4.0
  },
  {
    "id": 16,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOlwi8WqMaWQ8Y0vhpxWPFoF9beL5SOfsKtw&s",
    "city": "Houston",
    "country": "USA",
    "price": 1000,
    "type": "Shared Room",
    "rating": 3.9
  },
  {
    "id": 17,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRDg93Dq5oJW0NPqFqK3YZXL2abj-bL6s3cg&s",
    "city": "Toronto",
    "country": "Canada",
    "price": 1250,
    "type": "Student Residence",
    "rating": 4.6
  },
  {
    "id": 18,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyBYOuxXpeSkJKDw73uo6Gk84x47nzI7uwQg&s",
    "city": "Vancouver",
    "country": "Canada",
    "price": 1600,
    "type": "House",
    "rating": 4.4
  },
  {
    "id": 19,
    "image": "https://cdn.realtor.ca/listing/TS638835005072270000/reb5/highres/3/11527723_1.jpg",
    "city": "Montreal",
    "country": "Canada",
    "price": 950,
    "type": "Apartment",
    "rating": 4.1
  },
  {
    "id": 20,
    "image": "https://www.roomies.pics/image/upload/c_fill,dpr_1.0,f_jpg,fl_lossy,g_auto,h_382,q_auto:good,w_896/uibszy4shfvajqo47ua0",
    "city": "Calgary",
    "country": "Canada",
    "price": 1050,
    "type": "Shared Room",
    "rating": 3.9
  },
  {
    "id": 21,
    "image": "https://img.jamesedition.com/listing_images/2025/01/23/09/29/29/db2729a7-968f-42b7-92b4-143a7914e623/je/760x470xc.jpg",
    "city": "Sydney",
    "country": "Australia",
    "price": 1450,
    "type": "Apartment",
    "rating": 4.3
  },
  {
    "id": 22,
    "image": "https://images.unsplash.com/photo-1560448070-c0c03deeb83f",
    "city": "Melbourne",
    "country": "Australia",
    "price": 1300,
    "type": "House",
    "rating": 4.2
  },
  {
    "id": 23,
    "image": "https://asset.mansionglobal.com/editorial/in-australia--inner-cities-reach-new-heights-in-luxury-living/assets/Ftquz3ERU3/australia_newfalldevs2020_lead-2560x1400.jpeg",
    "city": "Brisbane",
    "country": "Australia",
    "price": 950,
    "type": "Shared Room",
    "rating": 3.8
  },
  {
    "id": 24,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ52tENMR5HtUjS66Gq8fLdN8CrQbl84nx0Q&s",
    "city": "Perth",
    "country": "Australia",
    "price": 1100,
    "type": "Student Residence",
    "rating": 4.1
  },
  {
    "id": 25,
    "image": "https://i.guim.co.uk/img/media/0cff81c15ed3f17086dcdf295da1979bc31ccb04/0_612_5272_3163/master/5272.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=b138139e2e0841d3656260cf451f7632",
    "city": "London",
    "country": "UK",
    "price": 1850,
    "type": "House",
    "rating": 4.5
  },
  {
    "id": 26,
    "image": "https://i.guim.co.uk/img/media/0cff81c15ed3f17086dcdf295da1979bc31ccb04/0_612_5272_3163/master/5272.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=b138139e2e0841d3656260cf451f7632",
    "city": "Manchester",
    "country": "UK",
    "price": 1150,
    "type": "Apartment",
    "rating": 4.0
  },
  {
    "id": 27,
    "image": "https://i.guim.co.uk/img/media/27539fa1249f00a6a8e495c5c0cdd0810bd5c933/47_319_8317_4991/master/8317.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=862b1b4ef0156fedf83e438fdc88959d",
    "city": "Birmingham",
    "country": "UK",
    "price": 1100,
    "type": "Shared Room",
    "rating": 3.6
  },
  {
    "id": 28,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpE5u3GEDDN2_eHGPqhru59s1nWlRFSHZQ4A&s",
    "city": "Edinburgh",
    "country": "UK",
    "price": 1300,
    "type": "Apartment",
    "rating": 4.4
  },
  {
    "id": 29,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe7gmR21T8iBj2odPpz7pbQx-AzDxakTBsaQ&s",
    "city": "New York",
    "country": "USA",
    "price": 2100,
    "type": "House",
    "rating": 4.9
  },
  {
    "id": 30,
    "image": "https://c8.alamy.com/comp/M6F99M/modern-architecture-of-washington-dc-usa-residential-luxury-apartments-M6F99M.jpg",
    "city": "Los Angeles",
    "country": "USA",
    "price": 1750,
    "type": "Apartment",
    "rating": 4.3
  },
  {
    "id": 31,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjzrdked8N2hzGQnFJf8gKVorT0pJlfqi5VA&s",
    "city": "Chicago",
    "country": "USA",
    "price": 1450,
    "type": "Shared Room",
    "rating": 4.0
  },
  {
    "id": 32,
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/1_Armista_Apartments_555_E._100_South_Salt_Lake_City_Utah_USA.jpg/640px-1_Armista_Apartments_555_E._100_South_Salt_Lake_City_Utah_USA.jpg",
    "city": "Houston",
    "country": "USA",
    "price": 1050,
    "type": "Apartment",
    "rating": 3.8
  },
  {
    "id": 33,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAKO2ZvfA9sXR3g8DxGagbqvhK8fypYdZQsQ&s",
    "city": "Toronto",
    "country": "Canada",
    "price": 1300,
    "type": "House",
    "rating": 4.7
  },
  {
    "id": 34,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ7Ar4SlSUMAbppAKnf9ZPA7zK5inBnBEhUg&s",
    "city": "Vancouver",
    "country": "Canada",
    "price": 1550,
    "type": "Apartment",
    "rating": 4.4
  },
  {
    "id": 35,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS456gBWFiIPtMb1ajcSHWppAXVewKs2lq4wQ&s",
    "city": "Montreal",
    "country": "Canada",
    "price": 1000,
    "type": "Student Residence",
    "rating": 4.1
  },
  {
    "id": 36,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrQGHCRtTyO6Li6-gfRjpF9VP6HOZKuv9Hag&s",
    "city": "Calgary",
    "country": "Canada",
    "price": 1150,
    "type": "Apartment",
    "rating": 4.2
  },
  {
    "id": 37,
    "image": "https://images.unsplash.com/photo-1560448070-c0c03deeb83f",
    "city": "Sydney",
    "country": "Australia",
    "price": 1480,
    "type": "House",
    "rating": 4.3
  },
  {
    "id": 38,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdS5ya5DkQPOdSNtRlviR1XHWTaFoPGCVAJQ&s",
    "city": "Melbourne",
    "country": "Australia",
    "price": 1350,
    "type": "Apartment",
    "rating": 4.0
  },
  {
    "id": 39,
    "image": "https://img-v2.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fm.sothebysrealty.com%2F1103i215%2F2mde379zmbkzm32kvwmg8kpvb0i215&option=N&h=472&permitphotoenlargement=false",
    "city": "Brisbane",
    "country": "Australia",
    "price": 2000,
    "type": "Shared Room",
    "rating": 3.9
  },
  {
    "id": 40,
    "image": "https://rimh2.domainstatic.com.au/mRd5zeXIe68jraDCK5T--Lhnd3g=/660x440/filters:format(jpeg):quality(80)/2018813530_4_1_231004_113641-w2048-h1365",
    "city": "Perth",
    "country": "Australia",
    "price": 1120,
    "type": "Student Residence",
    "rating": 4.1
  },
  {
    "id": 41,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT46ahu91M754s7KeZfyJ2oH7n-GpZ2XhlQ6w&s",
    "city": "London",
    "country": "UK",
    "price": 1900,
    "type": "Apartment",
    "rating": 4.6
  },
  {
    "id": 42,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgxA6j_bKEafxMbbiy53h7_zt63AuAjWIhBQ&s",
    "city": "Manchester",
    "country": "UK",
    "price": 1180,
    "type": "House",
    "rating": 4.1
  },
  {
    "id": 43,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvshl5dP21YGvjfjo-smt6iN7ybZHG4JDEKw&s",
    "city": "Birmingham",
    "country": "UK",
    "price": 1130,
    "type": "Shared Room",
    "rating": 3.7
  },
  {
    "id": 44,
    "image": "https://www.shutterstock.com/image-photo/modern-highrise-mediumrise-apartment-buildings-600w-2493851823.jpg",
    "city": "Edinburgh",
    "country": "UK",
    "price": 1320,
    "type": "Apartment",
    "rating": 4.5
  },
  {
    "id": 45,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKoNaLXlX-w4YvAsJdintBvmRSVWzFce385w&s",
    "city": "New York",
    "country": "USA",
    "price": 2200,
    "type": "Student Residence",
    "rating": 4.9
  },
  {
    "id": 46,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtHX0FTHALpVjNhx70F1MCCFyB-LKXjkX_FA&s",
    "city": "Los Angeles",
    "country": "USA",
    "price": 1780,
    "type": "Shared Room",
    "rating": 4.2
  },
  {
    "id": 47,
    "image": "https://c8.alamy.com/comp/D2RXE6/high-rise-apartment-building-new-york-city-usa-D2RXE6.jpg",
    "city": "Chicago",
    "country": "USA",
    "price": 1500,
    "type": "Apartment",
    "rating": 4.1
  },
  {
    "id": 48,
    "image": "https://www.shutterstock.com/image-photo/leesburg-virginia-usa-july-2-600nw-2326984263.jpg",
    "city": "Houston",
    "country": "USA",
    "price": 1100,
    "type": "House",
    "rating": 3.9
  },
  {
    "id": 49,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHVgM2xC23sJaBfCrWiZwq9dyEpfpjZxZzng&s",
    "city": "Toronto",
    "country": "Canada",
    "price": 1350,
    "type": "Apartment",
    "rating": 4.6
  },
  {
    "id": 50,
    "image": "https://images.ctfassets.net/8bbwomjfix8m/4AfebJ954jpxTeLFWq2r8U/8e57e20cd055195777a865fb5b297525/BODY_IMAGE_-_International_Students_in_Canada-_Here-s_How_You_Can_Find_a_Rental_Apartment_-_student_residences_-_Canada.jpeg",
    "city": "Vancouver",
    "country": "Canada",
    "price": 1600,
    "type": "Student Residence",
    "rating": 4.3
  },
  {
    "id": 51,
    "image": "https://macleans.ca/_next/image/?url=https%3A%2F%2Fcms.macleans.ca%2Fwp-content%2Fuploads%2F2025%2F03%2FStudio-North_bowling-lane-house-2-scaled.jpg&w=3840&q=75",
    "city": "Montreal",
    "country": "Canada",
    "price": 1050,
    "type": "House",
    "rating": 4.0
  },
  {
    "id": 52,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThjVrwYjkgcFYsctizgsmaxAMDyRIkdcWMvA&s",
    "city": "Calgary",
    "country": "Canada",
    "price": 1180,
    "type": "Apartment",
    "rating": 4.1
  },
  {
    "id": 53,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh080za8PCXG51v3J1OJFNH9kOgiCA2tZfkA&s",
    "city": "Sydney",
    "country": "Australia",
    "price": 1500,
    "type": "Student Residence",
    "rating": 4.3
  },
  {
    "id": 54,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVrkGPWVRZhi63o3RblYjJPYSkMdXAWWbtgA&s",
    "city": "Melbourne",
    "country": "Australia",
    "price": 1380,
    "type": "Apartment",
    "rating": 4.2
  },
  {
    "id": 55,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx1Uak39wkYbUvARAbjk911mjEQivWDpf75g&s",
    "city": "Brisbane",
    "country": "Australia",
    "price": 1000,
    "type": "Shared Room",
    "rating": 3.8
  },
  {
    "id": 56,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6WuIq2JwrSyvfhXQ1oRLnlHxMyPvOg_H8fA&s",
    "city": "Perth",
    "country": "Australia",
    "price": 1150,
    "type": "House",
    "rating": 4.1
  },
  {
    "id": 57,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ28JEMsJ5VqAhUp9fU3RWrgVhnxFLBaJLT9g&s",
    "city": "London",
    "country": "UK",
    "price": 1920,
    "type": "Student Residence",
    "rating": 4.7
  },
  {
    "id": 58,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpPAlV4n_nukkNs0AYxlJQwNqC--8GCdoOcw&s",
    "city": "Manchester",
    "country": "UK",
    "price": 1200,
    "type": "Apartment",
    "rating": 4.0
  },
  {
    "id": 59,
    "image": "https://assets.amberstudent.com/inventories/259953/dbd92caf.jpg?w=720&fit=fill&q=80&auto=format&trim=auto",
    "city": "Birmingham",
    "country": "UK",
    "price": 1140,
    "type": "House",
    "rating": 3.8
  },
  {
    "id": 60,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZf57XCfO548YpfUXyDF3nyvCMojcXbMjGKg&s",
    "city": "Edinburgh",
    "country": "UK",
    "price": 1340,
    "type": "Apartment",
    "rating": 4.4
  },
    {
    id: 4,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj5RYCCCnbfjpX_i6IxTKKti-U6beRhYNltBHdrGZNxi227zuyze62AyJZ7a-0mctSfoQ&usqp=CAU",
    city: "Sydney",
    country: "Australia",
    price: 1300,
    type: "Apartment",
    rating: 4.3,
  },
  {
    id: 5,
    image: "https://img.jamesedition.com/listing_images/2025/05/13/16/51/19/8b21c18e-c981-4216-bd02-5a371f5cf3c9/je/507x312xc.jpg",
    city: "Melbourne",
    country: "Australia",
    price: 2500,
    type: "Apartment",
    rating: 4.1,
  },
  {
    id: 6,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLjPjV4KCBcbeidSFgEPHdYqk3s_r3LZP5AA&shttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYJ1ZUkTsIl6tSUIJnUVYxRwSfuTUtklXsIA&s",
    city: "Brisbane",
    country: "Australia",
    price: 1250,
    type: "Apartment",
    rating: 4.0,
  },
  {
    id: 7,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Tc93Pk87SXGwZE9R-TKQVZ8w0L5iA_-kHA&s",
    city: "Sydney",
    country: "Australia",
    price: 1800,
    type: "House",
    rating: 4.6,
  },
  {
    id: 8,
    image: "https://www.realestate.com.au/news-image/w_1280,h_720/v1659503447/news-lifestyle-content-assets/wp-content/production/capi_4c2eb88bd9f053c58f2702686bea24d2_d69e249d3d2cf594c37dbef9f3b83a45.jpeg?_i=AA",
    city: "Melbourne",
    country: "Australia",
    price: 1700,
    type: "House",
    rating: 4.4,
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1600585154261-4bd71c5f22c2",
    city: "Brisbane",
    country: "Australia",
    price: 950,
    type: "Shared Room",
    rating: 3.7,
  },
  {
    id: 10,
    image: "https://flatmates-res.cloudinary.com/image/upload/c_fill,dpr_2.0,f_auto,h_360,q_auto,w_640/v1/user_property/ebwdnaj9mxr9j6qnf8ww",
    city: "Sydney",
    country: "Australia",
    price: 1050,
    type: "Shared Room",
    rating: 3.9,
  },
  {
    id: 11,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP9d6vYI7Oh514ZLwYd1LHZLVzlIKe2JdJzQ&s",
    city: "Perth",
    country: "Australia",
    price: 1000,
    type: "Shared Room",
    rating: 4.0,
  },
  {
    id: 12,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSclRG7UjTTO5Tv6wpLX9iVgU9pKLRY1tB9Q&s",
    city: "Melbourne",
    country: "Australia",
    price: 1100,
    type: "Student Residence",
    rating: 4.2,
  },
  {
    id: 13,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1qkJjnk8NSrXsUuZRjQr8IUT4RZDnHpk09zACkgmPFogn1Nxok37BYXnrYaKzgyISljw&usqp=CAU",
    city: "Perth",
    country: "Australia",
    price: 1150,
    type: "Student Residence",
    rating: 4.1,
  },
]

const Assistance = () => {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const countries = ['Canada', 'Australia', 'UK', 'USA'];
  const citiesByCountry = {
    Canada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary'],
    Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
    UK: ['London', 'Manchester', 'Birmingham', 'Edinburgh'],
    USA: ['New York', 'Los Angeles', 'Chicago', 'Houston'],
  };

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      const results = accommodationsData.filter(acc => {
        if (country && acc.country !== country) return false;
        if (city && acc.city !== city) return false;
        return true;
      });
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  };

  const handleReset = () => {
    setCountry('');
    setCity('');
    setSearchResults([]);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">

        <div
  className="absolute inset-0 bg-cover bg-center opacity-50"
  style={{ backgroundImage: `url(${globe})`, backgroundPosition: '50% 9%' }}
></div>
                <div className='relative z-10'>

        <MainNav/>
      <div className="w-full max-w-6xl mx-auto flex-grow px-6 py-12 flex flex-col mt-12">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-[#003366] mb-2">Explore Stays That Fit Your Journey Perfectly</h2>
          <p className="text-lg text-black">Search accommodations worldwide</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
            <select
              value={country}
              onChange={e => {
                  setCountry(e.target.value);
                  setCity('');
                }}
                className="flex-1 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
                >
              <option value="">Select Country</option>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select
              value={city}
              onChange={e => setCity(e.target.value)}
              disabled={!country}
              className="flex-1 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition disabled:bg-gray-100"
              >
              <option value="">Select City</option>
              {country && citiesByCountry[country].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleReset}
              className="flex-1 py-3 bg-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-300 transition"
              >
              Reset
            </button>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="flex-1 py-3 bg-[#003366] rounded-lg text-white font-medium hover:bg-[#B52721] transition disabled:bg-blue-400"
              >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>


        <div className="flex-1 flex flex-col">
          {isLoading ? (
              <div className="flex-grow flex items-center justify-center">
              <div className="animate-spin h-12 w-12 border-4 border-[#003366] border-t-transparent rounded-full"></div>
            </div>
          ) : searchResults.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
              {searchResults.map(acc => (
                  <div
                  key={acc.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
                  >
                  <div className="h-48 relative">
                    <img
                      src={acc.image}
                      alt={`${acc.type} in ${acc.city}`}
                      className="w-full h-full object-cover"
                      />
                    <span className="absolute top-3 right-3 bg-[#B52721] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {acc.rating} ★
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{acc.city}, {acc.country}</h3>
                      <p className="text-gray-500">{acc.type}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-2xl font-extrabold text-[#003366]">${acc.price}<span className="text-base font-normal text-gray-500">/mo</span></span>
                      <button className="px-4 py-2 bg-[#003366] cursor-pointer text-white rounded-lg hover:bg-[#B52721] transition">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
              <div className="flex-grow flex items-center justify-center">
              <p className="text-[#B52721] italic">No accommodations found. Adjust your filters and try again!</p>
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="mt-12 py-8 rounded-xl bg-white shadow-lg">
          <h2 className="text-3xl text-center font-bold text-[#003366] mb-6">
            Accommodation Tips by Country
          </h2>
          <Tips selectedCountry={country} />
        </div>

      </div>
      <Footer/>
          </div>
    </div>
  );
};

export default Assistance;