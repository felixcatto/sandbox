#!/usr/bin/env node
import getServer from '../main';


getServer()
  .then(server => server.listen(process.env.PORT || 4000));
