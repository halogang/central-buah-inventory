import{c as dt,u as mt,r as u,j as s,H as pt}from"./app-CBzJweMe.js";import{A as ut}from"./app-layout-DlL8VaVt.js";import{n as ft}from"./notify-C81fV7WD.js";import st from"./CartPanel-NB3CJGYR.js";import vt,{SuccessModal as ht}from"./PaymentModal-C1FMEIdN.js";import gt from"./ProductGrid-CA50irt7.js";import yt from"./PosHistory-CisKoiHB.js";import{f}from"./format-Dvu9qd1M.js";import{S as bt}from"./shopping-cart-e0LxG_1T.js";/* empty css            */import"./index-MzWCXf6f.js";import"./loader-circle-D8Y9vXMK.js";import"./createLucideIcon-4lsoGcEL.js";import"./triangle-alert-CduyufgK.js";import"./circle-check-CZ8vfbNc.js";import"./button-D1kyFcZy.js";import"./clsx-B-dksMZM.js";import"./utils-DlhoCQ_R.js";import"./index-D_lwPfJX.js";import"./index-BWrZJpt4.js";import"./index-BeDl6hgD.js";import"./x-8MJ7UbMQ.js";import"./app-logo-icon-DxcSvgAW.js";import"./index-U9U3yzbs.js";import"./index-C_SHgnPd.js";import"./permissions-Ddek2DGv.js";import"./wallet--vThsiiZ.js";import"./log-out-ChKZoU8s.js";import"./package-D_ARbnR4.js";import"./index-BefEXUNx.js";import"./index-C4D5cDxz.js";import"./settings-5BDaB2Ci.js";import"./products-hCxJfRGA.js";import"./apple-DCbb3WU2.js";import"./minus-eUw_IYwd.js";import"./plus-CpScxb39.js";import"./trash-2-ZOhPGKkp.js";import"./FormInput-Bjd1WxiL.js";import"./FormSelect-DgJZJLo9.js";import"./index-DN4BK2ee.js";import"./index-CF4ibOfn.js";import"./truck-CZg6UKjE.js";import"./circle-check-big-xqa8coli.js";import"./printer-1aJTBxdx.js";import"./use-pagination-ChV3yVQ9.js";import"./search-z2LKM9Tk.js";import"./image-D2huVH8-.js";import"./search-input-Cn8iervz.js";import"./PosDetailModal-BiiZdwel.js";import"./PosEditModal-BdL6BzL6.js";import"./pen-line-DHUymh99.js";const xt=[{title:"Master Barang",href:"/items"}],Se=()=>{const t=dt.c(50),{productData:m,posData:p,paymentMethods:l}=mt().props;let v;t[0]!==m?(v=m.map(St),t[0]=m,t[1]=v):v=t[1];const Q=v,[H,nt]=u.useState("");let P;t[2]===Symbol.for("react.memo_cache_sentinel")?(P=[],t[2]=P):P=t[2];const[r,h]=u.useState(P),[c,C]=u.useState("Tunai"),[L,$]=u.useState(!1),[B,V]=u.useState(!1);let k;t[3]===Symbol.for("react.memo_cache_sentinel")?(k={total:0,cashReceived:0,change:0,charge:0,globalDiscount:0},t[3]=k):k=t[3];const[d,rt]=u.useState(k),[E,G]=u.useState(!1),[j,X]=u.useState("pos");let N;t[4]===Symbol.for("react.memo_cache_sentinel")?(N=(i,o)=>{h(n=>n.map(e=>e.product.id===i?{...e,itemDiscount:o}:e))},t[4]=N):N=t[4];const Z=N;let D;t[5]===Symbol.for("react.memo_cache_sentinel")?(D=i=>{let o=!1;h(n=>{const e=n.find(a=>a.product.id===i.id);return e?e.qty>=i.stock?(o=!0,n):n.map(a=>a.product.id===i.id?{...a,qty:a.qty+1}:a):i.stock<=0?(o=!0,n):[...n,{product:i,qty:1,customPrice:null}]}),o&&ft.error("Stok tidak cukup!")},t[5]=D):D=t[5];const at=D;let M;t[6]===Symbol.for("react.memo_cache_sentinel")?(M=(i,o)=>{h(n=>n.map(e=>{if(e.product.id!==i)return e;const a=e.qty+o;return a<1||a>e.product.stock?e:{...e,qty:a}}))},t[6]=M):M=t[6];const tt=M;let R;t[7]===Symbol.for("react.memo_cache_sentinel")?(R=i=>{h(o=>o.filter(n=>n.product.id!==i))},t[7]=R):R=t[7];const et=R;let _;t[8]===Symbol.for("react.memo_cache_sentinel")?(_=(i,o)=>{h(n=>n.map(e=>e.product.id===i?{...e,customPrice:o}:e))},t[8]=_):_=t[8];const it=_;let z;t[9]===Symbol.for("react.memo_cache_sentinel")?(z=(i,o,n,e,a)=>{rt({total:e,cashReceived:i,change:o,charge:n,globalDiscount:a}),$(!1),V(!0)},t[9]=z):z=t[9];const ct=z;let T;t[10]===Symbol.for("react.memo_cache_sentinel")?(T=()=>{h([]),V(!1),C("Tunai")},t[10]=T):T=t[10];const ot=T;let A;t[11]!==r||t[12]!==d||t[13]!==c?(A=()=>{const i=window.open("","_blank","width=400,height=600"),o=new Date,n=`POS-${o.getFullYear()+String(o.getMonth()+1).padStart(2,"0")+String(o.getDate()).padStart(2,"0")+String(o.getHours()).padStart(2,"0")+String(o.getMinutes()).padStart(2,"0")+String(o.getSeconds()).padStart(2,"0")}`;if(!i)return;const e=r.map(wt).join(""),a=r.reduce(jt,0),J=d.globalDiscount??0,U=d.charge??0,lt=a-J+U;i.document.write(`
      <html>
        <head>
            <title>Struk</title>
            <style>
              @media print {
                  @page {
                      size: A4;
                      margin: 0;
                  }

                  body {
                      margin: 0;
                      padding: 0;
                  }
              }

              body {
                  font-family: monospace;
                  background: white;
              }

              .sub-item {
                  display:flex;
                  justify-content:space-between;
                  font-size:30px;
                  margin:4px 0 4px 30px;
              }

              .discount {
                  color:red;
              }

              .final {
                  font-weight:bold;
              }

              .container {
                  padding: 50px 30px;
                  margin: 0 auto;   /* 🔥 center di A4 */
              }

              .center {
                  text-align: center;
              }

              .logo img {
                  width: 132px; /* 🔥 BESARKAN LOGO */
              }

              .title {
                  font-size: 50px;
                  font-weight: bold;
              }

              .subtitle {
                  font-size: 44px;
              }

              .divider {
                  border-top: 2px dashed #000;
                  margin: 10px 0;
              }

              .item {
                  display: flex;
                  justify-content: space-between;
                  font-size: 38px; /* 🔥 NAIKKAN */
                  margin: 6px 0;
              }

              .total {
                  font-weight: bold;
                  font-size: 40px;
              }

              .meta {
                  font-size: 38px;
                  margin-top: 20px;
                  display: flex;
                  justify-content: space-between;
              }
          </style>
        </head>

        <body class="container">
            <div class="container">
                <div class="center">
                    <div class="logo">
                        <img src="/small_logo.jpg" />
                    </div>
                    <div class="title">Central Buah</div>
                    <div class="subtitle">POS Kasir</div>
                </div>

                <div class="meta">
                    <div>${new Date().toLocaleString("id-ID")}</div>
                    <div>${n}</div>
                </div>

                <div class="divider"></div>

                ${e}

                <div class="divider"></div>

                ${J>0?`
                <div class="item">
                    <div>Diskon Global</div>
                    <div>- ${f(J)}</div>
                </div>
                `:""}

                ${U>0?`
                <div class="item">
                    <div>Biaya Antar</div>
                    <div>${f(U)}</div>
                </div>
                `:""}

                <div class="divider"></div>

                <div class="item total">
                    <div>Total</div>
                    <div>${f(lt)}</div>
                </div>

                <div class="item">
                    <div>${c}</div>
                    <div>${f(d.cashReceived)}</div>
                </div>

                <div class="item">
                    <div>Kembali</div>
                    <div>${f(d.change)}</div>
                </div>

                <div class="divider"></div>

                <div class="center" style="font-size: 22px">
                    Terima Kasih 🙏
                </div>
            </div>
        </body>
    </html>
    `),i.document.close(),i.focus(),i.print(),ot()},t[11]=r,t[12]=d,t[13]=c,t[14]=A):A=t[14];const F=A;let q;t[15]===Symbol.for("react.memo_cache_sentinel")?(q=s.jsx(pt,{title:"POS Kasir",children:s.jsx("meta",{name:"robots",content:"noindex"})}),t[15]=q):q=t[15];let K;t[16]===Symbol.for("react.memo_cache_sentinel")?(K=()=>X("pos"),t[16]=K):K=t[16];const W=`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${j==="pos"?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground hover:bg-muted/80"}`;let g;t[17]!==W?(g=s.jsx("button",{type:"button",onClick:K,className:W,children:"POS"}),t[17]=W,t[18]=g):g=t[18];let I;t[19]===Symbol.for("react.memo_cache_sentinel")?(I=()=>X("riwayat"),t[19]=I):I=t[19];const Y=`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${j==="riwayat"?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground hover:bg-muted/80"}`;let y;t[20]!==Y?(y=s.jsx("button",{type:"button",onClick:I,className:Y,children:"Riwayat"}),t[20]=Y,t[21]=y):y=t[21];let b;t[22]!==g||t[23]!==y?(b=s.jsxs("div",{className:"flex justify-between items-center mb-4 gap-2",children:[g,y]}),t[22]=g,t[23]=y,t[24]=b):b=t[24];let x;t[25]!==j||t[26]!==r||t[27]!==c||t[28]!==l||t[29]!==p||t[30]!==Q||t[31]!==H||t[32]!==E?(x=j==="pos"?s.jsxs("div",{className:"flex md:flex-row flex-col flex-1",children:[s.jsx(gt,{products:Q,searchQuery:H,onSearchChange:nt,onProductClick:at}),s.jsx("div",{className:"hidden md:block",children:s.jsx(st,{cart:r,paymentMethod:c,onPaymentMethodChange:C,paymentMethods:l,onQtyChange:tt,onRemove:et,onCustomPrice:it,onItemDiscount:Z,onPay:()=>$(!0)})}),r.length>0&&s.jsxs("button",{onClick:()=>G(!0),className:"fixed bottom-4 right-4 z-50 md:hidden bg-primary text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2",children:[s.jsx(bt,{className:"size-4"})," ",r.length]}),E&&s.jsxs("div",{className:"fixed inset-0 z-999 md:hidden",children:[s.jsx("div",{className:"absolute inset-0 bg-black/40",onClick:()=>G(!1)}),s.jsx("div",{className:"absolute bottom-0 left-0 right-0 bg-card rounded-t-xl h-[85vh] overflow-hidden animate-in slide-in-from-bottom",children:s.jsx(st,{cart:r,paymentMethod:c,onPaymentMethodChange:C,paymentMethods:l,onQtyChange:tt,onRemove:et,onCustomPrice:it,onItemDiscount:Z,onPay:()=>{G(!1),$(!0)}})})]})]}):s.jsx(yt,{data:p}),t[25]=j,t[26]=r,t[27]=c,t[28]=l,t[29]=p,t[30]=Q,t[31]=H,t[32]=E,t[33]=x):x=t[33];let S;t[34]!==r||t[35]!==c||t[36]!==l||t[37]!==L?(S=L&&s.jsx(vt,{cart:r,paymentMethod:c,onPaymentMethodChange:C,paymentMethods:l,onClose:()=>$(!1),onSuccess:ct}),t[34]=r,t[35]=c,t[36]=l,t[37]=L,t[38]=S):S=t[38];let w;t[39]!==r||t[40]!==F||t[41]!==d||t[42]!==c||t[43]!==B?(w=B&&s.jsx(ht,{total:d.total,cashReceived:d.cashReceived,change:d.change,paymentMethod:c,cart:r,onNewTransaction:ot,onPrintReceipt:F}),t[39]=r,t[40]=F,t[41]=d,t[42]=c,t[43]=B,t[44]=w):w=t[44];let O;return t[45]!==b||t[46]!==x||t[47]!==S||t[48]!==w?(O=s.jsxs(ut,{breadcrumbs:xt,children:[q,s.jsxs("div",{className:"p-4",children:[b,x,S,w]})]}),t[45]=b,t[46]=x,t[47]=S,t[48]=w,t[49]=O):O=t[49],O};function St(t){return{id:String(t.id),name:t.name,price:Number(t.price),stock:Number(t.stock),unit:t.unit??"pcs",image:t.image??null,image_url:t.image_url??null}}function wt(t){const p=(t.customPrice??t.product.price)*t.qty,l=t.itemDiscount??0,v=p-l;return`
          <div class="item">
              <div>
                  ${t.product.name} x${t.qty}
              </div>
              <div>
                  ${f(p)}
              </div>
          </div>

          ${l>0?`
              <div class="sub-item discount">
                  <div>diskon item</div>
                  <div>- ${f(l)}</div>
              </div>
            `:""}

          <div class="sub-item final">
              <div>subtotal</div>
              <div>${f(v)}</div>
          </div>
        `}function jt(t,m){const p=m.customPrice??m.product.price;return t+p*m.qty-(m.itemDiscount??0)}export{Se as default};
