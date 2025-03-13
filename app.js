const form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    userName = document.getElementById("name"),
    Director = document.getElementById("director"),
    Duration = document.getElementById("duration"),
    Year = document.getElementById("year"),
    Genre = document.getElementById("genre"),
    Rating = document.getElementById("rating"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modalTitle = document.querySelector("#filmModal .modal-title"),
    newUserBtn = document.querySelector(".Film");

let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : [];
let isEdit = false, editId;

// Tampilkan Data Awal
showInfo();

// Reset Modal saat Tambah Film Baru
newUserBtn.addEventListener('click', () => {
    submitBtn.innerText = 'Submit';
    modalTitle.innerText = "Add New Movie";
    isEdit = false;
    imgInput.src = "./image/film.jpg";
    form.reset();
});

// Upload Gambar
file.onchange = function () {
    if (file.files.length === 0) return;
    if (file.files[0].size < 1000000) {
        let fileReader = new FileReader();
        fileReader.onload = function (e) {
            imgInput.src = e.target.result;
        };
        fileReader.readAsDataURL(file.files[0]);
    } else {
        alert("This file is too large! (Max: 1MB)");
    }
};

// Tampilkan Data di Tabel
function showInfo() {
    userInfo.innerHTML = "";
    getData.forEach((element, index) => {
        userInfo.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${element.picture}" alt="" width="50" height="50"></td>
                <td>${element.employeeName}</td>
                <td>${element.employeeDirector}</td>
                <td>${element.employeeDuration} min</td>
                <td>${element.employeeYear}</td>
                <td>${element.employeeGenre}</td>
                <td>${element.employeeRating}</td>
                <td>
                    <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.employeeName}', '${element.employeeDirector}', '${element.employeeDuration}', '${element.employeeYear}', '${element.employeeGenre}', '${element.employeeRating}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
                    
                    <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.employeeName}', '${element.employeeDirector}', '${element.employeeDuration}', '${element.employeeYear}', '${element.employeeGenre}', '${element.employeeRating}')" data-bs-toggle="modal" data-bs-target="#filmModal"><i class="bi bi-pencil-square"></i></button>

                    <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                </td>
            </tr>`;
    });
}

// Fungsi Lihat Detail Film
function readInfo(pic, name, director, duration, year, genre, rating) {
    document.querySelector('.showImg').src = pic;
    document.querySelector('#showName').value = name;
    document.querySelector("#showDirector").value = director;
    document.querySelector("#showDuration").value = duration;
    document.querySelector("#showYear").value = year;
    document.querySelector("#showGenre").value = genre;
    document.querySelector("#showRating").value = rating;
}

// Fungsi Edit Film
function editInfo(index, pic, name, director, duration, year, genre, rating) {
    isEdit = true;
    editId = index;
    imgInput.src = pic;
    userName.value = name;
    Director.value = director;
    Duration.value = duration;
    Year.value = year;
    Genre.value = genre;
    Rating.value = rating;

    submitBtn.innerText = "Update";
    modalTitle.innerText = "Edit Movie";
}

// Fungsi Hapus Film
function deleteInfo(index) {
    if (confirm("Are you sure want to delete?")) {
        getData.splice(index, 1);
        localStorage.setItem("userProfile", JSON.stringify(getData));
        showInfo();
    }
}

// Submit Form
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (Rating.value < 0 || Rating.value > 10) {
        alert("Rating must be between 0 and 10!");
        return;
    }

    const information = {
        picture: imgInput.src !== "./image/film.jpg" ? imgInput.src : "./image/film.jpg",
        employeeName: userName.value,
        employeeDirector: Director.value,
        employeeDuration: Duration.value,
        employeeYear: Year.value,
        employeeGenre: Genre.value,
        employeeRating: Rating.value,
    };

    if (!isEdit) {
        getData.push(information);
    } else {
        getData[editId] = information;
        isEdit = false;
    }

    localStorage.setItem('userProfile', JSON.stringify(getData));
    showInfo();
    form.reset();
    imgInput.src = "./image/film.jpg";

    let modal = bootstrap.Modal.getInstance(document.getElementById('filmModal'));
    modal.hide();
});
