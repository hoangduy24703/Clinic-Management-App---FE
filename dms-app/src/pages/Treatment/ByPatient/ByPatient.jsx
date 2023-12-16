import { Table, TableRow, TableHead, Dropdown, DropdownItem, DropdownWrapper } from "../../Patient/PatientRecords/PatientRecords";
import SliderCategory from "../../../components/Slider/SliderCategory";
import Scrollbar from "../../../components/Scrollbar/Scrollbar";
import styled from "styled-components";
import { AiOutlineMore } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LuEye } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {dummyData} from "../../Patient/PatientRecords/patientDummy";
import Search from "../../../components/Search/Search";
import { getListBDTbyID } from '../../../api/dieutri/dieutri';
import moment from "moment";


const header = [
  "ID BỆNH NHÂN",
  "BUỔI ĐIỀU TRỊ",
  "KẾ HOẠCH ĐIỀU TRỊ",
  "BÁC SĨ ĐIỀU TRỊ",
  "NGÀY ĐIỀU TRỊ",
];

const ByPatient = () => {
  // const data = [...dummyData];'
  const [dataPatient, setDataPatient] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // const [isOpenPopupForm, setIsOpenPopupForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const categoryStyle = {
    cursor: "pointer",
    marginLeft: "80%",
  }

  const handleDropdownOpen = (value) => {
    setSelectedItem(value.IDBUOIDIEUTRI);
    setIsOpen(!isOpen);
  }

  const handleOnNavigatePatient = () => {
    navigate("/patient-records/:idPatient");
  }

  const handleDeletePatient = () => {
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Search", searchTerm);
    const result = await getListBDTbyID(searchTerm);
    console.log(result);
    console.log(result?.data?.data?.listBDT)
    setDataPatient(result?.data?.data?.listBDT);
  }
  

  const content = dataPatient?.map((dataItem, index) => {
    return <TableRow key={index}>
      <span>{dataItem.BNKHAMLE}</span>
      <span>{dataItem.IDBUOIDIEUTRI}</span>
      <span>{dataItem.KEHOACHDT}</span>
      <span>{dataItem.KHAMCHINH}</span>
      <span>{moment(dataItem.NGAYDT).format("DD/MM/YYYY")}</span>
      <DropdownWrapper>
        <AiOutlineMore style={categoryStyle} onClick={() => handleDropdownOpen(dataItem)}/>
        {isOpen && selectedItem === dataItem.IDBUOIDIEUTRI && 
        <Dropdown>
          <DropdownItem onClick={handleOnNavigatePatient}>Xem buổi điều trị</DropdownItem>
          <DropdownItem onClick={handleOnNavigatePatient}>Sửa buổi điều trị</DropdownItem>
          <DropdownItem onClick={handleDeletePatient}>Xóa buổi điều trị</DropdownItem>
        </Dropdown>}
      </DropdownWrapper>
    </TableRow>
  })


  return (<div style={{marginBottom: "5vh"}}>
    <SliderCategory />
    <div style={{display: "flex"}}>
      <Search onSubmit={handleSubmit} content={" Nhập mã bệnh nhân "} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    </div>
    <ByPatientWrapper>
      {/* <div className="patient-record-title">DANH SÁCH HỒ SƠ BỆNH NHÂN</div> */}
      <Table style={{ width: "80%", height: "50%", maxWidth: "1200px" }}>
        <TableHead style={{ height: "50px", borderBottom: "2px solid" }}>
          {header?.map((headerItem) => {
            return <span >{headerItem}</span>
          })}
        </TableHead>
        <Scrollbar data={content} />
        <ButtonGroup>
          {/* <Button onClick={handleCreatePatient}>{buttonContent.name} {buttonContent.title}</Button> */}
        </ButtonGroup>
      </Table>
    </ByPatientWrapper>
  </div>);
}

export default ByPatient;

const ByPatientWrapper = styled.div`
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

// const Button = styled.button`
//   padding: 10px;
//   border-radius: 15px;
//   width: 200px;
//   border: none;
//   padding: 10px;
//   min-width: 100px;
// `