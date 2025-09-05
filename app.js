// RehabConnect - Professional Gamified Remote Rehabilitation Platform

class RehabConnectApp {
    constructor() {
        this.version = '1.0.0';
        this.currentUser = null;
        this.currentView = 'dashboard';
        this.userRole = 'patient'; // 'patient' or 'therapist'
        this.onboardingData = {};
        this.isAuthenticated = false;
        this.currentOnboardingStep = 1;
        this.selectedGoals = new Set();
        this.currentExercise = null;
        this.exerciseTimer = null;
        this.motionTracking = false;
        this.aiAssistantOpen = false;
        this.weeklyProgressChart = null;
        this.progressTrendsChart = null;
        this.accuracyChart = null;
        
        // Application data from the provided JSON
        this.appData = {
            platform: {
                name: "RehabConnect",
                tagline: "Transform Your Recovery Journey",
                version: "1.0.0",
                description: "Gamified Remote Rehabilitation Platform"
            },
            currentUser: {
                id: "patient_001",
                name: "Sarah Martinez",
                email: "sarah.martinez@email.com",
                role: "patient",
                avatar: "https://i.pravatar.cc/150?u=sarah",
                joinDate: "2024-08-15",
                condition: "ACL Recovery",
                therapistId: "therapist_001",
                status: "active",
                streakDays: 12,
                totalPoints: 1850,
                level: 4,
                completedSessions: 28,
                adherenceRate: 87
            },
            patients: [
                {
                    id: "patient_001",
                    name: "Sarah Martinez",
                    age: 28,
                    condition: "ACL Reconstruction Recovery",
                    therapistId: "therapist_001",
                    startDate: "2024-08-15",
                    status: "active",
                    riskLevel: "low",
                    adherenceRate: 87,
                    totalSessions: 28,
                    completedSessions: 24,
                    currentStreak: 12,
                    longestStreak: 18,
                    totalPoints: 1850,
                    level: 4,
                    badges: ["Consistency Champion", "Form Master", "Week Warrior"],
                    nextAppointment: "2025-09-06T14:00:00Z",
                    lastActivity: "2025-09-04T09:30:00Z",
                    progressMetrics: {
                        rangeOfMotion: 85,
                        strength: 72,
                        balance: 89,
                        endurance: 78
                    }
                },
                {
                    id: "patient_002", 
                    name: "Michael Chen",
                    age: 45,
                    condition: "Shoulder Impingement Recovery",
                    therapistId: "therapist_001",
                    startDate: "2024-07-20",
                    status: "active",
                    riskLevel: "medium",
                    adherenceRate: 72,
                    totalSessions: 35,
                    completedSessions: 25,
                    currentStreak: 3,
                    longestStreak: 14,
                    totalPoints: 1420,
                    level: 3,
                    badges: ["Beginner's Luck", "Progress Pioneer"],
                    nextAppointment: "2025-09-05T16:30:00Z",
                    lastActivity: "2025-09-02T11:15:00Z",
                    progressMetrics: {
                        rangeOfMotion: 68,
                        strength: 65,
                        balance: 82,
                        endurance: 71
                    }
                }
            ],
            therapists: [
                {
                    id: "therapist_001",
                    name: "Dr. Jennifer Walsh",
                    title: "Licensed Physical Therapist",
                    credentials: ["DPT", "OCS", "CSCS"],
                    specializations: ["Sports Rehabilitation", "Orthopedic Recovery", "Post-Surgical Care"],
                    experience: "8 years",
                    rating: 4.9,
                    totalPatients: 15,
                    activePatients: 12,
                    avatar: "https://i.pravatar.cc/150?u=jennifer",
                    phone: "+1-555-0123",
                    email: "dr.walsh@rehabconnect.com",
                    availability: {
                        monday: "8:00 AM - 6:00 PM",
                        tuesday: "8:00 AM - 6:00 PM",
                        wednesday: "8:00 AM - 4:00 PM",
                        thursday: "8:00 AM - 6:00 PM",
                        friday: "8:00 AM - 4:00 PM"
                    }
                }
            ],
            exercises: [
                {
                    id: "exercise_001",
                    name: "Knee Flexion Stretch",
                    category: "Flexibility",
                    difficulty: "Beginner",
                    duration: 180,
                    targetReps: 10,
                    holdTime: 15,
                    description: "Gentle knee bending exercise to improve flexibility and range of motion",
                    instructions: [
                        "Sit on edge of chair with feet flat on floor",
                        "Slowly bend affected knee, bringing heel toward buttocks",
                        "Hold stretch for 15 seconds",
                        "Return to starting position",
                        "Repeat 10 times"
                    ],
                    targetMuscles: ["Quadriceps", "Knee Joint"],
                    precautions: ["Stop if pain increases", "Move slowly and controlled"],
                    videoUrl: "/videos/knee-flexion.mp4",
                    thumbnailUrl: "/images/knee-flexion-thumb.jpg",
                    points: 15,
                    requiredEquipment: ["Chair"],
                    motionTracking: {
                        keyPoints: ["knee", "ankle", "hip"],
                        correctForm: {
                            kneeFlexionAngle: [90, 130],
                            hipStability: true,
                            controlledMovement: true
                        }
                    }
                },
                {
                    id: "exercise_002",
                    name: "Wall Push-Ups",
                    category: "Strength",
                    difficulty: "Beginner",
                    duration: 120,
                    targetReps: 15,
                    description: "Upper body strengthening exercise for shoulder rehabilitation",
                    instructions: [
                        "Stand arm's length from wall",
                        "Place palms flat against wall at shoulder height",
                        "Lean forward and push back slowly",
                        "Keep body straight throughout movement",
                        "Complete 15 repetitions"
                    ],
                    targetMuscles: ["Chest", "Shoulders", "Triceps"],
                    precautions: ["Avoid if shoulder pain occurs", "Maintain proper form"],
                    videoUrl: "/videos/wall-pushups.mp4", 
                    thumbnailUrl: "/images/wall-pushups-thumb.jpg",
                    points: 20,
                    requiredEquipment: ["Wall"],
                    motionTracking: {
                        keyPoints: ["shoulders", "elbows", "wrists"],
                        correctForm: {
                            shoulderAlignment: true,
                            elbowRange: [30, 90],
                            bodyAlignment: true
                        }
                    }
                },
                {
                    id: "exercise_003",
                    name: "Single Leg Balance",
                    category: "Balance",
                    difficulty: "Intermediate", 
                    duration: 300,
                    targetTime: 30,
                    description: "Balance training exercise to improve proprioception and stability",
                    instructions: [
                        "Stand near wall or chair for support if needed",
                        "Lift one foot off ground",
                        "Balance on standing leg for 30 seconds",
                        "Keep eyes focused straight ahead",
                        "Switch legs and repeat"
                    ],
                    targetMuscles: ["Core", "Ankles", "Legs"],
                    precautions: ["Use support if balance is poor", "Stop if dizziness occurs"],
                    videoUrl: "/videos/single-leg-balance.mp4",
                    thumbnailUrl: "/images/balance-thumb.jpg", 
                    points: 25,
                    requiredEquipment: ["Optional: Chair for support"],
                    motionTracking: {
                        keyPoints: ["ankles", "knees", "hips", "core"],
                        correctForm: {
                            centerOfMass: "stable",
                            minimumSway: true,
                            duration: 30
                        }
                    }
                }
            ],
            exerciseSessions: [
                {
                    id: "session_001",
                    patientId: "patient_001",
                    exerciseId: "exercise_001",
                    date: "2025-09-04T09:30:00Z",
                    status: "completed",
                    actualReps: 10,
                    targetReps: 10,
                    accuracy: 92,
                    formScore: 88,
                    duration: 185,
                    pointsEarned: 15,
                    feedback: [
                        "Excellent range of motion!",
                        "Great control throughout movement",
                        "Perfect repetition count"
                    ],
                    motionData: {
                        averageKneeFlexion: 125,
                        consistency: 94,
                        smoothness: 89
                    }
                }
            ],
            achievements: [
                {
                    id: "badge_001",
                    name: "First Steps",
                    description: "Complete your first exercise session",
                    icon: "🏁",
                    category: "milestone",
                    points: 50,
                    rarity: "common"
                },
                {
                    id: "badge_002",
                    name: "Week Warrior", 
                    description: "Complete exercises 7 days in a row",
                    icon: "🔥",
                    category: "consistency",
                    points: 100,
                    rarity: "uncommon"
                },
                {
                    id: "badge_003",
                    name: "Form Master",
                    description: "Achieve 90%+ form accuracy in 10 sessions",
                    icon: "🎯", 
                    category: "precision",
                    points: 150,
                    rarity: "rare"
                },
                {
                    id: "badge_004",
                    name: "Consistency Champion",
                    description: "Maintain 80%+ adherence for 30 days",
                    icon: "👑",
                    category: "adherence", 
                    points: 200,
                    rarity: "epic"
                }
            ],
            notifications: [
                {
                    id: "notif_001",
                    type: "encouragement",
                    title: "Great Progress!",
                    message: "You've completed 12 days in a row. Keep up the excellent work!",
                    timestamp: "2025-09-04T10:00:00Z",
                    read: false,
                    priority: "normal"
                },
                {
                    id: "notif_002",
                    type: "reminder",
                    title: "Exercise Reminder",
                    message: "Don't forget your afternoon balance exercises.",
                    timestamp: "2025-09-04T14:00:00Z", 
                    read: false,
                    priority: "normal"
                }
            ],
            aiAssistant: {
                name: "RehabBot",
                personality: "encouraging and knowledgeable",
                responses: [
                    "Great job on today's session! Your form is really improving.",
                    "Remember to listen to your body - rest if you feel any pain.",
                    "You're making excellent progress toward your goals!",
                    "Try to focus on the quality of movement rather than speed.",
                    "Don't forget to stay hydrated during your exercises."
                ],
                insights: [
                    "Your morning sessions tend to have better form accuracy.",
                    "You've improved your range of motion by 15% this month!",
                    "Consistency is your strength - keep building on that streak!"
                ]
            },
            progressMetrics: {
                weeklyAdherence: [85, 92, 78, 89, 94, 87, 91],
                monthlyProgress: {
                    rangeOfMotion: [65, 72, 78, 85],
                    strength: [58, 64, 69, 72], 
                    balance: [75, 82, 86, 89],
                    endurance: [62, 68, 74, 78]
                },
                exerciseAccuracy: [
                    {"exercise": "Knee Flexion", "accuracy": 92, "trend": "improving"},
                    {"exercise": "Wall Push-ups", "accuracy": 86, "trend": "stable"},
                    {"exercise": "Balance", "accuracy": 89, "trend": "improving"}
                ]
            },
            faqs: [
                {
                    question: "How does motion tracking work?",
                    answer: "Our platform uses advanced computer vision technology to analyze your movements through your device's camera. It provides real-time feedback on exercise form and tracks your progress over time."
                },
                {
                    question: "Is my health data secure?",
                    answer: "Yes, we use enterprise-grade encryption and follow HIPAA compliance standards to protect your health information. Your data is never shared without your explicit consent."
                },
                {
                    question: "What equipment do I need?",
                    answer: "Most exercises require minimal equipment - just a chair, wall, or open space. Specific equipment needs are listed for each exercise. A webcam or smartphone camera is needed for motion tracking."
                },
                {
                    question: "Can I do exercises without internet?",
                    answer: "Yes! You can download exercise videos for offline viewing. Progress will sync when you reconnect to the internet."
                },
                {
                    question: "How often should I exercise?",
                    answer: "Your therapist will create a personalized schedule based on your condition and recovery goals. Generally, consistency is more important than intensity."
                }
            ]
        };
        
        this.init();
    }

