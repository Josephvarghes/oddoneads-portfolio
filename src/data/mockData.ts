export interface Service {
  id: string;
  title: string;
  iconName: string;
  description: string;
  ctaText: string;
  category: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  location: string;
  category: "weddings" | "pre-wedding" | "destination" | "corporate";
  imageUrl: string;
}

export interface FilmItem {
  id: string;
  coupleName: string;
  title: string;
  location: string;
  duration: string;
  coverUrl: string;
  videoEmbedUrl: string; // YouTube or Vimeo embed url
  category: "featured" | "highlight" | "destination";
}

export interface StoryItem {
  id: string;
  slug: string;
  coupleName: string;
  title: string;
  coverUrl: string;
  heroText: string;
  storyDescription: string;
  narrative: string[]; // Magazine style paragraphs
  gallery: string[]; // Additional gallery image URLs
  filmEmbedUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  quote: string;
  rating: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
}

// ----------------------------------------------------
// Mock Data Objects
// ----------------------------------------------------

export const SERVICES: Service[] = [
  {
    id: "photography",
    title: "Wedding Photography",
    iconName: "Camera",
    description: "Fine-art wedding photography focusing on raw emotions, candid smiles, and the timeless elegance of your special day.",
    ctaText: "Explore Gallery",
    category: "weddings"
  },
  {
    id: "films",
    title: "Wedding Films",
    iconName: "Film",
    description: "Cinematic, storytelling-focused films that capture the sounds, movements, and heartbeat of your wedding day as a movie.",
    ctaText: "Watch Films",
    category: "weddings"
  },
  {
    id: "prewedding",
    title: "Pre-Wedding Shoots",
    iconName: "Heart",
    description: "An intimate, personalized visual session capturing the natural chemistry between you and your partner in stunning backdrops.",
    ctaText: "See Shoots",
    category: "pre-wedding"
  },
  {
    id: "destination",
    title: "Destination Weddings",
    iconName: "Compass",
    description: "Traveling globally to tell luxury stories in magical settings—from the shores of Santorini to the palaces of Udaipur and skylines of Dubai.",
    ctaText: "Discover Venues",
    category: "destination"
  },
  {
    id: "corporate",
    title: "Corporate Events",
    iconName: "Briefcase",
    description: "Premium coverage of corporate galas, launches, and summits, emphasizing professional storytelling and high-fidelity visuals.",
    ctaText: "View Corporate",
    category: "corporate"
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "portfolio-1",
    title: "Akhil & Diya",
    location: "Lake Como, Italy",
    category: "destination",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200"
  },
  {
    id: "portfolio-2",
    title: "Rohan & Shruti",
    location: "Udaipur, India",
    category: "weddings",
    imageUrl: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=1200"
  },
  {
    id: "portfolio-3",
    title: "The Royal Gala",
    location: "London, UK",
    category: "corporate",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200"
  },
  {
    id: "portfolio-4",
    title: "Sarah & David",
    location: "Santorini, Greece",
    category: "destination",
    imageUrl: "https://images.unsplash.com/photo-1507504038482-7621c324e93d?q=80&w=1200"
  },
  {
    id: "portfolio-5",
    title: "Arjun & Meera",
    location: "Kerala Backwaters, India",
    category: "pre-wedding",
    imageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200"
  },
  {
    id: "portfolio-6",
    title: "Varun & Anjali",
    location: "Dubai Marina, UAE",
    category: "destination",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200"
  },
  {
    id: "portfolio-7",
    title: "Sunlit Romance",
    location: "Goa, India",
    category: "pre-wedding",
    imageUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200"
  },
  {
    id: "portfolio-8",
    title: "Tech Summit 2026",
    location: "Bangalore, India",
    category: "corporate",
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200"
  },
  {
    id: "portfolio-9",
    title: "Neha & Kabir",
    location: "Jaipur, India",
    category: "weddings",
    imageUrl: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1200"
  },
  {
    id: "portfolio-10",
    title: "Siddharth & Tanya",
    location: "Tuscany, Italy",
    category: "destination",
    imageUrl: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1200"
  }
];

