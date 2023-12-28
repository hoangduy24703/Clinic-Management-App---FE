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
import { postLichHenDayToDay } from "../../api/lichhen/lichhen";

const header = [
  "BÁC SĨ",
  "BỆNH NHÂN",
  "TRỢ KHÁM",
  "NGÀY HẸN",
  "THỜI GIAN HẸN",
  "PHÒNG",
  "TÌNH TRẠNG",
];


const ListAppointmentSchedule = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [ngayA, setNgayA] = useState(null);
  const [ngayB, setNgayB] = useState(null);

  const FormGroupStyle = {
    display: "flex",
    margin: "10px auto"
  }

  const handleDelete = () => {

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateA = moment(ngayA).format("YYYY-MM-DD");
    const dateB = moment(ngayB).format("YYYY-MM-DD");
    const data = await postLichHenDayToDay(dateA, dateB);
    console.log(data);
    setData(data?.data?.data);
  }

  useEffect(() => {
    console.log(moment(ngayA).format("YYYY-MM-DD"), moment(ngayB).format("YYYY-MM-DD"));
  }, [ngayA, ngayB])

  const content = data?.map((dataItem, index) => {
    return <CustomTableRow key={index}>
      <span>{dataItem.BACSI}</span>
      <span>{dataItem.BENHNHAN}</span>
      <span>{dataItem.TROKHAM}</span>
      <span>{moment(dataItem.NGAYHEN).format("DD/MM/YYYY")}</span>
      <span>{moment(dataItem.THOIGIANHEN).format("DD/MM/YYYY HH:mm:ss")}</span>
      <span>{dataItem.PHONG}</span>
      <span>{dataItem.TINHTRANG}</span>
    </CustomTableRow>
  })


  return (<div style={{ marginBottom: "5vh" }}>
    <SliderCategory />
    <ListAppointmentScheduleWrapper>
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
    </ListAppointmentScheduleWrapper>
  </div>);
}

export default ListAppointmentSchedule;

const ListAppointmentScheduleWrapper = styled.div`
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
  grid-template-columns: repeat(${header.length}, 1fr);

`
const CustomTableRow = styled(TableRow)`
  grid-template-columns: repeat(${header.length}, 1fr);
`