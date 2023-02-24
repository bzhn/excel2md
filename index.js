const excelTextarea = document.getElementById("excel-textarea");
excelTextarea.value = localStorage.getItem('my-exceltextarea-value');
const markdownTextarea = document.getElementById("markdown-textarea");
markdownTextarea.value = localStorage.getItem('my-markdowntextarea-value');

const copyBtn = document.querySelector(".copy-btn");
const modeToggleBtn = document.getElementById('mode-toggle');
var isDarkModeInLS = localStorage.getItem('darkmode-enabled');
if (isDarkModeInLS) {
    document.body.classList.add('dark-mode');
    modeToggleBtn.style.backgroundColor = '#fff';
} else {
    document.body.classList.remove('dark-mode');
    modeToggleBtn.style.backgroundColor = '#1c1c1c';
}


// function to convert Excel table to Markdown table
function startFormatting() {

    // Check if the first textarea is empty
    if (excelTextarea.value.trim() === '') {
        markdownTextarea.value = ''; // Clear the second textarea
        return; // Exit the function
    }

    // TODO: If the first line of excelTextarea is empty, check the overall number of columns in the table
    // and add empty cells to the first line of markdown table, so the user will be able to fill column names by himself

    // get the content of Excel table
    const excelTable = excelTextarea.value;
    // split rows of Excel table
    const rows = excelTable.split("\n");
    // initialize Markdown table string
    let markdownTable = "";
    // loop through rows of Excel table
    for (let i = 0; i < rows.length; i++) {
        // split columns of each row
        const columns = rows[i].split("\t");
        // Separate first row that contains names of columns
        if (i == 1) {
            headerSeparator = "| --- ".repeat(columns.length) + "|\n"
            markdownTable += headerSeparator
        }
        // add row of Markdown table
        markdownTable += "|";
        for (let j = 0; j < columns.length; j++) {
            markdownTable += columns[j] + "|";
        }
        markdownTable += "\n";
    }
    // set Markdown table content
    markdownTextarea.value = markdownTable;
    storeTextAreaValues()
}

// function to copy Markdown table to clipboard and change button text
function copyMarkdownTable() {
    // get Markdown table content
    const markdownTable = markdownTextarea.value;
    // create a temporary textarea element to copy content from
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = markdownTable;
    // append textarea to body and select its content
    document.body.appendChild(tempTextarea);

    tempTextarea.select();
    // copy content to clipboard
    document.execCommand("copy");
    // remove temporary textarea from body
    document.body.removeChild(tempTextarea);
    // change button text to "Copied" for 2 seconds
    copyBtn.textContent = "Copied";
    setTimeout(function () {
        copyBtn.textContent = "Copy to clipboard";
    }, 2000);
}

// Switch theme
modeToggleBtn.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');

    // Change mode toggle button color
    const isDarkMode = document.body.classList.contains('dark-mode');
    modeToggleBtn.style.backgroundColor = isDarkMode ? '#fff' : '#1c1c1c';
    isDarkMode ? localStorage.setItem('darkmode-enabled', true) : localStorage.removeItem('darkmode-enabled')
});

// Save content of text areas when they change
excelTextarea.addEventListener('input', function () {
    storeTextAreaValues()
});

markdownTextarea.addEventListener('input', function () {
    storeTextAreaValues()
});

function loadTextAreaValues() {
    excelTextarea.value = localStorage.getItem('my-exceltextarea-value');
    markdownTextarea.value = localStorage.getItem('my-markdowntextarea-value');
}

function storeTextAreaValues() {
    const excelValue = excelTextarea.value;
    localStorage.setItem('my-exceltextarea-value', excelValue);
    const mdVvalue = markdownTextarea.value;
    localStorage.setItem('my-markdowntextarea-value', mdVvalue);
}