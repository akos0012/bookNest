import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/UserRegister.css"; // Make sure to create and style this CSS file as needed

const registerUser = async (username, password, isAdmin) => {
    const response = await fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, isAdmin }),
    });
    return response;
};

const UserRegister = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await registerUser(username, password, isAdmin);
            if (response.ok) {
                navigate("/");
            } else {
                const data = await response.json();
                setErrorMessage(data.message || "Registration failed!");
            }
        } catch (error) {
            console.error("Registration error:", error);
            setErrorMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="UserRegister">
            <h3>Register</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label>
                    <input
                        type="checkbox"
                        checked={isAdmin}
                        onChange={() => setIsAdmin(!isAdmin)}
                    />
                    I'm Admin
                </label>
                <button type="submit" disabled={loading}>
                    Register
                </button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default UserRegister;