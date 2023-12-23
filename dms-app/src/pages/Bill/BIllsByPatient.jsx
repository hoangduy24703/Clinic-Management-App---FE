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


const header = [
  "ID THUỐC",
  "TÊN THUỐC",
  "SỐ LƯỢNG",
  "GIÁ",
];

const Bills = () => {
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
    setSelectedItem(value.IDTHUOC);
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
    const result = await getHoaDon(searchTerm);
    console.log(result);
    // setData(result?.data?.data?.listBDT);
  }
  

  const content = data?.map((dataItem, index) => {
    return <TableRow key={index}>
      <span>{dataItem.IDTHUOC}</span>
      <span>{dataItem.TENTHUOC}</span>
      <span>{dataItem.SOLUONG}</span>
      <span>{dataItem.GIA}</span>
      <DropdownWrapper>
        <AiOutlineMore style={categoryStyle} onClick={() => handleDropdownOpen(dataItem)}/>
        {isOpen && selectedItem === dataItem.IDTHUOC && 
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
      <Search onSubmit={handleSubmit} content={" Nhập mã thuốc "} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    </div>
    <BillWrapper>
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
    </BillWrapper>
  </div>);
}

export default Bills;

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