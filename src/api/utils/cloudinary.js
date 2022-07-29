import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const upload = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, (error, result) => {
      // console.log(result, error);
      if (error) {
        return error;
      }
      return result;
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

// class cloudinaryClass {
//   static upload = (file, folder) => {
//     return new Promise((resolve, reject) => {
//       cloudinary.uploader.upload(
//         file,
//         (error, result) => {
//           if (error) {
//             reject(error);
//           } else {
//             resolve({
//               url: result.url,
//               public_id: result.public_id,
//             });
//           }
//         },
//         { resource_type: "auto", folder: folder }
//       ),
//         (error) => {
//           reject(error);
//         };
//     });
//   };
// }

export default upload;
