// Global variables
let tempChart, speciesChart, dnaChart, map;
let familyChart, biodiversityChart, correlationChart, depthChart;
let pipelineChart, methodsChart, collectionTrendsChart, impactChart, seasonalChart;
let isRealTimeEnabled = true;
let updateInterval;

// Sample data
const oceanStations = [
    { lat: 20.5937, lng: 78.9629, name: "Arabian Sea Station Alpha", species: "Yellowfin Tuna", temp: 24.2, salinity: 35.1 },
    { lat: 15.2993, lng: 74.1240, name: "Konkan Coast Monitor", species: "Indian Mackerel", temp: 26.8, salinity: 34.8 },
    { lat: 11.7401, lng: 75.4886, name: "Kerala Coastal Station", species: "Sardine", temp: 25.5, salinity: 35.2 },
    { lat: 13.0827, lng: 80.2707, name: "Tamil Nadu Marine Base", species: "Pomfret", temp: 27.1, salinity: 34.9 },
    { lat: 19.0760, lng: 72.8777, name: "Mumbai Deep Water", species: "Kingfish", temp: 23.9, salinity: 35.4 }
];

const temperatureData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
        label: 'Ocean Temperature (°C)',
        data: [22.1, 23.2, 24.8, 26.1, 27.3, 26.8, 25.9, 25.1, 24.6, 23.8, 22.9, 22.3],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
    }]
};

const speciesData = {
    labels: ['Arabian Sea', 'Bay of Bengal', 'Indian Ocean', 'Andaman Sea', 'Lakshadweep'],
    datasets: [{
        label: 'Species Count',
        data: [542, 687, 891, 423, 304],
        backgroundColor: [
            '#3B82F6',
            '#10B981',
            '#F97316',
            '#8B5CF6',
            '#EF4444'
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
        borderRadius: 8
    }]
};

const dnaData = {
    labels: ['Fish', 'Plankton', 'Coral', 'Algae', 'Other'],
    datasets: [{
        label: 'DNA Samples',
        data: [40, 25, 15, 12, 8],
        backgroundColor: [
            '#0F172A',
            '#1E40AF',
            '#3B82F6',
            '#10B981',
            '#F97316'
        ],
        borderWidth: 0,
        hoverOffset: 10
    }]
};

// Additional chart data for new sections
const familyDistributionData = {
    labels: ['Scombridae', 'Clupeidae', 'Carangidae', 'Lutjanidae', 'Serranidae', 'Others'],
    datasets: [{
        label: 'Species Count',
        data: [234, 189, 156, 134, 98, 236],
        backgroundColor: [
            '#3B82F6',
            '#10B981',
            '#F97316',
            '#8B5CF6',
            '#EF4444',
            '#64748B'
        ],
        borderWidth: 0,
        borderRadius: 8
    }]
};

const biodiversityData = {
    labels: ['Arabian Sea', 'Bay of Bengal', 'Indian Ocean', 'Andaman Sea', 'Lakshadweep'],
    datasets: [{
        label: 'Shannon Diversity Index',
        data: [3.2, 3.8, 4.1, 2.9, 2.4],
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: '#3B82F6',
        borderWidth: 3,
        borderRadius: 8,
        tension: 0.4
    }]
};

const correlationData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
        {
            label: 'Temperature (°C)',
            data: [23.1, 22.8, 24.2, 26.1, 25.8, 24.5],
            borderColor: '#EF4444',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            yAxisID: 'y'
        },
        {
            label: 'Salinity (PSU)',
            data: [35.1, 35.2, 35.0, 34.8, 34.9, 35.1],
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            yAxisID: 'y1'
        }
    ]
};

const depthProfileData = {
    labels: ['0m', '50m', '100m', '200m', '500m', '1000m'],
    datasets: [{
        label: 'Temperature (°C)',
        data: [26.2, 24.8, 22.1, 18.5, 12.3, 8.7],
        borderColor: '#F97316',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        fill: true,
        tension: 0.4
    }]
};

