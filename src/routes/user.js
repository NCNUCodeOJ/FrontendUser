import React from 'react';

const Dashboard = React.lazy(() => import('../views/user/dashboard/Dashboard'));
const Login = React.lazy(() => import('../views/pages/login/Login'));
const AnnouncementContent = React.lazy(() => import('../views/user/announcement/AnnouncementContent'));
const Profile = React.lazy(() => import('../views/user/profile/Profile'));
const SystemInformation = React.lazy(() => import('../views/user/profile/SystemInformation'));
const Register = React.lazy(() => import('../views/user/register/Register'));
const CourseList = React.lazy(() => import('../views/user/course/CourseList'));
const ExamList = React.lazy(() => import('../views/user/exam/ExamList'));
const ExamInfo = React.lazy(() => import('../views/user/exam/ExamInfo'));
const HomeworkInfo = React.lazy(() => import('../views/user/homework/HomeWorkInfo'));
const HomeWorkList = React.lazy(() => import('../views/user/homework/HomeWorkList'));
const ForgetPassword = React.lazy(() => import('../views/pages/forgetPassword/ForgetPassword'));
const ContestList = React.lazy(() => import('../views/user/contest/ContestList'));
const ContestIntro = React.lazy(() => import('../views/user/contest/ContestIntro'));
const QuestionList = React.lazy(() => import('../views/user/contest/QuestionList'));
const QuestionInfo = React.lazy(() => import('../views/user/contest/QuestionInfo'));
const StatusPage = React.lazy(() => import('../views/user/contest/StatusPage'));
const RankPage = React.lazy(() => import('../views/user/contest/RankPage'));
const QAList = React.lazy(() => import('../views/user/contest/QAList'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: '首頁', component: Dashboard },
  { path: '/login', exact: true, name: '登入', component: Login },
  { path: '/announcement/:id', exact: true, name: '公告', component: AnnouncementContent },
  { path: '/settings/profile', exact: true, name: '個人資訊', component: Profile },
  { path: '/settings/systeminformation', exact: true, name: '系統資訊', component: SystemInformation },
  { path: '/register', exact: true, name: '註冊頁面', component: Register },
  { path: '/course', exact: true, name: '課程清單', component: CourseList },
  { path: '/course/examlist/:id', exact: true, name: '測驗清單', component: ExamList },
  { path: '/course/examinfo/:id', exact: true, name: '測驗內容', component: ExamInfo },
  { path: '/course/homeworkinfo/:id', exact: true, name: '作業內容', component: HomeworkInfo },
  { path: '/course/homeworklist/:id', exact: true, name: '作業清單', component: HomeWorkList },
  { path: '/login/forgetpassword', exact: true, name: '忘記密碼', component: ForgetPassword },
  { path: '/contest/contestlist', exact: true, name: '比賽清單', component: ContestList },
  { path: '/contest/contestintro/:id', exact: true, name: '比賽簡介', component: ContestIntro },
  { path: '/contest/questionlist/:id', exact: true, name: '題目清單', component: QuestionList },
  { path: '/contest/questioninfo/:id', exact: true, name: '題目內容', component: QuestionInfo },
  { path: '/contest/statuspage/:id', exact: true, name: '比賽狀態', component: StatusPage },
  { path: '/contest/rankpage/:id', exact: true, name: '比賽排行榜', component: RankPage },
  { path: '/contest/qalist/:id', exact: true, name: '比賽Q&A', component: QAList },
];
export default routes;
