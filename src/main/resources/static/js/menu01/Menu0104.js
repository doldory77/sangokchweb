const Menu0104 = {
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
                elem.mnImg = elem.attchFiles.length > 0 ? this.$comm.imgURL + elem.attchFiles[0].file_nm : ''
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
          <p class="fs-4 fw-bold mb-1">산곡교회 연혁</p>
          <p class="fs-5 fw-bold text-muted">산곡교회 역사를 보다.</p>
        </div>    

        <div class="row" v-for="(item, idx) in boardItems" :key="item.bno">
          <div class="col-12 col-md-7">
            <div class="row" :style="item.attr1 != null ? 'border-top:1px dotted; margin-top:20px;' : ''">
              <div class="col-2">
                <span class="fs-5 border-top border-2 border-dark">{{ item.attr1 }}</span>
              </div>
              <div class="col-2">{{ item.subject }}</div>
              <div class="col-8" v-html="item.content"></div>
            </div>
          </div>  
          <div class="col-12 col-md-5 pt-2 pt-md-0">
            <img class="shadow-lg p-1 rounded" v-if="item.mnImg != ''" class="w-50" :src="item.mnImg">
          </div>
        </div>

        <!--<div class="row">
          <div class="col-12 col-md-7">
            <div class="row">
              <div class="col-2">
                <span class="fs-5 border-top border-2 border-dark">2002</span>
              </div>
              <div class="col-2">
                2002.04
              </div>
              <div class="col-8">
                <div>- 박태수목사 사임(뉴질랜드 유학, CTM선교사)</div>
                <div>- 조옥현 목사 부임</div>
                <div>- 교회당 등기이전(교회명의로)</div>
              </div>
            </div>
          </div>  
          <div class="col-12 col-md-5 pt-2 pt-md-0">
            <img class="w-50" src="http://sangokch.org/mng/file/MENU0101_1672454565065.jpg">
          </div>
        </div>-->

      </div>
    `
  }