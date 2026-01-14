import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { notfoundlogo } from "../assets/Assets";

function NotFound() {
  const { t } = useTranslation();

  return (
  <div className="min-h-screen flex flex-col justify-center items-center gap-4 bg-zinc-800 text-white">
      <img src={notfoundlogo} alt="Not Found" className="h-40" />
      <h1 className="text-4xl font-bold">{t('notFound.title')}</h1>
      <p>{t('notFound.message')}</p>
      <Link to="/" className="block bg-indigo-400 px-6 py-3 rounded hover:bg-indigo-500 text-white">{t('notFound.goHome')}</Link>
  </div>
  );
}

export default NotFound;