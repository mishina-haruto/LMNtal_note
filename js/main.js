document.addEventListener('keypress', keypress_ivent);    
function keypress_ivent(e){
    if(e.code=="Enter")document.inputForm.inputText.value = "";
    document.inputForm.inputText.focus();
}

document.addEventListener('keyup', keyup_ivent);    
function keyup_ivent(e){
    manager.guardUpdate();
}

function Manager(){
    var bar = d3.select("#manager");
    bar.append("form")
        .attr("id", "inputForm")
        .attr("name", "inputForm");
    var inputValue = d3.select("#inputForm")
        .append("input")
        .attr("id", "inputText")
        .attr("name", "inputText")
        .attr("type", "text");
    d3.select("#inputForm")
        .append("input")
        .attr("name", "dummy")
        .attr("type", "text")
        .style("display","none");
    bar.append("input")
        .attr("type", "button")
        .attr("value","select")
        .attr("onclick","manager.onSelectButtonClick();");
    bar.append("input")
        .attr("value", "atom")
        .attr("type", "button")
        .attr("onclick","manager.onAtomButtonClick();");
    bar.append("input")
        .attr("type", "button")
        .attr("value","link")
        .attr("onclick","manager.onLinkButtonClick();");
    bar.append("input")
        .attr("type", "button")
        .attr("value","film")
        .attr("onclick","manager.onFilmButtonClick();");
    bar.append("input")
        .attr("type", "button")
        .attr("value","remove")
        .attr("onclick","manager.onRemoveButtonClick();");
    bar.append("input")
        .attr("type", "button")
        .attr("value","change")
        .attr("onclick","manager.onChangeButtonClick();");
    bar.append("input")
        .attr("value", "rule")
        .attr("type", "button")
        .attr("onclick","manager.onRuleButtonClick();");
    bar.append("input")
        .attr("value", "free link")
        .attr("type", "button")
        .attr("onclick","manager.onFreeLinkButtonClick();");
    bar.append("input")
        .attr("value", "free atom")
        .attr("type", "button")
        .attr("onclick","manager.onFreeAtomButtonClick();");
    bar.append("input")
        .attr("value", "output")
        .attr("type", "button")
        .attr("onclick","manager.onOutputButtonClick();");
    
    var output = d3.select("#output");
    output.append("form")
        .attr("id", "outputForm")
        .attr("name", "outputForm");
    var inputValue = d3.select("#outputForm")
        .append("input")
        .attr("id", "outputText")
        .attr("name", "outputText")
        .attr("type", "text");

    this.onSelectButtonClick = function(){
        main.onSelectButtonClick();
        for(elem of rules){
            elem.subCanvasBefore.onSelectButtonClick();
            elem.subCanvasAfter.onSelectButtonClick();
        }
    }
    this.onAtomButtonClick = function(){
        main.onAtomButtonClick();
        for(elem of rules){
            elem.subCanvasBefore.onAtomButtonClick();
            elem.subCanvasAfter.onAtomButtonClick();
        }
    }
    this.onLinkButtonClick = function(){
        main.onLinkButtonClick();
        for(elem of rules){
            elem.subCanvasBefore.onLinkButtonClick();
            elem.subCanvasAfter.onLinkButtonClick();
        }
    }
    this.onFilmButtonClick = function(){
        main.onFilmButtonClick();
        for(elem of rules){
            elem.subCanvasBefore.onFilmButtonClick();
            elem.subCanvasAfter.onFilmButtonClick();
        }
    }
    this.onRemoveButtonClick = function(){
        main.onRemoveButtonClick();
        for(elem of rules){
            elem.subCanvasBefore.onRemoveButtonClick();
            elem.subCanvasAfter.onRemoveButtonClick();
        }
    }
    this.onChangeButtonClick = function(){
        main.onChangeButtonClick();
        for(elem of rules){
            elem.subCanvasBefore.onChangeButtonClick();
            elem.subCanvasAfter.onChangeButtonClick();
        }
    }
    this.onRuleButtonClick = function(){
        main.onRuleButtonClick();
        for(elem of rules){
            elem.subCanvasBefore.onRuleButtonClick();
            elem.subCanvasAfter.onRuleButtonClick();
        }
    }
    this.onFreeLinkButtonClick = function(){
        main.onFreeLinkButtonClick();
        for(elem of rules){
            elem.subCanvasBefore.onFreeLinkButtonClick();
            elem.subCanvasAfter.onFreeLinkButtonClick();
        }
    }
    this.onFreeAtomButtonClick = function(){
        main.onFreeAtomButtonClick();
        for(elem of rules){
            elem.subCanvasBefore.onFreeAtomButtonClick();
            elem.subCanvasAfter.onFreeAtomButtonClick();
        }
    }
    this.onOutputButtonClick = function(){
        for(elem of rules){
            var sub_canvas_after_text = elem.subCanvasAfter.onOutputButtonClick();//なぜかelem.guard.toText()の後にelem.subCanvasAfter.toRuleText()が実行できない
            elem.text = elem.subCanvasBefore.onOutputButtonClick() + ":-" + elem.guard.toText() + sub_canvas_after_text;
        }
        var return_text = main.onOutputButtonClick();
        for(elem of rules){
            return_text = return_text.replace("@@" + elem.id, elem.text);
        }
        outputText.value = return_text;
    }

    this.addRule = function(id, name){
        rules.push({"id":id, "name":name, "subCanvasBefore":null, "guard":null, "subCanvasAfter":null, "text":""});
        this.update();
    }

    this.removeRule = function(id){
        for(i=0;i<rules.length;i++){
            if(id==rules[i].id)rules.splice(i,1);
        }
        this.update();
    }

    var rules = [];
    this.update = function(){
        var new_rule_id = null;
        var new_rule_name = null;
        if(rules.length!=0){
            new_rule_id = rules[rules.length-1].id;
            new_rule_name = rules[rules.length-1].name;
        }

        var sub = d3.select("#sub")
            .selectAll("div#rule")
            .data(rules);
        subEnter = sub.enter();
        subEnter.append("div")
            .attr("id","rule");
        sub.exit().remove();
        
        subInner = d3.selectAll("div#rule")
            .selectAll("g#ruleInner")
            .data([1]);
        subInnerEnter = subInner.enter()
            .append("g")
            .attr("id","ruleInner");
        subInnerEnter.append("div")
            .attr("class","ruleName")
            .text(new_rule_name);
        subInnerEnter.append("div")
            .attr("class","noRuleName");
        subInner.exit().remove();

        noRuleNameInner = d3.selectAll("div.noRuleName")
            .selectAll("g.noRuleNameInner")
            .data([1]);
        noRuleNameInnerEnter = noRuleNameInner.enter()
            .append("g")
            .attr("class","noRuleNameInner");
        noRuleNameInnerEnter.append("div")
            .attr("class","subCanvas")
            .attr("id", function(){return "subCanvasBefore"+new_rule_id});
        noRuleNameInnerEnter.append("div")
            .attr("class","guard")
            .attr("id", function(){return "guard"+new_rule_id});
        noRuleNameInnerEnter.append("div")
            .attr("class","subCanvas")
            .attr("id", function(){return "subCanvasAfter"+new_rule_id});
        noRuleNameInner.exit().remove();
        
        
        d3.select("#sub")
            .selectAll("div#rule")
            .each(function(d){
                if(d.subCanvasBefore==null)d.subCanvasBefore = new subCanvas("subCanvasBefore"+new_rule_id);
                if(d.guard==null)d.guard = new Guard("guard"+new_rule_id);
                if(d.subCanvasAfter==null)d.subCanvasAfter = new subCanvas("subCanvasAfter"+new_rule_id);
            });
    }
    
    this.guardUpdate = function(){
        for(elem of rules)elem.guard.update();
    }
}

