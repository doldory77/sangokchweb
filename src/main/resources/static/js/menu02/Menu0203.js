const Menu0203 = {
    data() {
        return {
          boardItems:[],
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
              this.boardItems = result.data.data
              this.boardItems = this.boardItems.map((elem, idx, arr) => {
                elem.mnImg = elem.attchFiles.length > 0 ? this.$comm.imgURL + elem.attchFiles[0].file_nm : this.$comm.noImgURL
                elem.linkUrl = elem.link_url || ''
                return elem
            })
              this.nextYn = result.data.nextYn
              this.pageNextNo = result.data.pageno
            }
          } catch (err) {
              console.error(err)
              alert(err.response.data.msg)
          }
        }
    },
    mounted() {
    
    },  
    template: `
        <main class="container-xxl">
          <md-header :title="'설교'"></md-header>
      
          <!--<div class="my-3 p-3 bg-body rounded shadow-sm">
            <h6 class="d-none border-bottom pb-2 mb-0">Suggestions</h6>
          
            <template v-if="boardItems.length == 0">
              <div>등록된 자료가 없습니다.</div>
            </template>
            <template v-else="">
            <bd-item v-for="item in boardItems" :key="item.bno" :kind="'MENU0205'" :bno="item.bno" :subject="item.subject" :content="item.content" :tagYn="item.tag_yn" :thumbYn="'N'"></bd-item>
            </template>
    
            <div v-if="nextYn == 'Y' ? true : false" class="d-flex mt-2 justify-content-center">
              <router-link class="btn btn-outline-primary col-12 col-md-3" role="button" :to="{name: 'Menu0203', query: {pageno:pageNextNo}}">더보기</router-link>
            </div>
          </div>-->
          
          <div class="row row-cols-1 row-cols-lg-2 px-3">
            <div class="col d-flex p-2 bg-light border rounded shadow-sm" v-for="item in boardItems" :key="item.bno">
              <div>
                <div class="text-center">{{ item.write_dt.substring(0,10) }} 주일</div>
                <a :href="item.link_url"><img :src="item.mnImg" style="max-width:200px;"></a>
              </div>
              <div class="flex-grow-1 ps-2">
                <div class="fs-6 fw-bolder mt-4">{{ item.subject }}</div>
                <div v-html="item.content"></div>
              </div>
            </div>
          </div>

        </main>
        `
}