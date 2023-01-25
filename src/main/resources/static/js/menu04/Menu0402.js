const Menu0402 = {
    data() {
        return {
          boardItems:[],
          kindCd:'MENU0402',
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
          <md-header :title="'새가족'"></md-header>
      
          <div class="row g-2 row-cols-1 px-3" :class="{'row-cols-sm-2 row-cols-md-3 row-cols-lg-4': boardItems.length != 0}">

            <template v-if="boardItems.length == 0">
              <div class="col d-flex p-2 border rounded shadow-lg bg-light">등록된 자료가 없습니다.</div>
            </template>

            <template v-else>

              <div class="col" v-for="item in boardItems" :key="item.bno">
                <div class="d-flex p-2 border rounded shadow-lg flex-column justify-content-center">
                  <div class="p-1 fs-6 text-center fw-bold text-truncate">{{ item.subject }}</div>
                  <a :href="'#/board?kind='+kindCd+'&bno='+item.bno"><img class="w-100" :src="item.mnImg"></a>
                  <div class="text-end p-1" style="font-size:0.8rem;">{{ item.write_dt.substring(0,10) }}</div>
                </div>
              </div>

            </template>

            <template v-if="nextYn == 'Y'">
              <div class="fs-5 fw-bold col d-flex justify-content-center align-items-center p-2 border rounded shadow-lg bg-light" @click="nextItem" role="button">더보기</div>
            </template>

          </div>
          
        </main>
        `
}