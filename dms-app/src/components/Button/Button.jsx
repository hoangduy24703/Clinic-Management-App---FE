import styled from "styled-components";

const Button = ({content, bgColor, style, onClick}) => {
  const buttonStyle = {
    backgroundColor: `${bgColor}`,
    margin: style.margin,
    color: style.color,
    padding: style.padding,
    boxShadow: style.boxShadow,
  }

  return (
    <>
      <ButtonWrapper style={buttonStyle} onClick={onClick}>
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
  min-width: 200px;
  border: none;
  font-weight: 700;
  text-align: center;
  align-items: center;
`