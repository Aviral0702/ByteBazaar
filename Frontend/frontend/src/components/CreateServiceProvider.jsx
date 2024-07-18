import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/SideBar';

export default function CreateServiceProvider() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    services: [],
    description: "",
    link: "",
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProductThroughWS = async () => {
    try {
      const response = await fetch('http://localhost:/5000/scrape')
      if(!response.ok){
        throw new Error('Failed to fetch product')
      }
      const data = response.json();
      setFormData(prevState => ({
        ...prevState,
        name: data.name || '',
        description : data.description || '',
        imageUrl: data.image || '',
        services: [],
        link: data.url || ''
      }))
    }
    catch(err){
      setError('Error occurred while fetching products')
      console.log(err)
    }
  }

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length <= 1) {
      setUploading(true);
      setImageUploadError(false);
      storeImage(files[0])
        .then((url) => {
          setFormData((prevState) => ({
            ...prevState,
            imageUrl: url,
          }));
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload one image per service provider');
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
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => reject(error),
        () => getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject)
      );
    });
  };

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleServiceChange = (index, value) => {
    setFormData((prevState) => {
      const newServices = [...prevState.services];
      newServices[index] = value;
      return { ...prevState, services: newServices };
    });
  };

  const handleAddService = () => {
    setFormData((prevState) => ({
      ...prevState,
      services: [...prevState.services, ""],
    }));
  };

  const handleRemoveService = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      services: prevState.services.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.imageUrl) return setError('You must upload an image');
      setLoading(true);
      setError(false);
a
      const response = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
      setLoading(false);

      if (!data.success) {
        setError(data.message);
      } else {
        navigate('/listing/create'); // Redirect to the listing creation page
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className='flex-1 p-6'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Service Provider</h1>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
          <div className='flex flex-col gap-4 flex-1'>
            <button
              type='button'
              onClick={fetchProduct}
              className='p-3 bg-blue-500 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            >
              Fetch and Fill Form
            </button>
            <input
              type='text'
              placeholder='Name'
              className='border p-3 rounded-lg'
              id='name'
              maxLength='62'
              minLength='10'
              required
              onChange={handleChange}
              value={formData.name}
            />
            <textarea
              placeholder='Description'
              className='border p-3 rounded-lg'
              id='description'
              required
              onChange={handleChange}
              value={formData.description}
            />
            <input
              type='text'
              placeholder='Link'
              className='border p-3 rounded-lg'
              id='link'
              required
              onChange={handleChange}
              value={formData.link}
            />
            <div className='flex flex-wrap gap-4'>
              {formData.services.map((service, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <input
                    type='text'
                    placeholder='Service'
                    className='border p-3 rounded-lg'
                    value={service}
                    onChange={(e) => handleServiceChange(index, e.target.value)}
                  />
                  <button
                    type='button'
                    onClick={() => handleRemoveService(index)}
                    className='p-2 bg-red-500 text-white rounded-full'
                  >
                    &#10005;
                  </button>
                </div>
              ))}
              <button
                type='button'
                onClick={handleAddService}
                className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
              >
                Add Service
              </button>
            </div>
            {formData.imageUrl && (
              <div className='relative'>
                <img src={formData.imageUrl} alt='Uploaded' className='w-full h-auto rounded-lg' />
                <button
                  type='button'
                  onClick={() => setFormData((prevState) => ({ ...prevState, imageUrl: '' }))}
                  className='absolute top-0 right-0 p-1 text-red-500 bg-white rounded-full shadow'
                >
                  &#10005;
                </button>
              </div>
            )}
            {imageUploadError && <div className='text-red-500'>{imageUploadError}</div>}
            <input
              type='file'
              accept='.jpg,.png,.jpeg'
              onChange={(e) => setFiles([...Array.from(e.target.files)])}
              className='border p-3 rounded-lg'
            />
            <button
              type='button'
              onClick={handleImageSubmit}
              className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            >
              Upload Image
            </button>
            {uploading && <p>Uploading image...</p>}
            {error && <div className='text-red-500'>{error}</div>}
            <button
              type='submit'
              disabled={loading || uploading}
              className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            >
              {loading ? 'Creating...' : 'Create Service Provider'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
