<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>산곡성결교회</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Gamja+Flower&display=swap" rel="stylesheet">
    <style> @import url('https://fonts.googleapis.com/css2?family=Gamja+Flower&display=swap'); </style>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/css/style.css">
    <script src="https://unpkg.com/vue@3"></script>
    <script src="https://unpkg.com/vue-router@4"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="/js/home/Home.js"></script>
    <script src="/js/etc/Temp.js"></script>
    <script src="/js/util/Comm.js"></script>
    <script src="/js/comp/FileX.js"></script>
    <script src="/js/comp/HeaderX.js"></script>
    <script src="/js/board/BoardItemView.js"></script>
    <script src="/js/board/BoardDetailView.js"></script>
    <script src="/js/menu01/Menu0101.js"></script>
    <script src="/js/menu01/Menu0102.js"></script>
    <script src="/js/menu01/Menu0103.js"></script>
    <script src="/js/menu01/Menu0104.js"></script>
    <script src="/js/menu01/Menu0105.js"></script>
    
    <script src="/js/menu02/Menu0203.js"></script>
    <script src="/js/menu02/Menu0204.js"></script>
    <script src="/js/menu02/Menu0205.js"></script>
    <script src="/js/menu02/Menu0206.js"></script>

    <script src="/js/menu03/Menu0301.js"></script>
    <script src="/js/menu03/Menu0302.js"></script>
    <script src="/js/menu03/Menu0303.js"></script>
    <script src="/js/menu03/Menu0304.js"></script>

    <script src="/js/menu06/Menu0601.js"></script>
    <script src="/js/menu06/Menu0602.js"></script>
    <script src="/js/menu06/Menu0603.js"></script>
    <script src="/js/menu06/Menu0604.js"></script>

    <script src="/js/menu04/Menu0401.js"></script>
    <script src="/js/menu04/Menu0402.js"></script>
    <script src="/js/menu04/Menu0403.js"></script>

    
    
</head>
<body class="bg-home">
    <div id="app" style="padding-top: 56px; padding-bottom: 100px;">

        <div class="modal fade" id="exampleModalScrollable" tabindex="-1" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalScrollableTitle">{{ searchText }}</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <p v-for="(item, idx) in searchItems" :key="idx">
                    <template v-if="item.title">{{ item.verse + ' ' + item.content }}</template>
                    <template v-else>
                        <p v-if="idx === 0">{{ item.subject }}</p>
                        <pre>{{ item.lyrics }}</pre>
                    </template> 
                  </p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                </div>
              </div>
            </div>
        </div>        

        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div class="container-lg">
                <a class="navbar-brand" href="#">
                    <img src="/img/logo_100.png" alt="Logo" width="32" height="32" class="d-inline-block align-text-top">
                    <div style="display: inline-block; position: relative; width: 120px; padding-left: 3px;">
                        <div style="position: absolute; top: -20px;">산곡성결교회</div>
                    </div>
                </a>
                <button id="navBarTogglerBtn" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              교회소개
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink1">
                                <li><router-link class="dropdown-item" :to="{name:'Menu0101',query: {kind:'MENU0101', thumbYn:'N'}}">산곡교회비전</router-link></li>
                                <li><router-link class="dropdown-item" :to="{name:'Menu0104',query: {kind:'MENU0104', thumbYn:'N'}}">산곡교회연혁</router-link></li>
                                <li><router-link class="dropdown-item" :to="{name:'Menu0102',query: {kind:'MENU0102', thumbYn:'N'}}">섬기는 분</router-link></li>
                                <li><router-link class="dropdown-item" :to="{name:'Menu0105',query: {kind:'MENU0105', thumbYn:'N'}}">예배시간</router-link></li>
                                <li><router-link class="dropdown-item" :to="{name:'Menu0103',query: {kind:'MENU0103', thumbYn:'Y'}}">오시는 길</router-link></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              예배찬양
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink2">
                                <li><router-link class="dropdown-item" :to="{name:'Menu0203',query: {pageno:'1'}}">설교</router-link></li>  
                                <!--<li><router-link class="dropdown-item" :to="{name:'Menu0204',query: {kind:'MENU0201', thumbYn:'N'}}">찬양</router-link></li>-->
                                <li><router-link class="dropdown-item" :to="{name:'Menu0204',query: {pageno:'1'}}">찬양</router-link></li>
                                <li><router-link class="dropdown-item" :to="{name:'Menu0205',query: {pageno:'1'}}">행사</router-link></li>
                                <li><router-link class="dropdown-item" :to="{name:'Menu0206',query: {pageno:'1'}}">특강</router-link></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink3" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              다음세대
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink3">
                                <li><router-link class="dropdown-item" :to="{name:'Menu0301',query: {pageno:'1'}}">유치부</router-link></li>  
                                <li><router-link class="dropdown-item" :to="{name:'Menu0302',query: {pageno:'1'}}">유초등부</router-link></li>
                                <li><router-link class="dropdown-item" :to="{name:'Menu0303',query: {pageno:'1'}}">학생부</router-link></li>
                                <li><router-link class="dropdown-item" :to="{name:'Menu0304',query: {pageno:'1'}}">청년부</router-link></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink4" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              훈련사역
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink4">
                                <li><router-link class="dropdown-item" :to="{name:'Menu0601',query: {pageno:'1'}}">새가족</router-link></li>  
                                <li><router-link class="dropdown-item" :to="{name:'Menu0602',query: {pageno:'1'}}">제자훈련</router-link></li>
                                <li><router-link class="dropdown-item" :to="{name:'Menu0603',query: {pageno:'1'}}">젊은부부</router-link></li>
                                <li><router-link class="dropdown-item" :to="{name:'Menu0604',query: {pageno:'1'}}">선교</router-link></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink5" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              교회소식
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink5">
                                <li><router-link class="dropdown-item" :to="{name:'Menu0401',query: {pageno:'1'}}">교회소식</router-link></li>  
                                <li><router-link class="dropdown-item" :to="{name:'Menu0402',query: {pageno:'1'}}">새가족</router-link></li>
                                <li><router-link class="dropdown-item" :to="{name:'Menu0403',query: {pageno:'1'}}">갤러리</router-link></li>
                            </ul>
                        </li>
                    </ul>
                    <form class="d-flex ms-auto" role="search" v-on:submit.prevent="parseBibleHymn">
                        <input v-model="searchText" class="form-control me-2" type="search" placeholder="성경구절 또는 찬송가" aria-label="성경구절 또는 찬송가">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
        
        <router-view></router-view>
        
    </div>

    <footer class="py-2 bg-dark text-light" style="position: fixed; bottom: 0; width: 100vw; opacity: 85%;">
        <div class="container">
            <!-- <p class="float-end mb-1" style="width: 85px;">
                <a href="#">Back to top</a>
            </p>
            <p class="text-center fs-6 mb-1 ps-5">403020 인천광역시 부평구 길주로 326번길 13</p>
            <p class="text-center fs-6 mb-0 pe-5">032) 513-3434 (Fax 겸용)</p> -->
            <div class="row justify-content-sm-center text-center">
                <div class="fs-6 col-12 col-sm-6 text-sm-end pe-sm-0">403020 인천광역시 부평구</div>
                <div class="fs-6 col-12 col-sm-6 text-sm-start ps-sm-0">&nbsp;길주로 326번길 13</div>
                <div class="fs-8 col-12 col-sm-6">032) 513-3434 (Fax 겸용)</div>
            </div>

        </div>
        <!-- <audio style="position:fixed; left:10px; bottom:10px;" autoplay controls>
            <source src="/bgm/silent-night-new-version-12358.mp3" type="audio/mp3">
        </audio> -->
    </footer>

