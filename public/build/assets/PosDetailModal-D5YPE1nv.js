import{c as Z,j as t}from"./app-YORlgTy9.js";import{f as l}from"./format-tFRIu16p.js";import{X as ee}from"./x-DbINCwNP.js";import{P as te}from"./printer-BTjoY2XW.js";/* empty css            */import"./createLucideIcon-BIqHzbGf.js";function me(s){const e=Z.c(95),{data:i,onClose:a,onEdit:L,onDelete:R}=s,Y=se;let n;e[0]!==a?(n=t.jsx("div",{className:"absolute inset-0 bg-black/40",onClick:a}),e[0]=a,e[1]=n):n=e[1];let B;e[2]===Symbol.for("react.memo_cache_sentinel")?(B=t.jsx("h2",{className:"text-lg font-semibold",children:"Detail Transaksi"}),e[2]=B):B=e[2];let d;e[3]!==i.pos_number?(d=t.jsxs("div",{children:[B,t.jsx("div",{className:"text-sm text-muted-foreground",children:i.pos_number})]}),e[3]=i.pos_number,e[4]=d):d=e[4];let c;e[5]!==i||e[6]!==L?(c=L&&t.jsx("button",{onClick:()=>L(i),className:"rounded-xl border border-border px-3 py-2 text-xs font-semibold hover:bg-muted/50",children:"Edit"}),e[5]=i,e[6]=L,e[7]=c):c=e[7];let r;e[8]!==i||e[9]!==R?(r=R&&t.jsx("button",{onClick:()=>R(i),className:"rounded-xl border border-border px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10",children:"Hapus"}),e[8]=i,e[9]=R,e[10]=r):r=e[10];let E;e[11]===Symbol.for("react.memo_cache_sentinel")?(E=t.jsx(ee,{className:"size-5"}),e[11]=E):E=e[11];let o;e[12]!==a?(o=t.jsx("button",{onClick:a,children:E}),e[12]=a,e[13]=o):o=e[13];let m;e[14]!==c||e[15]!==r||e[16]!==o?(m=t.jsxs("div",{className:"flex items-center gap-2",children:[c,r,o]}),e[14]=c,e[15]=r,e[16]=o,e[17]=m):m=e[17];let x;e[18]!==d||e[19]!==m?(x=t.jsxs("div",{className:"flex justify-between items-center mb-4 gap-2",children:[d,m]}),e[18]=d,e[19]=m,e[20]=x):x=e[20];let O;e[21]===Symbol.for("react.memo_cache_sentinel")?(O=t.jsx("span",{className:"text-xs",children:"No POS:"}),e[21]=O):O=e[21];let f;e[22]!==i.pos_number?(f=t.jsxs("div",{children:[O,t.jsx("div",{className:"font-bold",children:i.pos_number})]}),e[22]=i.pos_number,e[23]=f):f=e[23];let q;e[24]===Symbol.for("react.memo_cache_sentinel")?(q=t.jsx("span",{className:"text-xs",children:"Tanggal:"}),e[24]=q):q=e[24];let h;e[25]!==i.created_at?(h=new Date(i.created_at).toLocaleString("id-ID",{day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"}),e[25]=i.created_at,e[26]=h):h=e[26];let v;e[27]!==h?(v=t.jsxs("div",{children:[q,t.jsx("div",{className:"font-bold",children:h})]}),e[27]=h,e[28]=v):v=e[28];let G;e[29]===Symbol.for("react.memo_cache_sentinel")?(G=t.jsx("span",{className:"text-xs",children:"Metode:"}),e[29]=G):G=e[29];let p;e[30]!==i.payment_method?(p=t.jsxs("div",{children:[G,t.jsx("div",{className:"font-bold",children:i.payment_method})]}),e[30]=i.payment_method,e[31]=p):p=e[31];let H;e[32]===Symbol.for("react.memo_cache_sentinel")?(H=t.jsx("span",{className:"text-xs",children:"Type:"}),e[32]=H):H=e[32];let u;e[33]!==i.type?(u=t.jsxs("div",{children:[H,t.jsx("div",{className:"w-fit px-2 py-1 text-xs rounded bg-primary/10 text-primary capitalize",children:i.type})]}),e[33]=i.type,e[34]=u):u=e[34];let b;e[35]!==f||e[36]!==v||e[37]!==p||e[38]!==u?(b=t.jsxs("div",{className:"text-sm grid grid-cols-2 mb-4",children:[f,v,p,u]}),e[35]=f,e[36]=v,e[37]=p,e[38]=u,e[39]=b):b=e[39];let M;e[40]===Symbol.for("react.memo_cache_sentinel")?(M=t.jsx("thead",{className:"bg-muted/50",children:t.jsxs("tr",{children:[t.jsx("th",{className:"p-2 text-left",children:"Item"}),t.jsx("th",{className:"p-2 text-center",children:"Qty"}),t.jsx("th",{className:"p-2 text-right",children:"Harga"}),t.jsx("th",{className:"p-2 text-right",children:"Diskon"}),t.jsx("th",{className:"p-2 text-right",children:"Total"})]})}),e[40]=M):M=e[40];let j;e[41]!==i.pos_items?(j=i.pos_items.map(ie),e[41]=i.pos_items,e[42]=j):j=e[42];let y;e[43]!==j?(y=t.jsx("div",{className:"border rounded-lg overflow-hidden mb-4 max-h-[40vh] overflow-y-auto",children:t.jsxs("table",{className:"w-full text-sm",children:[M,t.jsx("tbody",{children:j})]})}),e[43]=j,e[44]=y):y=e[44];let Q;e[45]===Symbol.for("react.memo_cache_sentinel")?(Q=t.jsx("span",{children:"Subtotal"}),e[45]=Q):Q=e[45];let g;e[46]!==i.subtotal?(g=l(i.subtotal),e[46]=i.subtotal,e[47]=g):g=e[47];let _;e[48]!==g?(_=t.jsxs("div",{className:"flex justify-between",children:[Q,t.jsx("span",{children:g})]}),e[48]=g,e[49]=_):_=e[49];let N;e[50]!==i.discount?(N=Number(i.discount)>0&&t.jsxs("div",{className:"flex justify-between text-red-500",children:[t.jsx("span",{children:"Diskon Global"}),t.jsxs("span",{children:["- ",l(i.discount)]})]}),e[50]=i.discount,e[51]=N):N=e[51];let w;e[52]!==i.tax?(w=Number(i.tax)>0&&t.jsxs("div",{className:"flex justify-between",children:[t.jsx("span",{children:"Pajak"}),t.jsx("span",{children:l(i.tax)})]}),e[52]=i.tax,e[53]=w):w=e[53];let S;e[54]!==i.charge||e[55]!==i.type?(S=i.type==="delivery"&&t.jsxs("div",{className:"flex justify-between",children:[t.jsx("span",{children:"Biaya Antar"}),t.jsx("span",{children:l(i.charge)})]}),e[54]=i.charge,e[55]=i.type,e[56]=S):S=e[56];let W;e[57]===Symbol.for("react.memo_cache_sentinel")?(W=t.jsx("div",{className:"border-t my-2"}),e[57]=W):W=e[57];let X;e[58]===Symbol.for("react.memo_cache_sentinel")?(X=t.jsx("span",{children:"Total"}),e[58]=X):X=e[58];let $;e[59]!==i.total?($=l(i.total),e[59]=i.total,e[60]=$):$=e[60];let k;e[61]!==$?(k=t.jsxs("div",{className:"flex justify-between font-semibold text-base",children:[X,t.jsx("span",{children:$})]}),e[61]=$,e[62]=k):k=e[62];let F;e[63]===Symbol.for("react.memo_cache_sentinel")?(F=t.jsx("span",{children:"Bayar"}),e[63]=F):F=e[63];let D;e[64]!==i.paid_amount?(D=l(i.paid_amount),e[64]=i.paid_amount,e[65]=D):D=e[65];let z;e[66]!==D?(z=t.jsxs("div",{className:"flex justify-between",children:[F,t.jsx("span",{children:D})]}),e[66]=D,e[67]=z):z=e[67];let J;e[68]===Symbol.for("react.memo_cache_sentinel")?(J=t.jsx("span",{children:"Kembalian"}),e[68]=J):J=e[68];let C;e[69]!==i.change_amount?(C=l(i.change_amount),e[69]=i.change_amount,e[70]=C):C=e[70];let A;e[71]!==C?(A=t.jsxs("div",{className:"flex justify-between font-semibold",children:[J,t.jsx("span",{className:"text-green-600",children:C})]}),e[71]=C,e[72]=A):A=e[72];let P;e[73]!==_||e[74]!==N||e[75]!==w||e[76]!==S||e[77]!==k||e[78]!==z||e[79]!==A?(P=t.jsxs("div",{className:"text-sm space-y-2 border-t pt-3",children:[_,N,w,S,W,k,z,A]}),e[73]=_,e[74]=N,e[75]=w,e[76]=S,e[77]=k,e[78]=z,e[79]=A,e[80]=P):P=e[80];let K;e[81]!==i?(K=()=>Y(i),e[81]=i,e[82]=K):K=e[82];let U;e[83]===Symbol.for("react.memo_cache_sentinel")?(U=t.jsx(te,{size:15}),e[83]=U):U=e[83];let T;e[84]!==K?(T=t.jsxs("button",{onClick:K,className:"mt-6 w-full h-11 rounded-xl bg-accent text-accent-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer",children:[U,"Cetak Struk"]}),e[84]=K,e[85]=T):T=e[85];let I;e[86]!==b||e[87]!==y||e[88]!==P||e[89]!==T||e[90]!==x?(I=t.jsxs("div",{className:"relative bg-background w-full max-w-lg rounded-xl shadow-lg p-5 max-h-screen overflow-y-auto",children:[x,b,y,P,T]}),e[86]=b,e[87]=y,e[88]=P,e[89]=T,e[90]=x,e[91]=I):I=e[91];let V;return e[92]!==n||e[93]!==I?(V=t.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center",children:[n," ",I]}),e[92]=n,e[93]=I,e[94]=V):V=e[94],V}function ie(s){return t.jsxs("tr",{className:"border-t",children:[t.jsx("td",{className:"p-2",children:s.item_name}),t.jsxs("td",{className:"p-2 text-center",children:[s.quantity,s.unit]}),t.jsxs("td",{className:"p-2 text-right",children:["Rp ",s.price.toLocaleString("id-ID")]}),t.jsx("td",{className:"p-2 text-right text-red-500",children:l(s.discount??0)}),t.jsxs("td",{className:"p-2 text-right",children:["Rp ",s.total.toLocaleString("id-ID")]})]},s.id)}function se(s){const e=window.open("","_blank","width=400,height=600");if(!e)return;const i=s.pos_items.map(le).join("");e.document.write(`
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
        `),e.document.close(),e.focus(),e.print()}function le(s){const e=s.price*s.quantity,i=s.discount??0,a=e-i;return`
                <div class="item">
                    <div>
                    ${s.item_name} x${s.quantity}
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
                    <div>${l(a)}</div>
                </div>
                `}export{me as default};
