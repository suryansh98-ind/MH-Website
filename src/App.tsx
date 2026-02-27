import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import PioneerSection from './components/PioneerSection'
import QuoteSection from './components/QuoteSection'
import FounderSection from './components/FounderSection'
import EducatorSection from './components/EducatorSection'
import PublishedWorksSection from './components/PublishedWorksSection'
import BeyondClinicSection from './components/BeyondClinicSection'
import MissionSection from './components/MissionSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <PioneerSection />
        <QuoteSection />
        <FounderSection />
        <EducatorSection />
        <PublishedWorksSection />
        <BeyondClinicSection />
        <MissionSection />
      </main>
      <Footer />
    </div>
  )
}
