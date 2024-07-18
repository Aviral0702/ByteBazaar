import { useState } from 'react';
import faqImg from '../assets/faqimg.jpg';
import Navbar from './Navbar';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <h3
        className={`cursor-pointer text-lg flex justify-between items-center ${isOpen ? 'font-bold' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <svg
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '1rem', height: '1rem' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </h3>
      {isOpen && (
        <p className="mt-2 text-base text-gray-700">{answer}</p>
      )}
      <hr className="w-1/5 mt-4 border-none border-t border-gray-200" />
    </div>
  );
};

const FAQ = () => {
  return (
    <div>
      <Navbar />
      <div className="p-8 mt-10 py-10">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2 lg:pr-8">
            <div className="bg-pink-50 p-8 rounded-lg mb-8">
              <h2 className="text-blue-900 text-4xl font-bold mb-4">FREQUENTLY ASKED QUESTIONS</h2>
              <p className="text-gray-700 text-xl leading-relaxed mb-8">
                Explore ByteBazaar's FAQ page—a gateway to clarity in our SaaS marketplace.
                Find swift answers to queries on services, policies, and innovations.
                Empower your decisions with insights, solutions, and expert tips and also
                navigate with ease to discover how ByteBazaar enhances your experience.
              </p>
            </div>
            <div className="relative mt-8">
              <img
                src={faqImg}
                className="w-full object-cover"
                style={{ maxHeight: '400px' }} // Increased height
                alt="Confused"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-8">
            <FAQItem
              question="What is a SaaS marketplace?"
              answer="A SaaS marketplace is an online platform where users can discover, buy, and manage software-as-a-service (SaaS) applications from various vendors."
            />
            <FAQItem
              question="Do I need a credit card to sign up for a free trial?"
              answer="Some vendors may require a credit card for free trials to prevent misuse, but you won't be charged until the trial period ends. Check the product's terms for details."
            />
            <FAQItem
              question="How do I sign up for the marketplace?"
              answer="You can sign up by clicking on the 'Sign Up' button on the homepage and filling out the required information, including your name, email, and password."
            />
            <FAQItem
              question="How do I find the right SaaS product for my needs?"
              answer="You can use the search bar and filters to browse products by category, features, pricing, and user reviews to find the best fit for your needs."
            />
            <FAQItem
              question="What payment methods are accepted?"
              answer="Our marketplace accepts major credit cards, PayPal, and other secure payment methods. Details can be found on the checkout page."
            />
            <FAQItem
              question="Is there a free trial available for the products?"
              answer="Many of our SaaS vendors offer free trials. Look for the 'Free Trial' badge on the product listings or check the product details page."
            />
            <FAQItem
              question="How do I cancel a subscription?"
              answer="To cancel a subscription, go to your account settings, find the 'Subscriptions' tab, and follow the cancellation instructions for the specific product."
            />
            <FAQItem
              question="Can I get a refund if I'm not satisfied with a product?"
              answer="Refund policies vary by vendor. Please check the refund policy on the product's details page or contact our support team for assistance."
            />
            <FAQItem
              question="How do I contact customer support?"
              answer="You can contact our customer support team through the 'Contact Us' page, via email, or by using the live chat feature on our website."
            />
            <FAQItem
              question="Are my payment details secure?"
              answer="Yes, we use industry-standard encryption and security measures to ensure that your payment details are safe and secure."
            />
            <FAQItem
              question="How do I update my billing information?"
              answer="You can update your billing information by logging into your account, going to the 'Billing' section, and editing your payment details."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
