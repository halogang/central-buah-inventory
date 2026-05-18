import{c as Y,j as t}from"./app-jK-mnsUh.js";import{f as l}from"./format-tFRIu16p.js";import{X as Z}from"./x-nEiwoDKm.js";import{P as ee}from"./printer-B5uffxnd.js";/* empty css            */import"./createLucideIcon-DGE6O0PB.js";function oe(s){const e=Y.c(92),{data:i,onClose:a,onEdit:I,onDelete:L}=s,V=ie;let n;e[0]!==a?(n=t.jsx("div",{className:"absolute inset-0 bg-black/40",onClick:a}),e[0]=a,e[1]=n):n=e[1];let R;e[2]===Symbol.for("react.memo_cache_sentinel")?(R=t.jsx("h2",{className:"text-lg font-semibold",children:"Detail Transaksi"}),e[2]=R):R=e[2];let d;e[3]!==i.pos_number?(d=t.jsxs("div",{children:[R,t.jsx("div",{className:"text-sm text-muted-foreground",children:i.pos_number})]}),e[3]=i.pos_number,e[4]=d):d=e[4];let c;e[5]!==i||e[6]!==I?(c=I&&t.jsx("button",{onClick:()=>I(i),className:"rounded-xl border border-border px-3 py-2 text-xs font-semibold hover:bg-muted/50",children:"Edit"}),e[5]=i,e[6]=I,e[7]=c):c=e[7];let r;e[8]!==i||e[9]!==L?(r=L&&t.jsx("button",{onClick:()=>L(i),className:"rounded-xl border border-border px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10",children:"Hapus"}),e[8]=i,e[9]=L,e[10]=r):r=e[10];let B;e[11]===Symbol.for("react.memo_cache_sentinel")?(B=t.jsx(Z,{className:"size-5"}),e[11]=B):B=e[11];let o;e[12]!==a?(o=t.jsx("button",{onClick:a,children:B}),e[12]=a,e[13]=o):o=e[13];let m;e[14]!==c||e[15]!==r||e[16]!==o?(m=t.jsxs("div",{className:"flex items-center gap-2",children:[c,r,o]}),e[14]=c,e[15]=r,e[16]=o,e[17]=m):m=e[17];let x;e[18]!==d||e[19]!==m?(x=t.jsxs("div",{className:"flex justify-between items-center mb-4 gap-2",children:[d,m]}),e[18]=d,e[19]=m,e[20]=x):x=e[20];let E;e[21]===Symbol.for("react.memo_cache_sentinel")?(E=t.jsx("span",{className:"text-xs",children:"No POS:"}),e[21]=E):E=e[21];let f;e[22]!==i.pos_number?(f=t.jsxs("div",{children:[E,t.jsx("div",{className:"font-bold",children:i.pos_number})]}),e[22]=i.pos_number,e[23]=f):f=e[23];let O;e[24]===Symbol.for("react.memo_cache_sentinel")?(O=t.jsx("span",{className:"text-xs",children:"Tanggal:"}),e[24]=O):O=e[24];let h;e[25]!==i.created_at?(h=new Date(i.created_at).toLocaleString("id-ID",{day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"}),e[25]=i.created_at,e[26]=h):h=e[26];let p;e[27]!==h?(p=t.jsxs("div",{children:[O,t.jsx("div",{className:"font-bold",children:h})]}),e[27]=h,e[28]=p):p=e[28];let q;e[29]===Symbol.for("react.memo_cache_sentinel")?(q=t.jsx("span",{className:"text-xs",children:"Metode:"}),e[29]=q):q=e[29];let v;e[30]!==i.payment_method?(v=t.jsxs("div",{children:[q,t.jsx("div",{className:"font-bold",children:i.payment_method})]}),e[30]=i.payment_method,e[31]=v):v=e[31];let H;e[32]===Symbol.for("react.memo_cache_sentinel")?(H=t.jsx("span",{className:"text-xs",children:"Type:"}),e[32]=H):H=e[32];let u;e[33]!==i.type?(u=t.jsxs("div",{children:[H,t.jsx("div",{className:"w-fit px-2 py-1 text-xs rounded bg-primary/10 text-primary capitalize",children:i.type})]}),e[33]=i.type,e[34]=u):u=e[34];let b;e[35]!==f||e[36]!==p||e[37]!==v||e[38]!==u?(b=t.jsxs("div",{className:"text-sm grid grid-cols-2 mb-4",children:[f,p,v,u]}),e[35]=f,e[36]=p,e[37]=v,e[38]=u,e[39]=b):b=e[39];let M;e[40]===Symbol.for("react.memo_cache_sentinel")?(M=t.jsx("thead",{className:"bg-muted/50",children:t.jsxs("tr",{children:[t.jsx("th",{className:"p-2 text-left",children:"Item"}),t.jsx("th",{className:"p-2 text-center",children:"Qty"}),t.jsx("th",{className:"p-2 text-right",children:"Harga"}),t.jsx("th",{className:"p-2 text-right",children:"Diskon"}),t.jsx("th",{className:"p-2 text-right",children:"Total"})]})}),e[40]=M):M=e[40];let j;e[41]!==i.pos_items?(j=i.pos_items.map(te),e[41]=i.pos_items,e[42]=j):j=e[42];let y;e[43]!==j?(y=t.jsx("div",{className:"border rounded-lg overflow-hidden mb-4 max-h-[40vh] overflow-y-auto",children:t.jsxs("table",{className:"w-full text-sm",children:[M,t.jsx("tbody",{children:j})]})}),e[43]=j,e[44]=y):y=e[44];let G;e[45]===Symbol.for("react.memo_cache_sentinel")?(G=t.jsx("span",{children:"Subtotal"}),e[45]=G):G=e[45];let g;e[46]!==i.subtotal?(g=l(i.subtotal),e[46]=i.subtotal,e[47]=g):g=e[47];let _;e[48]!==g?(_=t.jsxs("div",{className:"flex justify-between",children:[G,t.jsx("span",{children:g})]}),e[48]=g,e[49]=_):_=e[49];let N;e[50]!==i.tax?(N=Number(i.tax)>0&&t.jsxs("div",{className:"flex justify-between",children:[t.jsx("span",{children:"Pajak"}),t.jsx("span",{children:l(i.tax)})]}),e[50]=i.tax,e[51]=N):N=e[51];let w;e[52]!==i.charge||e[53]!==i.type?(w=i.type==="delivery"&&t.jsxs("div",{className:"flex justify-between",children:[t.jsx("span",{children:"Biaya Antar"}),t.jsx("span",{children:l(i.charge)})]}),e[52]=i.charge,e[53]=i.type,e[54]=w):w=e[54];let Q;e[55]===Symbol.for("react.memo_cache_sentinel")?(Q=t.jsx("div",{className:"border-t my-2"}),e[55]=Q):Q=e[55];let W;e[56]===Symbol.for("react.memo_cache_sentinel")?(W=t.jsx("span",{children:"Total"}),e[56]=W):W=e[56];let S;e[57]!==i.total?(S=l(i.total),e[57]=i.total,e[58]=S):S=e[58];let $;e[59]!==S?($=t.jsxs("div",{className:"flex justify-between font-semibold text-base",children:[W,t.jsx("span",{children:S})]}),e[59]=S,e[60]=$):$=e[60];let X;e[61]===Symbol.for("react.memo_cache_sentinel")?(X=t.jsx("span",{children:"Bayar"}),e[61]=X):X=e[61];let k;e[62]!==i.paid_amount?(k=l(i.paid_amount),e[62]=i.paid_amount,e[63]=k):k=e[63];let z;e[64]!==k?(z=t.jsxs("div",{className:"flex justify-between",children:[X,t.jsx("span",{children:k})]}),e[64]=k,e[65]=z):z=e[65];let F;e[66]===Symbol.for("react.memo_cache_sentinel")?(F=t.jsx("span",{children:"Kembalian"}),e[66]=F):F=e[66];let D;e[67]!==i.change_amount?(D=l(i.change_amount),e[67]=i.change_amount,e[68]=D):D=e[68];let C;e[69]!==D?(C=t.jsxs("div",{className:"flex justify-between font-semibold",children:[F,t.jsx("span",{className:"text-green-600",children:D})]}),e[69]=D,e[70]=C):C=e[70];let A;e[71]!==_||e[72]!==N||e[73]!==w||e[74]!==$||e[75]!==z||e[76]!==C?(A=t.jsxs("div",{className:"text-sm space-y-2 border-t pt-3",children:[_,N,w,Q,$,z,C]}),e[71]=_,e[72]=N,e[73]=w,e[74]=$,e[75]=z,e[76]=C,e[77]=A):A=e[77];let P;e[78]!==i?(P=()=>V(i),e[78]=i,e[79]=P):P=e[79];let J;e[80]===Symbol.for("react.memo_cache_sentinel")?(J=t.jsx(ee,{size:15}),e[80]=J):J=e[80];let K;e[81]!==P?(K=t.jsxs("button",{onClick:P,className:"mt-6 w-full h-11 rounded-xl bg-accent text-accent-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer",children:[J,"Cetak Struk"]}),e[81]=P,e[82]=K):K=e[82];let T;e[83]!==b||e[84]!==y||e[85]!==A||e[86]!==K||e[87]!==x?(T=t.jsxs("div",{className:"relative bg-background w-full max-w-lg rounded-xl shadow-lg p-5 max-h-screen overflow-y-auto",children:[x,b,y,A,K]}),e[83]=b,e[84]=y,e[85]=A,e[86]=K,e[87]=x,e[88]=T):T=e[88];let U;return e[89]!==n||e[90]!==T?(U=t.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center",children:[n," ",T]}),e[89]=n,e[90]=T,e[91]=U):U=e[91],U}function te(s){return t.jsxs("tr",{className:"border-t",children:[t.jsx("td",{className:"p-2",children:s.item_name}),t.jsxs("td",{className:"p-2 text-center",children:[s.quantity,s.unit]}),t.jsxs("td",{className:"p-2 text-right",children:["Rp ",s.price.toLocaleString("id-ID")]}),t.jsx("td",{className:"p-2 text-right text-red-500",children:l(s.discount??0)}),t.jsxs("td",{className:"p-2 text-right",children:["Rp ",s.total.toLocaleString("id-ID")]})]},s.id)}function ie(s){const e=window.open("","_blank","width=400,height=600");if(!e)return;const i=s.pos_items.map(se).join("");e.document.write(`
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
        `),e.document.close(),e.focus(),e.print()}function se(s){const e=s.price*s.quantity,i=s.discount??0,a=e-i;return`
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
                `}export{oe as default};
