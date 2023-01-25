const Menu0401 = {
    data() {
        return {
          boardItems:[],
          kindCd:'MENU0401',
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
                elem.mnImg = elem.attchFiles.length > 0 ? this.$comm.imgURL + elem.attchFiles[0].file_nm : ''
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
        },
        errorImg(e) {
          e.target.src = this.$comm.noImgURL
        },        
    },
    mounted() {
    
    },  
    template: `
        
        <main class="container-lg">
          <md-header :title="'교회소식'"></md-header>
      
          <div class="my-3 p-3 bg-body rounded shadow-sm">
            <!--<h6 class="d-none border-bottom pb-2 mb-0">Suggestions</h6>
          
            <template v-if="boardItems.length == 0">
              <div>등록된 자료가 없습니다.</div>
            </template>
            <template v-else="">
            <bd-item v-for="item in boardItems" :key="item.bno" :kind="'MENU0401'" :bno="item.bno" :subject="item.subject" :content="item.content" :tagYn="item.tag_yn" :thumbYn="'N'"></bd-item>
            </template>
    
            <div v-if="nextYn == 'Y' ? true : false" class="d-flex mt-2 justify-content-center">
              <router-link class="btn btn-outline-primary col-12 col-md-3" role="button" :to="{name: 'MENU0401', query: {pageno:pageNextNo}}">더보기</router-link>
            </div>-->

            <div v-for="(item, idx) in boardItems" :key="item.bno" class="bitem py-2" :class="{'border-bottom':idx != boardItems.length-1}">
              <div class="row">
                <div class="col-12 col-sm-6 fs-5 fw-bold">{{ item.subject }}</div>
                <div class="col-12 col-sm-6 text-sm-end">{{ item.write_dt.substring(0,10) }}</div>
              </div>
              <a :href="'#/board?kind='+kindCd+'&bno='+item.bno" style="text-decoration: none; color: black;">
                <div class="row">
                  <div class="col-12 col-md-8" v-html="item.content"></div>
                  <div class="col-12 col-md-4"><img class="rounded shadow-sm" v-if="item.mnImg != ''" :src="item.mnImg" @error="errorImg" loading="lazy" style="max-height:100px;"></div>
                </div>
              </a>
            </div>
          </div>
          <template v-if="nextYn == 'Y'">
            <div class="fs-5 fw-bold my-3 p-3 bg-body rounded shadow-sm" @click="nextItem" role="button">더보기</div>
          </template>
        </main>
        `
}