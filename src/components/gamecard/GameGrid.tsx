import type { Game } from '../../data/games';
import GameCard from './GameCard';


interface GameGridProps {
    games: Game[];
    openCardId: string | null;
    setOpenCardId: (id: string | null) => void;
}

export default function GameGrid({ games, openCardId, setOpenCardId }: GameGridProps) {
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
