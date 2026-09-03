
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const targetUrl = 'file:///C:/Users/Christabell/.gemini/antigravity/scratch/synapse-is-dashboard/index.html';
const port = 9222;
const edge = spawn(edgePath, [
  '--headless',
  '--disable-gpu',
  `--remote-debugging-port=${port}`,
  '--remote-allow-origins=*',
  targetUrl
]);
async function run() {
  await new Promise(r => setTimeout(r, 1500));
  try {
    const res = await fetch(`http://127.0.0.1:${port}/json`);
    const tabs = await res.json();
    const tab = tabs.find(t => t.type === 'page');
    if (!tab) {
      console.log('No page tab found');
      edge.kill();
      return;
    }
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    ws.onopen = () => {
      ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
      ws.send(JSON.stringify({ id: 2, method: 'Log.enable' }));
    };
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.exceptionThrown') {
        console.error('EXCEPTION:', JSON.stringify(msg.params.exceptionDetails, null, 2));
      }
      if (msg.method === 'Runtime.consoleAPICalled') {
        console.log('CONSOLE [' + msg.params.type + ']:', msg.params.args.map(a => a.value || a.description).join(' '));
      }
    };
    setTimeout(() => {
      console.log('Finished listening for browser errors.');
      ws.close();
      edge.kill();
    }, 4000);
  } catch (err) {
    console.error('Error connecting to browser:', err);
    edge.kill();
  }
}
run();
