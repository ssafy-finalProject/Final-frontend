import { RestAxios, FormAxios } from "@/util/http-commons";

const Rest = RestAxios();
const anotherRest = FormAxios();
const url = "/board";

function totalArticle(success, fail) {
  Rest.get(`${url}`).then(success).catch(fail);
}

function listArticle(key, word, pgno, success, fail) {
  Rest.get(`${url}/list?key=${key}&word=${word}&pgno=${pgno}`).then(success).catch(fail);
}

function writeArticle(data, success, fail) {
  anotherRest.post(`${url}`, data).then(success).catch(fail);
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

function listMyArticle(id, word, pgno, success, fail) {
  Rest.get(`${url}/mylist?id=${id}&word=${word}&pgno=${pgno}`).then(success).catch(fail);
}

export { listArticle, totalArticle, writeArticle, deleteArticle, getArticle, modifyArticle, listMyArticle };
