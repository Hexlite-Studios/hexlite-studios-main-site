import { warfrontbanner, lotlbanner, agbanner, psbanner } from '../assets/Assets';

export interface Game {
    id: string;
    titleKey: string;
    taglineKey: string;
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
        id: 'lotl',
        titleKey: 'game.lotl.title',
        taglineKey: 'game.lotl.tagline',
        image: lotlbanner,
        status: 'in-development',
        links: {
            page: '/light-of-the-lost',
            play: 'https://www.roblox.com/games/7546424594/Light-of-the-Lost',
        },
    },
    {
        id: 'arcaneguardians',
        titleKey: 'game.arcaneguardians.title',
        taglineKey: 'game.arcaneguardians.tagline',
        image: agbanner,
        status: 'upcoming',
        links: {
            page: '/arcane-guardians',
        },
    },
    {
        id: 'projectstatecraft',
        titleKey: 'game.projectstatecraft.title',
        taglineKey: 'game.projectstatecraft.tagline',
        image: psbanner,
        status: 'in-development',
        links: {
            page: '/project-statecraft',
        },
    },
    {
        id: 'warfront',
        titleKey: 'game.warfront.title',
        taglineKey: 'game.warfront.tagline',
        image: warfrontbanner,
        status: 'upcoming',
        links: {
            page: '/warfront',
        },
    },
];

