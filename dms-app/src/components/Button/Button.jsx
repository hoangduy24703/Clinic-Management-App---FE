import styled from "styled-components";

const Button = ({text}) => {
  return (
    <>
      <ButtonWrapper>
        {text}
      </ButtonWrapper>
    </>
  );
}

export default Button;

const ButtonWrapper = styled.button`
  border-radius: 12px;
  background-color: var(--button-primary-color);
  color: white;
  padding: 12px;
  min-width: 100px;
  margin: 0 27%;
  border: none;
  font-weight: 700;
`