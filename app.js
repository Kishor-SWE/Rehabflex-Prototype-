// RehabFlex Application JavaScript

// Application data
const appData = {
    patientStats: {
        totalPatients: 15000,
        successRate: 92,
        exercisesCompleted: 450000,
        averageRecoveryTime: "6 weeks"
    },
    exerciseCategories: [
        {
            name: "Knee Rehabilitation",
            exercises: [
                {"name": "Knee Extension", "difficulty": "Beginner", "duration": "10 min", "reps": "3 sets of 15"},
                {"name": "Quad Strengthening", "difficulty": "Intermediate", "duration": "15 min", "reps": "3 sets of 12"},
                {"name": "Knee Flexion", "difficulty": "Beginner", "duration": "8 min", "reps": "2 sets of 20"}
            ]
        },
        {
            name: "Shoulder Recovery",
            exercises: [
                {"name": "Shoulder Rolls", "difficulty": "Beginner", "duration": "5 min", "reps": "3 sets of 10"},
                {"name": "Arm Raises", "difficulty": "Intermediate", "duration": "12 min", "reps": "3 sets of 15"},
                {"name": "Rotator Cuff", "difficulty": "Advanced", "duration": "20 min", "reps": "4 sets of 8"}
            ]
        },
        {
            name: "Hip Strengthening",
            exercises: [
                {"name": "Hip Bridges", "difficulty": "Beginner", "duration": "10 min", "reps": "3 sets of 12"},
                {"name": "Leg Lifts", "difficulty": "Intermediate", "duration": "15 min", "reps": "3 sets of 10"},
                {"name": "Hip Abduction", "difficulty": "Advanced", "duration": "18 min", "reps": "4 sets of 12"}
            ]
        }
    ],
    progressData: {
        weeklyProgress: [85, 92, 78, 95, 88, 91, 96],
        monthlyStats: {
            exercisesCompleted: 124,
            avgAccuracy: 91,
            streakDays: 23,
            badgesEarned: 7
        }
    },
    patientDashboard: {
        dailyPlan: [
            {"exercise": "Morning Stretch", "time": "9:00 AM", "duration": "15 min", "completed": true},
            {"exercise": "Knee Strengthening", "time": "2:00 PM", "duration": "20 min", "completed": false},
            {"exercise": "Balance Training", "time": "6:00 PM", "duration": "10 min", "completed": false}
        ],
        upcomingSessions: [
            {"type": "Virtual Consultation", "date": "2025-08-30", "time": "10:00 AM", "provider": "Dr. Smith"},
            {"type": "Progress Review", "date": "2025-09-02", "time": "3:00 PM", "provider": "PT Johnson"}
        ]
    },
    providerDashboard: {
        patients: [
            {"name": "John D.", "age": 45, "condition": "Knee Recovery", "progress": 78, "lastSession": "2025-08-27"},
            {"name": "Sarah M.", "age": 32, "condition": "Shoulder Rehab", "progress": 92, "lastSession": "2025-08-28"},
            {"name": "Robert L.", "age": 58, "condition": "Hip Replacement", "progress": 65, "lastSession": "2025-08-26"}
        ]
    }
};

// Application state
let currentCamera = null;
let isVoiceEnabled = true;
let currentExercise = null;
let repCount = 0;
let exerciseTimer = null;
let speechSynthesis = window.speechSynthesis;

// Initialize immediately when script loads
console.log('RehabFlex script loading...');

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing RehabFlex...');
    setTimeout(initializeApp, 50); // Small delay to ensure all elements are ready
});

// Backup initialization in case DOMContentLoaded already fired
if (document.readyState !== 'loading') {
    console.log('DOM already ready - Initializing RehabFlex immediately...');
    setTimeout(initializeApp, 50);
}

