function startFormatting() {
    rawTable = document.getElementById("rawTextArea").value;
    oneLine = rawTable.split('\n')[3];
    amountOfColumns = (oneLine.match(/	/g)).length + 1;
    firstEdited = "|".repeat(amountOfColumns) + "|\n" + 
    "| --- ".repeat(amountOfColumns) + "|\n" + 
    "|" + rawTable.replace(/\n/gi, `|\n|`) + "|";
    // document.getElementById("formattedTextArea").value = firstEdited

    document.getElementById("formattedTextArea").value =
    firstEdited.replace(/	/gi, `|`);

    console.log(oneLine, amountOfColumns)
}

function copytext(el) {
    var $tmp = $("<textarea>");
    $("body").append($tmp);
    $tmp.val($(el).val()).select();
    document.execCommand("copy");
    $tmp.remove();
}   