import { useState } from 'react';
import GameCard from './GameCard';
import type { Game } from "../../data/games";

interface GameGridProps {
    games: Game[];
}

function GameGrid({ games }: GameGridProps) {
    const [openCardId, setOpenCardId] = useState<string | null>(null);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            {games.map((game) => (
                <GameCard 
                    key={game.id} 
                    game={game} 
                    isOpen={openCardId === game.id}
                    onToggle={() => setOpenCardId(openCardId === game.id ? null : game.id)}
                />
            ))}
        </div>
    );
}

export default GameGrid;