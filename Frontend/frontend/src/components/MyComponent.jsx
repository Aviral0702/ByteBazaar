import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";

const MyComponent = () => {
  const [formData, setFormData] = useState({
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
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState('');
  const [files, setFiles] = useState([]);

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

  const handleSubmit = (spIndex) => {
    const serviceProvider = formData.serviceProviders[spIndex];
    // Perform the submission logic for the service provider
    console.log('Submitting service provider:', serviceProvider);
  };

  return (
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
          
          <button
            type="button"
            onClick={() => handleSubmit(spIndex)}
            className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Submit Service Provider
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
