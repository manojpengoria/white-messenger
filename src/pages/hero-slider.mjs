/**
 * Homepage hero slider: five service slides (WhatsApp automation, AI agents, web & software,
 * e-commerce, API automation). Markup only; styles live in assets/css/input.css ("Hero slider")
 * and behaviour in assets/js/main.js (initHeroSlider).
 *
 * Each slide's visual ("stage") is drawn on a fixed 652 × 640 px canvas and scaled to fit its
 * column with the --hs-scale custom property, so the composition stays identical on every screen.
 * The stage is decorative (aria-hidden); the slide copy carries the meaning.
 */
import { btnPrimary, btnSecondary, esc } from '../lib/components.mjs';

/* eslint-disable max-len */
const ARROW='<svg fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const TICK='<svg fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" stroke-width="1.8"/><path d="m8 12.3 2.6 2.6L16 9.5"/></svg>';
const I={
 wa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.2 1.2z"/></svg>',
 bot:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="8" width="16" height="12" rx="4"/><path d="M12 4v4M9 14h.01M15 14h.01"/><circle cx="12" cy="3.5" r="1.2" fill="currentColor"/></svg>',
 spark:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 5.6L19.5 9l-5.7 1.6L12 16l-1.8-5.4L4.5 9l5.7-1.4zM19 15l.9 2.6 2.6.9-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9z"/></svg>',
 code:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m8 7-5 5 5 5M16 7l5 5-5 5"/></svg>',
 cart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 4h2l2.4 11h11l2-8H6.2"/><circle cx="9" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/></svg>',
 plug:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 2v5M15 2v5M6 7h12v4a6 6 0 0 1-12 0zM12 17v5"/></svg>',
 check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
 bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0"/></svg>',
 rupee:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 4h12M6 9h12M9 4c6 0 6 9 0 9H6l8 7"/></svg>',
 truck:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 6h12v10H2zM14 10h4l3 3v3h-7"/><circle cx="6" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/></svg>',
 db:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5.5" rx="7" ry="2.8"/><path d="M5 5.5v13c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-13M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8"/></svg>',
 users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2c2.2.6 3.5 2.6 3.5 5.8"/></svg>',
 card:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19M6 15h4"/></svg>',
 bolt:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
 cam:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
 rocket:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 4c3-1.5 6-1 6-1s.5 3-1 6l-7 7-5-5zM8 11l-4 1 2-4h4M13 16l-1 4 4-2v-4M6 18l-2 2"/></svg>',
 chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
};
const ico=(k,bg)=>`<span class="hs-ico" style="background:${bg}">${I[k]}</span>`;

