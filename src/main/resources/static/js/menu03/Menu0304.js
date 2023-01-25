const Menu0304 = {
    data() {
        return {
          boardItems:[],
          topItems:[],
          midItems:[],
          bottomItems:[],
          kindCd:'MENU0304',
          nextYn:'N',
          pageNo:'0',
          pageNextNo:'1',
        }
    },
    created() {
        this.pageNo = this.$route.query.pageno
    },
    beforeRouteUpdate(to, from, next) {
        this.pageNo = to.query.pageno
        next()
    },
    watch: {
        pageNo(newPageNo) {
          this.getBoard()
        }
    },
    methods: {
        async getBoard() {
          try {
            const result = await this.$http.post("/board/select", {kind_cd:this.kindCd, pageno:this.pageNo}, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            console.log(result)
            if (result.data && result.data.result == 'success') {
              this.boardItems = this.boardItems.concat(result.data.data.map((elem, idx, arr) => {
                elem.mnImg = elem.attchFiles.length > 0 ? this.$comm.imgURL + elem.attchFiles[0].file_nm : this.$comm.noImgURL
                elem.linkUrl = elem.link_url || ''
                return elem
              }))
              if (!this.isInited) {
                this.topItems = this.boardItems.filter((elem => elem.attr1 === '상단'))
                this.midItems = this.boardItems.filter((elem => elem.attr1 === '중간'))
                this.bottomItems = this.boardItems.filter((elem => elem.attr1 === '하단'))
                this.isInited = true;
              }
              this.boardItems = this.boardItems.filter((elem => !elem.attr1))
              this.nextYn = result.data.nextYn
              this.pageNextNo = result.data.pageno
            }
          } catch (err) {
              console.error(err)
              alert(err.response.data.msg)
          }
        },
        nextItem() {
          this.pageNo = this.pageNextNo
        }
    },
    mounted() {
    
    },  
    template: `
        <main class="container-lg">
          <md-header :title="'청년부'"></md-header>
      
          <div v-for="(item, idx) in topItems" :key="item.bno" v-html="item.content"></div>
          <div v-for="(item, idx) in midItems" :key="item.bno" v-html="item.content"></div>
      
          <div class="row g-2 row-cols-1 px-3" :class="{'row-cols-md-2 row-cols-lg-3': boardItems.length != 0}">

            <template v-if="boardItems.length == 0">
              <div class="col d-flex p-2 border rounded shadow-lg bg-light">등록된 자료가 없습니다.</div>
            </template>

            <template v-else>

              <div class="col" v-for="item in boardItems" :key="item.bno">
                <div class="d-flex p-2 border rounded shadow-lg flex-column justify-content-center">
                  <div class="p-1 fs-6 text-center fw-bold">{{ item.subject }}</div>
                  <a :href="item.linkUrl"><img class="w-100" :src="item.mnImg"></a>
                  <div v-html="item.content"></div>
                </div>
              </div>

            </template>

            <template v-if="nextYn == 'Y'">
              <div class="fs-5 fw-bold col d-flex justify-content-center align-items-center p-2 border rounded shadow-lg bg-light" @click="nextItem" role="button">더보기</div>
            </template>

          </div>

          <div v-for="(item, idx) in bottomItems" :key="item.bno" v-html="item.content"></div>
          
        </main>
        `
}