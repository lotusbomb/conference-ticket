import { useEffect, useState } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Attendee = ({ onNext, onPrev,}) => {
  const [formData, setFormData] = useState({
    name: localStorage.getItem("userName") || "",
    email: localStorage.getItem("userEmail") || "",
    about: localStorage.getItem("specialRequest") || "",
    avatar: localStorage.getItem("avatar") || null,
  });

  const [userName, setUserName] = useState(localStorage.getItem("userName") || "")
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "")
  const [specialRequest, setSpecialRequest] = useState(localStorage.getItem("specialRequest") || "")

  useEffect(() => {
    localStorage.setItem("userName", userName)
    localStorage.setItem("userEmail", userEmail)
    localStorage.setItem("specialRequest", specialRequest)
    if (formData.avatar) {
      localStorage.setItem("avatar", formData.avatar)
    }
  }, [userName, userEmail, specialRequest, formData.avatar])

  useEffect(() => {
    const storedAvatar = localStorage.getItem("avatar");
    if (storedAvatar) {
      setFormData((prev) => ({ ...prev, avatar: storedAvatar }))
    }
  }, [])

  const [imageSelected, setImageSelected] = useState(null);
  const [preview, setPreview] = useState(null); // Holds preview URL
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.about) newErrors.about = "Project details are required";
    if (!imageSelected && !formData.avatar)
      newErrors.avatar = "Profile photo is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const uploadImage = async () => {
    if (!imageSelected) return null;

    const imageFormData = new FormData();
    imageFormData.append("file", imageSelected);
    imageFormData.append("upload_preset", "precious11");

    try {
      const response = await axios.post(
        process.env.REACT_APP_CLOUDINARY_API,
        imageFormData
      );
      console.log("Image Upload Response:", response.data);
      return response.data.secure_url; // Return uploaded image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleNextStep = async () => {
    if (!validateForm()) return;
  
    let uploadedImageUrl = formData.avatar;
    if (imageSelected) {
      uploadedImageUrl = await uploadImage();
      if (!uploadedImageUrl) {
        setErrors({ ...errors, avatar: "Image upload failed. Try again." });
        return;
      }
    }
    setFormData((prev) => ({ ...prev, avatar: uploadedImageUrl }));

  console.log("Saved to localStorage:", {
    userName,
    userEmail,
    specialRequest,
    avatar: uploadedImageUrl
  });
  
    // Reset states and localStorage after successful submission
    setFormData({ name: "", email: "", about: "", avatar: null });
    setUserName("");
    setUserEmail("");
    setSpecialRequest("");
    setPreview(null);
    setImageSelected(null);
  
    onNext();
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  
    if (name === "name") setUserName(value)
    if (name === "email") setUserEmail(value)
    if (name === "about") setSpecialRequest(value)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageSelected(file);
      setPreview(URL.createObjectURL(file)); // Show preview before uploading
      // setUserImage(URL.createObjectURL(file));
    }
  };  

  return (
    <section>
      <div className="rounded-3xl max-w-2xl w-full mt-5 p-6 border-[#0E464F] border-2 mx-auto overflow-hidden z-10">
        <div className="border-[#07373F] border-2 mt-1 rounded-2xl p-4">
          <p className="text-white">Upload Profile Photo</p>
          <div className="flex items-center justify-center w-full mt-4 cursor-pointer">
            <label
              className="text-white border-4 border-[#197686] bg-[#0E464F] text-sm md:text-base rounded-2xl w-2/3 flex flex-col items-center justify-center text-center m-3"
              htmlFor="fileInput"
            >
              {preview || formData.avatar ? (
                <img
                  src={preview || formData.avatar}
                  alt="Profile"
                  className="object-cover w-full h-full rounded-2xl"
                />
              ) : (
                <>
                  <IoCloudDownloadOutline size={24} className="my-4" />
                  <p className="my-4">Drag & drop or click to upload</p>
                </>
              )}
            </label>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          {errors.avatar && <p className="text-red-500">{errors.avatar}</p>}
        </div>

        <div className="border-2 border-[#07373F] mt-8"></div>

        <form className="flex flex-col mt-4 text-white">
          <label htmlFor="name" className="mt-4 text-sm">
            Enter your name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userName}
            onChange={handleInputChange}
            className="border-2 border-[#07373F] rounded-lg mt-3 h-12 p-2"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}

          <label htmlFor="email" className="mt-4 text-sm">
            Enter your email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userEmail}
            onChange={handleInputChange}
            className="border-2 border-[#07373F] rounded-lg mt-3 h-12 p-2"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <label htmlFor="about" className="mt-4 text-sm">
            Special request?
          </label>
          <textarea
            id="about"
            name="about"
            value={specialRequest}
            onChange={handleInputChange}
            placeholder="Textarea"
            className="border-2 border-[#07373F] rounded-lg mt-3 p-2 resize-none min-h-[100px]"
          />
          {errors.about && <p className="text-red-500">{errors.about}</p>}
        </form>

        <div className="mt-9 items-center text-center md:flex gap-5 grid">
          <button
            type="button"
            className="border-[#197686] border-2 w-full font-display text-sm md:text-[17px] capitalize p-2 rounded-lg text-white hover:bg-[#197686] hover:cursor-pointer"
            onClick={onPrev}
          >
            Back
          </button>
          <button
            type="button"
            className="border-[#197686] border-2 font-display w-full text-sm md:text-[17px] capitalize text-white rounded-lg p-2 hover:bg-[#197686] hover:cursor-pointer"
            onClick={handleNextStep}
          >
            Get My Free Ticket
          </button>
        </div>
      </div>
    </section>
  );
};

export default Attendee;
