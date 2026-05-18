import{c as pt,u as ut,r as p,j as s,H as ft}from"./app-CQ1_vbqs.js";import{A as ht}from"./app-layout-LHuAIqmL.js";import{n as vt}from"./notify-DmDrFEUC.js";import rt from"./CartPanel-DScnYwlw.js";import gt,{SuccessModal as yt}from"./PaymentModal-CmqWFAJ7.js";import bt from"./ProductGrid-Dxd4cfpb.js";import xt from"./PosHistory-KtojChhJ.js";import{f as u}from"./format-tFRIu16p.js";import{S as St}from"./shopping-cart-CsK4JYOg.js";/* empty css            */import"./index-5sTxX_14.js";import"./loader-circle-9xZNEij-.js";import"./createLucideIcon-pz8Nn4uo.js";import"./triangle-alert-BUCAtp-U.js";import"./circle-check-B_iUwjpW.js";import"./button-D9qmntfX.js";import"./clsx-B-dksMZM.js";import"./utils-DlhoCQ_R.js";import"./index-BXY91Wdl.js";import"./index-CMn60toV.js";import"./index-DgIJaDbV.js";import"./x--AJfZdhs.js";import"./app-logo-icon-DaWP87Oe.js";import"./index-U9U3yzbs.js";import"./index-C_SHgnPd.js";import"./permissions-BdcA_Omq.js";import"./wallet-DRcoiPz5.js";import"./log-out-Bie146Rd.js";import"./package-pd8c-on9.js";import"./index-o4Yun898.js";import"./index-W3Mki51v.js";import"./settings-D-6NMM7y.js";import"./products-hCxJfRGA.js";import"./apple-2aylfbaU.js";import"./minus-Bn0tPEch.js";import"./plus-BQuuew4A.js";import"./trash-2-ie5yqA91.js";import"./FormInput-DSqtLOEF.js";import"./FormSelect-Dp1z9Wms.js";import"./index-CRLccQFO.js";import"./index-CF4ibOfn.js";import"./truck-oPEDfrMW.js";import"./circle-check-big-yE1xli0r.js";import"./printer-D2Xu13Ww.js";import"./use-pagination-CSL2e8pd.js";import"./search-Dbwm01M7.js";import"./image-C2Jhy8yv.js";import"./search-input-qJgDIsDc.js";import"./PosDetailModal-CemrncxR.js";import"./PosEditModal-ButBa0-g.js";import"./pen-line-BRRzAC6C.js";const wt=[{title:"Master Barang",href:"/items"}],Pe=()=>{const t=pt.c(51),{productData:d,posData:f,paymentMethods:c}=ut().props;let h;t[0]!==d?(h=d.map(Pt),t[0]=d,t[1]=h):h=t[1];const P=h,[L,at]=p.useState("");let C;t[2]===Symbol.for("react.memo_cache_sentinel")?(C=[],t[2]=C):C=t[2];const[r,v]=p.useState(C),[l,$]=p.useState("Tunai"),[B,k]=p.useState(!1),[E,X]=p.useState(!1);let N;t[3]===Symbol.for("react.memo_cache_sentinel")?(N={total:0,cashReceived:0,change:0,charge:0,globalDiscount:0},t[3]=N):N=t[3];const[m,ct]=p.useState(N),[G,F]=p.useState(!1),[j,Z]=p.useState("pos");let D;t[4]===Symbol.for("react.memo_cache_sentinel")?(D=(i,o)=>{v(n=>n.map(e=>e.product.id===i?{...e,itemDiscount:o}:e))},t[4]=D):D=t[4];const tt=D;let M;t[5]===Symbol.for("react.memo_cache_sentinel")?(M=i=>{let o=!1;v(n=>{const e=n.find(a=>a.product.id===i.id);return e?e.qty>=i.stock?(o=!0,n):n.map(a=>a.product.id===i.id?{...a,qty:a.qty+1}:a):i.stock<=0?(o=!0,n):[...n,{product:i,qty:1,customPrice:null}]}),o&&vt.error("Stok tidak cukup!")},t[5]=M):M=t[5];const lt=M;let R;t[6]===Symbol.for("react.memo_cache_sentinel")?(R=(i,o)=>{v(n=>n.map(e=>{if(e.product.id!==i)return e;const a=e.qty+o;return a<1||a>e.product.stock?e:{...e,qty:a}}))},t[6]=R):R=t[6];const et=R;let z;t[7]===Symbol.for("react.memo_cache_sentinel")?(z=(i,o)=>{v(n=>n.map(e=>e.product.id===i?{...e,qty:o}:e))},t[7]=z):z=t[7];const it=z;let T;t[8]===Symbol.for("react.memo_cache_sentinel")?(T=i=>{v(o=>o.filter(n=>n.product.id!==i))},t[8]=T):T=t[8];const ot=T;let _;t[9]===Symbol.for("react.memo_cache_sentinel")?(_=(i,o)=>{v(n=>n.map(e=>e.product.id===i?{...e,customPrice:o}:e))},t[9]=_):_=t[9];const st=_;let q;t[10]===Symbol.for("react.memo_cache_sentinel")?(q=(i,o,n,e,a)=>{ct({total:e,cashReceived:i,change:o,charge:n,globalDiscount:a}),k(!1),X(!0)},t[10]=q):q=t[10];const dt=q;let A;t[11]===Symbol.for("react.memo_cache_sentinel")?(A=()=>{v([]),X(!1),$("Tunai")},t[11]=A):A=t[11];const nt=A;let Q;t[12]!==r||t[13]!==m||t[14]!==l?(Q=()=>{const i=window.open("","_blank","width=400,height=600"),o=new Date,n=`POS-${o.getFullYear()+String(o.getMonth()+1).padStart(2,"0")+String(o.getDate()).padStart(2,"0")+String(o.getHours()).padStart(2,"0")+String(o.getMinutes()).padStart(2,"0")+String(o.getSeconds()).padStart(2,"0")}`;if(!i)return;const e=r.map(jt).join(""),a=r.reduce(Ct,0),U=m.globalDiscount??0,V=m.charge??0,mt=a+V-U;i.document.write(`
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

                ${U>0?`
                <div class="item">
                    <div>Diskon Global</div>
                    <div>- ${u(U)}</div>
                </div>
                `:""}

                ${V>0?`
                <div class="item">
                    <div>Biaya Antar</div>
                    <div>${u(V)}</div>
                </div>
                `:""}

                <div class="divider"></div>

                <div class="item total">
                    <div>Total</div>
                    <div>${u(mt)}</div>
                </div>

                <div class="item">
                    <div>${l}</div>
                    <div>${u(m.cashReceived)}</div>
                </div>

                <div class="item">
                    <div>Kembali</div>
                    <div>${u(m.change)}</div>
                </div>

                <div class="divider"></div>

                <div class="center" style="font-size: 22px">
                    Terima Kasih 🙏
                </div>
            </div>
        </body>
    </html>
    `),i.document.close(),i.focus(),i.print(),nt()},t[12]=r,t[13]=m,t[14]=l,t[15]=Q):Q=t[15];const W=Q;let I;t[16]===Symbol.for("react.memo_cache_sentinel")?(I=s.jsx(ft,{title:"POS Kasir",children:s.jsx("meta",{name:"robots",content:"noindex"})}),t[16]=I):I=t[16];let K;t[17]===Symbol.for("react.memo_cache_sentinel")?(K=()=>Z("pos"),t[17]=K):K=t[17];const Y=`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${j==="pos"?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground hover:bg-muted/80"}`;let g;t[18]!==Y?(g=s.jsx("button",{type:"button",onClick:K,className:Y,children:"POS"}),t[18]=Y,t[19]=g):g=t[19];let O;t[20]===Symbol.for("react.memo_cache_sentinel")?(O=()=>Z("riwayat"),t[20]=O):O=t[20];const J=`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${j==="riwayat"?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground hover:bg-muted/80"}`;let y;t[21]!==J?(y=s.jsx("button",{type:"button",onClick:O,className:J,children:"Riwayat"}),t[21]=J,t[22]=y):y=t[22];let b;t[23]!==g||t[24]!==y?(b=s.jsxs("div",{className:"flex justify-between items-center mb-4 gap-2",children:[g,y]}),t[23]=g,t[24]=y,t[25]=b):b=t[25];let x;t[26]!==j||t[27]!==r||t[28]!==l||t[29]!==c||t[30]!==f||t[31]!==P||t[32]!==L||t[33]!==G?(x=j==="pos"?s.jsxs("div",{className:"flex md:flex-row flex-col flex-1",children:[s.jsx(bt,{products:P,searchQuery:L,onSearchChange:at,onProductClick:lt}),s.jsx("div",{className:"hidden md:block",children:s.jsx(rt,{cart:r,paymentMethod:l,onPaymentMethodChange:$,paymentMethods:c,onQtyChange:et,onRemove:ot,onCustomPrice:st,onItemDiscount:tt,onQtyInputChange:it,onPay:()=>k(!0)})}),r.length>0&&s.jsxs("button",{onClick:()=>F(!0),className:"fixed bottom-4 right-4 z-50 md:hidden bg-primary text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2",children:[s.jsx(St,{className:"size-4"})," ",r.length]}),G&&s.jsxs("div",{className:"fixed inset-0 z-999 md:hidden",children:[s.jsx("div",{className:"absolute inset-0 bg-black/40",onClick:()=>F(!1)}),s.jsx("div",{className:"absolute bottom-0 left-0 right-0 bg-card rounded-t-xl h-[85vh] overflow-hidden animate-in slide-in-from-bottom",children:s.jsx(rt,{cart:r,paymentMethod:l,onPaymentMethodChange:$,paymentMethods:c,onQtyChange:et,onRemove:ot,onCustomPrice:st,onQtyInputChange:it,onItemDiscount:tt,onPay:()=>{F(!1),k(!0)}})})]})]}):s.jsx(xt,{data:f}),t[26]=j,t[27]=r,t[28]=l,t[29]=c,t[30]=f,t[31]=P,t[32]=L,t[33]=G,t[34]=x):x=t[34];let S;t[35]!==r||t[36]!==l||t[37]!==c||t[38]!==B?(S=B&&s.jsx(gt,{cart:r,paymentMethod:l,onPaymentMethodChange:$,paymentMethods:c,onClose:()=>k(!1),onSuccess:dt}),t[35]=r,t[36]=l,t[37]=c,t[38]=B,t[39]=S):S=t[39];let w;t[40]!==r||t[41]!==W||t[42]!==m||t[43]!==l||t[44]!==E?(w=E&&s.jsx(yt,{total:m.total,cashReceived:m.cashReceived,change:m.change,paymentMethod:l,cart:r,onNewTransaction:nt,onPrintReceipt:W}),t[40]=r,t[41]=W,t[42]=m,t[43]=l,t[44]=E,t[45]=w):w=t[45];let H;return t[46]!==b||t[47]!==x||t[48]!==S||t[49]!==w?(H=s.jsxs(ht,{breadcrumbs:wt,children:[I,s.jsxs("div",{className:"p-4",children:[b,x,S,w]})]}),t[46]=b,t[47]=x,t[48]=S,t[49]=w,t[50]=H):H=t[50],H};function Pt(t){return{id:String(t.id),name:t.name,price:Number(t.price),stock:Number(t.stock),unit:t.unit??"pcs",image:t.image??null,image_url:t.image_url??null}}function jt(t){const d=t.customPrice??t.product.price,f=d*t.qty,c=t.itemDiscount??0,P=Math.max(d-c,0)*t.qty;return`
          <div class="item">
              <div>
                  ${t.product.name} x${t.qty}
              </div>
              <div>
                  ${u(f)}
              </div>
          </div>

          ${c>0?`
              <div class="sub-item discount">
                  <div>diskon item</div>
                  <div>- ${u(c)}</div>
              </div>
            `:""}

          <div class="sub-item final">
              <div>subtotal</div>
              <div>${u(P)}</div>
          </div>
        `}function Ct(t,d){const f=d.customPrice??d.product.price,c=d.itemDiscount??0,h=Math.max(f-c,0);return t+h*d.qty}export{Pe as default};
