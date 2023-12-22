import api from "../index";

export async function postLichLamViec(ID_NHASI, NGAY_A, NGAY_B) {
  console.log()
  return await api.post(`/lichlamviec/searchLLV`, {
    ID_NHASI: ID_NHASI,
    NGAY_A: NGAY_A,
    NGAY_B: NGAY_B
  })
}