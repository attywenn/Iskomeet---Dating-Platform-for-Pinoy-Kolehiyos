import type { Profile } from '../lib/types'

export const APP_NAME = 'Iskomeet'
export const UI_NAME = 'wellfleet'

export const STATS = {
  accounts: 2548,
  universities: 48,
  conversations: 1420,
  sparks: 3890,
}

export const SUCS = [
  'University of the Philippines Diliman',
  'Polytechnic University of the Philippines',
  'Philippine Normal University',
  'Eulogio "Amang" Rodriguez Institute of Science and Technology - Manila',
  'Technological University of the Philippines',
  'University of the Philippines Manila',
  'University of the Philippines Los Baños',
  'Cavite State University',
  'Batangas State University',
  'Bulacan State University',
  'Mindanao State University',
  'Central Luzon State University',
  'West Visayas State University',
  'Bicol University',
  'University of Southeastern Philippines',
]

export const SUC_COLORS: Record<string, { bg: string; text: string; badge: string; short: string }> = {
  'University of the Philippines Diliman': { bg: 'bg-[#7B1113]/10', text: 'text-[#7B1113]', badge: 'bg-[#7B1113] text-white', short: 'UPD' },
  'University of the Philippines Manila': { bg: 'bg-[#7B1113]/10', text: 'text-[#7B1113]', badge: 'bg-[#7B1113] text-white', short: 'UPM' },
  'University of the Philippines Los Baños': { bg: 'bg-[#005A36]/10', text: 'text-[#005A36]', badge: 'bg-[#005A36] text-white', short: 'UPLB' },
  'Polytechnic University of the Philippines': { bg: 'bg-[#800000]/10', text: 'text-[#800000]', badge: 'bg-[#800000] text-amber-300', short: 'PUP' },
  'Philippine Normal University': { bg: 'bg-blue-50', text: 'text-blue-700', badge: 'bg-blue-700 text-white', short: 'PNU' },
  'Eulogio "Amang" Rodriguez Institute of Science and Technology - Manila': { bg: 'bg-amber-50', text: 'text-amber-800', badge: 'bg-amber-700 text-white', short: 'EARIST' },
  'Technological University of the Philippines': { bg: 'bg-red-50', text: 'text-red-700', badge: 'bg-red-700 text-white', short: 'TUP' },
  'Cavite State University': { bg: 'bg-emerald-50', text: 'text-emerald-700', badge: 'bg-emerald-700 text-white', short: 'CvSU' },
  'Batangas State University': { bg: 'bg-rose-50', text: 'text-rose-700', badge: 'bg-rose-700 text-white', short: 'BatStateU' },
  'Mindanao State University': { bg: 'bg-purple-50', text: 'text-purple-700', badge: 'bg-purple-700 text-white', short: 'MSU' },
}

export const PROFILES: Profile[] = [
  {
    id: 'lia',
    name: 'Lia Makiling',
    age: 22,
    suc: 'University of the Philippines Diliman',
    program: 'BA Filipino & Creative Writing',
    yearLevel: 'Senior (4th Year)',
    online: true,
    lastSeen: 'Active now',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Poet at heart, coffee addict by necessity. You can usually catch me reading under the Acacia trees at UP Sunken Garden or hunting for second-hand books.',
    interests: ['Coffee Crawl', 'Indie Poetry', 'OPM Bands', 'Sunken Garden', 'Cinemalaya'],
    mbti: 'INFP',
    zodiac: 'Pisces',
    distance: '1.4 km from Diliman Oval',
    campusBadge: 'UPD • Kolehiyo ng Arte at Literatura',
    prompts: [
      {
        question: 'My ideal campus date...',
        answer: 'Iced Spanish latte at Area 2, street food crawl, then watching the golden hour sunset at the Sunken Garden bleachers.',
      },
      {
        question: 'Green flags I look for in a scholar...',
        answer: 'Passionate about social causes, loves late-night thesis rants, and never skips listening to Munimuni or The Juans.',
      },
    ],
  },
  {
    id: 'isagani',
    name: 'Isagani Bonifacio',
    age: 21,
    suc: 'Eulogio "Amang" Rodriguez Institute of Science and Technology - Manila',
    program: 'BS Computer Science',
    yearLevel: '3rd Year',
    online: true,
    lastSeen: 'Active now',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Frontend dev & UI geek building tech for student communities. When not fixing CSS bugs at 3 AM, I am looking for the best street siomai in Manila.',
    interests: ['Hackathons', 'Valorant', 'Siomai Rice', 'Lo-fi Beats', 'Urban Walking'],
    mbti: 'ENTP',
    zodiac: 'Sagittarius',
    distance: 'Nagtahan, Manila',
    campusBadge: 'EARIST • College of Computing',
    prompts: [
      {
        question: 'A non-negotiable for me...',
        answer: 'You have to let me explain my web dev project without falling asleep within 5 minutes haha.',
      },
      {
        question: 'Together we could...',
        answer: 'Win a 24-hour campus hackathon or discover the cheapest unlimited iced coffee around the university belt.',
      },
    ],
  },
  {
    id: 'diego',
    name: 'Diego Rizal',
    age: 23,
    suc: 'Polytechnic University of the Philippines',
    program: 'BS Information Technology',
    yearLevel: 'Graduating Batch',
    online: false,
    lastSeen: 'Active 20m ago',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Proud Isko from Sta. Mesa. Lead guitarist for our college indie band. I survived PUP midterms and the heat index, so I can survive anything with you.',
    interests: ['Electric Guitar', 'PUP Lagoon Pares', 'Pizza Nights', 'Skateboard', 'Indie Gigs'],
    mbti: 'ENFJ',
    zodiac: 'Leo',
    distance: 'Sta. Mesa, Manila',
    campusBadge: 'PUP • CCIS Tanglaw ng Bayan',
    prompts: [
      {
        question: 'First round is on me if...',
        answer: 'You can guess the guitar riff in the first 3 seconds of any classic Eraserheads or Rivermaya track.',
      },
    ],
  },
  {
    id: 'chloe',
    name: 'Chloe Santos',
    age: 20,
    suc: 'Philippine Normal University',
    program: 'BSEd Major in English',
    yearLevel: '2nd Year',
    online: true,
    lastSeen: 'Active now',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Future teacher with big dreams and an overflowing stationery collection. Big fan of museum dates in Ermita, warm matcha lattes, and live theatrical plays.',
    interests: ['National Museum', 'Iced Matcha', 'PETA Theater', 'Literature', 'Journaling'],
    mbti: 'ENFP',
    zodiac: 'Libra',
    distance: 'Taft Ave, Manila',
    campusBadge: 'PNU • Faculty of Teacher Dev',
    prompts: [
      {
        question: 'The way to win me over...',
        answer: 'A handwritten letter, a warm cup of matcha, and an afternoon browsing antique bookshops in Intramuros.',
      },
    ],
  },
  {
    id: 'bea',
    name: 'Bea Alonzo',
    age: 21,
    suc: 'Batangas State University',
    program: 'BS Mechanical Engineering',
    yearLevel: '3rd Year',
    online: true,
    lastSeen: 'Active now',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'The National Engineering University represent! Fueled 100% by Kapeng Barako. I spend my days doing thermodynamics equations and my weekends on Tagaytay road trips.',
    interests: ['Kapeng Barako', 'Road Trips', 'Camping', '3D Printing', 'Volleyball'],
    mbti: 'ISTP',
    zodiac: 'Aries',
    distance: 'Batangas City',
    campusBadge: 'BatStateU • The National Engineering Univ',
    prompts: [
      {
        question: 'Best life hack for college...',
        answer: 'Brew your own Kapeng Barako at 6 AM. It will keep you awake through 4 straight hours of engineering calculus.',
      },
    ],
  },
  {
    id: 'kenzo',
    name: 'Kenzo Del Rosario',
    age: 22,
    suc: 'Cavite State University',
    program: 'BS Agriculture',
    yearLevel: 'Senior',
    online: false,
    lastSeen: 'Active 1h ago',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    ],
    bio: 'Plant lover, sunset runner, and aspiring agro-entrepreneur. Looking for someone who appreciates breezy outdoor dates and authentic farm-to-table food.',
    interests: ['Coffee Farming', 'Golden Retrievers', 'Golden Hour', 'Analog Film', 'Cooking'],
    mbti: 'ISFP',
    zodiac: 'Taurus',
    distance: 'Indang, Cavite',
    campusBadge: 'CvSU • Main Campus Indang',
    prompts: [
      {
        question: 'I will brag about you if...',
        answer: 'You appreciate indie OPM records and do not mind getting your shoes slightly dusty on a countryside sunset walk.',
      },
    ],
  },
]

