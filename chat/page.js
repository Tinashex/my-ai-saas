import { useEffect, useState } from "react";

export default function Chat() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const sessionId = url.searchParams.get("session_id");

    if (!sessionId) return;

    fetch(`/api/verify?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        if (data.access) setAllowed(true);
      });
  }, []);

  if (!allowed) {
    return (
      <div>
        <h2>🔒 Payment Required</h2>
        <p>Please complete payment to access AI.</p>
      </div>
    );
  }

  return <div>AI Chat UI goes here...</div>;
}
