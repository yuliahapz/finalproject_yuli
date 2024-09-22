import { useNavigate } from "react-router-dom";
import "./Category.css";

const Categories = () => {
    const navigate = useNavigate(); // For navigation

    // Function to navigate to specific category
    const handleNavigate = (categoryId) => {
        navigate(`/dashboard/${categoryId}`); // Navigate to category dashboard
    };

    return (
        <div className="categories-container">
            <h1 className="title">ALL CATEGORIES</h1>
            <h2 className="subtitle">SPORTS</h2>

            {/* Grid layout for categories */}
            <div className="categories-grid">
                <div className="category-card">
                    <img src="https://media.istockphoto.com/id/1316623198/photo/portrait-of-young-african-soccer-player-posing-isolated-on-black-background-concept-of-sport.jpg?s=612x612&w=0&k=20&c=BHfmeHSyOlyBDXvdeZKybjwBCuO-_o1WT_9YFKgCx1g=" alt="Sepak Bola" className="category-image" />
                    <h3>Sepak Bola</h3>
                    <button onClick={() => handleNavigate(1)} className="btn">View</button>
                </div>

                <div className="category-card">
                    <img src="https://i.pinimg.com/736x/5c/3a/36/5c3a369036d6da7abf3473626d373c77.jpg" alt="Basket" className="category-image" />
                    <h3>Basket</h3>
                    <button onClick={() => handleNavigate(2)} className="btn">View</button>
                </div>

                <div className="category-card">
                    <img src="https://i.natgeofe.com/n/e626ca85-71f1-4485-90ea-4828d5884965/GettyImages-1272468011_2x3.jpg" alt="Tenis" className="category-image" />
                    <h3>Tenis</h3>
                    <button onClick={() => handleNavigate(3)} className="btn">View</button>
                </div>

                <div className="category-card">
                    <img src="https://mfiles.alphacoders.com/770/770564.jpg" alt="Renang" className="category-image" />
                    <h3>Renang</h3>
                    <button onClick={() => handleNavigate(4)} className="btn">View</button>
                </div>

                <div className="category-card">
                    <img src="https://www.shape.com/thmb/XhaeY6hfYXOUEmpvxZKjOi_-H5A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/running-longer-or-faster-31e97070bda14ffc8afdea52094504c7.jpg" alt="Lari" className="category-image" />
                    <h3>Lari</h3>
                    <button onClick={() => handleNavigate(5)} className="btn">View</button>
                </div>
            </div>

            {/* Button for navigating to login */}
            <div className="text-center mt-8">
                <button onClick={() => navigate("/login")} className="login-btn">Go to Login</button>
            </div>
        </div>
    );
};

export default Categories;