function initializeApp() {
    console.log('Starting app initialization...');
    
    // Initialize core functionality
    initializeNavigation();
    initializeModals();
    initializeTabs();
    initializeAccessibility();
    initializeExerciseInterface();
    initializeMotionSensor();
    
    // Initialize data and UI
    populateDashboardData();
    populateProviderData();
    initializeProgressCircles();
    enhanceAccessibility();
    
    // Wait for Chart.js to load
    setTimeout(() => {
        initializeCharts();
    }, 200);
    
    console.log('RehabFlex initialization complete');
}

// Navigation functionality
function initializeNavigation() {
    console.log('Setting up navigation...');
    
    // Handle navbar links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                console.log('Navigated to:', targetId);
            }
        });
    });

    // Setup login button - Multiple approaches for reliability
    setupLoginButton();
    
    // Hero buttons
    const startTrialBtn = document.getElementById('startTrialBtn');
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    
    if (startTrialBtn) {
        startTrialBtn.addEventListener('click', function() {
            const target = document.getElementById('patient-portal');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            const target = document.getElementById('features');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
}

function setupLoginButton() {
    // Try multiple ways to set up the login button
    const loginBtn = document.getElementById('loginBtn');
    
    if (loginBtn) {
        console.log('Login button found, setting up event listeners...');
        
        // Remove any existing listeners first
        loginBtn.removeEventListener('click', handleLoginClick);
        
        // Add click event listener
        loginBtn.addEventListener('click', handleLoginClick);
        
        // Also handle with mousedown for backup
        loginBtn.addEventListener('mousedown', function(e) {
            console.log('Login button mousedown detected');
            e.preventDefault();
            setTimeout(() => handleLoginClick(e), 10);
        });
        
        console.log('Login button event listeners attached');
    } else {
        console.error('Login button not found!');
        
        // Try to find it with a fallback approach
        setTimeout(() => {
            const fallbackBtn = document.querySelector('button[id="loginBtn"], .btn:contains("Login")');
            if (fallbackBtn) {
                console.log('Found login button with fallback method');
                fallbackBtn.addEventListener('click', handleLoginClick);
            }
        }, 100);
    }
}

function handleLoginClick(e) {
    console.log('Login button clicked - showing modal');
    e.preventDefault();
    e.stopPropagation();
    showModal('loginModal');
    return false;
}

// Modal functionality
function initializeModals() {
    console.log('Initializing modal system...');
    
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    
    if (!loginModal) {
        console.error('Login modal element not found!');
        return;
    }
    
    // Ensure modal starts hidden
    loginModal.classList.add('hidden');
    loginModal.style.display = 'none'; // Force hide with inline style as backup
    console.log('Modal initialized as hidden');
    
    // Setup close button
    if (closeModal) {
        closeModal.addEventListener('click', function(e) {
            console.log('Close button clicked');
            e.preventDefault();
            e.stopPropagation();
            hideModal('loginModal');
        });
    }
    
    // Setup overlay click to close
    const modalOverlay = loginModal.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                console.log('Overlay clicked - closing modal');
                hideModal('loginModal');
            }
        });
    }
    
    // Setup escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal:not(.hidden)');
            if (openModal && !openModal.classList.contains('hidden')) {
                console.log('Escape pressed - closing modal');
                hideModal(openModal.id);
            }
        }
    });
    
    console.log('Modal system initialized');
}

function showModal(modalId) {
    console.log('Attempting to show modal:', modalId);
    
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Modal not found:', modalId);
        return;
    }
    
    // Show modal with multiple methods for reliability
    modal.classList.remove('hidden');
    modal.style.display = 'flex'; // Force show with inline style
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    console.log('Modal should now be visible:', modalId);
    
    // Focus management
    setTimeout(() => {
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.focus();
        }
    }, 100);
}

function hideModal(modalId) {
    console.log('Hiding modal:', modalId);
    
    const modal = document.getElementById(modalId);
    if (!modal) {
        console.error('Modal not found for hiding:', modalId);
        return;
    }
    
    // Hide modal with multiple methods
    modal.classList.add('hidden');
    modal.style.display = 'none';
    modal.style.visibility = 'hidden';
    modal.style.opacity = '0';
    
    // Restore body scrolling
    document.body.style.overflow = '';
    
    // Return focus
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.focus();
    }
    
    console.log('Modal hidden:', modalId);
}

