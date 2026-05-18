import{c as Z,j as t}from"./app-DyzcgKkz.js";import{f as l,a as ee}from"./format-tFRIu16p.js";import{X as te}from"./x-BMy09Cjp.js";import{P as ie}from"./printer--yw5DBTB.js";/* empty css            */import"./createLucideIcon-Bxgl0CYU.js";function xe(s){const e=Z.c(95),{data:i,onClose:a,onEdit:n,onDelete:R}=s,Y=le;let d;e[0]!==a?(d=t.jsx("div",{className:"absolute inset-0 bg-black/40",onClick:a}),e[0]=a,e[1]=d):d=e[1];let B;e[2]===Symbol.for("react.memo_cache_sentinel")?(B=t.jsx("h2",{className:"text-lg font-semibold",children:"Detail Transaksi"}),e[2]=B):B=e[2];let c;e[3]!==i.pos_number?(c=t.jsxs("div",{children:[B,t.jsx("div",{className:"text-sm text-muted-foreground",children:i.pos_number})]}),e[3]=i.pos_number,e[4]=c):c=e[4];let r;e[5]!==i||e[6]!==n?(r=n&&t.jsx("button",{onClick:()=>n(i),className:"rounded-xl border border-border px-3 py-2 text-xs font-semibold hover:bg-muted/50",children:"Edit"}),e[5]=i,e[6]=n,e[7]=r):r=e[7];let o;e[8]!==i||e[9]!==R?(o=R&&t.jsx("button",{onClick:()=>R(i),className:"rounded-xl border border-border px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10",children:"Hapus"}),e[8]=i,e[9]=R,e[10]=o):o=e[10];let E;e[11]===Symbol.for("react.memo_cache_sentinel")?(E=t.jsx(te,{className:"size-5"}),e[11]=E):E=e[11];let m;e[12]!==a?(m=t.jsx("button",{onClick:a,children:E}),e[12]=a,e[13]=m):m=e[13];let x;e[14]!==r||e[15]!==o||e[16]!==m?(x=t.jsxs("div",{className:"flex items-center gap-2",children:[r,o,m]}),e[14]=r,e[15]=o,e[16]=m,e[17]=x):x=e[17];let f;e[18]!==c||e[19]!==x?(f=t.jsxs("div",{className:"flex justify-between items-center mb-4 gap-2",children:[c,x]}),e[18]=c,e[19]=x,e[20]=f):f=e[20];let q;e[21]===Symbol.for("react.memo_cache_sentinel")?(q=t.jsx("span",{className:"text-xs",children:"No POS:"}),e[21]=q):q=e[21];let h;e[22]!==i.pos_number?(h=t.jsxs("div",{children:[q,t.jsx("div",{className:"font-bold",children:i.pos_number})]}),e[22]=i.pos_number,e[23]=h):h=e[23];let O;e[24]===Symbol.for("react.memo_cache_sentinel")?(O=t.jsx("span",{className:"text-xs",children:"Tanggal:"}),e[24]=O):O=e[24];let v;e[25]!==i.created_at?(v=new Date(i.created_at).toLocaleString("id-ID",{day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"}),e[25]=i.created_at,e[26]=v):v=e[26];let p;e[27]!==v?(p=t.jsxs("div",{children:[O,t.jsx("div",{className:"font-bold",children:v})]}),e[27]=v,e[28]=p):p=e[28];let G;e[29]===Symbol.for("react.memo_cache_sentinel")?(G=t.jsx("span",{className:"text-xs",children:"Metode:"}),e[29]=G):G=e[29];let u;e[30]!==i.payment_method?(u=t.jsxs("div",{children:[G,t.jsx("div",{className:"font-bold",children:i.payment_method})]}),e[30]=i.payment_method,e[31]=u):u=e[31];let H;e[32]===Symbol.for("react.memo_cache_sentinel")?(H=t.jsx("span",{className:"text-xs",children:"Type:"}),e[32]=H):H=e[32];let b;e[33]!==i.type?(b=t.jsxs("div",{children:[H,t.jsx("div",{className:"w-fit px-2 py-1 text-xs rounded bg-primary/10 text-primary capitalize",children:i.type})]}),e[33]=i.type,e[34]=b):b=e[34];let j;e[35]!==h||e[36]!==p||e[37]!==u||e[38]!==b?(j=t.jsxs("div",{className:"text-sm grid grid-cols-2 mb-4",children:[h,p,u,b]}),e[35]=h,e[36]=p,e[37]=u,e[38]=b,e[39]=j):j=e[39];let M;e[40]===Symbol.for("react.memo_cache_sentinel")?(M=t.jsx("thead",{className:"bg-muted/50",children:t.jsxs("tr",{children:[t.jsx("th",{className:"p-2 text-left",children:"Item"}),t.jsx("th",{className:"p-2 text-center",children:"Qty"}),t.jsx("th",{className:"p-2 text-right",children:"Harga"}),t.jsx("th",{className:"p-2 text-right",children:"Diskon"}),t.jsx("th",{className:"p-2 text-right",children:"Total"})]})}),e[40]=M):M=e[40];let y;e[41]!==i.pos_items?(y=i.pos_items.map(se),e[41]=i.pos_items,e[42]=y):y=e[42];let g;e[43]!==y?(g=t.jsx("div",{className:"border rounded-lg overflow-hidden mb-4 max-h-[40vh] overflow-y-auto",children:t.jsxs("table",{className:"w-full text-sm",children:[M,t.jsx("tbody",{children:y})]})}),e[43]=y,e[44]=g):g=e[44];let Q;e[45]===Symbol.for("react.memo_cache_sentinel")?(Q=t.jsx("span",{children:"Subtotal"}),e[45]=Q):Q=e[45];let _;e[46]!==i.subtotal?(_=l(i.subtotal),e[46]=i.subtotal,e[47]=_):_=e[47];let N;e[48]!==_?(N=t.jsxs("div",{className:"flex justify-between",children:[Q,t.jsx("span",{children:_})]}),e[48]=_,e[49]=N):N=e[49];let w;e[50]!==i.discount?(w=Number(i.discount)>0&&t.jsxs("div",{className:"flex justify-between text-red-500",children:[t.jsx("span",{children:"Diskon Global"}),t.jsxs("span",{children:["- ",l(i.discount)]})]}),e[50]=i.discount,e[51]=w):w=e[51];let S;e[52]!==i.tax?(S=Number(i.tax)>0&&t.jsxs("div",{className:"flex justify-between",children:[t.jsx("span",{children:"Pajak"}),t.jsx("span",{children:l(i.tax)})]}),e[52]=i.tax,e[53]=S):S=e[53];let $;e[54]!==i.charge||e[55]!==i.type?($=i.type==="delivery"&&t.jsxs("div",{className:"flex justify-between",children:[t.jsx("span",{children:"Biaya Antar"}),t.jsx("span",{children:l(i.charge)})]}),e[54]=i.charge,e[55]=i.type,e[56]=$):$=e[56];let W;e[57]===Symbol.for("react.memo_cache_sentinel")?(W=t.jsx("div",{className:"border-t my-2"}),e[57]=W):W=e[57];let X;e[58]===Symbol.for("react.memo_cache_sentinel")?(X=t.jsx("span",{children:"Total"}),e[58]=X):X=e[58];let k;e[59]!==i.total?(k=l(i.total),e[59]=i.total,e[60]=k):k=e[60];let D;e[61]!==k?(D=t.jsxs("div",{className:"flex justify-between font-semibold text-base",children:[X,t.jsx("span",{children:k})]}),e[61]=k,e[62]=D):D=e[62];let F;e[63]===Symbol.for("react.memo_cache_sentinel")?(F=t.jsx("span",{children:"Bayar"}),e[63]=F):F=e[63];let z;e[64]!==i.paid_amount?(z=l(i.paid_amount),e[64]=i.paid_amount,e[65]=z):z=e[65];let P;e[66]!==z?(P=t.jsxs("div",{className:"flex justify-between",children:[F,t.jsx("span",{children:z})]}),e[66]=z,e[67]=P):P=e[67];let J;e[68]===Symbol.for("react.memo_cache_sentinel")?(J=t.jsx("span",{children:"Kembalian"}),e[68]=J):J=e[68];let C;e[69]!==i.change_amount?(C=l(i.change_amount),e[69]=i.change_amount,e[70]=C):C=e[70];let A;e[71]!==C?(A=t.jsxs("div",{className:"flex justify-between font-semibold",children:[J,t.jsx("span",{className:"text-green-600",children:C})]}),e[71]=C,e[72]=A):A=e[72];let K;e[73]!==N||e[74]!==w||e[75]!==S||e[76]!==$||e[77]!==D||e[78]!==P||e[79]!==A?(K=t.jsxs("div",{className:"text-sm space-y-2 border-t pt-3",children:[N,w,S,$,W,D,P,A]}),e[73]=N,e[74]=w,e[75]=S,e[76]=$,e[77]=D,e[78]=P,e[79]=A,e[80]=K):K=e[80];let T;e[81]!==i?(T=()=>Y(i),e[81]=i,e[82]=T):T=e[82];let U;e[83]===Symbol.for("react.memo_cache_sentinel")?(U=t.jsx(ie,{size:15}),e[83]=U):U=e[83];let I;e[84]!==T?(I=t.jsxs("button",{onClick:T,className:"mt-6 w-full h-11 rounded-xl bg-accent text-accent-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer",children:[U,"Cetak Struk"]}),e[84]=T,e[85]=I):I=e[85];let L;e[86]!==j||e[87]!==g||e[88]!==K||e[89]!==I||e[90]!==f?(L=t.jsxs("div",{className:"relative bg-background w-full max-w-lg rounded-xl shadow-lg p-5 max-h-screen overflow-y-auto",children:[f,j,g,K,I]}),e[86]=j,e[87]=g,e[88]=K,e[89]=I,e[90]=f,e[91]=L):L=e[91];let V;return e[92]!==d||e[93]!==L?(V=t.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center",children:[d," ",L]}),e[92]=d,e[93]=L,e[94]=V):V=e[94],V}function se(s){return t.jsxs("tr",{className:"border-t",children:[t.jsx("td",{className:"p-2",children:s.item_name}),t.jsxs("td",{className:"p-2 text-center",children:[s.quantity,s.unit]}),t.jsxs("td",{className:"p-2 text-right",children:["Rp ",s.price.toLocaleString("id-ID")]}),t.jsx("td",{className:"p-2 text-right text-red-500",children:l(s.discount??0)}),t.jsxs("td",{className:"p-2 text-right",children:["Rp ",s.total.toLocaleString("id-ID")]})]},s.id)}function le(s){const e=window.open("","_blank","width=400,height=600");if(!e)return;const i=s.pos_items.map(ae).join("");e.document.write(`
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

                    .sub-item {
                        display:flex;
                        justify-content:space-between;
                        font-size:30px;
                        margin:4px 0 4px 30px;
                    }

                    .final {
                        font-weight:bold;
                    }
                </style>
            </head>

            <body>
                <div class="container">
                    <div class="center">
                        <div class="logo">
                            <img src="/small_logo.jpg" />
                        </div>
                        <div class="title">Central Buah</div>
                        <div class="subtitle">POS Kasir</div>
                    </div>

                    <div class="meta">
                        <div>${new Date(s.created_at).toLocaleString("id-ID")}</div>
                        <div>${s.pos_number}</div>
                    </div>

                    <div class="divider"></div>

                    ${i}

                    <div class="divider"></div>

                    ${Number(s.discount)>0?`
                        <div class="item">
                        <div>Diskon Global</div>
                        <div>- ${l(s.discount)}</div>
                        </div>
                    `:""}

                    ${Number(s.tax)>0?`
                        <div class="item">
                        <div>Pajak</div>
                        <div>${l(s.tax)}</div>
                        </div>
                    `:""}

                    ${s.type==="delivery"?`
                        <div class="item">
                        <div>Biaya Antar</div>
                        <div>${l(s.charge)}</div>
                        </div>
                    `:""}

                    <div class="divider"></div>

                    <div class="item total">
                        <div>Total</div>
                        <div>${l(s.total)}</div>
                    </div>

                    <div class="item">
                        <div>${s.payment_method}</div>
                        <div>${l(s.paid_amount)}</div>
                    </div>

                    <div class="item">
                        <div>Kembali</div>
                        <div>${l(s.change_amount)}</div>
                    </div>

                    <div class="divider"></div>

                    <div class="center" style="font-size: 38px">
                        Terima Kasih 🙏
                    </div>
                </div>
            </body>
        </html>
        `),e.document.close(),e.focus(),e.print()}function ae(s){const e=s.price*s.quantity,i=s.discount??0,n=Math.max(s.price-i,0)*s.quantity;return`
                <div class="item">
                    <div>
                        ${s.item_name} x${ee(s.quantity)}
                    </div>
                    <div>
                        ${l(e)}
                    </div>
                </div>

                ${i>0?`
                    <div class="sub-item discount">
                        <div>diskon item</div>
                        <div>- ${l(i)}</div>
                    </div>
                    `:""}

                <div class="sub-item final">
                    <div>subtotal</div>
                    <div>${l(n)}</div>
                </div>
                `}export{xe as default};
