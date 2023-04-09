function checkReminders() {
  chrome.storage.sync.get("reminders", function (data) {
    if (data.reminders) {
      for (const reminder of data.reminders) {
        const now = new Date();
        const date = new Date(reminder.date);
        const frequency = reminder.frequency;
        let nextDate;

        switch (frequency) {
          case "daily":
            nextDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);
            break;
          case "weekly":
            nextDate = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
            break;
          case "biweekly":
            nextDate = new Date(date.getTime() + 14 * 24 * 60 * 60 * 1000);
            break;
          case "monthly":
            nextDate = new Date(date.getTime());
            nextDate.setMonth(nextDate.getMonth() + 1);
            break;
          default:
            nextDate = null;
        }

        if (nextDate && now >= date) {
          const options = {
            type: "basic",
            title: "Call Reminder",
            message: `It's time to call ${reminder.name} at ${reminder.time}!`,
            iconUrl: "icon128.png",
            requireInteraction: true // Make the popup stay until user interacts with it
          };

          chrome.notifications.create(options);

          // Play a sound
          const audio = new Audio("success-fanfare-trumpets-6185.mp3");
          audio.play();
        }
      }
    }
  });
}

// Call the checkReminders function every 15 minutes
setInterval(checkReminders, 1 * 60 * 1000);

  