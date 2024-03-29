import {Link, NavLink, useNavigate} from "react-router-dom";
import "./navigation.scss"
import fullLink from "../../utils/fullLink";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";


import withWidth from "../UI/withWidth/WithWidth";
import PreLoad from "../UI/Preload/Preload";
import {BiMoon, BiSearch, BiSun, BiUser, FaSignInAlt, FaSignOutAlt} from "react-icons/all";
import {searchPosts} from "actions/postAction";
import apis from "apis";

const Logo = (_) => <svg xmlns="http://www.w3.org/2000/svg" width="155" height="27.851" viewBox="0 0 153 27.851">
    <defs>
        <radialGradient id="radial-gradient" cx="0.698" cy="0.478" r="3.151"
                        gradientTransform="matrix(1, 0.003, -0.001, 0.192, 0, 0.385)" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#3d2ffb"/>
            <stop offset="0.933" stop-color="#8981eb"/>
            <stop offset="0.979" stop-color="#a8a2ff"/>
            <stop offset="1" stop-color="#efeff1"/>
        </radialGradient>
    </defs>
    <g id="Group_30" data-name="Group 30" transform="translate(-50 -30.149)">
        <g id="Group_109" data-name="Group 109" transform="translate(50 30.149)">
            <rect id="Rectangle_31" data-name="Rectangle 31" width="4.983" height="27.563" rx="2.492"
                  transform="matrix(0.857, 0.515, -0.515, 0.857, 14.708, 0)" fill="url(#radial-gradient)"/>
            <rect id="Rectangle_32" data-name="Rectangle 32" width="4.561" height="27.913" rx="2.281"
                  transform="matrix(0.857, 0.515, -0.515, 0.857, 21.512, 0.977)" fill="url(#radial-gradient)"/>
            <rect id="Rectangle_33" data-name="Rectangle 33" width="4.561" height="26.512" rx="2.281"
                  transform="matrix(0.857, 0.515, -0.515, 0.857, 27.725, 2.777)" fill="url(#radial-gradient)"/>
            <rect id="Rectangle_34" data-name="Rectangle 34" width="4.19" height="9.858" rx="2.095"
                  transform="matrix(0.857, 0.515, -0.515, 0.857, 27.929, 13.47)" fill="url(#radial-gradient)"/>
            <rect id="Rectangle_35" data-name="Rectangle 35" width="4.19" height="9.858" rx="2.095"
                  transform="matrix(0.857, 0.515, -0.515, 0.857, 5.077, 5.557)" fill="url(#radial-gradient)"/>
        </g>
        <text id="DEV_STORY" data-name="DEV STORY" transform="translate(90 52)"
              fill="#5d51ff" font-size="22"
              font-family="Roboto-Medium, Roboto"
              font-weight="900" letter-spacing="-0.015em">
            <tspan x="0" y="0">STORY</tspan>
            <tspan font-size="11"
                   font-family="Roboto-Medium, Roboto"
                   font-weight="900" letter-spacing="-0.015em">SHARING
            </tspan>

        </text>
    </g>
</svg>


