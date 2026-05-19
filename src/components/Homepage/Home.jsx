
import Hero from './Hero'
import TestimonialSection from './Testemonials'
import TheJournal from './News'
import TheEdit from './Bestsellers'
import WorldEdit from './Featured'
import QualitySection from './WhyChoose'
import CategorySection from './CategorySection'
import NewsletterBar from './NewsletterBar'

function Home() {
  return (
    <>
     <Hero />
     <WorldEdit />
     <CategorySection />
     <TheEdit />
     <QualitySection />
     <TestimonialSection />
     <TheJournal />
     <NewsletterBar />
    </>
  )
}

export default Home
