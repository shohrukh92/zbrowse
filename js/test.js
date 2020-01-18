const Wappalyzer = require("wappalyzer");
const fs = require("fs");
const url = "http://rasales.by";

const options = {
  debug: false,
  delay: 1000,
  maxDepth: 10,
  maxUrls: 100,
  maxWait: 5000,
  recursive: true,
  userAgent: "Wappalyzer",
  htmlMaxCols: 20000,
  htmlMaxRows: 20000
};

const wappalyzer = new Wappalyzer(url, options);

// Optional: set the browser to use
// wappalyzer.browser = Wappalyzer.browsers.zombie;

// Optional: capture log output
// wappalyzer.on('log', params => {
//   const { message, source, type } = params;
// });

// Optional: do something on page visit
// wappalyzer.on('visit', params => {
//   const { browser, pageUrl } = params;
// });

wappalyzer
  .analyze()
  .then(json => {
    process.stdout.write(`${JSON.stringify(json, null, 2)}\n`);
    fs.writeFileSync("wa.json", JSON.stringify(json, null, 2));

    process.exit(0);
  })
  .catch(error => {
    process.stderr.write(`${error}\n`);

    process.exit(1);
  });
