import api from "../index";

export async function getChiTietBenhNhan(IDBENHNHAN) {
  try {
    const response = await api.get(`/hosobenhnhan/${IDBENHNHAN}`);
    return response;
  }
  catch (err) {
    console.log(err);
  }
}

export async function postDanhSachBenhNhan(TENBN) {
  try {
      const url = '/hosobenhnhan/timkiem'
      const request = {
        "TENBN": TENBN
      }
      console.log(request);
      const response = await api.post(url, request);
      return response;
  }
  catch(err) {
    console.log(err);
  }
}