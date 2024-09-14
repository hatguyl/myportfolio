// THANKS TO INTERNET FOR THE SOURCE CODES

document.addEventListener('DOMContentLoaded', () => {
    const box2 = document.getElementById('box2');
    const box3 = document.getElementById('box3');
    const box4 = document.getElementById('box4');
    const box5 = document.getElementById('box5');
    const box6 = document.getElementById('box6');
    const box7 = document.getElementById('box7');
    const abtButton = document.getElementById('abt');
    const skillsButton = document.querySelector('#box1 .box1t:nth-child(2)');
    const projectsButton = document.querySelector('#box1 .box1t:nth-child(3)');
    const globeButton = document.querySelector('#box3 .globe');

    applyDragFunctionality(box2);
    applyDragFunctionality(box3);
    applyDragFunctionality(box4);
    applyDragFunctionality(box5);
    applyDragFunctionality(box6);
    applyDragFunctionality(box7);

    addCloseFunctionality(box2);
    addCloseFunctionality(box3);
    addCloseFunctionality(box4);
    addCloseFunctionality(box5);
    addCloseFunctionality(box6);
    addCloseFunctionality(box7);

    addResizeFunctionality(box2);
    addResizeFunctionality(box3);
    addResizeFunctionality(box4);
    addResizeFunctionality(box5);
    addResizeFunctionality(box6);
    addResizeFunctionality(box7);

    box3.style.display = 'none';
    box4.style.display = 'none';
    box5.style.display = 'none';
    box6.style.display = 'none';
    box7.style.display = 'none';

    abtButton.addEventListener('click', (e) => {
        e.preventDefault();
        openBox(box3);
    });

    skillsButton.addEventListener('click', (e) => {
        e.preventDefault();
        openBox(box4);
    });

    projectsButton.addEventListener('click', (e) => {
        e.preventDefault();
        openBox(box5);
    });

    globeButton.addEventListener('click', (e) => {
        e.preventDefault();
        openBox(box6);
    });

    const box1Links = document.querySelectorAll('#box1 .box1t');

    box1Links.forEach(link => {
        link.addEventListener('click', (e) => {
            if (box3.style.display !== 'none') {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    });

    function applyDragFunctionality(box) {
        const boxo = box.querySelector('.boxo');
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        boxo.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        boxo.addEventListener('touchstart', dragStart);
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', dragEnd);

        function dragStart(e) {
            if (e.target === boxo) {
                isDragging = true;
                boxo.style.cursor = 'default'; 
                const rect = box.getBoundingClientRect();
                if (e.type === 'touchstart') {
                    startX = e.touches[0].clientX - rect.left;
                    startY = e.touches[0].clientY - rect.top;
                } else {
                    startX = e.clientX - rect.left;
                    startY = e.clientY - rect.top;
                }
                initialLeft = rect.left;
                initialTop = rect.top;
            }
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                let clientX, clientY;
                if (e.type === 'touchmove') {
                    clientX = e.touches[0].clientX;
                    clientY = e.touches[0].clientY;
                } else {
                    clientX = e.clientX;
                    clientY = e.clientY;
                }
                const left = clientX - startX;
                const top = clientY - startY;
                box.style.left = `${left}px`;
                box.style.top = `${top}px`;
                box.style.transform = 'none';
            }
        }

        function dragEnd() {
            isDragging = false;
            boxo.style.cursor = ''; 
        }
    }

    function addCloseFunctionality(box) {
        const closeButton = box.querySelector('.cir');
        closeButton.addEventListener('click', () => {
            const rect = box.getBoundingClientRect();
            const leftPos = rect.left;
            const topPos = rect.top;
            
            box.style.position = 'fixed';
            box.style.left = `${leftPos}px`;
            box.style.top = `${topPos}px`;
            box.style.transform = 'none';
            
            box.classList.add('closing');
            setTimeout(() => {
                box.style.display = 'none';
                box.classList.remove('closing');
                resetBox3Content(box); 
            }, 300); 
        });
    }

    function resetBox3Content(box) {
        if (box.id === 'box3') {
            const command = box.querySelector('.command');
            const abt1 = box.querySelector('#abt1');
            
            command.textContent = '';
            abt1.style.display = 'none';
            abt1.style.opacity = '0';
            
            const cursor = box.querySelector('.cursor');
            cursor.style.animation = '';
            cursor.style.opacity = '1';
        }
    }

    function addResizeFunctionality(box) {
        const resizer = document.createElement('div');
        resizer.className = 'resizer';
        box.appendChild(resizer);

        let isResizing = false;
        let startX, startY, startWidth, startHeight;

        resizer.addEventListener('mousedown', initResize);
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);

        function initResize(e) {
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = parseInt(document.defaultView.getComputedStyle(box).width, 10);
            startHeight = parseInt(document.defaultView.getComputedStyle(box).height, 10);
            document.addEventListener('mousemove', resize);
            document.addEventListener('mouseup', stopResize);
        }

        function resize(e) {
            if (!isResizing) return;
            const width = startWidth + e.clientX - startX;
            const height = startHeight + e.clientY - startY;
            box.style.width = `${Math.max(width, 200)}px`;  
            box.style.height = `${Math.max(height, 100)}px`;  
            

            box.style.aspectRatio = 'auto';
        }

        function stopResize() {
            isResizing = false;
            document.removeEventListener('mousemove', resize);
            document.removeEventListener('mouseup', stopResize);
        }

        resizer.style.width = '20px';
        resizer.style.height = '20px';
        resizer.style.right = '0';
        resizer.style.bottom = '0';
        resizer.style.cursor = 'se-resize';
    }

    function openBox(box) {
        if (box.style.display === 'flex') {
            resetBoxContent(box);
            setTimeout(() => animateBoxContent(box), 100);
        } else {
            box.style.display = 'flex';
            box.style.left = '50%';
            box.style.top = '50%';
            box.style.transform = 'translate(-50%, -50%)';
            box.classList.add('opening');
            setTimeout(() => {
                box.classList.remove('opening');
                animateBoxContent(box);
            }, 300);
        }
    }

    function resetBoxContent(box) {
        if (box.id === 'box3') {
            const command = box.querySelector('.command');
            const abt1 = box.querySelector('#abt1');
            
            command.textContent = '';
            abt1.style.display = 'none';
            abt1.style.opacity = '0';
            
            const cursor = box.querySelector('.cursor');
            cursor.style.animation = '';
            cursor.style.opacity = '1';
        } else if (box.id === 'box4') {
        } else if (box.id === 'box5') {
            const temp = box.querySelector('.temp');
            temp.style.opacity = '0';
        } else if (box.id === 'box6') {
            const socialsContent = box.querySelector('.socials-content');
            socialsContent.style.opacity = '0';
        } else if (box.id === 'box7') {
        }
    }

    function animateBoxContent(box) {
        if (box.id === 'box3') {
            typeCommand();
        } else if (box.id === 'box4') {
            const skim = box.querySelector('#skim');
            skim.style.opacity = '0';
            setTimeout(() => {
                skim.style.transition = 'opacity 0.5s ease-in-out';
                skim.style.opacity = '1';
            }, 100);
        } else if (box.id === 'box5') {
            const temp = box.querySelector('.temp');
            temp.style.opacity = '0';
            setTimeout(() => {
                temp.style.transition = 'opacity 0.5s ease-in-out';
                temp.style.opacity = '1';
            }, 100);
        } else if (box.id === 'box6') {
            const socialsContent = box.querySelector('#soc');
            socialsContent.style.opacity = '0';
            setTimeout(() => {
                socialsContent.style.transition = 'opacity 0.5s ease-in-out';
                socialsContent.style.opacity = '1';
            }, 100);
        } else if (box.id === 'box7') {
            const educationContent = box.querySelector('.edu');
            educationContent.style.opacity = '0';
            setTimeout(() => {
                educationContent.style.transition = 'opacity 0.5s ease-in-out';
                educationContent.style.opacity = '1';
            }, 100);
        }
    }

    function typeCommand() {
        const command = document.querySelector('#box3 .command');
        const cursor = document.querySelector('#box3 .cursor');
        const text = 'neofetch';
        let i = 0;

        function type() {
            if (i < text.length) {
                command.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            } else {
                setTimeout(hitEnter, 500);
            }
        }

        type();
    }

    function hitEnter() {
        const cursor = document.querySelector('#box3 .cursor');
        cursor.style.animation = 'none';
        cursor.style.opacity = '1';
        
        setTimeout(() => {
            cursor.style.opacity = '0';
            setTimeout(printContent, 300);
        }, 300);
    }

    function printContent() {
        const abt1 = document.getElementById('abt1');
        abt1.style.display = 'flex';
        setTimeout(() => {
            abt1.style.opacity = '1';
        }, 50);
    }

    const educationLink = document.querySelector('.graduate');
    educationLink.addEventListener('click', () => {
        box7.style.display = 'block';
        animateBoxContent(box7);
    });
});
// code ends here version 0.1