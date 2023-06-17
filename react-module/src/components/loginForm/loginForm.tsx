import { Input } from "components/input";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import { AuthRequest } from "models";
import { AuthService } from "services/authService";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAuthUser } from "store/actions/authUserActions";

import styles from "./styles.module.css";

export interface ILoginFormValues {
  email: string;
  password: string;
}

const initialValues: ILoginFormValues = {
  email: "",
  password: ""
};

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Incorrect email form.")
    .email("Incorrect email form."),
  password: Yup.string()
    .required("Enter your password.")
});

export const LoginForm = () => {
  const history = useHistory();
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (values: ILoginFormValues) => {
    const signinInfo: AuthRequest = {
      email: values.email,
      password: values.password
    };

    const response = await AuthService.login(signinInfo);

    if (response.ok) {
      dispatch(updateAuthUser(response.data ?? null));
      history.push("/");
    } else {
      setError(true);
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={onSubmit}>
      {({ handleChange, setFieldTouched, validateField }) => {
        return (
          <Form className={styles['login']}>
            {error
              ? <div className={styles['signinError']}>Incorrect email\password.</div>
              : <div className={styles['errorPlaceholder']}></div>}
            <Input
              name="email"
              label="Email">
              <Field
                onChange={(e: string | React.ChangeEvent) => {
                  setError(false);
                  handleChange(e);
                }}
                onBlur={() => {
                  setFieldTouched('email', true);
                  validateField('email')
                }}
                name="email"
                className={styles['inputField']} />
            </Input>
            <Input
              name="password"
              label="Password">
              <Field
                onChange={(e: string | React.ChangeEvent) => {
                  setError(false);
                  handleChange(e);
                }}
                onBlur={() => {
                  setFieldTouched('password', true);
                  validateField('password')
                }}
                type="password"
                name="password"
                className={styles['inputField']} />
            </Input>
            <div className={styles['buttons']}>
              <button
                className={styles['submitButton']}
                type="submit">Login</button>
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