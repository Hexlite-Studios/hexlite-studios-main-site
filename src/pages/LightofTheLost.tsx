import { useTranslation } from 'react-i18next';
import { lotlCatladyQuest } from '../assets/Assets';

function LightofTheLost() {
  const { t } = useTranslation();

  return (
      <div className="flex-1 p-4 flex flex-col items-center justify-center text-white">
        <img 
          src={lotlCatladyQuest} 
          alt="Light of the Lost Cat Lady Quest" 
          className="mb-4 w-auto h-80 object-cover mt-16" 
        />
        <h1 className="text-4xl font-bold mb-4">
          {t('lightOfTheLost.title')}
        </h1>
        <p className="text-lg text-center max-w-xl">
          {t('lightOfTheLost.welcomeMessage')}
        </p>
        <p className="mt-2 text-lg text-center max-w-xl">
          {t('lightOfTheLost.description')}
          </p>
      </div>
  )
}
export default LightofTheLost;