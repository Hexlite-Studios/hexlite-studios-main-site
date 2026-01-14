import { useTranslation } from 'react-i18next';
import { constructionbg } from '../assets/Assets';

function Warfront() {
  const { t } = useTranslation();

  return (
      <div className="flex-1 p-4 flex flex-col items-center justify-center text-white">
        <img 
          src={constructionbg} 
          alt="Construction Image" 
          className="mb-4 w-auto h-80 object-cover mt-16" 
        />
        <h1 className="text-4xl font-bold mb-4">
          {t('wafront.title')}
        </h1>
        <p className="text-lg text-center max-w-xl">
          {t('wafront.welcomeMessage')}
        </p>
        <p className="mt-2 text-lg text-center max-w-xl">
          {t('wafront.description')}
          </p>
      </div>
  )
}
export default Warfront;