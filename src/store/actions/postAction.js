import api, {baseBackend, getApi} from "../../apis";
import apis from "apis";
import ACTION_TYPES from "store/ACTION_TYPES";


export function filterPost(posts, searchValue) {
    let val = searchValue.trim().toLowerCase()
    if (val) {
        let result = []
        posts.map(p => {
            if (p.tags.findIndex(t => t.toLowerCase().indexOf(val) !== -1) !== -1) {
                result.push(p)
            }
            if (p.title.toLowerCase().indexOf(val) !== -1) {
                result.push(p)
            }
        })

        let uniqArr = []
        for (let i = 0; i < result.length; i++) {
            let idx = uniqArr.findIndex(u => u.id === result[i].id)
            if (idx === -1) {
                uniqArr.push(result[i])
            }
        }

        return uniqArr

    } else {
        return posts
    }
}

export function filterPostUsingTag(dispatch, tag, cb) {
    api.post("/api/filter-posts", {
        filter: {
            tags: [tag]
        }
    }).then(doc => {
        dispatch({
            type: "SEARCH_POSTS",
            payload: doc.data
        })
        cb && cb()
    })
        .catch(ex => {
            console.log(ex)
            cb && cb()
        })
}

export async function searchPost(dispatch, text, cb) {

    let {data} = await apis.get("/api/posts/search?search=" + val)

    dispatch({
        type: "SEARCH_POSTS",
        payload: {
            text: text,
            data: data
        }
    })

    // api.post("/api/filter-posts", {
    //     filter: {
    //         text: text,
    //     }
    // }).then(doc => {
    //     dispatch({
    //         type: "SEARCH_POSTS",
    //         payload: doc.data
    //     })
    //     cb && cb()
    // })
    //     .catch(ex => {
    //         console.log(ex)
    //         cb && cb()
    //     })
}


export function fetchTopPosts(dispatch, pathname, cb) {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await getApi().get("/api/posts/hits")
            console.log(response)
            if (response.status === 200) {
                // setTopPosts(res.data.posts)
                dispatch({
                    type: "FETCH_TOP_POSTS",
                    payload: response.data.posts
                })
            }

        } catch (ex) {

        }
    })
}


export function fetchPosts(dispatch, pathname, cb) {
    api.get("/api/posts").then(response => {

        if (response.status === 200) {
            dispatch({
                type: "FETCH_POSTS",
                payload: response.data.posts
            })
            cb(response.data.posts)
        } else {
            dispatch({
                type: "FETCH_POSTS",
                payload: []
            })
            cb(null)
        }
    }).catch(ex => {
        dispatch({
            type: "FETCH_POSTS",
            payload: []
        })
        cb && cb(null)
    })
}

export function fetchPostById(postId, dispatch, cb) {
    api.get(`/api/posts/${postId}`).then(response => {
        if (response.status === 200) {
            dispatch({
                type: "FETCH_POST",
                payload: response.data.post
            })
            cb(response.data.post)
        }
    })
}

export function fetchPostMdContent(postId, dispatch, cb) {
    api.get(`/api/post-content/${postId}`).then(response => {
        if (response.status === 200) {
            dispatch({
                type: "FETCH_POST_MD_CONTENT",
                payload: response.data.mdContent
            })
            cb(response.data.mdContent)
        }
    })
}

export function fetchRawMdContent(path, dispatch, cb) {

    api.post(`/api/raw-md-content`, {filePath: path}).then(response => {
        if (response.status === 200) {
            dispatch({
                type: "FETCH_RAW_MD_CONTENT",
                payload: response.data.mdContent
            })
            cb(response.data.mdContent)
        } else {
            cb("")
        }
    }).catch(ex => {
        cb("")
    })


    // api.get(`/api/raw-md-content/${postId}`).then(response=>{
    //   if(response.status === 200){
    //     dispatch({
    //       type: "FETCH_RAW_MD_CONTENT",
    //       payload: response.data.mdContent
    //     })
    //     cb(response.data.mdContent)
    //   } else {
    //     cb("")
    //   }
    // }).catch(ex=>{
    //   cb("")
    // })
}


export const deletePost = (postId, path, author_id, adminId) => async (dispatch) => {
    let response = await api.post(`/api/posts/delete`, {_id: postId, path: path, adminId: adminId})
    if (response.status === 201) {
        dispatch({
            type: "DELETE_CACHE_USER_POST",
            payload: {
                _id: response.data.id,
                author_id
            }
        })
    }
}


export function searchPosts(search, cb) {

    let req = new XMLHttpRequest()
    req.open("GET", `${baseBackend}/api/posts/search?search=${search}`)
    req.responseType = 'text';
    req.onload = function (e) {

    }

    req.onprogress = ev => {
        // console.log(ev)
    }

    /** store chunked markdown html and render it  */
    req.onreadystatechange = function () {

        cb(req.response)

    }

    req.setRequestHeader('Content-type', 'text/html')
    req.send()
}


export function fetchMyReadingList() {

    return async function (dispatch) {

        try {
            let response = await getApi().get("/api/posts/reading-list")
            if (response.status === 200) {
                let arr = []

                if (response.data) {
                    arr = response.data.map(item => {
                        return {
                            ...item.post,
                            readingId: item._id,
                            addedOn: item.createdAt,
                        }
                    })


                }

                dispatch({
                    type: ACTION_TYPES.FETCH_READING_LIST,
                    payload: arr
                })
            }

        } catch (ex) {

        }

    }
}

export function addToReadingList(postId) {

    return async function (dispatch) {
        let {data, status} = await api.post(`/api/posts/reading-list/` + postId)
        if (status === 201) {
            dispatch({
                type: ACTION_TYPES.ADD_TO_READING_LIST,
                payload: data.post
            })
        }
    }
}

export function removeReadingList(postId) {

    return async function (dispatch) {
        let response = await api.delete(`/api/posts/reading-list/` + postId)
        if (response.status === 201) {
            dispatch({
                type: ACTION_TYPES.REMOVE_READING_LIST,
                payload: {
                    postId: postId
                }
            })
        }
    }
}