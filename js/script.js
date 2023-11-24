const formBody = document.getElementById('formBody')
const customBtn = document.getElementById('customBtn')
const customForm = document.getElementById('customForm')
const customSubmit = document.getElementById('customSubmit')
const customBgColor = document.getElementById('customBgColor')
const customTextColor = document.getElementById('customTextColor')
const customBorderWidth = document.getElementById('customBorderWidth')
const reviewTotal = document.getElementById('reviewTotal')
const productPhotosBody = document.getElementById('productPhotosBody')
const btnList = Array.from(document.getElementsByTagName("button"))
const productPhotosList = 28

var productPhotos = 10
let ele = document.querySelector(':root');
let cs = getComputedStyle(ele);
let reviewsBody = document.getElementById("reviewsBody");

var dislikeOn = false

const getNameInitials = (name) => {
    const splitName = name.split(" ")
    return splitName.length > 1 ? splitName[0][0].toUpperCase() + splitName[1][0].toUpperCase() : splitName[0][0].toUpperCase()
}

function getDateFormat(givenDate) {
    const dateTime = new Date(givenDate);

    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1; // Months are zero-based
    const day = dateTime.getDate();

    // Construct the formatted date string
    const formattedDate = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year < 10 ? '0' : ''}${year}`;

    // Print the formatted date
    return formattedDate;
}

for (let i = 0; i < productPhotos; i++) {
    productPhotosBody.innerHTML += `
        <div class="productPhotosCard">
            <img class="productPhotosImg" src="./assets/images/review2.png" alt="Product Photo">
        </div>
    `
}
if (productPhotosList > productPhotos) {
    productPhotosBody.innerHTML += `
    <div class="productPhotosCard">
        <img class="productPhotosImg" src="./assets/images/review2.png" alt="">
        <div class="productPhotosImgOverlay">
        <p class="productPhotosImgOverlayText">+${productPhotosList - productPhotos} images</p>
        </div>
    </div>
    `
}

const fetchReview = () => {
    fetch('./assets/reviews.json')
        .then(response => response.json())
        .then(data => {
            reviewTotal.innerHTML = `Based on ${data.length} Reviews`
            data.reverse().map(ele => {
                const starImages = Array(5).fill("./assets/icons/blank-star.svg");

                for (let i = 0; i < ele?.rating; i++) {
                    starImages[i] = "./assets/icons/default-star.svg";
                }


                reviewsBody.innerHTML += `
                    <div class="card reviewsCard">
                        <div class="reviewsCardBody">
                
                        <div class="cardBodyLeft">
                            <div class="reviewerInfo">
                            <div class="avatar flex-center"><span>${getNameInitials(ele?.customer?.name)} </span></div>
                            <div>
                                <h4 class="reviewerName">${ele?.customer?.name}</h4>
                                <span class="flex-between verified" style="gap: 5px;">
                                    <img src="./assets/icons/blue-tick.svg" alt="Blue Tick" class="blue-tick" />
                                    Verified Buyer
                                </span>
                            </div>
                            </div>
                        </div>
                
                
                        <div class="cardBodyRight">
                            <div class="flex-between" style="margin-bottom: 10px;">
                            <div class="star-rating flex-center">
                                ${starImages.map(src => {
                    console.log(src, "src")
                    return `<img src="${src}" alt="default-star" style="width: 20px" />`
                }).join("")}
                            </div>
                            <p>${getDateFormat(ele?.created_at)}</p>
                            </div>
                
                            <p style="margin-bottom: 10px;">
                            ${ele?.review}
                            </p>
                
                            <div class="flex-between">
                            <img src="./assets/images/review.jpeg" alt="review" width="80" height="80">
                            
                
                
                            <div class="likes-dislikes">
                            <form action="" method="post">
                                <button class="like-dislikes-btn" type="submit">
                                <img src="./assets/icons/arrow-up.svg" alt="arrow up" />
                                </button>
                            </form>
                            <p>${ele?.user_likes.length}</p>
                            <form action="" method="post">
                                <button class="like-dislikes-btn" type="submit">
                                <img src="./assets/icons/arrow-down.svg" alt="arrow down" />
                                </button>
                            </form>
                            <p>${ele?.user_dislikes.length}</p>
                            </div>
                            </div>
                        </div>
                        </div>
                
                    </div>
                `
            })
        })
        .catch(error => {
            console.error('Error loading JSON file:', error);
        });
}

fetchReview()
// review submission

customForm.addEventListener('submit', (e) => {
    e.preventDefault();
    document.documentElement.style.setProperty('--primary-color', customBgColor.value);
    document.documentElement.style.setProperty('--text-color', customTextColor.value);
    document.documentElement.style.setProperty('--border-width', `${customBorderWidth.value}px`);

    console.log("text", cs.getPropertyValue('--text-color'))
})

customBtn.addEventListener("click", () => {
    formBody.classList.toggle("formBodyUp")
    // dislikeOn = !dislikeOn
    // fetchReview()
})