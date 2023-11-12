import { RestAxios } from "@/util/http-commons";

const Rest = RestAxios();

function initAndGetSidoList(success, fail){
    Rest.get(`att/newpage`).then(success).catch(fail);
}

function getGugunList(sidocode,success, fail){
    Rest.get(`att/getGugun/`+sidocode).then(success).catch(fail);
}

function resultSearchList(sidocode,guguncode,keyword,success, fail){
    Rest.get(`att/getGugun/`+sidocode+`/`+guguncode+`/`+keyword).then(success).catch(fail);
}

export {initAndGetSidoList,getGugunList,resultSearchList };