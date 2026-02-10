import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FAQAccordion } from "@/components/FAQAccordion";
import { StaggeredContainer, FadeInUp, ScaleIn, ScaleXOnView } from "@/components/ClientAnimations";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Drvyn Car Care Coimbatore",
  description: "Have questions about car service, insurance claims, or scheduling in Coimbatore? Find all the answers you need in our FAQ section.",
  alternates: { canonical: "https://drvyn.in/faq" },
};

export default function FAQPage() {
  // FAQ Schema for Search Engines (helps you appear in 'People Also Ask' sections)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the ways to schedule a car service with drvyn in Coimbatore?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can book your car service through our website, mobile app, or by calling our customer service hotline."
        }
      },
      {
        "@type": "Question",
        "name": "How extensive is the drvyn car service network in Coimbatore?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "drvyn has a wide network of authorized service centers across Coimbatore, which you can locate using our website."
        }
      }
      // Add other questions from your FAQAccordion.tsx here
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <main className="bg-white min-h-screen py-16 px-4 relative overflow-hidden">
        {/* Decorate with your existing animation components */}
        <ScaleIn className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30" children={undefined} />
        
        <div className="w-full max-w-4xl mx-auto z-10 relative">
          <div className="text-center mb-16">
            <FadeInUp>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Frequently <span className="text-blue-600 relative mx-2">
                  Asked
                  <ScaleXOnView delay={0.5} duration={0.6} className="absolute -bottom-2 left-0 right-0 mx-auto w-full">
                    <svg viewBox="0 0 200 10" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0,5 C50,0 150,10 200,5" stroke="currentColor" strokeWidth="2" fill="none" className="text-blue-200" />
                    </svg>
                  </ScaleXOnView>
                </span> Questions
              </h1>
            </FadeInUp>
            <FadeInUp>
              <p className="text-lg text-gray-600">
                We're here to help. Find answers to common questions about car service in Coimbatore.
              </p>
            </FadeInUp>
          </div>
          <FAQAccordion />
        </div>
      </main>
      <Footer />
    </>
  );
}