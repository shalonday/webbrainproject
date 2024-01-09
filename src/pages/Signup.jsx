/* 
Copyright 2023, Salvador Pio Alonday

This file is part of The Online Brain Project

The Online Brain Project is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.

The Online Brain Project is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with The Online
Brain Project. If not, see <https://www.gnu.org/licenses/>.
*/

import styled from "styled-components";
import MainButton from "../components/MainButton";
import { useForm } from "react-hook-form";
import { useSignup } from "../hooks/useSignup";

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
  width: 100%;
`;

const Error = styled.span`
  font-size: 0.6rem;
  color: red;
  position: absolute;
  bottom: 2px;
  right: 5px;
`;

const PositionedMainButton = styled(MainButton)`
  margin: 0 auto;
  width: 80%;
`;

const Div = styled.div`
  display: flex;
  height: 80vh;
`;

const InputDiv = styled.div`
  width: 80%;
  position: relative;
`;

function Signup({ className }) {
  const { register, handleSubmit, reset, formState, getValues } = useForm();
  const { signup, isPending } = useSignup();

  const { errors } = formState;

  function signupNewUser({ username, email, password }) {
    signup(
      { username, email, password },
      {
        onSettled: reset,
      }
    );
  }

  return (
    <Div>
      <Form className={className} onSubmit={handleSubmit(signupNewUser)}>
        <InputDiv>
          <Input
            placeholder="Email"
            id="email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
            disabled={isPending}
          />
          {errors?.email?.message && <Error>{errors.email.message}</Error>}
        </InputDiv>

        <InputDiv>
          <Input
            placeholder="Username"
            id="username"
            {...register("username", { required: "This field is required" })}
            disabled={isPending}
          />
          {errors?.username?.message && (
            <Error>{errors.username.message}</Error>
          )}
        </InputDiv>

        <InputDiv>
          <Input
            type="password"
            placeholder="Password"
            id="password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
            disabled={isPending}
          />
          {errors?.password?.message && (
            <Error>{errors.password.message}</Error>
          )}
        </InputDiv>

        <InputDiv>
          <Input
            type="password"
            placeholder="Confirm Password"
            id="password2"
            {...register("password2", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Passwords need to match",
            })}
            disabled={isPending}
          />
          {errors?.password2?.message && (
            <Error>{errors.password2.message}</Error>
          )}
        </InputDiv>
        <PositionedMainButton disabled={isPending}>
          Sign up
        </PositionedMainButton>
      </Form>
    </Div>
  );
}

export default Signup;
