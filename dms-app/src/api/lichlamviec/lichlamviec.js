import api from "../index";

export async function postLichLamViec(ID_NHASI, NGAY_A, NGAY_B) {
  return await api.post(`/lichlamviec/searchLLV`, {
    ID_NHASI: ID_NHASI,
    NGAY_A: NGAY_A,
    NGAY_B: NGAY_B
  })
}

export async function postThemLichLamViec(ID_NHANVIEN, NGAY, ID_CALAM) {
  // console.log("run here")
  return await api.post(`/lichlamviec/createLLV`, {
    ID_NHANVIEN: ID_NHANVIEN,
    NGAY: NGAY,
    ID_CALAM: ID_CALAM
  })
}

export async function postXoaLichLamViec(ID_NHANVIEN, NGAY, ID_CALAM) {
  return await api.post(`/lichlamviec/deleteLLV`, {
    ID_NHANVIEN: ID_NHANVIEN,
    NGAY: NGAY,
    ID_CALAM: ID_CALAM
  })
}

export async function postCapNhatLichLamViec(IDNHANVIEN, NGAY, IDCALAM, NGAY_NEW, ID_CALAM_NEW) {
  console.log(IDNHANVIEN, NGAY, IDCALAM, NGAY_NEW, ID_CALAM_NEW);
  return await api.post(`/lichlamviec/updateLLV`, {
    ID_NHANVIEN: IDNHANVIEN,
    NGAY: NGAY,
    ID_CALAM: IDCALAM,
    NGAY_NEW: NGAY_NEW,
    ID_CALAM_NEW: ID_CALAM_NEW
  })
}