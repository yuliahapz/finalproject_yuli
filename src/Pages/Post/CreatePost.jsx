import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";
import './CreatePost.css'; // Import the CSS file

const CreatePost = () => {
  const [imageUrl, setImageUrl] = useState(''); // URL dari image setelah upload
  const [previewUrl, setPreviewUrl] = useState(''); // URL untuk pratinjau image
  const [caption, setCaption] = useState('');   // Caption untuk post
  const [file, setFile] = useState(null);       // File yang dipilih
  const [loading, setLoading] = useState(false); // Status loading saat submit

  // Buat ref untuk input file
  const fileInputRef = useRef(null);

  // Ambil token dari localStorage
  const token = localStorage.getItem('token'); // Token dari localStorage

  // Handle perubahan file input (menyimpan file yang dipilih dan membuat URL pratinjau)
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Buat URL sementara untuk pratinjau image yang dipilih
    const filePreviewUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(filePreviewUrl);
  };

  if (!token) {
    toast.error("Token is missing. Please log in again.");
    return null; // Mencegah render lebih lanjut jika token tidak ada
  }

  // Upload image ke server
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file); // Ganti 'imageUrl' menjadi 'image' sesuai dengan API

    try {
      const config = {
        headers: {
          apiKey: 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b',
          Authorization: `Bearer ${token}`, // Gunakan token dari localStorage
        },
      };

      const response = await axios.post(
        'https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/upload-image', // Ganti dengan URL upload yang sesuai
        formData,
        config
      );

      setImageUrl(response.data.url); // Set URL image setelah upload berhasil
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message); // Perbaiki log error untuk melihat pesan lengkap
      toast.error('Failed to upload image');
    }
  };

  // Submit form (caption dan URL image)
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl || !caption) {
      toast.error('Please upload an image and fill in the caption');
      return;
    }

    setLoading(true);

    const postData = { imageUrl, caption };

    try {
      const config = {
        headers: {
          "Content-Type": 'application/json',
          apiKey: 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b',
          Authorization: `Bearer ${token}`, // Gunakan token dari localStorage
        },
      };

      const response = await axios.post(
        'https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/create-post',
        postData,
        config
      );
      console.log(response);
      toast.success('Successfully created post');

      // Kosongkan input setelah berhasil submit
      setCaption('');  // Kosongkan caption setelah sukses submit
      setImageUrl(''); // Kosongkan image URL setelah sukses submit
      setPreviewUrl(''); // Kosongkan pratinjau setelah submit
      setFile(null);    // Reset file input

      // Reset input file
      fileInputRef.current.value = null; // Reset nilai input file
    } catch (error) {
      console.error("Post creation failed:", error.response?.data || error.message);
      toast.error('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  // Otomatis upload file setelah dipilih
  useEffect(() => {
    if (file) {
      handleUpload();
    }
  }, [file]);

  return (
    <div className="create-post-container">
      <Toaster position="top-center" reverseOrder={false} />
      <h1>Create Post</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Image:
          <input 
            type="file" 
            ref={fileInputRef}  // Tambahkan ref pada input file
            onChange={handleFileChange} 
          /> {/* File input */}
        </label>

        {/* Tampilkan pratinjau image jika ada */}
        {previewUrl && (
          <div className="image-preview">
            <img src={previewUrl} alt="Preview" className="uploaded-image" />
          </div>
        )}

        <label>
          Caption:
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)} // Handle input caption
            required // Tambahkan required untuk validasi
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