function MainCanvas(id) {
    //変数
    var canvas = d3.select(id);

    var w = 380, h =420;
    var vis = canvas.append("svg:svg")
        .attr("class","mainCanvas")
        .attr("id","mainCanvas")
        .style("background-color", "#EEFFFF");

    
    var force = d3.layout.force()
        .gravity(0)
        .distance(100)
        .linkStrength(0)
        .charge(-100)
        .chargeDistance(30)
        .size([w, h])
        .friction(0.1);

    var nodes = force.nodes(),
        links = force.links(),
        rects = [];

    var state = [0, 0, 0, 0, 0, 0, 0, 0];

    const isAllEqual = array => array.every(value => value === array[0]);


    //ButtonClick メソッド
    this.onSelectButtonClick = function(){
        if(state[0]==1){
            removeNode(node_id-1);
            state[0]=0;
        }
        if(state[1]==1)state[1]=0;
        if(state[1]==2){
            removeNode(-1);
            state[1]=0;
        }
        if(state[2]==1){
            state[2]=0;
            removeNode(-2);
        }
        if(state[2]==2){
            removeFilm(film_id);
            film_id++;
            state[2]=0;
        }
        if(state[3]==1){
            removeNode(-3);
            state[3]=0;
        }
        if(state[4]==1){
            removeNode(freeLink_id-1);
            state[4]=0;
        }
        if(state[5]==1){
            removeNode(freeAtom_id-1);
            state[5]=0;
        }
        if(state[6]==1)state[6]=0;
        if(state[6]==2){
            selectedLinkReset();
            state[6]=0;
        }
        if(state[7]==1)state[7]=0;
    }

    this.onAtomButtonClick = function(){
        if(state[0]==0){
            this.onSelectButtonClick();
            state[0] = 1;
            addNode();
        }
    }

    var linking_id_resouce = null;
    var linking_id_target = null;
    this.onLinkButtonClick = function(){
        if(state[1]==0){
            this.onSelectButtonClick();
            state[1] = 1;
        }
    }

    var filming_point_1 = null;
    var filming_point_2 = null;
    this.onFilmButtonClick = function() {
        if(state[2]==0){
            this.onSelectButtonClick();
            state[2] = 1;
            nodes.push({"id":-2});
        }
    }

    this.onRuleButtonClick = function(){
        if(state[3]==0){
            this.onSelectButtonClick();
            state[3] = 1;
            nodes.push({"id":-3});
        }
    }

    this.onRemoveButtonClick = function(){
        if(state[7]==0){
            this.onSelectButtonClick();
            state[7] = 1;
        }
    }

    var changeAtom0 = null;
    var changeAtom1 = null;
    var changeAtom2 = null;
    this.onChangeButtonClick = function(){
        if(state[6]==0){
            this.onSelectButtonClick();
            state[6] = 1;
        }
    }
    
    this.onFreeLinkButtonClick = function(){
        if(state[4]==0){
            this.onSelectButtonClick();
            state[4] = 1;
            addFreeLink();
        }
    }

    this.onFreeAtomButtonClick = function(){
        if(state[5]==0){
            this.onSelectButtonClick();
            state[5] = 1;
            addFreeAtom();
        }
    }

    this.onOutputButtonClick = function(){
        this.onSelectButtonClick();
        return this.toText();
    }


    //element click メソッド
    var atomClick = function(i){
        if(isAllEqual(state)){
            console.log("Atom:" + i + " is clicked");
        }
        if(state[0]==1||state[4]==1||state[5]==1){
            addLink(i, nodes[nodes.length-1].id);
            check = false;
        }
        if(state[1]==1){
            linking_id_resouce = i;
            nodes.push({"id":-1, "rev":[]});
            addLink(linking_id_resouce, -1);
            state[1] = 2;
        }else if(state[1]==2){
            linking_id_target = i;
            removeNode(-1);
            addLink(linking_id_resouce, linking_id_target);
            state[1] = 1;
        }
        if(state[6]==1){
            changeAtom0 = i;
            state[6] = 2;
        }else if(state[6]==2){
            changeAtom1 = i;
            state[6] = 3;
        }else if(state[6]==3){
            changeAtom2 = i;
            changeRev(changeAtom0, changeAtom1, changeAtom2);
            state[6] = 0;
        }
        if(state[7]==1)removeNode(i);
    }

    var changeAtom = null;
    var rev1 = null;
    var rev2 = null;
    var sourceLinkClick = function(id){
        if(isAllEqual(state)){
            console.log("sourceLink:" + id + " is clicked");
        }
        if(state[6]==1){
            for(i=0;i<links.length;i++){
                if(links[i].id==id){
                    links[i].selected = 1;
                    changeAtom = findNode(links[i].source.id);
                    for(j=0;j<changeAtom.rev.length;j++){
                        if(changeAtom.rev[j].id==id){
                            rev1 = j;
                            break;
                        }
                    }
                    state[6] = 2;
                    break;
                }
            }
        }else if(state[6]==2){
            for(i=0;i<links.length;i++){
                if(links[i].id==id){
                    if(changeAtom==findNode(links[i].source.id)){
                        for(j=0;j<changeAtom.rev.length;j++){
                            if(changeAtom.rev[j].id==id){
                                rev2 = j;
                                selectedLinkReset();
                                changeRev(changeAtom, rev1, rev2);
                                state[6] = 1;
                                break;
                            }
                        }
                        break;
                    }
                }
            }
        }
        if(state[7]==1)removeLink(id);
    }
    var targetLinkClick = function(id){
        if(isAllEqual(state)){
            console.log("targetLink:" + id + " is clicked");
        }
        if(state[6]==1){
            for(i=0;i<links.length;i++){
                if(links[i].id==id){
                    links[i].selected = 2;
                    changeAtom = findNode(links[i].target.id);
                    for(j=changeAtom.rev.length-1;j>=0;j--){
                        if(changeAtom.rev[j].id==id){
                            rev1 = j;
                            break;
                        }
                    }
                    state[6] = 2;
                    break;
                }
            }
        }else if(state[6]==2){
            for(i=0;i<links.length;i++){
                if(links[i].id==id){
                    if(changeAtom==findNode(links[i].target.id)){
                        for(j=changeAtom.rev.length-1;j>=0;j--){
                            if(changeAtom.rev[j].id==id){
                                rev2 = j;
                                selectedLinkReset();
                                changeRev(changeAtom, rev1, rev2);
                                state[6] = 1;
                                break;
                            }
                        }
                        break;
                    }
                }
            }
        }
        if(state[7]==1)removeLink(id);
    }

    var filmClick = function(i){
        if(isAllEqual(state)){
            console.log("film:" + i + " is clicked");
        }
        if(state[7]==1)removeNode(i);
    }

    var ruleClick = function(i){
        if(isAllEqual(state)){
            console.log("rule:" + i + " is clicked");
        }
        if(state[7]==1){
            removeNode(i);
            manager.removeRule(i);
        }
    }

    var freeLinkClick = function(i){
        if(isAllEqual(state)){
            console.log("freeLink:" + i + " is clicked");
        }
        if(state[0]==1||state[4]==1||state[5]==1){
            addLink(i, nodes[nodes.length-1].id);
            check = false;
        }
        if(state[1]==1){
            linking_id_resouce = i;
            nodes.push({"id":-1, "rev":[]});
            addLink(linking_id_resouce, -1);
            state[1] = 2;
        }else if(state[1]==2){
            linking_id_target = i;
            removeNode(-1);
            addLink(linking_id_resouce, linking_id_target);
            state[1] = 1;
        }
        if(state[6]==1){
            changeAtom0 = i;
            state[6] = 2;
        }else if(state[6]==2){
            changeAtom1 = i;
            state[6] = 3;
        }else if(state[6]==3){
            changeAtom2 = i;
            changeRev(changeAtom0, changeAtom1, changeAtom2);
            state[6] = 0;
        }
        if(state[7]==1)removeNode(i);
    }

    var freeAtomClick = function(i){
        if(isAllEqual(state)){
            console.log("freeAtom:" + i + " is clicked");
        }if(state[0]==1||state[4]==1||state[5]==1){
            addLink(i, nodes[nodes.length-1].id);
            check = false;
        }
        if(state[1]==1){
            linking_id_resouce = i;
            nodes.push({"id":-1, "rev":[]});
            addLink(linking_id_resouce, -1);
            state[1] = 2;
        }else if(state[1]==2){
            linking_id_target = i;
            removeNode(-1);
            addLink(linking_id_resouce, linking_id_target);
            state[1] = 1;
        }
        if(state[6]==1){
            changeAtom0 = i;
            state[6] = 2;
        }else if(state[6]==2){
            changeAtom1 = i;
            state[6] = 3;
        }else if(state[6]==3){
            changeAtom2 = i;
            changeRev(changeAtom0, changeAtom1, changeAtom2);
            state[6] = 0;
        }
        if(state[7]==1)removeNode(i);
    }

    //その他のメソッド    
    var node_id = 0;
    var addNode = function () {
        if(node_id>=1000)return;
        nodes.push({"id":node_id, "name":"", "rev":[], "newNodeCount":2, "new":true});
        node_id += 1;
    }

    var removeNode = function (id) {
        var i = 0;
        var n = findNode(id);
        var deleate_link_id;
        while (i < links.length) {
            if ((links[i]['source'] === n)||(links[i]['target'] == n)){
                deleate_link_id=links[i].id;
                links.splice(i,1);
                for(j=0;j<nodes.length;j++){
                    if(nodes[j].rev==undefined)continue;
                    for(k=0;k<nodes[j].rev.length;k++){
                        if(nodes[j].rev==undefined)break;
                        if(nodes[j].rev[k].id==deleate_link_id)nodes[j].rev.splice(k,1);
                    }
                }
            }
            else i++;
        }
        var index = findNodeIndex(id);
        if(index !== undefined) {
            nodes.splice(index, 1);
        }
    }

    var link_id = 0;
    var addLink = function (sourceId, targetId) {
        if(sourceId>targetId)[sourceId, targetId] = [targetId, sourceId];
        var sourceNode = findNode(sourceId);
        var targetNode = findNode(targetId);
        if(3000<=sourceId & sourceId<4000){
            if(sourceNode.rev[0]!==undefined){
                removeLink(sourceNode.rev[0].id);
                sourceNode.rev=[];
            }
        }else if(4000<=sourceId & sourceId<5000){
            if(sourceNode.rev[1]!==undefined){
                removeLink(sourceNode.rev[0].id);
            }
        }
        if(3000<=targetId & targetId<4000){
            if(targetNode.rev[0]!==undefined){
                removeLink(targetNode.rev[0].id);
                targetNode.rev=[];
            }
        }else if(4000<=targetId & targetId<5000){
            if(targetNode.rev[1]!==undefined){
                removeLink(targetNode.rev[0].id);
            }
        }
        sourceNode.rev.push({"id": link_id});
        targetNode.rev.push({"id": link_id});
        if((sourceNode !== undefined) && (targetNode !== undefined)) {
            var linkNumber = 1;
            for(elem of links){
                if(sourceNode==elem.source & targetNode==elem.target){
                    linkNumber++;
                }
            }
            links.push({"id": link_id, "source": sourceNode, "target": targetNode, "number":linkNumber, "maxNumber":linkNumber, "selected":0});
            for(elem of links){
                if(sourceNode==elem.source & targetNode==elem.target){
                    elem.maxNumber = linkNumber;
                }
            }
            update();
        }
        link_id += 1;
    }

    var removeLink = function(link_id){
        for(i=0;i<links.length;i++){
            if(links[i].id==link_id){
                links.splice(i,1);
            }
        }
        for(i=0;i<nodes.length;i++){
            if(nodes[i].rev==undefined)continue;
            for(j=0;j<nodes[i].rev.length;j++){
                if(nodes[i].rev[j].id==link_id){
                    nodes[i].rev.splice(j,1);
                }
            }
        }
    }

    this.removeLink = function(link_id){
        for(i=0;i<links.length;i++){
            if(links[i].id==link_id){
                links.splice(i,1);
            }
        }
        for(i=0;i<nodes.length;i++){
            if(nodes[i].rev==undefined)continue;
            for(j=0;j<nodes[i].rev.length;j++){
                if(nodes[i].rev[j].id==link_id){
                    nodes[i].rev.splice(j,1);
                }
            }
        }
    }

    var changeRev = function(changeAtom, rev1, rev2){
        if(rev1==rev2)return;
        [changeAtom.rev[rev1].id, changeAtom.rev[rev2].id] = [changeAtom.rev[rev2].id, changeAtom.rev[rev1].id];
    }

    var selectedLinkReset = function(){
        for(elem of links)elem.selected = 0;
    }

    var film_id = 1000;
    var new_film_id = null;
    var new_film_count = 0;
    var create_film_id = null;
    var addFilm = function (x1, y1, x2, y2){
        if(film_id>=2000)return;
        if(x1>x2)[x1, x2] = [x2, x1];
        if(y1>y2)[y1, y2] = [y2, y1];
        nodes.push({"id":film_id,"fx":x1,"fy":y1,"width":x2-x1,"height":y2-y1});
        new_film_id = film_id;
        new_film_count = 2;
    }

    var addRect = function (x1, y1, x2, y2){
        if(film_id>=2000)return;
        if(x1>x2)[x1, x2] = [x2, x1];
        if(y1>y2)[y1, y2] = [y2, y1];
        rects.push({"id":film_id,"x":x1,"y":y1,"width":x2-x1,"height":y2-y1,"area":(x2-x1)*(y2-y1)});
        rects.sort(function(first, second){
            return first.area - second.area;
        });
    }

    var removeFilm = function(film_id){
        for(i=0;i<rects.length;i++){
            if(rects[i].id==film_id)rects.splice(i,1);
        }
        for(i=0;i<nodes.length;i++){
            if(nodes[i].id==film_id){
                nodes.splice(i,1);
            }
        }
    }
    
    
    var rule_id = 2000;
    var addRule = function (name) {
        if(rule_id>=3000)return;
        nodes.push({"id":rule_id, "name":name, "newNodeCount":2, "new":false});
        manager.addRule(rule_id, name);
        rule_id++;
    }

    this.removeRule = function (rule_id) {
        manager.removeRule(rule_id);
        for(i=0;i<nodes.length;i++){
            if(nodes[i].id==rule_id){
                nodes.splice(i,1);
            }
        }
    }

    var freeLink_id = 3000;
    var addFreeLink = function () {
        if(freeLink_id>=4000)return;
        nodes.push({"id":freeLink_id, "name":"", "rev":[], "new":true});
        new_node_id = freeLink_id;
        new_node_count = 2;
        freeLink_id += 1;
    }

    var removeFreeLink = function(id){
        removeNode(id);
    }

    var freeAtom_id = 4000;
    var addFreeAtom = function () {
        if(freeAtom_id>=5000)return;
        nodes.push({"id":freeAtom_id, "name":"", "rev":[], "new":true});
        new_node_id = freeAtom_id;
        new_node_count = 2;
        freeAtom_id += 1;
    }

    var removeFreeAtom = function(id){
        removeNode(id);
    }

    var nodeToText = function(atom_id) {
        var atom_text = "";
        var atom = findNode(atom_id);
        if(atom.name=="." |atom.name=="[]"|!isNaN(atom.name)){
            atom_text = atom_text + "'" + atom.name + "'";
        }else{
            atom_text = atom_text + atom.name;
        }
        var rev_length = atom.rev.length;
        if(rev_length>0){
            for(i=0;i<rev_length;i++){
                if(i==0){
                    atom_text = atom_text + "(L"  + atom.rev[i].id.toString().padStart(4, '0');
                }else{
                    atom_text = atom_text + ",L" + atom.rev[i].id.toString().padStart(4, '0');
                }
            }
            atom_text = atom_text + ")"
        }
        return atom_text;
    }

    this.toText = function(){
        var rect_info = []
        for(var elem of rects){
            vis.selectAll("rect")
                .each(function(d){
                    if(d.id==elem.id){
                        rect_info.push({"id":d.id,"x1":d.x,"y1":d.y,"x2":d.x+d.width,"y2":d.y+d.height,"text":""});
                    }
                })
        }
        rect_info.push({"id":-1,"x1":0,"y1":0,"x2":w,"y2":h,"text":""})
        var prev_id = null;
        vis.selectAll("circle")
            .each(function(d){
                if(d.new==true)return;
                if(prev_id==d.id)return;
                prev_id = d.id;
                if(d.name==undefined)return;
                for(var elem of rect_info){
                    if(elem.x1<=d.x & d.x<=elem.x2 & elem.y1<=d.y & d.y<=elem.y2){
                        elem.text = elem.text + nodeToText(d.id) + ".";
                        break;
                    }
                }
            })
        vis.selectAll("polygon")
            .each(function(d){
                if(2000<=d.id & d.id<3000){
                    for(var elem of rect_info){
                        if(elem.x1<=d.x & d.x<=elem.x2 & elem.y1<=d.y & d.y<=elem.y2){
                            elem.text = elem.text + "@@" + d.id + ".";
                            break;
                        }
                    }
                }
            })
        for(i=0;i<rect_info.length;i++){
            var rect1 = rect_info[i];
            for(j=i+1;j<rect_info.length;j++){
                var rect2 = rect_info[j];
                if(rect2.x1<=rect1.x1 & rect1.x2<=rect2.x2 & rect2.y1<=rect1.y1 & rect1.y2<=rect2.y2){
                    rect2.text = rect2.text + "{" + rect1.text + "}."
                    break;
                }
            }
        }
        //outputText.value = rect_info[rect_info.length-1].text;
        return rect_info[rect_info.length-1].text;
    }

    var findNode = function (id) {
        for (var i=0; i < nodes.length; i++) {
            if (nodes[i].id === id)
                return nodes[i]
        };
    }

    var findNodeIndex = function (id) {
        for (var i=0; i < nodes.length; i++) {
            if (nodes[i].id === id)
                return i
        };
    }

    var linkCollor =function(d,b){
        var n = null;
        if(b==1){
            if(3000<=d.source.id & d.source.id<5000|d.source.id==-1){
                return "black"
            }
            for (i=0;i<d.source.rev.length;i++){
                if(d.id==d.source.rev[i].id){
                    n = i;
                    break;
                }
            }
        }
        if(b==2){
            if((3000<=d.target.id & d.target.id<5000)){
                return "black"
            }
            for (i=d.target.rev.length-1;i>=0;i--){
                if(d.id==d.target.rev[i].id){
                    n = i;
                    break;
                }
            }
        }
        switch(n){
            case 0: return "red"; break;
            case 1: return "blue"; break;
            case 2: return "yellow"; break;
            case 3: return "orange"; break;
            case 4: return "green"; break;
            case 5: return "purple"; break;
            case 6: return "lime"; break;
            case 7: return "aqua"; break;
            case 8: return "fuchsia"; break;
            case 9: return "olive"; break;
            default: return "black"
        }
    }

    var carveDraw1 = function(d,p){
        return "M"+d.source.x+","+d.source.y
                +" Q"+((d.target.x+3*d.source.x)/4-p*0.1*(d.target.y-d.source.y))+","+((d.target.y+3*d.source.y)/4+p*0.1*(d.target.x-d.source.x))
                +" "+((d.target.x+d.source.x)/2-p*0.1*(d.target.y-d.source.y))+","+((d.target.y+d.source.y)/2+p*0.1*(d.target.x-d.source.x));
    }

    var carveDraw2 = function(d,p){
        return "M"+((d.target.x+d.source.x)/2-p*0.1*(d.target.y-d.source.y))+","+((d.target.y+d.source.y)/2+p*0.1*(d.target.x-d.source.x))
                +" Q"+((3*d.target.x+d.source.x)/4-p*0.1*(d.target.y-d.source.y))+","+((3*d.target.y+d.source.y)/4+p*0.1*(d.target.x-d.source.x))
                +" "+d.target.x+","+d.target.y;
    }

    var circleDraw1 = function(d,p){
        return "M"+d.source.x+","+d.source.y+" a"+ p*10+","+p*10+" -180 0 1"+p*10*2+","+0;
    }

    var circleDraw2 = function(d,p){
        return "M"+(d.source.x+p*10*2)+","+d.source.y+" a"+ p*10+","+p*10+" 0 0 1"+p*10*(-2)+","+0;
    }

    var carveDraw = function(d,b){
        var n = null;
        if(d.source==d.target){
            if(d.number==1) n = 1;
            else if(d.number==2) n = -1;
            else if(d.number==3) n = 1.5;
            else if(d.number==4) n = -1.5;
            else if(d.number==5) n = 2;
            else return "";
            if(b==1)return circleDraw1(d,n);
            else if(b==2)return circleDraw2(d,n);
        }else{
            if(d.maxNumber%2==1){
                if(d.number==1) return "";
                else if(d.number==2) n = 1;
                else if(d.number==3) n = -1;
                else if(d.number==4) n = 2;
                else if(d.number==5) n = -2;
                else return "";
            }else if(d.maxNumber%2==0){
                if(d.number==1) n = 0.5;
                else if(d.number==2) n = -0.5;
                else if(d.number==3) n = 1.5;
                else if(d.number==4) n = -1.5;
                else if(d.number==5) n = 2;
                else return "";
            }
            if(b==1)return carveDraw1(d,n);
            else if(b==2)return carveDraw2(d,n);
        }
    }

    var onCursorChange = function(d, b){
        if(b==1){
            if(isAllEqual(state))return "auto";
            else if(state[0]!==0)return "auto";
            else if(state[1]!==0)return "auto";
            else if(state[2]!==0)return "auto";
            else if(state[3]!==0)return "auto";
            else if(state[4]!==0)return "auto";
            else if(state[5]!==0)return "auto";
            else if(state[6]!==0)return "url(css/change.png),auto";
            else if(state[7]!==0)return "url(css/sissors.png),auto";
        }else if((0<=d.id & d.id<1000)|(3000<=d.id & d.id<5000)){
            if(isAllEqual(state))return "pointer";
            else if(state[0]!==0)return "url(css/pencil.png),auto";
            else if(state[1]!==0)return "url(css/pencil.png),auto";
            else if(state[2]!==0)return "auto";
            else if(state[3]!==0)return "auto";
            else if(state[4]!==0)return "url(css/pencil.png),auto";
            else if(state[5]!==0)return "url(css/pencil.png),auto";
            else if(state[6]!==0)return "auto";
            else if(state[7]!==0)return "url(css/sissors.png),auto";
        }else if(1000<=d.id & d.id<2000){
            if(isAllEqual(state))return "pointer";
            else if(state[0]!==0)return "auto";
            else if(state[1]!==0)return "auto";
            else if(state[2]!==0)return "auto";
            else if(state[3]!==0)return "auto";
            else if(state[4]!==0)return "auto";
            else if(state[5]!==0)return "auto";
            else if(state[6]!==0)return "auto";
            else if(state[7]!==0)return "url(css/sissors.png),auto";
        }else if(2000<=d.id & d.id<3000){
            if(isAllEqual(state))return "pointer";
            else if(state[0]!==0)return "auto";
            else if(state[1]!==0)return "auto";
            else if(state[2]!==0)return "auto";
            else if(state[3]!==0)return "auto";
            else if(state[4]!==0)return "auto";
            else if(state[5]!==0)return "auto";
            else if(state[6]!==0)return "auto";
            else if(state[7]!==0)return "url(css/sissors.png),auto";
        }
    }

    var linkNodeMode = false;
    var listNodeMode = false;
    var listNode = "";
    var checkText = function(){
        linkNodeMode = false;
        listNodeMode = false;
        var textValue = "";
        var myTextValue = inputText.value;
        if(myTextValue.charAt(0)=="[" & myTextValue.charAt(myTextValue.length-1)=="]" & myTextValue.length>2){
            listNodeMode = true;
            myTextValue = myTextValue.slice(1);
            myTextValue = myTextValue.slice(0,-1);
        }
        if(myTextValue.indexOf(' ')==-1 & myTextValue.indexOf(',')==-1){
            if(listNodeMode){
                inputText.value = "[]"
                listNode = myTextValue;
                return ".";
            }else return myTextValue;
        }
        while(myTextValue!=""){
            if(myTextValue.charAt(0)==" "){
                myTextValue = myTextValue.slice(1);
                break;
            }else if(myTextValue.charAt(0)==","){
                linkNodeMode = true;
                myTextValue = myTextValue.slice(1);
                break;
            }else{
                textValue = textValue + myTextValue.charAt(0);
                myTextValue = myTextValue.slice(1);
            }
        }
        if(listNodeMode){
            inputText.value = "["+myTextValue+"]";
            listNode = textValue;
            return ".";
        }else{
            inputText.value = myTextValue;
            return textValue;
        }
    }

    var overlapRect = [];
    var checkOverlap = function(d){
        var x1 = d.x, y1 = d.y, x2 = d.x+d.width, y2 = d.y+d.height;
        var overlap = "black";
        for(elem of overlapRect){
            var xCheck = "none";
            var yCheck = "none";
            if((elem.x1<x1 & x1<elem.x2 & elem.x2<x2) | (x1<elem.x1 & elem.x1<x2 & x2<elem.x2))xCheck="part";
            else if(elem.x1<x1 & x2<elem.x2)xCheck="small";
            else if(x1<elem.x1 & elem.x2<x2)xCheck="big";
            if((elem.y1<y1 & y1<elem.y2 & elem.y2<y2) | (y1<elem.y1 & elem.y1<y2 & y2<elem.y2))yCheck="part";
            else if(elem.y1<y1 & y2<elem.y2)yCheck="small";
            else if(y1<elem.y1 & elem.y2<y2)yCheck="big";
            if(!(xCheck=="none" | yCheck=="none" | (xCheck=="small" & yCheck=="small") | (xCheck=="big" & yCheck=="big"))){
                overlap="red";
                elem.overlap = "red";
            }
        }
        overlapRect.push({"id":d.id, "x1":x1, "y1":y1, "x2":x2, "y2":y2, "overlap":overlap});
    }

    var headUpper = function(text){
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    var headLower = function(text){
        return text.charAt(0).toLowerCase() + text.slice(1);
    }

    //on メソッド
    var over = false;
    var check = true;
    var mousePoint = [w/2,h/2];
    vis.on("click",function(){
        if(state[0]==1){
            if(check==true){
                nodes[nodes.length-1].new=false;
                nodes[nodes.length-1].name=headLower(checkText());
                addNode();
                if(listNodeMode){
                    nodes[nodes.length-1].new=false;
                    nodes[nodes.length-1].name=headLower(listNode);
                    addNode();
                    addLink(nodes[nodes.length-3].id, nodes[nodes.length-2].id);
                    addLink(nodes[nodes.length-3].id, nodes[nodes.length-1].id);
                    if(nodes[nodes.length-3].rev.length==3){
                        changeRev(nodes[nodes.length-3],0,1);
                        changeRev(nodes[nodes.length-3],1,2);
                    }
                }else if(linkNodeMode)addLink(nodes[nodes.length-2].id, nodes[nodes.length-1].id);
            }else{
                check = true;
            }
        }
        if(state[2]==1){
            removeNode(-2);
            filming_point_1 = d3.mouse(this);
            addFilm(mousePoint[0],mousePoint[1],mousePoint[0],mousePoint[1]);
            create_film_id = film_id;
            state[2] = 2;
        }else if(state[2]==2){
            filming_point_2 = d3.mouse(this);
            create_film_id = null;
            removeFilm(film_id);
            film_id++;
            addRect(filming_point_1[0],filming_point_1[1],filming_point_2[0],filming_point_2[1]);
            addFilm(filming_point_1[0],filming_point_1[1],filming_point_2[0],filming_point_2[1]);
            film_id++;
            state[2] = 1;
            nodes.push({"id":-2});
        }
        if(state[3]==1){
            var value = inputText.value;
            addRule(value);
        }
        if(state[4]==1){
            if(check==true){
                nodes[nodes.length-1].new=false;
                nodes[nodes.length-1].name=headUpper(checkText());
                addFreeLink();
                if(linkNodeMode)addLink(nodes[nodes.length-2].id, nodes[nodes.length-1].id);
            }else{
                check = true;
            }
        }
        if(state[5]==1){
            if(check==true){
                nodes[nodes.length-1].new=false;
                nodes[nodes.length-1].name=headUpper(checkText());
                addFreeAtom();
                if(linkNodeMode)addLink(nodes[nodes.length-2].id, nodes[nodes.length-1].id);
            }else{
                check = true;
            }
        }
    })
    .on("mouseover",function() {over = true})
    .on("mouseout",function() {over = false})
    .on("mousemove",function(){
        mousePoint = d3.mouse(this);
    });

    //update メソッド
    var update = function () {
        w = parseInt(getComputedStyle(document.getElementById("mainCanvas")).width);
        h = parseInt(getComputedStyle(document.getElementById("mainCanvas")).height);

        var link = vis.selectAll("g.link")
            .data(links, function(d) { return d.id + "-" + d.source.id + "-" + d.target.id + "-" + d.number + "-" + d.maxNumber ; });
        linkEnter = link.enter().insert("g", ':first-child')
            .attr("class","link");

        linkEnter.append("line")
            .attr("class", "link1")
            .style("stroke-width", 3)
            .on("click", function(d,i){ sourceLinkClick(d.id); });

        linkEnter.append("path")
            .attr("class", "path1")
            .style("stroke-width", 3)
            .style("fill","none")
            .on("click", function(d,i){ sourceLinkClick(d.id); });
            
        linkEnter.append("line")
            .attr("class", "link2")
            .style("stroke-width", 3)
            .on("click", function(d,i){ targetLinkClick(d.id); });
            
        linkEnter.append("path")
            .attr("class", "path2")
            .style("stroke-width", 3)
            .style("fill","none")
            .on("click", function(d,i){ targetLinkClick(d.id); });

        link.exit().remove();

        var node = vis.selectAll("g.node")
            .data(nodes, function(d) { return d.id;});
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .call(force.drag);

        nodeEnter.each(function(d){
                if(0<=d.id & d.id<1000){
                    nodeEnter.append("circle")
                        .attr("class", "circle")
                        .style("fill", "#FF0000")
                        .style({stroke: "black",
                            "stroke-width": 1
                        })
                        .on("click", function(d,i){ atomClick(d.id); })
                        .call(force.drag);
                }else if(d.id==-2){
                    nodeEnter.insert("polygon", ':first-child')
                        .style("fill", "#AAAAAA")
                        .style({stroke: "black",
                            "stroke-width": 1
                        });
                }else if(1000<=d.id & d.id<2000){
                    nodeEnter.insert("polygon", ':first-child')
                        .style("fill", "#AAAAAA")
                        .style({stroke: "black",
                            "stroke-width": 1
                        })
                        .on("click", function(d,i){ filmClick(d.id); });
                    nodeEnter.insert("rect", ':first-child')
                        .attr('width',function(d) {return d.width})
                        .attr('height',function(d) {return d.height})
                        .attr('fill-opacity', 0.05)
                        .style({stroke: "black",
                            "stroke-width": 1
                        })
                        .attr('pointer-events', "none");
                }else if(d.id==-3){
                    nodeEnter.append("polygon")
                        .style("fill", "#75A9FF")
                        .style({stroke: "black",
                            "stroke-width": 1
                        });
                }else if(2000<=d.id & d.id<3000){
                    nodeEnter.append("polygon")
                        .style("fill", "#75A9FF")
                        .style({stroke: "black",
                            "stroke-width": 1
                        })
                        .on("click", function(d,i){ ruleClick(d.id); })
                        .call(force.drag);
                }else if(3000<=d.id & d.id<4000){
                    nodeEnter.append("polygon")
                        .style("fill", "yellow")
                        .style({stroke: "black",
                            "stroke-width": 1
                        })
                        .on("click", function(d,i){ freeLinkClick(d.id); })
                        .call(force.drag);
                }else if(4000<=d.id & d.id<5000){
                    nodeEnter.append("polygon")
                        .style("fill", "#FF773E")
                        .style({stroke: "black",
                            "stroke-width": 1
                        })
                        .on("click", function(d,i){ freeAtomClick(d.id); })
                        .call(force.drag);
                }
            });
        
        nodeEnter.append("text")
            .attr("class", "nodetext")
            .attr({
                "text-anchor":"middle",
                "dominant-baseline":"central",
                "fill":"black",
                "font-size": "9px"
            })
            .attr("pointer-events", "none")
        node.exit().remove();

        //tick メソッド
        force.on("tick", function() {
            
            link.attr("cursor", function(d) {return onCursorChange(d,1)})

            link.selectAll("line.link1")
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return (d.target.x+d.source.x)/2; })
                .attr("y2", function(d) { return (d.target.y+d.source.y)/2; })
                .style("stroke", function(d) { if(d.maxNumber%2==1)return linkCollor(d,1)})
                .style("stroke-width", function(d) {
                    if(d.selected==1)return 1;
                    else return 3;
                });

            link.selectAll("path.path1")
                .attr('d', function(d) {return carveDraw(d,1)})
                .style("stroke", function(d) { return linkCollor(d,1)})
                .style("stroke-width", function(d) {
                    if(d.selected==1)return 1;
                    else return 3;
                });
            
            link.selectAll("line.link2")
                .attr("x1", function(d) { return (d.target.x+d.source.x)/2; })
                .attr("y1", function(d) { return (d.target.y+d.source.y)/2; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; })
                .style("stroke", function(d) { if(d.maxNumber%2==1)return linkCollor(d,2)})
                .style("stroke-width", function(d) {
                    if(d.selected==2)return 1;
                    else return 3;
                });

            link.selectAll("path.path2")
                .attr('d', function(d) {return carveDraw(d,2)})
                .style("stroke", function(d) { return linkCollor(d,2)})
                .style("stroke-width", function(d) {
                    if(d.selected==2)return 1;
                    else return 3;
                });

            node.attr("transform", function(d) { 
                if(d.id==-1||d.id==-2||d.id==-3||d.new==true){
                    d.x=mousePoint[0];
                    d.y=mousePoint[1];
                    return "translate(" + d.x + "," + d.y + ")";
                }
                if(d.id==create_film_id){
                    var x1,y1;
                    if(d.fx>mousePoint[0])x1 = mousePoint[0];
                    else x1 = d.fx;
                    if(d.fy>mousePoint[1])y1 = mousePoint[1];
                    else y1 = d.fy;
                    return "translate(" + x1 + "," + y1 + ")";
                }else if(d.id==new_film_id){
                    d.x = d.fx;
                    d.y = d.fy;
                    new_film_count--;
                    if(new_film_count<=0)new_film_id = null;
                    return "translate(" + d.x + "," + d.y + ")";
                }
                if(1000<=d.id & d.id<2000){
                    if(d.x<=5)d.x=5;
                    if(d.x+d.width>=w)d.x=w-d.width;
                    if(d.y<=5)d.y=5;
                    if(d.y+d.height>=h)d.y=h-d.height;
                    return "translate(" + d.x + "," + d.y + ")";
                }
                if(d.newNodeCount>=0){
                    d.x=mousePoint[0];
                    d.y=mousePoint[1];
                    d.newNodeCount--;
                    return "translate(" + d.x + "," + d.x + ")";
                }else{
                    if(d.x<=10)d.x=10;
                    if(d.x>=w-10)d.x=w-10;
                    if(d.y<=10)d.y=10;
                    if(d.y>=h-10)d.y=h-10;
                    return "translate(" + d.x + "," + d.y + ")";
                }
            })
            .attr("cursor", function(d) {return onCursorChange(d,0)});
            
            node.selectAll("circle")
                .style("fill",function(d){
                    if(d.rev.length==0)return "#FF00FF";
                    if(d.rev.length==1)return "#FF0099";
                    else return "#FF0000";
                })
                .attr("r", function(d){
                    if(d.new==true)return 5;
                    else return 10;
                })
                .attr('opacity', function(d){
                    if(d.new==true & over==false)return 0;
                    else return 1;
                })
                .attr('pointer-events', function(d){
                    if(d.new==true)return "none";
                    else return "auto";
                });
            
            overlapRect = [];
            node.selectAll("rect")
                .each(function(d) {
                    checkOverlap(d);
                })
            node.selectAll("rect")
                .attr("width",function(d){
                    if(d.id==create_film_id){
                        if(mousePoint[0]>d.fx)return mousePoint[0] - d.fx;
                        else return d.fx-mousePoint[0];
                    }else return d.width;
                })
                .attr("height",function(d){
                    if(d.id==create_film_id){
                        if(mousePoint[1]>d.fy)return mousePoint[1] - d.fy;
                        else return d.fy-mousePoint[1];
                    }else return d.height;
                })
                .style("stroke", function(d) {
                    for(elem of overlapRect){
                        if(d.id==elem.id){
                            return elem.overlap;
                        }
                    }
                })

            vis.selectAll("polygon")
                .each(function(d){
                    if(3000<=d.id & d.id<4000){
                        if(d.rev.length>1){
                            d.rev.splice(1,1);
                        }
                    }else if(4000<=d.id & d.id<5000){
                        if(d.rev.length>2){
                            d.rev.splice(2,1);
                        }
                    }
                })
                .attr('opacity', function(d){
                    if((d.id==-2||d.id==-3||d.new==true) & over==false)return 0;
                    else return 1;
                })
                .attr("points", function(d){
                    if(d.id==-2){
                        return "-5,5 5,5 5,-5 -5,-5";
                    }else if(1000<=d.id & d.id<2000){
                        return "-5,5 5,5 5,-5 -5,-5";
                    }else if(d.id==-3){
                        return "-4,5 6,0 -4,-5";
                    }else if(2000<=d.id & d.id<3000){
                        return "-8,10 12,0 -8,-10";
                    }else if(3000<=d.id & d.id<4000){
                        if(d.new==false)return "-10,10 10,10 10,-10 -10,-10";
                        else return "-5,5 5,5 5,-5 -5,-5";
                    }else if(4000<=d.id & d.id<5000){
                        if(d.new==false)return "-10,5 -5,10 5,10 10,5 10,-5 5,-10 -5,-10 -10,-5";
                        else return "-5,2.5 -2.5,5 2.5,5 5,2.5 5,-2.5 2.5,-5 -2.5,-5 -5,-2.5";
                    }
                })
                .attr('pointer-events', function(d){
                    if(d.id==-2||d.id==-3||d.new==true)return "none";
                    else return "auto";
                })

            node.selectAll("text")
            .text(function(d) {return d.name});
            
            update();
        })
        
        force.start();

    }

    update();
}


