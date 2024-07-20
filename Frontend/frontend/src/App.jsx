import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ImageIntro from './intro/ImageIntro';
import LandingPage from './pages/LandingPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import SignIn from './pages/SignIn.jsx'; // Import SignIn component
import SignUp from './pages/SignUp.jsx'; // Import SignUp component
// import Footer from './components/Footer';
import Dashboard from './components/Dashboard'
import SideBar from './components/SideBar';
import About from './pages/About';
import Profile from './pages/Profile';
import SettingsPage from './pages/SettingsPage';
import Orders from './pages/Orders';
import Pricing from './pages/Pricing';
import GetStarted from './pages/GetStarted';
import PrivateRoute from './components/PrivateRoute';
import CreateListingPage from './pages/CreateListingPage';
import ItemContainer from './components/ItemContainer';
import Listing from './pages/Listing';
import Search from './pages/Search';
import Cart from './components/Cart';
import CreateServiceProvider from './components/CreateServiceProvider';
import ProductList from './components/ProductList';
import MyComponent from './components/MyComponent';
import FAQ from './components/FAQ.jsx';
import Graphs from './components/Graphs.jsx';
import Navbar from './components/Navbar.jsx';
import Testimonials from './components/Testimonials.jsx';
import BuyNow from './pages/BuyNow.jsx';
import ChatWidget from './components/ChatBot.jsx';


export default function App() {

  return (
    <BrowserRouter>
    <ChatWidget/>
      <Routes>
        <Route path='/' element={<ImageIntro />} />
        <Route path='/landingpage' element={<LandingPage />} />
        <Route path='/productpage' element={<ProductPage />} />
        <Route path='/sign-in' element={<SignIn />} /> {/* Route to SignIn component */}
        <Route path='/sign-up' element={<SignUp />} /> {/* Route to SignUp component */}
        <Route path='/sidebar' element={<SideBar/>}/>
        <Route path='/search' element={<Search />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/pricing' element={<Pricing/>}/>
        <Route path='/getstarted' element={<GetStarted/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/createlisting' element={<CreateListingPage/>  } />
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/settings' element={<SettingsPage/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/cart' element={<Cart/> } />
        </Route>
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route path='/itemcontainer' element={<ItemContainer/> } />
        <Route path='/serviceprovider' element={<CreateServiceProvider/>} />
        <Route path="/marketplace/:category" element={<ProductList/>} />
        <Route path="/mycomponent" element={<MyComponent/>} />
        {/* <Route path="/cart" element={<Cart/>} /> */}
        <Route path="/faq" element={<FAQ/>} />
        {/* <Route path="/graphs" element={<Graphs/>} />
        <Route path="/navbar" element={<Navbar/>} /> */}
        <Route path="/testimonials" element={<Testimonials/>} />
        <Route path="/buy" element={<BuyNow/>} />
        {/* <Route path="/chatbot" element={<ChatWidget/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}
