import{c as rt,u as st,r as d,j as e,H as at}from"./app-DGnpZM6b.js";import{A as nt}from"./app-layout-5FVYt0gB.js";import{n as ct}from"./notify-CJY3u3Ie.js";import Z from"./CartPanel-CO-DLGqh.js";import lt,{SuccessModal as dt}from"./PaymentModal-4QP9PUYP.js";import mt from"./ProductGrid-Um-ikBsV.js";import pt from"./PosHistory-B6MvRNd4.js";import{f as E}from"./format-Dvu9qd1M.js";import{S as ut}from"./shopping-cart-DvnOnwx5.js";/* empty css            */import"./index-CVhJdy1J.js";import"./loader-circle-edIT5MpG.js";import"./createLucideIcon-gIZWTUKd.js";import"./triangle-alert-BpWEhMNV.js";import"./circle-check-CKgHRGy9.js";import"./button-CZgfNDCX.js";import"./clsx-B-dksMZM.js";import"./utils-DlhoCQ_R.js";import"./index-C4dMIOX0.js";import"./x-DAIYagK6.js";import"./app-logo-icon-DUhwaxWI.js";import"./index-B_e8Ugpt.js";import"./index-CSEUMRIG.js";import"./permissions-iGM9B3iT.js";import"./wallet-DZ8-yIK8.js";import"./log-out-UrYJbJfo.js";import"./package-QeQ7RSfp.js";import"./index-DUd_YG_K.js";import"./index-D-6j0D83.js";import"./settings-D16-Wg3N.js";import"./products-hCxJfRGA.js";import"./apple-BHiznns0.js";import"./pencil-l1rUlA3y.js";import"./minus-wL9W8JoF.js";import"./plus-CMXAhwwq.js";import"./trash-2-5gaR2_Qc.js";import"./FormInput-DB6ciXcD.js";import"./FormSelect-P0zEJi7t.js";import"./index-C7xxL9CQ.js";import"./truck-DOHcghXz.js";import"./circle-check-big-zrw4T4ed.js";import"./printer-DCLliWpI.js";import"./use-pagination-iafaRzXk.js";import"./search-MK7jVUJt.js";import"./image-CVoN59ZJ.js";import"./search-input-CsWomz0m.js";import"./PosDetailModal-BlggxTgZ.js";const ft=[{title:"Master Barang",href:"/items"}],de=()=>{const t=rt.c(47),{productData:v,posData:b}=st().props;let S;t[0]!==v?(S=v.map(ht),t[0]=v,t[1]=S):S=t[1];const H=S;console.log("POS Data:",b);const[O,tt]=d.useState("");let w;t[2]===Symbol.for("react.memo_cache_sentinel")?(w=[],t[2]=w):w=t[2];const[s,y]=d.useState(w),[n,P]=d.useState("tunai"),[A,j]=d.useState(!1),[K,W]=d.useState(!1);let C;t[3]===Symbol.for("react.memo_cache_sentinel")?(C={total:0,cashReceived:0,change:0,charge:0},t[3]=C):C=t[3];const[c,et]=d.useState(C),[L,I]=d.useState(!1),[x,Y]=d.useState("pos");let k;t[4]===Symbol.for("react.memo_cache_sentinel")?(k=i=>{let o=!1;y(a=>{const r=a.find(l=>l.product.id===i.id);return r?r.qty>=i.stock?(o=!0,a):a.map(l=>l.product.id===i.id?{...l,qty:l.qty+1}:l):i.stock<=0?(o=!0,a):[...a,{product:i,qty:1,customPrice:null}]}),o&&ct.error("Stok tidak cukup!")},t[4]=k):k=t[4];const it=k;let N;t[5]===Symbol.for("react.memo_cache_sentinel")?(N=(i,o)=>{y(a=>a.map(r=>{if(r.product.id!==i)return r;const l=r.qty+o;return l<1||l>r.product.stock?r:{...r,qty:l}}))},t[5]=N):N=t[5];const J=N;let $;t[6]===Symbol.for("react.memo_cache_sentinel")?($=i=>{y(o=>o.filter(a=>a.product.id!==i))},t[6]=$):$=t[6];const U=$;let _;t[7]===Symbol.for("react.memo_cache_sentinel")?(_=(i,o)=>{y(a=>a.map(r=>r.product.id===i?{...r,customPrice:o}:r))},t[7]=_):_=t[7];const V=_;let M;t[8]===Symbol.for("react.memo_cache_sentinel")?(M=(i,o,a,r)=>{et({total:r,cashReceived:i,change:o,charge:a}),j(!1),W(!0)},t[8]=M):M=t[8];const ot=M;let R;t[9]===Symbol.for("react.memo_cache_sentinel")?(R=()=>{y([]),W(!1),P("tunai")},t[9]=R):R=t[9];const X=R;let T;t[10]!==s||t[11]!==c||t[12]!==n?(T=()=>{const i=window.open("","_blank","width=400,height=600"),o=new Date,a=`POS-${o.getFullYear()+String(o.getMonth()+1).padStart(2,"0")+String(o.getDate()).padStart(2,"0")+String(o.getHours()).padStart(2,"0")+String(o.getMinutes()).padStart(2,"0")+String(o.getSeconds()).padStart(2,"0")}`;if(!i)return;const r=s.map(gt).join("");i.document.write(`
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
                    /* lebar struk */
                    margin: 0 12px;
                    /* 🔥 CENTER */
                    padding: 20px 12px 10px; /* 🔥 tambah atas */
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
            <div class="container">
                <div class="center">
                    <div class="logo">
                        <img src="/logo.png" width="50"/>
                    </div>
                    <div>
                        <strong>Central Buah</strong>
                    </div>
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
                    <div>${E(c.charge)}</div>
                </div>

                <div class="divider"></div>

                <div class="item total">
                    <div>Total</div>
                    <div>${E(c.total)}</div>
                </div>

                <div class="item">
                    <div>${n}</div>
                    <div>${E(c.cashReceived)}</div>
                </div>

                <div class="item">
                    <div>Kembali</div>
                    <div>${E(c.change)}</div>
                </div>

                <div class="divider"></div>

                <div class="center">
                    Terima Kasih 🙏
                </div>
            </div>
        </body>
    </html>
    `),i.document.close(),i.focus(),i.print(),X()},t[10]=s,t[11]=c,t[12]=n,t[13]=T):T=t[13];const B=T;let q;t[14]===Symbol.for("react.memo_cache_sentinel")?(q=e.jsx(at,{title:"POS Kasir",children:e.jsx("meta",{name:"robots",content:"noindex"})}),t[14]=q):q=t[14];let D;t[15]===Symbol.for("react.memo_cache_sentinel")?(D=()=>Y("pos"),t[15]=D):D=t[15];const F=`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${x==="pos"?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground hover:bg-muted/80"}`;let m;t[16]!==F?(m=e.jsx("button",{type:"button",onClick:D,className:F,children:"POS"}),t[16]=F,t[17]=m):m=t[17];let z;t[18]===Symbol.for("react.memo_cache_sentinel")?(z=()=>Y("riwayat"),t[18]=z):z=t[18];const G=`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${x==="riwayat"?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground hover:bg-muted/80"}`;let p;t[19]!==G?(p=e.jsx("button",{type:"button",onClick:z,className:G,children:"Riwayat"}),t[19]=G,t[20]=p):p=t[20];let u;t[21]!==m||t[22]!==p?(u=e.jsxs("div",{className:"flex justify-between items-center mb-4 gap-2",children:[m,p]}),t[21]=m,t[22]=p,t[23]=u):u=t[23];let f;t[24]!==x||t[25]!==s||t[26]!==n||t[27]!==b||t[28]!==H||t[29]!==O||t[30]!==L?(f=x==="pos"?e.jsxs("div",{className:"flex md:flex-row flex-col flex-1",children:[e.jsx(mt,{products:H,searchQuery:O,onSearchChange:tt,onProductClick:it}),e.jsx("div",{className:"hidden md:block",children:e.jsx(Z,{cart:s,paymentMethod:n,onPaymentMethodChange:P,onQtyChange:J,onRemove:U,onCustomPrice:V,onPay:()=>j(!0)})}),s.length>0&&e.jsxs("button",{onClick:()=>I(!0),className:"fixed bottom-4 right-4 z-50 md:hidden bg-primary text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2",children:[e.jsx(ut,{className:"size-4"})," ",s.length]}),L&&e.jsxs("div",{className:"fixed inset-0 z-999 md:hidden",children:[e.jsx("div",{className:"absolute inset-0 bg-black/40",onClick:()=>I(!1)}),e.jsx("div",{className:"absolute bottom-0 left-0 right-0 bg-card rounded-t-xl h-[85vh] overflow-hidden animate-in slide-in-from-bottom",children:e.jsx(Z,{cart:s,paymentMethod:n,onPaymentMethodChange:P,onQtyChange:J,onRemove:U,onCustomPrice:V,onPay:()=>{I(!1),j(!0)}})})]})]}):e.jsx(pt,{data:b}),t[24]=x,t[25]=s,t[26]=n,t[27]=b,t[28]=H,t[29]=O,t[30]=L,t[31]=f):f=t[31];let h;t[32]!==s||t[33]!==n||t[34]!==A?(h=A&&e.jsx(lt,{cart:s,paymentMethod:n,onPaymentMethodChange:P,onClose:()=>j(!1),onSuccess:ot}),t[32]=s,t[33]=n,t[34]=A,t[35]=h):h=t[35];let g;t[36]!==s||t[37]!==B||t[38]!==c||t[39]!==n||t[40]!==K?(g=K&&e.jsx(dt,{total:c.total,cashReceived:c.cashReceived,change:c.change,paymentMethod:n,cart:s,onNewTransaction:X,onPrintReceipt:B}),t[36]=s,t[37]=B,t[38]=c,t[39]=n,t[40]=K,t[41]=g):g=t[41];let Q;return t[42]!==u||t[43]!==f||t[44]!==h||t[45]!==g?(Q=e.jsxs(nt,{breadcrumbs:ft,children:[q,e.jsxs("div",{className:"p-4",children:[u,f,h,g]})]}),t[42]=u,t[43]=f,t[44]=h,t[45]=g,t[46]=Q):Q=t[46],Q};function ht(t){return{id:String(t.id),name:t.name,price:Number(t.price),stock:Number(t.stock),unit:t.unit??"pcs",image:t.image??null,image_url:t.image_url??null}}function gt(t){const v=t.customPrice??t.product.price;return`
          <div class="item">
            <div>${t.product.name} x${t.qty}</div>
            <div>${(v*t.qty).toLocaleString("id-ID")}</div>
          </div>
        `}export{de as default};
