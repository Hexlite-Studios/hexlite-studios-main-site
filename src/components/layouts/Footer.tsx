import LanguageSelector from "./LanguageSelector"
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="flex flex-col items-center bg-zinc-950 text-gray-200 justify-center border-t border-zinc-800">
            <div className="pt-2">
                <LanguageSelector />
            </div>
            <div className="border-t border-zinc-800/40 my-2 w-full"/>
            <div>
                <p>{t('footer.copyright')}</p>
            </div>
        </footer>
    )
}

export default Footer