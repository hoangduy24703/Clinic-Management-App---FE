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

export async function getListKHbyID(IDBENHNHAN) {
  const response = await api.get(`/dieutri/ListKH/benhnhan/${IDBENHNHAN}`);
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

export async function addBDT(bdt) {
  const request = {
    ...bdt
  }
  console.log(request);
  const response = await api.post(`/dieutri/addBDT`, request);
  return response;
}

export async function addKeHoach(MOTAKHDT, TRANGTHAI, GHICHUKHDT, BENHNHAN, BSPHUTRACH) {
  const request = {
    MOTAKHDT: MOTAKHDT,
    TRANGTHAI: TRANGTHAI,
    GHICHUKHDT: GHICHUKHDT,
    BENHNHAN: BENHNHAN,
    BSPHUTRACH: BSPHUTRACH
  }
  console.log(request);

  const response = await api.post(`/dieutri/addKeHoach`, request);
  return response;
}

export async function addChiTietDT(IDBUOIDIEUTRI, MADIEUTRI) {
  return await api.post(`/dieutri/addChiTietDT`, {
    MADIEUTRI: MADIEUTRI,
    IDBUOIDIEUTRI: IDBUOIDIEUTRI
  })
}

export async function deleteBDT(IDBUOIDIEUTRI) {
  return await api.post(`/dieutri/deleteBDT`, {
    IDBUOIDIEUTRI: IDBUOIDIEUTRI
  })
}