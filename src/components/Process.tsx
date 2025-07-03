import Image from "next/image";

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
    <section className="bg-gray-50 py-14">
      {/* Heading Section */}
      <div className="relative z-20 max-w-3xl px-6 md:px-12 mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-black">
          How It Works
        </h2>
        <div className="w-24 md:w-64 h-1 bg-red-500 mx-auto my-4 rounded" />
        <p className="text-sm md:text-base tracking-wide text-gray-600 uppercase">
          Expert Repair & Maintenance for All Vehicle Needs
        </p>
      </div>

      {/* Steps Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-6 md:px-12 mt-10">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-center items-center mb-5 h-20">
              <Image
                src={step.icon}
                alt={step.title}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-500">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
