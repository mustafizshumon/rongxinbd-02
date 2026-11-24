/* Local compatibility runtime: no SolidJS/CDN imports required to render this static corporate site. */
const __signalValues=[];
let __signalCursor=0, __root=null, __component=null, __rendering=false, __mounted=false;
const __mountCallbacks=[];
function createSignal(initial){
  const index=__signalCursor++;
  if(!(index in __signalValues)) __signalValues[index]=initial;
  const getter=()=>__signalValues[index];
  const setter=(next)=>{__signalValues[index]=typeof next==="function"?next(__signalValues[index]):next; if(!__rendering) __rerender();};
  return [getter,setter];
}
function onMount(fn){__mountCallbacks.push(fn);}
function Show(props){return props.when?props.children:null;}
function h(tag,props={},...children){return {__vnode:true,tag,props:props||{},children:children.flat()};}
function __value(v){return typeof v==="function"?v():v;}
function __append(parent,node){
  if(node===null||node===undefined||node===false||node===true)return;
  if(Array.isArray(node)){node.forEach(n=>__append(parent,n));return;}
  if(typeof node==="string"||typeof node==="number"){parent.appendChild(document.createTextNode(String(node)));return;}
  if(!node||!node.__vnode)return;
  if(node.tag===Show){if(__value(node.props.when)) __append(parent,node.children);return;}
  if(typeof node.tag==="function"){__append(parent,node.tag({...node.props,children:node.children}));return;}
  const el=document.createElement(node.tag);
  for(const [raw,value] of Object.entries(node.props||{})){
    if(raw==="children"||raw==="ref"||value===undefined||value===null)continue;
    const v=(raw.startsWith("on") && typeof value==="function") ? value : __value(value);
    if(raw.startsWith("on")&&typeof v==="function"){
      el.addEventListener(raw.slice(2).toLowerCase(),v);
    }else if(raw==="className"||raw==="class"){
      el.setAttribute("class",v||"");
    }else if(raw==="value" && (node.tag==="input"||node.tag==="textarea"||node.tag==="select")){
      el.value=v==null?"":v;
    }else if(raw==="disabled"||raw==="required"||raw==="multiple"||raw==="checked"){
      if(v)el.setAttribute(raw,"");
    }else if(raw==="htmlFor"){
      el.setAttribute("for",v);
    }else if(raw==="tabIndex"){
      el.setAttribute("tabindex",v);
    }else if(raw==="style"&&typeof v==="object"){
      for(const [k,val] of Object.entries(v)){el.style.setProperty(k.replace(/[A-Z]/g,m=>"-"+m.toLowerCase()),val);}
    }else if(typeof v==="object" && raw!=="dataset"){
      try{el.setAttribute(raw,JSON.stringify(v));}catch{}
    }else{
      el.setAttribute(raw,String(v));
    }
  }
  node.children.forEach(child=>__append(el,child));
  parent.appendChild(el);
}
function __renderNow(){
  if(!__root||!__component)return;
  const active=document.activeElement;
  let activeIndex=-1, selection=null;
  if(active&&__root.contains(active)&&(active.matches("input,textarea,select"))){
    activeIndex=[...__root.querySelectorAll("input,textarea,select")].indexOf(active);
    try{selection=[active.selectionStart,active.selectionEnd];}catch{}
  }
  __rendering=true; __signalCursor=0; __root.replaceChildren();
  try{__append(__root,__component());}catch(err){
    console.error("Rongxin render error:",err);
    const panel=document.createElement("div");panel.className="runtime-error";
    panel.textContent="The website could not render. Please refresh and check the browser console.";
    __root.appendChild(panel);
  }
  __rendering=false;
  if(activeIndex>=0){const fields=__root.querySelectorAll("input,textarea,select");const target=fields[activeIndex];if(target){target.focus({preventScroll:true});if(selection&&target.setSelectionRange){try{target.setSelectionRange(...selection);}catch{}}}}
  if(!__mounted){__mounted=true;__mountCallbacks.splice(0).forEach(fn=>{try{fn();}catch(e){console.warn(e);}});}
}
function __rerender(){__renderNow();}
function render(component,root){__component=component;__root=root;__renderNow();return ()=>{__root.replaceChildren();};}


