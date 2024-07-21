import React from 'react';
import 'daisyui/dist/full.css';

const testimonials = [
  {
    name: 'Higs S.',
    role: 'CEO',
    text: "I've saved thousands of dollars using NachoNacho. I tell all my friends to use it for both personal and company use. This is such an easy way to make / save money!",
  },
  {
    name: 'Apoorva P.',
    role: 'CEO',
    text: "NachoNacho has already saved me over $1000 in the last 45 days - if you need to execute a SaaS chop or want to keep an eye on where your money is going - this will be a game-changer for you.",
  },
  {
    name: 'Matt J.',
    role: 'Co-founder/CEO',
    text: "NachoNacho has easily saved me $100s of dollars. I constantly trying out new products and forget to cancel before the free trial ends. It's a huge pain. Now I create a Nacho card, set the limit at $1, and never get dinged.",
  },
  {
    name: 'Timo B.',
    role: 'Head of Finance',
    text: "NachoNacho just keeps getting better! It gives each department buying power and control over their subscriptions and one-time expenses. It's effortless to manage cards and issue new ones, saving me a lot of time.",
  },
  {
    name: 'Alice K.',
    role: 'Project Manager',
    text: "NachoNacho has streamlined our subscription management process. We save time and money every month. Highly recommend!",
  },
  {
    name: 'John D.',
    role: 'CTO',
    text: "Fantastic service! NachoNacho has saved us significant amounts on software costs. It's a must-have tool for any company.",
  },
  {
    name: 'Sara L.',
    role: 'COO',
    text: "Our team loves NachoNacho. It gives us clear visibility on our expenses and helps us manage our budget more effectively.",
  },
  {
    name: 'Michael B.',
    role: 'Entrepreneur',
    text: "NachoNacho is a game-changer. Simple, efficient, and highly effective for managing multiple subscriptions.",
  },
  {
    name: 'Linda M.',
    role: 'Finance Director',
    text: "With NachoNacho, we've been able to cut down unnecessary expenses and allocate our budget more wisely.",
  },
  {
    name: 'David S.',
    role: 'Business Owner',
    text: "I can't imagine running my business without NachoNacho now. It's indispensable for financial control and cost management.",
  },
];

const Testimonials = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Trusted by tens of thousands of small and mid-sized companies, startups, service providers, freelancers, and agencies worldwide.
        </h2>
        <div className="carousel carousel-center max-w-7xl p-4 sm:p-8 space-x-4 bg-gray-300 rounded-box mx-auto mt-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="carousel-item p-4 sm:p-8 md:p-12"> {/* Increased padding */}
              <div className="bg-yellow-400 p-6 sm:p-8 rounded-lg shadow-md max-w-lg mx-auto"> {/* Increased width and centered */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${testimonial.name}&size=128&background=random`}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold">{testimonial.name}</h3>
                    <p className="text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-black font-bold mb-2 text-center sm:text-left">{testimonial.text}</p> {/* Centered text on small screens */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
