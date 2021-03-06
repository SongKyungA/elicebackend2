const express = require('express')
// 서버에서는 절대 경로를 적어줘야 하기 때문에 이를 간단하게 하기 위해 path를 부른다
const path = require('path')
// express 객체 생성
const app = express() 

// 라우터 불러오기
const indexRoute = require('./routes/index.js')

// 몽고스 불러오기
const mongoose = require('mongoose')
// 'mongodb://127.0.0.1/27017/{DB이름}'
mongoose.connect("mongodb://127.0.0.1:27017/nodejs", {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to MongoDB...")
}).catch((err) => {
    console.log(err.message)
})
// 데이터의 형식을 지정해준다
const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    saveData: {
        type: Date,
        default: Date.now,
    }
})

const User = mongoose.model("User", UserSchema)

const me = new User({
    name: "dae young",
    age: 27
})

me.save()
.then(() => {
    console.log(me)
}).catch((err) => {
    console.log("Error, ", err)
})

function pickMyFood () {
    const food = ['돈까스', '김밥', '초밥', '떡볶이', '샌드위치', '김치찌개', '파스타', '볶음밥', '오므라이스', '치킨', '짜장면']
    let idx = Math.floor(Math.random() * food.length)
    return food[idx]
}

const mbti = [
    'INTJ - 용의주도한 전략가 (Architect)', 
    'INTP - 논리적인 사색가 (Logician)',
    'ENTJ - 대담한 통솔자 (Commander)',
    'ENTP - 뜨거운 논쟁을 즐기는 변론가 (Debater)',
    'INFJ - 선의의 옹호자 (Advocate)',
    'INFP - 열정적인 중재자 (Mediator)',
    'ENFJ - 정의로운 사회운동가 (Protagonist)',
    'ENFP - 재기발랄한 활동가 (Campaigner)',
    'ISTJ - 청렴결백한 논리주의자 (Logistician)',
    'ISFJ - 용감한 수호자 (Defender)',
    'ESTJ - 엄격한 관리자 (Executive)',
    'ESFJ - 사교적인 외교관 (Consul)',
    'ISTP - 만능 재주꾼 (Virtuoso)',
    'ISFP - 호기심 많은 예술가 (Adventurer)',
    'ESTP - 모험을 즐기는 사업가 (Entrepreneur)',
    'ESFP - 자유로운 영혼의 연예인 (Entertainer)'
]

const direction = ['동', '서', '남', '북']
const reward = ['우정', '행운', '재물', '지혜', '즐거움', '놀라움']

const randIdx = function(arr) {
    return Math.floor(Math.random() * arr.length)
}

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


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

app.get('/food', (req, res) => {
    text = pickMyFood()
    res.send(`오늘 당신에게 추천드리는 메뉴는 바로 ${text}입니다!!`)
})

app.get('/lucky', (req, res) => {
    res.send(`
    <p></p>오늘 당신이 <font color='blue'>${direction[randIdx(direction)]}쪽</font>으로 가신다면, <p></p>
    만날 귀인은 바로 <font color='purple'>${mbti[randIdx(mbti)]}</font>입니다. <p></p>
    그는 당신에게 <font color='red'>${reward[randIdx(reward)]}</font>을 선사할 것입니다. <p></p>
    <u>그는 당신에게 소중한 인연입니다.</u>
    `)
})

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