var defaultSites = ['github.com', 'stackoverflow.com', 'stackexchange.com', 'dev.to', 'quora.com', 'reddit.com','css-tricks.com','graphicdesign.stackexchange.com', 'behance.net', 'dribbble.com'];

var savedSites = JSON.parse(localStorage.getItem('savedSites')) || [];
if (savedSites.length === 0) {
    savedSites = savedSites.concat(defaultSites);
    localStorage.setItem('savedSites', JSON.stringify(savedSites));
}

// Call the function to update the saved sites dropdown
updateSavedSitesDropdown();

function saveSites() {
    var siteInput = document.getElementById('site');
    var savedSitesSelect = document.getElementById('savedSites');

    var siteUrls = siteInput.value.split(',').map(url => url.trim());
    if (siteUrls.length === 0 || siteUrls.some(url => url === '')) {
        alert('Please enter valid site URLs separated by commas.');
        return;
    }

    // Save the site URLs to local storage
    var savedSites = JSON.parse(localStorage.getItem('savedSites')) || [];
    savedSites = savedSites.concat(siteUrls);
    localStorage.setItem('savedSites', JSON.stringify(savedSites));

    // Update the saved sites dropdown
    updateSavedSitesDropdown();
    siteInput.value = '';
}

function updateSavedSitesDropdown() {
    var savedSitesSelect = document.getElementById('savedSites');
    savedSitesSelect.innerHTML = '';

    // Load saved sites from local storage
    var savedSites = JSON.parse(localStorage.getItem('savedSites')) || [];

    savedSites.forEach(function(site, index) {
        var option = document.createElement('option');
        option.value = index;
        option.text = site;
        savedSitesSelect.add(option);
    });
}

function editSite() {
    var savedSitesSelect = document.getElementById('savedSites');
    var selectedIndex = savedSitesSelect.value;

    if (selectedIndex === null) {
        alert('Please select a site to edit.');
        return;
    }

    var newSiteUrl = prompt('Enter the new URL for the selected site:');
    if (newSiteUrl !== null) {
        // Update the selected site's URL in local storage
        var savedSites = JSON.parse(localStorage.getItem('savedSites')) || [];
        savedSites[selectedIndex] = newSiteUrl;
        localStorage.setItem('savedSites', JSON.stringify(savedSites));

        // Update the saved sites dropdown
        updateSavedSitesDropdown();
    }
}

function deleteSite() {
    var savedSitesSelect = document.getElementById('savedSites');
    var selectedIndex = savedSitesSelect.value;

    if (selectedIndex === null) {
        alert('Please select a site to delete.');
        return;
    }

    // Remove the selected site from local storage
    var savedSites = JSON.parse(localStorage.getItem('savedSites')) || [];
    savedSites.splice(selectedIndex, 1);
    localStorage.setItem('savedSites', JSON.stringify(savedSites));

    // Update the saved sites dropdown
    updateSavedSitesDropdown();
}

function search() {
    var query = document.getElementById('query').value;
    var savedSitesSelect = document.getElementById('savedSites');
    var selectedSitesIndex = Array.from(savedSitesSelect.selectedOptions).map(option => parseInt(option.value));

    if (query.trim() === '' || selectedSitesIndex.length === 0) {
        alert('Please enter a query and select at least one saved site.');
        return;
    }

    // Construct the search URL with "OR" between selected sites
    var selectedSites = selectedSitesIndex.map(index => JSON.parse(localStorage.getItem('savedSites'))[index]);
    var searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(query + ' site:' + selectedSites.join(' OR site:'));

    // Redirect to the Google search results page
    window.location.href = searchUrl;
}

// Initialize the saved sites dropdown
updateSavedSitesDropdown();

function resetSettings() {
    // Clear saved sites in local storage
    localStorage.removeItem('savedSites');

    // Clear input and select elements
    document.getElementById('query').value = '';
    document.getElementById('site').value = '';

    var defaultSites = ['github.com', 'stackoverflow.com', 'stackexchange.com', 'dev.to', 'quora.com', 'reddit.com','css-tricks.com','graphicdesign.stackexchange.com', 'behance.net', 'dribbble.com'];

    var savedSites = JSON.parse(localStorage.getItem('savedSites')) || [];
    if (savedSites.length === 0) {
        savedSites = savedSites.concat(defaultSites);
        localStorage.setItem('savedSites', JSON.stringify(savedSites));
    }
    
    // Call the function to update the saved sites dropdown
    updateSavedSitesDropdown();
}

