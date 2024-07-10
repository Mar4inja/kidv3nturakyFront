import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { selectUpdateLoading, selectUpdatedProfile, setProfilePhoto, updateProfile } from '../../features/profile/profileSlice';
import { useUpdateProfileMutation } from '../../app/api/apiSlice';
import styles from './Profile.module.css';
import Navbar from '../../components/navbar/Navbar';
import profileBackgroundImage from '../../assets/profilePhoto/profMain.jpg';
import boyImage from '../../assets/profilePhoto/boy.png';
import girlImage from '../../assets/profilePhoto/girl.png';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Profile = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const navigate = useNavigate();
    const loading = useSelector(selectUpdateLoading);
    const updatedProfile = useSelector(selectUpdatedProfile);

    const [updateProfileApi] = useUpdateProfileMutation();

    const [showPersonalData, setShowPersonalData] = useState(false);
    const [editing, setEditing] = useState(false);

    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        age: user?.age || '',
        gender: user?.gender || 'male',
        email: user?.email || '',
        profilePhoto: user?.profilePhoto || '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState(user?.profilePhoto || '');

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (updatedProfile) {
            console.log('Profile updated:', updatedProfile);
            setFormData({
                firstName: updatedProfile.firstName,
                lastName: updatedProfile.lastName,
                age: updatedProfile.age,
                gender: updatedProfile.gender,
                email: updatedProfile.email,
                profilePhoto: updatedProfile.profilePhoto || '',
            });
            setSelectedImage(updatedProfile.profilePhoto || '');
            setSuccessMessage(t('profile.updateSuccess'));
            setTimeout(() => {
                setSuccessMessage('');
                setEditing(false);
            }, 2000); // Show message for 2 seconds
        }
    }, [updatedProfile, t]);

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
            const response = await updateProfileApi(formData).unwrap();
            console.log('Profile update response:', response);
            dispatch(updateProfile(response)); // Dispatch the action to update the Redux store
        } catch (error) {
            console.error(t('profile.updateError'), error);
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
                    profilePhoto: reader.result,
                });
                dispatch(setProfilePhoto(reader.result));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImage = () => {
        setSelectedImage('');
        setFormData({
            ...formData,
            profilePhoto: '',
        });
        dispatch(setProfilePhoto(''));
    };

    if (!user) {
        return null;
    }

    return (
        <div className={styles.profileContainer}>
            <Navbar />
            <div className={styles.backgroundContainer}>
                <img
                    src={profileBackgroundImage}
                    alt={t('profile.backgroundAlt')}
                    className={styles.backgroundImage}
                />
            </div>
            <div className={styles.fullName}>
                <h2>{t('profile.welcome', { firstName: user.firstName, lastName: user.lastName })}</h2>
            </div>
            <div className={styles.profileImageContainer}>
                <div className={styles.profileImageWrapper}>
                    <label htmlFor="profilePhotoUpload" className={styles.profileImageLabel}>
                        <img
                            src={selectedImage || (user.gender === 'male' ? boyImage : girlImage)}
                            alt={t('profile.profilePhotoAlt')}
                            className={styles.profileImage}
                        />
                    </label>
                    <input
                        type="file"
                        id="profilePhotoUpload"
                        className={styles.fileInput}
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    {selectedImage && (
                        <button
                            onClick={handleDeleteImage}
                            className={styles.deleteButton}
                        >
                            {t('profile.deletePicture')}
                        </button>
                    )}
                </div>
                <button onClick={handleTogglePersonalData} className={styles.personalDataButton}>
                    {t('profile.personalData')}
                </button>
                {showPersonalData && (
                    <div className={styles.personalDataContainer}>
                        <button onClick={handleTogglePersonalData} className={styles.closeButton}>
                            &times;
                        </button>
                        {editing ? (
                            <form onSubmit={handleSubmit} className={styles.profileForm}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="firstName">{t('profile.firstName')}:</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="lastName">{t('profile.lastName')}:</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="age">{t('profile.age')}:</label>
                                    <input
                                        type="number"
                                        name="age"
                                        id="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="gender">{t('profile.gender')}:</label>
                                    <select
                                        name="gender"
                                        id="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="male">{t('profile.male')}</option>
                                        <option value="female">{t('profile.female')}</option>
                                    </select>
                                </div>
                                <p><strong>{t('profile.email')}:</strong> {user.email}</p>
                                <button type="submit" className={styles.saveButton} disabled={loading}>
                                    {loading ? t('profile.saving') : t('profile.save')}
                                </button>
                            </form>
                        ) : (
                            <>
                                <p><strong>{t('profile.firstName')}:</strong> {formData.firstName}</p>
                                <p><strong>{t('profile.lastName')}:</strong> {formData.lastName}</p>
                                <p><strong>{t('profile.age')}:</strong> {formData.age}</p>
                                <p><strong>{t('profile.gender')}:</strong> {formData.gender}</p>
                                <p><strong>{t('profile.email')}:</strong> {formData.email}</p>
                                <button onClick={handleEditData} className={styles.editDataButton}>
                                    {t('profile.editData')}
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
