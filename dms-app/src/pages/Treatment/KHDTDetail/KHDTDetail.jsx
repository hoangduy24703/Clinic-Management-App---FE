import styled from "styled-components";
import { useEffect, useState } from "react";
import { getKeHoach } from "../../../api/dieutri/dieutri";
import { IoMdClose } from "react-icons/io";
import moment from "moment";

export default function KHDTDetail({title, ID, setIsOpenPopup}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [kehoach, setKehoach] = useState();
  const [listBDT, setListBDT] = useState();

  async function loadData() {
    const data = await getKeHoach(ID);
    console.log(data);
    setKehoach(data?.data?.data?.kehoach[0]);
    setListBDT(data?.data?.data?.listBDT);
    setIsSuccess(data?.data?.isSuccess);
  }

  function handleClosePopup() {
    setIsOpenPopup(false);
  }

  useEffect(() => {
    loadData();
  }, [isSuccess])
  return <>
    <KHDTDetailWrapper>
      <IoMdClose style={{cursor: "pointer", right: 10, top: 10, position: "absolute"}} size="30px" onClick={handleClosePopup}/>
      <h2>{title}</h2>
      <h3>KẾ HOẠCH</h3>
      <KHDTKehoach>
          <KHDTKehoachItem>
            <span>BỆNH NHÂN</span>
            <span>{kehoach?.BENHNHAN}</span>
          </KHDTKehoachItem>
          <KHDTKehoachItem>
            <span>BÁC SĨ PHỤ TRÁCH</span>
            <span>{kehoach?.BSPHUTRACH}</span>
          </KHDTKehoachItem>
          <KHDTKehoachItem>
            <span>GHI CHÚ</span>
            <span>{kehoach?.GHICHUKHDT}</span>
          </KHDTKehoachItem>
          <KHDTKehoachItem>
            <span>ID ĐIỀU TRỊ</span>
            <span>{kehoach?.IDDIEUTRI}</span>
          </KHDTKehoachItem>
          <KHDTKehoachItem>
            <span>TÊN BỆNH NHÂN</span>
            <span>{kehoach?.TENBN}</span>
          </KHDTKehoachItem>
          <KHDTKehoachItem>
            <span>TÊN NHÂN VIÊN</span>
            <span>{kehoach?.TENNV}</span>
          </KHDTKehoachItem>
          <KHDTKehoachItem>
            <span>TRẠNG THÁI</span>
            <span>{kehoach?.TRANGTHAI}</span>
          </KHDTKehoachItem>
      </KHDTKehoach>
      <h3>DANH SÁCH BUỔI ĐIỀU TRỊ</h3>
      <KHDTListBDT>
        {listBDT?.map((item) => {
          return <>
          <h4 style={{marginTop: "1vh"}}>BUỔI ĐIỀU TRỊ {item?.IDBUOIDIEUTRI}</h4>
          <KHDTListBDTItem>
            <span>BỆNH NHÂN</span>
            <span>{item?.BNKHAMLE}</span>
          </KHDTListBDTItem>
          <KHDTListBDTItem>
            <span>GHI CHÚ BĐT</span>
            <span>{item?.GHICHUBDT}</span>
          </KHDTListBDTItem>
          <KHDTListBDTItem>
            <span>KHÁM CHÍNH</span>
            <span>{item?.KHAMCHINH}</span>
          </KHDTListBDTItem>
          <KHDTListBDTItem>
            <span>TRỢ KHÁM</span>
            <span>{item?.TROKHAM}</span>
          </KHDTListBDTItem>
          <KHDTListBDTItem>
            <span>MÔ TẢ BĐT</span>
            <span>{item?.MOTABDT}</span>
          </KHDTListBDTItem>
          <KHDTListBDTItem>
            <span>NGÀY ĐIỀU TRỊ</span>
            <span>{item?.NGAYDT}</span>
          </KHDTListBDTItem>
          <KHDTListBDTItem>
            <span>TỔNG TIỀN</span>
            <span>{item?.TONGTIEN}</span>
          </KHDTListBDTItem>
          </>
          
        })}
      </KHDTListBDT>
    </KHDTDetailWrapper>
  </>;
}

const KHDTDetailWrapper = styled.div`
  position: fixed;
  z-index: 2;
  background-color: var(--bg-grey-1-color);
  left: 10%;
  right: 10%;
  top: 10%;
  bottom: 10%;
  width: auto;
  height: auto;
  padding: 2vw;
  border-radius: 15px;
  
  h2 {
    text-align: center;
    font-weight: 700;
    font-size: 50px;
    color: var(--btn-blue-color);
  }

  h3 {
    margin-top: 1vh;
    color: var(--btn-blue-color);
  }
`

const KHDTKehoach = styled.div`
  height: 290px;
  overflow-y: scroll;
`

const KHDTListBDT = styled.div`
  margin-top: 3vh;
  height: 250px;
  overflow-y: scroll;
`

const KHDTListBDTItem = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 3px;
  span {
    font-weight: 700;
    font-size: auto;
    background-color: var(--table-bg-color);
    width: 500px;
    padding: 5px 10px;
    border-radius: 15px;
    margin-left: 40px;
  }
` 

const KHDTKehoachItem = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 5px;
  span {
    font-weight: 700;
    font-size: auto;
    background-color: var(--table-bg-color);
    width: 500px;
    padding: 5px 10px;
    border-radius: 15px;
    margin-left: 40px;
  }
`