const Home = {
    data() {
        return {
            boardItems: [],
            topItems: [],
            middleItems: [],
            middle1Items: [],
            middle2Items: [],
        }
    },
    created() {
        this.getBoard()
    },
    methods: {
        async getBoard() {
          try {
            const result = await this.$http.post("/board/select", {kind_cd:'MENU0001'}, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            console.log(result)
            if (result.data && result.data.result == 'success') {
              this.boardItems = result.data.data
                this.boardItems = this.boardItems.map((elem, idx, arr) => {
                    elem.mnImg = elem.attchFiles.length > 0 ? this.$comm.imgURL + elem.attchFiles[0].file_nm : this.$comm.noImgURL
                    elem.linkUrl = elem.link_url || ''
                    return elem
                })
                this.topItems = this.boardItems.filter((elem => elem.attr1 === '홈상단'))
                this.middleItems = this.boardItems.filter((elem => elem.attr1.indexOf('홈중간') > -1))
                // this.middle1Items = this.boardItems.filter((elem => elem.attr1 === '홈중간1'))
                // this.middle2Items = this.boardItems.filter((elem => elem.attr1 === '홈중간2'))
                console.log(this.boardItems)
            }
          } catch (err) {
              console.error(err)
              alert(err.response.data.msg)
          }
        }
    },
    template: `
        <div class="d-flex justify-content-center pt-md-5 bg-light">
            <div id="carousel1" class="carousel slide" data-bs-ride="carousel" style="max-width:800px;">
                
                <div class="carousel-indicators">
                    <button v-for="(item, idx) in topItems" :key="item.bno" type="button" data-bs-target="#carousel1" :data-bs-slide-to="idx" :class="{'active': idx === 0}" aria-current="true" :aria-label="'Slide' + (idx+1)"></button>
                </div>

                <div class="carousel-inner">
                    <div v-for="(item, idx) in topItems" :key="item.bno" :class="{'carousel-item': true, 'active': idx === 0}">
                        <img :src="item.mnImg" class="d-block w-100" alt="">
                        <div class="carousel-caption d-none d-md-block" v-html="item.content"></div>
                    </div>
                </div>
                
                <template v-if="topItems.length > 1">
                <button class="carousel-control-prev" type="button" data-bs-target="#carousel1" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carousel1" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
                </template>
            </div>
        </div>
        
        <div class="py-5 bg-light">
            <div class="container">

                <div v-if="middleItems.length > 0" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <div v-for="(item, idx) in middleItems" :key="item.bno" class="col">
                        <div class="card shadow-sm">

                            <img :src="item.mnImg" class="bd-placeholder-img card-img-top d-block w-100" alt="">

                            <div class="card-body">
                                <p class="card-text" v-html="item.content"></p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <!--<a href="#" class="btn btn-primary">{{ item.subject }}</a>-->
                                    <router-link :to="item.linkUrl" class="btn btn-primary">{{ item.subject }}</router-link>
                                    <small class="text-muted">[{{ item.attr1 }}]</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--<div v-if="middle2Items.length > 0" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <div v-for="(item, idx) in middle2Items" :key="item.bno" class="col">
                        <div class="card shadow-sm">

                            <img :src="item.mnImg" class="bd-placeholder-img card-img-top d-block w-100" alt="">

                            <div class="card-body">
                                <p class="card-text" v-html="item.content"></p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <a href="#" class="btn btn-primary">이동</a>
                                    <small class="text-muted">[{{ item.attr1 }}]</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>-->

            </div>
        </div>     
`}