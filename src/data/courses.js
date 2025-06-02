const courses = [
  // 1학년 과목
  {
    code: "CS111",
    name: "컴퓨터공학개론",
    required: true,
    year: 1,
    semester: 1,
    prerequisites: [],
    professors: [{ name: "전혜경" }],
    description: "컴퓨터공학 전반에 대한 소개 및 기초 개념 학습"
  },
  {
    code: "CS112",
    name: "프로그래밍입문",
    required: true,
    year: 1,
    semester: 1,
    prerequisites: [],
    professors: [{ name: "채진석" }, { name: "최대진" }],
    description: "프로그래밍의 기본 개념과 문법을 배운다"
  },
  {
    code: "CS113",
    name: "이산수학",
    required: true,
    year: 1,
    semester: 2,
    prerequisites: [],
    professors: [{ name: "이승수" }],
    description: "컴퓨터 공학에서의 수학적 기초 (논리, 집합, 그래프 등)"
  },
  {
    code: "CS121",
    name: "C언어",
    required: true,
    year: 1,
    semester: 2,
    prerequisites: ["CS112"],
    professors: [{ name: "안재균" }, { name: "백형부" }],
    description: "C 프로그래밍 언어 문법과 실습"
  },
  {
    code: "CS122",
    name: "데이터사이언스입문",
    required: true,
    year: 1,
    semester: 2,
    prerequisites: [],
    professors: [{ name: "구민석" }],
    description: "데이터 사이언스의 기본 개념 및 활용 사례 소개"
  },
  {
    code: "CS123",
    name: "확률및통계",
    required: true,
    year: 1,
    semester: 2,
    prerequisites: [],
    professors: [{ name: "김현정" }],
    description: "확률과 통계의 기초 개념"
  },

  // 2학년 과목
  {
    code: "CS211",
    name: "자료구조",
    required: true,
    year: 2,
    semester: 1,
    prerequisites: ["CS121"],
    professors: [{ name: "안재균" }, { name: "이승수" }],
    description: "자료 구조의 개념, 구현 및 응용"
  },
  {
    code: "CS212",
    name: "Java언어",
    required: true,
    year: 2,
    semester: 1,
    prerequisites: ["CS121"],
    professors: [{ name: "허혜선" }],
    description: "Java 언어 문법 및 객체지향 개념"
  },
  {
    code: "CS213",
    name: "선형대수",
    required: true,
    year: 2,
    semester: 1,
    prerequisites: ["CS113"],
    professors: [{ name: "김현정" }],
    description: "벡터, 행렬, 선형변환 등 선형대수 기초"
  },
  {
    code: "CS214",
    name: "시뮬레이션기초및실습",
    required: true,
    year: 2,
    semester: 1,
    prerequisites: ["CS113"],
    professors: [{ name: "김지범" }],
    description: "시뮬레이션 기초 및 실습을 통한 학습"
  },
  {
    code: "CS215",
    name: "데이터프로그래밍",
    required: true,
    year: 2,
    semester: 2,
    prerequisites: ["CS112", "CS122", "CS123"],
    professors: [{ name: "이장호" }, { name: "성미영" }],
    description: "데이터 수집, 분석, 시각화 프로그래밍"
  },
  {
    code: "CS221",
    name: "컴퓨터구조",
    required: true,
    year: 2,
    semester: 2,
    prerequisites: ["CS121"],
    professors: [{ name: "박문주" }],
    description: "컴퓨터 하드웨어 구조와 동작 원리"
  },
  {
    code: "CS222",
    name: "C++언어",
    required: true,
    year: 2,
    semester: 2,
    prerequisites: ["CS121", "CS212"],
    professors: [{ name: "전혜경" }, { name: "허혜선" }],
    description: "C++ 언어의 문법과 객체지향 프로그래밍"
  },

  // 3학년 과목
  {
    code: "CS311",
    name: "운영체제",
    required: true,
    year: 3,
    semester: 1,
    prerequisites: ["CS221"],
    professors: [{ name: "박문주" }],
    description: "운영체제의 구조, 프로세스 관리 등"
  },
  {
    code: "CS312",
    name: "데이터베이스",
    required: true,
    year: 3,
    semester: 1,
    prerequisites: ["CS211"],
    professors: [{ name: "최대진" }],
    description: "데이터베이스 설계, SQL, 정규화 등"
  },
  {
    code: "CS313",
    name: "소프트웨어공학",
    required: true,
    year: 3,
    semester: 1,
    prerequisites: ["CS212"],
    professors: [{ name: "채진석" }],
    description: "소프트웨어 개발 생명주기, 설계 패턴 등"
  },
  {
    code: "CS314",
    name: "웹프로그래밍",
    required: true,
    year: 3,
    semester: 1,
    prerequisites: ["CS212"],
    professors: [{ name: "박기석" }],
    description: "HTML, CSS, JavaScript 기반의 웹 개발 기초"
  },
  {
    code: "CS321",
    name: "알고리즘",
    required: true,
    year: 3,
    semester: 2,
    prerequisites: ["CS211", "CS113"],
    professors: [{ name: "채진석" }, { name: "이승수" }],
    description: "탐색, 정렬, 동적계획법 등 알고리즘 설계 및 분석"
  },
  {
    code: "CS322",
    name: "네트워크프로그래밍",
    required: true,
    year: 3,
    semester: 2,
    prerequisites: ["CS311"],
    professors: [{ name: "민병준" }],
    description: "네트워크 통신 프로토콜 및 소켓 프로그래밍"
  },

  // 4학년 과목
  {
    code: "CS411",
    name: "머신러닝",
    required: true,
    year: 4,
    semester: 1,
    prerequisites: ["CS213", "CS123", "CS215"],
    professors: [{ name: "구민석" }],
    description: "기계학습 알고리즘과 응용"
  },
  {
    code: "CS412",
    name: "인공지능",
    required: true,
    year: 4,
    semester: 1,
    prerequisites: ["CS321", "CS411"],
    professors: [{ name: "구민석" }],
    description: "인공지능 기초 이론 및 실습"
  },
  {
    code: "CS413",
    name: "딥러닝",
    required: true,
    year: 4,
    semester: 1,
    prerequisites: ["CS411"],
    professors: [{ name: "이장호" }],
    description: "신경망과 딥러닝 기법 소개 및 실습"
  },
  {
    code: "CS414",
    name: "클라우드컴퓨팅",
    required: true,
    year: 4,
    semester: 1,
    prerequisites: ["CS311", "CS322"],
    professors: [{ name: "민병준" }],
    description: "클라우드 환경의 컴퓨팅 인프라 및 서비스 설계"
  },
  {
    code: "CS421",
    name: "빅데이터처리",
    required: true,
    year: 4,
    semester: 2,
    prerequisites: ["CS312", "CS215"],
    professors: [{ name: "최대진" }],
    description: "빅데이터 처리와 분석 기술"
  },
  {
    code: "CS422",
    name: "컴퓨터비전",
    required: true,
    year: 4,
    semester: 2,
    prerequisites: ["CS413", "CS213"],
    professors: [{ name: "이장호" }],
    description: "영상처리, 이미지 인식 기술 등 컴퓨터비전 개론"
  },
  {
    code: "CS423",
    name: "정보보안",
    required: true,
    year: 4,
    semester: 2,
    prerequisites: ["CS311", "CS322"],
    professors: [{ name: "민병준" }],
    description: "정보보안 기술, 암호화, 네트워크 보안 이론"
  },
  {
    code: "CS424",
    name: "캡스톤프로젝트",
    required: true,
    year: 4,
    semester: 2,
    prerequisites: ["CS313"],
    professors: [{ name: "전혜경" }, { name: "박기석" }],
    description: "종합 설계 프로젝트"
  }
];

export default courses;