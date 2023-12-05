import styled from "styled-components";

const Button = ({content, bgColor, style}) => {
  const buttonStyle = {
    backgroundColor: `${bgColor}`,
    margin: style.margin,
    color: style.color,
  }

  return (
    <>
      <ButtonWrapper style={buttonStyle}>
        {content.name} {content.title}
      </ButtonWrapper>
    </>
  );
}

export default Button;

const ButtonWrapper = styled.button`
  border-radius: 12px;
  color: white;
  padding: 12px;
  min-width: 100px;
  border: none;
  font-weight: 700;
  text-align: center;
  align-items: center;
`