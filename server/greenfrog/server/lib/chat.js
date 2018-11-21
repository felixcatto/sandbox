import db from '../models';


export default (wss) => {
  wss.on('connection', async (ws, request) => {
    const sendMessage = (msg, client = ws) => client.send(JSON.stringify(msg));

    const getAllMessages = async () => {
      const messages = await db.Message.findAll({
        include: [{
          model: db.User,
        }],
      });
      return messages.map(el => el.get({ plain: true }));
    };

    const sendChatHistory = (messages, client = ws) => {
      sendMessage({
        type: 'CHAT_HISTORY',
        payload: messages,
      }, client);
    };

    const broadcast = (func) => {
      Array.from(wss.clients)
        .filter(client => client.readyState === ws.OPEN)
        .forEach(client => func(client));
    };

    const userId = request.headers.cookie
      ?.split('; ')
      .find(el => el.startsWith('userId='))
      ?.split('=')[1];

    const user = await db.User.findOne({
      where: { id: userId },
    });

    if (!user) {
      return;
    }

    const allMessages = await getAllMessages();
    sendChatHistory(allMessages);

    ws.on('message', async (message) => {
      const createdMessage = await db.Message.create({ message });

      await user.addMessage(createdMessage);

      const messages = await getAllMessages();
      broadcast(client => sendChatHistory(messages, client));
    });
  });
};
