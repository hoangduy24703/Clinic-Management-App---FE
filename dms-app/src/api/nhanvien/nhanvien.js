import api from "../index";

export async function getDanhSachNhanVien() {
  return await api.get(`/dsnhanvien`);
}

export async function postNhanVienQuaTen(TEN) {
  return await api.post(`/nhanvien/timkiem`, {
    TENNV: TEN
  });
}

export async function getChiTietNhanVien(id) {
  return await api.get(`/nhanvien/chitietnhanvien/${id}`)
}

export async function postThemNhanVien(TENNV, NAMSINH, GIOITINH, SDT, MATKHAU, LOAINV, IDPHONGKHAM) {
  return await api.post('/nhanvien/themnhanvien', {
    TENNV: TENNV, 
    NAMSINH: NAMSINH, 
    GIOITINH: GIOITINH, 
    SDT: SDT, 
    MATKHAU: MATKHAU, 
    LOAINV: LOAINV, 
    IDPHONGKHAM: IDPHONGKHAM
  });
}

export async function postXoaNhanVien(IDNHANVIEN) {
  return await api.post('/nhanvien/xoanhanvien', {
    IDNHANVIEN: IDNHANVIEN
  })
}