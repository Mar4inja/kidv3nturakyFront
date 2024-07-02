import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../features/auth/authSlice";
import { updateProfile, selectUpdateLoading, selectUpdatedProfile } from "../../features/profile/profileSlice";
import styles from "./Profile.module.css";
import Navbar from "../../components/navbar/Navbar";
import profileBackgroundImage from "../../assets/profile.jpg";
import boyImage from "../../assets/profilePhoto/boy.png";
import girlImage from "../../assets/profilePhoto/girl.png";

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const loading = useSelector(selectUpdateLoading);
    const updatedProfile = useSelector(selectUpdatedProfile);

    const [showPersonalData, setShowPersonalData] = useState(false);
    const [editing, setEditing] = useState(false);

    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        gender: user.gender,
        email: user.email,
        profilePhoto: user.profilePhoto || "", // Pievienots profilePhoto
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [selectedImage, setSelectedImage] = useState(user.profilePhoto || ""); // Sākotnējā attēla URL

    useEffect(() => {
        if (updatedProfile) {
            setFormData({
                firstName: updatedProfile.firstName,
                lastName: updatedProfile.lastName,
                age: updatedProfile.age,
                gender: updatedProfile.gender,
                email: updatedProfile.email,
                profilePhoto: updatedProfile.profilePhoto || "",
            });
            setSelectedImage(updatedProfile.profilePhoto || ""); // Atjaunot izvēlēto attēlu
            setSuccessMessage("Update successful!");
            setTimeout(() => {
                setSuccessMessage("");
                setEditing(false);
            }, 1000);
        }
    }, [updatedProfile]);

    const handleTogglePersonalData = () => {
        setShowPersonalData(!showPersonalData);
        if (showPersonalData) {
            setEditing(false);
        }
    };

    const handleEditData = () => {
        setEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name !== 'email') {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateProfile(formData)).unwrap();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                setFormData({
                    ...formData,
                    profilePhoto: reader.result, // Saglabā attēlu rezultātā base64 formātā
                });
            };
            reader.readAsDataURL(file); // Nolasīt failu kā data URL
        }
    };

    const handleDeleteImage = () => {
        setSelectedImage("");
        setFormData({
            ...formData,
            profilePhoto: "", // Dzēst attēlu
        });
    };

    return (
        <div className={styles.profileContainer}>
            <Navbar />
            <div className={styles.backgroundContainer}>
                <img
                    src={profileBackgroundImage}
                    alt="Profile Background"
                    className={styles.backgroundImage}
                />
            </div>
            <div className={styles.fullName}>
                <h2>Welcome, {user.firstName} {user.lastName}</h2>
            </div>
            <div className={styles.profileImageContainer}>
                <div className={styles.profileImageWrapper}>
                    <label htmlFor="profilePhotoUpload" className={styles.profileImageLabel}>
                        <img
                            src={selectedImage || (user.gender === 'male' ? boyImage : girlImage)}
                            alt="Profile"
                            className={styles.profileImage}
                        />
                    </label>
                    <input
                        type="file"
                        id="profilePhotoUpload"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }} // Slēpt input laukumu
                    />
                    {selectedImage && (
                        <button
                            onClick={handleDeleteImage}
                            className={styles.deleteButton}
                        >
                            Delete Picture
                        </button>
                    )}
                </div>
                <button onClick={handleTogglePersonalData} className={styles.personalDataButton}>
                    Personal Data
                </button>
                {showPersonalData && (
                    <div className={styles.personalDataContainer}>
                        <button onClick={handleTogglePersonalData} className={styles.closeButton}>
                            &times;
                        </button>
                        {editing ? (
                            <form onSubmit={handleSubmit}>
                                <p>
                                    <strong>First Name:</strong>{" "}
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </p>
                                <p>
                                    <strong>Last Name:</strong>{" "}
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </p>
                                <p>
                                    <strong>Age:</strong>{" "}
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        required
                                    />
                                </p>
                                <p>
                                    <strong>Gender:</strong>{" "}
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </p>
                                <p>
                                    <strong>Email:</strong>{" "}
                                    {user.email}
                                </p>
                                <button type="submit" className={styles.saveButton} disabled={loading}>
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                            </form>
                        ) : (
                            <>
                                <p><strong>First Name:</strong> {formData.firstName}</p>
                                <p><strong>Last Name:</strong> {formData.lastName}</p>
                                <p><strong>Age:</strong> {formData.age}</p>
                                <p><strong>Gender:</strong> {formData.gender}</p>
                                <p><strong>Email:</strong> {formData.email}</p>
                                <button onClick={handleEditData} className={styles.editDataButton}>
                                    Edit Data
                                </button>
                            </>
                        )}
                        {successMessage && (
                            <div className={styles.successMessage}>
                                {successMessage}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
