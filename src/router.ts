import { createRouter, createWebHistory } from "vue-router";

import IndexPage from "@/pages/IndexPage.vue";
import CommunitiesAll from "@/pages/CommunitiesAll.vue";
import CommunitiesJoined from "@/pages/CommunitiesJoined.vue";
import CommunityHome from "@/pages/Community/CommunityHome.vue";
import CommunityAccess from "@/pages/Community/CommunityAccess.vue";
import CommunityOverview from "@/pages/Community/CommunityOverview.vue";
import CommunityInfo from "@/pages/Community/CommunityInfo.vue";
import CommunityIntegrations from "@/pages/Community/CommunityIntegrations.vue";
import CommunityMembers from "@/pages/Community/CommunityMembers.vue";
import CommunitiesManage from "@/pages/CommunitiesManage.vue";
import CommunityBase from "@/pages/Community/CommunityBase.vue";
import GamesJoined from "@/pages/GamesJoined.vue";
import GamesBrowse from "@/pages/GamesBrowse.vue";
import GamesManage from "@/pages/GamesManage.vue";
import GameBase from "@/pages/Game/GameBase.vue";
import GameHome from "@/pages/Game/GameHome.vue";
import NotFound from "@/pages/NotFound.vue";
import TosPage from "@/pages/TosPage.vue";
import PrivacyPolicy from "@/pages/PrivacyPolicy.vue";
import SlackAuthorization from "@/pages/SlackAuthorization.vue";
import EventsLayout from "@/pages/Events/EventsLayout.vue";
import EventOverview from "./pages/Events/EventOverview.vue";
import { store } from "./store";
import {
  SORT_DIR_PATH,
  SORT_KEY_PATH,
  queryHandlerFactory,
  sortDirs,
  sortKeys,
} from "./util/urlParams";
import { format } from "date-fns";

