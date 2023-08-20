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
import ReviewPage from '../Views/ReviewPage.vue';
import ModifyPage from '../Views/ModifyPage.vue';
import SelectRomance from '../Views/SelectRomance.vue';
import SelectHorror from '../Views/SelectHorror.vue';
import SelectAnimation from '../Views/SelectAnimation.vue';
import SelectDrama from '../Views/SelectDrama.vue';
import SelectFantasy from '../Views/SelectFantasy.vue';
import SelectSF from '../Views/SelectSF.vue';
import SelectMystery from '../Views/SelectMystery.vue';
import SelectCrime from '../Views/SelectCrime.vue';
import SelectGrow from '../Views/SelectGrow.vue';
import SelectAction from '../Views/SelectAction.vue';
import SelectEtc from '../Views/SelectEtc.vue';
import SelectNetflex from '../Views/SelectNetflex.vue';
import SelectDisneyplus from '../Views/SelectDisneyplus.vue';
import SelectWavve from '../Views/SelectWavve.vue';
import SelectTving from '../Views/SelectTving.vue';
import SelectWatcha from '../Views/SelectWatcha.vue';

const routes = [
  { path: '/', component: FirstPage },
  { path: '/LoginPage', component: LoginPage },
  { path: '/JoinPage', component: JoinPage },
  { path: '/HomePage', component: HomePage },
  { path: '/MinePage', component: MinePage },
  { path: '/MenuPage', component: MenuPage },
  { path: '/MovieinformationPage', component: MovieinformationPage },
  { path: '/QnaPage', component: QnaPage },
  { path: '/QuestionPage', component: QuestionPage },
  { path: '/ReviewPage', component: ReviewPage },
  { path: '/ModifyPage', component: ModifyPage },
  { path: '/SelectRomance', component: SelectRomance },
  { path: '/SelectHorror', component: SelectHorror },
  { path: '/SelectAnimation', component: SelectAnimation },
  { path: '/SelectDrama', component: SelectDrama },
  { path: '/SelectFantasy', component: SelectFantasy },
  { path: '/SelectSF', component: SelectSF },
  { path: '/SelectMystery', component: SelectMystery },
  { path: '/SelectCrime', component: SelectCrime },
  { path: '/SelectGrow', component: SelectGrow },
  { path: '/SelectAction', component: SelectAction },
  { path: '/SelectEtc', component: SelectEtc },
  { path: '/SelectNetflex', component: SelectNetflex },
  { path: '/SelectDisneyplus', component: SelectDisneyplus },
  { path: '/SelectWavve', component: SelectWavve },
  { path: '/SelectTving', component: SelectTving },
  { path: '/SelectWatcha', component: SelectWatcha },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
