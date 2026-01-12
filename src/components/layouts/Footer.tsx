import LanguageSelector from "./LanguageSelector"
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="flex flex-col items-center bg-neutral-800 text-white justify-center border-t border-neutral-900">
            <div className="pt-2">
                <LanguageSelector />
            </div>
            <div className="border-t border-neutral-950/30 my-2 w-full"/>
            <div>
                <p>{t('footer.copyright')}</p>
            </div>
        </footer>
    )
}

export default Footer