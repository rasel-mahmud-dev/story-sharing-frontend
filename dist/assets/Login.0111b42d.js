var f=Object.defineProperty,E=Object.defineProperties;var h=Object.getOwnPropertyDescriptors;var c=Object.getOwnPropertySymbols;var b=Object.prototype.hasOwnProperty,g=Object.prototype.propertyIsEnumerable;var i=(l,t,a)=>t in l?f(l,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):l[t]=a,u=(l,t)=>{for(var a in t||(t={}))b.call(t,a)&&i(l,a,t[a]);if(c)for(var a of c(t))g.call(t,a)&&i(l,a,t[a]);return l},p=(l,t)=>E(l,h(t));import{e as N,u as v,R as e,L as w}from"./vendor.16ba28b7.js";import{l as y}from"./index.74fab435.js";const C=l=>{const t=N(),a=v(),[n,d]=e.useState({email:"",password:""});function m(s){d(p(u({},n),{[s.target.name]:s.target.value.trim()}))}function x(s){s.preventDefault();let r=!0;for(const o in n)n[o]||(r=!1);r?y(n,t,o=>{a.push("/")}):alert("please full all field")}return e.createElement("div",null,e.createElement("div",{className:"container mx-auto"},e.createElement("div",{className:"bg-white px-6 py-4 rounded-5 max-w-xl mx-auto"},e.createElement("h1",{className:"text-2xl font-400 text-gray-light-7 text-center"},"Login in your Account."),e.createElement("form",{onSubmit:x,className:"py-10"},e.createElement("div",{className:" flex mb-2"},e.createElement("label",{className:"font-medium min-w-100px block text-sm font-400 text-gray-dark-4",htmlFor:""},"Email"),e.createElement("input",{onChange:m,value:n.email,placeholder:"Enter Your Email.",className:"input-elem",type:"text",name:"email"})),e.createElement("div",{className:"mb-2 flex"},e.createElement("label",{className:"font-medium min-w-100px block text-sm font-400 text-gray-dark-4 ",htmlFor:""},"Password"),e.createElement("input",{onChange:m,value:n.password,placeholder:"Enter Your Password.",className:"w-full input-elem",type:"text",name:"password"})),e.createElement("div",{className:"mt-2 mb-3"},e.createElement("h4",{className:"text-sm font-400"},"Not have a account?",e.createElement("span",{className:"cursor-pointer text-blue-400 p-px ml-0.5 "},e.createElement(w,{to:"/auth/registration"},"Create a account new account")))),e.createElement("div",null,e.createElement("button",{className:"btn"},"Login"))))))};export{C as default};
