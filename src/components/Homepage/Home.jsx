import Hero from './Hero'
import PromoSlider from './PromoSlider'
import TestimonialSection from './Testemonials'
import TheJournal from './News'
import BestSellers from './Bestsellers'
import TheEdit from './TheEdit'
import QualitySection from './WhyChoose'
import CategorySection from './CategorySection'
import Stories from './Stories'

function Home() {
  return (
    <>
     <Hero />
     <PromoSlider />
     <CategorySection />
     <BestSellers />
     <TheEdit />
     <QualitySection />
     <TestimonialSection />
     <Stories/>
     <TheJournal />
    </>
  )
}

export default Home
