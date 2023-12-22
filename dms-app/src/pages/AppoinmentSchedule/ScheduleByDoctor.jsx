import { TableRow, Dropdown, DropdownItem, DropdownWrapper, Table, TableHead } from "../Patient/PatientRecords/PatientRecords";
import { useState } from "react";
import SliderCategory from "../../components/Slider/SliderCategory";
import { useNavigate } from "react-router-dom";
import { postLichHenIDNS } from "../../api/lichhen/lichhen";
import moment from "moment";
import { AiOutlineMore } from "react-icons/ai";
import styled from "styled-components";
import Search from "../../components/Search/Search";
import Scrollbar from "../../components/Scrollbar/Scrollbar";

const header = [
  "BỆNH NHÂN",
  "KHÁM CHÍNH",
  "TRỢ KHÁM",
  "NGÀY",
  "TÌNH TRẠNG",
];

export default function ScheduleByDoctor() {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const categoryStyle = {
    cursor: "pointer",
    marginLeft: "80%",
  }

  const handleDropdownOpen = (value) => {
    setSelectedItem(value.BACSI);
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
    const result = await postLichHenIDNS(searchTerm);
    console.log(result);
    console.log(result?.data?.data?.listBDT)
    setData(result?.data?.data?.listBDT);
  }

  const content = data?.map((dataItem, index) => {
    return <TableRow key={index}>
      <span>{dataItem.IDBENHNHAN}</span>
      <span>{dataItem.BACSI}</span>
      <span>{dataItem.TROKHAM}</span>
      <span>{moment(dataItem.NGAYHEN).format("DD/MM/YYYY")}</span>
      <span>{dataItem.TINHTRANG}</span>
      <DropdownWrapper>
        <AiOutlineMore style={categoryStyle} onClick={() => handleDropdownOpen(dataItem)}/>
        {isOpen && selectedItem === dataItem.IDBUOIDIEUTRI && 
        <Dropdown>
          <DropdownItem onClick={handleOnNavigate}>Xem buổi điều trị</DropdownItem>
          <DropdownItem onClick={handleOnNavigate}>Sửa buổi điều trị</DropdownItem>
          <DropdownItem onClick={handleDelete}>Xóa buổi điều trị</DropdownItem>
        </Dropdown>}
      </DropdownWrapper>
    </TableRow>
  })

  return(<>
    <SliderCategory />
    <div style={{display: "flex"}}>
      <Search onSubmit={handleSubmit} content={" Nhập mã nha sĩ "} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    </div>
    <ScheduleByDoctorWrapper>
      {/* <div className="patient-record-title">DANH SÁCH HỒ SƠ BỆNH NHÂN</div> */}
      <Table style={{ width: "80%", height: "50%", maxWidth: "1200px" }}>
        <TableHead style={{ height: "50px", borderBottom: "2px solid" }}>
          {header?.map((headerItem) => {
            return <span >{headerItem}</span>
          })}
        </TableHead>
        <Scrollbar data={content} />
        {/* <ButtonGroup>
          <Button onClick={handleCreatePatient}>{buttonContent.name} {buttonContent.title}</Button>
        </ButtonGroup> */}
      </Table>
    </ScheduleByDoctorWrapper>
  </>); 
}

const ScheduleByDoctorWrapper = styled.div`
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