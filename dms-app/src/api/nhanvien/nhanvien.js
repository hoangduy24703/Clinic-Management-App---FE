import api from "../index";

export async function getDanhSachNhanVien() {
  return await api.get(`/dsnhanvien`);
}