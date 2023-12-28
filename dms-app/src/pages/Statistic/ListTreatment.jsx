import { Table, TableHead, TableRow } from "../Patient/PatientRecords/PatientRecords";
import SliderCategory from "../../components/Slider/SliderCategory";
import Scrollbar from "../../components/Scrollbar/Scrollbar";
import styled from "styled-components";
import { AiOutlineMore } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import DatePicker from 'react-datepicker';
import Form from 'react-bootstrap/Form';
import { getListBDTbyDate } from "../../api/dieutri/dieutri";

const header = [
  "ID BỆNH NHÂN",
  "BUỔI ĐIỀU TRỊ",
  "KẾ HOẠCH ĐIỀU TRỊ",
  "BÁC SĨ ĐIỀU TRỊ",
  "NGÀY ĐIỀU TRỊ",
];

const ListTreatment = () => {
  const [dataBDT, setDataBDT] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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

  const handleDelete = () => {

  }

  const handleOnUpdate = () => {

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateA = moment(ngayA).format("YYYY-MM-DD");
    const dateB = moment(ngayB).format("YYYY-MM-DD");
    const data = await getListBDTbyDate(dateA, dateB);
    console.log(data?.data?.data?.listBDT);
    setDataBDT(data?.data?.data?.listBDT);
  }

  const content = dataBDT?.map((dataItem, index) => {
    return <CustomTableRow key={index}>
      <span>{dataItem.BNKHAMLE}</span>
      <span>{dataItem.IDBUOIDIEUTRI}</span>
      <span>{dataItem.KEHOACHDT}</span>
      <span>{dataItem.KHAMCHINH}</span>
      <span>{moment(dataItem.NGAYDT).format("DD/MM/YYYY")}</span>
    </CustomTableRow>
  })


  return (<div style={{ marginBottom: "5vh" }}>
    <SliderCategory />
    <ListTreatmentWrapper>
      {/* <div className="patient-record-title">DANH SÁCH HỒ SƠ BỆNH NHÂN</div> */}
      <FormWrapper onSubmit={handleSubmit}>
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
    </ListTreatmentWrapper>
  </div>);
}

export default ListTreatment;

const ListTreatmentWrapper = styled.div`
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