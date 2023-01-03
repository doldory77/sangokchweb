const Menu0301 = {
    data() {
        return {
          boardItems:[],
          topItems:[],
          bottomItems:[],
          kindCd:'MENU0301',
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
              this.topItems = this.boardItems.filter((elem => elem.attr1 === '상단'))
              this.bottomItems = this.boardItems.filter((elem => elem.attr1 === '하단'))
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
        <main class="container-lg">

          <md-header :title="'유치부'"></md-header>
      
          <div v-for="(item, idx) in topItems" :key="item.bno" v-html="item.content"></div>

          <p class="fs-4 fw-bold mb-3 ps-md-5">비전</p>
          <div class="row ps-md-4">
            <div v-for="(item, idx) in bottomItems" :key="item.bno" class="col-md-4 text-white text-center" >
                <div class="bg-dark rounded p-2 mb-2" style="height: 60px;">
                    <div class="border-bottom border-white">{{ item.content }}</div>
                </div>
            </div>
          </div>

        </main>
        `
}