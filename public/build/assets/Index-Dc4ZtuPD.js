import{c as rt,u as st,r as d,j as e,H as at}from"./app-3YCLGDA0.js";import{A as nt}from"./app-layout-C1Mg2oGd.js";import{n as ct}from"./notify-B7h8BYpZ.js";import Z from"./CartPanel-BkCwq9AP.js";import lt,{SuccessModal as dt}from"./PaymentModal-DVtKbkKS.js";import mt from"./ProductGrid-C0Xz_pTK.js";import pt from"./PosHistory-BSlfczs-.js";import{f as H}from"./format-Dvu9qd1M.js";import{S as ut}from"./shopping-cart-CbP7NgmH.js";/* empty css            */import"./index-Bkd-O5SW.js";import"./loader-circle-DzO6vc2o.js";import"./createLucideIcon-DB8yScyq.js";import"./triangle-alert-C1h30TDu.js";import"./circle-check-B2PscRAE.js";import"./button-Bt-UIGxq.js";import"./clsx-B-dksMZM.js";import"./utils-DlhoCQ_R.js";import"./index-BCabMkfA.js";import"./x-CQnulrVa.js";import"./app-logo-icon-acslc7k_.js";import"./index-B_e8Ugpt.js";import"./index-CSEUMRIG.js";import"./permissions-DaO5N8a9.js";import"./wallet-Da2ho8ve.js";import"./log-out-CAENYF-c.js";import"./package-BEXIXvGl.js";import"./index-0riIoOoo.js";import"./index-Dxpzvwrr.js";import"./settings-C3t3nGIq.js";import"./products-hCxJfRGA.js";import"./apple-xTu448Ye.js";import"./pencil-BZsiqv1k.js";import"./minus-gW_fZUJT.js";import"./plus-DeJilJwT.js";import"./trash-2-BGrbq3Z8.js";import"./FormInput-CX_5P3sn.js";import"./FormSelect-CwvPRLr8.js";import"./index-BgkvAR9e.js";import"./truck-C6lzM_dp.js";import"./circle-check-big-DJYQahCP.js";import"./printer-CMiKy-Qq.js";import"./use-pagination-DXeZDyZr.js";import"./search-BRSiHO7_.js";import"./image-DlP112cO.js";import"./search-input-Df0vj4wT.js";import"./PosDetailModal-Cp1BP36D.js";const ft=[{title:"Master Barang",href:"/items"}],de=()=>{const t=rt.c(47),{productData:v,posData:b}=st().props;let S;t[0]!==v?(S=v.map(ht),t[0]=v,t[1]=S):S=t[1];const O=S;console.log("POS Data:",b);const[K,tt]=d.useState("");let w;t[2]===Symbol.for("react.memo_cache_sentinel")?(w=[],t[2]=w):w=t[2];const[s,y]=d.useState(w),[n,j]=d.useState("tunai"),[L,P]=d.useState(!1),[A,W]=d.useState(!1);let C;t[3]===Symbol.for("react.memo_cache_sentinel")?(C={total:0,cashReceived:0,change:0,charge:0},t[3]=C):C=t[3];const[c,et]=d.useState(C),[E,I]=d.useState(!1),[x,Y]=d.useState("pos");let k;t[4]===Symbol.for("react.memo_cache_sentinel")?(k=o=>{let i=!1;y(a=>{const r=a.find(l=>l.product.id===o.id);return r?r.qty>=o.stock?(i=!0,a):a.map(l=>l.product.id===o.id?{...l,qty:l.qty+1}:l):o.stock<=0?(i=!0,a):[...a,{product:o,qty:1,customPrice:null}]}),i&&ct.error("Stok tidak cukup!")},t[4]=k):k=t[4];const ot=k;let N;t[5]===Symbol.for("react.memo_cache_sentinel")?(N=(o,i)=>{y(a=>a.map(r=>{if(r.product.id!==o)return r;const l=r.qty+i;return l<1||l>r.product.stock?r:{...r,qty:l}}))},t[5]=N):N=t[5];const J=N;let $;t[6]===Symbol.for("react.memo_cache_sentinel")?($=o=>{y(i=>i.filter(a=>a.product.id!==o))},t[6]=$):$=t[6];const U=$;let _;t[7]===Symbol.for("react.memo_cache_sentinel")?(_=(o,i)=>{y(a=>a.map(r=>r.product.id===o?{...r,customPrice:i}:r))},t[7]=_):_=t[7];const V=_;let M;t[8]===Symbol.for("react.memo_cache_sentinel")?(M=(o,i,a,r)=>{et({total:r,cashReceived:o,change:i,charge:a}),P(!1),W(!0)},t[8]=M):M=t[8];const it=M;let R;t[9]===Symbol.for("react.memo_cache_sentinel")?(R=()=>{y([]),W(!1),j("tunai")},t[9]=R):R=t[9];const X=R;let T;t[10]!==s||t[11]!==c||t[12]!==n?(T=()=>{const o=window.open("","_blank","width=400,height=600"),i=new Date,a=`POS-${i.getFullYear()+String(i.getMonth()+1).padStart(2,"0")+String(i.getDate()).padStart(2,"0")+String(i.getHours()).padStart(2,"0")+String(i.getMinutes()).padStart(2,"0")+String(i.getSeconds()).padStart(2,"0")}`;if(!o)return;const r=s.map(gt).join("");o.document.write(`
      <html>
        <head>
          <title>Struk</title>
          <style>
            body {
              font-family: monospace;
              width: 280px;
              margin: 0 auto;
              padding: 10px;
              font-size: 14px;
            }

            .center {
              text-align: center;
            }

            .logo {
              width: 50px;
              margin: 0 auto 8px;
            }

            .divider {
              border-top: 1px dashed #000;
              margin: 8px 0;
            }

            .item {
              display: flex;
              justify-content: space-between;
              margin: 4px 0;
            }

            .total {
              font-weight: bold;
              font-size: 16px;
            }

            .meta {
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              margin-top: 6px;
            }

            @media print {
              body {
                width: 280px;
              }
            }
          </style>
        </head>

        <body>
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
    `),o.document.close(),o.focus(),o.print(),X()},t[10]=s,t[11]=c,t[12]=n,t[13]=T):T=t[13];const B=T;let q;t[14]===Symbol.for("react.memo_cache_sentinel")?(q=e.jsx(at,{title:"POS Kasir",children:e.jsx("meta",{name:"robots",content:"noindex"})}),t[14]=q):q=t[14];let D;t[15]===Symbol.for("react.memo_cache_sentinel")?(D=()=>Y("pos"),t[15]=D):D=t[15];const F=`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${x==="pos"?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground hover:bg-muted/80"}`;let m;t[16]!==F?(m=e.jsx("button",{type:"button",onClick:D,className:F,children:"POS"}),t[16]=F,t[17]=m):m=t[17];let z;t[18]===Symbol.for("react.memo_cache_sentinel")?(z=()=>Y("riwayat"),t[18]=z):z=t[18];const G=`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${x==="riwayat"?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground hover:bg-muted/80"}`;let p;t[19]!==G?(p=e.jsx("button",{type:"button",onClick:z,className:G,children:"Riwayat"}),t[19]=G,t[20]=p):p=t[20];let u;t[21]!==m||t[22]!==p?(u=e.jsxs("div",{className:"flex justify-between items-center mb-4 gap-2",children:[m,p]}),t[21]=m,t[22]=p,t[23]=u):u=t[23];let f;t[24]!==x||t[25]!==s||t[26]!==n||t[27]!==b||t[28]!==O||t[29]!==K||t[30]!==E?(f=x==="pos"?e.jsxs("div",{className:"flex md:flex-row flex-col flex-1",children:[e.jsx(mt,{products:O,searchQuery:K,onSearchChange:tt,onProductClick:ot}),e.jsx("div",{className:"hidden md:block",children:e.jsx(Z,{cart:s,paymentMethod:n,onPaymentMethodChange:j,onQtyChange:J,onRemove:U,onCustomPrice:V,onPay:()=>P(!0)})}),s.length>0&&e.jsxs("button",{onClick:()=>I(!0),className:"fixed bottom-4 right-4 z-50 md:hidden bg-primary text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2",children:[e.jsx(ut,{className:"size-4"})," ",s.length]}),E&&e.jsxs("div",{className:"fixed inset-0 z-999 md:hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-black/40",onClick:()=>I(!1)}),e.jsx("div",{className:"absolute bottom-0 left-0 right-0 bg-card rounded-t-xl h-[85vh] overflow-hidden animate-in slide-in-from-bottom",children:e.jsx(Z,{cart:s,paymentMethod:n,onPaymentMethodChange:j,onQtyChange:J,onRemove:U,onCustomPrice:V,onPay:()=>{I(!1),P(!0)}})})]})]}):e.jsx(pt,{data:b}),t[24]=x,t[25]=s,t[26]=n,t[27]=b,t[28]=O,t[29]=K,t[30]=E,t[31]=f):f=t[31];let h;t[32]!==s||t[33]!==n||t[34]!==L?(h=L&&e.jsx(lt,{cart:s,paymentMethod:n,onPaymentMethodChange:j,onClose:()=>P(!1),onSuccess:it}),t[32]=s,t[33]=n,t[34]=L,t[35]=h):h=t[35];let g;t[36]!==s||t[37]!==B||t[38]!==c||t[39]!==n||t[40]!==A?(g=A&&e.jsx(dt,{total:c.total,cashReceived:c.cashReceived,change:c.change,paymentMethod:n,cart:s,onNewTransaction:X,onPrintReceipt:B}),t[36]=s,t[37]=B,t[38]=c,t[39]=n,t[40]=A,t[41]=g):g=t[41];let Q;return t[42]!==u||t[43]!==f||t[44]!==h||t[45]!==g?(Q=e.jsxs(nt,{breadcrumbs:ft,children:[q,e.jsxs("div",{className:"p-4",children:[u,f,h,g]})]}),t[42]=u,t[43]=f,t[44]=h,t[45]=g,t[46]=Q):Q=t[46],Q};function ht(t){return{id:String(t.id),name:t.name,price:Number(t.price),stock:Number(t.stock),unit:t.unit??"pcs",image:t.image??null,image_url:t.image_url??null}}function gt(t){const v=t.customPrice??t.product.price;return`
          <div class="item">
            <div>${t.product.name} x${t.qty}</div>
            <div>${(v*t.qty).toLocaleString("id-ID")}</div>
          </div>
        `}export{de as default};
