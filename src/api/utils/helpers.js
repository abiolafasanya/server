import cloudinary from "./cloudinary.js";
import crypto, { createSecretKey } from "crypto";

import {config} from 'dotenv'
config()
// export async function cloudinaryUploader(req) {
//   let image = req.file === undefined || null ? "no file" : req.file.filename;
//   let { url, secure_url, original_filename } = await cloudinary(
//     `./public/files/${image}`
//   );
//   return { url, secure_url, original_filename };
// }

class helperClass {
  static async cloudinaryUploader(req) {
    let image = req.file === undefined || null ? "no file" : req.file.filename;
    let { url, secure_url, original_filename } = await cloudinary(
      req.body.image || `./public/files/${image}`
    );
    return { url, secure_url, original_filename };
  }

  static serverUrl = (req) => {
    return req.protocol + "://" + req.get("host");
  };
  
  static secretGenerator = () => crypto.randomBytes(48).toString("hex");
  
 
}

export default helperClass;
