import styled from "styled-components";
import MainButton from "../components/MainButton";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Form = styled.form`
  border: 2px solid black;
  height: min(66vh, 400px);
  width: min(100vw, 300px);
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;

  & * {
    box-sizing: border-box;
    font-family: "Open sans", sans-serif;
    font-weight: 300;
  }
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Input = styled.input`
  padding: 8px 8px;
  font-size: 1rem;
  border: 1px solid #222222;
  border-radius: 8px;
  width: 80%;
`;

const PositionedMainButton = styled(MainButton)`
  margin: 0 auto;
  width: 80%;
`;

function Login({ className }) {
  const [email, setEmail] = useState("alondaysp@example.com");
  const [password, setPassword] = useState("devpassword");

  const { login, isLoading } = useLogin();

  function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form className={className}>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
      <PositionedMainButton onClick={handleLogin} disabled={isLoading}>
        Log In
      </PositionedMainButton>
    </Form>
  );
}

export default Login;
