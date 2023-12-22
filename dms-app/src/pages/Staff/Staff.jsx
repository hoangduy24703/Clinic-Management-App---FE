import Search from "../../components/Search/Search";
import SliderCategory from "../../components/Slider/SliderCategory";
import { Table, TableHead, TableRow, Dropdown, DropdownItem, DropdownWrapper } from "../Patient/PatientRecords/PatientRecords";
import styled from "styled-components";
import { ButtonGroup } from "../Patient/PatientRecords/PatientRecords";
import { useEffect, useState } from "react";
import { getDanhSachNhanVien } from "../../api/nhanvien/nhanvien"
import moment from "moment";
import { AiOutlineMore } from "react-icons/ai";
import Scrollbar from "../../components/Scrollbar/Scrollbar";

const header = [
  "ID NHÂN VIÊN",
  "TÊN NHÂN VIÊN",
  "NĂM SINH",
  "SỐ ĐIỆN THOẠI",
  "LOẠI NHÂN VIÊN",
  "MẬT KHẨU", 
  "PHÒNG KHÁM"
];

export default function Staff() {
  const [data, setData] = useState([]);

  const categoryStyle = {
    cursor: "pointer",
    marginLeft: "80%",
  }

  async function loadData() {
    const dataStaff = await getDanhSachNhanVien();
    console.log(dataStaff);
    setData(dataStaff?.data?.data);
  }

  useEffect(() => {
    loadData();
  }, [])

  const content = data?.map((dataItem, index) => {
    return <CustomTableRow key={index}>
      <span>{dataItem.IDNHANVIEN}</span>
      <span>{dataItem.TENNV}</span>
      <span>{moment(dataItem.NAMSINH).format("DD/MM/YYYY")}</span>
      <span>{dataItem.SODIENTHOAINV}</span>
      <span>{dataItem.LOAINV}</span>
      <span>{dataItem.MATKHAU}</span>
      <span>{dataItem.IDPHONGKHAM}</span>
    </CustomTableRow>
  });

  return (<>
    <SliderCategory />
    {/* <div style={{display: "flex"}}>
      <Search onSubmit={handleSubmit} content={" Nhập mã bệnh nhân "} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    </div> */}
    <StaffWrapper>
      <Table style={{ width: "80%", height: "50%", maxWidth: "1200px" }}>
        <CustomerTableHead style={{ height: "50px", borderBottom: "2px solid" }}>
          {header?.map((headerItem) => {
            return <span>{headerItem}</span>
          })}
        </CustomerTableHead>
        <Scrollbar data={content} />
        <ButtonGroup>
          {/* <Button onClick={handleCreatePatient}>{buttonContent.name} {buttonContent.title}</Button> */}
        </ButtonGroup>
      </Table>
    </StaffWrapper>
  </>)
}

const StaffWrapper = styled.div`
  width: 100%;
`

const CustomTableRow = styled(TableRow)`
  grid-template-columns: repeat(${header.length}, 1fr);
`

const CustomerTableHead = styled(TableHead)`
  grid-template-columns: repeat(${header.length}, 1fr);
`