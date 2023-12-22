import styled from "styled-components";
import { useEffect, useState } from "react";
import { getBDT } from "../../../api/dieutri/dieutri";
import { IoMdClose } from "react-icons/io";
import moment from "moment";

export default function BDTDetail({title, IDBUOIDIEUTRI}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [overview, setOverview] = useState();
  const [detail, setDetail] = useState();

  async function loadData() {
    const data = await getBDT(IDBUOIDIEUTRI);
    console.log(data?.data?.data?.chitiet, data?.data?.isSuccess);
    setOverview(data?.data?.data?.tongquan[0]);
    setDetail(data?.data?.data?.chitiet);
    setIsSuccess(data?.data?.isSuccess);
  }

  function handleClosePopup() {

  }

  useEffect(() => {
    loadData();
  }, [isSuccess])
  return <>
    <IoMdClose style={{marginLeft: "105%", marginTop: "-20%", cursor: "pointer"}} size="30px" onClick={handleClosePopup}/>
    <BDTDetailWrapper>
      <h2>{title}</h2>
      <BDTDetailOverview>
        <BDTDetailItem>
          <span>BUỔI ĐIỀU TRỊ</span>
          <span>{overview?.IDBUOIDIEUTRI}</span>
        </BDTDetailItem>
        <BDTDetailItem>
          <span>MÃ BỆNH NHÂN</span>
          <span>{overview?.IDBENHNHAN}</span>
        </BDTDetailItem>
        <BDTDetailItem>
          <span>TÊN BỆNH NHÂN</span>
          <span>{overview?.TENBN}</span>
        </BDTDetailItem>
        <BDTDetailItem>
          <span>ĐƠN THUỐC</span>
          <span>{overview?.IDDONTHUOC}</span>
        </BDTDetailItem>
        <BDTDetailItem>
          <span>KẾ HOẠCH ĐIỀU TRỊ</span>
          <span>{overview?.KEHOACHDT}</span>
        </BDTDetailItem>
        <BDTDetailItem>
          <span>MÃ BÁC SĨ CHÍNH</span>
          <span>{overview?.KHAMCHINH_ID}</span>
        </BDTDetailItem>
        <BDTDetailItem>
          <span>TÊN BÁC SĨ CHÍNH</span>
          <span>{overview?.KHAMCHINH_HT}</span>
        </BDTDetailItem>
        <BDTDetailItem>
          <span>MÃ TRỢ KHÁM</span>
          <span>{overview?.TROKHAM_ID}</span>
        </BDTDetailItem>
        <BDTDetailItem>
          <span>TÊN TRỢ KHÁM</span>
          <span>{overview?.TROKHAM_HT}</span>
        </BDTDetailItem>
        <BDTDetailItem>
          <span>MÔ TẢ</span>
          <span>{overview?.MOTABDT}</span>
        </BDTDetailItem>
        <BDTDetailItem>
          <span>GHI CHÚ</span>
          <span>{overview?.GHICHUBDT}</span>
        </BDTDetailItem>
        <BDTDetailItem>
          <span>NGÀY</span>
          <span>{moment(overview?.NGAYDT).format("DD/MM/YYYY")}</span>
        </BDTDetailItem>
      </BDTDetailOverview>
      {/* <BDTDetailDetail>
        <BDTDetailItem> 
          <span>MÃ ĐIỀU TRỊ</span>
          <span>{detail?.MADIEUTRI}</span>
        </BDTDetailItem>
        <BDTDetailItem> 
          <span>TÊN ĐIỀU TRỊ</span>
          <span>{bdtDetail[0]?.TENDIEUTRI}</span>
        </BDTDetailItem>
        <BDTDetailItem> 
          <span>TÊN RĂNG</span>
          <span>{bdtDetail[0]?.TENRANG || "NULL"}</span>
        </BDTDetailItem>
        <BDTDetailItem> 
          <span>MẶT ĐIỀU TRỊ</span>
          <span>{bdtDetail[0]?.MATDIEUTRI || "NULL"}</span>
        </BDTDetailItem>
        <BDTDetailItem> 
          <span>RĂNG ĐIỀU TRỊ</span>
          <span>{bdtDetail?.map((rang) => {
            return <span>{rang}</span>
          })}</span>
        </BDTDetailItem>
      </BDTDetailDetail> */}
    </BDTDetailWrapper>
  </>;
}

const BDTDetailWrapper = styled.div`
  position: absolute;
  z-index: 2;
  background-color: var(--bg-grey-1-color);
  left: 25%;
  right: 25%;
  top: 10%;
  width: auto;
  height: 800px;
  padding: 2vw;
  border-radius: 15px;

  h2 {
    text-align: center;
    font-weight: 700;
    font-size: 50px;
    color: var( --btn-blue-color);
  }
`

const BDTDetailOverview = styled.div`
  margin-top: 5vh;
`

const BDTDetailDetail = styled.div`

`

const BDTDetailItem = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 3px;
  
  span {
    font-weight: 700;
    font-size: auto;
  }
`