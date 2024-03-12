async function fetchData(apiUrl) {
    console.log(apiUrl)
    try {
      const response = await fetch(apiUrl);
      console.log(response)
      const data = await response.json();
      
      const container = document.getElementById('container-1');

      // JSON ma'lumotlarni HTML-ga joylash
      container.innerHTML = `
        <h2>${data.title}</h2>
        <p><strong>ID:</strong> ${data.id}</p>
        <p><strong>Type:</strong> ${data.type}</p>
        <p><strong>Region Title:</strong> ${data.region_title}</p>
        <p><strong>District Title:</strong> ${data.district_title}</p>
        <p><strong>Quarter Title:</strong> ${data.quarter_title}</p>
        <p><strong>Category Title:</strong> ${data.category_title}</p>
        <p><strong>Author Fullname:</strong> ${data.author_fullname}</p>
        <p><strong>Description:</strong> ${data.description}</p>
        <p><strong>Stage:</strong> ${data.stage}</p>
        <p><strong>Granted Amount:</strong> ${data.granted_amount}</p>
        <p><strong>Requested Amount:</strong> ${data.requested_amount}</p>
        <p><strong>Vote Count:</strong> ${data.vote_count}</p>
      `;
      
      // Rasm elementlarini HTML-ga joylash
      data.images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        container.appendChild(imgElement);
      });
      
      // CSS qo'shish
      const style = document.createElement('style');
      style.innerHTML = `
        .container {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          padding: 20px;
          margin: 10px;
        }
      
        h2 {
          color: #333;
          font-size: 24px;
          margin-bottom: 10px;
        }
      
        p {
          margin: 5px 0;
        }
      
        strong {
          font-weight: bold;
        }
      
        img {
          width: 200px;
          height: auto;
          margin-top: 10px;
        }
      `;
      
      // CSS ni head tegiga qo'shish
      document.head.appendChild(style);
      console.log(count)
      populateTable(data);
    } catch (error) {
      console.error(error);
    }
  }
  
  const API = "https://openbudget.uz/api/v1/initiatives/a179ffe2-d6e8-4a02-b733-c745421992c1";
  fetchData(API);


// HTML elementlarni tanlash
