import { RestAxios } from "@/util/http-commons";

const Rest = RestAxios();

const url = "/board";

function writeArticle(boardInfo,success,fail){
    Rest.post(`${url}`,boardInfo).then(success).catch(fail);
}

function deleteArticle(articleno){
    Rest.delete(`${url}/`+articleno).then(success).catch(fail);
}

export{writeArticle,deleteArticle};