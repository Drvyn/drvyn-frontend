"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ViewFadeInUp } from "@/components/ClientAnimations";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <ViewFadeInUp>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Privacy <span className="text-blue-600">Policy</span>
            </h1>
            <p className="text-gray-500 mb-12">Last Updated: February 2026</p>

            <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-10">
              
              {/* User Information */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide">User Information</h2>
                <p>
                  The Platform obtains the information you provide when you register/subscribe for the Services or products. When you register with us, you provide us with your name, age, email address, location, and phone number; transaction-related information; information you provide us when you contact us for help; and geographical location data obtained through GPS (collectively &quot;Information&quot;).
                </p>
                <p className="mt-4">
                  <strong>Drvyn</strong> collects information about your activity on the platform, including search history, IP address, operating system, and browser settings to improve system activity and user experience.
                </p>
                <div className="mt-4 p-4 bg-gray-50 border-l-4 border-blue-600 italic">
                  Usage by individuals under 18 years of age must be undertaken only with strict supervision and approval of a parent or legal guardian.
                </div>
              </section>

              {/* Use of Personal Information */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide">Use of your Personal Information</h2>
                <p>The Information collected is utilized for rendering Services, maintaining the Platform, evaluating personnel competence, resolving complaints, and coordinating order delivery. We also use data to analyze trends, conduct research, and learn about user behavior to improve the base experience.</p>
                <p className="mt-4">
                  We do not sell, trade, or rent your Information to any third party except to provide you with Services or when expressly authorized by you. We may disclose Information as required by law or to protect the rights and safety of <strong>Drvyn</strong> and its users.
                </p>
              </section>

              {/* Transfer of Information */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide">Transfer of Information</h2>
                <p>
                  Your information may be transferred to and maintained on computers located outside of your state or country where data protection laws may differ. By using our Services, you consent to this transfer. All activities regarding data processing will take place in <strong>India</strong>.
                </p>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide">Your Rights</h2>
                <p>You have the right to access, review, correct, and request the deletion of your Information. You may also object to or restrict processing, though this may result in the discontinuation of Services.</p>
                <p className="mt-2 font-semibold">To exercise these rights, contact us at: drvyn.in@gmail.com</p>
              </section>

              {/* Cookies & Alerts */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide">Cookies & Alerts</h2>
                <p>We use cookies to identify your browser and track preferences to determine user trends. You can reset your browser to refuse cookies, though some features may not function properly. We may also alert you via email or phone (SMS/Call) regarding new service offerings.</p>
              </section>

              {/* Security & Data Retention */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide">Security & Data Retention</h2>
                <p>We provide physical, electronic, and procedural safeguards to protect your Information. We plan to retain user Information while an account is active and for at least three years afterwards, or as required for legitimate business interests and fraud prevention.</p>
              </section>

              {/* Intellectual Property Rights */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide">Intellectual Property Rights</h2>
                <p>
                  All information, content, material, and trademarks contained on the Platform are the proprietary property of <strong>Drvyn</strong> (&quot;Proprietary Information&quot;). No Proprietary Information may be copied, reproduced, or distributed without prior written permission from the Company.
                </p>
              </section>

              {/* Grievances */}
              <section id="contact" className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
                <h2 className="text-2xl font-bold text-blue-900 mb-4 uppercase tracking-wide">Discrepancies and Grievances</h2>
                <p className="text-blue-800 mb-4">In case of any discrepancy or grievance, please contact our Grievance Officer:</p>
                <div className="space-y-1 text-blue-900 font-medium">
                  <p>Attention: Grievance Officer, Drvyn</p>
                  <p>Location: Coimbatore, Tamil Nadu</p>
                  <p>Email: drvyn.in@gmail.com</p>
                </div>
              </section>

              {/* Dispute Resolution */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide">Dispute Resolution</h2>
                <p>
                  This Policy shall be governed by the laws of the Republic of India. Any dispute relating to this Policy shall be subject to the exclusive jurisdiction of the courts of <strong>Coimbatore/New Delhi</strong>.
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