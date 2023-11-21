import { RestAxios, FormAxios } from "@/util/http-commons";

const Rest = RestAxios();
const Form = FormAxios();
const url = "/detail";

function registerDetail(data, success, fail) {
  Rest.post(`${url}`, data).then(success).catch(fail);
}

function listDetail(articleNo, success, fail) {
  Rest.get(`${url}/list/${articleNo}`).then(success).catch(fail);
}

function findDetail(placeName, success, fail) {
  Rest.get(`${url}`, placeName).then(success).catch(fail);
}

function modifyDetail(detailDto, success, fail) {
  Rest.put(`${url}`, JSON.stringify(detailDto)).then(success).catch(fail);
}

// function initAndGetSidoList(success, fail){
//     Rest.get(`att/newpage`).then(success).catch(fail);
// }

// function getGugunList(sidocode,success, fail){
//     Rest.get(`att/getGugun/`+sidocode).then(success).catch(fail);
// }

// function resultSearchList(sidocode,guguncode,keyword,success, fail){
//     Rest.get(`att/getGugun/`+sidocode+`/`+guguncode+`/`+keyword).then(success).catch(fail);
// }

export { registerDetail, listDetail, findDetail, modifyDetail };