export const FILMS: FilmItem[] = [
  {
    id: "film-1",
    coupleName: "Akhil & Diya",
    title: "Italian Symphony",
    location: "Lake Como, Italy",
    duration: "4m 32s",
    coverUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with high quality placeholders (using RickRoll or custom wedding clip)
    category: "featured"
  },
  {
    id: "film-2",
    coupleName: "Sarah & David",
    title: "Santorini Sunset",
    location: "Santorini, Greece",
    duration: "3m 15s",
    coverUrl: "https://images.unsplash.com/photo-1507504038482-7621c324e93d?q=80&w=1200",
    videoEmbedUrl: "https://player.vimeo.com/video/76979871?h=8272103f6b",
    category: "destination"
  },
  {
    id: "film-3",
    coupleName: "Rohan & Shruti",
    title: "Palace of Love",
    location: "Udaipur, India",
    duration: "6m 12s",
    coverUrl: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=1200",
    videoEmbedUrl: "https://www.youtube.com/embed/9xwazD5SyVg",
    category: "highlight"
  },
  {
    id: "film-4",
    coupleName: "Varun & Anjali",
    title: "Skylines & Desert Gold",
    location: "Dubai, UAE",
    duration: "4m 50s",
    coverUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200",
    videoEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "destination"
  },
  {
    id: "film-5",
    coupleName: "Arjun & Meera",
    title: "Whispers of Backwaters",
    location: "Kerala, India",
    duration: "3m 45s",
    coverUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200",
    videoEmbedUrl: "https://www.youtube.com/embed/9xwazD5SyVg",
    category: "highlight"
  }
];

export const STORIES: StoryItem[] = [
  {
    id: "story-1",
    slug: "akhil-diya",
    coupleName: "Akhil & Diya",
    title: "An Italian Symphony by the Lake",
    coverUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200",
    heroText: "Celebrating love against the majestic mountains of Lake Como, Italy.",
    storyDescription: "A three-day destination wedding celebrating deep roots, classical music, and breathtaking Italian scenery.",
    narrative: [
      "When Akhil and Diya first approached us, they told us their wedding wasn't just a ceremony, but a convergence of two worlds. Diya, a classical violinist from the UK, and Akhil, an entrepreneur based in Dubai, wanted a venue that felt poetic, intimate, yet grand. Lake Como was the natural selection.",
      "The celebrations spanned over three days, beginning with an intimate lakeside mehndi, moving to a vibrant sangeet under fairy lights, and culminating in a wedding ceremony at a historical villa. The morning of the wedding was draped in mist. We captured Diya warming up her violin, playing a soft melody that echoed through the stone corridors—a moment of pure, raw anticipation.",
      "Our visual approach relied on soft cinematic tones, capturing the ripples of the lake, the gentle breeze rustling through the cypress trees, and the silent, unspoken tears during the vows. This is their story, unwrapped through our lenses."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000",
      "https://images.unsplash.com/photo-1507504038482-7621c324e93d?q=80&w=1000",
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1000"
    ],
    filmEmbedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "story-2",
    slug: "sarah-david",
    coupleName: "Sarah & David",
    title: "A Aegean Promise at Caldera's Edge",
    coverUrl: "https://images.unsplash.com/photo-1507504038482-7621c324e93d?q=80&w=1200",
    heroText: "A minimal, premium wedding framed by the iconic white-domes and sun-drenched cliffs of Santorini.",
    storyDescription: "An intimate gathering of 30 closest friends, focusing on deep conversations, culinary excellence, and a golden hour sunset vow exchange.",
    narrative: [
      "Sarah and David wanted something completely minimal. They stripped away the traditional wedding template, inviting only 30 guests to travel with them to the white cliffs of Oia. The focus was entirely on storytelling, human connection, and the breathtaking Aegean sea.",
      "The camera became a silent guest, drifting around tables, catching laughter, wine pouring, and glances of affection. We avoided heavy gear and artificial lighting, allowing the golden Mediterranean sun to paint the couples in soft, warm luxury.",
      "At sunset, they stood at the edge of the Caldera and spoke their vows. The winds were calm, and the sky transformed into a canvas of pink and gold. We created a short film that captured this exact stillness—a memory that feels like a warm breeze whenever you watch it."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1000",
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1000",
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000"
    ],
    filmEmbedUrl: "https://player.vimeo.com/video/76979871?h=8272103f6b"
  },
  {
    id: "story-3",
    slug: "arjun-meera",
    coupleName: "Arjun & Meera",
    title: "Rhythms of the Emerald Backwaters",
    coverUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1200",
    heroText: "An emotional homecoming wedding on the floating houseboats of Kerala.",
    storyDescription: "A gorgeous celebration of roots, traditional temples, brass ensembles, and rain showers on the canals of Kumarakom.",
    narrative: [
      "Arjun and Meera had lived in New York for ten years, but they always knew their vows belonged to the silent waters of Kerala. Our team spent a week scouting the canals of Kumarakom to find locations where the light filters through coconut palms in just the right way.",
      "The wedding took place on a floating wooden pavilion surrounded by water lilies. Just as Meera walked down the aisle, a gentle summer rain shower started, adding a magical reflection to the wooden boards and casting the entire setup in a romantic, ethereal glow.",
      "We focused on capturing the rich sensory details—the smell of fresh jasmine, the rhythmic beats of Chenda Melam, the steam rising from local coffee, and the reflections of the oil lamps. This story celebrates the luxury of returning to one's roots."
    ],
    gallery: [
      "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=1000",
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1000",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000"
    ],
    filmEmbedUrl: "https://www.youtube.com/embed/9xwazD5SyVg"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Diya & Akhil",
    role: "Lake Como Couple",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    quote: "FILMBY ODD_ONE_ADS didn't just record our wedding—they made a masterpiece. Every time we watch our film, we are instantly transported back to that lakeside breeze. Simply breathtaking and deeply emotional work.",
    rating: 5
  },
  {
    id: "t-2",
    name: "Sarah & David",
    role: "Santorini Couple",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    quote: "The team is extremely professional and discreet. We barely noticed them shooting, yet they captured the most intimate whispers, laughs, and moments. Their minimal luxury style matched our vision perfectly.",
    rating: 5
  },
  {
    id: "t-3",
    name: "Meera & Arjun",
    role: "Kerala Backwaters Couple",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    quote: "They captured the essence of our roots in a way that feels modern yet deeply traditional. The colors, music, and emotional edit exceeded all our expectations. They are truly world-class storytellers.",
    rating: 5
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "team-1",
    name: "Joseph Varghese",
    role: "Founder & Lead Director",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    bio: "With over 10 years of experience filming across India, UK, and Europe, Joseph brings a fine-art cinematic perspective to wedding films."
  },
  {
    id: "team-2",
    name: "Aravind Nair",
    role: "Head of Photography",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    bio: "Aravind specializes in fine-art film photography. His works are characterized by natural light, symmetry, and genuine human emotion."
  },
  {
    id: "team-3",
    name: "Elena Rostova",
    role: "Lead Editor & Colorist",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    bio: "Elena turns raw moments into emotional visual rhythms, crafting each film's color grading to mimic standard cinema film stocks."
  }
];