const Navigation = (props) => {

    const {authState, postState, expandDropdown, handleSetExpandDropdown, innerWidth} = props

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [theme, setTheme] = React.useState("light")

    const headerRef = useRef()

    const [openMobileSearch, setOpenMobileSearch] = React.useState(false)
    const [isMobile, setIsMobile] = React.useState(false)

    React.useEffect(() => {
        let html = window.document.children[0]
        let theme = window.localStorage.getItem("theme")
        if (theme) {
            setTheme("dark")
            html.classList.add(theme)
        } else {
            setTheme("light")
        }
    }, [])

    React.useEffect(() => {
        if (innerWidth > 768) {
            setIsMobile(false)
        } else {
            setIsMobile(true)
        }
    }, [innerWidth])


    useEffect(() => {

        const height = headerRef.current.offsetHeight
        document.documentElement.style
            .setProperty('--header-height', height + "px") ;



    }, []);



    function logoutRoutePush() {
        window.localStorage.setItem("token", "")
        dispatch({
            type: "LOGIN",
            payload: {}
        })
    }


    function loadErrorAvatar(e) {
        const div = document.createElement("h1")
        div.innerHTML = `
       <div class="w-6 h-6 rounded-full bg-gray-300  dark:bg-primary shadow-md flex justify-center align-center">
        <span class="text-sm font-medium">${authState.first_name[0]}</span>
      </div>
    `
        e.target.parentNode.appendChild(div)
        e.target.remove()
    }


    function authDropdown(isShow) {
        return isShow && (
            <div className="dropdown_nav shadow-md">
                <div className="min-w-200 dark:bg-dark-600 bg-white text-sm font-medium p-4">
                    {authState._id ? (
                        <>
                            {authState.role === "MASTER" && (
                                <li className="flex hover:bg-primary hover:bg-opacity-40 hover:text-white cursor-pointer px-2 py-4">
                                    {/*<FontAwesomeIcon icon={faAdn} className="mr-2 dark_title text-gray-800"/>*/}
                                    <PreLoad className="block dark_subtitle" onClick={() => handleSetExpandDropdown("")}
                                             to="/admin">Dashboard</PreLoad>
                                </li>
                            )}
                            <li className="flex hover:bg-opacity-40 hover:bg-primary hover:text-white cursor-pointer px-2 py-2">
                                <PreLoad className="block dark_subtitle"
                                         to={`/profile/${authState.username}`}>
                                    {/*<FontAwesomeIcon icon={faUserAlt} className="mr-2 dark_title text-gray-800"/>*/}
                                    Profile
                                </PreLoad>
                            </li>
                            <PreLoad to="/user/reading-list">
                                <li
                                    className="flex hover:bg-primary hover:bg-opacity-40 hover:text-white cursor-pointer px-2 py-2">
                                    {/*<FontAwesomeIcon icon={faSignOutAlt} className="mr-2 dark_title text-gray-800"/>*/}
                                    My Reading List
                                </li>
                            </PreLoad>
                            <li onClick={() => logoutRoutePush("/user/profile")}
                                className="flex hover:bg-primary hover:bg-opacity-40 hover:text-white cursor-pointer px-2 py-2">
                                {/*<FontAwesomeIcon icon={faSignOutAlt} className="mr-2 dark_title text-gray-800"/>*/}
                                Logout
                            </li>
                        </>
                    ) : (
                        <li
                            className="flex flex-1 items-center hover:bg-primary hover:bg-opacity-40 hover:text-white  cursor-pointer  px-2 py-2"
                            // onClick={()=> pushRoute("/auth/login") }
                        >
                            <PreLoad className="block" to="/auth/login">
                                <FaSignInAlt className="mr-2 text-gray-800"
                                />

                                Login</PreLoad>
                        </li>
                    )
                    }
                </div>
            </div>
        )
    }

    async function searchHandler(e) {
        e.preventDefault()


        setOpenMobileSearch(false)
        let val = postState.searchValue.trim().toLowerCase()


        let {data} = await apis.get("/api/posts/search?search="+val)

        dispatch({
            type: "SEARCH_POSTS",
            payload: {
                text: val,
                data: data
            }
        })

        // searchPosts(val, function (result) {
        //     try {
        //
        //         let items = result.split("----")
        //         items=items.filter(item=>item)
        //         items.forEach(item=>{
        //             let obj = JSON.parse(item)
        //             dispatch({
        //                 type: "SEARCH_POSTS",
        //                 payload: {
        //                     search: val,
        //                     data: obj
        //                 }
        //             })
        //         })
        //
        //         // let item = JSON.parse(result)
        //         // console.log(item)
        //         //
        //         // dispatch({
        //         //     type: "SEARCH_POSTS",
        //         //     payload: {
        //         //         search: val,
        //         //         data: item
        //         //     }
        //         // })
        //     } catch (ex) {
        //         console.log(ex)
        //     }
        // })

        if (val) {
            navigate(`/search?text=${val}`)
        } else {
            dispatch({type: "SEARCH_POSTS", payload: postState.posts})
            navigate(`/`)
        }
    }

    function handleChange(e) {
        dispatch({type: "SET_POST_SEARCH_VALUE", payload: e.target.value})
    }

    function openMenuHandler(e) {
        if (expandDropdown === "user_menu") {
            handleSetExpandDropdown("")
            dispatch({
                type: "TOGGLE_APPMASK",
                payload: false
            })
        } else {
            handleSetExpandDropdown("user_menu")
            dispatch({
                type: "TOGGLE_APPMASK",
                payload: {
                    as: "transparent",
                    isOpen: true
                }
            })
        }
    }

    function toggleDarkTheme(e) {
        let theme = localStorage.getItem("theme")
        if (theme === "dark") {
            window.document.children[0].classList.remove("dark")
            localStorage.setItem("theme", "")
            setTheme("light")
        } else {
            localStorage.setItem("theme", "dark")
            window.document.children[0].classList.add("dark")
            setTheme("dark")
        }
    }

    function showMobileSearchForm() {
        setOpenMobileSearch(true)
    }

    return (
        <header>
            <div className="navigation bg-nav-light dark:bg-gray-900" ref={headerRef}>

                <div style={{filter: isMobile && openMobileSearch ? "blur(5px)" : ""}}
                     className="navigation__container px-5 ">
                    <ul className="main-nav ">

                        <div className="nav-logo flex-4 md:flex-2   ">
                            <div className="flex align-center">
                                <div className="brand">
                                    <Link to="/" className="flex items-center">
                                        <img className="w-12 mr-2" src="/icons.png" alt=""/>
                                        <h4 className="!text-primary text-2xl font-bold">Devs</h4>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Hidden on Mobile */}
                        <div className="flex-5 nav-search-input_wrapper hidden md:flex">
                            <input
                                onKeyPress={(e) => e.key === "Enter" && searchHandler(e)}
                                value={postState.searchValue}
                                onChange={handleChange}
                                className="nav-search-input"
                                type="text"
                                placeholder="Search posts"
                            />
                            <BiSearch
                                className="cursor-pointer text-gray-600 dark:text-gray-100 "
                                onClick={searchHandler}/>
                        </div>
                        {/* show on Mobile */}
                        <div className="flex relative md:hidden">
                            <BiSearch
                                className="cursor-pointer pointer text-gray-500 text-md md:text-base "
                                onClick={() => setOpenMobileSearch(true)}/>
                        </div>


                        {/* Desktop Nav */}
                        <div className="nav-auth flex-5 hidden md:block">
                            <ul className="nav_items flex justify-end align-center text-gray-600 dark:text-gray-300">
                                <li className="nav-item py-4"><NavLink className="nav_link" to="/about">Our
                                    Story</NavLink></li>
                                <li className="nav-item"><PreLoad className="nav_link" to="/auth/add-post/null">Write
                                    Story</PreLoad></li>
                                {authState._id
                                    ? (
                                        <div className="nav-item flex align-center relative"
                                             onMouseLeave={() => handleSetExpandDropdown("")}
                                             onMouseEnter={() => handleSetExpandDropdown("user_menu")}
                                             onClick={openMenuHandler}
                                        >
                                            <h4 className="text-primary font-medium">{authState.username && authState.username > 15
                                                ? authState.username.slice(0, 15)
                                                : authState.username}
                                            </h4>
                                            <div className="mx-2 py-4">
                                                {authState.avatar
                                                    ? <img onError={loadErrorAvatar} className="w-5 rounded-full flex"
                                                           src={fullLink(authState.avatar)}/>
                                                    : <BiUser
                                                        className="flex text-md text-gray-600 "/>
                                                }
                                            </div>
                                            {authDropdown(expandDropdown === "user_menu")}
                                        </div>
                                    ) : <li className="nav-item leading-none">
                                        <PreLoad className="nav_link" to="/auth/join">
                                            <button className="bg-primary text-white px-5 py-3 rounded-lg">
                                                Sign In
                                            </button>
                                        </PreLoad>
                                    </li>
                                }
                            </ul>
                        </div>

                        <ul className="nav_items flex align-center">
                            <li className="nav-item md:hidden">
                                {authState._id
                                    ? (
                                        <div className="mx-4" onMouseLeave={() => handleSetExpandDropdown("")}>
                                            {authState.avatar
                                                ? <img
                                                    className="w-5 rounded-full flex"
                                                    src={fullLink(authState.avatar)}
                                                    onError={loadErrorAvatar}
                                                    onClick={openMenuHandler}
                                                />
                                                : <BiUser
                                                    className="flex text-md md:text-base text-gray-600"/>}
                                            {authDropdown(expandDropdown === "user_menu")}
                                        </div>
                                    ) : (
                                        <Link to="/auth/join" className="flex">
                                            <FaSignInAlt
                                                className="text-md mx-4 md:text-base  text-gray-500"/>
                                        </Link>
                                    )}

                            </li>
                            <li className={"nav-item py-3"}>
                                {theme === "dark" ? <BiSun
                                    className={["flex text-md text-gray-600 md:text-base  cursor-pointer", theme === "dark" ? "text-white" : ""].join(" ")}
                                    onClick={toggleDarkTheme}/> : <BiMoon
                                    className={["flex text-md text-gray-600 md:text-base  cursor-pointer", theme === "dark" ? "text-white" : ""].join(" ")}
                                    onClick={toggleDarkTheme}/>}

                                {/*<FontAwesomeIcon onClick={toggleDarkTheme} icon={theme === "dark" ? faSun : faMoon}*/}
                                {/*                 className={["flex text-md text-gray-600 md:text-base  cursor-pointer", theme === "dark" ? "text-white" : ""].join(" ")}/>*/}
                            </li>
                        </ul>

                    </ul>
                </div>

                {isMobile && openMobileSearch && (
                    <div className="floating_search dark_subtitle ">
                        <form className="flex flex-1 justify-center" onSubmit={searchHandler}>
                            <div>
                                <input
                                    onChange={handleChange}
                                    className="rounded border-1 dark_subtitle text-dark-900 font-medium"
                                    value={postState.searchValue}
                                    type="text"
                                    placeholder="Search posts"/>
                            </div>
                            <button className="btn rounded bg-primary dark:dark_subtitle text-gray-100"
                                    type="submit">Search
                            </button>
                        </form>
                    </div>
                )}
            </div>
            <div className="header-height"/>
        </header>
    );
};


export default withWidth(Navigation);