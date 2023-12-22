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
  "BỆNH NHÂN",
  "KHÁM CHÍNH",
  "TRỢ KHÁM",
  "NGÀY",
  "TÌNH TRẠNG",
];


const ScheduleByDate = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [ngayA, setNgayA] = useState(null);
  const [ngayB, setNgayB] = useState(null);

  const navigate = useNavigate();

  const FormGroupStyle = {
    display: "flex",
    margin: "10px auto"
  }

  const categoryStyle = {
    cursor: "pointer",
    marginLeft: "80%",
  }

  const handleDropdownOpen = (value) => {
    setSelectedItem(value.IDBUOIDIEUTRI);
    setIsOpen(!isOpen);
  }

  const handleOnNavigate = () => {
    navigate("/patient-records/:idPatient");
  }

  const handleDelete = () => {

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateA = moment(ngayA).format("YYYY-MM-DD");
    const dateB = moment(ngayB).format("YYYY-MM-DD");
    const data = await postLichHenDayToDay(dateA, dateB);
    console.log(data?.data?.data?.listBDT);
    setData(data?.data?.data?.listBDT);
  }

  useEffect(() => {
    console.log(moment(ngayA).format("YYYY-MM-DD"));
  }, [ngayA, ngayB])

  const content = data?.map((dataItem, index) => {
    return <TableRow key={index}>
      <span>{dataItem.BNKHAMLE}</span>
      <span>{dataItem.IDBUOIDIEUTRI}</span>
      <span>{dataItem.KEHOACHDT}</span>
      <span>{dataItem.KHAMCHINH}</span>
      <span>{moment(dataItem.NGAYDT).format("DD/MM/YYYY")}</span>
      <DropdownWrapper>
        <AiOutlineMore style={categoryStyle} onClick={() => handleDropdownOpen(dataItem)} />
        {isOpen && selectedItem === dataItem.IDBUOIDIEUTRI &&
          <Dropdown>
            <DropdownItem onClick={handleOnNavigate}>Sửa lịch hẹn</DropdownItem>
            <DropdownItem onClick={handleDelete}>Xóa lịch hẹn</DropdownItem>
          </Dropdown>}
      </DropdownWrapper>
    </TableRow>
  })


  return (<div style={{ marginBottom: "5vh" }}>
    <SliderCategory />
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
        <TableHead style={{ height: "50px", borderBottom: "2px solid" }}>
          {header?.map((headerItem) => {
            return <span >{headerItem}</span>
          })}
        </TableHead>
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