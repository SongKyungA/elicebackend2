const express = require('express')
// 라우터 만들기: 페이지 별로 파일을 분리하여 관리하기 위해 사용
const router = express.Router()

router.get('/', (req, res) => {
    res.send('안녕하세요. 첫 페이지입니다.')
})

module.exports = router;