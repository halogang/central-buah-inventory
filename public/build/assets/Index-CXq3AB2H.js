import{c as st,u as rt,r as d,j as e,H as at}from"./app-BDNA3yLJ.js";import{A as nt}from"./app-layout-C3hkXKJC.js";import{n as ct}from"./notify-Dp19E9EI.js";import Z from"./CartPanel-BiLMPokg.js";import lt,{SuccessModal as dt}from"./PaymentModal-CfGwVRTA.js";import mt from"./ProductGrid-yl18rYwK.js";import pt from"./PosHistory-DWBVBLM3.js";import{f as K}from"./format-Dvu9qd1M.js";import{S as ut}from"./shopping-cart-Bmdaa9ii.js";/* empty css            */import"./index-CD9BmIWb.js";import"./loader-circle-DikUDwWP.js";import"./createLucideIcon-CRq9MwXQ.js";import"./triangle-alert-BPE52Sq1.js";import"./circle-check-l5Mcak3O.js";import"./button-BQzBGYaB.js";import"./clsx-B-dksMZM.js";import"./utils-DlhoCQ_R.js";import"./index-BMe0eVFT.js";import"./x-DIKLiVei.js";import"./app-logo-icon-C_HYe7j7.js";import"./index-B_e8Ugpt.js";import"./index-CSEUMRIG.js";import"./permissions-zf2B2ceY.js";import"./wallet-BrrMTYMb.js";import"./log-out-DOo6sw_w.js";import"./package-C-_KAa8u.js";import"./index-rKUpzq0i.js";import"./index-D5sbEzIj.js";import"./settings-C-bvtmLs.js";import"./products-hCxJfRGA.js";import"./apple-Bgi48vam.js";import"./pencil-Fi_Rr1KZ.js";import"./minus-B_Ddw6tU.js";import"./plus-nqo2bO_L.js";import"./trash-2-Bd2Um6yj.js";import"./FormSelect-DBa1PYaS.js";import"./index-Cy3JaHvT.js";import"./truck-CvwORDJz.js";import"./circle-check-big-DzKzqym9.js";import"./printer-CtZWi9Ms.js";import"./use-pagination-DIFBlEJk.js";import"./search-DV72ccQv.js";import"./image-C7Xaq9PZ.js";import"./search-input-DrGKygW5.js";import"./PosDetailModal-xLlqUnCP.js";const ft=[{title:"Master Barang",href:"/items"}],le=()=>{const t=st.c(47),{productData:v,posData:b}=rt().props;let S;t[0]!==v?(S=v.map(ht),t[0]=v,t[1]=S):S=t[1];const O=S;console.log("POS Data:",b);const[Q,tt]=d.useState("");let w;t[2]===Symbol.for("react.memo_cache_sentinel")?(w=[],t[2]=w):w=t[2];const[r,y]=d.useState(w),[n,j]=d.useState("tunai"),[H,P]=d.useState(!1),[L,W]=d.useState(!1);let C;t[3]===Symbol.for("react.memo_cache_sentinel")?(C={total:0,cashReceived:0,change:0,charge:0},t[3]=C):C=t[3];const[c,et]=d.useState(C),[E,I]=d.useState(!1),[x,Y]=d.useState("pos");let N;t[4]===Symbol.for("react.memo_cache_sentinel")?(N=i=>{let o=!1;y(a=>{const s=a.find(l=>l.product.id===i.id);return s?s.qty>=i.stock?(o=!0,a):a.map(l=>l.product.id===i.id?{...l,qty:l.qty+1}:l):i.stock<=0?(o=!0,a):[...a,{product:i,qty:1,customPrice:null}]}),o&&ct.error("Stok tidak cukup!")},t[4]=N):N=t[4];const it=N;let k;t[5]===Symbol.for("react.memo_cache_sentinel")?(k=(i,o)=>{y(a=>a.map(s=>{if(s.product.id!==i)return s;const l=s.qty+o;return l<1||l>s.product.stock?s:{...s,qty:l}}))},t[5]=k):k=t[5];const J=k;let $;t[6]===Symbol.for("react.memo_cache_sentinel")?($=i=>{y(o=>o.filter(a=>a.product.id!==i))},t[6]=$):$=t[6];const U=$;let _;t[7]===Symbol.for("react.memo_cache_sentinel")?(_=(i,o)=>{y(a=>a.map(s=>s.product.id===i?{...s,customPrice:o}:s))},t[7]=_):_=t[7];const V=_;let M;t[8]===Symbol.for("react.memo_cache_sentinel")?(M=(i,o,a,s)=>{et({total:s,cashReceived:i,change:o,charge:a}),P(!1),W(!0)},t[8]=M):M=t[8];const ot=M;let R;t[9]===Symbol.for("react.memo_cache_sentinel")?(R=()=>{y([]),W(!1),j("tunai")},t[9]=R):R=t[9];const X=R;let z;t[10]!==r||t[11]!==c||t[12]!==n?(z=()=>{const i=window.open("","_blank","width=400,height=600"),o=new Date,a=`POS-${o.getFullYear()+String(o.getMonth()+1).padStart(2,"0")+String(o.getDate()).padStart(2,"0")+String(o.getHours()).padStart(2,"0")+String(o.getMinutes()).padStart(2,"0")+String(o.getSeconds()).padStart(2,"0")}`;if(!i)return;const s=r.map(gt).join("");i.document.write(`
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
                        <img src="/logo.png" />
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
                    <div>${K(c.charge)}</div>
                </div>

                <div class="divider"></div>

                <div class="item total">
                    <div>Total</div>
                    <div>${K(c.total)}</div>
                </div>

                <div class="item">
                    <div>${n}</div>
                    <div>${K(c.cashReceived)}</div>
                </div>

                <div class="item">
                    <div>Kembali</div>
                    <div>${K(c.change)}</div>
                </div>

                <div class="divider"></div>

                <div class="center" style="font-size: 22px">
                    Terima Kasih 🙏
                </div>
            </div>
        </body>
    </html>
    `),i.document.close(),i.focus(),i.print(),X()},t[10]=r,t[11]=c,t[12]=n,t[13]=z):z=t[13];const B=z;let A;t[14]===Symbol.for("react.memo_cache_sentinel")?(A=e.jsx(at,{title:"POS Kasir",children:e.jsx("meta",{name:"robots",content:"noindex"})}),t[14]=A):A=t[14];let T;t[15]===Symbol.for("react.memo_cache_sentinel")?(T=()=>Y("pos"),t[15]=T):T=t[15];const F=`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${x==="pos"?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground hover:bg-muted/80"}`;let m;t[16]!==F?(m=e.jsx("button",{type:"button",onClick:T,className:F,children:"POS"}),t[16]=F,t[17]=m):m=t[17];let q;t[18]===Symbol.for("react.memo_cache_sentinel")?(q=()=>Y("riwayat"),t[18]=q):q=t[18];const G=`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${x==="riwayat"?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground hover:bg-muted/80"}`;let p;t[19]!==G?(p=e.jsx("button",{type:"button",onClick:q,className:G,children:"Riwayat"}),t[19]=G,t[20]=p):p=t[20];let u;t[21]!==m||t[22]!==p?(u=e.jsxs("div",{className:"flex justify-between items-center mb-4 gap-2",children:[m,p]}),t[21]=m,t[22]=p,t[23]=u):u=t[23];let f;t[24]!==x||t[25]!==r||t[26]!==n||t[27]!==b||t[28]!==O||t[29]!==Q||t[30]!==E?(f=x==="pos"?e.jsxs("div",{className:"flex md:flex-row flex-col flex-1",children:[e.jsx(mt,{products:O,searchQuery:Q,onSearchChange:tt,onProductClick:it}),e.jsx("div",{className:"hidden md:block",children:e.jsx(Z,{cart:r,paymentMethod:n,onPaymentMethodChange:j,onQtyChange:J,onRemove:U,onCustomPrice:V,onPay:()=>P(!0)})}),r.length>0&&e.jsxs("button",{onClick:()=>I(!0),className:"fixed bottom-4 right-4 z-50 md:hidden bg-primary text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2",children:[e.jsx(ut,{className:"size-4"})," ",r.length]}),E&&e.jsxs("div",{className:"fixed inset-0 z-999 md:hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-black/40",onClick:()=>I(!1)}),e.jsx("div",{className:"absolute bottom-0 left-0 right-0 bg-card rounded-t-xl h-[85vh] overflow-hidden animate-in slide-in-from-bottom",children:e.jsx(Z,{cart:r,paymentMethod:n,onPaymentMethodChange:j,onQtyChange:J,onRemove:U,onCustomPrice:V,onPay:()=>{I(!1),P(!0)}})})]})]}):e.jsx(pt,{data:b}),t[24]=x,t[25]=r,t[26]=n,t[27]=b,t[28]=O,t[29]=Q,t[30]=E,t[31]=f):f=t[31];let h;t[32]!==r||t[33]!==n||t[34]!==H?(h=H&&e.jsx(lt,{cart:r,paymentMethod:n,onPaymentMethodChange:j,onClose:()=>P(!1),onSuccess:ot}),t[32]=r,t[33]=n,t[34]=H,t[35]=h):h=t[35];let g;t[36]!==r||t[37]!==B||t[38]!==c||t[39]!==n||t[40]!==L?(g=L&&e.jsx(dt,{total:c.total,cashReceived:c.cashReceived,change:c.change,paymentMethod:n,cart:r,onNewTransaction:X,onPrintReceipt:B}),t[36]=r,t[37]=B,t[38]=c,t[39]=n,t[40]=L,t[41]=g):g=t[41];let D;return t[42]!==u||t[43]!==f||t[44]!==h||t[45]!==g?(D=e.jsxs(nt,{breadcrumbs:ft,children:[A,e.jsxs("div",{className:"p-4",children:[u,f,h,g]})]}),t[42]=u,t[43]=f,t[44]=h,t[45]=g,t[46]=D):D=t[46],D};function ht(t){return{id:String(t.id),name:t.name,price:Number(t.price),stock:Number(t.stock),unit:t.unit??"pcs",image:t.image??null,image_url:t.image_url??null}}function gt(t){const v=t.customPrice??t.product.price;return`
          <div class="item">
            <div>${t.product.name} x${t.qty}</div>
            <div>${(v*t.qty).toLocaleString("id-ID")}</div>
          </div>
        `}export{le as default};
