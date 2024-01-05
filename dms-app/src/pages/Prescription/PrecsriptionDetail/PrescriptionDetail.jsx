import { Table, TableRow, TableHead, Dropdown, DropdownItem, DropdownWrapper } from "../../Patient/PatientRecords/PatientRecords";
import SliderCategory from "../../../components/Slider/SliderCategory";
import Scrollbar from "../../../components/Scrollbar/Scrollbar";
import styled from "styled-components";
import { AiOutlineMore } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../../components/Search/Search";
import moment from "moment";
import { getDonThuoc } from "../../../api/donthuoc/donthuoc";
import PopupCreatePrescription from "./PopupCreatePresciption";
import PreDetail from "./PreDetaiil";
import { useSelector } from "react-redux";
import PopupDeletePrescription from "./PopupDeletePrescription";

const header = [
  "ID ĐƠN THUỐC",
  "NGÀY CẤP",
  "ID BUỔI ĐIỀU TRỊ",
];

const PrescriptionDetail = () => {
  // const data = [...dummyData];'
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPopupCreatePrescription, setIsOpenPopupCreatePrescription] = useState(false);
  const [isOpenPopupDetail, setIsOpenPopupDetail] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpenDeleteDT, setIsOpenDeleteDT] = useState(false);
  const role = useSelector(state => state.auth.role);

  const categoryStyle = {
    cursor: "pointer",
    marginLeft: "80%",
  }

  const handleDropdownOpen = (value) => {
    setSelectedItem(value.IDDONTHUOC);
    setIsOpen(!isOpen);
  }

  const handleOnNavigate = () => {
    setIsOpenPopupDetail(true);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Search", searchTerm);
    if (searchTerm === "") {
      alert("CHƯA NHẬP ID BỆNH NHÂN");
      return;
    }
    const result = await getDonThuoc(searchTerm);
    console.log(result?.data?.data);
    setData(result?.data?.data?.listDonThuoc);
  }

  const handleClosePopup = () => {
    setIsOpenPopupCreatePrescription(false);
  }
  
  const content = data?.map((dataItem, index) => {
    return <CustomTableRow key={index}>
      <span>{dataItem.IDDONTHUOC}</span>
      <span>{moment(dataItem.NGAYCAP).format("DD/MM/YYYY")}</span>
      <span>{dataItem.IDBUOIDIEUTRI}</span>
      <DropdownWrapper>
        <AiOutlineMore style={categoryStyle} onClick={() => handleDropdownOpen(dataItem)}/>
        {isOpen && selectedItem === dataItem.IDDONTHUOC && 
        <Dropdown>
          <DropdownItem onClick={handleOnNavigate}>Xem đơn thuốc</DropdownItem>
          <DropdownItem onClick={() => setIsOpenDeleteDT(true)}>Xóa đơn thuốc</DropdownItem>
        </Dropdown>}
      </DropdownWrapper>
    </CustomTableRow>
  })


  return (<div style={{marginBottom: "5vh"}}>
    <SliderCategory />
    {isOpenDeleteDT && <PopupDeletePrescription handleClosePopup={() => setIsOpenDeleteDT(false)} data={data} selectedItem={selectedItem}/>}
    <div style={{display: "flex"}}>
      <Search onSubmit={handleSubmit} content={" Nhập id bệnh nhân "} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    </div>  
    <PrescriptionDetailWrapper>
      {isOpenPopupDetail && <PreDetail title={"CHI TIẾT ĐƠN THUỐC"} ID={selectedItem} setIsOpenPopup={setIsOpenPopupDetail}/>}
      {isOpenPopupCreatePrescription && <PopupCreatePrescription handleClosePopup={handleClosePopup}/>}
      <Table style={{ width: "80%", height: "50%", maxWidth: "1200px" }}>
        <CustomTableHead style={{ height: "50px", borderBottom: "2px solid" }}>
          {header?.map((headerItem) => {
            return <span >{headerItem}</span>
          })}
        </CustomTableHead>
        <Scrollbar data={content} />
        {role === `"QT"` && <Button onClick={() => setIsOpenPopupCreatePrescription(true)}> THÊM MỚI ĐƠN THUỐC </Button>}
      </Table>
    </PrescriptionDetailWrapper>
  </div>);
}

export default PrescriptionDetail;

const PrescriptionDetailWrapper = styled.div`
  width: 100%;
  position: relative;
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
  width: 400px;
  border: none;
  padding: 10px;
  min-width: 100px;
  position: absolute;
  right: 0;
  background-color: var(--bg-blue-color);
  font-weight: 700;
`

const CustomTableHead = styled(TableHead)`
  grid-template-columns: repeat(${header.length + 1}, 1fr);
`
const CustomTableRow = styled(TableRow)`
  grid-template-columns: repeat(${header.length + 1}, 1fr);
`