const routes = [
  {
    path: "/",
    component: IndexPage,
    meta: {
      title: "Playabl",
    },
  },
  {
    path: "/invite/:invite_id",
    component: () => import("@/pages/InvitePage.vue"),
    meta: {
      title: "Playabl",
    },
  },
  {
    path: "/login",
    component: () => import("@/pages/SignIn.vue"),
    meta: {
      title: "Playabl - Sign In",
    },
  },
  {
    path: "/profile",
    component: () => import("@/pages/Profile/ProfilePage.vue"),
    meta: {
      title: "Playabl - Profile",
      requiresAuth: true,
    },
  },
  {
    path: "/notifications",
    component: () => import("@/pages/Profile/NotificationsPage.vue"),
    meta: {
      title: "Playabl - Notifications",
      requiresAuth: true,
    },
  },
  {
    path: "/media",
    component: () => import("@/pages/Profile/MediaPage.vue"),
    meta: {
      title: "Playabl - Media",
      requiresAuth: true,
    },
  },
  {
    path: "/settings",
    component: () => import("@/pages/Profile/SettingsPage.vue"),
    meta: {
      title: "Playabl - Settings",
      requiresAuth: true,
    },
  },
  {
    path: "/communities/joined",
    component: CommunitiesJoined,
    meta: {
      title: "Playabl - Communities",
      requiresAuth: true,
    },
  },
  {
    path: "/communities/browse",
    name: "Communities Browse",
    component: CommunitiesAll,
    meta: {
      title: "Playabl - Communities",
    },
    beforeEnter: [
      queryHandlerFactory({
        [SORT_KEY_PATH]: "member-count",
        [SORT_DIR_PATH]: sortDirs.desc,
      }),
    ],
  },
  {
    path: "/communities/manage",
    component: CommunitiesManage,
    meta: {
      title: "Playabl - Communities",
      requiresAuth: true,
    },
  },
  {
    path: "/communities/new",
    component: () => import("@/pages/CommunityNew.vue"),
    meta: {
      title: "Playabl - New Community",
      requiresAuth: true,
    },
  },
  {
    path: "/communities/:community_id",
    component: CommunityBase,
    meta: {
      title: "Playabl - Community",
    },
    children: [
      {
        path: "",
        redirect: { name: "Community Overview" },
      },
      {
        path: "overview",
        name: "Community Overview",
        component: CommunityHome,
      },
      {
        path: "calendar",
        name: "Community Calendar",
        component: () => import("@/pages/Community/CommunityCalendar.vue"),
        beforeEnter: [
          queryHandlerFactory({
            date: format(new Date(), "yyyy-MM"),
          }),
        ],
      },
      {
        path: "events",
        name: "Community Events",
        component: () => import("@/pages/Community/CommunityEvents.vue"),
        beforeEnter: [
          queryHandlerFactory({
            [SORT_KEY_PATH]: sortKeys.startTime,
            [SORT_DIR_PATH]: sortDirs.asc,
          }),
        ],
      },
      {
        path: "membership",
        name: "Community Membership",
        component: () => import("@/pages/Community/CommunityMembership.vue"),
      },
      {
        path: "manage",
        component: () => import("@/pages/Community/CommunityManage.vue"),
        children: [
          {
            path: "overview",
            name: "Community Management Overview",
            component: CommunityOverview,
          },
          {
            path: "access",
            name: "Community Access",
            component: CommunityAccess,
          },
          {
            name: "Reauth",
            path: "access/reauth",
            component: CommunityAccess,
          },
          {
            path: "info",
            name: "Community Info",
            component: CommunityInfo,
          },
          {
            path: "integrations",
            name: "Community Integrations",
            component: CommunityIntegrations,
          },
          {
            path: "members",
            name: "Community Members",
            component: CommunityMembers,
          },
        ],
      },
    ],
  },
  {
    path: "/games/joined",
    component: GamesJoined,
    meta: {
      title: "Playabl - Games",
      requiresAuth: true,
    },
  },
  {
    path: "/games/browse",
    component: GamesBrowse,
    meta: {
      title: "Playabl - Games",
    },
    beforeEnter: [
      queryHandlerFactory({
        [SORT_KEY_PATH]: sortKeys.startTime,
        [SORT_DIR_PATH]: sortDirs.asc,
      }),
    ],
  },
  {
    path: "/games/manage",
    component: GamesManage,
    meta: {
      title: "Playabl - Games",
      requiresAuth: true,
    },
  },
  {
    path: "/games/new",
    component: () => import("@/pages/GameNew.vue"),
    meta: {
      title: "Playabl - New Game",
      requiresAuth: true,
    },
  },
  {
    path: "/games/:game_id",
    component: GameBase,
    meta: {
      title: "Playabl - Community",
    },
    children: [
      {
        path: "",
        redirect: { name: "Game Overview" },
      },
      {
        path: "overview",
        component: GameHome,
        name: "Game Overview",
      },
      {
        path: "info",
        name: "Game Additional Info",
        component: () => import("@/pages/Game/GameDetails.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "manage",
        component: () => import("@/pages/Game/GameManage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/events",
    redirect: "/events/browse",
  },
  {
    path: "/events/browse",
    name: "Events Browse",
    component: () => import("@/pages/Events/EventsBrowse.vue"),
    beforeEnter: [
      queryHandlerFactory({
        [SORT_KEY_PATH]: sortKeys.startTime,
        [SORT_DIR_PATH]: sortDirs.asc,
      }),
    ],
  },
  {
    path: "/events/new",
    name: "New Event",
    component: () => import("@/pages/Events/NewEvent.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/events/:event_id",
    component: EventsLayout,
    meta: {
      title: "Playabl - Community",
    },
    children: [
      {
        path: "",
        redirect: { name: "Event Overview" },
      },
      {
        path: "overview",
        name: "Event Overview",
        component: EventOverview,
      },
      {
        path: "calendar",
        name: "Event Calendar",
        component: () => import("@/pages/Events/EventCalendar.vue"),
        beforeEnter: [
          queryHandlerFactory({
            date: format(new Date(), "yyyy-MM"),
          }),
        ],
      },
      {
        path: "manage",
        name: "Event Manage",
        component: () => import("@/pages/Events/EventManage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/tos",
    component: TosPage,
    meta: {
      title: "Playable - Terms of Service",
    },
  },
  {
    path: "/privacy",
    component: PrivacyPolicy,
    meta: {
      title: "Playable - Privacy Policy",
    },
  },
  {
    path: "/authorize/slack",
    name: "SlackAuthorization",
    component: SlackAuthorization,
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("./pages/ForgotPassword.vue"),
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () => import("./pages/ResetPassword.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/flags",
    name: "Flags",
    meta: {
      requiresAuth: true,
    },
    component: () => import("./pages/FlagsUI.vue"),
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    document.getElementById("app")?.scrollTo({ top: 0, left: 0 });
  },
});

router.beforeEach((to) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !store.userSession) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: "/login",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
