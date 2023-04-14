import React, {useEffect, useState} from 'react';
import Popup from "UI/Popup/Popup";
import Input from "../UI/Input/Input";
import {useDispatch, useSelector} from "react-redux";
import {addCategory, fetchCategories} from "actions/categoryAction";

import "./style.scss"

const AddCategory = ({isOpen, updateItem, onClose}) => {

    const {categories} = useSelector(state => state.postState)

    const [newCategory, setNewCategory] = useState({
        name: "",
        content: "",
        parentId: ""
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategories())

        if (updateItem) {
            setNewCategory(updateItem)
        }

    }, [updateItem]);


    useEffect(() => {
        if (updateItem) {
            setNewCategory(updateItem)
            dispatch(fetchCategories())
        }
    }, [updateItem])


    function handleChange(e) {
        setNewCategory(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    function handleAddCategory(e) {
        e.preventDefault();
        if (updateItem) {
            dispatch(addCategory(newCategory, done, true))
        } else {
            dispatch(addCategory(newCategory, done))
        }
    }

    function done(){
        onClose()
        setNewCategory({name: "", parentId:  "", content: ""})
    }

    return (
        <Popup isOpen={isOpen} isWithBackdrop={true} className="center-scale-popup" onClose={onClose}>
            <div className="">
                <div className="add_category_form">
                    <h1 className="subtitle text-lg mb-4">Add Category</h1>
                    <form onSubmit={handleAddCategory}>

                        <Input onChange={handleChange} name="name" placeholder="Name" value={newCategory.name}/>
                        <div className="mt-2"></div>
                        <Input onChange={handleChange} name="content" placeholder="Content"
                               value={newCategory.content}/>
                        <div className="mt-2"></div>
                        <select onChange={handleChange} name="parentId">
                            <option value="">Select Parent Category</option>
                            {categories.map(cat => (
                                <option selected={newCategory.parentId === cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>

                        <div className="mt-2"></div>
                        <button className="btn btn-primary" type="submit">Add Category</button>

                    </form>

                </div>
            </div>

        </Popup>

    );
};

export default AddCategory;