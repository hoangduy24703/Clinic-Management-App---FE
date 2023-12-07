import SliderCategory from "../../../components/Slider/SliderCategory";
import styled from "styled-components";
import { Table, TableHead, TableRow, ButtonGroup, Dropdown, DropdownWrapper, DropdownItem } from "../../Patient/PatientRecords/PatientRecords";
import Button from "../../../components/Button/Button";
import Scrollbar from "../../../components/Scrollbar/Scrollbar";
import { AiOutlineMore } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { dummyData } from "./dummyPre";
import { IoMdAddCircleOutline } from "react-icons/io";

const header = [
  "ID Đơn Thuốc",
  "Ngày Cấp",
  "ID Buổi Điều Trị",
  "Tên Bệnh Nhân",
  "Giá"
]

const Prescription = () => {
  const data = [...dummyData];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  // const navigate = useNavigate();
  
  const handleDropdownOpen = (value) => {
    setSelectedItem(value.idDonThuoc);
    setIsOpen(!isOpen);
  }

  const categoryStyle = {
    cursor: "pointer",
    marginLeft: "80%",
  }

  const buttonContent = {
    name: <IoMdAddCircleOutline />,
    title: "Thêm mới",
  }

  const content = data?.map((dataItem, index) => {
    return <TableRow key={index}>
      <span >{dataItem.idDonThuoc}</span>
      <span >{dataItem.ngayCap}</span>
      <span >{dataItem.idBuoiDieuTri}</span>
      <span >{dataItem.tenBenhNhan}</span>
      <span >{dataItem.gia}</span>
      <DropdownWrapper onClick={() => handleDropdownOpen(dataItem)}>
        <AiOutlineMore style={categoryStyle} />
        {isOpen && selectedItem === dataItem.idDonThuoc && 
        <Dropdown>
          <DropdownItem>Xem thông tin đơn thuốc</DropdownItem>
          <DropdownItem>Sửa thông tin đơn thuốc</DropdownItem>
          {/* <DropdownItem>Xóa hồ sơ bệnh nhân</DropdownItem> */}
        </Dropdown>}
      </DropdownWrapper>
    </TableRow>
  })

  return <>
    <SliderCategory />
    <PrescriptionWrapper>
      <div className="prescription-title">DANH SÁCH HỒ SƠ BỆNH NHÂN</div>
        <Table style={{ width: "80%", height: "50%", maxWidth: "1200px" }}>
          <TableHead style={{ height: "50px", borderBottom: "2px solid" }}>
            {header?.map((headerItem) => {
              return <span >{headerItem}</span>
            })}
          </TableHead>
          <Scrollbar data={content} />
        </Table>
        <ButtonGroup>
          <Button
            content={buttonContent}
            bgColor={"var(--bg-blue-color)"}
            style={{ margin: "5vh 0 5vh 80%", color: "black" }}
          />
        </ButtonGroup>
    </PrescriptionWrapper>
  </>;
}

export default Prescription;

const PrescriptionWrapper = styled.div`
  width: 100%;
  .prescription-title {
    margin-left: 10%;
    font-weight: 700;
    font-size: 20px;
  }
`

