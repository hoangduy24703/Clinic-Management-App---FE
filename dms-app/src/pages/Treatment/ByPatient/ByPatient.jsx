import { Table, TableRow, TableHead, Dropdown, DropdownItem, DropdownWrapper } from "../../Patient/PatientRecords/PatientRecords";
import SliderCategory from "../../../components/Slider/SliderCategory";
import Scrollbar from "../../../components/Scrollbar/Scrollbar";
import styled from "styled-components";
import { AiOutlineMore } from "react-icons/ai";
import { useState } from "react";
import Search from "../../../components/Search/Search";
import { getListBDTbyID } from '../../../api/dieutri/dieutri';
import BDTDetail from "../BDTDetail/BDTDetail";
import moment from "moment";

const header = [
  "ID BỆNH NHÂN",
  "BUỔI ĐIỀU TRỊ",
  "KẾ HOẠCH ĐIỀU TRỊ",
  "BÁC SĨ ĐIỀU TRỊ",
  "NGÀY ĐIỀU TRỊ",
];

const ByPatient = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPopupBDT, setIsOpenPopupBDT] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  const categoryStyle = {
    cursor: "pointer",
    marginLeft: "80%",
  }

  const handleDropdownOpen = (value) => {
    setSelectedItem(value.IDBUOIDIEUTRI);
    setIsOpen(!isOpen);
  }

  const handleOnViewBDT = () => {
    setIsOpenPopupBDT(true);
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
      <span>{dataItem.BNKHAMLE}</span>
      <span>{dataItem.IDBUOIDIEUTRI}</span>
      <span>{dataItem.KEHOACHDT}</span>
      <span>{dataItem.KHAMCHINH}</span>
      <span>{moment(dataItem.NGAYDT).format("DD/MM/YYYY")}</span>
      <DropdownWrapper>
        <AiOutlineMore style={categoryStyle} onClick={() => handleDropdownOpen(dataItem)}/>
        {isOpen && selectedItem === dataItem.IDBUOIDIEUTRI && 
        <Dropdown>
          <DropdownItem onClick={handleOnViewBDT}>Xem buổi điều trị</DropdownItem>
          <DropdownItem onClick={handleOnViewBDT}>Sửa buổi điều trị</DropdownItem>
          <DropdownItem onClick={handleDelete}>Xóa buổi điều trị</DropdownItem>
        </Dropdown>}
      </DropdownWrapper>
    </TableRow>
  });

  return (<div style={{marginBottom: "5vh"}}>
    <SliderCategory />
    <div style={{display: "flex"}}>
      <Search onSubmit={handleSubmit} content={" Nhập mã bệnh nhân "} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    </div>
    <ByPatientWrapper>
      {isOpenPopupBDT && <BDTDetail title={"BUỔI ĐIỀU TRỊ " + selectedItem} IDBUOIDIEUTRI={selectedItem}/>}
      <Table style={{ width: "80%", height: "50%", maxWidth: "1200px" }}>
        <TableHead style={{ height: "50px", borderBottom: "2px solid" }}>
          {header?.map((headerItem) => {
            return <span>{headerItem}</span>
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