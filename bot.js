const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'mc.reallyworld.ru', // Айпи ReallyWorld
  port: 25565,
  username: 'RW_Helper_AI',  // Придумай уникальный ник, чтобы зайти
  version: '1.16.5'          // Стабильная версия для захода на RW
});

bot.on('spawn', () => {
  console.log('Бот зашел в хаб ReallyWorld!');
  
  // Через 5 секунд после захода открываем меню выбора режима (компас в руке)
  setTimeout(() => {
    bot.activateItem(); 
    console.log('Пытаюсь открыть меню выбора серверов...');
  }, 5000);
});

// Авто-клик по иконке в меню (чтобы зайти на гриф)
bot.on('windowOpen', async (window) => {
  console.log('Меню открыто, выбираю режим...');
  // Кликаем по первой попавшейся иконке (обычно это Анархия или Гриф)
  bot.clickWindow(0, 0, 0); 
});

// Анти-АФК система (чтобы ReallyWorld не кикал бота)
setInterval(() => {
  if (!bot.entity) return;
  
  // Бот делает шаг назад, потом шаг вперед
  bot.setControlState('back', true);
  setTimeout(() => {
    bot.setControlState('back', false);
    bot.setControlState('forward', true);
    setTimeout(() => bot.setControlState('forward', false), 500);
  }, 500);
}, 60000); // Повторять каждую минуту

// Ответы в чат
bot.on('chat', (username, message) => {
  if (username === bot.username) return;
  if (message.toLowerCase().includes('привет бот')) {
    bot.chat(`Привет, ${username}! Я стою на онлайн-хостинге.`);
  }
});

bot.on('end', () => {
  console.log('Отключился от RW. Переподключение...');
});
