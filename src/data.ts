export interface Episode {
  id: string;
  title: string;
  duration: string;
}

export interface Season {
  seasonNumber: number;
  episodes: Episode[];
}

export interface ContentItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  rating: number;
  year: string;
  genre: string;
  isAdult: boolean;
  badges: string[];
  type: 'movie' | 'series' | 'short';
  episodes?: Episode[]; // Keep for backward compatibility or single season
  seasons?: Season[]; // Added for multi-season support
  viewers: number;
  description?: string;
}

export const categories = [
  '18+ Exclusive',
  'TikTok Viral',
  'Bangla Series',
  'English Series',
  'Movies',
  'Anime'
];

const dummyEpisodesS1: Episode[] = [
  { id: 's1e1', title: 'Episode 1: The Beginning', duration: '45m' },
  { id: 's1e2', title: 'Episode 2: Dark Secrets', duration: '42m' },
  { id: 's1e3', title: 'Episode 3: The Betrayal', duration: '48m' },
  { id: 's1e4', title: 'Episode 4: No Way Out', duration: '50m' },
  { id: 's1e5', title: 'Episode 5: The Finale', duration: '55m' },
];

const dummyEpisodesS2: Episode[] = [
  { id: 's2e1', title: 'Episode 1: A New Threat', duration: '46m' },
  { id: 's2e2', title: 'Episode 2: Shadows', duration: '43m' },
  { id: 's2e3', title: 'Episode 3: The Escape', duration: '49m' },
  { id: 's2e4', title: 'Episode 4: Vengeance', duration: '52m' },
];

const dummyEpisodesS3: Episode[] = [
  { id: 's3e1', title: 'Episode 1: Resurrection', duration: '47m' },
  { id: 's3e2', title: 'Episode 2: The Final Stand', duration: '58m' },
];

export const dummyContent: ContentItem[] = [
  {
    id: '1',
    title: 'Mohanagar',
    imageUrl: 'https://picsum.photos/seed/mohanagar/800/1200',
    category: 'Bangla Series',
    rating: 4.8,
    year: '2023',
    genre: 'Crime Thriller',
    isAdult: false,
    badges: ['TOP', 'HD'],
    type: 'series',
    episodes: dummyEpisodesS1,
    seasons: [
      { seasonNumber: 1, episodes: dummyEpisodesS1 },
      { seasonNumber: 2, episodes: dummyEpisodesS2 }
    ],
    viewers: 12450
  },
  {
    id: '2',
    title: 'Stranger Things',
    imageUrl: 'https://picsum.photos/seed/stranger/800/1200',
    category: 'English Series',
    rating: 4.9,
    year: '2024',
    genre: 'Sci-Fi',
    isAdult: false,
    badges: ['NEW', '4K'],
    type: 'series',
    episodes: dummyEpisodesS1,
    seasons: [
      { seasonNumber: 1, episodes: dummyEpisodesS1 },
      { seasonNumber: 2, episodes: dummyEpisodesS2 },
      { seasonNumber: 3, episodes: dummyEpisodesS3 }
    ],
    viewers: 84320
  },
  {
    id: '3',
    title: 'Midnight Desire',
    imageUrl: 'https://picsum.photos/seed/desire/800/1200',
    category: '18+ Exclusive',
    rating: 4.5,
    year: '2024',
    genre: 'Romance',
    isAdult: true,
    badges: ['18+', 'EXCLUSIVE'],
    type: 'movie',
    viewers: 52100
  },
  {
    id: '4',
    title: 'TikTok Viral Compilation',
    imageUrl: 'https://picsum.photos/seed/tiktok/800/1200',
    category: 'TikTok Viral',
    rating: 4.2,
    year: '2024',
    genre: 'Trending',
    isAdult: false,
    badges: ['VIRAL', 'HOT'],
    type: 'short',
    viewers: 154200
  },
  {
    id: '5',
    title: 'Dune: Part Two',
    imageUrl: 'https://picsum.photos/seed/dune/800/1200',
    category: 'Movies',
    rating: 4.9,
    year: '2024',
    genre: 'Sci-Fi',
    isAdult: false,
    badges: ['NEW', 'IMAX'],
    type: 'movie',
    viewers: 32000
  },
  {
    id: '6',
    title: 'Taqdeer',
    imageUrl: 'https://picsum.photos/seed/taqdeer/800/1200',
    category: 'Bangla Series',
    rating: 4.7,
    year: '2022',
    genre: 'Thriller',
    isAdult: false,
    badges: ['TOP'],
    type: 'series',
    episodes: dummyEpisodesS1,
    seasons: [
      { seasonNumber: 1, episodes: dummyEpisodesS1 }
    ],
    viewers: 9800
  },
  {
    id: '7',
    title: 'Dark Room',
    imageUrl: 'https://picsum.photos/seed/darkroom/800/1200',
    category: '18+ Exclusive',
    rating: 4.4,
    year: '2023',
    genre: 'Thriller',
    isAdult: true,
    badges: ['18+'],
    type: 'movie',
    viewers: 41000
  },
  {
    id: '8',
    title: 'Breaking Bad',
    imageUrl: 'https://picsum.photos/seed/breaking/800/1200',
    category: 'English Series',
    rating: 5.0,
    year: '2013',
    genre: 'Crime',
    isAdult: false,
    badges: ['MASTERPIECE'],
    type: 'series',
    episodes: dummyEpisodesS1,
    seasons: [
      { seasonNumber: 1, episodes: dummyEpisodesS1 },
      { seasonNumber: 2, episodes: dummyEpisodesS2 },
      { seasonNumber: 3, episodes: dummyEpisodesS3 },
      { seasonNumber: 4, episodes: dummyEpisodesS2 },
      { seasonNumber: 5, episodes: dummyEpisodesS1 }
    ],
    viewers: 125000
  }
];
