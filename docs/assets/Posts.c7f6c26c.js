var q=Object.defineProperty,V=Object.defineProperties;var z=Object.getOwnPropertyDescriptors;var F=Object.getOwnPropertySymbols;var B=Object.prototype.hasOwnProperty,U=Object.prototype.propertyIsEnumerable;var O=(n,a,m)=>a in n?q(n,a,{enumerable:!0,configurable:!0,writable:!0,value:m}):n[a]=m,y=(n,a)=>{for(var m in a||(a={}))B.call(a,m)&&O(n,m,a[m]);if(F)for(var m of F(a))U.call(a,m)&&O(n,m,a[m]);return n},H=(n,a)=>V(n,z(a));import{R as e,q as W,e as G,u as J,r as I,L,F as K,v as Q}from"./vendor.16ba28b7.js";import{f as T,d as X,a as Y,b as Z,c as $}from"./index.750437f5.js";import{q as ee}from"./index.1b296300.js";const j=n=>{const{onSubmit:a,cancelBtn:m,onCancel:i,parent_id:x}=n,[l,f]=e.useState({text:"",parent_id:x});function E(p){p.preventDefault(),a&&a(l)}return e.createElement("div",null,e.createElement("div",{className:"add-comment-form"},e.createElement("textarea",{onChange:p=>f(H(y({},l),{text:p.target.value})),className:"input-elem",name:"text",placeholder:"Post your comment",id:"text"}),e.createElement("div",{className:"flex justify-end"},m&&e.createElement("button",{onClick:i,className:"btn-sm btn"},"Cancel"),e.createElement("button",{onClick:E,className:"btn btn-sm ml-2"},"Post"))))},te=n=>{const{comment:a,onDeleteComment:m,onFetchNestedComment:i,onHideReply:x,onSetShowReplyCommentForm:l,showReplyCommentForm:f,onSubmitAddComment:E}=n,[p,C]=e.useState("");function b(s){C(s===p?"":s)}const w=P(a);function P({id:s,text:R,post_id:u,user_id:g,created_at:N,reply:h=!1,child_comment_count:_,username:M,avatar:A}){function D(v){let k=new Date,S=1e3,t=S*60,o=t*60,r=o*24,c=k-new Date(v),d="";return Math.floor(c/r)?d=Math.floor(c/r)+" day ago":Math.floor(c/o)?d=Math.floor(c/o)+" hour ago":Math.floor(c/t)?d=Math.floor(c/t)+" min ago":Math.floor(c/S)?d=Math.floor(c/S)+" sec ago":d="a second ago",d}return e.createElement("div",{className:"my-4 mt-6"},e.createElement("div",{className:"flex"},e.createElement("div",{className:"w-5 mr-2"},e.createElement("img",{className:"w-full radius-100",src:T(A)})),e.createElement("div",{className:"comment-body flex-1"},e.createElement("div",{className:"comment-body-text px-2 py-1 bg-gray-light-9 bg-opacity-30 text-sm rounded"},e.createElement("h1",null,e.createElement("a",{className:"text-blue-600",href:""},M," ID: ",s)),e.createElement("h1",null,R)),e.createElement("div",{className:"comment-action flex mt-1 text-xs items-center"},e.createElement("li",{className:""},e.createElement("i",{className:"fa fa-heart hover:text-primary"})),e.createElement("li",{className:"mx-3"},e.createElement("i",{onClick:()=>l(s),className:"fa fa-reply mr-1"})),e.createElement("li",null,e.createElement("i",{className:"fa fa-clock mr-1"}),D(new Date(N))),e.createElement("li",{className:"ml-3  relative"},e.createElement("span",{className:"cursor-pointer hover:text-primary",onClick:()=>b(s)},"more"),p===s&&e.createElement("div",{className:"bg-white w-40 comment_option absolute shadow_1"},e.createElement("ul",{className:""},e.createElement("li",{className:"px-2 py-1 cursor-pointer hover:bg-primary_light  hover:text-primary flex"},e.createElement("span",{className:"pointer-events-none"},e.createElement("i",{className:"fa fa-pen mr-1 "}),"  Edit comment")),e.createElement("li",{onClick:()=>m(s),className:"px-2 py-1 cursor-pointer hover:bg-primary_light hover:text-primary flex"},e.createElement("span",{className:"pointer-events-none"},e.createElement("i",{className:"fa fa-trash mr-1"})," Delete comment")))))),f===s&&e.createElement(j,{onSubmit:E,parent_id:s,cancelBtn:!0,onCancel:()=>l("")}),_>0&&e.createElement("div",{onClick:()=>h&&h.length>0?x(s):i(s,u),className:"flex mt-3 items-center"},e.createElement("i",{className:"fa text-xs text-gray-light-7 fa-reply mr-1"}),e.createElement("h4",{className:"text-gray-light-7 text-xs hover:text-primary cursor-pointer"}," ",h&&h.length>0?"hide reply comments":"show reply"," ",_)),h&&h.map(v=>P(v)))))}return w};const ae=()=>e.createElement("div",{className:"lds-ripple"},e.createElement("div",null),e.createElement("div",null)),ne=n=>{const[a,m]=e.useState(!1),{postState:i,authState:x}=n,[l,f]=e.useState({}),[E,p]=e.useState({pageSize:1,currentPage:1}),[C,b]=e.useState(""),[w,P]=e.useState(""),[s,R]=e.useState(!1),u=G(),g=J();let N=ee.parse(g.location.search);I.exports.useEffect(()=>{i.posts.length<1&&(m(!0),Y(u,()=>m(!1)))},[]),I.exports.useEffect(async()=>{let t=N.search;if(t){let o=Z(i.posts,t.trim().toLowerCase());o.length>0?(u({type:"SEARCH_POSTS",payload:o}),u({type:"SET_POST_SEARCH_VALUE",payload:t.trim().toLowerCase()}),g.replace(`/?search=${t}`)):(u({type:"SEARCH_POSTS",payload:[]}),g.replace(`/?search=${t}`))}else u({type:"SEARCH_POSTS",payload:i.posts})},[N&&N.search&&N.search]);function h(){let{pageSize:t,currentPage:o}=E;$.get(`api/comments?${l.id}&page_size=${t}&current_page=${o+1}`).then(r=>{if(r.status===200){let c=y({},l);c.comments.push(...r.data.comments),f(c),p(H(y({},E),{currentPage:E.currentPage+1}))}})}function _(t,o){$.get(`/api/comments?post_id=${o}&parent_id=${t}`).then(r=>{if(r.status===200){let c=l.comments.findIndex(d=>d.id===t);if(c!==-1){let d=y({},l);d.comments[c].reply=r.data.comments,f(d)}}})}function M(t){let o=l.comments.findIndex(r=>r.id===t);if(o!==-1){let r=y({},l);r.comments[o].reply=[],f(r)}}function A(t){P(w===t?"":t)}function D(t){if(C===t){b("");return}b(t)}function v(t,o){return e.createElement("div",null,e.createElement("h3",{onClick:()=>R(!s),className:"text-sm mt-4 mb-1 font-medium cursor-pointer"},"Write a Comment..."),s&&e.createElement(j,{onSubmit:handlePostComment}),e.createElement("div",{className:"comment_list mt-5"},l.comments&&l.comments.map(r=>e.createElement(te,{onSubmitAddComment:handlePostComment,onHideReply:M,onDeleteComment:deleteCommentHandler,showMoreCommentOptionId:C,handleToggleMoreOption:D,onFetchNestedComment:_,showReplyCommentForm:w,onSetShowReplyCommentForm:A,comment:r})),o&&e.createElement("h5",{onClick:h,className:"text-sm font-medium text-center text-gray-light-7 hover:text-primary cursor-pointer"},"+More comment")))}function k(t){u({type:"SET_POST_SEARCH_VALUE",payload:""}),u({type:"SEARCH_POSTS",payload:i.posts}),g.replace("/")}function S(){return i.searchResultPosts.map(t=>e.createElement(L,{to:`/posts/${t.slug}`},e.createElement("div",{className:"bg-gray-9 flex my-2 rounded"},e.createElement("div",{style:{width:"100px"},className:"post_cover mr-2"},e.createElement("img",{className:"w-full flex",src:T(t.cover),alt:""})),e.createElement("div",{key:t.id,className:""},e.createElement("div",{className:"post-meta"},e.createElement("div",{className:"flex"},e.createElement("div",null,e.createElement("img",{className:"w-6 rounded-full",src:T(t.author.avatar),alt:""})),e.createElement("div",{className:"flex justify-between flex-wrap"},e.createElement("h4",null,t.author.username),e.createElement("span",{className:"text-sm font-medium"},"Created at : ",new Date(t.created_at).toLocaleDateString())))),e.createElement("h4",{className:"title text-md mt-1"},t.title),l&&l.id===t.id&&v(t.id,t.total_comments)))))}return e.createElement("div",null,e.createElement("div",{className:"px-0 container"},e.createElement("div",{className:"posts_wrapper"},e.createElement("div",{className:"filter_items mt-4"},e.createElement("div",{className:"flex justify-between"},e.createElement("h1",{className:"title text-lg"},"All Posts"),x&&x.id&&e.createElement(L,{className:"btn btn-outline",to:"/admin/dashboard/add-post/null"},"Make A Post")),i.searchValue&&e.createElement("ul",{className:"flex align-center"},e.createElement("h4",{className:"title"},"search by :"),e.createElement("h4",{className:"title search_text"},i.searchValue),e.createElement(K,{icon:Q,className:"ml-5 cursor-pointer text-red-400",onClick:k}))),e.createElement("div",{className:"border-b mb-5"}),e.createElement("div",{className:"mx-auto flex justify-center"},a&&e.createElement(ae,null)),i.searchResultPosts.length<=0?e.createElement("h4",{className:"title text-sm"},"not posts matched with ",i.searchValue):S())))};function me(n){return{postState:n.postState,authState:n.authState}}var ce=W(me,{deletePost:X})(ne);export{ce as default};
