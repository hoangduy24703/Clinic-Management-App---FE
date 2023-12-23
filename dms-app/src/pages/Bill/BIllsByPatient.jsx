import { Table, TableHead, TableRow, Dropdown, DropdownItem, DropdownWrapper } from "../Patient/PatientRecords/PatientRecords";
import SliderCategory from "../../components/Slider/SliderCategory";
import Scrollbar from "../../components/Scrollbar/Scrollbar";
import Search from "../../components/Search/Search";
import styled from "styled-components";
import { AiOutlineMore } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getHoaDon } from "../../api/hoadon/hoadon";
import BillsDetail from "./BillsDetail/BillsDetail";

const header = [
  "ID HÓA ĐƠN",
  "TỔNG TIỀN",
  "NGÀY GIAO DỊCH",
  "TÊN BỆNH NHÂN",
  "ID BUỔI ĐIỀU TRỊ"
];

const BillsByPatient = () => {
  // const data = [...dummyData];'
  // const [data, setData] = useState([]);
  // const [isOpen, setIsOpen] = useState(false);
  // // const [isOpenPopupForm, setIsOpenPopupForm] = useState(false);
  // const [selectedItem, setSelectedItem] = useState();
  // const [searchTerm, setSearchTerm] = useState('');
  // const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPopupBill, setIsOpenPopupBill] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const categoryStyle = {
    cursor: "pointer",
    marginLeft: "80%",
  }

  const handleDropdownOpen = (value) => {
    setSelectedItem(value.IDHOADON);
    setIsOpen(!isOpen);
  }

  const handleOnViewBill = () => {
    setIsOpenPopupBill(true);
  }
  const handleOnNavigate = () => {
    // navigate("/patient-records/:idPatient");
  }

  const handleDelete = () => {
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Search", searchTerm);
    const result = await getHoaDon(searchTerm);
    console.log(result);
    setData(result?.data?.data?.listhoadon);
  }
  

  const content = data?.map((dataItem, index) => {
    return <TableRow key={index}>
      <span>{dataItem.IDHOADON}</span>
      <span>{dataItem.TONGTIEN}</span>
      <span>{moment(dataItem.NGAYGIAODICH).format("DD/MM/YYYY")}</span>
      <span>{dataItem.TENBN}</span>
      <span>{dataItem.IDBUOIDIEUTRI}</span>
      <DropdownWrapper>
        <AiOutlineMore style={categoryStyle} onClick={() => handleDropdownOpen(dataItem)}/>
        {isOpen && selectedItem === dataItem.IDHOADON && 
        <Dropdown>
          <DropdownItem onClick={handleOnViewBill}>Xem hóa đơn</DropdownItem>
          {/* <DropdownItem onClick={handleOnNavigate}>Sửa hóa đơn</DropdownItem>
          <DropdownItem onClick={handleDelete}>Xóa buổi điều trị</DropdownItem> */}
        </Dropdown>}
      </DropdownWrapper>
    </TableRow>
  })


  return (<div style={{marginBottom: "5vh"}}>
    <SliderCategory />
    <div style={{display: "flex"}}>
      <Search onSubmit={handleSubmit} content={" Nhập ID bệnh nhân "} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    </div>
    <BillWrapper>
      {/* <div className="patient-record-title">DANH SÁCH HỒ SƠ BỆNH NHÂN</div> */}
      {isOpenPopupBill && <BillsDetail title={"HÓA ĐƠN " + selectedItem} ID={selectedItem} setIsOpenPopup={setIsOpenPopupBill}/>}
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
    </BillWrapper>
  </div>);
}

export default BillsByPatient;

const BillWrapper = styled.div`
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