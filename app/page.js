import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>My AI SaaS</h1>
      <p>Pay to access your AI assistant</p>

      <Link href="/chat">
        <button style={{ padding: 10, marginTop: 20 }}>
          Go to Chat
        </button>
      </Link>
    </div>
  );
}
