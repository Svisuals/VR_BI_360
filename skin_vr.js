// Garden Gnome Software - VR - Skin
// Pano2VR 7.0.4/19982
// Filename: venis_vr.ggsk
// Generated 2024-06-22T10:40:07

function pano2vrVrSkin(player,base) {
	player.addVariable('node_cloner_hasUp', 2, false, { ignoreInState: 0  });
	player.addVariable('node_cloner_hasDown', 2, false, { ignoreInState: 0  });
	player.addVariable('vis_info_hotspots', 0, "", { ignoreInState: 0  });
	player.addVariable('vis_image_hotspots', 0, "", { ignoreInState: 0  });
	player.addVariable('vis_video_file_hotspots', 0, "", { ignoreInState: 0  });
	player.addVariable('vis_video_url_hotspots', 0, "", { ignoreInState: 0  });
	var me=this;
	var skin=this;
	var flag=false;
	var hotspotTemplates={};
	var skinKeyPressed = 0;
	this.player=player;
	this.player.vrSkinObj=this;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown={};
	this.elementMouseOver={};
	var i;
	var hs,el,els,elo,ela,geometry,material;
	player.setMargins(0,0,0,0);
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.skinGroup);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.userData.ggId)) r.push(e);
			} else {
				if (e.userData.ggId==id) r.push(e);
			}
			if (e.children.length > 0) {
				for(var i=0;i<e.children.length;i++) {
					stack.push(e.children[i]);
				}
			}
		}
		return r;
	}
	
	this.posInSkin=function(el, clonerParent) {
		var curParent = el.parent;
		var pos = {x: el.position.x, y: el.position.y};
		while (curParent && curParent != me.skinGroup) {
			pos.x += curParent.position.x;
			pos.y += curParent.position.y;
			if (curParent.parent) {
				curParent = curParent.parent;
			} else {
				curParent = clonerParent
			}
		}
		return pos;
	}
	
	this._=function(text, params) {
		return player._(text, params);
	}
	this.languageChanged=function() {
		if (!me.skinGroup) return;
		var stack=[];
		stack.push(me.skinGroup);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.userData && e.userData.ggUpdateText) {
				e.userData.ggUpdateText();
			}
			for(var i=0;i<e.children.length;i++) {
				stack.push(e.children[i]);
			}
		}
	}
	player.addListener('languagechanged', this.languageChanged);
	this.getElementVrPosition = function(el, x, y) {
		var vrPos = {};
		var renderableEl = (el.parent.type == 'Mesh' || el.parent.type == 'Group');
		switch (el.userData.hanchor) {
			case 0:
			vrPos.x = (renderableEl ? el.parent.position.x : 0) - ((renderableEl ? el.parent.userData.width : 800) / 200.0) + (x / 100.0) + (el.userData.width / 200.0);
			break;
			case 1:
			vrPos.x = (renderableEl ? el.parent.position.x : 0) + (x / 100.0);
			break;
			case 2:
			vrPos.x = (renderableEl ? el.parent.position.x : 0) + ((renderableEl ? el.parent.userData.width : 800) / 200.0) - (x / 100.0) - (el.userData.width / 200.0);
			break;
		}
		switch (el.userData.vanchor) {
			case 0:
			vrPos.y = (renderableEl ? el.parent.position.y : 0) + ((renderableEl ? el.parent.userData.height : 600) / 200.0) - (y / 100.0) - (el.userData.height / 200.0);
			break;
			case 1:
			vrPos.y = (renderableEl ? el.parent.position.y : 0) - (y / 100.0);
			break;
			case 2:
			vrPos.y = (renderableEl ? el.parent.position.y : 0) - ((renderableEl ? el.parent.userData.height : 600) / 200.0) + (y / 100.0) + (el.userData.height / 200.0);
			break;
		}
		vrPos.x += el.userData.curScaleOffX;
		vrPos.y += el.userData.curScaleOffY;
		return vrPos;
	}
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		this.skinGroup=player.getSkinGroup();
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 250;
		el.userData.height = 500;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'thumbnails';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._thumbnails.material) me._thumbnails.material.opacity = v;
			me._thumbnails.visible = (v>0 && me._thumbnails.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._thumbnails.visible
			let parentEl = me._thumbnails.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._thumbnails.userData.opacity = v;
			v = v * me._thumbnails.userData.parentOpacity;
			me._thumbnails.userData.setOpacityInternal(v);
			for (let i = 0; i < me._thumbnails.children.length; i++) {
				let child = me._thumbnails.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._thumbnails.userData.parentOpacity = v;
			v = v * me._thumbnails.userData.opacity
			me._thumbnails.userData.setOpacityInternal(v);
			for (let i = 0; i < me._thumbnails.children.length; i++) {
				let child = me._thumbnails.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._thumbnails = el;
		el.userData.ggId="thumbnails";
		me._thumbnails.userData.ggUpdatePosition=function (useTransition) {
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.translateX(0);
		el.translateY(2.33);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 250;
		el.userData.height = 34;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'node_cloner';
		el.userData.x = 0;
		el.userData.y = 2.33;
		el.userData.hanchor = 1;
		el.userData.vanchor = 0;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._node_cloner.material) me._node_cloner.material.opacity = v;
			me._node_cloner.visible = (v>0 && me._node_cloner.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._node_cloner.visible
			let parentEl = me._node_cloner.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._node_cloner.userData.opacity = v;
			v = v * me._node_cloner.userData.parentOpacity;
			me._node_cloner.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_cloner.children.length; i++) {
				let child = me._node_cloner.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._node_cloner.userData.parentOpacity = v;
			v = v * me._node_cloner.userData.opacity
			me._node_cloner.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_cloner.children.length; i++) {
				let child = me._node_cloner.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._node_cloner = el;
		el.userData.ggNumRepeat = 100;
		el.userData.ggCloneOffset = 0;
		el.userData.ggNumRows = 0;
		el.userData.ggNumCols = 0;
		el.userData.ggUpdating = false;
		el.userData.ggFilter = [];
		el.userData.ggInstances = [];
		el.userData.ggGoUp = function() {
			if (me._node_cloner.userData.ggCloneOffset + me._node_cloner.userData.ggNumRows <= me._node_cloner.userData.ggNumFilterPassed) {
				me._node_cloner.userData.ggCloneOffset += me._node_cloner.userData.ggNumRows;
				me._node_cloner.userData.ggCloneOffsetChanged = true;
				me._node_cloner.userData.ggUpdate();
			}
		}
		el.userData.ggGoDown = function() {
			if (me._node_cloner.userData.ggCloneOffset > 0) {
				me._node_cloner.userData.ggCloneOffset -= me._node_cloner.userData.ggNumRows;
				me._node_cloner.userData.ggCloneOffset = Math.max(me._node_cloner.userData.ggCloneOffset, 0);
				me._node_cloner.userData.ggCloneOffsetChanged = true;
				me._node_cloner.userData.ggUpdate();
			}
		}
		el.getFilteredNodes = function(tourNodes, filter) {
			var filteredNodes = [];
			for (var i = 0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var passed = true;
				var nodeData = player.getNodeUserdata(nodeId);
				if (filter.length > 0) {
					for (var j=0; j < filter.length; j++) {
						if (nodeData['tags'].indexOf(filter[j].trim()) == -1) passed = false;
					}
				}
				if (passed) {
					filteredNodes.push(nodeId);
				}
			}
			return filteredNodes;
		}
		el.userData.ggUpdate = function(filter) {
			if(me._node_cloner.userData.ggUpdating == true) return;
			me._node_cloner.userData.ggUpdating = true;
			var el=me._node_cloner;
			var curNumRows = 0;
			var parentHeight = me._node_cloner.parent.userData.height;
			me._node_cloner.userData.offsetTop = (me._node_cloner.parent.userData.height / 200.0) + me._node_cloner.userData.y - (me._node_cloner.userData.height / 200.0);
			curNumRows = Math.floor(((parentHeight - me._node_cloner.userData.offsetTop) * me._node_cloner.userData.ggNumRepeat / 100.0) / me._node_cloner.userData.height);
			if (curNumRows < 1) curNumRows = 1;
			if (typeof filter=='object') {
				el.userData.ggFilter = filter;
			} else {
				filter = el.userData.ggFilter;
			};
			if (me.ggTag) filter.push(me.ggTag);
			filter=filter.sort();
			if ((el.userData.ggNumRows == curNumRows) && (el.userData.ggInstances.length > 0) && (filter.length === el.userData.ggCurrentFilter.length) && (filter.every(function(value, index) { return value === el.userData.ggCurrentFilter[index] }) ) && (!me._node_cloner.userData.ggCloneOffsetChanged)) {
				me._node_cloner.userData.ggUpdating = false;
				return;
			} else {
				el.userData.ggNumCols = 1;
				el.userData.ggNumRows = curNumRows;
			var centerOffsetHor = 0;
			var centerOffsetVert = 0;
				me._node_cloner.userData.ggCloneOffsetChanged = false;
			}
			el.userData.ggCurrentFilter = filter;
			el.userData.ggInstances = [];
			el.remove(...el.children);
			var tourNodes = player.getNodeIds();
			var row = 0;
			var column = 0;
			var currentIndex = 0;
			var keepCloning = true;
			me._node_cloner.userData.ggNumFilterPassed = 0;
			tourNodes = me._node_cloner.getFilteredNodes(tourNodes, filter);
			me._node_cloner.userData.ggNumFilterPassed = tourNodes.length;
			for (var i = 0; i < tourNodes.length; i++) {
				var nodeId = tourNodes[i];
				var nodeData = player.getNodeUserdata(nodeId);
				if (!keepCloning || i < me._node_cloner.userData.ggCloneOffset) continue;
				var parameter={};
				parameter.top = -(centerOffsetVert / 100.0) - (row * me._node_cloner.userData.height) / 100.0;
				parameter.left = (centerOffsetHor / 100.0) + (column * me._node_cloner.userData.width) / 100.0;
				parameter.index=currentIndex;
				parameter.title=nodeData['title'];
				var inst = new SkinCloner_node_cloner_Class(nodeId, me, el, parameter);
				currentIndex++;
				el.userData.ggInstances.push(inst);
				var bbox = new THREE.Box3().setFromObject(inst.__obj);
				var clonerPosInSkin = skin.posInSkin(me._node_cloner, me.ggParent);
				if (bbox.min.x + clonerPosInSkin.x >= -4 && bbox.max.x + clonerPosInSkin.x <= 4 && bbox.min.y + clonerPosInSkin.y >= -3 && bbox.max.y + clonerPosInSkin.y <= 3) el.add(inst.__obj);
				row++;
				if (row >= el.userData.ggNumRows) {
					keepCloning = false;
				}
			}
			player.setVariableValue('node_cloner_hasDown', me._node_cloner.userData.ggCloneOffset > 0);
			player.setVariableValue('node_cloner_hasUp', me._node_cloner.userData.ggCloneOffset + me._node_cloner.userData.ggNumRows < me._node_cloner.userData.ggNumFilterPassed);
			me._node_cloner.userData.ggNodeCount = me._node_cloner.userData.ggNumFilterPassed;
			me._node_cloner.userData.ggUpdating = false;
			player.triggerEvent('clonerchanged');
		}
		el.userData.ggFilter = [];
		el.userData.ggId="node_cloner";
		me._node_cloner.userData.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnails.add(me._node_cloner);
		geometry = new THREE.PlaneBufferGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'page_up_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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');
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'page_up_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(1.525);
		el.translateY(1.825);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'page_up';
		el.userData.x = 1.525;
		el.userData.y = 1.825;
		el.userData.hanchor = 2;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._page_up.material) me._page_up.material.opacity = v;
			me._page_up.visible = (v>0 && me._page_up.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._page_up.visible
			let parentEl = me._page_up.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._page_up.userData.opacity = v;
			v = v * me._page_up.userData.parentOpacity;
			me._page_up.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_up.children.length; i++) {
				let child = me._page_up.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._page_up.userData.parentOpacity = v;
			v = v * me._page_up.userData.opacity
			me._page_up.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_up.children.length; i++) {
				let child = me._page_up.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._page_up = el;
		el.userData.ggId="page_up";
		me._page_up.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				((player.getVariableValue('node_cloner_hasDown') == false))
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._page_up.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._page_up.ggCurrentLogicStatePosition = newLogicStatePosition;
				if (me._page_up.ggCurrentLogicStatePosition == 0) {
					var newPos = skin.getElementVrPosition(me._page_up, -50, 0);
					me._page_up.position.x = newPos.x;
					me._page_up.position.y = newPos.y;
				}
				else {
					var elPos = skin.getElementVrPosition(me._page_up, -50, 45);
					me._page_up.position.x = elPos.x;
					me._page_up.position.y = elPos.y;
				}
			}
		}
		me._page_up.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['page_up'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._page_up.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._page_up.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._page_up.ggCurrentLogicStateScaling == 0) {
					me._page_up.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._page_up.userData.transitions.length; i++) {
						if (me._page_up.userData.transitions[i].property == 'scale') {
							clearInterval(me._page_up.userData.transitions[i].interval);
							me._page_up.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._page_up.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._page_up.scale.set(transition_scale.startScale.x + (me._page_up.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._page_up.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._page_up.position.x = (me._page_up.position.x - me._page_up.userData.curScaleOffX) + scaleOffX;
						me._page_up.userData.curScaleOffX = scaleOffX;
						me._page_up.position.y = (me._page_up.position.y - me._page_up.userData.curScaleOffY) + scaleOffY;
						me._page_up.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._page_up.userData.transitions.splice(me._page_up.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._page_up.userData.transitions.push(transition_scale);
				}
				else {
					me._page_up.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._page_up.userData.transitions.length; i++) {
						if (me._page_up.userData.transitions[i].property == 'scale') {
							clearInterval(me._page_up.userData.transitions[i].interval);
							me._page_up.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._page_up.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._page_up.scale.set(transition_scale.startScale.x + (me._page_up.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._page_up.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._page_up.position.x = (me._page_up.position.x - me._page_up.userData.curScaleOffX) + scaleOffX;
						me._page_up.userData.curScaleOffX = scaleOffX;
						me._page_up.position.y = (me._page_up.position.y - me._page_up.userData.curScaleOffY) + scaleOffY;
						me._page_up.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._page_up.userData.transitions.splice(me._page_up.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._page_up.userData.transitions.push(transition_scale);
				}
			}
		}
		me._page_up.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('node_cloner_hasUp') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._page_up.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._page_up.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._page_up.ggCurrentLogicStateVisible == 0) {
			me._page_up.visible=((!me._page_up.material && Number(me._page_up.userData.opacity>0)) || Number(me._page_up.material.opacity)>0)?true:false;
			me._page_up.userData.visible=true;
				}
				else {
			me._page_up.visible=false;
			me._page_up.userData.visible=false;
				}
			}
		}
		me._page_up.userData.onclick=function (e) {
			skin.findElements('node_cloner')[0].userData.ggGoUp();
		}
		me._page_up.userData.onmouseover=function (e) {
			me.elementMouseOver['page_up']=true;
			me._page_up.logicBlock_scaling();
		}
		me._page_up.userData.ontouchend=function (e) {
			me._page_up.logicBlock_scaling();
		}
		me._page_up.userData.onmouseout=function (e) {
			me.elementMouseOver['page_up']=false;
			me._page_up.logicBlock_scaling();
		}
		me._page_up.ggCurrentLogicStatePosition = -1;
		me._page_up.ggCurrentLogicStateScaling = -1;
		me._page_up.ggCurrentLogicStateVisible = -1;
		me._page_up.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['page_up']) {
				me.elementMouseOver['page_up']=true;
			}
		}
		me._page_up.userData.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnails.add(me._page_up);
		geometry = new THREE.PlaneBufferGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'page_down_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAHMUlEQVR4nO2dW2gUVxjH/9/ZlWmwCqUvMV7elLFKLoUWqkKLgjXb3UgLPqhQn9z42Jc+iNqCVgQt9LGpyUuFGGjAy+40afvgU6pgMUlTlbh9M3EJVKF4IUmzM18fMiOpTeZ65pLN/GCfds53vvxyODN75sw3QEpKSkpKSkpKSh1BcSfwKu3t7Uomk3kbgEpEWwBsAbABwFrzs8Y89BmAp+ZnEkCFmSsAxnVdHx4cHJyNPvulSYJoyuVyLdlstt0wjN1EtAvAawFjTjPzr0KIG7VabXBgYOB3ACwhV9/EJrqjo6PJMIzDRPQpgO0hd3eXmS8JIXpLpVI15L4WJXLRhUJhGxEdZ+aDAETE3RtE1MfM58rl8r0oO45MtCn4DDN/HFWfdhDRVSI6ef369f'+
	'uR9Bd2BwcOHHh9ZmbmSwCfAciG3Z9HakT0jaIop/v7+5+H2VGoovP5fE4I8R0zbwizn6AQ0aRhGJ2apg2E1kcYQYvF4qqpqamzzPx5GPHDgoguNDY2nrh48eKc9NiyA+bz+fVE1A/gPdmxI+IWMx/QNO2RzKBSRefzeZWIfgGwUWbcGHhIRHtLpdIDWQGlXV7l8/l3iWgIy18yAGxi5qFCofCOrIBSRrQp+QaA1TLiJYjnzLxH07TbQQMFFm1OF0MA3gwaK6E8IaKdQaeRQKLNE99NAJuCxFkGPGTmHUFOkL7n6GKxuMq8uqh3ycD83/hDsVhc5TeAb9FTU1NnsXwv4TxDRDuq1epXvtv7aZTP53NE9KPfTpczzPyRn1+QnkWbaxfjANZ7bVsPENGkoihbva6NeJ46Zmdnv8AKlQwAzLxhenr6lNd2nkZ0oVDYBmAU'+
	'yVuFi5oagFYva9qeRjQRnUEqGZh3cNpLA9cj2hzNd71mVM8IIba5vXHgekQT0XH/KdUnhmG4duJqRHd0dDQx8wSiv8eXdAwi2ujmhq8rcYZhHHZ77ApDMPMhVwe6OIaI6EjAhOqZI3AxMziKzuVyLQC2ychIBs3NzWhra4s7jYVsNx3Z4ig6m822y8knOM3NzTh27BiOHj2aKNlCiH2OxzgdYBjGbjnpBMOSnMlkkMlkEiWbiBwd2c4t7e3tSjab/RvB98IFYqHkhei6ju7uboyMjMSU2Uuma7XaG3YbK21HtLmrM1GSx8bGMDY2BgBJGtkN2WzWNgmnqUOVmIxnXpU8MjKCrq4udHV1YXh4GECiZNu6shVt7k+OhcUkd3d3Q9d16LqOnp6eRMlmZltXTiM6FtF2ki2Wkt3a2hpHyo6D0kl05Hvm3Ei2WEx2sViMS7'+
	'btfhYn0WslJuKIF8kWCZK9xu7LxIj2I9kiIbJtXTmJtv0vySKIZIsEyA40okNHhmSLpWS3tDguRYSOk+hnYXYuU7LFYrI7OzujkG3rykn0U4mJ/IcwJFvEJNvWVSyiW1paQpNsEYPsQCN6UmIiAOYld3Z2hirZImLZE3ZfOomuSEzkf5KHh4dDk2wRlWzz8eglsRXt1NgLi0nu6ekJVbJFFLKJyL9oAOMykohTskUEsm1d2YrWdX0YwEyQ3lVVjV2yxVKyVTXwavB0rVazvftgK3pwcHCWmYeCZDAxMYFqdX7bQ5ySLV6VXa1WMTFhex5zw5BT2YqM3ZcAoKrqBgB7/GYwNzeHO3fugJnR19cXq2QLZsbo6CgymQx6e3vx4sWLoPF6KpWK7YB03I+Qy+VaM5lM7Dflkoyu620DAwOjdsc4rnWYRUXSzY1LwMx/mI5s'+
	'cbOoxMx8SUJOdQkRXYKL6jauVu+EEL0AjKBJ1SEGEV12c6Ar0aVSqUpEfcFyqksuuy0d5Ho9mpnP+c+nPhFCuHbiWnS5XL5HRFf9pVSXXPFSJsjTHRZmPoX5B2VWOjUhhKcnsxx/sCykUqn8parqGgA7PaVVZzDz1+Vy2dM5y/M9Q0VRThOR9HXq5QIRTTY0NJzx2s7TiAaA+/fv/7N58+YHRHTYa9t6gJkPXrt2zXPNPM+iAaBSqfypqupqrLAphJnPa5r2rZ+2vrcbNDY2ngBwy2/75QYz32xqajrpt31aGMUd8RVGAQBN0x4x84cAngSJk3AeE9HeoOXZAu9U0jRtnJlzAEItORkTzwHkZJRlk7IlTNO028y8B/U1sh8D2F0ul3+TESyMAoM/Y/nP2cktMAi8nEZ2YBlfjTDzTWbeIVMyEMJuUk3THq1bt+59Zj'+
	'4vO3bYMPP5pqamD2TXJQXSssYAoilrHOr+aE3TBhRF2UpEF5DMVb8aM59XFGVrmJKBiEvPY748zidR9enAFSHEqbopPf8q+/fvf8us3HIIMbxMAcBlIcS5qARbxPp6ELOoyBFE8HoQAN8Tket7fLJJzAtvhBD7zCoBuwA0BIw5DWCImW8YhvHTin7hzVKYFRXaAKjMvMV8InUj5p96WuwVTs8ATDBzxdw6O16r1UaS9gqnlJSUlJSUlJSUuuJfdmuJWu1bgfMAAAAASUVORK5CYII=');
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'page_down_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(1.525);
		el.translateY(2.275);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'page_down';
		el.userData.x = 1.525;
		el.userData.y = 2.275;
		el.userData.hanchor = 2;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._page_down.material) me._page_down.material.opacity = v;
			me._page_down.visible = (v>0 && me._page_down.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._page_down.visible
			let parentEl = me._page_down.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._page_down.userData.opacity = v;
			v = v * me._page_down.userData.parentOpacity;
			me._page_down.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_down.children.length; i++) {
				let child = me._page_down.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._page_down.userData.parentOpacity = v;
			v = v * me._page_down.userData.opacity
			me._page_down.userData.setOpacityInternal(v);
			for (let i = 0; i < me._page_down.children.length; i++) {
				let child = me._page_down.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._page_down = el;
		el.userData.ggId="page_down";
		me._page_down.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['page_down'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._page_down.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._page_down.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._page_down.ggCurrentLogicStateScaling == 0) {
					me._page_down.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._page_down.userData.transitions.length; i++) {
						if (me._page_down.userData.transitions[i].property == 'scale') {
							clearInterval(me._page_down.userData.transitions[i].interval);
							me._page_down.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._page_down.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._page_down.scale.set(transition_scale.startScale.x + (me._page_down.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._page_down.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._page_down.position.x = (me._page_down.position.x - me._page_down.userData.curScaleOffX) + scaleOffX;
						me._page_down.userData.curScaleOffX = scaleOffX;
						me._page_down.position.y = (me._page_down.position.y - me._page_down.userData.curScaleOffY) + scaleOffY;
						me._page_down.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._page_down.userData.transitions.splice(me._page_down.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._page_down.userData.transitions.push(transition_scale);
				}
				else {
					me._page_down.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._page_down.userData.transitions.length; i++) {
						if (me._page_down.userData.transitions[i].property == 'scale') {
							clearInterval(me._page_down.userData.transitions[i].interval);
							me._page_down.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._page_down.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._page_down.scale.set(transition_scale.startScale.x + (me._page_down.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._page_down.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._page_down.position.x = (me._page_down.position.x - me._page_down.userData.curScaleOffX) + scaleOffX;
						me._page_down.userData.curScaleOffX = scaleOffX;
						me._page_down.position.y = (me._page_down.position.y - me._page_down.userData.curScaleOffY) + scaleOffY;
						me._page_down.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._page_down.userData.transitions.splice(me._page_down.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._page_down.userData.transitions.push(transition_scale);
				}
			}
		}
		me._page_down.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('node_cloner_hasDown') == true))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._page_down.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._page_down.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._page_down.ggCurrentLogicStateVisible == 0) {
			me._page_down.visible=((!me._page_down.material && Number(me._page_down.userData.opacity>0)) || Number(me._page_down.material.opacity)>0)?true:false;
			me._page_down.userData.visible=true;
				}
				else {
			me._page_down.visible=false;
			me._page_down.userData.visible=false;
				}
			}
		}
		me._page_down.userData.onclick=function (e) {
			skin.findElements('node_cloner')[0].userData.ggGoDown();
		}
		me._page_down.userData.onmouseover=function (e) {
			me.elementMouseOver['page_down']=true;
			me._page_down.logicBlock_scaling();
		}
		me._page_down.userData.ontouchend=function (e) {
			me._page_down.logicBlock_scaling();
		}
		me._page_down.userData.onmouseout=function (e) {
			me.elementMouseOver['page_down']=false;
			me._page_down.logicBlock_scaling();
		}
		me._page_down.ggCurrentLogicStateScaling = -1;
		me._page_down.ggCurrentLogicStateVisible = -1;
		me._page_down.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['page_down']) {
				me.elementMouseOver['page_down']=true;
			}
		}
		me._page_down.userData.ggUpdatePosition=function (useTransition) {
		}
		me._thumbnails.add(me._page_down);
		me.skinGroup.add(me._thumbnails);
		me._thumbnails.userData.setOpacity(1.00);
		me._node_cloner.userData.setOpacity(1.00);
		me._node_cloner.userData.ggUpdate();
		me._page_up.userData.setOpacity(1.00);
		me._page_down.userData.setOpacity(1.00);
		player.addListener('activehotspotchanged', function() {
			if (hotspotTemplates.hasOwnProperty('ht_info')) {
				for(var i = 0; i < hotspotTemplates['ht_info'].length; i++) {
					hotspotTemplates['ht_info'][i].ggEvent_activehotspotchanged();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_image')) {
				for(var i = 0; i < hotspotTemplates['ht_image'].length; i++) {
					hotspotTemplates['ht_image'][i].ggEvent_activehotspotchanged();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_node')) {
				for(var i = 0; i < hotspotTemplates['ht_node'].length; i++) {
					hotspotTemplates['ht_node'][i].ggEvent_activehotspotchanged();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_activehotspotchanged();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_url')) {
				for(var i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
					hotspotTemplates['ht_video_url'][i].ggEvent_activehotspotchanged();
				}
			}
		});
		player.addListener('changenode', function() {
			if (hotspotTemplates.hasOwnProperty('ht_info')) {
				for(var i = 0; i < hotspotTemplates['ht_info'].length; i++) {
					hotspotTemplates['ht_info'][i].ggEvent_changenode();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_image')) {
				for(var i = 0; i < hotspotTemplates['ht_image'].length; i++) {
					hotspotTemplates['ht_image'][i].ggEvent_changenode();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_node')) {
				for(var i = 0; i < hotspotTemplates['ht_node'].length; i++) {
					hotspotTemplates['ht_node'][i].ggEvent_changenode();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_changenode();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_url')) {
				for(var i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
					hotspotTemplates['ht_video_url'][i].ggEvent_changenode();
				}
			}
			me._page_up.logicBlock_position();
			me._page_up.logicBlock_visible();
			me._page_down.logicBlock_visible();
		});
		player.addListener('configloaded', function() {
			if (hotspotTemplates.hasOwnProperty('ht_info')) {
				for(var i = 0; i < hotspotTemplates['ht_info'].length; i++) {
					hotspotTemplates['ht_info'][i].ggEvent_configloaded();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_image')) {
				for(var i = 0; i < hotspotTemplates['ht_image'].length; i++) {
					hotspotTemplates['ht_image'][i].ggEvent_configloaded();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_node')) {
				for(var i = 0; i < hotspotTemplates['ht_node'].length; i++) {
					hotspotTemplates['ht_node'][i].ggEvent_configloaded();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_configloaded();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_url')) {
				for(var i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
					hotspotTemplates['ht_video_url'][i].ggEvent_configloaded();
				}
			}
			me._page_up.logicBlock_position();
			me._page_up.logicBlock_visible();
			me._page_down.logicBlock_visible();
		});
		player.addListener('varchanged_node_cloner_hasDown', function() {
			me._page_up.logicBlock_position();
			me._page_down.logicBlock_visible();
		});
		player.addListener('varchanged_node_cloner_hasUp', function() {
			me._page_up.logicBlock_visible();
		});
		player.addListener('varchanged_vis_image_hotspots', function() {
			if (hotspotTemplates.hasOwnProperty('ht_image')) {
				for(var i = 0; i < hotspotTemplates['ht_image'].length; i++) {
					hotspotTemplates['ht_image'][i].ggEvent_varchanged_vis_image_hotspots();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_node')) {
				for(var i = 0; i < hotspotTemplates['ht_node'].length; i++) {
					hotspotTemplates['ht_node'][i].ggEvent_varchanged_vis_image_hotspots();
				}
			}
		});
		player.addListener('varchanged_vis_info_hotspots', function() {
			if (hotspotTemplates.hasOwnProperty('ht_info')) {
				for(var i = 0; i < hotspotTemplates['ht_info'].length; i++) {
					hotspotTemplates['ht_info'][i].ggEvent_varchanged_vis_info_hotspots();
				}
			}
		});
		player.addListener('varchanged_vis_video_file_hotspots', function() {
			if (hotspotTemplates.hasOwnProperty('ht_video_file')) {
				for(var i = 0; i < hotspotTemplates['ht_video_file'].length; i++) {
					hotspotTemplates['ht_video_file'][i].ggEvent_varchanged_vis_video_file_hotspots();
				}
			}
			if (hotspotTemplates.hasOwnProperty('ht_video_url')) {
				for(var i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
					hotspotTemplates['ht_video_url'][i].ggEvent_varchanged_vis_video_file_hotspots();
				}
			}
		});
		player.addListener('varchanged_vis_video_url_hotspots', function() {
			if (hotspotTemplates.hasOwnProperty('ht_video_url')) {
				for(var i = 0; i < hotspotTemplates['ht_video_url'].length; i++) {
					hotspotTemplates['ht_video_url'][i].ggEvent_varchanged_vis_video_url_hotspots();
				}
			}
		});
	};
	this.removeSkin=function() {
	};
	function SkinCloner_node_cloner_Class(nodeId, parentScope, ggParent, parameter) {
		var me=this;
		me.parentScope=parentScope;
		me.ggParent=ggParent;
		me.findElements=skin.findElements;
		me.ggIndex=parameter.index;
		me.ggNodeId=nodeId;
		me.ggTitle=parameter.title;
		me.ggUserdata=skin.player.getNodeUserdata(me.ggNodeId);
		me.ggUserdata.nodeId=me.ggNodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
			me.__obj = new THREE.Group;
			me.__obj.name = 'node_cloner_subElement';
			me.__obj.position.x = parameter.left;
			me.__obj.position.y = parameter.top;
			me.__obj.userData.ggIsActive = function() {
				return player.getCurrentNode()==me.userData.ggNodeId;
			}
			me.__obj.userData.ggElementNodeId=function() {
				return me.userData.ggNodeId;
			}
		geometry = new THREE.PlaneBufferGeometry(2.5, 0.32, 5, 5 );
		geometry.name = 'node_title_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'node_title_material';
		el = new THREE.Mesh( geometry, material );
		width = 2.5;
		height = 0.32;
		borderShape = new THREE.Shape();
		borderShape.moveTo((width / 2.0) - 0 + 0, (height / 2.0) + 0);
		borderShape.lineTo((width / 2.0) + 0 - 0, (height / 2.0) + 0);
		borderShape.lineTo((width / 2.0) + 0, (-height / 2.0) - 0.02 + 0);
		borderShape.lineTo((-width / 2.0) - 0 + 0, (-height / 2.0) - 0.02);
		borderShape.lineTo((-width / 2.0) - 0, (height / 2.0) + 0 - 0);
		innerShape = new THREE.Path();
		innerShape.moveTo((-width / 2.0), (height / 2.0));
		innerShape.lineTo((width / 2.0), (height / 2.0));
		innerShape.lineTo((width / 2.0), (-height / 2.0));
		innerShape.lineTo((-width / 2.0), (-height / 2.0));
		borderShape.holes.push(innerShape);
		borderGeometry = new THREE.ShapeGeometry(borderShape);
		borderGeometry.name = 'node_title_borderGeometry';
		borderMaterial = new THREE.MeshBasicMaterial( {color: new THREE.Color('rgba(77,77,77,1)').convertSRGBToLinear() , side: THREE.DoubleSide, transparent: true } );
		borderMaterial.name = 'node_title_borderMaterial';
		el.userData.border = new THREE.Mesh( borderGeometry, borderMaterial );
		el.userData.border.name = 'node_title_borderMesh';
		el.add(el.userData.border);
		el.userData.backgroundColorAlpha = 0.666667;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._node_title.material.opacity = v;
			if (me._node_title.userData.hasScrollbar) {
				me._node_title.userData.scrollbar.material.opacity = v;
				me._node_title.userData.scrollbarBg.material.opacity = v;
			}
			me._node_title.userData.border.material.opacity = v * me._node_title.userData.borderColorAlpha;
			if (me._node_title.userData.ggSubElement) {
				me._node_title.userData.ggSubElement.material.opacity = v
				me._node_title.userData.ggSubElement.visible = (v>0 && me._node_title.userData.visible);
			}
			me._node_title.visible = (v>0 && me._node_title.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._node_title.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._node_title.userData.backgroundColorAlpha = v;
			me._node_title.userData.setOpacity(me._node_title.userData.opacity);
		}
		el.userData.setBorderColor = function(v) {
			me._node_title.userData.border.material.color = v;
		}
		el.userData.setBorderColorAlpha = function(v) {
			me._node_title.userData.borderColorAlpha = v;
			me._node_title.userData.setOpacity(me._node_title.userData.opacity);
		}
		el.translateX(0);
		el.translateY(0.01);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 250;
		el.userData.height = 32;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'node_title';
		el.userData.x = 0;
		el.userData.y = 0.01;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._node_title.visible
			let parentEl = me._node_title.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._node_title.userData.opacity = v;
			v = v * me._node_title.userData.parentOpacity;
			me._node_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_title.children.length; i++) {
				let child = me._node_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._node_title.userData.parentOpacity = v;
			v = v * me._node_title.userData.opacity
			me._node_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._node_title.children.length; i++) {
				let child = me._node_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._node_title = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(0, 0.666667, 1);
		el.userData.textColor = new THREE.Color(0.952941, 0.952941, 0.952941);
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 250;
		canvas.height = 32;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._node_title.userData.totalHeight = 3;
			me._node_title.userData.textLines = [];
			var ctx = me._node_title.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._node_title.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._node_title.userData.textLines.push(line);
					line = '';
					me._node_title.userData.totalHeight += me._node_title.userData.lineHeight;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (me._node_title.userData.width - 20 - (scrollbar ? 25 : 0)) && i > 0) {
					me._node_title.userData.textLines.push(line);
					line = words[i];
					me._node_title.userData.totalHeight += me._node_title.userData.lineHeight;
				} else {
					line = testLine;
				}
			}
			me._node_title.userData.textLines.push(line);
			me._node_title.userData.totalHeight += me._node_title.userData.lineHeight;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._node_title.userData.textCanvas;
			var ctx = me._node_title.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._node_title.userData.backgroundColor.r * 255 + ', ' + me._node_title.userData.backgroundColor.g * 255 + ', ' + me._node_title.userData.backgroundColor.b * 255 + ', ' + me._node_title.userData.backgroundColorAlpha + ')';
			ctx.fillRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._node_title.userData.textColor.r * 255 + ', ' + me._node_title.userData.textColor.g * 255 + ', ' + me._node_title.userData.textColor.b * 255 + ', ' + me._node_title.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = 10;
			ctx.textAlign = 'left';
			var y = 3;
			y += (canv.height - me._node_title.userData.totalHeight - 0) / 2;
			for (var i = 0; i < me._node_title.userData.textLines.length; i++) {
				var curTextLine = me._node_title.userData.textLines[i];
				var curTextLineBase = me._node_title.userData.textLines[i];
				if ((ctx.measureText(curTextLine).width + x + 10) > canv.width) {
					var cutChars = 0;
					do {
						cutChars++;
						curTextLine = curTextLineBase.substring(0, curTextLineBase.length - cutChars) + '...';
					} while (cutChars < curTextLineBase.length && (ctx.measureText(curTextLine).width + x + 10) > canv.width);
				}
				ctx.fillText(curTextLine, x, y);
				y += me._node_title.userData.lineHeight;
			}
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'node_title_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.encoding = THREE.sRGBEncoding;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._node_title.material.map) {
				me._node_title.material.map.dispose();
			}
			me._node_title.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			me._node_title.remove(...me._node_title.children);
			var canv = me._node_title.userData.textCanvas;
			var ctx = me._node_title.userData.textCanvasContext;
			ctx.font = '20px Verdana';
			me._node_title.userData.lineHeight = 20 * 1.2;
			me._node_title.userData.textLines = [];
			me._node_title.userData.textLines.push(me._node_title.userData.ggText);
			me._node_title.userData.totalHeight = 3;
			me._node_title.userData.totalHeight += me._node_title.userData.lineHeight;
			me._node_title.userData.boxWidth = me._node_title.userData.width;
			me._node_title.userData.boxHeight = me._node_title.userData.height;
			me._node_title.userData.hasScrollbar = false;
			canv.width = me._node_title.userData.boxWidth;
			canv.height = me._node_title.userData.boxHeight;
			ctx.font = '20px Verdana';
			me._node_title.userData.ggPaintCanvasText();
		}
		me._node_title.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(me.ggUserdata.title)));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._node_title.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._node_title.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._node_title.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._node_title.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._node_title.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._node_title.userData.textColorAlpha = v;
		}
		el.userData.ggId="node_title";
		me._node_title.logicBlock_backgroundcolor = function() {
			var newLogicStateBackgroundColor;
			if (
				((me.elementMouseOver['node_title'] == true))
			)
			{
				newLogicStateBackgroundColor = 0;
			}
			else {
				newLogicStateBackgroundColor = -1;
			}
			if (me._node_title.ggCurrentLogicStateBackgroundColor != newLogicStateBackgroundColor) {
				me._node_title.ggCurrentLogicStateBackgroundColor = newLogicStateBackgroundColor;
				if (me._node_title.ggCurrentLogicStateBackgroundColor == 0) {
					me._node_title.userData.setBackgroundColor(new THREE.Color('#00aaff'));
					me._node_title.userData.setBackgroundColorAlpha(1);
					me._node_title.userData.ggUpdateText(true);
				}
				else {
					me._node_title.userData.setBackgroundColor(new THREE.Color('#00aaff'));
					me._node_title.userData.setBackgroundColorAlpha(0.666667);
					me._node_title.userData.ggUpdateText(true);
				}
			}
		}
		me._node_title.userData.onclick=function (e) {
			player.openNext("{"+me.ggNodeId+"}","");
		}
		me._node_title.userData.onmouseover=function (e) {
			me.elementMouseOver['node_title']=true;
			me._node_title.logicBlock_backgroundcolor();
		}
		me._node_title.userData.ontouchend=function (e) {
			me._node_title.logicBlock_backgroundcolor();
		}
		me._node_title.userData.onmouseout=function (e) {
			if (e && e.toElement) {
				var current = e.toElement;
				while (current = current.parentNode) {
				if (current == me._node_title__text)
					return;
				}
			}
			me.elementMouseOver['node_title']=false;
			me._node_title.logicBlock_backgroundcolor();
		}
		me._node_title.ggCurrentLogicStateBackgroundColor = -1;
		me._node_title.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['node_title']) {
				me.elementMouseOver['node_title']=true;
			}
		}
		me._node_title.userData.ggUpdatePosition=function (useTransition) {
		}
		me.__obj.add(me._node_title);
		me._node_title.userData.setOpacity(1.00);
	};
	function SkinHotspotClass_ht_video_url(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_video_url';
		el.userData.x = -2;
		el.userData.y = 1;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_url.visible
			let parentEl = me._ht_video_url.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url.userData.opacity = v;
			v = v * me._ht_video_url.userData.parentOpacity;
			me._ht_video_url.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url.children.length; i++) {
				let child = me._ht_video_url.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url.userData.parentOpacity = v;
			v = v * me._ht_video_url.userData.opacity
			me._ht_video_url.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url.children.length; i++) {
				let child = me._ht_video_url.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url = el;
		el.userData.ggId="ht_video_url";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_video_url.userData.onclick=function (e) {
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_url.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_url.userData.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_video_url']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_url.userData.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_video_url']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_url.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_video_url']) {
				player.setActiveHotspot(me.hotspot);
				me.elementMouseOver['ht_video_url']=true;
			}
		}
		me._ht_video_url.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneBufferGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'ht_video_url_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAHxUlEQVR4nO2dXWwU1xXH/+fuookV4AUhFhuChAQsdRF2pYIgIBBGaXY7syuKDEqQwtv2tS+ViGJaYUipCBUvSKW8FSmOVETC7k7XaZEsIbk4cqU4rWPkbN+CbRkRhMCWbNOdOX3wNA8Rns87sx+en7RPe+85Z/++vnfm3jNngJiYmJiYmJiYmBaC6h3AD8lkMkoikfgJgDQR7QSwE8AWAOutzzqr6RyAF9ZnCkCVmasAJg3D+HJwcHAp+uhXphGEpmw2uzeZTGZM0zxGRIcAvBbQ5gIz/0MIMVSr1QYrlcq/ALCEWH1TN6FzuVy7aZpniOg9AD8O2d3XzHxLCPFxqVSaCdnXK4lcaE3TOonofWZ+B4CI2L1JRJ8w8+VyuTwRpePIhLYEvsjMJ6LyaQ'+
	'cRfUZEfcVi8WEk/sJ20Nvbu3ZxcfG3AH4FIBm2P4/UiOiaoij9t2/fng/TUahCq6qaFUL8iZm3hOknKEQ0ZZrmL3Vdr4TmIwyjhUJhzezs7IfM/Osw7IcFEX2USqU+uHnz5n+l25ZtUFXVDiK6DeCAbNsRMcLMvbquT8s0KlVoVVXTRPR3AFtl2q0D3xLRW6VS6RtZBqVdXqmquo+IhtH8IgPAG8w8rGnaT2UZlDKiLZGHALwuw14DMc/MPbqujwY1FFhoa7oYBrAhqK0G5SkRvRl0GgkktLXwPQDwRhA7TcC3zHwwyALpe44uFAprrKuLVhcZWP6NfykUCmv8GvAt9Ozs7Ido3ks4zxDRwZmZmUu++/vppKpqloj+6tdpM8PMP/dzB+lZaGvvYhJAh9e+rQARTSmKstvr3ojnqWNpaek3WKUiAwAzb1lYWDjvtZ+n'+
	'Ea1pWieAr9B4u3BRUwPQ5WVP29OIJqKLiEUGljXo99LB9Yi2RvPXXiNqZYQQnW4PDlyPaCJ6339IrYlpmq41cTWic7lcOzM/QvRnfI2OSURb3Rz4uhLONM0zbtuuMgQzv+umoZuFjYjorNcIEokEksn6rZsvX74EcySpHGcB/AEOeSOOU0c2m+1KJBJjXr2rqgpN07x2k8a5c+fw7NkzV22TySSOHz8OwzBw7949z74Mw+iuVCpf2fpwEUQmopFRF7q7u3Hy5Els3LgR5XLZlw0hxNtYvr9YEUehrTQtXwE0Mh0dHTh9+jR27doV2BYRHQPwe7s2tkJnMhnFyoVrGdauXYtcLofDhw9DCGnr+6FMJqPYJVbaCm1ldQZNOGwIEokEjh49Ck3T0NbWJtt8WzKZ7AbwxUoNnKaOtNx4gJGRESwuLkqzt337dmzbts22TW'+
	'dnJ06dOoVUKiXN7ytIw6/QVn6yVMrlMp4+fSrNXj6fX1HoTZs2obe3F3v27JHmbyWY2VYrpxEtXeioyOfz2LdvHxKJRCT+nAalk9ANnTNnx4EDkZ+y2eazOC276yUG0jDMzc2FYXad3ZerSuilpSUUi0VcvXo1DPO2WjlNHbZ/pWaBmTE6Ooo7d+7g+fPn2LAhlFyfQCM6RhJOI3oOLTCqiQj79+9HV1cXKpUKxsY875G5wXbidxL6BYB2ebHUF0VRcOLECfT09IRh/oXdl05Th23nZmX9+lDWeNsR7ST0lMRAImVkZASGYUTp8pHdl05CVyUGEinFYhEXLlzA+Ph4JP6sx6NXxHaOZuaq7L1oTdOkbyqtxOPHj3H9+vVINpWIyL/QACYlxgKgLrfGmJiYQH9/P44cOYJcLhfGNingoJXt1GEYxpcA5A2/OmIYBoaG'+
	'htDX14f79+/DNE2Z5hdqtZrtNaOt0IODg0vMPCwzonozPz+PgYEBXLp0CZOT0v5hh53KVjjeGQohhmRF00hMT0/j2rVruHHjBp48eRLIFjM7auR4OFur1QYTicTvAkXSwIyNjWF8fPz7dAM/mKb5uVMbN5cUpGnav+GxpsZqSaBh5nFd1/fCIYHGjRLMzLeI6IqXAAzDiPqGoS4Q0S24qG7javdOCPExAKnLdItgEtGAm4auhC6VSjNE9EmwmFqSAbelg1zvRzPzZf/xtCZCCNeauBa6XC5PENFn/kJqST71UibI0wkLM5/H8oMyq52aEMLTk1mekh6q1eqTdDq9DsCbnsJqMZj5arlc9rRmeT4zVBSln4iadp86KEQ01dbWdtFrP89pPA8fPny5Y8eOb4jojNe+rQAzv3P37l3PNfN85UtVq9X/pNPp17HKphBmvq'+
	'Lr+h/99PWdbpBKpT4AMOK3f7PBzA/a29v7/PaPC6O4o36FUQBA1/VpZv4ZAHl5uI3Hd0T0VtDybIEzlXRdn2TmLIBQS07WiXkAWRll2aSkhOm6PsrMPWitkf0dgGPlcvmfMoyFUWDwb2j+ObtxCwwC308jB9HEVyPM/ICZD8oUGQghm1TX9enNmzcfYWZPBwWNADNfaW9vPyq7LikQlzUGEE1Z41Dzo3VdryiKspuIPkJj7vrVmPmKoii7wxQZiLj0PJbL4/wiKp8OfCqEON8yped/SD6f/5FVueVd1OFlCgAGhBCXoxL4/9T19SBWUZGziOD1IAD+TESuz/hk0whlCyibze4VQrxtVQk4BCBoFuICgGFmHjJN8/NV/cKblchkMor1AHuamXdaT6RuxfKzNK96hdMcgEdWinEVwGStVhtrtFc4xcTExMTExMTEtBT/'+
	'A8yLweuPwJFBAAAAAElFTkSuQmCC');
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_url_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(-0.01);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_icon';
		el.userData.x = 0;
		el.userData.y = -0.01;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_url_icon.material) me._ht_video_url_icon.material.opacity = v;
			me._ht_video_url_icon.visible = (v>0 && me._ht_video_url_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_icon.visible
			let parentEl = me._ht_video_url_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_icon.userData.opacity = v;
			v = v * me._ht_video_url_icon.userData.parentOpacity;
			me._ht_video_url_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_icon.children.length; i++) {
				let child = me._ht_video_url_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_icon.userData.parentOpacity = v;
			v = v * me._ht_video_url_icon.userData.opacity
			me._ht_video_url_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_icon.children.length; i++) {
				let child = me._ht_video_url_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_icon = el;
		el.userData.ggId="ht_video_url_icon";
		me._ht_video_url_icon.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_video_url_icon'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_video_url_icon.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_video_url_icon.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_video_url_icon.ggCurrentLogicStateScaling == 0) {
					me._ht_video_url_icon.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._ht_video_url_icon.userData.transitions.length; i++) {
						if (me._ht_video_url_icon.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_url_icon.userData.transitions[i].interval);
							me._ht_video_url_icon.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_video_url_icon.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_icon.scale.set(transition_scale.startScale.x + (me._ht_video_url_icon.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_url_icon.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_url_icon.position.x = (me._ht_video_url_icon.position.x - me._ht_video_url_icon.userData.curScaleOffX) + scaleOffX;
						me._ht_video_url_icon.userData.curScaleOffX = scaleOffX;
						me._ht_video_url_icon.position.y = (me._ht_video_url_icon.position.y - me._ht_video_url_icon.userData.curScaleOffY) + scaleOffY;
						me._ht_video_url_icon.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_url_icon.userData.transitions.splice(me._ht_video_url_icon.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_url_icon.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_video_url_icon.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_video_url_icon.userData.transitions.length; i++) {
						if (me._ht_video_url_icon.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_url_icon.userData.transitions[i].interval);
							me._ht_video_url_icon.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_video_url_icon.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_icon.scale.set(transition_scale.startScale.x + (me._ht_video_url_icon.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_url_icon.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_url_icon.position.x = (me._ht_video_url_icon.position.x - me._ht_video_url_icon.userData.curScaleOffX) + scaleOffX;
						me._ht_video_url_icon.userData.curScaleOffX = scaleOffX;
						me._ht_video_url_icon.position.y = (me._ht_video_url_icon.position.y - me._ht_video_url_icon.userData.curScaleOffY) + scaleOffY;
						me._ht_video_url_icon.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_url_icon.userData.transitions.splice(me._ht_video_url_icon.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_url_icon.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_video_url_icon.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(((player.getVariableValue('vis_video_url_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_url_icon.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_url_icon.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_url_icon.ggCurrentLogicStateVisible == 0) {
			me._ht_video_url_icon.visible=false;
			me._ht_video_url_icon.userData.visible=false;
				}
				else {
			me._ht_video_url_icon.visible=((!me._ht_video_url_icon.material && Number(me._ht_video_url_icon.userData.opacity>0)) || Number(me._ht_video_url_icon.material.opacity)>0)?true:false;
			me._ht_video_url_icon.userData.visible=true;
				}
			}
		}
		me._ht_video_url_icon.userData.onclick=function (e) {
			player.setVariableValue('vis_video_url_hotspots', player.getVariableValue('vis_video_url_hotspots') + "<"+me.hotspot.id+">");
			me._ht_video_url_video.userData.ggInitMedia(player._(me.hotspot.url));
		}
		me._ht_video_url_icon.userData.onmouseover=function (e) {
			me.elementMouseOver['ht_video_url_icon']=true;
			me._ht_video_url_tooltip.logicBlock_visible();
			me._ht_video_url_icon.logicBlock_scaling();
		}
		me._ht_video_url_icon.userData.ontouchend=function (e) {
			me._ht_video_url_icon.logicBlock_scaling();
		}
		me._ht_video_url_icon.userData.onmouseout=function (e) {
			me.elementMouseOver['ht_video_url_icon']=false;
			me._ht_video_url_tooltip.logicBlock_visible();
			me._ht_video_url_icon.logicBlock_scaling();
		}
		me._ht_video_url_icon.ggCurrentLogicStateScaling = -1;
		me._ht_video_url_icon.ggCurrentLogicStateVisible = -1;
		me._ht_video_url_icon.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_video_url_icon']) {
				me.elementMouseOver['ht_video_url_icon']=true;
				me._ht_video_url_tooltip.logicBlock_visible();
			}
		}
		me._ht_video_url_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneBufferGeometry(1, 0.22, 5, 5 );
		geometry.name = 'ht_video_url_tooltip_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_url_tooltip_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.784314;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_url_tooltip.material.opacity = v;
			if (me._ht_video_url_tooltip.userData.hasScrollbar) {
				me._ht_video_url_tooltip.userData.scrollbar.material.opacity = v;
				me._ht_video_url_tooltip.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_video_url_tooltip.userData.ggSubElement) {
				me._ht_video_url_tooltip.userData.ggSubElement.material.opacity = v
				me._ht_video_url_tooltip.userData.ggSubElement.visible = (v>0 && me._ht_video_url_tooltip.userData.visible);
			}
			me._ht_video_url_tooltip.visible = (v>0 && me._ht_video_url_tooltip.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_url_tooltip.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_url_tooltip.userData.backgroundColorAlpha = v;
			me._ht_video_url_tooltip.userData.setOpacity(me._ht_video_url_tooltip.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.365);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 100;
		el.userData.height = 22;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_tooltip';
		el.userData.x = 0;
		el.userData.y = -0.365;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_tooltip.visible
			let parentEl = me._ht_video_url_tooltip.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_tooltip.userData.opacity = v;
			v = v * me._ht_video_url_tooltip.userData.parentOpacity;
			me._ht_video_url_tooltip.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_tooltip.children.length; i++) {
				let child = me._ht_video_url_tooltip.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_tooltip.userData.parentOpacity = v;
			v = v * me._ht_video_url_tooltip.userData.opacity
			me._ht_video_url_tooltip.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_tooltip.children.length; i++) {
				let child = me._ht_video_url_tooltip.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_tooltip = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(0, 0.666667, 1);
		el.userData.textColor = new THREE.Color(1, 1, 1);
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 100;
		canvas.height = 22;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_video_url_tooltip.userData.totalHeight = 13;
			me._ht_video_url_tooltip.userData.textLines = [];
			var ctx = me._ht_video_url_tooltip.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_video_url_tooltip.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_video_url_tooltip.userData.textLines.push(line);
					line = '';
					me._ht_video_url_tooltip.userData.totalHeight += me._ht_video_url_tooltip.userData.lineHeight;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (me._ht_video_url_tooltip.userData.width - 10 - (scrollbar ? 25 : 0)) && i > 0) {
					me._ht_video_url_tooltip.userData.textLines.push(line);
					line = words[i];
					me._ht_video_url_tooltip.userData.totalHeight += me._ht_video_url_tooltip.userData.lineHeight;
				} else {
					line = testLine;
				}
			}
			me._ht_video_url_tooltip.userData.textLines.push(line);
			me._ht_video_url_tooltip.userData.totalHeight += me._ht_video_url_tooltip.userData.lineHeight;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_video_url_tooltip.userData.textCanvas;
			var ctx = me._ht_video_url_tooltip.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_video_url_tooltip.userData.backgroundColor.r * 255 + ', ' + me._ht_video_url_tooltip.userData.backgroundColor.g * 255 + ', ' + me._ht_video_url_tooltip.userData.backgroundColor.b * 255 + ', ' + me._ht_video_url_tooltip.userData.backgroundColorAlpha + ')';
			ctx.fillRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_video_url_tooltip.userData.textColor.r * 255 + ', ' + me._ht_video_url_tooltip.userData.textColor.g * 255 + ', ' + me._ht_video_url_tooltip.userData.textColor.b * 255 + ', ' + me._ht_video_url_tooltip.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_video_url_tooltip.userData.boxWidth - (me._ht_video_url_tooltip.userData.hasScrollbar ? 25 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 8;
			for (var i = 0; i < me._ht_video_url_tooltip.userData.textLines.length; i++) {
				ctx.fillText(me._ht_video_url_tooltip.userData.textLines[i], x, y);
				y += me._ht_video_url_tooltip.userData.lineHeight;
			}
			geometry = new THREE.PlaneBufferGeometry(me._ht_video_url_tooltip.userData.boxWidth / 100.0, me._ht_video_url_tooltip.userData.boxHeight / 100.0, 5, 5 );
			geometry.name = 'ht_video_url_tooltip_geometry';
			me._ht_video_url_tooltip.geometry.dispose();
			me._ht_video_url_tooltip.geometry = geometry;
			var diffY = me._ht_video_url_tooltip.userData.boxHeight - me._ht_video_url_tooltip.userData.height;
			me._ht_video_url_tooltip.position.y = me._ht_video_url_tooltip.userData.y - ((diffY / 2.0) / 100.0);
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_video_url_tooltip_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.encoding = THREE.sRGBEncoding;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_video_url_tooltip.material.map) {
				me._ht_video_url_tooltip.material.map.dispose();
			}
			me._ht_video_url_tooltip.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			me._ht_video_url_tooltip.remove(...me._ht_video_url_tooltip.children);
			var canv = me._ht_video_url_tooltip.userData.textCanvas;
			var ctx = me._ht_video_url_tooltip.userData.textCanvasContext;
			ctx.font = '18px Verdana';
			me._ht_video_url_tooltip.userData.lineHeight = 18 * 1.2;
			me._ht_video_url_tooltip.userData.textLines = [];
			me._ht_video_url_tooltip.userData.textLines.push(me._ht_video_url_tooltip.userData.ggText);
			me._ht_video_url_tooltip.userData.totalHeight = 13;
			me._ht_video_url_tooltip.userData.totalHeight += me._ht_video_url_tooltip.userData.lineHeight;
			me._ht_video_url_tooltip.userData.boxWidth = ctx.measureText(me._ht_video_url_tooltip.userData.ggText).width + 10;
			me._ht_video_url_tooltip.userData.boxHeight = me._ht_video_url_tooltip.userData.totalHeight;
			canv.width = me._ht_video_url_tooltip.userData.boxWidth;
			canv.height = me._ht_video_url_tooltip.userData.boxHeight;
			ctx.font = '18px Verdana';
			me._ht_video_url_tooltip.userData.ggPaintCanvasText();
		}
		me._ht_video_url_tooltip.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_video_url_tooltip.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_video_url_tooltip.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_url_tooltip.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_url_tooltip.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_video_url_tooltip.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_video_url_tooltip.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_video_url_tooltip";
		me._ht_video_url_tooltip.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_video_url_icon'] == true)) && 
				((player._(me.hotspot.title) != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_url_tooltip.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_url_tooltip.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_url_tooltip.ggCurrentLogicStateVisible == 0) {
			me._ht_video_url_tooltip.visible=((!me._ht_video_url_tooltip.material && Number(me._ht_video_url_tooltip.userData.opacity>0)) || Number(me._ht_video_url_tooltip.material.opacity)>0)?true:false;
			me._ht_video_url_tooltip.userData.visible=true;
				}
				else {
			me._ht_video_url_tooltip.visible=false;
			me._ht_video_url_tooltip.userData.visible=false;
				}
			}
		}
		me._ht_video_url_tooltip.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_url_icon.add(me._ht_video_url_tooltip);
		me._ht_video_url.add(me._ht_video_url_icon);
		geometry = new THREE.PlaneBufferGeometry(3.6, 2.4, 5, 5 );
		geometry.name = 'ht_video_url_bg_geometry';
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color('rgba(0,170,255,0.784314)').convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_url_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.784314;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_url_bg.material.opacity = v * me._ht_video_url_bg.userData.backgroundColorAlpha;
			if (me._ht_video_url_bg.userData.ggSubElement) {
				me._ht_video_url_bg.userData.ggSubElement.material.opacity = v
				me._ht_video_url_bg.userData.ggSubElement.visible = (v>0 && me._ht_video_url_bg.userData.visible);
			}
			me._ht_video_url_bg.visible = (v>0 && me._ht_video_url_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_url_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_url_bg.userData.backgroundColorAlpha = v;
			me._ht_video_url_bg.userData.setOpacity(me._ht_video_url_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(1.188);
		el.scale.set(1.00, 0.01, 1.0);
		el.userData.width = 360;
		el.userData.height = 240;
		el.userData.scale = {x: 1.00, y: 0.01, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 1.188;
		el.name = 'ht_video_url_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_bg.visible
			let parentEl = me._ht_video_url_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_bg.userData.opacity = v;
			v = v * me._ht_video_url_bg.userData.parentOpacity;
			me._ht_video_url_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_bg.children.length; i++) {
				let child = me._ht_video_url_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_bg.userData.parentOpacity = v;
			v = v * me._ht_video_url_bg.userData.opacity
			me._ht_video_url_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_bg.children.length; i++) {
				let child = me._ht_video_url_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_bg = el;
		el.userData.ggId="ht_video_url_bg";
		me._ht_video_url_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				(((player.getVariableValue('vis_video_url_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_video_url_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_video_url_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_video_url_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_video_url_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_video_url_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_url_bg.userData.transitions[i].interval);
							me._ht_video_url_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_video_url_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_bg.scale.set(transition_scale.startScale.x + (me._ht_video_url_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_url_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_url_bg.position.x = (me._ht_video_url_bg.position.x - me._ht_video_url_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_url_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_url_bg.position.y = (me._ht_video_url_bg.position.y - me._ht_video_url_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_url_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_url_bg.userData.transitions.splice(me._ht_video_url_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_url_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_video_url_bg.userData.transitionValue_scale = {x: 1, y: 0.01, z: 1.0};
					for (var i = 0; i < me._ht_video_url_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_url_bg.userData.transitions[i].interval);
							me._ht_video_url_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_video_url_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_bg.scale.set(transition_scale.startScale.x + (me._ht_video_url_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_url_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_url_bg.position.x = (me._ht_video_url_bg.position.x - me._ht_video_url_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_url_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_url_bg.position.y = (me._ht_video_url_bg.position.y - me._ht_video_url_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_url_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_url_bg.userData.transitions.splice(me._ht_video_url_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_url_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_video_url_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('vis_video_url_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_url_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_url_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_url_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_url_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_url_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_bg.userData.transitions[i].interval);
							me._ht_video_url_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_bg.material ? me._ht_video_url_bg.material.opacity : me._ht_video_url_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_bg.userData.transitions.splice(me._ht_video_url_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_url_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_url_bg.userData.transitions.length; i++) {
						if (me._ht_video_url_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_bg.userData.transitions[i].interval);
							me._ht_video_url_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_bg.material ? me._ht_video_url_bg.material.opacity : me._ht_video_url_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_bg.userData.transitions.splice(me._ht_video_url_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_url_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneBufferGeometry(3.4, 2.2, 5, 5 );
		geometry.name = 'ht_video_url_video_geometry';
		material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_url_video_material';
		el = new THREE.Mesh( geometry, material );
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 340;
		el.userData.height = 220;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_video';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_url_video.material) me._ht_video_url_video.material.opacity = v;
			me._ht_video_url_video.visible = (v>0 && me._ht_video_url_video.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_video.visible
			let parentEl = me._ht_video_url_video.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_video.userData.opacity = v;
			v = v * me._ht_video_url_video.userData.parentOpacity;
			me._ht_video_url_video.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_video.children.length; i++) {
				let child = me._ht_video_url_video.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_video.userData.parentOpacity = v;
			v = v * me._ht_video_url_video.userData.opacity
			me._ht_video_url_video.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_video.children.length; i++) {
				let child = me._ht_video_url_video.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_video = el;
		me._ht_video_url_video.userData.seekbars = [];
		me._ht_video_url_video.userData.ggInitMedia = function(media) {
			if (me._ht_video_url_video__vid) me._ht_video_url_video__vid.pause();
			me._ht_video_url_video__vid = document.createElement('video');
			player.registerVideoElement('ht_video_url_video', me._ht_video_url_video__vid);
			me._ht_video_url_video__vid.setAttribute('autoplay', '');
			me._ht_video_url_video__source = document.createElement('source');
			me._ht_video_url_video__source.setAttribute('src', media);
			me._ht_video_url_video__vid.addEventListener('loadedmetadata', function() {
				let videoAR = me._ht_video_url_video__vid.videoWidth / me._ht_video_url_video__vid.videoHeight;
				let elAR = me._ht_video_url_video.userData.width / me._ht_video_url_video.userData.height;
				if (videoAR > elAR) {
					me._ht_video_url_video.scale.set(1, (me._ht_video_url_video.userData.width / videoAR) / me._ht_video_url_video.userData.height, 1);
				} else {
					me._ht_video_url_video.scale.set((me._ht_video_url_video.userData.height * videoAR) / me._ht_video_url_video.userData.width, 1, 1);
				}
			}, false);
			me._ht_video_url_video__vid.appendChild(me._ht_video_url_video__source);
			videoTexture = new THREE.VideoTexture( me._ht_video_url_video__vid );
			videoTexture.name = 'ht_video_url_video_videoTexture';
			videoTexture.minFilter = THREE.LinearFilter;
			videoTexture.magFilter = THREE.LinearFilter;
			videoTexture.format = THREE.RGBAFormat;
			videoMaterial = new THREE.MeshBasicMaterial( {map: videoTexture, side: THREE.DoubleSide, transparent: true} );
			videoMaterial.name = 'ht_video_url_video_videoMaterial';
			videoMaterial.alphaTest = 0.5;
			me._ht_video_url_video.material = videoMaterial;
		}
		el.userData.ggId="ht_video_url_video";
		me._ht_video_url_video.userData.ggIsActive=function() {
			if (me._ht_video_url_video__vid != null) {
				return (me._ht_video_url_video__vid.paused == false && me._ht_video_url_video__vid.ended == false);
			} else {
				return false;
			}
		}
		me._ht_video_url_video.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(((player.getVariableValue('vis_video_file_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_url_video.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_url_video.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_url_video.ggCurrentLogicStateVisible == 0) {
			me._ht_video_url_video.visible=((!me._ht_video_url_video.material && Number(me._ht_video_url_video.userData.opacity>0)) || Number(me._ht_video_url_video.material.opacity)>0)?true:false;
			me._ht_video_url_video.userData.visible=true;
					if (me._ht_video_url_video.userData.ggVideoNotLoaded) {
						me._ht_video_url_video.userData.ggInitMedia(me._ht_video_url_video.ggVideoSource);
					}
				}
				else {
			me._ht_video_url_video.visible=false;
			me._ht_video_url_video.userData.visible=false;
					me._ht_video_url_video.userData.ggInitMedia('');
				}
			}
		}
		me._ht_video_url_video.userData.onclick=function (e) {
			player.playPauseSound("ht_video_url_video","1");
		}
		me._ht_video_url_video.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_url_bg.add(me._ht_video_url_video);
		me._ht_video_url.add(me._ht_video_url_bg);
		geometry = new THREE.PlaneBufferGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'ht_video_url_close_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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');
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_url_close_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(2.1);
		el.translateY(0.975);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_url_close';
		el.userData.x = 2.1;
		el.userData.y = 0.975;
		el.userData.hanchor = 1;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_url_close.material) me._ht_video_url_close.material.opacity = v;
			me._ht_video_url_close.visible = (v>0 && me._ht_video_url_close.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_url_close.visible
			let parentEl = me._ht_video_url_close.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_url_close.userData.opacity = v;
			v = v * me._ht_video_url_close.userData.parentOpacity;
			me._ht_video_url_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_close.children.length; i++) {
				let child = me._ht_video_url_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_url_close.userData.parentOpacity = v;
			v = v * me._ht_video_url_close.userData.opacity
			me._ht_video_url_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_url_close.children.length; i++) {
				let child = me._ht_video_url_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_url_close = el;
		el.userData.ggId="ht_video_url_close";
		me._ht_video_url_close.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_video_url_close'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_video_url_close.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_video_url_close.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_video_url_close.ggCurrentLogicStateScaling == 0) {
					me._ht_video_url_close.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._ht_video_url_close.userData.transitions.length; i++) {
						if (me._ht_video_url_close.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_url_close.userData.transitions[i].interval);
							me._ht_video_url_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_video_url_close.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_close.scale.set(transition_scale.startScale.x + (me._ht_video_url_close.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_url_close.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_url_close.position.x = (me._ht_video_url_close.position.x - me._ht_video_url_close.userData.curScaleOffX) + scaleOffX;
						me._ht_video_url_close.userData.curScaleOffX = scaleOffX;
						me._ht_video_url_close.position.y = (me._ht_video_url_close.position.y - me._ht_video_url_close.userData.curScaleOffY) + scaleOffY;
						me._ht_video_url_close.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_url_close.userData.transitions.splice(me._ht_video_url_close.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_url_close.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_video_url_close.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_video_url_close.userData.transitions.length; i++) {
						if (me._ht_video_url_close.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_url_close.userData.transitions[i].interval);
							me._ht_video_url_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_video_url_close.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_close.scale.set(transition_scale.startScale.x + (me._ht_video_url_close.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_url_close.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_url_close.position.x = (me._ht_video_url_close.position.x - me._ht_video_url_close.userData.curScaleOffX) + scaleOffX;
						me._ht_video_url_close.userData.curScaleOffX = scaleOffX;
						me._ht_video_url_close.position.y = (me._ht_video_url_close.position.y - me._ht_video_url_close.userData.curScaleOffY) + scaleOffY;
						me._ht_video_url_close.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_url_close.userData.transitions.splice(me._ht_video_url_close.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_url_close.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_video_url_close.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('vis_video_url_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_url_close.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_url_close.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_url_close.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_url_close.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_url_close.userData.transitions.length; i++) {
						if (me._ht_video_url_close.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_close.userData.transitions[i].interval);
							me._ht_video_url_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_close.material ? me._ht_video_url_close.material.opacity : me._ht_video_url_close.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_close.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_close.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_close.userData.transitions.splice(me._ht_video_url_close.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_close.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_url_close.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_url_close.userData.transitions.length; i++) {
						if (me._ht_video_url_close.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_url_close.userData.transitions[i].interval);
							me._ht_video_url_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_url_close.material ? me._ht_video_url_close.material.opacity : me._ht_video_url_close.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_url_close.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_url_close.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_url_close.userData.transitions.splice(me._ht_video_url_close.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_url_close.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_url_close.userData.onclick=function (e) {
			player.setVariableValue('vis_video_url_hotspots', player.getVariableValue('vis_video_url_hotspots').replace("<"+me.hotspot.id+">", ''));
		}
		me._ht_video_url_close.userData.onmouseover=function (e) {
			me.elementMouseOver['ht_video_url_close']=true;
			me._ht_video_url_close.logicBlock_scaling();
		}
		me._ht_video_url_close.userData.ontouchend=function (e) {
			me._ht_video_url_close.logicBlock_scaling();
		}
		me._ht_video_url_close.userData.onmouseout=function (e) {
			me.elementMouseOver['ht_video_url_close']=false;
			me._ht_video_url_close.logicBlock_scaling();
		}
		me._ht_video_url_close.ggCurrentLogicStateScaling = -1;
		me._ht_video_url_close.ggCurrentLogicStateAlpha = -1;
		me._ht_video_url_close.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_video_url_close']) {
				me.elementMouseOver['ht_video_url_close']=true;
			}
		}
		me._ht_video_url_close.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_url.add(me._ht_video_url_close);
		me._ht_video_url.userData.setOpacity(1.00);
		me._ht_video_url_icon.userData.setOpacity(1.00);
		me._ht_video_url_tooltip.userData.setOpacity(1.00);
		me._ht_video_url_bg.userData.setOpacity(0.00);
		me._ht_video_url_video.userData.setOpacity(1.00);
		me._ht_video_url_video.userData.ggVideoSource = 'media_vr/';
		me._ht_video_url_video.userData.ggVideoNotLoaded = true;
		me._ht_video_url_close.userData.setOpacity(0.00);
			me.ggEvent_activehotspotchanged=function() {
				me._ht_video_url_tooltip.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._ht_video_url_icon.logicBlock_visible();
				me._ht_video_url_tooltip.logicBlock_visible();
				me._ht_video_url_bg.logicBlock_scaling();
				me._ht_video_url_bg.logicBlock_alpha();
				me._ht_video_url_video.logicBlock_visible();
				me._ht_video_url_close.logicBlock_alpha();
			};
			me.ggEvent_configloaded=function() {
				me._ht_video_url_icon.logicBlock_visible();
				me._ht_video_url_tooltip.logicBlock_visible();
				me._ht_video_url_bg.logicBlock_scaling();
				me._ht_video_url_bg.logicBlock_alpha();
				me._ht_video_url_video.logicBlock_visible();
				me._ht_video_url_close.logicBlock_alpha();
			};
			me.ggEvent_varchanged_vis_video_file_hotspots=function() {
				me._ht_video_url_video.logicBlock_visible();
			};
			me.ggEvent_varchanged_vis_video_url_hotspots=function() {
				me._ht_video_url_icon.logicBlock_visible();
				me._ht_video_url_bg.logicBlock_scaling();
				me._ht_video_url_bg.logicBlock_alpha();
				me._ht_video_url_close.logicBlock_alpha();
			};
			me.__obj = me._ht_video_url;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	function SkinHotspotClass_ht_video_file(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_video_file';
		el.userData.x = -2;
		el.userData.y = 1;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_file.visible
			let parentEl = me._ht_video_file.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file.userData.opacity = v;
			v = v * me._ht_video_file.userData.parentOpacity;
			me._ht_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file.children.length; i++) {
				let child = me._ht_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file.userData.parentOpacity = v;
			v = v * me._ht_video_file.userData.opacity
			me._ht_video_file.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file.children.length; i++) {
				let child = me._ht_video_file.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file = el;
		el.userData.ggId="ht_video_file";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_video_file.userData.onclick=function (e) {
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_file.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_file.userData.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_video_file']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_file.userData.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_video_file']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_video_file.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_video_file']) {
				player.setActiveHotspot(me.hotspot);
				me.elementMouseOver['ht_video_file']=true;
			}
		}
		me._ht_video_file.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneBufferGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'ht_video_file_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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'+
	'A8yLweuPwJFBAAAAAElFTkSuQmCC');
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_file_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(-0.01);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_icon';
		el.userData.x = 0;
		el.userData.y = -0.01;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_file_icon.material) me._ht_video_file_icon.material.opacity = v;
			me._ht_video_file_icon.visible = (v>0 && me._ht_video_file_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_icon.visible
			let parentEl = me._ht_video_file_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_icon.userData.opacity = v;
			v = v * me._ht_video_file_icon.userData.parentOpacity;
			me._ht_video_file_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_icon.children.length; i++) {
				let child = me._ht_video_file_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_icon.userData.parentOpacity = v;
			v = v * me._ht_video_file_icon.userData.opacity
			me._ht_video_file_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_icon.children.length; i++) {
				let child = me._ht_video_file_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_icon = el;
		el.userData.ggId="ht_video_file_icon";
		me._ht_video_file_icon.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_video_file_icon'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_video_file_icon.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_video_file_icon.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_video_file_icon.ggCurrentLogicStateScaling == 0) {
					me._ht_video_file_icon.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._ht_video_file_icon.userData.transitions.length; i++) {
						if (me._ht_video_file_icon.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_file_icon.userData.transitions[i].interval);
							me._ht_video_file_icon.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_video_file_icon.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_icon.scale.set(transition_scale.startScale.x + (me._ht_video_file_icon.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_file_icon.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_file_icon.position.x = (me._ht_video_file_icon.position.x - me._ht_video_file_icon.userData.curScaleOffX) + scaleOffX;
						me._ht_video_file_icon.userData.curScaleOffX = scaleOffX;
						me._ht_video_file_icon.position.y = (me._ht_video_file_icon.position.y - me._ht_video_file_icon.userData.curScaleOffY) + scaleOffY;
						me._ht_video_file_icon.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_file_icon.userData.transitions.splice(me._ht_video_file_icon.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_file_icon.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_video_file_icon.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_video_file_icon.userData.transitions.length; i++) {
						if (me._ht_video_file_icon.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_file_icon.userData.transitions[i].interval);
							me._ht_video_file_icon.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_video_file_icon.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_icon.scale.set(transition_scale.startScale.x + (me._ht_video_file_icon.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_file_icon.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_file_icon.position.x = (me._ht_video_file_icon.position.x - me._ht_video_file_icon.userData.curScaleOffX) + scaleOffX;
						me._ht_video_file_icon.userData.curScaleOffX = scaleOffX;
						me._ht_video_file_icon.position.y = (me._ht_video_file_icon.position.y - me._ht_video_file_icon.userData.curScaleOffY) + scaleOffY;
						me._ht_video_file_icon.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_file_icon.userData.transitions.splice(me._ht_video_file_icon.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_file_icon.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_video_file_icon.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(((player.getVariableValue('vis_video_file_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_file_icon.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_file_icon.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_file_icon.ggCurrentLogicStateVisible == 0) {
			me._ht_video_file_icon.visible=false;
			me._ht_video_file_icon.userData.visible=false;
				}
				else {
			me._ht_video_file_icon.visible=((!me._ht_video_file_icon.material && Number(me._ht_video_file_icon.userData.opacity>0)) || Number(me._ht_video_file_icon.material.opacity)>0)?true:false;
			me._ht_video_file_icon.userData.visible=true;
				}
			}
		}
		me._ht_video_file_icon.userData.onclick=function (e) {
			player.setVariableValue('vis_video_file_hotspots', player.getVariableValue('vis_video_file_hotspots') + "<"+me.hotspot.id+">");
			me._ht_video_file_video.userData.ggInitMedia(player._(me.hotspot.url));
		}
		me._ht_video_file_icon.userData.onmouseover=function (e) {
			me.elementMouseOver['ht_video_file_icon']=true;
			me._ht_video_file_tooltip.logicBlock_visible();
			me._ht_video_file_icon.logicBlock_scaling();
		}
		me._ht_video_file_icon.userData.ontouchend=function (e) {
			me._ht_video_file_icon.logicBlock_scaling();
		}
		me._ht_video_file_icon.userData.onmouseout=function (e) {
			me.elementMouseOver['ht_video_file_icon']=false;
			me._ht_video_file_tooltip.logicBlock_visible();
			me._ht_video_file_icon.logicBlock_scaling();
		}
		me._ht_video_file_icon.ggCurrentLogicStateScaling = -1;
		me._ht_video_file_icon.ggCurrentLogicStateVisible = -1;
		me._ht_video_file_icon.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_video_file_icon']) {
				me.elementMouseOver['ht_video_file_icon']=true;
				me._ht_video_file_tooltip.logicBlock_visible();
			}
		}
		me._ht_video_file_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneBufferGeometry(1, 0.22, 5, 5 );
		geometry.name = 'ht_video_file_tooltip_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_file_tooltip_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.784314;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_file_tooltip.material.opacity = v;
			if (me._ht_video_file_tooltip.userData.hasScrollbar) {
				me._ht_video_file_tooltip.userData.scrollbar.material.opacity = v;
				me._ht_video_file_tooltip.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_video_file_tooltip.userData.ggSubElement) {
				me._ht_video_file_tooltip.userData.ggSubElement.material.opacity = v
				me._ht_video_file_tooltip.userData.ggSubElement.visible = (v>0 && me._ht_video_file_tooltip.userData.visible);
			}
			me._ht_video_file_tooltip.visible = (v>0 && me._ht_video_file_tooltip.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_file_tooltip.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_file_tooltip.userData.backgroundColorAlpha = v;
			me._ht_video_file_tooltip.userData.setOpacity(me._ht_video_file_tooltip.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.365);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 100;
		el.userData.height = 22;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_tooltip';
		el.userData.x = 0;
		el.userData.y = -0.365;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_tooltip.visible
			let parentEl = me._ht_video_file_tooltip.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_tooltip.userData.opacity = v;
			v = v * me._ht_video_file_tooltip.userData.parentOpacity;
			me._ht_video_file_tooltip.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_tooltip.children.length; i++) {
				let child = me._ht_video_file_tooltip.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_tooltip.userData.parentOpacity = v;
			v = v * me._ht_video_file_tooltip.userData.opacity
			me._ht_video_file_tooltip.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_tooltip.children.length; i++) {
				let child = me._ht_video_file_tooltip.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_tooltip = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(0, 0.666667, 1);
		el.userData.textColor = new THREE.Color(1, 1, 1);
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 100;
		canvas.height = 22;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_video_file_tooltip.userData.totalHeight = 13;
			me._ht_video_file_tooltip.userData.textLines = [];
			var ctx = me._ht_video_file_tooltip.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_video_file_tooltip.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_video_file_tooltip.userData.textLines.push(line);
					line = '';
					me._ht_video_file_tooltip.userData.totalHeight += me._ht_video_file_tooltip.userData.lineHeight;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (me._ht_video_file_tooltip.userData.width - 10 - (scrollbar ? 25 : 0)) && i > 0) {
					me._ht_video_file_tooltip.userData.textLines.push(line);
					line = words[i];
					me._ht_video_file_tooltip.userData.totalHeight += me._ht_video_file_tooltip.userData.lineHeight;
				} else {
					line = testLine;
				}
			}
			me._ht_video_file_tooltip.userData.textLines.push(line);
			me._ht_video_file_tooltip.userData.totalHeight += me._ht_video_file_tooltip.userData.lineHeight;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_video_file_tooltip.userData.textCanvas;
			var ctx = me._ht_video_file_tooltip.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_video_file_tooltip.userData.backgroundColor.r * 255 + ', ' + me._ht_video_file_tooltip.userData.backgroundColor.g * 255 + ', ' + me._ht_video_file_tooltip.userData.backgroundColor.b * 255 + ', ' + me._ht_video_file_tooltip.userData.backgroundColorAlpha + ')';
			ctx.fillRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_video_file_tooltip.userData.textColor.r * 255 + ', ' + me._ht_video_file_tooltip.userData.textColor.g * 255 + ', ' + me._ht_video_file_tooltip.userData.textColor.b * 255 + ', ' + me._ht_video_file_tooltip.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_video_file_tooltip.userData.boxWidth - (me._ht_video_file_tooltip.userData.hasScrollbar ? 25 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 8;
			for (var i = 0; i < me._ht_video_file_tooltip.userData.textLines.length; i++) {
				ctx.fillText(me._ht_video_file_tooltip.userData.textLines[i], x, y);
				y += me._ht_video_file_tooltip.userData.lineHeight;
			}
			geometry = new THREE.PlaneBufferGeometry(me._ht_video_file_tooltip.userData.boxWidth / 100.0, me._ht_video_file_tooltip.userData.boxHeight / 100.0, 5, 5 );
			geometry.name = 'ht_video_file_tooltip_geometry';
			me._ht_video_file_tooltip.geometry.dispose();
			me._ht_video_file_tooltip.geometry = geometry;
			var diffY = me._ht_video_file_tooltip.userData.boxHeight - me._ht_video_file_tooltip.userData.height;
			me._ht_video_file_tooltip.position.y = me._ht_video_file_tooltip.userData.y - ((diffY / 2.0) / 100.0);
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_video_file_tooltip_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.encoding = THREE.sRGBEncoding;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_video_file_tooltip.material.map) {
				me._ht_video_file_tooltip.material.map.dispose();
			}
			me._ht_video_file_tooltip.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			me._ht_video_file_tooltip.remove(...me._ht_video_file_tooltip.children);
			var canv = me._ht_video_file_tooltip.userData.textCanvas;
			var ctx = me._ht_video_file_tooltip.userData.textCanvasContext;
			ctx.font = '18px Verdana';
			me._ht_video_file_tooltip.userData.lineHeight = 18 * 1.2;
			me._ht_video_file_tooltip.userData.textLines = [];
			me._ht_video_file_tooltip.userData.textLines.push(me._ht_video_file_tooltip.userData.ggText);
			me._ht_video_file_tooltip.userData.totalHeight = 13;
			me._ht_video_file_tooltip.userData.totalHeight += me._ht_video_file_tooltip.userData.lineHeight;
			me._ht_video_file_tooltip.userData.boxWidth = ctx.measureText(me._ht_video_file_tooltip.userData.ggText).width + 10;
			me._ht_video_file_tooltip.userData.boxHeight = me._ht_video_file_tooltip.userData.totalHeight;
			canv.width = me._ht_video_file_tooltip.userData.boxWidth;
			canv.height = me._ht_video_file_tooltip.userData.boxHeight;
			ctx.font = '18px Verdana';
			me._ht_video_file_tooltip.userData.ggPaintCanvasText();
		}
		me._ht_video_file_tooltip.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_video_file_tooltip.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_video_file_tooltip.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_file_tooltip.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_file_tooltip.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_video_file_tooltip.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_video_file_tooltip.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_video_file_tooltip";
		me._ht_video_file_tooltip.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_video_file_icon'] == true)) && 
				((player._(me.hotspot.title) != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_file_tooltip.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_file_tooltip.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_file_tooltip.ggCurrentLogicStateVisible == 0) {
			me._ht_video_file_tooltip.visible=((!me._ht_video_file_tooltip.material && Number(me._ht_video_file_tooltip.userData.opacity>0)) || Number(me._ht_video_file_tooltip.material.opacity)>0)?true:false;
			me._ht_video_file_tooltip.userData.visible=true;
				}
				else {
			me._ht_video_file_tooltip.visible=false;
			me._ht_video_file_tooltip.userData.visible=false;
				}
			}
		}
		me._ht_video_file_tooltip.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_file_icon.add(me._ht_video_file_tooltip);
		me._ht_video_file.add(me._ht_video_file_icon);
		geometry = new THREE.PlaneBufferGeometry(3.6, 2.4, 5, 5 );
		geometry.name = 'ht_video_file_bg_geometry';
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color('rgba(0,170,255,0.784314)').convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_video_file_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.784314;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_video_file_bg.material.opacity = v * me._ht_video_file_bg.userData.backgroundColorAlpha;
			if (me._ht_video_file_bg.userData.ggSubElement) {
				me._ht_video_file_bg.userData.ggSubElement.material.opacity = v
				me._ht_video_file_bg.userData.ggSubElement.visible = (v>0 && me._ht_video_file_bg.userData.visible);
			}
			me._ht_video_file_bg.visible = (v>0 && me._ht_video_file_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_video_file_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_video_file_bg.userData.backgroundColorAlpha = v;
			me._ht_video_file_bg.userData.setOpacity(me._ht_video_file_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(1.188);
		el.scale.set(1.00, 0.01, 1.0);
		el.userData.width = 360;
		el.userData.height = 240;
		el.userData.scale = {x: 1.00, y: 0.01, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 1.188;
		el.name = 'ht_video_file_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_bg.visible
			let parentEl = me._ht_video_file_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_bg.userData.opacity = v;
			v = v * me._ht_video_file_bg.userData.parentOpacity;
			me._ht_video_file_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_bg.children.length; i++) {
				let child = me._ht_video_file_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_bg.userData.parentOpacity = v;
			v = v * me._ht_video_file_bg.userData.opacity
			me._ht_video_file_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_bg.children.length; i++) {
				let child = me._ht_video_file_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_bg = el;
		el.userData.ggId="ht_video_file_bg";
		me._ht_video_file_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				(((player.getVariableValue('vis_video_file_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_video_file_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_video_file_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_video_file_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_video_file_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_video_file_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_file_bg.userData.transitions[i].interval);
							me._ht_video_file_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_video_file_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_bg.scale.set(transition_scale.startScale.x + (me._ht_video_file_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_file_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_file_bg.position.x = (me._ht_video_file_bg.position.x - me._ht_video_file_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_file_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_file_bg.position.y = (me._ht_video_file_bg.position.y - me._ht_video_file_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_file_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_file_bg.userData.transitions.splice(me._ht_video_file_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_file_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_video_file_bg.userData.transitionValue_scale = {x: 1, y: 0.01, z: 1.0};
					for (var i = 0; i < me._ht_video_file_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_file_bg.userData.transitions[i].interval);
							me._ht_video_file_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_video_file_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_bg.scale.set(transition_scale.startScale.x + (me._ht_video_file_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_file_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_file_bg.position.x = (me._ht_video_file_bg.position.x - me._ht_video_file_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_video_file_bg.userData.curScaleOffX = scaleOffX;
						me._ht_video_file_bg.position.y = (me._ht_video_file_bg.position.y - me._ht_video_file_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_video_file_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_file_bg.userData.transitions.splice(me._ht_video_file_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_file_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_video_file_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('vis_video_file_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_file_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_file_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_file_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_file_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_file_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_bg.userData.transitions[i].interval);
							me._ht_video_file_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_bg.material ? me._ht_video_file_bg.material.opacity : me._ht_video_file_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_bg.userData.transitions.splice(me._ht_video_file_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_file_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_file_bg.userData.transitions.length; i++) {
						if (me._ht_video_file_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_bg.userData.transitions[i].interval);
							me._ht_video_file_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_bg.material ? me._ht_video_file_bg.material.opacity : me._ht_video_file_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_bg.userData.transitions.splice(me._ht_video_file_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_file_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneBufferGeometry(3.4, 2.2, 5, 5 );
		geometry.name = 'ht_video_file_video_geometry';
		material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_file_video_material';
		el = new THREE.Mesh( geometry, material );
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 340;
		el.userData.height = 220;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_video';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_file_video.material) me._ht_video_file_video.material.opacity = v;
			me._ht_video_file_video.visible = (v>0 && me._ht_video_file_video.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_video.visible
			let parentEl = me._ht_video_file_video.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_video.userData.opacity = v;
			v = v * me._ht_video_file_video.userData.parentOpacity;
			me._ht_video_file_video.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_video.children.length; i++) {
				let child = me._ht_video_file_video.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_video.userData.parentOpacity = v;
			v = v * me._ht_video_file_video.userData.opacity
			me._ht_video_file_video.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_video.children.length; i++) {
				let child = me._ht_video_file_video.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_video = el;
		me._ht_video_file_video.userData.seekbars = [];
		me._ht_video_file_video.userData.ggInitMedia = function(media) {
			if (me._ht_video_file_video__vid) me._ht_video_file_video__vid.pause();
			me._ht_video_file_video__vid = document.createElement('video');
			player.registerVideoElement('ht_video_file_video', me._ht_video_file_video__vid);
			me._ht_video_file_video__vid.setAttribute('autoplay', '');
			me._ht_video_file_video__source = document.createElement('source');
			me._ht_video_file_video__source.setAttribute('src', media);
			me._ht_video_file_video__vid.addEventListener('loadedmetadata', function() {
				let videoAR = me._ht_video_file_video__vid.videoWidth / me._ht_video_file_video__vid.videoHeight;
				let elAR = me._ht_video_file_video.userData.width / me._ht_video_file_video.userData.height;
				if (videoAR > elAR) {
					me._ht_video_file_video.scale.set(1, (me._ht_video_file_video.userData.width / videoAR) / me._ht_video_file_video.userData.height, 1);
				} else {
					me._ht_video_file_video.scale.set((me._ht_video_file_video.userData.height * videoAR) / me._ht_video_file_video.userData.width, 1, 1);
				}
			}, false);
			me._ht_video_file_video__vid.appendChild(me._ht_video_file_video__source);
			videoTexture = new THREE.VideoTexture( me._ht_video_file_video__vid );
			videoTexture.name = 'ht_video_file_video_videoTexture';
			videoTexture.minFilter = THREE.LinearFilter;
			videoTexture.magFilter = THREE.LinearFilter;
			videoTexture.format = THREE.RGBAFormat;
			videoMaterial = new THREE.MeshBasicMaterial( {map: videoTexture, side: THREE.DoubleSide, transparent: true} );
			videoMaterial.name = 'ht_video_file_video_videoMaterial';
			videoMaterial.alphaTest = 0.5;
			me._ht_video_file_video.material = videoMaterial;
		}
		el.userData.ggId="ht_video_file_video";
		me._ht_video_file_video.userData.ggIsActive=function() {
			if (me._ht_video_file_video__vid != null) {
				return (me._ht_video_file_video__vid.paused == false && me._ht_video_file_video__vid.ended == false);
			} else {
				return false;
			}
		}
		me._ht_video_file_video.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(((player.getVariableValue('vis_video_file_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_video_file_video.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_video_file_video.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_video_file_video.ggCurrentLogicStateVisible == 0) {
			me._ht_video_file_video.visible=((!me._ht_video_file_video.material && Number(me._ht_video_file_video.userData.opacity>0)) || Number(me._ht_video_file_video.material.opacity)>0)?true:false;
			me._ht_video_file_video.userData.visible=true;
					if (me._ht_video_file_video.userData.ggVideoNotLoaded) {
						me._ht_video_file_video.userData.ggInitMedia(me._ht_video_file_video.ggVideoSource);
					}
				}
				else {
			me._ht_video_file_video.visible=false;
			me._ht_video_file_video.userData.visible=false;
					me._ht_video_file_video.userData.ggInitMedia('');
				}
			}
		}
		me._ht_video_file_video.userData.onclick=function (e) {
			player.playPauseSound("ht_video_file_video","1");
		}
		me._ht_video_file_video.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_file_bg.add(me._ht_video_file_video);
		me._ht_video_file.add(me._ht_video_file_bg);
		geometry = new THREE.PlaneBufferGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'ht_video_file_close_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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');
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_video_file_close_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(2.1);
		el.translateY(0.975);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_video_file_close';
		el.userData.x = 2.1;
		el.userData.y = 0.975;
		el.userData.hanchor = 1;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_video_file_close.material) me._ht_video_file_close.material.opacity = v;
			me._ht_video_file_close.visible = (v>0 && me._ht_video_file_close.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_video_file_close.visible
			let parentEl = me._ht_video_file_close.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_video_file_close.userData.opacity = v;
			v = v * me._ht_video_file_close.userData.parentOpacity;
			me._ht_video_file_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_close.children.length; i++) {
				let child = me._ht_video_file_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_video_file_close.userData.parentOpacity = v;
			v = v * me._ht_video_file_close.userData.opacity
			me._ht_video_file_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_video_file_close.children.length; i++) {
				let child = me._ht_video_file_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_video_file_close = el;
		el.userData.ggId="ht_video_file_close";
		me._ht_video_file_close.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_video_file_close'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_video_file_close.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_video_file_close.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_video_file_close.ggCurrentLogicStateScaling == 0) {
					me._ht_video_file_close.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._ht_video_file_close.userData.transitions.length; i++) {
						if (me._ht_video_file_close.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_file_close.userData.transitions[i].interval);
							me._ht_video_file_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_video_file_close.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_close.scale.set(transition_scale.startScale.x + (me._ht_video_file_close.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_file_close.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_file_close.position.x = (me._ht_video_file_close.position.x - me._ht_video_file_close.userData.curScaleOffX) + scaleOffX;
						me._ht_video_file_close.userData.curScaleOffX = scaleOffX;
						me._ht_video_file_close.position.y = (me._ht_video_file_close.position.y - me._ht_video_file_close.userData.curScaleOffY) + scaleOffY;
						me._ht_video_file_close.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_file_close.userData.transitions.splice(me._ht_video_file_close.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_file_close.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_video_file_close.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_video_file_close.userData.transitions.length; i++) {
						if (me._ht_video_file_close.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_video_file_close.userData.transitions[i].interval);
							me._ht_video_file_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_video_file_close.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_close.scale.set(transition_scale.startScale.x + (me._ht_video_file_close.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_video_file_close.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_video_file_close.position.x = (me._ht_video_file_close.position.x - me._ht_video_file_close.userData.curScaleOffX) + scaleOffX;
						me._ht_video_file_close.userData.curScaleOffX = scaleOffX;
						me._ht_video_file_close.position.y = (me._ht_video_file_close.position.y - me._ht_video_file_close.userData.curScaleOffY) + scaleOffY;
						me._ht_video_file_close.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_video_file_close.userData.transitions.splice(me._ht_video_file_close.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_video_file_close.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_video_file_close.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('vis_video_file_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_video_file_close.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_video_file_close.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_video_file_close.ggCurrentLogicStateAlpha == 0) {
					me._ht_video_file_close.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_video_file_close.userData.transitions.length; i++) {
						if (me._ht_video_file_close.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_close.userData.transitions[i].interval);
							me._ht_video_file_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_close.material ? me._ht_video_file_close.material.opacity : me._ht_video_file_close.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_close.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_close.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_close.userData.transitions.splice(me._ht_video_file_close.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_close.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_video_file_close.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_video_file_close.userData.transitions.length; i++) {
						if (me._ht_video_file_close.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_video_file_close.userData.transitions[i].interval);
							me._ht_video_file_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_video_file_close.material ? me._ht_video_file_close.material.opacity : me._ht_video_file_close.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_video_file_close.userData.setOpacity(transition_alpha.startAlpha + (me._ht_video_file_close.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_video_file_close.userData.transitions.splice(me._ht_video_file_close.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_video_file_close.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_video_file_close.userData.onclick=function (e) {
			player.setVariableValue('vis_video_file_hotspots', player.getVariableValue('vis_video_file_hotspots').replace("<"+me.hotspot.id+">", ''));
		}
		me._ht_video_file_close.userData.onmouseover=function (e) {
			me.elementMouseOver['ht_video_file_close']=true;
			me._ht_video_file_close.logicBlock_scaling();
		}
		me._ht_video_file_close.userData.ontouchend=function (e) {
			me._ht_video_file_close.logicBlock_scaling();
		}
		me._ht_video_file_close.userData.onmouseout=function (e) {
			me.elementMouseOver['ht_video_file_close']=false;
			me._ht_video_file_close.logicBlock_scaling();
		}
		me._ht_video_file_close.ggCurrentLogicStateScaling = -1;
		me._ht_video_file_close.ggCurrentLogicStateAlpha = -1;
		me._ht_video_file_close.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_video_file_close']) {
				me.elementMouseOver['ht_video_file_close']=true;
			}
		}
		me._ht_video_file_close.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_video_file.add(me._ht_video_file_close);
		me._ht_video_file.userData.setOpacity(1.00);
		me._ht_video_file_icon.userData.setOpacity(1.00);
		me._ht_video_file_tooltip.userData.setOpacity(1.00);
		me._ht_video_file_bg.userData.setOpacity(0.00);
		me._ht_video_file_video.userData.setOpacity(1.00);
		me._ht_video_file_video.userData.ggVideoSource = 'media_vr/';
		me._ht_video_file_video.userData.ggVideoNotLoaded = true;
		me._ht_video_file_close.userData.setOpacity(0.00);
			me.ggEvent_activehotspotchanged=function() {
				me._ht_video_file_tooltip.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._ht_video_file_icon.logicBlock_visible();
				me._ht_video_file_tooltip.logicBlock_visible();
				me._ht_video_file_bg.logicBlock_scaling();
				me._ht_video_file_bg.logicBlock_alpha();
				me._ht_video_file_video.logicBlock_visible();
				me._ht_video_file_close.logicBlock_alpha();
			};
			me.ggEvent_configloaded=function() {
				me._ht_video_file_icon.logicBlock_visible();
				me._ht_video_file_tooltip.logicBlock_visible();
				me._ht_video_file_bg.logicBlock_scaling();
				me._ht_video_file_bg.logicBlock_alpha();
				me._ht_video_file_video.logicBlock_visible();
				me._ht_video_file_close.logicBlock_alpha();
			};
			me.ggEvent_varchanged_vis_video_file_hotspots=function() {
				me._ht_video_file_icon.logicBlock_visible();
				me._ht_video_file_bg.logicBlock_scaling();
				me._ht_video_file_bg.logicBlock_alpha();
				me._ht_video_file_video.logicBlock_visible();
				me._ht_video_file_close.logicBlock_alpha();
			};
			me.__obj = me._ht_video_file;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	function SkinHotspotClass_ht_node(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_node';
		el.userData.x = -2;
		el.userData.y = 1;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_node.visible
			let parentEl = me._ht_node.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node.userData.opacity = v;
			v = v * me._ht_node.userData.parentOpacity;
			me._ht_node.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node.children.length; i++) {
				let child = me._ht_node.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node.userData.parentOpacity = v;
			v = v * me._ht_node.userData.opacity
			me._ht_node.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node.children.length; i++) {
				let child = me._ht_node.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node = el;
		el.userData.ggId="ht_node";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_node.userData.onclick=function (e) {
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.userData.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.userData.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_node']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_node.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_node']) {
				player.setActiveHotspot(me.hotspot);
				me.elementMouseOver['ht_node']=true;
			}
		}
		me._ht_node.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneBufferGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'ht_node_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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');
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_node_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(-0.01);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_node_icon';
		el.userData.x = 0;
		el.userData.y = -0.01;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_node_icon.material) me._ht_node_icon.material.opacity = v;
			me._ht_node_icon.visible = (v>0 && me._ht_node_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_node_icon.visible
			let parentEl = me._ht_node_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node_icon.userData.opacity = v;
			v = v * me._ht_node_icon.userData.parentOpacity;
			me._ht_node_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_icon.children.length; i++) {
				let child = me._ht_node_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node_icon.userData.parentOpacity = v;
			v = v * me._ht_node_icon.userData.opacity
			me._ht_node_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_icon.children.length; i++) {
				let child = me._ht_node_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node_icon = el;
		el.userData.ggId="ht_node_icon";
		me._ht_node_icon.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_node_icon'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_node_icon.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_node_icon.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_node_icon.ggCurrentLogicStateScaling == 0) {
					me._ht_node_icon.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._ht_node_icon.userData.transitions.length; i++) {
						if (me._ht_node_icon.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_node_icon.userData.transitions[i].interval);
							me._ht_node_icon.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_node_icon.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_node_icon.scale.set(transition_scale.startScale.x + (me._ht_node_icon.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_node_icon.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_node_icon.position.x = (me._ht_node_icon.position.x - me._ht_node_icon.userData.curScaleOffX) + scaleOffX;
						me._ht_node_icon.userData.curScaleOffX = scaleOffX;
						me._ht_node_icon.position.y = (me._ht_node_icon.position.y - me._ht_node_icon.userData.curScaleOffY) + scaleOffY;
						me._ht_node_icon.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_node_icon.userData.transitions.splice(me._ht_node_icon.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_node_icon.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_node_icon.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_node_icon.userData.transitions.length; i++) {
						if (me._ht_node_icon.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_node_icon.userData.transitions[i].interval);
							me._ht_node_icon.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_node_icon.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_node_icon.scale.set(transition_scale.startScale.x + (me._ht_node_icon.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_node_icon.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_node_icon.position.x = (me._ht_node_icon.position.x - me._ht_node_icon.userData.curScaleOffX) + scaleOffX;
						me._ht_node_icon.userData.curScaleOffX = scaleOffX;
						me._ht_node_icon.position.y = (me._ht_node_icon.position.y - me._ht_node_icon.userData.curScaleOffY) + scaleOffY;
						me._ht_node_icon.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_node_icon.userData.transitions.splice(me._ht_node_icon.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_node_icon.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_node_icon.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_image_hotspots') == "true"))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_node_icon.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_node_icon.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_node_icon.ggCurrentLogicStateVisible == 0) {
			me._ht_node_icon.visible=false;
			me._ht_node_icon.userData.visible=false;
				}
				else {
			me._ht_node_icon.visible=((!me._ht_node_icon.material && Number(me._ht_node_icon.userData.opacity>0)) || Number(me._ht_node_icon.material.opacity)>0)?true:false;
			me._ht_node_icon.userData.visible=true;
				}
			}
		}
		me._ht_node_icon.userData.onclick=function (e) {
			player.openNext(player._(me.hotspot.url),player._(me.hotspot.target));
		}
		me._ht_node_icon.userData.onmouseover=function (e) {
			me.elementMouseOver['ht_node_icon']=true;
			me._ht_node_tooltip.logicBlock_visible();
			me._ht_node_icon.logicBlock_scaling();
		}
		me._ht_node_icon.userData.ontouchend=function (e) {
			me._ht_node_icon.logicBlock_scaling();
		}
		me._ht_node_icon.userData.onmouseout=function (e) {
			me.elementMouseOver['ht_node_icon']=false;
			me._ht_node_tooltip.logicBlock_visible();
			me._ht_node_icon.logicBlock_scaling();
		}
		me._ht_node_icon.ggCurrentLogicStateScaling = -1;
		me._ht_node_icon.ggCurrentLogicStateVisible = -1;
		me._ht_node_icon.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_node_icon']) {
				me.elementMouseOver['ht_node_icon']=true;
				me._ht_node_tooltip.logicBlock_visible();
			}
		}
		me._ht_node_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneBufferGeometry(1, 0.22, 5, 5 );
		geometry.name = 'ht_node_tooltip_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_node_tooltip_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.784314;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_node_tooltip.material.opacity = v;
			if (me._ht_node_tooltip.userData.hasScrollbar) {
				me._ht_node_tooltip.userData.scrollbar.material.opacity = v;
				me._ht_node_tooltip.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_node_tooltip.userData.ggSubElement) {
				me._ht_node_tooltip.userData.ggSubElement.material.opacity = v
				me._ht_node_tooltip.userData.ggSubElement.visible = (v>0 && me._ht_node_tooltip.userData.visible);
			}
			me._ht_node_tooltip.visible = (v>0 && me._ht_node_tooltip.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_node_tooltip.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_node_tooltip.userData.backgroundColorAlpha = v;
			me._ht_node_tooltip.userData.setOpacity(me._ht_node_tooltip.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.365);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 100;
		el.userData.height = 22;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_node_tooltip';
		el.userData.x = 0;
		el.userData.y = -0.365;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_node_tooltip.visible
			let parentEl = me._ht_node_tooltip.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_node_tooltip.userData.opacity = v;
			v = v * me._ht_node_tooltip.userData.parentOpacity;
			me._ht_node_tooltip.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_tooltip.children.length; i++) {
				let child = me._ht_node_tooltip.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_node_tooltip.userData.parentOpacity = v;
			v = v * me._ht_node_tooltip.userData.opacity
			me._ht_node_tooltip.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_node_tooltip.children.length; i++) {
				let child = me._ht_node_tooltip.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_node_tooltip = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(0, 0.666667, 1);
		el.userData.textColor = new THREE.Color(1, 1, 1);
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 100;
		canvas.height = 22;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_node_tooltip.userData.totalHeight = 13;
			me._ht_node_tooltip.userData.textLines = [];
			var ctx = me._ht_node_tooltip.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_node_tooltip.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_node_tooltip.userData.textLines.push(line);
					line = '';
					me._ht_node_tooltip.userData.totalHeight += me._ht_node_tooltip.userData.lineHeight;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (me._ht_node_tooltip.userData.width - 10 - (scrollbar ? 25 : 0)) && i > 0) {
					me._ht_node_tooltip.userData.textLines.push(line);
					line = words[i];
					me._ht_node_tooltip.userData.totalHeight += me._ht_node_tooltip.userData.lineHeight;
				} else {
					line = testLine;
				}
			}
			me._ht_node_tooltip.userData.textLines.push(line);
			me._ht_node_tooltip.userData.totalHeight += me._ht_node_tooltip.userData.lineHeight;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_node_tooltip.userData.textCanvas;
			var ctx = me._ht_node_tooltip.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_node_tooltip.userData.backgroundColor.r * 255 + ', ' + me._ht_node_tooltip.userData.backgroundColor.g * 255 + ', ' + me._ht_node_tooltip.userData.backgroundColor.b * 255 + ', ' + me._ht_node_tooltip.userData.backgroundColorAlpha + ')';
			ctx.fillRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_node_tooltip.userData.textColor.r * 255 + ', ' + me._ht_node_tooltip.userData.textColor.g * 255 + ', ' + me._ht_node_tooltip.userData.textColor.b * 255 + ', ' + me._ht_node_tooltip.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_node_tooltip.userData.boxWidth - (me._ht_node_tooltip.userData.hasScrollbar ? 25 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 8;
			for (var i = 0; i < me._ht_node_tooltip.userData.textLines.length; i++) {
				ctx.fillText(me._ht_node_tooltip.userData.textLines[i], x, y);
				y += me._ht_node_tooltip.userData.lineHeight;
			}
			geometry = new THREE.PlaneBufferGeometry(me._ht_node_tooltip.userData.boxWidth / 100.0, me._ht_node_tooltip.userData.boxHeight / 100.0, 5, 5 );
			geometry.name = 'ht_node_tooltip_geometry';
			me._ht_node_tooltip.geometry.dispose();
			me._ht_node_tooltip.geometry = geometry;
			var diffY = me._ht_node_tooltip.userData.boxHeight - me._ht_node_tooltip.userData.height;
			me._ht_node_tooltip.position.y = me._ht_node_tooltip.userData.y - ((diffY / 2.0) / 100.0);
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_node_tooltip_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.encoding = THREE.sRGBEncoding;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_node_tooltip.material.map) {
				me._ht_node_tooltip.material.map.dispose();
			}
			me._ht_node_tooltip.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			me._ht_node_tooltip.remove(...me._ht_node_tooltip.children);
			var canv = me._ht_node_tooltip.userData.textCanvas;
			var ctx = me._ht_node_tooltip.userData.textCanvasContext;
			ctx.font = '18px Verdana';
			me._ht_node_tooltip.userData.lineHeight = 18 * 1.2;
			me._ht_node_tooltip.userData.textLines = [];
			me._ht_node_tooltip.userData.textLines.push(me._ht_node_tooltip.userData.ggText);
			me._ht_node_tooltip.userData.totalHeight = 13;
			me._ht_node_tooltip.userData.totalHeight += me._ht_node_tooltip.userData.lineHeight;
			me._ht_node_tooltip.userData.boxWidth = ctx.measureText(me._ht_node_tooltip.userData.ggText).width + 10;
			me._ht_node_tooltip.userData.boxHeight = me._ht_node_tooltip.userData.totalHeight;
			canv.width = me._ht_node_tooltip.userData.boxWidth;
			canv.height = me._ht_node_tooltip.userData.boxHeight;
			ctx.font = '18px Verdana';
			me._ht_node_tooltip.userData.ggPaintCanvasText();
		}
		me._ht_node_tooltip.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_node_tooltip.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_node_tooltip.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_node_tooltip.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_node_tooltip.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_node_tooltip.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_node_tooltip.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_node_tooltip";
		me._ht_node_tooltip.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_node_icon'] == true)) && 
				((player._(me.hotspot.title) != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_node_tooltip.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_node_tooltip.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_node_tooltip.ggCurrentLogicStateVisible == 0) {
			me._ht_node_tooltip.visible=((!me._ht_node_tooltip.material && Number(me._ht_node_tooltip.userData.opacity>0)) || Number(me._ht_node_tooltip.material.opacity)>0)?true:false;
			me._ht_node_tooltip.userData.visible=true;
				}
				else {
			me._ht_node_tooltip.visible=false;
			me._ht_node_tooltip.userData.visible=false;
				}
			}
		}
		me._ht_node_tooltip.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node_icon.add(me._ht_node_tooltip);
		me._ht_node.add(me._ht_node_icon);
		me._ht_node.userData.setOpacity(1.00);
		me._ht_node_icon.userData.setOpacity(1.00);
		me._ht_node_tooltip.userData.setOpacity(1.00);
			me.ggEvent_activehotspotchanged=function() {
				me._ht_node_tooltip.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._ht_node_icon.logicBlock_visible();
				me._ht_node_tooltip.logicBlock_visible();
			};
			me.ggEvent_configloaded=function() {
				me._ht_node_icon.logicBlock_visible();
				me._ht_node_tooltip.logicBlock_visible();
			};
			me.ggEvent_varchanged_vis_image_hotspots=function() {
				me._ht_node_icon.logicBlock_visible();
			};
			me.__obj = me._ht_node;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	function SkinHotspotClass_ht_image(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_image';
		el.userData.x = -2;
		el.userData.y = 1;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image.visible
			let parentEl = me._ht_image.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image.userData.opacity = v;
			v = v * me._ht_image.userData.parentOpacity;
			me._ht_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image.children.length; i++) {
				let child = me._ht_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image.userData.parentOpacity = v;
			v = v * me._ht_image.userData.opacity
			me._ht_image.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image.children.length; i++) {
				let child = me._ht_image.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image = el;
		el.userData.ggId="ht_image";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_image.userData.onclick=function (e) {
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_image.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_image.userData.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_image']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_image.userData.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_image']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_image.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_image']) {
				player.setActiveHotspot(me.hotspot);
				me.elementMouseOver['ht_image']=true;
			}
		}
		me._ht_image.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneBufferGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'ht_image_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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');
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_image_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(-0.01);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_icon';
		el.userData.x = 0;
		el.userData.y = -0.01;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_image_icon.material) me._ht_image_icon.material.opacity = v;
			me._ht_image_icon.visible = (v>0 && me._ht_image_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_image_icon.visible
			let parentEl = me._ht_image_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_icon.userData.opacity = v;
			v = v * me._ht_image_icon.userData.parentOpacity;
			me._ht_image_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_icon.children.length; i++) {
				let child = me._ht_image_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_icon.userData.parentOpacity = v;
			v = v * me._ht_image_icon.userData.opacity
			me._ht_image_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_icon.children.length; i++) {
				let child = me._ht_image_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_icon = el;
		el.userData.ggId="ht_image_icon";
		me._ht_image_icon.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_image_icon'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_image_icon.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_image_icon.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_image_icon.ggCurrentLogicStateScaling == 0) {
					me._ht_image_icon.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._ht_image_icon.userData.transitions.length; i++) {
						if (me._ht_image_icon.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_image_icon.userData.transitions[i].interval);
							me._ht_image_icon.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_image_icon.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_icon.scale.set(transition_scale.startScale.x + (me._ht_image_icon.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_image_icon.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_image_icon.position.x = (me._ht_image_icon.position.x - me._ht_image_icon.userData.curScaleOffX) + scaleOffX;
						me._ht_image_icon.userData.curScaleOffX = scaleOffX;
						me._ht_image_icon.position.y = (me._ht_image_icon.position.y - me._ht_image_icon.userData.curScaleOffY) + scaleOffY;
						me._ht_image_icon.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_image_icon.userData.transitions.splice(me._ht_image_icon.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_image_icon.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_image_icon.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_image_icon.userData.transitions.length; i++) {
						if (me._ht_image_icon.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_image_icon.userData.transitions[i].interval);
							me._ht_image_icon.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_image_icon.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_icon.scale.set(transition_scale.startScale.x + (me._ht_image_icon.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_image_icon.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_image_icon.position.x = (me._ht_image_icon.position.x - me._ht_image_icon.userData.curScaleOffX) + scaleOffX;
						me._ht_image_icon.userData.curScaleOffX = scaleOffX;
						me._ht_image_icon.position.y = (me._ht_image_icon.position.y - me._ht_image_icon.userData.curScaleOffY) + scaleOffY;
						me._ht_image_icon.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_image_icon.userData.transitions.splice(me._ht_image_icon.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_image_icon.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_image_icon.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((player.getVariableValue('vis_image_hotspots') == "true"))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_image_icon.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_image_icon.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_image_icon.ggCurrentLogicStateVisible == 0) {
			me._ht_image_icon.visible=false;
			me._ht_image_icon.userData.visible=false;
				}
				else {
			me._ht_image_icon.visible=((!me._ht_image_icon.material && Number(me._ht_image_icon.userData.opacity>0)) || Number(me._ht_image_icon.material.opacity)>0)?true:false;
			me._ht_image_icon.userData.visible=true;
				}
			}
		}
		me._ht_image_icon.userData.onclick=function (e) {
			player.setVariableValue('vis_image_hotspots', player.getVariableValue('vis_image_hotspots') + "<"+me.hotspot.id+">");
		}
		me._ht_image_icon.userData.onmouseover=function (e) {
			me.elementMouseOver['ht_image_icon']=true;
			me._ht_image_tooltip.logicBlock_visible();
			me._ht_image_icon.logicBlock_scaling();
		}
		me._ht_image_icon.userData.ontouchend=function (e) {
			me._ht_image_icon.logicBlock_scaling();
		}
		me._ht_image_icon.userData.onmouseout=function (e) {
			me.elementMouseOver['ht_image_icon']=false;
			me._ht_image_tooltip.logicBlock_visible();
			me._ht_image_icon.logicBlock_scaling();
		}
		me._ht_image_icon.ggCurrentLogicStateScaling = -1;
		me._ht_image_icon.ggCurrentLogicStateVisible = -1;
		me._ht_image_icon.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_image_icon']) {
				me.elementMouseOver['ht_image_icon']=true;
				me._ht_image_tooltip.logicBlock_visible();
			}
		}
		me._ht_image_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneBufferGeometry(1, 0.22, 5, 5 );
		geometry.name = 'ht_image_tooltip_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_image_tooltip_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.784314;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_image_tooltip.material.opacity = v;
			if (me._ht_image_tooltip.userData.hasScrollbar) {
				me._ht_image_tooltip.userData.scrollbar.material.opacity = v;
				me._ht_image_tooltip.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_image_tooltip.userData.ggSubElement) {
				me._ht_image_tooltip.userData.ggSubElement.material.opacity = v
				me._ht_image_tooltip.userData.ggSubElement.visible = (v>0 && me._ht_image_tooltip.userData.visible);
			}
			me._ht_image_tooltip.visible = (v>0 && me._ht_image_tooltip.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_image_tooltip.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_image_tooltip.userData.backgroundColorAlpha = v;
			me._ht_image_tooltip.userData.setOpacity(me._ht_image_tooltip.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.365);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 100;
		el.userData.height = 22;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_tooltip';
		el.userData.x = 0;
		el.userData.y = -0.365;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image_tooltip.visible
			let parentEl = me._ht_image_tooltip.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_tooltip.userData.opacity = v;
			v = v * me._ht_image_tooltip.userData.parentOpacity;
			me._ht_image_tooltip.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_tooltip.children.length; i++) {
				let child = me._ht_image_tooltip.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_tooltip.userData.parentOpacity = v;
			v = v * me._ht_image_tooltip.userData.opacity
			me._ht_image_tooltip.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_tooltip.children.length; i++) {
				let child = me._ht_image_tooltip.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_tooltip = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(0, 0.666667, 1);
		el.userData.textColor = new THREE.Color(1, 1, 1);
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 100;
		canvas.height = 22;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_image_tooltip.userData.totalHeight = 13;
			me._ht_image_tooltip.userData.textLines = [];
			var ctx = me._ht_image_tooltip.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_image_tooltip.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_image_tooltip.userData.textLines.push(line);
					line = '';
					me._ht_image_tooltip.userData.totalHeight += me._ht_image_tooltip.userData.lineHeight;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (me._ht_image_tooltip.userData.width - 10 - (scrollbar ? 25 : 0)) && i > 0) {
					me._ht_image_tooltip.userData.textLines.push(line);
					line = words[i];
					me._ht_image_tooltip.userData.totalHeight += me._ht_image_tooltip.userData.lineHeight;
				} else {
					line = testLine;
				}
			}
			me._ht_image_tooltip.userData.textLines.push(line);
			me._ht_image_tooltip.userData.totalHeight += me._ht_image_tooltip.userData.lineHeight;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_image_tooltip.userData.textCanvas;
			var ctx = me._ht_image_tooltip.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_image_tooltip.userData.backgroundColor.r * 255 + ', ' + me._ht_image_tooltip.userData.backgroundColor.g * 255 + ', ' + me._ht_image_tooltip.userData.backgroundColor.b * 255 + ', ' + me._ht_image_tooltip.userData.backgroundColorAlpha + ')';
			ctx.fillRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_image_tooltip.userData.textColor.r * 255 + ', ' + me._ht_image_tooltip.userData.textColor.g * 255 + ', ' + me._ht_image_tooltip.userData.textColor.b * 255 + ', ' + me._ht_image_tooltip.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_image_tooltip.userData.boxWidth - (me._ht_image_tooltip.userData.hasScrollbar ? 25 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 8;
			for (var i = 0; i < me._ht_image_tooltip.userData.textLines.length; i++) {
				ctx.fillText(me._ht_image_tooltip.userData.textLines[i], x, y);
				y += me._ht_image_tooltip.userData.lineHeight;
			}
			geometry = new THREE.PlaneBufferGeometry(me._ht_image_tooltip.userData.boxWidth / 100.0, me._ht_image_tooltip.userData.boxHeight / 100.0, 5, 5 );
			geometry.name = 'ht_image_tooltip_geometry';
			me._ht_image_tooltip.geometry.dispose();
			me._ht_image_tooltip.geometry = geometry;
			var diffY = me._ht_image_tooltip.userData.boxHeight - me._ht_image_tooltip.userData.height;
			me._ht_image_tooltip.position.y = me._ht_image_tooltip.userData.y - ((diffY / 2.0) / 100.0);
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_image_tooltip_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.encoding = THREE.sRGBEncoding;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_image_tooltip.material.map) {
				me._ht_image_tooltip.material.map.dispose();
			}
			me._ht_image_tooltip.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			me._ht_image_tooltip.remove(...me._ht_image_tooltip.children);
			var canv = me._ht_image_tooltip.userData.textCanvas;
			var ctx = me._ht_image_tooltip.userData.textCanvasContext;
			ctx.font = '18px Verdana';
			me._ht_image_tooltip.userData.lineHeight = 18 * 1.2;
			me._ht_image_tooltip.userData.textLines = [];
			me._ht_image_tooltip.userData.textLines.push(me._ht_image_tooltip.userData.ggText);
			me._ht_image_tooltip.userData.totalHeight = 13;
			me._ht_image_tooltip.userData.totalHeight += me._ht_image_tooltip.userData.lineHeight;
			me._ht_image_tooltip.userData.boxWidth = ctx.measureText(me._ht_image_tooltip.userData.ggText).width + 10;
			me._ht_image_tooltip.userData.boxHeight = me._ht_image_tooltip.userData.totalHeight;
			canv.width = me._ht_image_tooltip.userData.boxWidth;
			canv.height = me._ht_image_tooltip.userData.boxHeight;
			ctx.font = '18px Verdana';
			me._ht_image_tooltip.userData.ggPaintCanvasText();
		}
		me._ht_image_tooltip.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_image_tooltip.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_image_tooltip.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_image_tooltip.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_image_tooltip.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_image_tooltip.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_image_tooltip.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_image_tooltip";
		me._ht_image_tooltip.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_image_icon'] == true)) && 
				((player._(me.hotspot.title) != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_image_tooltip.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_image_tooltip.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_image_tooltip.ggCurrentLogicStateVisible == 0) {
			me._ht_image_tooltip.visible=((!me._ht_image_tooltip.material && Number(me._ht_image_tooltip.userData.opacity>0)) || Number(me._ht_image_tooltip.material.opacity)>0)?true:false;
			me._ht_image_tooltip.userData.visible=true;
				}
				else {
			me._ht_image_tooltip.visible=false;
			me._ht_image_tooltip.userData.visible=false;
				}
			}
		}
		me._ht_image_tooltip.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_image_icon.add(me._ht_image_tooltip);
		me._ht_image.add(me._ht_image_icon);
		geometry = new THREE.PlaneBufferGeometry(3.6, 3.6, 5, 5 );
		geometry.name = 'ht_image_bg_geometry';
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color('rgba(0,170,255,0.784314)').convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_image_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.784314;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_image_bg.material.opacity = v * me._ht_image_bg.userData.backgroundColorAlpha;
			if (me._ht_image_bg.userData.ggSubElement) {
				me._ht_image_bg.userData.ggSubElement.material.opacity = v
				me._ht_image_bg.userData.ggSubElement.visible = (v>0 && me._ht_image_bg.userData.visible);
			}
			me._ht_image_bg.visible = (v>0 && me._ht_image_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_image_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_image_bg.userData.backgroundColorAlpha = v;
			me._ht_image_bg.userData.setOpacity(me._ht_image_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(1.782);
		el.scale.set(1.00, 0.01, 1.0);
		el.userData.width = 360;
		el.userData.height = 360;
		el.userData.scale = {x: 1.00, y: 0.01, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 1.782;
		el.name = 'ht_image_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image_bg.visible
			let parentEl = me._ht_image_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_bg.userData.opacity = v;
			v = v * me._ht_image_bg.userData.parentOpacity;
			me._ht_image_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_bg.children.length; i++) {
				let child = me._ht_image_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_bg.userData.parentOpacity = v;
			v = v * me._ht_image_bg.userData.opacity
			me._ht_image_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_bg.children.length; i++) {
				let child = me._ht_image_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_bg = el;
		el.userData.ggId="ht_image_bg";
		me._ht_image_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				(((player.getVariableValue('vis_image_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_image_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_image_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_image_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_image_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_image_bg.userData.transitions.length; i++) {
						if (me._ht_image_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_image_bg.userData.transitions[i].interval);
							me._ht_image_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_image_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_bg.scale.set(transition_scale.startScale.x + (me._ht_image_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_image_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_image_bg.position.x = (me._ht_image_bg.position.x - me._ht_image_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_image_bg.userData.curScaleOffX = scaleOffX;
						me._ht_image_bg.position.y = (me._ht_image_bg.position.y - me._ht_image_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_image_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_image_bg.userData.transitions.splice(me._ht_image_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_image_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_image_bg.userData.transitionValue_scale = {x: 1, y: 0.01, z: 1.0};
					for (var i = 0; i < me._ht_image_bg.userData.transitions.length; i++) {
						if (me._ht_image_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_image_bg.userData.transitions[i].interval);
							me._ht_image_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_image_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_bg.scale.set(transition_scale.startScale.x + (me._ht_image_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_image_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_image_bg.position.x = (me._ht_image_bg.position.x - me._ht_image_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_image_bg.userData.curScaleOffX = scaleOffX;
						me._ht_image_bg.position.y = (me._ht_image_bg.position.y - me._ht_image_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_image_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_image_bg.userData.transitions.splice(me._ht_image_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_image_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_image_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('vis_image_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_image_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_image_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_image_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_image_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_image_bg.userData.transitions.length; i++) {
						if (me._ht_image_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_bg.userData.transitions[i].interval);
							me._ht_image_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_bg.material ? me._ht_image_bg.material.opacity : me._ht_image_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_bg.userData.transitions.splice(me._ht_image_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_image_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_image_bg.userData.transitions.length; i++) {
						if (me._ht_image_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_bg.userData.transitions[i].interval);
							me._ht_image_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_bg.material ? me._ht_image_bg.material.opacity : me._ht_image_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_bg.userData.transitions.splice(me._ht_image_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_image_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		el = new THREE.Group();
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_image_img.userData.ggSubElement) {
				me._ht_image_img.userData.ggSubElement.material.opacity = v
				me._ht_image_img.userData.ggSubElement.visible = (v>0 && me._ht_image_img.userData.visible);
			}
			me._ht_image_img.visible = (v>0 && me._ht_image_img.userData.visible);
		}
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 340;
		el.userData.height = 340;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_img';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_image_img.visible
			let parentEl = me._ht_image_img.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_img.userData.opacity = v;
			v = v * me._ht_image_img.userData.parentOpacity;
			me._ht_image_img.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_img.children.length; i++) {
				let child = me._ht_image_img.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_img.userData.parentOpacity = v;
			v = v * me._ht_image_img.userData.opacity
			me._ht_image_img.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_img.children.length; i++) {
				let child = me._ht_image_img.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_img = el;
		currentWidth = 340;
		currentHeight = 340;
		var img = {};
		img.geometry = new THREE.PlaneBufferGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
		img.geometry.name = 'ht_image_img_imgGeometry';
		loader = new THREE.TextureLoader();
		el.userData.ggSetUrl = function(extUrl) {
			loader.load(extUrl,
				function (texture) {
				var loadedMaterial = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
				loadedMaterial.name = 'ht_image_img_subElementMaterial';
				me._ht_image_img.userData.ggSubElement.material = loadedMaterial;
				me._ht_image_img.userData.ggUpdatePosition();
				me._ht_image_img.userData.ggText = extUrl;
				me._ht_image_img.userData.setOpacity(me._ht_image_img.userData.opacity);
			});
		};
		var extUrl=basePath + ""+player._(me.hotspot.url)+"";
		el.userData.ggSetUrl(extUrl);
		material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide, transparent: true } );
		material.name = 'ht_image_img_subElementMaterial';
		el.userData.ggSubElement = new THREE.Mesh( img.geometry, material );
		el.userData.ggSubElement.name = 'ht_image_img_subElement';
		el.add(el.userData.ggSubElement);
		el.userData.clientWidth = 340;
		el.userData.clientHeight = 340;
		el.userData.ggId="ht_image_img";
		me._ht_image_img.userData.ggUpdatePosition=function (useTransition) {
			var parentWidth = me._ht_image_img.userData.clientWidth;
			var parentHeight = me._ht_image_img.userData.clientHeight;
			var img = me._ht_image_img.userData.ggSubElement;
			var imgWidth = img.material.map.image.naturalWidth;
			var imgHeight = img.material.map.image.naturalHeight;
			var aspectRatioDiv = parentWidth / parentHeight;
			var aspectRatioImg = imgWidth / imgHeight;
			if (imgWidth < parentWidth) parentWidth = imgWidth;
			if (imgHeight < parentHeight) parentHeight = imgHeight;
			var currentWidth, currentHeight;
			img.geometry.dispose();
			if (aspectRatioDiv > aspectRatioImg) {
				currentHeight = parentHeight;
				currentWidth = parentHeight * aspectRatioImg;
			img.geometry = new THREE.PlaneBufferGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
			img.geometry.name = 'ht_image_img_imgGeometry';
			} else {
				currentWidth = parentWidth;
				currentHeight = parentWidth / aspectRatioImg;
			img.geometry = new THREE.PlaneBufferGeometry(currentWidth / 100.0, currentHeight / 100.0, 5, 5 );
			img.geometry.name = 'ht_image_img_imgGeometry';
			};
		}
		me._ht_image_bg.add(me._ht_image_img);
		me._ht_image.add(me._ht_image_bg);
		geometry = new THREE.PlaneBufferGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'ht_image_close_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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');
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_image_close_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(2.1);
		el.translateY(1.575);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_image_close';
		el.userData.x = 2.1;
		el.userData.y = 1.575;
		el.userData.hanchor = 1;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_image_close.material) me._ht_image_close.material.opacity = v;
			me._ht_image_close.visible = (v>0 && me._ht_image_close.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_image_close.visible
			let parentEl = me._ht_image_close.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_image_close.userData.opacity = v;
			v = v * me._ht_image_close.userData.parentOpacity;
			me._ht_image_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_close.children.length; i++) {
				let child = me._ht_image_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_image_close.userData.parentOpacity = v;
			v = v * me._ht_image_close.userData.opacity
			me._ht_image_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_image_close.children.length; i++) {
				let child = me._ht_image_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_image_close = el;
		el.userData.ggId="ht_image_close";
		me._ht_image_close.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_image_close'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_image_close.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_image_close.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_image_close.ggCurrentLogicStateScaling == 0) {
					me._ht_image_close.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._ht_image_close.userData.transitions.length; i++) {
						if (me._ht_image_close.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_image_close.userData.transitions[i].interval);
							me._ht_image_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_image_close.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_close.scale.set(transition_scale.startScale.x + (me._ht_image_close.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_image_close.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_image_close.position.x = (me._ht_image_close.position.x - me._ht_image_close.userData.curScaleOffX) + scaleOffX;
						me._ht_image_close.userData.curScaleOffX = scaleOffX;
						me._ht_image_close.position.y = (me._ht_image_close.position.y - me._ht_image_close.userData.curScaleOffY) + scaleOffY;
						me._ht_image_close.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_image_close.userData.transitions.splice(me._ht_image_close.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_image_close.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_image_close.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_image_close.userData.transitions.length; i++) {
						if (me._ht_image_close.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_image_close.userData.transitions[i].interval);
							me._ht_image_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_image_close.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_close.scale.set(transition_scale.startScale.x + (me._ht_image_close.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_image_close.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_image_close.position.x = (me._ht_image_close.position.x - me._ht_image_close.userData.curScaleOffX) + scaleOffX;
						me._ht_image_close.userData.curScaleOffX = scaleOffX;
						me._ht_image_close.position.y = (me._ht_image_close.position.y - me._ht_image_close.userData.curScaleOffY) + scaleOffY;
						me._ht_image_close.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_image_close.userData.transitions.splice(me._ht_image_close.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_image_close.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_image_close.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('vis_image_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_image_close.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_image_close.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_image_close.ggCurrentLogicStateAlpha == 0) {
					me._ht_image_close.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_image_close.userData.transitions.length; i++) {
						if (me._ht_image_close.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_close.userData.transitions[i].interval);
							me._ht_image_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_close.material ? me._ht_image_close.material.opacity : me._ht_image_close.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_close.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_close.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_close.userData.transitions.splice(me._ht_image_close.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_close.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_image_close.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_image_close.userData.transitions.length; i++) {
						if (me._ht_image_close.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_image_close.userData.transitions[i].interval);
							me._ht_image_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_image_close.material ? me._ht_image_close.material.opacity : me._ht_image_close.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_image_close.userData.setOpacity(transition_alpha.startAlpha + (me._ht_image_close.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_image_close.userData.transitions.splice(me._ht_image_close.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_image_close.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_image_close.userData.onclick=function (e) {
			player.setVariableValue('vis_image_hotspots', player.getVariableValue('vis_image_hotspots').replace("<"+me.hotspot.id+">", ''));
		}
		me._ht_image_close.userData.onmouseover=function (e) {
			me.elementMouseOver['ht_image_close']=true;
			me._ht_image_close.logicBlock_scaling();
		}
		me._ht_image_close.userData.ontouchend=function (e) {
			me._ht_image_close.logicBlock_scaling();
		}
		me._ht_image_close.userData.onmouseout=function (e) {
			me.elementMouseOver['ht_image_close']=false;
			me._ht_image_close.logicBlock_scaling();
		}
		me._ht_image_close.ggCurrentLogicStateScaling = -1;
		me._ht_image_close.ggCurrentLogicStateAlpha = -1;
		me._ht_image_close.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_image_close']) {
				me.elementMouseOver['ht_image_close']=true;
			}
		}
		me._ht_image_close.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_image.add(me._ht_image_close);
		me._ht_image.userData.setOpacity(1.00);
		me._ht_image_icon.userData.setOpacity(1.00);
		me._ht_image_tooltip.userData.setOpacity(1.00);
		me._ht_image_bg.userData.setOpacity(0.00);
		me._ht_image_img.userData.setOpacity(1.00);
		me._ht_image_close.userData.setOpacity(0.00);
			me.ggEvent_activehotspotchanged=function() {
				me._ht_image_tooltip.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._ht_image_icon.logicBlock_visible();
				me._ht_image_tooltip.logicBlock_visible();
				me._ht_image_bg.logicBlock_scaling();
				me._ht_image_bg.logicBlock_alpha();
				me._ht_image_close.logicBlock_alpha();
			};
			me.ggEvent_configloaded=function() {
				me._ht_image_icon.logicBlock_visible();
				me._ht_image_tooltip.logicBlock_visible();
				me._ht_image_bg.logicBlock_scaling();
				me._ht_image_bg.logicBlock_alpha();
				me._ht_image_close.logicBlock_alpha();
			};
			me.ggEvent_varchanged_vis_image_hotspots=function() {
				me._ht_image_icon.logicBlock_visible();
				me._ht_image_bg.logicBlock_scaling();
				me._ht_image_bg.logicBlock_alpha();
				me._ht_image_close.logicBlock_alpha();
			};
			me.__obj = me._ht_image;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	function SkinHotspotClass_ht_info(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):''; // }
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.ggUserdata.nodeId=nodeId;
		me.elementMouseDown={};
		me.elementMouseOver={};
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el = new THREE.Group();
		el.userData.setOpacityInternal = function(v) {};
		el.name = 'ht_info';
		el.userData.x = -2;
		el.userData.y = 1;
		el.userData.hanchor = 0;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info.visible
			let parentEl = me._ht_info.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info.userData.opacity = v;
			v = v * me._ht_info.userData.parentOpacity;
			me._ht_info.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info.children.length; i++) {
				let child = me._ht_info.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info.userData.parentOpacity = v;
			v = v * me._ht_info.userData.opacity
			me._ht_info.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info.children.length; i++) {
				let child = me._ht_info.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info = el;
		el.userData.ggId="ht_info";
		el.userData.ggElementNodeId=function() {
			if (me.hotspot.url!='' && me.hotspot.url.charAt(0)=='{') { // }
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			} else {
				if ((this.parentNode) && (this.parentNode.userData.ggElementNodeId)) {
					return this.parentNode.userData.ggElementNodeId();
				} else {
					return player.getCurrentNode();
				}
			}
		}
		me._ht_info.userData.onclick=function (e) {
			player.triggerEvent('hsproxyclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_info.userData.ondblclick=function (e) {
			player.triggerEvent('hsproxydblclick', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_info.userData.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_info']=true;
			player.triggerEvent('hsproxyover', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_info.userData.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_info']=false;
			player.triggerEvent('hsproxyout', {'id': me.hotspot.id, 'url': me.hotspot.url});
		}
		me._ht_info.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_info']) {
				player.setActiveHotspot(me.hotspot);
				me.elementMouseOver['ht_info']=true;
			}
		}
		me._ht_info.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneBufferGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'ht_info_icon_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAHOElEQVR4nO2dXWgcVRTH/+fuLGOoCmIL2bX1odAvI2gCVayCEkHNOrtBSSk20OZp++qLiGgVWqUQQZ/dNwtpqYFKd8dE89CnWMEGP9BIDKWFNE23GInYptuls3N86NgS28znnZnNOD/Iw3bvPffffyZ3Zu6cewZISUlJSUlJSUlJEBS3gP/S19enZjKZHgDbiWgrgK0ANgJ40Pp5wGp6FcDf1s88gFlmngUw02q1fhgfH29Gr3512sFoKhQKTyiK0meaZi8RPQfgvoAxG8z8rRDitGEY42NjYz8DYAlafROb0aVSKW+a5iAR7QPweMjD/crMR4UQI9VqdSHkse5J5EYXi8UuInqHmd8AICIe3iSi48x8pFarTUc5cGRGWwYfZubXohrTDiL6kojeO3'+
	'Xq1G+RjBf2ALt3777/xo0bHwB4E4AS9ngeMYjoU1VVD42Ojl4Lc6BQjdY0rSCE+IyZN4Y5TlCIaN40zQO6ro+FNkYYQcvlcrZer3/EzG+FET8siOjjzs7OdyuVyk3psWUH1DTtESIaBfCM7NgR8R0z79Z1/ZLMoFKN1jRtOxFNANgkM24MzBHRS9Vq9XdZAaVdXmma9hQRTWLtmwwAjzLzZLFY3CkroJQj2jL5NIB1MuK1EdeY+UVd178PGiiw0dZ0MQng4aCx2pQ/iejZoNNIIKOtE98ZAI8GibMGmGPmXUFOkL7n6HK5nLWuLpJuMnDr//hFuVzO+g3g2+h6vf4R1u4lnGeIaNfCwsKHvvv76aRpWoGIvvI76FqGmV/1cwfp2Whr7WIGwCNe+wYlm81i8+bNAIDz58/j5k3pN3COENG8qqo7vK6NeF7kaTab7yMG'+
	'k3fu3InBwUF0dHQAABqNBkZGRnD27NlIdTDzxkajcRDA2176Zbw0LhaLXQA+R8TryL29vdi3bx+y2Tvnomw2i56eHly/fh0XLlyIUg6I6Olt27adnJ2d/cNtH0+GEdFhRLzUmcvlMDAwsOr3AwMDyOVyESoCcMuDQ146uDa6WCx2xbFo39PTg0zmzh/e3Nwc5ubmbn/OZDLo7u6OWhYAvN7f3/+Y28aujSaid/zpCcb69etXfJ6YmMDExMSKf9uwYUOUkm5jmqZrT1wZXSqV8tYzvsg5d+7cis9DQ0MYGhqybRMhe0ulUt5NQ1dGm6Y56LatbKamplCv129/VhQFinLnNFGv1zE1NRWHNAAQzLzXVUMXbYiI9gcU5Jtms4lKpYKlpaW7vltaWkKlUkGzGWuuzH64uB9xbFAoFJ7MZDI/SpEUgHXr1qFUKqGrqwsAMD'+
	'09jWq1iuXl5ZiVAa1Wq3tsbOwnuzaOl2qKovQxx5rkAwBYXl7G8ePH45ZxT4QQrwCwNdpx6jBNs1eaooRCRI4e2U4dfX19qqIofyF4LlzSaRiG8ZBdYqXtEW1ldaYmO9OhKIrtXZPT1LFdopikY+uVrdFWfnKKC5jZ1iunIzo12iVOB6WT0W2dM9dm2OazOBn9oEQhSecBuy9To+Vh65XTnaHtbylK9uzZc9eS6eLiIk6cOBGToruw9ardEsNXZcuWLdi0aeU0ePHixZjUeMdp6rgaiYpkYOuVk9F/SxSSdGy9So2WR6Ajel6ikKRje8JwMnpWopBEY22PXhVbo506p9yBiPwbDWBGopakY+uVrdGtVusHADekykkmDcMwbJ+r2ho9Pj7eZOZJuZoSyaRT2QrHZ4ZCiNPy9CQTZnb0yNFowzDG5chJLqZpfu3UxtFo'+
	'q6jIr1IUJRBm/sXyyBY3mUrMzEclaEokRHQULqrbuMqnE0KMADCDikogJhEdc9PQldHVanWBiNozTShejrktHeQ6Q5SZj/jXk0yEEK49cW10rVabJqIv/UlKJCe9lAnylPPMzAcBGJ4lJQ9DCHHQSwdPRltH9afeNCUPZv7Ea9Erz1n8qqoeIqL/7To1Ec13dHQc9trP88PZ0dHRa5qmHYh6i/Lly5dhmiuvMK9cuRKlBACAaZoH/FQU811GolQqDa+14lRBYeZhXdc97Zj9F98bgDo7O98F8J3f/msNZj6Tz+ff89s/LYzijvgKowCAruuXmPllAH8GidPmLBLRS0HLswXeO6jr+gwzFwCEWnIyJq4BKMgoyyZlk6au698z84tI1pG9CKC3VqtJqVMRRoHBb7D25+z2LTAI3J5GdmENX40w8xlm3iXTZCCE/d26rl'+
	'/K5XLPM/Ow7Nhhw8zD+Xz+Bdl1SYG0rDGAaMoah1qxQNf1MVVVdxDRx2jPVT+DmYdVVd0RpslAxKXncas8zutRjenASSHEwcSUnv8v/f39j1mVW/YihpcpADgmhDgSlcH/EuvrQayiIvsRwetBAHxORK6f8cmmbV54I4R4xaoS8ByAjoAxGwAmmfm0aZpf/69feLMaVkWFbgDbmXmrtSN1E27terrXK5yuArjIzLNW6uyMYRg/ttsrnFJSUlJSUlJSUhLFPyqCjpRoN7kQAAAAAElFTkSuQmCC');
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_info_icon_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(0);
		el.translateY(0);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_icon';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.010);
		el.renderOrder = 1;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_info_icon.material) me._ht_info_icon.material.opacity = v;
			me._ht_info_icon.visible = (v>0 && me._ht_info_icon.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_info_icon.visible
			let parentEl = me._ht_info_icon.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_icon.userData.opacity = v;
			v = v * me._ht_info_icon.userData.parentOpacity;
			me._ht_info_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_icon.children.length; i++) {
				let child = me._ht_info_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_icon.userData.parentOpacity = v;
			v = v * me._ht_info_icon.userData.opacity
			me._ht_info_icon.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_icon.children.length; i++) {
				let child = me._ht_info_icon.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_icon = el;
		el.userData.ggId="ht_info_icon";
		me._ht_info_icon.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_info_icon'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_info_icon.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_info_icon.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_info_icon.ggCurrentLogicStateScaling == 0) {
					me._ht_info_icon.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._ht_info_icon.userData.transitions.length; i++) {
						if (me._ht_info_icon.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_info_icon.userData.transitions[i].interval);
							me._ht_info_icon.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_info_icon.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_icon.scale.set(transition_scale.startScale.x + (me._ht_info_icon.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_info_icon.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_info_icon.position.x = (me._ht_info_icon.position.x - me._ht_info_icon.userData.curScaleOffX) + scaleOffX;
						me._ht_info_icon.userData.curScaleOffX = scaleOffX;
						me._ht_info_icon.position.y = (me._ht_info_icon.position.y - me._ht_info_icon.userData.curScaleOffY) + scaleOffY;
						me._ht_info_icon.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_info_icon.userData.transitions.splice(me._ht_info_icon.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_info_icon.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_info_icon.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_info_icon.userData.transitions.length; i++) {
						if (me._ht_info_icon.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_info_icon.userData.transitions[i].interval);
							me._ht_info_icon.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_info_icon.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_icon.scale.set(transition_scale.startScale.x + (me._ht_info_icon.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_info_icon.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_info_icon.position.x = (me._ht_info_icon.position.x - me._ht_info_icon.userData.curScaleOffX) + scaleOffX;
						me._ht_info_icon.userData.curScaleOffX = scaleOffX;
						me._ht_info_icon.position.y = (me._ht_info_icon.position.y - me._ht_info_icon.userData.curScaleOffY) + scaleOffY;
						me._ht_info_icon.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_info_icon.userData.transitions.splice(me._ht_info_icon.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_info_icon.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_info_icon.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(((player.getVariableValue('vis_info_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_info_icon.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_info_icon.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_info_icon.ggCurrentLogicStateVisible == 0) {
			me._ht_info_icon.visible=false;
			me._ht_info_icon.userData.visible=false;
				}
				else {
			me._ht_info_icon.visible=((!me._ht_info_icon.material && Number(me._ht_info_icon.userData.opacity>0)) || Number(me._ht_info_icon.material.opacity)>0)?true:false;
			me._ht_info_icon.userData.visible=true;
				}
			}
		}
		me._ht_info_icon.userData.onclick=function (e) {
			player.setVariableValue('vis_info_hotspots', player.getVariableValue('vis_info_hotspots') + "<"+me.hotspot.id+">");
		}
		me._ht_info_icon.userData.onmouseover=function (e) {
			me.elementMouseOver['ht_info_icon']=true;
			me._ht_info_tooltip.logicBlock_visible();
			me._ht_info_icon.logicBlock_scaling();
		}
		me._ht_info_icon.userData.ontouchend=function (e) {
			me._ht_info_icon.logicBlock_scaling();
		}
		me._ht_info_icon.userData.onmouseout=function (e) {
			me.elementMouseOver['ht_info_icon']=false;
			me._ht_info_tooltip.logicBlock_visible();
			me._ht_info_icon.logicBlock_scaling();
		}
		me._ht_info_icon.ggCurrentLogicStateScaling = -1;
		me._ht_info_icon.ggCurrentLogicStateVisible = -1;
		me._ht_info_icon.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_info_icon']) {
				me.elementMouseOver['ht_info_icon']=true;
				me._ht_info_tooltip.logicBlock_visible();
			}
		}
		me._ht_info_icon.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneBufferGeometry(1, 0.22, 5, 5 );
		geometry.name = 'ht_info_tooltip_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_info_tooltip_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.784314;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_info_tooltip.material.opacity = v;
			if (me._ht_info_tooltip.userData.hasScrollbar) {
				me._ht_info_tooltip.userData.scrollbar.material.opacity = v;
				me._ht_info_tooltip.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_info_tooltip.userData.ggSubElement) {
				me._ht_info_tooltip.userData.ggSubElement.material.opacity = v
				me._ht_info_tooltip.userData.ggSubElement.visible = (v>0 && me._ht_info_tooltip.userData.visible);
			}
			me._ht_info_tooltip.visible = (v>0 && me._ht_info_tooltip.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_tooltip.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_tooltip.userData.backgroundColorAlpha = v;
			me._ht_info_tooltip.userData.setOpacity(me._ht_info_tooltip.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.365);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 100;
		el.userData.height = 22;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_tooltip';
		el.userData.x = 0;
		el.userData.y = -0.365;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info_tooltip.visible
			let parentEl = me._ht_info_tooltip.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_tooltip.userData.opacity = v;
			v = v * me._ht_info_tooltip.userData.parentOpacity;
			me._ht_info_tooltip.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_tooltip.children.length; i++) {
				let child = me._ht_info_tooltip.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_tooltip.userData.parentOpacity = v;
			v = v * me._ht_info_tooltip.userData.opacity
			me._ht_info_tooltip.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_tooltip.children.length; i++) {
				let child = me._ht_info_tooltip.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = false;
		el.userData.visible = false;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_tooltip = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(0, 0.666667, 1);
		el.userData.textColor = new THREE.Color(1, 1, 1);
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 100;
		canvas.height = 22;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_info_tooltip.userData.totalHeight = 13;
			me._ht_info_tooltip.userData.textLines = [];
			var ctx = me._ht_info_tooltip.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_info_tooltip.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_info_tooltip.userData.textLines.push(line);
					line = '';
					me._ht_info_tooltip.userData.totalHeight += me._ht_info_tooltip.userData.lineHeight;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (me._ht_info_tooltip.userData.width - 10 - (scrollbar ? 25 : 0)) && i > 0) {
					me._ht_info_tooltip.userData.textLines.push(line);
					line = words[i];
					me._ht_info_tooltip.userData.totalHeight += me._ht_info_tooltip.userData.lineHeight;
				} else {
					line = testLine;
				}
			}
			me._ht_info_tooltip.userData.textLines.push(line);
			me._ht_info_tooltip.userData.totalHeight += me._ht_info_tooltip.userData.lineHeight;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_info_tooltip.userData.textCanvas;
			var ctx = me._ht_info_tooltip.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_info_tooltip.userData.backgroundColor.r * 255 + ', ' + me._ht_info_tooltip.userData.backgroundColor.g * 255 + ', ' + me._ht_info_tooltip.userData.backgroundColor.b * 255 + ', ' + me._ht_info_tooltip.userData.backgroundColorAlpha + ')';
			ctx.fillRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_info_tooltip.userData.textColor.r * 255 + ', ' + me._ht_info_tooltip.userData.textColor.g * 255 + ', ' + me._ht_info_tooltip.userData.textColor.b * 255 + ', ' + me._ht_info_tooltip.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_info_tooltip.userData.boxWidth - (me._ht_info_tooltip.userData.hasScrollbar ? 25 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 8;
			for (var i = 0; i < me._ht_info_tooltip.userData.textLines.length; i++) {
				ctx.fillText(me._ht_info_tooltip.userData.textLines[i], x, y);
				y += me._ht_info_tooltip.userData.lineHeight;
			}
			geometry = new THREE.PlaneBufferGeometry(me._ht_info_tooltip.userData.boxWidth / 100.0, me._ht_info_tooltip.userData.boxHeight / 100.0, 5, 5 );
			geometry.name = 'ht_info_tooltip_geometry';
			me._ht_info_tooltip.geometry.dispose();
			me._ht_info_tooltip.geometry = geometry;
			var diffY = me._ht_info_tooltip.userData.boxHeight - me._ht_info_tooltip.userData.height;
			me._ht_info_tooltip.position.y = me._ht_info_tooltip.userData.y - ((diffY / 2.0) / 100.0);
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_info_tooltip_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.encoding = THREE.sRGBEncoding;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_info_tooltip.material.map) {
				me._ht_info_tooltip.material.map.dispose();
			}
			me._ht_info_tooltip.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			me._ht_info_tooltip.remove(...me._ht_info_tooltip.children);
			var canv = me._ht_info_tooltip.userData.textCanvas;
			var ctx = me._ht_info_tooltip.userData.textCanvasContext;
			ctx.font = '18px Verdana';
			me._ht_info_tooltip.userData.lineHeight = 18 * 1.2;
			me._ht_info_tooltip.userData.textLines = [];
			me._ht_info_tooltip.userData.textLines.push(me._ht_info_tooltip.userData.ggText);
			me._ht_info_tooltip.userData.totalHeight = 13;
			me._ht_info_tooltip.userData.totalHeight += me._ht_info_tooltip.userData.lineHeight;
			me._ht_info_tooltip.userData.boxWidth = ctx.measureText(me._ht_info_tooltip.userData.ggText).width + 10;
			me._ht_info_tooltip.userData.boxHeight = me._ht_info_tooltip.userData.totalHeight;
			canv.width = me._ht_info_tooltip.userData.boxWidth;
			canv.height = me._ht_info_tooltip.userData.boxHeight;
			ctx.font = '18px Verdana';
			me._ht_info_tooltip.userData.ggPaintCanvasText();
		}
		me._ht_info_tooltip.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_info_tooltip.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_info_tooltip.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_tooltip.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_tooltip.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_info_tooltip.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_info_tooltip.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_info_tooltip";
		me._ht_info_tooltip.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				((me.elementMouseOver['ht_info_icon'] == true)) && 
				((player._(me.hotspot.title) != ""))
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_info_tooltip.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_info_tooltip.ggCurrentLogicStateVisible = newLogicStateVisible;
				if (me._ht_info_tooltip.ggCurrentLogicStateVisible == 0) {
			me._ht_info_tooltip.visible=((!me._ht_info_tooltip.material && Number(me._ht_info_tooltip.userData.opacity>0)) || Number(me._ht_info_tooltip.material.opacity)>0)?true:false;
			me._ht_info_tooltip.userData.visible=true;
				}
				else {
			me._ht_info_tooltip.visible=false;
			me._ht_info_tooltip.userData.visible=false;
				}
			}
		}
		me._ht_info_tooltip.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_info_icon.add(me._ht_info_tooltip);
		me._ht_info.add(me._ht_info_icon);
		geometry = new THREE.PlaneBufferGeometry(3.6, 3.6, 5, 5 );
		geometry.name = 'ht_info_bg_geometry';
		material = new THREE.MeshBasicMaterial( { color: new THREE.Color('rgba(0,170,255,0.784314)').convertSRGBToLinear(), side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_info_bg_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 0.784314;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_info_bg.material.opacity = v * me._ht_info_bg.userData.backgroundColorAlpha;
			if (me._ht_info_bg.userData.ggSubElement) {
				me._ht_info_bg.userData.ggSubElement.material.opacity = v
				me._ht_info_bg.userData.ggSubElement.visible = (v>0 && me._ht_info_bg.userData.visible);
			}
			me._ht_info_bg.visible = (v>0 && me._ht_info_bg.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_bg.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_bg.userData.backgroundColorAlpha = v;
			me._ht_info_bg.userData.setOpacity(me._ht_info_bg.userData.opacity);
		}
		el.translateX(0);
		el.translateY(1.782);
		el.scale.set(1.00, 0.01, 1.0);
		el.userData.width = 360;
		el.userData.height = 360;
		el.userData.scale = {x: 1.00, y: 0.01, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 1.782;
		el.name = 'ht_info_bg';
		el.userData.x = 0;
		el.userData.y = 0;
		el.userData.hanchor = 1;
		el.userData.vanchor = 1;
		el.translateZ(0.020);
		el.renderOrder = 2;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info_bg.visible
			let parentEl = me._ht_info_bg.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_bg.userData.opacity = v;
			v = v * me._ht_info_bg.userData.parentOpacity;
			me._ht_info_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_bg.children.length; i++) {
				let child = me._ht_info_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_bg.userData.parentOpacity = v;
			v = v * me._ht_info_bg.userData.opacity
			me._ht_info_bg.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_bg.children.length; i++) {
				let child = me._ht_info_bg.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_bg = el;
		el.userData.ggId="ht_info_bg";
		me._ht_info_bg.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				(((player.getVariableValue('vis_info_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_info_bg.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_info_bg.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_info_bg.ggCurrentLogicStateScaling == 0) {
					me._ht_info_bg.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_info_bg.userData.transitions.length; i++) {
						if (me._ht_info_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_info_bg.userData.transitions[i].interval);
							me._ht_info_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_info_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_bg.scale.set(transition_scale.startScale.x + (me._ht_info_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_info_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_info_bg.position.x = (me._ht_info_bg.position.x - me._ht_info_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_info_bg.userData.curScaleOffX = scaleOffX;
						me._ht_info_bg.position.y = (me._ht_info_bg.position.y - me._ht_info_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_info_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_info_bg.userData.transitions.splice(me._ht_info_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_info_bg.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_info_bg.userData.transitionValue_scale = {x: 1, y: 0.01, z: 1.0};
					for (var i = 0; i < me._ht_info_bg.userData.transitions.length; i++) {
						if (me._ht_info_bg.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_info_bg.userData.transitions[i].interval);
							me._ht_info_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_info_bg.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_bg.scale.set(transition_scale.startScale.x + (me._ht_info_bg.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_info_bg.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_info_bg.position.x = (me._ht_info_bg.position.x - me._ht_info_bg.userData.curScaleOffX) + scaleOffX;
						me._ht_info_bg.userData.curScaleOffX = scaleOffX;
						me._ht_info_bg.position.y = (me._ht_info_bg.position.y - me._ht_info_bg.userData.curScaleOffY) + scaleOffY;
						me._ht_info_bg.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_info_bg.userData.transitions.splice(me._ht_info_bg.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_info_bg.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_info_bg.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('vis_info_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_info_bg.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_info_bg.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_info_bg.ggCurrentLogicStateAlpha == 0) {
					me._ht_info_bg.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_info_bg.userData.transitions.length; i++) {
						if (me._ht_info_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_bg.userData.transitions[i].interval);
							me._ht_info_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_bg.material ? me._ht_info_bg.material.opacity : me._ht_info_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_bg.userData.transitions.splice(me._ht_info_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_bg.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_info_bg.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_info_bg.userData.transitions.length; i++) {
						if (me._ht_info_bg.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_bg.userData.transitions[i].interval);
							me._ht_info_bg.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_bg.material ? me._ht_info_bg.material.opacity : me._ht_info_bg.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_bg.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_bg.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_bg.userData.transitions.splice(me._ht_info_bg.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_bg.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_info_bg.userData.ggUpdatePosition=function (useTransition) {
		}
		geometry = new THREE.PlaneBufferGeometry(3.4, 3.1, 5, 5 );
		geometry.name = 'ht_info_text_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_info_text_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_info_text.material.opacity = v;
			if (me._ht_info_text.userData.hasScrollbar) {
				me._ht_info_text.userData.scrollbar.material.opacity = v;
				me._ht_info_text.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_info_text.userData.ggSubElement) {
				me._ht_info_text.userData.ggSubElement.material.opacity = v
				me._ht_info_text.userData.ggSubElement.visible = (v>0 && me._ht_info_text.userData.visible);
			}
			me._ht_info_text.visible = (v>0 && me._ht_info_text.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_text.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_text.userData.backgroundColorAlpha = v;
			me._ht_info_text.userData.setOpacity(me._ht_info_text.userData.opacity);
		}
		el.translateX(0);
		el.translateY(-0.15);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 340;
		el.userData.height = 310;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_text';
		el.userData.x = 0;
		el.userData.y = -0.15;
		el.userData.hanchor = 1;
		el.userData.vanchor = 2;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info_text.visible
			let parentEl = me._ht_info_text.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_text.userData.opacity = v;
			v = v * me._ht_info_text.userData.parentOpacity;
			me._ht_info_text.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_text.children.length; i++) {
				let child = me._ht_info_text.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_text.userData.parentOpacity = v;
			v = v * me._ht_info_text.userData.opacity
			me._ht_info_text.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_text.children.length; i++) {
				let child = me._ht_info_text.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_text = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(1, 1, 1);
		el.userData.textColor = new THREE.Color(1, 1, 1);
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 340;
		canvas.height = 310;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_info_text.userData.totalHeight = 3;
			me._ht_info_text.userData.textLines = [];
			var ctx = me._ht_info_text.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_info_text.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_info_text.userData.textLines.push(line);
					line = '';
					me._ht_info_text.userData.totalHeight += me._ht_info_text.userData.lineHeight;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (me._ht_info_text.userData.width - 0 - (scrollbar ? 25 : 0)) && i > 0) {
					me._ht_info_text.userData.textLines.push(line);
					line = words[i];
					me._ht_info_text.userData.totalHeight += me._ht_info_text.userData.lineHeight;
				} else {
					line = testLine;
				}
			}
			me._ht_info_text.userData.textLines.push(line);
			me._ht_info_text.userData.totalHeight += me._ht_info_text.userData.lineHeight;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_info_text.userData.textCanvas;
			var ctx = me._ht_info_text.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_info_text.userData.textColor.r * 255 + ', ' + me._ht_info_text.userData.textColor.g * 255 + ', ' + me._ht_info_text.userData.textColor.b * 255 + ', ' + me._ht_info_text.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = 0;
			ctx.textAlign = 'left';
			var y = 3;
			y -= me._ht_info_text.userData.scrollPosPercent * me._ht_info_text.userData.totalHeight;
			for (var i = 0; i < me._ht_info_text.userData.textLines.length; i++) {
				ctx.fillText(me._ht_info_text.userData.textLines[i], x, y);
				y += me._ht_info_text.userData.lineHeight;
			}
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_info_text_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.encoding = THREE.sRGBEncoding;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_info_text.material.map) {
				me._ht_info_text.material.map.dispose();
			}
			me._ht_info_text.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			me._ht_info_text.remove(...me._ht_info_text.children);
			var canv = me._ht_info_text.userData.textCanvas;
			var ctx = me._ht_info_text.userData.textCanvasContext;
			ctx.font = '18px Verdana';
			me._ht_info_text.userData.lineHeight = 18 * 1.2;
			me._ht_info_text.userData.ggWrapText(false);
			me._ht_info_text.userData.boxWidth = me._ht_info_text.userData.width;
			me._ht_info_text.userData.boxHeight = me._ht_info_text.userData.height;
			me._ht_info_text.userData.scrollPosPercent = 0.0
			if (me._ht_info_text.userData.totalHeight > me._ht_info_text.userData.height) {
				me._ht_info_text.userData.ggWrapText(true);
				me._ht_info_text.userData.pagePercent = me._ht_info_text.userData.height / me._ht_info_text.userData.totalHeight;
				me._ht_info_text.userData.maxScrollPercent = (me._ht_info_text.userData.totalHeight - me._ht_info_text.userData.height) / me._ht_info_text.userData.totalHeight;
				geometry = new THREE.PlaneBufferGeometry(25 / 100.0, me._ht_info_text.userData.height / 100.0, 5, 5 );
				geometry.name = 'ht_info_text_scrollbarBgGeometry';
				material = new THREE.MeshBasicMaterial( {color: 0x7f7f7f, side: THREE.DoubleSide, transparent: true } );
				material.name = 'ht_info_text_scrollbarBgMaterial';
				me._ht_info_text.userData.scrollbarBg = new THREE.Mesh( geometry, material );
				me._ht_info_text.userData.scrollbarBg.name = 'ht_info_text_scrollbarBg';
				me._ht_info_text.add(me._ht_info_text.userData.scrollbarBg);
				me._ht_info_text.userData.scrollbarXPos = (me._ht_info_text.userData.width - 25) / 200.0;
				me._ht_info_text.userData.scrollbarBg.position.x = me._ht_info_text.userData.scrollbarXPos;
				me._ht_info_text.userData.scrollbarBg.position.z = me._ht_info_text.position.z + 0.01;
				me._ht_info_text.userData.scrollbarBg.userData.stopPropagation = true;
				me._ht_info_text.userData.scrollbarHeight = (me._ht_info_text.userData.height / me._ht_info_text.userData.totalHeight) * me._ht_info_text.userData.height;
				geometry = new THREE.PlaneBufferGeometry(25 / 100.0, me._ht_info_text.userData.scrollbarHeight / 100.0, 5, 5 );
				geometry.name = 'ht_info_text_scrollbarGeometry';
				material = new THREE.MeshBasicMaterial( {color: 0xbfbfbf, side: THREE.DoubleSide, transparent: true } );
				material.name = 'ht_info_text_scrollbarMaterial';
				me._ht_info_text.userData.scrollbar = new THREE.Mesh( geometry, material );
				me._ht_info_text.userData.scrollbar.name = 'ht_info_text_scrollbar';
				me._ht_info_text.add(me._ht_info_text.userData.scrollbar);
				me._ht_info_text.userData.scrollbar.position.x = me._ht_info_text.userData.scrollbarXPos;
				me._ht_info_text.userData.scrollbar.position.z = me._ht_info_text.position.z + 0.02;
				me._ht_info_text.userData.scrollbarYPosMin = (me._ht_info_text.userData.height - me._ht_info_text.userData.scrollbarHeight) / 200.0;
				me._ht_info_text.userData.scrollbarYPosMax = me._ht_info_text.userData.scrollbarYPosMin - (me._ht_info_text.userData.height - me._ht_info_text.userData.scrollbarHeight) / 100.0;
				me._ht_info_text.userData.scrollbar.position.y = me._ht_info_text.userData.scrollbarYPosMin;
				geometry = new THREE.PlaneBufferGeometry(25 / 100.0, me._ht_info_text.userData.height / 200.0, 5, 5 );
				geometry.name = 'ht_info_text_scrollbarPageDownGeometry';
				material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true } );
				material.name = 'ht_info_text_scrollbarPageDownMaterial';
				me._ht_info_text.userData.scrollbarPageDown = new THREE.Mesh( geometry, material );
				me._ht_info_text.userData.scrollbarPageDown.name = 'ht_info_text_scrollbarPageDown';
				me._ht_info_text.userData.scrollbarPageDown.userData.onclick = function() {
					me._ht_info_text.userData.scrollPosPercent -= me._ht_info_text.userData.pagePercent;
					me._ht_info_text.userData.scrollPosPercent = Math.max(me._ht_info_text.userData.scrollPosPercent, 0);
					me._ht_info_text.userData.ggPaintCanvasText();
					me._ht_info_text.userData.scrollbar.position.y += (me._ht_info_text.userData.height * me._ht_info_text.userData.pagePercent) / 100.0;
					me._ht_info_text.userData.scrollbar.position.y = Math.min(me._ht_info_text.userData.scrollbar.position.y, me._ht_info_text.userData.scrollbarYPosMin);
				}
				me._ht_info_text.userData.scrollbarPageDown.position.x = me._ht_info_text.userData.scrollbarXPos;
				me._ht_info_text.userData.scrollbarPageDown.position.y = me._ht_info_text.userData.height / 400.0;
				me._ht_info_text.userData.scrollbarPageDown.position.z = me._ht_info_text.position.z + 0.05;
				me._ht_info_text.userData.scrollbarPageDown.userData.stopPropagation = true;
				me._ht_info_text.userData.scrollbarPageDown.userData.clickInvisible = true;
				me._ht_info_text.userData.scrollbarPageDown.visible = false;
				me._ht_info_text.add(me._ht_info_text.userData.scrollbarPageDown);
				geometry = new THREE.PlaneBufferGeometry(25 / 100.0, me._ht_info_text.userData.height / 200.0, 5, 5 );
				geometry.name = 'ht_info_text_scrollbarPageUpGeometry';
				material = new THREE.MeshBasicMaterial( {color: 0x000000, side: THREE.DoubleSide, transparent: true } );
				material.name = 'ht_info_text_scrollbarPageUpMaterial';
				me._ht_info_text.userData.scrollbarPageUp = new THREE.Mesh( geometry, material );
				me._ht_info_text.userData.scrollbarPageUp.name = 'ht_info_text_scrollbarPageUp';
				me._ht_info_text.userData.scrollbarPageUp.userData.onclick = function() {
					me._ht_info_text.userData.scrollPosPercent += me._ht_info_text.userData.pagePercent;
					me._ht_info_text.userData.scrollPosPercent = Math.min(me._ht_info_text.userData.scrollPosPercent, me._ht_info_text.userData.maxScrollPercent);
					me._ht_info_text.userData.ggPaintCanvasText();
					me._ht_info_text.userData.scrollbar.position.y -= (me._ht_info_text.userData.height * me._ht_info_text.userData.pagePercent) / 100.0;
					me._ht_info_text.userData.scrollbar.position.y = Math.max(me._ht_info_text.userData.scrollbar.position.y, me._ht_info_text.userData.scrollbarYPosMax);
				}
				me._ht_info_text.userData.scrollbarPageUp.position.x = me._ht_info_text.userData.scrollbarXPos;
				me._ht_info_text.userData.scrollbarPageUp.position.y = -me._ht_info_text.userData.height / 400.0;
				me._ht_info_text.userData.scrollbarPageUp.position.z = me._ht_info_text.position.z + 0.05;
				me._ht_info_text.userData.scrollbarPageUp.userData.stopPropagation = true;
				me._ht_info_text.userData.scrollbarPageUp.userData.clickInvisible = true;
				me._ht_info_text.userData.scrollbarPageUp.visible = false;
				me._ht_info_text.add(me._ht_info_text.userData.scrollbarPageUp);
				me._ht_info_text.userData.hasScrollbar = true;
			} else {
				me._ht_info_text.userData.hasScrollbar = false;
			}
			canv.width = me._ht_info_text.userData.boxWidth;
			canv.height = me._ht_info_text.userData.boxHeight;
			ctx.font = '18px Verdana';
			me._ht_info_text.userData.ggPaintCanvasText();
		}
		me._ht_info_text.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.description))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_info_text.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_info_text.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_text.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_text.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_info_text.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_info_text.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_info_text";
		me._ht_info_text.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_info_bg.add(me._ht_info_text);
		geometry = new THREE.PlaneBufferGeometry(3.4, 0.25, 5, 5 );
		geometry.name = 'ht_info_title_geometry';
		material = new THREE.MeshBasicMaterial( {side : THREE.DoubleSide, transparent : true } ); 
		material.name = 'ht_info_title_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.backgroundColorAlpha = 1;
		el.userData.borderColorAlpha = 1;
		el.userData.setOpacityInternal = function(v) {
			me._ht_info_title.material.opacity = v;
			if (me._ht_info_title.userData.hasScrollbar) {
				me._ht_info_title.userData.scrollbar.material.opacity = v;
				me._ht_info_title.userData.scrollbarBg.material.opacity = v;
			}
			if (me._ht_info_title.userData.ggSubElement) {
				me._ht_info_title.userData.ggSubElement.material.opacity = v
				me._ht_info_title.userData.ggSubElement.visible = (v>0 && me._ht_info_title.userData.visible);
			}
			me._ht_info_title.visible = (v>0 && me._ht_info_title.userData.visible);
		}
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_title.material.color = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_title.userData.backgroundColorAlpha = v;
			me._ht_info_title.userData.setOpacity(me._ht_info_title.userData.opacity);
		}
		el.translateX(0);
		el.translateY(1.565);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 340;
		el.userData.height = 25;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_title';
		el.userData.x = 0;
		el.userData.y = 1.565;
		el.userData.hanchor = 1;
		el.userData.vanchor = 0;
		el.translateZ(0.040);
		el.renderOrder = 4;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.isVisible = function() {
			let vis = me._ht_info_title.visible
			let parentEl = me._ht_info_title.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_title.userData.opacity = v;
			v = v * me._ht_info_title.userData.parentOpacity;
			me._ht_info_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_title.children.length; i++) {
				let child = me._ht_info_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_title.userData.parentOpacity = v;
			v = v * me._ht_info_title.userData.opacity
			me._ht_info_title.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_title.children.length; i++) {
				let child = me._ht_info_title.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 1.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_title = el;
		el.userData.textLines = [];
		el.userData.backgroundColor = new THREE.Color(1, 1, 1);
		el.userData.textColor = new THREE.Color(1, 1, 1);
		el.userData.textColorAlpha = 1;
		var canvas = document.createElement('canvas');
		canvas.width = 340;
		canvas.height = 25;
		el.userData.textCanvas = canvas;
		el.userData.textCanvasContext = canvas.getContext('2d');
		el.userData.ggStripTags = function(text) {
			let doc = new DOMParser().parseFromString(text, 'text/html');
			return doc.body.textContent || '';
		}
		el.userData.ggWrapText = function(scrollbar) {
			me._ht_info_title.userData.totalHeight = 3;
			me._ht_info_title.userData.textLines = [];
			var ctx = me._ht_info_title.userData.textCanvasContext;
			var words = [];
			let tmpText = String(me._ht_info_title.userData.ggText);
			let whiteSpaceIndex = -1;
			do {
				whiteSpaceIndex = tmpText.search(/[\s]/);
				if (whiteSpaceIndex != -1) {
					words.push(tmpText.substr(0, whiteSpaceIndex));
					tmpText = tmpText.substr(whiteSpaceIndex);
					if (tmpText.charAt(0) == '\n') {
						words.push('\n');
					}
					tmpText = tmpText.substr(1);
				} else {
					words.push(tmpText);
				}
			} while (whiteSpaceIndex != -1);
			var line = '';
			for (var i = 0; i < words.length; i++) {
				if (words[i] == '\n') {
					me._ht_info_title.userData.textLines.push(line);
					line = '';
					me._ht_info_title.userData.totalHeight += me._ht_info_title.userData.lineHeight;
					continue;
				}
				var testLine;
				if (line == '') {
					testLine = words[i]
				} else {
					testLine = line + ' ' + words[i];
				}
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > (me._ht_info_title.userData.width - 0 - (scrollbar ? 25 : 0)) && i > 0) {
					me._ht_info_title.userData.textLines.push(line);
					line = words[i];
					me._ht_info_title.userData.totalHeight += me._ht_info_title.userData.lineHeight;
				} else {
					line = testLine;
				}
			}
			me._ht_info_title.userData.textLines.push(line);
			me._ht_info_title.userData.totalHeight += me._ht_info_title.userData.lineHeight;
		}
		el.userData.ggPaintCanvasText = function() {
			var canv = me._ht_info_title.userData.textCanvas;
			var ctx = me._ht_info_title.userData.textCanvasContext;
			ctx.clearRect(0, 0, canv.width, canv.height);
			ctx.fillStyle = 'rgba(' + me._ht_info_title.userData.textColor.r * 255 + ', ' + me._ht_info_title.userData.textColor.g * 255 + ', ' + me._ht_info_title.userData.textColor.b * 255 + ', ' + me._ht_info_title.userData.textColorAlpha + ')';
			ctx.textBaseline = 'top';
			var x = (me._ht_info_title.userData.boxWidth - (me._ht_info_title.userData.hasScrollbar ? 25 : 0)) / 2;
			ctx.textAlign = 'center';
			var y = 3;
			for (var i = 0; i < me._ht_info_title.userData.textLines.length; i++) {
				var curTextLine = me._ht_info_title.userData.textLines[i];
				var curTextLineBase = me._ht_info_title.userData.textLines[i];
				if ((ctx.measureText(curTextLine).width + x + 0) > canv.width) {
					var cutChars = 0;
					do {
						cutChars++;
						curTextLine = curTextLineBase.substring(0, curTextLineBase.length - cutChars) + '...';
					} while (cutChars < curTextLineBase.length && (ctx.measureText(curTextLine).width + x + 0) > canv.width);
				}
				ctx.fillText(curTextLine, x, y);
				y += me._ht_info_title.userData.lineHeight;
			}
			var textTexture = new THREE.CanvasTexture(canv);
			textTexture.name = 'ht_info_title_texture';
			textTexture.minFilter = THREE.LinearFilter;
			textTexture.encoding = THREE.sRGBEncoding;
			textTexture.wrapS = THREE.ClampToEdgeWrapping;
			textTexture.wrapT = THREE.ClampToEdgeWrapping;
			if (me._ht_info_title.material.map) {
				me._ht_info_title.material.map.dispose();
			}
			me._ht_info_title.material.map = textTexture;
		}
		el.userData.ggRenderText = function() {
			me._ht_info_title.remove(...me._ht_info_title.children);
			var canv = me._ht_info_title.userData.textCanvas;
			var ctx = me._ht_info_title.userData.textCanvasContext;
			ctx.font = '22px Verdana';
			me._ht_info_title.userData.lineHeight = 22 * 1.2;
			me._ht_info_title.userData.textLines = [];
			me._ht_info_title.userData.textLines.push(me._ht_info_title.userData.ggText);
			me._ht_info_title.userData.totalHeight = 3;
			me._ht_info_title.userData.totalHeight += me._ht_info_title.userData.lineHeight;
			me._ht_info_title.userData.boxWidth = me._ht_info_title.userData.width;
			me._ht_info_title.userData.boxHeight = me._ht_info_title.userData.height;
			me._ht_info_title.userData.hasScrollbar = false;
			canv.width = me._ht_info_title.userData.boxWidth;
			canv.height = me._ht_info_title.userData.boxHeight;
			ctx.font = '22px Verdana';
			me._ht_info_title.userData.ggPaintCanvasText();
		}
		me._ht_info_title.userData.ggUpdateText=function(force) {
			var params = [];
			params.push(player._(String(player._(me.hotspot.title))));
			var hs = player._("%1", params);
			if (hs!=this.ggText || force) {
				this.ggText=me._ht_info_title.userData.ggStripTags(hs);
				this.ggRenderText();
			}
		}
		me._ht_info_title.userData.ggUpdateText();
		el.userData.setBackgroundColor = function(v) {
			me._ht_info_title.userData.backgroundColor = v;
		}
		el.userData.setBackgroundColorAlpha = function(v) {
			me._ht_info_title.userData.backgroundColorAlpha = v;
		}
		el.userData.setTextColor = function(v) {
			me._ht_info_title.userData.textColor = v;
		}
		el.userData.setTextColorAlpha = function(v) {
			me._ht_info_title.userData.textColorAlpha = v;
		}
		el.userData.ggId="ht_info_title";
		me._ht_info_title.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_info_bg.add(me._ht_info_title);
		me._ht_info.add(me._ht_info_bg);
		geometry = new THREE.PlaneBufferGeometry(0.45, 0.45, 5, 5 );
		geometry.name = 'ht_info_close_geometry';
		loader = new THREE.TextureLoader();
		texture = loader.load('data:image/png;base64,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');
		material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide, transparent: true} );
		material.name = 'ht_info_close_material';
		el = new THREE.Mesh( geometry, material );
		el.userData.materialNormal = material;
		el.translateX(2.1);
		el.translateY(1.575);
		el.scale.set(1.00, 1.00, 1.0);
		el.userData.width = 45;
		el.userData.height = 45;
		el.userData.scale = {x: 1.00, y: 1.00, z: 1.0};
		el.userData.curScaleOffX = 0;
		el.userData.curScaleOffY = 0;
		el.name = 'ht_info_close';
		el.userData.x = 2.1;
		el.userData.y = 1.575;
		el.userData.hanchor = 1;
		el.userData.vanchor = 0;
		el.translateZ(0.030);
		el.renderOrder = 3;
		el.rotateZ(0.00);
		el.userData.angle = 0.00;
		el.userData.setOpacityInternal = function(v) {
			if (me._ht_info_close.material) me._ht_info_close.material.opacity = v;
			me._ht_info_close.visible = (v>0 && me._ht_info_close.userData.visible);
		}
		el.userData.isVisible = function() {
			let vis = me._ht_info_close.visible
			let parentEl = me._ht_info_close.parent;
			while (vis && parentEl) {
				if (!parentEl.visible) {
					vis = false;
					break;
				}
				parentEl = parentEl.parent;
			}
			return vis;
		}
		el.userData.setOpacity = function(v) {
			me._ht_info_close.userData.opacity = v;
			v = v * me._ht_info_close.userData.parentOpacity;
			me._ht_info_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_close.children.length; i++) {
				let child = me._ht_info_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.userData.setParentOpacity = function(v) {
			me._ht_info_close.userData.parentOpacity = v;
			v = v * me._ht_info_close.userData.opacity
			me._ht_info_close.userData.setOpacityInternal(v);
			for (let i = 0; i < me._ht_info_close.children.length; i++) {
				let child = me._ht_info_close.children[i];
				if (child.userData.setParentOpacity) {
					child.userData.setParentOpacity(v);
				}
			};
		}
		el.visible = true;
		el.userData.visible = true;
		el.userData.opacity = 0.00;
		el.userData.parentOpacity = 1.0;
		el.userData.transitions = [];
		me._ht_info_close = el;
		el.userData.ggId="ht_info_close";
		me._ht_info_close.logicBlock_scaling = function() {
			var newLogicStateScaling;
			if (
				((me.elementMouseOver['ht_info_close'] == true))
			)
			{
				newLogicStateScaling = 0;
			}
			else {
				newLogicStateScaling = -1;
			}
			if (me._ht_info_close.ggCurrentLogicStateScaling != newLogicStateScaling) {
				me._ht_info_close.ggCurrentLogicStateScaling = newLogicStateScaling;
				if (me._ht_info_close.ggCurrentLogicStateScaling == 0) {
					me._ht_info_close.userData.transitionValue_scale = {x: 1.15, y: 1.15, z: 1.0};
					for (var i = 0; i < me._ht_info_close.userData.transitions.length; i++) {
						if (me._ht_info_close.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_info_close.userData.transitions[i].interval);
							me._ht_info_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_info_close.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_close.scale.set(transition_scale.startScale.x + (me._ht_info_close.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_info_close.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_info_close.position.x = (me._ht_info_close.position.x - me._ht_info_close.userData.curScaleOffX) + scaleOffX;
						me._ht_info_close.userData.curScaleOffX = scaleOffX;
						me._ht_info_close.position.y = (me._ht_info_close.position.y - me._ht_info_close.userData.curScaleOffY) + scaleOffY;
						me._ht_info_close.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_info_close.userData.transitions.splice(me._ht_info_close.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_info_close.userData.transitions.push(transition_scale);
				}
				else {
					me._ht_info_close.userData.transitionValue_scale = {x: 1, y: 1, z: 1.0};
					for (var i = 0; i < me._ht_info_close.userData.transitions.length; i++) {
						if (me._ht_info_close.userData.transitions[i].property == 'scale') {
							clearInterval(me._ht_info_close.userData.transitions[i].interval);
							me._ht_info_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_scale = {};
					transition_scale.property = 'scale';
					transition_scale.startTime = Date.now();
					transition_scale.startScale = me._ht_info_close.scale;
					transition_scale.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_scale.startTime) / 200;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_close.scale.set(transition_scale.startScale.x + (me._ht_info_close.userData.transitionValue_scale.x - transition_scale.startScale.x) * tfval, transition_scale.startScale.y + (me._ht_info_close.userData.transitionValue_scale.y - transition_scale.startScale.y) * tfval, 1.0);
					var scaleOffX = 0;
					var scaleOffY = 0;
						me._ht_info_close.position.x = (me._ht_info_close.position.x - me._ht_info_close.userData.curScaleOffX) + scaleOffX;
						me._ht_info_close.userData.curScaleOffX = scaleOffX;
						me._ht_info_close.position.y = (me._ht_info_close.position.y - me._ht_info_close.userData.curScaleOffY) + scaleOffY;
						me._ht_info_close.userData.curScaleOffY = scaleOffY;
						if (percentDone >= 1.0) {
							clearInterval(transition_scale.interval);
							me._ht_info_close.userData.transitions.splice(me._ht_info_close.userData.transitions.indexOf(transition_scale), 1);
						}
					}, 20);
					me._ht_info_close.userData.transitions.push(transition_scale);
				}
			}
		}
		me._ht_info_close.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(((player.getVariableValue('vis_info_hotspots')).indexOf("<"+me.hotspot.id+">") != -1))
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._ht_info_close.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._ht_info_close.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				if (me._ht_info_close.ggCurrentLogicStateAlpha == 0) {
					me._ht_info_close.userData.transitionValue_alpha = 1;
					for (var i = 0; i < me._ht_info_close.userData.transitions.length; i++) {
						if (me._ht_info_close.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_close.userData.transitions[i].interval);
							me._ht_info_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_close.material ? me._ht_info_close.material.opacity : me._ht_info_close.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_close.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_close.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_close.userData.transitions.splice(me._ht_info_close.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_close.userData.transitions.push(transition_alpha);
				}
				else {
					me._ht_info_close.userData.transitionValue_alpha = 0;
					for (var i = 0; i < me._ht_info_close.userData.transitions.length; i++) {
						if (me._ht_info_close.userData.transitions[i].property == 'alpha') {
							clearInterval(me._ht_info_close.userData.transitions[i].interval);
							me._ht_info_close.userData.transitions.splice(i, 1);
							break;
						}
					}
					let transition_alpha = {};
					transition_alpha.property = 'alpha';
					transition_alpha.startTime = Date.now();
					transition_alpha.startAlpha = me._ht_info_close.material ? me._ht_info_close.material.opacity : me._ht_info_close.userData.opacity;
					transition_alpha.interval = setInterval(() => {
						let currentTime = Date.now() - 0;
						let percentDone = 1.0 * (currentTime - transition_alpha.startTime) / 500;
						percentDone = Math.max(percentDone, 0.0);
						percentDone = Math.min(percentDone, 1.0);
						let tfval = -(Math.cos(Math.PI * percentDone) - 1) / 2;
						me._ht_info_close.userData.setOpacity(transition_alpha.startAlpha + (me._ht_info_close.userData.transitionValue_alpha - transition_alpha.startAlpha) * tfval);
						if (percentDone >= 1.0) {
							clearInterval(transition_alpha.interval);
							me._ht_info_close.userData.transitions.splice(me._ht_info_close.userData.transitions.indexOf(transition_alpha), 1);
						}
					}, 20);
					me._ht_info_close.userData.transitions.push(transition_alpha);
				}
			}
		}
		me._ht_info_close.userData.onclick=function (e) {
			player.setVariableValue('vis_info_hotspots', player.getVariableValue('vis_info_hotspots').replace("<"+me.hotspot.id+">", ''));
		}
		me._ht_info_close.userData.onmouseover=function (e) {
			me.elementMouseOver['ht_info_close']=true;
			me._ht_info_close.logicBlock_scaling();
		}
		me._ht_info_close.userData.ontouchend=function (e) {
			me._ht_info_close.logicBlock_scaling();
		}
		me._ht_info_close.userData.onmouseout=function (e) {
			me.elementMouseOver['ht_info_close']=false;
			me._ht_info_close.logicBlock_scaling();
		}
		me._ht_info_close.ggCurrentLogicStateScaling = -1;
		me._ht_info_close.ggCurrentLogicStateAlpha = -1;
		me._ht_info_close.userData.ggUpdateConditionTimer=function () {
			if (me.elementMouseOver['ht_info_close']) {
				me.elementMouseOver['ht_info_close']=true;
			}
		}
		me._ht_info_close.userData.ggUpdatePosition=function (useTransition) {
		}
		me._ht_info.add(me._ht_info_close);
		me._ht_info.userData.setOpacity(1.00);
		me._ht_info_icon.userData.setOpacity(1.00);
		me._ht_info_tooltip.userData.setOpacity(1.00);
		me._ht_info_bg.userData.setOpacity(0.00);
		me._ht_info_text.userData.setOpacity(1.00);
		me._ht_info_title.userData.setOpacity(1.00);
		me._ht_info_close.userData.setOpacity(0.00);
			me.ggEvent_activehotspotchanged=function() {
				me._ht_info_tooltip.logicBlock_visible();
			};
			me.ggEvent_changenode=function() {
				me._ht_info_icon.logicBlock_visible();
				me._ht_info_tooltip.logicBlock_visible();
				me._ht_info_bg.logicBlock_scaling();
				me._ht_info_bg.logicBlock_alpha();
				me._ht_info_close.logicBlock_alpha();
			};
			me.ggEvent_configloaded=function() {
				me._ht_info_icon.logicBlock_visible();
				me._ht_info_tooltip.logicBlock_visible();
				me._ht_info_bg.logicBlock_scaling();
				me._ht_info_bg.logicBlock_alpha();
				me._ht_info_close.logicBlock_alpha();
			};
			me.ggEvent_varchanged_vis_info_hotspots=function() {
				me._ht_info_icon.logicBlock_visible();
				me._ht_info_bg.logicBlock_scaling();
				me._ht_info_bg.logicBlock_alpha();
				me._ht_info_close.logicBlock_alpha();
			};
			me.__obj = me._ht_info;
			me.__obj.userData.hotspot = hotspot;
			me.__obj.userData.fromSkin = true;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		if (hotspot.skinid=='ht_info') {
			hotspot.skinid = 'ht_info';
			hsinst = new SkinHotspotClass_ht_info(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='ht_image') {
			hotspot.skinid = 'ht_image';
			hsinst = new SkinHotspotClass_ht_image(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='ht_node') {
			hotspot.skinid = 'ht_node';
			hsinst = new SkinHotspotClass_ht_node(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='ht_video_file') {
			hotspot.skinid = 'ht_video_file';
			hsinst = new SkinHotspotClass_ht_video_file(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		} else
		if (hotspot.skinid=='ht_video_url') {
			hotspot.skinid = 'ht_video_url';
			hsinst = new SkinHotspotClass_ht_video_url(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
		}
		return (hsinst ? hsinst.__obj : null);
	}
	me.removeSkinHotspots=function() {
		hotspotTemplates = [];
	}
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
	});
	me.skinTimerEvent=function() {
	if (!player.isInVR()) return;
		me.ggCurrentTime=new Date().getTime();
		me._page_up.userData.ggUpdateConditionTimer();
		me._page_down.userData.ggUpdateConditionTimer();
	};
	player.addListener('timer', me.skinTimerEvent);
	player.addListener('entervr', function() { me.addSkin(); player.triggerEvent('changenode'); });
	player.addListener('exitvr', function() { me.removeSkin(); });
	me.skinTimerEvent();
};