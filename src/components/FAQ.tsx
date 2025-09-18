import type { NextPage } from 'next';
import { StaggeredContainer, FadeInUp, ScaleIn } from './ClientAnimations';
import { FAQAccordion } from './FAQAccordion'; // Import the new client component

const FAQ: NextPage = () => {
  return (
    <div className="bg-white min-h-screen font-sans flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Decorative Blobs */}
      {/* These can remain here as they don't require interaction */}
      <ScaleIn className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30" children={undefined} />
      <ScaleIn delay={0.2} duration={1} className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-20" children={undefined} />
      
      <div className="w-full max-w-4xl mx-auto z-10 mt-10 mb-10">
        <StaggeredContainer>
          <div className="text-center mb-12">
            <FadeInUp>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Frequently Asked Questions
              </h1>
            </FadeInUp>
            <FadeInUp>
              <p className="text-lg text-gray-600">
                We're here to help. Find answers to common questions across categories.
              </p>
            </FadeInUp>
          </div>
        </StaggeredContainer>

        {/* Render the interactive accordion component */}
        <FAQAccordion />
      </div>
    </div>
  );
};

export default FAQ;