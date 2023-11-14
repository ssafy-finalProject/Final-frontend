<script setup>
import { ref, onMounted } from "vue";
import { useRoute,useRouter } from "vue-router";
import {getArticle,deleteArticle} from "@/api/board"
const boardArticle = ref({
  user_id:"",
  article_no: "",
  subject: "",
  content:"",
  register_time:"",
  hit:"",

});
const router=useRouter();
const route = useRoute();
//console.log(route.params.no);
boardArticle.article_no = route.params.no;
//console.log("Asdasdasd"+boardArticle.article_no);

onMounted(()=>{
  getArticle(route.params.no,
  (success)=>{
    console.log(success.data);
    boardArticle.value = success.data;
    console.log(boardArticle.value.subject);
  },
  (fail)=>{
    console.log(fail);
  })
});


const deleteArt = ()=>{
  console.log("글 삭제시도")
  console.log(boardArticle.value.article_no);
  deleteArticle(boardArticle.value.article_no,
  (successMsg) => {
      console.log(successMsg);
    },
    (error) => {
      console.log(error);
    }
    );
    router.push("/board");
}


</script>

<template>
  <!-- <c:if test="${article eq null}">
		<script>
		alert("글이 삭제되었거나 부적절한 URL 접근입니다.");
		location.href = "${root}/article/list";
		</script>
	</c:if> -->
     <!-- <%@ include file="/include/nav.jsp" %> -->
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10 col-sm-12">
          <h2 class="my-3 py-3 shadow-sm bg-light text-center">
            <mark class="sky">글보기</mark>
          </h2>
        </div>
        <div class="col-lg-8 col-md-10 col-sm-12">
          <div class="row my-2">
            <h1 class="text-secondary px-5">{{boardArticle.article_no}}. {{boardArticle.subject}}</h1>
          </div>
          <div class="row">
            <div class="col-md-8">
              <div class="clearfix align-content-center">
                <img
                  class="avatar me-2 float-md-start bg-light p-2"
                  src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
                />
                <p>
                  <p class="fw-bold">{{boardArticle.user_id}}</p> <br />
                  <span class="text-secondary fw-light"> 작성날짜 : {{boardArticle.register_time}}  
                    <div>조회 : {{boardArticle.hit}}</div> </span>
                </p>
              </div>
            </div>
            <!-- <div class="col-md-4 align-self-center text-end">댓글 : 17</div> -->
            <div class="divider mb-3"></div>
            <div class="text-secondary">
              <h2>{{boardArticle.content}}</h2>
            </div>
            <div class="divider mt-3 mb-3"></div>
            <div class="d-flex justify-content-end">
              <router-link to="/board">
              <button type="button" id="btn-list" class="btn btn-outline-primary mb-3">
                글목록
              </button>
            </router-link>
              <!-- <c:if test="${userInfo.userId eq article.user_id}"> -->
                <template v-if="boardArticle.article_no">
                <router-link :to="{ name: 'boardmodify', params: { no: boardArticle.article_no } }">
              <button type="button" id="btn-mv-modify" class="btn btn-outline-success mb-3 ms-1">
                글수정
              </button>
              </router-link>
            </template>
              <button type="button" id="btn-delete" class="btn btn-outline-danger mb-3 ms-1" @click="deleteArt">
                글삭제
              </button>
              <!-- </c:if> -->
            </div>
          </div>
        </div>
      </div>
</template>

<style scoped>

</style>