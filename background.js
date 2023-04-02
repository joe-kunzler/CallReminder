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
            case "custom":
              nextDate = new Date(date.getTime() + parseInt(reminder.customFrequency) * 24 * 60 * 60 * 1000);
              break;
            default:
              nextDate = null;
          }
  
          if (nextDate && now >= date && now <= nextDate) {
            const options = {
              type: "basic",
              title: "Call Reminder",
              message: `It's time to call ${reminder.name}!`,
              iconUrl: "icon128.png"
            };
  
            chrome.notifications.create(options);
          }
        }
      }
    });
  }

// Call the checkReminders function every 15 minutes
setInterval(checkReminders, 15 * 60 * 1000);

  