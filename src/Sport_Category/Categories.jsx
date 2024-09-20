import { useNavigate } from "react-router-dom";

const Categories = () => {
    const navigate = useNavigate(); // Menggunakan useNavigate untuk navigasi

    // Fungsi untuk mengarahkan ke halaman login
    const handleNavigate = () => {
        navigate("/login"); // Mengarahkan ke halaman login
    };

    return (
        <div>
            Ini adalah Dashboard Categori
            <button onClick={handleNavigate}>Go to Login</button> {/* Button untuk melakukan navigasi */}
        </div>
    );
};

export default Categories;
