var m=Object.defineProperty;var n=Object.getOwnPropertySymbols;var i=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable;var d=(o,e,t)=>e in o?m(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t,r=(o,e)=>{for(var t in e||(e={}))i.call(e,t)&&d(o,t,e[t]);if(n)for(var t of n(e))p.call(e,t)&&d(o,t,e[t]);return o};import{R as a,S as u,o as h,n as f,e as E,N as b,L as x}from"./vendor.16ba28b7.js";import N from"./AddPost.ee095573.js";import{a as v,d as P}from"./index.74fab435.js";import"./index.6ad6dc4a.js";const L=o=>{const e=[{path:"/admin/dashboard",exact:!0,component:j},{path:"/admin/dashboard/add-post/:postId",exact:!0,component:N}];return a.createElement("div",{className:"container px-15"},a.createElement(u,null,e.map(t=>a.createElement(h,r({},t)))))},j=o=>{const e=f(s=>s.postState),t=E();a.useEffect(()=>{e.posts&&e.posts.length===0&&v(t)},[]);const l=[{to:"/admin/dashboard/add-post/null",exact:!0,text:"Add Post"}];function c(s){t(P(s))}return a.createElement("div",null,a.createElement("h2",null,"Admin Dashboard"),l.map(s=>a.createElement(b,{to:s.to},s.text)),e.posts.map(s=>a.createElement("div",null,a.createElement("div",{className:"flex justify-between"},a.createElement("h4",null,s.title),a.createElement("span",null,a.createElement(x,{to:`/admin/dashboard/add-post/${s.id}`},a.createElement("i",{className:"pointer fa fa-pen"})),a.createElement("i",{onClick:()=>c(s.id),className:"pointer fa fa-trash"}))))))};export{L as default};
