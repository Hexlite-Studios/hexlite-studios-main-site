import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/swiper-bundle.css';


interface FeaturedItem {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    link: string;
    type: 'game' | 'news';
}

interface FeaturedHeroProps {
    items: FeaturedItem[];
}

export default function FeaturedHero({ items }: FeaturedHeroProps) {
    const { t } = useTranslation();

    if (items.length === 0) {
        return (
            <div className="w-full bg-zinc-950/15">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="h-96 md:h-[500px] bg-zinc-900/50 rounded-xl animate-pulse border border-zinc-800 flex items-end p-12" />
                        <div className="space-y-4 w-1/2">
                            <div className="h-4 w-20 bg-zinc-800 rounded"></div>
                            <div className="h-10 w-3/4 bg-zinc-800 rounded"></div>
                            <div className="h-12 w-32 bg-zinc-800 rounded-lg"></div>
                         </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-zinc-950/15">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    loop={items.length > 1}
                    className="rounded-xl overflow-hidden"
                >
                    {items.map((item) => (
                        <SwiperSlide key={item.id}>
                            <Link to={item.link} className="block relative">
                                <div className="relative h-96 md:h-[500px] overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                                        <span className="inline-block bg-red-600 text-sm font-semibold px-4 py-1 rounded-full mb-2">
                                            {t(item.subtitle)}
                                        </span>
                                        <h2 className="text-3xl md:text-4xl font-bold mb-3">
                                            {t(item.title)}
                                        </h2>
                                        <span className="flex max-w-md mb-3">
                                            {t(item.description)}
                                        </span>
                                        <div className="inline-flex items-center gap-2 bg-zinc-600 font-semibold px-6 py-3 rounded-lg hover:bg-zinc-700 hover:text-white hover:ring-1 ring-zinc-400/80 transition-colors duration-200">
                                            {t('featuredHero.learnMore')}
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}
