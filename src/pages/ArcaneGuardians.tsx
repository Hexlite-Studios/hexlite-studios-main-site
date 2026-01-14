import { useTranslation } from 'react-i18next';
import { kirimav1 } from '../assets/Assets';

function ArcaneGuardians() {
  const { t } = useTranslation();
  return (
      <div className="flex-1 p-4 flex flex-col items-center justify-center text-white">
        <img 
          src={kirimav1} 
          alt="Kirima V1" 
          className="mb-4 w-auto h-80 object-cover mt-16" 
        />
        <h1 className="text-4xl font-bold mb-4">
          {t('arcaneGuardians.title')}
        </h1>
        <p className="text-lg text-center max-w-xl">
          {t('arcaneGuardians.welcomeMessage')}
        </p>
        <p className="mt-2 text-lg text-center max-w-xl">
          {t('arcaneGuardians.description')}
        </p>
      </div>
  )
}
export default ArcaneGuardians;