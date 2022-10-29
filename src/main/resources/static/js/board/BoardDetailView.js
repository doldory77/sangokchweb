const BoardDetailView = {
  data() {
    return {
      kind:null,
      bno:null,
      boardItem:{subject:'', content:'', attchFiles:[]},
      mnImg:'',
      linkUrl:'',
      thumbYn:'Y',
      tagYn:'N',
    }
  },
  created() {
    this.kind = this.$route.query.kind
    this.bno = this.$route.query.bno
    this.thumbYn = this.$route.query.thumbYn || 'Y'
    console.log(this.kind, this.bno, this.thumbYn)
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
          this.mnImg = this.boardItem.attchFiles.length > 0 ? this.$comm.imgURL + this.boardItem.attchFiles[0].file_nm : this.$comm.noImgURL
          this.linkUrl = this.boardItem.link_url || ''
          this.tagYn = this.boardItem.tag_yn
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
    <div class="container col-xxl-8 px-4 py-5">
      <div class="row flex-lg-row-reverse align-items-center g-1 py-5">
        <div class="col-10 col-sm-10 col-lg-6">
        
          <template v-if="linkUrl">
            <img @click="clickImg" style="cursor:pointer;" @error="errorImg" :src="mnImg" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy">
          </template>
          <template v-else>
            <img @error="errorImg" :src="mnImg" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy">
          </template>

          <div v-if="thumbYn == 'Y'" class="d-flex flex-nowrap overflow-auto mt-3">
            <img @error="errorImg" v-for="file in boardItem.attchFiles" :key="file.file_nm" :src="$comm.imgURL + file.file_nm" @click="chngImg(file.file_nm)" class="p-1" style="max-width:100px; cursor:pointer;">
          </div>

        </div>
        <div class="col-lg-6">
          <h1 class="display-5 fw-bold lh-1 mb-3">{{ boardItem.subject }}</h1>
          <template v-if="tagYn == 'Y'">
            <p class="lead" v-html="boardItem.content"></p>
          </template>
          <template v-else>
            <p class="lead">{{ boardItem.content }}</p>
          </template>
          
          <div class="d-grid gap-2 d-md-flex justify-content-md-start">
            <!--<button type="button" class="btn btn-primary btn-lg px-4 me-md-2">Primary</button>
            <button type="button" class="btn btn-outline-secondary btn-lg px-4">Default</button>-->
          </div>
        </div>
      </div>
    </div>    
  `
}