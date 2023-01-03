const Home = {
    data() {
        return {
            boardItems: [],
            topItems: [],
            middleItems: [],
            mainTitles: [],
            title: ''
        }
    },
    created() {
        this.getBoard()
    },
    mounted() {
        
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
                this.mainTitles = this.boardItems.filter((elem => elem.attr1.indexOf('홈타이틀') > -1))
                this.title = this.mainTitles[0].content
                
                console.log(this.boardItems)
            }
          } catch (err) {
              console.error(err)
              alert(err.response.data.msg)
          }
        },
        click(e) {
            //console.log(e.target.href)
            if (e.target.href) {
              window.open(e.target.href)
            }
        },
    },
    template: `

        <p class="bg-title mt-5">{{ title }}</p>
        <div id="carousel1" class="carousel slide" data-bs-ride="carousel">

            <div class="carousel-inner">
                <div v-for="(item, idx) in topItems" :key="item.bno" :class="{'carousel-item': true, 'active': idx === 0}">
                    <img :src="item.mnImg" class="d-block w-100" alt="" data-bs-interval="1000">
                    <div class="carousel-caption d-none d-sm-block" v-html="item.content"></div>
                </div>
            </div>
                            
        </div>
        
        <div class="py-5 container-xxl t-pos">

            <div v-if="middleItems.length > 0" class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xxl-4 g-3">
                <div v-for="(item, idx) in middleItems" :key="item.bno" class="col">
                    <div class="card shadow-sm">
                        <div class="card-header">
                            Featured
                        </div>
                        <img :src="item.mnImg" class="bd-placeholder-img card-img-top d-block w-100" alt="">

                        <div class="card-body">
                            <p class="card-text" v-html="item.content"></p>
                            <div class="d-flex justify-content-between align-items-center">
                                <template v-if="item.external_yn === 'N'">
                                <router-link :to="item.linkUrl" class="btn btn-primary">{{ item.subject }}</router-link>
                                </template>
                                <template v-else>
                                <a @click.prevent="click" :href="item.linkUrl" class="btn btn-primary">{{ item.subject }}</a>
                                </template>
                                <small class="text-muted">[{{ item.attr1 }}]</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
`}