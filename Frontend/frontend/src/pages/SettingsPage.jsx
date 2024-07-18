import React from 'react';
import { motion } from 'framer-motion';
import SideBar from '../components/SideBar'; // Import the Sidebar component

const SettingsPage = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <motion.main
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow p-8 bg-gray-100"
      >
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-semibold text-gray-800">Settings</h2>
            </div>
            <div className="mt-4">
              <ul className="flex border-b">
                <li className="mr-1">
                  <a className="bg-white inline-block py-2 px-4 text-blue-700 font-semibold" href="#">Company</a>
                </li>
                <li className="mr-1">
                  <a className="inline-block py-2 px-4 text-gray-500 hover:text-blue-700" href="#">Personal</a>
                </li>
                <li className="mr-1">
                  <a className="inline-block py-2 px-4 text-gray-500 hover:text-blue-700" href="#">Integrations</a>
                </li>
                <li className="mr-1">
                  <a className="inline-block py-2 px-4 text-gray-500 hover:text-blue-700" href="#">Create New Account</a>
                </li>
                <li className="mr-1">
                  <a className="inline-block py-2 px-4 text-gray-500 hover:text-blue-700" href="#">Invitations</a>
                </li>
              </ul>
            </div>
            <div className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="border-b pb-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Company Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-lg">Account Type</label>
                      <input
                        className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg"
                        type="text"
                        defaultValue="Company/Group Account"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-lg">Company Name</label>
                      <input
                        className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg"
                        type="text"
                        defaultValue="Google"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-lg">Legal Business Name</label>
                      <input
                        className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg"
                        type="text"
                        defaultValue=""
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-lg">Website</label>
                      <input
                        className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg"
                        type="text"
                        defaultValue=""
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-lg">EIN Number</label>
                      <input
                        className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg"
                        type="text"
                        defaultValue=""
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-lg">Business Address</label>
                      <input
                        className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg"
                        type="text"
                        defaultValue=""
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-700 text-lg">Description</label>
                      <textarea
                        className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg"
                        rows="4"
                        defaultValue=""
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.main>
    </div>
  );
};

export default SettingsPage;
