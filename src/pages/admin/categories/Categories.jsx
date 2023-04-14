import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories, deleteCategory} from "actions/categoryAction";
import AddCategory from "components/AddCategory/AddCategory";
import {BiPen, BiTrash} from "react-icons/all";


const Categories = () => {

    const {categories} = useSelector(state => state.postState)

    const [updateItem, setUpdateItem] = useState(null)

    const [isShowAddCategory, setShowAddCategory] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategories())
    }, []);


    function handleDeleteCategory(id){
        dispatch(deleteCategory(id))
    }

    function handleUpdateCategory(category){
        setUpdateItem(category)
        setShowAddCategory(true)
    }

    return (
        <div>

            <div className="flex items-center justify-between">
                <h4 className="font-medium text-2xl title py-4">Categories</h4>

                <div className="flex justify-end">
                    <button onClick={() => setShowAddCategory(!isShowAddCategory)}
                            className="btn btn-outline px-4 subtitle">Add Category
                    </button>
                </div>
            </div>

            <div>
                {categories && categories.length > 0 ? categories?.map(category => (
                    <div className="flex justify-between px-4 py-2 hover:bg-primary/100 cursor-pointer">
                        <h4 className="para">{category.name}</h4>
                        <div className="flex gap-x-2">
                            <BiPen onClick={()=>handleUpdateCategory(category)} fontSize={16}/>
                            <BiTrash onClick={()=>handleDeleteCategory(category._id)} fontSize={16}/>
                        </div>
                    </div>
                )) : (
                    <h4 className="title">No Category found</h4>
                )}
            </div>


            <AddCategory isOpen={isShowAddCategory} updateItem={updateItem} onClose={() => setShowAddCategory(false)}/>


        </div>
    );
};

export default Categories;
