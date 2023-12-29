import { TableRow, Dropdown, DropdownItem, DropdownWrapper, Table, TableHead } from "../Patient/PatientRecords/PatientRecords";
import { useState } from "react";
import SliderCategory from "../../components/Slider/SliderCategory";
import { useNavigate } from "react-router-dom";
import { postLichHenIDBN } from "../../api/lichhen/lichhen";
import moment from "moment";
import { AiOutlineMore } from "react-icons/ai";
import styled from "styled-components";
import Search from "../../components/Search/Search";
import Scrollbar from "../../components/Scrollbar/Scrollbar";
import DatePicker from "react-datepicker";

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
  const navigate = useNavigate();

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

  const content = data?.map((dataItem, index) => {
    return <CustomTableRow key={index}>
      <span>{dataItem.IDBENHNHAN}</span>
      <span>{dataItem.TENBN}</span>
      <span>{dataItem.BACSI}</span>
      <span>{dataItem.TROKHAM}</span>
      <span>{moment(dataItem.NGAYDT).format("DD/MM/YYYY")}</span>
      <span>{dataItem.TINHTRANG}</span>
    </CustomTableRow>
  })

  return(<>
    <SliderCategory />
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