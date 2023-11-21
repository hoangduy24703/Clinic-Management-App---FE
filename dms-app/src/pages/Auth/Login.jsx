import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import Button from '../../components/Button/Button';

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <LoginContainer>
      <FormWrapper>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Username</Form.Label>
            <Form.Control type="email" placeholder=" Enter username " />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder=" Enter password" />
          </Form.Group>
          <Form.Group>
            <Button text={"SIGN IN"}/>
          </Form.Group>
        </Form>
      </FormWrapper>
    </LoginContainer>
  )
}

const LoginContainer = styled.div``

const FormWrapper = styled.div`
  width: 400px;
  margin: 10% auto;
  border-radius: 12px;
  background-color: var(--form-color);
  padding: 80px;

`
export default Login;