// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadDir = './public/uploads'; // Save files to the 'public/uploads' directory
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// // Define your API route handler function
// export default function handler(req, res) {
//   // Apply the Multer middleware to the route handler function
//   upload.single('avatar')(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       // Handle Multer errors
//       return res.status(400).json({ error: 'Multer error' });
//     } else if (err) {
//       // Handle other errors
//       return res.status(500).json({ error: 'Internal server error' });
//     }
//     // Proceed with handling the uploaded file
//     const imageUrl = 'http://localhost:3000/uploads/' + req.file.filename;
//     res.status(200).json({ imageUrl: imageUrl });
//   });
// }

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
