import { Table, TableRow, TableHead, Dropdown, DropdownItem, DropdownWrapper } from "../../Patient/PatientRecords/PatientRecords";
import SliderCategory from "../../../components/Slider/SliderCategory";
import Scrollbar from "../../../components/Scrollbar/Scrollbar";
import styled from "styled-components";
import { AiOutlineMore } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuEye } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import { dummyData } from "../../Patient/PatientRecords/patientDummy";
import { useNavigate } from "react-router-dom";

const header = [
  "ID BỆNH NHÂN",
  "BUỔI ĐIỀU TRỊ",
  "NGÀY ĐIỀU TRỊ",
  "BÁC SĨ ĐIỀU TRỊ",
  "KẾ HOẠCH",
];

const ByPlan = () => {
  const data = [...dummyData];
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPopupForm, setIsOpenPopupForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const navigate = useNavigate();

  const categoryStyle = {
    cursor: "pointer",
    marginLeft: "80%",
  }

  const viewContent = {
    name: <LuEye size="20px"/>,
    title: "",
  }

  const addContent = {
    name: <IoMdAddCircleOutline size="20px"/>,
    title: "",
  }

  const deleteContent = {
    name: <MdDeleteOutline size="20px"/>,
    title: "",
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
    <ByPlanWrapper>
      {/* {isOpenPopupForm && <PopupForm handleClosePopp={handleCreatePatient}/>} */}
      <div className="patient-record-title">DANH SÁCH HỒ SƠ BỆNH NHÂN</div>
      <Table style={{ width: "80%", height: "60%", maxWidth: "1200px" }}>
        <TableHead style={{ height: "50px", borderBottom: "2px solid" }}>
          {header?.map((headerItem) => {
            return <span >{headerItem}</span>
          })}
        </TableHead>
        <Scrollbar data={content} />
      </Table>
      <ButtonGroup style={{display: "flex"}}>
          <Button style={{backgroundColor: "var(--btn-color-3)"}}><IoMdAddCircleOutline size="20px"/> TẠO MỚI BIỂU ĐIỆU TR</Button>
          <Button style={{backgroundColor: "var(--btn-color-1)"}}><IoMdAddCircleOutline size="20px"/></Button>
          <Button style={{backgroundColor: "var(--btn-color-2)"}}><MdDeleteOutline size="20px"/></Button>
        </ButtonGroup>
    </ByPlanWrapper>
  </>);
}

export default ByPlan;

const ByPlanWrapper = styled.div`
  width: 100%;
  .prescription-title {
    margin-left: 10%;
    font-weight: 700;
    font-size: 20px;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 5vh 20%;
  margin: 0 20%;
  gap: 20px;
`

const Button = styled.button`
  padding: 10px;
  border-radius: 15px;
  width: 200px;
  border: none;
  padding: 10px;
  min-width: 100px;
`