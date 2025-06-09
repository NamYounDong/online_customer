import React, { useState } from 'react';
import { request } from '../../js/utils/requests';

const Login = () => {

    const [ loginValues, setLoginValues ] = useState({id:'', password:''});
    const { id, password } = loginValues;
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLoginValues(prev => ({
            ...prev,
            [name] : (type == 'checkbox' ? checked : value)
        }));
    } 


    const login = async () => {
            try {
                const options = {
                    method : 'post',
                    body: loginValues
                }
                const data = await request("/auth/login", options);
                console.log(data);

            } catch (err) {
                alert('로그인 실패')
            }
      }


      // 구글 로그인 (팝업)
    const googleLogin = () => {
        // const popup = window.open(`${import.meta.env.VITE_BACKEND_DOMAIN}/auth/google`, 'googleLoginPopup', 'width=500,height=600');
        location.href = `${import.meta.env.VITE_BACKEND_DOMAIN}/auth/google`;
        // const interval = setInterval(async () => {
        //     try {
        //         const res = await fetch('http://back.aws.com/api/me', {
        //             credentials: 'include',
        //         })
        //         if (res.ok) {
        //             const data = await res.json();
        //             console.log(data);
        //             clearInterval(interval)
        //             popup.close()
        //         }
        //     } catch {}
        // }, 1000);
    }



    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1> 로그인 시스템 (세션 기반)</h1>
            <div>
              <input placeholder="ID (이메일)" name="id" value={id} onChange={handleChange}/><br />
              <input type="password" placeholder="비밀번호" name="password" value={password} onChange={handleChange}/><br />
              <button onClick={login}>일반 로그인</button>
            </div>
  
            <hr />
  
            <div>
              <button onClick={googleLogin}>Google 로그인</button>
            </div>
      </div>
    )
}

export default Login
