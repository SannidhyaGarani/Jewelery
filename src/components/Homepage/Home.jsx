
import Hero from './Hero'
import TestimonialSection from './Testemonials'
import Newsletter from './News'
import BestSellers from './Bestsellers'
import FeaturedCollections from './Featured'
import WhyChooseUs from './WhyChoose'
import SocialGallery from './SocialGallery'
import EditorialBanner from './EditorialBanner'
import AtelierService from './AtelierService'
import CategorySection from './CategorySection'

function Home() {
 

  return (
    <>
    
     <Hero/>
     <CategorySection/>
     <EditorialBanner/>
     <BestSellers/>
     <AtelierService/>
     <WhyChooseUs/>
     <TestimonialSection/>
     <SocialGallery/>
     <FeaturedCollections/>
     <Newsletter/>
    </>
  )
}

export default Home
