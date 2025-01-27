import { TableRow, Dropdown, DropdownItem, DropdownWrapper, Table, TableHead } from "../Patient/PatientRecords/PatientRecords";
import { useState } from "react";
import SliderCategory from "../../components/Slider/SliderCategory";
import { useNavigate } from "react-router-dom";
import { postLichHenIDBN } from "../../api/lichhen/lichhen";
import moment from "moment";
import styled from "styled-components";
import Scrollbar from "../../components/Scrollbar/Scrollbar";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import PopupUpdateSchedule from "./PopupUpdateSchedule";
import PopupDeleteSchedule from "./PopupDeleteSchedule";

const header = [
  "BỆNH NHÂN",
  "TÊN BỆNH NHÂN",
  "KHÁM CHÍNH",
  "TRỢ KHÁM",
  "NGÀY",
  "TÌNH TRẠNG",
];

export default function ScheduleByPatient() {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [date, setDate] = useState(null); 
  const [isOpenUpdateLH, setIsOpenUpdateLH] = useState(false);
  const [isOpenDeleteLH, setIsOpenDeleteLH] = useState(false);
  const role = useSelector(state => state.auth.role);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const DATE = moment(date).format("YYYY-MM-DD");
    if (DATE.length !== 10 || searchTerm === '') {
      alert("NHẬP THÔNG TIN KHÔNG ĐẦY ĐỦ");
      return;
    }
    const result = await postLichHenIDBN(searchTerm, DATE);
    console.log(result);
    setData(result?.data?.data);
  }

  const handleDropdownOpen = (value) => {
    setSelectedItem(value);
    setIsOpen(!isOpen);
  }

  const content = data?.map((dataItem, index) => {
    return <CustomTableRow key={index} onClick={() => handleDropdownOpen(dataItem)}>
      <span>{dataItem.IDBENHNHAN}</span>
      <span>{dataItem.TENBN}</span>
      <span>{dataItem.BACSI}</span>
      <span>{dataItem.TROKHAM}</span>
      <span>{moment(dataItem.NGAYHEN).format("DD/MM/YYYY")}</span>
      <span>{dataItem.TINHTRANG}</span>
      <DropdownWrapper>
        {isOpen && (role === `"QT"`  || role === `"NV"`) && (selectedItem.IDBENHNHAN === dataItem.IDBENHNHAN && selectedItem.NGAYHEN === dataItem.NGAYHEN && selectedItem.THOIGIANHEN === dataItem.THOIGIANHEN) &&
          <CustomDropdown>
            <DropdownItem onClick={() => setIsOpenUpdateLH(true)}>Sửa lịch hẹn</DropdownItem>
            <DropdownItem onClick={() => setIsOpenDeleteLH(true)}>Xóa lịch hẹn</DropdownItem>
          </CustomDropdown>}
      </DropdownWrapper>
    </CustomTableRow>
  })

  return(<>
    <SliderCategory />
    {isOpenUpdateLH && <PopupUpdateSchedule handleClosePopup={() => setIsOpenUpdateLH(false)} data={data} selectedItem={selectedItem}/>}
    {isOpenDeleteLH && <PopupDeleteSchedule handleClosePopup={() => setIsOpenDeleteLH(false)} data={data} selectedItem={selectedItem}/>}
    <div style={{display: "flex"}}>
    <FormSearch onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder={"Nhập mã bệnh nhân"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CustomDatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText=" Chọn ngày"
        />
        <Button type="submit">Search</Button>
      </FormSearch>
    </div>
    <ScheduleByPatientWrapper>
      {/* <div className="patient-record-title">DANH SÁCH HỒ SƠ BỆNH NHÂN</div> */}
      <Table style={{ width: "80%", height: "50%", maxWidth: "1200px" }}>
        <CustomTableHead style={{ height: "50px", borderBottom: "2px solid" }}>
          {header?.map((headerItem) => {
            return <span >{headerItem}</span>
          })}
        </CustomTableHead>
        <Scrollbar data={content} />
        <ButtonGroup>
          {/* <Button onClick={handleCreatePatient}>{buttonContent.name} {buttonContent.title}</Button> */}
        </ButtonGroup>
      </Table>
    </ScheduleByPatientWrapper>
  </>); 
}

const ScheduleByPatientWrapper = styled.div`
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

const FormSearch = styled.form`
  display: flex;
  margin: 20px auto;
  gap: 10px;
`

const Input = styled.input`
  padding: 8px;
  width: 400px;
`

const Button = styled.button`
  padding: 8px;
  cursor: pointer;
  border: none;
  background-color: var(--bg-blue-color);
  border-radius: 10px;
`
const CustomDatePicker = styled(DatePicker)`
  padding: 10px;
`
const CustomTableHead = styled(TableHead)`
  grid-template-columns: repeat(${header.length }, 1fr);
`
const CustomTableRow = styled(TableRow)`
  grid-template-columns: repeat(${header.length }, 1fr);
`
const CustomDropdown= styled(Dropdown)`
  position: absolute;
  left: 100%;
  top: 50%;
`