// Tab functionality
function initializeTabs() {
    console.log('Initializing tab system...');
    
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const parentSection = this.closest('.patient-portal, .provider-portal');
            
            console.log('Tab clicked:', tabId);
            
            if (!parentSection) {
                console.error('Parent section not found for tab:', tabId);
                return;
            }
            
            // Remove active from all tabs in this section
            parentSection.querySelectorAll('.tab-btn').forEach(tab => {
                tab.classList.remove('active');
                tab.setAttribute('aria-selected', 'false');
            });
            
            // Hide all content in this section
            parentSection.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });
            
            // Activate current tab
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            // Show current content
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.style.display = 'block';
                console.log('Tab activated:', tabId);
            } else {
                console.error('Tab content not found:', tabId);
            }
        });
    });
}

// Accessibility functionality
function initializeAccessibility() {
    const accessibilityToggle = document.getElementById('accessibilityToggle');
    const accessibilityPanel = document.getElementById('accessibilityPanel');
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    const highContrastToggle = document.getElementById('highContrastToggle');
    const focusIndicatorToggle = document.getElementById('focusIndicatorToggle');

    if (accessibilityToggle && accessibilityPanel) {
        accessibilityToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            accessibilityPanel.classList.toggle('hidden');
        });
    }

    if (fontSizeSlider) {
        fontSizeSlider.addEventListener('input', function() {
            document.documentElement.style.fontSize = this.value + 'px';
        });
    }

    if (highContrastToggle) {
        highContrastToggle.addEventListener('change', function() {
            document.body.classList.toggle('high-contrast', this.checked);
        });
    }

    if (focusIndicatorToggle) {
        focusIndicatorToggle.addEventListener('change', function() {
            document.body.classList.toggle('enhanced-focus', this.checked);
        });
    }

    // Close panel when clicking outside
    document.addEventListener('click', function(e) {
        if (accessibilityPanel && 
            !accessibilityPanel.contains(e.target) && 
            !accessibilityToggle.contains(e.target)) {
            accessibilityPanel.classList.add('hidden');
        }
    });
}

// Exercise interface functionality
function initializeExerciseInterface() {
    const exerciseSelect = document.getElementById('exerciseSelect');
    const startExerciseBtn = document.getElementById('startExerciseBtn');
    const pauseExerciseBtn = document.getElementById('pauseExerciseBtn');
    const stopExerciseBtn = document.getElementById('stopExerciseBtn');

    if (startExerciseBtn) {
        startExerciseBtn.addEventListener('click', function() {
            const selectedExercise = exerciseSelect?.value;
            if (selectedExercise) {
                startExercise(selectedExercise);
            } else {
                speak('Please select an exercise first');
                alert('Please select an exercise first');
            }
        });
    }

    if (pauseExerciseBtn) {
        pauseExerciseBtn.addEventListener('click', pauseExercise);
    }

    if (stopExerciseBtn) {
        stopExerciseBtn.addEventListener('click', stopExercise);
    }
}

function startExercise(exerciseType) {
    currentExercise = exerciseType;
    repCount = 0;
    updateRepCount();
    updateFormStatus('Exercise started! Begin your movements');
    speak('Exercise started. I will monitor your form and provide feedback.');
    
    exerciseTimer = setInterval(() => {
        simulateFormFeedback();
    }, 3000);
}

function pauseExercise() {
    if (exerciseTimer) {
        clearInterval(exerciseTimer);
        exerciseTimer = null;
        updateFormStatus('Exercise paused');
        speak('Exercise paused');
    }
}

