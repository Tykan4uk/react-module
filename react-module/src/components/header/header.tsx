import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAuthUser, useAuthUserSelector } from "store";
import {
  LOGIN_ROUTE,
  MUSIC_LIST_ROUTE,
  REGISTRATION_ROUTE,
  UPLOADING_ROUTE
} from "consts";

import styles from "./header.module.css"
import { removeAuthUser } from "store/actions/authUserActions";

export const Header = () => {
  const dispatch = useDispatch();
  const authUser = useAuthUserSelector();

  useEffect(() => {
    dispatch(getAuthUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <header className={styles['header']}>
      <div className={styles['navigation-items']}>
        <div className={styles['header-logo']}></div>
        <NavLink to={MUSIC_LIST_ROUTE} className={styles['navigation-item']}>Music list</NavLink>
        {authUser.user?.role.roleName === "Admin"
          && <NavLink to={UPLOADING_ROUTE} className={styles['navigation-item']}>Uploading</NavLink>}
      </div>
      {!authUser.user && <div className={styles['auth-items']}>
        <NavLink to={LOGIN_ROUTE} className={styles['auth-item']}>Log in</NavLink>
        <NavLink to={REGISTRATION_ROUTE} className={styles['auth-item']}>Sign in</NavLink>
      </div>}
      {authUser.user && <div className={styles['auth-items']}>
        <button
          className={styles['auth-item']}
          onClick={() => dispatch(removeAuthUser())}>Log out</button>
      </div>}
    </header>
  )
}