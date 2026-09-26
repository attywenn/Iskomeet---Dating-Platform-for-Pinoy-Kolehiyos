import type { Profile } from '../lib/types'

export const APP_NAME = 'Iskomeet'
export const UI_NAME = 'wellfleet'

export const STATS = {
  universities: 48,
  conversations: 1420,
  sparks: 3890,
}

export const GENDERS = [
  { id: 1, name: 'Female' },
  { id: 2, name: 'Male' },
  { id: 3, name: 'Non-binary' },
]

export const UNIVERSITIES = [
  { id: 1, name: 'University of the Philippines Diliman', location: 'Quezon City' },
  { id: 2, name: 'Polytechnic University of the Philippines', location: 'Manila' },
  { id: 3, name: 'Philippine Normal University', location: 'Manila' },
  { id: 4, name: 'Technological University of the Philippines', location: 'Manila' },
  { id: 5, name: 'University of the Philippines Manila', location: 'Manila' },
  { id: 6, name: 'Batangas State University', location: 'Batangas' },
  { id: 7, name: 'Cavite State University', location: 'Cavite' },
]

export const SUCS = UNIVERSITIES.map((u) => u.name)

export const SUC_COLORS: Record<string, { bg: string; text: string; badge: string; short: string }> = {
  'University of the Philippines Diliman': { bg: 'bg-[#7B1113]/10', text: 'text-[#7B1113]', badge: 'bg-[#7B1113] text-white', short: 'UPD' },
  'Polytechnic University of the Philippines': { bg: 'bg-[#800000]/10', text: 'text-[#800000]', badge: 'bg-[#800000] text-amber-300', short: 'PUP' },
  'Philippine Normal University': { bg: 'bg-blue-50', text: 'text-blue-700', badge: 'bg-blue-700 text-white', short: 'PNU' },
  'Technological University of the Philippines': { bg: 'bg-red-50', text: 'text-red-700', badge: 'bg-red-700 text-white', short: 'TUP' },
  'University of the Philippines Manila': { bg: 'bg-[#7B1113]/10', text: 'text-[#7B1113]', badge: 'bg-[#7B1113] text-white', short: 'UPM' },
  'Batangas State University': { bg: 'bg-rose-50', text: 'text-rose-700', badge: 'bg-rose-700 text-white', short: 'BatStateU' },
  'Cavite State University': { bg: 'bg-emerald-50', text: 'text-emerald-700', badge: 'bg-emerald-700 text-white', short: 'CvSU' },
}

export const INTERESTS = ['Reading', 'Music', 'Coffee', 'Movies', 'Travel', 'Books', 'Coding', 'Sports']

export const PROFILES: Profile[] = [
  {
    id: 'lia',
    name: 'Yuheeko Dolit',
    firstName: 'Yuheeko',
    lastName: 'Dolit',
    genderId: 1,
    universityId: 1,
    universityName: 'Marikina Polytechnic College',
    online: true,
    lastSeen: 'Active now',
    verified: true,
    avatar: 'https://scontent.fmnl17-1.fna.fbcdn.net/v/t39.30808-1/775526227_1739113183898472_5688718685359456767_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1080&ctp=s200x200&_nc_cat=110&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeEIHp4zjWLAvS58eOdl4mLt8jT-PXBsRtzyNP49cGxG3OdAL90pW0g_nfUgYZvQka20eN1f-5VretcvoTzqPUdI&_nc_ohc=f-DX1OpySkcQ7kNvwFAQifK&_nc_oc=Adr-TwXv4R7YBhEuAcHY5JN8twscEImXV7kLYajVF2hmfP4Bj7873R0VuRPY3gR9Ka4&_nc_zt=24&_nc_ht=scontent.fmnl17-1.fna&_nc_gid=RBizB7wvA8RgU0PUvZvoBw&_nc_ss=7b2a8&oh=00_AQL_od9J05RMiae-ADcefrWQvRMd4XlIYg30HP3tjWFmcQ&oe=6AB68375',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['Reading', 'Coffee', 'Books', 'Music'],
  },
  {
    id: 'isagani',
    name: 'Isagani Bonifacio',
    firstName: 'Isagani',
    lastName: 'Bonifacio',
    genderId: 2,
    universityId: 4,
    universityName: 'EARIST Manila',
    online: true,
    lastSeen: 'Active now',
    verified: true,
    avatar: 'https://scontent.fmnl17-4.fna.fbcdn.net/v/t39.30808-6/764078845_1368881622105995_6516709377607085137_n.jpg?stp=dst-jpg_tt6&cstp=mx2041x2048&ctp=s2041x2048&_nc_cat=103&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFp4CoRo-5It88ofAY3HW1bLcnq_2mHTlwtyer_aYdOXJXcKSau-0O1FqenX1R30KmTKNuoRK5khGhRy0RqfjjB&_nc_ohc=MLN7cP5C13kQ7kNvwHWHhZY&_nc_oc=AdqRvsFtWsdfFVaYzqxKsG8bx_fu_Kv21xWuPqgG9_32CzfPLHikALM31fI37-d-jK8&_nc_zt=23&_nc_ht=scontent.fmnl17-4.fna&_nc_gid=abOMSYPo7X47M0oRgzZ_lw&_nc_ss=7b2a8&oh=00_AQJAzFQw0a2ff6xx008YKoc2ZKjsBmTLCxUsVBZUDXffbw&oe=6AB68BE4',
    photos: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['Coding', 'Music', 'Movies', 'Travel'],
  },
  {
    id: 'diego',
    name: 'Diego Rizal',
    firstName: 'Diego',
    lastName: 'Rizal',
    genderId: 2,
    universityId: 2,
    universityName: 'Polytechnic University of the Philippines',
    online: true,
    lastSeen: 'Active 20m ago',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['Music', 'Travel', 'Movies', 'Sports'],
  },
  {
    id: 'chloe',
    name: 'Chloe Santos',
    firstName: 'Chloe',
    lastName: 'Santos',
    genderId: 1,
    universityId: 3,
    universityName: 'Philippine Normal University',
    online: true,
    lastSeen: 'Active now',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['Reading', 'Books', 'Movies', 'Coffee'],
  },
]

export const PERSONA_REPLIES: Record<string, string[]> = {
  lia: [
    'Hi there. I was just reading by the campus garden. How is your day going?',
    'I like that. I am always looking for a good bookstore or coffee spot nearby.',
    'That sounds nice. Tell me more about the kind of places you enjoy.',
  ],
  isagani: [
    'Hello. I was working on a project and thought I would say hello.',
    'That sounds good. I enjoy good conversation and new ideas.',
    'Nice to meet you. What are you interested in lately?',
  ],
  diego: [
    'Hey. I am around campus and taking a break from the usual routine.',
    'Nice. I like people who are easy to talk to and interested in good music.',
    'That is a good match. Tell me more about your interests.',
  ],
  chloe: [
    'Hello. I enjoy thoughtful conversations and good company.',
    'I like that. I prefer meaningful conversations over small talk.',
    'Thanks for reaching out. What do you usually do in your free time?',
  ],
}
