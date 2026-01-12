import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function Home() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex items-center flex-col justify-center">
        <h1>{t('home.welcome')}</h1>
        <p>{t('home.tagline')}</p>
        <Link to="/NotFound" className="block bg-indigo-400 px-6 py-3 rounded">{t('home.goTo404')}</Link>
    </div>
  );
}

export default Home;