export const CHAT_BOT_QA = {
  welcomeMessage: "Tell us about your celebration and we'll help you find the perfect photography experience.",
  predefinedQuestions: [
    {
      id: "q-1",
      question: "Do you travel internationally?",
      answer: "Absolutely! We routinely cover destination weddings worldwide. Our core service regions are India, the UK, and Dubai, but we are happy to travel to any location to unwrap the tale of your perfect day. Travel and accommodation fees are tailored specifically based on the destination."
    },
    {
      id: "q-2",
      question: "What are your packages?",
      answer: "We believe every wedding is unique, so we build bespoke packages based on your requirements. Our primary offerings include Fine Art Wedding Photography, Cinematic Wedding Films, Pre-wedding narrative shoots, and Drone/Multi-cam setups. Please fill out our booking form in the Contact page with your estimated details, and we'll send a customized proposal within 24 hours!"
    },
    {
      id: "q-3",
      question: "Are you available on my wedding date?",
      answer: "Availability changes quickly, particularly for busy wedding seasons in India (Nov-Feb) and Europe (Jun-Sep). To check availability, please drop us a message using our Contact page form or click the WhatsApp button to chat directly with our booking coordinator!"
    },
    {
      id: "q-4",
      question: "How can I book?",
      answer: "Our booking process is simple:\n1. Fill out the booking form on our Contact Page.\n2. We schedule a brief online consultation to align on your vision.\n3. We send a customized contract proposal.\n4. A 30% retainer fee secures your date in our calendar."
    }
  ]
};
