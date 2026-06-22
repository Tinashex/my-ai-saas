"use client";

import { useState } from "react";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [paid, setPaid] = useState(false);

  async function checkout() {
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    window.location.href = data.url;
  }

  async function send() {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    setChat([...chat, { user: message, ai: data.reply }]);
    setMessage("");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>AI Chat</h2>

      {!paid && (
        <button onClick={checkout}>
          💳 Pay to Unlock AI
        </button>
      )}

      <div style={{ marginTop: 20 }}>
        {chat.map((c, i) => (
          <div key={i}>
            <p><b>You:</b> {c.user}</p>
            <p><b>AI:</b> {c.ai}</p>
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
      />

      <button onClick={send}>Send</button>
    </div>
  );
        }
