import {
  StaggeredContainer,
  FadeInUp,
  FadeInLeft,
  ScaleIn,
  ScaleXOnView,
  HoverScale,
  ViewFadeInUp,
} from './ClientAnimations';

const ServiceAdvantage = () => {
  return (
    <section className="bg-slate-50 font-inter relative overflow-hidden">
      {/* Background elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-20"></div>

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <StaggeredContainer className="text-center mb-14 relative">
          <FadeInUp>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 inline-block relative">
              Why
              <span className="text-blue-600 relative mx-2">
                Drvyn
                <ScaleXOnView delay={0.5} duration={0.6} className="absolute -bottom-2 left-0 right-0 mx-auto w-full">
                  <svg
                    viewBox="0 0 200 10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0,5 C50,0 150,10 200,5" stroke="currentColor" strokeWidth="2" fill="none" className="text-blue-200" />
                  </svg>
                </ScaleXOnView>
              </span>
              is The Right Choice for You
            </h1>
          </FadeInUp>
          <FadeInUp>
            <p className="mt-4 text-md md:text-lg text-slate-600 max-w-3xl mx-auto">
              Tired of inconsistent auto services? Discover our certified technicians,
              convenient mobile service, and transparent process.
            </p>
          </FadeInUp>
        </StaggeredContainer>

        {/* Benefits Grid */}
        <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Pain Points Card */}
          <FadeInUp className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 relative overflow-hidden group h-full">
            <ScaleIn delay={0.4} className="absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 bg-blue-50 rounded-full opacity-60 transition-opacity duration-300" children={undefined}></ScaleIn>
            <h2 className="text-xl font-bold text-slate-900 mb-4 relative z-10">
              Common Auto Service Challenges
            </h2>
            <StaggeredContainer className="space-y-3 text-slate-600 relative z-10">
              <FadeInLeft className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  <span><strong className="font-semibold text-slate-800">Variable Quality:</strong> Inconsistent results.</span>
              </FadeInLeft>
              <FadeInLeft className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  <span><strong className="font-semibold text-slate-800">Limited Updates:</strong> Often left wondering.</span>
              </FadeInLeft>
              <FadeInLeft className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  <span><strong className="font-semibold text-slate-800">Unexpected Costs:</strong> Bills exceed estimates.</span>
              </FadeInLeft>
              <FadeInLeft className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  <span><strong className="font-semibold text-slate-800">Part Quality:</strong> Uncertainty on authenticity.</span>
              </FadeInLeft>
            </StaggeredContainer>
          </FadeInUp>

          {/* Solution Benefits Card */}
          <FadeInUp className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 relative overflow-hidden group h-full">
            <ScaleIn delay={0.6} className="absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 bg-blue-50 rounded-full opacity-60 transition-opacity duration-300" children={undefined}></ScaleIn>
            <h2 className="text-xl font-bold text-slate-900 mb-4 relative z-10">
              Our Commitment to Excellence
            </h2>
            <StaggeredContainer className="space-y-3 text-slate-600 relative z-10">
              <FadeInLeft className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">•</span>
                <span><strong className="font-semibold text-slate-800">Verified Technicians:</strong> Rigorously trained experts.</span>
              </FadeInLeft>
              <FadeInLeft className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">•</span>
                <span><strong className="font-semibold text-slate-800">Advanced Facilities:</strong> State-of-the-art tech.</span>
              </FadeInLeft>
              <FadeInLeft className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">•</span>
                <span><strong className="font-semibold text-slate-800">Constant Communication:</strong> Regular updates.</span>
              </FadeInLeft>
              <FadeInLeft className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">•</span>
                <span><strong className="font-semibold text-slate-800">Honest Pricing:</strong> Clear estimates, no fees.</span>
              </FadeInLeft>
            </StaggeredContainer>
          </FadeInUp>

          {/* Services Highlight Card */}
          <FadeInUp className="bg-blue-900 text-white rounded-xl shadow-md p-6 md:col-span-2 lg:col-span-1 relative overflow-hidden group h-full">
            <ScaleIn delay={0.8} className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-blue-700 rounded-full opacity-40" children={undefined}></ScaleIn>
            <h2 className="text-xl font-bold mb-4 relative z-10">
              Top-Rated Automotive Services
            </h2>
            <StaggeredContainer className="space-y-3 text-blue-100 relative z-10">
              <FadeInLeft className="flex items-start">
                <span className="text-blue-300 mr-2 mt-1">•</span>
                <span><strong className="font-semibold text-white">Mobile Mechanic:</strong> Repairs at your location.</span>
              </FadeInLeft>
              <FadeInLeft className="flex items-start">
                <span className="text-blue-300 mr-2 mt-1">•</span>
                <span><strong className="font-semibold text-white">Premium Detailing:</strong> Comprehensive cleaning.</span>
              </FadeInLeft>
              <FadeInLeft className="flex items-start">
                <span className="text-blue-300 mr-2 mt-1">•</span>
                <span><strong className="font-semibold text-white">Electrical Diagnostics:</strong> Expert troubleshooting.</span>
              </FadeInLeft>
              <FadeInLeft className="flex items-start">
                <span className="text-blue-300 mr-2 mt-1">•</span>
                <span><strong className="font-semibold text-white">Emergency Support:</strong> Rapid response team.</span>
              </FadeInLeft>
            </StaggeredContainer>
          </FadeInUp>
        </StaggeredContainer>

        {/* Action Section */}
        <ViewFadeInUp className="mt-16 bg-white rounded-xl shadow-sm p-8 border border-slate-100 flex flex-col md:flex-row justify-between items-center text-center md:text-left relative overflow-hidden">
          <ScaleIn delay={0.4} className="absolute bottom-0 left-0 w-40 h-40 -mb-8 -ml-8 bg-blue-50 rounded-full opacity-50" children={undefined}></ScaleIn>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Schedule Your Service Today
            </h2>
            <p className="mt-2 text-slate-600 max-w-xl">
              Stop compromising on your vehicle's care. Choose our certified experts,
              advanced facilities, and customer-focused approach.
            </p>
          </div>
          <HoverScale>
            <a
              href="/"
              className="mt-6 md:mt-0 bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 whitespace-nowrap relative z-10 shadow-md"
            >
              Book Appointment
            </a>
          </HoverScale>
        </ViewFadeInUp>
      </div>
    </section>
  );
};

export default ServiceAdvantage;