function subCanvas(id) {
    //変数
    var canvas = d3.select("#"+id);

    var w = 190, h = 260;
    var vis = canvas.append("svg:svg")
        .attr("class","subCanvas")
        .attr("id","subCanvas")
        .style("background-color", "#EEFFFF");

    
    var force = d3.layout.force()
        .gravity(0)
        .distance(100)
        .linkStrength(0)
        .charge(-100)
        .chargeDistance(30)
        .size([w, h])
        .friction(0.1);

    var nodes = force.nodes(),
        links = force.links(),
        rects = [];

    var state = [0, 0, 0, 0, 0, 0, 0, 0];

    const isAllEqual = array => array.every(value => value === array[0]);


    //ButtonClick メソッド
    this.onSelectButtonClick = function(){
        if(state[0]==1){
            removeNode(node_id-1);
            state[0]=0;
        }
        if(state[1]==1)state[1]=0;
        if(state[1]==2){
            removeNode(-1);
            state[1]=0;
        }
        if(state[2]==1){
            state[2]=0;
            removeNode(-2);
        }
        if(state[2]==2){
            removeFilm(film_id);
            film_id++;
            state[2]=0;
        }
        if(state[3]==1){
            removeNode(-3);
            state[3]=0;
        }
        if(state[4]==1){
            removeNode(freeLink_id-1);
            state[4]=0;
        }
        if(state[5]==1){
            removeNode(freeAtom_id-1);
            state[5]=0;
        }
        if(state[6]==1)state[6]=0;
        if(state[6]==2){
            selectedLinkReset();
            state[6]=0;
        }
        if(state[7]==1)state[7]=0;
    }

    this.onAtomButtonClick = function(){
        if(state[0]==0){
            this.onSelectButtonClick();
            state[0] = 1;
            addNode();
        }
    }

    var linking_id_resouce = null;
    var linking_id_target = null;
    this.onLinkButtonClick = function(){
        if(state[1]==0){
            this.onSelectButtonClick();
            state[1] = 1;
        }
    }

    var filming_point_1 = null;
    var filming_point_2 = null;
    this.onFilmButtonClick = function() {
        if(state[2]==0){
            this.onSelectButtonClick();
            state[2] = 1;
            nodes.push({"id":-2});
        }
    }

    this.onRuleButtonClick = function(){
        if(state[3]==0){
            this.onSelectButtonClick();
            state[3] = 1;
            nodes.push({"id":-3});
        }
    }

    this.onRemoveButtonClick = function(){
        if(state[7]==0){
            this.onSelectButtonClick();
            state[7] = 1;
        }
    }

    var changeAtom0 = null;
    var changeAtom1 = null;
    var changeAtom2 = null;
    this.onChangeButtonClick = function(){
        if(state[6]==0){
            this.onSelectButtonClick();
            state[6] = 1;
        }
    }
    
    this.onFreeLinkButtonClick = function(){
        if(state[4]==0){
            this.onSelectButtonClick();
            state[4] = 1;
            addFreeLink();
        }
    }

    this.onFreeAtomButtonClick = function(){
        if(state[5]==0){
            this.onSelectButtonClick();
            state[5] = 1;
            addFreeAtom();
        }
    }

    this.onOutputButtonClick = function(){
        this.onSelectButtonClick();
        return this.toRuleText();
    }


    //element click メソッド
    var atomClick = function(i){
        if(isAllEqual(state)){
            console.log("Atom:" + i + " is clicked");
        }
        if(state[0]==1||state[4]==1||state[5]==1){
            addLink(i, nodes[nodes.length-1].id);
            check = false;
        }
        if(state[1]==1){
            linking_id_resouce = i;
            nodes.push({"id":-1, "rev":[]});
            addLink(linking_id_resouce, -1);
            state[1] = 2;
        }else if(state[1]==2){
            linking_id_target = i;
            removeNode(-1);
            addLink(linking_id_resouce, linking_id_target);
            state[1] = 1;
        }
        if(state[6]==1){
            changeAtom0 = i;
            state[6] = 2;
        }else if(state[6]==2){
            changeAtom1 = i;
            state[6] = 3;
        }else if(state[6]==3){
            changeAtom2 = i;
            changeRev(changeAtom0, changeAtom1, changeAtom2);
            state[6] = 0;
        }
        if(state[7]==1)removeNode(i);
    }

    var changeAtom = null;
    var rev1 = null;
    var rev2 = null;
    var sourceLinkClick = function(id){
        if(isAllEqual(state)){
            console.log("sourceLink:" + id + " is clicked");
        }
        if(state[6]==1){
            for(i=0;i<links.length;i++){
                if(links[i].id==id){
                    links[i].selected = 1;
                    changeAtom = findNode(links[i].source.id);
                    for(j=0;j<changeAtom.rev.length;j++){
                        if(changeAtom.rev[j].id==id){
                            rev1 = j;
                            break;
                        }
                    }
                    state[6] = 2;
                    break;
                }
            }
        }else if(state[6]==2){
            for(i=0;i<links.length;i++){
                if(links[i].id==id){
                    if(changeAtom==findNode(links[i].source.id)){
                        for(j=0;j<changeAtom.rev.length;j++){
                            if(changeAtom.rev[j].id==id){
                                rev2 = j;
                                selectedLinkReset();
                                changeRev(changeAtom, rev1, rev2);
                                state[6] = 1;
                                break;
                            }
                        }
                        break;
                    }
                }
            }
        }
        if(state[7]==1)removeLink(id);
    }
    var targetLinkClick = function(id){
        if(isAllEqual(state)){
            console.log("targetLink:" + id + " is clicked");
        }
        if(state[6]==1){
            for(i=0;i<links.length;i++){
                if(links[i].id==id){
                    links[i].selected = 2;
                    changeAtom = findNode(links[i].target.id);
                    for(j=changeAtom.rev.length-1;j>=0;j--){
                        if(changeAtom.rev[j].id==id){
                            rev1 = j;
                            break;
                        }
                    }
                    state[6] = 2;
                    break;
                }
            }
        }else if(state[6]==2){
            for(i=0;i<links.length;i++){
                if(links[i].id==id){
                    if(changeAtom==findNode(links[i].target.id)){
                        for(j=changeAtom.rev.length-1;j>=0;j--){
                            if(changeAtom.rev[j].id==id){
                                rev2 = j;
                                selectedLinkReset();
                                changeRev(changeAtom, rev1, rev2);
                                state[6] = 1;
                                break;
                            }
                        }
                        break;
                    }
                }
            }
        }
        if(state[7]==1)removeLink(id);
    }

    var filmClick = function(i){
        if(isAllEqual(state)){
            console.log("film:" + i + " is clicked");
        }
        if(state[7]==1)removeNode(i);
    }

    var ruleClick = function(i){
        if(isAllEqual(state)){
            console.log("rule:" + i + " is clicked");
        }
        if(state[7]==1)removeNode(i);
    }

    var freeLinkClick = function(i){
        if(isAllEqual(state)){
            console.log("freeLink:" + i + " is clicked");
        }
        if(state[0]==1||state[4]==1||state[5]==1){
            addLink(i, nodes[nodes.length-1].id);
            check = false;
        }
        if(state[1]==1){
            linking_id_resouce = i;
            nodes.push({"id":-1, "rev":[]});
            addLink(linking_id_resouce, -1);
            state[1] = 2;
        }else if(state[1]==2){
            linking_id_target = i;
            removeNode(-1);
            addLink(linking_id_resouce, linking_id_target);
            state[1] = 1;
        }
        if(state[6]==1){
            changeAtom0 = i;
            state[6] = 2;
        }else if(state[6]==2){
            changeAtom1 = i;
            state[6] = 3;
        }else if(state[6]==3){
            changeAtom2 = i;
            changeRev(changeAtom0, changeAtom1, changeAtom2);
            state[6] = 0;
        }
        if(state[7]==1)removeNode(i);
    }

    var freeAtomClick = function(i){
        if(isAllEqual(state)){
            console.log("freeAtom:" + i + " is clicked");
        }if(state[0]==1||state[4]==1||state[5]==1){
            addLink(i, nodes[nodes.length-1].id);
            check = false;
        }
        if(state[1]==1){
            linking_id_resouce = i;
            nodes.push({"id":-1, "rev":[]});
            addLink(linking_id_resouce, -1);
            state[1] = 2;
        }else if(state[1]==2){
            linking_id_target = i;
            removeNode(-1);
            addLink(linking_id_resouce, linking_id_target);
            state[1] = 1;
        }
        if(state[6]==1){
            changeAtom0 = i;
            state[6] = 2;
        }else if(state[6]==2){
            changeAtom1 = i;
            state[6] = 3;
        }else if(state[6]==3){
            changeAtom2 = i;
            changeRev(changeAtom0, changeAtom1, changeAtom2);
            state[6] = 0;
        }
        if(state[7]==1)removeNode(i);
    }

    //その他のメソッド    
    var node_id = 0;
    var addNode = function () {
        if(node_id>=1000)return;
        nodes.push({"id":node_id, "name":"", "rev":[], "newNodeCount":2, "new":true});
        node_id += 1;
    }

    var removeNode = function (id) {
        var i = 0;
        var n = findNode(id);
        var deleate_link_id;
        while (i < links.length) {
            if ((links[i]['source'] === n)||(links[i]['target'] == n)){
                deleate_link_id=links[i].id;
                links.splice(i,1);
                for(j=0;j<nodes.length;j++){
                    if(nodes[j].rev==undefined)continue;
                    for(k=0;k<nodes[j].rev.length;k++){
                        if(nodes[j].rev==undefined)break;
                        if(nodes[j].rev[k].id==deleate_link_id)nodes[j].rev.splice(k,1);
                    }
                }
            }
            else i++;
        }
        var index = findNodeIndex(id);
        if(index !== undefined) {
            nodes.splice(index, 1);
        }
    }

    var link_id = 0;
    var addLink = function (sourceId, targetId) {
        if(sourceId>targetId)[sourceId, targetId] = [targetId, sourceId];
        var sourceNode = findNode(sourceId);
        var targetNode = findNode(targetId);
        if(3000<=sourceId & sourceId<4000){
            if(sourceNode.rev[0]!==undefined){
                removeLink(sourceNode.rev[0].id);
                sourceNode.rev=[];
            }
        }else if(4000<=sourceId & sourceId<5000){
            if(sourceNode.rev[1]!==undefined){
                removeLink(sourceNode.rev[0].id);
            }
        }
        if(3000<=targetId & targetId<4000){
            if(targetNode.rev[0]!==undefined){
                removeLink(targetNode.rev[0]);
                targetNode.rev=[];
            }
        }else if(4000<=targetId & targetId<5000){
            if(targetNode.rev[1]!==undefined){
                removeLink(targetNode.rev[0]);
            }
        }
        sourceNode.rev.push({"id": link_id});
        targetNode.rev.push({"id": link_id});
        if((sourceNode !== undefined) && (targetNode !== undefined)) {
            var linkNumber = 1;
            for(elem of links){
                if(sourceNode==elem.source & targetNode==elem.target){
                    linkNumber++;
                }
            }
            links.push({"id": link_id, "source": sourceNode, "target": targetNode, "number":linkNumber, "maxNumber":linkNumber, "selected":0});
            for(elem of links){
                if(sourceNode==elem.source & targetNode==elem.target){
                    elem.maxNumber = linkNumber;
                }
            }
            update();
        }
        link_id += 1;
    }

    var removeLink = function(link_id){
        for(i=0;i<links.length;i++){
            if(links[i].id==link_id){
                links.splice(i,1);
            }
        }
        for(i=0;i<nodes.length;i++){
            if(nodes[i].rev==undefined)continue;
            for(j=0;j<nodes[i].rev.length;j++){
                if(nodes[i].rev[j].id==link_id){
                    nodes[i].rev.splice(j,1);
                }
            }
        }
    }

    this.removeLink = function(link_id){
        for(i=0;i<links.length;i++){
            if(links[i].id==link_id){
                links.splice(i,1);
            }
        }
        for(i=0;i<nodes.length;i++){
            if(nodes[i].rev==undefined)continue;
            for(j=0;j<nodes[i].rev.length;j++){
                if(nodes[i].rev[j].id==link_id){
                    nodes[i].rev.splice(j,1);
                }
            }
        }
    }

    var changeRev = function(changeAtom, rev1, rev2){
        if(rev1==rev2)return;
        [changeAtom.rev[rev1].id, changeAtom.rev[rev2].id] = [changeAtom.rev[rev2].id, changeAtom.rev[rev1].id];
    }

    var selectedLinkReset = function(){
        for(elem of links)elem.selected = 0;
    }

    var film_id = 1000;
    var new_film_id = null;
    var new_film_count = 0;
    var create_film_id = null;
    var addFilm = function (x1, y1, x2, y2){
        if(film_id>=2000)return;
        if(x1>x2)[x1, x2] = [x2, x1];
        if(y1>y2)[y1, y2] = [y2, y1];
        nodes.push({"id":film_id,"fx":x1,"fy":y1,"width":x2-x1,"height":y2-y1});
        new_film_id = film_id;
        new_film_count = 2;
    }

    var addRect = function (x1, y1, x2, y2){
        if(film_id>=2000)return;
        if(x1>x2)[x1, x2] = [x2, x1];
        if(y1>y2)[y1, y2] = [y2, y1];
        rects.push({"id":film_id,"x":x1,"y":y1,"width":x2-x1,"height":y2-y1,"area":(x2-x1)*(y2-y1)});
        rects.sort(function(first, second){
            return first.area - second.area;
        });
    }

    var removeFilm = function(film_id){
        for(i=0;i<rects.length;i++){
            if(rects[i].id==film_id)rects.splice(i,1);
        }
        for(i=0;i<nodes.length;i++){
            if(nodes[i].id==film_id){
                nodes.splice(i,1);
            }
        }
    }
    
    
    var rule_id = 2000;
    var addRule = function (name) {
        if(rule_id>=3000)return;
        nodes.push({"id":rule_id, "name":name, "newNodeCount":2, "new":false});
        rule_id++;
    }

    this.removeRule = function (rule_id) {
        for(i=0;i<nodes.length;i++){
            if(nodes[i].id==rule_id)nodes.splice(i,1);
        }
    }

    var freeLink_id = 3000;
    var addFreeLink = function () {
        if(freeLink_id>=4000)return;
        nodes.push({"id":freeLink_id, "name":"", "rev":[], "new":true});
        new_node_id = freeLink_id;
        new_node_count = 2;
        freeLink_id += 1;
    }

    var removeFreeLink = function(id){
        removeNode(id);
    }

    var freeAtom_id = 4000;
    var addFreeAtom = function () {
        if(freeAtom_id>=5000)return;
        nodes.push({"id":freeAtom_id, "name":"", "rev":[], "new":true});
        new_node_id = freeAtom_id;
        new_node_count = 2;
        freeAtom_id += 1;
    }

    var removeFreeAtom = function(id){
        removeNode(id);
    }

    var nodeToText = function(atom_id) {
        var atom_text = "";
        var atom = findNode(atom_id);
        if(atom.name=="." |atom.name=="[]"|!isNaN(atom.name)){
            atom_text = atom_text + "'" + atom.name + "'";
        }else{
            atom_text = atom_text + atom.name;
        }
        var rev_length = atom.rev.length;
        if(rev_length>0){
            for(i=0;i<rev_length;i++){
                if(i==0){
                    atom_text = atom_text + "(L"  + atom.rev[i].id.toString().padStart(4, '0');
                }else{
                    atom_text = atom_text + ",L" + atom.rev[i].id.toString().padStart(4, '0');
                }
            }
            atom_text = atom_text + ")"
        }
        return atom_text;
    }

    this.toRuleText = function(){
        var rect_info = []
        for(var elem of rects){
            vis.selectAll("rect")
                .each(function(d){
                    if(d.id==elem.id){
                        rect_info.push({"id":d.id,"x1":d.x,"y1":d.y,"x2":d.x+d.width,"y2":d.y+d.height,"text":""});
                    }
                })
        }
        rect_info.push({"id":-1,"x1":0,"y1":0,"x2":w,"y2":h,"text":""})
        var prev_id = null;
        vis.selectAll("circle")
            .each(function(d){
                if(d.new==true)return;
                if(prev_id==d.id)return;
                prev_id = d.id;
                if(d.name==undefined)return;
                for(var elem of rect_info){
                    if(elem.x1<=d.x & d.x<=elem.x2 & elem.y1<=d.y & d.y<=elem.y2){
                        if(elem.text==""){
                            elem.text = nodeToText(d.id);
                        }else{
                            elem.text = elem.text + "," + nodeToText(d.id);
                        }
                        break;
                    }
                }
            })
        
        for(i=0;i<rect_info.length;i++){
            var rect1 = rect_info[i];
            for(j=i+1;j<rect_info.length;j++){
                var rect2 = rect_info[j];
                if(rect2.x1<=rect1.x1 & rect1.x2<=rect2.x2 & rect2.y1<=rect1.y1 & rect1.y2<=rect2.y2){
                    if(rect2.text==""){
                        rect2.text = "{" + rect1.text + "}";
                    }else{
                        rect2.text = rect2.text + ",{" + rect1.text + "}"
                    }
                    break;
                }
            }
        }

        var returnText = rect_info[rect_info.length-1].text;

        vis.selectAll("polygon")
            .each(function(d){
                var temp = returnText;
                returnText = returnText.replace("L"+d.rev[0].id.toString().padStart(4, '0'), d.name);
                if(temp == returnText){
                    if(returnText == "")returnText = returnText + d.name + "=L" + d.rev[0].id.toString().padStart(4, '0');
                    else returnText = returnText + "," + d.name + "=L" + d.rev[0].id.toString().padStart(4, '0');
                }
            })
        return returnText;
    }
    /*
    this.toRuleText = function(){
        var rect_info = []
        for(var elem of rects){
            vis.selectAll("rect")
                .each(function(d){
                    if(d.id==elem.id){
                        rect_info.push({"id":d.id,"x1":d.x,"y1":d.y,"x2":d.x+d.width,"y2":d.y+d.height,"text":""});
                    }
                })
        }
        rect_info.push({"id":-1,"x1":0,"y1":0,"x2":w,"y2":h,"text":""})
        var prev_id = null;
        vis.selectAll("circle")
            .each(function(d){
                if(d.new==true)return;
                if(prev_id==d.id)return;
                prev_id = d.id;
                if(d.name==undefined)return;
                for(var elem of rect_info){
                    if(elem.x1<=d.x & d.x<=elem.x2 & elem.y1<=d.y & d.y<=elem.y2){
                        if(elem.text==""){
                            elem.text = nodeToText(d.id);
                        }else{
                            elem.text = elem.text + "," + nodeToText(d.id);
                        }
                        break;
                    }
                }
            })
        for(i=0;i<rect_info.length;i++){
            var rect1 = rect_info[i];
            for(j=i+1;j<rect_info.length;j++){
                var rect2 = rect_info[j];
                if(rect2.x1<=rect1.x1 & rect1.x2<=rect2.x2 & rect2.y1<=rect1.y1 & rect1.y2<=rect2.y2){
                    if(rect2.text==""){
                        rect2.text = "{" + rect1.text + "}";
                    }else{
                        rect2.text = rect2.text + ",{" + rect1.text + "}"
                    }
                    break;
                }
            }
        }
        var returnText = rect_info[rect_info.length-1].text;
        var freeLinks = [];
        var freeAtoms = [];
        vis.selectAll("polygon")
            .each(function(d){
                if(3000<=d.id & d.id<4000){
                    if(d.rev.length==1){
                        freeLinks.push({"id":d.id,"name":d.name,"rev":d.rev,"text":"|"+d.name+"]","single":true});
                    }
                }else if(4000<=d.id & d.id<5000){
                    if(d.rev.length==2){
                        freeAtoms.push({"id":d.id,"name":d.name,"rev":d.rev});
                    }
                }
            })
            for(i=0;i<freeLinks.length;i++){
                var find_rev = freeLinks[i].rev[0].id;
                var find_id = freeLinks[i].id;
                for(j=0;j<freeAtoms.length;j++){
                    for(k=0;k<freeAtoms.length;k++){
                        try{
                            var comp = [freeAtoms[k].rev[0].id,freeAtoms[k].rev[1].id,freeAtoms[k].name,freeAtoms[k].id];
                        }catch(error){
                            console.log(error);
                        }
                        if(comp[0] == find_rev & comp[3]!==find_id){
                            if(freeLinks[i].single==true){
                                freeLinks[i].single=false;
                                freeLinks[i].text = comp[2] + freeLinks[i].text;
                            }else{
                                freeLinks[i].text = comp[2] + "," + freeLinks[i].text;
                            }
                            find_rev = comp[1];
                            find_id = comp[3];
                            continue;
                        }else if(comp[1] == find_rev & comp[3]!==find_id){
                            if(freeLinks[i].single==true){
                                freeLinks[i].single=false;
                                freeLinks[i].text = comp[2] + freeLinks[i].text;
                            }else{
                                freeLinks[i].text = comp[2] + "," + freeLinks[i].text;
                            }
                            find_rev = comp[0];
                            find_id = comp[3];
                            continue;
                        }
                    }
                }
                freeLinks[i].rev.push({"id":find_rev});
            }
            for(elem of freeLinks){
                if(elem.single){
                    returnText = returnText.replace("L"+elem.rev[0].id.toString().padStart(4, '0'),elem.name);
                }else{
                    returnText = returnText + ",L" + elem.rev[1].id.toString().padStart(4, '0') + "=[" + elem.text;
                }
            }
            return returnText;
    }*/

    var findNode = function (id) {
        for (var i=0; i < nodes.length; i++) {
            if (nodes[i].id === id)
                return nodes[i]
        };
    }

    var findNodeIndex = function (id) {
        for (var i=0; i < nodes.length; i++) {
            if (nodes[i].id === id)
                return i
        };
    }

    var linkCollor =function(d,b){
        var n = null;
        if(b==1){
            if(3000<=d.source.id & d.source.id<5000|d.source.id==-1){
                return "black"
            }
            for (i=0;i<d.source.rev.length;i++){
                if(d.id==d.source.rev[i].id){
                    n = i;
                    break;
                }
            }
        }
        if(b==2){
            if((3000<=d.target.id & d.target.id<5000)){
                return "black"
            }
            for (i=d.target.rev.length-1;i>=0;i--){
                if(d.id==d.target.rev[i].id){
                    n = i;
                    break;
                }
            }
        }
        switch(n){
            case 0: return "red"; break;
            case 1: return "blue"; break;
            case 2: return "yellow"; break;
            case 3: return "orange"; break;
            case 4: return "green"; break;
            case 5: return "purple"; break;
            case 6: return "lime"; break;
            case 7: return "aqua"; break;
            case 8: return "fuchsia"; break;
            case 9: return "olive"; break;
            default: return "black"
        }
    }

    var carveDraw1 = function(d,p){
        return "M"+d.source.x+","+d.source.y
                +" Q"+((d.target.x+3*d.source.x)/4-p*0.1*(d.target.y-d.source.y))+","+((d.target.y+3*d.source.y)/4+p*0.1*(d.target.x-d.source.x))
                +" "+((d.target.x+d.source.x)/2-p*0.1*(d.target.y-d.source.y))+","+((d.target.y+d.source.y)/2+p*0.1*(d.target.x-d.source.x));
    }

    var carveDraw2 = function(d,p){
        return "M"+((d.target.x+d.source.x)/2-p*0.1*(d.target.y-d.source.y))+","+((d.target.y+d.source.y)/2+p*0.1*(d.target.x-d.source.x))
                +" Q"+((3*d.target.x+d.source.x)/4-p*0.1*(d.target.y-d.source.y))+","+((3*d.target.y+d.source.y)/4+p*0.1*(d.target.x-d.source.x))
                +" "+d.target.x+","+d.target.y;
    }

    var circleDraw1 = function(d,p){
        return "M"+d.source.x+","+d.source.y+" a"+ p*10+","+p*10+" -180 0 1"+p*10*2+","+0;
    }

    var circleDraw2 = function(d,p){
        return "M"+(d.source.x+p*10*2)+","+d.source.y+" a"+ p*10+","+p*10+" 0 0 1"+p*10*(-2)+","+0;
    }

    var carveDraw = function(d,b){
        var n = null;
        if(d.source==d.target){
            if(d.number==1) n = 1;
            else if(d.number==2) n = -1;
            else if(d.number==3) n = 1.5;
            else if(d.number==4) n = -1.5;
            else if(d.number==5) n = 2;
            else return "";
            if(b==1)return circleDraw1(d,n);
            else if(b==2)return circleDraw2(d,n);
        }else{
            if(d.maxNumber%2==1){
                if(d.number==1) return "";
                else if(d.number==2) n = 1;
                else if(d.number==3) n = -1;
                else if(d.number==4) n = 2;
                else if(d.number==5) n = -2;
                else return "";
            }else if(d.maxNumber%2==0){
                if(d.number==1) n = 0.5;
                else if(d.number==2) n = -0.5;
                else if(d.number==3) n = 1.5;
                else if(d.number==4) n = -1.5;
                else if(d.number==5) n = 2;
                else return "";
            }
            if(b==1)return carveDraw1(d,n);
            else if(b==2)return carveDraw2(d,n);
        }
    }

    var onCursorChange = function(d, b){
        if(b==1){
            if(isAllEqual(state))return "auto";
            else if(state[0]!==0)return "auto";
            else if(state[1]!==0)return "auto";
            else if(state[2]!==0)return "auto";
            else if(state[3]!==0)return "auto";
            else if(state[4]!==0)return "auto";
            else if(state[5]!==0)return "auto";
            else if(state[6]!==0)return "url(css/change.png),auto";
            else if(state[7]!==0)return "url(css/sissors.png),auto";
        }else if((0<=d.id & d.id<1000)|(3000<=d.id & d.id<5000)){
            if(isAllEqual(state))return "pointer";
            else if(state[0]!==0)return "url(css/pencil.png),auto";
            else if(state[1]!==0)return "url(css/pencil.png),auto";
            else if(state[2]!==0)return "auto";
            else if(state[3]!==0)return "auto";
            else if(state[4]!==0)return "url(css/pencil.png),auto";
            else if(state[5]!==0)return "url(css/pencil.png),auto";
            else if(state[6]!==0)return "auto";
            else if(state[7]!==0)return "url(css/sissors.png),auto";
        }else if(1000<=d.id & d.id<2000){
            if(isAllEqual(state))return "pointer";
            else if(state[0]!==0)return "auto";
            else if(state[1]!==0)return "auto";
            else if(state[2]!==0)return "auto";
            else if(state[3]!==0)return "auto";
            else if(state[4]!==0)return "auto";
            else if(state[5]!==0)return "auto";
            else if(state[6]!==0)return "auto";
            else if(state[7]!==0)return "url(css/sissors.png),auto";
        }
    }

    var linkNodeMode = false;
    var listNodeMode = false;
    var listNode = "";
    var checkText = function(){
        linkNodeMode = false;
        listNodeMode = false;
        var textValue = "";
        var myTextValue = inputText.value;
        if(myTextValue.charAt(0)=="[" & myTextValue.charAt(myTextValue.length-1)=="]" & myTextValue.length>2){
            listNodeMode = true;
            myTextValue = myTextValue.slice(1);
            myTextValue = myTextValue.slice(0,-1);
        }
        if(myTextValue.indexOf(' ')==-1 & myTextValue.indexOf(',')==-1){
            if(listNodeMode){
                inputText.value = "[]"
                listNode = myTextValue;
                return ".";
            }else return myTextValue;
        }
        while(myTextValue!=""){
            if(myTextValue.charAt(0)==" "){
                myTextValue = myTextValue.slice(1);
                break;
            }else if(myTextValue.charAt(0)==","){
                linkNodeMode = true;
                myTextValue = myTextValue.slice(1);
                break;
            }else{
                textValue = textValue + myTextValue.charAt(0);
                myTextValue = myTextValue.slice(1);
            }
        }
        if(listNodeMode){
            inputText.value = "["+myTextValue+"]";
            listNode = textValue;
            return ".";
        }else{
            inputText.value = myTextValue;
            return textValue;
        }
    }

    var overlapRect = [];
    var checkOverlap = function(d){
        var x1 = d.x, y1 = d.y, x2 = d.x+d.width, y2 = d.y+d.height;
        var overlap = "black";
        for(elem of overlapRect){
            var xCheck = "none";
            var yCheck = "none";
            if((elem.x1<x1 & x1<elem.x2 & elem.x2<x2) | (x1<elem.x1 & elem.x1<x2 & x2<elem.x2))xCheck="part";
            else if(elem.x1<x1 & x2<elem.x2)xCheck="small";
            else if(x1<elem.x1 & elem.x2<x2)xCheck="big";
            if((elem.y1<y1 & y1<elem.y2 & elem.y2<y2) | (y1<elem.y1 & elem.y1<y2 & y2<elem.y2))yCheck="part";
            else if(elem.y1<y1 & y2<elem.y2)yCheck="small";
            else if(y1<elem.y1 & elem.y2<y2)yCheck="big";
            if(!(xCheck=="none" | yCheck=="none" | (xCheck=="small" & yCheck=="small") | (xCheck=="big" & yCheck=="big"))){
                overlap="red";
                elem.overlap = "red";
            }
        }
        overlapRect.push({"id":d.id, "x1":x1, "y1":y1, "x2":x2, "y2":y2, "overlap":overlap});
    }

    var headUpper = function(text){
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    var headLower = function(text){
        return text.charAt(0).toLowerCase() + text.slice(1);
    }

    //on メソッド
    var over = false;
    var check = true;
    var mousePoint = [w/2,h/2];
    vis.on("click",function(){
        if(state[0]==1){
            if(check==true){
                nodes[nodes.length-1].new=false;
                nodes[nodes.length-1].name=headLower(checkText());
                addNode();
                if(listNodeMode){
                    nodes[nodes.length-1].new=false;
                    nodes[nodes.length-1].name=headLower(listNode);
                    addNode();
                    addLink(nodes[nodes.length-3].id, nodes[nodes.length-2].id);
                    addLink(nodes[nodes.length-3].id, nodes[nodes.length-1].id);
                    if(nodes[nodes.length-3].rev.length==3){
                        changeRev(nodes[nodes.length-3],0,1);
                        changeRev(nodes[nodes.length-3],1,2);
                    }
                }else if(linkNodeMode)addLink(nodes[nodes.length-2].id, nodes[nodes.length-1].id);
            }else{
                check = true;
            }
        }
        if(state[2]==1){
            removeNode(-2);
            filming_point_1 = d3.mouse(this);
            addFilm(mousePoint[0],mousePoint[1],mousePoint[0],mousePoint[1]);
            create_film_id = film_id;
            state[2] = 2;
        }else if(state[2]==2){
            filming_point_2 = d3.mouse(this);
            create_film_id = null;
            removeFilm(film_id);
            film_id++;
            addRect(filming_point_1[0],filming_point_1[1],filming_point_2[0],filming_point_2[1]);
            addFilm(filming_point_1[0],filming_point_1[1],filming_point_2[0],filming_point_2[1]);
            film_id++;
            state[2] = 1;
            nodes.push({"id":-2});
        }
        if(state[3]==1){
            var value = inputText.value;
            addRule(value);
        }
        if(state[4]==1){
            if(check==true){
                nodes[nodes.length-1].new=false;
                nodes[nodes.length-1].name=headUpper(inputText.value);
                addFreeLink();
                if(linkNodeMode)addLink(nodes[nodes.length-2].id, nodes[nodes.length-1].id);
            }else{
                check = true;
            }
        }
        if(state[5]==1){
            if(check==true){
                nodes[nodes.length-1].new=false;
                nodes[nodes.length-1].name=headUpper(checkText());
                addFreeAtom();
                if(linkNodeMode)addLink(nodes[nodes.length-2].id, nodes[nodes.length-1].id);
            }else{
                check = true;
            }
        }
    })
    .on("mouseover",function() {over = true})
    .on("mouseout",function() {over = false})
    .on("mousemove",function(){
        mousePoint = d3.mouse(this);
    });

    //update メソッド
    var update = function () {
        w = parseInt(getComputedStyle(document.getElementById("subCanvas")).width);
        h = parseInt(getComputedStyle(document.getElementById("subCanvas")).height);

        var link = vis.selectAll("g.link")
            .data(links, function(d) { return d.id + "-" + d.source.id + "-" + d.target.id + "-" + d.number + "-" + d.maxNumber ; });
        linkEnter = link.enter().insert("g", ':first-child')
            .attr("class","link");

        linkEnter.append("line")
            .attr("class", "link1")
            .style("stroke-width", 3)
            .on("click", function(d,i){ sourceLinkClick(d.id); });

        linkEnter.append("path")
            .attr("class", "path1")
            .style("stroke-width", 3)
            .style("fill","none")
            .on("click", function(d,i){ sourceLinkClick(d.id); });
            
        linkEnter.append("line")
            .attr("class", "link2")
            .style("stroke-width", 3)
            .on("click", function(d,i){ targetLinkClick(d.id); });
            
        linkEnter.append("path")
            .attr("class", "path2")
            .style("stroke-width", 3)
            .style("fill","none")
            .on("click", function(d,i){ targetLinkClick(d.id); });

        link.exit().remove();

        var node = vis.selectAll("g.node")
            .data(nodes, function(d) { return d.id;});
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .call(force.drag);

        nodeEnter.each(function(d){
                if(0<=d.id & d.id<1000){
                    nodeEnter.append("circle")
                        .attr("class", "circle")
                        .style("fill", "#FF0000")
                        .style({stroke: "black",
                            "stroke-width": 1
                        })
                        .on("click", function(d,i){ atomClick(d.id); })
                        .call(force.drag);
                }else if(d.id==-2){
                    nodeEnter.insert("polygon", ':first-child')
                        .style("fill", "#AAAAAA")
                        .style({stroke: "black",
                            "stroke-width": 1
                        });
                }else if(1000<=d.id & d.id<2000){
                    nodeEnter.insert("polygon", ':first-child')
                        .style("fill", "#AAAAAA")
                        .style({stroke: "black",
                            "stroke-width": 1
                        })
                        .on("click", function(d,i){ filmClick(d.id); });
                    nodeEnter.insert("rect", ':first-child')
                        .attr('width',function(d) {return d.width})
                        .attr('height',function(d) {return d.height})
                        .attr('fill-opacity', 0.05)
                        .style({stroke: "black",
                            "stroke-width": 1
                        })
                        .attr('pointer-events', "none");
                }else if(d.id==-3){
                    nodeEnter.append("polygon")
                        .style("fill", "#75A9FF")
                        .style({stroke: "black",
                            "stroke-width": 1
                        });
                }else if(2000<=d.id & d.id<3000){
                    nodeEnter.append("polygon")
                        .style("fill", "#75A9FF")
                        .style({stroke: "black",
                            "stroke-width": 1
                        })
                        .on("click", function(d,i){ ruleClick(d.id); })
                        .call(force.drag);
                }else if(3000<=d.id & d.id<4000){
                    nodeEnter.append("polygon")
                        .style("fill", "yellow")
                        .style({stroke: "black",
                            "stroke-width": 1
                        })
                        .on("click", function(d,i){ freeLinkClick(d.id); })
                        .call(force.drag);
                }else if(4000<=d.id & d.id<5000){
                    nodeEnter.append("polygon")
                        .style("fill", "#FF773E")
                        .style({stroke: "black",
                            "stroke-width": 1
                        })
                        .on("click", function(d,i){ freeAtomClick(d.id); })
                        .call(force.drag);
                }
            });
        
        nodeEnter.append("text")
            .attr("class", "nodetext")
            .attr({
                "text-anchor":"middle",
                "dominant-baseline":"central",
                "fill":"black",
                "font-size": "9px"
            })
            .attr("pointer-events", "none")
        node.exit().remove();

        //tick メソッド
        force.on("tick", function() {
            link.attr("cursor", function(d) {return onCursorChange(d,1)})

            link.selectAll("line.link1")
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return (d.target.x+d.source.x)/2; })
                .attr("y2", function(d) { return (d.target.y+d.source.y)/2; })
                .style("stroke", function(d) { if(d.maxNumber%2==1)return linkCollor(d,1)})
                .style("stroke-width", function(d) {
                    if(d.selected==1)return 1;
                    else return 3;
                });

            link.selectAll("path.path1")
                .attr('d', function(d) {return carveDraw(d,1)})
                .style("stroke", function(d) { return linkCollor(d,1)})
                .style("stroke-width", function(d) {
                    if(d.selected==1)return 1;
                    else return 3;
                });
            
            link.selectAll("line.link2")
                .attr("x1", function(d) { return (d.target.x+d.source.x)/2; })
                .attr("y1", function(d) { return (d.target.y+d.source.y)/2; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; })
                .style("stroke", function(d) { if(d.maxNumber%2==1)return linkCollor(d,2)})
                .style("stroke-width", function(d) {
                    if(d.selected==2)return 1;
                    else return 3;
                });

            link.selectAll("path.path2")
                .attr('d', function(d) {return carveDraw(d,2)})
                .style("stroke", function(d) { return linkCollor(d,2)})
                .style("stroke-width", function(d) {
                    if(d.selected==2)return 1;
                    else return 3;
                });

            node.attr("transform", function(d) { 
                if(d.id==-1||d.id==-2||d.id==-3||d.new==true){
                    d.x=mousePoint[0];
                    d.y=mousePoint[1];
                    return "translate(" + d.x + "," + d.y + ")";
                }
                if(d.id==create_film_id){
                    var x1,y1;
                    if(d.fx>mousePoint[0])x1 = mousePoint[0];
                    else x1 = d.fx;
                    if(d.fy>mousePoint[1])y1 = mousePoint[1];
                    else y1 = d.fy;
                    return "translate(" + x1 + "," + y1 + ")";
                }else if(d.id==new_film_id){
                    d.x = d.fx;
                    d.y = d.fy;
                    new_film_count--;
                    if(new_film_count<=0)new_film_id = null;
                    return "translate(" + d.x + "," + d.y + ")";
                }
                if(1000<=d.id & d.id<2000){
                    if(d.x<=5)d.x=5;
                    if(d.x+d.width>=w)d.x=w-d.width;
                    if(d.y<=5)d.y=5;
                    if(d.y+d.height>=h)d.y=h-d.height;
                    return "translate(" + d.x + "," + d.y + ")";
                }
                if(d.newNodeCount>=0){
                    d.x=mousePoint[0];
                    d.y=mousePoint[1];
                    d.newNodeCount--;
                    return "translate(" + d.x + "," + d.x + ")";
                }else{
                    if(d.x<=10)d.x=10;
                    if(d.x>=w-10)d.x=w-10;
                    if(d.y<=10)d.y=10;
                    if(d.y>=h-10)d.y=h-10;
                    return "translate(" + d.x + "," + d.y + ")";
                }
            })
            .attr("cursor", function(d) {return onCursorChange(d,0)});
            
            node.selectAll("circle")
                .style("fill",function(d){
                    if(d.rev.length==0)return "#FF00FF";
                    if(d.rev.length==1)return "#FF0099";
                    else return "#FF0000";
                })
                .attr("r", function(d){
                    if(d.new==true)return 5;
                    else return 10;
                })
                .attr('opacity', function(d){
                    if(d.new==true & over==false)return 0;
                    else return 1;
                })
                .attr('pointer-events', function(d){
                    if(d.new==true)return "none";
                    else return "auto";
                });
            
            overlapRect = [];
            node.selectAll("rect")
                .each(function(d) {
                    checkOverlap(d);
                })
            node.selectAll("rect")
                .attr("width",function(d){
                    if(d.id==create_film_id){
                        if(mousePoint[0]>d.fx)return mousePoint[0] - d.fx;
                        else return d.fx-mousePoint[0];
                    }else return d.width;
                })
                .attr("height",function(d){
                    if(d.id==create_film_id){
                        if(mousePoint[1]>d.fy)return mousePoint[1] - d.fy;
                        else return d.fy-mousePoint[1];
                    }else return d.height;
                })
                .style("stroke", function(d) {
                    for(elem of overlapRect){
                        if(d.id==elem.id){
                            return elem.overlap;
                        }
                    }
                })

            vis.selectAll("polygon")
                .each(function(d){
                    if(3000<=d.id & d.id<4000){
                        if(d.rev.length>1){
                            d.rev.splice(1,1);
                        }
                    }else if(4000<=d.id & d.id<5000){
                        if(d.rev.length>2){
                            d.rev.splice(2,1);
                        }
                    }
                })
                .attr('opacity', function(d){
                    if((d.id==-2||d.id==-3||d.new==true) & over==false)return 0;
                    else return 1;
                })
                .attr("points", function(d){
                    if(d.id==-2){
                        return "-5,5 5,5 5,-5 -5,-5";
                    }else if(1000<=d.id & d.id<2000){
                        return "-5,5 5,5 5,-5 -5,-5";
                    }else if(d.id==-3){
                        return "-4,5 6,0 -4,-5";
                    }else if(2000<=d.id & d.id<3000){
                        return "-8,10 12,0 -8,-10";
                    }else if(3000<=d.id & d.id<4000){
                        if(d.new==false)return "-10,10 10,10 10,-10 -10,-10";
                        else return "-5,5 5,5 5,-5 -5,-5";
                    }else if(4000<=d.id & d.id<5000){
                        if(d.new==false)return "-10,5 -5,10 5,10 10,5 10,-5 5,-10 -5,-10 -10,-5";
                        else return "-5,2.5 -2.5,5 2.5,5 5,2.5 5,-2.5 2.5,-5 -2.5,-5 -5,-2.5";
                    }
                })
                .attr('pointer-events', function(d){
                    if(d.id==-2||d.id==-3||d.new==true)return "none";
                    else return "auto";
                })

            node.selectAll("text")
            .text(function(d) {return d.name});
            
            update();
        })
        
        force.start();

    }

    update();
}


