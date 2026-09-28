async function createUser() {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (name === "" || email === "" || phone === "") {
        alert("Please fill all fields");
        return;
    }

    const user = {
        name: name,
        email: email,
        phone: phone
    };

    try {

        const response = await fetch("http://localhost:8081/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Failed to create user");
        }

        const data = await response.json();
        const messageBox = document.getElementById("userMessage");
        messageBox.textContent = "User created successfully! ID: " + data.id;

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";

        await loadUsers();

    } catch (error) {

        console.error("Error:", error);

        const messageBox = document.getElementById("userMessage");
        messageBox.textContent = "User creation failed: " + error.message;
    }
}

function renderUsers(users) {
    const userList = document.getElementById("userList");

    if (!userList) return;

    if (!users || users.length === 0) {
        userList.innerHTML = "<p>No users created yet.</p>";
        return;
    }

    userList.innerHTML = `
        <h3>Created Users</h3>
        <ul>
            ${users.map(user => `
                <li>
                    <strong>ID:</strong> ${user.id} |
                    <strong>Name:</strong> ${user.name} |
                    <strong>Email:</strong> ${user.email} |
                    <strong>Phone:</strong> ${user.phone}
                </li>
            `).join("")}
        </ul>
    `;
}

async function loadUsers() {
    try {
        const response = await fetch("http://localhost:8081/users");

        if (!response.ok) {
            throw new Error("Unable to load users");
        }

        const users = await response.json();
        renderUsers(users);
    } catch (error) {
        console.error("Error loading users:", error);
        const userList = document.getElementById("userList");
        if (userList) {
            userList.innerHTML = "<p>Unable to load users.</p>";
        }
    }
}

document.addEventListener("DOMContentLoaded", loadUsers);

async function publishRide() {
    const driverId = document.getElementById("driverId").value.trim();
    const origin = document.getElementById("origin").value.trim();
    const destination = document.getElementById("destination").value.trim();
    const departureTime = document.getElementById("departureTime").value.trim();
    const seats = document.getElementById("seats").value.trim();

    if (!driverId || !origin || !destination || !departureTime || !seats) {
        alert("Please fill in all ride details.");
        return;
    }

    const ride = {
        origin: origin,
        destination: destination,
        departureTime: departureTime,
        seatsAvailable: Number(seats),
        driver: { id: Number(driverId) }
    };

    try {
        const response = await fetch("http://localhost:8081/rides", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ride)
        });

        const text = await response.text();

        if (!response.ok) {
            throw new Error(text || "Failed to publish ride");
        }

        const data = JSON.parse(text);
        const message = document.getElementById("rideMessage");
        message.textContent = "Ride published successfully! Ride ID: " + data.id;

        document.getElementById("driverId").value = "";
        document.getElementById("origin").value = "";
        document.getElementById("destination").value = "";
        document.getElementById("departureTime").value = "";
        document.getElementById("seats").value = "";

    } catch (error) {
        console.error("Error publishing ride:", error);
        const message = document.getElementById("rideMessage");
        message.textContent = "Ride publishing failed: " + error.message;
    }
}

async function searchRides() {
    const origin = document.getElementById("searchOrigin").value.trim();
    const destination = document.getElementById("searchDestination").value.trim();

    if (!origin || !destination) {
        alert("Please enter origin and destination.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8081/rides/search?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`);

        if (!response.ok) {
            throw new Error("Search request failed");
        }

        const rides = await response.json();
        const resultsContainer = document.getElementById("rideResults");

        if (!rides.length) {
            resultsContainer.innerHTML = "<p>No rides found for the selected route.</p>";
            return;
        }

        resultsContainer.innerHTML = rides.map(ride => `
            <div class="card result-card">
                <p><strong>Ride ID:</strong> ${ride.id}</p>
                <p><strong>Origin:</strong> ${ride.origin}</p>
                <p><strong>Destination:</strong> ${ride.destination}</p>
                <p><strong>Departure:</strong> ${ride.departureTime}</p>
                <p><strong>Seats:</strong> ${ride.seatsAvailable}</p>
            </div>
        `).join("");

    } catch (error) {
        console.error("Error searching rides:", error);
        const resultsContainer = document.getElementById("rideResults");
        resultsContainer.innerHTML = "<p>Unable to search rides right now.</p>";
    }
}