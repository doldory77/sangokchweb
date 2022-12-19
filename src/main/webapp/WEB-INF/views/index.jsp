<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>산곡성결교회</title>
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
    <script src="/js/menu02/Menu0201.js"></script>
    <script src="/js/menu02/Menu0202.js"></script>
    <script src="/js/menu02/Menu0203.js"></script>
    <script src="/js/menu04/Menu0401.js"></script>
</head>
<body class="bg-home">
    <div id="app" style="padding-top: 56px; padding-bottom: 100px;">

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
                                <li><router-link class="dropdown-item" :to="{name:'Menu0101',query: {kind:'MENU0101', thumbYn:'N'}}">우리교회는?</router-link></li>
                                <li><router-link class="dropdown-item" :to="{name:'Menu0102',query: {kind:'MENU0102', thumbYn:'N'}}">교회섬김이</router-link></li>
                                <li><router-link class="dropdown-item" :to="{name:'Menu0103',query: {kind:'MENU0103', thumbYn:'Y'}}">오시는 길</router-link></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              예배
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink2">
                                <li><router-link class="dropdown-item" :to="{name:'Menu0201',query: {kind:'MENU0201', thumbYn:'N'}}">예배안내</router-link></li>
                                <li><router-link class="dropdown-item" :to="{name:'Menu0202',query: {pageno:'1'}}">교회주보</router-link></li>
                                <li><router-link class="dropdown-item" :to="{name:'Menu0203',query: {pageno:'1'}}">주일설교</router-link></li>  
                            </ul>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/temp" disabled>교회학교</router-link>
                        </li>
                        <li class="nav-item dropdown disabled">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink3" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              교제와나눔
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink3">
                                <li><router-link class="dropdown-item" :to="{name:'Menu0401',query: {pageno:'1'}}">교회소식</router-link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        
        <router-view></router-view>
        
    </div>

    <footer class="py-2 bg-dark text-light" style="position: fixed; bottom: 0; width: 100vw; opacity: 85%;">
        <div class="container">
            <p class="float-end mb-1" style="width: 85px;">
                <!-- <a href="#">Back to top</a> -->
            </p>
            <p class="text-center fs-5 mb-1 ps-5">403020 인천광역시 부평구 길주로 326번길 13</p>
            <p class="text-center fs-5 mb-0 pe-5">032) 513-3434 (Fax 겸용)</p>
        </div>
        <audio style="position:fixed; left:10px; bottom:10px;" autoplay controls>
            <source src="/bgm/silent-night-new-version-12358.mp3" type="audio/mp3">
        </audio>
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
            {name:'Menu0201', path:'/menu0201', component:Menu0201},
            {name:'Menu0202', path:'/menu0202', component:Menu0202},
            {name:'Menu0203', path:'/menu0203', component:Menu0203},
            {name:'Menu03', path:'/menu03', component:Temp},
            {name:'Menu0401', path:'/menu0401', component:Menu0401},
            
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
            }
        },
        methods: {
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