document.addEventListener('DOMContentLoaded', function () {
    const Task = document.querySelector('.add_task .text');
    const Button = document.querySelector('.add_task button');
    const totalSection = document.querySelector('.total');

    // Initialiser l'affichage des totaux
    updateTotal();

    // Attacher l'événement de clic aux liens dans les onglets
    const onglets = document.querySelectorAll('.status .onglet');
    onglets.forEach(onglet => {
        const lien = onglet.querySelector('a');
        lien.addEventListener('click', changeTab);
    });
    
    // Activer le premier onglet par défaut
    onglets[0].classList.add('active');
    
    Button.addEventListener('click', function () {
        const taskText = Task.value.trim();

        if (taskText !== '') {
            tab_task.push(taskText);
            tab_task_not_done.push(taskText); // Ajout dans "Non faits" par défaut

            Task.value = '';

            displayTasks(tab_task); // Affiche toutes les tâches
            updateTotal();
        }
    });
});

// Fonction pour afficher les tâches d'un tableau spécifique
function displayTasks(tasksToDisplay) {
    const taskSection = document.getElementById('task');
    taskSection.innerHTML = ''; // Vider la section des tâches
    
    for (let i = 0; i < tasksToDisplay.length; i++) {
        const taskElement = document.createElement('div');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        
        // Vérifier si la tâche est dans tab_task_done pour déterminer son état
        const isDone = tab_task_done.includes(tasksToDisplay[i]);
        checkbox.checked = isDone;
        
        const taskText = document.createElement('span');
        taskText.textContent = tasksToDisplay[i];
        taskText.style.marginLeft = '8px';
        
        // Appliquer le style barré si la tâche est terminée
        if (isDone) {
            taskText.style.textDecoration = 'line-through';
        }
        
        taskElement.appendChild(checkbox);
        taskElement.appendChild(taskText);
        taskSection.appendChild(taskElement);
        
        checkbox.addEventListener('change', function () {
            const task = taskText.textContent;
            
            if (checkbox.checked) {
                // Ajouter aux tâches terminées
                if (!tab_task_done.includes(task)) {
                    tab_task_done.push(task);
                }
                
                // Retirer des tâches non terminées
                const index = tab_task_not_done.indexOf(task);
                if (index !== -1) {
                    tab_task_not_done.splice(index, 1);
                }
                
                // Appliquer le style barré
                taskText.style.textDecoration = 'line-through';
            } else {
                // Ajouter aux tâches non terminées
                if (!tab_task_not_done.includes(task)) {
                    tab_task_not_done.push(task);
                }
                
                // Retirer des tâches terminées
                const index = tab_task_done.indexOf(task);
                if (index !== -1) {
                    tab_task_done.splice(index, 1);
                }
                
                // Enlever le style barré
                taskText.style.textDecoration = 'none';
            }
            
            updateTotal();
        });
    }
}

function changeTab(event) {
    // Empêcher le comportement par défaut du lien
    event.preventDefault();
    
    const onglets = document.querySelectorAll('.status .onglet');
    
    // Récupérer l'élément <li> parent du lien cliqué
    const ongletClique = event.currentTarget.parentElement;
    
    // Retirer la classe "active" de tous les onglets
    onglets.forEach(onglet => onglet.classList.remove('active'));
    
    // Ajouter la classe "active" à l'onglet cliqué
    ongletClique.classList.add('active');
    
    // Déterminer quel tableau afficher
    const texteOnglet = event.currentTarget.textContent.trim().toLowerCase();
    
    if (texteOnglet === 'tout') {
        displayTasks(tab_task);
    } else if (texteOnglet === 'faits') {
        displayTasks(tab_task_done);
    } else if (texteOnglet === 'non faits') {
        displayTasks(tab_task_not_done);
    }
}
