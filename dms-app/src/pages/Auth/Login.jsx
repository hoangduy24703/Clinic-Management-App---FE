import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
// import Button from '../../components/Button/Button';
import { postLogin } from '../../api/auth/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsLogin } from '../../redux/slice/authSlice';
import { useEffect } from 'react';

const Login = ({setClickLogin}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  async function handleSubmit(event) {
    event.preventDefault();
    const auth = await postLogin(username, password);

    setUsername("");
    setPassword("");
    console.log(auth?.data?.data[0]?.LOAINV);
    if (auth?.data?.isSuccess) {
      localStorage.setItem("isLogin", JSON.stringify(true));
      localStorage.setItem("role", JSON.stringify(auth?.data?.data[0]?.LOAINV));
    }
    else {
      alert("WRONG PHONE NUMBER OR PASSWORD! LOGIN FAILED");
      localStorage.setItem("isLogin", JSON.stringify(false));
      localStorage.setItem("role", null);
    }
    setClickLogin(true);
  }



  return (
    <LoginContainer>
      <Title >DENTAL MANAGEMENT SYSTEM</Title>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>PHONE NUMBER</Form.Label>
            <Form.Control type="text" placeholder=" Enter phone number " onChange={(event) => setUsername(event.target.value)} value={username}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
            <Form.Label>PASSWORD</Form.Label>
            <Form.Control type="password" placeholder=" Enter password" onChange={(event) => setPassword(event.target.value)} value={password}/>
          </Form.Group>
          <Form.Group style={{display: "flex"}}>
            <Button>SIGN IN</Button>
          </Form.Group>
        </Form>
      </FormWrapper>
    </LoginContainer>
  )
}

const LoginContainer = styled.div`
`

const FormWrapper = styled.div`
  width: 400px;
  margin: 10vh auto;
  border-radius: 12px;
  background-color: var(--form-color);
  padding: 80px;
`

const Title = styled.h1`
  text-align: center;
  margin-top: 10vh;
`

const Button = styled.button`
  border: none;
  margin: 0 auto;
  border-radius: 15px;
  padding: 15px;
  background-color: var(--primary-color);
  color: white;
  font-weight: 700;
`
export default Login;

