// import { useState } from 'react';
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from 'firebase/storage';
// import { app } from '../firebase';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// const categories = [
//   "Accounting", "Business Intelligence (BI)", "Collaboration", "Communication", 
//   "Content Management System (CMS)", "CRM (Customer Relationship Management)", 
//   "Customer Support", "Cybersecurity", "Design", "Dev Tools (Development Tools)", 
//   "eCommerce", "Enterprise Resource Planning (ERP)", "Finance", "HR, Recruiting (Human Resources, Recruiting)", 
//   "Help Desk / Ticketing", "Inventory Management", "Legal, Compliance", "Marketing", 
//   "Admin (Administrative Tools)", "Partner Management", "Photo, Video", 
//   "Point of Sale (POS)", "Productivity", "Project Management", 
//   "Sales, Lead Generation", "SCM (Supply Chain Management)", "Social Media", 
//   "Software Testing", "Task Management", "Time Tracking / Timesheet", "Website Builders"
// ];

// export default function CreateListing() {
//   const { currentUser } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     regularPrice: '',
//     discountPrice: '',
//     savings: '',
//     cashbackOffer: '',
//     discountTitle: '',
//     discountDescription: '',
//     category: [],
//     features: [''],
//     services: [''],
//     tags: [''],
//     website: '',
//     eligibilityRequirements:[''],
//     type: '',
//     offer: false,
//     imageUrls: [],
//     version: '',
//     platforms: [],
//     integrations: [],
//     legal: {
//       termsOfService: '',
//       privacyPolicy: ''
//     },
//     availability: {
//       status: '',
//       releaseDate: ''
//     },
//     serviceProviders: [
//       {
//         name: '',
//         services: [],
//         description: '',
//         link: '',
//         imageUrls: []
//       },
//       {
//         name: '',
//         services: [],
//         description: '',
//         link: '',
//         imageUrls: []
//       }
//     ],
//   });

//   const [imageUploadError, setImageUploadError] = useState(false);
//   const [files, setFiles] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);

//   console.log(formData);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const newValue = type === 'checkbox' ? checked : value;
//     console.log(`Updating ${name} with value:`, newValue);
//     setFormData({ ...formData, [name]: newValue });
//   };

//   const handleImageSubmit = (e) => {
//     if (files.length <= 6) {
//       setUploading(true); 
//       setImageUploadError(false);
//       const promises = [];

//       for (let i = 0; i < files.length; i++) {
//         promises.push(storeImage(files[i]));
//       }
//       Promise.all(promises)
//         .then((urls) => {
//           setFormData({
//             ...formData,
//             imageUrls: formData.imageUrls.concat(urls),
//           });
//           setImageUploadError(false);
//           setUploading(false);
//         })
//         .catch((err) => {
//           setImageUploadError('Image upload failed (2 mb max per image)');
//           setUploading(false);
//         });
//     } else {
//       setImageUploadError('You can only upload 6 images per listing');
//       setUploading(false);
//     }
//   };

//   const storeImage = async (file) => {
//     return new Promise((resolve, reject) => {
//       const storage = getStorage(app);
//       const fileName = new Date().getTime() + file.name;
//       const storageRef = ref(storage, fileName);
//       const uploadTask = uploadBytesResumable(storageRef, file);
//       uploadTask.on(
//         'state_changed',
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log(`Upload is ${progress}% done`);
//         },
//         (error) => {
//           reject(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             resolve(downloadURL);
//           });
//         }
//       );
//     });
//   };

//   const handleRemoveImage = (index) => {
//     setFormData({
//       ...formData,
//       imageUrls: formData.imageUrls.filter((_, i) => i !== index),
//     });
//   };

//   const handleArrayChange = (e, index, field) => {
//     const updatedArray = [...formData[field]];
//     updatedArray[index] = e.target.value;
//     setFormData({ ...formData, [field]: updatedArray });
//   };
  
//   const addArrayItem = (field) => {
//     setFormData({ ...formData, [field]: [...formData[field], ''] });
//   };

