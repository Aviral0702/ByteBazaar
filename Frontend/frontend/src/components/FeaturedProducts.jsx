import React from 'react';

const products = [
  {
    name: "Apollo.io for Startups",
    discount: "80% Discount",
    savings: "Save up to $5,000",
    description: "Apollo.io is the leading B2B sales intelligence and engagement platform, trusted by over 160,000 companies.",
    logo: "path_to_apollo_logo",
  },
  {
    name: "AWS",
    discount: "$5k credit for eligible cos.",
    savings: "Savings: $5,000",
    description: "Amazon Web Services provides information technology infrastructure services to businesses in the form of web services.",
    logo: "path_to_aws_logo",
  },
  {
    name: "Gusto",
    discount: "15% CASHBACK + 6 Months Free",
    savings: "Save up to $10,000/year",
    description: "Gusto is a modern, online people platform trusted by over 300,000 growing businesses to take care of their teams.",
    logo: "path_to_gusto_logo",
  },
  {
    name: "Notion",
    discount: "20% CASHBACK All Plans. 2 Years.",
    savings: "Estimated savings: up to $4,320/year",
    description: "Notion is an all-in-one workspace for your team, combining notes, tasks, wikis, & all your everyday work apps into one.",
    logo: "path_to_notion_logo",
  },
  {
    name: "HubSpot",
    discount: "30% DISCOUNT Pro+Enterprise Only. 1st Year; 15% Year 2",
    savings: "Save up to $18,000/year",
    description: "HubSpot develops cloud-based, inbound marketing software that allows businesses to transform the way that they market.",
    logo: "path_to_hubspot_logo",
  },
  {
    name: "Typeform",
    discount: "15% CASHBACK All Plans. Forever.",
    savings: "Save up to $898/year",
    description: "Typeform is powering the future of brand interaction with beautifully defined, professional-looking online forms.",
    logo: "path_to_typeform_logo",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Featured Products</h2>
      <p className="text-center text-gray-600 mb-12">
        The most popular SaaS products in our B2B software marketplace. Find all the tools you need and save big.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {products.map((product, index) => (
          <div key={index} className="bg-gray-100 rounded-xl p-6 max-w-sm shadow-md">
            <div className="flex items-center mb-4">
              <img src={product.logo} alt={`${product.name} logo`} className="w-12 h-12 mr-4" />
              <h3 className="text-xl font-bold">{product.name}</h3>
            </div>
            <div className="bg-yellow-300 text-black text-sm font-semibold rounded-full px-3 py-1 inline-block mb-2">
              {product.discount}
            </div>
            <div className="text-green-600 font-semibold mb-4">
              {product.savings}
            </div>
            <p className="text-gray-600">{product.description}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <a href="#" className="text-blue-500 font-semibold">See more Featured Products &rarr;</a>
      </div>
    </section>
  );
};

export default FeaturedProducts;
