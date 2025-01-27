import styled from "styled-components";
import { useEffect, useState } from "react";
import { getBDT } from "../../../api/dieutri/dieutri";
import { IoMdClose } from "react-icons/io";
import moment from "moment";
import CreateCTDT from "./CreateCTDT";
import { useSelector } from "react-redux";

export default function BDTDetail({title, ID, setIsOpenPopup}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [overview, setOverview] = useState();
  const [detail, setDetail] = useState();
  const [isOpenAddCTDT, setIsOpenAddCTDT] = useState(false);
  const role = useSelector(state => state.auth.role);
  

  async function loadData() {
    console.log(ID);
    const data = await getBDT(ID);
    console.log(data);
    // console.log(data?.data?.data?.chitiet, data?.data?.data?.tongquan[0]);
    setOverview(data?.data?.data?.tongquan[0]);
    setDetail(data?.data?.data?.chitiet);
    setIsSuccess(data?.data?.isSuccess);
  }

  function handleClosePopup() {
    setIsOpenPopup(false);
  }

  useEffect(() => {
    loadData();
  }, [isSuccess]);
  
  return <>
    <BDTDetailWrapper>
      {isOpenAddCTDT && <CreateCTDT handleClosePopup={() => {setIsOpenAddCTDT(false); }} IDBUOIDIEUTRI={overview?.IDBUOIDIEUTRI}/>}
      <IoMdClose style={{cursor: "pointer", right: 10, top: 10, position: "absolute"}} size="30px" onClick={handleClosePopup}/>
      <h2>{title}</h2>
      <h3>TỔNG QUAN</h3>
      <BDTDetailOverview >
        <BDTOverviewItem>
          <span>BUỔI ĐIỀU TRỊ</span>
          <span>{overview?.IDBUOIDIEUTRI}</span>
        </BDTOverviewItem>
        <BDTOverviewItem>
          <span>MÃ BỆNH NHÂN</span>
          <span>{overview?.IDBENHNHAN}</span>
        </BDTOverviewItem>
        <BDTOverviewItem>
          <span>TÊN BỆNH NHÂN</span>
          <span>{overview?.TENBN}</span>
        </BDTOverviewItem>
        <BDTOverviewItem>
          <span>ĐƠN THUỐC</span>
          <span>{overview?.IDDONTHUOC}</span>
        </BDTOverviewItem>
        <BDTOverviewItem>
          <span>KẾ HOẠCH ĐIỀU TRỊ</span>
          <span>{overview?.KEHOACHDT}</span>
        </BDTOverviewItem>
        <BDTOverviewItem>
          <span>MÃ BÁC SĨ CHÍNH</span>
          <span>{overview?.KHAMCHINH_ID}</span>
        </BDTOverviewItem>
        <BDTOverviewItem>
          <span>TÊN BÁC SĨ CHÍNH</span>
          <span>{overview?.KHAMCHINH_HT}</span>
        </BDTOverviewItem>
        <BDTOverviewItem>
          <span>MÃ TRỢ KHÁM</span>
          <span>{overview?.TROKHAM_ID}</span>
        </BDTOverviewItem>
        <BDTOverviewItem>
          <span>TÊN TRỢ KHÁM</span>
          <span>{overview?.TROKHAM_HT}</span>
        </BDTOverviewItem>
        <BDTOverviewItem>
          <span>MÔ TẢ</span>
          <span>{overview?.MOTABDT}</span>
        </BDTOverviewItem>
        <BDTOverviewItem>
          <span>GHI CHÚ</span>
          <span>{overview?.GHICHUBDT}</span>
        </BDTOverviewItem>
        <BDTOverviewItem>
          <span>NGÀY</span>
          <span>{moment(overview?.NGAYDT).format("DD/MM/YYYY")}</span>
        </BDTOverviewItem>
        <BDTOverviewItem>
          <span>TỔNG TIỀN</span>
          <span>{overview?.TONGTIEN}</span>
        </BDTOverviewItem>
      </BDTDetailOverview>
      <h3>CHI TIẾT</h3>
      <BDTDetailDetail>
        {detail?.map((detailItem) => {
          return <>
          <BDTDetailItem>
            <span>MÃ ĐIỀU TRỊ</span>
            <span>{detailItem.MADIEUTRI}</span>
          </BDTDetailItem>
          <BDTDetailItem>
            <span>TÊN ĐIỀU TRỊ</span>
            <span>{detailItem.TENDIEUTRI}</span>
          </BDTDetailItem>
          <BDTDetailItem>
            <span>TÊN RĂNG</span>
            <span>{detailItem.TENRANG}</span>
          </BDTDetailItem>
          <BDTDetailItem>
            <span>MẶT ĐIỀU TRỊ</span>
            <span>{detailItem.MATDIEUTRI}</span>
          </BDTDetailItem>
          </>
        })}
      </BDTDetailDetail>
      {(role === `"NS"` || role === `"QT"` ) && <Button onClick={() => setIsOpenAddCTDT(true)}>THÊM CHI TIẾT ĐIÊU TRỊ</Button>}
    </BDTDetailWrapper>
  </>;
}

const BDTDetailWrapper = styled.div`
  position: absolute;
  z-index: 2;
  background-color: var(--bg-grey-1-color);
  left: 10%;
  right: 10%;
  top: 10%;
  bottom: 10%
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

const BDTDetailOverview = styled.div`
  height: 290px;
  overflow-y: scroll;
`

const BDTDetailDetail = styled.div`
  margin-top: 3vh;
  height: 250px;
  overflow-y: scroll;
`

const BDTDetailItem = styled.div`
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

const BDTOverviewItem = styled.div`
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
const Button = styled.button`
  margin-top: 2vh;
  border: none;
  border-radius: 10px;
  background-color: var(--btn-color-1);
  padding: 5px;
  width: 300px;
  font-weight: 700;
`