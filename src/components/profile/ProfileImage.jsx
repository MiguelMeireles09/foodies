import React, { useState, useRef } from 'react'
import Avatar from 'react-avatar'

const UserProfile = () => {
  const [avatarUrl, setAvatarUrl] = useState('')
  const fileInputRef = useRef(null)

  const handleAvatarChange = (newAvatar) => {
    setAvatarUrl(newAvatar)
  }

  const handleFileInputChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      uploadImage(file)
    }
  }

  const uploadImage = async (file) => {
    try {
      const uploadedImageUrl = await uploadToServer(file)
      handleAvatarChange(uploadedImageUrl)
    } catch (error) {
      console.error('Erro dar upload:', error)
    }
  }

  const uploadToServer = (file) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const imageUrl = 'https://example.com/uploaded-image.jpg'
        resolve(imageUrl)
      }, 1000)
    })
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <Avatar
        src={avatarUrl} 
        name="User Name" 
        size="200" 
        round 
        onClick={() => fileInputRef.current.click()}
      />
    </div>
  )
}

export default UserProfile




// import React, { useState, useRef } from 'react'
// import Avatar from 'react-avatar'

// const UserProfile = () => {
//   const [avatarUrl, setAvatarUrl] = useState('')
//   const fileInputRef = useRef(null)

//   const handleAvatarChange = (newAvatar) => {
//     setAvatarUrl(newAvatar)
//   }

//   const handleFileInputChange = async (event) => {
//     const file = event.target.files[0]
//     if (file) {
//       try {
//         const formData = new FormData()
//         formData.append('avatar', file)

//         const response = await fetch('/api/user/upload', {
//           method: 'POST',
//           body: formData
//         })

//         if (response.ok) {
//           const data = await response.json()
//           console.log(data.imageUrl)
//           handleAvatarChange(data.imageUrl)
//         } else {
//           console.error('Error uploading image:', response.statusText)
//         }
//       } catch (error) {
//         console.error('Error uploading image:', error)
//       }
//     }
//   }

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
//   )
// }

// export default UserProfile
