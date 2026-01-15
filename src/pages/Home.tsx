import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import GameGrid from "../components/gamecard/GameGrid";
import FeaturedHero from "../components/home/FeaturedHero";
import { featuredItems } from '../data/featureditems';
import type { Game } from '../data/games';

function Home() {
  const { t } = useTranslation();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCardId, setOpenCardId] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('display_order', { ascending: true });

        if (error) {
          console.error('Error fetching games:', error);
        } else {
          console.log('Games fetched:', data);
          setGames(data);
        }
        setLoading(false);
      };
    fetchGames();
  }, []);

  if (loading) { 
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">

      <FeaturedHero items={featuredItems} />

      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold pb-4">{t('home.ourGames')}</h2>
          <GameGrid 
            games={games} 
            openCardId={openCardId}
            setOpenCardId={setOpenCardId}
            />
        </div>
      </div>

    </div>
  );
}

export default Home;