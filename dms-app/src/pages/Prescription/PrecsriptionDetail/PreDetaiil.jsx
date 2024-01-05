import styled from "styled-components";
import { useEffect, useState } from "react";
import { getChiTietDonThuoc } from "../../../api/donthuoc/donthuoc";
import { IoMdClose } from "react-icons/io";
import moment from "moment";
import { deleteCTDonThuoc } from "../../../api/donthuoc/donthuoc";
import { useSelector } from "react-redux";
import PopupDeleteDetail from "./PopupDeleteDetail";

export default function PreDetail({title, ID, setIsOpenPopup}) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [overview, setOverview] = useState();
  const [detail, setDetail] = useState();
  const [thuoc, setThuoc] = useState();
  const [idbuoidieutri, setIdbuoidieutri] = useState('');
  const role = useSelector(state => state.auth.role);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  async function loadData() {
    const data = await getChiTietDonThuoc(ID);
    console.log(data?.data?.data?.chitietdonthuoc, data?.data?.isSuccess);
    setOverview(data?.data?.data?.chitietdonthuoc);
    // setDetail(data?.data?.data?.buoidieutri);
    // setIdbuoidieutri(data?.data?.data?.buoidieutri[0].IDBUOIDIEUTRI);
    // setThuoc (data?.data?.data?.thuoc)
    // setIsSuccess(data?.data?.isSuccess);
  }

  function handleClosePopup() {
    setIsOpenPopup(false);
  }

  useEffect(() => {
    loadData();
  }, [isSuccess])
  
  return <>
    {isOpenDelete && <PopupDeleteDetail handleClosePopup={() => setIsOpenDelete(false)} data={overview} selectedItem={selectedItem} IDBUOIDIEUTRI={ID}/>}
    <HDDetailWrapper>
      <IoMdClose style={{cursor: "pointer", right: 10, top: 10, position: "absolute"}} size="30px" onClick={handleClosePopup}/>
      <h2>{title}</h2>
      <h3>CHI TIẾT ĐƠN THUỐC</h3>
      {overview?.map((item, index) => {
        return <HDDetailOverview >
        <h3>CHI TIẾT ĐƠN {index +  1}</h3>
        <HDOverviewItem>
          <span>ID THUỐC</span>
          <span>{item?.IDTHUOC}</span>
        </HDOverviewItem>
        <HDOverviewItem>
          <span>SỐ LƯỢNG</span>
          <span>{item?.SOLUONG}</span>
        </HDOverviewItem>
        <HDOverviewItem>
          <span>TÊN THUỐC</span>
          <span>{item?.TENTHUOC}</span>
        </HDOverviewItem>
        <HDOverviewItem>
          <span>TỔNG GIÁ</span>
          <span>{item?.TONGGIA}</span>
        </HDOverviewItem>
        {(role === `"NS"` || role === `"QT"`) && 
        <Button onClick={() => {
            setIsOpenDelete(true);
            setSelectedItem(item);
          }}>XÓA CHI TIẾT ĐƠN THUỐC</Button>}
    </HDDetailOverview>
      })}
    </HDDetailWrapper>
    </>;
}

const HDDetailWrapper = styled.div`
  position: fixed;
  z-index: 2;
  background-color: var(--bg-grey-1-color);
  left: 10%;
  right: 10%;
  top: 5%;
  bottom: 5%;
  width: auto;
  height: auto;
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

const Button = styled.button`
  margin-top: 2vh;
  border: none;
  background-color: var(--btn-color-2);
  padding: 5px;
  font-weight: 700;
  text-align: center;
  width: 300px;
  border-radius: 10px;
`