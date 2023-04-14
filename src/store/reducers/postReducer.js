import ACTION_TYPES from "store/ACTION_TYPES";

const initialState = {
    posts: [],
    postDetails: {},
    searchPosts: [],
    searchValue: "",
    likes: [],
    search: {
        text: "",
        data: []
    },
    readingList: [],
    topPosts: {
        posts: [],
        last_time: "" // Date
    },
    // authPosts: null // after fetch posts it will be array of post then skeleton load complete
    cacheUserProfile: [
        // {_id: "", avatar: "", ...,  posts: []}
    ],
    categories: []
}


export default function (state = initialState, action) {
    let updatedState = {...state}
    let post_id;
    let index;

    switch (action.type) {
        case "FETCH_POSTS":
            updatedState.posts = action.payload
            updatedState.searchResultPosts = action.payload
            return updatedState

        case "FETCH_TOP_POSTS":
            // updatedState.posts = action.payload
            // updatedState.searchResultPosts = action.payload
            updatedState.topPosts.posts = action.payload
            return updatedState

        case "FETCH_POST":
            updatedState.postDetails = action.payload
            return updatedState

        case "DELETE_POST":
            let p = updatedState.posts.filter(p => p.id !== action.payload)
            updatedState.posts = p
            updatedState.searchResultPosts = p
            return updatedState

        case "FETCH_POST_MD_CONTENT":
            updatedState.postDetails.mdContent = action.payload
            return updatedState

        // case "SEARCH_POSTS":
        //     updatedState.searchPosts = action.payload
        //     return updatedState

        case "SET_POST_SEARCH_VALUE":
            updatedState.searchValue = action.payload
            updatedState.search.data = []
            return updatedState

        case "FETCH_LIKES":
            updatedState.likes = action.payload
            return updatedState

        case "ADD_LIKE":
            post_id = action.payload.post_id
            index = updatedState.posts.findIndex(p => p.id === post_id)
            if (index !== -1) {
                updatedState.posts[index] = {
                    ...updatedState.posts[index],
                    you_liked: 1,
                    total_likes: updatedState.posts[index].total_likes + 1
                }
            }
            return updatedState

        case "REMOVE_LIKE":
            post_id = action.payload.post_id
            index = updatedState.posts.findIndex(p => p.id === post_id)

            if (index !== -1) {
                updatedState.posts[index] = {
                    ...updatedState.posts[index],
                    you_liked: 0,
                    total_likes: updatedState.posts[index].total_likes - 1
                }
            }
            return updatedState

        case "FETCH_USER_POSTS" :

            index = updatedState.cacheUserProfile.findIndex(profile => profile._id === action.payload.userId)
            if (index !== -1) {
                updatedState.cacheUserProfile[index] = {
                    ...updatedState.cacheUserProfile[index],
                    posts: action.payload.posts,
                }
            }
            return updatedState


        case "DELETE_CACHE_USER_POST" :
            const currentCacheUserIndex = updatedState.cacheUserProfile.findIndex(profile => profile._id === action.payload.author_id)
            if (currentCacheUserIndex === -1) return updatedState


            /** find post index that we need delete */
            index = updatedState.cacheUserProfile[currentCacheUserIndex].posts.findIndex(p => p._id === action.payload._id)
            if (index === -1) return updatedState

            updatedState.cacheUserProfile[currentCacheUserIndex].posts.splice(index, 1)
            return updatedState

        case "FETCH_USER_PROFILE" :
            index = updatedState.cacheUserProfile.findIndex(profile => profile._id === action.payload._id)
            if (index === -1) {
                updatedState.cacheUserProfile = [...updatedState.cacheUserProfile, action.payload]
            }
            return updatedState


        case ACTION_TYPES.FETCH_READING_LIST :
            return {
                ...state,
                readingList: action.payload
            }


        case ACTION_TYPES.REMOVE_READING_LIST :
            return {
                ...state,
                readingList: state.readingList.filter(r => r._id !== action.payload.postId)
            }


        case ACTION_TYPES.ADD_TO_READING_LIST :
            return {
                ...state,
                readingList: [...state.readingList, action.payload]
            }


        case "SEARCH_POSTS" :
            const {text, data} = action.payload
            return {
                ...state,
                search: {
                    text: text,
                    data: data
                }
            }

        case ACTION_TYPES.FETCH_CATEGORIES :

            return {
                ...state,
                categories: action.payload
            }

        case ACTION_TYPES.ADD_CATEGORY :
            return {
                ...state,
                categories: [...state.categories, action.payload]
            }

        case ACTION_TYPES.REMOVE_CATEGORY :
            return {
                ...state,
                categories: state.categories.filter(c => c._id !== action.payload)
            }

        case ACTION_TYPES.UPDATE_CATEGORY :
            let updateCategories = [...state.categories]

            index = updateCategories.findIndex(item => item._id === action.payload._id)
            if (index !== -1) {
                updateCategories[index] = {
                    ...updateCategories[index],
                    ...action.payload
                }
            }
            return {
                ...state,
                categories: updateCategories
            }

        default:
            return state
    }
}