function Guard(id){
    var canvas = d3.select("#"+id);
    canvas.append("form")
        .attr("id", "guardForm")
        .attr("name", "guardForm");
    var guardText = Array(8);
    for(i=0;i<8;i++){
        guardText[i] = canvas.select("#guardForm")
            .append("input")
            .attr("class", "guardText")
            .attr("id", "guardText"+i)
            .attr("name", "guardText"+i)
            .attr("type", "text")
            .style("display","none");
    }
    canvas.select("#guardForm")
        .append("input")
        .attr("name", "dummy")
        .attr("type", "text")
        .style("display","none");

    this.update = function(){
        var data = [];
        for(i=0;i<8;i++){
            if(guardText[i][0][0].value!=""){
                data.push({"id":i, "text":guardText[i][0][0].value});
                guardText[i][0][0].value = "";
            }
        }
        for(i=0;i<8;i++){
            if(i<=data.length)canvas.select("#guardText"+i).style("display", "block");
            else canvas.select("#guardText"+i).style("display", "none");
            if(i<data.length) guardText[i][0][0].value = data[i].text;
        }
    }
    this.update();

    this.toText = function(){
        var return_text = "";
        for(elem of guardText){
            if(elem[0][0].value == "")continue;
            if(return_text == ""){
                return_text = elem[0][0].value;
            }else{
                return_text = return_text + "," + elem[0][0].value;
            }
        }
        if(return_text == "")return return_text;
        else return return_text + "|";
    }
}

main = new MainCanvas("#main");
manager = new Manager();