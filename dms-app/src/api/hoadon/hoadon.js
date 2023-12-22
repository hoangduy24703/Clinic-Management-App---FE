import api from "../index";

export async function getHoaDon(IDBENHNHAN) {
  return await api.get(`/hoadon/getHoaDon/${IDBENHNHAN}`);
}

export async function getChiTietHoaDon(IDHOADON) {
  return await api.get(`/hoadon/getHoaDon/chitiethoadon/${IDHOADON}`);
}