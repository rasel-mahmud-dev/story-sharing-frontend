import React, {memo, useEffect, useState} from 'react';
import {useParams, useNavigate, useLocation} from "react-router-dom";

import "./addPost.scss"
import {useDispatch, useSelector} from "react-redux";
import fullLink from "../../utils/fullLink";
import MultiInput from "../../components/UI/multiInput/MultiInput";
import api, {baseBackend, getApi} from "../../apis";


import MarkdownIt from 'markdown-it';
// import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import hljs from 'highlight.js'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.bubble.css'
// import 'highlight.js/styles/darcula.css'

hljs.configure({
    languages: ['javascript', 'html', 'css', 'go'],
})


import Loader from "../../components/UI/Loader";
import {CSSTransition} from "react-transition-group";
import PreloadLink from "../../components/UI/Preload/Preload";

import queryString from "query-string";

import ReactQuill, {Quill} from "react-quill";


import 'react-quill/dist/quill.snow.css';
import RichTextEditor from "components/RichTextEditor/RichTextEditor";
import {fetchCategories} from "actions/categoryAction";


const AddPost = (props) => {

    const dispatch = useDispatch()
    const authState = useSelector(state => state.authState)

    const {categories} = useSelector(state => state.postState)

    const [image, setImage] = React.useState("")
    const [loadingState, setLoadingState] = React.useState({
        id: "photo_upload",
        isLoading: false,
        status: "", // "error" || "success"
        message: ""
    })
    const imageInputRef = React.useRef(null)

    const navigate = useNavigate()

    const [markdown_string, setMarkdown_string] = React.useState("")

    const {postId} = useParams()


    let [post, setPost] = React.useState({
        title: "",
        tags: [],
        cover: "",
        summary: "",
        isUpdated: false,
        categoryId: "",
        isPrivate: false,
        htmlContent: ""
    })


    const params = useParams()


    function fetchUpdatedPost(postId, cb) {

        let path = `/api/posts/get-update-post/${postId}`
        getApi().get(path).then(response => {
            cb(response.data)
        })
    }

    React.useEffect(() => {

        let isAndroid = false
        if (params.postId && params.postId !== "null") {

            fetchUpdatedPost(params.postId, (returnPost) => {

                setPost({
                    ...post,
                    ...returnPost,
                    isUpdated: true
                })


                // let req = new XMLHttpRequest()
                // req.open("GET", `${baseBackend}/api/raw-post-content?slug=${returnPost.slug}`)
                // req.responseType = 'text';
                // req.onload = function (e) {
                // }
                // req.onprogress = ev => {
                // }
                // /** store chunked markdown html and render it  */
                // req.onreadystatechange = function () {
                //     if (req.response) {
                //         setMarkdown_string((v) => v + req.response)
                //     }
                // }
                // req.setRequestHeader('Content-type', 'application/json')
                // req.send(JSON.stringify({
                //     filePath: returnPost.path,
                //     post_id: params.postId
                // }));

            })
        }
    }, [params.postId])


    useEffect(() => {
        dispatch(fetchCategories())
    }, []);


    function handleChange(e) {
        const {name, type, value, checked, values} = e.target

        let updatedPost = {...post}
        if (name === "tags") {
            updatedPost.tags = values
        } else if (type === "checkbox") {
            updatedPost[name] = checked
        } else {
            updatedPost[name] = value
        }

        setPost(updatedPost)
    }

    function onSetUrlToCover(path) {
        if (path && typeof path === "string") {
            setPost(p => {
                return {
                    ...p,
                    cover: path
                }
            })
        }
    }


    async function addPostHandler(e) {

        let updateURL = ""
        let createURL = ""

        updateURL = "/api/posts/update-post"
        createURL = "/api/posts/add-post"
        e.preventDefault()


        const {isUpdated, _id, title, tags, cover_url, htmlContent} = post

        if (params.postId) {
            getApi().post(updateURL, {
                _id,
                title,
                tags,
                summary: post.summary,
                categoryId: post.categoryId,
                isPrivate: post.isPrivate,
                cover: post.cover ? post.cover : "",
                htmlContent: post.htmlContent
            }).then(response => {
                if (response.status < 400 && response.status >= 200) {

                    let path = `/posts/${response.data.post.slug}`
                    // dispatch({
                    //   type: "UPDATE_USER_PROFILE_POSTS",
                    //   payload: { userId: authState._id, post: response.data }
                    // })
                    // navigate(path)

                    // setLoadingState({
                    //     id: "addpost",
                    //     message: "Post Updated",
                    //     status: 200,
                    //     isLoading: false,
                    // })
                    // setTimeout(() => {
                    //     let path = `/author/profile/${authState.username}/${authState._id}`
                    //     navigate(path)
                    // }, 500)
                } else {
                    setLoadingState({
                        id: "addpost",
                        message: "Post Update Fail",
                        status: 400,
                        isLoading: false,
                    })
                }
            }).catch(ex => {
                setLoadingState({
                    id: "addpost",
                    message: "Post Update Fail",
                    status: 400,
                    isLoading: false,
                })
            })
        } else {

            let d = {
                title: title.trim(),
                tags,
                categoryId: post.categoryId,
                isPrivate: post.isPrivate,
                summary: post.summary,
                htmlContent: post.htmlContent,
                cover: post.cover ? post.cover : ""
            }
            getApi().post(createURL, d)
                .then(response => {
                    if (response.status < 400 && response.status >= 200) {
                        setLoadingState({
                            id: "addpost",
                            message: "Post Upload Successful",
                            status: 200,
                            isLoading: false,
                        })
                        setTimeout(() => {
                            // let path = `/author/profile/${authState.username}/${authState._id}`
                            let path = `/posts/${response.data.post.slug}`
                            // dispatch({
                            //   type: "UPDATE_USER_PROFILE_POSTS",
                            //   payload: { userId: authState._id, post: response.data }
                            // })
                            navigate(path)
                        }, 500)
                    } else {
                        setLoadingState({
                            id: "addpost",
                            message: "Post Upload Fail",
                            status: 400,
                            isLoading: false,
                        })
                    }
                }).catch(ex => {
                setLoadingState({
                    id: "addpost",
                    message: ex.message,
                    status: 400,
                    isLoading: false,
                })
            })
        }
    }

    // Initialize a markdown parser
    const mdParser = new MarkdownIt(/* Markdown-it options */);


    // Finish!
    function handleEditorChange({html, text}) {
        setMarkdown_string(text)
        // console.log('handleEditorChange', html, text);
    }


    function inputWrapper() {
        return (
            <div className="input_wrapper input-elem dark:bg-dark-600 dark_subtitle flex justify-between">
                <input name="cover" onChange={handleChange}
                       value={post.cover}
                       className="outline-none w-full bg-transparent dark_subtitle "
                       type="text" placeholder="Paster image full url"/>
                {/*<button onClick={()=>coverPhotoInputRef.current && coverPhotoInputRef.current.click()} className="cursor-pointer">Upload</button>*/}
            </div>
        )
    }

    function handleClickToCopy() {

    }


    return (
        <div className="container-1000 px-4 mt-4">
            <div>
                <PreloadLink to={`/author/profile/${authState.first_name}/${authState._id}`}
                             className="font-medium text-primary ">Back to Profile</PreloadLink>
            </div>
            <h1 className="title text-lg text-center font-bold dark_title">{post.isUpdated ? "Update Post" : "Add New Post"}</h1>


            {loadingState.id === "addpost" &&
                <CSSTransition unmountOnExit={true} in={loadingState.message} timeout={450} classNames="my-node">
                    <div
                        className={["alert-message", loadingState.status === 400 ? "error-alert" : "success-alert"].join(" ")}>
                        <h4>{loadingState.message}</h4>
                    </div>
                </CSSTransition>
            }

            <div>

                <div className="add-post-form">

                    <div className="form-group flex-col">
                        <label className="block no-wrap text-sm dark_subtitle" htmlFor="">Post Title</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="title"
                            autoComplete="title"
                            value={post.title}
                            className="input-elem dark:bg-dark-600 dark_subtitle"/>
                    </div>

                    <div className="form-group flex-col">
                        <label className="block no-wrap text-sm dark_subtitle" htmlFor="">Post cover photo</label>
                        {inputWrapper()}
                        {/*<input type="file" ref={coverPhotoInputRef} hidden={true} accept="image/*" onChange={handleChangeCoverPhoto} />*/}
                    </div>
                    <div className="w-full">
                        {/*{cover.base && (*/}
                        {/*    <img className="w-full" src={cover.base} alt="" />*/}
                        {/*)}*/}
                    </div>
                    <div className="w-full">
                        {post.cover && (
                            <img className="w-full" src={fullLink(post.cover)} alt=""/>
                        )}
                    </div>

                    <div className="form-group flex-col">
                        <label className="block no-wrap text-sm dark_subtitle" htmlFor="">Tags</label>
                        <MultiInput name="tags" onChange={handleChange} defaultValues={post.tags}/>
                    </div>

                    <div>
                        <div>

                            {/*<FileUploader onSetUrlToCover={onSetUrlToCover} />*/}

                            {loadingState.id === "photo_upload" && loadingState.isLoading && (
                                <div className="flex flex-col  items-center">
                                    <Loader/>
                                    <h5 className="dark_subtitle">Uploading...</h5>
                                </div>
                            )}

                            {loadingState.id === "photo_upload" &&
                                <CSSTransition unmountOnExit={true} in={loadingState.message} timeout={450}
                                               classNames="my-node">
                                    <div className={loadingState.status === 400 ? "error-alert" : "success-alert"}>
                                        <h4 className="dark_subtitle">{loadingState.message}</h4>
                                    </div>
                                </CSSTransition>
                            }

                            {image && <p
                                onClick={handleClickToCopy}
                                className="mt-t text-xs px-2 outline-none font-medium cursor-pointer hover:bg-primary hover:text-white "
                            >{image}</p>
                            }
                            <div className="max-w-xl">
                                {image && <img className="responsive-image" src={image} alt=""/>}
                            </div>
                        </div>

                        <div className="form-group flex-col">
                            <label className="block no-wrap text-sm dark_subtitle" htmlFor="">Summary</label>
                            <textarea
                                onChange={handleChange}
                                name="summary"
                                rows={5}
                                defaultValue={post.summary}
                                className="input-elem dark:bg-dark-600 dark_subtitle"/>
                        </div>

                        <div className="form-group flex-col">
                            <label className="block no-wrap text-sm dark_subtitle" htmlFor="Category">Category</label>
                            <select onChange={handleChange} name="categoryId" id="Category">
                                <option value="">Select a category</option>
                                {categories.map(cat => (
                                    <option value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group flex-col">
                            <div className="flex w-max gap-x-1">
                                <input onChange={handleChange} type="checkbox" name="isPrivate" id="isPrivate"
                                       checked={post.isPrivate}/>
                                <label className="block no-wrap text-sm dark_subtitle"
                                       htmlFor="isPrivate">Private</label>
                            </div>
                        </div>

                        <div className="form-group flex-col">
                            <label className="block no-wrap text-sm dark_subtitle" htmlFor="">Article</label>

                            {/*<MdEditor*/}
                            {/*    value={markdown_string}*/}
                            {/*    style={{height: "500px"}}*/}
                            {/*    renderHTML={(text) => m.render(text)}*/}
                            {/*    onChange={handleEditorChange}*/}
                            {/*    className=""*/}
                            {/*/>*/}
                            {/*<textarea style={{ minHeight: post.isUpdated ? "500px": "200px" }} className="input-elem ml-5" defaultValue={post.mdContent}></textarea>*/}

                            <RichTextEditor
                                value={post.htmlContent}
                                onChange={(e) => setPost(p => ({...p, htmlContent: e}))}
                            />
                        </div>
                    </div>

                    <div className="">
                        <button onClick={addPostHandler}
                                className="btn btn-primary dark:bg-dark-600 dark_subtitle">{post.isUpdated ? "Update" : "Add Post"}</button>
                    </div>

                </div>

            </div>


        </div>
    );
};


export default AddPost;