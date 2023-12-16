import api from "../index";

export async function getListBDTbyID(IDBENHNHAN) {
  const response = await api.get(`/dieutri/ListBDT/benhnhan/${IDBENHNHAN}`);
  return response;
}

export async function getListBDTbyDate(DATEA, DATEB) {
  console.log(DATEA, DATEB);
  const response = await api.get(`/dieutri/ListBDT/date/${DATEA}/${DATEB}`)
  return response;
}

export async function getKeHoach(IDKEHOACHDIEUTRI) {
  const response = await api.get(`/dieutri/KeHoach/${IDKEHOACHDIEUTRI}`);
  return response;
}

export async function getBDT(IDBUOIDIEUTRI) {
  const response = await api.get(`/dieutri/BDT/${IDBUOIDIEUTRI}`);
  return response;
}

export async function addBDT(MABENHNHAN, IDBUOIDIEUTRI, MOTA, GHICHU, NGAY, KHAMCHINH, TROKHAM, KEHOACH) {
  const request = {
    MABENHNHAN: MABENHNHAN,
    IDBUOIDIEUTRI: IDBUOIDIEUTRI, 
    MOTA: MOTA,
    GHICHU: GHICHU,
    NGAY: NGAY,
    KHAMCHINH: KHAMCHINH,
    TROKHAM: TROKHAM,
    KEHOACH: KEHOACH
  }
  const response = await api.post(`/dieutri/addBDT`, request);
  return response;
}

export async function addKeHoach(IDDIEUTRI, MOTAKHDT, TRANGTHAI, GHICHUKHDT, TONGGIA, BENHNHAN, BSPHUTRACH) {
  const request = {
    IDDIEUTRI: IDDIEUTRI,
    MOTAKHDT: MOTAKHDT,
    TRANGTHAI: TRANGTHAI,
    GHICHUKHDT: GHICHUKHDT,
    TONGGIA: TONGGIA,
    BENHNHAN: BENHNHAN,
    BSPHUTRACH: BSPHUTRACH
  }
  const response = await api.post(`/dieutri/addKeHoach`, request);
  return response;
}