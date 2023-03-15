const sendRequest = (location) => {
  fetch(`https://weather-7yxl.onrender.com/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        console.log(data)
        if (data?.success) {
          successMessage.textContent = data.forecast;
          errorMessage.textContent = "";
        } else {
          errorMessage.textContent = data.msg;
          successMessage.textContent = "";
          console.log("Hii");
        }
      });
    }
  );
};

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const errorMessage = document.querySelector("#error");
const successMessage = document.querySelector("#success");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  successMessage.textContent = "Loading...";
  sendRequest(location);

  console.log(location);
});
