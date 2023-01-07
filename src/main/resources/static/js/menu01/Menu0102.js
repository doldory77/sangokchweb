const Menu0102 = {
    data() {
        return {
          kind:null,
          boardItem:{subject:'', content:'', attchFiles:[]},
          boardItems:[],
          mnImg:'',
          linkUrl:'',
          thumbYn: 'N',
        }
    },
    created() {
        this.kind = this.$route.query.kind
        this.thumbYn = this.$route.query.thumbYn
        console.log('xxxxxx', this.thumbYn)
        if (this.kind) {
          this.getBoard()
        }
    },
    methods: {
        async getBoard() {
          try {
            const result = await this.$http.post("/board/select", {kind_cd:this.kind}, {
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
              console.log(this.boardItems) 
              // this.boardItem = result.data.data[0]
              // this.mnImg = this.boardItem.attchFiles.length > 0 ? this.$comm.imgURL + this.boardItem.attchFiles[0].file_nm : this.$comm.noImgURL
              // this.linkUrl = this.boardItem.link_url || ''
            }
          } catch (err) {
              console.error(err)
              alert(err.response.data.msg)
          }
        },
        errorImg(e) {
          e.target.src = this.$comm.noImgURL
        },
        chngImg(img) {
          this.mnImg = this.$comm.imgURL + img
        },
        clickImg(e) {
          if (this.linkUrl) {
            window.open(this.linkUrl)
          }
        },
    },    
    template: `
        <div class="container-xxl px-4 pt-5 position-relative">

          <div>
            <p class="fs-4 fw-bold mb-1">섬기는 사람들</p>
            <p class="fs-5 fw-bold text-muted">산곡성결교회를 섬기는 분들입니다.</p>
          </div>

          <div class="border-1 border-bottom border-secondary mb-2 mt-4">
            <span class="fw-bold ps-1 text-secondary">담임목사</span>
          </div>
          <template v-for="item in boardItems" :key="item.bno">
            <div v-if="item.attr1 == '담임목사'" class="row flex-column-reverse flex-md-row">
            
              <div class="col col-md-5 d-flex justify-content-center justify-content-md-end">
                <div class="card mb-5" style="min-width: 14rem; max-width: 14rem;">
                  <img :src="item.mnImg" class="card-img-top" alt="인물사진">
                  <div class="card-body">
                    <h5 class="card-title">{{ item.subject }}</h5>
                    <p class="card-text" v-html="item.content"></p>
                  </div>
                </div>    
              </div>
              <div class="col col-md-7">
                <div></div>
                <ul>
                  <li>AAA</li>
                  <li>AAA</li>
                  <li>AAA</li>
                  <li>AAA</li>
                  <li>AAA</li>
                </ul>
              </div>
            </div>
          </template>
          
          <div class="border-1 border-bottom border-secondary mb-2 mt-4">
            <span class="fw-bold ps-1 text-secondary">교역자</span>
          </div>
          <div class="d-flex justify-content-center flex-wrap mb-5">
            <template v-for="item in boardItems" :key="item.bno">
              <div v-if="item.attr1 == '교육전도사'" class="card m-2 mx-md-4" style="width: 14rem;">
                <img :src="item.mnImg" class="card-img-top" alt="인물사진">
                <div class="card-body">
                  <h5 class="card-title">{{ item.subject }}</h5>
                  <p class="card-text" v-html="item.content"></p>
                </div>
              </div>
            </template>
          </div>         

          <div class="border-1 border-bottom border-secondary mb-2 mt-4">
            <span class="fw-bold ps-1 text-secondary">장로</span>
          </div>
          <div class="d-flex justify-content-center flex-wrap">
            <template v-for="item in boardItems" :key="item.bno">
              <div v-if="item.attr1 == '장로'" class="card m-2 mx-md-4" style="width: 14rem;">
                <img :src="item.mnImg" class="card-img-top" alt="인물사진">
                <div class="card-body">
                  <h5 class="card-title">{{ item.subject }}</h5>
                  <p class="card-text" v-html="item.content"></p>
                </div>
              </div>
            </template>
          </div>            
        </div>
    `
}