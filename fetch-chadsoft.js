const fs = require('fs');


async function fetchChadsoft() {
    let url = "https://tt.chadsoft.co.uk/index.json";
    let response = await fetch(url);
    let data = await response.json();

    let recentCtTopFive = {
      recentRuns: data.recentRecords.filter((record) => record.defaultTrack === false && record["200cc"] === false),
      lastUpdated: new Date().toLocaleString()
    }

    
    fs.writeFile("recentRuns.json", JSON.stringify(recentCtTopFive, null, 4), (err) => {
      if (err) {
        console.error("Error writing JSON to file:", err);
      } else {
        console.log("JSON data written to file successfully.");
      }
    });
    
}

fetchChadsoft();