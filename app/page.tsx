import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Brands from "@/components/Brands";
import Poster from "@/components/Poster";
import Choice from "@/components/Choice";

export const metadata = {
  title: "Drvyn - Premier Car Services in Coimbatore",
  description: "Experience premier car services in Coimbatore. Get instant quotes for your car service, maintenance, and repairs with Drvyn.",
  openGraph: {
    title: "Drvyn - Premier Car Services in Coimbatore",
    description: "Experience premier car services in Coimbatore. Get instant quotes for your car service.",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Banner />
      <Services />
      <Poster/>
      <Process />
      <Brands />
      <Choice/>
    </>
  );
}
