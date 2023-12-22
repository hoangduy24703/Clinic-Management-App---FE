import api from "../index";

export async function postLichHenIDBN(ID_BENHNHAN, NGAY) {
  return await api.post(`/lichhen/searchLHBN`, {
    ID_BENHNHAN: ID_BENHNHAN,
    NGAY: NGAY
  })
}

export async function postLichHenIDNS(ID_NHASI, NGAY) {
  return await api.post(`/lichhen/searchLHNS`, {
    ID_NHASI: ID_NHASI,
    NGAY: NGAY
  })
}

export async function postLichHenIDPK(ID_PHONGKHAM, NGAY) {
  return await api.post(`/lichhen/searchLHPK`, {
    ID_PHONGKHAM: ID_PHONGKHAM,
    NGAY: NGAY
  })
}

export async function postLichHenDayToDay(NGAY_A, NGAY_B) {
  return await api.post(`/lichhen/searchD2D`, {
    NGAY_A: NGAY_A,
    NGAY_B: NGAY_B
  })
}

export async function postThemLichHen(NGAYHEN, THOIGIANHEN, TINHTRANG, PHONG, GHICHU, BACSI, BENHNHAN, TROKHAM) {
  return await api.post(`/lichhen/createLH`, {
    NGAYHEN: NGAYHEN,
    THOIGIANHEN: THOIGIANHEN,
    TINHTRANG: TINHTRANG,
    PHONG: PHONG,
    GHICHU: GHICHU,
    BACSI: BACSI,
    BENHNHAN: BENHNHAN, 
    TROKHAM: TROKHAM
  })
}

export async function postXoaLichHen(NGAYHEN, THOIGIANHEN, BACSI, BENHNHAN) {
  return await api.post(`/lichhen/deleteLH`, {
    NGAYHEN: NGAYHEN,
    THOIGIANHEN: THOIGIANHEN,
    BACSI: BACSI,
    BENHNHAN: BENHNHAN
  })
}