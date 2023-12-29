import { Table, TableHead, TableRow, Dropdown, DropdownItem, DropdownWrapper } from "../Patient/PatientRecords/PatientRecords";
import SliderCategory from "../../components/Slider/SliderCategory";
import Scrollbar from "../../components/Scrollbar/Scrollbar";
import Search from "../../components/Search/Search";
import styled from "styled-components";
import { AiOutlineMore } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getHoaDonNgay } from "../../api/hoadon/hoadon";
import BillsDetail from "./BillsDetail/BillsDetail";
import DatePicker from "react-datepicker";
import Form from 'react-bootstrap/Form';

const header = [
  "ID HÓA ĐƠN",
  "TỔNG TIỀN",
  "NGÀY GIAO DỊCH",
  "TÊN BỆNH NHÂN",
  "ID BUỔI ĐIỀU TRỊ"
];

const BillsByDate = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPopupBill, setIsOpenPopupBill] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [date, setDate] = useState(null);

  const categoryStyle = {
    cursor: "pointer",
    marginLeft: "80%",
  }

  const handleDropdownOpen = (value) => {
    setSelectedItem(value.IDHOADON);
    setIsOpen(!isOpen);
  }

  const handleOnViewBill = () => {
    setIsOpenPopupBill(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const DATE = moment(date).format("YYYY-MM-DD");
    if (DATE.length !== 10) {
      alert("CHƯA CHỌN NGÀY");
      return;
    }
    const result = await getHoaDonNgay(DATE);
    console.log(result?.data?.data);
    setData(result?.data?.data?.listDonThuoc);
  }

  useEffect(() => {
    console.log(moment(date).format("DD/MM/YYYY"));
  }, [date])

  const content = data?.map((dataItem, index) => {
    return <TableRow key={index}>
      <span>{dataItem.IDHOADON}</span>
      <span>{dataItem.TONGTIEN}</span>
      <span>{moment(dataItem.NGAYGIAODICH).format("DD/MM/YYYY")}</span>
      <span>{dataItem.TENBN}</span>
      <span>{dataItem.IDBUOIDIEUTRI}</span>
      <DropdownWrapper>
        <AiOutlineMore style={categoryStyle} onClick={() => handleDropdownOpen(dataItem)} />
        {isOpen && selectedItem === dataItem.IDHOADON &&
          <Dropdown>
            <DropdownItem onClick={handleOnViewBill}>Xem hóa đơn</DropdownItem>
          </Dropdown>}
      </DropdownWrapper>
    </TableRow>
  })


  return (<div style={{ marginBottom: "5vh" }}>
    <SliderCategory />
    <FormWrapper onSubmit={handleSubmit} style={{display: "flex", justifyContent: "center", marginTop: "1vh"}}>
      <CustomDatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText=" Chọn ngày"
      />
      <Button type="submit">SEARCH</Button>
    </FormWrapper>
    <BillWrapper>
      {/* <div className="patient-record-title">DANH SÁCH HỒ SƠ BỆNH NHÂN</div> */}
      {isOpenPopupBill && <BillsDetail title={"HÓA ĐƠN " + selectedItem} ID={selectedItem} setIsOpenPopup={setIsOpenPopupBill} />}
      <Table style={{ width: "80%", height: "50%", maxWidth: "1200px" }}>
        <TableHead style={{ height: "50px", borderBottom: "2px solid" }}>
          {header?.map((headerItem) => {
            return <span >{headerItem}</span>
          })}
        </TableHead>
        <Scrollbar data={content} />
        <ButtonGroup>
          {/* <Button onClick={handleCreatePatient}>{buttonContent.name} {buttonContent.title}</Button> */}
        </ButtonGroup>
      </Table>
    </BillWrapper>
  </div>);
}

export default BillsByDate;

const BillWrapper = styled.div`
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

// const Button = styled.button`
//   padding: 10px;
//   border-radius: 15px;
//   width: 200px;
//   border: none;
//   padding: 10px;
//   min-width: 100px;
// `

const CustomDatePicker = styled(DatePicker)`
  width: 300px;
  padding: 5px;
`

const FormWrapper = styled(Form)``
const Button = styled.button`
  cursor: pointer;
  border: none;
  background-color: var(--bg-blue-color);
`