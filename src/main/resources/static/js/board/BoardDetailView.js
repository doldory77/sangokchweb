const BoardDetailView = {
  data() {
    return {
      imgPath:'http://localhost:8081/mng/file/',
      noImg:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png',
      kind:null,
      bno:null,
      boardItem:{subject:'', content:'', attchFiles:[]},
      mnImg:''
    }
  },
  created() {
    this.kind = this.$route.query.kind
    this.bno = this.$route.query.bno
    console.log(this.kind, this.bno)
    if (this.kind && this.bno) {
      this.getBoardDtl()
    }
  },
  methods: {
    async getBoardDtl() {
      try {
        const result = await this.$http.post("/board/select", {kind_cd:this.kind, bno:this.bno}, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        console.log(result)
        if (result.data && result.data.result == 'success') {
          this.boardItem = result.data.data[0]
          this.mnImg = this.boardItem.attchFiles.length > 0 ? this.imgPath + this.boardItem.attchFiles[0].file_nm : this.noImg
        }
      } catch (err) {
          console.error(err)
          alert(err.response.data.msg)
      }
    },
    chngImg(img) {
      this.mnImg = this.imgPath + img
    }
  },
  template: `
    <div class="container col-xxl-8 px-4 py-5">
      <div class="row flex-lg-row-reverse align-items-center g-1 py-5">
        <div class="col-10 col-sm-10 col-lg-6">

          <img :src="mnImg" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy">

          <div class="d-flex flex-nowrap overflow-auto mt-3">
            <img v-for="file in boardItem.attchFiles" :key="file.file_nm" :src="'http://localhost:8081/mng/file/' + file.file_nm" @click="chngImg(file.file_nm)" class="p-1" style="max-width:100px;">
          </div>

        </div>
        <div class="col-lg-6">
          <h1 class="display-5 fw-bold lh-1 mb-3">{{ boardItem.subject }}</h1>
          <p class="lead">{{ boardItem.content }}</p>
          <div class="d-grid gap-2 d-md-flex justify-content-md-start">
            <!--<button type="button" class="btn btn-primary btn-lg px-4 me-md-2">Primary</button>
            <button type="button" class="btn btn-outline-secondary btn-lg px-4">Default</button>-->
          </div>
        </div>
      </div>
    </div>    
  `
}