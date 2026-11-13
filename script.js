// Get the appointment form
const form = document.getElementById("appointmentForm");

// Get the appointment display area
const appointmentList = document.getElementById("appointmentList");

// Store appointments in an array
let appointments = [];

// Set the minimum appointment date as today
const dateInput = document.getElementById("date");

let today = new Date().toISOString().split("T")[0];

dateInput.min = today;


// Display appointments on the website
function displayAppointments() {

    appointmentList.innerHTML = "";

    if (appointments.length === 0) {

        appointmentList.innerHTML = `
            <div class="empty-message">
                <div>📅</div>
                <h3>No Appointments Yet</h3>
                <p>Your booked appointments will appear here.</p>
            </div>
        `;

        return;
    }

    appointments.forEach(function (appointment, index) {

        let card = document.createElement("div");

        card.className = "appointment-card";

        card.innerHTML = `
            <h3>${appointment.name}</h3>

            <p><strong>Email:</strong> ${appointment.email}</p>

            <p><strong>Phone:</strong> ${appointment.phone}</p>

            <p><strong>Doctor:</strong> ${appointment.doctor}</p>

            <p><strong>Date:</strong> ${appointment.date}</p>

            <p><strong>Time:</strong> ${appointment.time}</p>

            <p><strong>Reason:</strong> ${appointment.reason || "Not specified"}</p>

            <div class="appointment-actions">

                <button class="edit-button"
                    onclick="editAppointment(${index})">
                    Edit
                </button>

                <button class="cancel-button"
                    onclick="cancelAppointment(${index})">
                    Cancel
                </button>

            </div>
        `;

        appointmentList.appendChild(card);

    });

}


// Book a new appointment
form.addEventListener("submit", function (event) {

    event.preventDefault();

    let name = document.getElementById("patientName").value;

    let email = document.getElementById("email").value;

    let phone = document.getElementById("phone").value;

    let doctor = document.getElementById("doctor").value;

    let date = document.getElementById("date").value;

    let time = document.getElementById("time").value;

    let reason = document.getElementById("reason").value;


    // Create an appointment object
    let appointment = {
        name: name,
        email: email,
        phone: phone,
        doctor: doctor,
        date: date,
        time: time,
        reason: reason
    };


    // Add appointment to the array
    appointments.push(appointment);

    // Update the appointment display
    displayAppointments();

    // Show confirmation message
    alert("Your appointment has been booked successfully!");

    // Clear the form
    form.reset();

    // Restore the minimum date
    dateInput.min = today;

    // Move to appointment section
    document.getElementById("appointments").scrollIntoView({
        behavior: "smooth"
    });

});


// Edit an appointment
function editAppointment(index) {

    let appointment = appointments[index];

    document.getElementById("patientName").value = appointment.name;

    document.getElementById("email").value = appointment.email;

    document.getElementById("phone").value = appointment.phone;

    document.getElementById("doctor").value = appointment.doctor;

    document.getElementById("date").value = appointment.date;

    document.getElementById("time").value = appointment.time;

    document.getElementById("reason").value = appointment.reason;

    // Remove old appointment before updating
    appointments.splice(index, 1);

    displayAppointments();

    // Move to booking form
    document.getElementById("booking").scrollIntoView({
        behavior: "smooth"
    });

}


// Cancel an appointment
function cancelAppointment(index) {

    let confirmation = confirm(
        "Are you sure you want to cancel this appointment?"
    );

    if (confirmation) {

        appointments.splice(index, 1);

        displayAppointments();

        alert("Appointment cancelled successfully!");

    }

}