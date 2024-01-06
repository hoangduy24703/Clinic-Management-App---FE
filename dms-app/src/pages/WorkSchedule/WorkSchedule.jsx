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
import PopupUpdateWorkSchedule from "./PopupUpdateWorkSchedule";
import PopupDeleteWorkSchedule from "./PopupDeleteWorkSchedule";
import { useSelector } from "react-redux";

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
  const [isOpenUpdateLLV, setIsOpenUpdateLLV] = useState(false);
  const [isOpenDeleteLLV, setIsOpenDeleteLLV] = useState(false);
  const role = useSelector(state => state.auth.role);

  const FormGroupStyle = {
    display: "flex",
    margin: "10px auto"
  }

  const buttonContent = {
    name: "",
    title: "THÊM MỚI LỊCH LÀM VIỆC"
  }

  const handleCreateLichLamViec = ()=>{
    setIsOpenPopUpFormLichLamViec(true);
  }

  function handleClosePopup ()
  {
    setIsOpenPopUpFormLichLamViec(false);
  }
  
  const handleDropdownOpen = (value) => {
    setSelectedItem(value);
    setIsOpen(!isOpen);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateA = moment(ngayA).format("YYYY-MM-DD");
    const dateB = moment(ngayB).format("YYYY-MM-DD");
    if ((dateA.length !== 10 && dateB.length !== 10) || (dateA.length !== dateB.length) || searchTerm === "") {
      alert("NHẬP DỮ LIỆU KHÔNG ĐỦ");
      return;
    }
    const data = await postLichLamViec(searchTerm, dateA, dateB);
    console.log(data);
    setData(data?.data?.data);  
  }

  useEffect(() => {
    console.log(moment(ngayA).format("YYYY-MM-DD"));
    console.log(moment(ngayB).format("YYYY-MM-DD"));
  }, [ngayA, ngayB])

  const content = data?.map((dataItem, index) => {
    return <CustomTableRow key={index} onClick={() => handleDropdownOpen(dataItem)}>
      <span>{dataItem.IDNHANVIEN}</span>
      <span>{dataItem.TENNV}</span>
      <span>{dataItem.NGAY}</span>
      <span>{dataItem.THANG}</span>
      <span>{dataItem.NAM}</span>
      <span>{dataItem.IDCALAM}</span>
      <span>{dataItem.KHUNGGIO}</span>
      <DropdownWrapper>
        {isOpen && (role === `"QT"`  || role === `"NV"`) && (selectedItem.IDNHANVIEN === dataItem.IDNHANVIEN && selectedItem.NAM === dataItem.NAM && selectedItem.THANG === dataItem.THANG && selectedItem.NGAY === dataItem.NGAY && selectedItem.IDCALAM === dataItem.IDCALAM) &&
          <CustomDropdown>
            <DropdownItem onClick={() => setIsOpenUpdateLLV(true)}>Sửa lịch làm việc</DropdownItem>
            <DropdownItem onClick={() => setIsOpenDeleteLLV(true)}>Xóa lịch làm việc</DropdownItem>
          </CustomDropdown>}
      </DropdownWrapper>
    </CustomTableRow>
  })


  return (<div style={{ marginBottom: "5vh" }}>
    <SliderCategory />
    {isOpenUpdateLLV && <PopupUpdateWorkSchedule handleClosePopup={() => setIsOpenUpdateLLV(false)} data={data} selectedItem={selectedItem}/>}
    {isOpenDeleteLLV && <PopupDeleteWorkSchedule handleClosePopup={() => setIsOpenDeleteLLV(false)} data={data} selectedItem={selectedItem}/>}
    <WorkScheduleByDateWrapper>
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
        <div style={{display: "flex"}}>
          {data?.length !== 0 && <div style={{margin: "0 auto"}}>Có {data?.length} kết quả tìm kiếm</div>}
        </div>
      </FormWrapper>
      
      <Table style={{ width: "80%", height: "50%", maxWidth: "1200px" }}>
        <CustomTableHead style={{ height: "50px", borderBottom: "2px solid" }}>
          {header?.map((headerItem) => {
            return <span >{headerItem}</span>
          })}
        </CustomTableHead>
        <Scrollbar data={content} />
        {/* <ButtonGroup> */}
          {role === `"QT"` && <Button style={{position: "absolute", width: "300px", right: 0}}onClick={handleCreateLichLamViec}>{buttonContent.name} {buttonContent.title}</Button>}
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
  grid-template-columns: repeat(${header.length}, 1fr);
` 
const CustomTableRow = styled(TableRow)`
  grid-template-columns: repeat(${header.length }, 1fr);
`

const Input = styled.input`
  padding: 8px;
  width: 400px;
  margin: 0 auto;
`

const CustomDropdown= styled(Dropdown)`
  position: absolute;
  left: 100%;
  top: 50%;
`