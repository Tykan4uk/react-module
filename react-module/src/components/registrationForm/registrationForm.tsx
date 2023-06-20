import { Input } from "components/input";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import { AuthRequest } from "models";
import { AuthService } from "services/authService";
import { useState } from "react";

import styles from "./styles.module.css";

export interface IRegFormValues {
  email: string;
  password: string;
}

const initialValues: IRegFormValues = {
  email: "",
  password: ""
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Incorrect email form.")
    .email("Incorrect email form."),
  password: Yup.string()
    .required("Password must contain minimum eight characters, at least one letter and one number.")
    .matches(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"),
      "Password must contain minimum eight characters, at least one letter and one number."),
});

export const RegistrationForm = () => {
  const history = useHistory();
  const [error, setError] = useState(false);

  const onSubmit = async (values: IRegFormValues) => {
    const signinInfo: AuthRequest = {
      email: values.email,
      password: values.password
    };

    const response = await AuthService.signin(signinInfo);

    response.ok ? history.push("/") : setError(true);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={onSubmit}>
      {({ validateField, setFieldTouched }) => {
        return (
          <Form className={styles['registration']}>
            {error
              ? <div className={styles['signinError']}>User with this email already exist.</div>
              : <div className={styles['errorPlaceholder']}></div>}
            <Input
              name="email"
              label="Email">
              <Field
                name="email"
                className={styles['inputField']}
                onBlur={() => {
                  setFieldTouched('email', true);
                  validateField('email')
                }} />
            </Input>
            <Input
              name="password"
              label="Password">
              <Field
                type="password"
                name="password"
                className={styles['inputField']}
                onBlur={() => {
                  setFieldTouched('password', true);
                  validateField('password')
                }} />
            </Input>
            <div className={styles['buttons']}>
              <button
                className={styles['submitButton']}
                type="submit">Signin</button>
              <button
                className={styles['homeButton']}
                type="button"
                onClick={() => history.push("/")}>Back home</button>
            </div>
          </Form>
        );
      }}
    </Formik>
  )
}