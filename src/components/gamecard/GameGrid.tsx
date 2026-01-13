import GameCard from './GameCard';
import type { Game } from "../../data/games";

interface GameGridProps {
    games: Game[];
}

function GameGrid({ games }: GameGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            {games.map((game) => (
                <GameCard key={game.id} game={game} />
            ))}
        </div>
    );
}

export default GameGrid;