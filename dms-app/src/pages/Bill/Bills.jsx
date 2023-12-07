import SliderCategory from "../../components/Slider/SliderCategory";
import styled from "styled-components";
import { Table, TableHead, TableRow, ButtonGroup, Dropdown, DropdownItem, DropdownWrapper } from "../Patient/PatientRecords/PatientRecords";
import Scrollbar from "../../components/Scrollbar/Scrollbar";
import { useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
import { dummyData } from "./dummyBill";
import { IoMdAddCircleOutline } from "react-icons/io";
import Button from "../../components/Button/Button";

const header = [
  "ID Hóa Đơn",
  "Ngày Cấp",
  "Loại Thanh Toán",
  "Tên Bệnh Nhân",
  "Tổng Tiền",
  "Ghi Chú"
]

const Bills = () => {
  const data = [...dummyData];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  // const navigate = useNavigate();
  
  const handleDropdownOpen = (value) => {
    setSelectedItem(value.idHoaDon);
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
      <span >{dataItem.idHoaDon}</span>
      <span >{dataItem.ngayCap}</span>
      <span >{dataItem.loaiThanhToan}</span>
      <span >{dataItem.tenBenhNhan}</span>
      <span >{dataItem.tongTien}</span>
      <span >{dataItem.ghiChu}</span>
      <DropdownWrapper onClick={() => handleDropdownOpen(dataItem)}>
        <AiOutlineMore style={categoryStyle} />
        {isOpen && selectedItem === dataItem.idHoaDon && 
        <Dropdown>
          <DropdownItem>Sửa chi tiết hóa đơn</DropdownItem>
          {/* <DropdownItem>Xóa hồ sơ bệnh nhân</DropdownItem> */}
        </Dropdown>}
      </DropdownWrapper>
    </TableRow>
  })

  return <>
    <SliderCategory />
    <BillsWrapper>
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
    </BillsWrapper>
  </>;
}

export default Bills;

const BillsWrapper = styled.div`
`