import api from "../index";

export async function getHoaDon(IDBENHNHAN) {
  return await api.get(`/hoadon/getHoaDon/${IDBENHNHAN}`);
}

export async function getChiTietHoaDon(IDHOADON) {
  return await api.get(`/hoadon/getHoaDon/chitiethoadon/${IDHOADON}`);
}

export async function getHoaDonNgay(date) {
  console.log(date);
  return await api.get(`/hoadon/getHoaDon/date/${date}`);
}

export async function addHoaDon(loaithanhtoan, ghichuhoadon, ngaygiaodich, idbenhnhan, idbuoidieutri) {
  return await api.get(`/hoadon/addHoaDon`, {
    loaithanhtoan: loaithanhtoan, 
    ghichuhoadon: ghichuhoadon, 
    ngaygiaodich: ngaygiaodich, 
    idbenhnhan: idbenhnhan, 
    idbuoidieutri: idbuoidieutri
  })
}