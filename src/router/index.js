import {createRouter, createWebHashHistory} from "vue-router";
import GetStarted from "../views/GetStarted.vue";
import Survey from '@/views/Survey.vue'

/*React Pages*/

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/get-started",
  },
  {
    path: "/get-started",
    name: "GetStarted",
    component: GetStarted,
  },
  {
    path: "/survey/:index",
    name: "Survey",
    component: Survey,
  }
];
/*React Pages*/
// import ReactDashboard from '@/react-admin/views/dashboard/ReactDashboard.vue'
// import UsersList from '@/react-admin/views/pages/users/UsersList.vue'
// import User from '@/react-admin/views/pages/users/User.vue'
// import Integration from '@/react-admin/views/pages/integrations/Integration.vue'
// import Site from '@/react-admin/views/pages/users/Site.vue'
// import OnboardDevice from '@/react-admin/views/pages/onboard/OnboardDevice.vue'

// const adminRoutes = [
//   {
//     path: "/community/members",
//     name: "Users List",
//     component: UsersList,
//   },
//   {
//     path: "/community/member/:id",
//     name: "User Page",
//     component: User,
//   },
//   {
//     path: "/community/member/:id/site/:sid",
//     name: "SitePage",
//     component: Site,
//   },
//   {
//     path: "/onboard/device",
//     name: "OnboardDevice",
//     component: OnboardDevice,
//   },
//   {
//     path: "/integrations/:id",
//     name: "Integration Page",
//     component: Integration,
//   },
//   {
//     path: "/login",
//     name: "Login Cover",
//     component: Login,
//   }
// ]

const router = createRouter({
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [...routes],
  linkActiveClass: "active",
});

export default router;
