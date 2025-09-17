"use client";

import React, { useState } from 'react';
import { StaggeredContainer, FadeInUp, ViewFadeInUp } from './ClientAnimations';

export type Testimonial = {
  name: string;
  location: string;
  rating: number;
  text: string;
};

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.445a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.367-2.445a1 1 0 00-1.175 0l-3.367 2.445c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.062 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
  </svg>
);

const UserAvatar = ({ name }: { name: string }) => {
  const initials = name.split(' ').map(part => part[0]).join('').toUpperCase();
  return (
    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg mr-4 shadow-md bg-blue-600">
      {initials}
    </div>
  );
};

const TestimonialCard = ({ name, location, rating, text }: Testimonial) => {
  const [expanded, setExpanded] = useState(false);
  const needsTruncation = text.length > 150;

  return (
    <figure className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col justify-between h-full transition-shadow duration-300 hover:shadow-xl">
      <div>
        <div className="flex items-center mb-4" aria-label={`Rating: ${rating} out of 5 stars`}>
          {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < rating} />)}
        </div>
        <blockquote className="text-gray-700 leading-relaxed text-base mb-4">
          <p>
            {needsTruncation && !expanded ? `${text.substring(0, 150)}...` : text}
            {needsTruncation && (
              <button onClick={() => setExpanded(!expanded)} className="text-blue-600 hover:text-blue-800 font-medium ml-1 text-sm" aria-expanded={expanded}>
                {expanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </p>
        </blockquote>
      </div>
      <figcaption className="border-t border-gray-100 pt-4 mt-auto">
        <div className="flex items-center">
          <UserAvatar name={name} />
          <div>
            <p className="font-semibold text-gray-800 text-base">{name}</p>
            <div className="flex items-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </div>
          </div>
        </div>
      </figcaption>
    </figure>
  );
};

// --- Main Client Component for Grid and Pagination ---
const InteractiveReviews = ({ testimonials = [] }: { testimonials: Testimonial[] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const testimonialsPerPage = 6;
    
    const indexOfLastTestimonial = currentPage * testimonialsPerPage;
    const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
    const currentTestimonials = testimonials.slice(indexOfFirstTestimonial, indexOfLastTestimonial);
    const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);
    
    const paginate = (pageNumber: number) => {
      if (pageNumber < 1 || pageNumber > totalPages) return;
      setCurrentPage(pageNumber);
    };

    return (
        <>
            <StaggeredContainer key={currentPage} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {currentTestimonials.map((testimonial) => (
                    <FadeInUp key={testimonial.name} liftOnHover={true}>
                        <TestimonialCard {...testimonial} />
                    </FadeInUp>
                ))}
            </StaggeredContainer>

            {totalPages > 1 && (
                <ViewFadeInUp>
                    <div className="flex items-center justify-center gap-4 mt-8">
                        {/* Left Arrow Button */}
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            aria-label="Previous page"
                            className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-full transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        {/* Page Counter for better UX */}
                        <p className="text-base text-gray-600 font-medium" aria-live="polite">
                            Page {currentPage} of {totalPages}
                        </p>

                        {/* Right Arrow Button */}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            aria-label="Next page"
                            className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-full transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </ViewFadeInUp>
            )}
        </>
    )
}

export default InteractiveReviews;