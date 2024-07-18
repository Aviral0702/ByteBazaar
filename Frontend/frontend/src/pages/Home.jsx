import { Link } from 'react-router-dom';
import React from 'react';
import { IoMdSearch, IoMdChatbubbles } from "react-icons/io";

export default function Home() {
  return (
    <>
        <div className="h-screen flex flex-col justify-center items-center">
      <div className="navbar bg-base-100 fixed top-0 left-0 w-full shadow-md">
        <div className="flex-1 flex items-center justify-between">
          <a className="btn btn-ghost text-2xl text-bold">ByteBazaar</a>
          <div className="flex space-x-4">
            <Link to="/about">
              <button className="btn btn-outline btn-primary">About Us</button>
            </Link>
            <Link to="/login">
              <button className="btn btn-outline btn-secondary">Login</button>
            </Link>
            <Link to="/join">
              <button className="btn btn-outline btn-secondary">Join</button>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="badge badge-sm indicator-item">2</span>
              </div>
            </div>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
              <div className="card-body">
                <span className="font-bold text-lg">2 Item</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">View cart</button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="User avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-20 flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="text-7xl font-serif font-thin text-blue-400">Har Business Ko</h1><br />
          <h1 className="text-7xl font-thin font-serif text-blue-400">Bnaye Aasaan</h1>
          <p className="text-2xl font-bold text-black mt-5">Discover, Compare, and Deploy Leading SaaS Solutions With Ease and Precision</p>
        </div>
        <div className="relative w-full px-4">
          <IoMdSearch className="absolute left-4 top-2 text-black size-10" />
          <input 
            type="text" 
            value="Looking for Software Solutions? Glad you came to the correct place...." 
            className="input input-bordered w-full h-12 pl-12 text-left text-xl"  
            readOnly 
          />
        </div>
        <button className="btn btn-primary mt-6">Explore</button>
      </div>
      <div className="bg-gray-100 absolute bottom-24 right-8 py-8  rounded-full shadow-lg text-center flex items-center ">
        <IoMdChatbubbles className="text-3xl text-blue-500 mr-2" />
        <span className="text-lg">Hello ByteBot, this side. How can I help you?</span>
      </div>


      <div className="fixed bottom-0 left-0 w-full bg-black text-white py-6 text-center">
        <span className="text-xl">🚀 Ready to elevate your business? Discover our game-changing new feature - Predictive Analysis</span>
      </div>
    </div>
    </>
    
  );
}
