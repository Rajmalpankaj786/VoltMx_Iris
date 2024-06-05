
$KW.DataGrid = (function() {
    
    

    var module = {
        initialize: function() {
            voltmx.events.addEvent("click", "DataGrid", this.eventHandler);
        },

        initializeView: function(formId) {
            this.updateTableHeight(formId);
            this.resizeColumns(formId);
            this.updateColumnWidth(formId);
        },

        updateView: function(widgetModel, propertyName, propertyValue, oldPropertyValue) {
            var element = $KU.getNodeByModel(widgetModel);
            if(element && widgetModel.enablescrollbar == 1 && widgetModel.dockingheader)
                element = $KU.getElementById(widgetModel.pf + "_" + widgetModel.id + "_body").childNodes[0];

            switch(propertyName) {
                case "skin":
                case "alternateskin":
                case "rownormalskin":
                case "rowalternateskin":
                    element && this.applyRowSkin(widgetModel, element);
                    break;

                case "focusskin":
                case "rowfocusskin":
                    
                    break;

                case "headerskin":
                    if(element) {
                        var headerRow = element.tHead && element.tHead.rows[0];
                        if(headerRow) headerRow.className = propertyValue;
                    }
                    break;

                case "gridlinecolor":
                case "gridlinestyle":
                    this.applyCellBorder(widgetModel);
                    break;


                case "showcolumnheaders":
                    if(element) {
                        var headerRow = element.tHead && element.tHead.rows[0];
                        if(headerRow) {
                            if(propertyValue)
                                headerRow.style.display = "";
                            else
                                headerRow.style.display = "none";
                        }
                    }
                    break

                case "ismultiselect":
                    if(!propertyValue && widgetModel.selectedindices) {
                        widgetModel.selectedindices = widgetModel.selecteditems = null;
                        this.setSelectedItems(widgetModel, true);
                    }
                    break;

                case "data":
                    $KU.isArray(propertyValue) && this.modifyContent(widgetModel, propertyValue, "setdata");
                    break;

                case "columnheadersconfig":
                    if(element) {
                        var htmlstring = module.render(widgetModel, widgetModel.context);
                        element.parentNode.innerHTML = htmlstring;
                    }
                    break;
            }
        },

        
        render: function(gridModel, context) {
            gridModel.context = context;
            this.initializeGrid(gridModel);
            var parentModel = gridModel.parent;
            if($KW.FlexUtils.isFlexContainer(parentModel))
                gridModel.layoutConfig.self = true;
            return this.create(gridModel, context);
        },

        
        initializeGrid: function(gridModel) {
            if(!gridModel.columnheadersconfig)
                return;

            gridModel.rowcount = (gridModel.data && gridModel.data.length - IndexJL) || 0;
            gridModel.gridlinestyle = gridModel.gridlinestyle || "solid";
            gridModel.gridlinecolor = gridModel.gridlinecolor || "666666";
            gridModel.focusedindex = gridModel.selectedindex = gridModel.focusedindex || gridModel.selectedindex || null;
            gridModel.focuseditem = gridModel.selecteditem = gridModel.focuseditem || gridModel.selecteditem || null;
            gridModel.selectedindices = gridModel.selectedindices || null;
            gridModel.selecteditems = gridModel.selecteditems || null;
            if(gridModel.ismultiselect && gridModel.selectedindices && !gridModel.selecteditems) {
                this.setSelectedItems(gridModel);
            }
            gridModel.cellBorder = "thin " + gridModel.gridlinestyle + " #" + gridModel.gridlinecolor.substr(0, 6);
        },

        create: function(gridModel, context) {
            var rowdata = gridModel.data || (IndexJL ? [null] : []);
            var computedSkin = $KW.skins.getWidgetSkinList(gridModel, gridModel.context);

            var htmlString = "";
            gridModel.clonedTemplates = [[],[]];

            
            var computedSkinArray = computedSkin.split(" ");
            if(context.isPercent == true)
                computedSkinArray[1] = "";
            computedSkin = computedSkinArray.join(" ");

            if((gridModel.enablescrollbar == 1 && !gridModel.dockingheader) || $KW.FlexUtils.isFlexWidget(gridModel)) {

                htmlString += "<div class='" + computedSkin + "' style='overflow-y: auto; overflow-x: hidden; border-collapse:collapse;'>"
                htmlString += "<table style='width:100%;border-collapse:collapse;table-layout:fixed;'  " + $KW.Utils.getBaseHtml(gridModel, gridModel.context) + ">";
            } else {
                var wstyle = "border-collapse:collapse;table-layout:fixed;"
                if(context.ispercent == false)
                    wstyle += " display: inline-block;"
                htmlString += "<table style='" + wstyle + "' class='" + computedSkin + "' " + $KW.Utils.getBaseHtml(gridModel, gridModel.context) + ">";
            }
            var columnModel = gridModel.columnheadersconfig;
            if(columnModel) {

                var header = this.headerBuilder(columnModel, gridModel);
                htmlString += this.appendRowTag(gridModel, header, true);

                var body = this.createBody(gridModel, rowdata, {"isNew":false,
                                                                "rowIndex": 0,
                                                                "colIndex": 0});
                htmlString += this.appendRowTag(gridModel, body || [], false, 1, true, true);
            }
            htmlString += "</table>";
            if((gridModel.enablescrollbar == 1 && !gridModel.dockingheader) || $KW.FlexUtils.isFlexWidget(gridModel)) {
                htmlString += "</div>"
            }
            return htmlString;
        },

        
        headerBuilder: function(columnModel, gridModel) {
            gridModel.columnids = [];
            gridModel.columntype = [];
            for(var i = IndexJL; i < columnModel.length; i++) {
                gridModel.columnids.push(columnModel[i].columnid);
                gridModel.columntype.push(columnModel[i].columntype);
            }
            var padding = $KW.skins.getBaseStyle(gridModel);
            var border = "word-wrap:break-word;border:" + gridModel.cellBorder + " ; font-weight:inherit;";
            var thTmpl = "<th id='{id}' style='overflow:hidden;" + padding + border + "' width='{width}%' class='{class}' type='{type}' colno='{colno}' colindex='{colindex}'>";
            var temp = null;
            var headerStr = "";
            var headerHTML = [];
            var colInfo = "";

            for(var i = IndexJL; i < columnModel.length; i++) {
                colInfo = columnModel[i];
                var width = (colInfo.columnwidthinpercentage || 0);
                var align = colInfo.columncontentalignment || "";
                align = $KW.skins.getContentAlignment(gridModel, align);

                temp = thTmpl.replace(/\{id\}/g, colInfo.columnid);
                temp = temp.replace(/\{width\}/g, width);
                temp = temp.replace(/\{class\}/g, align);
                temp = temp.replace(/\{type\}/g, colInfo.columntype);
                temp = temp.replace(/\{colno\}/g, i);
                temp = temp.replace(/\{colindex}/g, "0," + i);
                var headerTemp = colInfo.columnheadertemplate;
                if(headerTemp) {
                    temp = temp.replace(/\{colindex}/g, i);
                    var boxModel = headerTemp.template;
                    var rowData = headerTemp.data;
                    gridModel.widgetsData = rowData;
                    if(boxModel) {
                        gridModel.counter = 0;
                        var clonedData = $KW.DataGrid.handleLayout(gridModel, boxModel, rowData);
                        temp += clonedData.htmlString;
                        cData = clonedData.clonedModel;
                    }
                    gridModel.widgetsData = ""
                    headerStr = temp + '</th>';
                } else {
                    headerStr = temp + ($KU.escapeHTMLSpecialEntities(colInfo.columnheadertext) || "") + '</th>';
                    cData = colInfo.columnheadertext;
                }
                gridModel.clonedTemplates[0].splice(i, 0, cData);
                headerHTML.push(headerStr);
            }
            return headerHTML;
        },

        
        createBody: function(gridModel, rowdata, metaData) {
            var bodyrowhtmlstr;
            var padding = $KW.skins.getBaseStyle(gridModel);
            var noOfItemsToRemove = (metaData.isNew == false) ? 1 : 0;
            var rowIndex = metaData.rowIndex;
            var colIndex = metaData.colIndex || 0;

            if(rowdata.length > IndexJL) {
                var border = "word-wrap:break-word;border:" + gridModel.cellBorder;
                var textTmpl = "<td id='{id}' width='{width}%' style='overflow:hidden;" + padding + border + "' class='{class}' colindex='{colindex}' >{text}</td>";
                var imgTmpl = "<td id='{id}' width='{width}%' style='overflow:hidden;" + padding + border + "' class='{class}' colindex='{colindex}'><img src={src} class='{class}' onload='$KW.DataGrid.imgLoadHandler(arguments[0],this)'></td>";
                var temp = null;
                var bodyrowhtml = [];
                var noofcolumns = 0;
                var id, colInfo = "";
                var colspan = 1;
                gridModel.counter = 1; 
                noofcolumns = gridModel.columnids.length;

                for(var i = IndexJL; i < rowdata.length; i++) {
                    bodyrowhtml[i - IndexJL] = [];
                    colIndex = 0;
                    gridModel.clonedTemplates[1].splice(rowIndex, noOfItemsToRemove, []);
                    for(var j = 0; j < noofcolumns; j++) {
                        id = gridModel.columnids[j];
                        colInfo = gridModel.columnheadersconfig[j + IndexJL];
                        colIndex++;
                        var type = gridModel.columntype[j];
                        var width = (colInfo.columnwidthinpercentage || 0);
                        var skin = "";
                        colspan = 1;
                        var cIndex = i + "," + j;
                        var cData = "";

                        if(rowdata[i]["metainfo"]) {
                            skin = rowdata[i]["metainfo"][id + "_skin"];
                            skin = skin || "";
                        }
                        var align = colInfo.columncontentalignment || "";
                        align = $KW.skins.getContentAlignment(gridModel, align);
                        type = type || "text";

                        if(type == "text") {
                            var text = (rowdata[i][id] && rowdata[i][id] != null) ? rowdata[i][id] : "";
                            text = text.replace(/\$0/g, '$$$$0');
                            
                            text = text.replace(/\$_/g, '$$$$_');
                            temp = textTmpl.replace(/\{text\}/g, $KU.escapeHTMLSpecialEntities(text));
                            cData = $KU.escapeHTMLSpecialEntities(text);
                            temp = temp.replace(/\{class\}/g, (skin + " " + align + " " + padding));
                        } else if(type == "image") {
                            var imgsrc = rowdata[i][id] && $KU.getImageURL(rowdata[i][id]);
                            cData = imgsrc;
                            temp = imgTmpl.replace(/\{src\}/g, imgsrc || "''");
                            temp = temp.replace(/\{class\}/g, align + " " + padding);
                        } else if(type == "template") {
                            var colData = rowdata[i][id];
                            if(colData["metainfo"]) {
                                if(colData["metainfo"]["colspan"]) {
                                    colspan = colData["metainfo"]["colspan"]
                                }
                            }
                            temp = "<td id='{id}' width='{width}%' style='overflow:hidden;" + padding + border + "' class='{class}' colindex='{colindex}' colspan='" + colspan + "'>";
                            temp = temp.replace(/\{class\}/g, (skin + " " + align + " " + padding));
                            var boxModel = colData.template || colInfo.columndatatemplate;
                            if(boxModel && colData) {
                                gridModel.widgetsData = colData;
                                var clonedData = $KW.DataGrid.handleLayout(gridModel, boxModel, colData);
                                temp += clonedData.htmlString;
                                cData = clonedData.clonedModel;
                            }

                            temp += '</td>';
                        }
                        gridModel.clonedTemplates[1][rowIndex].splice(colIndex, noOfItemsToRemove, cData);
                        temp = temp.replace(/\{colindex\}/g, cIndex);
                        temp = temp.replace(/\{width\}/g, width);
                        
                        temp = temp.replace(/\{id}/g, id);
                        bodyrowhtml[i - IndexJL][j] = temp;
                        j = j + (colspan - 1);
                    }
                    gridModel.counter++;
                    rowIndex++;
                }
            }
            return bodyrowhtml;
        },

        appendRowTag: function(gridModel, htmlArray, headerflag, index, generateTable, generateTBody) {
            var html = "";

            if(headerflag == true) {
                html += "<thead><tr index=0 " + $KW.Utils.getBaseHtml(gridModel, gridModel.context) + (gridModel.headerskin ? " class='" + gridModel.headerskin + "'" : "") + (gridModel.showcolumnheaders != "undefined" && gridModel.showcolumnheaders == false ? " style='display:none'" : "") + ">";
                if(gridModel.enablescrollbar == 1 && gridModel.dockingheader) {
                    html += "<td colspan='" + gridModel.columnheadersconfig.length + "'><div><table id='" + gridModel.pf + "_" + gridModel.id + "_head' width='100%' style='border-collapse:collapse;table-layout: fixed;'  ><tr >"
                }
                for(var i = 0; i < htmlArray.length; i++) {
                    html += htmlArray[i];
                }
                if(gridModel.enablescrollbar == 1 && gridModel.dockingheader) {
                    html += "</tr></table></div></td>"
                }
                html += '</tr></thead>';
            } else {
                var askin = gridModel.rowalternateskin || gridModel.alternateskin || "";
                var rskin = gridModel.rownormalskin || gridModel.skin || "";
                if(gridModel.enablescrollbar == 1 && gridModel.dockingheader && generateTable) {
                    html += "<tr><td colspan='" + gridModel.columnheadersconfig.length + "'><div style='width:100%;overflow-y: auto; overflow-x: hidden;border-collapse:collapse;' id='" + gridModel.pf + "_" + gridModel.id + "_body' name='scrollablewidget_" + gridModel.wType + "'><table style='border-collapse:collapse;width:100%' " + $KW.Utils.getBaseHtml(gridModel, gridModel.context) + " >"
                }
                if(generateTBody)
                    html += "<tbody>";
                if(htmlArray) {
                    for(var i = 0; i < htmlArray.length; i++) {
                        var metaInfo = gridModel.data[i + IndexJL].metainfo;
                        var skin = (metaInfo && metaInfo.skin) || ((i % 2 != 0 && askin) ? askin : rskin);
                        if(gridModel.ismultiselect && gridModel.selectedindices) {
                            if($KU.inArray(gridModel.selectedindices, (IndexJL ? index : index - 1))[0] && gridModel.rowfocusskin)
                                skin = gridModel.rowfocusskin;
                        }
                        html += "<tr index=" + index + $KW.Utils.getBaseHtml(gridModel, gridModel.context) + (skin ? " class='" + skin + "'" : "") + ">";
                        for(var j = 0; j < gridModel.columnids.length; j++) {
                            html += htmlArray[i][j];
                        }
                        html += '</tr>';
                        index++;
                    }
                }
                if(generateTBody)
                    html += "</tbody>";
                if(gridModel.enablescrollbar == 1 && gridModel.dockingheader && generateTable) {
                    html += "</table></div></td></tr>"
                }
            }
            return html;
        },

        handleLayout: function(gridModel, boxModel, layoutData) {
            var context = gridModel.context;
            var tabpaneID = context.tabpaneID; 
            context.container = gridModel;
            context.template_generator = boxModel;
            context.tabpaneID = "";
            if(!boxModel.pf) {
                _voltmxConstNS.Form2.addHeaderorFooter.call(boxModel, boxModel);
            }
            boxModel.isTemplate = true; 
            var clonedModel = owl.deepCopy(boxModel, null, false);
            $KW.Utils.updateLayoutData(gridModel, clonedModel, layoutData);
            context.setTopLevelBox(true);
            var htmlString = $KW[clonedModel.wType].render(clonedModel, context);
            context.setTopLevelBox(false);
            context.tabpaneID = tabpaneID;
            context.container = "";
            context.template_generator = "";
            return {"htmlString": htmlString,
                    "clonedModel": clonedModel}
        },

        getClonedModelOfWidget: function(id, wNode, containerId) {
            var gridModel = $KW.Utils.getContainerModelById(wNode, containerId);
            if(!gridModel)
                return;
            var context = module.getContextByNode(gridModel, wNode);
            var clonedTemp = module.getClonedModel(gridModel, context.rowIndex, context.colIndex, context.isHeader);
            return clonedTemp[id];
        },

        getContextByNode: function(gridModel, wNode) {
            var cellNode = $KU.getParentByAttribute(wNode, "colindex");
            var rowIndex = cellNode.getAttribute('colindex').split(',')[0];
            var colIndex = cellNode.getAttribute('colindex').split(',')[1];
            var isHeader = cellNode.nodeName == 'TH' ? true : false;

            return {
                rowIndex: rowIndex,
                colIndex: colIndex,
                isHeader : isHeader
            };
        },

        getClonedModel: function(gridModel, rowIndex, colIndex, isHeader) {
            if(isHeader) {
                return gridModel.clonedTemplates[0][colIndex];
              }else {
                return gridModel.clonedTemplates[1][rowIndex][colIndex];
            }
        },

        imgLoadHandler: function(event, img) {
            event = event || window.event;
            img = event.target || event.srcElement;
            var nWidth = img.naturalWidth || img.width;
            var nHeight = img.naturalHeight || img.height;
            var cell = img.parentNode;
            var padding = parseInt($KU.getStyle(cell, "padding-left").replace("px", ""), 10) + parseInt($KU.getStyle(cell, "padding-right").replace("px", ""), 10);
            var cellWidth = cell.clientWidth - padding;

            if(nWidth > cellWidth) {
                img.style.width = cellWidth + "px";
                var aspectratio = nWidth / nHeight;
                img.style.height = Math.round(1 / aspectratio * cellWidth) + "px";
            }
        },

        eventHandler: function(event, target) {
            if(!event)
                event = window.event;
            var cell = $KU.getParentByAttribute(event.target || event.srcElement, "colindex");
            var index = parseInt(target.getAttribute("index"), 10);
            var gridModel = $KU.getModelByNode(target);
            (index > 0) && module.setFocusedIndex(gridModel, target, cell, index);
            module.rowClickHandler(gridModel, index, cell);
        },

        rowClickHandler: function(gridModel, index, cell) {
            var event;
            spaAPM && spaAPM.sendMsg(gridModel, 'onrowselected');
            $KAR && $KAR.sendRecording(gridModel, 'click', {'colIndex': cell.getAttribute("colindex"), 'eventType': 'uiAction'});
            if(index == 0) { 
                var colInfo = gridModel.columnheadersconfig[parseInt(cell.getAttribute("colno"), 10)];
                event = $KU.returnEventReference(colInfo.columnonclick || colInfo.columnOnClick || "");
            } else { 
                event = $KU.returnEventReference(gridModel.onrowselected);
            }
            
            event && $KU.executeWidgetEventHandler(gridModel, event);
        },

        updateData: function(childModel, childNode, gridModel, row, canExecute) {
            if(gridModel && row) {
                var index = parseInt(row.getAttribute("index"));
                var cell, item;
                if(index == "0") {
                    cell = $KU.getParentByAttribute(childNode, "colindex");
                    var colInfo = gridModel.columnheadersconfig[cell.cellIndex + IndexJL];
                    var headerTemp = colInfo.columnheadertemplate;
                    if(headerTemp) {
                        item = headerTemp.data;
                    } else
                        item = colInfo.columnheadertext;
                    var cellindex = parseInt(cell.getAttribute("colindex").split(",")[1]);
                    gridModel.selectedcellindex = [cellindex, cell.id];
                    gridModel.selectedcellitem = item;
                } else {
                    var column = $KU.getParentByAttribute(childNode, "colindex");
                    this.setFocusedIndex(gridModel, row, column, index);
                    item = gridModel.focuseditem[column.id];
                }
                item && $KW.Utils.updateContainerMasterData(gridModel, item, childModel, childNode);

                if(canExecute) {
                    var eventExecuted = voltmx.events.executeBoxEvent(childModel, item, gridModel, "", index);
                    if(!eventExecuted) {
                        this.rowClickHandler(gridModel, index, cell);
                    }
                }

            }
        },

        setFocusedIndex: function(gridModel, row, column, index) {
            if(index > 0) {
                index = IndexJL ? index : index - 1;
                gridModel.selectedindex = gridModel.focusedindex = index;
                gridModel.selecteditem = gridModel.focuseditem = gridModel.data[index];
                if(!gridModel.ismultiselect) {
                    gridModel.selectedindices = IndexJL ? [null, index] : [index];
                    this.setSelectedItems(gridModel, true);
                }
                var cellindex = parseInt(column.getAttribute("colindex").split(",")[1]);
                gridModel.selectedcellindex = [cellindex, column.id];
                gridModel.selectedcellitem = gridModel.focuseditem[column.id];
            }
            gridModel.ismultiselect && this.setSelectedIndices(gridModel, row);
        },

        setSelectedIndices: function(gridModel, row) {
            if(gridModel.ismultiselect) {
                var indices = gridModel.selectedindices || (IndexJL ? [null] : []);
                var items = gridModel.selecteditems || (IndexJL ? [null] : []);
                var index = gridModel.focusedindex;
                var result = $KU.inArray(indices, index);
                if(result[0]) {
                    indices.splice(result[1], 1);
                    items.splice(result[1], 1);
                    if(gridModel.rowfocusskin) {
                        var skin = this.getRowSkin(gridModel, index);
                        row.className = skin || "";
                    }
                } else {
                    indices.push(index);
                    items.push(gridModel.data[index]);
                    gridModel.rowfocusskin && (row.className = gridModel.rowfocusskin);
                }
                gridModel.selectedindices = (indices.length > IndexJL) ? indices : null;
                gridModel.selecteditems = (items.length > IndexJL) ? items : null;
            }
        },

        setSelectedItems: function(gridModel, applyFocusSkin) {
            if(gridModel.selectedindices) {
                gridModel.selecteditems = IndexJL ? [null] : [];
                for(var i = IndexJL; i < gridModel.selectedindices.length; i++) {
                    gridModel.data && gridModel.data[gridModel.selectedindices[i]] && gridModel.selecteditems.push(gridModel.data[gridModel.selectedindices[i]]);
                }
            }
            if(applyFocusSkin) {
                var element = $KU.getNodeByModel(gridModel);
                if(element) {
                    var rows = element.tBodies[0].rows;
                    for(var i = 0; i < rows.length; i++) {
                        if((gridModel.selectedindices && $KU.inArray(gridModel.selectedindices, i + IndexJL)[0]) || (!gridModel.ismultiselect && gridModel.selectedindex == i + IndexJL))
                            rows[i].className = gridModel.rowfocusskin
                        else {
                            var skin = this.getRowSkin(gridModel, i + IndexJL);
                            rows[i].className = skin || "";
                        }
                    }
                }

            }
        },

        getRowSkin: function(gridModel, index) {
            var rowSkin = gridModel.rownormalskin || gridModel.skin || "";
            var askin = gridModel.rowalternateskin || gridModel.alternateskin || "";
            var metaInfo = gridModel.data[index]["metainfo"];
            return(metaInfo && metaInfo.skin) ? metaInfo.skin : (((parseInt(index, 10) - IndexJL) % 2 != 0 && askin) ? askin : rowSkin);
        },

        updateIndices: function(gridModel, action, index) {
            if(gridModel.data && gridModel.data.length > IndexJL) {
                var indices = gridModel.selectedindices;
                if(action == "addat") {
                    for(var i = IndexJL; i < indices.length; i++) {
                        if(indices[i] >= index)
                            indices[i] = indices[i] + 1;
                    }
                } else { 
                    var result = $KU.inArray(indices, index);
                    result[0] && indices.splice(result[1], 1);
                    for(var i = IndexJL; i < indices.length; i++) {
                        if(indices[i] >= index)
                            indices[i] = indices[i] - 1;
                    }
                }
                gridModel.selectedindices = indices.length > IndexJL ? indices : null;
                this.setSelectedItems(gridModel);
            } else {
                gridModel.selectedindices = gridModel.selecteditems = null;
            }
        },

        updateColumnWidth: function(formId) {
            var dataGridBodyDiv = document.querySelectorAll("#" + formId + " div[name='scrollablewidget_DataGrid']");
            for(var i = 0; i < dataGridBodyDiv.length; i++) {
                var bodyDiv = dataGridBodyDiv[i];
                var id = bodyDiv.getAttribute("id");
                id = id.split("_")[1];

                var gridModel = $KU.getModelByNode(bodyDiv.childNodes[0]);
                if(gridModel.enablescrollbar == 1 && gridModel.dockingheader && bodyDiv.clientWidth) {
                    var header = document.getElementById(gridModel.pf + "_" + gridModel.id + "_head");
                    var scrollbarWidth = bodyDiv.offsetWidth - bodyDiv.clientWidth;
                    header.style.width = header.parentNode.offsetWidth - scrollbarWidth + "px";
                }
            }
        },

        updateTableHeight: function(formId) {
            var grids = document.querySelectorAll("#" + formId + " table[kwidgettype='DataGrid']");
            var height;
            for(var i = 0; i < grids.length; i++) {
                var grid = grids[i];
                var gridModel = $KU.getModelByNode(grid);
                if(gridModel.enablescrollbar == 1 && (gridModel.containerheightinpixel || gridModel.containerheight)) {
                    if(gridModel.containerheightinpixel)
                        height = gridModel.containerheightinpixel;
                    else if(gridModel.containerheight) {
                        height = Math.round((grid.offsetWidth * gridModel.containerheight) / 100);
                    }
                    if(gridModel.dockingheader) {
                        $KU.getElementById(grid.id + "_body").style.maxHeight = height + "px";
                    } else
                        grid.parentNode.style.maxHeight = height + "px";

                }
            }
        },


        
        setData: function(widgetModel, dataArray) {
            widgetModel.focusedindex = widgetModel.focuseditem = widgetModel.selectedindex = widgetModel.selecteditem = widgetModel.selectedindices = widgetModel.selecteditems = null;

            $KU.isArray(dataArray) && this.modifyContent(widgetModel, dataArray, "setdata");
        },

        addAll: function(widgetModel, dataArray, key) {
            $KU.isArray(dataArray) && this.modifyContent(widgetModel, dataArray, "addall");
        },

        removeAll: function(widgetModel) {
            widgetModel.focusedindex = widgetModel.focuseditem = widgetModel.selectedindex = widgetModel.selecteditem = widgetModel.selectedindices = widgetModel.selecteditems = null;

            this.modifyContent(widgetModel, IndexJL ? [null] : [], "removeall");
        },

        removeAt: function(widgetModel, index) {
            (!isNaN(index) && index >= IndexJL) && this.modifyContent(widgetModel, [], "removeat", index);
        },

        
        setDataAt: function(widgetModel, dataObj, index) {
            (!isNaN(index) && index >= IndexJL && dataObj instanceof Object) && this.modifyContent(widgetModel, dataObj, "setdataat", index);
        },

        addDataAt: function(widgetModel, dataObj, index) {
            (!isNaN(index) && index >= IndexJL && dataObj instanceof Object) && this.modifyContent(widgetModel, dataObj, "addat", index);
        },

        
        setCellData: function(widgetModel, rowIndex, columnID, data) {
            (!isNaN(rowIndex) && data) && this.modifyContent(widgetModel, data, "setcelldata", rowIndex, columnID);
        },

        setHeaderCellDataAt: function(widgetModel, columnID, data) {
            (columnID && data) && this.modifyContent(widgetModel, data, "setheadercelldata", '', columnID);
        },

        applyCellSkin: function(widgetModel, rowIndex, columnID, skinID) {
            !isNaN(rowIndex) && this.modifyContent(widgetModel, skinID, "applycellskin", rowIndex, columnID);
        },

        selectAll: function(widgetModel, flag) {
            this.modifyContent(widgetModel, flag, "selectall");
        },

        setTBodyInnerHTML: function(tBody, html, action) {
            if(!$KU.isIE)
                tBody.innerHTML = html;
            else {
                
                var temp = this.createTemp();
                if(action == "setdata") {
                    temp.innerHTML = "<table>" + html + "</table>";
                    while(tBody.children.length > 0) { 
                        tBody.removeChild(tBody.children[0]);
                    }
                    while(temp.firstChild.children.length > 0) {
                        tBody.appendChild(temp.firstChild.children[0]);
                    }
                } else {
                    temp.innerHTML = "<table><tbody>" + html + "</tbody></table>";
                    if(tBody.tagName == 'TABLE') 
                        tBody.appendChild(temp.firstChild.firstChild);
                    else
                        tBody.parentNode.replaceChild(temp.firstChild.firstChild, tBody);
                }
            }
        },

        setTRInnerHTML: function(tr, html, index) {
            if(!$KU.isIE)
                tr.innerHTML = html;
            else {
                var temp = this.createTemp();
                temp.innerHTML = "<table><tbody><tr class='" + tr.className + "' index='" + index + "'>" + html + "</tr></tbody></table>";
                tr.parentNode.replaceChild(temp.firstChild.firstChild.firstChild, tr);
            }
        },

        createTemp: function() {
            var temp = document.getElementById("__temp");
            if(!temp) {
                temp = document.createElement("div");
                temp.id = "__temp";
            }
            return temp;
        },

        modifyContent: function(gridModel, dataArray, action, index, columnID) { 
            if(gridModel) {
                if(action != "setcelldata" && action != "applycellskin" && action != "selectall") {
                    gridModel.canUpdateUI = false;
                    $KW.Utils.updateContent(gridModel, "data", dataArray, action, index);
                    gridModel.canUpdateUI = true;
                }
                if(gridModel.data)
                    gridModel.rowcount = gridModel.data.length - IndexJL;

                var gridObj = $KU.getNodeByModel(gridModel);
                if(gridModel.enablescrollbar == 1 && gridModel.dockingheader)
                    gridObj = $KU.getElementById(gridModel.pf + "_" + gridModel.id + "_body").childNodes[0];

                var holder = gridObj && (gridObj.tBodies[0] || gridObj);
                var metaData = {"isNew" : false, "rowIndex" : index};
                if(holder) {
                    var cellIndex;
                    switch(action) {

                        case "setdata":
                            gridModel.clonedTemplates = [[],[]];
                            metaData.rowIndex = 0;
                            var header = this.headerBuilder(gridModel.columnheadersconfig, gridModel);
                            var innerHTML = this.appendRowTag(gridModel, header, true);
                            var body = this.createBody(gridModel, dataArray, metaData);
                            innerHTML += this.appendRowTag(gridModel, body, false, 1, false, true);
                            this.setTBodyInnerHTML(gridObj, innerHTML, "setdata");
                            break;

                        case "setdataat":
                            var dataArray = IndexJL ? [null, dataArray] : [dataArray];
                            var existingRow = holder.rows[index - IndexJL];

                            if(existingRow)
                                var innerHTML = this.createBody(gridModel, dataArray, metaData)[0].join("");
                            this.setTRInnerHTML(existingRow, innerHTML, index);
                            break;

                        case "addall":
                            var index = holder.rows.length;
                            metaData.rowIndex = index;
                            var body = this.createBody(gridModel, dataArray, metaData);
                            var innerHTML = holder.innerHTML + this.appendRowTag(gridModel, body, false, index + 1, false, false);
                            this.setTBodyInnerHTML(holder, innerHTML);

                            if(gridModel.enablescrollbar == 1 && gridModel.dockingheader) {
                                $KU.isIE && (holder = $KU.getElementById(gridModel.pf + "_" + gridModel.id + "_body").childNodes[0]);

                                var addedRow = holder.rows[index];
                                addedRow && addedRow.scrollIntoView(true);
                            }
                            break;

                        case "addat":
                            var rIndex = (index <= IndexJL) ? 0 : (index > gridModel.rowcount ? gridModel.rowcount : index);
                            var wrapper = document.createElement("div");
                            var dataArray = IndexJL ? [null, dataArray] : [dataArray];
                            wrapper.innerHTML = "<table><tr index=" + rIndex + $KW.Utils.getBaseHtml(gridModel, {
                                tabpaneID: gridObj.getAttribute("ktabpaneid")
                            }) + "></tr></table>";
                            metaData.isNew = true;
                            metaData.rowIndex = rIndex;
                            var innerHTML = this.createBody(gridModel, dataArray, metaData)[0].join("");
                            var newRow = wrapper.firstChild.rows[0];
                            if(index >= holder.rows.length)
                                holder.appendChild(newRow);
                            else
                                holder.insertBefore(newRow, holder.rows[index - IndexJL]);
                            this.setTRInnerHTML(newRow, innerHTML, index);
                            break;

                        case "setcelldata":
                        case "applycellskin":
                        case "setheadercelldata":
                            var result = $KU.inArray(gridModel.columnids, columnID);
                            if(result[0]) {
                                var htmlRow;
                                var rowData;
                                cellIndex = result[1];
                                var template = "";
                                var oldSkin;
                                var colInfo = gridModel.columnheadersconfig[cellIndex];
                                if(action == "setheadercelldata") {
                                    if(gridModel.showColumnHeaders) {
                                        index = 0;
                                        var headerTemp = colInfo.columnheadertemplate;
                                        if(headerTemp && headerTemp.template) {
                                            template = headerTemp.template;
                                            headerTemp.data = dataArray;
                                        }
                                        htmlRow = holder.parentNode.tHead.rows[0];
                                    }
                                } else {
                                    rowData = gridModel.data[index];
                                    if(rowData) {
                                        if(action == "setcelldata") {
                                            var rowTemp = colInfo.columndatatemplate;
                                            rowTemp && (template = rowTemp);
                                            rowData[columnID] = dataArray;
                                            htmlRow = holder.rows[index - IndexJL];
                                        } else {
                                            var metaInfo = rowData.metainfo || {};
                                            oldSkin = metaInfo[columnID + "_skin"];
                                            metaInfo[columnID + "_skin"] = dataArray;
                                            rowData.metainfo = metaInfo;
                                            htmlRow = holder.rows[index - IndexJL];
                                        }

                                    }
                                }

                                if(htmlRow) {
                                    if(action == "applycellskin") {
                                        if(oldSkin)
                                            $KU.removeClassName(htmlRow.cells[cellIndex], oldSkin);
                                        $KU.addClassName(htmlRow.cells[cellIndex], dataArray);
                                    } else {
                                        if(template) {
                                            
                                            gridModel.widgetsData = dataArray;
                                            var clonedData = $KW.DataGrid.handleLayout(gridModel, template, dataArray);
                                            htmlRow.cells[cellIndex].innerHTML = clonedData.htmlString;
                                            gridModel.clonedTemplates[index].splice(cellIndex, 1, clonedData.clonedModel);
                                        } else {
                                            

                                            var ctype = colInfo.columntype;
                                            if(ctype == 'image') {
                                                var imgNode = htmlRow.cells[cellIndex].firstChild;
                                                imgNode.src = $KU.getImageURL(dataArray);
                                            } else {
                                                htmlRow.cells[cellIndex].innerHTML = dataArray;
                                            }

                                            gridModel.clonedTemplates[index].splice(cellIndex, 1, dataArray);
                                        }

                                    }
                                }
                            }
                            break;

                        case "removeall":
                            this.setTBodyInnerHTML(holder, "");
                            gridModel.clonedTemplates = [[],[]];
                            break;

                        case "removeat":
                            gridModel.clonedTemplates[1].splice(index, 1);
                            holder.rows[index - IndexJL] && holder.removeChild(holder.rows[index - IndexJL]);
                            break;

                        case "selectall":
                            if(gridModel.ismultiselect && gridModel.data && dataArray) {
                                var indices = IndexJL ? [null] : [];
                                for(var i = IndexJL; i < gridModel.data.length; i++) {
                                    indices.push(i);
                                }
                                gridModel.selectedindices = indices;
                            }
                            if(!dataArray) {
                                gridModel.selectedindices = gridModel.selecteditems = null;

                            }
                            this.setSelectedItems(gridModel, true);
                            break;

                        default:

                    }
                    this.adjustNodeIndex(holder);
                    if(action == "addat" || action == "removeat") {
                        gridModel.ismultiselect && gridModel.selectedindices && this.updateIndices(gridModel, action, index);
                    }
                    if(action == "addat" || action == "removeat" || action == "addall")
                        this.applyRowSkin(gridModel);

                    this.adjustFlexContainers(gridModel, action, index, cellIndex);
                }
                this.updateColumnWidth(gridModel.pf);
            }
        },

        adjustNodeIndex: function(node) { 
            var rows = node.childNodes;
            if(rows) {
                for(var i = 0; i < rows.length; i++) {
                    rows[i].setAttribute("index", i + 1);
                    cells = rows[i].cells;
                    for(var j = 0; cells && j < cells.length; j++) {
                        cells[j].setAttribute("colindex", i + "," + j);
                    }
                }
            }
        },

        addArray: function(srcArray, targetArray) {
            for(var i = 0; i < targetArray.length; i++) {
                srcArray.push(targetArray[i]);
            }
            return srcArray;
        },

        toggleVisibilty: function(model, data) {
            var node = $KU.getNodeByModel(model);
            var isFlexWidget = $KW.FlexUtils.isFlexWidget(model);
            if(isFlexWidget)
                node = node.parentNode;
            if(data && data.length > 0 && model.isvisible) {
                node.style.display = "";
                $KU.removeClassName(node, "hide");
            } else
                node.style.display = "none";
        },

        applyRowSkin: function(gridModel) {
            var holder = $KU.getNodeByModel(gridModel);
            var rows = holder.tBodies[0].rows;
            var rowSkin = gridModel.rownormalskin || gridModel.skin || "";
            var askin = gridModel.rowalternateskin || gridModel.alternateskin || "";
            
            if(rowSkin || askin) {
                for(var i = 0; i < rows.length; i++) {
                    var metaInfo = gridModel.data[i + IndexJL]["metainfo"];
                    var skin = (metaInfo && metaInfo.skin) ? metaInfo.skin : ((i % 2 != 0 && askin) ? askin : rowSkin);
                    if(gridModel.ismultiselect && gridModel.rowfocusskin && gridModel.selectedindices && $KU.inArray(gridModel.selectedindices, i + IndexJL)[0])
                        rows[i].className = gridModel.rowfocusskin;
                    else
                        rows[i].className = skin;
                }
            }
        },

        applyCellBorder: function(widgetModel) {
            var element = $KU.getNodeByModel(widgetModel);
            widgetModel.cellBorder = "thin " + widgetModel.gridlinestyle + " #" + widgetModel.gridlinecolor.substr(0, 6);
            if(element) {
                var applyStyle = function(rows) {
                    for(var i = 0; i < rows.length; i++) {
                        var row = rows[i];
                        for(var j = 0; j < row.cells.length; j++) {
                            row.cells[j].style.border = widgetModel.cellBorder;
                        }
                    }
                }
                applyStyle(element.tHead && element.tHead.rows);

                if(widgetModel.enablescrollbar == 1 && widgetModel.dockingheader)
                    element = $KU.getElementById(widgetModel.pf + "_" + widgetModel.id + "_body").childNodes[0];

                applyStyle(element.tBodies[0].rows);
            }
        }

        , resizeColumns: function(formId) {
            var grids = document.querySelectorAll("#" + formId + " table[kwidgettype='DataGrid']");
            for(var i = 0; i < grids.length; i++) {
                var grid = grids[i];
                var gridModel = $KU.getModelByNode(grid);
                if(gridModel.allowcolumnresize) {
                    gridModel.crInstance = new module.ColumnResize(grid, gridModel);
                    gridModel.crInstance.init();
                }
            }
        },

        
        adjustColumnResizeGrips: function(formId) {
            var grids = document.querySelectorAll("#" + formId + " table[kwidgettype='DataGrid']");
            for(var i = 0; i < grids.length; i++) {
                var grid = grids[i];
                var gridModel = $KU.getModelByNode(grid);
                if(gridModel.allowcolumnresize && gridModel.crInstance) {
                    var cr = gridModel.crInstance;
                    cr.syncGrips();
                    cr.syncColWidth();
                }
            }
        },

        
        adjustFlexContainers: function(model, action, rowIndex, colIndex) {
            $KU.needOptimization = false;
            var grid = $KU.getNodeByModel(model);
            var type = 'FlexContainer';
            switch(action) {
                case "setdata":
                    this.adjustFlexContainersInDataGrid(model, grid);
                    break;
                case "setdataat":
                case "addat":
                    var row = grid.tBodies[0].rows[rowIndex];
                    row && this.adjustFlexContainersInRows(row);
                    break;
                case "addall":
                    var rows = grid.tBodies[0].rows;
                    for(var i = rowIndex; i < rows.length; i++) {
                        this.adjustFlexContainersInRows(rows[i]);
                    }
                    break;
                case "setcelldata":
                case "setheadercelldata":
                    var column = grid.querySelector('[colindex="' + rowIndex + ',' + colIndex + '"]');
                    column && this.adjustFlexContainer(column);
                    break;
            }
            $KU.needOptimization = true;
        },

        adjustFlexContainersInDataGrid: function(wModel, wNode) {
            var masterData = wModel.data;
            var headerRow = wNode.tHead.rows[0];
            headerRow && this.adjustFlexContainersInRows(headerRow);

            if(masterData.length > 0) {
                var rows = wNode.tBodies[0].rows;
                for(var i = 0; i < rows.length; i++) {
                    this.adjustFlexContainersInRows(rows[i]);
                }
            }
        },

        adjustFlexContainersInRows: function(row) {
            var cells = row.cells;
            for(var i = 0; i < cells.length; i++) {
                this.adjustFlexContainer(cells[i]);
            }
        },

        adjustFlexContainer: function(cell) {
            var flexNode = cell.querySelector('div[kwidgettype="FlexContainer"]');
            if(flexNode) {
                var flexModel = $KU.getModelByNode(flexNode);
                $KW.FlexContainer.forceLayout(flexModel, flexNode.parentNode);
            }
        }
    };

    module.ColumnResize = function(grid, gridModel) {
        this.dragColumns = grid.rows[0].cells;
        this.minWidth = 17;
        if(!this.dragColumns) return;
        this.t = $(grid);
        this.t.g = [];
        this.t.c = [];
        this.t.w = this.t.width();
        this.t.cs = parseInt(voltmx.appinit.isIE ? grid.cellSpacing || grid.currentStyle.borderSpacing : $KU.getStyle(grid, "border-spacing")) || 2;
        this.t.b = parseInt(voltmx.appinit.isIE ? grid.border || grid.currentStyle.borderLeftWidth : $KU.getStyle(grid, 'border-left-width')) || 1; 
        this.t.ln = this.dragColumns.length;

        this.saveBodyCursor;

        this.cGrips = document.createElement("div");
        this.cGrips.id = grid.id + "_cGrips";
        this.cGrips.className = "colgrips";
        this.cGrips.style.margin = '0%';
        grid.parentNode.insertBefore(this.cGrips, grid);
        this.t.gc = this.t.prev();
    };

    module.ColumnResize.prototype = {
        init: function() {
            for(var i = 0; i < this.dragColumns.length; i++) {
                if(i != this.t.ln - 1) {
                    this.cGrips.innerHTML += "<div class='colgrip' index='" + i + "'><div class='colresizer'></div></div>";
                } else
                    this.cGrips.innerHTML += "<div class='lastcolgrip' index='" + i + "'></div>";

                var c = {
                    col: this.dragColumns[i]
                };
                c.w = this.width(this.dragColumns[i]);
                this.t.c.push(c)
            }

            this.handleEventListener = this.handleEvent.bind(this);
            for(var i = 0; i < this.cGrips.children.length; i++) {
                this.t.g.push({
                    grip: this.cGrips.children[i]
                });
                if(i < this.t.ln - 1) voltmx.events.addEventListener(this.cGrips.childNodes[i], "mousedown", this.handleEventListener);
            }

            this.syncGrips();
        },

        syncGrips: function() {
            this.t.gc.style.width = this.width(this.t) + 'px'; 
            for(var i = 0; i < this.t.ln; i++) { 
                var c = this.t.c[i].col;
                this.t.g[i].grip.style.left = this.offset(c).left - this.offset(this.t).left + c.offsetWidth + this.t.cs / 2 + 'px';
                this.t.g[i].grip.style.height = this.t.c[0].col.offsetHeight + 'px';
            }
        },

        handleEvent: function(e) {
            switch(e.type) {
                case 'mousedown':
                    return this.startColumnDrag(e);
                    break;
                case 'mousemove':
                    return this.columnDrag(e);
                    break;
                case 'mouseup':
                    return this.stopColumnDrag(e);
                    break;
            }
        },

        startColumnDrag: function(e) {

            
            var currentTarget = e.currentTarget || e.srcElement.parentNode; 
            this.curGripNo = parseInt(currentTarget.getAttribute("index"));
            var g = this.t.g[this.curGripNo];
            g.ox = e.pageX || e.clientX;
            g.l = this.position(g.grip).left;

            voltmx.events.addEventListener(document, "mousemove", this.handleEventListener);
            voltmx.events.addEventListener(document, "mouseup", this.handleEventListener);

            this.saveBodyCursor = document.body.style.cursor;
            document.body.style.cursor = 'w-resize'

            if(this.t.c[this.curGripNo].l)
                for(var i = 0, c; i < this.t.ln; i++) {
                    c = this.t.c[i];
                    c.l = false;
                    c.w = this.width(c.col);
                }

            voltmx.events.preventDefault(e);
        },

        width: function(elem) {
            return elem.offsetWidth - this.xPadding(elem) - this.xBorder(elem);
        },

        xPadding: function(elem) {
            return parseFloat($KU.getStyle(elem, "padding-left").replace("px", "")) + parseFloat($KU.getStyle(elem, "padding-right").replace("px", ""));
        },

        xBorder: function(elem) {
            return parseFloat($KU.getStyle(elem, "border-left-width").replace("px", "")) + parseFloat($KU.getStyle(elem, "border-right-width").replace("px", ""));
        },

        offset: function(elem) {
            var docElem, body, clientTop, clientLeft, scrollTop, scrollLeft,
                box = {
                    top: 0,
                    left: 0
                },
                doc = elem.ownerDocument;

            docElem = doc.documentElement;
            body = doc.body;
            if(!doc) {
                return;
            }
            if(typeof elem.getBoundingClientRect !== "undefined") {
                box = elem.getBoundingClientRect();
            }
            clientTop = docElem.clientTop || body.clientTop || 0;
            clientLeft = docElem.clientLeft || body.clientLeft || 0;
            scrollTop = window.pageYOffset || docElem.scrollTop;
            scrollLeft = window.pageXOffset || docElem.scrollLeft;
            return {
                top: box.top + scrollTop - clientTop,
                left: box.left + scrollLeft - clientLeft
            };
        },

        position: function(elem) {
            var offsetParent = this.offsetParent(elem),
                offset = this.offset(elem),
                parentOffset = this.root.test(offsetParent.nodeName) ? {
                    top: 0,
                    left: 0
                } : this.offset(offsetParent);

            
            
            
            offset.top -= parseFloat($KU.getStyle(elem, "margin-top")) || 0;
            offset.left -= parseFloat($KU.getStyle(elem, "margin-left")) || 0;

            
            parentOffset.top += parseFloat($KU.getStyle(offsetParent, "border-top-width")) || 0;
            parentOffset.left += parseFloat($KU.getStyle(offsetParent, "border-left-width")) || 0;

            
            return {
                top: offset.top - parentOffset.top,
                left: offset.left - parentOffset.left
            };
        },

        offsetParent: function(elem) {
            var offsetParent = elem.offsetParent || document.body;
            while(offsetParent && (!this.root.test(offsetParent.nodeName) && $KU.getStyle(elem, "position") === "static")) {
                offsetParent = offsetParent.offsetParent;
            }
            return offsetParent || document.body;
        },

        columnDrag: function(e) {
            var gInfo = this.t.g[this.curGripNo];
            var x = (e.pageX || e.clientX) - gInfo.ox + gInfo.l; 
            var mw = this.minWidth,
                i = this.curGripNo; 
            var l = this.t.cs * 1.5 + mw + this.t.b;

            var max = i == this.t.ln - 1 ? this.width(this.t) - l : this.position(this.t.g[i + 1].grip).left - this.t.cs - mw; 
            var min = i ? this.position(this.t.g[i - 1].grip).left + this.t.cs + mw : l; 

            x = Math.max(min, Math.min(max, x)); 
            gInfo.x = x;
            gInfo.grip.style.left = x + 'px'; 
            this.syncCols();
            this.syncGrips(); 
            voltmx.events.preventDefault(e);
        },

        stopColumnDrag: function(e) {
            voltmx.events.removeEventListener(document, "mousemove", this.handleEventListener);
            voltmx.events.removeEventListener(document, "mouseup", this.handleEventListener);
            document.body.style.cursor = this.saveBodyCursor;

            var gInfo = this.t.g[this.curGripNo];
            if(gInfo.x) { 
                this.syncCols(true);
                this.syncGrips(); 
            }
            voltmx.events.preventDefault(e);
        },

        syncCols: function(isOver) {
            var gInfo = this.t.g[this.curGripNo];
            var i = this.curGripNo;
            var inc = gInfo.x - gInfo.l,
                c = this.t.c[i],
                c2 = this.t.c[i + 1];
            var w = c.w + inc;
            var w2 = c2.w - inc; 
            c.col.style.width = w + 'px';
            c2.col.style.width = w2 + 'px';
            if(isOver) {
                c.w = w;
                c2.w = w2;
            }
        },

        syncColWidth: function() {
            for(var i = 0; i < this.t.c.length; i++) {
                var c = this.t.c[i];
                c.w = this.width(c.col);
            }
        }
    };


    return module;
}());
