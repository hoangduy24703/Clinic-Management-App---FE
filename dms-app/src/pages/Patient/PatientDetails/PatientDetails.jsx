import SliderCategory from "../../../components/Slider/SliderCategory";
import styled from "styled-components";
import { FaRegUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getChiTietBenhNhan } from "../../../api/patient/patient";
import { useParams } from "react-router-dom";
import moment from "moment";
import { ButtonGroup } from "../PatientRecords/PatientRecords";

const PatientDetails = () => {
  const {patientId} = useParams();
  const [patientData, setPatientData] = useState({});
  const avatarStyle = {
    padding: "50px", 
    backgroundColor: "var(--bg-grey-2-color)",
    borderRadius: "30%"
  }

  async function loadData() {
    const patientData = await getChiTietBenhNhan(patientId);
    setPatientData(patientData);
  }

  useEffect(() => {
    loadData();
    console.log(patientData)
  }, [patientData?.data?.isSuccess]);

  return (<Wrapper>
    <SliderCategory />
    <PatientDetailsWrapper>
      <PatientLeft>
        <FaRegUser size="300px" style={avatarStyle}/>
        <PatientLeftBody>
          <PatientLeftBodyItems>
            <span>ID BỆNH NHÂN</span>
            <span>:</span>
            <span>{patientData?.data?.data[0]?.IDBENHNHAN}</span>
          </PatientLeftBodyItems>
          <PatientLeftBodyItems>
            <span>TÊN BN</span>
            <span>:</span>
            <span></span>
          </PatientLeftBodyItems>
          <PatientLeftBodyItems>
            <span>ID PHÒNG KHÁM</span>
            <span>:</span>
            <span>{patientData?.data?.data[0]?.IDPHONGKHAM}</span>
          </PatientLeftBodyItems>
          <PatientLeftBodyItems>
            <span>NĂM SINH</span>
            <span>:</span>
            <span>{moment(patientData?.data?.data[0]?.NAMSINHBN).format("DD/MM/YYYY")}</span>
          </PatientLeftBodyItems>
          <PatientLeftBodyItems>
            <span>GIỚI TÍNH</span>
            <span>:</span>
            <span>{patientData?.data?.data[0]?.GIOITINHBN}</span>
          </PatientLeftBodyItems>
          <PatientLeftBodyItems>
            <span>TUỔI</span>
            <span>:</span>
            <span>{patientData?.data?.data[0]?.TUOI}</span>
          </PatientLeftBodyItems>
          <PatientLeftBodyItems>
            <span>SĐT</span>
            <span>:</span>
            <span>{patientData?.data?.data[0]?.SODIENTHOAIBN}</span>
          </PatientLeftBodyItems>
          <PatientLeftBodyItems>
            <span>EMAIL</span>
            <span>:</span>
            <span>{patientData?.data?.data[0]?.EMAIL}</span>
          </PatientLeftBodyItems>
          <PatientLeftBodyItems>
            <span>ĐỊA CHỈ</span>
            <span>:</span>
            <span>{patientData?.data?.data[0]?.DIACHI}</span>
          </PatientLeftBodyItems>
          <PatientLeftBodyItems>
            <span>BSMĐ</span>
            <span>:</span>
            <span>{patientData?.data?.data[0]?.BACSIMD}</span>
          </PatientLeftBodyItems>
        </PatientLeftBody>
      </PatientLeft>
      <PatientRight>
        <PatientRightItems>
          <span>THÔNG TIN TỔNG QUAN</span>
          <input className="box-item" value={patientData?.data?.data[0]?.TTTONGQUAN} />
        </PatientRightItems>
        <PatientRightItems>
          <span>TÌNH TRẠNG DỊ ỨNG</span>
          <input className="box-item" value={patientData?.data?.data[0]?.TINHTRANGDIUNG}/>
        </PatientRightItems>
        <PatientRightItems>
          <span>THUỐC CHỐNG CHỈ ĐỊNH</span>
          <input className="box-item" value={patientData?.data?.data[0]?.THUOCCHONGCHIDINH} />
        </PatientRightItems>
      </PatientRight>
      <ButtonGroup style={{bottom: "-10px"}}>
        <Button style={{right: "150px", backgroundColor: "var(--btn-color-3)"}}>CHỈNH SỬA</Button>
        <Button style={{right: "0", backgroundColor: "var(--btn-color-2)"}}>XÓA</Button>
      </ButtonGroup>
    </PatientDetailsWrapper>    
  </Wrapper>);
}

export default PatientDetails;

const Wrapper = styled.div`
  margin-bottom: 5vw;
`

const PatientDetailsWrapper = styled.div`
  width: 70%;
  height: 650px;
  background-color: var(--bg-blue-color);
  margin: 1vh 15vw;
  display: flex;
  position: relative;
`

const PatientLeft = styled.div`
  width: 45%;
  background-color: var(--bg-blue-2-color);
  height: 100%;
  padding: 0 1vw;
`

const PatientRight = styled.div`
  width: 55%;
  position: relative;
`

const PatientLeftBody = styled.div`
  
`

const PatientLeftBodyItems = styled.div`
  display: grid;
  grid-template-columns: 150px 10px 200px ;
  font-weight: 700;
  font-size: 15px;

  @media screen and (max-width: 1280px) {
    font-size: 15px;
  }
`

const PatientRightItems = styled.div`
  margin: 5vh;
  display: flex;
  flex-direction: column;
  font-weight: 700;

  .box-item {
    border: none;
    padding: 2vw;
    background-color: var(--table-bg-color);
    font-weight: 600;
    border-radius: 10px;
    box-shadow: 2px 5px RGBA(30, 68, 78, 0.3);
    margin-top: 0.5vh;
  }
`

const Button = styled.button`
  position: absolute;
  padding: 8px;
  border-radius: 12px;
  border: none;
`