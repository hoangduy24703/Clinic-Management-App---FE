import SliderCategory from "../../../components/Slider/SliderCategory";
import styled from "styled-components";
import Button from "../../../components/Button/Button";
import { FaRegUser } from "react-icons/fa";

const dummy = {
  idBenhNhan: "BN001",
  tenBenhNhan: "Nguyễn Văn A",
  gioiTinh: 'Nam',
  diaChi: "Tân Bình - TPHCM",
  sdt: "0123456789",
  email: "nva21@gmail.com",
  namSinh: "20/11/2003",
  tuoi: 20,
}

const PatientDetails = () => {
  const avatarStyle = {
    padding: "50px", 
    backgroundColor: "var(--bg-grey-2-color)",
    borderRadius: "30%"
  }

  return (<>
    <SliderCategory />
    <PatientDetailsWrapper>
      <PatientLeft>
        <FaRegUser size="300px" style={avatarStyle}/>
        <PatientLeftBody>
          <span style={{display: "flex"}}>
            <span>ID</span> : <span>{dummy.idBenhNhan}</span>
          </span>
          <span style={{display: "flex"}}>
            <span>HỌ VÀ TÊN</span> : <span>{dummy.tenBenhNhan}</span>
          </span>
          <span style={{display: "flex"}}>
            <span>GIỚI TÍNH</span> : <span>{dummy.gioiTinh}</span>
          </span>
          <span style={{display: "flex"}}>
            <span>ĐỊA CHỈ</span> : <span>{dummy.diaChi}</span>
          </span>
          <span style={{display: "flex"}}>
            <span>SĐT</span> : <span>{dummy.sdt}</span>
          </span>
          <span style={{display: "flex"}}>
            <span>EMAIL</span> : <span>{dummy.email}</span>
          </span>
          <span style={{display: "flex"}}>
            <span>NĂM SINH</span> : <span>{dummy.namSinh}</span>
          </span>
          <span style={{display: "flex"}}>
            <span>TUỔI</span> : <span>{dummy.tuoi}</span>
          </span>
        </PatientLeftBody>
      </PatientLeft>
      <PatientRight></PatientRight>
    </PatientDetailsWrapper>    
  </>);
}

export default PatientDetails;

const PatientDetailsWrapper = styled.div`
  width: 100%;
`

const PatientLeft = styled.div`
  width: 30%;
  background-color: var(--bg-blue-2-color);
  height: 100%;
`

const PatientRight = styled.div`
  width: 70%;
`

const PatientLeftBody = styled.div`
  
`