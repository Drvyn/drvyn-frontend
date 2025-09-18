import Image from "next/image";
import { StaggeredContainer, FadeInUp, ViewFadeInUp, ScaleIn } from './ClientAnimations';

export default function Process() {
  const steps = [
    {
      icon: "/media/p1.png",
      title: "Your Choice",
      desc: "Explore our diverse range of services.",
    },
    {
      icon: "/media/p2.png",
      title: "Book",
      desc: "Make An Appointment With Us",
    },
    {
      icon: "/media/p3.png",
      title: "Fair Pricing",
      desc: "Just the Right Price for the Right Service",
    },
    {
      icon: "/media/p4.png",
      title: "At Your Doorstep",
      desc: "Convenient Doorstep Pick-Up and Drop-Off Services",
    },
  ];

  return (
    <section id="process" className="bg-gray-50 py-20 relative overflow-hidden">
     <ScaleIn className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30" children={undefined} />
      <ScaleIn delay={0.2} duration={1} className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-20" children={undefined} />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <ViewFadeInUp className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-center">
            How It <span className="text-blue-600 relative">Works
            <svg className="absolute -bottom-2 left-0 right-0 mx-auto w-full" viewBox="0 0 200 10" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,5 C50,0 150,10 200,5" stroke="currentColor" strokeWidth="2" fill="none" className="text-blue-200" />
            </svg>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-center">
            Expert Repair & Maintenance for All Vehicle Needs
          </p>
        </ViewFadeInUp>

        <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <FadeInUp
              key={index}
              liftOnHover={true}
              className="group relative"
            >
              <div className="h-full flex flex-col rounded-2xl p-8 border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-500 group-hover:border-blue-200 relative overflow-hidden text-center items-center">
                <div className="relative w-28 h-28 mb-6 rounded-2xl flex items-center justify-center p-4 transition-colors duration-500 mx-auto">
                  <Image
                    src={step.icon}
                    alt={step.title}
                    width={200} 
                    height={200} 
                    className="object-contain transition-transform duration-500 group-hover:scale-110 mx-auto"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 transition-colors duration-300 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  {step.desc}
                </p>
              </div>
            </FadeInUp>
          ))}
        </StaggeredContainer>
      </div>
    </section>
  );
}