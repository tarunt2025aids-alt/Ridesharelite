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

        const response = await fetch("/users", {
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

        alert("User created successfully!\nUser ID: " + data.id);

        // Clear form
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";

    } catch (error) {

        console.error("Error:", error);

        alert("User creation failed:\n" + error.message);
    }
}