/* 
Copyright 2023, Salvador Pio Alonday

This file is part of The Web Brain Project

The Web Brain Project is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.

The Web Brain Project is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with The Web
Brain Project. If not, see <https://www.gnu.org/licenses/>.
*/

import styled from "styled-components";
import MainButton from "../components/MainButton";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

const Form = styled.form`
  margin: auto;
  border: 2px solid black;
  height: min(66vh, 400px);
  width: min(100vw, 300px);
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;

  & * {
    box-sizing: border-box;
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

const Div = styled.div`
  display: flex;
  height: 80vh;
`;

function Login({ className }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <Div>
      <Form className={className}>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <PositionedMainButton onClick={handleLogin} disabled={isLoading}>
          LOG IN
        </PositionedMainButton>
        <Link to="/signup">Sign up for an account</Link>
      </Form>
    </Div>
  );
}

export default Login;
