import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteractiveReviews from "@/components/InteractiveReviews";
import { StaggeredContainer, FadeInUp, ViewFadeInUp, ScaleIn, ScaleXOnView } from "@/components/ClientAnimations";
import type { Testimonial } from "@/components/InteractiveReviews";

// Testimonial data exactly as defined in your Review.tsx
const testimonials: Testimonial[] = [
  {
    name: "Raja",
    location: "Coimbatore",
    rating: 5,
    text: "I recently gave my car for service, and overall, I had a good experience. Manimegalai and Mukesh from the team attended to my vehicle and ensured the service was completed properly. They were polite, responsive, and explained the work done clearly. The service quality was satisfactory. Thank you for the support!"
  },
  {
    name: "ROSHANRAKESH P",
    location: "Coimbatore",
    rating: 5,
    text: "I would rate 4.5/5. They even take little problems in their hand without any hesitation unlike the company showrooms. They attend breakdowns within a day of call at your door steps. Quick and best resolution for complications. I would highly recommend all coimbatorians to carage car care and especially for older vehicles. My executive Mr. Mukesh is a thorough professional and a great coordinator. I thank him so much for his exceptional services to my car."
  },
  {
    name: "CR Sankar",
    location: "Coimbatore",
    rating: 5,
    text: "I would like to thank and applaud the Drvyn Team. PROS: Good customer communication (Asik was very good in his updates). Skilled team (Prashanth & Surya) who worked on my car (Manikutan). Good work area, where multiple vehicles can be addressed simultaneously. I visited Carage for suspension-related work (Lower Arm, Link Rod). It was a tight schedule that I had requested, but the team managed to give me a slot and delivered a good outcome. Thank you so much, team."
  },
  {
    name: "Suresh Aruchamy",
    location: "Coimbatore",
    rating: 4,
    text: "It was a wonderful experience,their service was really good and they are more responsive and delivered the car on time."
  },
  {
    name: "Prithvi",
    location: "Coimbatore",
    rating: 5,
    text: "I have been servicing my car here for a long time now and I have always found them prompt, reliable and consistent in their quality of work. All staffs here are friendly and courteous and make the whole process seamless. They really do a good job for the best price. For the past few maintenance checks I have been dealing with Mr. Asik and found it great as he is really friendly and explains you about the work that will be carried out and most importantly he keeps me updated promptly about the car’s status and has always tried to deliver ahead of schedule or accomodate to my schedule. I have had all sorts of maintenance work done here incl. electrical, painting, dent repairs and highly recommend getting checked here"
  },
  {
    name: "ganesh kannan",
    location: "Coimbatore",
    rating: 5,
    text: "Fantastically done all repairs in my 2016 jazz complients... 100% satisfied... At low cost too...."
  },
  {
    name: "Pradeeshkumar Nithiyaudhayan",
    location: "Coimbatore",
    rating: 4,
    text: "I give my tata nano for service while it was not running condition but I was really happy they changed all parts with the genuine spares the cost wise pretty ok .... the staff and owner are behave awesome and good it was good experience for me ....."
  },
  {
    name: "Praveen sanjay",
    location: "Coimbatore",
    rating: 5,
    text: "A good place do the service to your car. Felt price as a little bit premium but worth it."
  },
  {
    name: "Karthi Gold Foil Printers",
    location: "Coimbatore",
    rating: 5,
    text: "Good Expirience Best service Affordable pricing"
  }
];

export const metadata: Metadata = {
  title: "Customer Reviews | Drvyn Car Service Coimbatore",
  description: "Read genuine reviews from 1000+ happy car owners in Coimbatore. Drvyn is rated 4.8/5 for periodic maintenance, car detailing, and repairs.",
  alternates: { canonical: "https://drvyn.in/reviews" },
};

export default function ReviewsPage() {
  
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Drvyn",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "100"
    },
    "url": "https://drvyn.in/reviews"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <Navbar />
      <main className="bg-gray-50 min-h-screen py-16 sm:py-24 relative overflow-hidden">
        {/* Background Decorations from your design */}
        <ScaleIn delay={0.3} duration={1.2}>
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30" />
        </ScaleIn>
        <ScaleIn delay={0.5} duration={1.2}>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-20" />
        </ScaleIn>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ViewFadeInUp className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
              Hear From Our <span className="text-blue-600 relative mx-2">
                Drvyn
                <ScaleXOnView delay={0.5} duration={0.6} className="absolute -bottom-2 left-0 right-0 mx-auto w-full">
                  <svg viewBox="0 0 200 10" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,5 C50,0 150,10 200,5" stroke="currentColor" strokeWidth="2" fill="none" className="text-blue-200" />
                  </svg>
                </ScaleXOnView>
              </span> Customers
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover why thousands of car owners trust Drvyn for their automotive needs.
            </p>
          </ViewFadeInUp>
          
          <StaggeredContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
            <FadeInUp>
              <div className="bg-white p-6 rounded-xl shadow text-center h-full flex flex-col justify-center border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
            </FadeInUp>
            <FadeInUp>
              <div className="bg-white p-6 rounded-xl shadow text-center h-full flex flex-col justify-center border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">4.8</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </FadeInUp>
            <FadeInUp>
              <div className="bg-white p-6 rounded-xl shadow text-center h-full flex flex-col justify-center border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
                <div className="text-gray-600">Services Offered</div>
              </div>
            </FadeInUp>
            <FadeInUp>
              <div className="bg-white p-6 rounded-xl shadow text-center h-full flex flex-col justify-center border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-600">Customer Support</div>
              </div>
            </FadeInUp>
          </StaggeredContainer>
          
          <InteractiveReviews testimonials={testimonials} />
        </div>
      </main>
      <Footer />
    </>
  );
}