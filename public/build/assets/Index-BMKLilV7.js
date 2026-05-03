import{c as st,u as rt,r as d,j as e,H as at}from"./app-4AqIIr4x.js";import{A as nt}from"./app-layout-lY_140Rt.js";import{n as ct}from"./notify-C-r_n2rz.js";import Z from"./CartPanel-CrZgqzRE.js";import lt,{SuccessModal as dt}from"./PaymentModal-DdPrPvjx.js";import mt from"./ProductGrid-6lcGgMKN.js";import pt from"./PosHistory-h7twm8-Z.js";import{f as b}from"./format-Dvu9qd1M.js";import{S as ut}from"./shopping-cart-HGpBBp6h.js";/* empty css            */import"./index-CCdD6C96.js";import"./loader-circle-BWAVA-Av.js";import"./createLucideIcon-zHwz-ZpZ.js";import"./triangle-alert-DFXIF0Bp.js";import"./circle-check-VlaWNllh.js";import"./button-9cgbJOuH.js";import"./clsx-B-dksMZM.js";import"./utils-DlhoCQ_R.js";import"./index-Cvb4LQGr.js";import"./x-JhZI0-LJ.js";import"./app-logo-icon-uD-BNhCc.js";import"./index-B_e8Ugpt.js";import"./index-CSEUMRIG.js";import"./permissions-ud_W9v0d.js";import"./wallet-BpjMu8ZS.js";import"./log-out-pxte2ine.js";import"./package-Bw8Lrivf.js";import"./index-Dn5jIffk.js";import"./index-8bk6aX1B.js";import"./settings-DaWB9iji.js";import"./products-hCxJfRGA.js";import"./apple-DYhqn-rO.js";import"./pencil-DDjOX-RF.js";import"./minus-F3OHsfQX.js";import"./plus-D12UtxXg.js";import"./trash-2-CSbfagwh.js";import"./FormSelect-BQhlC9yG.js";import"./index-Q67B1toZ.js";import"./truck-vGYMCTZB.js";import"./circle-check-big-BHP2T6DH.js";import"./printer-CN0E8ZLc.js";import"./use-pagination-UmRIW20Y.js";import"./search-CXcdy4vI.js";import"./image-BY7obx1k.js";import"./search-input-a4qRbFUQ.js";import"./PosDetailModal-B4LbJ2Cq.js";const ft=[{title:"Master Barang",href:"/items"}],le=()=>{const t=st.c(47),{productData:v,posData:S}=rt().props;let w;t[0]!==v?(w=v.map(ht),t[0]=v,t[1]=w):w=t[1];const O=w;console.log("POS Data:",S);const[Q,tt]=d.useState("");let j;t[2]===Symbol.for("react.memo_cache_sentinel")?(j=[],t[2]=j):j=t[2];const[r,y]=d.useState(j),[n,P]=d.useState("tunai"),[H,C]=d.useState(!1),[E,W]=d.useState(!1);let N;t[3]===Symbol.for("react.memo_cache_sentinel")?(N={total:0,cashReceived:0,change:0,charge:0},t[3]=N):N=t[3];const[c,et]=d.useState(N),[L,B]=d.useState(!1),[x,Y]=d.useState("pos");let k;t[4]===Symbol.for("react.memo_cache_sentinel")?(k=i=>{let o=!1;y(a=>{const s=a.find(l=>l.product.id===i.id);return s?s.qty>=i.stock?(o=!0,a):a.map(l=>l.product.id===i.id?{...l,qty:l.qty+1}:l):i.stock<=0?(o=!0,a):[...a,{product:i,qty:1,customPrice:null}]}),o&&ct.error("Stok tidak cukup!")},t[4]=k):k=t[4];const it=k;let _;t[5]===Symbol.for("react.memo_cache_sentinel")?(_=(i,o)=>{y(a=>a.map(s=>{if(s.product.id!==i)return s;const l=s.qty+o;return l<1||l>s.product.stock?s:{...s,qty:l}}))},t[5]=_):_=t[5];const J=_;let $;t[6]===Symbol.for("react.memo_cache_sentinel")?($=i=>{y(o=>o.filter(a=>a.product.id!==i))},t[6]=$):$=t[6];const U=$;let M;t[7]===Symbol.for("react.memo_cache_sentinel")?(M=(i,o)=>{y(a=>a.map(s=>s.product.id===i?{...s,customPrice:o}:s))},t[7]=M):M=t[7];const V=M;let R;t[8]===Symbol.for("react.memo_cache_sentinel")?(R=(i,o,a,s)=>{et({total:s,cashReceived:i,change:o,charge:a}),C(!1),W(!0)},t[8]=R):R=t[8];const ot=R;let z;t[9]===Symbol.for("react.memo_cache_sentinel")?(z=()=>{y([]),W(!1),P("tunai")},t[9]=z):z=t[9];const X=z;let A;t[10]!==r||t[11]!==c||t[12]!==n?(A=()=>{const i=window.open("","_blank","width=400,height=600"),o=new Date,a=`POS-${o.getFullYear()+String(o.getMonth()+1).padStart(2,"0")+String(o.getDate()).padStart(2,"0")+String(o.getHours()).padStart(2,"0")+String(o.getMinutes()).padStart(2,"0")+String(o.getSeconds()).padStart(2,"0")}`;if(!i)return;const s=r.map(gt).join("");i.document.write(`
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
                    <div>${b(c.charge)}</div>
                </div>

                <div class="divider"></div>

                <div class="item total">
                    <div>Total</div>
                    <div>${b(c.total)}</div>
                </div>

                <div class="item">
                    <div>${n}</div>
                    <div>${b(c.cashReceived)}</div>
                </div>

                <div class="item">
                    <div>Kembali</div>
                    <div>${b(c.change)}</div>
                </div>

                <div class="divider"></div>

                <div class="center" style="font-size: 22px">
                    Terima Kasih 🙏
                </div>
            </div>
        </body>
    </html>
    `),i.document.close(),i.focus(),i.print(),X()},t[10]=r,t[11]=c,t[12]=n,t[13]=A):A=t[13];const I=A;let T;t[14]===Symbol.for("react.memo_cache_sentinel")?(T=e.jsx(at,{title:"POS Kasir",children:e.jsx("meta",{name:"robots",content:"noindex"})}),t[14]=T):T=t[14];let q;t[15]===Symbol.for("react.memo_cache_sentinel")?(q=()=>Y("pos"),t[15]=q):q=t[15];const F=`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${x==="pos"?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground hover:bg-muted/80"}`;let m;t[16]!==F?(m=e.jsx("button",{type:"button",onClick:q,className:F,children:"POS"}),t[16]=F,t[17]=m):m=t[17];let D;t[18]===Symbol.for("react.memo_cache_sentinel")?(D=()=>Y("riwayat"),t[18]=D):D=t[18];const G=`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${x==="riwayat"?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground hover:bg-muted/80"}`;let p;t[19]!==G?(p=e.jsx("button",{type:"button",onClick:D,className:G,children:"Riwayat"}),t[19]=G,t[20]=p):p=t[20];let u;t[21]!==m||t[22]!==p?(u=e.jsxs("div",{className:"flex justify-between items-center mb-4 gap-2",children:[m,p]}),t[21]=m,t[22]=p,t[23]=u):u=t[23];let f;t[24]!==x||t[25]!==r||t[26]!==n||t[27]!==S||t[28]!==O||t[29]!==Q||t[30]!==L?(f=x==="pos"?e.jsxs("div",{className:"flex md:flex-row flex-col flex-1",children:[e.jsx(mt,{products:O,searchQuery:Q,onSearchChange:tt,onProductClick:it}),e.jsx("div",{className:"hidden md:block",children:e.jsx(Z,{cart:r,paymentMethod:n,onPaymentMethodChange:P,onQtyChange:J,onRemove:U,onCustomPrice:V,onPay:()=>C(!0)})}),r.length>0&&e.jsxs("button",{onClick:()=>B(!0),className:"fixed bottom-4 right-4 z-50 md:hidden bg-primary text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2",children:[e.jsx(ut,{className:"size-4"})," ",r.length]}),L&&e.jsxs("div",{className:"fixed inset-0 z-999 md:hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-black/40",onClick:()=>B(!1)}),e.jsx("div",{className:"absolute bottom-0 left-0 right-0 bg-card rounded-t-xl h-[85vh] overflow-hidden animate-in slide-in-from-bottom",children:e.jsx(Z,{cart:r,paymentMethod:n,onPaymentMethodChange:P,onQtyChange:J,onRemove:U,onCustomPrice:V,onPay:()=>{B(!1),C(!0)}})})]})]}):e.jsx(pt,{data:S}),t[24]=x,t[25]=r,t[26]=n,t[27]=S,t[28]=O,t[29]=Q,t[30]=L,t[31]=f):f=t[31];let h;t[32]!==r||t[33]!==n||t[34]!==H?(h=H&&e.jsx(lt,{cart:r,paymentMethod:n,onPaymentMethodChange:P,onClose:()=>C(!1),onSuccess:ot}),t[32]=r,t[33]=n,t[34]=H,t[35]=h):h=t[35];let g;t[36]!==r||t[37]!==I||t[38]!==c||t[39]!==n||t[40]!==E?(g=E&&e.jsx(dt,{total:c.total,cashReceived:c.cashReceived,change:c.change,paymentMethod:n,cart:r,onNewTransaction:X,onPrintReceipt:I}),t[36]=r,t[37]=I,t[38]=c,t[39]=n,t[40]=E,t[41]=g):g=t[41];let K;return t[42]!==u||t[43]!==f||t[44]!==h||t[45]!==g?(K=e.jsxs(nt,{breadcrumbs:ft,children:[T,e.jsxs("div",{className:"p-4",children:[u,f,h,g]})]}),t[42]=u,t[43]=f,t[44]=h,t[45]=g,t[46]=K):K=t[46],K};function ht(t){return{id:String(t.id),name:t.name,price:Number(t.price),stock:Number(t.stock),unit:t.unit??"pcs",image:t.image??null,image_url:t.image_url??null}}function gt(t){const v=t.customPrice??t.product.price;return`
          <div class="item">
            <div>${t.product.name} x${t.qty}</div>
            <div>${b(v*t.qty)}</div>
          </div>
        `}export{le as default};
