import classes from "./Login.module.css";

function Login() {
  return (
    <div className={classes.container}>
      <section className={classes.loginDiv}>
        <p className={classes.logo}>(제작중)Dive into your Ocean</p>
        <form>
          <div className={classes.input}>
            <input type="text"></input>
            <input type="password"></input>
            <button>Login</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
