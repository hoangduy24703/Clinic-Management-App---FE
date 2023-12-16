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