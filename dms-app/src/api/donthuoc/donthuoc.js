import api from "../index";

export async function getAllDonThuoc() {
  return await api.get('/donthuoc/getALLDonThuoc');
}

export async function getDonThuoc(IDBENHNHAN) {
  return await api.get(`/donthuoc/getDonThuoc/${IDBENHNHAN}`);
}

export async function addLoaiThuoc(tenthuoc, thanhphan, donvitinh, giathuoc) {
  const request = {
    tenthuoc: tenthuoc,
    thanhphan: thanhphan,
    donvitinh: donvitinh,
    giathuoc: giathuoc
  }
  console.log(donvitinh)
  return await api.post(`/donthuoc/addLoaiThuoc`, request);
}

export async function updateLoaiThuoc(idthuoc, tenthuoc, thanhphan, donvitinh, giathuoc) {
  const request = {
    idthuoc: idthuoc,
    tenthuoc: tenthuoc,
    thanhphan: thanhphan,
    donvitinh: donvitinh,
    giathuoc: giathuoc
  }
  return await api.post(`/donthuoc/updateLoaiThuoc`, request);
}

export async function getChiTietDonThuoc(iddonthuoc) {
  return await api.get(`/donthuoc/chitietdonthuoc/${iddonthuoc}`);
}

export async function addDonThuoc(ctdonthuoc) {
  const request = {
    ...ctdonthuoc
  }
  console.log(request);
  return await api.post(`/donthuoc/addDonThuoc`, request);
}

export async function addChiTietDonThuoc(idthuoc, iddonthuoc, soluong) {
  const request = {
    idthuoc: idthuoc,
    iddonthuoc: iddonthuoc,
    soluong: soluong
  }
  return await api.post('/donthuoc/addChiTietDonThuoc', request);
}

export async function getLoaiThuoc(tenthuoc) {
  return await api.post(`/donthuoc/getLoaiThuoc`, {
    tenthuoc: tenthuoc
  });
}