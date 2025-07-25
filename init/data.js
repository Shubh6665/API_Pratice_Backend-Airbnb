//Step 3 storing data at one place in the dbs schema format in an array

const sampleListings = [
    {
      title: "Cozy Beachfront Cottage",
      description: "Charming cottage with direct access to a private beach.",
      image: { 
        url: "https://www.bogmallobeachresort.com/wp-content/uploads/2024/06/F8A7998.webp",
        filename: "listingimage"
      },
      price: 1500,
      location: "Goa",
      country: "India",
    },
    {
      title: "Luxury Penthouse in Mumbai",
      description: "Stunning penthouse with panoramic city views.",
      image: { 
        url: "https://www.bogmallobeachresort.com/wp-content/uploads/2024/06/F8A8019.webp",
        filename: "listingimage"
      },
      price: 2000,
      location: "Mumbai",
      country: "India",
    },
    {
      title: "Rustic Mountain Cabin",
      description: "Peaceful cabin surrounded by pine forests in the Himalayas.",
      image: { 
        url: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWx8ZW58MHx8MHx8fDA%3D",
        filename: "listingimage"
      },
      price: 1600,
      location: "Manali",
      country: "India",
    },
    {
      title: "Historic Haveli in Jaipur",
      description: "Experience royal living in this beautifully restored haveli.",
      image: { 
        url: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8fDA%3D",
        filename: "listingimage"
      },
      price: 2000,
      location: "Jaipur",
      country: "India",
    },
    {
      title: "Houseboat on Kerala Backwaters",
      description: "Traditional houseboat for a serene backwater cruise experience.",
      image: { 
        url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        filename: "listingimage"
      },
      price: 1200,
      location: "Alleppey",
      country: "India",
    },
    {
      title: "Modern Apartment in Bangalore",
      description: "Sleek, fully-furnished apartment in the heart of Silicon Valley of India.",
      image: { 
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG90ZWx8ZW58MHx8MHx8fDA%3D",
        filename: "listingimage"
      },
      price: 1800,
      location: "Bangalore",
      country: "India",
    },
    {
      title: "Tea Estate Bungalow in Darjeeling",
      description: "Colonial-era bungalow amidst lush tea gardens with scenic views.",
      image: { 
        url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdGVsfGVufDB8fDB8fHww",
        filename: "listingimage"
      },
      price: 1800,
      location: "Darjeeling",
      country: "India",
    },
    {
      title: "Beachside Villa in Pondicherry",
      description: "Spacious villa with French colonial architecture near the beach.",
      image: { 
        url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdGVsfGVufDB8fDB8fHww",
        filename: "listingimage"
      },
      price: 2500,
      location: "Pondicherry",
      country: "India",
    },
    {
      title: "Treehouse in Wayanad",
      description: "Unique treehouse experience nestled in the lush Western Ghats.",
      image: { 
        url: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvdGVsfGVufDB8fDB8fHww",
        filename: "listingimage"
      },
      price: 1000,
      location: "Wayanad",
      country: "India",
    },
    {
      title: "Riverside Camping in Rishikesh",
      description: "Comfortable tents by the Ganges river with adventure activities.",
      image: { 
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdGVsfGVufDB8fDB8fHww",
        filename: "listingimage"
      },
      price: 1000,
      location: "Rishikesh",
      country: "India",
    },
    {
      title: "Desert Camp in Jaisalmer",
      description: "Luxury tents in the heart of the Thar Desert.",
      image: { 
        url: "https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGhvdGVsfGVufDB8fDB8fHww",
        filename: "listingimage"
      },
      price: 2200,
      location: "Jaisalmer",
      country: "India",
    },
    {
      title: "Hilltop Resort in Ooty",
      description: "Scenic resort with breathtaking views of Nilgiri Hills.",
      image: { 
        url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGhvdGVsfGVufDB8fDB8fHww",
        filename: "listingimage"
      },
      price: 1800,
      location: "Ooty",
      country: "India",
    },
    {
      title: "Lakeview Cottage in Nainital",
      description: "Charming cottage overlooking the serene Naini Lake.",
      image: { 
        url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGhvdGVsfGVufDB8fDB8fHww",
        filename: "listingimage"
      },
      price: 1400,
      location: "Nainital",
      country: "India",
    },
    {
      title: "Jungle Lodge in Jim Corbett",
      description: "Stay amidst wildlife in a luxurious jungle lodge.",
      image: { 
        url: "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGhvdGVsfGVufDB8fDB8fHww",
        filename: "listingimage"
      },
      price: 2400,
      location: "Jim Corbett",
      country: "India",
    },
    {
      title: "Snow Chalet in Gulmarg",
      description: "Cozy chalet with stunning views of snow-capped mountains.",
      image: { 
        url: "https://images.unsplash.com/photo-1439130490301-25e322d88054?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGhvdGVsfGVufDB8fDB8fHww",
        filename: "listingimage"
      },
      price: 3000,
      location: "Gulmarg",
      country: "India",
    },
    {
      title: "Luxury Villa in Lonavala",
      description: "Spacious villa with a private pool and garden.",
      image: { 
        url: "https://images.unsplash.com/photo-1562790351-d273a961e0e9?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGhvdGVsfGVufDB8fDB8fHww",
        filename: "listingimage"
      },
      price: 3500,
      location: "Lonavala",
      country: "India",
    },
    {
      title: "Eco Resort in Coorg",
      description: "Sustainable resort surrounded by coffee plantations.",
      image: { 
        url: "https://images.unsplash.com/photo-1586611292717-f828b167408c?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGhvdGVsfGVufDB8fDB8fHww",
        filename: "listingimage"
      },
      price: 2000,
      location: "Coorg",
      country: "India",
    },
    {
      title: "Floating Cottage in Andaman",
      description: "Unique floating cottage with crystal-clear water views.",
      image: { 
        url: "https://plus.unsplash.com/premium_photo-1678286769762-b6291545d818?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGhvdGVsfGVufDB8fDB8fHww",
        filename: "listingimage"
      },
      price: 4000,
      location: "Andaman",
      country: "India",
    },
    {
      title: "Heritage Palace in Udaipur",
      description: "Stay like royalty in a grand heritage palace.",
      image: { 
        url: "https://images.unsplash.com/photo-1506059612708-99d6c258160e?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGhvdGVsfGVufDB8fDB8fHww",
        filename: "listingimage"
      },
      price: 3800,
      location: "Udaipur",
      country: "India",
    },
    {
      title: "Cliffside Retreat in Mahabaleshwar",
      description: "Retreat with stunning views of the Western Ghats.",
      image: { 
        url: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fGhvdGVsfGVufDB8fDB8fHww",
        filename: "listingimage"
      },
      price: 2700,
      location: "Mahabaleshwar",
      country: "India",
    },
    {
      title: "Luxury Tent in Ranthambore",
      description: "Experience the wilderness in a luxury tent.",
      image: { 
        url: "https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fGhvdGVsfGVufDB8fDB8fHww",
        filename: "listingimage"
      },
      price: 3200,
      location: "Ranthambore",
      country: "India",
    },
  ];
  
  module.exports = { data: sampleListings };
  //we are exporting the sample data in the form of the object 
  //yaha pr curly brackets {data} me likha hai { data: sampleListings }
//  Here, you are exporting an object with a key data and assigning the value of sampleListings to it.
//  This means that when you import this file, you will get an object with a
//  property data that contains the sampleListings array.