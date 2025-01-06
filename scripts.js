document.addEventListener("DOMContentLoaded", function() {
    const cppIcon = { url: "https://isocpp.org", imgSrc: "res/cplusplus.svg" };
    const pythonIcon = { url: "https://www.python.org", imgSrc: "res/python.svg" };
    const openglIcon = { url: "https://www.opengl.org", imgSrc: "res/opengl.svg" };
    const scikitlearnIcon = { url: "https://scikit-learn.org", imgSrc: "res/scikitlearn.svg" };

    const projectsData = [
        {
            name: "Research Project",
            url: "https://github.com/pedroalfonseca/Research-Project",
            image: "https://via.placeholder.com/600x300",
            description: "A tool for visualizing 3D city models and computing view quality indices. Also contains implementations of different machine learning techniques to optimize the computation of the indices.",
            techIcons: [
                cppIcon,
                openglIcon,
                pythonIcon,
                scikitlearnIcon
            ]
        },
        {
            name: "Port Scanner",
            url: "https://github.com/pedroalfonseca/Evil-Vault/blob/main/port_scanner.py",
            image: "https://via.placeholder.com/600x300",
            description: "A simple network utility script that leverages Nmap to scan ports.",
            techIcons: [
                pythonIcon,
            ]
        },
        {
            name: "Slow Loris",
            url: "https://github.com/pedroalfonseca/Evil-Vault/blob/main/slow_loris.py",
            image: "https://via.placeholder.com/600x300",
            description: "A simple Python3 reimplementation of the Slowloris DDoS attack, designed for educational purposes only.",
            techIcons: [
                pythonIcon,
            ]
        }
    ];

    let curIdx = 0;

    function updateProject(idx) {
        const project = projectsData[idx];

        document.getElementById("projectName").textContent = project.name;
        document.getElementById("projectName").href = project.url;
        document.getElementById("projectImage").src = project.image;
        document.getElementById("projectDescription").textContent = project.description;

        const techIconContainer = document.getElementById("projectTechIcons");
        techIconContainer.innerHTML = "";
        project.techIcons.forEach(techIcon => {
            const anchor = document.createElement("a");
            anchor.href = techIcon.url;
            anchor.target = "_blank";
            const img = document.createElement("img");
            img.src = techIcon.imgSrc;
            img.width = 48;
            anchor.appendChild(img);
            techIconContainer.appendChild(anchor);
        });
    }

    updateProject(curIdx);

    document.querySelector(".project").classList.add("active");

    document.getElementById("prevProject").addEventListener("click", function() {
        curIdx = (curIdx - 1 + projectsData.length) % projectsData.length;
        updateProject(curIdx);
    });

    document.getElementById("nextProject").addEventListener("click", function() {
        curIdx = (curIdx + 1) % projectsData.length;
        updateProject(curIdx);
    });
});

const canvas = document.getElementById("background-grid");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawGrid(offset) {
    const gridSize = 50;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#eaeaea";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#2e2e2e";
    ctx.lineWidth = 1;
    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = -gridSize + (offset % gridSize); y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

let offset = 0;
function animateGrid() {
    offset += 0.25;
    drawGrid(offset);
    requestAnimationFrame(animateGrid);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animateGrid();
