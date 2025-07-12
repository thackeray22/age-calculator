function calculateAge() {
  const dobInput = document.getElementById("dob").value;
  if (!dobInput) {
    alert("Please select your date of birth.");
    return;
  }

  const dob = new Date(dobInput);
  const now = new Date();

  if (dob > now) {
    alert("Date of birth cannot be in the future.");
    return;
  }

  const diffMs = now - dob;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  const years = now.getFullYear() - dob.getFullYear();
  const months = (years * 12) + (now.getMonth() - dob.getMonth());

  document.getElementById("result").innerHTML = `
    <p><strong>Years:</strong> ${years}</p>
    <p><strong>Months:</strong> ${months}</p>
    <p><strong>Weeks:</strong> ${weeks}</p>
    <p><strong>Days:</strong> ${days}</p>
    <p><strong>Hours:</strong> ${hours}</p>
    <p><strong>Minutes:</strong> ${minutes}</p>
    <p><strong>Seconds:</strong> ${seconds}</p>
  `;
}

// Dark mode toggle functionality
document.getElementById("toggleTheme").addEventListener("change", function () {
  document.body.classList.toggle("dark");
});
