const apiURL = 'https://openbudget.uz/api/v1/currency'; // API manzili

fetch(apiURL)
  .then(response => response.json()) // JSON formatida javobni olish
  .then(data => {
    console.log('API javobi:', data);
    // Boshqa ishlashlar
    const usd = data.currency.usd
    const eur = data.currency.eur
    const rub = data.currency.rub
    

    // Boshqa ishlashlar bilan xatolik yuz berdi
    const container = document.getElementById('container');
        
    const usdElement = document.createElement('div');
    const eurElement = document.createElement('div');
    const rubElement = document.createElement('div');

    usdElement.innerHTML = `USD: ${usd}`;
    eurElement.innerHTML =`EUR: ${eur}`;
    rubElement.innerHTML =`RUB: ${rub}`;
    container.appendChild(usdElement);
    container.appendChild(eurElement);
    container.appendChild(rubElement);
    
    console.log(usd);
    console.log(eur);
    console.log(rub);
   
  })
  .catch(error => {
    console.error('API bilan xatolik yuz berdi:', error);
  });