![header](https://capsule-render.vercel.app/api?type=rounded&color=auto&height=120&section=header&text=Wetube&fontSize=70)

<div align="center">
    <br />
    <div>
      <img style="border-radius:10px" height="70" src="./assets/wetube-logo.png" />
    </div>
    <a display="block" href="hhttps://girn-market.vercel.app/" >
      https://girn-market.vercel.app/
    </a>
    <br />
</div>

## Content

- 🛠 [Built with](#built-with)
- 🚀 [Project](#project)
- 📖 [Pages](#pages)
- ✓ [Features](#features)
- 🔥 [Code](#code)
- 👍 [느낀점](#느낀점)

---

## Built with

### Front-end

- `Next JS`
- `Typescript`
- `tailwindCSS`
- `Framer-motion`
- `swr, axios`
- `React-hook-form`
- `ffmpeg`
- code : <a>https://github.com/jangth0655/wetube-client</a>

### Back-end

- `Express`
- `Mongoose`
- `MongoDB`
- `Vercel`
- `aws`

### Deploy

- Client : `Vercel`
- Server : `Heroku` , `AWS S3`

## Project

> 회원가입, 로그인, 로그아웃

- 유저네임, 이메일, 이름, 지역, 패스워드, 패스워드 확인을 입력하여 회원가입을 할 수 있습니다.
- 유저네임과, 이메일은, 패스워드는 필수조건이며 유저네임과 이메일은 중복이 불가능하도록 하였습니다.
- 로그인시 유저가 입력한 비밃번호는 `bcrypt`로 이전 해쉬화된 비밀번호와 비교하여 확인했습니다.  
  → express-session의 세션 ID를 MongoStore를 활용하여 MongoDB에 저장하고,  
  → 쿠키를 통해 세션 ID를 주고 받으면서 인증을 구현했습니다.
- 유저의 아바타를 클릭하여 로그인 유저는 로그아웃, 그렇지 않으면 로그인을 할 수있습니다.

> 메인(홈)

- 유저가 업로드한 비디오(유저, 제목)를 확인할 수 있습니다.
- 비디오를 클릭하면 비디오 상세페이지로 이동할 수 있습니다.
