export interface ThemeColors {
    text: string;
    border: string;
    ring: string;
    shadow: string;
    b_light?: string;
}

export interface BgColors {
    bg: string;
    bg_light: string;
}

export const themeMap: Record<string, ThemeColors> = {
    white:  { text: 'text-white',      border: 'border-white/20',   b_light: 'border-white/10',        ring: 'ring-white/20',   shadow: 'shadow-gray-300/20'},
    zinc:   { text: 'text-zinc-400',   border: 'border-zinc-500',   b_light: 'border-zinc-500/40',   ring: 'ring-zinc-500',   shadow: 'shadow-zinc-500/20'},
    red:    { text: 'text-red-400',    border: 'border-red-500',    b_light: 'border-red-500/40',    ring: 'ring-red-500',    shadow: 'shadow-red-500/20'},
    blue:   { text: 'text-blue-400',   border: 'border-blue-500',   b_light: 'border-blue-500/40',   ring: 'ring-blue-500',   shadow: 'shadow-blue-500/20'},
    emerald:{ text: 'text-emerald-400',border: 'border-emerald-500', b_light: 'border-emerald-500/40', ring: 'ring-emerald-500',shadow: 'shadow-emerald-500/20'},
    violet: { text: 'text-violet-400', border: 'border-violet-500', b_light: 'border-violet-500/40', ring: 'ring-violet-500', shadow: 'shadow-violet-500/20'},
    amber:  { text: 'text-amber-400',  border: 'border-amber-500',  b_light: 'border-amber-500/40',  ring: 'ring-amber-500',  shadow: 'shadow-amber-500/20'},
    rose:   { text: 'text-rose-400',   border: 'border-rose-500',   b_light: 'border-rose-500/40', ring: 'ring-rose-500',   shadow: 'shadow-rose-500/20'},
};

export const backgroundThemes: Record<string, BgColors> = {
    white: { bg: 'bg-white/10', bg_light: 'bg-white/10' },
    zinc:  { bg: 'bg-zinc-500', bg_light: 'bg-zinc-500/10' },
    red:   { bg: 'bg-red-500', bg_light: 'bg-red-500/10' },
    blue:  { bg: 'bg-blue-500', bg_light: 'bg-blue-500/10' },
    emerald:{ bg: 'bg-emerald-500', bg_light: 'bg-emerald-500/10' },
    violet:{ bg: 'bg-violet-500', bg_light: 'bg-violet-500/10' },
    amber: { bg: 'bg-amber-500', bg_light: 'bg-amber-500/10' },
    rose:  { bg: 'bg-rose-500', bg_light: 'bg-rose-500/10' },
};

export function getTheme(colorName?: string) {
    return themeMap[colorName || 'white'] || themeMap['white'];
}

export function getBackgroundTheme(colorName?: string) {
    return backgroundThemes[colorName || 'zinc'] || backgroundThemes['zinc'];
}