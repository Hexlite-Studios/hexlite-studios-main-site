import { Link } from 'react-router-dom';
import type { Game } from '../../data/games';
import { useTranslation } from 'react-i18next';

interface GameCardProps {
    game: Game;
    isOpen: boolean;
    onToggle: () => void;
}

function GameCard ({ game, isOpen, onToggle }: GameCardProps) {
    const { t } = useTranslation();

    const statusColors = {
        'upcoming': 'bg-yellow-500',
        'released': 'bg-green-500',
        'in-development': 'bg-blue-500',
    }

    return (
        <div className="relative group h-96 rounded-xl overflow-hidden shadow-lg">
            <img
                src={game.image}
                alt={t(game.titleKey)}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {!isOpen && (
                <div
                    onClick={onToggle}
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 cursor-pointer"
                >
                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className={`${statusColors[game.status]} text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                            {t(`cardDetails.status.${game.status}`)}
                        </span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className=" text-lg font-semibold px-6 py-3 rounded-lg">
                            {t('cardDetails.pressHere')}
                        </span>
                    </div>
                </div>
            )}
            {isOpen && (
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/70 flex flex-col justify-end p-6 animate-fade-in z-10">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggle();
                        }}
                        className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="absolute top-4 left-4">
                        <span className={`${statusColors[game.status]} text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                            {t(`cardDetails.status.${game.status}`)}
                        </span>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-2xl font-bold mb-1">
                                {t(game.titleKey)}
                            </h3>
                            <p className="text-sm italic">
                                {t(game.taglineKey)}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            {game.links.page && (
                                <Link
                                    to={game.links.page}
                                    className="flex-1 bg-slate-700 hover:bg-slate-800 font-semibold py-3 px-4 rounded-lg transition text-center"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {t('cardDetails.moreInfo')}
                                </Link>
                            )}

                            {game.links.play && (
                                <a
                                    href={game.links.play}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-sky-500 hover:bg-sky-800 text-white font-semibold py-3 px-4 rounded-lg transition text-center"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                {t('cardDetails.play')}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

}

export default GameCard;

