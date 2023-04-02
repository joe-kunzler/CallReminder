// Popup script code here

// Get the reminder list element
const reminderList = document.getElementById("reminder-list");

// Load the reminders from storage
chrome.storage.sync.get("reminders", function (data) {
  if (data.reminders) {
    // Iterate over each reminder and add it to the list
    for (const reminder of data.reminders) {
      const li = document.createElement("li");
      li.textContent = `${reminder.name} - ${reminder.frequency} - ${reminder.date}`;
      reminderList.appendChild(li);
    }
  }
});

// Listen for the form submit event
document.querySelector("form").addEventListener("submit", function (event) {
  // Prevent the form from submitting
  event.preventDefault();

  // Get the form values
  const name = document.getElementById("name").value;
  const frequency = document.getElementById("frequency").value;
  const customFrequency = document.getElementById("custom_frequency").value;
  const date = document.getElementById("date").value;

  // Create the reminder object
  const reminder = {
    name,
    frequency: frequency === "custom" ? customFrequency : frequency,
    date
  };

  // Get the reminders from storage
  chrome.storage.sync.get("reminders", function (data) {
    let reminders = data.reminders || [];

    // Add the new reminder to the list
    reminders.push(reminder);

    // Save the reminders to storage
    chrome.storage.sync.set({ reminders }, function () {
      // Clear the form
      document.querySelector("form").reset();

      // Add the new reminder to the list
      const li = document.createElement("li");
      li.textContent = `${reminder.name} - ${reminder.frequency} - ${reminder.date}`;
      reminderList.appendChild(li);
    });
  });
});
