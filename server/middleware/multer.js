// Import the Multer library, which is used to handle file uploads
import multer from "multer";

// Configure Multer to handle multipart/form-data, primarily for file uploads
const upload = multer({
  // Use disk storage to temporarily save the file on the server
  storage: multer.diskStorage({}), // An empty object lets Multer manage temp storage
});

// Export the configured middleware to be used in your API routes
export default upload;
