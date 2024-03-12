const showBtn = document.querySelector("#show-btn");
const modal = document.querySelector("#modal");
const closeBtn = document.querySelector("#close-btn");
const overlay = document.querySelector("#overlay");
function displaySuccessMessage(message) {
  successElement.innerText = message;
  successElement.classList.add("show");
}
//add classlist hidden
const addHidden = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

//remove classlist hidden

const removeHidden = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

showBtn.addEventListener("click", removeHidden);

closeBtn.addEventListener("click", addHidden);

overlay.addEventListener("click", addHidden);

document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    addHidden();
    console.log("you are clicked escape");
  }
});

const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const phoneNumberInput = document.getElementById("phoneNumber");
const amountInput = document.getElementById("amount");
const imageInput = document.getElementById("image");
const errorElement = document.getElementById("error");
const successElement = document.getElementById("success");

async function checkImageExists(imageName) {
  try {
    const response = await fetch(`/server/rasmlar/${imageName}`);
    if (!response.ok) {
      throw new Error("Image does not exist");
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

//timeout
function displayErrorMessage(message) {
  errorElement.innerText = message;
  errorElement.classList.add("show");
}

const removeHiddenn = () => {
  errorElement.classList.remove("hidden");
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = nameInput.value;
  const message = messageInput.value;
  const phoneNumber = phoneNumberInput.value;
  const amount = amountInput.value;
  const image = imageInput.files[0];

  if (
    name.trim() === "" ||
    message.trim() === "" ||
    phoneNumber.trim() === "" ||
    amount.trim() === ""
  ) {
    displayErrorMessage("Iltimos, barcha maydonlarni toʻldiring");
    return;
  }
  const imageExists = await checkImageExists(image.name);
  if (imageExists) {
    displayErrorMessage("Boshqa rasm yuboring, bu rasm allaqachon bazada bor");
    setTimeout(() => {
      displayErrorMessage("");
    }, 2500);
    removeHiddenn();
    return;
  }
  if (message.length > 15) {
    displayErrorMessage("Izoh 15 belgidan oshmasligi kerak");
    setTimeout(() => {
      displayErrorMessage("");
    }, 2500);
    removeHiddenn();
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("message", message);
  formData.append("phoneNumber", phoneNumber);
  formData.append("amount", amount);
  formData.append("image", image);

  sendFormData(formData).then(() => {
    alert("MA'LUMOTLAR YUBORILDI");
    location.reload();
  });
});

async function sendFormData(formData) {
  try {
    const response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      body: formData,
    });
    console.log(response.status);
    if (response.status === 500) {
      alert("Jo'natildi");
      displaySuccessMessage("Xabaringiz jo'natildi");
      // Kerakli qismlarni yangilash
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.log(error);
    displayErrorMessage("Xatolik yuz berdi");
    // Xatoni boshqarish
  }
}

//full time elements
const fullDay = document.getElementById("full-day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

//function time-vaqt funksiyasi

function getTime() {
  //yil oy kun
  const now = new Date();
  const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const month =
    now.getMonth() < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
  const year = now.getFullYear();

  //soat minut sekund
  const hour = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  const minute =
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const second =
    now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentyabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr",
  ];

  const month_title = now.getMonth();
  //sanalarni chiqarish
  fullDay.textContent = `${date} ${months[month_title]}, ${year} yil`;
  //vaqtni chiqarish
  hourEl.textContent = hour;
  minuteEl.textContent = minute;
  secondEl.textContent = second;
  //return qilamiz
  return `${hour}:${minute}:${second}, ${date}.${month}.${year}`;
}

setInterval(getTime, 1000);

const apiURL = "https://openbudget.uz/api/v1/currency"; // API manzili

fetch(apiURL)
  .then((response) => response.json()) // JSON formatida javobni olish
  .then((data) => {
    console.log("API javobi:", data);
    // Boshqa ishlashlar
    const usd = data.currency.usd;
    const eur = data.currency.eur;
    const rub = data.currency.rub;

    // Boshqa ishlashlar bilan xatolik yuz berdi
    const container = document.getElementById("container");

    const usdElement = document.createElement("div");
    const eurElement = document.createElement("div");
    const rubElement = document.createElement("div");

    usdElement.innerHTML = `USD: ${usd} so'm`;
    eurElement.innerHTML = `EUR: ${eur} so'm`;
    rubElement.innerHTML = `RUB: ${rub} so'm`;
    container.appendChild(usdElement);
    container.appendChild(eurElement);
    container.appendChild(rubElement);

    console.log(usd);
    console.log(eur);
    console.log(rub);
  })
  .catch((error) => {
    console.error("API bilan xatolik yuz berdi:", error);
  });

///////////////////////////////////////////////////////////////////////////////////////////

async function fetchData(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const container = document.getElementById("container-1");
    const images1 = document.getElementById("images1")


    // JSON ma'lumotlarni HTML-ga joylash
    container.innerHTML = `
        <p><strong>Viloyat nomi: </strong> ${data.region_title}</p>
        <p><strong>Tuman nomi: </strong> ${data.district_title}</p>
        <p><strong>Mahalla nomi: </strong> ${data.quarter_title}</p>
        <p><strong>Kategoriyasi: </strong> ${data.category_title}</p>
        <p><strong>Muallifning to'liq ismi: </strong> ${data.author_fullname}</p>
        <p><strong>Tavsif: </strong> ${data.description}</p>
        <p><strong>Bosqich: </strong> ${data.stage}</p>
        <p><strong>Beriladigan miqdor: </strong> ${data.granted_amount}</p>
        <p><strong>So'ralgan miqdor: </strong> ${data.requested_amount}</p>
        <p><strong>Ovozlar soni: </strong> ${data.vote_count}</p>
      `;
    
    
    // Rasm elementlarini HTML-ga joylash
    data.images.forEach((image) => {
      const imgElement = document.createElement("img");
      imgElement.src = `https://openbudget.uz/api/v2/info/file/${image}`;
      images1.appendChild(imgElement);
    });
    populateTable(data);
  } catch (error) {
    console.error(error);
  }
}

const API =
  "https://openbudget.uz/api/v1/initiatives/a179ffe2-d6e8-4a02-b733-c745421992c1";
fetchData(API);

// HTML elementlarni tanlash