//   const removeArrayItem = (index, field) => {
//     const updatedArray = formData[field].filter((_, i) => i !== index);
//     setFormData({ ...formData, [field]: updatedArray });
//   };

//   const handleCategoryChange = (e) => {
//     const { value, checked } = e.target;
//     setFormData((prevState) => {
//       const newCategory = checked
//         ? [...prevState.category, value]
//         : prevState.category.filter((cat) => cat !== value);
//       console.log('Updating category:', newCategory);
//       return { ...prevState, category: newCategory };
//     });
//   };

//   const handleServiceProviderChange = (e, spIndex) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => {
//       const newServiceProviders = [...prevData.serviceProviders];
//       newServiceProviders[spIndex] = {
//         ...newServiceProviders[spIndex],
//         [name]: value,
//       };
//       return { ...prevData, serviceProviders: newServiceProviders };
//     });
//   };

//   const handleServiceChange = (e, spIndex, sIndex) => {
//     const { value } = e.target;
//     setFormData((prevData) => {
//       const newServiceProviders = [...prevData.serviceProviders];
//       newServiceProviders[spIndex].services[sIndex] = value;
//       return { ...prevData, serviceProviders: newServiceProviders };
//     });
//   };

//   const addService = (spIndex) => {
//     setFormData((prevData) => {
//       const newServiceProviders = [...prevData.serviceProviders];
//       newServiceProviders[spIndex].services.push('');
//       return { ...prevData, serviceProviders: newServiceProviders };
//     });
//   };

//   const removeService = (spIndex, sIndex) => {
//     setFormData((prevData) => {
//       const newServiceProviders = [...prevData.serviceProviders];
//       newServiceProviders[spIndex].services.splice(sIndex, 1);
//       return { ...prevData, serviceProviders: newServiceProviders };
//     });
//   };

//   const serviceProviderImage = (spIndex) => {
//     if (files.length <= 6) {
//       setUploading(true);
//       setImageUploadError('');
//       const promises = [];

//       for (let i = 0; i < files.length; i++) {
//         promises.push(serviceProviderImageSave(files[i]));
//       }
//       Promise.all(promises)
//         .then((urls) => {
//           setFormData((prevData) => {
//             const newServiceProviders = [...prevData.serviceProviders];
//             newServiceProviders[spIndex].imageUrls = newServiceProviders[spIndex].imageUrls.concat(urls);
//             return { ...prevData, serviceProviders: newServiceProviders };
//           });
//           setImageUploadError('');
//           setUploading(false);
//         })
//         .catch((err) => {
//           setImageUploadError('Image upload failed (2 mb max per image)');
//           setUploading(false);
//         });
//     } else {
//       setImageUploadError('You can only upload 6 images per listing');
//       setUploading(false);
//     }
//   };

//   const serviceProviderImageSave = async (file) => {
//     return new Promise((resolve, reject) => {
//       const storage = getStorage();
//       const fileName = new Date().getTime() + file.name;
//       const storageRef = ref(storage, fileName);
//       const uploadTask = uploadBytesResumable(storageRef, file);
//       uploadTask.on(
//         'state_changed',
//         (snapshot) => {
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log(`Upload is ${progress}% done`);
//         },
//         (error) => {
//           reject(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             resolve(downloadURL);
//           });
//         }
//       );
//     });
//   };

//   const serviceProviderRemoveImg = (spIndex, imgIndex) => {
//     setFormData((prevData) => {
//       const newServiceProviders = [...prevData.serviceProviders];
//       newServiceProviders[spIndex].imageUrls.splice(imgIndex, 1);
//       return { ...prevData, serviceProviders: newServiceProviders };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (formData.imageUrls.length < 1)
//         return setError('You must upload at least one image');
//       if (+formData.regularPrice < +formData.discountPrice)
//         return setError('Discount price must be lower than regular price');
//       setLoading(true);
//       setError(false);
//       const res = await fetch('/api/listing/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           userRef: currentUser._id,
//         }),
//       });
//       const data = await res.json();
//       console.log(data);
//       setLoading(false);
//       if (data.success === false) {
//         setError(data.message);
//       }
//       navigate(`/listing/${data._id}`);
//     } catch (error) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-800 flex items-center justify-center p-6">
//       <form onSubmit={handleSubmit} className="bg-gray-900 text-white rounded-lg shadow-lg p-8 w-full max-w-6xl">
//         <h2 className="text-2xl font-bold mb-6">Create Listing</h2>
        
