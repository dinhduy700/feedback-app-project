import React, { useState } from "react";
function App() {
  const [response, setResponse] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    // Replace with your API Endpoint
    const apiEndpoint = "http://your-ec2-public-ip:3000/feedback";
    const res = await fetch(apiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setResponse(result.message);
  };
  return (
    <div>
      <h1>Submit Feedback</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Your Name" required />
        <br />
        <input name="email" type="email" placeholder="Email" required />
        <br />
        <textarea
          name="feedback"
          placeholder="Your feedback"
          required
        ></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
}
export default App;
