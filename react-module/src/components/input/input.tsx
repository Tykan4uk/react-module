import { ReactNode } from "react";
import { ErrorMessage, useFormikContext } from "formik";

import styles from "./styles.module.css";

interface InputProps<T> {
  name: keyof T,
  label: string,
  children: ReactNode
}

export function Input<T = string>({ name, label, children }: InputProps<T>) {
  const { errors } = useFormikContext<T>();
  const isValid = !errors[name];

  return (
    <>
      <div className={styles[isValid ? "validBorder" : "invalidBorder"]}>
        <label className={styles["label"]}>{label}</label>
        {children}
      </div >
      {isValid
        ? <div className={styles["errorPlaceholder"]}></div>
        : <ErrorMessage
          name={name.toString()}
          component="div"
          className={styles["error"]}
        />
      }
    </>
  )
}