/*! third party licenses: js/vendor.LICENSE.txt */
import{n as i}from"./_plugin-vue2_normalizer-DUyx1kb-.chunk.mjs";import{b as n}from"./NcNoteCard-CImn6F9p-CyLoRgcT.chunk.mjs";import"./modulepreload-polyfill-f2ognj_V.chunk.mjs";import"./index-DCOgyq8j.chunk.mjs";import{A as o}from"./AvatarWrapper-C_jGLqYa.chunk.mjs";import{C as l,a as p}from"./Editor-CnGXkTfV.chunk.mjs";import"./vue.runtime.esm-DaLNuXGQ.chunk.mjs";import"./index-Ubm2itxG.chunk.mjs";import"./index-BORzj5JS.chunk.mjs";import"./emoji-picker-SoWZqoso.chunk.mjs";import"./RichText-BeFhUtSQ.chunk.mjs";import"./index-CREOv3g1.chunk.mjs";import"./MediaHandler.provider-CvdqgwVC.chunk.mjs";import"./logger-B3-ZlKQ_.chunk.mjs";import"./public-Ctzd0tic.chunk.mjs";import"./Wrapper-D8HkYOPM.chunk.mjs";const u={name:"SessionList",components:{AvatarWrapper:o,NcPopover:n},props:{sessions:{type:Object,default:()=>({})}},data(){return{myName:""}},computed:{label(){return t("text","Active people")},participantsPopover(){var s;return(s=this.currentSession)!=null&&s.guestName?this.participantsWithoutCurrent:this.participants},participantsWithoutCurrent(){return this.participants.filter(s=>!s.isCurrent)},participants(){return Object.values(this.sessions).filter(s=>s.lastContact>Date.now()/1e3-l&&(s.userId!==null||s.guestName!==null)).sort((s,e)=>s.lastContact<e.lastContact)},currentSession(){return Object.values(this.sessions).find(s=>s.isCurrent)},avatarStyle(){return s=>({opacity:s.lastContact>Date.now()/1e3-p?1:.5})},sessionsVisible(){return this.participantsWithoutCurrent.slice(0,3)}}};var c=function(){var s=this,e=s._self._c;return e("NcPopover",{staticClass:"session-list",attrs:{placement:"bottom"},scopedSlots:s._u([{key:"trigger",fn:function({attrs:r}){return[e("div",[e("button",s._b({staticClass:"avatar-list",attrs:{title:s.label,"aria-label":s.label}},"button",r,!1),[e("div",{staticClass:"avatardiv icon-group"}),s._l(s.sessionsVisible,function(a){return e("AvatarWrapper",{key:a.id,attrs:{session:a,size:30}})})],2)])]}},{key:"default",fn:function(){return[e("div",{staticClass:"session-menu"},[s._t("lastSaved"),e("ul",[s._t("default"),s._l(s.participantsPopover,function(r){return e("li",{key:r.id,style:s.avatarStyle(r)},[e("AvatarWrapper",{attrs:{session:r,size:36}}),e("span",{staticClass:"session-label"},[s._v(" "+s._s(r.userId?r.displayName:r.guestName?r.guestName:s.t("text","Guest"))+" ")]),r.userId===null?e("span",{staticClass:"guest-label"},[s._v("("+s._s(s.t("text","guest"))+")")]):s._e()],1)})],2)],2)]},proxy:!0}],null,!0)})},m=[],v=i(u,c,m,!1,null,"6c8e0995");const I=v.exports;export{I as default};