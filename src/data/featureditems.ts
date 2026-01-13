import { lotlbanner, warfrontbanner} from '../assets/Assets';

export interface FeaturedItem {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    link: string;
    type: 'game' | 'news';
}

export const featuredItems: FeaturedItem[] = [
  {
    id: 'lotl',
    title: 'Light of the Lost',
    subtitle: 'Featured Game of the Week',
    description: 'A narrative horror experience that will test your courage. Beware of the darkness...',
    image: lotlbanner,
    link: '/light-of-the-lost',
    type: 'game',
  },
  {
    id: 'warfont',
    title: 'Warfront',
    subtitle: 'Concept Art Released',
    description: 'Explore the stunning concept art for our upcoming strategy game, Warfront.',
    image: warfrontbanner,
    link: '/news/warfront-concept-art',
    type: 'news',
  }
];
