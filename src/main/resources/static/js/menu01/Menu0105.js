const Menu0105 = {
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
          const result = await this.$http.post("/board/select", {kind_cd:this.kind, pageno:'1'}, {
              headers: {
                  "Content-Type": "application/json",
              }
          })
          console.log(result)
          if (result.data && result.data.result == 'success' && result.data.data.length > 0) {
            this.boardItems = result.data.data
            this.boardItems = this.boardItems.map((elem, idx, arr) => {
                elem.mnImg = elem.attchFiles.length > 0 ? this.$comm.imgURL + elem.attchFiles[0].file_nm : this.$comm.noImgURL
                elem.linkUrl = elem.link_url || ''
                return elem
            })
            console.log(this.boardItems) 
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
          <p class="fs-4 fw-bold mb-1">예배시간</p>
          <p class="fs-5 fw-bold text-muted">산곡교회 예배시간입니다.</p>
        </div>
        <div v-for="(item, idx) in boardItems" :key="item.bno">
          <div class="row">
            <div class="col-12 col-lg-8" v-html="item.content"></div>
            <div class="col-12 col-lg-4"></div>
          </div>
        </div>
      </div>
    `
  }