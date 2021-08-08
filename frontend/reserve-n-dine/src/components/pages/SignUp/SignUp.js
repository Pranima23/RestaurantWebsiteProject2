import React , {useState}from 'react';
 import {Button} from '../../Button';
import {useHistory} from 'react-router-dom';
import './Signup.css'

function Register() {
  const [name, setName]=useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [repassword, setRepassword]=useState("");
  const history=useHistory("");

  async function SignUp(){
    let item =(name,email,password,repassword)

    let result = await  fetch("http://127.0.0.1:8000/api/users/",{
    method:"POST",
    body:JSON.stringify(item),
    headers:{
      "Content-type":'application/json',
      "Accept":'application/json'
    }
  })
    result=await result.json()
    localStorage.setItem("item", JSON.stringify(result))
    history.pushState('/');
  }
  

  return (
      <div className='footer-container1'>
      <section className='footer-subscription'>
      <p className='footer-subscription-heading'>
        Register to our site to get the exclusive membership and recieve many offers and discount
      </p>
      <br/>
      <p className='footer-subscription-text'>
        You can Logout at any time.
      </p>
      <div className='input-areas'>
        <form>
        <input
            className='footer-input'
            name='name'
            value ={name}
            onChange={(e)=>setName(e.target.value)}
            type='text'
            placeholder='Your Name'
          />
          <input
            className='footer-input'
            name='email'
            value ={email}
            onChange={(e)=>setEmail(e.target.value)}
            type='email'
            placeholder='Your Email'
          />
           <input
            className='footer-input'
            name='password'
            value ={password}
            onChange={(e)=>setPassword(e.target.value)}
            type='password'
            placeholder='Your password'
          />
           <input
            className='footer-input'
            name='Confirm Password'
            value ={repassword}
            onChange={(e)=>setRepassword(e.target.value)}
            type='password'
            placeholder='Confirm Password'
          />
          <Button onclick={SignUp} buttonStyle='btn--outline'>SignUp</Button>
          <br/>
        </form>
        <br/>
        <p className='footer-subscription-text'>
            Thank you for Signing Up.
        </p>
      </div>
    </section>
       <br>
       </br>
     </div>
  );
}

export default Register;