import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.svg";
import { useAuth } from "../../hooks";

import { Container } from "./styles";

interface FormValues {
  username: string;
  password: string;
}

type FormObjectValue = "username" | "password";

export function SignUp() {
  const [values, setValues] = useState<FormValues>({
    username: "",
    password: ""
  });
  const { Register } = useAuth();

  function handleChange(prop: FormObjectValue, value: string | number) {
    setValues({ ...values, [prop]: value });
  }

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();

    const { username, password } = values;

    Register({
      username,
      password
    });
  }

  return (
    <Container>
      <header>
        <img src={logoImg} alt="dt money" />
      </header>
      <form onSubmit={handleSubmit}>
        <h2>Criar uma conta</h2>
        <input
          placeholder="Usuário"
          value={values.username}
          onChange={ev => handleChange("username", ev.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={values.password}
          onChange={ev => handleChange("password", ev.target.value)}
        />

        <button type="submit">Fazer o registro</button>
        <Link to="/">Já tenho uma conta</Link>
      </form>
    </Container>
  );
}
