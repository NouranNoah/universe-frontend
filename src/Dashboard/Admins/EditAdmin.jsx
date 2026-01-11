import React, { useRef, useState } from "react";
import "./Admins.css";
import { EditAdmins } from "../../services/adminService";
import profileDefault from '../../assets/default-profile-picture.jpg';

export default function EditAdmin({
  admin,
  adminId,
  setShowEditModal,
  getAdmin,
  setShowProfileModal,
}) {
  const fileInputRef = useRef();

  const [form, setForm] = useState({
    name: admin.name,
    phone_number: admin.phone_number,
    email: admin.email,
    profileImage: admin.profileImage, 
  });

  const [errormsg, setErrormsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const validatePhone = (value) => value.replace(/[^0-9]/g, "");
  const isValidPhone = (phone) => /^[0-9]{11}$/.test(phone);

  
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setForm({ ...form, profileImage: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone_number || !form.email) {
      setErrormsg("Please fill all data!");
      return;
    }

    if (!isValidPhone(form.phone_number)) {
      setErrormsg("Phone number must be 11 digits.");
      return;
    }

    setLoading(true);
    setErrormsg("");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("phone_number", form.phone_number);

      // لو الصورة هي ملف جديد، نضيفها للفورم
      if (form.profileImage instanceof File) {
        formData.append("profileImage", form.profileImage);
      }

      const data = await EditAdmins(adminId, formData); 
      console.log("Admin Updated:", data);

      getAdmin();
      setShowEditModal(false);
      setShowProfileModal(false);

    } catch (err) {
      setErrormsg(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // عرض الصورة: لو File نعرضها مؤقتًا، لو لا نعرض اللينك
  const displayImage = form.profileImage instanceof File
    ? URL.createObjectURL(form.profileImage)
    : form.profileImage || profileDefault;

  return (
    <div className="modal-box">
      <i
        className="closeicon fa-solid fa-xmark"
        onClick={() => setShowEditModal(false)}
      ></i>

      <h3>Edit Admin</h3>
      {errormsg && <p className="error">{errormsg}</p>}

      <form onSubmit={handleSubmit}>
        <div className="dataAdminBox">
          <div className="imgAdmin">
            <img
              src={displayImage}
              alt="admin profile"
              style={{ cursor: "pointer" }}
              onClick={handleImageClick}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>

          <div className="dataAdmin">
            <div>
              <label>Admin Name:</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Admin Phone:</label>
              <input
                type="text"
                name="phone_number"
                value={form.phone_number}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone_number: validatePhone(e.target.value),
                  })
                }
              />
            </div>

            <div>
              <label>Email:</label>
              <input type="email" value={form.email} readOnly className="readonly" />
            </div>
          </div>
        </div>

        <div className="btns-group">
          <button type="button" className="left-btn" onClick={() => setShowEditModal(false)}>
            Cancel
          </button>
          <button type="submit" className="right-btn">
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
