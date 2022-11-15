const Comm = {
    // baseURL: 'http://192.168.0.101:8080',
    // imgURL: 'http://192.168.0.101:8081/mng/file/',
    baseURL: 'http://localhost:8080',
    imgURL: 'http://localhost:8081/mng/file/',
    // baseURL: 'http://sangokch.org',
    // imgURL: 'http://sangokch.org/mng/file/',
    noImgURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png',
    //millisecond(1/1000)
    millisecond() {
        return (new Date()).getTime().toString()
    }
}