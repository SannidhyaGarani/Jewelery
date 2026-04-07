
import Hero from './Hero'
import TestimonialSection from './Testemonials'
import Newsletter from './News'
import BestSellers from './Bestsellers'
import FeaturedCollections from './Featured'
import WhyChooseUs from './WhyChoose'
import SocialGallery from './SocialGallery'
import EditorialBanner from './EditorialBanner'
import AtelierService from './AtelierService'

function Home() {
 

  return (
    <>
    
     <Hero/>
     <FeaturedCollections/>
     <EditorialBanner/>
     <AtelierService/>
     <WhyChooseUs/>
     <BestSellers/>
     <TestimonialSection/>
     <SocialGallery/>
     <Newsletter/>
    </>
  )
}

export default Home
