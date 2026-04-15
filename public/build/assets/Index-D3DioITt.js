import{c as st,u as rt,r as d,j as e,H as at}from"./app-BIDNzlHK.js";import{A as nt}from"./app-layout-DqgWlk2m.js";import{n as ct}from"./notify-7X73HK8G.js";import Z from"./CartPanel-CZJYFrQZ.js";import lt,{SuccessModal as dt}from"./PaymentModal-BLAO7CYh.js";import mt from"./ProductGrid-DGvvu8wT.js";import pt from"./PosHistory-BGy3PmIv.js";import{f as b}from"./format-Dvu9qd1M.js";import{S as ut}from"./shopping-cart-CsX_Tkse.js";/* empty css            */import"./index-DQD3-WDm.js";import"./loader-circle-pS5Wcf0L.js";import"./createLucideIcon-BZLECwvm.js";import"./triangle-alert-DUh3PWkp.js";import"./circle-check-CSABUxwV.js";import"./button-WXV43zCr.js";import"./clsx-B-dksMZM.js";import"./utils-DlhoCQ_R.js";import"./index-cvzf8iGS.js";import"./x-DbGrA408.js";import"./app-logo-icon-Bm946X4z.js";import"./index-B_e8Ugpt.js";import"./index-CSEUMRIG.js";import"./permissions-CtYhwh9Y.js";import"./wallet-BbVhxu3a.js";import"./log-out-VSMeIqUg.js";import"./package-CYq--cws.js";import"./index-CFUAJ25P.js";import"./index-DHy-R40F.js";import"./settings-Bo7XkQrV.js";import"./products-hCxJfRGA.js";import"./apple-DDWomLZD.js";import"./pencil-CO6RBW1t.js";import"./minus-TmYGbUNm.js";import"./plus-BrXkg9Tl.js";import"./trash-2-D6IhAvAW.js";import"./FormSelect-N2e1RMpO.js";import"./index-Cp6iICCU.js";import"./truck-CkFRwvVE.js";import"./circle-check-big-BELyKP9P.js";import"./printer-BpDNsPpb.js";import"./use-pagination-fa0jDTvx.js";import"./search-FbTW4jLJ.js";import"./image-CipDFiJE.js";import"./search-input-DI34PB__.js";import"./PosDetailModal-BPW9uWlr.js";const ft=[{title:"Master Barang",href:"/items"}],le=()=>{const t=st.c(47),{productData:v,posData:S}=rt().props;let w;t[0]!==v?(w=v.map(ht),t[0]=v,t[1]=w):w=t[1];const O=w;console.log("POS Data:",S);const[Q,tt]=d.useState("");let j;t[2]===Symbol.for("react.memo_cache_sentinel")?(j=[],t[2]=j):j=t[2];const[r,y]=d.useState(j),[n,P]=d.useState("tunai"),[H,C]=d.useState(!1),[E,W]=d.useState(!1);let N;t[3]===Symbol.for("react.memo_cache_sentinel")?(N={total:0,cashReceived:0,change:0,charge:0},t[3]=N):N=t[3];const[c,et]=d.useState(N),[L,B]=d.useState(!1),[x,Y]=d.useState("pos");let k;t[4]===Symbol.for("react.memo_cache_sentinel")?(k=i=>{let o=!1;y(a=>{const s=a.find(l=>l.product.id===i.id);return s?s.qty>=i.stock?(o=!0,a):a.map(l=>l.product.id===i.id?{...l,qty:l.qty+1}:l):i.stock<=0?(o=!0,a):[...a,{product:i,qty:1,customPrice:null}]}),o&&ct.error("Stok tidak cukup!")},t[4]=k):k=t[4];const it=k;let $;t[5]===Symbol.for("react.memo_cache_sentinel")?($=(i,o)=>{y(a=>a.map(s=>{if(s.product.id!==i)return s;const l=s.qty+o;return l<1||l>s.product.stock?s:{...s,qty:l}}))},t[5]=$):$=t[5];const J=$;let _;t[6]===Symbol.for("react.memo_cache_sentinel")?(_=i=>{y(o=>o.filter(a=>a.product.id!==i))},t[6]=_):_=t[6];const U=_;let M;t[7]===Symbol.for("react.memo_cache_sentinel")?(M=(i,o)=>{y(a=>a.map(s=>s.product.id===i?{...s,customPrice:o}:s))},t[7]=M):M=t[7];const V=M;let R;t[8]===Symbol.for("react.memo_cache_sentinel")?(R=(i,o,a,s)=>{et({total:s,cashReceived:i,change:o,charge:a}),C(!1),W(!0)},t[8]=R):R=t[8];const ot=R;let z;t[9]===Symbol.for("react.memo_cache_sentinel")?(z=()=>{y([]),W(!1),P("tunai")},t[9]=z):z=t[9];const X=z;let A;t[10]!==r||t[11]!==c||t[12]!==n?(A=()=>{const i=window.open("","_blank","width=400,height=600"),o=new Date,a=`POS-${o.getFullYear()+String(o.getMonth()+1).padStart(2,"0")+String(o.getDate()).padStart(2,"0")+String(o.getHours()).padStart(2,"0")+String(o.getMinutes()).padStart(2,"0")+String(o.getSeconds()).padStart(2,"0")}`;if(!i)return;const s=r.map(gt).join("");i.document.write(`
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
