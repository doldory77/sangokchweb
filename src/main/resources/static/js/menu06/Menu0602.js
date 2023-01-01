const Menu0602 = {
    data() {
        return {
          boardItems:[],
          kindCd:'MENU0602',
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
        <main class="container">
          <md-header :title="'제자훈련'"></md-header>
      
          <div class="my-3 p-3 bg-body rounded shadow-sm">
            <h6 class="d-none border-bottom pb-2 mb-0">Suggestions</h6>
          
            <template v-if="boardItems.length == 0">
              <div>등록된 자료가 없습니다.</div>
            </template>
            <template v-else="">
            <bd-item v-for="item in boardItems" :key="item.bno" :kind="'MENU0602'" :bno="item.bno" :subject="item.subject" :content="item.content" :tagYn="item.tag_yn" :thumbYn="'N'"></bd-item>
            </template>
    
            <div v-if="nextYn == 'Y' ? true : false" class="d-flex mt-2 justify-content-center">
              <router-link class="btn btn-outline-primary col-12 col-md-3" role="button" :to="{name: 'MENU0602', query: {pageno:pageNextNo}}">더보기</router-link>
            </div>
          </div>
        </main>
        `
}