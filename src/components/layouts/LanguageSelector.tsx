import { useTranslation } from 'react-i18next';

function LanguageSelector() {
    const { i18n } = useTranslation();

    const languages = [
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'ja', label: '日本語', flag: '🇯🇵' },
    ];

    return (
        <select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="bg-zinc-700 cursor-pointer rounded"
        >
            {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.label}
                </option>
            ))}
        </select>
    )
}
export default LanguageSelector