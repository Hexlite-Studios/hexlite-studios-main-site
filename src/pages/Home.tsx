import { useTranslation } from 'react-i18next';
import { games } from "../data/games";
import GameGrid from "../components/gamecard/GameGrid";
import FeaturedHero from "../components/home/FeaturedHero";
import { featuredItems } from '../data/featureditems';

function Home() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen">

      <FeaturedHero items={featuredItems} />

      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold pb-4">{t('home.ourGames')}</h2>
          <GameGrid games={games} />
        </div>
      </div>

    </div>
  );
}

export default Home;