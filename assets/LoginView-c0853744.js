import{_ as b,a as g,r as n,o as w,c as v,b as e,d as a,w as p,n as _,e as x}from"./index-48e79dc0.js";import{u as V}from"./LoginStore-98680ae9.js";const k={data(){return{name:"",email:"",password:"",id:0}},methods:{isPassword(i){return/^(?=.*[a-z])(?=.*[A-Z])/.test(i)?!0:"密碼 需含大小寫英文字母"},submitOrder(){this.$refs.form.validate().then(i=>{if(i){const t=`http://localhost:3000/user?email=${this.email}&password=${this.password}`;g.get(t).then(l=>{console.log(l);const s=l.data[0];this.name=s.name,this.email=s.email,this.id=s.id;const o=V();o.updateName(s.name),o.updateEmail(s.email),o.updateId(s.id),console.log("User data updated:",s.name,s.email,s.id),alert("登入成功"),this.$refs.form.resetForm(),this.$router.push("/login/main")}).catch(l=>{console.log(l),alert("您尚未成為會員，請先註冊"),this.$router.push("/")})}else alert("請再次確認會員資料後提交")})}}},y={class:"container"},N={class:"row row-login"},B=e("div",{class:"col"},null,-1),U=e("div",{class:"d-none d-lg-block col-lg-4"},[e("img",{src:"https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",class:"img-fluid login-img",alt:"首頁畫面圖"})],-1),D={class:"col-3 my-lg-auto login-form"},L=e("h1",{class:"mb-4 text-center"},"華特義式餐廳",-1),S=e("p",{class:"mb-4 fs-4 text-center"},"歡迎華特會員",-1),$={class:"mb-3"},A={class:"mb-4"},C=e("button",{class:"btn btn-lg btn-info w-100 mb-4",type:"submit"}," 登入 ",-1),H={class:"text-end login-buttom"},M=e("div",{class:"col"},null,-1);function q(i,t,l,s,o,d){const m=n("v-field"),c=n("error-message"),f=n("v-form"),h=n("RouterLink");return w(),v("div",y,[e("div",N,[B,U,e("div",D,[a(f,{id:"form",ref:"form",onSubmit:d.submitOrder,class:"pt-5 pt-lg-0"},{default:p(({errors:u})=>[L,S,e("div",$,[a(m,{type:"text",name:"email",placeholder:"請輸入電子郵件",class:_(["px-3 pe-4 py-2 form-control",{"is-invalid":u.email}]),rules:"required|email",modelValue:o.email,"onUpdate:modelValue":t[0]||(t[0]=r=>o.email=r)},null,8,["modelValue","class"]),a(c,{name:"email",class:"invalid-feedback"})]),e("div",A,[a(m,{type:"password",name:"密碼",placeholder:"請輸入密碼",class:_(["px-3 pe-4 py-2 form-control",{"is-invalid":u.密碼}]),rules:d.isPassword,modelValue:o.password,"onUpdate:modelValue":t[1]||(t[1]=r=>o.password=r)},null,8,["rules","modelValue","class"]),a(c,{name:"密碼",class:"invalid-feedback"})]),C]),_:1},8,["onSubmit"]),e("div",H,[a(h,{to:"/"},{default:p(()=>[x("返回註冊會員")]),_:1})])]),M])])}const G=b(k,[["render",q]]);export{G as default};