function stopExercise() {
    if (exerciseTimer) {
        clearInterval(exerciseTimer);
        exerciseTimer = null;
    }
    currentExercise = null;
    repCount = 0;
    updateRepCount();
    updateFormStatus('Exercise completed');
    speak('Exercise session completed. Great work!');
    
    const formIndicator = document.getElementById('formIndicator');
    if (formIndicator) {
        formIndicator.className = 'indicator-circle';
    }
}

function simulateFormFeedback() {
    const formIndicator = document.getElementById('formIndicator');
    if (!formIndicator) return;
    
    const feedback = Math.random();
    
    if (feedback > 0.7) {
        formIndicator.className = 'indicator-circle good';
        updateFormStatus('Excellent form!');
        repCount++;
        updateRepCount();
        if (Math.random() > 0.5) {
            speak('Great form! Keep it up.');
        }
    } else if (feedback > 0.4) {
        formIndicator.className = 'indicator-circle';
        updateFormStatus('Good, maintain position');
    } else {
        formIndicator.className = 'indicator-circle poor';
        updateFormStatus('Adjust your posture');
        speak('Please adjust your posture. Keep your back straight and movements controlled.');
    }
}

function updateFormStatus(status) {
    const formStatus = document.getElementById('formStatus');
    if (formStatus) {
        formStatus.textContent = status;
    }
}

function updateRepCount() {
    const repCountDisplay = document.getElementById('repCount');
    if (repCountDisplay) {
        repCountDisplay.textContent = repCount;
    }
}

// Motion sensor functionality
function initializeMotionSensor() {
    const enableCameraBtn = document.getElementById('enableCameraBtn');
    const startPoseDetectionBtn = document.getElementById('startPoseDetectionBtn');
    const toggleVoiceBtn = document.getElementById('toggleVoiceBtn');
    const voiceStatus = document.getElementById('voiceStatus');

    if (enableCameraBtn) {
        enableCameraBtn.addEventListener('click', enableCamera);
    }

    if (startPoseDetectionBtn) {
        startPoseDetectionBtn.addEventListener('click', startPoseDetection);
    }

    if (toggleVoiceBtn) {
        toggleVoiceBtn.addEventListener('click', function() {
            isVoiceEnabled = !isVoiceEnabled;
            if (voiceStatus) {
                voiceStatus.textContent = isVoiceEnabled ? 'Voice assistant enabled' : 'Voice assistant disabled';
            }
            this.textContent = isVoiceEnabled ? 'Disable Voice' : 'Enable Voice';
        });
    }
}

async function enableCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480 }
        });
        
        const video = document.getElementById('cameraFeed');
        if (video) {
            video.srcObject = stream;
            currentCamera = stream;
            speak('Camera enabled successfully');
        }
    } catch (error) {
        console.error('Error accessing camera:', error);
        speak('Unable to access camera. Please check permissions.');
        alert('Camera access denied. Please allow camera permission to use motion detection.');
    }
}

function startPoseDetection() {
    if (!currentCamera) {
        speak('Please enable camera first');
        alert('Please enable camera first');
        return;
    }
    
    speak('Pose detection started. I will analyze your movements and provide feedback.');
    
    setInterval(() => {
        if (currentCamera && currentExercise) {
            providePoseFeedback();
        }
    }, 5000);
}

function providePoseFeedback() {
    const feedbackMessages = [
        'Keep your shoulders aligned',
        'Excellent posture!',
        'Slow down your movement',
        'Perfect form, continue',
        'Adjust your knee position',
        'Great improvement!'
    ];
    
    const randomFeedback = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];
    speak(randomFeedback);
}

// Voice functionality
function speak(text) {
    if (isVoiceEnabled && speechSynthesis) {
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8;
        utterance.pitch = 1.0;
        utterance.volume = 0.8;
        speechSynthesis.speak(utterance);
    }
}

