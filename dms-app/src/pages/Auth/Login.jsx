import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // => handle api
    setUsername("");
    setPassword("");
  }
  
  return (
    <LoginContainer>
      <Title >DENTAL MANAGEMENT SYSTEM</Title>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder=" Enter username " onChange={(event) => setUsername(event.target.value)} value={username}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder=" Enter password" onChange={(event) => setPassword(event.target.value)} value={password}/>
          </Form.Group>
          <Form.Group>
            <Button text={"SIGN IN"}/>
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


export default Login;

