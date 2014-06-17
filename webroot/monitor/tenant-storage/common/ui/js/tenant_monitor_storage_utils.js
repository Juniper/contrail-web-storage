
function decideColor(origClass,color){
    if(color == 'red' || color == "#d62728"){
        return 'cell-hyperlink-text-error';
    } else {
        return 'cell-hyperlink';
    }
}

function cephIpDisplay (ip){
    //TODO just get the IP not port
    return '<span title="'+ ip +'">' + ip + '</span>';
}

function byteToGB(bytes){
    var gb = (bytes/1073741824).toFixed(2);
    return gb;
}

function kiloByteToGB(kbytes){
    var gb = (kbytes/1048576).toFixed(2);
    return gb;
}

function calcPercent(val1, val2){
    return ((val1/val2)*100).toFixed(2);
}

function getLabelClass(status){
    var labelClass;
    if (status == 'OK')
        labelClass = "label-success";
    else if (status == 'WARN')
        labelClass = "label-warning";
    else if (status == 'DOWN')
        labelClass = "label-important";
    else {
        labelClass = "label-info";
    }
    return labelClass;
}

function getIconClass(status){
    var labelClass;
    if (status == 'OK')
        labelClass = "icon-arrow-up";
    else if (status == 'WARN')
        labelClass = "icon-warning-sign";
    else if (status == 'DOWN')
        labelClass = "icon-arrow-down";
    else if (status == 'CLUSTER IDLE')
        labelClass = "icon-info-sign";
    else {
        labelClass = "icon-pause";
    }
    return labelClass;
}

function getIconColorClass(status){
    var labelClass;
    if (status == 'OK')
        labelClass = "success-color";
    else if (status == 'WARN')
        labelClass = "warning-color";
    else if (status == 'DOWN')
        labelClass = "down-color";
    else {
        labelClass = "info-color";
    }
    return labelClass;
}
