import { useContext, useState } from "react";
import "./register.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const BACKEND_URL = "https://backend-booking-app.onrender.com/api";

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    city: "",
    phone: "",
    img: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      img: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", formData.img); // Add the image to the formdata

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/jjuli/image/upload",
        data,
        {
          params: {
            upload_preset: "upload",
          },
        }
      );

      const { backendURL } = uploadRes.data;

      const newUser = {
        ...formData,
        img: backendURL,
      };

      await axios.post(`${BACKEND_URL}/auth/register`, newUser);

      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const { loading, error, dispatch } = useContext(AuthContext);

  return (
    <div className="rContainer">
      <form onSubmit={handleSubmit} className="rForm">
        <label className="rForm-label">
          Image:
          <input
            type="file"
            name="img"
            onChange={handleImageChange}
            className="rInput"
          />
        </label>
        <label className="rForm-label">
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="rInput"
          />
        </label>
        <label className="rForm-label">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="rInput"
          />
        </label>
        <label className="rForm-label">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="rInput"
          />
        </label>
        <label className="rForm-label">
          Country:
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="rInput"
          />
        </label>
        <label className="rForm-label">
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="rInput"
          />
        </label>
        <label className="rForm-label-phone">
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="rInput"
          />
        </label>
        <button className="rButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