//         <div className="mb-4">
//           <label className="block mb-2">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-700 rounded"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-700 rounded"
//             required
//           ></textarea>
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Regular Price</label>
//           <input
//             type="number"
//             name="regularPrice"
//             value={formData.regularPrice}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-700 rounded"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Discount Price</label>
//           <input
//             type="number"
//             name="discountPrice"
//             value={formData.discountPrice}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-700 rounded"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Savings</label>
//           <input
//             type="text"
//             name="savings"
//             value={formData.savings}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-700 rounded"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Cashback Offer</label>
//           <input
//             type="text"
//             name="cashbackOffer"
//             value={formData.cashbackOffer}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-700 rounded"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Discount Title</label>
//           <input
//             type="text"
//             name="discountTitle"
//             value={formData.discountTitle}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-700 rounded"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Discount Description</label>
//           <textarea
//             name="discountDescription"
//             value={formData.discountDescription}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-700 rounded"
//             required
//           ></textarea>
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Categories</label>
//           <div className="grid grid-cols-2 gap-2">
//             {categories.map((category) => (
//               <div key={category} className="flex items-center">
//                 <input
//                   type="checkbox"
//                   value={category}
//                   checked={formData.category.includes(category)}
//                   onChange={handleCategoryChange}
//                   className="mr-2"
//                 />
//                 <label>{category}</label>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Features</label>
//           {formData.features.map((feature, index) => (
//             <div key={index} className="flex mb-2">
//               <input
//                 type="text"
//                 value={feature}
//                 onChange={(e) => handleArrayChange(e, index, 'features')}
//                 className="w-full p-2 bg-gray-700 rounded mr-2"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeArrayItem(index, 'features')}
//                 className="p-2 bg-red-500 text-white rounded"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={() => addArrayItem('features')}
//             className="w-full p-2 bg-blue-500 text-white rounded"
//           >
//             Add Feature
//           </button>
//         </div>
        
//         <div className="mb-4">
//           <label className="block mb-2">Eligibility Requirements</label>
//           {formData.eligibilityRequirements.map((eligibilityRequirement, index) => (
//             <div key={index} className="flex mb-2">
//               <input
//                 type="text"
//                 value={eligibilityRequirement}
//                 onChange={(e) => handleArrayChange(e, index, 'eligibilityRequirements')}
//                 className="w-full p-2 bg-gray-700 rounded mr-2"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeArrayItem(index, 'eligibilityRequirements')}
//                 className="p-2 bg-red-500 text-white rounded"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={() => addArrayItem('eligibilityRequirements')}
//             className="w-full p-2 bg-blue-500 text-white rounded"
//           >
//             Add Requirements
//           </button>
//         </div>
        

