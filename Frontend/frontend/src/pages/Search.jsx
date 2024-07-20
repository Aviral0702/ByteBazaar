
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import Navbar from '../components/Navbar';

export default function Search() {
  const navigate = useNavigate();
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    type: 'all',
    offer: false,
    sort: 'createdAt',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        offer: offerFromUrl === 'true',
        sort: sortFromUrl || 'createdAt',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length >= 12) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [window.location.search]);

  const handleChange = (e) => {
    const { id, value, checked } = e.target;
    if (id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: value });
    }
    if (id === 'type') {
      setSidebarData({ ...sidebarData, type: value });
    }
    if (id === 'offer') {
      setSidebarData({ ...sidebarData, offer: checked });
    }
    if (id === 'sort_order') {
      const [sort, order] = value.split('_');
      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('type', sidebarData.type);
    urlParams.set('offer', sidebarData.offer);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('order', sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 12) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <>
      <div className='py-7'>
        <Navbar />
      </div>
      <div className='flex flex-col md:flex-row py-10'>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
            <div className='flex items-center gap-2'>
              <label className='whitespace-nowrap font-semibold'>
                Search Term:
              </label>
              <input
                type='text'
                id='searchTerm'
                placeholder='Search...'
                className='border rounded-lg p-3 w-full'
                value={sidebarData.searchTerm}
                onChange={handleChange}
              />
            </div>
            <div className='flex gap-2 flex-wrap items-center'>
              <label className='font-semibold'>Type:</label>
              <select
                id='type'
                className='border rounded-lg p-3'
                value={sidebarData.type}
                onChange={handleChange}
              >
                <option value='all'>All</option>
                <option value='Accounting'>Accounting</option>
                <option value='Business Intelligence (BI)'>Business Intelligence (BI)</option>
                <option value='Collaboration'>Collaboration</option>
                <option value='Communication'>Communication</option>
                <option value='Content Management System (CMS)'>Content Management System (CMS)</option>
                <option value='CRM (Customer Relationship Management)'>CRM (Customer Relationship Management)</option>
                <option value='Customer Support'>Customer Support</option>
                <option value='Cybersecurity'>Cybersecurity</option>
                <option value='Design'>Design</option>
                <option value='Dev Tools (Development Tools)'>Dev Tools (Development Tools)</option>
                <option value='eCommerce'>eCommerce</option>
                <option value='Enterprise Resource Planning (ERP)'>Enterprise Resource Planning (ERP)</option>
                <option value='Finance'>Finance</option>
                <option value='HR, Recruiting (Human Resources, Recruiting)'>HR, Recruiting (Human Resources, Recruiting)</option>
                <option value='Help Desk / Ticketing'>Help Desk / Ticketing</option>
                <option value='Inventory Management'>Inventory Management</option>
                <option value='Legal, Compliance'>Legal, Compliance</option>
                <option value='Marketing'>Marketing</option>
                <option value='Admin (Administrative Tools)'>Admin (Administrative Tools)</option>
                <option value='Partner Management'>Partner Management</option>
                <option value='Photo, Video'>Photo, Video</option>
                <option value='Point of Sale (POS)'>Point of Sale (POS)</option>
                <option value='Productivity'>Productivity</option>
                <option value='Project Management'>Project Management</option>
                <option value='Sales, Lead Generation'>Sales, Lead Generation</option>
                <option value='SCM (Supply Chain Management)'>SCM (Supply Chain Management)</option>
                <option value='Social Media'>Social Media</option>
                <option value='Software Testing'>Software Testing</option>
                <option value='Task Management'>Task Management</option>
                <option value='Time Tracking / Timesheet'>Time Tracking / Timesheet</option>
                <option value='Website Builders'>Website Builders</option>
              </select>
            </div>
            <div className='flex gap-2 flex-wrap items-center'>
              <label className='font-semibold'>Offer:</label>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='offer'
                  className='w-5'
                  onChange={handleChange}
                  checked={sidebarData.offer}
                />
                <span>Offer</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <label className='font-semibold'>Sort:</label>
              <select
                onChange={handleChange}
                defaultValue={'createdAt_desc'}
                id='sort_order'
                className='border rounded-lg p-3'
              >
                <option value='regularPrice_desc'>Price high to low</option>
                <option value='regularPrice_asc'>Price low to high</option>
                <option value='createdAt_desc'>Latest</option>
                <option value='createdAt_asc'>Oldest</option>
              </select>
            </div>
            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
              Search
            </button>
          </form>
        </div>
        <div className='flex-1'>
          <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
            Listing results:
          </h1>
          <div className='p-7 flex flex-wrap gap-4'>
            {!loading && listings.length === 0 && (
              <p className='text-xl text-slate-700'>No listings found!</p>
            )}
            {loading && (
              <p className='text-xl text-slate-700 text-center w-full'>
                Loading...
              </p>
            )}
            {!loading &&
              listings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            {showMore && (
              <button
                onClick={onShowMoreClick}
                className='text-green-700 hover:underline p-7 text-center w-full'
              >
                Show more
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
