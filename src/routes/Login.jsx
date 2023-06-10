import classes from './Login.module.css';

function Login(){
    
    
    return(
    <div className={classes.container}>
        <section className={classes.loginDiv}>
    <p className={classes.logo}>Dive into your Ocean</p>
    <form>
    <input type='text'></input><br/>
    <input type='password'></input>
    </form>
    </section>
    </div>
    )
}


export default Login;