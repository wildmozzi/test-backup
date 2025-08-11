# React + Supabase Authentication App

React 앱에 Supabase 인증 기능이 통합된 프로젝트입니다.

## 🚀 기능

- ✅ 사용자 회원가입
- ✅ 이메일/비밀번호 로그인
- ✅ 로그아웃
- ✅ 사용자 세션 관리
- ✅ Tailwind CSS 스타일링

## 🛠️ 기술 스택

- **Frontend**: React 19 + TypeScript
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Linting**: ESLint

## 📦 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone <repository-url>
   cd my-project
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **환경변수 설정**
   ```bash
   cp .env.example .env
   ```
   
   `.env` 파일에 Supabase 정보를 입력하세요:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **개발 서버 실행**
   ```bash
   npm run dev
   ```
   
   브라우저에서 `http://localhost:3000`으로 접속

## 🏗️ 빌드

```bash
npm run build
```

## 📁 프로젝트 구조

```
src/
├── api/
│   └── supabaseClient.ts    # Supabase 클라이언트 설정
├── hooks/
│   └── useAuth.ts           # 인증 관련 커스텀 훅
├── App.tsx                  # 메인 앱 컴포넌트
└── main.tsx                 # 앱 진입점
```

## 🔧 Supabase 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. Authentication 설정에서 이메일 인증 활성화
3. Site URL을 `http://localhost:3000`으로 설정
4. API 키를 `.env` 파일에 추가

## 📝 사용법

1. **회원가입**: "계정이 없으신가요? 회원가입" 클릭
2. **로그인**: 이메일과 비밀번호로 로그인
3. **로그아웃**: 로그인 후 "로그아웃" 버튼 클릭

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request