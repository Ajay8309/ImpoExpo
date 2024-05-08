
document.querySelector('.nav-toggle').addEventListener('click',function(){
    document.querySelector('.nav-list').classList.toggle('show-links');
})

document.querySelector('.close-btn').addEventListener('click',function(){
    document.querySelector('.nav-list').classList.remove('show-links');
    console.log("bla bla")
})


const colors = ["white", "rgba(133,122,200)", " rgb(93, 98, 90)"];


const btn = document.querySelector('.flip');

btn.addEventListener('click',function(){
    const randomNumber = getRandomNumber();
   
    document.body.style.backgroundColor = colors[randomNumber];

  if(randomNumber!=0){
    document.querySelector('.service').style.color = 'white';
    document.querySelector('.intro').classList.add("color-white");
    document.querySelector('.about-me-body').style.color = 'black';   
     document.querySelector('.my-skills').classList.add('color-white');
    document.querySelector('.section-title-skills').style.color = 'white';
    document.querySelector('.section-title-about').style.color = 'white';
    document.querySelector('.foot').style.color = 'white';
    document.querySelector('.section-title-about').style.color = 'black';
    
    
    
}else{
    document.querySelector('.intro').classList.remove("color-white");
    document.querySelector('.flip').classList.remove('flip-white');
    document.querySelector('.my-skills').classList.remove('color-white');
    document.querySelector('.section-title-skills').style.color = 'black';
    document.querySelector('.about-me-body').style.color = 'black';   
    document.querySelector('.section-title-about').style.color = 'black';
}
})

function getRandomNumber() {
    return Math.floor(Math.random() * colors.length);
  }


  document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".intro").classList.add("show");
});

  
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.querySelector("form"); // Ensure this selector matches your form

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        // Check if all fields are filled (this is somewhat redundant with the 'required' attribute, but serves as an additional check)
        const formData = new FormData(contactForm);
        let allFieldsFilled = true;
        for (let [key, value] of formData.entries()) {
            if (!value.trim()) {
                allFieldsFilled = false;
                alert(`Please fill in the ${key} field.`);
                break;
            }
        }

        if (!allFieldsFilled) {
            return; // Stop the function here if not all fields are filled
        }

        // Proceed with form submission if all fields are filled
        const jsonData = {};
        formData.forEach((value, key) => {
            jsonData[key] = value.trim(); // Trim values to remove any leading/trailing whitespace
        });

        console.log(jsonData); // This is for debugging; remove or comment out in production

        fetch(`https://impoexpo.onrender.com/submit-form`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => {
            if (response.ok) {
                console.log("Form submitted successfully");
                contactForm.reset(); // Reset form after successful submission
            } else {
                console.error("Form submission failed");
            }
        })
        .catch(error => {
            console.error("Error submitting form:", error);
        });
    });
});


// Get all menu items
const menuItems = document.querySelectorAll('.vertical-menu a');

// Add a click event listener to each menu item
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    // Remove the 'active' class from all menu items
    menuItems.forEach(item => item.classList.remove('active'));
    
    // Add the 'active' class to the clicked menu item
    item.classList.add('active');
  });
});

