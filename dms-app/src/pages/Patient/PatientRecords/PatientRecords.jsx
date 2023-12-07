import SliderCategory from "../../../components/Slider/SliderCategory";
import styled from "styled-components";
import { AiOutlineMore } from "react-icons/ai";
import { dummyData } from "./patientDummy";
import Scrollbar from "../../../components/Scrollbar/Scrollbar";
import Button from "../../../components/Button/Button";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupForm from "../PopupForm/PopupForm";

const header = [
  "ID BỆNH NHÂN",
  "TÊN BỆNH NHÂN",
  "NĂM SINH",
  "GIỚI TÍNH",
  "SĐT",
];

const PatientRecords = () => {
  const data = [...dummyData];
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPopupForm, setIsOpenPopupForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const navigate = useNavigate();

  const categoryStyle = {
    cursor: "pointer",
    marginLeft: "80%",
  }

  const buttonContent = {
    name: <IoMdAddCircleOutline />,
    title: "Thêm hồ sơ",
  }

  const handleDropdownOpen = (value) => {
    setSelectedItem(value.idBenhNhan);
    setIsOpen(!isOpen);
  }

  const handleOnNavigatePatient = () => {
    navigate("/patient-records/:idPatient");
  }

  const handleDeletePatient = () => {
    
  }

  const handleCreatePatient = () => {
    setIsOpenPopupForm(!isOpenPopupForm);
  }

  const content = data?.map((dataItem, index) => {
    return <TableRow key={index}>
      <span>{dataItem.idBenhNhan}</span>
      <span>{dataItem.tenBenhNhan}</span>
      <span>{dataItem.namSinh}</span>
      <span>{dataItem.gioiTinh}</span>
      <span>{dataItem.sdt}</span>
      <DropdownWrapper>
        <AiOutlineMore style={categoryStyle} onClick={() => handleDropdownOpen(dataItem)}/>
        {isOpen && selectedItem === dataItem.idBenhNhan && 
        <Dropdown>
          <DropdownItem onClick={handleOnNavigatePatient}>Xem thông tin hồ sơ</DropdownItem>
          <DropdownItem onClick={handleOnNavigatePatient}>Sửa thông tin hồ sơ</DropdownItem>
          <DropdownItem onClick={handleDeletePatient}>Xóa hồ sơ bệnh nhân</DropdownItem>
        </Dropdown>}
      </DropdownWrapper>
    </TableRow>
  })


  return (<>
    <SliderCategory />
    <PatientRecordsWrapper>
      {isOpenPopupForm && <PopupForm handleClosePopup={handleCreatePatient}/>}
      <div className="patient-record-title">DANH SÁCH HỒ SƠ BỆNH NHÂN</div>
      <Table style={{ width: "80%", height: "50%", maxWidth: "1200px" }}>
        <TableHead style={{ height: "50px", borderBottom: "2px solid" }}>
          {header?.map((headerItem) => {
            return <span >{headerItem}</span>
          })}
        </TableHead>
        <Scrollbar data={content} />
      </Table>
      <ButtonGroup>
        <Button
          content={buttonContent}
          bgColor={"var(--bg-blue-color)"}
          style={{ margin: "5vh 0 5vh 65%", color: "black" }}
          onClick={handleCreatePatient}
        />
      </ButtonGroup>
    </PatientRecordsWrapper>
  </>);
}

export default PatientRecords;

const PatientRecordsWrapper = styled.div` 
  width: 100%;
  position: relative;
  .patient-record-title {
    margin-left: 15%;
    font-weight: 700;
    font-size: 25px;
  }
`

export const Table = styled.div`
  background-color: var(--table-bg-color);
  width: 100%;
  margin: 0 auto;
  margin-top: 2%;
`

export const TableHead = styled.div`
  display: grid;
  grid-template-columns: repeat(${header.length + 1}, 1fr);
  padding: 10px;
  border-bottom: 1px solid var(--grey-line-color);
  font-weight: 700;
  text-align: center;
  background-color: var(--bg-blue-color); 
`

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: repeat(${header.length + 1}, 1fr);
  padding: 10px;
  border-bottom: 1px solid var(--grey-line-color);
  text-align: center;
  font-size: 18px;
`

export const ButtonGroup = styled.div`
  width: 100%;
`

export const DropdownWrapper = styled.div`
  position: relative;
`

export const Dropdown = styled.div`
  position: absolute;
  top: 0;
  right: 15%;
  border: none;
  width: 100%;
  background-color: var(--dropdown-bg-color);
  text-align: left;
  z-index: 1;
`

export const DropdownItem = styled.div`
  padding: 10px;
  font-size: 15px;
  cursor: pointer;  
  border-bottom: 1px solid;

  &:hover {
    background-color: var(--dropdown-hover-bg-color);
  }
`