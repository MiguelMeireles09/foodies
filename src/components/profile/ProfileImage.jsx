import React, { useState, useRef } from 'react';
import Avatar from 'react-avatar';

const UserProfile = () => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const fileInputRef = useRef(null);

  const handleAvatarChange = (newAvatar) => {
    // Handle the avatar change here, you might want to upload it to your server or store it in your state
    setAvatarUrl(newAvatar);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Assuming you have a function to upload the image file to your server and get the URL
      // You can replace this with your actual implementation
      uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    try {
      // Simulating image upload to server, replace this with your actual upload logic
      const uploadedImageUrl = await uploadToServer(file);
      handleAvatarChange(uploadedImageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const uploadToServer = (file) => {
    // Simulating upload to server, replace this with your actual upload logic
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulating server response with the uploaded image URL
        const imageUrl = 'https://example.com/uploaded-image.jpg';
        resolve(imageUrl);
      }, 1000);
    });
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        style={{ display: 'none' }} // Hide the file input, we'll trigger it from the avatar click
        ref={fileInputRef}
      />
      <Avatar
        src={avatarUrl} // pass the avatar URL here
        name="User Name" // specify the user's name
        size="200" // specify the size of the avatar
        round // round the avatar
        onClick={() => fileInputRef.current.click()} // open file input on avatar click
      />
    </div>
  );
};

export default UserProfile;




// import React, { useState, useRef } from 'react';
// import Avatar from 'react-avatar';

// const UserProfile = () => {
//   const [avatarUrl, setAvatarUrl] = useState('');
//   const fileInputRef = useRef(null);

//   const handleAvatarChange = (newAvatar) => {
//     setAvatarUrl(newAvatar);
//   };

//   const handleFileInputChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       try {
//         const formData = new FormData();
//         formData.append('avatar', file);

//         const response = await fetch('/api/user/upload', {
//           method: 'POST',
//           body: formData
//         });

//         if (response.ok) {
//           const data = await response.json();
//           console.log(data.imageUrl)
//           handleAvatarChange(data.imageUrl);
//         } else {
//           console.error('Error uploading image:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error uploading image:', error);
//       }
//     }
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileInputChange}
//         style={{ display: 'none' }}
//         ref={fileInputRef}
//       />
//       <Avatar
//         src={avatarUrl}
//         name="User Name"
//         size="200"
//         round
//         onClick={() => fileInputRef.current.click()}
//       />
//     </div>
//   );
// };

// export default UserProfile;
