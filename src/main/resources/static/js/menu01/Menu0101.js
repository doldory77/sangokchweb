const Menu0101 = {
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
      <!--<div class="container col-xxl-8 px-4 pt-5 position-relative">
        <div style="height:100px;"></div>
        <div v-for="(item, idx) in boardItems" :key="item.bno" class="row flex-lg-row-reverse align-items-center g-5 pt-5">
          
          <div class="col-10 col-sm-10 col-lg-6">
          
            <template v-if="linkUrl">
              <img @click="clickImg" style="cursor:pointer;" @error="errorImg" :src="item.mnImg" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy">
            </template>
            <template v-else>
              <img v-if="idx === 0" @error="errorImg" :src="item.mnImg" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy">
            </template>

            <div v-if="thumbYn == 'Y'" class="d-flex flex-nowrap overflow-auto mt-3">
              <img @error="errorImg" v-for="file in item.attchFiles" :key="file.file_nm" :src="$comm.imgURL + file.file_nm" @click="chngImg(file.file_nm)" class="p-1" style="max-width:100px; cursor:pointer;">
            </div>
  
          </div>
          <div class="col-lg-6">
            <h1 class="display-5 fw-bold lh-1 mb-3">{{ item.subject }}</h1>
            <p class="lead" v-html="item.content"></p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              <button type="button" class="btn btn-primary btn-lg px-4 me-md-2">Primary</button>
              <button type="button" class="btn btn-outline-secondary btn-lg px-4">Default</button>
            </div>
          </div>
        </div>
        
        <div class="position-absolute top-0 start-0 w-100 h-100 bg-right-bottom-to-top"></div>
      </div>-->

      <div class="pt-3 pt-lg-5 container-xxl">
        <div v-for="(item, idx) in boardItems" :key="item.bno" v-html="item.content"></div>
      </div>

    `
  }