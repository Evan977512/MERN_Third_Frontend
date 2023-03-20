import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElement/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElement/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElement/LoadingSpinner";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import AuthContext from "../../shared/context/auth-context";
import "./Auth.css";

const Auth = (props) => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    /**
     * (prevMode) => (!prevMode) == function form of updating the state
     * which we should use if our new state update is based on the previous state
     * and it basically inverts it by adding this exclamation makr.
     */
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    // check if it is login mode
    if (isLoginMode) {
      try {
        setIsLoading(true);
        // fetch() is a built-in function in JavaScript that allows us to make HTTP requests
        // '' => needs a string that points at backend
        const response = await fetch(`http://localhost:5001/api/users/login`, {
          method: "POST",
          // HTTP 헤더는 클라이언트와 서버가 요청 또는 응답으로 부가적인 정보를 전송할 수 있도록 해줍니다
          headers: {
            "Content-Type": "application/json",
          },
          // stringify() 메서드는 배열이나 객체와 같은 JS데이터를 JSON 문자열로 변환합니다.
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
        // returns a promise -> we need 'await' for the promise to resolve
        const responseData = await response.json();
        if (!response.ok) {
          // 200번대 코드가 아닌 경우 에러를 던집니다.
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.login();
      } catch (error) {
        setIsLoading(false);
        setError(error.message || "Something went wrong, please try again.");
      }
    } else {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5001/api/users/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.login();
      } catch (error) {
        setIsLoading(false);
        setError(error.message || "Something went wrong, please try again.");
      }
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {/**isLoading is true, then show the loading spinner*/}
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="name"
              validators={[VALIDATOR_REQUIRE]}
              errorText="Please enter a name"
              onInput={inputHandler}
            />
          )}

          <Input
            element="input"
            id="email"
            type="email"
            label="E-mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password at least 5 chatracters"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>

        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
