import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      <div className="pt-16 md:pt-20"> {/* Adjust padding top for Navbar */}
        <Navbar />
      </div>
      <div className="container mx-auto p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-8 md:mt-12">Welcome to ByteBazaar</h1> {/* Adjust margin top */}
          <p className="text-lg md:text-xl mb-4">
            At ByteBazaar, we're on a mission to revolutionize how businesses access and utilize software solutions. Our innovative marketplace is meticulously designed to offer the best SaaS products available, ensuring companies have the resources they need to streamline operations, enhance productivity, and drive success. We believe in empowering businesses of all sizes with cutting-edge tools and technologies that facilitate growth and efficiency. By providing a diverse range of top-tier software solutions, we help companies achieve their goals, overcome challenges, and thrive in today's highly competitive landscape. At ByteBazaar, we are committed to being your trusted partner in business success.
          </p>
          
          <h2 className="text-3xl md:text-4xl font-bold mt-8 mb-4">Our Story</h2>
          <div className="bg-blue-100 p-4 rounded shadow mb-4">
            <p className="text-lg md:text-xl">
              Our journey began with a shared passion for coding and technology. As a group of enthusiastic developers, we spent countless hours honing our skills and exploring the latest advancements. Our path took a transformative turn when we participated in a hackathon hosted by EthAum Venture Partners. It was there that we identified a significant gap in the market: the need for a streamlined, comprehensive SaaS marketplace that could simplify the software procurement process for businesses.
            </p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow mb-4">
            <p className="text-lg md:text-xl">
              Inspired by this opportunity, we decided to leverage our technical expertise and entrepreneurial spirit to build ByteBazaar. Our vision was to create a platform that not only offers the best SaaS products but also empowers businesses to enhance productivity, streamline operations, and achieve their goals effortlessly. Fueled by our commitment to innovation and excellence, we embarked on this exciting journey to revolutionize the way businesses access and utilize software solutions.
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mt-8 mb-4">What We Offer?</h2>
          <div className="bg-yellow-100 p-4 rounded shadow mb-4">
            <p className="text-lg md:text-xl">
              At ByteBazaar, we bridge the gap between businesses and premier SaaS solutions, making it effortless for vendors to connect with their audience. We offer:
            </p>
            <ul className="list-disc list-inside">
              <li>Discover and Compare: Effortlessly locate and evaluate SaaS products with an array of filters.</li>
              <li>Subscription Management: Streamline the purchase and organization of all your software subscriptions in one place.</li>
              <li>Vendor Oversight: Monitor vendors, manage renewals and expirations, and communicate directly with vendors.</li>
              <li>Intelligent Insights: Leverage our advanced marketplace powered by an LLM to ask questions and gain valuable insights.</li>
            </ul>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mt-8 mb-4">Meet CodeCrew</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-purple-100 p-4 rounded shadow">
              <h3 className="text-2xl md:text-3xl font-bold">Himanshu Singh</h3>
              <p className="text-lg">Product Manager</p>
              <p>Himanshu is enthusiastic about product management, striving to meet user needs and deliver exceptional value at ByteBazaar.</p>
            </div>
            <div className="bg-red-100 p-4 rounded shadow">
              <h3 className="text-2xl md:text-3xl font-bold">Armaan Pant</h3>
              <p className="text-lg">Frontend Developer</p>
              <p>Armaan is our frontend wizard, crafting intuitive and user-friendly interfaces that make navigating ByteBazaar a seamless experience.</p>
            </div>
            <div className="bg-indigo-100 p-4 rounded shadow">
              <h3 className="text-2xl md:text-3xl font-bold">Aviral Asthana</h3>
              <p className="text-lg">Backend Developer</p>
              <p>Aviral is the backbone of our platform, responsible for developing robust backend systems that keep ByteBazaar running smoothly and efficiently.</p>
            </div>
            <div className="bg-teal-100 p-4 rounded shadow">
              <h3 className="text-2xl md:text-3xl font-bold">Mukund Agarwallla</h3>
              <p className="text-lg">Machine Learning Developer</p>
              <p>Mukund leverages the power of machine learning to enhance our platform's capabilities, ensuring our SaaS solutions are smart, efficient, and ahead of the curve.</p>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mt-8 mb-4">Get in Touch</h2>
          <div className="bg-gray-100 p-4 rounded shadow">
            <p className="text-lg md:text-xl">
              We'd love to hear from you! If you have any questions or need support, feel free to reach out to us at <a href="mailto:contact@bytebazaar.com" className="text-blue-500">contact@bytebazaar.com</a> or call us at +1234567890. Follow us on social media to stay updated on the latest news and developments.
            </p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}

export default About;