// Chart initialization
function initializeCharts() {
    const progressChart = document.getElementById('progressChart');
    
    if (progressChart && typeof Chart !== 'undefined') {
        const ctx = progressChart.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Progress %',
                    data: appData.progressData.weeklyProgress,
                    backgroundColor: '#1FB8CD',
                    borderColor: '#21888F',
                    borderWidth: 2,
                    borderRadius: 6,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
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
}

// Populate dashboard data
function populateDashboardData() {
    populateDailyExercises();
    populateUpcomingSessions();
}

function populateDailyExercises() {
    const dailyExercises = document.getElementById('dailyExercises');
    if (dailyExercises) {
        dailyExercises.innerHTML = '';
        appData.patientDashboard.dailyPlan.forEach(exercise => {
            const exerciseElement = document.createElement('div');
            exerciseElement.className = 'exercise-item';
            exerciseElement.innerHTML = `
                <div>
                    <strong>${exercise.exercise}</strong>
                    <div style="font-size: 12px; color: var(--color-text-secondary);">
                        ${exercise.time} • ${exercise.duration}
                    </div>
                </div>
                <div class="status ${exercise.completed ? 'status--success' : 'status--info'}">
                    ${exercise.completed ? 'Completed' : 'Pending'}
                </div>
            `;
            dailyExercises.appendChild(exerciseElement);
        });
    }
}

function populateUpcomingSessions() {
    const upcomingSessions = document.getElementById('upcomingSessions');
    if (upcomingSessions) {
        upcomingSessions.innerHTML = '';
        appData.patientDashboard.upcomingSessions.forEach(session => {
            const sessionElement = document.createElement('div');
            sessionElement.className = 'session-item';
            sessionElement.innerHTML = `
                <div>
                    <strong>${session.type}</strong>
                    <div style="font-size: 12px; color: var(--color-text-secondary);">
                        ${session.date} at ${session.time}
                    </div>
                    <div style="font-size: 12px; color: var(--color-text-secondary);">
                        with ${session.provider}
                    </div>
                </div>
                <button class="btn btn--sm btn--outline">Join</button>
            `;
            upcomingSessions.appendChild(sessionElement);
        });
    }
}

// Populate provider data
function populateProviderData() {
    const patientsTableBody = document.getElementById('patientsTableBody');
    if (patientsTableBody) {
        patientsTableBody.innerHTML = '';
        appData.providerDashboard.patients.forEach(patient => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.condition}</td>
                <td>
                    <div class="progress-bar" style="width: 100px; height: 8px; background: var(--color-border); border-radius: 4px; overflow: hidden;">
                        <div style="width: ${patient.progress}%; height: 100%; background: var(--color-primary);"></div>
                    </div>
                    ${patient.progress}%
                </td>
                <td>${patient.lastSession}</td>
                <td>
                    <button class="btn btn--sm btn--primary">View</button>
                    <button class="btn btn--sm btn--outline">Message</button>
                </td>
            `;
            patientsTableBody.appendChild(row);
        });
    }
}

// Initialize progress circles
function initializeProgressCircles() {
    const progressCircles = document.querySelectorAll('.progress-circle');
    
    progressCircles.forEach(circle => {
        const progress = parseInt(circle.getAttribute('data-progress'));
        const progressPercentage = (progress / 100) * 360;
        
        circle.style.setProperty('--progress', progressPercentage + 'deg');
        
        setTimeout(() => {
            circle.style.transition = 'all 1s ease-in-out';
        }, 500);
    });
}

// Enhance accessibility
function enhanceAccessibility() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        if (!btn.getAttribute('aria-label') && btn.textContent.trim()) {
            btn.setAttribute('aria-label', btn.textContent.trim());
        }
    });
    
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', tab.classList.contains('active'));
    });
}

// Keyboard support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.classList.contains('btn')) {
        e.target.click();
    }
});

// Global click handler for debugging
document.addEventListener('click', function(e) {
    if (e.target.id === 'loginBtn') {
        console.log('Global click handler caught login button click');
        handleLoginClick(e);
    }
});

console.log('RehabFlex script loaded successfully');