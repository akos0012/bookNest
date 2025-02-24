import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const login = async (username, password) => {
    return fetch(`/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });
}

const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            setUser(localStorage.getItem("username"));
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await login(username, password);
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", username);
                setIsLoggedIn(true);
                setUser(username);
                setPassword("");
            } else {
                console.log("Login failed!")
            }
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        setUser("");
        navigate("/")
    };

    const handleRegister = () => {
        navigate("/register");
    };

    return (
        <div className="LoginForm">
            {isLoggedIn ? (
                <div className="container">
                    <h5>Welcome {user}!</h5>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <form onSubmit={handleSubmit} className="container">
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="buttons">
                            <button type="submit" disabled={loading}>Login</button>
                            <button type="button" onClick={handleRegister} disabled={loading}>Register</button>
                        </div>
                    </form>
                </div>
            )}
        </div >
    );
};

export default LoginForm;