//         <div className="mb-4">
//           <label className="block mb-2">Services</label>
//           {formData.services.map((benefit, index) => (
//             <div key={index} className="flex mb-2">
//               <input
//                 type="text"
//                 value={benefit}
//                 onChange={(e) => handleArrayChange(e, index, 'services')}
//                 className="w-full p-2 bg-gray-700 rounded mr-2"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeArrayItem(index, 'services')}
//                 className="p-2 bg-red-500 text-white rounded"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={() => addArrayItem('services')}
//             className="w-full p-2 bg-blue-500 text-white rounded"
//           >
//             Add Benefit
//           </button>
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Tags</label>
//           {formData.tags.map((tag, index) => (
//             <div key={index} className="flex mb-2">
//               <input
//                 type="text"
//                 value={tag}
//                 onChange={(e) => handleArrayChange(e, index, 'tags')}
//                 className="w-full p-2 bg-gray-700 rounded mr-2"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeArrayItem(index, 'tags')}
//                 className="p-2 bg-red-500 text-white rounded"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={() => addArrayItem('tags')}
//             className="w-full p-2 bg-blue-500 text-white rounded"
//           >
//             Add Tag
//           </button>
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Website</label>
//           <input
//             type="url"
//             name="website"
//             value={formData.website}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-700 rounded"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Type</label>
//           <input
//             type="text"
//             name="type"
//             value={formData.type}
//             onChange={handleChange}
//             className="w-full p-2 bg-gray-700 rounded"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Offer</label>
//           <input
//             type="checkbox"
//             name="offer"
//             checked={formData.offer}
//             onChange={handleChange}
//             className="p-2 bg-gray-700 rounded"
//           />
//         </div>
//         <div className='flex flex-col flex-1 gap-4'>
//   <p className='font-semibold'>
//     Images:
//   </p>
//   <div className='flex gap-4'>
//     <input
//       onChange={(e) => setFiles(e.target.files)}
//       className='p-3 border border-gray-300 rounded w-full'
//       type='file'
//       id='images'
//       accept='image/*'
//       multiple
//     />
//     <button
//       type='button'
//       disabled={uploading}
//       onClick={handleImageSubmit}
//       className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
//     >
//       {uploading ? 'Uploading...' : 'Upload'}
//     </button>
//   </div>
//   <p className='text-red-700 text-sm'>
//     {imageUploadError && imageUploadError}
//   </p>
//   {formData.imageUrls.length > 0 &&
//     formData.imageUrls.map((url, index) => (
//       <div
//         key={url}
//         className='flex justify-between p-3 border items-center'
//       >
//         <img
//           src={url}
//           alt='listing image'
//           className='w-20 h-20 object-contain rounded-lg'
//         />
//         <button
//           type='button'
//           onClick={() => handleRemoveImage(index)}
//           className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
//         >
//           Delete
//         </button>
//       </div>
//     ))}
// </div>

// <div className="mb-4">
//       <h3 className="text-xl font-bold mb-2">Service Providers</h3>
//       {formData.serviceProviders.map((provider, spIndex) => (
//         <div key={spIndex} className="mb-4 border border-gray-700 rounded p-4">
//           <div className="mb-2">
//             <label className="block mb-1">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={provider.name}
//               onChange={(e) => handleServiceProviderChange(e, spIndex)}
//               className="w-full p-2 rounded border border-gray-700 focus:outline-none focus:border-blue-500"
//             />
//           </div>

//           <div className="mb-2">
//             <label className="block mb-1">Services</label>
//             {provider.services.map((service, sIndex) => (
//               <div key={sIndex} className="flex items-center mb-1">
//                 <input
//                   type="text"
//                   value={service}
//                   onChange={(e) => handleServiceChange(e, spIndex, sIndex)}
//                   className="w-full p-2 rounded border border-gray-700 focus:outline-none focus:border-blue-500"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeService(spIndex, sIndex)}
//                   className="ml-2 bg-red-500 text-white rounded p-1"
//                 >
//                   &times;
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => addService(spIndex)}
//               className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Add Service
//             </button>
//           </div>

//           <div className="mb-2">
//             <label className="block mb-1">Description</label>
//             <input
//               type="text"
//               name="description"
//               value={provider.description}
//               onChange={(e) => handleServiceProviderChange(e, spIndex)}
//               className="w-full p-2 rounded border border-gray-700 focus:outline-none focus:border-blue-500"
//             />
//           </div>

//           <div className="mb-2">
//             <label className="block mb-1">Link</label>
//             <input
//               type="text"
//               name="link"
//               value={provider.link}
//               onChange={(e) => handleServiceProviderChange(e, spIndex)}
//               className="w-full p-2 rounded border border-gray-700 focus:outline-none focus:border-blue-500"
//             />
//           </div>

