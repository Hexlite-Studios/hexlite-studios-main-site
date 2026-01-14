import { chrisProductions, DefaultConcept } from '../assets/Assets';

export interface teamMember {
    id: string;
    icon: string;
    name: string;
    role: string;
    bio: string;
    social?: {
        twitter?: string;
        github?: string;
        linkedin?: string;
    }
}

export const teamMembers: teamMember[] = [
    {
        id: 'shadow',
        icon: DefaultConcept,
        name: 'team.shadow.name',
        role: 'team.shadow.role',
        bio: 'team.shadow.bio',
    },
    {
        id: 'chrisProductions',
        icon: chrisProductions,
        name: 'team.chrisProductions.name',
        role: 'team.chrisProductions.role',
        bio: 'team.chrisProductions.bio',
    },
];