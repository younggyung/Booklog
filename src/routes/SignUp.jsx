import { useState } from 'react';
import classes from './Signup.module.css'

function SignUp(){

 const [id, setId] = useState();
 const [password, setPassword] = useState();
 const [email, setEmail] = useState();



 return (
  <div className={classes.div}>
  <h3>회원가입</h3>
  <form>
   <div className={classes.inputs}>
   <input type='text' placeholder='아이디' onChange={(e)=>{setId(e.target.value)}}required />
   <input type='password' placeholder='비밀번호' onChange={(e)=>{setPassword(e.target.value)}} required/>
   <input type='email' placeholder='user@email.com' onChange={(e)=>{setEmail   (e.target.value)}} required/>
   <button>완료</button>
   </div>
  </form>
  </div>
 )}
export default SignUp;