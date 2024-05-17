/*! third party licenses: js/vendor.LICENSE.txt */
import{V as e}from"./vue.runtime.esm-Dd7ivler.mjs";import{c as d}from"./index-7dlE0du4.mjs";import{a4 as s}from"./RichText-BhmpOk9X.mjs";import{N as a}from"./NcNoteCard-e7-Bxio8-DX1UPUdy.mjs";import{P as i}from"./PlainTextReader-BngHsr2c.mjs";import{R as n}from"./RichTextReader-mAkcbmP4.mjs";import{t as r,y as l}from"./NcTextArea-XCi8a16Y-CFSsbK92.mjs";import{g as m}from"./token-DpxtlN7K.mjs";import{g as u}from"./Editor.singleton-ChOLOHsF.mjs";import{n as c}from"./_plugin-vue2_normalizer-BWKvF6pj.mjs";import"./index-vg7q3Iku.mjs";import"./modulepreload-polyfill-DZeoc1eZ.mjs";import"./index-eMgxgA-0.mjs";import"./MediaHandler.provider-2sdLyJv2.mjs";import"./logger-2teHUPfo.mjs";import"./index-DMlkRGZt.mjs";import"./index-Ubm2itxG.mjs";e.prototype.t=r,e.prototype.n=l;const p={name:"ViewerComponent",components:{NcButton:e.extend(a),PencilIcon:e.extend(s),RichTextReader:e.extend(n),PlainTextReader:e.extend(i),Editor:u},provide(){return{isEmbedded:this.isEmbedded}},props:{filename:{type:String,default:null},fileid:{type:Number,default:null},active:{type:Boolean,default:!1},autofocus:{type:Boolean,default:!0},shareToken:{type:String,default:()=>m()},mime:{type:String,default:null},showOutlineOutside:{type:Boolean,default:!1},permissions:{type:String,default:""},source:{type:String,default:void 0},isEmbedded:{type:Boolean,default:!1}},data(){return{content:"",hasToggledInteractiveEmbedding:!1}},computed:{useSourceView(){return this.source&&(this.fileVersion||!this.fileid||this.isEmbedded)&&!this.hasToggledInteractiveEmbedding},readerComponent(){return this.mime==="text/markdown"?n:i}},watch:{source(){this.loadFileContent()}},mounted(){this.loadFileContent()},methods:{t:r,async loadFileContent(){if(this.useSourceView){const t=await d.get(this.source);this.content=t.data,this.contentLoaded=!0}this.$emit("update:loaded",!0)},toggleEdit(){this.hasToggledInteractiveEmbedding=!0}}};var f=function(){var t=this,o=t._self._c;return t.useSourceView?o("div",{staticClass:"text-editor source-viewer",attrs:{id:"editor-container","data-text-el":"editor-container"}},[o(t.readerComponent,{tag:"Component",attrs:{content:t.content}}),t.isEmbedded?o("NcButton",{staticClass:"toggle-interactive",on:{click:t.toggleEdit},scopedSlots:t._u([{key:"icon",fn:function(){return[o("PencilIcon")]},proxy:!0}],null,!1,411976917)},[t._v(" "+t._s(t.t("text","Edit"))+" ")]):t._e()],1):o("Editor",{class:{"text-editor--embedding":t.isEmbedded},attrs:{"file-id":t.fileid,"relative-path":t.filename,active:t.active||t.isEmbedded,autofocus:t.autofocus,"share-token":t.shareToken,mime:t.mime,"show-outline-outside":t.showOutlineOutside}})},h=[],g=c(p,f,h,!1,null,"402c15f8",null,null);const R=g.exports;export{R as default};