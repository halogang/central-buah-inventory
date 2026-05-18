import{c as mt,u as pt,r as p,j as s,H as ut}from"./app-CE9Ajaqv.js";import{A as ft}from"./app-layout-fabD1pDx.js";import{n as ht}from"./notify-n7u82CbE.js";import nt from"./CartPanel-BtsJMvKf.js";import vt,{SuccessModal as gt}from"./PaymentModal-BGMeVj9K.js";import yt from"./ProductGrid-EEFMNZmC.js";import xt from"./PosHistory-jrsKNtvP.js";import{f as v}from"./format-tFRIu16p.js";import{S as bt}from"./shopping-cart-RSk6QMfE.js";/* empty css            */import"./index-tt6x7LVB.js";import"./loader-circle-O_v6E9Ze.js";import"./createLucideIcon-RcChT0mK.js";import"./triangle-alert-bw3rYrUl.js";import"./circle-check-3YegzvKA.js";import"./button-CKsL-rX_.js";import"./clsx-B-dksMZM.js";import"./utils-DlhoCQ_R.js";import"./index-93q2OTDv.js";import"./index-DIGZqT8U.js";import"./index-BSa7Z4Ve.js";import"./x-BJURSguh.js";import"./app-logo-icon-BMFEvRz5.js";import"./index-U9U3yzbs.js";import"./index-C_SHgnPd.js";import"./permissions-qghvZvUB.js";import"./wallet-DZ8ygO8t.js";import"./log-out-Cn2KXsqK.js";import"./package-Cl26Se5Q.js";import"./index-SVmzJoUO.js";import"./index-CpKGIBls.js";import"./settings-C4O5eDLM.js";import"./products-hCxJfRGA.js";import"./apple-DnjHkBU7.js";import"./minus-nyvtbQMX.js";import"./plus-Ds_HLu04.js";import"./trash-2-DB04kAyb.js";import"./FormSelect-iQgcf69t.js";import"./index-Db5g81xy.js";import"./index-CF4ibOfn.js";import"./truck-Dkre8JuE.js";import"./circle-check-big-Bcmycipe.js";import"./printer-CNMYgGA7.js";import"./use-pagination-CMZeIUhL.js";import"./search-T6X412Oi.js";import"./image-fBMAovRL.js";import"./search-input-DXIUpZN_.js";import"./PosDetailModal-Ciut6Lvg.js";import"./PosEditModal-DX543UeW.js";import"./pen-line-3IqAXHRO.js";const St=[{title:"Master Barang",href:"/items"}],Se=()=>{const t=mt.c(51),{productData:d,posData:u,paymentMethods:a}=pt().props;let f;t[0]!==d?(f=d.map(wt),t[0]=d,t[1]=f):f=t[1];const P=f,[L,rt]=p.useState("");let C;t[2]===Symbol.for("react.memo_cache_sentinel")?(C=[],t[2]=C):C=t[2];const[r,h]=p.useState(C),[c,N]=p.useState("Tunai"),[B,k]=p.useState(!1),[E,V]=p.useState(!1);let $;t[3]===Symbol.for("react.memo_cache_sentinel")?($={total:0,cashReceived:0,change:0,charge:0},t[3]=$):$=t[3];const[m,at]=p.useState($),[F,G]=p.useState(!1),[j,X]=p.useState("pos");let M;t[4]===Symbol.for("react.memo_cache_sentinel")?(M=(i,o)=>{h(n=>n.map(e=>e.product.id===i?{...e,itemDiscount:o}:e))},t[4]=M):M=t[4];const Z=M;let D;t[5]===Symbol.for("react.memo_cache_sentinel")?(D=i=>{let o=!1;h(n=>{const e=n.find(l=>l.product.id===i.id);return e?e.qty>=i.stock?(o=!0,n):n.map(l=>l.product.id===i.id?{...l,qty:l.qty+1}:l):i.stock<=0?(o=!0,n):[...n,{product:i,qty:1,customPrice:null}]}),o&&ht.error("Stok tidak cukup!")},t[5]=D):D=t[5];const ct=D;let R;t[6]===Symbol.for("react.memo_cache_sentinel")?(R=(i,o)=>{h(n=>n.map(e=>{if(e.product.id!==i)return e;const l=e.qty+o;return l<1||l>e.product.stock?e:{...e,qty:l}}))},t[6]=R):R=t[6];const tt=R;let z;t[7]===Symbol.for("react.memo_cache_sentinel")?(z=(i,o)=>{h(n=>n.map(e=>e.product.id===i?{...e,qty:o}:e))},t[7]=z):z=t[7];const et=z;let T;t[8]===Symbol.for("react.memo_cache_sentinel")?(T=i=>{h(o=>o.filter(n=>n.product.id!==i))},t[8]=T):T=t[8];const it=T;let q;t[9]===Symbol.for("react.memo_cache_sentinel")?(q=(i,o)=>{h(n=>n.map(e=>e.product.id===i?{...e,customPrice:o}:e))},t[9]=q):q=t[9];const ot=q;let A;t[10]===Symbol.for("react.memo_cache_sentinel")?(A=(i,o,n,e)=>{at({total:e,cashReceived:i,change:o,charge:n}),k(!1),V(!0)},t[10]=A):A=t[10];const lt=A;let Q;t[11]===Symbol.for("react.memo_cache_sentinel")?(Q=()=>{h([]),V(!1),N("Tunai")},t[11]=Q):Q=t[11];const st=Q;let _;t[12]!==r||t[13]!==m||t[14]!==c?(_=()=>{const i=window.open("","_blank","width=400,height=600"),o=new Date,n=`POS-${o.getFullYear()+String(o.getMonth()+1).padStart(2,"0")+String(o.getDate()).padStart(2,"0")+String(o.getHours()).padStart(2,"0")+String(o.getMinutes()).padStart(2,"0")+String(o.getSeconds()).padStart(2,"0")}`;if(!i)return;const e=r.map(Pt).join(""),l=r.reduce(jt,0),U=m.charge??0,dt=l+U;i.document.write(`
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
                    <div>Biaya Antar</div>
                    <div>${v(U)}</div>
                </div>
                `:""}

                <div class="divider"></div>

                <div class="item total">
                    <div>Total</div>
                    <div>${v(dt)}</div>
                </div>

                <div class="item">
                    <div>${c}</div>
                    <div>${v(m.cashReceived)}</div>
                </div>

                <div class="item">
                    <div>Kembali</div>
                    <div>${v(m.change)}</div>
                </div>

                <div class="divider"></div>

                <div class="center" style="font-size: 22px">
                    Terima Kasih 🙏
                </div>
            </div>
        </body>
    </html>
    `),i.document.close(),i.focus(),i.print(),st()},t[12]=r,t[13]=m,t[14]=c,t[15]=_):_=t[15];const W=_;let I;t[16]===Symbol.for("react.memo_cache_sentinel")?(I=s.jsx(ut,{title:"POS Kasir",children:s.jsx("meta",{name:"robots",content:"noindex"})}),t[16]=I):I=t[16];let K;t[17]===Symbol.for("react.memo_cache_sentinel")?(K=()=>X("pos"),t[17]=K):K=t[17];const Y=`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${j==="pos"?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground hover:bg-muted/80"}`;let g;t[18]!==Y?(g=s.jsx("button",{type:"button",onClick:K,className:Y,children:"POS"}),t[18]=Y,t[19]=g):g=t[19];let O;t[20]===Symbol.for("react.memo_cache_sentinel")?(O=()=>X("riwayat"),t[20]=O):O=t[20];const J=`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${j==="riwayat"?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground hover:bg-muted/80"}`;let y;t[21]!==J?(y=s.jsx("button",{type:"button",onClick:O,className:J,children:"Riwayat"}),t[21]=J,t[22]=y):y=t[22];let x;t[23]!==g||t[24]!==y?(x=s.jsxs("div",{className:"flex justify-between items-center mb-4 gap-2",children:[g,y]}),t[23]=g,t[24]=y,t[25]=x):x=t[25];let b;t[26]!==j||t[27]!==r||t[28]!==c||t[29]!==a||t[30]!==u||t[31]!==P||t[32]!==L||t[33]!==F?(b=j==="pos"?s.jsxs("div",{className:"flex md:flex-row flex-col flex-1",children:[s.jsx(yt,{products:P,searchQuery:L,onSearchChange:rt,onProductClick:ct}),s.jsx("div",{className:"hidden md:block",children:s.jsx(nt,{cart:r,paymentMethod:c,onPaymentMethodChange:N,paymentMethods:a,onQtyChange:tt,onRemove:it,onCustomPrice:ot,onItemDiscount:Z,onQtyInputChange:et,onPay:()=>k(!0)})}),r.length>0&&s.jsxs("button",{onClick:()=>G(!0),className:"fixed bottom-4 right-4 z-50 md:hidden bg-primary text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2",children:[s.jsx(bt,{className:"size-4"})," ",r.length]}),F&&s.jsxs("div",{className:"fixed inset-0 z-999 md:hidden",children:[s.jsx("div",{className:"absolute inset-0 bg-black/40",onClick:()=>G(!1)}),s.jsx("div",{className:"absolute bottom-0 left-0 right-0 bg-card rounded-t-xl h-[85vh] overflow-hidden animate-in slide-in-from-bottom",children:s.jsx(nt,{cart:r,paymentMethod:c,onPaymentMethodChange:N,paymentMethods:a,onQtyChange:tt,onRemove:it,onCustomPrice:ot,onQtyInputChange:et,onItemDiscount:Z,onPay:()=>{G(!1),k(!0)}})})]})]}):s.jsx(xt,{data:u}),t[26]=j,t[27]=r,t[28]=c,t[29]=a,t[30]=u,t[31]=P,t[32]=L,t[33]=F,t[34]=b):b=t[34];let S;t[35]!==r||t[36]!==c||t[37]!==a||t[38]!==B?(S=B&&s.jsx(vt,{cart:r,paymentMethod:c,onPaymentMethodChange:N,paymentMethods:a,onClose:()=>k(!1),onSuccess:lt}),t[35]=r,t[36]=c,t[37]=a,t[38]=B,t[39]=S):S=t[39];let w;t[40]!==r||t[41]!==W||t[42]!==m||t[43]!==c||t[44]!==E?(w=E&&s.jsx(gt,{total:m.total,cashReceived:m.cashReceived,change:m.change,paymentMethod:c,cart:r,onNewTransaction:st,onPrintReceipt:W}),t[40]=r,t[41]=W,t[42]=m,t[43]=c,t[44]=E,t[45]=w):w=t[45];let H;return t[46]!==x||t[47]!==b||t[48]!==S||t[49]!==w?(H=s.jsxs(ft,{breadcrumbs:St,children:[I,s.jsxs("div",{className:"p-4",children:[x,b,S,w]})]}),t[46]=x,t[47]=b,t[48]=S,t[49]=w,t[50]=H):H=t[50],H};function wt(t){return{id:String(t.id),name:t.name,price:Number(t.price),stock:Number(t.stock),unit:t.unit??"pcs",image:t.image??null,image_url:t.image_url??null}}function Pt(t){const d=t.customPrice??t.product.price,u=d*t.qty,a=t.itemDiscount??0,P=Math.max(d-a,0)*t.qty;return`
          <div class="item">
              <div>
                  ${t.product.name} x${t.qty}
              </div>
              <div>
                  ${v(u)}
              </div>
          </div>

          ${a>0?`
              <div class="sub-item discount">
                  <div>diskon item</div>
                  <div>- ${v(a)}</div>
              </div>
            `:""}

          <div class="sub-item final">
              <div>subtotal</div>
              <div>${v(P)}</div>
          </div>
        `}function jt(t,d){const u=d.customPrice??d.product.price,a=d.itemDiscount??0,f=Math.max(u-a,0);return t+f*d.qty}export{Se as default};
