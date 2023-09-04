import{q as Xe,r,u as Ye,b as Ze,s as et,m as V,e as z,o as p,f as v,j as n,i as u,g as o,h as a,y as i,a2 as tt,F as O,O as A,k as _,v as f,W as m,t as g,a3 as re,a4 as y,a5 as ie,Q as S,a6 as F,E as M,p as ot,n as lt,_ as at}from"./index-4d5b55f1.js";const $=G=>(ot("data-v-5a548ee3"),G=G(),lt(),G),nt={style:{"border-radius":"20px 0 0 0","box-shadow":"-10px -2.5px 0 0 rgb(225, 235, 248)","min-width":"1001px"}},st={class:"header"},rt={class:"control-block"},it=$(()=>n("div",{style:{height:"30px","line-height":"30px","font-size":"20px","margin-top":"10px","margin-left":"80px"}},"筛选 ",-1)),ct={style:{"text-align":"right",margin:"0"}},ut={class:"display-card"},dt=["onMouseenter","onMouseleave"],pt=["onClick"],vt={style:{"max-width":"200px"}},_t=$(()=>n("br",null,null,-1)),ft=$(()=>n("div",{style:{"margin-top":"85px","margin-left":"123px","font-size":"16px",color:"var(--color-brand1-6,#1b9aee)"}}," 创建新项目",-1)),gt={key:0},ht=["onMouseenter","onMouseleave"],mt={style:{"text-align":"right",margin:"0"}},kt=["onClick"],yt={style:{"max-width":"200px"}},Ct=$(()=>n("br",null,null,-1)),bt={key:0},xt=["onMouseenter","onMouseleave"],jt={style:{"text-align":"right",margin:"0"}},$t=["onClick"],wt={style:{"max-width":"200px"}},Vt=$(()=>n("br",null,null,-1)),Mt={key:0},zt=["onMouseenter","onMouseleave"],St=["onClick"],Nt={style:{"max-width":"200px"}},Ut=["onMouseenter","onMouseleave"],Ot=["onClick"],Jt={style:{"max-width":"200px"}},Tt=$(()=>n("br",null,null,-1)),It={key:6,style:{position:"relative"}},Dt={key:0},Lt=["onMouseenter","onMouseleave"],Bt=["onClick"],Et={style:{"max-width":"200px"}},At=$(()=>n("div",{class:"dialog-title"},"项目名称",-1)),Ft=$(()=>n("div",{class:"dialog-title",style:{"margin-top":"20px"}},"项目简介",-1)),Rt={class:"dialog-footer"},qt=$(()=>n("div",{class:"dialog-title"},"此操作将删除该项目（后续可以在回收站中恢复）",-1)),Pt={class:"dialog-footer"},Qt=$(()=>n("div",{class:"dialog-title"},"此操作将恢复该项目",-1)),Wt={class:"dialog-footer"},Gt=$(()=>n("div",{class:"dialog-title"},"此操作将永久删除该项目（不可恢复）",-1)),Ht={class:"dialog-footer"},Kt={class:"dialog-footer"},Xt=$(()=>n("div",{class:"dialog-title"},"项目名称",-1)),Yt=$(()=>n("div",{class:"dialog-title",style:{"margin-top":"20px"}},"项目简介",-1)),Zt={class:"dialog-footer"},eo=Xe({__name:"manage",setup(G){const me=r(),T=r(),N=r(),H=r(),K=r(),Ve=Ye(),Me=Ze(),ce=r(""),ue=r("");r(1);const I=r(null),ze=r(1),k=r(1),D=r(!1),R=r(!1),q=r(!1),P=r(!1),Q=r(!1),J=r(!1),de=r([]),pe=r([]),W=r([]),ve=r([]),_e=r([]),fe=r(null),ke=r(null),ye=r(null);r(0);const X=r(!1),Ce=r("全部项目"),Se={checkStrictly:!0},Ne=[{value:1,label:"创建时间",children:[{value:1,label:"升序"},{value:2,label:"倒序"}]},{value:2,label:"最后编辑时间",children:[{value:1,label:"升序"},{value:2,label:"倒序"}]}],Ue=l=>{F.confirm("确定要取消新建项目吗？").then(()=>{l()}).catch(()=>{})},Oe=l=>{F.confirm("确定要取消删除项目吗？").then(()=>{l()}).catch(()=>{})},Je=l=>{F.confirm("确定要取消恢复项目吗？").then(()=>{l()}).catch(()=>{})},Te=l=>{F.confirm("确定要取消永久删除项目吗？").then(()=>{l()}).catch(()=>{})},be=l=>{F.confirm("确定要取消重命名吗？").then(()=>{Q.value=!1,I.value=null,l()}).catch(()=>{})},Ie=l=>{F.confirm("确定要取消创建副本吗？").then(()=>{J.value=!1,I.value=null,l()}).catch(()=>{})};et(()=>{C(),j(),b(),x()});function De(){k.value=1,C(),j(),b(),x()}function Le(){k.value=2,C(),j(),b(),x()}function Be(){k.value=3,C(),j(),b(),x()}function Ee(){k.value=4,C(),j(),b(),x()}let ge,Y=30;function L(l){ge=setInterval(()=>{Y--,Y<=0&&(l.tag=1,Y=30,clearInterval(ge))},1)}function B(l){Y<30?(l.tag=0,clearInterval(ge)):l.tag=0}function xe(){ze.value=1}function Z(l){Me.push("/main/project/"+l.project_id)}function d(){return Ve.getters.getUserinfo}function Ae(){D.value=!1,V({url:"#/api/v1/project_manage/create_project",method:"post",data:JSON.stringify({token:d().token,name:ce.value,introduction:ue.value,team_id:d().currentTeam.id})}).then(l=>{if(l.data.errno===1003){M.error("名下已存在同名团队");return}C(),j(),b(),x(),M.success("创建成功")}).catch(l=>{console.log(l)})}function C(){V({url:"#/api/v1/project_manage/team_project_view",method:"post",data:JSON.stringify({token:d().token,team_id:d().currentTeam.id,status:1})}).then(l=>{de.value=l.data.data}).catch(l=>{console.log(l)})}function b(){V({url:"#/api/v1/project_manage/team_project_view",method:"post",data:JSON.stringify({token:d().token,team_id:d().currentTeam.id,status:-1})}).then(l=>{W.value=l.data.data}).catch(l=>{console.log(l)})}function x(){V({url:"#/api/v1/project_manage/show_star_projects",method:"post",data:JSON.stringify({token:d().token,team_id:d().currentTeam.id})}).then(l=>{ve.value=l.data.data}).catch(l=>{console.log(l)})}function j(){V({url:"#/api/v1/project_manage/show_create_projects",method:"post",data:JSON.stringify({token:d().token,team_id:d().currentTeam.id})}).then(l=>{pe.value=l.data.data}).catch(l=>{console.log(l)})}function ee(l,t){V({url:"#/api/v1/project_manage/delete_project",method:"post",data:JSON.stringify({token:d().token,project_id:t.project_id})}).then(w=>{R.value=!1,P.value=!1,C(),j(),b(),x(),t.tag=0,M.success("删除成功")}).catch(w=>{console.log(w)})}function Fe(l,t){V({url:"#/api/v1/project_manage/recover_project",method:"post",data:JSON.stringify({token:d().token,project_id:t.project_id})}).then(w=>{q.value=!1,t.tag=0,W.value.splice(l,1),de.value.push(t),C(),j(),b(),x(),M.success("恢复成功")}).catch(w=>{console.log(w)})}function je(l,t){R.value=!0,T.value=l,N.value=t}function $e(l,t){q.value=!0,T.value=l,N.value=t}function we(l,t){P.value=!0,T.value=l,N.value=t}function te(l){Q.value=!0,N.value=l}function he(l){J.value=!0,N.value=l,H.value=l.name+"_副本",K.value=l.introduction}function oe(l){V({url:"#/api/v1/project_manage/star_project",method:"post",data:JSON.stringify({token:d().token,team_id:d().currentTeam.id,project_id:l.project_id})}).then(t=>{l.star=1,C(),j(),b(),x()}).catch(t=>{console.log(t)})}function le(l){V({url:"#/api/v1/project_manage/un_star_project",method:"post",data:JSON.stringify({token:d().token,team_id:d().currentTeam.id,project_id:l.project_id})}).then(t=>{l.star=0,C(),j(),b(),x()}).catch(t=>{console.log(t)})}function Re(l){V({url:"#/api/v1/project_manage/edit_project_info",method:"post",data:JSON.stringify({token:d().token,team_id:d().currentTeam.id,project_id:l.project_id,rename:I.value})}).then(t=>{if(t.data.errno===1007){M.error("已存在同名项目");return}else if(t.data.errno===1006){M.error("项目名称不合法");return}else M.success("重命名成功");Q.value=!1,I.value=null,C(),j(),b(),x()}).catch(t=>{console.log(t)})}function qe(){X.value=!1,k.value<5&&(me.value=k.value),V({url:"#/api/v1/project_manage/search_sort_project",method:"post",data:JSON.stringify({token:d().token,team_id:d().currentTeam.id,keyword:fe.value,method:ke.value,order:ye.value,status:me.value})}).then(l=>{M.success("筛选成功"),k.value==4?k.value=6:k.value=5,_e.value=l.data.data,C(),j(),b(),x(),console.log(l)}).catch(l=>{console.log(l)})}function Pe(l){ke.value=l[0],ye.value=l[1]}function Qe(l){J.value=!1,V({url:"#/api/v1/project_manage/copy_project",method:"post",data:JSON.stringify({token:d().token,team_id:d().currentTeam.id,project_id:l.project_id,name:H.value,introduction:K.value})}).then(t=>{if(t.data.errno===1007){M.error("项目名称不合法");return}else if(t.data.errno===1008){M.error("项目名称过长");return}else if(t.data.errno===1009){M.error("已存在同名项目");return}else M.success("副本创建成功");C(),j(),b(),x()}).catch(t=>{console.log(t)})}return(l,t)=>{const w=z("el-input"),We=z("el-cascader"),c=z("el-button"),U=z("el-popover"),ae=z("el-radio-button"),Ge=z("el-radio-group"),ne=z("el-icon"),se=z("el-empty"),He=z("el-row"),Ke=z("el-col"),E=z("el-dialog");return p(),v("div",nt,[n("div",st,[u(" 项目 "),n("span",rt,[o(U,{visible:X.value,placement:"top",width:230},{reference:a(()=>[o(c,{icon:i(tt),circle:"",onClick:t[2]||(t[2]=e=>X.value=!0),style:{"margin-left":"269px","margin-top":"10px"}},null,8,["icon"])]),default:a(()=>[it,o(w,{modelValue:fe.value,"onUpdate:modelValue":t[0]||(t[0]=e=>fe.value=e),placeholder:"输入关键词",style:{"max-width":"200px","margin-top":"20px","margin-bottom":"20px"},clearable:""},null,8,["modelValue"]),o(We,{options:Ne,props:Se,clearable:"",style:{width:"200px","margin-bottom":"20px","font-size":"16px"},onChange:Pe}),n("div",ct,[o(c,{size:"medium",text:"",onClick:t[1]||(t[1]=e=>X.value=!1)},{default:a(()=>[u("取消")]),_:1}),o(c,{size:"medium",type:"primary",style:{"background-color":"#1b9aee !important"},onClick:qe},{default:a(()=>[u("确定")]),_:1})])]),_:1},8,["visible"]),o(Ge,{modelValue:Ce.value,"onUpdate:modelValue":t[3]||(t[3]=e=>Ce.value=e),style:{"margin-left":"20px"}},{default:a(()=>[o(ae,{label:"全部项目",onClick:De}),o(ae,{label:"我创建的",onClick:Le}),o(ae,{label:"我收藏的",onClick:Be}),o(ae,{label:"我删除的",onClick:Ee})]),_:1},8,["modelValue"]),o(c,{type:"primary",style:{"margin-left":"12px","margin-top":"10px","font-size":"16px","background-color":"#1b9aee !important"},onClick:t[4]||(t[4]=e=>{D.value=!0})},{default:a(()=>[u("新建项目")]),_:1})])]),n("div",ut,[o(Ke,null,{default:a(()=>[o(He,{span:"4"},{default:a(()=>[k.value==1?(p(!0),v(O,{key:0},A(de.value,(e,h)=>(p(),v("div",{key:h,class:"card",onMouseenter:s=>L(e),onMouseleave:s=>B(e)},[_(o(i(m),{icon:["fas","trash-can"],class:"trash",onClick:s=>je(h,e)},null,8,["onClick"]),[[f,e.tag]]),n("div",{class:"sub-card",onClick:s=>Z(e)},[o(U,{placement:"top-start",width:230,trigger:"hover"},{reference:a(()=>[n("span",vt,[u(g(e.name)+" ",1),o(c,{icon:i(re),circle:"",onClick:y(s=>te(e),["stop"]),style:{"margin-left":"10px"}},null,8,["icon","onClick"])])]),default:a(()=>[n("div",null,"创建时间: "+g(e.create_time),1),n("div",null,"编辑时间: "+g(e.editor_time),1)]),_:2},1024),_t,_(n("div",null,[o(ne,{class:"copy",onClick:y(s=>he(e),["stop"])},{default:a(()=>[o(i(ie))]),_:2},1032,["onClick"]),_(o(i(m),{icon:["far","star"],style:{float:"right","margin-right":"35px"},onClick:y(s=>oe(e),["stop"])},null,8,["onClick"]),[[f,!e.star]]),_(o(i(m),{icon:["fas","star"],style:{float:"right","margin-right":"35px"},onClick:y(s=>le(e),["stop"])},null,8,["onClick"]),[[f,e.star]])],512),[[f,e.tag]])],8,pt)],40,dt))),128)):S("",!0),k.value==1?(p(),v("div",{key:1,class:"card-last",onClick:t[5]||(t[5]=e=>D.value=!0)},[o(i(m),{icon:["fas","circle-plus"],style:{position:"absolute",color:"var(--color-brand1-6,#1b9aee)","font-size":"30px","margin-top":"47px","margin-left":"149px"}}),ft])):S("",!0),k.value==2?(p(),v(O,{key:2},[pe.value.length===0?(p(),v("div",gt,[o(se,{"image-size":500,style:{position:"absolute",left:"500px"}})])):S("",!0),(p(!0),v(O,null,A(pe.value,(e,h)=>(p(),v("div",{key:h,class:"card",onMouseenter:s=>L(e),onMouseleave:s=>B(e)},[o(U,{visible:e.visible,placement:"bottom",width:160,trigger:"click"},{reference:a(()=>[_(o(i(m),{icon:["fas","trash-can"],class:"trash",onClick:s=>e.visible=!0},null,8,["onClick"]),[[f,e.tag]])]),default:a(()=>[n("p",null,"此操作将删除该项目（后续可以在回收站中恢复）"+g(e.name),1),n("div",mt,[o(c,{size:"small",text:"",onClick:s=>e.visible=!1},{default:a(()=>[u("取消")]),_:2},1032,["onClick"]),o(c,{size:"small",type:"primary",onClick:s=>ee(h,e)},{default:a(()=>[u("确定")]),_:2},1032,["onClick"])])]),_:2},1032,["visible"]),n("div",{class:"sub-card",onClick:s=>Z(e)},[o(U,{placement:"top-start",width:230,trigger:"hover"},{reference:a(()=>[n("span",yt,[u(g(e.name)+" ",1),o(c,{icon:i(re),circle:"",onClick:y(s=>te(e),["stop"]),style:{"margin-left":"10px"}},null,8,["icon","onClick"])])]),default:a(()=>[n("div",null,"创建时间: "+g(e.create_time),1),n("div",null,"编辑时间: "+g(e.editor_time),1)]),_:2},1024),Ct,_(n("div",null,[o(ne,{class:"copy",onClick:y(s=>he(e),["stop"])},{default:a(()=>[o(i(ie))]),_:2},1032,["onClick"]),_(o(i(m),{icon:["far","star"],style:{float:"right","margin-right":"35px"},onClick:y(s=>oe(e),["stop"])},null,8,["onClick"]),[[f,!e.star]]),_(o(i(m),{icon:["fas","star"],style:{float:"right","margin-right":"35px"},onClick:y(s=>le(e),["stop"])},null,8,["onClick"]),[[f,e.star]])],512),[[f,e.tag]])],8,kt)],40,ht))),128))],64)):S("",!0),k.value==3?(p(),v(O,{key:3},[ve.value.length===0?(p(),v("div",bt,[o(se,{"image-size":500,style:{position:"absolute",left:"500px"}})])):S("",!0),(p(!0),v(O,null,A(ve.value,(e,h)=>(p(),v("div",{key:h,class:"card",onMouseenter:s=>L(e),onMouseleave:s=>B(e)},[o(U,{visible:e.visible,placement:"bottom",width:160,trigger:"click"},{reference:a(()=>[_(o(i(m),{icon:["fas","trash-can"],class:"trash",onClick:s=>e.visible=!0},null,8,["onClick"]),[[f,e.tag]])]),default:a(()=>[n("p",null,"此操作将删除该项目（后续可以在回收站中恢复）"+g(e.name),1),n("div",jt,[o(c,{size:"small",text:"",onClick:s=>e.visible=!1},{default:a(()=>[u("取消")]),_:2},1032,["onClick"]),o(c,{size:"small",type:"primary",onClick:s=>ee(h,e)},{default:a(()=>[u("确定")]),_:2},1032,["onClick"])])]),_:2},1032,["visible"]),n("div",{class:"sub-card",onClick:s=>Z(e)},[o(U,{placement:"top-start",width:230,trigger:"hover"},{reference:a(()=>[n("span",wt,[u(g(e.name)+" ",1),o(c,{icon:i(re),circle:"",onClick:y(s=>te(e),["stop"]),style:{"margin-left":"10px"}},null,8,["icon","onClick"])])]),default:a(()=>[n("div",null,"创建时间: "+g(e.create_time),1),n("div",null,"编辑时间: "+g(e.editor_time),1)]),_:2},1024),Vt,_(n("div",null,[o(ne,{class:"copy",onClick:t[6]||(t[6]=y(s=>J.value=!0,["stop"]))},{default:a(()=>[o(i(ie))]),_:1}),_(o(i(m),{icon:["far","star"],style:{float:"right","margin-right":"35px"},onClick:y(s=>oe(e),["stop"])},null,8,["onClick"]),[[f,!e.star]]),_(o(i(m),{icon:["fas","star"],style:{float:"right","margin-right":"35px"},onClick:y(s=>le(e),["stop"])},null,8,["onClick"]),[[f,e.star]])],512),[[f,e.tag]])],8,$t)],40,xt))),128))],64)):S("",!0),k.value==4?(p(),v(O,{key:4},[W.value.length===0?(p(),v("div",Mt,[o(se,{"image-size":500,style:{position:"absolute",left:"500px"}})])):S("",!0),(p(!0),v(O,null,A(W.value,(e,h)=>(p(),v("div",{key:h,class:"card",onMouseenter:s=>L(e),onMouseleave:s=>B(e)},[_(o(i(m),{icon:["fas","xmark"],class:"cancel",onClick:s=>we(h,e)},null,8,["onClick"]),[[f,e.tag]]),n("div",{class:"sub-card",onClick:s=>$e(h,e)},[o(U,{placement:"top-start",width:230,trigger:"hover"},{reference:a(()=>[n("span",Nt,g(e.name),1)]),default:a(()=>[n("div",null,"创建时间: "+g(e.create_time),1),n("div",null,"编辑时间: "+g(e.editor_time),1)]),_:2},1024),_(o(i(m),{icon:["fas","clock-rotate-left"],spin:"","spin-reverse":"",onMouseleave:xe,style:{color:"rgb(11, 169, 11)",float:"right","margin-right":"40px","margin-top":"10px","font-size":"60px"}},null,512),[[f,e.tag]])],8,St)],40,zt))),128))],64)):S("",!0),k.value==5?(p(!0),v(O,{key:5},A(_e.value,(e,h)=>(p(),v("div",{key:h,class:"card",onMouseenter:s=>L(e),onMouseleave:s=>B(e)},[_(o(i(m),{icon:["fas","trash-can"],class:"trash",onClick:s=>je(h,e)},null,8,["onClick"]),[[f,e.tag]]),n("div",{class:"sub-card",onClick:s=>Z(e)},[o(U,{placement:"top-start",width:230,trigger:"hover"},{reference:a(()=>[n("span",Jt,[u(g(e.name)+" ",1),o(c,{icon:i(re),circle:"",onClick:y(s=>te(e),["stop"]),style:{"margin-left":"10px"}},null,8,["icon","onClick"])])]),default:a(()=>[n("div",null,"创建时间: "+g(e.create_time),1),n("div",null,"编辑时间: "+g(e.editor_time),1)]),_:2},1024),Tt,_(n("div",null,[o(ne,{class:"copy",onClick:y(s=>he(e),["stop"])},{default:a(()=>[o(i(ie))]),_:2},1032,["onClick"]),_(o(i(m),{icon:["far","star"],style:{float:"right","margin-right":"35px"},onClick:y(s=>oe(e),["stop"])},null,8,["onClick"]),[[f,!e.star]]),_(o(i(m),{icon:["fas","star"],style:{float:"right","margin-right":"35px"},onClick:y(s=>le(e),["stop"])},null,8,["onClick"]),[[f,e.star]])],512),[[f,e.tag]])],8,Ot)],40,Ut))),128)):S("",!0),k.value==6?(p(),v("div",It,[W.value.length===0?(p(),v("div",Dt,[o(se,{"image-size":500,style:{position:"absolute",left:"500px"}})])):S("",!0),(p(!0),v(O,null,A(_e.value,(e,h)=>(p(),v("div",{key:h,class:"card",onMouseenter:s=>L(e),onMouseleave:s=>B(e)},[_(o(i(m),{icon:["fas","xmark"],class:"cancel",onClick:s=>we(h,e)},null,8,["onClick"]),[[f,e.tag]]),n("div",{class:"sub-card",onClick:s=>$e(h,e)},[o(U,{placement:"top-start",width:230,trigger:"hover"},{reference:a(()=>[n("span",Et,g(e.name),1)]),default:a(()=>[n("div",null,"创建时间: "+g(e.create_time),1),n("div",null,"编辑时间: "+g(e.editor_time),1)]),_:2},1024),_(o(i(m),{icon:["fas","clock-rotate-left"],spin:"","spin-reverse":"",onMouseleave:xe,style:{color:"rgb(11, 169, 11)",float:"right","margin-right":"40px","margin-top":"10px","font-size":"60px"}},null,512),[[f,e.tag]])],8,Bt)],40,Lt))),128))])):S("",!0)]),_:1})]),_:1})]),o(E,{modelValue:D.value,"onUpdate:modelValue":t[10]||(t[10]=e=>D.value=e),title:"新建项目",width:"30%","before-close":Ue,style:{"border-radius":"20px"}},{footer:a(()=>[n("span",Rt,[o(c,{onClick:t[9]||(t[9]=e=>D.value=!1)},{default:a(()=>[u("取消")]),_:1}),o(c,{type:"primary",style:{"background-color":"#1b9aee !important"},onClick:Ae},{default:a(()=>[u(" 确定 ")]),_:1})])]),default:a(()=>[At,o(w,{modelValue:ce.value,"onUpdate:modelValue":t[7]||(t[7]=e=>ce.value=e),placeholder:"请输入项目名称",clearable:"",style:{"font-size":"16px"},maxlength:"20"},null,8,["modelValue"]),Ft,o(w,{modelValue:ue.value,"onUpdate:modelValue":t[8]||(t[8]=e=>ue.value=e),rows:5,type:"textarea",placeholder:"请输入项目简介",clearable:"",style:{"font-size":"16px"},maxlength:"100"},null,8,["modelValue"])]),_:1},8,["modelValue"]),o(E,{modelValue:R.value,"onUpdate:modelValue":t[13]||(t[13]=e=>R.value=e),title:"提醒",width:"30%","before-close":Oe,style:{"border-radius":"20px"}},{footer:a(()=>[n("span",Pt,[o(c,{onClick:t[11]||(t[11]=e=>R.value=!1)},{default:a(()=>[u("取消")]),_:1}),o(c,{type:"primary",style:{"background-color":"#1b9aee !important"},onClick:t[12]||(t[12]=e=>ee(T.value,N.value))},{default:a(()=>[u(" 确定 ")]),_:1})])]),default:a(()=>[qt]),_:1},8,["modelValue"]),o(E,{modelValue:q.value,"onUpdate:modelValue":t[16]||(t[16]=e=>q.value=e),title:"提醒",width:"30%","before-close":Je,style:{"border-radius":"20px"}},{footer:a(()=>[n("span",Wt,[o(c,{onClick:t[14]||(t[14]=e=>q.value=!1)},{default:a(()=>[u("取消")]),_:1}),o(c,{type:"primary",style:{"background-color":"#1b9aee !important"},onClick:t[15]||(t[15]=e=>Fe(T.value,N.value))},{default:a(()=>[u(" 确定 ")]),_:1})])]),default:a(()=>[Qt]),_:1},8,["modelValue"]),o(E,{modelValue:P.value,"onUpdate:modelValue":t[19]||(t[19]=e=>P.value=e),title:"警告",width:"30%","before-close":Te,style:{"border-radius":"20px"}},{footer:a(()=>[n("span",Ht,[o(c,{onClick:t[17]||(t[17]=e=>P.value=!1)},{default:a(()=>[u("取消")]),_:1}),o(c,{type:"primary",style:{"background-color":"#1b9aee !important"},onClick:t[18]||(t[18]=e=>ee(T.value,N.value))},{default:a(()=>[u(" 确定 ")]),_:1})])]),default:a(()=>[Gt]),_:1},8,["modelValue"]),o(E,{modelValue:Q.value,"onUpdate:modelValue":t[22]||(t[22]=e=>Q.value=e),title:"重命名",width:"30%","before-close":be,style:{"border-radius":"20px"}},{footer:a(()=>[n("span",Kt,[o(c,{onClick:be},{default:a(()=>[u("取消")]),_:1}),o(c,{type:"primary",style:{"background-color":"#1b9aee !important"},onClick:t[21]||(t[21]=e=>Re(N.value))},{default:a(()=>[u(" 确定 ")]),_:1})])]),default:a(()=>[o(w,{modelValue:I.value,"onUpdate:modelValue":t[20]||(t[20]=e=>I.value=e),placeholder:"请输入新的项目名称",clearable:"",maxlength:"20",style:{"font-size":"16px"}},null,8,["modelValue"])]),_:1},8,["modelValue"]),o(E,{modelValue:J.value,"onUpdate:modelValue":t[27]||(t[27]=e=>J.value=e),title:"创建项目副本",width:"30%","before-close":Ie,style:{"border-radius":"20px"}},{footer:a(()=>[n("span",Zt,[o(c,{onClick:t[25]||(t[25]=e=>J.value=!1)},{default:a(()=>[u("取消")]),_:1}),o(c,{type:"primary",style:{"background-color":"#1b9aee !important"},onClick:t[26]||(t[26]=e=>Qe(N.value))},{default:a(()=>[u(" 确定 ")]),_:1})])]),default:a(()=>[Xt,o(w,{modelValue:H.value,"onUpdate:modelValue":t[23]||(t[23]=e=>H.value=e),clearable:"",style:{"font-size":"16px"},maxlength:"20"},null,8,["modelValue"]),Yt,o(w,{modelValue:K.value,"onUpdate:modelValue":t[24]||(t[24]=e=>K.value=e),rows:5,type:"textarea",clearable:"",style:{"font-size":"16px"},maxlength:"100"},null,8,["modelValue"])]),_:1},8,["modelValue"])])}}});const oo=at(eo,[["__scopeId","data-v-5a548ee3"]]);export{oo as default};