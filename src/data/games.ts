import { warfrontbanner, lotlbanner } from '../assets/Assets';

export interface Game {
    id: string;
    title: string;
    tagline: string;
    description: string;
    image: string;
    status: 'upcoming' | 'released' | 'in-development';
    links: {
        page?: string;
        trailer?: string;
        play?: string;
        demo?: string;
    };
}

export const games: Game[] = [
    {
        id: 'warfront',
        title: 'Warfront: Age of Heroes',
        tagline: 'Squad command PvP',
        description: 'AI-powered battlefield strategy',
        image: warfrontbanner,
        status: 'upcoming',
        links: {
            page: '/games/warfront',
        },
    },
    {
        id: 'lotl',
        title: 'game.lotl.title',
        tagline: 'game.lotl.tagline',
        description: 'game.lotl.description',
        image: lotlbanner,
        status: 'in-development',
        links: {
            page: '/light-of-the-lost',
            play: 'https://www.roblox.com/games/7546424594/Light-of-the-Lost',
        },
    },
];