const pipelineData = {
    labels: ['Sample Collection', 'DNA Extraction', 'PCR Amplification', 'Sequencing', 'Analysis', 'Results'],
    datasets: [{
        label: 'Samples in Stage',
        data: [45, 32, 28, 23, 18, 15],
        backgroundColor: [
            '#3B82F6',
            '#10B981',
            '#F97316',
            '#8B5CF6',
            '#EF4444',
            '#64748B'
        ],
        borderWidth: 0,
        borderRadius: 8
    }]
};

const methodsData = {
    labels: ['Traditional DNA', 'eDNA Water', 'eDNA Sediment', 'Metabarcoding', 'Whole Genome'],
    datasets: [{
        label: 'Detection Success Rate (%)',
        data: [85, 92, 78, 96, 88],
        backgroundColor: [
            '#0F172A',
            '#1E40AF',
            '#3B82F6',
            '#10B981',
            '#F97316'
        ],
        borderWidth: 0
    }]
};

const collectionTrendsData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
        {
            label: 'DNA Samples',
            data: [234, 267, 298, 342],
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true
        },
        {
            label: 'Species Identified',
            data: [89, 102, 118, 134],
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true
        }
    ]
};

const impactData = {
    labels: ['Publications', 'Citations', 'Collaborations', 'Policy Influence', 'Conservation Actions'],
    datasets: [{
        label: 'Impact Score',
        data: [23, 156, 34, 12, 8],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: '#3B82F6',
        borderWidth: 2
    }]
};

const seasonalData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'Species Diversity',
            data: [3.2, 3.4, 3.8, 4.1, 3.9, 3.6, 3.4, 3.7, 4.0, 4.2, 3.8, 3.5],
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true,
            tension: 0.4
        }
    ]
};

// Chart options
const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                    family: 'Inter',
                    size: 12
                }
            }
        }
    },
    elements: {
        point: {
            hoverRadius: 8
        }
    },
    interaction: {
        intersect: false,
        mode: 'index'
    }
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    initializeAdditionalCharts();
    initializeMap();
    initializeNavigation();
    initializeRealTimeUpdates();
    initializeThemeToggle();
    initializeMobileMenu();
    initializeSearch();
    initializeSpeciesGallery();
    initializeDNAHeatmap();
    initializeReportGeneration();
});

