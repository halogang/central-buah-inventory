import{c as Y,j as t}from"./app-Coz60QD8.js";import{f as l}from"./format-Dvu9qd1M.js";import{X as Z}from"./x-B3jnXAEf.js";import{P as ee}from"./printer-BQyZCEPD.js";/* empty css            */import"./createLucideIcon-6JRbEcy3.js";function oe(i){const e=Y.c(91),{data:s,onClose:a,onEdit:R,onDelete:E}=i,V=se;let n;e[0]!==a?(n=t.jsx("div",{className:"absolute inset-0 bg-black/40",onClick:a}),e[0]=a,e[1]=n):n=e[1];let L;e[2]===Symbol.for("react.memo_cache_sentinel")?(L=t.jsx("h2",{className:"text-lg font-semibold",children:"Detail Transaksi"}),e[2]=L):L=e[2];let d;e[3]!==s.pos_number?(d=t.jsxs("div",{children:[L,t.jsx("div",{className:"text-sm text-muted-foreground",children:s.pos_number})]}),e[3]=s.pos_number,e[4]=d):d=e[4];let r;e[5]!==s||e[6]!==R?(r=R&&t.jsx("button",{onClick:()=>R(s),className:"rounded-xl border border-border px-3 py-2 text-xs font-semibold hover:bg-muted/50",children:"Edit"}),e[5]=s,e[6]=R,e[7]=r):r=e[7];let c;e[8]!==s||e[9]!==E?(c=E&&t.jsx("button",{onClick:()=>E(s),className:"rounded-xl border border-border px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10",children:"Hapus"}),e[8]=s,e[9]=E,e[10]=c):c=e[10];let P;e[11]===Symbol.for("react.memo_cache_sentinel")?(P=t.jsx(Z,{className:"size-5"}),e[11]=P):P=e[11];let o;e[12]!==a?(o=t.jsx("button",{onClick:a,children:P}),e[12]=a,e[13]=o):o=e[13];let m;e[14]!==r||e[15]!==c||e[16]!==o?(m=t.jsxs("div",{className:"flex items-center gap-2",children:[r,c,o]}),e[14]=r,e[15]=c,e[16]=o,e[17]=m):m=e[17];let x;e[18]!==d||e[19]!==m?(x=t.jsxs("div",{className:"flex justify-between items-center mb-4 gap-2",children:[d,m]}),e[18]=d,e[19]=m,e[20]=x):x=e[20];let B;e[21]===Symbol.for("react.memo_cache_sentinel")?(B=t.jsx("span",{className:"text-xs",children:"No POS:"}),e[21]=B):B=e[21];let f;e[22]!==s.pos_number?(f=t.jsxs("div",{children:[B,t.jsx("div",{className:"font-bold",children:s.pos_number})]}),e[22]=s.pos_number,e[23]=f):f=e[23];let O;e[24]===Symbol.for("react.memo_cache_sentinel")?(O=t.jsx("span",{className:"text-xs",children:"Tanggal:"}),e[24]=O):O=e[24];let h;e[25]!==s.created_at?(h=new Date(s.created_at).toLocaleString("id-ID",{day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"}),e[25]=s.created_at,e[26]=h):h=e[26];let p;e[27]!==h?(p=t.jsxs("div",{children:[O,t.jsx("div",{className:"font-bold",children:h})]}),e[27]=h,e[28]=p):p=e[28];let H;e[29]===Symbol.for("react.memo_cache_sentinel")?(H=t.jsx("span",{className:"text-xs",children:"Metode:"}),e[29]=H):H=e[29];let u;e[30]!==s.payment_method?(u=t.jsxs("div",{children:[H,t.jsx("div",{className:"font-bold",children:s.payment_method})]}),e[30]=s.payment_method,e[31]=u):u=e[31];let q;e[32]===Symbol.for("react.memo_cache_sentinel")?(q=t.jsx("span",{className:"text-xs",children:"Type:"}),e[32]=q):q=e[32];let v;e[33]!==s.type?(v=t.jsxs("div",{children:[q,t.jsx("div",{className:"w-fit px-2 py-1 text-xs rounded bg-primary/10 text-primary capitalize",children:s.type})]}),e[33]=s.type,e[34]=v):v=e[34];let b;e[35]!==f||e[36]!==p||e[37]!==u||e[38]!==v?(b=t.jsxs("div",{className:"text-sm grid grid-cols-2 mb-4",children:[f,p,u,v]}),e[35]=f,e[36]=p,e[37]=u,e[38]=v,e[39]=b):b=e[39];let M;e[40]===Symbol.for("react.memo_cache_sentinel")?(M=t.jsx("thead",{className:"bg-muted/50",children:t.jsxs("tr",{children:[t.jsx("th",{className:"p-2 text-left",children:"Item"}),t.jsx("th",{className:"p-2 text-center",children:"Qty"}),t.jsx("th",{className:"p-2 text-right",children:"Harga"}),t.jsx("th",{className:"p-2 text-right",children:"Total"})]})}),e[40]=M):M=e[40];let j;e[41]!==s.pos_items?(j=s.pos_items.map(te),e[41]=s.pos_items,e[42]=j):j=e[42];let g;e[43]!==j?(g=t.jsx("div",{className:"border rounded-lg overflow-hidden mb-4 max-h-[40vh] overflow-y-auto",children:t.jsxs("table",{className:"w-full text-sm",children:[M,t.jsx("tbody",{children:j})]})}),e[43]=j,e[44]=g):g=e[44];let y;e[45]!==s.subtotal?(y=s.subtotal&&t.jsxs("div",{className:"flex justify-between",children:[t.jsx("span",{className:"text-muted-foreground",children:"Subtotal"}),t.jsx("span",{children:l(s.subtotal)})]}),e[45]=s.subtotal,e[46]=y):y=e[46];let _;e[47]!==s.discount?(_=s.discount&&t.jsxs("div",{className:"flex justify-between text-red-500",children:[t.jsx("span",{children:"Diskon"}),t.jsx("span",{children:l(s.discount)})]}),e[47]=s.discount,e[48]=_):_=e[48];let G;e[49]===Symbol.for("react.memo_cache_sentinel")?(G=t.jsx("span",{className:"text-muted-foreground",children:"Biaya Tambahan"}),e[49]=G):G=e[49];let N;e[50]!==s.charge?(N=l(s.charge),e[50]=s.charge,e[51]=N):N=e[51];let w;e[52]!==N?(w=t.jsxs("div",{className:"flex justify-between",children:[G,t.jsx("span",{children:N})]}),e[52]=N,e[53]=w):w=e[53];let Q;e[54]===Symbol.for("react.memo_cache_sentinel")?(Q=t.jsx("div",{className:"border-t my-2"}),e[54]=Q):Q=e[54];let W;e[55]===Symbol.for("react.memo_cache_sentinel")?(W=t.jsx("span",{children:"Total"}),e[55]=W):W=e[55];let S;e[56]!==s.total?(S=l(s.total),e[56]=s.total,e[57]=S):S=e[57];let k;e[58]!==S?(k=t.jsxs("div",{className:"flex justify-between font-semibold text-base",children:[W,t.jsx("span",{children:S})]}),e[58]=S,e[59]=k):k=e[59];let X;e[60]===Symbol.for("react.memo_cache_sentinel")?(X=t.jsx("span",{className:"text-muted-foreground",children:"Bayar"}),e[60]=X):X=e[60];let $;e[61]!==s.paid_amount?($=l(s.paid_amount),e[61]=s.paid_amount,e[62]=$):$=e[62];let z;e[63]!==$?(z=t.jsxs("div",{className:"flex justify-between",children:[X,t.jsx("span",{children:$})]}),e[63]=$,e[64]=z):z=e[64];let F;e[65]===Symbol.for("react.memo_cache_sentinel")?(F=t.jsx("span",{children:"Kembalian"}),e[65]=F):F=e[65];let D;e[66]!==s.change_amount?(D=l(s.change_amount),e[66]=s.change_amount,e[67]=D):D=e[67];let C;e[68]!==D?(C=t.jsxs("div",{className:"flex justify-between font-semibold",children:[F,t.jsx("span",{className:"text-green-600",children:D})]}),e[68]=D,e[69]=C):C=e[69];let T;e[70]!==y||e[71]!==_||e[72]!==w||e[73]!==k||e[74]!==z||e[75]!==C?(T=t.jsxs("div",{className:"text-sm space-y-2 border-t pt-3",children:[y,_,w,Q," ",k,z,C]}),e[70]=y,e[71]=_,e[72]=w,e[73]=k,e[74]=z,e[75]=C,e[76]=T):T=e[76];let K;e[77]!==s?(K=()=>V(s),e[77]=s,e[78]=K):K=e[78];let J;e[79]===Symbol.for("react.memo_cache_sentinel")?(J=t.jsx(ee,{size:15}),e[79]=J):J=e[79];let A;e[80]!==K?(A=t.jsxs("button",{onClick:K,className:"mt-6 w-full h-11 rounded-xl bg-accent text-accent-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer",children:[J,"Cetak Struk"]}),e[80]=K,e[81]=A):A=e[81];let I;e[82]!==b||e[83]!==g||e[84]!==T||e[85]!==A||e[86]!==x?(I=t.jsxs("div",{className:"relative bg-background w-full max-w-lg rounded-xl shadow-lg p-5 max-h-screen overflow-y-auto",children:[x,b,g,T,A]}),e[82]=b,e[83]=g,e[84]=T,e[85]=A,e[86]=x,e[87]=I):I=e[87];let U;return e[88]!==n||e[89]!==I?(U=t.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center",children:[n," ",I]}),e[88]=n,e[89]=I,e[90]=U):U=e[90],U}function te(i){return t.jsxs("tr",{className:"border-t",children:[t.jsx("td",{className:"p-2",children:i.item_name}),t.jsxs("td",{className:"p-2 text-center",children:[i.quantity,i.unit]}),t.jsxs("td",{className:"p-2 text-right",children:["Rp ",i.price.toLocaleString("id-ID")]}),t.jsxs("td",{className:"p-2 text-right",children:["Rp ",i.total.toLocaleString("id-ID")]})]},i.id)}function se(i){const e=window.open("","_blank","width=400,height=600");if(!e)return;const s=i.pos_items.map(ie).join("");e.document.write(`
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

                    <div class="center" style="font-size: 38px">
                        Terima Kasih 🙏
                    </div>
                </div>
            </body>
        </html>
        `),e.document.close(),e.focus(),e.print()}function ie(i){return`
                <div class="item">
                    <div>${i.item_name} x${i.quantity}</div>
                    <div>${l(i.total)}</div>
                </div>
            `}export{oe as default};
