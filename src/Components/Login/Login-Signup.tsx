// Import React and useState hook from React library.
import React, {useState} from 'react'
// Import custom CSS for the LoginSignup component styling.
import './LoginSignup.css'
// Import the Modal component from a relative path for use in this component.
import Modal from "../Modal/Modal";
// Import the Ozex logo from the assets folder to be used in the UI.
import ozex_logo from '../Assets/Ozex-logo.png'

// Define an interface for typing the state used to track form errors.
// This helps ensure consistent usage of the error object throughout the component.
interface Errors {
    username?: string; // Optional string to hold an error message for the username field.
    password?: string; // Optional string to hold an error message for the password field.
}

// Defines a functional component named LoginSignup.
const LoginSignup = () => {
    // State for handling user credentials. It initializes with both 'username' and 'password' as empty strings.
    // `setCredentials` is used to update these values based on user input.
    const [credentials, setCredentials] = useState({username: '', password: ''});

    // State for storing any validation errors related to the user's inputs. This object tracks errors for
    // 'username' and 'password' fields and can be updated to display error messages.
    const [errors, setErrors] = useState<Errors>({});

    // State for managing the modal's visibility and content. 'isOpen' determines if the modal should be shown,
    // and 'message' contains the text to display within the modal. This is used for feedback like error messages
    // or login success notifications.
    const [modal, setModal] = useState({isOpen: false, message: ''});

    //Function that checks whenever there is a change in the input field
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setCredentials({...credentials, [id]: value});
    };

    // Regex pattern to check for a valid email
    const emailRegex = /\S+@\S+\.\S+/;
    // Regex pattern to check for a valid password that has at least 8 characters and includes uppercase, lowercase, number, and a special character
    const passwordRegex = /^(?=(.*[0-9]))(?=.*[a-z])(?=(.*[A-Z]))(?=.*[^a-zA-Z0-9]).{8,}$/;

    // Defines the `validate` function to check user input for errors.
    const validate = () => {
        // Initializes an object to store potential error messages.
        let tempErrors: Errors = {};
        // Validates the username. Checks if it's not empty and conforms to the email format.
        // If not valid, sets an error message; otherwise, it remains an empty string.
        tempErrors.username = credentials.username ?
            (emailRegex.test(credentials.username) ? "" : "Veuillez saisir une adresse e-mail valide.") : // I validate email and username here, it can be changed depending on sign-up or log-in page
            "Le nom d'utilisateur est requis.";
        // Validates the password. Checks if it's not empty and meets specified criteria
        // (minimum 8 characters, includes uppercase, lowercase, number, and special character).
        // Sets appropriate error message if invalid.
        tempErrors.password = credentials.password ?
            (passwordRegex.test(credentials.password) ? "" : "Veuillez entrer un mot de passe valide, il doit contenir au moins 8 caractères et inclure des majuscules, des minuscules, un chiffre et un caractère spécial.") :
            "Le mot de passe est requis.";
        // Updates the `errors` state with any new errors found during validation.
        setErrors(tempErrors);
        // Returns true if there are no errors, allowing form submission to proceed.
        return Object.values(tempErrors).every(x => x === "");
    };

    // Handles the form submission event.
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents the default form submission behavior which would reload the page.
        if (validate()) {
            // If the validate function returns true (i.e., no errors), it opens a modal with a success message.
            setModal({isOpen: true, message: "Connexion réussie!"});
            console.log('Login valid'); // Logs a message to the console indicating a successful login attempt.
        } else {
            // If there are validation errors, logs those errors to the console.
            // The UI will display error messages based on the `errors` state updated during validation.
            console.log('Validation errors:', errors);
        }
    };

    // Handles click events on the sign-up link.
    const handleSignUp = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();// Prevents the default anchor link behavior which is to navigate or refresh the page.
        if (validate()) {
            // Opens the modal and sets its message to prompt the user to check their email as part of the sign-up process.
            setModal({isOpen: true, message: 'Veuillez vérifier votre e-mail.'})
            console.log('Sign-up valid'); // Logs a message to the console indicating a successful sign-up attempt.
        }
        else {
            // If there are validation errors, logs those errors to the console.
            // The UI will display error messages based on the `errors` state updated during validation.
            console.log('Validation errors:', errors);
        }


    }


    // Returns the TSX for the component.
    return (
        <>
            <Modal isOpen={modal.isOpen} message={modal.message}
                   onClose={() => setModal({isOpen: false, message: ''})}/>
            <div className={'container'}>
                <div className={'row-1 header-container'}>
                    <div className={'col-12 header'}>
                        <img id={'header-logo'} src={ozex_logo} alt={'Ozex Logo'}/>
                    </div>
                </div>
                {/* The form section for login. */}
                <form className={'login-form'} onSubmit={handleSubmit}>
                    {/* Container for input fields. */}
                    <div className={'row-2'}>
                        <div className={'col-12 login-inputs'}>
                            <div className={'inputs'}>
                                <input id={'username'} className={'input'} type={"text"}
                                       placeholder={"Nom d'utilisateur"}
                                       value={credentials.username} onChange={handleChange}/>
                                {errors.username && <div className={'error-container'}>{errors.username}</div>}
                                <input id={'password'} className={'input'} type={"password"}
                                       placeholder={"Mot de passe"}
                                       value={credentials.password} onChange={handleChange}/>
                                {errors.password && <div className={'error-container'}>{errors.password}</div>}
                            </div>
                        </div>
                    </div>
                    {/* Container for the submit button. */}
                    <div className={'row-3'}>
                        <div className={'col-12 login-button'}>
                            <div className={'submit'}>
                                <input id={'login-button'} type={'submit'} value={"S'IDENTIFIER"}/>
                            </div>
                        </div>
                    </div>
                </form>
                {/* Link for users who don't have an account to sign up. */}
                <div className={'row-4'}>
                    <div className={'col-12 sign-up-section'}>
                        <span>Vous n'avez pas de compte?</span>
                        <br></br>
                        <span> <a href={"https://www.google.com/"}
                                  onClick={handleSignUp}
                                  id={'sign-up-link'}> Inscrivez-vous</a> maintenant.</span>
                    </div>
                </div>
            </div>
        </>
    )
}

// Export the LoginSignup component for use in other parts of the application.
export default LoginSignup;