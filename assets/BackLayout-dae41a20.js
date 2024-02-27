import{_ as f,a as h,r as d,o as b,c as w,b as e,d as l,w as v,n as p}from"./index-48e79dc0.js";import{u as x}from"./AdminLoginStore-a1747115.js";const g={data(){return{name:"",email:"",password:"",id:0}},methods:{isPassword(i){return/^(?=.*[a-z])(?=.*[A-Z])/.test(i)?!0:"密碼 需含大小寫英文字母"},submitOrder(){this.$refs.form.validate().then(i=>{if(i){const a=`http://localhost:3003/admin?email=${this.email}&password=${this.password}`;h.get(a).then(t=>{console.log(t);const s=t.data[0];this.name=s.name,this.email=s.email,this.id=s.id;const o=x();o.updateName(s.name),o.updateEmail(s.email),o.updateId(s.id),console.log("admin data updated:",s.name,s.email,s.id),alert("登入成功"),this.$refs.form.resetForm(),this.$router.push("/adminlogin/main")}).catch(t=>{console.log(t),alert("資料尚未建檔，請與資訊處聯繫!")})}else alert("請再次確認登入資料後提交")})}}},y={class:"container"},V={class:"row backBlock"},k=e("div",{class:"col"},null,-1),B={class:"col-4 my-auto"},N=e("h1",{class:"mb-4 text-center text-danger"},"華特集團管理頁面",-1),A=e("p",{class:"mb-4 fs-4 text-center"},"歡迎管理者",-1),D={class:"mb-3"},S={class:"mb-4"},C=e("button",{class:"btn btn-lg btn-info w-100 mb-4",type:"submit"}," 登入 ",-1),H=e("div",{class:"col-4 my-auto"},[e("img",{src:"https://images.unsplash.com/photo-1630091003936-aea522c1e8c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",class:"img-fluid",alt:"管理首頁畫面圖"})],-1),M=e("div",{class:"col"},null,-1);function U(i,a,t,s,o,m){const r=d("v-field"),c=d("error-message"),_=d("v-form");return b(),w("div",y,[e("div",V,[k,e("div",B,[l(_,{id:"form",ref:"form",onSubmit:m.submitOrder,class:"me-4"},{default:v(({errors:u})=>[N,A,e("div",D,[l(r,{type:"text",name:"email",placeholder:"請輸入電子郵件",class:p(["px-3 pe-4 py-2 form-control",{"is-invalid":u.email}]),rules:"required|email",modelValue:o.email,"onUpdate:modelValue":a[0]||(a[0]=n=>o.email=n)},null,8,["modelValue","class"]),l(c,{name:"email",class:"invalid-feedback"})]),e("div",S,[l(r,{type:"password",name:"密碼",placeholder:"請輸入密碼",class:p(["px-3 pe-4 py-2 form-control",{"is-invalid":u.密碼}]),rules:m.isPassword,modelValue:o.password,"onUpdate:modelValue":a[1]||(a[1]=n=>o.password=n)},null,8,["rules","modelValue","class"]),l(c,{name:"密碼",class:"invalid-feedback"})]),C]),_:1},8,["onSubmit"])]),H,M])])}const z=f(g,[["render",U]]);export{z as default};