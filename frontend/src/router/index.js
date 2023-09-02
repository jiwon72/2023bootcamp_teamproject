import { createRouter, createWebHistory } from 'vue-router';
import FirstPage from '../Views/FirstPage.vue';
import LoginPage from '../Views/LoginPage.vue';
import JoinPage from '../Views/JoinPage.vue';
import HomePage from '../Views/HomePage.vue';
import MinePage from '../Views/MinePage.vue';
import MenuPage from '../Views/MenuPage.vue';
import MovieinformationPage from '../Views/MovieinformationPage.vue';
import QnaPage from '../Views/QnaPage.vue';
import QuestionPage from '../Views/QuestionPage.vue';
import AnswerPage from '../Views/AnswerPage.vue';
import ReviewPage from '../Views/ReviewPage.vue';
import GoReviewPage from '../Views/GoReviewPage.vue';
import MyReviewPage from '../Views/MyReviewPage.vue';
import ModifyPage from '../Views/ModifyPage.vue';
import SelectRomance from '../Views/SelectRomance.vue';
import SelectComedy from '../Views/SelectComedy.vue';
import SelectHorror from '../Views/SelectHorror.vue';
import SelectThriller from '../Views/SelectThriller.vue';
import SelectAnimation from '../Views/SelectAnimation.vue';
import SelectDrama from '../Views/SelectDrama.vue';
import SelectFantasy from '../Views/SelectFantasy.vue';
import SelectSF from '../Views/SelectSF.vue';
import SelectMystery from '../Views/SelectMystery.vue';
import SelectCrime from '../Views/SelectCrime.vue';
import SelectMusic from '../Views/SelectMusic.vue';
import SelectAction from '../Views/SelectAction.vue';
import SelectHistory from '../Views/SelectHistory.vue';
import SelectFamily from '../Views/SelectFamily.vue';
import SelectWar from '../Views/SelectWar.vue';
import SelectWestern from '../Views/SelectWestern.vue';
import SelectAdventure from '../Views/SelectAdventure.vue';
import SelectNetflix from '../Views/SelectNetflix.vue';
import SelectDisneyplus from '../Views/SelectDisneyplus.vue';
import SelectWavve from '../Views/SelectWavve.vue';
import SelectAppleTV from '../Views/SelectAppleTV.vue';
import SelectWatcha from '../Views/SelectWatcha.vue';

const routes = [
  { path: '/', component: FirstPage },
  { path: '/LoginPage', component: LoginPage },
  { path: '/JoinPage', component: JoinPage },
  { path: '/HomePage', component: HomePage },
  { path: '/MinePage', component: MinePage },
  { path: '/MenuPage', component: MenuPage },
  {
    path: '/movie/:id',
    name: 'MovieinformationPage',
    component: MovieinformationPage
  },
  { path: '/QnaPage', component: QnaPage },
  { path: '/QuestionPage', component: QuestionPage },
  { path: '/AnswerPage', component: AnswerPage },
  { path: '/ReviewPage', component: ReviewPage },
  { path: '/GoReviewPage/:id', component: GoReviewPage },
  { path: '/MyReviewPage', component: MyReviewPage },
  { path: '/ModifyPage', component: ModifyPage },
  { path: '/SelectRomance', component: SelectRomance },
  { path: '/SelectComedy', component: SelectComedy },
  { path: '/SelectHorror', component: SelectHorror },
  { path: '/SelectThriller', component: SelectThriller },
  { path: '/SelectAnimation', component: SelectAnimation },
  { path: '/SelectDrama', component: SelectDrama },
  { path: '/SelectFantasy', component: SelectFantasy },
  { path: '/SelectSF', component: SelectSF },
  { path: '/SelectMystery', component: SelectMystery },
  { path: '/SelectCrime', component: SelectCrime },
  { path: '/SelectMusic', component: SelectMusic },
  { path: '/SelectAction', component: SelectAction },
  { path: '/SelectHistory', component: SelectHistory },
  { path: '/SelectFamily', component: SelectFamily },
  { path: '/SelectWar', component: SelectWar },
  { path: '/SelectWestern', component: SelectWestern },
  { path: '/SelectAdventure', component: SelectAdventure },
  { path: '/SelectNetflix', component: SelectNetflix },
  { path: '/SelectDisneyplus', component: SelectDisneyplus },
  { path: '/SelectWavve', component: SelectWavve },
  { path: '/SelectAppleTV', component: SelectAppleTV },
  { path: '/SelectWatcha', component: SelectWatcha },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
