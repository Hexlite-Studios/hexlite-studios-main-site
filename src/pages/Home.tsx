import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { games } from "../data/games";
import GameGrid from "../components/gamecard/GameGrid";

function Home() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen">

      <div className="flex items-center flex-col justify-center pt-20 gap-5">
          <h1>{t('home.welcome')}</h1>
          <p>{t('home.tagline')}</p>
          <Link to="/NotFound" className="block bg-indigo-400 px-6 py-3 rounded">{t('home.goTo404')}</Link>
      </div>

      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold">{t('home.ourGames')}</h2>
          <GameGrid games={games} />
        </div>
      </div>

    </div>
  );
}

export default Home;