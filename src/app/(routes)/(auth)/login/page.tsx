"use client";
import { useState } from "react";
import { useLogin } from "@/lib/auth/hooks/useLogin";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: loginMutation } = useLogin();

  const handleLogin = () => {
    loginMutation(
      { email, password },
      {
        onError: (error) => {
          console.log(error.message);
        },
      }
    );
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>login</button>
      </form>
    </div>
  );
}
