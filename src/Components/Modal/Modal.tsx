// Import React for using JSX and React features within the component.
import React from "react";
// Import specific CSS styles for the Modal component.
import './Modal.css';

// Define the types for the props that the Modal component will receive.
interface ModalProps {
    isOpen: boolean;  // Determines if the modal should be displayed.
    message: string;  // Message to display within the modal.
    onClose: () => void;  // Function to call when the modal needs to be closed
}

// Define the Modal component as a functional component using TypeScript's generic React.FC type.
const Modal: React.FC<ModalProps> = ({ isOpen, message, onClose }) => {
    // Render nothing if the modal is not open.
    if (!isOpen) return null;

    // Returns the TSX for the component.
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p className="modal-text">{message}</p>
                <button onClick={onClose} className="modal-button">Close</button>
            </div>
        </div>
    );
};

// Export the Modal component for use in other parts of the application.
export default Modal;