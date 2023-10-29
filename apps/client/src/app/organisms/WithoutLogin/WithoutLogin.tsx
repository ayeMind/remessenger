import { useState } from "react";
import styles from "./WithoutLogin.module.scss"

export default function WithoutLogin() {

    const [login, setLogin] = useState("")

    function logInClick(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault()
        console.log(login);
    }

  return (
    <div className={styles["page"]}>
        <div className={styles["popup"]}>
            <h2 className={styles["title"]}>Вход</h2>
            <form className={styles["login-form"]}>
                <input type="email" placeholder="Input email" className={styles["email-input"]} value={login} onChange={(e) => setLogin(e.target.value)}/>
                <button type="submit" onClick={logInClick}>Log In</button>
            </form>
        </div>
    </div>
  )
}
