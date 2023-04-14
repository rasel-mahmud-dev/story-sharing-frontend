import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchMyReadingList, removeReadingList} from "actions/postAction";
import Preload from "UI/Preload/Preload";
import {CiTrash} from "react-icons/all";

const ReadingList = () => {

    const dispatch = useDispatch()

    const {readingList} = useSelector(state=>state.postState)

    function handleRemoveReadingList(id){
        dispatch(removeReadingList(id))
    }

    useEffect(()=>{

        dispatch(fetchMyReadingList())
    }, [])

    return (
        <div className="container-1200">

            <h2 className="text-lg title font-semibold my-5">My Reading List</h2>

            {readingList?.map(list=>(
                <div className="mt-4  border-b border-b-primary  rounded-md p-4">
                    <Preload to={`/posts/${list.slug}`}>
                        <h4 className="text-md font-semibold hover:text-primary hover:underline">{list.title}</h4>
                    </Preload>
                    <h4 className="text-sm text-dark-200" >{list.summary}</h4>

                    <div onClick={()=>handleRemoveReadingList(list._id)} className="flex items-center gap-x-px mt-2 cursor-pointer hover:text-red-500 w-max">
                        <CiTrash />
                        <span>Remove</span>
                    </div>
                </div>
            ))}


        </div>
    );
};

export default ReadingList;