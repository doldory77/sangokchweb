const Menu0104 = {
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
      <div v-for="(item, idx) in boardItems" :key="item.bno" v-html="item.content"></div>    
    `
  }