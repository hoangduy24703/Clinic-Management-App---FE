import { Table, TableRow, TableHead, Dropdown, DropdownItem, DropdownWrapper } from "../../Patient/PatientRecords/PatientRecords";
import SliderCategory from "../../../components/Slider/SliderCategory";
import Scrollbar from "../../../components/Scrollbar/Scrollbar";
import styled from "styled-components";
import { AiOutlineMore } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import DatePicker from 'react-datepicker';
import Form from 'react-bootstrap/Form';
import { getListBDTbyDate } from "../../../api/dieutri/dieutri";
import BDTDetail from "../BDTDetail/BDTDetail";

const header = [
  "ID BỆNH NHÂN",
  "BUỔI ĐIỀU TRỊ",
  "KẾ HOẠCH ĐIỀU TRỊ",
  "BÁC SĨ ĐIỀU TRỊ",
  "NGÀY ĐIỀU TRỊ",
];

const ByDate = () => {
  const [dataBDT, setDataBDT] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPopupBDT, setIsOpenPopupBDT] = useState(false);
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

  const handleOnView = () => {
    setIsOpenPopupBDT(true);
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
            <DropdownItem onClick={handleOnView}>Xem buổi điều trị</DropdownItem>
            <DropdownItem onClick={handleOnUpdate}>Sửa buổi điều trị</DropdownItem>
            <DropdownItem onClick={handleDelete}>Xóa buổi điều trị</DropdownItem>
          </Dropdown>}
      </DropdownWrapper>
    </TableRow>
  })


  return (<div style={{ marginBottom: "5vh" }}>
    <SliderCategory />
    <ByDateWrapper>
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
      {isOpenPopupBDT && <BDTDetail title={"BUỔI ĐIỀU TRỊ " + selectedItem} IDBUOIDIEUTRI={selectedItem} setIsOpenPopup={setIsOpenPopupBDT}/>}
      <Table style={{ width: "80%", height: "50%", maxWidth: "1200px" }}>
        <TableHead style={{ height: "50px", borderBottom: "2px solid" }}>
          {header?.map((headerItem) => {
            return <span >{headerItem}</span>
          })}
        </TableHead>
        <Scrollbar data={content} />
      </Table>
    </ByDateWrapper>
  </div>);
}

export default ByDate;

const ByDateWrapper = styled.div`
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