import{i as _,r as o,p as J,o as W,m as e,e as w,q as ee,R as te,I as se,g as A,P as ae,h as re,j as R,f as u,H as ie,n as q,b as p,S as I,C as j,c as ne,A as oe,a as de,d as ce}from"./index-CGURfsdm.js";import{B as x,d as P,Z as le,G as me,C as f,a as g,R as ue}from"./badge-CIYAneu-.js";import"./pptxgenjs-ChVesqmX.js";import"./jspdf-DGf9o5QC.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=_("BookOpen",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=_("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he=_("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=_("Key",[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",key:"g0fldk"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}]]);var k="Tabs",[fe]=re(k,[R]),D=R(),[ge,C]=fe(k),O=o.forwardRef((t,a)=>{const{__scopeTabs:r,value:i,onValueChange:n,defaultValue:c,orientation:s="horizontal",dir:m,activationMode:y="automatic",...b}=t,l=J(m),[d,h]=W({prop:i,onChange:n,defaultProp:c??"",caller:k});return e.jsx(ge,{scope:r,baseId:ee(),value:d,onValueChange:h,orientation:s,dir:l,activationMode:y,children:e.jsx(w.div,{dir:l,"data-orientation":s,...b,ref:a})})});O.displayName=k;var L="TabsList",M=o.forwardRef((t,a)=>{const{__scopeTabs:r,loop:i=!0,...n}=t,c=C(L,r),s=D(r);return e.jsx(te,{asChild:!0,...s,orientation:c.orientation,dir:c.dir,loop:i,children:e.jsx(w.div,{role:"tablist","aria-orientation":c.orientation,...n,ref:a})})});M.displayName=L;var $="TabsTrigger",G=o.forwardRef((t,a)=>{const{__scopeTabs:r,value:i,disabled:n=!1,...c}=t,s=C($,r),m=D(r),y=K(s.baseId,i),b=z(s.baseId,i),l=i===s.value;return e.jsx(se,{asChild:!0,...m,focusable:!n,active:l,children:e.jsx(w.button,{type:"button",role:"tab","aria-selected":l,"aria-controls":b,"data-state":l?"active":"inactive","data-disabled":n?"":void 0,disabled:n,id:y,...c,ref:a,onMouseDown:A(t.onMouseDown,d=>{!n&&d.button===0&&d.ctrlKey===!1?s.onValueChange(i):d.preventDefault()}),onKeyDown:A(t.onKeyDown,d=>{[" ","Enter"].includes(d.key)&&s.onValueChange(i)}),onFocus:A(t.onFocus,()=>{const d=s.activationMode!=="manual";!l&&!n&&d&&s.onValueChange(i)})})})});G.displayName=$;var V="TabsContent",F=o.forwardRef((t,a)=>{const{__scopeTabs:r,value:i,forceMount:n,children:c,...s}=t,m=C(V,r),y=K(m.baseId,i),b=z(m.baseId,i),l=i===m.value,d=o.useRef(l);return o.useEffect(()=>{const h=requestAnimationFrame(()=>d.current=!1);return()=>cancelAnimationFrame(h)},[]),e.jsx(ae,{present:n||l,children:({present:h})=>e.jsx(w.div,{"data-state":l?"active":"inactive","data-orientation":m.orientation,role:"tabpanel","aria-labelledby":y,hidden:!h,id:b,tabIndex:0,...s,ref:a,style:{...t.style,animationDuration:d.current?"0s":void 0},children:h&&c})})});F.displayName=V;function K(t,a){return`${t}-trigger-${a}`}function z(t,a){return`${t}-content-${a}`}var ye=O,U=M,H=G,Y=F;const be=ye,X=o.forwardRef(({className:t,...a},r)=>e.jsx(U,{ref:r,className:u("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",t),...a}));X.displayName=U.displayName;const N=o.forwardRef(({className:t,...a},r)=>e.jsx(H,{ref:r,className:u("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",t),...a}));N.displayName=H.displayName;const Q=o.forwardRef(({className:t,...a},r)=>e.jsx(Y,{ref:r,className:u("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",t),...a}));Q.displayName=Y.displayName;const T="https://app.outworx.ai",Z={GET:"bg-emerald-500/15 text-emerald-400 border-emerald-500/30",POST:"bg-blue-500/15 text-blue-400 border-blue-500/30",PUT:"bg-amber-500/15 text-amber-400 border-amber-500/30",DELETE:"bg-red-500/15 text-red-400 border-red-500/30"},v=[{id:"upload-document",method:"POST",path:"/v1/documents",title:"Upload Document",description:"Upload an invoice, receipt, or expense document for AI-powered extraction. Supports PDF, JPEG, PNG, and HEIC formats up to 25 MB.",category:"Documents",requestBody:`{
  "file_name": "invoice-2024-001.pdf",
  "file_type": "application/pdf",
  "file_data": "<base64-encoded-content>",
  "client_id": "c9a2f3e1-...",
  "source": "api"
}`,responseBody:`{
  "id": "d7b4e8f2-1a3c-4d5e-9f6a-7b8c9d0e1f2a",
  "status": "processing",
  "file_name": "invoice-2024-001.pdf",
  "created_at": "2026-03-11T10:30:00Z",
  "estimated_completion": "~15 seconds"
}`,params:[{name:"file_name",type:"string",required:!0,description:"Original file name with extension"},{name:"file_type",type:"string",required:!0,description:"MIME type of the document"},{name:"file_data",type:"string",required:!0,description:"Base64-encoded file content"},{name:"client_id",type:"uuid",required:!1,description:"Associate document with a client"},{name:"source",type:"string",required:!1,description:"Origin identifier (default: 'api')"}]},{id:"get-document",method:"GET",path:"/v1/documents/{id}",title:"Get Document",description:"Retrieve a document's extracted data including vendor name, amounts, line items, dates, and VAT breakdown.",category:"Documents",responseBody:`{
  "id": "d7b4e8f2-...",
  "status": "completed",
  "file_name": "invoice-2024-001.pdf",
  "document_type": "invoice",
  "vendor_name": "Acme Supplies Ltd",
  "amount": 1250.00,
  "currency": "GBP",
  "document_date": "2026-03-01",
  "due_date": "2026-03-31",
  "confidence_score": 0.97,
  "extracted_data": {
    "invoice_number": "INV-2024-001",
    "vat_number": "GB123456789",
    "vat_amount": 250.00,
    "net_amount": 1000.00,
    "line_items": [
      {
        "description": "Office Supplies",
        "quantity": 10,
        "unit_price": 100.00,
        "amount": 1000.00
      }
    ]
  }
}`,params:[{name:"id",type:"uuid",required:!0,description:"Document ID returned from upload"}]},{id:"list-documents",method:"GET",path:"/v1/documents",title:"List Documents",description:"Retrieve a paginated list of documents with optional filtering by status, type, client, and date range.",category:"Documents",responseBody:`{
  "data": [
    {
      "id": "d7b4e8f2-...",
      "file_name": "invoice-2024-001.pdf",
      "status": "completed",
      "vendor_name": "Acme Supplies Ltd",
      "amount": 1250.00,
      "document_date": "2026-03-01",
      "created_at": "2026-03-11T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 25,
    "total": 142,
    "total_pages": 6
  }
}`,params:[{name:"page",type:"integer",required:!1,description:"Page number (default: 1)"},{name:"per_page",type:"integer",required:!1,description:"Results per page (default: 25, max: 100)"},{name:"status",type:"string",required:!1,description:"Filter: pending, processing, completed, failed"},{name:"client_id",type:"uuid",required:!1,description:"Filter by client ID"},{name:"from_date",type:"date",required:!1,description:"Filter documents from this date"},{name:"to_date",type:"date",required:!1,description:"Filter documents to this date"}]},{id:"delete-document",method:"DELETE",path:"/v1/documents/{id}",title:"Delete Document",description:"Permanently delete a document and its extracted data. This action cannot be undone.",category:"Documents",responseBody:`{
  "success": true,
  "message": "Document deleted successfully"
}`,params:[{name:"id",type:"uuid",required:!0,description:"Document ID to delete"}]},{id:"list-suppliers",method:"GET",path:"/v1/suppliers",title:"List Suppliers",description:"Retrieve all auto-detected suppliers with their aggregated spend data, aliases, and default accounting codes.",category:"Suppliers",responseBody:`{
  "data": [
    {
      "id": "s1a2b3c4-...",
      "canonical_name": "Acme Supplies Ltd",
      "aliases": ["ACME SUPPLIES", "Acme Ltd"],
      "document_count": 24,
      "total_amount": 18750.00,
      "default_vat_rate": "20%",
      "default_account_code": "5000",
      "last_document_date": "2026-03-10"
    }
  ],
  "total": 87
}`,params:[{name:"client_id",type:"uuid",required:!1,description:"Filter by client ID"},{name:"search",type:"string",required:!1,description:"Search by supplier name or alias"}]},{id:"push-to-xero",method:"POST",path:"/v1/integrations/xero/push",title:"Push to Xero",description:"Push an extracted document to Xero as a bill or invoice. Requires an active Xero connection.",category:"Integrations",requestBody:`{
  "document_id": "d7b4e8f2-...",
  "account_code": "5000",
  "tracking_categories": {
    "Department": "Marketing"
  }
}`,responseBody:`{
  "success": true,
  "xero_invoice_id": "xi-a1b2c3d4-...",
  "status": "AUTHORISED",
  "invoice_number": "INV-2024-001"
}`,params:[{name:"document_id",type:"uuid",required:!0,description:"Outworx document ID to push"},{name:"account_code",type:"string",required:!1,description:"Override Chart of Accounts code"},{name:"tracking_categories",type:"object",required:!1,description:"Xero tracking category key/value pairs"}]},{id:"push-to-quickbooks",method:"POST",path:"/v1/integrations/quickbooks/push",title:"Push to QuickBooks",description:"Push an extracted document to QuickBooks Online as a Bill or Invoice with automatic vendor/customer matching.",category:"Integrations",requestBody:`{
  "document_id": "d7b4e8f2-...",
  "account_id": "42",
  "class_ref": "Marketing"
}`,responseBody:`{
  "success": true,
  "quickbooks_id": "189",
  "entity_type": "Bill",
  "vendor": "Acme Supplies Ltd"
}`,params:[{name:"document_id",type:"uuid",required:!0,description:"Outworx document ID to push"},{name:"account_id",type:"string",required:!1,description:"Override QuickBooks account"},{name:"class_ref",type:"string",required:!1,description:"QuickBooks class reference"}]},{id:"verify-vat",method:"POST",path:"/v1/vat/verify",title:"Verify VAT Number",description:"Validate a UK or EU VAT number against HMRC and VIES registries in real-time.",category:"VAT",requestBody:`{
  "vat_number": "GB123456789",
  "country_code": "GB"
}`,responseBody:`{
  "valid": true,
  "vat_number": "GB123456789",
  "name": "Acme Supplies Ltd",
  "address": "123 Business Rd, London, EC1A 1BB",
  "country": "United Kingdom",
  "verified_at": "2026-03-11T10:32:00Z"
}`,params:[{name:"vat_number",type:"string",required:!0,description:"VAT registration number"},{name:"country_code",type:"string",required:!1,description:"ISO country code (auto-detected if prefixed)"}]}],ve=[...new Set(v.map(t=>t.category))],E={curl:t=>{const a=t.method==="GET"?"":` -X ${t.method}`,r=t.requestBody?` \\
  -H "Content-Type: application/json" \\
  -d '${t.requestBody.replace(/\n/g,`
  `)}'`:"";return`curl${a} "https://api.outworx.ai${t.path}" \\
  -H "Authorization: Bearer YOUR_API_KEY"${r}`},javascript:t=>{const a=t.requestBody?`,
  {
    method: "${t.method}",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(${t.requestBody.replace(/\n/g,`
    `)})
  }`:`,
  {
    headers: { "Authorization": "Bearer YOUR_API_KEY" }
  }`;return`const response = await fetch(
  "https://api.outworx.ai${t.path}"${a}
);

const data = await response.json();
console.log(data);`},python:t=>{const a=t.requestBody?`

payload = ${t.requestBody}

response = requests.${t.method.toLowerCase()}(url, headers=headers, json=payload)`:`

response = requests.${t.method.toLowerCase()}(url, headers=headers)`;return`import requests

url = "https://api.outworx.ai${t.path}"
headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}${a}

print(response.json())`}};function je({text:t}){const[a,r]=o.useState(!1),i=()=>{navigator.clipboard.writeText(t),r(!0),setTimeout(()=>r(!1),2e3)};return e.jsx("button",{onClick:i,className:"absolute top-3 right-3 p-1.5 rounded-md bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors",children:a?e.jsx(j,{className:"h-3.5 w-3.5 text-success"}):e.jsx(xe,{className:"h-3.5 w-3.5"})})}function B({code:t}){return e.jsxs("div",{className:"relative",children:[e.jsx(je,{text:t}),e.jsx("pre",{className:"bg-[hsl(210,30%,6%)] border border-border rounded-lg p-4 overflow-x-auto text-sm font-mono text-muted-foreground leading-relaxed",children:e.jsx("code",{children:t})})]})}function Ne({endpoint:t}){const[a,r]=o.useState("curl");return e.jsxs(q.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.2},className:"space-y-6",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-3 mb-2",children:[e.jsx(x,{variant:"outline",className:u("font-mono text-xs font-bold px-2 py-0.5 border",Z[t.method]),children:t.method}),e.jsx("code",{className:"text-sm font-mono text-foreground",children:t.path})]}),e.jsx("h2",{className:"text-2xl font-bold font-display mb-2",children:t.title}),e.jsx("p",{className:"text-muted-foreground",children:t.description})]}),t.params&&t.params.length>0&&e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3",children:"Parameters"}),e.jsx("div",{className:"border border-border rounded-lg overflow-hidden",children:e.jsxs("table",{className:"w-full text-sm",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-secondary/50",children:[e.jsx("th",{className:"text-left p-3 font-medium text-muted-foreground",children:"Name"}),e.jsx("th",{className:"text-left p-3 font-medium text-muted-foreground",children:"Type"}),e.jsx("th",{className:"text-left p-3 font-medium text-muted-foreground",children:"Required"}),e.jsx("th",{className:"text-left p-3 font-medium text-muted-foreground",children:"Description"})]})}),e.jsx("tbody",{children:t.params.map((i,n)=>e.jsxs("tr",{className:u(n%2===0?"bg-card":"bg-card/50"),children:[e.jsx("td",{className:"p-3 font-mono text-primary text-xs",children:i.name}),e.jsx("td",{className:"p-3 font-mono text-xs text-muted-foreground",children:i.type}),e.jsx("td",{className:"p-3",children:i.required?e.jsx(x,{variant:"outline",className:"text-xs border-primary/40 text-primary",children:"Required"}):e.jsx("span",{className:"text-xs text-muted-foreground",children:"Optional"})}),e.jsx("td",{className:"p-3 text-muted-foreground",children:i.description})]},i.name))})]})})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3",children:"Request Example"}),e.jsxs(be,{value:a,onValueChange:r,children:[e.jsxs(X,{className:"bg-secondary/50 mb-3",children:[e.jsx(N,{value:"curl",className:"text-xs",children:"cURL"}),e.jsx(N,{value:"javascript",className:"text-xs",children:"JavaScript"}),e.jsx(N,{value:"python",className:"text-xs",children:"Python"})]}),Object.keys(E).map(i=>e.jsx(Q,{value:i,children:e.jsx(B,{code:E[i](t)})},i))]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3",children:"Response"}),e.jsx("div",{className:"flex items-center gap-2 mb-2",children:e.jsx(x,{variant:"outline",className:"bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-xs",children:"200 OK"})}),e.jsx(B,{code:t.responseBody})]})]})}function Te(){const[t,a]=o.useState(v[0].id),[r,i]=o.useState(null),n=v.find(s=>s.id===t),c=r?v.filter(s=>s.category===r):v;return e.jsxs("div",{className:"min-h-screen flex flex-col bg-background",children:[e.jsx(ie,{}),e.jsxs("main",{className:"flex-1",children:[e.jsxs("section",{className:"relative overflow-hidden border-b border-border",children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"}),e.jsx("div",{className:"container mx-auto px-4 py-16 md:py-24 relative",children:e.jsxs(q.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"max-w-3xl",children:[e.jsx("div",{className:"flex items-center gap-2 mb-4",children:e.jsxs(x,{variant:"outline",className:"text-xs border-primary/40 text-primary px-3 py-1",children:[e.jsx(P,{className:"h-3 w-3 mr-1.5"}),"REST API v1"]})}),e.jsxs("h1",{className:"font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight",children:["Build with the"," ",e.jsx("span",{className:"text-primary",children:"Outworx API"})]}),e.jsx("p",{className:"text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl",children:"Integrate AI-powered document extraction, supplier intelligence, and accounting sync directly into your workflows. Process invoices, receipts, and expenses at scale."}),e.jsxs("div",{className:"flex flex-wrap gap-3",children:[e.jsx("a",{href:`${T}/auth`,children:e.jsxs(p,{size:"lg",className:"bg-primary text-primary-foreground hover:bg-primary/90",children:[e.jsx(S,{className:"h-4 w-4 mr-2"}),"Get API Key"]})}),e.jsx("a",{href:"#explorer",children:e.jsxs(p,{size:"lg",variant:"outline",children:[e.jsx(pe,{className:"h-4 w-4 mr-2"}),"Explore Endpoints"]})})]})]})})]}),e.jsx("section",{className:"container mx-auto px-4 py-12",children:e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[{icon:le,title:"AI Extraction",desc:"Extract vendor, amount, dates, line items, and VAT from any document in under 15 seconds."},{icon:I,title:"Enterprise Security",desc:"Bearer token auth, TLS 1.3, RLS-protected data, and full audit logging on every request."},{icon:me,title:"Accounting Sync",desc:"Push extracted data to Xero or QuickBooks with a single API call. Full two-way sync."}].map((s,m)=>e.jsx(q.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:m*.1,duration:.3},children:e.jsx(f,{className:"h-full border-border/60 hover:border-primary/30 transition-colors",children:e.jsxs(g,{className:"p-6",children:[e.jsx("div",{className:"h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4",children:e.jsx(s.icon,{className:"h-5 w-5 text-primary"})}),e.jsx("h3",{className:"font-display font-semibold text-lg mb-2",children:s.title}),e.jsx("p",{className:"text-sm text-muted-foreground",children:s.desc})]})})},s.title))})}),e.jsx("section",{className:"container mx-auto px-4 py-8",children:e.jsx(f,{className:"border-border/60",children:e.jsxs(g,{className:"p-6 md:p-8",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx("div",{className:"h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center",children:e.jsx(I,{className:"h-5 w-5 text-primary"})}),e.jsx("h2",{className:"font-display text-2xl font-bold",children:"Authentication"})]}),e.jsxs("p",{className:"text-muted-foreground mb-6 max-w-2xl",children:["All API requests require a Bearer token in the ",e.jsx("code",{className:"text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs font-mono",children:"Authorization"})," header. Generate your API key from your Outworx dashboard under Settings → API Keys."]}),e.jsx(B,{code:`curl "https://api.outworx.ai/v1/documents" \\
  -H "Authorization: Bearer owx_sk_live_a1b2c3d4e5f6..."
  
# API keys use the prefix:
#   owx_sk_live_  →  Production
#   owx_sk_test_  →  Sandbox (no billing)`}),e.jsxs("div",{className:"mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm",children:[e.jsxs("div",{className:"flex items-start gap-2",children:[e.jsx(j,{className:"h-4 w-4 text-success mt-0.5 shrink-0"}),e.jsxs("span",{className:"text-muted-foreground",children:["Rate limit: ",e.jsx("strong",{className:"text-foreground",children:"1,000 req/min"})]})]}),e.jsxs("div",{className:"flex items-start gap-2",children:[e.jsx(j,{className:"h-4 w-4 text-success mt-0.5 shrink-0"}),e.jsxs("span",{className:"text-muted-foreground",children:["Max upload: ",e.jsx("strong",{className:"text-foreground",children:"25 MB per file"})]})]}),e.jsxs("div",{className:"flex items-start gap-2",children:[e.jsx(j,{className:"h-4 w-4 text-success mt-0.5 shrink-0"}),e.jsxs("span",{className:"text-muted-foreground",children:["Webhooks: ",e.jsx("strong",{className:"text-foreground",children:"Real-time events"})]})]})]})]})})}),e.jsxs("section",{id:"explorer",className:"container mx-auto px-4 py-12",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-8",children:[e.jsx("div",{className:"h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center",children:e.jsx(P,{className:"h-5 w-5 text-primary"})}),e.jsxs("div",{children:[e.jsx("h2",{className:"font-display text-2xl font-bold",children:"Endpoint Explorer"}),e.jsx("p",{className:"text-sm text-muted-foreground",children:"Browse and test every endpoint interactively"})]})]}),e.jsxs("div",{className:"flex gap-2 mb-6 flex-wrap",children:[e.jsx(p,{size:"sm",variant:r===null?"default":"outline",onClick:()=>i(null),className:u(r===null&&"bg-primary text-primary-foreground"),children:"All"}),ve.map(s=>e.jsx(p,{size:"sm",variant:r===s?"default":"outline",onClick:()=>i(s),className:u(r===s&&"bg-primary text-primary-foreground"),children:s},s))]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-6",children:[e.jsx("div",{className:"lg:col-span-4 xl:col-span-3",children:e.jsx("div",{className:"space-y-1 sticky top-20",children:c.map(s=>e.jsxs("button",{onClick:()=>a(s.id),className:u("w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors text-sm",t===s.id?"bg-primary/10 text-foreground":"text-muted-foreground hover:bg-secondary hover:text-foreground"),children:[e.jsx(x,{variant:"outline",className:u("font-mono text-[10px] font-bold px-1.5 py-0 border shrink-0 min-w-[52px] justify-center",Z[s.method]),children:s.method}),e.jsx("span",{className:"truncate",children:s.title}),t===s.id&&e.jsx(ne,{className:"h-3.5 w-3.5 ml-auto shrink-0 text-primary"})]},s.id))})}),e.jsx("div",{className:"lg:col-span-8 xl:col-span-9",children:e.jsx(f,{className:"border-border/60",children:e.jsx(g,{className:"p-6 md:p-8",children:e.jsx(oe,{mode:"wait",children:e.jsx(Ne,{endpoint:n},n.id)})})})})]})]}),e.jsx("section",{className:"container mx-auto px-4 py-12",children:e.jsx(f,{className:"bg-gradient-to-br from-primary/5 to-accent/5 border-border/60",children:e.jsx(g,{className:"p-8 md:p-10",children:e.jsxs("div",{className:"flex flex-col md:flex-row md:items-center md:justify-between gap-6",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[e.jsx(ue,{className:"h-5 w-5 text-primary"}),e.jsx("h3",{className:"font-display text-2xl font-bold",children:"Webhooks"})]}),e.jsx("p",{className:"text-muted-foreground max-w-xl mb-4",children:"Receive real-time notifications when documents finish processing, exceptions are detected, or accounting sync completes. Configure webhook endpoints in your dashboard."}),e.jsx("div",{className:"flex flex-wrap gap-2",children:["document.completed","document.failed","supplier.created","integration.synced","exception.detected"].map(s=>e.jsx(x,{variant:"outline",className:"font-mono text-xs border-primary/30 text-primary",children:s},s))})]}),e.jsx("a",{href:`${T}/auth`,children:e.jsxs(p,{variant:"outline",size:"lg",children:["Configure Webhooks",e.jsx(de,{className:"h-4 w-4 ml-2"})]})})]})})})}),e.jsx("section",{className:"container mx-auto px-4 py-12 pb-20",children:e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsx(f,{className:"border-border/60",children:e.jsxs(g,{className:"p-6",children:[e.jsx("h3",{className:"font-display text-xl font-bold mb-3",children:"Official SDKs"}),e.jsx("p",{className:"text-sm text-muted-foreground mb-4",children:"Coming soon — native client libraries for popular languages."}),e.jsx("div",{className:"space-y-2",children:["JavaScript / TypeScript","Python","Ruby","PHP"].map(s=>e.jsxs("div",{className:"flex items-center gap-2 text-sm text-muted-foreground",children:[e.jsx("div",{className:"h-1.5 w-1.5 rounded-full bg-primary/50"}),s,e.jsx(x,{variant:"outline",className:"text-[10px] ml-auto",children:"Coming Soon"})]},s))})]})}),e.jsx(f,{className:"border-primary/30 bg-primary/5",children:e.jsxs(g,{className:"p-6 flex flex-col justify-between h-full",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"font-display text-xl font-bold mb-3",children:"Ready to Integrate?"}),e.jsx("p",{className:"text-sm text-muted-foreground mb-6",children:"Sign up for an Outworx account to generate your API key. Start with the sandbox environment — no billing until you go live."})]}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx("a",{href:`${T}/auth`,children:e.jsxs(p,{className:"bg-primary text-primary-foreground hover:bg-primary/90",children:[e.jsx(S,{className:"h-4 w-4 mr-2"}),"Get API Key"]})}),e.jsx("a",{href:"mailto:api@outworx.ai",children:e.jsxs(p,{variant:"outline",children:["Contact Sales",e.jsx(he,{className:"h-4 w-4 ml-2"})]})})]})]})})]})})]}),e.jsx(ce,{})]})}export{Te as default};
