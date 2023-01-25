const Menu0601 = {
    data() {
        return {
          boardItems:[],
          topItems:[],
          midItems:[],
          bottomItems:[],
          kindCd:'MENU0601',
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
          <md-header :title="'새가족'"></md-header>
      
          <div v-for="(item, idx) in topItems" :key="item.bno" v-html="item.content"></div>
          
          <div v-for="(item, idx) in midItems" :key="item.bno" v-html="item.content"></div>

          <div v-for="(item, idx) in bottomItems" :key="item.bno" v-html="item.content"></div>

        </main>
        `
}