function initializeCharts() {
    // Temperature Chart
    const tempCtx = document.getElementById('tempChart');
    if (tempCtx) {
        tempChart = new Chart(tempCtx, {
            type: 'line',
            data: temperatureData,
            options: {
                ...chartOptions,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 20,
                        max: 30,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '°C';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Species Chart
    const speciesCtx = document.getElementById('speciesChart');
    if (speciesCtx) {
        speciesChart = new Chart(speciesCtx, {
            type: 'bar',
            data: speciesData,
            options: {
                ...chartOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // DNA Chart
    const dnaCtx = document.getElementById('dnaChart');
    if (dnaCtx) {
        dnaChart = new Chart(dnaCtx, {
            type: 'doughnut',
            data: dnaData,
            options: {
                ...chartOptions,
                cutout: '60%',
                plugins: {
                    ...chartOptions.plugins,
                    legend: {
                        position: 'right',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                family: 'Inter',
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }
}

function initializeAdditionalCharts() {
    // Family Distribution Chart
    const familyCtx = document.getElementById('familyChart');
    if (familyCtx) {
        familyChart = new Chart(familyCtx, {
            type: 'bar',
            data: familyDistributionData,
            options: {
                ...chartOptions,
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Biodiversity Chart
    const biodiversityCtx = document.getElementById('biodiversityChart');
    if (biodiversityCtx) {
        biodiversityChart = new Chart(biodiversityCtx, {
            type: 'radar',
            data: biodiversityData,
            options: {
                ...chartOptions,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 5,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        pointLabels: {
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }

    // Correlation Chart
    const correlationCtx = document.getElementById('correlationChart');
    if (correlationCtx) {
        correlationChart = new Chart(correlationCtx, {
            type: 'line',
            data: correlationData,
            options: {
                ...chartOptions,
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Temperature (°C)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Salinity (PSU)'
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                    }
                }
            }
        });
    }

    // Depth Profile Chart
    const depthCtx = document.getElementById('depthChart');
    if (depthCtx) {
        depthChart = new Chart(depthCtx, {
            type: 'line',
            data: depthProfileData,
            options: {
                ...chartOptions,
                scales: {
                    y: {
                        reverse: true,
                        title: {
                            display: true,
                            text: 'Depth (m)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Temperature (°C)'
                        }
                    }
                }
            }
        });
    }

    // Pipeline Chart
    const pipelineCtx = document.getElementById('pipelineChart');
    if (pipelineCtx) {
        pipelineChart = new Chart(pipelineCtx, {
            type: 'bar',
            data: pipelineData,
            options: {
                ...chartOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Sample Count'
                        }
                    }
                }
            }
        });
    }

    // Methods Chart
    const methodsCtx = document.getElementById('methodsChart');
    if (methodsCtx) {
        methodsChart = new Chart(methodsCtx, {
            type: 'polarArea',
            data: methodsData,
            options: {
                ...chartOptions,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Collection Trends Chart
    const collectionCtx = document.getElementById('collectionTrendsChart');
    if (collectionCtx) {
        collectionTrendsChart = new Chart(collectionCtx, {
            type: 'line',
            data: collectionTrendsData,
            options: {
                ...chartOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                }
            }
        });
    }

    // Impact Chart
    const impactCtx = document.getElementById('impactChart');
    if (impactCtx) {
        impactChart = new Chart(impactCtx, {
            type: 'bar',
            data: impactData,
            options: {
                ...chartOptions,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Seasonal Chart
    const seasonalCtx = document.getElementById('seasonalChart');
    if (seasonalCtx) {
        seasonalChart = new Chart(seasonalCtx, {
            type: 'line',
            data: seasonalData,
            options: {
                ...chartOptions,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 2,
                        max: 5,
                        title: {
                            display: true,
                            text: 'Diversity Index'
                        }
                    }
                }
            }
        });
    }
}

function initializeMap() {
    // Initialize Leaflet map
    map = L.map('map').setView([15.0, 75.0], 6);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add markers for ocean stations
    oceanStations.forEach(station => {
        const marker = L.marker([station.lat, station.lng]).addTo(map);
        marker.bindPopup(`
            <div style="font-family: Inter, sans-serif;">
                <h4 style="margin: 0 0 8px 0; color: #0F172A;">${station.name}</h4>
                <p style="margin: 4px 0; color: #64748B;"><strong>Species:</strong> ${station.species}</p>
                <p style="margin: 4px 0; color: #64748B;"><strong>Temperature:</strong> ${station.temp}°C</p>
                <p style="margin: 4px 0; color: #64748B;"><strong>Salinity:</strong> ${station.salinity} PSU</p>
            </div>
        `);
    });
}

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Show corresponding section
            const sectionId = link.dataset.section + '-section';
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.remove('open');
            }
        });
    });
}

function initializeRealTimeUpdates() {
    updateInterval = setInterval(() => {
        if (!isRealTimeEnabled) return;
        
        // Update metric cards with simulated data
        updateMetricCard('temp-value', 'temp-trend', generateTemperature(), '°C');
        updateMetricCard('salinity-value', 'salinity-trend', generateSalinity(), ' PSU');
        updateMetricCard('species-value', 'species-trend', generateSpeciesCount(), '');
        updateMetricCard('dna-value', 'dna-trend', generateDNACount(), '');
        
        // Update charts with new data
        updateCharts();
        
        // Add new activity
        addNewActivity();
    }, 3000);
}

function updateMetricCard(valueId, trendId, newValue, unit) {
    const valueElement = document.getElementById(valueId);
    const trendElement = document.getElementById(trendId);
    
    if (valueElement && trendElement) {
        const currentValue = parseFloat(valueElement.textContent.replace(/[^0-9.]/g, ''));
        const change = (newValue - currentValue).toFixed(1);
        const isPositive = change > 0;
        
        valueElement.textContent = newValue.toFixed(1) + unit;
        trendElement.textContent = `${isPositive ? '▲' : '▼'} ${Math.abs(change)}${unit}`;
        trendElement.className = `metric-trend ${isPositive ? 'positive' : 'negative'}`;
        
        // Add pulse animation
        valueElement.parentElement.classList.add('live-indicator');
        setTimeout(() => {
            valueElement.parentElement.classList.remove('live-indicator');
        }, 1000);
    }
}

function generateTemperature() {
    return 22 + Math.random() * 6; // 22-28°C
}

function generateSalinity() {
    return 34 + Math.random() * 2; // 34-36 PSU
}

function generateSpeciesCount() {
    return 2800 + Math.floor(Math.random() * 100);
}

function generateDNACount() {
    return 15900 + Math.floor(Math.random() * 200);
}

function updateCharts() {
    // Update temperature chart
    if (tempChart) {
        const newTemp = generateTemperature();
        tempChart.data.datasets[0].data.push(newTemp);
        tempChart.data.labels.push(new Date().toLocaleTimeString());
        
        // Keep only last 12 data points
        if (tempChart.data.datasets[0].data.length > 12) {
            tempChart.data.datasets[0].data.shift();
            tempChart.data.labels.shift();
        }
        
        tempChart.update('none');
    }
    
    // Update species chart with slight variations
    if (speciesChart) {
        speciesChart.data.datasets[0].data = speciesChart.data.datasets[0].data.map(value => {
            return Math.max(0, value + (Math.random() - 0.5) * 10);
        });
        speciesChart.update('none');
    }
}

function addNewActivity() {
    const activities = [
        { icon: '📊', title: 'Temperature sensor calibration completed at Station Beta', time: 'just now' },
        { icon: '🧬', title: 'DNA sequencing batch #1247 processing complete', time: 'just now' },
        { icon: '🐟', title: 'Rare species spotted: Pristipomoides filamentosus', time: 'just now' },
        { icon: '💧', title: 'Salinity anomaly detected in sector 7', time: 'just now' },
        { icon: '🔬', title: 'Plankton sample collection from deep water complete', time: 'just now' }
    ];
    
    const activityList = document.getElementById('activityList');
    if (activityList) {
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.style.opacity = '0';
        activityItem.innerHTML = `
            <div class="activity-icon">${randomActivity.icon}</div>
            <div class="activity-content">
                <span class="activity-title">${randomActivity.title}</span>
                <span class="activity-time">${randomActivity.time}</span>
            </div>
        `;
        
        // Add to top of list
        activityList.insertBefore(activityItem, activityList.firstChild);
        
        // Animate in
        setTimeout(() => {
            activityItem.style.opacity = '1';
            activityItem.style.transform = 'translateY(0)';
        }, 100);
        
        // Remove old items (keep only 5)
        const items = activityList.querySelectorAll('.activity-item');
        if (items.length > 5) {
            items[items.length - 1].remove();
        }
    }
}

function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update theme toggle icon
        const icon = themeToggle.querySelector('svg path');
        if (newTheme === 'dark') {
            icon.setAttribute('d', 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z');
        } else {
            icon.setAttribute('d', 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z');
        }
    });
}

function initializeMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const sidebar = document.getElementById('sidebar');
    
    mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        
        // Animate hamburger menu
        const spans = mobileToggle.querySelectorAll('span');
        if (sidebar.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !mobileToggle.contains(e.target) &&
            sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    });
}

function initializeSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchModal = document.getElementById('searchModal');
    
    searchBtn.addEventListener('click', () => {
        searchModal.classList.add('active');
        setTimeout(() => {
            document.querySelector('.search-input').focus();
        }, 100);
    });
    
    // Close search on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            closeSearchModal();
        }
    });
    
    // Close search on backdrop click
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            closeSearchModal();
        }
    });
}

function initializeSpeciesGallery() {
    const galleryBtns = document.querySelectorAll('.gallery-btn');
    const speciesCards = document.querySelectorAll('.species-card');
    
    galleryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            galleryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            
            // Filter species cards
            speciesCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.animation = 'slideIn 0.3s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function initializeDNAHeatmap() {
    const heatmapContainer = document.getElementById('dnaHeatmap');
    if (heatmapContainer) {
        // Generate heatmap cells
        for (let i = 0; i < 60; i++) {
            const cell = document.createElement('div');
            cell.className = 'heatmap-cell';
            
            // Random intensity for demo
            const intensity = Math.random();
            if (intensity < 0.3) {
                cell.style.backgroundColor = '#E0F2FE';
            } else if (intensity < 0.7) {
                cell.style.backgroundColor = '#0EA5E9';
            } else {
                cell.style.backgroundColor = '#0369A1';
            }
            
            // Add tooltip on hover
            cell.title = `eDNA Concentration: ${(intensity * 100).toFixed(1)}%`;
            
            heatmapContainer.appendChild(cell);
        }
    }
}

function initializeReportGeneration() {
    const generateBtn = document.querySelector('.generate-report-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            // Simulate report generation
            generateBtn.innerHTML = `
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Generating...
            `;
            generateBtn.disabled = true;
            
            setTimeout(() => {
                generateBtn.innerHTML = `
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Report Generated
                `;
                
                setTimeout(() => {
                    generateBtn.innerHTML = `
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        Generate Report
                    `;
                    generateBtn.disabled = false;
                }, 2000);
            }, 3000);
        });
    }
    
    // Initialize filter buttons
    const filterBtns = document.querySelectorAll('.result-filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // In a real app, this would filter the sequencing results
            console.log(`Filtering by: ${btn.dataset.filter}`);
        });
    });
    
    // Initialize depth control buttons
    const depthBtns = document.querySelectorAll('.depth-btn');
    depthBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            depthBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update depth chart data based on selection
            if (depthChart) {
                const depth = btn.dataset.depth;
                let newData;
                
                switch(depth) {
                    case 'surface':
                        newData = [26.2, 25.8, 25.1, 24.6, 24.2, 23.9];
                        break;
                    case 'mid':
                        newData = [22.1, 21.8, 21.2, 20.8, 20.1, 19.7];
                        break;
                    case 'deep':
                        newData = [8.7, 8.2, 7.9, 7.5, 7.1, 6.8];
                        break;
                    default:
                        newData = [26.2, 24.8, 22.1, 18.5, 12.3, 8.7];
                }
                
                depthChart.data.datasets[0].data = newData;
                depthChart.update();
            }
        });
    });
    
    // Initialize season control buttons
    const seasonBtns = document.querySelectorAll('.season-btn');
    seasonBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            seasonBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update seasonal chart data
            if (seasonalChart) {
                const season = btn.dataset.season;
                let newData;
                
                switch(season) {
                    case 'monsoon':
                        newData = [2.8, 2.9, 3.1, 3.4, 3.2, 4.1, 4.3, 4.0, 3.8, 3.5, 3.2, 3.0];
                        break;
                    case 'winter':
                        newData = [3.8, 3.9, 4.1, 3.7, 3.4, 3.2, 3.0, 3.1, 3.5, 3.8, 4.0, 3.9];
                        break;
                    case 'summer':
                        newData = [3.0, 3.2, 3.6, 3.9, 3.7, 3.4, 3.2, 3.4, 3.7, 3.9, 3.6, 3.3];
                        break;
                    default:
                        newData = [3.2, 3.4, 3.8, 4.1, 3.9, 3.6, 3.4, 3.7, 4.0, 4.2, 3.8, 3.5];
                }
                
                seasonalChart.data.datasets[0].data = newData;
                seasonalChart.update();
            }
        });
    });
}

