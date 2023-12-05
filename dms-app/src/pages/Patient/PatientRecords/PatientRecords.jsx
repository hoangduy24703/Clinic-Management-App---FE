import SliderCategory from "../../../components/Slider/SliderCategory";
import styled from "styled-components";
import { AiOutlineMore } from "react-icons/ai";
import { dummyData } from "./patientDummy";
import Scrollbar from "../../../components/Scrollbar/Scrollbar";
import Button from "../../../components/Button/Button";
import { IoMdAddCircleOutline } from "react-icons/io";

const header = [
  "ID BỆNH NHÂN",
  "TÊN BỆNH NHÂN",
  "NĂM SINH",
  "GIỚI TÍNH",
  "SĐT",
];

const PatientRecords = () => {
  const data = [...dummyData];

  const categoryStyle = {
    cursor: "pointer",
    marginLeft: "90%",
  }

  const content = data?.map((dataItem) => {
    return <TableRow>
      <span >{dataItem.idBenhNhan}</span>
      <span >{dataItem.tenBenhNhan}</span>
      <span >{dataItem.namSinh}</span>
      <span >{dataItem.gioiTinh}</span>
      <span >{dataItem.sdt}</span>
      <span ><AiOutlineMore style={categoryStyle} /></span>
    </TableRow>
  })

  const buttonContent = {
    name: <IoMdAddCircleOutline />,
    title: "Thêm hồ sơ",
  }

  return (<>
    <SliderCategory />
    <PatientRecordsWrapper>
      <div className="patient-record-title">DANH SÁCH HỒ SƠ BỆNH NHÂN</div>
      <Table style={{ width: "1100px", height: "500px", maxWidth: "1200px" }}>
        <TableHead style={{ height: "50px", borderBottom: "2px solid" }}>
          {header?.map((headerItem) => {
            return <span >{headerItem}</span>
          })}
        </TableHead>
        <Scrollbar data={content}/>
      </Table>
      <Button content={buttonContent} bgColor={"var(--bg-blue-color)"} style={{margin: "5vh 200px auto 80%", color:"black"}}/>
    </PatientRecordsWrapper>
  </>);
}

export default PatientRecords;

const PatientRecordsWrapper = styled.div` 
  width: 100%;
  .patient-record-title {
    margin-left: 10%;
    font-weight: 700;
    font-size: 20px;
  }
`

const Table = styled.div`
  background-color: var(--table-bg-color);
  width: 100%;
  margin: 0 auto;
  margin-top: 2%;
`

const TableHead = styled.div`
  display: grid;
  grid-template-columns: repeat(${header.length + 1}, 1fr);
  padding: 10px;
  border-bottom: 1px solid var(--grey-line-color);
  font-weight: 700;
  text-align: center;
`

const TableRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${header.length + 1}, 1fr);
  padding: 10px;
  border-bottom: 1px solid var(--grey-line-color);
  text-align: center;
  font-size: 18px;
`