const express = require('express')
// express 객체 생성
const app = express() 

// req = request(요청) : 사용자의 브라우저 정보, 쿼리(질문: 주소창 정보), 로그인 정보
// res = response(응답) : 사이트 내용 html
app.get('/', (req, res) => {
    res.send('Hello, world')
})
// express는 웬만하면 port = 3000로 쓴다
app.listen(3000, () => {
    console.log('3000번 포트에서 웹서버를 실행중입니다...')
})