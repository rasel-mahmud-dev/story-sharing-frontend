import apis, {getApi} from "apis";
import ACTION_TYPES from "store/ACTION_TYPES";

export function fetchCategories() {
    return async function (dispatch) {
        let {data, status} = await getApi().get("/api/categories")

        if (status) {
            dispatch({
                type: ACTION_TYPES.FETCH_CATEGORIES,
                payload: data
            })

        }

    }
}

export function addCategory(payload, cb, isUpdate = false) {
    return async function (dispatch) {

        if(isUpdate){
            let {data, status} = await getApi().put("/api/categories", payload)

            if (status) {
                dispatch({
                    type: ACTION_TYPES.UPDATE_CATEGORY,
                    payload: data.category
                })
                cb()
            }
        } else{
            let {data, status} = await getApi().post("/api/categories", payload)

            if (status) {
                dispatch({
                    type: ACTION_TYPES.ADD_CATEGORY,
                    payload: data.category
                })
                cb()
            }
        }


    }
}

export function deleteCategory(categoryId) {
    return async function (dispatch) {
        let {data, status} = await getApi().delete("/api/categories/" + categoryId)
        if (status === 201) {
            dispatch({
                type: ACTION_TYPES.REMOVE_CATEGORY,
                payload: categoryId
            })

        }

    }
}