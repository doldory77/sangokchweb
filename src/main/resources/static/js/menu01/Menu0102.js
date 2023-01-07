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
        <div class="container px-4 pt-5 position-relative">
          
          <template v-for="item in boardItems" :key="item.bno">
            <div v-if="item.attr1 == '담임목사'" class="row flex-sm-column-reverse">
            
              <div class="col-sm-5 d-flex justify-content-center">
                <div class="card mb-5" style="width: 14rem;">
                  <img :src="item.mnImg" class="card-img-top" alt="인물사진">
                  <div class="card-body">
                    <h5 class="card-title">{{ item.subject }}</h5>
                    <p class="card-text" v-html="item.content"></p>
                  </div>
                </div>    
              </div>
              <div class="col-sm-7">
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
          
          <div class="d-flex justify-content-center flex-wrap mb-5">
            <template v-for="item in boardItems" :key="item.bno">
              <div v-if="item.attr1 == '교육전도사'" class="card m-2" style="width: 14rem;">
                <img :src="item.mnImg" class="card-img-top" alt="인물사진">
                <div class="card-body">
                  <h5 class="card-title">{{ item.subject }}</h5>
                  <p class="card-text" v-html="item.content"></p>
                </div>
              </div>
            </template>
          </div>         

          <div class="d-flex justify-content-center flex-wrap">
            <template v-for="item in boardItems" :key="item.bno">
              <div v-if="item.attr1 == '장로'" class="card m-2" style="width: 14rem;">
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