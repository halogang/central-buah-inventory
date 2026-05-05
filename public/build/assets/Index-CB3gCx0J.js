import{c as rt,u as at,r as d,j as e,H as nt}from"./app-Coz60QD8.js";import{A as ct}from"./app-layout-DKv6FwfN.js";import{n as lt}from"./notify-DTC7aJX-.js";import tt from"./CartPanel-K8BfZsWh.js";import dt,{SuccessModal as mt}from"./PaymentModal-alyYPVAR.js";import pt from"./ProductGrid-DHz7e1Jj.js";import ut from"./PosHistory-qMB6RY87.js";import{f as S}from"./format-Dvu9qd1M.js";import{S as ft}from"./shopping-cart-CP9Wunn7.js";/* empty css            */import"./index-DyIMis9H.js";import"./loader-circle-fIoVCdyl.js";import"./createLucideIcon-6JRbEcy3.js";import"./triangle-alert-By2vP3Sa.js";import"./circle-check-D_8vwIIC.js";import"./button-vMwZzFMf.js";import"./clsx-B-dksMZM.js";import"./utils-DlhoCQ_R.js";import"./index-C1FlXgmN.js";import"./x-B3jnXAEf.js";import"./app-logo-icon-D6_6_1Lb.js";import"./index-B_e8Ugpt.js";import"./index-CSEUMRIG.js";import"./permissions-DeMblWWa.js";import"./wallet-9z4uqNpk.js";import"./log-out-B7eKoFNo.js";import"./package-BINu7S6Z.js";import"./index-W8iJcmgF.js";import"./index-Cpv9OX7W.js";import"./settings-cWe4yzBa.js";import"./products-hCxJfRGA.js";import"./apple-DiJMVmq1.js";import"./pencil-BHWJ3oOI.js";import"./minus-C2Ccljq6.js";import"./plus-C9hzrSsQ.js";import"./trash-2-C2jHJx3m.js";import"./FormSelect-BNLNmJde.js";import"./index-DHrvUzpa.js";import"./index-BmowKxyF.js";import"./truck-C8StDLe9.js";import"./circle-check-big-DOeFl86J.js";import"./printer-BQyZCEPD.js";import"./use-pagination-DaFxtVdy.js";import"./search-B0KVD03s.js";import"./image-COeP-sow.js";import"./search-input-2njq9x4w.js";import"./PosDetailModal-CerXcWfP.js";import"./PosEditModal-DK0M3lYc.js";import"./pen-line-CpoADewm.js";const ht=[{title:"Master Barang",href:"/items"}],ue=()=>{const t=rt.c(49),{productData:y,posData:w,paymentMethods:m}=at().props;let j;t[0]!==y?(j=y.map(gt),t[0]=y,t[1]=j):j=t[1];const Q=j;console.log("POS Data:",w);const[H,et]=d.useState("");let P;t[2]===Symbol.for("react.memo_cache_sentinel")?(P=[],t[2]=P):P=t[2];const[r,x]=d.useState(P),[n,C]=d.useState("Tunai"),[E,N]=d.useState(!1),[L,Y]=d.useState(!1);let k;t[3]===Symbol.for("react.memo_cache_sentinel")?(k={total:0,cashReceived:0,change:0,charge:0},t[3]=k):k=t[3];const[c,it]=d.useState(k),[B,I]=d.useState(!1),[b,J]=d.useState("pos");let _;t[4]===Symbol.for("react.memo_cache_sentinel")?(_=i=>{let o=!1;x(a=>{const s=a.find(l=>l.product.id===i.id);return s?s.qty>=i.stock?(o=!0,a):a.map(l=>l.product.id===i.id?{...l,qty:l.qty+1}:l):i.stock<=0?(o=!0,a):[...a,{product:i,qty:1,customPrice:null}]}),o&&lt.error("Stok tidak cukup!")},t[4]=_):_=t[4];const ot=_;let $;t[5]===Symbol.for("react.memo_cache_sentinel")?($=(i,o)=>{x(a=>a.map(s=>{if(s.product.id!==i)return s;const l=s.qty+o;return l<1||l>s.product.stock?s:{...s,qty:l}}))},t[5]=$):$=t[5];const U=$;let M;t[6]===Symbol.for("react.memo_cache_sentinel")?(M=i=>{x(o=>o.filter(a=>a.product.id!==i))},t[6]=M):M=t[6];const V=M;let R;t[7]===Symbol.for("react.memo_cache_sentinel")?(R=(i,o)=>{x(a=>a.map(s=>s.product.id===i?{...s,customPrice:o}:s))},t[7]=R):R=t[7];const X=R;let T;t[8]===Symbol.for("react.memo_cache_sentinel")?(T=(i,o,a,s)=>{it({total:s,cashReceived:i,change:o,charge:a}),N(!1),Y(!0)},t[8]=T):T=t[8];const st=T;let z;t[9]===Symbol.for("react.memo_cache_sentinel")?(z=()=>{x([]),Y(!1),C("Tunai")},t[9]=z):z=t[9];const Z=z;let A;t[10]!==r||t[11]!==c||t[12]!==n?(A=()=>{const i=window.open("","_blank","width=400,height=600"),o=new Date,a=`POS-${o.getFullYear()+String(o.getMonth()+1).padStart(2,"0")+String(o.getDate()).padStart(2,"0")+String(o.getHours()).padStart(2,"0")+String(o.getMinutes()).padStart(2,"0")+String(o.getSeconds()).padStart(2,"0")}`;if(!i)return;const s=r.map(vt).join("");i.document.write(`
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
                    <div>${a}</div>
                </div>

                <div class="divider"></div>

                ${s}

                <div class="divider"></div>

                <div class="item">
                    <div>biaya tambahan</div>
                    <div>${S(c.charge)}</div>
                </div>

                <div class="divider"></div>

                <div class="item total">
                    <div>Total</div>
                    <div>${S(c.total)}</div>
                </div>

                <div class="item">
                    <div>${n}</div>
                    <div>${S(c.cashReceived)}</div>
                </div>

                <div class="item">
                    <div>Kembali</div>
                    <div>${S(c.change)}</div>
                </div>

                <div class="divider"></div>

                <div class="center" style="font-size: 22px">
                    Terima Kasih 🙏
                </div>
            </div>
        </body>
    </html>
    `),i.document.close(),i.focus(),i.print(),Z()},t[10]=r,t[11]=c,t[12]=n,t[13]=A):A=t[13];const F=A;let q;t[14]===Symbol.for("react.memo_cache_sentinel")?(q=e.jsx(nt,{title:"POS Kasir",children:e.jsx("meta",{name:"robots",content:"noindex"})}),t[14]=q):q=t[14];let D;t[15]===Symbol.for("react.memo_cache_sentinel")?(D=()=>J("pos"),t[15]=D):D=t[15];const G=`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${b==="pos"?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground hover:bg-muted/80"}`;let p;t[16]!==G?(p=e.jsx("button",{type:"button",onClick:D,className:G,children:"POS"}),t[16]=G,t[17]=p):p=t[17];let K;t[18]===Symbol.for("react.memo_cache_sentinel")?(K=()=>J("riwayat"),t[18]=K):K=t[18];const W=`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${b==="riwayat"?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground hover:bg-muted/80"}`;let u;t[19]!==W?(u=e.jsx("button",{type:"button",onClick:K,className:W,children:"Riwayat"}),t[19]=W,t[20]=u):u=t[20];let f;t[21]!==p||t[22]!==u?(f=e.jsxs("div",{className:"flex justify-between items-center mb-4 gap-2",children:[p,u]}),t[21]=p,t[22]=u,t[23]=f):f=t[23];let h;t[24]!==b||t[25]!==r||t[26]!==n||t[27]!==m||t[28]!==w||t[29]!==Q||t[30]!==H||t[31]!==B?(h=b==="pos"?e.jsxs("div",{className:"flex md:flex-row flex-col flex-1",children:[e.jsx(pt,{products:Q,searchQuery:H,onSearchChange:et,onProductClick:ot}),e.jsx("div",{className:"hidden md:block",children:e.jsx(tt,{cart:r,paymentMethod:n,onPaymentMethodChange:C,paymentMethods:m,onQtyChange:U,onRemove:V,onCustomPrice:X,onPay:()=>N(!0)})}),r.length>0&&e.jsxs("button",{onClick:()=>I(!0),className:"fixed bottom-4 right-4 z-50 md:hidden bg-primary text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2",children:[e.jsx(ft,{className:"size-4"})," ",r.length]}),B&&e.jsxs("div",{className:"fixed inset-0 z-999 md:hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-black/40",onClick:()=>I(!1)}),e.jsx("div",{className:"absolute bottom-0 left-0 right-0 bg-card rounded-t-xl h-[85vh] overflow-hidden animate-in slide-in-from-bottom",children:e.jsx(tt,{cart:r,paymentMethod:n,onPaymentMethodChange:C,paymentMethods:m,onQtyChange:U,onRemove:V,onCustomPrice:X,onPay:()=>{I(!1),N(!0)}})})]})]}):e.jsx(ut,{data:w}),t[24]=b,t[25]=r,t[26]=n,t[27]=m,t[28]=w,t[29]=Q,t[30]=H,t[31]=B,t[32]=h):h=t[32];let g;t[33]!==r||t[34]!==n||t[35]!==m||t[36]!==E?(g=E&&e.jsx(dt,{cart:r,paymentMethod:n,onPaymentMethodChange:C,paymentMethods:m,onClose:()=>N(!1),onSuccess:st}),t[33]=r,t[34]=n,t[35]=m,t[36]=E,t[37]=g):g=t[37];let v;t[38]!==r||t[39]!==F||t[40]!==c||t[41]!==n||t[42]!==L?(v=L&&e.jsx(mt,{total:c.total,cashReceived:c.cashReceived,change:c.change,paymentMethod:n,cart:r,onNewTransaction:Z,onPrintReceipt:F}),t[38]=r,t[39]=F,t[40]=c,t[41]=n,t[42]=L,t[43]=v):v=t[43];let O;return t[44]!==f||t[45]!==h||t[46]!==g||t[47]!==v?(O=e.jsxs(ct,{breadcrumbs:ht,children:[q,e.jsxs("div",{className:"p-4",children:[f,h,g,v]})]}),t[44]=f,t[45]=h,t[46]=g,t[47]=v,t[48]=O):O=t[48],O};function gt(t){return{id:String(t.id),name:t.name,price:Number(t.price),stock:Number(t.stock),unit:t.unit??"pcs",image:t.image??null,image_url:t.image_url??null}}function vt(t){const y=t.customPrice??t.product.price;return`
          <div class="item">
            <div>${t.product.name} x${t.qty}</div>
            <div>${S(y*t.qty)}</div>
          </div>
        `}export{ue as default};
