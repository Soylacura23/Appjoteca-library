document.addEventListener('DOMContentLoaded', () => {
    const userRows = document.querySelectorAll('.user-table tbody tr.user');
    const sidebar = document.querySelector('.sidebar-display');
    const overlay = document.getElementById('overlay');
    const sidebarContent = document.querySelector('.sidebar-display-content');
    

    const sidebarImg = sidebar.querySelector('.sidebar-profile-image');
    const sidebarName = sidebar.querySelector('.sidebar-header h1');
    const sidebarRole = sidebar.querySelector('.sidebar-header p');
    const sidebarStatusSpans = sidebar.querySelectorAll('.sidebar-header > span');


    function openSidebar() {
        if (window.innerWidth <= 768) {
            sidebar.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }


    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }


    overlay.addEventListener('click', closeSidebar);



    const backArrow = document.querySelector('#goback');
    if (backArrow) {
        backArrow.addEventListener('click', closeSidebar);
    }

    sidebar.classList.add("close");
    sidebarContent.classList.add("close");

    userRows.forEach(row => {
        row.addEventListener('click', () => {
            
            sidebar.classList.remove("close");
            sidebarContent.classList.remove("close");
            
    
            const avatarImg = row.querySelector('.user-avatar');
            const imageUrl = avatarImg ? avatarImg.src : '';
    

            const nameEl = row.querySelector('.user-name');
            const userName = nameEl ? nameEl.textContent.trim() : '';
            
            
            const roleEl = row.querySelector('.rol-badge span');
            const userRole = roleEl ? roleEl.textContent.trim() : '';
            
            const statusEl = row.querySelector('[data-label="Estado"] .status-active, [data-label="Estado"]');
            const userStatus = statusEl ? statusEl.textContent.trim() : '';

            
            

            sidebarImg.src = imageUrl;
            sidebarImg.alt = `Foto de ${userName}`;
            
            
            sidebarName.textContent = userName;
            
    
            sidebarRole.textContent = userRole || 'Sin rol asignado';
            

            if (sidebarStatusSpans[0]) {
                sidebarStatusSpans[0].textContent = userStatus === 'activo' ? 'Miembro Activo' : userStatus;
            }

            sidebar.classList.remove("close")

            openSidebar();
        });
    });

    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeSidebar();
        }
    });
});