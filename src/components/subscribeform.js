import React, { useState } from "react";
import "./subscribeform.css";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(data.message); // Set success message
        setErrorMessage(""); // Clear error message
        setEmail(""); // Clear email input
      } else {
        setErrorMessage(data.message); // Set error message
        setSuccessMessage(""); // Clear success message
      }
    } catch (error) {
      console.error("Error submitting email:", error);
      setErrorMessage("Failed to subscribe. Please try again later.");
      setSuccessMessage(""); // Clear success message
    }
  };

  return (
    <main className="subscribe-container">
      <h2>Subscribe to Our Newsletter</h2>
      <h4>
        Get valuable financial insights, expert tips, & inspiring stories
        delivered to your inbox.
      </h4>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
          required
        />
        <button type="submit">Subscribe</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </main>
  );
}
