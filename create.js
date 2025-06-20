
const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  const { image, url } = JSON.parse(event.body);
  const id = Date.now().toString();
  const filename = `preview-${id}.html`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta property="og:title" content="Click to view" />
  <meta property="og:description" content="Surprising content awaits!" />
  <meta property="og:image" content="${image}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:type" content="website" />
  <meta http-equiv="refresh" content="0;url=${url}" />
  <title>Redirecting...</title>
</head>
<body>
  <a href="${url}">
    <img src="${image}" alt="Preview" style="max-width: 100%; border-radius: 12px;" />
  </a>
</body>
</html>
`;

  const filePath = path.join(__dirname, `../../previews/${filename}`);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, html);

  return {
    statusCode: 200,
    body: JSON.stringify({
      preview: `https://${process.env.URL || "your-site.netlify.app"}/previews/${filename}`
    })
  };
};
