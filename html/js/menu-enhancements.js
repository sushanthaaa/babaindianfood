(function () {
    "use strict";

    function normalizeText(text) {
        return (text || '')
            .toLowerCase()
            .replace(/\s+/g, ' ')
            .trim();
    }

    function createBackToTop() {
        const backToTop = document.createElement('div');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backToTop);

        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function updateMenu() {
        console.log('--- updateMenu start ---');
        const activeFilterBtn = document.querySelector('.filter-btn.active');
        const activeFilter = activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';
        console.log('Filter:', activeFilter);

        let searchTerm = '';
        const searchInputs = document.querySelectorAll('.menu-search input');
        searchInputs.forEach((input) => {
            if (input.value && input.value.trim() !== '') {
                searchTerm = normalizeText(input.value);
            }
        });
        console.log('Search:', searchTerm);

        const searchTokens = searchTerm === '' ? [] : searchTerm.split(' ').filter(Boolean);

        const menuItems = document.querySelectorAll('.our-menu-item');
        console.log('Total dishes found:', menuItems.length);
        
        let visibleCount = 0;
        menuItems.forEach((item) => {
            const title = item.querySelector('h3')?.textContent || '';
            const desc = item.querySelector('.menu-item-content')?.textContent || '';
            const searchableText = normalizeText(`${title} ${desc} ${item.getAttribute('href') || ''}`);

            const isVeg = item.classList.contains('veg-item');
            const isVegan = item.classList.contains('vegan-item');
            const isGF = item.classList.contains('gf-item');

            const matchesSearch = searchTokens.length === 0 || searchTokens.every((token) => searchableText.includes(token));

            let matchesFilter = true;
            if (activeFilter === 'veg') matchesFilter = isVeg;
            else if (activeFilter === 'vegan') matchesFilter = isVegan;
            else if (activeFilter === 'gf') matchesFilter = isGF;

            if (matchesSearch && matchesFilter) {
                item.classList.remove('hidden-dish');
                item.style.setProperty('display', 'flex', 'important');
                item.style.setProperty('visibility', 'visible', 'important');
                item.style.setProperty('opacity', '1', 'important');
                visibleCount++;
            } else {
                item.classList.add('hidden-dish');
                item.style.setProperty('display', 'none', 'important');
            }
        });
        console.log('Visible dishes:', visibleCount);

        // Hide/Show category sections
        const sections = document.querySelectorAll('.food-menu-item');
        console.log('Total sections:', sections.length);
        
        sections.forEach((section) => {
            const sectionId = section.id;
            const visibleInThisSection = section.querySelectorAll('.our-menu-item:not(.hidden-dish)').length;
            
            if (visibleInThisSection === 0 && (searchTokens.length > 0 || activeFilter !== 'all')) {
                section.style.setProperty('display', 'none', 'important');
                
                // Hide corresponding category icon at the top
                document.querySelectorAll(`.special-menu-item a[href="#${sectionId}"]`).forEach(link => {
                    const iconItem = link.closest('.special-menu-item');
                    if (iconItem) iconItem.style.setProperty('display', 'none', 'important');
                });
            } else {
                section.style.setProperty('display', 'block', 'important');
                
                // Show corresponding category icon
                document.querySelectorAll(`.special-menu-item a[href="#${sectionId}"]`).forEach(link => {
                    const iconItem = link.closest('.special-menu-item');
                    if (iconItem) iconItem.style.setProperty('display', 'block', 'important');
                });
            }
        });
        console.log('--- updateMenu end ---');
    }

    function initMenuControls() {
        console.log('initMenuControls...');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const searchInputs = document.querySelectorAll('.menu-search input');

        if (filterButtons.length === 0) console.warn('No filter buttons found!');
        if (searchInputs.length === 0) console.warn('No search inputs found!');

        searchInputs.forEach((input) => {
            ['input', 'keyup', 'change'].forEach(evtName => {
                input.addEventListener(evtName, (e) => {
                    const val = e.target.value;
                    searchInputs.forEach(si => { if(si !== e.target) si.value = val; });
                    updateMenu();
                });
            });
        });

        filterButtons.forEach((button) => {
            button.onclick = function() {
                console.log('Filter clicked:', this.dataset.filter);
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                updateMenu();
            };
        });

        updateMenu();
    }

    function init() {
        console.log('Menu enhancements script starting...');
        createBackToTop();
        initMenuControls();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
