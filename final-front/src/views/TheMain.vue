<script setup>
import TheWholeList from "./TheWholeList.vue";
</script>

<template>
  <div class="container mt-3">
    <div id="demo" class="carousel slide" data-bs-ride="carousel">
      <!-- Indicators/dots -->
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
        <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
        <button type="button" data-bs-target="#demo" data-bs-slide-to="3"></button>
      </div>

      <!-- The slideshow/carousel -->
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="@//assets/img/배너4.jpg" alt="Los Angeles" class="d-block w-80" />
        </div>
        <div class="carousel-item">
          <img src="@//assets/img/배너5.jpg" alt="Chicago" class="d-block w-80" />
        </div>
        <div class="carousel-item">
          <img src="@//assets/img/배너3.png" alt="New York" class="d-block w-80" />
        </div>
        <div class="carousel-item">
          <img src="@//assets/img/배너6.jpg" alt="New York" class="d-block w-80" />
        </div>
      </div>

      <!-- Left and right controls/icons -->
      <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>
    <TheWholeList></TheWholeList>
    <!--Carousel End-->

    <!-- <div class="content_body col-lg-12 mt-5">
      <section class="menu">
        <div class="row"><h3>[ 축제리스트 ]</h3></div>
        <div class="row me-auto" id="plist"></div>
      </section>
    </div>
    <div class="row mt-5">
      <div class="col-md-6">
        <h3>[여행지 추천]</h3>
        <table class="table table-hover">
          <thead>
            <tr>
              <th></th>
              <th>제목</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img
                  width="200px;"
                  height="150px;"
                  src="@//assets/img/게시글4.png"
                />
              </td>
              <td>잠실 롯데타워 추천합니다!!!!!</td>
              <td>100</td>
            </tr>
            <tr>
              <td>
                <img
                  width="200px;"
                  height="150px;"
                  src="@//assets/img/게시글2.png"
                />
              </td>
              <td>이번 겨울엔 여기 어떤가요??</td>
              <td>567</td>
            </tr>
            <tr>
              <td>
                <img
                  width="200px;"
                  height="150px;"
                  src="@//assets/img/게시글1.png"
                />
              </td>
              <td>야경 미쳤습니다.</td>
              <td>566</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6">
        <h3>[여행 후기]</h3>
        <table class="table table-hover">
          <thead>
            <tr>
              <th></th>
              <th>제목</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img
                  width="200px;"
                  height="150px;"
                  src="@//assets/img/게시글1.png"
                />
              </td>
              <td>이번에 제주도 다녀왔습니다!!!</td>
              <td>100</td>
            </tr>
            <tr>
              <td>
                <img
                  width="200px;"
                  height="150px;"
                  src="@//assets/img/게시글2.png"
                />
              </td>
              <td>야경이 보고싶다면?</td>
              <td>567</td>
            </tr>
            <tr>
              <td>
                <img
                  width="200px;"
                  height="150px;"
                  src="@//assets/img/게시글3.png"
                />
              </td>
              <td>가성비 좋은 여행 후기</td>
              <td>566</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> -->
  </div>
</template>

<style scoped></style>