const A = (tag, props={}, ...children) => h(tag, props, ...children.flat());
const COMPANY_EMAIL = ""; // Add the company's verified business email before publishing.
const products = [
  {name:"Men’s Denim",sub:"Jeans · Jackets · Shirts",image:"https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85",tag:"DENIM"},
  {name:"Men’s Non-Denim",sub:"Chinos · Trousers · Casualwear",image:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",tag:"WOVEN"},
  {name:"Denim & Woven Shirts",sub:"Long sleeve · Casual · Smart",image:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85",tag:"SHIRTS"},
  {name:"Knitwear",sub:"T-Shirts · Polo · Sweatshirts",image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",tag:"KNIT"},
  {name:"Ladies Collection",sub:"Denim · Shorts · Trousers",image:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85",tag:"LADIES"},
  {name:"Kids Collection",sub:"Everyday · Denim · Knit",image:"https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=85",tag:"KIDS"}
];
const services = [
  ["globe-2","Global Sourcing","A responsive supplier network for the right product, price and production route."],
  ["layers-3","Product Development","From concept and tech pack to material selection, sampling and fit approval."],
  ["badge-check","Quality Assurance","Quality checkpoints and production follow-up aligned with buyer requirements."],
  ["factory","Factory Coordination","Production planning, capacity coordination and transparent communication."],
  ["package-check","Compliance Support","Responsible sourcing and documentation coordination across the supply chain."],
  ["truck","Shipment Coordination","Packing, shipment documentation and delivery milestone follow-up."]
];
const capabilities = ["Product & supplier sourcing","Fabric, trims and accessories","Sample development & approvals","Merchandising & order follow-up","Inline and final quality coordination","Shipment & export documentation support"];
function icon(name, cls="icon-fallback") {
  const glyphs={"map-pin":"⌖","mail":"✉","globe":"◎","globe-2":"◎","layers-3":"▤","badge-check":"✓","factory":"▦","package-check":"✓","truck":"⇢","handshake":"↔","shield-check":"✓","leaf":"❧","arrow-up-right":"↗","arrow-right":"→","check-circle-2":"✓","target":"◎","network":"⌘","check-circle":"✓","x":"×","menu":"☰","send":"➤"};
  return A("span",{class:(cls||"")+" icon-fallback","aria-hidden":"true"},glyphs[name]||"•");
}
function App(){
  const [menu,setMenu]=createSignal(false), [filter,setFilter]=createSignal("ALL"), [modal,setModal]=createSignal(false), [sent,setSent]=createSignal(false);
  const [form,setForm]=createSignal({name:"",email:"",company:"",product:"",message:""});
  const shown=()=>products.filter(p=>filter()==="ALL" || p.tag===filter());
  const update=(key,value)=>setForm(v=>({...v,[key]:value}));
  const go=(id)=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setMenu(false)};
  onMount(()=>{if(window.lucide)window.lucide.createIcons();});
  const openInquiry=(product="")=>{update("product",product);setSent(false);setModal(true)};
  const submit=(e)=>{e.preventDefault();if(!COMPANY_EMAIL){alert("Please configure the company email address in app.jsx before using this inquiry form.");return;}const f=form();const body=`Name: ${f.name}%0D%0ACompany: ${f.company}%0D%0AEmail: ${f.email}%0D%0AProduct: ${f.product}%0D%0A%0D%0A${f.message}`;window.location.href=`mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent("Business Inquiry — Rongxin International")}&body=${body}`;setSent(true)};
  return A("div",{class:"min-h-screen overflow-hidden"},
    A("div",{class:"topline"},A("div",{class:"container-wide flex justify-between items-center py-2 text-xs text-white/80"},
      A("span",{class:"flex items-center gap-2"},icon("map-pin","w-3.5 h-3.5 text-gold"),"Uttara, Dhaka, Bangladesh"),
      A("div",{class:"hidden sm:flex gap-5"},A("a",{href:`mailto:${COMPANY_EMAIL}`},"Official email to be confirmed"),A("span",{},"Global Apparel Sourcing"))
    )),
    A("header",{class:"site-header sticky top-0 z-40 bg-white/95 backdrop-blur-xl"},
      A("div",{class:"container-wide nav-wrap"},
        A("a",{href:"#home",class:"brand",onClick:e=>{e.preventDefault();go("home")}},
          A("img",{src:"./rongxin-mark.png",alt:"Rongxin emblem",class:"brand-mark"}),
          A("span",{class:"brand-name"},A("strong",{},"RONGXIN"),A("small",{},"INTERNATIONAL TRADING"),A("small",{},"COMPANY LIMITED"))
        ),
        A("nav",{class:()=>`desktop-nav ${menu()?"is-open":""}`},...["Home","About","Products","Services","Capabilities","Network","Quality","Markets","Resources","Why Us","Contact"].map((n,i)=>{const ids=["home","about","products","services","capabilities","network","quality","markets","resources","why-us","contact"];return A("a",{href:"#"+ids[i],class:i===0?"active":"",onClick:e=>{e.preventDefault();go(ids[i])}},n)})),
        A("div",{class:"nav-actions"},A("button",{class:"btn btn-primary nav-cta",onClick:()=>openInquiry()},icon("mail","w-4 h-4")," Inquiry / RFQ"),A("button",{class:"menu-toggle", "aria-label":"Toggle navigation",onClick:()=>setMenu(!menu())},icon(menu()?"x":"menu","w-6 h-6")))
      )
    ),
    A("main",{},
      A("section",{id:"home",class:"hero-section"},
        A("div",{class:"hero-orb orb-one"}),A("div",{class:"hero-orb orb-two"}),
        A("div",{class:"container-wide hero-grid"},
          A("div",{class:"hero-copy"},
            A("div",{class:"eyebrow eyebrow-light"},A("span",{class:"eyebrow-line"}),"BANGLADESH · GLOBAL REACH"),
            A("h1",{},"Connecting ",A("em",{},"Ideas")," to ",A("em",{},"Apparel")," Excellence."),
            A("p",{class:"hero-lead"},"Your trusted partner in global apparel sourcing — bringing together product development, responsible manufacturing coordination and dependable delivery."),
            A("div",{class:"hero-points"},...["Sourcing & Development","Quality Assurance","Responsible Supply Chain"].map((x,i)=>A("span",{},icon(["handshake","shield-check","leaf"][i],"w-4 h-4 text-gold"),x))),
            A("div",{class:"hero-actions"},A("button",{class:"btn btn-gold",onClick:()=>go("products")},"Explore Products",icon("arrow-up-right","w-4 h-4")),A("button",{class:"btn btn-outline",onClick:()=>openInquiry()},"Talk to Our Team",icon("arrow-right","w-4 h-4"))),
            A("div",{class:"hero-note"},A("span",{class:"note-dot"}),"A sourcing partner built around clarity, quality and long-term relationships")
          ),
          A("div",{class:"hero-visual"},
            A("div",{class:"hero-photo-main",style:{"background-image":"url('https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=1400&q=90')"}}),
            A("div",{class:"hero-photo-small",style:{"background-image":"url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=700&q=85')"}}),
            A("div",{class:"hero-stamp"},A("span",{},"R"),A("small",{},"TRUSTED"),A("small",{},"SOURCING"))
          )
        ),
        A("div",{class:"hero-bottom container-wide"},A("span",{},"APPAREL SOURCING"),A("span",{},"PRODUCT DEVELOPMENT"),A("span",{},"QUALITY COORDINATION"),A("span",{},"GLOBAL TRADE"))
      ),
      A("section",{class:"trust-strip"},A("div",{class:"container-wide trust-inner"},
        A("p",{},"A connected sourcing approach for buyers who value"),
        A("div",{class:"trust-items"},...["Clear Communication","Consistent Quality","Reliable Follow-up","Responsible Practices"].map((t,i)=>A("span",{},icon(["messages-square","badge-check","clipboard-check","sprout"][i],"w-4 h-4"),t)))
      )),
      A("section",{id:"about",class:"section section-about"},
        A("div",{class:"container-wide about-grid"},
          A("div",{class:"about-visual"},
            A("img",{src:"https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1100&q=85",alt:"Professional team collaborating"}),
            A("div",{class:"about-caption"},A("span",{class:"caption-icon"},icon("compass","w-5 h-5")),A("div",{},A("strong",{},"Partnership-led"),A("small",{},"Sourcing with purpose")))
          ),
          A("div",{class:"about-copy"},
            A("div",{class:"eyebrow"},A("span",{class:"eyebrow-line"}),"WHO WE ARE"),
            A("h2",{},"A thoughtful link between ",A("em",{},"buyers")," and ",A("em",{},"manufacturing.")),
            A("p",{},"Rongxin International Trading Company Limited supports apparel buyers through a coordinated sourcing journey — from understanding product requirements and developing samples to production follow-up and shipment coordination."),
            A("p",{},"Based in Uttara, Dhaka, Bangladesh, we aim to make cross-border apparel business more transparent, collaborative and dependable."),
            A("div",{class:"about-values"},A("div",{},icon("target","text-gold"),A("strong",{},"Buyer-focused"),A("small",{},"Requirements first")),A("div",{},icon("network","text-gold"),A("strong",{},"Connected"),A("small",{},"Supplier coordination")),A("div",{},icon("check-circle","text-gold"),A("strong",{},"Accountable"),A("small",{},"Clear follow-through")))
          )
        )
      ),
      A("section",{id:"products",class:"section products-section"},
        A("div",{class:"container-wide"},
          A("div",{class:"section-heading"},A("div",{},A("div",{class:"eyebrow"},A("span",{class:"eyebrow-line"}),"OUR PRODUCT RANGE"),A("h2",{},"Made for every ",A("em",{},"collection."))),A("p",{},"Explore a versatile apparel range developed around your market, customer and product brief.")),
          A("div",{class:"filter-row"},A("div",{class:"filter-label"},"BROWSE COLLECTION"),A("div",{class:"filter-buttons"},...["ALL","DENIM","WOVEN","SHIRTS","KNIT","LADIES","KIDS"].map(f=>A("button",{class:filter()===f?"filter active":"filter",onClick:()=>setFilter(f)},f)))),
          A("div",{class:"product-grid"},...shown().map((p,i)=>A("article",{class:"product-card"},
            A("div",{class:"product-image"},A("img",{src:p.image,alt:p.name,loading:"lazy"}),A("span",{class:"product-tag"},p.tag),A("button",{class:"product-arrow","aria-label":"Request details for "+p.name,onClick:()=>openInquiry(p.name)},icon("arrow-up-right","w-5 h-5"))),
            A("div",{class:"product-info"},A("div",{},A("h3",{},p.name),A("p",{},p.sub)),A("span",{class:"product-index"},"0"+(products.indexOf(p)+1))
          ))))
        )
      ),
      A("section",{id:"services",class:"section services-section"},
        A("div",{class:"container-wide"},
          A("div",{class:"section-heading section-heading-light"},A("div",{},A("div",{class:"eyebrow eyebrow-light"},A("span",{class:"eyebrow-line"}),"WHAT WE DO"),A("h2",{},"From first brief to ",A("em",{},"final shipment."))),A("p",{},"Flexible support across the apparel sourcing and order execution process.")),
          A("div",{class:"services-grid"},...services.map((s,i)=>A("article",{class:"service-card"},A("div",{class:"service-icon"},icon(s[0],"w-6 h-6")),A("span",{class:"service-no"},"0"+(i+1)),A("h3",{},s[1]),A("p",{},s[2]),A("span",{class:"service-rule"}))))
        )
      ),
      A("section",{id:"capabilities",class:"section capabilities-section"},
        A("div",{class:"container-wide capabilities-grid"},
          A("div",{},A("div",{class:"eyebrow"},A("span",{class:"eyebrow-line"}),"OUR CAPABILITIES"),A("h2",{},"One coordinated team. ",A("em",{},"Many moving parts.")),A("p",{class:"muted-copy"},"We bring structure to the details that matter in apparel sourcing, keeping product requirements, suppliers and timelines connected."),
            A("ul",{class:"capability-list"},...capabilities.map(c=>A("li",{},icon("check-circle-2","w-5 h-5 text-gold"),c))),
            A("button",{class:"btn btn-dark",onClick:()=>openInquiry()},"Discuss Your Requirements",icon("arrow-right","w-4 h-4"))
          ),
          A("div",{class:"capability-image"},A("img",{src:"https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=1200&q=85",alt:"Garment production and textile work",loading:"lazy"}),A("div",{class:"image-note"},A("strong",{},"DETAILS MATTER"),A("span",{},"Every order deserves attention"))
          )
        )
      ),

      A("section",{id:"network",class:"section module-section network-section"},A("div",{class:"container-wide"},A("div",{class:"section-heading"},A("div",{},A("div",{class:"eyebrow"},A("span",{class:"eyebrow-line"}),"SUPPLY NETWORK"),A("h2",{},"Connected sourcing. ",A("em",{},"Coordinated execution."))),A("p",{},"Supplier and manufacturing coordination is shaped around each buyer’s product brief, quality expectations, order requirements and timeline.")),A("div",{class:"module-grid three-col"},...[ ["01 / SOURCING","Supplier Identification","Identify suitable sourcing options against product type, materials, target price and order needs."],["02 / DEVELOPMENT","Sampling Coordination","Coordinate sample requirements, comments, revisions and buyer approvals."],["03 / PRODUCTION","Order Follow-up","Keep communication connected across order milestones and production follow-up."] ].map(x=>A("article",{class:"module-card"},A("span",{class:"module-kicker"},x[0]),A("h3",{},x[1]),A("p",{},x[2])))),A("p",{class:"disclaimer-note"},"Specific factory names, locations, capacities and partner credentials can be added after company verification."))),
      A("section",{id:"quality",class:"section module-section quality-section"},A("div",{class:"container-wide quality-layout"},A("div",{},A("div",{class:"eyebrow"},A("span",{class:"eyebrow-line"}),"QUALITY & COMPLIANCE"),A("h2",{},"Quality is built into ",A("em",{},"the process.")),A("p",{class:"muted-copy"},"Quality requirements are aligned with the buyer’s specification and agreed product standards. Inspection and compliance activities are coordinated according to the order scope and confirmed partner arrangements."),A("ul",{class:"module-checklist"},...["Product specification and tech-pack review","Material, fabric and trim coordination","Sample review and approval follow-up","Production-stage quality checkpoints","Final inspection coordination","Order and shipment document follow-up"].map(x=>A("li",{},x)))),A("div",{class:"quality-panel"},A("div",{class:"quality-panel-top"},A("span",{},"QUALITY WORKFLOW"),A("span",{},"01—06")),A("ol",{},...[ ["01","Understand","Buyer brief & specifications"],["02","Develop","Materials, samples & approvals"],["03","Confirm","Order details & standards"],["04","Follow up","Production milestones"],["05","Inspect","Agreed quality checkpoints"],["06","Coordinate","Documents & shipment"] ].map(x=>A("li",{},A("b",{},x[0]),A("span",{},A("strong",{},x[1]),A("small",{},x[2]))))))))),
      A("section",{id:"markets",class:"section module-section markets-section"},A("div",{class:"container-wide"},A("div",{class:"section-heading"},A("div",{},A("div",{class:"eyebrow"},A("span",{class:"eyebrow-line"}),"GLOBAL BUSINESS"),A("h2",{},"Made in Bangladesh. ",A("em",{},"Connected to markets."))),A("p",{},"Rongxin welcomes apparel sourcing conversations from international buyers and brands. Market-specific requirements are reviewed project by project.")),A("div",{class:"market-grid"},...[ ["EU","Europe","Buyer and product requirements"],["UK","United Kingdom","Product and compliance brief"],["US","North America","Specification-led sourcing"],["GL","Other Markets","Discuss your destination market"] ].map(x=>A("div",{},A("span",{},x[0]),A("strong",{},x[1]),A("small",{},x[2])))))),
      A("section",{id:"sustainability",class:"section module-section sustainability-section"},A("div",{class:"container-wide sustainability-inner"},A("div",{class:"sustainability-mark"},"R",A("span",{},"+")),A("div",{},A("div",{class:"eyebrow"},A("span",{class:"eyebrow-line"}),"RESPONSIBLE SOURCING"),A("h2",{},"Thoughtful choices. ",A("em",{},"Transparent conversations.")),A("p",{},"We support buyer-led discussions around material choices, supplier information, product requirements and responsible sourcing expectations. Specific certifications, audit status and sustainability claims are shared only when verified for the relevant facility or order."),A("button",{class:"btn btn-dark",onClick:()=>openInquiry()},"Discuss Responsible Sourcing",icon("arrow-right","w-4 h-4"))))),
      A("section",{id:"resources",class:"section module-section resources-section"},A("div",{class:"container-wide"},A("div",{class:"section-heading"},A("div",{},A("div",{class:"eyebrow"},A("span",{class:"eyebrow-line"}),"BUYER RESOURCES"),A("h2",{},"Everything starts with ",A("em",{},"a clear brief."))),A("p",{},"Share the details that help us understand your product, target market and sourcing expectations.")),A("div",{class:"resource-grid"},...[ ["01","Product Brief","Product category, reference images, construction details, fabric and trims."],["02","Tech Pack & Size","Attach or describe tech packs, measurement charts, artwork and packaging needs in your inquiry."],["03","Order & Timeline","Share estimated quantity, target price, delivery destination and required timeline."] ].map(x=>A("article",{class:"resource-card"},A("span",{class:"resource-icon"},x[0]),A("h3",{},x[1]),A("p",{},x[2]),A("button",{class:"text-link",onClick:()=>openInquiry()},"Submit details ↗"))),A("a",{class:"resource-download",href:"./Rongxin-Company-Profile.pdf",target:"_blank",rel:"noopener"},"Download Company Profile (PDF) ↗"))),
      A("section",{id:"faq",class:"section module-section faq-section"},
        A("div",{class:"container-wide faq-layout"},
          A("div",{},
            A("div",{class:"eyebrow"},A("span",{class:"eyebrow-line"}),"BUYER FAQ"),
            A("h2",{},"Good questions. ",A("em",{},"Clear answers.")),
            A("p",{class:"muted-copy"},"A few starting points for a sourcing conversation.")
          ),
          A("div",{class:"faq-list"},...[ 
            ["What product categories can I discuss?","Men’s, ladies’ and kids’ denim, woven apparel and knitwear categories are included in the current product range. Share your specific product brief for confirmation."],
            ["Can you support product development and sampling?","Product development and sample coordination can be discussed according to the product, technical requirements and project scope."],
            ["Can you coordinate quality checks?","Quality checkpoints and inspection arrangements can be discussed against buyer requirements and confirmed order arrangements."],
            ["What should I include in an RFQ?","Include product images, tech pack, material details, estimated quantity, target price, destination market and required delivery timeline where available."],
            ["How do I start a business inquiry?","Use the Inquiry / RFQ form and provide your business contact details and product requirements. The official company email must be configured before the form can send an email."]
          ].map(x=>A("details",{},A("summary",{},x[0]),A("p",{},x[1]))))
        )
      ),
      A("section",{id:"why-us",class:"why-section"},
        A("div",{class:"container-wide why-inner"},
          A("div",{class:"why-heading"},A("div",{class:"eyebrow eyebrow-light"},A("span",{class:"eyebrow-line"}),"WHY RONGXIN"),A("h2",{},"Built on the things that ",A("em",{},"build trust.")),A("p",{},"A practical, relationship-driven approach to international apparel trading.")),
          A("div",{class:"why-cards"},...[
            ["01","Clarity at every step","Open communication around product details, timelines and expectations."],
            ["02","Quality-minded execution","Attention to specifications, approvals and quality checkpoints."],
            ["03","A connected network","Coordinated sourcing and manufacturing relationships across markets."],
            ["04","Long-term partnership","A collaborative mindset focused on repeat business and shared success."]
          ].map(x=>A("article",{class:"why-card"},A("span",{},x[0]),A("h3",{},x[1]),A("p",{},x[2]))))
        )
      ),
      A("section",{class:"cta-section"},A("div",{class:"container-wide cta-inner"},A("div",{},A("span",{class:"cta-kicker"},"LET’S START A CONVERSATION"),A("h2",{},"Have a product in mind? ",A("em",{},"Let’s make it happen.")),A("p",{},"Share your requirements and our team will get back to you.")),A("button",{class:"btn btn-gold",onClick:()=>openInquiry()},"Send an Inquiry",icon("arrow-up-right","w-4 h-4")))),
      A("section",{id:"contact",class:"contact-section"},A("div",{class:"container-wide contact-grid"},
        A("div",{},A("div",{class:"eyebrow eyebrow-light"},A("span",{class:"eyebrow-line"}),"CONTACT"),A("h2",{},"Let’s talk ",A("em",{},"business.")),A("p",{class:"contact-intro"},"For product inquiries, sourcing requests or business partnerships, reach out to our team."),
          A("div",{class:"contact-details"},A("div",{},icon("map-pin","w-5 h-5 text-gold"),A("span",{},A("strong",{},"Bangladesh Office"),A("small",{},"House No. 11 (1st Floor), Road No. 06, Sector 16/A, Uttara, Dhaka-1230, Bangladesh"))),A("div",{},icon("mail","w-5 h-5 text-gold"),A("span",{},A("strong",{},"Email"),A("a",{href:`mailto:${COMPANY_EMAIL}`},"Official email to be confirmed"))),A("div",{},icon("globe","w-5 h-5 text-gold"),A("span",{},A("strong",{},"Website"),A("span",{},"Official website domain to be confirmed"))))
        ),
        A("div",{class:"contact-panel"},A("span",{class:"panel-kicker"},"BUSINESS ENQUIRIES"),A("h3",{},"Tell us what you’re looking for."),A("p",{},"Send a short brief. We’ll connect with you about the next step."),A("button",{class:"btn btn-gold w-full justify-center",onClick:()=>openInquiry()},"Open Inquiry Form",icon("arrow-up-right","w-4 h-4")),A("small",{},"Inquiry email activates after the verified company email is configured."))
      ))
    ),
    A("footer",{class:"footer"},A("div",{class:"container-wide footer-main"},
      A("a",{href:"#home",class:"brand footer-brand"},A("img",{src:"./rongxin-mark.png",alt:"Rongxin emblem",class:"brand-mark"}),A("span",{class:"brand-name"},A("strong",{},"RONGXIN"),A("small",{},"INTERNATIONAL TRADING"),A("small",{},"COMPANY LIMITED"))),
      A("p",{},"Connecting buyers, products and responsible sourcing opportunities."),
      A("div",{class:"footer-links"},A("a",{href:"#about"},"About"),A("a",{href:"#products"},"Products"),A("a",{href:"#services"},"Services"),A("a",{href:"#network"},"Network"),A("a",{href:"#quality"},"Quality"),A("a",{href:"#resources"},"Resources"),A("a",{href:"#contact"},"Contact"))
    ),A("div",{class:"container-wide footer-bottom"},A("span",{},"© "+new Date().getFullYear()+" Rongxin International Trading Company Limited. All rights reserved."),A("span",{},"Bangladesh · Global Trade"))
    ),
    A(Show,{when:()=>modal()},A("div",{class:"modal-backdrop",onClick:e=>{if(e.target===e.currentTarget)setModal(false)}},
      A("div",{class:"inquiry-modal",role:"dialog","aria-modal":"true","aria-labelledby":"inquiry-title"},
        A("button",{class:"modal-close","aria-label":"Close inquiry form",onClick:()=>setModal(false)},icon("x","w-5 h-5")),
        A("div",{class:"eyebrow"},A("span",{class:"eyebrow-line"}),"START A PROJECT"),
        A("h2",{id:"inquiry-title"},"Business ",A("em",{},"Inquiry")),
        A("p",{},"Tell us a little about your requirement. Your email app will open with the details ready to send."),
        A("form",{onSubmit:submit,class:"inquiry-form"},
          A("label",{},"Your name",A("input",{required:true,value:form().name,onInput:e=>update("name",e.currentTarget.value),placeholder:"Full name"})),
          A("label",{},"Business email",A("input",{required:true,type:"email",value:form().email,onInput:e=>update("email",e.currentTarget.value),placeholder:"name@company.com"})),
          A("label",{},"Company",A("input",{value:form().company,onInput:e=>update("company",e.currentTarget.value),placeholder:"Company name"})),
          A("label",{},"Product / Category",A("input",{value:form().product,onInput:e=>update("product",e.currentTarget.value),placeholder:"e.g. Men's denim"})),
          A("label",{class:"full-field"},"Your requirement",A("textarea",{required:true,rows:4,value:form().message,onInput:e=>update("message",e.currentTarget.value),placeholder:"Product details, quantity, target market, timeline..."})),
          A("button",{class:"btn btn-primary full-field justify-center",type:"submit"},"Continue to Email",icon("send","w-4 h-4"))
        ),
        A("small",{class:"modal-footnote"},"No online data is stored by this demo form.")
      )
    ))
  );
}
render(App,document.getElementById("app"));
