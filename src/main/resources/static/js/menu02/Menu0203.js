const Menu0203 = {
    data() {
        return {
          isInited:false,
          boardItems:[],
          topItems:[],
          bottomItems:[],
          kindCd:'MENU0203',
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
        <main class="container-xxl">
          <md-header :title="'설교'"></md-header>
          
          <div class="row g-2 row-cols-1 row-cols-lg-2 px-3">

            <template v-if="boardItems.length == 0">
            <div class="col d-flex p-2 border rounded shadow-lg">등록된 자료가 없습니다.</div>
            </template>

            <template v-else>

            <div class="col" v-for="item in boardItems" :key="item.bno">
              <div class="d-flex p-2 border rounded shadow-lg flex-column-reverse flex-sm-row">
                <div class="text-center">
                  <div class="my-1">{{ item.subject }}</div>
                  <a :href="item.link_url"><img :src="item.mnImg" style="max-width:240px; max-height:135px;"></a>
                </div>
                <div class="flex-grow-1 ps-2">
                  <div v-html="item.content"></div>
                </div>
              </div>
            </div>

            <template v-if="nextYn == 'Y'">
            <div class="col d-flex p-2 border rounded shadow-lg" @click="nextItem" role="button">더보기</div>
            </template>

            </template>

          </div>

        </main>
        `
}
