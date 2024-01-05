import SliderCategory from "../../../components/Slider/SliderCategory";
import styled from "styled-components";
import { AiOutlineMore } from "react-icons/ai";
import Scrollbar from "../../../components/Scrollbar/Scrollbar";
// import Button from "../../../components/Button/Button";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupForm from "../PopupForm/PopupForm";
import { useDispatch } from "react-redux";
import Search from "../../../components/Search/Search";
import moment from "moment";
import { setPatientSelected } from "../../../redux/slice/patientSlice";
import { postDanhSachBenhNhan } from "../../../api/patient/patient";

const header = [
  "ID BỆNH NHÂN",
  "TÊN BỆNH NHÂN",
  "NĂM SINH",
  "GIỚI TÍNH",
  "SĐT",
];

const PatientRecords = () => {
  // const data = [...dummyData];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPopupForm, setIsOpenPopupForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [dataPatient, setDataPatient] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Search", searchTerm);
    const result = await postDanhSachBenhNhan(searchTerm);
    console.log(result);
    setDataPatient(result?.data?.data);
  };

  const categoryStyle = {
    cursor: "pointer",
    marginLeft: "80%",
  }

  const buttonContent = {
    name: <IoMdAddCircleOutline size="20px"/>,
    title: "THÊM HỒ SƠ BỆNH NHÂN",
  }

  const handleDropdownOpen = (value) => {
    setSelectedItem(value.IDBENHNHAN);
    setIsOpen(!isOpen);
  }

  const handleViewPatient = async () => {
    console.log(selectedItem);
    dispatch(setPatientSelected(selectedItem));
    navigate(`/patient-records/${selectedItem}`)
  }

  const handleUpdatePatient = () => {

  }

  const handleCreatePatient = () => {
    setIsOpenPopupForm(!isOpenPopupForm);
  }

  useEffect(() => {
    console.log(dataPatient);
  }, [dataPatient]);

  const content = dataPatient?.map((dataItem, index) => {
    return <TableRow key={index}>
      <span>{dataItem.IDBENHNHAN}</span>
      <span>{dataItem.TENBN}</span>
      <span>{moment(dataItem.NAMSINHBN).format("DD/MM/YYYY")}</span>
      <span>{dataItem.GIOITINHBN}</span>
      <span>{dataItem.SODIENTHOAIBN}</span>
      <DropdownWrapper>
        <AiOutlineMore style={categoryStyle} onClick={() => handleDropdownOpen(dataItem)}/>
        {isOpen && selectedItem === dataItem.IDBENHNHAN && 
        <Dropdown>
          <DropdownItem onClick={handleViewPatient}>Xem thông tin hồ sơ</DropdownItem>
        </Dropdown>}
      </DropdownWrapper>
    </TableRow>
  })

  return (<>
    <SliderCategory/>
    <div style={{display: "flex"}}>
      <Search onSubmit={handleSubmit} content={" Nhập tên bệnh nhân "} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    </div>
    {isOpenPopupForm && <PopupForm handleClosePopup={handleCreatePatient}/>}
    <PatientRecordsWrapper>
      {/* <div className="patient-record-title">DANH SÁCH HỒ SƠ BỆNH NHÂN</div> */}
      <Table style={{ width: "80%", height: "50%", maxWidth: "1200px" }}>
        <TableHead style={{ height: "50px", borderBottom: "2px solid" }}>
          {header?.map((headerItem) => {
            return <span >{headerItem}</span>
          })}
        </TableHead>
        <Scrollbar data={content} />
        <ButtonGroup>
          <Button onClick={handleCreatePatient}>{buttonContent.name} {buttonContent.title}</Button>
        </ButtonGroup>
      </Table>
    </PatientRecordsWrapper>
  </>);
}

export default PatientRecords;

const PatientRecordsWrapper = styled.div` 
  width: 100%;
  .patient-record-title {
    margin-left: 1%;
    font-weight: 700;
    font-size: 25px;
  }
`

export const Table = styled.div`
  background-color: var(--table-bg-color);
  width: 100%;
  margin: 0 auto;
  margin-top: 2%;
  position: relative;
  border-radius: 15px;
`

export const TableHead = styled.div`
  display: grid;
  grid-template-columns: repeat(${header.length + 1}, 1fr);
  padding: 10px;
  border-bottom: 1px solid var(--grey-line-color);
  font-weight: 700;
  text-align: center;
  background-color: var(--bg-blue-color); 
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
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
  position: absolute;
`

const Button = styled.button`
  font-weight: 700;
  background-color: var(--bg-blue-color);
  border: none;
  padding: 10px;
  border-radius: 10px;
  position: absolute;
  right: 0;
  top: 1vh;
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