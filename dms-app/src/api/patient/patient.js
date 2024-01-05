import api from "../index";

export async function getChiTietBenhNhan(IDBENHNHAN) {
  try {
    console.log(IDBENHNHAN);
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

export async function postThemBenhNhan(TENBN, IDPHONGKHAM, NAMSINH, GIOITINH, SDT, EMAIL, DIACHI, MATKHAU, BACSIMD, TTTQ, TTDU, THUOCCHONGCD) {
  const url = '/hosobenhnhan/thembenhnhan'
  const request = {
    TENBN: TENBN, 
    IDPHONGKHAM: IDPHONGKHAM, 
    NAMSINH: NAMSINH, 
    GIOITINH: GIOITINH, 
    SDT: SDT, 
    EMAIL: EMAIL,
    DIACHI: DIACHI, 
    MATKHAU: MATKHAU, 
    BACSIMD: BACSIMD, 
    TTTQ: TTTQ, 
    TTDU: TTDU, 
    THUOCCHONGCD: THUOCCHONGCD
  }
  console.log(request);
  return await api.post(url, request);
}

export async function postCapNhatHoSoBenhNhan(IDBENHNHAN, TENBN, IDPHONGKHAM, NAMSINH, GIOITINH, SDT, EMAIL, DIACHI, MATKHAU, BACSIMD, TTTQ, TTDU, THUOCCHONGCD) {
  let email, matkhau, bacsimacdinh;

  if (EMAIL === '')
    email = null;
  else 
    email = EMAIL;
  if (MATKHAU === '') 
    matkhau = null;
  else
    matkhau = MATKHAU;
  if (BACSIMD === '') 
    bacsimacdinh = null;
  else
    bacsimacdinh = BACSIMD;

  const url = '/hosobenhnhan/capnhat';
  const request = {
    IDBENHNHAN: IDBENHNHAN,
    TENBN: TENBN, 
    IDPHONGKHAM: IDPHONGKHAM, 
    NAMSINH: NAMSINH, 
    GIOITINH: GIOITINH, 
    SDT: SDT, 
    EMAIL: email,
    DIACHI: DIACHI, 
    MATKHAU: matkhau, 
    BACSIMD: bacsimacdinh, 
    TTTQ: TTTQ, 
    TTDU: TTDU, 
    THUOCCHONGCD: THUOCCHONGCD
  };
  console.log(request);
  return await api.post(url, request);
}