//           <div className="mb-2">
//             <p className='font-semibold'>Images:</p>
//             <div className='flex gap-4'>
//               <input
//                 onChange={(e) => setFiles(e.target.files)}
//                 className='p-3 border border-gray-300 rounded w-full'
//                 type='file'
//                 id='images'
//                 accept='image/*'
//                 multiple
//               />
//               <button
//                 type='button'
//                 disabled={uploading}
//                 onClick={() => serviceProviderImage(spIndex)}
//                 className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
//               >
//                 {uploading ? 'Uploading...' : 'Upload'}
//               </button>
//             </div>
//             <p className='text-red-700 text-sm'>
//               {imageUploadError && imageUploadError}
//             </p>
//             {provider.imageUrls.length > 0 &&
//               provider.imageUrls.map((url, index) => (
//                 <div
//                   key={url}
//                   className='flex justify-between p-3 border items-center'
//                 >
//                   <img
//                     src={url}
//                     alt='listing image'
//                     className='w-20 h-20 object-contain rounded-lg'
//                   />
//                   <button
//                     type='button'
//                     onClick={() => serviceProviderRemoveImg(spIndex, index)}
//                     className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
//                   >
//                     Delete
//                   </button>
//                 </div>
//               ))}
//           </div>
          
//           {/* <button
//             type="button"
//             onClick={() => handleSubmit(spIndex)}
//             className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-600"
//           >
//             Submit Service Provider
//           </button> */}
//         </div>
//       ))}
//     </div>

//         <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };











