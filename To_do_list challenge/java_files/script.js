let tab_task = ["Task 0", "Task 1"];
let tab_task_done = [];
let tab_task_not_done = tab_task;
let currentOnglet = 'Tout';


document.addEventListener('DOMContentLoaded', function () {
    displayTasks(tab_task);
    updateTotal();
    const onglets = document.querySelectorAll('.status .onglet');

    onglets.forEach(onglet => {
        const lien = onglet.querySelector('a');
        lien.addEventListener('click', switch_status);
    });

    onglets[0].classList.add('active');

    const new_btn = document.querySelector('.btn');

    new_btn.addEventListener('click', function () {
        console.log('bouton detected');
        newDiv();
    });
});

function displayTasks(all_tab) {
    const taskSection = document.querySelector('.task');
    taskSection.innerHTML = '';

    for (let i = 0; i < all_tab.length; i++) {
        const taskElement = document.createElement('div');
        const a = document.createElement('input');
        a.type = 'checkbox';

        const isDone = tab_task_done.includes(all_tab[i]);
        a.checked = isDone

        const taskText = document.createElement('span');
        taskText.style.textDecoration = isDone ? 'line-through' : 'none';
        taskText.textContent = all_tab[i];

        taskText.style.marginLeft = '8px';

        taskElement.appendChild(a);
        taskElement.appendChild(taskText);

        taskSection.appendChild(taskElement);

        if (taskText.addEventListener) {
            taskText.addEventListener('click', function () {
                a.click();
            });
        }
        a.addEventListener('change', function () {
            if (a.checked) {
                tab_task_done.push(all_tab[i]);
                tab_task_not_done = tab_task_not_done.filter(task => task !== all_tab[i]);
                taskText.style.textDecoration = 'line-through';
                taskText.style.color = '#bec0c2';
                taskText.style.fontStyle = 'italic';
            }
            else {
                tab_task_not_done.push(all_tab[i]);
                tab_task_done = tab_task_done.filter(task => task !== all_tab[i]);
                taskText.style.textDecoration = 'none';
                taskText.style.color = '#000';
                taskText.style.fontStyle = 'normal';
            }
            updateTotal();
            swipe();
        });
    }

    console.log(all_tab);

}

function swipe() {
    if (currentOnglet === 'Tout') {
        displayTasks(tab_task);
    } else if (currentOnglet === 'Faits') {
        displayTasks(tab_task_done);
    } else if (currentOnglet === 'Non Faits') {
        displayTasks(tab_task_not_done);
    }
};

function switch_status(event) {
    event.preventDefault();

    const onglets = document.querySelectorAll('.status .onglet');
    const ongletClique = event.currentTarget.parentElement;

    onglets.forEach(onglet => onglet.classList.remove('active'));

    ongletClique.classList.add('active');

    const texteOnglet = event.currentTarget.textContent.trim();
    currentOnglet = texteOnglet;

    if (texteOnglet === 'Tout') {
        displayTasks(tab_task);
    } else if (texteOnglet === 'Faits') {
        displayTasks(tab_task_done);
    } else if (texteOnglet === 'Non Faits') {
        displayTasks(tab_task_not_done);
    }
}

// function addTask() {
//     console.log("addTask called");
//     const taskText = text.value.trim();

//     if (taskText !== '') {
//         tab_task.push(taskText);
//         tab_task_not_done.push(taskText);

//         text.value = '';

//         displayTasks(tab_task);
//         updateTotal();
//         swipe();

//         document.getElementById('div_masq').style.display = "none";
//         document.getElementById('btn').style.display = "block";
//         section.removeChild(divMasq);
//     } else {
//         document.getElementById('div_masq').style.display = "none";
//         document.getElementById('btn').style.display = "block";
//         section.removeChild(divMasq);
//     }
// }   

function newDiv() {
    console.log("newDiv called");
    document.getElementById('btn').style.display = "none";

    const section = document.querySelector('.add_task');
    const divMasq = document.createElement('div');
    const text = document.createElement('input');
    text.type = 'text';
    const Btn = document.createElement('button');
    const BtnText = document.createTextNode('Add');

    divMasq.appendChild(text);
    divMasq.appendChild(Btn);
    Btn.appendChild(BtnText);
    section.appendChild(divMasq);
    styleDiv(text, Btn, section);

    document.getElementById('div_masq').style.display = "block";
    function addTask() {
        console.log("addTask called");
        const taskText = text.value.trim();

        if (taskText !== '') {
            tab_task.push(taskText);
            tab_task_not_done.push(taskText);

            text.value = '';

            displayTasks(tab_task);
            updateTotal();
            swipe();

            document.getElementById('div_masq').style.display = "none";
            document.getElementById('btn').style.display = "block";
            section.removeChild(divMasq);
        } else {
            document.getElementById('div_masq').style.display = "none";
            document.getElementById('btn').style.display = "block";
            section.removeChild(divMasq);
        }
    }
    Btn.addEventListener('click', addTask);
    text.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTask();
        }
    });
}

function styleDiv(test, Btn, section) {
    test.style.width = '60%';
    test.style.margin = '10px 8px 10px 10px';
    test.style.padding = '8px';
    test.style.border = '1px solid rgb(96, 184, 224)';
    test.style.borderRadius = '4px';
    test.style.fontFamily = 'Arial, sans-serif';
    test.style.fontWeight = 'normal';
    Btn.style.margin = '0px 0px 0px 8px';
    section.style.display = "flex";
    section.style.flexDirection = "row";
    section.style.justifyContent = "space-between";
    section.style.alignItems = "center";
    section.style.width = "100%";
}

function updateTotal() {
    const a = document.querySelector('.bon .first_p');
    const b = document.querySelector('.bon .second_p');

    const totalDone = tab_task_done.length;
    const totalTasks = tab_task.length;

    a.textContent = totalDone;
    b.textContent = '/' + totalTasks;
}

// const total = document.querySelector('.total .bon');
//     const a = documentquerySelector('.total .bon .first_p');
//     const b = document.querySelector('.total .bon .second_p');
//     a = tab_task_done.length; b = tab_task.length;
//     total.textContent = a + b + ' Tasks';
//     a.style.fontSize = '50px';
//     a.style.fontWeight = 'bold';