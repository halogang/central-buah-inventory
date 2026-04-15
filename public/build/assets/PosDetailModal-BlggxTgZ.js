import{c as W,j as t}from"./app-DGnpZM6b.js";import{f as l}from"./format-Dvu9qd1M.js";import{X}from"./x-DAIYagK6.js";import{P as F}from"./printer-DCLliWpI.js";/* empty css            */import"./createLucideIcon-gIZWTUKd.js";function ie(i){const e=W.c(76),{data:s,onClose:a}=i,Q=J;let n;e[0]!==a?(n=t.jsx("div",{className:"absolute inset-0 bg-black/40",onClick:a}),e[0]=a,e[1]=n):n=e[1];let T;e[2]===Symbol.for("react.memo_cache_sentinel")?(T=t.jsx("h2",{className:"text-lg font-semibold",children:"Detail Transaksi"}),e[2]=T):T=e[2];let C;e[3]===Symbol.for("react.memo_cache_sentinel")?(C=t.jsx(X,{className:"size-5"}),e[3]=C):C=e[3];let d;e[4]!==a?(d=t.jsxs("div",{className:"flex justify-between items-center mb-4",children:[T,t.jsx("button",{onClick:a,children:C})]}),e[4]=a,e[5]=d):d=e[5];let I;e[6]===Symbol.for("react.memo_cache_sentinel")?(I=t.jsx("span",{className:"text-xs",children:"No POS:"}),e[6]=I):I=e[6];let c;e[7]!==s.pos_number?(c=t.jsxs("div",{children:[I,t.jsx("div",{className:"font-bold",children:s.pos_number})]}),e[7]=s.pos_number,e[8]=c):c=e[8];let L;e[9]===Symbol.for("react.memo_cache_sentinel")?(L=t.jsx("span",{className:"text-xs",children:"Tanggal:"}),e[9]=L):L=e[9];let r;e[10]!==s.created_at?(r=new Date(s.created_at).toLocaleString("id-ID",{day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"}),e[10]=s.created_at,e[11]=r):r=e[11];let o;e[12]!==r?(o=t.jsxs("div",{children:[L,t.jsx("div",{className:"font-bold",children:r})]}),e[12]=r,e[13]=o):o=e[13];let P;e[14]===Symbol.for("react.memo_cache_sentinel")?(P=t.jsx("span",{className:"text-xs",children:"Metode:"}),e[14]=P):P=e[14];let m;e[15]!==s.payment_method?(m=t.jsxs("div",{children:[P,t.jsx("div",{className:"font-bold",children:s.payment_method})]}),e[15]=s.payment_method,e[16]=m):m=e[16];let R;e[17]===Symbol.for("react.memo_cache_sentinel")?(R=t.jsx("span",{className:"text-xs",children:"Type:"}),e[17]=R):R=e[17];let x;e[18]!==s.type?(x=t.jsxs("div",{children:[R,t.jsx("div",{className:"w-fit px-2 py-1 text-xs rounded bg-primary/10 text-primary capitalize",children:s.type})]}),e[18]=s.type,e[19]=x):x=e[19];let h;e[20]!==m||e[21]!==x||e[22]!==c||e[23]!==o?(h=t.jsxs("div",{className:"text-sm grid grid-cols-2 mb-4",children:[c,o,m,x]}),e[20]=m,e[21]=x,e[22]=c,e[23]=o,e[24]=h):h=e[24];let K;e[25]===Symbol.for("react.memo_cache_sentinel")?(K=t.jsx("thead",{className:"bg-muted/50",children:t.jsxs("tr",{children:[t.jsx("th",{className:"p-2 text-left",children:"Item"}),t.jsx("th",{className:"p-2 text-center",children:"Qty"}),t.jsx("th",{className:"p-2 text-right",children:"Harga"}),t.jsx("th",{className:"p-2 text-right",children:"Total"})]})}),e[25]=K):K=e[25];let f;e[26]!==s.pos_items?(f=s.pos_items.map(G),e[26]=s.pos_items,e[27]=f):f=e[27];let p;e[28]!==f?(p=t.jsx("div",{className:"border rounded-lg overflow-hidden mb-4",children:t.jsxs("table",{className:"w-full text-sm",children:[K,t.jsx("tbody",{children:f})]})}),e[28]=f,e[29]=p):p=e[29];let v;e[30]!==s.subtotal?(v=s.subtotal&&t.jsxs("div",{className:"flex justify-between",children:[t.jsx("span",{className:"text-muted-foreground",children:"Subtotal"}),t.jsx("span",{children:l(s.subtotal)})]}),e[30]=s.subtotal,e[31]=v):v=e[31];let u;e[32]!==s.discount?(u=s.discount&&t.jsxs("div",{className:"flex justify-between text-red-500",children:[t.jsx("span",{children:"Diskon"}),t.jsx("span",{children:l(s.discount)})]}),e[32]=s.discount,e[33]=u):u=e[33];let B;e[34]===Symbol.for("react.memo_cache_sentinel")?(B=t.jsx("span",{className:"text-muted-foreground",children:"Biaya Tambahan"}),e[34]=B):B=e[34];let b;e[35]!==s.charge?(b=l(s.charge),e[35]=s.charge,e[36]=b):b=e[36];let j;e[37]!==b?(j=t.jsxs("div",{className:"flex justify-between",children:[B,t.jsx("span",{children:b})]}),e[37]=b,e[38]=j):j=e[38];let q;e[39]===Symbol.for("react.memo_cache_sentinel")?(q=t.jsx("div",{className:"border-t my-2"}),e[39]=q):q=e[39];let E;e[40]===Symbol.for("react.memo_cache_sentinel")?(E=t.jsx("span",{children:"Total"}),e[40]=E):E=e[40];let g;e[41]!==s.total?(g=l(s.total),e[41]=s.total,e[42]=g):g=e[42];let y;e[43]!==g?(y=t.jsxs("div",{className:"flex justify-between font-semibold text-base",children:[E,t.jsx("span",{children:g})]}),e[43]=g,e[44]=y):y=e[44];let H;e[45]===Symbol.for("react.memo_cache_sentinel")?(H=t.jsx("span",{className:"text-muted-foreground",children:"Bayar"}),e[45]=H):H=e[45];let _;e[46]!==s.paid_amount?(_=l(s.paid_amount),e[46]=s.paid_amount,e[47]=_):_=e[47];let N;e[48]!==_?(N=t.jsxs("div",{className:"flex justify-between",children:[H,t.jsx("span",{children:_})]}),e[48]=_,e[49]=N):N=e[49];let M;e[50]===Symbol.for("react.memo_cache_sentinel")?(M=t.jsx("span",{children:"Kembalian"}),e[50]=M):M=e[50];let w;e[51]!==s.change_amount?(w=l(s.change_amount),e[51]=s.change_amount,e[52]=w):w=e[52];let S;e[53]!==w?(S=t.jsxs("div",{className:"flex justify-between font-semibold",children:[M,t.jsx("span",{className:"text-green-600",children:w})]}),e[53]=w,e[54]=S):S=e[54];let k;e[55]!==v||e[56]!==u||e[57]!==j||e[58]!==y||e[59]!==N||e[60]!==S?(k=t.jsxs("div",{className:"text-sm space-y-2 border-t pt-3",children:[v,u,j,q," ",y,N,S]}),e[55]=v,e[56]=u,e[57]=j,e[58]=y,e[59]=N,e[60]=S,e[61]=k):k=e[61];let $;e[62]!==s?($=()=>Q(s),e[62]=s,e[63]=$):$=e[63];let O;e[64]===Symbol.for("react.memo_cache_sentinel")?(O=t.jsx(F,{size:15}),e[64]=O):O=e[64];let D;e[65]!==$?(D=t.jsxs("button",{onClick:$,className:"mt-6 w-full h-11 rounded-xl bg-accent text-accent-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer",children:[O,"Cetak Struk"]}),e[65]=$,e[66]=D):D=e[66];let z;e[67]!==h||e[68]!==p||e[69]!==k||e[70]!==D||e[71]!==d?(z=t.jsxs("div",{className:"relative bg-background w-full max-w-lg rounded-xl shadow-lg p-5",children:[d,h,p,k,D]}),e[67]=h,e[68]=p,e[69]=k,e[70]=D,e[71]=d,e[72]=z):z=e[72];let A;return e[73]!==n||e[74]!==z?(A=t.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center",children:[n," ",z]}),e[73]=n,e[74]=z,e[75]=A):A=e[75],A}function G(i){return t.jsxs("tr",{className:"border-t",children:[t.jsx("td",{className:"p-2",children:i.item_name}),t.jsxs("td",{className:"p-2 text-center",children:[i.quantity,i.unit]}),t.jsxs("td",{className:"p-2 text-right",children:["Rp ",i.price.toLocaleString("id-ID")]}),t.jsxs("td",{className:"p-2 text-right",children:["Rp ",i.total.toLocaleString("id-ID")]})]},i.id)}function J(i){const e=window.open("","_blank","width=400,height=600");if(!e)return;const s=i.pos_items.map(U).join("");e.document.write(`
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
                        margin: 0 auto;
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

            <body>
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
                        <div>${new Date(i.created_at).toLocaleString("id-ID")}</div>
                        <div>${i.pos_number}</div>
                    </div>

                    <div class="divider"></div>

                    ${s}

                    <div class="divider"></div>
                    <div class="item">
                        <div>biaya tambahan</div>
                        <div>${l(i.charge)}</div>
                    </div>
                    <div class="divider"></div>

                    <div class="item total">
                        <div>Total</div>
                        <div>${l(i.total)}</div>
                    </div>

                    <div class="item">
                        <div>${i.payment_method}</div>
                        <div>${l(i.paid_amount)}</div>
                    </div>

                    <div class="item">
                        <div>Kembali</div>
                        <div>${l(i.change_amount)}</div>
                    </div>

                    <div class="divider"></div>

                    <div class="center">
                        Terima Kasih 🙏
                    </div>
                </div>
            </body>
        </html>
        `),e.document.close(),e.focus(),e.print()}function U(i){return`
                <div class="item">
                    <div>${i.item_name} x${i.quantity}</div>
                    <div>${i.total.toLocaleString("id-ID")}</div>
                </div>
            `}export{ie as default};