const slides = (root) => [
/* 1 ─ WhatsApp */
{label:'WhatsApp Automation',eb:'WhatsApp Business Automation',ebc:'#25D366',ebi:'wa',
 h:'Turn Every WhatsApp Chat into a <em>Sale.</em>',
 p:'AI chatbots on the WhatsApp Business Platform that answer queries, take orders and collect UPI payments, 24×7, in English and Hindi.',
 c1:'Automate WhatsApp',c2:'See How It Works',ticks:['Hindi & English','UPI payments','CRM sync'],
 stage:`<div class="hs-panel" style="background:linear-gradient(160deg,#E7FBEF 0%,#DDF3FF 55%,#E9EEFF 100%)">
    <div class="hs-ring" style="width:520px;height:520px;left:60px;top:40px"></div><div class="hs-ring" style="width:380px;height:380px;left:130px;top:110px"></div>
    <img class="hs-pimg" src="${root}assets/images/hero/slider/whatsapp-automation.webp" width="395" height="635" alt="" fetchpriority="high" decoding="async" style="left:150px"></div>
  <div class="hs-phone" style="left:0;top:58px"><div class="hs-scr"><div class="hs-notch"></div>
    <div class="hs-sb" style="background:#075E54;color:#fff"><span>9:41</span><span>5G ▮▮▮</span></div>
    <div class="hs-wa-h">${'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6"><path d="M15 5l-7 7 7 7"/></svg>'}<span class="hs-av" style="background:#E0F2FE;color:#0369A1">MF</span><div><div style="font-size:13px;font-weight:700">Meta Fashions</div><div style="font-size:10.5px;opacity:.85;display:flex;align-items:center;gap:5px"><span class="hs-dot" style="width:6px;height:6px;box-shadow:none"></span>AI Assistant · online</div></div></div>
    <div class="hs-wa-b">
      <div class="hs-b hs-out hs-msg">Hi! Is the blue cotton kurta available in M?<small>10:02 ✓✓</small></div>
      <div class="hs-b hs-in hs-msg"><div class="hs-prod"><div class="hs-im" style="background:linear-gradient(135deg,#60A5FA,#1D4ED8)"></div><div><div style="font-weight:700">Blue Cotton Kurta</div><div style="color:#667781">Size M · In stock</div><div style="font-weight:800;color:#111">₹1,299</div></div></div>Yes, it's in stock! Shall I place the order for you?<small>10:02</small><div class="hs-qr"><span>Buy now</span><span>More colours</span></div></div>
      <div class="hs-b hs-out hs-msg">Buy now<small>10:03 ✓✓</small></div>
      <div class="hs-b hs-in hs-msg">Order <b>#WM2481</b> is reserved. Pay securely via UPI:<div style="margin-top:6px;background:#F0FDF4;border:1px solid #BBF7D0;border-radius:7px;padding:6px 8px;font-weight:700;color:#15803D">Pay ₹1,299 with UPI →</div><small>10:03</small></div>
    </div></div></div>
  <div class="hs-card hs-f hs-d1" style="right:-18px;top:70px;padding:12px 16px"><div class="hs-row"><span class="hs-dot"></span><div><div class="hs-t1">AI Assistant Online</div><div class="hs-t2">Replying instantly, 24×7</div></div></div></div>
  <div class="hs-card hs-f hs-d2" style="right:-18px;top:300px;width:236px;padding:13px 14px;"><div class="hs-row">${ico('wa','#25D366')}<div><div class="hs-t1">New message</div><div class="hs-t2">"Do you deliver to Jaipur?"</div></div></div></div>
  <div class="hs-card hs-f hs-d3" style="right:-16px;top:470px;width:250px;padding:14px"><div class="hs-row">${ico('check','#16A34A')}<div><div class="hs-t1">Order confirmed #WM2481</div><div class="hs-t2">Payment received · ₹1,299</div></div></div></div>
  <div class="hs-card hs-f hs-d4" style="left:188px;top:560px;padding:11px 15px"><div class="hs-row" style="gap:8px">${'<span style="width:28px;height:28px;border-radius:9px;background:#EFF5FF;color:#2563EB;display:grid;place-items:center"><svg width=15 height=15 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 20V10M10 20V4M16 20v-7"/></svg></span>'}<div class="hs-t1" style="font-size:12.5px">128 chats handled today</div></div></div>`},

/* 2 ─ AI Agents */
{label:'AI Chatbots & Agents',eb:'AI Chatbots & AI Agents',ebc:'#2563EB',ebi:'spark',
 h:'AI Agents That <em>Never Clock Out.</em>',
 p:'Custom AI chatbots and autonomous agents that understand your business, answer customers, and complete tasks across your tools.',
 c1:'Build Your AI Agent',c2:'Explore AI Services',ticks:['Trained on your data','Human hand-off','Secure & private'],
 stage:`<div class="hs-panel" style="background:linear-gradient(160deg,#E6EEFF 0%,#E3F7FD 60%,#F1ECFF 100%)">
    <div class="hs-ring" style="width:520px;height:520px;left:90px;top:30px"></div><div class="hs-ring" style="width:360px;height:360px;left:170px;top:110px"></div>
    <img class="hs-pimg" src="${root}assets/images/hero/slider/ai-agents.webp" width="446" height="666" alt="" loading="lazy" decoding="async" style="left:150px"></div>
  <div class="hs-win" style="left:0;top:96px;width:344px">
    <div class="hs-win-h">${ico('bot','linear-gradient(135deg,#2563EB,#22D3EE)').replace('hs-ico"','hs-ico" style="width:34px;height:34px;border-radius:11px;background:linear-gradient(135deg,#2563EB,#22D3EE)"')}<div style="flex:1"><div class="hs-t1">WM AI Assistant</div><div class="hs-t2" style="display:flex;align-items:center;gap:6px"><span class="hs-dot" style="width:6px;height:6px;box-shadow:none"></span>Online · trained on your data</div></div><span style="font-size:11px;font-weight:700;color:#2563EB;background:#EFF5FF;padding:4px 9px;border-radius:999px">Agent mode</span></div>
    <div style="padding:16px;display:flex;flex-direction:column;gap:11px;background:#FBFCFE">
      <div class="hs-msg" style="align-self:flex-end;background:#2563EB;color:#fff;font-size:12.5px;line-height:1.5;padding:10px 13px;border-radius:14px 14px 4px 14px;max-width:82%">Summarise today's support tickets and refund any delayed orders.</div>
      <div class="hs-msg" style="background:#fff;border:1px solid #E2E8F0;font-size:12.5px;line-height:1.55;padding:12px 13px;border-radius:14px 14px 14px 4px;max-width:92%;color:#334155">
        <div style="display:flex;align-items:center;gap:6px;font-weight:700;color:#0F172A;margin-bottom:6px"><span style="color:#2563EB">${I.spark.replace('<svg','<svg width=14 height=14')}</span>Here's today's summary</div>
        • 46 tickets · 38 resolved by AI<br>• Top issue: delivery delays (12)<br>• 3 delayed orders eligible for refund
        <div style="margin-top:9px;display:flex;gap:6px"><span style="font-size:11px;font-weight:700;background:#ECFDF5;color:#047857;padding:5px 9px;border-radius:7px">Refunds issued ✓</span><span style="font-size:11px;font-weight:700;background:#F1F5F9;color:#475569;padding:5px 9px;border-radius:7px">View report</span></div>
      </div>
      <div class="hs-msg" style="display:flex;align-items:center;gap:8px;border:1px solid #E2E8F0;border-radius:12px;padding:9px 12px;background:#fff;font-size:12px;color:#94A3B8">Ask anything…<span style="margin-left:auto;width:28px;height:28px;border-radius:9px;background:#2563EB;display:grid;place-items:center;color:#fff">${ARROW.replace('<svg','<svg width=14 height=14')}</span></div>
    </div></div>
  <div class="hs-card hs-f hs-d1" style="right:-14px;top:250px;width:236px;padding:15px">
    <div class="hs-t2" style="font-weight:700;color:#2563EB;margin:0 0 9px;letter-spacing:.06em;font-size:10.5px">AGENT WORKFLOW</div>
    ${[['Read customer email',1],['Check order in ERP',1],['Issue refund',1],['Send confirmation',0]].map(([t,d])=>`<div class="hs-row" style="gap:9px;margin-top:7px"><span style="width:20px;height:20px;border-radius:50%;display:grid;place-items:center;${d?'background:#16A34A;color:#fff':'border:2px solid #93C5FD;color:#2563EB'}">${d?I.check.replace('<svg','<svg width=11 height=11'):'<span style="width:7px;height:7px;border-radius:50%;background:#3B82F6"></span>'}</span><span style="font-size:12.5px;font-weight:600;color:${d?'#0F172A':'#2563EB'}">${t}</span></div>`).join('')}
  </div>
  <div class="hs-card hs-f hs-d2" style="right:-14px;top:462px;width:232px;padding:14px"><div class="hs-row">${ico('bolt','linear-gradient(135deg,#7C3AED,#2563EB)')}<div><div class="hs-t1">Intent: Refund request</div><div class="hs-t2">96% confidence</div></div></div><div style="margin-top:10px;height:6px;border-radius:6px;background:#EEF2FF"><div style="width:96%;height:100%;border-radius:6px;background:linear-gradient(90deg,#7C3AED,#2563EB)"></div></div></div>
  <div class="hs-card hs-f hs-d3" style="left:44px;top:548px;padding:11px 15px"><div class="hs-row" style="gap:8px"><span style="color:#2563EB">${I.users.replace('<svg','<svg width=17 height=17')}</span><div class="hs-t1" style="font-size:12.5px">Human hand-off ready</div></div></div>`},

/* 3 ─ Web & Software */
{label:'Web & Software',eb:'Website & Software Development',ebc:'#3D3E6B',ebi:'code',
 h:'Websites & Software Built to <em>Scale With You.</em>',
 p:'Fast, secure web apps, portals and custom software, from UX design to cloud deployment, built on Laravel, React and Node.js.',
 c1:'Start Your Project',c2:'View Our Work',ticks:['Laravel · React · Node','Agile delivery','Cloud-ready'],
 stage:`<div class="hs-panel" style="background:linear-gradient(160deg,#ECEBFF 0%,#E3EEFF 55%,#E1F6FB 100%)">
    <div class="hs-ring" style="width:520px;height:520px;left:60px;top:30px"></div>
    <img class="hs-pimg" src="${root}assets/images/hero/slider/software-developer.webp" width="529" height="666" alt="" loading="lazy" decoding="async" style="left:118px"></div>
  <div class="hs-laptop" style="left:-10px;top:318px;width:400px">
    <div class="hs-lid"><div class="hs-lscr" style="height:238px;display:flex">
      <div style="width:58px;background:#0F172A;padding:12px 0;display:flex;flex-direction:column;align-items:center;gap:13px">${['#2563EB','#334155','#334155','#334155','#334155'].map(c=>`<span style="width:22px;height:22px;border-radius:7px;background:${c}"></span>`).join('')}</div>
      <div style="flex:1;padding:12px 13px;background:#F8FAFC">
        <div style="display:flex;justify-content:space-between;align-items:center"><div style="font-size:12px;font-weight:800">Dashboard</div><span style="font-size:9.5px;font-weight:700;color:#2563EB;background:#EFF5FF;padding:3px 8px;border-radius:999px">Live</span></div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:9px">${[['Users','24.8k','+12%'],['Revenue','₹8.4L','+18%'],['Uptime','99.9%','30d']].map(([a,b,c])=>`<div style="background:#fff;border:1px solid #E2E8F0;border-radius:8px;padding:7px"><div style="font-size:8.5px;color:#64748B;font-weight:600">${a}</div><div style="font-size:13px;font-weight:800;margin-top:1px">${b}</div><div style="font-size:8px;color:#16A34A;font-weight:700">${c}</div></div>`).join('')}</div>
        <div style="background:#fff;border:1px solid #E2E8F0;border-radius:8px;margin-top:7px;padding:8px 8px 4px">
          <svg viewBox="0 0 300 92" width="100%" height="104"><defs><linearGradient id="hs-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3B7BF6" stop-opacity=".35"/><stop offset="1" stop-color="#3B7BF6" stop-opacity="0"/></linearGradient></defs>
          ${[20,45,70].map(y=>`<line x1="0" x2="300" y1="${y}" y2="${y}" stroke="#EEF2F7"/>`).join('')}
          <path d="M0 78 C30 70 45 60 70 62 S115 40 140 44 190 22 215 28 265 12 300 8 V92 H0Z" fill="url(#hs-area)"/>
          <path d="M0 78 C30 70 45 60 70 62 S115 40 140 44 190 22 215 28 265 12 300 8" fill="none" stroke="#2563EB" stroke-width="2.5"/>
          <path d="M0 84 C40 80 60 74 90 76 S150 62 180 64 240 50 300 46" fill="none" stroke="#22D3EE" stroke-width="2" stroke-dasharray="4 4"/></svg>
        </div></div></div></div>
    </div>
  <div class="hs-win" style="left:-14px;top:60px;width:300px;background:#0F172A;border-color:#1E293B">
    <div class="hs-win-h" style="border-color:#1E293B"><div class="hs-lights"><i></i><i></i><i></i></div><span style="font-size:11px;color:#94A3B8;font-weight:600;margin-left:6px">OrderController.php</span></div>
    <div class="hs-code" style="padding:12px 15px 14px"><span class="hs-c">// Create order &amp; notify customer</span><br><span class="hs-k">public function</span> <span class="hs-fn">store</span>(Request <span class="hs-y">$r</span>)<br>{<br>&nbsp;&nbsp;<span class="hs-y">$order</span> = Order::<span class="hs-fn">create</span>(<span class="hs-y">$data</span>);<br>&nbsp;&nbsp;<span class="hs-fn">event</span>(<span class="hs-k">new</span> OrderPlaced(<span class="hs-y">$order</span>));<br>&nbsp;&nbsp;<span class="hs-k">return</span> <span class="hs-fn">response</span>()-><span class="hs-fn">json</span>(<span class="hs-y">$order</span>);<br>}</div></div>
  <div class="hs-card hs-f hs-d1" style="right:-14px;top:92px;width:214px;padding:14px"><div class="hs-row"><svg width="46" height="46" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" fill="none" stroke="#DCFCE7" stroke-width="4"/><circle cx="18" cy="18" r="15" fill="none" stroke="#16A34A" stroke-width="4" stroke-dasharray="92 95" stroke-linecap="round" transform="rotate(-90 18 18)"/><text x="18" y="22.5" text-anchor="middle" font-size="11" font-weight="800" fill="#15803D" font-family="inherit">98</text></svg><div><div class="hs-t1">Performance</div><div class="hs-t2">Core Web Vitals passed</div></div></div></div>
  <div class="hs-card hs-f hs-d2" style="right:-14px;top:258px;width:240px;padding:14px"><div class="hs-row">${ico('rocket','linear-gradient(135deg,#2563EB,#3D3E6B)')}<div><div class="hs-t1">Deployed to production</div><div class="hs-t2">v2.4.0 · 2 min ago</div></div></div></div>
  <div class="hs-card hs-f hs-d3" style="right:-14px;top:566px;padding:11px 15px"><div class="hs-row" style="gap:10px">${['#FF2D20','#61DAFB','#539E43','#4FC08D'].map(c=>`<span style="width:12px;height:12px;border-radius:4px;background:${c}"></span>`).join('')}<div class="hs-t1" style="font-size:12.5px">Laravel · React · Node · Vue</div></div></div>`},

/* 4 ─ E-commerce */
{label:'E-commerce Solutions',eb:'E-commerce Solutions',ebc:'#F59E0B',ebi:'cart',
 h:'Online Stores That <em>Sell 24×7.</em>',
 p:'Beautiful, mobile-first stores with secure checkout, UPI payments, inventory and shipping built in, ready to grow with your brand.',
 c1:'Launch Your Store',c2:'Explore E-commerce',ticks:['UPI & cards','Shipping integrations','Admin panel'],
 stage:`<div class="hs-panel" style="background:linear-gradient(160deg,#FFF4E5 0%,#FDEFF4 45%,#E8F0FF 100%)">
    <div class="hs-ring" style="width:520px;height:520px;left:60px;top:40px;border-color:rgba(245,158,11,.25)"></div>
    <img class="hs-pimg" src="${root}assets/images/hero/slider/ecommerce-shopper.webp" width="338" height="638" alt="" loading="lazy" decoding="async" style="left:150px"></div>
  <div class="hs-phone" style="left:0;top:58px"><div class="hs-scr" style="background:#F8FAFC"><div class="hs-notch"></div>
    <div class="hs-sb"><span>9:41</span><span>5G ▮▮▮</span></div>
    <div style="padding:6px 14px 0;display:flex;justify-content:space-between;align-items:center"><div style="font-size:15px;font-weight:800">Vastra<span style="color:#E11D74">.</span></div><span style="position:relative;color:#0F172A">${I.cart.replace('<svg','<svg width=20 height=20')}<b style="position:absolute;top:-5px;right:-6px;background:#E11D74;color:#fff;font-size:8.5px;width:15px;height:15px;border-radius:50%;display:grid;place-items:center">2</b></span></div>
    <div style="margin:10px 14px 0;border-radius:14px;padding:12px;background:linear-gradient(120deg,#FDE68A,#FBCFE8);"><div style="font-size:9.5px;font-weight:800;color:#9D174D;letter-spacing:.08em">FESTIVE SALE</div><div style="font-size:15px;font-weight:800;margin-top:2px;line-height:1.2">Up to 40% off<br>ethnic wear</div></div>
    <div style="display:flex;gap:6px;padding:10px 14px 0">${['All','Sarees','Kurtas','Jewellery'].map((t,i)=>`<span style="font-size:10px;font-weight:700;padding:5px 9px;border-radius:999px;${i?'background:#fff;border:1px solid #E2E8F0;color:#475569':'background:#0F172A;color:#fff'}">${t}</span>`).join('')}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:10px 14px">
      ${[['Silk Saree','₹2,199','linear-gradient(140deg,#F472B6,#BE185D)'],['Cotton Kurta','₹1,299','linear-gradient(140deg,#60A5FA,#1D4ED8)'],['Jhumka Set','₹899','linear-gradient(140deg,#FCD34D,#D97706)'],['Dupatta','₹649','linear-gradient(140deg,#5EEAD4,#0F766E)']].map(([n,p,g])=>`<div style="background:#fff;border-radius:11px;padding:6px;border:1px solid #EEF2F7"><div style="height:74px;border-radius:8px;background:${g};position:relative"><span style="position:absolute;top:5px;right:5px;width:18px;height:18px;border-radius:50%;background:#fff;display:grid;place-items:center;font-size:10px;color:#E11D74">♥</span></div><div style="font-size:10.5px;font-weight:700;margin-top:5px">${n}</div><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:11px;font-weight:800">${p}</span><span style="width:18px;height:18px;border-radius:6px;background:#0F172A;color:#fff;font-size:12px;display:grid;place-items:center;line-height:1">+</span></div></div>`).join('')}
    </div></div></div>
  <div class="hs-card hs-f hs-d1" style="left:236px;top:302px;width:236px;padding:14px">
    <div class="hs-row" style="justify-content:space-between"><div class="hs-t1">Your cart</div><span class="hs-t2" style="margin:0">2 items</span></div>
    ${[['Silk Saree','₹2,199','linear-gradient(140deg,#F472B6,#BE185D)'],['Cotton Kurta','₹1,299','linear-gradient(140deg,#60A5FA,#1D4ED8)']].map(([n,p,g])=>`<div class="hs-row" style="margin-top:9px;gap:9px"><span style="width:34px;height:34px;border-radius:8px;background:${g}"></span><span style="font-size:12.5px;font-weight:600;flex:1">${n}</span><span style="font-size:12.5px;font-weight:800">${p}</span></div>`).join('')}
    <div style="margin-top:12px;background:#0F172A;color:#fff;border-radius:10px;padding:9px 12px;font-size:12.5px;font-weight:700;display:flex;justify-content:space-between">Checkout<span>₹3,498</span></div></div>
  <div class="hs-card hs-f hs-d2" style="right:-16px;top:110px;width:226px;padding:13px 14px"><div class="hs-row">${ico('rupee','linear-gradient(135deg,#7C3AED,#4F46E5)')}<div><div class="hs-t1">Payment successful</div><div class="hs-t2">₹3,498 via UPI</div></div></div></div>
  <div class="hs-card hs-f hs-d3" style="right:-16px;top:522px;width:244px;padding:14px"><div class="hs-row">${ico('check','#16A34A')}<div><div class="hs-t1">Order confirmed #SC1042</div><div class="hs-t2">Arriving by Friday</div></div></div></div>
  <div class="hs-card hs-f hs-d4" style="left:160px;top:574px;padding:11px 15px"><div class="hs-row" style="gap:8px"><span style="color:#F59E0B">${I.truck.replace('<svg','<svg width=18 height=18')}</span><div class="hs-t1" style="font-size:12.5px">Out for delivery · Jaipur</div></div></div>`},

/* 5 ─ API & Automation */
{label:'API & Automation',eb:'API & Business Automation',ebc:'#0EA5E9',ebi:'plug',
 h:'Connect. Integrate.<br><em>Automate.</em>',
 p:'We integrate your CRM, payment gateway, WhatsApp, ERP and databases with secure APIs, so data flows and work happens automatically.',
 c1:'Automate My Business',c2:'Explore Integrations',ticks:['REST & webhooks','Real-time sync','Secure by design'],
 stage:`<div class="hs-panel" style="background:linear-gradient(160deg,#E0F7FF 0%,#E6EEFF 55%,#EEF0FF 100%)">
    <div class="hs-ring" style="width:520px;height:520px;left:60px;top:40px"></div>
    <img class="hs-pimg" src="${root}assets/images/hero/slider/api-automation.webp" width="455" height="663" alt="" loading="lazy" decoding="async" style="left:180px"></div>
  <div class="hs-win" style="left:-24px;top:250px;width:470px">
    <div class="hs-win-h"><div class="hs-lights"><i></i><i></i><i></i></div><span class="hs-t1" style="margin-left:6px;font-size:12.5px">Integration Hub</span><span style="margin-left:auto;font-size:10.5px;font-weight:700;color:#16A34A;background:#ECFDF5;padding:4px 9px;border-radius:999px;display:flex;align-items:center;gap:5px"><span class="hs-dot" style="width:6px;height:6px;box-shadow:none"></span>All systems live</span></div>
    <div style="position:relative;height:250px;background:#FBFCFE;background-image:radial-gradient(#E2E8F0 1px,transparent 1px);background-size:16px 16px">
      <svg width="470" height="250" style="position:absolute;inset:0"><g fill="none" stroke-width="2" stroke-dasharray="5 5">
        <path d="M110 58 C170 58 175 125 235 125" stroke="#3B82F6"/><path d="M110 192 C170 192 175 125 235 125" stroke="#8B5CF6"/>
        <path d="M360 58 C300 58 295 125 235 125" stroke="#25D366"/><path d="M360 192 C300 192 295 125 235 125" stroke="#0EA5E9"/></g>
        ${[[172,92,'#3B82F6'],[172,158,'#8B5CF6'],[298,92,'#25D366'],[298,158,'#0EA5E9']].map(([x,y,c])=>`<circle cx="${x}" cy="${y}" r="4.5" fill="${c}"/>`).join('')}</svg>
      ${[[18,34,'CRM','users','#3B82F6','Leads synced'],[18,168,'Payment Gateway','card','#8B5CF6','Razorpay · UPI'],[352,34,'WhatsApp','wa','#25D366','Notifications'],[352,168,'Database','db','#0EA5E9','MySQL']].map(([x,y,t,k,c,s])=>`<div style="position:absolute;left:${x}px;top:${y}px;width:${x>100?104:96}px;background:#fff;border:1px solid #E2E8F0;border-radius:12px;padding:8px;box-shadow:0 8px 18px -10px rgba(15,23,42,.25)"><span style="width:26px;height:26px;border-radius:8px;background:${c};color:#fff;display:grid;place-items:center">${I[k].replace('<svg','<svg width=14 height=14')}</span><div style="font-size:10.5px;font-weight:800;margin-top:5px;line-height:1.2">${t}</div><div style="font-size:9px;color:#64748B;font-weight:600">${s}</div></div>`).join('')}
      <div style="position:absolute;left:191px;top:85px;width:88px;height:80px;border-radius:18px;background:linear-gradient(135deg,#2563EB,#2A7D9C);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 14px 28px -10px rgba(37,99,235,.7)"><span style="font-weight:800;font-size:17px;letter-spacing:-.02em">WM</span><span style="font-size:9px;font-weight:700;opacity:.9">API Gateway</span></div>
    </div>
    <div style="border-top:1px solid #EEF2F7;padding:9px 14px;font-family:ui-monospace,Menlo,monospace;font-size:10.5px;color:#475569;display:flex;gap:16px"><span><b style="color:#16A34A">POST</b> /orders 201 · 84ms</span><span><b style="color:#2563EB">GET</b> /crm/leads 200 · 41ms</span></div>
  </div>
  <div class="hs-card hs-f hs-d1" style="right:-14px;top:540px;width:262px;padding:14px"><div class="hs-row">${ico('bolt','linear-gradient(135deg,#0EA5E9,#2563EB)')}<div><div class="hs-t1">Workflow triggered</div><div class="hs-t2">New order → CRM → WhatsApp</div></div></div></div>
  <div class="hs-card hs-f hs-d2" style="right:-14px;top:380px;width:210px;padding:14px"><div class="hs-t2" style="margin:0;font-weight:700">API calls today</div><div style="display:flex;align-items:flex-end;justify-content:space-between;margin-top:4px"><div style="font-size:22px;font-weight:800">12,480</div><svg width="84" height="30" viewBox="0 0 84 30"><path d="M0 26 L12 20 L24 22 L36 14 L48 16 L60 8 L72 10 L84 3" fill="none" stroke="#0EA5E9" stroke-width="2.5" stroke-linecap="round"/></svg></div><div class="hs-t2" style="color:#16A34A;font-weight:700">99.98% success rate</div></div>
  <div class="hs-card hs-f hs-d3" style="left:20px;top:110px;padding:11px 15px"><div class="hs-row" style="gap:8px"><span style="color:#16A34A">${I.check.replace('<svg','<svg width=16 height=16')}</span><div class="hs-t1" style="font-size:12.5px">Lead synced to CRM</div></div></div>`}
];

/** Calls to action per slide (page ids from the registry). */
const LINKS = [
  ['contact-us/index', 'ai/ai-chatbot-development'],
  ['contact-us/index', 'ai/index'],
  ['contact-us/index', 'resources/case-studies'],
  ['contact-us/index', 'services/ecommerce-development'],
  ['contact-us/index', 'services/api-integration'],
];

const CHEVRON_L = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>';
const CHEVRON_R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const PAUSE = '<svg class="hs-ico-pause" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg><svg class="hs-ico-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>';

export function heroSlider(ctx) {
  const data = slides(ctx.root);
  const total = String(data.length).padStart(2, '0');
  const slideHtml = data.map((s, i) => {
    const [primary, secondary] = LINKS[i];
    const n = String(i + 1).padStart(2, '0');
    return `<div class="hs-slide${i === 0 ? ' is-active' : ''}" id="hs-slide-${i + 1}" data-slide role="group" aria-roledescription="slide" aria-label="${i + 1} of ${data.length}: ${esc(s.label)}"${i === 0 ? '' : ' aria-hidden="true"'}>
  <div class="container-wm hs-grid">
    <div class="hs-copy">
      <p class="eyebrow hs-eyebrow"><span class="hs-eyebrow-ico" style="background:${s.ebc}" aria-hidden="true">${I[s.ebi]}</span>${esc(s.eb)}</p>
      <h2 class="hs-title" id="hs-title-${n}">${s.h}</h2>
      <p class="hs-lead">${esc(s.p)}</p>
      <div class="hs-ctas">${btnPrimary(ctx, s.c1, primary, 'hs-btn')}${btnSecondary(ctx, s.c2, secondary, 'hs-btn')}</div>
      <ul class="hs-ticks" role="list">${s.ticks.map((t) => `<li>${TICK}${esc(t)}</li>`).join('')}</ul>
    </div>
    <div class="hs-stage" aria-hidden="true"><div class="hs-stage-inner">${s.stage}</div></div>
  </div>
</div>`;
  }).join('\n');

  const tabs = data.map((s, i) => `<button type="button" class="hs-tab${i === 0 ? ' is-active' : ''}" data-slide-to="${i}" aria-controls="hs-slide-${i + 1}" aria-label="Show slide ${i + 1}: ${esc(s.label)}"${i === 0 ? ' aria-current="true"' : ''}><span class="hs-bar"><i></i></span><span class="hs-tab-n">${String(i + 1).padStart(2, '0')}</span><span class="hs-tab-l">${esc(s.label)}</span></button>`).join('');

  return `<section class="hs" data-hero-slider aria-roledescription="carousel" aria-label="Featured White Messenger solutions">
  <h1 class="sr-only">White Messenger: AI Engineering, Software Development and Business Automation</h1>
  <div class="hs-viewport" data-slide-live aria-live="off">
${slideHtml}
  </div>
  <div class="hs-controls">
    <div class="container-wm hs-controls-inner">
      <div class="hs-tabs">${tabs}</div>
      <div class="hs-nav">
        <span class="hs-count" aria-hidden="true"><b data-slide-count>01</b> / ${total}</span>
        <button type="button" class="hs-arrow hs-toggle" data-slide-toggle aria-label="Pause slideshow">${PAUSE}</button>
        <button type="button" class="hs-arrow" data-slide-prev aria-label="Previous slide">${CHEVRON_L}</button>
        <button type="button" class="hs-arrow hs-arrow-next" data-slide-next aria-label="Next slide">${CHEVRON_R}</button>
      </div>
    </div>
  </div>
</section>`;
}
