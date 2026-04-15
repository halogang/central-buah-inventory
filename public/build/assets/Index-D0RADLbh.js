import{c as rt,u as st,r as d,j as e,H as at}from"./app-B36LNZ87.js";import{A as nt}from"./app-layout-Ce6orL1w.js";import{n as ct}from"./notify-CZv0glAu.js";import Z from"./CartPanel-NRUQBiYt.js";import lt,{SuccessModal as dt}from"./PaymentModal-Dfoz7k8C.js";import mt from"./ProductGrid-JBWNDcxt.js";import pt from"./PosHistory-CgwDs2QB.js";import{f as H}from"./format-Dvu9qd1M.js";import{S as ut}from"./shopping-cart-COIaSBC9.js";/* empty css            */import"./index-BNK8_Oin.js";import"./loader-circle-gVjKNqiV.js";import"./createLucideIcon-Dng7_G7m.js";import"./triangle-alert-B6AVHCwf.js";import"./circle-check-D-538IIm.js";import"./button-B1SwSeU2.js";import"./clsx-B-dksMZM.js";import"./utils-DlhoCQ_R.js";import"./index-BozG_n89.js";import"./x-B46Z2rr8.js";import"./app-logo-icon-TP3GRo5G.js";import"./index-B_e8Ugpt.js";import"./index-CSEUMRIG.js";import"./permissions-BT1RjuOO.js";import"./wallet-Bcs28Fou.js";import"./log-out-DzQK4ayI.js";import"./package-DxI3xl08.js";import"./index-D0woHLD_.js";import"./index-BmmPr7tI.js";import"./settings-Cn35eVka.js";import"./products-hCxJfRGA.js";import"./apple-CSVw9z0d.js";import"./pencil-BMmPrL7U.js";import"./minus-CJZbfChZ.js";import"./plus-Dquknb4O.js";import"./trash-2-Da8PpBrY.js";import"./FormInput-DXVkLL9n.js";import"./FormSelect-D9vXz0SE.js";import"./index-BQyUzlfa.js";import"./truck-Cbnfn9my.js";import"./circle-check-big-Bo4uAU50.js";import"./printer-BEqx2Fwi.js";import"./use-pagination-D7xl21NZ.js";import"./search-CoqtLorM.js";import"./image-B5lbE2WY.js";import"./search-input-B3x3Oqyx.js";import"./PosDetailModal-BLiQbRDH.js";const ft=[{title:"Master Barang",href:"/items"}],de=()=>{const t=rt.c(47),{productData:v,posData:b}=st().props;let S;t[0]!==v?(S=v.map(ht),t[0]=v,t[1]=S):S=t[1];const O=S;console.log("POS Data:",b);const[K,tt]=d.useState("");let w;t[2]===Symbol.for("react.memo_cache_sentinel")?(w=[],t[2]=w):w=t[2];const[s,y]=d.useState(w),[n,P]=d.useState("tunai"),[L,j]=d.useState(!1),[A,W]=d.useState(!1);let C;t[3]===Symbol.for("react.memo_cache_sentinel")?(C={total:0,cashReceived:0,change:0,charge:0},t[3]=C):C=t[3];const[c,et]=d.useState(C),[E,I]=d.useState(!1),[x,Y]=d.useState("pos");let k;t[4]===Symbol.for("react.memo_cache_sentinel")?(k=i=>{let o=!1;y(a=>{const r=a.find(l=>l.product.id===i.id);return r?r.qty>=i.stock?(o=!0,a):a.map(l=>l.product.id===i.id?{...l,qty:l.qty+1}:l):i.stock<=0?(o=!0,a):[...a,{product:i,qty:1,customPrice:null}]}),o&&ct.error("Stok tidak cukup!")},t[4]=k):k=t[4];const it=k;let N;t[5]===Symbol.for("react.memo_cache_sentinel")?(N=(i,o)=>{y(a=>a.map(r=>{if(r.product.id!==i)return r;const l=r.qty+o;return l<1||l>r.product.stock?r:{...r,qty:l}}))},t[5]=N):N=t[5];const J=N;let $;t[6]===Symbol.for("react.memo_cache_sentinel")?($=i=>{y(o=>o.filter(a=>a.product.id!==i))},t[6]=$):$=t[6];const U=$;let _;t[7]===Symbol.for("react.memo_cache_sentinel")?(_=(i,o)=>{y(a=>a.map(r=>r.product.id===i?{...r,customPrice:o}:r))},t[7]=_):_=t[7];const V=_;let M;t[8]===Symbol.for("react.memo_cache_sentinel")?(M=(i,o,a,r)=>{et({total:r,cashReceived:i,change:o,charge:a}),j(!1),W(!0)},t[8]=M):M=t[8];const ot=M;let R;t[9]===Symbol.for("react.memo_cache_sentinel")?(R=()=>{y([]),W(!1),P("tunai")},t[9]=R):R=t[9];const X=R;let T;t[10]!==s||t[11]!==c||t[12]!==n?(T=()=>{const i=window.open("","_blank","width=400,height=600"),o=new Date,a=`POS-${o.getFullYear()+String(o.getMonth()+1).padStart(2,"0")+String(o.getDate()).padStart(2,"0")+String(o.getHours()).padStart(2,"0")+String(o.getMinutes()).padStart(2,"0")+String(o.getSeconds()).padStart(2,"0")}`;if(!i)return;const r=s.map(gt).join("");i.document.write(`
      <html>
        <head>
          <title>Struk</title>
          <style>
            @media print {
              @page {
                size: 58mm auto;
                margin: 0;
              }
              body {
                font-family: monospace;
                width: 58mm;
                margin: 0;
                padding: 8px;
                font-size: 12px;
              }
              container {
                width: 100%;
              }
            }

            .center {
              text-align: center;
            }

            .logo {
              width: 40px;
              margin: 0 auto 6px;
            }

            .divider {
              border-top: 1px dashed #000;
              margin: 6px 0;
            }

            .item {
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              margin: 2px 0;
            }

            .total {
              font-weight: bold;
              font-size: 14px;
            }

            .meta {
              font-size: 10px;
              margin-top: 4px;
            }
          </style>
        </head>

        <body class="container">
          <div class="center">
            <div class="logo">
              <img src="/logo.png" width="50"/>
            </div>
            <div><strong>Central Buah</strong></div>
            <div>POS Kasir</div>
          </div>

          <div class="meta">
            <div>${new Date().toLocaleString("id-ID")}</div>
            <div>${a}</div>
          </div>

          <div class="divider"></div>

          ${r}

          <div class="divider"></div>

          <div class="item">
            <div>biaya tambahan</div>
            <div>${H(c.charge)}</div>
          </div>
          
          <div class="divider"></div>

          <div class="item total">
            <div>Total</div>
            <div>${H(c.total)}</div>
          </div>

          <div class="item">
            <div>${n}</div>
            <div>${H(c.cashReceived)}</div>
          </div>

          <div class="item">
            <div>Kembali</div>
            <div>${H(c.change)}</div>
          </div>

          <div class="divider"></div>

          <div class="center">
            Terima Kasih 🙏
          </div>
        </body>
      </html>
    `),i.document.close(),i.focus(),i.print(),X()},t[10]=s,t[11]=c,t[12]=n,t[13]=T):T=t[13];const B=T;let q;t[14]===Symbol.for("react.memo_cache_sentinel")?(q=e.jsx(at,{title:"POS Kasir",children:e.jsx("meta",{name:"robots",content:"noindex"})}),t[14]=q):q=t[14];let z;t[15]===Symbol.for("react.memo_cache_sentinel")?(z=()=>Y("pos"),t[15]=z):z=t[15];const F=`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${x==="pos"?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground hover:bg-muted/80"}`;let m;t[16]!==F?(m=e.jsx("button",{type:"button",onClick:z,className:F,children:"POS"}),t[16]=F,t[17]=m):m=t[17];let D;t[18]===Symbol.for("react.memo_cache_sentinel")?(D=()=>Y("riwayat"),t[18]=D):D=t[18];const G=`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${x==="riwayat"?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground hover:bg-muted/80"}`;let p;t[19]!==G?(p=e.jsx("button",{type:"button",onClick:D,className:G,children:"Riwayat"}),t[19]=G,t[20]=p):p=t[20];let u;t[21]!==m||t[22]!==p?(u=e.jsxs("div",{className:"flex justify-between items-center mb-4 gap-2",children:[m,p]}),t[21]=m,t[22]=p,t[23]=u):u=t[23];let f;t[24]!==x||t[25]!==s||t[26]!==n||t[27]!==b||t[28]!==O||t[29]!==K||t[30]!==E?(f=x==="pos"?e.jsxs("div",{className:"flex md:flex-row flex-col flex-1",children:[e.jsx(mt,{products:O,searchQuery:K,onSearchChange:tt,onProductClick:it}),e.jsx("div",{className:"hidden md:block",children:e.jsx(Z,{cart:s,paymentMethod:n,onPaymentMethodChange:P,onQtyChange:J,onRemove:U,onCustomPrice:V,onPay:()=>j(!0)})}),s.length>0&&e.jsxs("button",{onClick:()=>I(!0),className:"fixed bottom-4 right-4 z-50 md:hidden bg-primary text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2",children:[e.jsx(ut,{className:"size-4"})," ",s.length]}),E&&e.jsxs("div",{className:"fixed inset-0 z-999 md:hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-black/40",onClick:()=>I(!1)}),e.jsx("div",{className:"absolute bottom-0 left-0 right-0 bg-card rounded-t-xl h-[85vh] overflow-hidden animate-in slide-in-from-bottom",children:e.jsx(Z,{cart:s,paymentMethod:n,onPaymentMethodChange:P,onQtyChange:J,onRemove:U,onCustomPrice:V,onPay:()=>{I(!1),j(!0)}})})]})]}):e.jsx(pt,{data:b}),t[24]=x,t[25]=s,t[26]=n,t[27]=b,t[28]=O,t[29]=K,t[30]=E,t[31]=f):f=t[31];let h;t[32]!==s||t[33]!==n||t[34]!==L?(h=L&&e.jsx(lt,{cart:s,paymentMethod:n,onPaymentMethodChange:P,onClose:()=>j(!1),onSuccess:ot}),t[32]=s,t[33]=n,t[34]=L,t[35]=h):h=t[35];let g;t[36]!==s||t[37]!==B||t[38]!==c||t[39]!==n||t[40]!==A?(g=A&&e.jsx(dt,{total:c.total,cashReceived:c.cashReceived,change:c.change,paymentMethod:n,cart:s,onNewTransaction:X,onPrintReceipt:B}),t[36]=s,t[37]=B,t[38]=c,t[39]=n,t[40]=A,t[41]=g):g=t[41];let Q;return t[42]!==u||t[43]!==f||t[44]!==h||t[45]!==g?(Q=e.jsxs(nt,{breadcrumbs:ft,children:[q,e.jsxs("div",{className:"p-4",children:[u,f,h,g]})]}),t[42]=u,t[43]=f,t[44]=h,t[45]=g,t[46]=Q):Q=t[46],Q};function ht(t){return{id:String(t.id),name:t.name,price:Number(t.price),stock:Number(t.stock),unit:t.unit??"pcs",image:t.image??null,image_url:t.image_url??null}}function gt(t){const v=t.customPrice??t.product.price;return`
          <div class="item">
            <div>${t.product.name} x${t.qty}</div>
            <div>${(v*t.qty).toLocaleString("id-ID")}</div>
          </div>
        `}export{de as default};
