import { RestAxios } from "@/util/http-commons";

const Rest = RestAxios();

const url = "/board";

function totalArticle(success, fail) {
  Rest.get(`${url}`).then(success).catch(fail);
}

function listArticle(key, word, pgno, success, fail) {
  Rest.get(`${url}/list?key=${key}&word=${word}&pgno=${pgno}`).then(success).catch(fail);
}

function writeArticle(boardInfo, success, fail) {
  Rest.post(`${url}`, boardInfo).then(success).catch(fail);
}

function deleteArticle(articleno, success, fail) {
  Rest.delete(`${url}/` + articleno)
    .then(success)
    .catch(fail);
}

function getArticle(articleno, success, fail) {
  Rest.get(`${url}/` + articleno, articleno)
    .then(success)
    .catch(fail);
}

function modifyArticle(articleno, boardInfo, success, fail) {
  Rest.put(`${url}/` + articleno, JSON.stringify(boardInfo))
    .then(success)
    .catch(fail);
}
export { listArticle, totalArticle, writeArticle, deleteArticle, getArticle, modifyArticle };
