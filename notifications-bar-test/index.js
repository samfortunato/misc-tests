const NOTIFICATIONS = [];

const openNotificationsButton = document.querySelector('button#open-notifications');
openNotificationsButton.addEventListener('click', openNotifications);

const sendNotificationButton = document.querySelector('button#send-notification');
sendNotificationButton.addEventListener('click', () => {
  const notification = {
    body: 'Sup dude! NOTIFICATION',
    date: new Date(),
  };

  NOTIFICATIONS.unshift(notification);
  // getNotifications();
  console.log(NOTIFICATIONS);
});

// function getNotifications() {
//   const notificationsList = document.querySelector('#notifications-list');

//   if (notificationsList) {

//   }
// }

function openNotifications() {
  const notificationsUl = document.createElement('ul');
  notificationsUl.id = 'notifications-list';

  NOTIFICATIONS.forEach((notification) => {
    const notificationLi = document.createElement('li');
    notificationLi.textContent = `${notification.date.toLocaleTimeString()}: ${notification.body}`;

    notificationsUl.appendChild(notificationLi);
  });

  document.body.appendChild(notificationsUl);
}
