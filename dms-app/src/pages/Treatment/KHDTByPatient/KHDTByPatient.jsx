import { Table, TableRow, TableHead, Dropdown, DropdownItem, DropdownWrapper } from "../../Patient/PatientRecords/PatientRecords";
import SliderCategory from "../../../components/Slider/SliderCategory";
import Scrollbar from "../../../components/Scrollbar/Scrollbar";
import styled from "styled-components";
import { AiOutlineMore } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../../components/Search/Search";
import { getListKHbyID } from '../../../api/dieutri/dieutri';
import KHDTDetail from "../KHDTDetail/KHDTDetail";
import moment from "moment";

const header = [
  "ID ĐIỀU TRỊ",
  "ID BỆNH NHÂN", 
  "BS PHỤ TRÁCH",
  "TRẠNG THÁI",
  "MÔ TẢ",
  "GHI CHÚ",
];

const KHDTByPatient = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpenPopupKHDT, setIsOpenPopupKHDT] = useState(false);

  const categoryStyle = {
    cursor: "pointer",
    marginLeft: "80%",
  }

  const buttonContent = {
    name: "",
    title: "THÊM MỚI KẾ HOẠCH"
  }

  const handleDropdownOpen = (value) => {
    setSelectedItem(value.IDDIEUTRI);
    setIsOpen(!isOpen);
  }

  const handleOnView = () => {
    // navigate("/patient-records/:idPatient");
    setIsOpenPopupKHDT(true);
  }

  const handleDelete = () => {
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Search", searchTerm);
    const result = await getListKHbyID(searchTerm);
    setData(result?.data?.data?.listBDT);
  }
  

  const content = data?.map((dataItem, index) => {
    return <CustomTableRow key={index}>
      <span>{dataItem.IDDIEUTRI}</span>
      <span>{dataItem.BENHNHAN}</span>
      <span>{dataItem.BSPHUTRACH}</span>
      <span>{dataItem.TRANGTHAI}</span>
      <span>{dataItem.MOTAKHDT}</span>
      <span>{dataItem.GHICHUKHDT}</span>
      <DropdownWrapper>
        <AiOutlineMore style={categoryStyle} onClick={() => handleDropdownOpen(dataItem)}/>
        {isOpen && selectedItem === dataItem.IDDIEUTRI && 
        <Dropdown>
          <DropdownItem onClick={handleOnView}>Xem chi tiết KHĐT</DropdownItem>
          <DropdownItem onClick={handleDelete}>Xóa kế hoạch điều trị</DropdownItem>
        </Dropdown>}
      </DropdownWrapper>
    </CustomTableRow>
  })

  return (<div style={{marginBottom: "5vh"}}>
    <SliderCategory />
    <div style={{display: "flex"}}>
      <Search onSubmit={handleSubmit} content={" Nhập mã bệnh nhân "} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    </div>
    <KHDTByPatientWrapper>
      {isOpenPopupKHDT && <KHDTDetail title={"KẾ HOẠCH " + selectedItem} ID={selectedItem} setIsOpenPopup={setIsOpenPopupKHDT}/>}
      <Table style={{ width: "80%", height: "50%", maxWidth: "1200px" }}>
        <CustomTableHead style={{ height: "50px", borderBottom: "2px solid" }}>
          {header?.map((headerItem) => {
            return <span >{headerItem}</span>
          })}
        </CustomTableHead>
        <Scrollbar data={content} />
      </Table>
    </KHDTByPatientWrapper>
  </div>);
}

export default KHDTByPatient;

const KHDTByPatientWrapper = styled.div`
  width: 100%;
  position: relative;
  .prescription-title {
    margin-left: 10%;
    font-weight: 700;
    font-size: 20px;
  }
`

// const ButtonGroup = styled.div`

//   display: flex;
//   justify-content: space-around;
//   padding: 5vh 20%;
//   margin: 0 20%;
//   gap: 20px;
// `

const Button = styled.button`
  padding: 10px;
  border-radius: 15px;
  width: 200px;
  border: none;
  padding: 10px;
  min-width: 100px;
  position: absolute;
  right: 0;
  bottom: -6vh;
  background-color: var(--bg-blue-color);
  font-weight: 700;
`

const CustomTableHead = styled(TableHead)`
  grid-template-columns: repeat(${header.length + 1}, 1fr);
`

const CustomTableRow = styled(TableRow)`
  grid-template-columns: repeat(${header.length + 1}, 1fr);
`