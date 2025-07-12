function calculateAge() {
  const dobInput = document.getElementById("dob").value;
  const photo = document.getElementById("photoUpload").files[0];
  const preview = document.getElementById("photoPreview");
  const clickSound = document.getElementById("clickSound");
  const birthdaySound = document.getElementById("birthdaySound");

  if (!dobInput) {
    alert("Please select your date of birth.");
    return;
  }

  clickSound.play();

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

  // Show result
  document.getElementById("result").innerHTML = `
    <p><strong>Years:</strong> ${years}</p>
    <p><strong>Months:</strong> ${months}</p>
    <p><strong>Weeks:</strong> ${weeks}</p>
    <p><strong>Days:</strong> ${days}</p>
    <p><strong>Hours:</strong> ${hours}</p>
    <p><strong>Minutes:</strong> ${minutes}</p>
    <p><strong>Seconds:</strong> ${seconds}</p>
  `;

  // Profile photo preview
  if (photo) {
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.src = e.target.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(photo);
  }

  // Countdown to next birthday
  let nextBirthday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
  if (nextBirthday < now) {
    nextBirthday.setFullYear(now.getFullYear() + 1);
  }
  const countdownDays = Math.floor((nextBirthday - now) / (1000 * 60 * 60 * 24));
  document.getElementById("countdown").innerHTML = `<p>🎉 Your next birthday is in ${countdownDays} days!</p>`;
  if (countdownDays === 0) {
    birthdaySound.play();
    alert("🎉 Happy Birthday to You!");
  }

  // Zodiac sign
  const zodiacSigns = [
    { sign: "Capricorn", start: "01-01", end: "01-19" },
    { sign: "Aquarius", start: "01-20", end: "02-18" },
    { sign: "Pisces", start: "02-19", end: "03-20" },
    { sign: "Aries", start: "03-21", end: "04-19" },
    { sign: "Taurus", start: "04-20", end: "05-20" },
    { sign: "Gemini", start: "05-21", end: "06-20" },
    { sign: "Cancer", start: "06-21", end: "07-22" },
    { sign: "Leo", start: "07-23", end: "08-22" },
    { sign: "Virgo", start: "08-23", end: "09-22" },
    { sign: "Libra", start: "09-23", end: "10-22" },
    { sign: "Scorpio", start: "10-23", end: "11-21" },
    { sign: "Sagittarius", start: "11-22", end: "12-21" },
    { sign: "Capricorn", start: "12-22", end: "12-31" }
  ];

  const monthDay = ("0" + (dob.getMonth() + 1)).slice(-2) + "-" + ("0" + dob.getDate()).slice(-2);
  const zodiac = zodiacSigns.find(z => monthDay >= z.start && monthDay <= z.end)?.sign || "Unknown";
  document.getElementById("zodiac").innerHTML = `<p>🔮 Your Zodiac Sign: ${zodiac}</p>`;

  // Fun facts
  const avgBreathsPerDay = 23000;
  const avgHeartbeatsPerDay = 100000;
  const breathCount = days * avgBreathsPerDay;
  const heartbeatCount = days * avgHeartbeatsPerDay;
  document.getElementById("funFacts").innerHTML = `
    <p>🫁 Approx. Breaths Taken: ${breathCount.toLocaleString()}</p>
    <p>❤️ Approx. Heartbeats: ${heartbeatCount.toLocaleString()}</p>
  `;
}

// Dark mode toggle functionality
document.getElementById("toggleTheme").addEventListener("change", function () {
  document.body.classList.toggle("dark");
});
