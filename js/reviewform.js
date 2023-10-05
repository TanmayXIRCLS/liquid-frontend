const starRadio = [...document.getElementsByClassName("starRadio")]
var rating = 0

starRadio.forEach(element => {
    element.addEventListener("click", (e) => {
        rating = e.target.value
    })
});

const reviewForm = document.getElementById("reviewForm");

reviewForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const review = document.getElementById("review").value;
    const imageInput = document.getElementById("image");
    const image = imageInput.files[0];

    // You can perform actions with the form data here
    // For example, send it to a server using fetch()
    console.log("name", name);
    console.log("email", email);
    console.log("review", review);
    console.log("image", image);
    console.log("rating", rating)
    // Example: Create a FormData object to send the data

});
