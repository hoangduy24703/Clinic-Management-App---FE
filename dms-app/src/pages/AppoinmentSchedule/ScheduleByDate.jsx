import { Table, TableHead, TableRow, Dropdown, DropdownItem, DropdownWrapper } from "../Patient/PatientRecords/PatientRecords";
import SliderCategory from "../../components/Slider/SliderCategory";
import Scrollbar from "../../components/Scrollbar/Scrollbar";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import DatePicker from 'react-datepicker';
import Form from 'react-bootstrap/Form';
import { postLichHenDayToDay } from "../../api/lichhen/lichhen";
import PopupUpdateSchedule from "./PopupUpdateSchedule";
import PopupDeleteSchedule from "./PopupDeleteSchedule";
import { useSelector } from "react-redux";

const header = [
  "BỆNH NHÂN",
  "KHÁM CHÍNH",
  "TRỢ KHÁM",
  "NGÀY HẸN",
  "THỜI GIAN HẸN",
  "TÌNH TRẠNG"
];


const ScheduleByDate = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [ngayA, setNgayA] = useState(null);
  const [ngayB, setNgayB] = useState(null);
  const [isOpenUpdateLH, setIsOpenUpdateLH] = useState(false);
  const [isOpenDeleteLH, setIsOpenDeleteLH] = useState(false);
  const role = useSelector(state => state.auth.role);


  const FormGroupStyle = {
    display: "flex",
    margin: "10px auto"
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateA = moment(ngayA).format("YYYY-MM-DD");
    const dateB = moment(ngayB).format("YYYY-MM-DD");
    if (dateA.length !== dateB.length || (dateA.length !== 10 && dateB.length !== 10)) {
      alert("CHƯA NHẬP ĐỦ NGÀY");
      return;
    }
    const data = await postLichHenDayToDay(dateA, dateB);
    console.log(data?.data?.data);
    setData(data?.data?.data);
  }

  useEffect(() => {
    console.log(moment(ngayA).format("YYYY-MM-DD"), moment(ngayB).format("YYYY-MM-DD"));
  }, [ngayA, ngayB])

  const handleDropdownOpen = (value) => {
    setSelectedItem(value);
    setIsOpen(!isOpen);
  }

  const content = data?.map((dataItem, index) => {
    return <CustomTableRow key={index} onClick={() => handleDropdownOpen(dataItem)}>
      <span>{dataItem.BENHNHAN}</span>
      <span>{dataItem.BACSI}</span>
      <span>{dataItem.TROKHAM}</span>
      <span>{moment(dataItem.NGAYHEN).format("DD/MM/YYYY")}</span>
      <span>{moment(dataItem.THOIGIANHEN).format("hh:MM:ss")}</span>
      <span>{dataItem.TINHTRANG}</span>
      <DropdownWrapper>
        {isOpen && (role === `"QT"`  || role === `"NV"`) && (selectedItem.BENHNHAN === dataItem.BENHNHAN && selectedItem.NGAYHEN === dataItem.NGAYHEN && selectedItem.THOIGIANHEN === dataItem.THOIGIANHEN) &&
          <CustomDropdown>
            <DropdownItem onClick={() => setIsOpenUpdateLH(true)}>Sửa lịch hẹn</DropdownItem>
            <DropdownItem onClick={() => setIsOpenDeleteLH(true)}>Xóa lịch hẹn</DropdownItem>
          </CustomDropdown>}
      </DropdownWrapper>
    </CustomTableRow>
  })


  return (<div style={{ marginBottom: "5vh" }}>
    <SliderCategory />
    {isOpenUpdateLH && <PopupUpdateSchedule handleClosePopup={() => setIsOpenUpdateLH(false)} data={data} selectedItem={selectedItem}/>}
    {isOpenDeleteLH && <PopupDeleteSchedule handleClosePopup={() => setIsOpenDeleteLH(false)} data={data} selectedItem={selectedItem}/>}
    <ScheduleByDateWrapper>
      {/* <div className="patient-record-title">DANH SÁCH HỒ SƠ BỆNH NHÂN</div> */}
      <FormWrapper onSubmit={handleSubmit}>
        <Form.Group style={FormGroupStyle}>
          <Form.Label style={{width: "100px", fontWeight: "700"}}>TỪ NGÀY</Form.Label>
          <DatePicker
          selected={ngayB}
          onChange={(date) => setNgayB(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText=" Chọn ngày bắt đầu"
        />
        </Form.Group>
        <Form.Group style={FormGroupStyle}>
          <Form.Label style={{width: "100px", fontWeight: "700"}}>ĐẾN NGÀY</Form.Label>
          <DatePicker
          selected={ngayA}
          onChange={(date) => setNgayA(date)}
          dateFormat="dd/MM/yyyy"
          placeholderText=" Chọn ngày bắt đầu"
        />
        </Form.Group>
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
      </Table>
    </ScheduleByDateWrapper>
  </div>);
}

export default ScheduleByDate;

const ScheduleByDateWrapper = styled.div`
  width: 100%;
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