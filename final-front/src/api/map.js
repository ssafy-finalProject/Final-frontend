import { RestAxios,FormAxios } from "@/util/http-commons";

const Rest = RestAxios();
const Form = FormAxios();
const url = "/detail/";

function registerDetail(data, success, fail) {
    Form.post(`${url}`, data).then(success).catch(fail);
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

export { registerDetail };