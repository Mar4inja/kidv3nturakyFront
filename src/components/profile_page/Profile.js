import React, { useState, useEffect } from 'react'; // Импорт React и хук useState, useEffect
import { useSelector, useDispatch } from 'react-redux'; // Импорт хук useSelector и useDispatch из Redux
import {
    selectUpdateLoading, // Селектор для состояния загрузки обновления профиля
    selectUpdatedProfile, // Селектор для обновленного профиля
    setProfilePhoto, // Действие для установки фото профиля
    updateProfile, // Действие для обновления профиля
    selectProfilePhoto, // Селектор для фото профиля
} from '../../features/profile/profileSlice'; // Импорт селекторов и действий из слайса профиля
import { selectCurrentUser } from '../../features/auth/authSlice'; // Селектор для текущего пользователя
import { useUpdateProfileMutation } from '../../app/api/apiSlice'; // Хук для обновления профиля через API
import styles from './profile.module.css'; // Импорт стилей для компонента
import profileBackgroundImage from '../../assets/profilePhoto/profMain.jpg'; // Импорт фонового изображения
import boyImage from '../../assets/profilePhoto/boy.png'; // Импорт изображения мальчика
import girlImage from '../../assets/profilePhoto/girl.png'; // Импорт изображения девочки
import { useNavigate } from 'react-router-dom'; // Хук для навигации
import { useTranslation } from 'react-i18next'; // Хук для перевода

const Profile = () => {
    const { t } = useTranslation(); // Инициализация функции перевода

    const dispatch = useDispatch(); // Инициализация dispatch
    const user = useSelector(selectCurrentUser); // Получение текущего пользователя из Redux
    const navigate = useNavigate(); // Инициализация navigate для перенаправления
    const loading = useSelector(selectUpdateLoading); // Получение состояния загрузки из Redux
    const updatedProfile = useSelector(selectUpdatedProfile); // Получение обновленного профиля из Redux
    const profilePhoto = useSelector(selectProfilePhoto); // Получение фото профиля из Redux

    const [updateProfileApi] = useUpdateProfileMutation(); // Инициализация хука для обновления профиля через API

    const [showPersonalData, setShowPersonalData] = useState(false); // Состояние для показа/скрытия личных данных
    const [editing, setEditing] = useState(false); // Состояние для режима редактирования

    // Начальные данные формы
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '', // Имя пользователя
        lastName: user?.lastName || '', // Фамилия пользователя
        age: user?.age || '', // Возраст пользователя
        gender: user?.gender || 'male', // Пол пользователя
        email: user?.email || '', // Электронная почта пользователя
        profilePhoto: profilePhoto || '', // Фото профиля пользователя
    });

    const [successMessage, setSuccessMessage] = useState(''); // Сообщение об успешном обновлении
    const [selectedImage, setSelectedImage] = useState(profilePhoto || ''); // Выбранное изображение для фото профиля

    // Перенаправление на страницу логина, если пользователь не авторизован
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    // Обновление данных формы, когда профиль обновлен
    useEffect(() => {
        if (updatedProfile) {
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
            }, 2000);
        }
    }, [updatedProfile, t]);

    // Переключение отображения личных данных
    const handleTogglePersonalData = () => {
        setShowPersonalData(!showPersonalData);
        if (showPersonalData) {
            setEditing(false);
        }
    };

    // Вход в режим редактирования
    const handleEditData = () => {
        setEditing(true);
    };

    // Обработка изменения полей формы
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Обработка отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateProfileApi(formData).unwrap(); // Отправка данных профиля
            dispatch(updateProfile(response)); // Обновление профиля в Redux
        } catch (error) {
            console.error(t('profile.updateError'), error); // Логирование ошибки
        }
    };

    // Обработка загрузки изображения
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result;
                setSelectedImage(imageUrl);
                setFormData((prevData) => ({
                    ...prevData,
                    profilePhoto: imageUrl,
                }));
                dispatch(setProfilePhoto(imageUrl)); // Обновление фото профиля в Redux
            };
            reader.readAsDataURL(file);
        }
    };

    // Удаление изображения профиля
    const handleDeleteImage = () => {
        setSelectedImage('');
        setFormData((prevData) => ({
            ...prevData,
            profilePhoto: '',
        }));
        dispatch(setProfilePhoto('')); // Удаление фото профиля из Redux
    };

    // Если пользователь не авторизован, не рендерить компонент
    if (!user) {
        return null;
    }

    return (
        <div>
            <div className={styles.profileContainer}>
                <div className={styles.backgroundContainer}>
                    <img
                        src={profileBackgroundImage}
                        alt={t('profile.backgroundAlt')}
                        className={styles.backgroundImage}
                    />
                </div>
                <div className={styles.fullName}>
                    <h2>{t('profile.welcome', {firstName: user.firstName, lastName: user.lastName})}</h2>
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
                                    <button type="submit" className={styles.submitButton}>
                                        {loading ? t('profile.saving') : t('profile.saveChanges')}
                                    </button>
                                </form>
                            ) : (
                                <div className={styles.profileData}>
                                    <p><strong>{t('profile.firstName')}:</strong> {formData.firstName}</p>
                                    <p><strong>{t('profile.lastName')}:</strong> {formData.lastName}</p>
                                    <p><strong>{t('profile.age')}:</strong> {formData.age}</p>
                                    <p><strong>{t('profile.gender')}:</strong> {formData.gender}</p>
                                    <p><strong>{t('profile.email')}:</strong> {formData.email}</p>
                                    <button onClick={handleEditData} className={styles.editButton}>
                                        {t('profile.edit')}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
                </div>
            </div>
        </div>
    );
};

export default Profile;
