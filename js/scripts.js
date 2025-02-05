document.addEventListener("DOMContentLoaded", function () {
    loadHomeContent();
    loadGallery();
    setupFormValidation();
});

function loadHomeContent() {
    fetch("data/data.json")
        .then(response => response.json())
        .then(data => {
            document.getElementById("intro-text").innerText = data.home.introText;
        })
        .catch(error => console.error("Error loading home content:", error));
}

function loadGallery() {
    fetch("data/data.json")
        .then(response => response.json())
        .then(data => {
            const galleryContainer = document.getElementById("gallery-container");
            if (!galleryContainer) return;

            data.gallery.forEach(item => {
                const imgElement = document.createElement("img");
                imgElement.src = item.src;
                imgElement.alt = item.title;
                imgElement.title = item.description;
                galleryContainer.appendChild(imgElement);
            });
        })
        .catch(error => console.error("Error loading gallery:", error));
}

function setupFormValidation() {
    const form = document.getElementById("form");
    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();
        const formMessage = document.getElementById("form-message");

        if (!name || !email || !subject || !message) {
            formMessage.textContent = "Please fill all fields!";
            formMessage.style.color = "red";
            return;
        }

        formMessage.textContent = "Form submitted successfully!";
        formMessage.style.color = "green";
        form.reset();
    });
}
