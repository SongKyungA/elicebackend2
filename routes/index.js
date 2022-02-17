const express = require('express')
const path = require('path')
// 라우터 만들기: 페이지 별로 파일을 분리하여 관리하기 위해 사용
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

module.exports = router;