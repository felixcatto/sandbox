import clientPages from './clientPages';


export default (ctx, pugRender) => (path, locals = {}) => {
  pugRender(path, locals);
  const clientScriptName = path.replace(/\//g, '.');
  const script = clientPages.includes(clientScriptName)
    ? `<script src="/js/${clientScriptName}.js" async></script>`
    : '';
  const body = ctx.body.replace('{{clientPageScript}}', script);
  ctx.body = body;
};
