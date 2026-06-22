"use client";

import { useState } from "react";

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  async function send() {
    if (!msg) return;

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg })
    });

    const data = await res.json();

    setChat([...chat, { user: msg, ai: data.reply }]);
    setMsg("");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>My AI Assistant</h2>

      <div>
        {chat.map((c, i) => (
          <div key={i}>
            <p><b>You:</b> {c.user}</p>
            <p><b>AI:</b> {c.ai}</p>
          </div>
        ))}
      </div>

      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Ask something..."
      />

      <button onClick={send}>Send</button>

      <hr />

      <p>
        💰 Payment: Contact owner via WhatsApp to unlock full access
      </p>
    </div>
  );
}
