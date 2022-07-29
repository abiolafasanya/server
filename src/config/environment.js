const environment = {
  port: process.env.PORT || 4000,
  db: process.env.MONGO_URI || "mongodb://localhost:27170",
  secret: process.env.SECRET || "secret",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  env: process.env.NODE_ENV || "development",
};

export default environment;

// cloudinary: cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME || "fastbeetech",
//   api_key: process.env.API_KEY || "596255624512783",
//   api_secret: process.env.API_SECRET || "rRgb9JgHAEiZaFUZB31n0oZX5wc",
// }),
// scale: cloudinary.image("turtles.jpg", {
//   width: 70,
//   height: 53,
//   crop: "scale",
// }),

//   if (req.method === 'POST') {
//     const urls = []
//     const files = req.files;
//     for (const file of files) {
//         const {path} = file;
//         const newPath = await uploader(path);
//         url.push(newPath);
//         fs.unlink(newPath);
//     }
//     res.status(200).json({
//         message: "Images uploaded successfully",
//         data: urls
//     })
//   }

// reference link
// https://andela.com/insights/how-to-use-cloudinary-and-nodejs-to-upload-multiple-images/
