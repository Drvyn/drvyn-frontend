"use client";

import React, { useState } from 'react';
import { StaggeredContainer, FadeInUp } from './ClientAnimations';

// Define the type for a single FAQ item
interface FAQItemProps {
  question: string;
  answer: string;
}

// Define the type for the FAQ data array
const faqData: FAQItemProps[] = [
  {
    question: 'What are the ways to schedule a car service with drvyn in Coimbatore?',
    answer:
      'You can book your car service with drvyn in Coimbatore through our website, mobile app, or by calling our customer service hotline. We offer a convenient online booking system that allows you to choose your desired service, date, and time slot.',
  },
  {
    question: 'How extensive is the drvyn car service network in Coimbatore?',
    answer:
      'drvyn has a wide network of authorized service centers across Coimbatore. You can find the nearest one to you using the service center locator on our website or mobile app.',
  },
  {
    question: 'What is the expected turnaround time for car delivery after service?',
    answer:
      'The delivery time for your car depends on the type of service you have availed. A standard service usually takes a few hours, while major repairs might take longer. We will provide you with an estimated delivery time when you book your service.',
  },
  {
    question: 'Are appointments required for service in Coimbatore, or are walk-ins welcome?',
    answer:
      'While we do accept walk-ins, we highly recommend booking an appointment in advance to ensure a seamless and timely service experience. Booking an appointment guarantees you a slot and helps us prepare for your visit.',
  },
  {
    question: 'What steps should I take to report a car accident claim?',
    answer:
      'In case of an accident, you should inform your insurance company as soon as possible. You will also need to file a claim with them. We can assist you with the claim process and provide the necessary documents from our end.',
  },
  {
    question: 'What aspects of my car are examined during an inspection?',
    answer:
      'Our comprehensive car inspection covers a wide range of checks, including the engine, transmission, brakes, suspension, tires, and electrical systems. We use advanced diagnostic tools to identify any potential issues and provide you with a detailed report.',
  },
  {
    question: 'What is the approximate duration for a complete car inspection?',
    answer:
      'A standard car inspection usually takes about 30-45 minutes. However, the duration may vary depending on the condition of your car and the specific checks required.',
  },
  {
    question: 'Can you tell me about the number of affiliated workshops in Coimbatore?',
    answer:
      'We have a large network of partner workshops across Coimbatore to provide you with convenient and reliable car services. You can find a complete list of our workshops on our website.',
  },
];

export const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <StaggeredContainer className="space-y-4">
      {faqData.map((item, index) => (
        <FadeInUp key={index} liftOnHover={true}>
          <div className="bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300">
            <button
              className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
              onClick={() => toggleFAQ(index)}
              aria-expanded={activeIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="text-lg font-medium text-gray-700">{item.question}</span>
              <span className="text-2xl text-gray-500 transform transition-transform duration-300">
                {activeIndex === index ? (
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                   </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                )}
              </span>
            </button>
            <div
              id={`faq-answer-${index}`}
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                activeIndex === index ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <div className="p-6 pt-0 text-gray-600">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        </FadeInUp>
      ))}
    </StaggeredContainer>
  );
};