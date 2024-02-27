import{B as f}from"./BackNavbar-3e69c544.js";import{_,a as u,m as A,r as g,o as n,c as o,d as v,b as s,F as p,h as m,i as I,g as c,v as R,t as k,j as h}from"./index-c8342854.js";import{u as x}from"./AdminLoginStore-7490e017.js";const N={data(){return{restaurants:[],inputAddItem:{addBrandName:"",addType:"",addAddress:""},resTypeList:["學生族群","小資族群","精緻族群","頂級族群"],submitShow:!1,isSorting:!1,ascending:!0,apiResUrl:""}},components:{BackNavbar:f},methods:{pocket(){u.get(this.apiResUrl).then(t=>{this.restaurants=t.data,this.restaurants.forEach(e=>{e.addRowDisabled=!0})}).catch(t=>{console.log(t)})},addResItem(){this.restaurants.some(e=>e.brandName==="")?alert("已有空白列供填寫，請輸入完畢後再新增!"):(this.restaurants.push({type:"",brandName:"",address:"",addRowDisabled:!1}),this.submitShow=!0)},toggleSorting(){this.ascending?(this.ascending=!this.ascending,this.isSorting=!0):this.ascending=!0},resetTable(){this.inputAddItem.addBrandName="",this.inputAddItem.addType="",this.inputAddItem.addAddress=""},submitAddRes(){event.preventDefault(),this.inputAddItem.addType!==""&this.inputAddItem.addBrandName!==""&this.inputAddItem.addAddress!==""?u.get(this.apiResUrl).then(t=>{const e=t.data,r=e.length;e.some(a=>a.brandName===this.inputAddItem.addBrandName)?alert("該餐廳已存在!"):(u.post(this.apiResUrl,{type:this.inputAddItem.addType,brandName:this.inputAddItem.addBrandName,address:this.inputAddItem.addAddress,mapUrl:"",id:(r+1).toString()}),alert("餐廳新增成功"),this.submitShow=!1,this.pocket())}).catch(t=>{console.log(t),alert("餐廳新增失敗!")}).finally(()=>{this.resetTable()}):alert("欄位不可空值!")}},created(){this.apiResUrl="http://localhost:3001/restaurants"},mounted(){this.pocket()},computed:{...A(x,{userName:t=>t.name,userEmail:t=>t.email,userId:t=>t.id}),orderByList(){const t=[...this.restaurants];return t.sort((e,r)=>this.ascending?e.type.localeCompare(r.type):r.type.localeCompare(e.type)),t}}},B={class:"container"},w={class:"mb-4 admminRes"},D={class:"d-flex justify-content-end mb-4"},S={class:"table table-bordered table-hover mb-4"},T=s("thead",null,[s("tr",null,[s("th",{scope:"col",class:"table-secondary"},"品牌受眾"),s("th",{scope:"col",class:"table-secondary"},"品牌名稱"),s("th",{scope:"col",class:"table-secondary"},"地址")])],-1),U=["value"],L=["disabled"],C=s("option",{value:"",disabled:"",selected:""},"請選擇品牌受眾",-1),V=["value"],j=["value"],E=["disabled"],F=["value"],M=["disabled"],q={key:0,class:"d-flex justify-content-end"};function z(t,e,r,b,a,i){const y=g("BackNavbar");return n(),o("div",B,[v(y),s("section",w,[s("div",D,[s("button",{type:"button",class:"btn btn-primary me-4",onClick:e[0]||(e[0]=(...d)=>i.addResItem&&i.addResItem(...d))}," 新增餐廳 ")]),s("table",S,[T,s("tbody",null,[(n(!0),o(p,null,m(a.isSorting?i.orderByList:a.restaurants,d=>(n(),o("tr",{key:d},[s("td",null,[d.addRowDisabled?(n(),o("input",{key:0,type:"text",readonly:"",class:"form-control-plaintext",value:d.type},null,8,U)):c((n(),o("select",{key:1,name:"品牌受眾",id:"type",class:"form-select",disabled:d.addRowDisabled,"onUpdate:modelValue":e[1]||(e[1]=l=>a.inputAddItem.addType=l)},[C,(n(!0),o(p,null,m(a.resTypeList,l=>(n(),o("option",{value:l,key:l},k(l),9,V))),128))],8,L)),[[R,a.inputAddItem.addType]])]),s("td",null,[d.addRowDisabled?(n(),o("input",{key:0,type:"text",readonly:"",class:"form-control-plaintext",value:d.brandName},null,8,j)):c((n(),o("input",{key:1,class:"form-control",type:"text",disabled:d.addRowDisabled,placeholder:"請輸入品牌名稱","onUpdate:modelValue":e[2]||(e[2]=l=>a.inputAddItem.addBrandName=l)},null,8,E)),[[h,a.inputAddItem.addBrandName]])]),s("td",null,[d.addRowDisabled?(n(),o("input",{key:0,type:"text",readonly:"",class:"form-control-plaintext",value:d.address},null,8,F)):c((n(),o("input",{key:1,class:"form-control",type:"text",disabled:d.addRowDisabled,placeholder:"請輸入餐廳地址","onUpdate:modelValue":e[3]||(e[3]=l=>a.inputAddItem.addAddress=l)},null,8,M)),[[h,a.inputAddItem.addAddress]])])]))),128))])]),a.submitShow?(n(),o("div",q,[s("button",{class:"btn btn-lg btn-secondary",type:"submit",onClick:e[4]||(e[4]=d=>i.submitAddRes())}," 送出 ")])):I("",!0)])])}const K=_(N,[["render",z]]);export{K as default};
