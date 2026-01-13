import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
declare module 'swiper/css';
declare module 'swiper/css/navigation';
declare module 'swiper/css/pagination';
declare module 'swiper/css/autoplay';


interface FeaturedItem {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    link: string;
    type: 'game' | 'news';
}

interface FeaturedHeroProps {
    items: FeaturedItem[];
}

function FeaturedHero({ items }: FeaturedHeroProps) {
    return (
        <div className="w-full bg-gray-900">
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
                                        <span className="inline-block bg-red-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
                                            {item.subtitle}
                                        </span>
                                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                                            {item.title}
                                        </h2>
                                        <div className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                                            Learn More
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

export default FeaturedHero