import React , {useState, useEffect}from 'react';
import {Button} from '../../Button';
import {useHistory} from 'react-router-dom';
import './Login.css'

function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const history=useHistory();
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            history.push("/menu")
        }
    }, [])
    async function login(){
        let item={email,password};
        let result=await fetch('/api/users/',{
            method:'POST',
            headers:{
                "Content-type":'application/json',
                "Accept":'application/json'
            },
            body:JSON.stringify(item)
        });
        result=await result.json();
        localStorage.setItem("user-info",JSON.stringify(result))
        history.push("/menu")
    }
    return(
        <div className='footer-container1'>
        <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Visit our site to get the exclusive membership and recieve many offers and discount
        </p>
        <p className='footer-subscription-text'>
          You can Logout at any time.
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              value ={email}
              onchange={(e)=>setEmail(e.target.value)}
              type='email'
              placeholder='Your Email'
            />
             <input
              className='footer-input'
              name='password'
              value ={password}
              onchange={(e)=>setPassword(e.target.value)}
              type='password'
              placeholder='Your password'
            />
            <Button onclick ={login}buttonStyle='btn--outline'>Login </Button>
          </form>
        </div>
      </section>
         <br>
         </br>
       </div>
    );
}

export default Login;
