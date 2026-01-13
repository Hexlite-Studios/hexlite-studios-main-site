// import { useState } from 'react';
// import { Link } from 'react-router-dom';
import type { Game } from '../../data/games';

interface GameCardProps {
    game: Game;
}

function GameCard ({ game }: GameCardProps) {
    //const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    //const statusColors = {
    //    'upcoming': 'bg-yellow-500',
    //    'released': 'bg-green-500',
    //    'in-development': 'bg-blue-500',
    //}

    //const statusLabels = {
    //    'upcoming': 'Upcoming',
    //    'released': 'Released',
    //    'in-development': 'In Development',
    //}

    return (
        <div className="relative group">
            <div
                //onClick={() => setIsOverlayOpen(true)}
                className="relative h-96 overflow-hidden rounded cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
                <img 
                    src={game.image} 
                    alt={game.title} 
                    className="w-full h-full object-cover" 
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <span className="text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Press to View Details
                        </span>
                </div>
            </div>

        </div>
    );

}

export default GameCard;

