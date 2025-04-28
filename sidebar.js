async function getCurrentTabUrl() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: "GET_URL" }, (response) => {
      resolve(response.url);
    });
  });
}

async function fetchCarbonFootprint(url) {
  const prompt = `
  Estimate the carbon footprint of this product: ${url}.
  Use shipping destination as Palo Alto, CA.
  Speculate on the likely origin of the product based on company headquarters (likely China).
  
  Return the answer with:
  - A "Likely Source" section estimating the manufacturing location.
  - A "Carbon Footprint Estimate" section summarizing Materials, Manufacturing, Transportation, Packaging, End-of-life Disposal, Total.
  - A "Trees Needed to Offset" section estimating how many mature trees would be needed to absorb that much CO₂ annually.
  - A "More Sustainable Alternatives" section listing two better alternatives.
  
  **Return the ENTIRE answer only in raw HTML.**
  Do not use Markdown.
  Do not summarize in text form.
  Output full HTML tags like <h2>, <table>, <tr>, <td>, <ul>, <li>, <p>, etc.
  
  Structure the HTML output exactly like this:
  - <h2> Likely Source </h2>
  - <p>Short paragraph estimating product origin</p>
  - <h2> Carbon Footprint Estimate </h2>
  - <table> Summary table of carbon components (Materials, Manufacturing, Transportation, Packaging, End-of-life, Total)</table>
  - <h2> Trees Needed to Offset Carbon </h2>
  - <p>Estimated number of mature trees needed to offset total carbon footprint</p>
  - <h2> More Sustainable Alternatives </h2>
  - <ul> Each alternative as a list item with short description</ul>
  
  **Use simple, clean, readable HTML. No CSS classes needed, just basic tags.**
  Example format:
  
  <h2>Likely Source</h2>
  <p>This product is likely manufactured in China based on company headquarters and product category.</p>
  
  <h2>Carbon Footprint Estimate</h2>
  <table>
    <tr><th>Component</th><th>Emissions</th></tr>
    <tr><td>Materials</td><td>22.5 kg CO₂e</td></tr>
    <tr><td>Manufacturing</td><td>1.3 kg CO₂e</td></tr>
    <tr><td>Transportation</td><td>2.4 kg CO₂e</td></tr>
    <tr><td>Packaging</td><td>0.4 kg CO₂e</td></tr>
    <tr><td>End-of-life Disposal</td><td>0.7 kg CO₂e</td></tr>
    <tr><th>Total</th><th>27.3 kg CO₂e</th></tr>
  </table>
  
  <h2>Trees Needed to Offset Carbon</h2>
  <p>Approximately <strong>1.4 mature trees</strong> would be needed to absorb this carbon footprint over a year.</p>
  
  <h2>More Sustainable Alternatives</h2>
  <ul>
    <li>Alternative 1: [description]</li>
    <li>Alternative 2: [description]</li>
  </ul>
  
  DO NOT return any explanations outside of the HTML.
  Only raw HTML tags and structured content.
  `;
  
  

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": "Bearer OPENAI_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1",
      tools: [{type: "web_search_preview"}],
      input: prompt
      //messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
  return data.output?.[1]?.content[0].text || "No response";
  //return JSON.stringify(data.output?.[1]?.content[0]);
}

(async () => {
  const url = await getCurrentTabUrl();

  const amazonProductRegex = /^https:\/\/([a-zA-Z0-9-]+\.)?amazon\.[a-z.]+\/(?:.*\/)?dp\/[A-Z0-9]+/i;
  const targetProductRegex = /^https:\/\/([a-zA-Z0-9-]+\.)?target\.com\/p\/.+\/-\/A-\d+/i;
  const walmartProductRegex = /^https:\/\/([a-zA-Z0-9-]+\.)?walmart\.com\/ip\/.+\/\d+/i;
  const sheinProductRegex = /^https:\/\/([a-zA-Z0-9-]+\.)?shein\.com\/.+-p-\d+\.html/i;

  if (
    !(
      amazonProductRegex.test(url) ||
      targetProductRegex.test(url) ||
      walmartProductRegex.test(url) ||
      sheinProductRegex.test(url)
    )
  ) {
    document.getElementById("carbon-result").textContent = "Not a supported product page.";
    return;
  }

  const result = await fetchCarbonFootprint(url);
  document.getElementById("carbon-result").innerHTML = result;
})();