</body>
<script>
    const {createApp} = Vue
    const {createRouter, createWebHashHistory} = VueRouter
    
    const router = createRouter({
        history: createWebHashHistory(),
        routes: [
            {name:'Home', path:'/', component:Home},
            {name:'Temp', path:'/temp', component:Temp},
            {name:'Board', path:'/board', component:BoardDetailView},
            {name:'Menu0101', path:'/menu0101', component:Menu0101},
            {name:'Menu0102', path:'/menu0102', component:Menu0102},
            {name:'Menu0103', path:'/menu0103', component:Menu0103},
            {name:'Menu0104', path:'/menu0104', component:Menu0104},
            {name:'Menu0105', path:'/menu0105', component:Menu0105},

            {name:'Menu0203', path:'/menu0203', component:Menu0203},
            {name:'Menu0204', path:'/menu0204', component:Menu0204},
            {name:'Menu0205', path:'/menu0205', component:Menu0205},
            {name:'Menu0206', path:'/menu0206', component:Menu0206},

            {name:'Menu0301', path:'/menu0301', component:Menu0301},
            {name:'Menu0302', path:'/menu0302', component:Menu0302},
            {name:'Menu0303', path:'/menu0303', component:Menu0303},
            {name:'Menu0304', path:'/menu0304', component:Menu0304},

            {name:'Menu0601', path:'/menu0601', component:Menu0601},
            {name:'Menu0602', path:'/menu0602', component:Menu0602},
            {name:'Menu0603', path:'/menu0603', component:Menu0603},
            {name:'Menu0604', path:'/menu0604', component:Menu0604},
            
            {name:'Menu0401', path:'/menu0401', component:Menu0401},
            {name:'Menu0402', path:'/menu0402', component:Menu0402},
            {name:'Menu0403', path:'/menu0403', component:Menu0403},
            
        ]
    })
    router.beforeEach((to, from, next) => {
        let wd = window.innerWidth || document.body.clientWidth
        if (wd <= 991) {
            if (document.getElementById("navBarTogglerBtn").getAttribute("aria-expanded") === 'true') document.getElementById("navBarTogglerBtn").click()
        }
        next()
    })
    const http = axios.create({
        // baseURL: "http://localhost:8080",
        baseURL: Comm.baseURL,
    })

    const app = createApp({
        data() {
            return {
                message: 'Hello Vue!',
                searchText: '',
                searchItems: [],
            }
        },
        methods: {
            parseBibleHymn() {
                // console.log(this.searchText)
                if (this.searchText) {
                    let params = this.$comm.parseBibleHymn(this.searchText)
                    if (params.kind) {
                        this.search(params)
                    }
                }
            },   
            async search(params) {
                try {
                    const result = await this.$http.post("/search/bibleHymn", params, {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })
                    // console.log(result)
                    if (result.data && result.data.result == 'success') {
                        // console.log(result.data.data)
                        this.searchItems = result.data.data
                        this.showModal()
                    } else {
                        this.searchItems = []
                    }
                } catch (err) {
                    console.error(err)
                    alert(err.response.data.msg)
                }
            },
            showModal() {
                if (this.searchItems && this.searchItems.length > 0) {
                    let myModal = new bootstrap.Modal(document.getElementById('exampleModalScrollable'))
                    myModal.show()
                }
            },                        
            change() {
                this.message = 'Hello Vue Method!'
            },
            getMenu() {
                axios.get('http://localhost:8080/index/menu')
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                }) 
            }
        },
        mounted() {
            // this.getMenu()
        }
    })
    app.config.globalProperties.$http = http
    app.config.globalProperties.$comm = Comm
    app.component('md-file', FileX)
    app.component('md-header', HeaderX)
    app.component('bd-item', BoardItemView)
    app.use(router)
    app.mount('#app')
</script>
</html>