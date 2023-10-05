let reviewsBody = document.getElementById("reviewsBody");

const getNameInitials = (name) => {
    const splitName = name.split(" ")
    return splitName[0][0].toUpperCase() + splitName[1][0].toUpperCase()
}

function getDateDifference(givenDate) {
    const givenDateTime = new Date(givenDate);
    const currentDateTime = new Date();
    const timeDifference = currentDateTime - givenDateTime;

    // Calculate the difference in days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Calculate the difference in months
    const givenMonth = givenDateTime.getMonth() + 1; // Months are 0-based
    const currentMonth = currentDateTime.getMonth() + 1; // Months are 0-based
    const monthsDifference = (currentDateTime.getFullYear() - givenDateTime.getFullYear()) * 12 + (currentMonth - givenMonth);

    // Calculate the difference in years
    const yearsDifference = currentDateTime.getFullYear() - givenDateTime.getFullYear();

    if (yearsDifference > 0) {
        return yearsDifference + " years"
    } else if (monthsDifference > 0) {
        return monthsDifference + " months"
    } else {
        return daysDifference + " days"
    }

}

fetch('./reviews.json')
    .then(response => response.json())
    .then(data => {
        data.reverse().map(ele => {
            const starImages = Array(5).fill("./assets/icons/blank-star.svg");

            for (let i = 0; i < ele.rating; i++) {
                starImages[i] = "./assets/icons/default-star.svg";
            }

            reviewsBody.innerHTML += `
            <div class="card reviewsCard">
                <div class="reveiewCardHeader flex-between">
                <div class="star-rating flex-center">
                ${starImages.map((src) => `<img src="${src}" alt="star" />`).join("")}
                </div>

                <p>${getDateDifference(ele.created_at)}</p>
                </div>

                <div class="reviewerInfo">
                <div class="avatar flex-center"><span>${getNameInitials(ele.custName)}</span></div>
                <h4 class="reviewerName">${ele.custName}</h4>
                <img
                    src="./assets/icons/blue-tick.svg"
                    alt="Blue Tick"
                    class="blue-tick"
                />
                </div>

                <p>${ele.review}</p>

                <div class="likes-dislikes">
                    <form action="" method="post">
                        <button class="like-dislikes-btn" type="submit">
                        <img src="./assets/icons/arrow-up.svg" alt="arrow up" />
                        </button>
                    </form>
                    <p>3</p>
                    <form action="" method="post">
                        <button class="like-dislikes-btn" type="submit">
                        <img src="./assets/icons/arrow-down.svg" alt="arrow down" />
                        </button>
                    </form>
                    <p>2</p>
                </div>
            </div>
            `
        })
    })
    .catch(error => {
        console.error('Error loading JSON file:', error);
    });
