const Menu0103 = {
    data() {
      return {
        kind:null,
        boardItem:{subject:'', content:'', attchFiles:[]},
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
          if (result.data && result.data.result == 'success') {
            this.boardItem = result.data.data[0]
            this.mnImg = this.boardItem.attchFiles.length > 0 ? this.$comm.imgURL + this.boardItem.attchFiles[0].file_nm : this.$comm.noImgURL
            this.linkUrl = this.boardItem.link_url || ''
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
      <div class="container-xxl px-4 pt-5">

      
        <div class="row">
          <div class="col-12 col-lg-5">
            <div>
              <p class="fs-4 fw-bold mb-1">오시는 길</p>
              <p class="fs-5 fw-bold text-muted">주변 교통편</p>
            </div>
            <div v-html="boardItem.content"></div>
          </div>
          <div class="col-12 col-lg-7 text-center">
            <img class="shadow-lg p-1 rounded w-75" :src="mnImg" style="min-width:780px;">
            <div class="mt-3"><button type="button" class="btn btn-primary" @click="clickImg">NAVER 지도</button></div>
          </div>
        </div>

      </div>
      
    `
  }  