import React from 'react';
import ReactQuill from "react-quill";

import "./style.scss"

import hljs from 'highlight.js'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.bubble.css'
import 'highlight.js/styles/atom-one-dark.css'

hljs.configure({
    languages: ['javascript', 'ruby', 'python', 'rust'],
})

const modules = {
    syntax: {
        highlight: text => hljs.highlightAuto(text).value,
    },
    toolbar: [
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block'],
    ],
    clipboard: {
        matchVisual: false,
    },
}

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'code-block',
]


class RichTextEditor extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div className="rich-texteditor">
            <ReactQuill

                theme="bubble"
                modules={modules}
                formats={formats}
                {...this.props}
            />
            </div>
        )
    }
}


// const RichTextEditor = ({onChange, value}) => {
//
//     return (
//         <div className="rich-texteditor">
//
//             <ReactQuill
//                 theme="bubble"
//                 modules={{
//                     syntax: {
//                         highlight: text => hljs.highlightAuto(text).value
//                     },
//                     toolbar: [
//                         [{ header: [2, 3, false] }],
//                         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//                         [
//                             { script: 'sub' },
//                             { script: 'super' },
//                             { list: 'ordered' },
//                             { list: 'bullet' },
//                             { indent: '-1' },
//                             { indent: '+1' },
//                         ],
//                         ['link', 'image'],
//                         ['code-block'],
//                     ],
//                 }}
//
//                 // modules={{
//                 //     // syntax: true,
//                 //     syntax: {
//                 //         highlight: text => hljs.highlightAuto(text).value
//                 //     },
//                 //     toolbar: [
//                 //         [{ header: [2, 3, false] }],
//                 //         ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//                 //         [
//                 //             { script: 'sub' },
//                 //             { script: 'super' },
//                 //             { list: 'ordered' },
//                 //             { list: 'bullet' },
//                 //             { indent: '-1' },
//                 //             { indent: '+1' },
//                 //         ],
//                 //         ['link', 'image'],
//                 //         ['code-block'],
//                 //     ],
//                 // }}
//                 // theme="snow"
//
//                 // onChange={onChange}
//                 // value={value}
//
//             />
//
//         </div>
//     );
// };


export default RichTextEditor;