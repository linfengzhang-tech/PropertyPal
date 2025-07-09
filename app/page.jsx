import Hero from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import HomeProperties from '@/components/HomeProperties';
import FeaturedProperties from '@/components/FeaturedProperties';

const HomePage = async () => {
    return (
        <>
            <Hero />
            <InfoBoxes />
            <HomeProperties heading="Recent Properties" sort="recent" />
            <FeaturedProperties heading="Featured Properties" limit={2} />
        </>
    );
}

export default HomePage;
