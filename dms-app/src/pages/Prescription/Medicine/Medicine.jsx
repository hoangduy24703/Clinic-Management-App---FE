import { Table, TableRow, TableHead, Dropdown, DropdownItem, DropdownWrapper } from "../../Patient/PatientRecords/PatientRecords";
import SliderCategory from "../../../components/Slider/SliderCategory";
import Scrollbar from "../../../components/Scrollbar/Scrollbar";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../../components/Search/Search";
import moment from "moment";
import { getLoaiThuoc } from "../../../api/donthuoc/donthuoc";
import PopupFormMed from "./PopUpFormMed";
import { useSelector } from "react-redux";
import PopupFormUpdateMed from "./PopupFormUpdateMed";

const header = [
  "ID THUỐC",
  "TÊN THUỐC",
  "THÀNH PHẦN",
  "GIÁ THUỐC",
  "ĐƠN VỊ TÍNH",
];

const Medicine = () => {
  // const data = [...dummyData];'
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPopupFormThuoc, setIsOpenPopupFormThuoc] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpenUpdateMed, setIsOpenUpdateMed] = useState(false);
  const navigate = useNavigate();
  const role = useSelector(state => state.auth.role);

  const handleDropdownOpen = (value) => {
    setSelectedItem(value.IDTHUOC);
    setIsOpen(!isOpen);
  }
  
  function handleUpdateMed() {
    setIsOpenUpdateMed(true);
  }

  const buttonContent = {
    name: "",
    title: "THÊM MỚI THUỐC"
  }

  const handleCreateThuoc = ()=>{
    setIsOpenPopupFormThuoc(true);
  }

  function handleClosePopup ()
  {
    setIsOpenPopupFormThuoc(false);
    setIsOpenUpdateMed(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Search", searchTerm);
    if (searchTerm === "") {
      alert("NHẬP KHÔNG ĐỦ THÔNG TIN");
      return;
    }
    const result = await getLoaiThuoc(searchTerm);
    console.log(result);
    console.log(result?.data?.data?.listDonThuoc);
    setData(result?.data?.data?.listDonThuoc);
  }
  

  const content = data?.map((dataItem, index) => {
    return <CustomTableRow key={index} onClick={() => {handleDropdownOpen(dataItem)}}>
      <span>{dataItem.IDTHUOC}</span>
      <span>{dataItem.TENTHUOC}</span>
      <span>{dataItem.THANHPHAN}</span>
      <span>{dataItem.GIATHUOC}</span>
      <span>{dataItem.DONVITINH}</span>
      <DropdownWrapper>
        {isOpen && role === `"QT"` && selectedItem === dataItem.IDTHUOC &&
          <CustomDropdown>
            <DropdownItem onClick={handleUpdateMed}>Sửa thuốc</DropdownItem>
          </CustomDropdown>}
      </DropdownWrapper>
    </CustomTableRow>
  })

  useEffect(() => {
    console.log(selectedItem)
  }, [selectedItem]);

  return (<div style={{marginBottom: "5vh"}}>
    <SliderCategory />
    {isOpenUpdateMed && <PopupFormUpdateMed handleClosePopup={handleClosePopup} thuoc={data} selectedItem={selectedItem} submit={getLoaiThuoc}/>}
    <div style={{display: "flex"}}>
      <Search onSubmit={handleSubmit} content={" Nhập tên thuốc "} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    </div>
    <MedicineWrapper>
      {isOpenPopupFormThuoc && <PopupFormMed handleClosePopup={handleClosePopup}/>}
      <Table style={{ width: "80%", height: "50%", maxWidth: "1200px" }}>
        <CustomTableHead style={{ height: "50px", borderBottom: "2px solid" }}>
          {header?.map((headerItem) => {
            return <span >{headerItem}</span>
          })}
        </CustomTableHead>
        <Scrollbar data={content} />
        {/* <ButtonGroup> */}
          {role === `"QT"` && <Button onClick={handleCreateThuoc}>{buttonContent.name} {buttonContent.title}</Button>}
        {/* </ButtonGroup> */}
      </Table>
    </MedicineWrapper>
  </div>);
}

export default Medicine;

const MedicineWrapper = styled.div`
  width: 100%;
  position: relative;
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
  background-color: var(--bg-blue-color);
  font-weight: 700;
`

const CustomTableHead = styled(TableHead)`
  grid-template-columns: repeat(${header.length}, 1fr);
` 
const CustomTableRow = styled(TableRow)`
grid-template-columns: repeat(${header.length }, 1fr);
` 

const CustomDropdown= styled(Dropdown)`
  position: absolute;
  left: 100%;
  top: 50%;
`