import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const categories = [
  "Accounting", "Business Intelligence (BI)", "Collaboration", "Communication", 
  "Content Management System (CMS)", "CRM (Customer Relationship Management)", 
  "Customer Support", "Cybersecurity", "Design", "Dev Tools (Development Tools)", 
  "eCommerce", "Enterprise Resource Planning (ERP)", "Finance", "HR, Recruiting (Human Resources, Recruiting)", 
  "Help Desk / Ticketing", "Inventory Management", "Legal, Compliance", "Marketing", 
  "Admin (Administrative Tools)", "Partner Management", "Photo, Video", 
  "Point of Sale (POS)", "Productivity", "Project Management", 
  "Sales, Lead Generation", "SCM (Supply Chain Management)", "Social Media", 
  "Software Testing", "Task Management", "Time Tracking / Timesheet", "Website Builders"
];

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    regularPrice: '',
    discountPrice: '',
    savings: '',
    cashbackOffer: '',
    discountTitle: '',
    discountDescription: '',
    category: [],
    features: [''],
    services: [''],
    tags: [''],
    website: '',
    eligibilityRequirements:[''],
    type: '',
    offer: false,
    imageUrls: [],
    version: '',
    platforms: [],
    integrations: [],
    termsOfService:'', 
    privacyPolicy: '' ,
    status: '', 
    releaseDate: '' ,
    serviceProviders: [
      {
        name: '',
        services: [],
        description: '',
        link: '',
        imageUrls: []
      },
      {
        name: '',
        services: [],
        description: '',
        link: '',
        imageUrls: []
      }
    ],
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(formData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    console.log(`Updating ${name} with value:`, newValue);
    // console.log(legal.termsOfService)
    console.log(value)
    setFormData({ ...formData, [name]: newValue });
  };

  const handleImageSubmit = (e) => {
    if (files.length <= 6) {
      setUploading(true); 
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleArrayChange = (e, index, field) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = e.target.value;
    setFormData({ ...formData, [field]: updatedArray });
  };
  
  const addArrayItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (index, field) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const newCategory = checked
        ? [...prevState.category, value]
        : prevState.category.filter((cat) => cat !== value);
      console.log('Updating category:', newCategory);
      return { ...prevState, category: newCategory };
    });
  };

  const handleServiceProviderChange = (e, spIndex) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newServiceProviders = [...prevData.serviceProviders];
      newServiceProviders[spIndex] = {
        ...newServiceProviders[spIndex],
        [name]: value,
      };
      return { ...prevData, serviceProviders: newServiceProviders };
    });
  };

  const handleServiceChange = (e, spIndex, sIndex) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const newServiceProviders = [...prevData.serviceProviders];
      newServiceProviders[spIndex].services[sIndex] = value;
      return { ...prevData, serviceProviders: newServiceProviders };
    });
  };

  const addService = (spIndex) => {
    setFormData((prevData) => {
      const newServiceProviders = [...prevData.serviceProviders];
      newServiceProviders[spIndex].services.push('');
      return { ...prevData, serviceProviders: newServiceProviders };
    });
  };

  const removeService = (spIndex, sIndex) => {
    setFormData((prevData) => {
      const newServiceProviders = [...prevData.serviceProviders];
      newServiceProviders[spIndex].services.splice(sIndex, 1);
      return { ...prevData, serviceProviders: newServiceProviders };
    });
  };

  const serviceProviderImage = (spIndex) => {
    if (files.length <= 6) {
      setUploading(true);
      setImageUploadError('');
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(serviceProviderImageSave(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData((prevData) => {
            const newServiceProviders = [...prevData.serviceProviders];
            newServiceProviders[spIndex].imageUrls = newServiceProviders[spIndex].imageUrls.concat(urls);
            return { ...prevData, serviceProviders: newServiceProviders };
          });
          setImageUploadError('');
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const serviceProviderImageSave = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const serviceProviderRemoveImg = (spIndex, imgIndex) => {
    setFormData((prevData) => {
      const newServiceProviders = [...prevData.serviceProviders];
      newServiceProviders[spIndex].imageUrls.splice(imgIndex, 1);
      return { ...prevData, serviceProviders: newServiceProviders };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-gray-900 text-white rounded-lg shadow-lg p-8 w-full max-w-6xl">
        <h2 className="text-2xl font-bold mb-6">Create Listing</h2>
        
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Regular Price</label>
          <input
            type="number"
            name="regularPrice"
            value={formData.regularPrice}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Discount Price</label>
          <input
            type="number"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Savings</label>
          <input
            type="text"
            name="savings"
            value={formData.savings}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Cashback Offer</label>
          <input
            type="text"
            name="cashbackOffer"
            value={formData.cashbackOffer}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Discount Title</label>
          <input
            type="text"
            name="discountTitle"
            value={formData.discountTitle}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Discount Description</label>
          <textarea
            name="discountDescription"
            value={formData.discountDescription}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Categories</label>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  value={category}
                  checked={formData.category.includes(category)}
                  onChange={handleCategoryChange}
                  className="mr-2"
                />
                <label>{category}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
                <label className="block mb-2">Version</label>
                <input
                    type="text"
                    name="version"
                    value={formData.version}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Terms of Service</label>
                {/* console.log(formData.legal.termsOfService) */}
                <input
                    type="text"
                    name="termsOfService"
                    value={formData.termsOfService}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 rounded"
                    required
                />  
            </div>

            <div className="mb-4">
                <label className="block mb-2">Privacy Policy</label>
                <input
                    type="text"
                    name="privacyPolicy"
                    value={formData.privacyPolicy}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Availability Status</label>
                <input
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Release Date</label>
                <input
                    type="date"
                    name="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Integrations</label>
                <input
                    type="text"
                    name="integrations"
                    value={formData.integrations}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 rounded"
                    required
                />
            </div>
        <div className="mb-4">
          <label className="block mb-2">Features</label>
          {formData.features.map((feature, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleArrayChange(e, index, 'features')}
                className="w-full p-2 bg-gray-700 rounded mr-2"
              />
              <button
                type="button"
                onClick={() => removeArrayItem(index, 'features')}
                className="p-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('features')}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Add Feature
          </button>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">Eligibility Requirements</label>
          {formData.eligibilityRequirements.map((eligibilityRequirement, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={eligibilityRequirement}
                onChange={(e) => handleArrayChange(e, index, 'eligibilityRequirements')}
                className="w-full p-2 bg-gray-700 rounded mr-2"
              />
              <button
                type="button"
                onClick={() => removeArrayItem(index, 'eligibilityRequirements')}
                className="p-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('eligibilityRequirements')}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Add Requirements
          </button>
        </div>
        

        <div className="mb-4">
          <label className="block mb-2">Services</label>
          {formData.services.map((benefit, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={benefit}
                onChange={(e) => handleArrayChange(e, index, 'services')}
                className="w-full p-2 bg-gray-700 rounded mr-2"
              />
              <button
                type="button"
                onClick={() => removeArrayItem(index, 'services')}
                className="p-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('services')}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Add Benefit
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Tags</label>
          {formData.tags.map((tag, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={tag}
                onChange={(e) => handleArrayChange(e, index, 'tags')}
                className="w-full p-2 bg-gray-700 rounded mr-2"
              />
              <button
                type="button"
                onClick={() => removeArrayItem(index, 'tags')}
                className="p-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('tags')}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Add Tag
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Website</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Offer</label>
          <input
            type="checkbox"
            name="offer"
            checked={formData.offer}
            onChange={handleChange}
            className="p-2 bg-gray-700 rounded"
          />
        </div>
        <div className='flex flex-col flex-1 gap-4'>
  <p className='font-semibold'>
    Images:
  </p>
  <div className='flex gap-4'>
    <input
      onChange={(e) => setFiles(e.target.files)}
      className='p-3 border border-gray-300 rounded w-full'
      type='file'
      id='images'
      accept='image/*'
      multiple
    />
    <button
      type='button'
      disabled={uploading}
      onClick={handleImageSubmit}
      className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
    >
      {uploading ? 'Uploading...' : 'Upload'}
    </button>
  </div>
  <p className='text-red-700 text-sm'>
    {imageUploadError && imageUploadError}
  </p>
  {formData.imageUrls.length > 0 &&
    formData.imageUrls.map((url, index) => (
      <div
        key={url}
        className='flex justify-between p-3 border items-center'
      >
        <img
          src={url}
          alt='listing image'
          className='w-20 h-20 object-contain rounded-lg'
        />
        <button
          type='button'
          onClick={() => handleRemoveImage(index)}
          className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
        >
          Delete
        </button>
      </div>
    ))}
</div>

<div className="mb-4">
      <h3 className="text-xl font-bold mb-2">Service Providers</h3>
      {formData.serviceProviders.map((provider, spIndex) => (
        <div key={spIndex} className="mb-4 border border-gray-700 rounded p-4">
          <div className="mb-2">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={provider.name}
              onChange={(e) => handleServiceProviderChange(e, spIndex)}
              className="w-full p-2 rounded border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-2">
            <label className="block mb-1">Services</label>
            {provider.services.map((service, sIndex) => (
              <div key={sIndex} className="flex items-center mb-1">
                <input
                  type="text"
                  value={service}
                  onChange={(e) => handleServiceChange(e, spIndex, sIndex)}
                  className="w-full p-2 rounded border border-gray-700 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeService(spIndex, sIndex)}
                  className="ml-2 bg-red-500 text-white rounded p-1"
                >
                  &times;
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addService(spIndex)}
              className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Service
            </button>
          </div>

          <div className="mb-2">
            <label className="block mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={provider.description}
              onChange={(e) => handleServiceProviderChange(e, spIndex)}
              className="w-full p-2 rounded border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-2">
            <label className="block mb-1">Link</label>
            <input
              type="text"
              name="link"
              value={provider.link}
              onChange={(e) => handleServiceProviderChange(e, spIndex)}
              className="w-full p-2 rounded border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-2">
            <p className='font-semibold'>Images:</p>
            <div className='flex gap-4'>
              <input
                onChange={(e) => setFiles(e.target.files)}
                className='p-3 border border-gray-300 rounded w-full'
                type='file'
                id='images'
                accept='image/*'
                multiple
              />
              <button
                type='button'
                disabled={uploading}
                onClick={() => serviceProviderImage(spIndex)}
                className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
            <p className='text-red-700 text-sm'>
              {imageUploadError && imageUploadError}
            </p>
            {provider.imageUrls.length > 0 &&
              provider.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className='flex justify-between p-3 border items-center'
                >
                  <img
                    src={url}
                    alt='listing image'
                    className='w-20 h-20 object-contain rounded-lg'
                  />
                  <button
                    type='button'
                    onClick={() => serviceProviderRemoveImg(spIndex, index)}
                    className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
          
          
        </div>
      ))}
    </div>

        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">
          Submit
        </button>
      </form>
    </div>
  );
};



