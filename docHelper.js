const fs = require('fs');

fs.readFile("./src/components/Board.vue", function (err, data) {
    if (err)
        throw err;
    let newFile = processFile(data.toString());
    fs.writeFile("./src/components/Board.ts", newFile, function (err) {
        if (err)
            throw err;
        console.log("Script content in Board.vue written to Board.ts.");
    });
});
fs.readFile("./src/components/Cell.vue", function (err, data) {
    if (err)
        throw err;
    let newFile = processFile(data.toString());
    fs.writeFile("./src/components/Cell.ts", newFile, function (err) {
        if (err)
            throw err;
        console.log("Script content in Cell.vue written to Cell.ts.");
    });
});
fs.readFile("./src/components/ConfigPage.vue", function (err, data) {
    if (err)
        throw err;
    let newFile = processFile(data.toString());
    fs.writeFile("./src/components/ConfigPage.ts", newFile, function (err) {
        if (err)
            throw err;
        console.log("Script content in ConfigPage.vue written to ConfigPage.ts.");
    });
});

function processFile(vue) {
    let fileStart = vue.search("import");
    let fileEnd = vue.search("</script>");
    let ts = vue.slice(fileStart, fileEnd);
    return ts.replace(".vue", "");
}