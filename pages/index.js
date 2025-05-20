export default function Home() {
    return `
      <html>
        <head>
          <title>KamilJS - Home</title>
          <script src="/reload-client.js"></script>
          <style>
            body {
              margin: 0;
              padding: 0;
              background: #0f0f0f;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              color: #00ffe7;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              overflow: hidden;
            }
  
            h1 {
              font-size: 3em;
              text-shadow: 0 0 20px #00ffe7, 0 0 40px #00b3ff;
              animation: glow 2s infinite alternate;
            }
  
            @keyframes glow {
              from {
                text-shadow: 0 0 10px #00ffe7;
              }
              to {
                text-shadow: 0 0 20px #00ffe7, 0 0 40px #00b3ff;
              }
            }
  
            .footer {
              position: absolute;
              bottom: 20px;
              font-size: 0.9em;
              color: #666;
            }
          </style>
        </head>
        <body>
          <h1>Welcome to KamilJS!</h1>
          <div class="footer">Version 0.0.1 | Future is now</div>
        </body>
      </html>
    `;
  }
  