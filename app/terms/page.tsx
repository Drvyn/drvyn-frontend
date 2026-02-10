"use client";

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ViewFadeInUp, StaggeredContainer, FadeInUp } from "@/components/ClientAnimations";

export default function TermsAndConditions() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white p-8 md:p-16 rounded-3xl shadow-sm border border-gray-100">
          <ViewFadeInUp>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Terms & <span className="text-blue-600">Conditions</span>
            </h1>
            <p className="text-gray-500 mb-12">Last Updated: February 2026</p>

            <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-10">
              
              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide">1. Contractual Relationship</h2>
                <div className="space-y-4">
                  <p>
                    <strong>Drvyn</strong> (operating under the domain <strong>www.drvyn.in</strong>), provides car services including maintenance, repair, etc. The use and access of our website <a href="https://www.drvyn.in" className="text-blue-600 hover:underline">www.drvyn.in</a> (“Website”), and our mobile applications (“Applications”), or any products or services in connection with the Application or Website (“Services”) shall be governed by these terms and conditions (“Terms”). The Website and Applications are together called the “Platform”.
                  </p>
                  <p>
                    These terms constitute a legally binding and enforceable agreement between <strong>Drvyn</strong> (“Company/we/us/our”) and its Users (“User/you/your”) and govern your use of the Platform to browse and/or avail the Services displayed by us on the Platform. By accessing and using our Services, you agree to be bound by these terms.
                  </p>
                  <p>
                    The Company reserves the right, in its sole discretion, to change, modify or amend the Terms at any time, and the Company will post the amended Terms at the domain of <a href="https://www.drvyn.in/terms" className="text-blue-600 hover:underline">www.drvyn.in/terms</a>.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide">2. Definitions</h2>
                <ul className="list-disc pl-5 space-y-3">
                  <li><strong>&quot;Drvyn Content&quot;</strong> means Content that the Company creates and makes available in connection with the Services including visual interfaces, interactive features, graphics, design, computer code, and aggregate ratings.</li>
                  <li><strong>&quot;Estimated Cost&quot;</strong> will include the service provider&apos;s approximation of what the Service is likely to cost.</li>
                  <li><strong>&quot;Services&quot;</strong> means services provided through the Platform including car repair, maintenance, and towing.</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide">3. Services</h2>
                <p>
                  The Services constitute a technology platform that enables Users to arrange and schedule repair or maintenance services for your car with independent third-party providers. 
                </p>
                <p className="mt-4">
                  <strong>Towing Service:</strong> The Company also provides towing service to get your vehicle back on the road on a chargeable basis.
                </p>
                <p className="mt-4 italic text-gray-600">
                  You acknowledge that the Company does not provide any repair and maintenance services directly; all such services are provided by independent third-party contractors.
                </p>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide">4. Support</h2>
                <p>
                  The Company offers support via email and phone calls. In case you require any assistance, you may contact our support at:
                </p>
                <div className="mt-4 bg-blue-50 p-6 rounded-xl border border-blue-100 inline-block">
                  <p className="font-semibold text-blue-900">Email: drvyn.in@gmail.com</p>
                  <p className="font-semibold text-blue-900">Helpline: +91 98402 77116</p>
                  <p className="text-sm text-blue-700 mt-2">(Available Mon-Sun, 7 AM - 9 PM)</p>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide">5. Billing and Charges</h2>
                <p>
                  All Charges paid by you are final and non-refundable. In the event the User fails to collect their car at the agreed date of deliver
                </p>
                <p className="mt-4">
                  <strong>Lien:</strong> If there is a default in payment, Drvyn has a right to keep the vehicle in its possession until payment in full has been made.
                </p>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide">6. Limitation of Liability</h2>
                <p>
                  In no case are our directors, employees, or affiliates liable for indirect, incidental, or consequential damages resulting from the use of the Services. The Services are provided &quot;as is&quot; and &quot;as available.&quot;
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide">7. Dispute Resolution & Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of these terms shall be subject to the exclusive jurisdiction of the courts in <strong>Coimbatore, Tamil Nadu</strong>.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide">8. Termination</h2>
                <p>
                  Drvyn may terminate your usage of the Platform at any time for any reason, including breach of these Terms. You may also terminate these terms at any time by ceasing to use our Services.
                </p>
              </section>

            </div>
          </ViewFadeInUp>
        </div>
      </main>
      <Footer />
    </>
  );
}