    init() {
        // Wait for DOM to be loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupApp();
            });
        } else {
            this.setupApp();
        }
    }

    setupApp() {
        this.showLoadingScreen();
        this.updateLoadingStatus("Connecting to rehabilitation platform...");
        
        setTimeout(() => {
            this.updateLoadingStatus("Loading your rehabilitation data...");
            setTimeout(() => {
                this.updateLoadingStatus("Initializing motion tracking system...");
                setTimeout(() => {
                    this.hideLoadingScreen();
                    this.showLandingPage();
                    this.setupEventListeners();
                }, 800);
            }, 600);
        }, 600);
    }

    // Loading Screen Management
    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    updateLoadingStatus(status) {
        const statusElement = document.getElementById('loadingStatus');
        if (statusElement) {
            statusElement.textContent = status;
        }
    }

    showLandingPage() {
        const landingPage = document.getElementById('landingPage');
        if (landingPage) {
            landingPage.style.display = 'block';
        }
    }

    hideLandingPage() {
        const landingPage = document.getElementById('landingPage');
        if (landingPage) {
            landingPage.style.display = 'none';
        }
    }

    // Event Listeners Setup
    setupEventListeners() {
        this.setupLandingPageEvents();
        this.setupAuthEvents();
        this.setupOnboardingEvents();
        this.setupNavigationEvents();
        this.setupDashboardEvents();
        this.setupExerciseEvents();
        this.setupAIAssistantEvents();
        this.setupGlobalEvents();
    }

    setupLandingPageEvents() {
        const getStartedBtn = document.getElementById('getStartedBtn');
        const heroPatientBtn = document.getElementById('heroPatientBtn');
        const heroTherapistBtn = document.getElementById('heroTherapistBtn');
        
        if (getStartedBtn) {
            getStartedBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showAuthModal();
            });
        }
        
        if (heroPatientBtn) {
            heroPatientBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.userRole = 'patient';
                this.showAuthModal();
            });
        }
        
        if (heroTherapistBtn) {
            heroTherapistBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.userRole = 'therapist';
                this.showAuthModal();
            });
        }

        // Header navigation links
        document.querySelectorAll('.header-nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

    setupAuthEvents() {
        const closeAuthModal = document.getElementById('closeAuthModal');
        const authForm = document.getElementById('authForm');
        const demoLogin = document.getElementById('demoLogin');
        
        if (closeAuthModal) {
            closeAuthModal.addEventListener('click', (e) => {
                e.preventDefault();
                this.hideModals();
            });
        }
        
        // Modal overlay clicks
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    this.hideModals();
                }
            });
        });
        
        // Role selection
        document.querySelectorAll('.role-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.userRole = btn.dataset.role;
                this.updateAuthFormForRole();
            });
        });
        
        // Auth tabs
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchAuthTab(tab.dataset.tab);
            });
        });
        
        if (authForm) {
            authForm.addEventListener('submit', (e) => this.handleAuth(e));
        }
        
        if (demoLogin) {
            demoLogin.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleDemoLogin();
            });
        }
    }

    setupOnboardingEvents() {
        const nextPatientStep = document.getElementById('nextPatientStep');
        const prevPatientStep = document.getElementById('prevPatientStep');
        
        if (nextPatientStep) {
            nextPatientStep.addEventListener('click', (e) => {
                e.preventDefault();
                this.nextOnboardingStep();
            });
        }
        
        if (prevPatientStep) {
            prevPatientStep.addEventListener('click', (e) => {
                e.preventDefault();
                this.prevOnboardingStep();
            });
        }
        
        // Pain scale selection
        document.querySelectorAll('.pain-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.selectPainLevel(btn);
            });
        });
        
        // Activity level selection
        document.querySelectorAll('.activity-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                this.selectActivityLevel(card);
            });
        });
        
        // Goals selection
        document.querySelectorAll('.goal-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleGoal(card);
            });
        });
        
        // Primary condition selection
        const primaryCondition = document.getElementById('primaryCondition');
        if (primaryCondition) {
            primaryCondition.addEventListener('change', (e) => {
                this.onboardingData.condition = e.target.value;
            });
        }
    }

    setupNavigationEvents() {
        const menuToggle = document.getElementById('menuToggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleSidebar();
            });
        }
        
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const view = item.dataset.view;
                if (view) {
                    this.navigateTo(view);
                }
            });
        });

        const userAvatar = document.getElementById('userAvatar');
        const userDropdown = document.getElementById('userDropdown');
        
        if (userAvatar && userDropdown) {
            userAvatar.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                userDropdown.classList.toggle('show');
            });
        }

        // Dropdown items
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const userDropdown = document.getElementById('userDropdown');
                if (userDropdown) {
                    userDropdown.classList.remove('show');
                }
            });
        });
    }

    setupDashboardEvents() {
        // Use event delegation for dynamically added elements
        document.addEventListener('click', (e) => {
            if (e.target.matches('.start-exercise-btn') || e.target.closest('.start-exercise-btn')) {
                e.preventDefault();
                const btn = e.target.matches('.start-exercise-btn') ? e.target : e.target.closest('.start-exercise-btn');
                const exerciseId = btn.dataset.exerciseId;
                if (exerciseId) {
                    this.startExercise(exerciseId);
                }
            }
        });
    }

    setupExerciseEvents() {
        const enableCamera = document.getElementById('enableCamera');
        if (enableCamera) {
            enableCamera.addEventListener('click', (e) => {
                e.preventDefault();
                this.requestCameraAccess();
            });
        }
        
        // Exercise filter events
        const categoryFilter = document.getElementById('categoryFilter');
        const difficultyFilter = document.getElementById('difficultyFilter');
        
        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => this.filterExercises());
        }
        
        if (difficultyFilter) {
            difficultyFilter.addEventListener('change', () => this.filterExercises());
        }

        // Exercise session controls
        document.addEventListener('click', (e) => {
            if (e.target.id === 'pauseBtn') {
                e.preventDefault();
                this.pauseExercise();
            } else if (e.target.id === 'completeBtn') {
                e.preventDefault();
                this.completeExercise();
            }
        });
    }

    setupAIAssistantEvents() {
        const aiToggle = document.querySelector('.ai-toggle');
        const aiInput = document.getElementById('aiInput');
        
        if (aiToggle) {
            aiToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleAIAssistant();
            });
        }
        
        if (aiInput) {
            aiInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.sendAIMessage();
                }
            });
        }

        // AI send button
        document.addEventListener('click', (e) => {
            if (e.target.textContent === 'Send' && e.target.closest('.ai-input')) {
                e.preventDefault();
                this.sendAIMessage();
            }
        });
    }

    setupGlobalEvents() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideModals();
                this.closeSidebar();
            }
        });

        document.addEventListener('click', (e) => {
            const userDropdown = document.getElementById('userDropdown');
            if (userDropdown && !e.target.closest('.user-menu')) {
                userDropdown.classList.remove('show');
            }

            const aiPanel = document.getElementById('aiPanel');
            if (aiPanel && !e.target.closest('.ai-assistant')) {
                // Don't close AI panel on outside clicks for now
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeSidebar();
            }
        });
    }

    // Authentication System
    showAuthModal() {
        const authModal = document.getElementById('authModal');
        if (authModal) {
            authModal.classList.remove('hidden');
            // Pre-select role if already set
            if (this.userRole) {
                const roleBtn = document.querySelector(`[data-role="${this.userRole}"]`);
                if (roleBtn) {
                    setTimeout(() => {
                        roleBtn.click();
                    }, 100);
                }
            }
        }
    }

    hideModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
    }

    switchAuthTab(tab) {
        const tabs = document.querySelectorAll('.auth-tab');
        const signupElements = document.querySelectorAll('.signup-only');
        const authTitle = document.getElementById('authTitle');
        const authSubmit = document.getElementById('authSubmit');

        tabs.forEach(t => t.classList.remove('active'));
        const activeTab = document.querySelector(`[data-tab="${tab}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        if (tab === 'signup') {
            signupElements.forEach(el => el.classList.remove('hidden'));
            if (authTitle) authTitle.textContent = 'Create Account';
            if (authSubmit) authSubmit.textContent = 'Sign Up';
        } else {
            signupElements.forEach(el => el.classList.add('hidden'));
            if (authTitle) authTitle.textContent = 'Welcome Back';
            if (authSubmit) authSubmit.textContent = 'Sign In';
        }
    }

    updateAuthFormForRole() {
        const patientOnlyElements = document.querySelectorAll('.patient-only');
        const therapistOnlyElements = document.querySelectorAll('.therapist-only');
        
        if (this.userRole === 'patient') {
            patientOnlyElements.forEach(el => el.classList.remove('hidden'));
            therapistOnlyElements.forEach(el => el.classList.add('hidden'));
        } else {
            patientOnlyElements.forEach(el => el.classList.add('hidden'));
            therapistOnlyElements.forEach(el => el.classList.remove('hidden'));
        }
    }

    handleAuth(e) {
        e.preventDefault();
        this.showToast('Authenticating...', 'info');
        
        setTimeout(() => {
            this.hideModals();
            if (this.userRole === 'patient') {
                this.startPatientOnboarding();
            } else {
                this.completeAuthentication();
            }
        }, 1500);
    }

    handleDemoLogin() {
        this.userRole = 'patient';
        this.currentUser = this.appData.currentUser;
        this.hideModals();
        this.showToast('Loading demo account...', 'info');
        
        setTimeout(() => {
            this.startPatientOnboarding();
        }, 1000);
    }

    // Patient Onboarding System
    startPatientOnboarding() {
        const onboardingModal = document.getElementById('patientOnboardingModal');
        if (onboardingModal) {
            onboardingModal.classList.remove('hidden');
        }
        this.currentOnboardingStep = 1;
        this.updateOnboardingProgress();
        this.updateOnboardingStep();
    }

    nextOnboardingStep() {
        if (this.validateCurrentStep()) {
            if (this.currentOnboardingStep < 4) {
                this.currentOnboardingStep++;
                this.updateOnboardingStep();
                this.updateOnboardingProgress();
            } else {
                this.completeOnboarding();
            }
        } else {
            this.showToast('Please complete all required fields before continuing.', 'warning');
        }
    }

    prevOnboardingStep() {
        if (this.currentOnboardingStep > 1) {
            this.currentOnboardingStep--;
            this.updateOnboardingStep();
            this.updateOnboardingProgress();
        }
    }

    updateOnboardingStep() {
        document.querySelectorAll('.onboarding-step').forEach(step => {
            step.classList.remove('active');
        });
        
        const currentStep = document.getElementById(`patientStep${this.currentOnboardingStep}`);
        if (currentStep) {
            currentStep.classList.add('active');
        }

        const prevBtn = document.getElementById('prevPatientStep');
        const nextBtn = document.getElementById('nextPatientStep');

        if (prevBtn) {
            prevBtn.disabled = this.currentOnboardingStep === 1;
        }
        
        if (nextBtn) {
            nextBtn.textContent = this.currentOnboardingStep === 4 ? 'Complete Setup' : 'Next';
        }
    }

    updateOnboardingProgress() {
        const progressFill = document.getElementById('onboardingProgress');
        const progressText = document.getElementById('onboardingProgressText');
        
        const percentage = (this.currentOnboardingStep / 4) * 100;
        
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
        
        if (progressText) {
            progressText.textContent = `Step ${this.currentOnboardingStep} of 4`;
        }
    }

    selectPainLevel(btn) {
        document.querySelectorAll('.pain-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.onboardingData.painLevel = btn.dataset.pain;
    }

    selectActivityLevel(card) {
        document.querySelectorAll('.activity-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.onboardingData.activityLevel = card.dataset.activity;
    }

    toggleGoal(card) {
        const goal = card.dataset.goal;
        if (this.selectedGoals.has(goal)) {
            this.selectedGoals.delete(goal);
            card.classList.remove('selected');
        } else {
            this.selectedGoals.add(goal);
            card.classList.add('selected');
        }
    }

    validateCurrentStep() {
        switch (this.currentOnboardingStep) {
            case 1:
                return this.onboardingData.condition && this.onboardingData.painLevel;
            case 2:
                return this.onboardingData.activityLevel;
            case 3:
                return this.selectedGoals.size > 0;
            default:
                return true;
        }
    }

    completeOnboarding() {
        this.onboardingData.goals = Array.from(this.selectedGoals);
        this.updateOnboardingSummary();
        
        this.showToast('Onboarding complete! Setting up your personalized dashboard...', 'success');
        
        setTimeout(() => {
            const onboardingModal = document.getElementById('patientOnboardingModal');
            if (onboardingModal) {
                onboardingModal.classList.add('hidden');
            }
            this.completeAuthentication();
        }, 3000);
    }

    updateOnboardingSummary() {
        const conditionSummary = document.getElementById('conditionSummary');
        const painSummary = document.getElementById('painSummary');
        const activitySummary = document.getElementById('activitySummary');
        
        if (conditionSummary && this.onboardingData.condition) {
            const conditionSelect = document.getElementById('primaryCondition');
            const conditionText = conditionSelect?.selectedOptions[0]?.text || 'Recovery Plan';
            conditionSummary.textContent = conditionText;
        }
        
        if (painSummary && this.onboardingData.painLevel) {
            painSummary.textContent = `Pain Level: ${this.onboardingData.painLevel}/10`;
        }
        
        if (activitySummary && this.onboardingData.activityLevel) {
            const activityText = this.onboardingData.activityLevel.replace('-', ' ');
            activitySummary.textContent = activityText.charAt(0).toUpperCase() + activityText.slice(1) + ' Activity Level';
        }
    }

    completeAuthentication() {
        this.isAuthenticated = true;
        this.currentUser = this.appData.currentUser;
        this.hideLandingPage();
        this.showApp();
    }

    showApp() {
        const appContainer = document.getElementById('appContainer');
        if (appContainer) {
            appContainer.classList.remove('hidden');
        }
        this.setupUserInterface();
        this.loadDashboardData();
        this.initializeCharts();
        this.showWelcomeMessage();
    }

    setupUserInterface() {
        this.updateUserInfo();
        this.setupNavigationForRole();
        this.populateExercises();
        this.populateAchievements();
    }

    updateUserInfo() {
        const elements = {
            userName: document.getElementById('userName'),
            userEmail: document.getElementById('userEmail'),
            welcomeName: document.getElementById('welcomeName'),
            sidebarUserName: document.getElementById('sidebarUserName'),
            sidebarUserLevel: document.getElementById('sidebarUserLevel'),
            sidebarStreak: document.getElementById('sidebarStreak'),
            userAvatarImg: document.getElementById('userAvatarImg'),
            currentStreak: document.getElementById('currentStreak'),
            totalPoints: document.getElementById('totalPoints'),
            currentLevel: document.getElementById('currentLevel'),
            adherenceRate: document.getElementById('adherenceRate')
        };

        if (this.currentUser) {
            if (elements.userName) elements.userName.textContent = this.currentUser.name;
            if (elements.userEmail) elements.userEmail.textContent = this.currentUser.email;
            if (elements.welcomeName) elements.welcomeName.textContent = this.currentUser.name.split(' ')[0];
            if (elements.sidebarUserName) elements.sidebarUserName.textContent = this.currentUser.name;
            if (elements.sidebarUserLevel) elements.sidebarUserLevel.textContent = this.currentUser.level;
            if (elements.sidebarStreak) elements.sidebarStreak.textContent = this.currentUser.streakDays;
            if (elements.userAvatarImg) elements.userAvatarImg.src = this.currentUser.avatar;
            if (elements.currentStreak) elements.currentStreak.textContent = this.currentUser.streakDays;
            if (elements.totalPoints) elements.totalPoints.textContent = this.currentUser.totalPoints.toLocaleString();
            if (elements.currentLevel) elements.currentLevel.textContent = `Level ${this.currentUser.level}`;
            if (elements.adherenceRate) elements.adherenceRate.textContent = `${this.currentUser.adherenceRate}%`;
        }
    }

    setupNavigationForRole() {
        const patientNav = document.querySelectorAll('.patient-nav');
        const therapistNav = document.querySelectorAll('.therapist-nav');
        
        if (this.userRole === 'patient') {
            patientNav.forEach(el => el.classList.remove('hidden'));
            therapistNav.forEach(el => el.classList.add('hidden'));
        } else {
            patientNav.forEach(el => el.classList.add('hidden'));
            therapistNav.forEach(el => el.classList.remove('hidden'));
        }
    }

    // Navigation System
    navigateTo(view) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        
        const targetView = document.getElementById(`${view}View`);
        const targetNav = document.querySelector(`[data-view="${view}"]`);
        
        if (targetView) {
            targetView.classList.add('active');
        }
        
        if (targetNav) {
            targetNav.classList.add('active');
        }
        
        this.currentView = view;
        this.closeSidebar();
        
        // Load specific view data
        this.onViewChange(view);
    }

    onViewChange(view) {
        switch (view) {
            case 'exercises':
                this.loadExercisesView();
                break;
            case 'progress':
                this.loadProgressView();
                break;
            case 'achievements':
                this.loadAchievementsView();
                break;
            case 'patients':
                this.loadPatientsView();
                break;
            case 'support':
                this.loadSupportView();
                break;
            case 'about':
                this.hideLandingPage();
                this.showApp();
                break;
        }
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
    }

    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.remove('open');
        }
    }

    // Dashboard Data Loading
    loadDashboardData() {
        this.loadTodaysExercises();
        this.loadAchievementsPreview();
        this.loadTherapistUpdates();
    }

    loadTodaysExercises() {
        const container = document.getElementById('todaysExercises');
        if (!container) return;

        const todaysExercises = this.appData.exercises.slice(0, 3);
        
        container.innerHTML = todaysExercises.map(exercise => `
            <div class="exercise-item">
                <div class="exercise-info">
                    <h4>${exercise.name}</h4>
                    <p>${exercise.category} • ${exercise.difficulty} • ${exercise.points} pts</p>
                </div>
                <div class="exercise-status">
                    <span class="status-badge pending">Pending</span>
                    <button class="btn btn--primary btn--sm start-exercise-btn" data-exercise-id="${exercise.id}">
                        Start
                    </button>
                </div>
            </div>
        `).join('');
    }

    loadAchievementsPreview() {
        const container = document.getElementById('achievementsPreview');
        if (!container) return;

        const recentAchievements = this.appData.achievements.slice(0, 3);
        
        container.innerHTML = recentAchievements.map(achievement => `
            <div class="achievement-preview">
                <span class="achievement-icon">${achievement.icon}</span>
                <div class="achievement-info">
                    <strong>${achievement.name}</strong>
                    <small>${achievement.description}</small>
                </div>
            </div>
        `).join('');
    }

    loadTherapistUpdates() {
        // Therapist updates are already in HTML for demo
    }

    // Exercise System
    populateExercises() {
        this.loadExercisesView();
    }

    loadExercisesView() {
        const container = document.getElementById('exercisesGrid');
        if (!container) return;

        container.innerHTML = this.appData.exercises.map(exercise => `
            <div class="exercise-card">
                <div class="exercise-header">
                    <span class="exercise-category">${exercise.category}</span>
                    <span class="exercise-points">${exercise.points} pts</span>
                </div>
                <h3 class="exercise-title">${exercise.name}</h3>
                <div class="exercise-meta">
                    <span>⏱️ ${Math.floor(exercise.duration / 60)} min</span>
                    <span>📊 ${exercise.difficulty}</span>
                    <span>🎯 ${exercise.targetReps || exercise.targetTime || 'Variable'}</span>
                </div>
                <p class="exercise-description">${exercise.description}</p>
                <div class="exercise-actions">
                    <button class="btn btn--primary start-exercise-btn" data-exercise-id="${exercise.id}">
                        Start Exercise
                    </button>
                    <button class="btn btn--outline" onclick="app.previewExercise('${exercise.id}')">
                        Preview
                    </button>
                </div>
            </div>
        `).join('');
    }

    startExercise(exerciseId) {
        const exercise = this.appData.exercises.find(ex => ex.id === exerciseId);
        if (!exercise) return;

        this.currentExercise = exercise;
        this.showMotionTrackingModal();
    }

    showMotionTrackingModal() {
        const modal = document.getElementById('motionTrackingModal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    hideMotionTrackingModal() {
        const modal = document.getElementById('motionTrackingModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    requestCameraAccess() {
        this.showToast('Requesting camera access...', 'info');
        
        setTimeout(() => {
            this.motionTracking = true;
            this.showToast('Camera access granted!', 'success');
            
            const cameraPreview = document.getElementById('cameraPreview');
            if (cameraPreview) {
                cameraPreview.innerHTML = `
                    <div class="camera-active" style="padding: 2rem; text-align: center;">
                        <div class="camera-feed" style="background: #1a1a1a; color: #4CAF50; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">📹 Camera Active - Motion Tracking Ready</div>
                        <div class="pose-detection" style="color: #4CAF50; font-weight: bold;">✅ Pose Detection Initialized</div>
                    </div>
                `;
            }
        }, 2000);
    }

    completeMotionSetup() {
        this.hideMotionTrackingModal();
        this.startExerciseSession();
    }

    startExerciseSession() {
        const modal = document.getElementById('exerciseSessionModal');
        if (modal && this.currentExercise) {
            // Update modal with exercise info
            const exerciseName = document.getElementById('currentExerciseName');
            const targetReps = document.getElementById('targetReps');
            const sessionPoints = document.getElementById('sessionPoints');
            const targetRepsDisplay = document.getElementById('targetRepsDisplay');
            
            if (exerciseName) exerciseName.textContent = this.currentExercise.name;
            if (targetReps) targetReps.textContent = this.currentExercise.targetReps || this.currentExercise.targetTime || '1';
            if (sessionPoints) sessionPoints.textContent = this.currentExercise.points;
            if (targetRepsDisplay) targetRepsDisplay.textContent = this.currentExercise.targetReps || this.currentExercise.targetTime || '1';
            
            modal.classList.remove('hidden');
            this.simulateExerciseSession();
        }
    }

    simulateExerciseSession() {
        let currentReps = 0;
        let sessionTime = 0;
        const targetReps = this.currentExercise.targetReps || this.currentExercise.targetTime || 10;
        
        // Start timer
        this.exerciseTimer = setInterval(() => {
            sessionTime++;
            const timerElement = document.getElementById('sessionTimer');
            if (timerElement) {
                const minutes = Math.floor(sessionTime / 60);
                const seconds = sessionTime % 60;
                timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 1000);

        // Simulate rep counting and feedback
        const repInterval = setInterval(() => {
            if (currentReps < targetReps) {
                currentReps++;
                this.updateExerciseMetrics(currentReps, targetReps);
                this.provideFeedback();
            } else {
                clearInterval(repInterval);
                this.enableCompleteButton();
            }
        }, 3000);
    }

    updateExerciseMetrics(currentReps, targetReps) {
        const elements = {
            currentReps: document.getElementById('currentReps'),
            formScore: document.getElementById('formScore'),
            rangeOfMotion: document.getElementById('rangeOfMotion')
        };

        if (elements.currentReps) elements.currentReps.textContent = currentReps;
        if (elements.formScore) elements.formScore.textContent = Math.floor(Math.random() * 15) + 85;
        if (elements.rangeOfMotion) elements.rangeOfMotion.textContent = Math.floor(Math.random() * 20) + 110;
    }

    provideFeedback() {
        const feedbackMessages = [
            "Great form! Keep it up!",
            "Perfect range of motion!",
            "Excellent control!",
            "Nice and steady!",
            "You're doing amazing!"
        ];
        
        const feedbackText = document.getElementById('feedbackText');
        const liveFeedback = document.querySelector('.feedback-messages');
        
        const message = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];
        
        if (feedbackText) {
            feedbackText.textContent = message;
        }
        
        if (liveFeedback) {
            const messageEl = document.createElement('div');
            messageEl.className = 'feedback-message positive';
            messageEl.textContent = message;
            liveFeedback.appendChild(messageEl);
            
            if (liveFeedback.children.length > 3) {
                liveFeedback.removeChild(liveFeedback.firstChild);
            }
        }
    }

    enableCompleteButton() {
        const completeBtn = document.getElementById('completeBtn');
        if (completeBtn) {
            completeBtn.disabled = false;
            completeBtn.textContent = '✅ Complete Session';
        }
    }

    pauseExercise() {
        if (this.exerciseTimer) {
            clearInterval(this.exerciseTimer);
            this.exerciseTimer = null;
            
            const pauseBtn = document.getElementById('pauseBtn');
            if (pauseBtn) {
                pauseBtn.textContent = '▶️ Resume';
                pauseBtn.onclick = () => this.resumeExercise();
            }
        }
    }

    resumeExercise() {
        this.simulateExerciseSession();
        const pauseBtn = document.getElementById('pauseBtn');
        if (pauseBtn) {
            pauseBtn.textContent = '⏸️ Pause';
            pauseBtn.onclick = () => this.pauseExercise();
        }
    }

    completeExercise() {
        if (this.exerciseTimer) {
            clearInterval(this.exerciseTimer);
        }
        
        this.currentUser.totalPoints += this.currentExercise.points;
        this.currentUser.completedSessions++;
        
        this.showToast(`Exercise completed! +${this.currentExercise.points} points earned! 🏆`, 'success');
        
        setTimeout(() => {
            this.hideExerciseSession();
            this.updateUserInfo();
            this.checkAchievements();
        }, 2000);
    }

    stopExercise() {
        if (this.exerciseTimer) {
            clearInterval(this.exerciseTimer);
        }
        this.hideExerciseSession();
    }

    hideExerciseSession() {
        const modal = document.getElementById('exerciseSessionModal');
        if (modal) {
            modal.classList.add('hidden');
        }
        this.currentExercise = null;
    }

    filterExercises() {
        const categoryFilter = document.getElementById('categoryFilter');
        const difficultyFilter = document.getElementById('difficultyFilter');
        
        let filteredExercises = this.appData.exercises;
        
        if (categoryFilter && categoryFilter.value) {
            filteredExercises = filteredExercises.filter(ex => ex.category === categoryFilter.value);
        }
        
        if (difficultyFilter && difficultyFilter.value) {
            filteredExercises = filteredExercises.filter(ex => ex.difficulty === difficultyFilter.value);
        }
        
        this.renderFilteredExercises(filteredExercises);
    }

    renderFilteredExercises(exercises) {
        const container = document.getElementById('exercisesGrid');
        if (!container) return;

        container.innerHTML = exercises.map(exercise => `
            <div class="exercise-card">
                <div class="exercise-header">
                    <span class="exercise-category">${exercise.category}</span>
                    <span class="exercise-points">${exercise.points} pts</span>
                </div>
                <h3 class="exercise-title">${exercise.name}</h3>
                <div class="exercise-meta">
                    <span>⏱️ ${Math.floor(exercise.duration / 60)} min</span>
                    <span>📊 ${exercise.difficulty}</span>
                    <span>🎯 ${exercise.targetReps || exercise.targetTime || 'Variable'}</span>
                </div>
                <p class="exercise-description">${exercise.description}</p>
                <div class="exercise-actions">
                    <button class="btn btn--primary start-exercise-btn" data-exercise-id="${exercise.id}">
                        Start Exercise
                    </button>
                    <button class="btn btn--outline" onclick="app.previewExercise('${exercise.id}')">
                        Preview
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Achievements System
    populateAchievements() {
        this.loadAchievementsView();
    }

    loadAchievementsView() {
        const container = document.getElementById('achievementsGrid');
        if (!container) return;

        container.innerHTML = this.appData.achievements.map(achievement => `
            <div class="achievement-card ${achievement.earned ? 'earned' : ''}">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-description">${achievement.description}</div>
                <div class="achievement-points">${achievement.points} pts</div>
                ${achievement.progress ? `
                    <div class="achievement-progress">
                        <div class="progress-fill" style="width: ${(achievement.progress / achievement.target) * 100}%"></div>
                    </div>
                    <small>${achievement.progress}/${achievement.target}</small>
                ` : ''}
            </div>
        `).join('');
    }

    checkAchievements() {
        const newAchievements = [];
        
        if (this.currentUser.completedSessions === 1) {
            newAchievements.push('First Steps');
        }
        
        if (this.currentUser.streakDays >= 7) {
            newAchievements.push('Week Warrior');
        }
        
        if (newAchievements.length > 0) {
            newAchievements.forEach(achievement => {
                this.showToast(`Achievement Unlocked: ${achievement}! 🏆`, 'success');
            });
        }
    }

    // Progress and Analytics
    loadProgressView() {
        // Progress data is rendered in HTML, charts are initialized separately
    }

    // Therapist Features
    loadPatientsView() {
        const container = document.getElementById('patientsList');
        if (!container) return;

        container.innerHTML = this.appData.patients.map(patient => `
            <div class="patient-card">
                <div class="patient-header">
                    <img src="https://i.pravatar.cc/150?u=${patient.name}" alt="${patient.name}" class="patient-avatar">
                    <div class="patient-info">
                        <h3>${patient.name}</h3>
                        <p>${patient.condition}</p>
                        <div class="patient-status">
                            <span class="status-badge ${patient.riskLevel}">${patient.riskLevel} Risk</span>
                            <span class="adherence-rate">${patient.adherenceRate}% Adherence</span>
                        </div>
                    </div>
                </div>
                <div class="patient-metrics">
                    <div class="metric">
                        <strong>${patient.currentStreak}</strong>
                        <small>Day Streak</small>
                    </div>
                    <div class="metric">
                        <strong>${patient.totalPoints}</strong>
                        <small>Points</small>
                    </div>
                    <div class="metric">
                        <strong>Level ${patient.level}</strong>
                        <small>Progress</small>
                    </div>
                </div>
                <div class="patient-actions">
                    <button class="btn btn--primary btn--sm" onclick="app.viewPatientDetails('${patient.id}')">
                        View Details
                    </button>
                    <button class="btn btn--outline btn--sm" onclick="app.messagePatient('${patient.id}')">
                        Message
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Support System
    loadSupportView() {
        const faqContainer = document.getElementById('faqList');
        if (!faqContainer) return;

        faqContainer.innerHTML = this.appData.faqs.map(faq => `
            <div class="faq-item">
                <div class="faq-question">${faq.question}</div>
                <div class="faq-answer">${faq.answer}</div>
            </div>
        `).join('');
    }

    // AI Assistant System
    toggleAIAssistant() {
        const aiPanel = document.getElementById('aiPanel');
        const aiBadge = document.getElementById('aiBadge');
        
        if (aiPanel) {
            this.aiAssistantOpen = !this.aiAssistantOpen;
            aiPanel.classList.toggle('show', this.aiAssistantOpen);
            
            if (this.aiAssistantOpen && aiBadge) {
                aiBadge.textContent = '';
            }
        }
    }

    sendAIMessage() {
        const aiInput = document.getElementById('aiInput');
        const aiMessages = document.getElementById('aiMessages');
        
        if (!aiInput || !aiMessages || !aiInput.value.trim()) return;
        
        const userMessage = aiInput.value.trim();
        aiInput.value = '';
        
        // Add user message
        const userMessageEl = document.createElement('div');
        userMessageEl.className = 'ai-message user';
        userMessageEl.innerHTML = `
            <div class="user-avatar" style="background: #218085; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">👤</div>
            <div class="message-content">
                <p>${userMessage}</p>
            </div>
        `;
        aiMessages.appendChild(userMessageEl);
        
        // Simulate AI response
        setTimeout(() => {
            const responses = this.appData.aiAssistant.responses;
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
            const aiMessageEl = document.createElement('div');
            aiMessageEl.className = 'ai-message';
            aiMessageEl.innerHTML = `
                <span class="ai-avatar">🤖</span>
                <div class="message-content">
                    <p>${randomResponse}</p>
                </div>
            `;
            aiMessages.appendChild(aiMessageEl);
            
            aiMessages.scrollTop = aiMessages.scrollHeight;
        }, 1000);
        
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }

    // Charts and Visualization
    initializeCharts() {
        // Wait for chart containers to be visible
        setTimeout(() => {
            this.initWeeklyProgressChart();
            this.initProgressTrendsChart();
            this.initAccuracyChart();
        }, 500);
    }

    initWeeklyProgressChart() {
        const ctx = document.getElementById('weeklyProgressChart');
        if (!ctx) return;

        const chartData = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Exercises Completed',
                data: [2, 3, 1, 4, 2, 3, 2],
                backgroundColor: '#218085',
                borderColor: '#218085',
                borderWidth: 2,
                borderRadius: 4,
                borderSkipped: false,
            }]
        };

        this.weeklyProgressChart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
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
                        max: 5,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    initProgressTrendsChart() {
        const ctx = document.getElementById('progressTrendsChart');
        if (!ctx) return;

        const data = this.appData.progressMetrics.monthlyProgress;
        
        this.progressTrendsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [
                    {
                        label: 'Range of Motion',
                        data: data.rangeOfMotion,
                        borderColor: '#218085',
                        backgroundColor: 'rgba(33, 128, 133, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Strength',
                        data: data.strength,
                        borderColor: '#4CAF50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Balance',
                        data: data.balance,
                        borderColor: '#FF9800',
                        backgroundColor: 'rgba(255, 152, 0, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Endurance',
                        data: data.endurance,
                        borderColor: '#2196F3',
                        backgroundColor: 'rgba(33, 150, 243, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    initAccuracyChart() {
        const ctx = document.getElementById('accuracyChart');
        if (!ctx) return;

        this.accuracyChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Knee Flexion', 'Wall Push-ups', 'Balance'],
                datasets: [{
                    data: [92, 86, 89],
                    backgroundColor: ['#218085', '#4CAF50', '#FF9800'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Utility Functions
    showToast(message, type = 'info', duration = 4000) {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>${message}</span>
                <button onclick="this.closest('.toast').remove()" 
                        style="background: none; border: none; font-size: 1.2rem; cursor: pointer; color: var(--color-text-secondary); margin-left: 1rem;">&times;</button>
            </div>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }, duration);
    }

    showWelcomeMessage() {
        const welcomeMessages = [
            'Welcome back! Ready to continue your recovery journey?',
            'Great to see you again! Your progress has been amazing.',
            'Hello! Let\'s make today another successful day in your rehabilitation.',
        ];
        const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        setTimeout(() => {
            this.showToast(randomMessage, 'success', 5000);
        }, 1000);
    }

    // Therapist-specific functions
    viewPatientDetails(patientId) {
        this.showToast(`Viewing details for patient ${patientId}`, 'info');
    }

    messagePatient(patientId) {
        this.showToast(`Opening message for patient ${patientId}`, 'info');
    }

    scheduleAppointment() {
        this.showToast('Opening appointment scheduler...', 'info');
    }

    sendMessage() {
        this.showToast('Opening secure messaging...', 'info');
    }

    startVideoCall() {
        this.showToast('Starting secure video call...', 'info');
    }

    previewExercise(exerciseId) {
        const exercise = this.appData.exercises.find(ex => ex.id === exerciseId);
        if (exercise) {
            this.showToast(`Previewing ${exercise.name}`, 'info');
        }
    }

    // Settings and Profile
    logout() {
        const confirmation = confirm('Are you sure you want to sign out?');
        if (confirmation) {
            this.currentUser = null;
            this.isAuthenticated = false;
            location.reload();
        }
    }
}

// Initialize the app
const app = new RehabConnectApp();

// Global event handlers
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (app.hideModals) app.hideModals();
        if (app.closeSidebar) app.closeSidebar();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && app.closeSidebar) {
        app.closeSidebar();
    }
});

// Export app for global access
window.rehabConnectApp = app;
window.app = app;