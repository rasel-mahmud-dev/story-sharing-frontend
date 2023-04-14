import React from 'react';
import ReactQuill, {Quill} from "react-quill";

import "./style.scss"

import hljs from 'highlight.js'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.bubble.css'
import 'highlight.js/styles/atom-one-dark.css'


var FontAttributor = Quill.import('formats/font');
var fonts = ['impact', 'courier', 'comic', 'Roboto', 'Arial', 'Poppins',
    "Merriweather",
    "Lato",
    "Open-Sans",
    "FiraCode",
    "Rubik",
];
var lHeights = ['1.0', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6'];
FontAttributor.whitelist = fonts;
Quill.register(FontAttributor, true);


hljs.configure({
    languages: ['javascript', 'typescript', 'html', 'css', 'go', 'golang'],
})

// const modules = {
//     syntax: {
//         highlight: text => hljs.highlightAuto(text).value,
//     },
//     toolbar: [
//         [  [{ 'header': 1 }, { 'header': 2 }],'bold', 'italic', 'underline', 'blockquote'],
//         [{ list: 'ordered' }, { list: 'bullet' }],
//         ['link', 'image', 'video'],
//         ['clean'],
//         ['code-block'],
//     ],
//     clipboard: {
//         matchVisual: false,
//     },
// }

const CustomUndo = () => (
    <svg viewBox="0 0 18 18">
        <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"/>
        <path
            className="ql-stroke"
            d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
        />
    </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
    <svg viewBox="0 0 18 18">
        <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"/>
        <path
            className="ql-stroke"
            d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
        />
    </svg>
);


// Quill Toolbar component
const QuillToolbar = () => (
    <div id="toolbar">
    <span className="ql-formats">
        <select className="ql-font">
            <option value="Arial" selected>Arial</option>
            <option value="Roboto">Roboto</option>
            <option value="Poppins">Poppins</option>
            <option value="Merriweather">Merriweather</option>
            <option value="Lato">Lato</option>
            <option value="Open-Sans">Open Sans</option>
            <option value="FiraCode">Fira Code</option>
            <option value="Rubik">Rubik</option>
            <option value="impact">Impact</option>
            <option value="courier">Courier</option>
            <option value="comic">Comic Sans MS</option>
          </select>
          <select className="ql-header">
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
            <option value="4"></option>
            <option selected></option>
          </select>

        <select className="ql-size">
    <option value="small"></option>

            <option selected></option>
    <option value="large"></option>
    <option value="huge"></option>
  </select>


    </span>
        <span className="ql-formats">
      <button className="ql-bold"/>
      <button className="ql-italic"/>
      <button className="ql-underline"/>
      <button className="ql-strike"/>
    </span>
        <span className="ql-formats">
      <button className="ql-list" value="ordered"/>
      <button className="ql-list" value="bullet"/>
      <button className="ql-indent" value="-1"/>
      <button className="ql-indent" value="+1"/>
    </span>
        <span className="ql-formats">
      <button className="ql-script" value="super"/>
      <button className="ql-script" value="sub"/>
      <button className="ql-blockquote"/>
      <button className="ql-direction"/>
    </span>
        <span className="ql-formats">
      <select className="ql-align"/>
      <select className="ql-color"/>
      <select className="ql-background"/>
    </span>
        <span className="ql-formats">
      <button className="ql-link"/>
      <button className="ql-image"/>
      <button className="ql-video"/>
    </span>
        <span className="ql-formats">
      <button className="ql-formula"/>
      <button className="ql-code-block"/>
      <button className="ql-clean"/>
    </span>
        <span className="ql-formats">
      <button className="ql-undo">
        <CustomUndo/>
      </button>
      <button className="ql-redo">
        <CustomRedo/>
      </button>
    </span>
    </div>
);


const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block"
]

const modules = {
    toolbar: {
        container: "#toolbar",

    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true
    }
};

class RichTextEditor extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div className="rich-texteditor">
                <QuillToolbar/>

                <ReactQuill
                    // theme="bubble"
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