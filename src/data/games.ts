export interface Game {
    id: string;
    title: string;
    title_key: string;
    tagline_key: string;
    description_key: string;
    image_url: string;
    status: 'upcoming' | 'released' | 'in-development';
    page_url: string;
    play_url?: string;
}