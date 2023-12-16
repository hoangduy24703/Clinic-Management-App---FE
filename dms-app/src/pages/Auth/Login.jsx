import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
// import Button from '../../components/Button/Button';
import { postLogin } from '../../api/auth/auth';
import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    setAuth(postLogin({username, password}));
    setUsername("");
    setPassword("");
  }
  const buttonContent = {
    name: "",
    title: "SIGN IN",
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

