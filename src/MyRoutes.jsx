import {lazy, Suspense} from "react"

import {useRoutes} from "react-router-dom";
import ProgressBar from "src/components/UI/ProgressBar/ProgressBar";
import AddPostSkeleton from "./pages/admin/AddPostSkeleton";
import AllSignIn from "./pages/auth/AllSignIn";
import LoginWithEmail from "./pages/auth/LoginWithEmail";
import SignUp from "./pages/auth/SignUp";
import AndroidPosts from "./pages/admin/androidPosts/AndroidPosts";
import ForgetPassword from "./pages/auth/ForgetPassword";
import AuthCallback from "pages/auth/AuthCallback";
import SetNewPassword from "pages/auth/SetNewPassword";

// this function function for lazy route load...........
const ReactLazyPreload = (importStatement) => {
    const Component = lazy(importStatement)
    // Component.preload call when preload link clicked
    // @ts-ignore
    Component.preload = importStatement
    return Component
}


const AllSignInLite = ReactLazyPreload(() => import("./pages/auth/AllSignInLite"));
const PostsFilterPageLite = ReactLazyPreload(() => import("./pages/postFilterPage/PostsFilterPageLite"));
const HomePageLite = ReactLazyPreload(() => import("./pages/homePage/HomePageLite"));
const About = ReactLazyPreload(() => import("./components/about/About"));

const PostDetailSimple = ReactLazyPreload(() => import("./pages/postDetails/PostDetailSimple"));
const AddPost = ReactLazyPreload(() => import("src/pages/admin/AddPostSimple"));
const Dashboard = ReactLazyPreload(() => import("src/pages/admin/Dashboard"));
const ProfilePageSimple = ReactLazyPreload(() => import("src/pages/profilePage/ProfilePageSimple"));


export let myRoutes = []

let isAuth = null;

function MyRoutes(props) {

    const {authState, isAuthLoaded} = props

    myRoutes = [

        {path: "/", index: true, element: <HomePageLite/>},
        {path: "/search", index: true, element: <PostsFilterPageLite/>},
        {
            path: "/author/profile/:username/:id",
            index: true,
            element: <ProfilePageSimple/>
        },
        {path: "/posts/:slug/:id", index: true, element: <PostDetailSimple/>},
        {path: "/about", index: true, element: <About/>},

        {path: "/auth/auth-callback", index: false, element: <AuthCallback/>},
        {
            path: "/admin/dashboard",
            element: <Dashboard/>,
            protected: true,
            redirectUrl: "/auth/join",
            authFetchInLoading: AddPostSkeleton,
            children: [
                {
                    path: "",
                    index: true,
                    element: <AllSignIn/>
                },
                {
                    path: "add-post/:postId",
                    index: true,
                    element: <AddPost/>
                }, {
                    path: "android-posts",
                    index: true,
                    element: <AndroidPosts/>
                },
            ]
        },  // nested routes
        {
            path: "/auth/add-post/null",
            element: <AddPost/>,
            protected: true,
            redirectUrl: "/auth/join",
            authFetchInLoading: AddPostSkeleton

        },
        {
            path: "/auth/join",
            element: <AllSignInLite/>,
            children: [
                {
                    path: "",
                    index: true,
                    element: <AllSignIn/>
                },
                {
                    path: "email",
                    index: true,
                    element: <LoginWithEmail/>
                },
                {
                    path: "reset-password",
                    index: true,
                    element: <ForgetPassword/>
                },
                {
                    path: "new-password",
                    index: true,
                    element: <SetNewPassword/>
                },

            ]
        }, // nested routes

        {
            path: "/auth/join/new",
            element: <SignUp/>,
        }

    ]


    return (
        <Suspense fallback={<ProgressBar/>}>
            {useRoutes(myRoutes)}
        </Suspense>
    )
}


export default MyRoutes


















