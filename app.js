const express = require('express')
// 서버에서는 절대 경로를 적어줘야 하기 때문에 이를 간단하게 하기 위해 path를 부른다
const path = require('path')
// express 객체 생성
const app = express() 

// 라우터 불러오기
const indexRoute = require('./routes/index.js')

app.use('/', indexRoute)

// req = request(요청) : 사용자의 브라우저 정보, 쿼리(질문: 주소창 정보), 로그인 정보
// res = response(응답) : 사이트 내용 html
/*
app.get('/', (req, res) => {
    // send: 문자열 보내기
    // sendFile: 파일 보내기
    res.sendFile(path.join(__dirname, 'index.html'))
})
*/

// 디렉토리 추가하기
app.get('/webtoon', (req, res) => {
    res.send('<h2>현재 준비 중입니다. 조금만 기다려 주세요</h2>')
})
app.get('/profile', (req, res) => {
    res.send('<h2>저의 취미는 맛집 다니기입니다.</h2>')
})
// 에러 처리
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send(err.message)
})
// express는 웬만하면 port = 3000로 쓴다
app.listen(3000, () => {
    console.log('3000번 포트에서 웹서버를 실행중입니다...')
})