import React, { useRef, useState, useEffect } from "react"; // Importē nepieciešamās React funkcijas un hooks
import { Link, useNavigate } from "react-router-dom"; // Importē Link un useNavigate no 'react-router-dom' pakotnes
import { useDispatch } from "react-redux"; // Importē useDispatch hook no 'react-redux'
import { setCredentials } from "../../features/auth/authSlice"; // Importē setCredentials funkciju no authSlice
import { useLoginMutation } from "../../features/auth/authApiSlice"; // Importē useLoginMutation hook no authApiSlice
import styles from "./Login.module.css"; // Importē stilu klases no Login.module.css faila
import Navbar from "../navbar/Navbar"; // Importē Navbar komponentu
import loginBackgroundImage from "../../assets/login/login.jpg"; // Importē attēlu, ko izmantos kā fona attēlu

const Login = () => {
    // **useRef** hooks tiek izmantots, lai iegūtu piekļuvi DOM elementiem
    const userRef = useRef(); // Reference uz e-pasta ievades lauku
    const errRef = useRef(); // Reference uz kļūdu ziņojumu, lai veiktu scrollēšanu

    // **useState** hooks tiek izmantots stāvokļa mainīšanai
    const [email, setEmail] = useState(""); // E-pasta stāvoklis, sākotnēji ir tukšs
    const [password, setPassword] = useState(""); // Paroles stāvoklis, sākotnēji ir tukšs
    const [errorMessage, setErrorMessage] = useState(""); // Kļūdu ziņojuma stāvoklis, sākotnēji ir tukšs
    const navigate = useNavigate(); // **useNavigate** hooks tiek izmantots, lai pārietu uz citu lapu
    const [login, { isLoading }] = useLoginMutation(); // **useLoginMutation** hooks no authApiSlice, kas nodrošina login funkcionalitāti
    const dispatch = useDispatch(); // **useDispatch** hooks tiek izmantots, lai izsauktu Redux darbības

    useEffect(() => {
        // Fokusē uz e-pasta ievades lauku, kad komponents tiek ielādēts
        userRef.current.focus();
    }, []); // Tukšs atkarību masīvs nodrošina, ka efekts tiek izpildīts tikai komponenta ielādēšanas laikā

    useEffect(() => {
        // Notīra kļūdu ziņojumu, kad mainās e-pasta vai paroles vērtības
        setErrorMessage("");
    }, [email, password]); // Šis efekts tiek izpildīts katru reizi, kad mainās email vai password

    const handleSubmit = async (e) => {
        e.preventDefault(); // Novērš noklusējuma formu nosūtīšanas uzvedību

        try {
            // Izsauc login funkciju un saņem lietotāja datus
            const userData = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...userData, email })); // Saglabā lietotāja datus Redux stāvoklī
            setEmail(""); // Notīra e-pasta ievades lauku
            setPassword(""); // Notīra paroles ievades lauku
            navigate("/profile"); // Pāriet uz profila lapu
        } catch (error) {
            // Apstrādā kļūdas atbilstoši statusa kodam
            if (!error?.originalStatus) {
                setErrorMessage("Wrong email or password"); // Ja nav norādīts statusa kods
            } else if (error.originalStatus === 400) {
                setErrorMessage("Missing Email or Password"); // Ja trūkst e-pasta vai paroles
            } else if (error.originalStatus === 401) {
                setErrorMessage("Unauthorized"); // Ja lietotāja akreditācijas dati ir nepareizi
            } else {
                setErrorMessage("Login Failed"); // Visas citas kļūdas
            }
            errRef.current?.scrollIntoView({ behavior: "smooth" }); // Veic scrollēšanu uz kļūdas ziņojumu
        }
    };

    // Funkcija, kas tiek izsaukta, kad mainās e-pasta ievades lauks
    const handleUserInput = (e) => setEmail(e.target.value);
    // Funkcija, kas tiek izsaukta, kad mainās paroles ievades lauks
    const handlePasswordInput = (e) => setPassword(e.target.value);

    // Pārbauda, vai tiek veikts ielāde vai parāda login formu
    const content = isLoading ? (
        <h1>Loading...</h1> // Ja tiek veikta ielāde, parāda šo ziņojumu
    ) : (
        <div className={styles["login-container"]}>
            <Navbar />
            <div className={styles["background-container"]}>
                <img
                    src={loginBackgroundImage}
                    alt="Background"
                    className={styles["background-image"]}
                />
            </div>
            <form className={styles["login-form"]} onSubmit={handleSubmit}>
                <h2 className={styles["form-title"]}>Login</h2> {/* Pievienota "form-title" klase */}
                <div className={styles["form-group"]}>
                    <input
                        type="email"
                        placeholder="Email"
                        ref={userRef}
                        value={email}
                        onChange={handleUserInput}
                        required
                    />
                </div>
                <div className={styles["form-group"]}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordInput}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={styles["login-btn"]}
                    disabled={isLoading}
                >
                    Login
                </button>
                {errorMessage && (
                    <p ref={errRef} className={styles["error"]} style={{ color: "red" }} aria-live="assertive">
                        {errorMessage}
                    </p>
                )}
            </form>
            <div className={styles["register-link"]}>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );

    return content; // Atgriež komponenta saturu
};

export default Login; // Eksportē Login komponentu kā noklusējuma eksportu
