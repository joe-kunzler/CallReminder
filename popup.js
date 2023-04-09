function addReminderToList(reminder) {
    const reminderList = document.getElementById("reminder-list");
    const listItem = document.createElement("li");
    const text = document.createTextNode(`${reminder.name} - ${reminder.frequency} - ${reminder.time}`);
    listItem.appendChild(text);
    
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", function() {
      deleteReminder(reminder.id);
      listItem.remove();
    });
    listItem.appendChild(deleteButton);
    
    reminderList.appendChild(listItem);
  }
  
function loadReminders() {
    chrome.storage.sync.get("reminders", function (data) {
        if (data.reminders) {
        console.log('Loaded reminders:', data.reminders); // Add this line
        for (const reminder of data.reminders) {
            addReminderToList(reminder);
        }
        }
    });
    }
  

function deleteReminder(id) {
    chrome.storage.sync.get("reminders", function (data) {
        const reminders = data.reminders || [];
        const updatedReminders = reminders.filter(function(reminder) {
        return reminder.id !== id;
        });
        chrome.storage.sync.set({ reminders: updatedReminders });
    });
    }
  
function addReminder(event) {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const frequency = document.getElementById("frequency").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const id = Date.now().toString();
  
    const reminder = {
      id,
      name,
      frequency,
      date,
      time
    };
  
    chrome.storage.sync.get("reminders", function (data) {
      const reminders = data.reminders || [];
      reminders.push(reminder);
      chrome.storage.sync.set({ reminders }, function () {
        addReminderToList(reminder);
      });
    });
  
    event.target.reset();
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    loadReminders();
    document.getElementById("add-reminder-form").addEventListener("submit", addReminder);
  });
  