function closeSearchModal() {
    document.getElementById('searchModal').classList.remove('active');
}

function exportChart(chartId) {
    let chart;
    switch(chartId) {
        case 'tempChart':
            chart = tempChart;
            break;
        case 'speciesChart':
            chart = speciesChart;
            break;
        case 'dnaChart':
            chart = dnaChart;
            break;
        case 'familyChart':
            chart = familyChart;
            break;
        case 'biodiversityChart':
            chart = biodiversityChart;
            break;
        case 'correlationChart':
            chart = correlationChart;
            break;
        case 'depthChart':
            chart = depthChart;
            break;
        case 'pipelineChart':
            chart = pipelineChart;
            break;
        case 'methodsChart':
            chart = methodsChart;
            break;
        case 'collectionTrendsChart':
            chart = collectionTrendsChart;
            break;
        case 'impactChart':
            chart = impactChart;
            break;
        case 'seasonalChart':
            chart = seasonalChart;
            break;
    }
    
    if (chart) {
        const link = document.createElement('a');
        link.download = `${chartId}-export.png`;
        link.href = chart.toBase64Image();
        link.click();
    }
}

function toggleMapView(viewType) {
    const buttons = document.querySelectorAll('.map-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // In a real implementation, this would switch map layers
    console.log(`Switched to ${viewType} view`);
}

// Utility functions
function formatNumber(num) {
    return new Intl.NumberFormat('en-IN').format(num);
}

function getRandomChange(base, variance) {
    return base + (Math.random() - 0.5) * variance;
}

// Real-time data simulation
function simulateRealTimeData() {
    // This would connect to actual data sources in production
    const newData = {
        temperature: getRandomChange(24.2, 2),
        salinity: getRandomChange(35.2, 1),
        species: Math.floor(getRandomChange(2847, 50)),
        dna: Math.floor(getRandomChange(15932, 100))
    };
    
    return newData;
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.getElementById('sidebar').classList.remove('open');
    }
    
    // Resize charts
    if (tempChart) tempChart.resize();
    if (speciesChart) speciesChart.resize();
    if (dnaChart) dnaChart.resize();
    if (familyChart) familyChart.resize();
    if (biodiversityChart) biodiversityChart.resize();
    if (correlationChart) correlationChart.resize();
    if (depthChart) depthChart.resize();
    if (pipelineChart) pipelineChart.resize();
    if (methodsChart) methodsChart.resize();
    if (collectionTrendsChart) collectionTrendsChart.resize();
    if (impactChart) impactChart.resize();
    if (seasonalChart) seasonalChart.resize();
    if (map) map.invalidateSize();
});

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        isRealTimeEnabled = false;
    } else {
        isRealTimeEnabled = true;
    }
});