export const DEMO_USER = {
  id: 'me',
  username: 'iskolar',
  password: 'iskolar',
  program: 'BACHELOR OF SCIENCE IN MATHEMATICS',
  suc: 'Philippine Normal University',
  yearLevel: '3rd Year',
  bio: 'Mathematics major who loves puzzles, chess at Rizal Park, and hunting for cheap iced coffee near campus!',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80',
  interests: ['Chess', 'Cold Brew', 'Library Dates', 'Math Rock', 'Ramen'],
}

export const PERSONA_REPLIES: Record<string, string[]> = {
  lia: [
    'Uy hello! Kakagaling ko lang sa Sunken Garden actually haha. Kamusta araw mo? 🍃',
    'Yesss! Need a quick study break rn. May recommendations ka ba for chill acoustic playlists? 🎶',
    'Haha totoo! Area 2 isaw and fruit shake is the ultimate study reward. What is your go-to comfort food?',
  ],
  isagani: [
    'Hala hello! Kakasubmit ko lang ng pull request sa thesis namin haha. Anong course mo pala? Need coffee so bad rn ☕',
    'Haha agree! Coding without coffee is like playing Valorant without sound. Surviving ka pa ba this sem? 💻',
    'Uy nice! Tell me more about your campus vibes. Tagal ko na gusto mag-visit doon!',
  ],
  diego: [
    'Yooo what is up! Kakagaling lang sa band rehearsal sa PUP lagoon area. Have you heard Dilaw or Lola Amour lately? 🎸',
    'Haha legend! If you ever visit Sta. Mesa, sagot ko na ang legendary submarino sandwich at iced tea! 🥪',
    'Apir! Masarap mag-jamming when midterms are finally over. What music are you listening to nowadays?',
  ],
  chloe: [
    'Hello! Always happy to connect with a fellow Isko! Have you been to Intramuros or National Museum lately? ✨',
    'Sobrang relate! Final lesson plan revisions are keeping me awake haha. What is your favorite stress reliever? 🍵',
    'Aww that sounds lovely! We definitely need more wholesome campus dates like that.',
  ],
  bea: [
    'Hey! Just wrapped up our machine lab here sa BatStateU. Long day pero surviving! How is your week going? 🛠️',
    'Haha yes! Kapeng Barako is literally life support for engineering majors. Ever tried authentic Batangas brew? ☕',
    'Awesome! Love meeting people outside of engineering circles, refreshing conversation!',
  ],
  kenzo: [
    'Kamusta! Perfect timing, was just tending our hydroponics garden here sa Cavite State. How is your day going? 🌿',
    'Haha totoo! Fresh air and indie songs make the sem bearable. Do you like outdoor walks or cafe tambay better? 🌅',
    'Nice! Next time coffee run tayo if our campus schedules align!',
  ],
}
