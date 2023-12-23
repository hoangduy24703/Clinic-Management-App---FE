import styled from "styled-components";
import { useEffect, useState } from "react";
import { getChiTietHoaDon } from "../../../api/hoadon/hoadon";
import { IoMdClose } from "react-icons/io";
import moment from "moment";

export default function BillsDetail({title, ID, setIsOpenPopup}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [overview, setOverview] = useState();
  const [detail, setDetail] = useState();
  const [thuoc, setThuoc] = useState();
  const [idbuoidieutri, setIdbuoidieutri] = useState('');

  async function loadData() {
    const data = await getChiTietHoaDon(ID);
    console.log(data?.data?.data?.hoadon, data?.data?.isSuccess);
    setOverview(data?.data?.data?.hoadon[0]);
    setDetail(data?.data?.data?.buoidieutri);
    setIdbuoidieutri(data?.data?.data?.buoidieutri[0].IDBUOIDIEUTRI);
    setThuoc (data?.data?.data?.thuoc)
    setIsSuccess(data?.data?.isSuccess);
  }

  function handleClosePopup() {
    setIsOpenPopup(false);
  }

  useEffect(() => {
    loadData();
  }, [isSuccess])
  return <>
    <HDDetailWrapper>
      <IoMdClose style={{cursor: "pointer", right: 10, top: 10, position: "absolute"}} size="30px" onClick={handleClosePopup}/>
      <h2>{title}</h2>
      <h3>CHI TIẾT HÓA ĐƠN</h3>
      <HDDetailOverview >
        <HDOverviewItem>
          <span>ID HÓA ĐƠN</span>
          <span>{overview?.IDHOADON}</span>
        </HDOverviewItem>
        <HDOverviewItem>
          <span>TỔNG TIỀN</span>
          <span>{overview?.TONGTIEN}</span>
        </HDOverviewItem>
        <HDOverviewItem>
          <span>LOẠI THANH TOÁN</span>
          <span>{overview?.LOAITHANHTOAN}</span>
        </HDOverviewItem>
        <HDOverviewItem>
          <span>GHI CHÚ HÓA ĐƠN</span>
          <span>{overview?.GHICHUHOADON}</span>
        </HDOverviewItem>
        <HDOverviewItem>
          <span>NGÀY GIAO DỊCH</span>
          <span>{moment(overview?.NGAYGIAODICH).format("DD/MM/YYYY")}</span>
        </HDOverviewItem>
    </HDDetailOverview>
      <h3>CHI TIẾT BUỔI ĐIỀU TRỊ</h3>
        <HDDetailDetail>
            <HDDetailItem>
                <span>ID BUỔI ĐIỀU TRỊ</span>
                <span>{idbuoidieutri}</span>
            </HDDetailItem>
        {detail?.map((detailItem) => {
          return <>
          <HDDetailItem>
            <span>MÃ ĐIỀU TRỊ</span>
            <span>{detailItem.MADIEUTRI}</span>
          </HDDetailItem>
          <HDDetailItem>
            <span>TÊN ĐIỀU TRỊ</span>
            <span>{detailItem.TENDIEUTRI}</span>
          </HDDetailItem>
          <HDDetailItem>
            <span>GIÁ</span>
            <span>{detailItem.GIA}</span>
          </HDDetailItem>
          </>
        })}
      </HDDetailDetail>
      <h3>CHI TIẾT ĐƠN THUỐC</h3>
      <HDDetailThuoc>
        {thuoc?.map((thuocItem) => {
            return <>
            <HDDetailItemThuoc>
                <span>ID THUỐC</span>
                <span>{thuocItem.IDTHUOC}</span>
            </HDDetailItemThuoc>
            <HDDetailItemThuoc>
                <span>TÊN THUỐC</span>
                <span>{thuocItem.TENTHUOC}</span>
            </HDDetailItemThuoc>
            <HDDetailItemThuoc>
                <span>SỐ LƯỢNG</span>
                <span>{thuocItem.SOLUONG}</span>
            </HDDetailItemThuoc>
            <HDDetailItemThuoc>
                <span>GIÁ THUỐC</span>
                <span>{thuocItem.GIATHUOC}</span>
            </HDDetailItemThuoc>
            </>
        })}
        <HDDetailItemThuoc>
            
        </HDDetailItemThuoc>
      </HDDetailThuoc>
    </HDDetailWrapper>
    </>;
}

const HDDetailWrapper = styled.div`
  position: fixed;
  z-index: 2;
  background-color: var(--bg-grey-1-color);
  left: 10%;
  right: 10%;
  top: 0;
  width: auto;
  height: 800px;
  padding: 2vw;
  border-radius: 15px;
  overflow-y: scroll;
  
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

const HDDetailOverview = styled.div`
  height: 290px;
  overflow-y: scroll;
`

const HDDetailDetail = styled.div`
  margin-top: 3vh;
  height: 250px;
  overflow-y: scroll;
`

const HDDetailItem = styled.div`
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

const HDDetailItemThuoc = styled.div`
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

const HDDetailThuoc = styled.div`
margin-top: 3vh;
height: 250px;
overflow-y: scroll;
`

const HDOverviewItem = styled.div`
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