// Error handling for charts
window.addEventListener('error', (e) => {
    if (e.message.includes('Chart')) {
        console.error('Chart error:', e);
        // Fallback: show static message
        const chartContainers = document.querySelectorAll('.chart-container canvas');
        chartContainers.forEach(canvas => {
            const container = canvas.parentElement;
            container.innerHTML = `
                <div class="chart-loading">
                    <p>Unable to load chart. Please refresh the page.</p>
                </div>
            `;
        });
    }
});

// Performance optimization: Lazy load charts when visible
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const chartCanvas = entry.target.querySelector('canvas');
            if (chartCanvas && !chartCanvas.chart) {
                // Initialize chart when it becomes visible
                initializeCharts();
            }
        }
    });
}, observerOptions);

// Observe chart containers
document.addEventListener('DOMContentLoaded', () => {
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach(container => {
        chartObserver.observe(container);
    });
});

// Additional utility functions for enhanced sections
function updateParameterStatus(parameter, value, normalRange) {
    const [min, max] = normalRange;
    if (value < min || value > max) {
        return value < min * 0.9 || value > max * 1.1 ? 'critical' : 'warning';
    }
    return 'normal';
}

function simulateSequencingProgress() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const currentWidth = parseInt(bar.style.width) || 0;
        if (currentWidth < 100) {
            const newWidth = Math.min(100, currentWidth + Math.random() * 5);
            bar.style.width = newWidth + '%';
            
            // Update ETA
            const item = bar.closest('.sequencing-item');
            const timeSpan = item.querySelector('.sequencing-time');
            if (newWidth < 100) {
                const eta = ((100 - newWidth) / 20 * 2.3).toFixed(1);
                timeSpan.textContent = `Processing... ${newWidth.toFixed(0)}% complete (ETA: ${eta}h)`;
            } else {
                timeSpan.textContent = 'Completed just now';
                item.querySelector('.sequencing-status').className = 'sequencing-status completed';
                item.querySelector('.sequencing-species').textContent = 'Lutjanus campechanus (Red Snapper)';
                item.querySelector('.sequencing-confidence').textContent = 'Confidence: 98.4%';
            }
        }
    });
}

// Start sequencing progress simulation
setInterval(simulateSequencingProgress, 2000);