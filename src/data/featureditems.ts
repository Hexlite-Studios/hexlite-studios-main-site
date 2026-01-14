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
    title: 'featuredHero.title1',
    subtitle: 'featuredHero.newsTitle1',
    description: 'featuredHero.description1',
    image: lotlbanner,
    link: '/light-of-the-lost',
    type: 'game',
  },
  {
    id: 'warfront',
    title: 'featuredHero.title2',
    subtitle: 'featuredHero.newsTitle2',
    description: 'featuredHero.description2',
    image: warfrontbanner,
    link: '/warfront',
    type: 'news',
  }
];
