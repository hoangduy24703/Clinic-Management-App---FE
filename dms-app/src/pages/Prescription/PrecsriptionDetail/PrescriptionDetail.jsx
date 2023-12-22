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
  "ID ĐƠN THUỐC",
  "NGÀY CẤP",
  "ID BUỔI ĐIỀU TRỊ",
  "TÊN BỆNH NHÂN",
  "GIÁ",
];

const PrescriptionDetail = () => {
  // const data = [...dummyData];'
  const [data, setData] = useState([]);
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
    setSelectedItem(value.IDDONTHUOC);
    setIsOpen(!isOpen);
  }

  const handleOnNavigate = () => {
    navigate("/patient-records/:idPatient");
  }

  const handleDelete = () => {
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Search", searchTerm);
    const result = await getListBDTbyID(searchTerm);
    console.log(result);
    console.log(result?.data?.data?.listBDT)
    setData(result?.data?.data?.listBDT);
  }
  

  const content = data?.map((dataItem, index) => {
    return <TableRow key={index}>
      <span>{dataItem.IDDONTHUOC}</span>
      <span>{moment(dataItem.NGAYCAP).format("DD/MM/YYYY")}</span>
      <span>{dataItem.IDBUOIDIEUTRI}</span>
      <span>{dataItem.TENBN}</span>
      <span>{dataItem.GIA}</span>
      <DropdownWrapper>
        <AiOutlineMore style={categoryStyle} onClick={() => handleDropdownOpen(dataItem)}/>
        {isOpen && selectedItem === dataItem.IDDONTHUOC && 
        <Dropdown>
          <DropdownItem onClick={handleOnNavigate}>Xem buổi điều trị</DropdownItem>
          <DropdownItem onClick={handleOnNavigate}>Sửa buổi điều trị</DropdownItem>
          <DropdownItem onClick={handleDelete}>Xóa buổi điều trị</DropdownItem>
        </Dropdown>}
      </DropdownWrapper>
    </TableRow>
  })


  return (<div style={{marginBottom: "5vh"}}>
    <SliderCategory />
    <div style={{display: "flex"}}>
      <Search onSubmit={handleSubmit} content={" Nhập mã đơn thuốc "} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    </div>  
    <PrescriptionDetailWrapper>
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
    </PrescriptionDetailWrapper>
  </div>);
}

export default PrescriptionDetail;

const PrescriptionDetailWrapper = styled.div`
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