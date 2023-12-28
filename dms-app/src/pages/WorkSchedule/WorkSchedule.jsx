import { Table, TableHead, TableRow, Dropdown, DropdownItem, DropdownWrapper } from "../Patient/PatientRecords/PatientRecords";
import SliderCategory from "../../components/Slider/SliderCategory";
import Scrollbar from "../../components/Scrollbar/Scrollbar";
import styled from "styled-components";
import { AiOutlineMore } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import DatePicker from 'react-datepicker';
import Form from 'react-bootstrap/Form';
import { postLichLamViec } from "../../api/lichlamviec/lichlamviec";
import PopupFormCreateWorkSchedule from "./PopupCreateWorkSchedule";
const header = [
  "ID NHÂN VIÊN",
  "TÊN NHÂN VIÊN",
  "NGÀY",
  "THÁNG",
  "NĂM",
  "ID CA LÀM",
  "KHUNG GIỜ",
];

const WorkScheduleByDate = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [ngayA, setNgayA] = useState(null);
  const [ngayB, setNgayB] = useState(null);
  const [isOpenPopUpFormLichLamViec, setIsOpenPopUpFormLichLamViec] = useState(false);
  const navigate = useNavigate();

  const FormGroupStyle = {
    display: "flex",
    margin: "10px auto"
  }

  const buttonContent = {
    name: "",
    title: "THÊM MỚI LỊCH LÀM VIỆC"
  }

  const categoryStyle = {
    cursor: "pointer",
    marginLeft: "80%",
  }

  const handleDropdownOpen = (value) => {
    setSelectedItem(value.IDNHANVIEN);
    setIsOpen(!isOpen);
  }

  const handleOnNavigate = () => {
    // navigate("/patient-records/:idPatient");
  }

  const handleDelete = () => {

  }
  const handleCreateLichLamViec = ()=>{
    setIsOpenPopUpFormLichLamViec(true);
  }
  function handleClosePopup ()
  {
    setIsOpenPopUpFormLichLamViec(false);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateA = moment(ngayA).format("YYYY-MM-DD");
    const dateB = moment(ngayB).format("YYYY-MM-DD");
    const data = await postLichLamViec(searchTerm, dateA, dateB);
    console.log(data);
    setData(data?.data?.data);  
  }

  useEffect(() => {
    console.log(moment(ngayA).format("YYYY-MM-DD"));
    console.log(moment(ngayB).format("YYYY-MM-DD"));
  }, [ngayA, ngayB])

  const content = data?.map((dataItem, index) => {
    return <CustomTableRow key={index}>
      <span>{dataItem.IDNHANVIEN}</span>
      <span>{dataItem.TENNV}</span>
      <span>{dataItem.NGAY}</span>
      <span>{dataItem.THANG}</span>
      <span>{dataItem.NAM}</span>
      <span>{dataItem.IDCALAM}</span>
      <span>{dataItem.KHUNGGIO}</span>
      <DropdownWrapper>
        <AiOutlineMore style={categoryStyle} onClick={() => handleDropdownOpen(dataItem)} />
        {isOpen && selectedItem === dataItem.IDNHANVIEN &&
          <Dropdown>
            <DropdownItem onClick={handleOnNavigate}>Sửa lịch làm việc</DropdownItem>
            <DropdownItem onClick={handleDelete}>Xóa lịch làm việc</DropdownItem>
          </Dropdown>}
      </DropdownWrapper>
    </CustomTableRow>
  })


  return (<div style={{ marginBottom: "5vh" }}>
    <SliderCategory />
    <WorkScheduleByDateWrapper>
      {/* <div className="patient-record-title">DANH SÁCH HỒ SƠ BỆNH NHÂN</div> */}
      <FormWrapper onSubmit={handleSubmit}>
      {isOpenPopUpFormLichLamViec && <PopupFormCreateWorkSchedule handleClosePopup={handleClosePopup} />}
        <Form.Group style={FormGroupStyle}>
          <Form.Label style={{width: "100px", fontWeight: "700"}}>TỪ NGÀY</Form.Label>
          <DatePicker
          selected={ngayA}
          onChange={(date) => setNgayA(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText=" Chọn ngày bắt đầu"
        />
        </Form.Group>
        <Form.Group style={FormGroupStyle}>
          <Form.Label style={{width: "100px", fontWeight: "700"}}>ĐẾN NGÀY</Form.Label>
          <DatePicker
          selected={ngayB}
          onChange={(date) => setNgayB(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText=" Chọn ngày kết thúc"
        />
        </Form.Group>
        <Input
          type="text"
          placeholder={"Nhập mã nha sĩ"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Form.Group style={FormGroupStyle}>
          <Button>SEARCH</Button>
        </Form.Group>
      </FormWrapper>
      
      <Table style={{ width: "80%", height: "50%", maxWidth: "1200px" }}>
        <CustomTableHead style={{ height: "50px", borderBottom: "2px solid" }}>
          {header?.map((headerItem) => {
            return <span >{headerItem}</span>
          })}
        </CustomTableHead>
        <Scrollbar data={content} />
        {/* <ButtonGroup> */}
          <Button style={{position: "absolute", width: "300px", right: 0, bottom: "-7vh"}}onClick={handleCreateLichLamViec}>{buttonContent.name} {buttonContent.title}</Button>
        {/* </ButtonGroup> */}
      </Table>
    </WorkScheduleByDateWrapper>
  </div>);
}

export default WorkScheduleByDate;

const WorkScheduleByDateWrapper = styled.div`
  width: 100%;
  position: relative;
  .prescription-title {
    margin-left: 10%;
    font-weight: 700;
    font-size: 20px;
  }
`

const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
`

const Button = styled.button`
  padding: 10px;
  border-radius: 15px;
  width: 200px;
  border: none;
  padding: 10px;
  min-width: 100px;
  background-color: var(--bg-blue-color);
  font-weight: 700;
`

const CustomTableHead = styled(TableHead)`
  grid-template-columns: repeat(${header.length + 1}, 1fr);
` 
const CustomTableRow = styled(TableRow)`
  grid-template-columns: repeat(${header.length + 1}, 1fr);
`

const Input = styled.input`
  padding: 8px;
  width: 400px;
  margin: 0 auto;
`