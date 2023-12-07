import SliderCategory from "../../../components/Slider/SliderCategory";
import styled from "styled-components";
import { Table, TableHead, TableRow, ButtonGroup, Dropdown, DropdownWrapper, DropdownItem } from "../../Patient/PatientRecords/PatientRecords";
import Button from "../../../components/Button/Button";
import Scrollbar from "../../../components/Scrollbar/Scrollbar";
import { useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
import { dummyData } from "./dummyPreDetail";
import { IoMdAddCircleOutline } from "react-icons/io";


const header = [
  "ID Thuốc",
  "Tên Thuốc",
  "Số Lượng",
  "Giá"
]

const PrescriptionDetail = () => {
  const data = [...dummyData];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  // const navigate = useNavigate();
  
  const handleDropdownOpen = (value) => {
    setSelectedItem(value.idThuoc);
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
      <span >{dataItem.idThuoc}</span>
      <span >{dataItem.tenThuoc}</span>
      <span >{dataItem.soLuong}</span>
      <span >{dataItem.gia}</span>
      <DropdownWrapper onClick={() => handleDropdownOpen(dataItem)}>
        <AiOutlineMore style={categoryStyle} />
        {isOpen && selectedItem === dataItem.idThuoc && 
        <Dropdown>
          <DropdownItem>Sửa chi tiết thuốc</DropdownItem>
          {/* <DropdownItem>Xóa hồ sơ bệnh nhân</DropdownItem> */}
        </Dropdown>}
      </DropdownWrapper>
    </TableRow>
  })

  return <>
    <SliderCategory />
    <PrescriptionDetailWrapper>
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
    </PrescriptionDetailWrapper>
  </>;
} 

export default PrescriptionDetail;

const PrescriptionDetailWrapper = styled.div`
  width: 100%;
  .prescription-title {
    margin-left: 10%;
    font-weight: 700;
    font-size: 20px;
  }
`