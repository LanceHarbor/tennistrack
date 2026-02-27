
"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Plus, MessageSquare, Image, Users, Trophy, Target, Bell, Menu, X, Send, ChevronRight, Star, Settings, BookOpen, Search, User, DollarSign, Dumbbell, Clock, Sun, Moon, Download, Check, CheckCheck, Eye, Crosshair, ClipboardList, Zap } from 'lucide-react';

const TennisApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpStep, setSignUpStep] = useState(1);
  const [activeView, setActiveView] = useState('dashboard');
  const [userRole, setUserRole] = useState('player'); // player, coach, parent
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  
  // Theme
  const [darkMode, setDarkMode] = useState(true);
  const theme = {
    bg: darkMode ? 'bg-black' : 'bg-gray-100',
    card: darkMode ? 'bg-gray-900' : 'bg-white',
    cardBorder: darkMode ? 'border-gray-800' : 'border-gray-200',
    text: darkMode ? 'text-white' : 'text-gray-900',
    textMuted: darkMode ? 'text-gray-400' : 'text-gray-500',
    textDim: darkMode ? 'text-gray-500' : 'text-gray-400',
    input: darkMode ? 'bg-black border-gray-700' : 'bg-gray-50 border-gray-300',
    navBg: darkMode ? 'bg-black' : 'bg-white',
    navBorder: darkMode ? 'border-gray-800' : 'border-gray-200',
  };

  // Onboarding
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [loginForm, setLoginForm] = useState({ email: '', password: '', role: 'player' });
  const [playerInfo, setPlayerInfo] = useState({
    name: '',
    age: '',
    dob: '',
    state: '',
    city: '',
    ustaNumber: '',
    currentUTR: '',
    goalUTR: '',
    goalDate: ''
  });

  // In-memory save (localStorage not available in artifact environment)
  const saveUserData = (user, role, info) => {
    // Data persists in React state for this session
  };
  const [achievements, setAchievements] = useState([
    // Beginner Achievements
    { id: 1, title: 'First Match', description: 'Play your first match', icon: '🎾', category: 'Beginner', unlocked: true, rarity: 'common', unlockedDate: '2025-12-15', howToUnlock: 'Complete your first match' },
    { id: 2, title: 'First Win', description: 'Win your first match', icon: '🏅', category: 'Beginner', unlocked: true, rarity: 'common', unlockedDate: '2025-12-20', howToUnlock: 'Win any match' },
    { id: 3, title: 'Practice Starter', description: 'Complete 5 practices', icon: '💪', category: 'Beginner', unlocked: true, progress: 5, goal: 5, rarity: 'common', unlockedDate: '2026-01-02', howToUnlock: 'Log 5 practice sessions' },
    { id: 4, title: 'Team Player', description: 'Join team chat', icon: '👥', category: 'Beginner', unlocked: true, rarity: 'common', unlockedDate: '2025-12-18', howToUnlock: 'Send your first message in team chat' },
    
    // Win Streaks
    { id: 5, title: 'Hot Streak', description: 'Win 3 matches in a row', icon: '🔥', category: 'Streaks', unlocked: false, progress: 2, goal: 3, rarity: 'uncommon', howToUnlock: 'Win 3 consecutive matches without losing' },
    { id: 6, title: 'Blazing', description: 'Win 5 matches in a row', icon: '🌟', category: 'Streaks', unlocked: false, progress: 0, goal: 5, rarity: 'rare', howToUnlock: 'Win 5 consecutive matches' },
    { id: 7, title: 'Unstoppable', description: 'Win 10 matches in a row', icon: '⚡', category: 'Streaks', unlocked: false, progress: 0, goal: 10, rarity: 'epic', howToUnlock: 'Win 10 consecutive matches - this is legendary!' },
    
    // Practice Achievements
    { id: 8, title: 'Practice Pro', description: 'Complete 20 practices', icon: '⭐', category: 'Practice', unlocked: false, progress: 15, goal: 20, rarity: 'uncommon', howToUnlock: 'Log 20 total practice sessions' },
    { id: 9, title: 'Dedicated', description: 'Complete 50 practices', icon: '💎', category: 'Practice', unlocked: false, progress: 15, goal: 50, rarity: 'rare', howToUnlock: 'Log 50 total practice sessions' },
    { id: 10, title: 'Elite Grinder', description: 'Complete 100 practices', icon: '👑', category: 'Practice', unlocked: false, progress: 15, goal: 100, rarity: 'legendary', howToUnlock: 'Log 100 total practice sessions - ultimate dedication!' },
    { id: 11, title: 'Week Warrior', description: 'Practice 7 days straight', icon: '📅', category: 'Practice', unlocked: true, rarity: 'uncommon', unlockedDate: '2026-01-10', howToUnlock: 'Practice every day for 7 days in a row' },
    { id: 12, title: 'Month Master', description: 'Practice 30 days straight', icon: '🗓️', category: 'Practice', unlocked: false, progress: 7, goal: 30, rarity: 'epic', howToUnlock: 'Practice every single day for 30 days straight' },
    
    // Match Achievements
    { id: 13, title: 'Closer', description: 'Win 10 matches', icon: '🎯', category: 'Matches', unlocked: true, rarity: 'uncommon', unlockedDate: '2026-01-05', howToUnlock: 'Win 10 total matches' },
    { id: 14, title: 'Champion', description: 'Win 25 matches', icon: '🏆', category: 'Matches', unlocked: false, progress: 11, goal: 25, rarity: 'rare', howToUnlock: 'Win 25 total matches' },
    { id: 15, title: 'Legend', description: 'Win 50 matches', icon: '👑', category: 'Matches', unlocked: false, progress: 11, goal: 50, rarity: 'legendary', howToUnlock: 'Win 50 total matches - achieve legend status!' },
    { id: 16, title: 'Comeback King', description: 'Win after losing first set', icon: '🔄', category: 'Matches', unlocked: true, rarity: 'rare', unlockedDate: '2025-12-28', howToUnlock: 'Win a match after losing the first set' },
    { id: 17, title: 'Perfect Match', description: 'Win without losing a game', icon: '💯', category: 'Matches', unlocked: false, rarity: 'epic', howToUnlock: 'Win a match 6-0, 6-0 (or any perfect score)' },
    
    // UTR Milestones
    { id: 18, title: 'UTR 2.0', description: 'Reach 2.0 UTR', icon: '2️⃣', category: 'UTR', unlocked: false, progress: 0, goal: 1, rarity: 'uncommon', howToUnlock: 'Achieve a 2.0 UTR rating' },
    { id: 19, title: 'UTR 3.0', description: 'Reach 3.0 UTR', icon: '3️⃣', category: 'UTR', unlocked: false, progress: 0, goal: 1, rarity: 'rare', howToUnlock: 'Achieve a 3.0 UTR rating' },
    { id: 20, title: 'UTR 4.0', description: 'Reach 4.0 UTR', icon: '4️⃣', category: 'UTR', unlocked: false, progress: 0, goal: 1, rarity: 'epic', howToUnlock: 'Achieve a 4.0 UTR rating' },
    { id: 21, title: 'UTR 5.0', description: 'Reach 5.0 UTR', icon: '5️⃣', category: 'UTR', unlocked: false, progress: 0, goal: 1, rarity: 'legendary', howToUnlock: 'Achieve a 5.0 UTR rating - elite level!' },
    { id: 22, title: 'Rising Star', description: 'Improve UTR by 0.5', icon: '📈', category: 'UTR', unlocked: true, rarity: 'uncommon', unlockedDate: '2026-01-08', howToUnlock: 'Improve your UTR by 0.5 points' },
    { id: 23, title: 'Big Jump', description: 'Improve UTR by 1.0', icon: '🚀', category: 'UTR', unlocked: false, progress: 0.27, goal: 1.0, rarity: 'rare', howToUnlock: 'Improve your UTR by a full 1.0 points' },
    
    // Social Achievements
    { id: 24, title: 'Motivator', description: 'Send 10 messages in team chat', icon: '💬', category: 'Social', unlocked: false, progress: 3, goal: 10, rarity: 'common', howToUnlock: 'Send 10 messages in team chat' },
    { id: 25, title: 'Team Captain', description: 'Send 50 messages in team chat', icon: '📢', category: 'Social', unlocked: false, progress: 3, goal: 50, rarity: 'rare', howToUnlock: 'Send 50 messages in team chat - be a team leader!' },
    { id: 26, title: 'Photographer', description: 'Upload 10 photos', icon: '📸', category: 'Social', unlocked: false, progress: 0, goal: 10, rarity: 'uncommon', howToUnlock: 'Upload 10 photos to shared media' },
    
    // Special Achievements
    { id: 27, title: 'Early Bird', description: 'Practice before 7am', icon: '🌅', category: 'Special', unlocked: false, rarity: 'rare', howToUnlock: 'Complete a practice session before 7:00 AM' },
    { id: 28, title: 'Night Owl', description: 'Practice after 8pm', icon: '🌙', category: 'Special', unlocked: true, rarity: 'rare', unlockedDate: '2026-01-12', howToUnlock: 'Complete a practice session after 8:00 PM' },
    { id: 29, title: 'All-Weather', description: 'Practice in rain', icon: '🌧️', category: 'Special', unlocked: false, rarity: 'epic', howToUnlock: 'Complete a practice during rainy weather - true dedication!' },
    { id: 30, title: 'Century', description: 'Record 100 total activities', icon: '💯', category: 'Special', unlocked: false, progress: 45, goal: 100, rarity: 'epic', howToUnlock: 'Log 100 total activities (practices + matches)' },
  ]);

  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const [userSettings, setUserSettings] = useState({
    username: '',
    profileEmoji: '👤',
    academyCode: '',
    displayBadges: [] // Array of achievement IDs to display as badges (max 3)
  });

  // Academy state
  const [academy, setAcademy] = useState({
    name: '',
    code: '',
    emoji: '🎾',
    location: '',
    coaches: [],
    connected: false
  });

  const [students, setStudents] = useState([]); // For coaches to see their students
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Whiteboard state
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  
  // Coach notes data
  const [coachQuestions, setCoachQuestions] = useState([
    { id: 1, question: 'How did your backhand feel in today\'s match?', studentId: 1, date: '2026-01-10', response: null }
  ]);

  // Weekly Goals
  const [weeklyGoals, setWeeklyGoals] = useState([
    { id: 1, text: 'Hit 100 serves', completed: true, focusArea: 'Serve' },
    { id: 2, text: 'Practice backhand crosscourt 30 min', completed: false, focusArea: 'Backhand' },
    { id: 3, text: '3 match play sessions', completed: false, focusArea: 'Strategy', progress: 1, goal: 3 },
  ]);

  // Season Goals
  const [seasonGoals, setSeasonGoals] = useState([
    { id: 1, title: 'Reach UTR 4.0', type: 'utr', target: 4.0, current: 3.52, icon: '🎯', deadline: '2026-06-30' },
    { id: 2, title: 'Win 20 matches', type: 'matches', target: 20, current: 11, icon: '🏆', deadline: '2026-06-30' },
    { id: 3, title: 'Practice 200 hours', type: 'hours', target: 200, current: 42, icon: '⏱', deadline: '2026-06-30' },
    { id: 4, title: 'Win a tournament', type: 'custom', target: 1, current: 0, icon: '🥇', deadline: '2026-08-31' },
    { id: 5, title: 'Master kick serve', type: 'custom', target: 1, current: 0, icon: '🌪', deadline: '2026-05-01' },
  ]);

  // Opponent Scouting
  const [opponents, setOpponents] = useState([
    { id: 1, name: 'Emma Wilson', strengths: ['Powerful forehand', 'Great fitness'], weaknesses: ['Weak second serve', 'Struggles at net'], notes: 'Likes to dictate from baseline. Move her to net.', rating: 4.1 },
    { id: 2, name: 'Sophie Lee', strengths: ['Consistent baseline game', 'Good returns'], weaknesses: ['Backhand under pressure', 'Slower footwork'], notes: 'Attack her backhand side with slice.', rating: 4.3 },
    { id: 3, name: 'Maya Patel', strengths: ['Quick around court', 'Mental toughness'], weaknesses: ['Low power', 'Short balls on serve'], notes: 'Be patient, wait for short ball to attack.', rating: 3.8 },
  ]);

  // Parent Expense Tracker
  const [expenses, setExpenses] = useState([
    { id: 1, date: '2026-01-05', category: 'Lessons', description: 'Weekly coaching (4 sessions)', amount: 200 },
    { id: 2, date: '2026-01-10', category: 'Tournament', description: 'Winter Open entry fee', amount: 75 },
    { id: 3, date: '2026-01-15', category: 'Equipment', description: 'New racket strings', amount: 45 },
    { id: 4, date: '2026-02-01', category: 'Lessons', description: 'Weekly coaching (4 sessions)', amount: 200 },
    { id: 5, date: '2026-02-05', category: 'Travel', description: 'Gas + parking for tournament', amount: 35 },
    { id: 6, date: '2026-02-10', category: 'Equipment', description: 'Tennis shoes', amount: 120 },
  ]);

  // Coach Drills/Homework
  const [drills, setDrills] = useState([
    { id: 1, title: '100 Serves Challenge', description: 'Hit 100 serves - 50 flat, 25 slice, 25 kick. Track accuracy.', assignedTo: [1], dueDate: '2026-02-20', status: 'active', focusArea: 'Serve' },
    { id: 2, title: 'Rally Consistency Drill', description: 'Rally crosscourt 50 balls in a row without error. Both forehand and backhand sides.', assignedTo: [1, 2], dueDate: '2026-02-22', status: 'active', focusArea: 'Consistency' },
  ]);

  // Lesson Scheduler
  const [coachSlots, setCoachSlots] = useState([
    { id: 1, day: 'Monday', from: '15:00', to: '18:00' },
    { id: 2, day: 'Wednesday', from: '15:00', to: '18:00' },
    { id: 3, day: 'Friday', from: '14:00', to: '17:00' },
    { id: 4, day: 'Saturday', from: '09:00', to: '12:00' },
  ]);
  const [bookedLessons, setBookedLessons] = useState([
    { id: 1, student: 'Emma Johnson', coach: 'Coach Mike', date: '2026-02-19', time: '15:00', duration: 60, status: 'confirmed' },
    { id: 2, student: 'Alex Rivera', coach: 'Coach Sarah', date: '2026-02-21', time: '16:00', duration: 60, status: 'pending' },
  ]);

  // Warmup/Cooldown Routines
  const [warmupRoutines, setWarmupRoutines] = useState([
    { id: 1, name: 'Match Day Warmup', type: 'warmup', duration: 15, exercises: [
      { name: 'Arm circles', duration: '30 sec', reps: null },
      { name: 'Leg swings', duration: '30 sec each', reps: null },
      { name: 'High knees', duration: '1 min', reps: null },
      { name: 'Shadow swings', duration: '2 min', reps: null },
      { name: 'Mini rallies (easy pace)', duration: '5 min', reps: null },
      { name: 'Serve practice (50%)', duration: '3 min', reps: 10 },
      { name: 'Split step drills', duration: '2 min', reps: null },
    ]},
    { id: 2, name: 'Practice Warmup', type: 'warmup', duration: 10, exercises: [
      { name: 'Jog sideline to sideline', duration: '2 min', reps: null },
      { name: 'Dynamic stretches', duration: '3 min', reps: null },
      { name: 'Mini rallies', duration: '5 min', reps: null },
    ]},
    { id: 3, name: 'Post-Match Cooldown', type: 'cooldown', duration: 10, exercises: [
      { name: 'Slow jog', duration: '2 min', reps: null },
      { name: 'Quad stretch', duration: '30 sec each', reps: null },
      { name: 'Hamstring stretch', duration: '30 sec each', reps: null },
      { name: 'Shoulder stretch', duration: '30 sec each', reps: null },
      { name: 'Calf stretch', duration: '30 sec each', reps: null },
      { name: 'Deep breathing', duration: '2 min', reps: null },
    ]},
  ]);
  const [sessionNotes, setSessionNotes] = useState([
    { 
      id: 1, 
      studentId: 1, 
      date: 'Jan 15, 2026', 
      coach: 'Coach Mike',
      title: 'Practice Session - Serve Mechanics',
      content: 'Worked on toss consistency. Emma\'s making good progress - toss is now 6 inches forward. Need to focus on pronation next session.'
    },
    { 
      id: 2, 
      studentId: 1, 
      date: 'Jan 18, 2026', 
      coach: 'Coach Sarah',
      title: 'Footwork & Movement',
      content: 'Focused on split step timing and recovery steps. Emma needs to stay lower in ready position. Good improvement on lateral movement.'
    }
  ]);

  // Profile Banners - special unlockable profile backgrounds
  const [banners, setBanners] = useState([
    { id: 1, name: 'Fire Streak', gradient: 'from-orange-600 via-red-600 to-yellow-500', requirement: '7-day practice streak', unlocked: true, equipped: true, icon: '🔥', rarity: 'rare' },
    { id: 2, name: 'Ice Cold', gradient: 'from-cyan-400 via-blue-600 to-indigo-800', requirement: 'Win 5 matches in a row', unlocked: true, equipped: false, icon: '❄️', rarity: 'epic' },
    { id: 3, name: 'Golden Hour', gradient: 'from-yellow-400 via-amber-500 to-orange-600', requirement: 'Log 100 practice hours', unlocked: false, progress: 32.3, goal: 100, icon: '✨', rarity: 'legendary' },
    { id: 4, name: 'Night Mode', gradient: 'from-gray-900 via-purple-900 to-gray-900', requirement: 'Practice after 8pm 10 times', unlocked: false, progress: 3, goal: 10, icon: '🌙', rarity: 'rare' },
    { id: 5, name: 'Tournament King', gradient: 'from-purple-600 via-pink-500 to-red-500', requirement: 'Win a tournament', unlocked: false, progress: 0, goal: 1, icon: '👑', rarity: 'legendary' },
    { id: 6, name: 'Ace Machine', gradient: 'from-green-400 via-emerald-500 to-teal-600', requirement: 'Log 500 serves in practice', unlocked: true, equipped: false, icon: '🎯', rarity: 'epic' },
    { id: 7, name: 'Early Bird', gradient: 'from-pink-400 via-rose-400 to-orange-300', requirement: 'Practice before 7am 5 times', unlocked: false, progress: 1, goal: 5, icon: '🌅', rarity: 'rare' },
    { id: 8, name: 'Team Spirit', gradient: 'from-blue-400 via-indigo-500 to-purple-600', requirement: 'Send 50 team chat messages', unlocked: false, progress: 12, goal: 50, icon: '💬', rarity: 'epic' },
  ]);

  // Coach Internal Chat
  const [coachChat, setCoachChat] = useState([
    { id: 1, user: 'Coach Mike', message: 'Emma is really improving her serve toss consistency', time: '9:30 AM', emoji: '👨‍🏫' },
    { id: 2, user: 'Coach Sarah', message: 'Agreed! I noticed that in footwork drills too. Her split step is much better', time: '9:45 AM', emoji: '👩‍🏫' },
    { id: 3, user: 'Coach Mike', message: 'Alex needs extra attention on backhand this week. Can you take his Thursday session?', time: '10:15 AM', emoji: '👨‍🏫' },
    { id: 4, user: 'Coach Sarah', message: 'Sure, I\'ll focus on his two-handed technique', time: '10:20 AM', emoji: '👩‍🏫' },
  ]);
  const [coachChatInput, setCoachChatInput] = useState('');

  // Add new match modal state
  const [showAddMatch, setShowAddMatch] = useState(false);
  const [newMatch, setNewMatch] = useState({
    date: '',
    opponent: '',
    result: 'Win',
    sets: [
      { set: 1, myScore: '', opponentScore: '', notes: '' },
      { set: 2, myScore: '', opponentScore: '', notes: '' }
    ],
    overallNotes: ''
  });

  // Add new practice modal state
  const [showAddPractice, setShowAddPractice] = useState(false);
  const [newPractice, setNewPractice] = useState({
    date: '',
    fromTime: '',
    toTime: '',
    focusAreas: [],
    notes: ''
  });

  const focusAreaOptions = ['Serve', 'Forehand', 'Backhand', 'Volley', 'Footwork', 'Strategy', 'Mental Game', 'Fitness'];

  // Time dropdown options (shared)
  const practiceTimeOptions = [];
  for (let h = 6; h <= 21; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hour24 = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      const period = h >= 12 ? 'PM' : 'AM';
      const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
      const label = `${hour12}:${String(m).padStart(2, '0')} ${period}`;
      practiceTimeOptions.push({ value: hour24, label });
    }
  }

  const handleAddPractice = () => {
    if (!newPractice.date || !newPractice.fromTime) {
      alert('Please fill in date and start time');
      return;
    }

    let duration = 0;
    if (newPractice.fromTime && newPractice.toTime) {
      const [fh, fm] = newPractice.fromTime.split(':').map(Number);
      const [th, tm] = newPractice.toTime.split(':').map(Number);
      duration = (th * 60 + tm) - (fh * 60 + fm);
      if (duration < 0) duration = 0;
    }

    const timeDisplay = newPractice.toTime 
      ? `${newPractice.fromTime} - ${newPractice.toTime}`
      : newPractice.fromTime;

    const practiceToAdd = {
      id: Date.now(),
      date: newPractice.date,
      time: timeDisplay,
      duration: duration > 0 ? duration : undefined,
      type: 'Practice',
      focusAreas: newPractice.focusAreas,
      notes: newPractice.notes
    };

    setPractices(prev => [...prev, practiceToAdd].sort((a, b) => new Date(a.date) - new Date(b.date)));

    setNewPractice({ date: '', fromTime: '', toTime: '', focusAreas: [], notes: '' });
    setShowAddPractice(false);
    alert('Practice logged!');
  };

  // Set up academy when user logs in as coach
  useEffect(() => {
    if (userRole === 'coach' && !academy.connected) {
      const code = 'ACAD-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      setAcademy({
        name: 'Farm & Forge Tennis',
        code: code,
        emoji: '🎾',
        location: 'College Grove, TN',
        coaches: [
          { id: 1, name: userSettings.username || 'Coach Mike', emoji: '👨‍🏫', role: 'Head Coach' },
          { id: 2, name: 'Coach Sarah', emoji: '👩‍🏫', role: 'Assistant Coach' },
        ],
        connected: true
      });
      setUserSettings(prev => ({...prev, academyCode: code}));
      
      // Load mock students for demo (in real app, this comes from database)
      setStudents([
        { 
          id: 1, 
          name: 'Emma Johnson', 
          email: 'emma@example.com',
          emoji: '😀',
          currentUTR: 3.8,
          goalUTR: 5.0,
          matches: 15,
          wins: 10,
          practices: 28,
          lastActive: '2 hours ago',
          lastCoach: 'Coach Mike'
        },
        { 
          id: 2, 
          name: 'Alex Rivera', 
          email: 'alex@example.com',
          emoji: '🎾',
          currentUTR: 4.2,
          goalUTR: 5.5,
          matches: 22,
          wins: 15,
          practices: 35,
          lastActive: '1 day ago',
          lastCoach: 'Coach Sarah'
        }
      ]);
    }
  }, [userRole]);

  // Set up academy for players/parents
  useEffect(() => {
    if ((userRole === 'player' || userRole === 'parent') && playerInfo.academyCode && !academy.connected) {
      setAcademy({
        name: 'Farm & Forge Tennis',
        code: playerInfo.academyCode,
        emoji: '🎾',
        location: 'College Grove, TN',
        coaches: [
          { id: 1, name: 'Coach Mike', emoji: '👨‍🏫', role: 'Head Coach' },
          { id: 2, name: 'Coach Sarah', emoji: '👩‍🏫', role: 'Assistant Coach' },
        ],
        connected: true
      });
    }
  }, [userRole, playerInfo.academyCode]);

  const [utrHistory, setUtrHistory] = useState([
    { date: '2025-03-15', utr: 2.50, change: 0, source: 'Initial' },
    { date: '2025-05-01', utr: 2.75, change: 0.25, source: 'Tournament' },
    { date: '2025-06-20', utr: 2.90, change: 0.15, source: 'UTR Update' },
    { date: '2025-08-10', utr: 3.05, change: 0.15, source: 'Tournament' },
    { date: '2025-09-22', utr: 3.10, change: 0.05, source: 'UTR Update' },
    { date: '2025-10-15', utr: 3.25, change: 0.15, source: 'Tournament' },
    { date: '2025-11-20', utr: 3.30, change: 0.05, source: 'UTR Update' },
    { date: '2025-12-10', utr: 3.40, change: 0.10, source: 'Tournament' },
    { date: '2026-01-08', utr: 3.45, change: 0.05, source: 'UTR Update' },
    { date: '2026-01-15', utr: 3.52, change: 0.07, source: 'Tournament' },
  ]);
  const [showAddUTR, setShowAddUTR] = useState(false);
  const [newUTREntry, setNewUTREntry] = useState({ date: '', utr: '', source: 'UTR Update' });

  
  // Rich practice data with durations
  const [practices, setPractices] = useState([
    { id: 1, date: '2025-10-05', time: '15:00', duration: 90, type: 'Practice', focusAreas: ['Serve', 'Forehand'], notes: 'Serve toss drills' },
    { id: 2, date: '2025-10-12', time: '16:00', duration: 60, type: 'Practice', focusAreas: ['Backhand'], notes: 'Backhand crosscourt' },
    { id: 3, date: '2025-10-18', time: '14:00', duration: 120, type: 'Practice', focusAreas: ['Fitness'], notes: 'Conditioning day' },
    { id: 4, date: '2025-10-25', time: '15:00', duration: 90, type: 'Practice', focusAreas: ['Volley'], notes: 'Net approach patterns' },
    { id: 5, date: '2025-11-02', time: '15:00', duration: 75, type: 'Practice', focusAreas: ['Serve'], notes: 'Kick serve practice' },
    { id: 6, date: '2025-11-08', time: '16:00', duration: 60, type: 'Practice', focusAreas: ['Forehand', 'Backhand'], notes: 'Rally consistency' },
    { id: 7, date: '2025-11-14', time: '14:00', duration: 90, type: 'Practice', focusAreas: ['Mental Game'], notes: 'Point construction' },
    { id: 8, date: '2025-11-20', time: '15:00', duration: 105, type: 'Practice', focusAreas: ['Serve'], notes: 'Match simulation' },
    { id: 9, date: '2025-11-27', time: '15:00', duration: 60, type: 'Practice', focusAreas: ['Fitness'], notes: 'Agility drills' },
    { id: 10, date: '2025-12-03', time: '16:00', duration: 90, type: 'Practice', focusAreas: ['Forehand', 'Volley'], notes: 'Approach combos' },
    { id: 11, date: '2025-12-10', time: '14:00', duration: 120, type: 'Practice', focusAreas: ['Serve', 'Backhand'], notes: 'Full session with coach' },
    { id: 12, date: '2025-12-17', time: '15:00', duration: 75, type: 'Practice', focusAreas: ['Footwork'], notes: 'Split step timing' },
    { id: 13, date: '2025-12-22', time: '15:00', duration: 60, type: 'Practice', focusAreas: ['Mental Game'], notes: 'Visualization' },
    { id: 14, date: '2026-01-03', time: '15:00', duration: 90, type: 'Practice', focusAreas: ['Serve', 'Forehand'], notes: 'New year training' },
    { id: 15, date: '2026-01-07', time: '16:00', duration: 120, type: 'Practice', focusAreas: ['Backhand', 'Volley'], notes: 'Net game intensive' },
    { id: 16, date: '2026-01-10', time: '14:00', duration: 90, type: 'Practice', focusAreas: ['Fitness'], notes: 'Speed and endurance' },
    { id: 17, date: '2026-01-14', time: '15:00', duration: 75, type: 'Practice', focusAreas: ['Serve'], notes: 'Second serve accuracy' },
    { id: 18, date: '2026-01-18', time: '15:00', duration: 90, type: 'Practice', focusAreas: ['Strategy'], notes: 'Match prep' },
    { id: 19, date: '2026-02-01', time: '15:00', duration: 60, type: 'Practice', focusAreas: ['Forehand'], notes: 'Inside-out forehand' },
    { id: 20, date: '2026-02-05', time: '16:00', duration: 105, type: 'Practice', focusAreas: ['Serve', 'Backhand'], notes: 'Full session' },
    { id: 21, date: '2026-02-10', time: '14:00', duration: 90, type: 'Practice', focusAreas: ['Volley'], notes: 'Transition game' },
    { id: 22, date: '2026-02-14', time: '15:00', duration: 120, type: 'Practice', focusAreas: ['Fitness'], notes: 'Tournament sim' },
  ]);
  
  // Rich match history
  const [matches, setMatches] = useState([
    { id: 1, date: '2025-10-10', opponent: 'Lily Park', result: 'Win', score: '6-3, 6-2', sets: [{ set: 1, score: '6-3', notes: 'Controlled baseline' }, { set: 2, score: '6-2', notes: 'Broke serve early' }], overallNotes: 'Solid win. Forehand on fire.' },
    { id: 2, date: '2025-10-20', opponent: 'Maya Patel', result: 'Loss', score: '4-6, 3-6', sets: [{ set: 1, score: '4-6', notes: 'Too many UEs' }, { set: 2, score: '3-6', notes: 'Lost focus' }], overallNotes: 'Need to reduce unforced errors.' },
    { id: 3, date: '2025-11-01', opponent: 'Chloe Kim', result: 'Win', score: '6-4, 7-5', sets: [{ set: 1, score: '6-4', notes: 'Good first serve' }, { set: 2, score: '7-5', notes: 'Clutch at 5-5' }], overallNotes: 'Mentally tough match.' },
    { id: 4, date: '2025-11-09', opponent: 'Sarah Chen', result: 'Win', score: '6-1, 6-4', sets: [{ set: 1, score: '6-1', notes: 'Dominated with serve' }, { set: 2, score: '6-4', notes: 'She adjusted but held on' }], overallNotes: 'Best serve day.' },
    { id: 5, date: '2025-11-16', opponent: 'Emma Wilson', result: 'Loss', score: '3-6, 6-4, 4-6', sets: [{ set: 1, score: '3-6', notes: 'Slow start' }, { set: 2, score: '6-4', notes: 'Found rhythm' }, { set: 3, score: '4-6', notes: 'Ran out of gas' }], overallNotes: 'Need better fitness for 3-setters.' },
    { id: 6, date: '2025-11-23', opponent: 'Ava Martinez', result: 'Win', score: '6-2, 6-3', sets: [{ set: 1, score: '6-2', notes: 'Quick start' }, { set: 2, score: '6-3', notes: 'Clean match' }], overallNotes: 'Everything clicked.' },
    { id: 7, date: '2025-12-05', opponent: 'Lily Park', result: 'Win', score: '6-4, 6-4', sets: [{ set: 1, score: '6-4', notes: 'Tight but controlled' }, { set: 2, score: '6-4', notes: 'Same pattern' }], overallNotes: 'Consistent against familiar opponent.' },
    { id: 8, date: '2025-12-12', opponent: 'Sophie Lee', result: 'Loss', score: '2-6, 4-6', sets: [{ set: 1, score: '2-6', notes: 'Overpowered' }, { set: 2, score: '4-6', notes: 'Better but not enough' }], overallNotes: 'She was just better today.' },
    { id: 9, date: '2025-12-19', opponent: 'Chloe Kim', result: 'Win', score: '7-6, 6-3', sets: [{ set: 1, score: '7-6', notes: 'Won tiebreak 7-4' }, { set: 2, score: '6-3', notes: 'Rode momentum' }], overallNotes: 'Tiebreak was the turning point.' },
    { id: 10, date: '2025-12-28', opponent: 'Sarah Chen', result: 'Win', score: '6-4, 6-3', sets: [{ set: 1, score: '6-4', notes: 'Strong serve' }, { set: 2, score: '6-3', notes: 'Improved consistency' }], overallNotes: 'Good mental focus throughout.' },
    { id: 11, date: '2026-01-05', opponent: 'Maya Patel', result: 'Win', score: '6-3, 6-4', sets: [{ set: 1, score: '6-3', notes: 'Revenge match' }, { set: 2, score: '6-4', notes: 'Stayed aggressive' }], overallNotes: 'Avenged October loss.' },
    { id: 12, date: '2026-01-11', opponent: 'Emma Wilson', result: 'Loss', score: '6-7, 4-6', sets: [{ set: 1, score: '6-7', notes: 'Lost tiebreak 5-7' }, { set: 2, score: '4-6', notes: 'Deflated' }], overallNotes: 'So close. Need to close tight sets.' },
    { id: 13, date: '2026-01-19', opponent: 'Ava Martinez', result: 'Win', score: '6-1, 6-2', sets: [{ set: 1, score: '6-1', notes: 'Dominant' }, { set: 2, score: '6-2', notes: 'No letup' }], overallNotes: 'Peak performance day.' },
    { id: 14, date: '2026-02-02', opponent: 'Sophie Lee', result: 'Win', score: '7-5, 6-4', sets: [{ set: 1, score: '7-5', notes: 'Broke back at 5-5' }, { set: 2, score: '6-4', notes: 'Served it out' }], overallNotes: 'Huge improvement since December.' },
    { id: 15, date: '2026-02-09', opponent: 'Lily Park', result: 'Win', score: '6-3, 6-1', sets: [{ set: 1, score: '6-3', notes: 'Clinical' }, { set: 2, score: '6-1', notes: 'Wrapped up fast' }], overallNotes: 'Three straight wins vs Lily.' },
  ]);

  const [coachFeedback, setCoachFeedback] = useState([
    {
      id: 1,
      date: '2025-12-29',
      practice: 'Dec 28 Practice',
      feedback: 'Excellent progress on volleys today! Keep working on your split step timing.',
      areas: ['Volleys', 'Net game', 'Footwork']
    }
  ]);

  const [teamChat, setTeamChat] = useState([
    { id: 1, user: 'Emma', message: 'Good luck at your match today! 🎾', time: '10:30 AM' },
    { id: 2, user: 'Coach Mike', message: 'Team practice moved to 4pm tomorrow', time: '11:15 AM' }
  ]);

  const [chatMessage, setChatMessage] = useState('');

  // Calculate practice streak from actual data
  const calcStreak = () => {
    const practiceDates = practices.filter(p => p.type === 'Practice' && p.date).map(p => p.date).sort().reverse();
    if (practiceDates.length === 0) return 0;
    const unique = [...new Set(practiceDates)];
    let streak = 1;
    for (let i = 0; i < unique.length - 1; i++) {
      const curr = new Date(unique[i]);
      const prev = new Date(unique[i + 1]);
      const diff = (curr - prev) / (1000 * 60 * 60 * 24);
      if (diff <= 1) streak++;
      else break;
    }
    return streak;
  };
  const practiceStreak = calcStreak();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Check if we have email and password
    if (!loginForm.email || !loginForm.password) {
      alert('Please enter email and password');
      return;
    }
    
    // Sign up flow
    if (isSignUp) {
      if (loginForm.role === 'player' || loginForm.role === 'parent') {
        // Players and parents need to fill in more info
        setSignUpStep(2);
      } else {
        // Coach can go straight in
        setUserRole('coach');
        setIsLoggedIn(true);
        saveUserData(loginForm, 'coach', null);
      }
    } else {
      // Regular login
      setUserRole(loginForm.role);
      setIsLoggedIn(true);
      saveUserData(loginForm, loginForm.role, playerInfo);
    }
  };

  const handlePlayerInfoSubmit = (e) => {
    e.preventDefault();
    
    // Check if player is under 14 and trying to sign up directly (not as parent)
    if (playerInfo.age && playerInfo.age < 14 && loginForm.role === 'player') {
      alert('Players under 14 must have a parent create their account. Please have your parent sign up as a Parent.');
      return;
    }
    
    const finalRole = loginForm.role === 'parent' ? 'parent' : 'player';
    setUserRole(finalRole);
    setIsLoggedIn(true);
    setSignUpStep(1);
    
    // If student entered an academy code during signup, connect them
    if (playerInfo.academyCode) {
      setAcademy({
        name: 'Farm & Forge Tennis',
        code: playerInfo.academyCode,
        emoji: '🎾',
        location: 'College Grove, TN',
        coaches: [
          { id: 1, name: 'Coach Mike', emoji: '👨‍🏫', role: 'Head Coach' },
          { id: 2, name: 'Coach Sarah', emoji: '👩‍🏫', role: 'Assistant Coach' },
        ],
        connected: true
      });
      alert('Successfully connected to your academy!');
    }
    
    // Save all data to localStorage
    saveUserData(loginForm, finalRole, playerInfo);
  };

  const handleLogout = () => {
    // Reset state
    setIsLoggedIn(false);
    setLoginForm({ email: '', password: '', role: 'player' });
    setPlayerInfo({
      name: '',
      age: '',
      dob: '',
      state: '',
      city: '',
      ustaNumber: '',
      currentUTR: '',
      goalUTR: '',
      goalDate: ''
    });
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const PlayerInfoForm = () => (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="w-10 h-10 text-cyan-400" />
            <span className="text-3xl font-light text-white tracking-wider">
              TENNIS<span className="text-cyan-400">TRACK</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            {loginForm.role === 'parent' ? "Let's set up your child's profile" : "Let's set up your player profile"}
          </p>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-white">Player Information</h2>
            <div className="text-sm text-gray-400">Step 2 of 2</div>
          </div>

          <form onSubmit={handlePlayerInfoSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Full Name *</label>
                <input
                  type="text"
                  value={playerInfo.name}
                  onChange={(e) => setPlayerInfo({...playerInfo, name: e.target.value})}
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  required
                  autoComplete="name"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Date of Birth *</label>
                <input
                  type="date"
                  value={playerInfo.dob}
                  onChange={(e) => {
                    setPlayerInfo({...playerInfo, dob: e.target.value, age: calculateAge(e.target.value)});
                  }}
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  required
                  autoComplete="bday"
                />
              </div>
            </div>

            {playerInfo.age && playerInfo.age < 14 && loginForm.role !== 'parent' && (
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-400 text-sm">
                  ⚠️ Players under 14 must have a parent create their account. Please have your parent sign up as a Parent and add you.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">City *</label>
                <input
                  type="text"
                  value={playerInfo.city}
                  onChange={(e) => setPlayerInfo({...playerInfo, city: e.target.value})}
                  placeholder="Your city"
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  required
                  autoComplete="address-level2"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">State *</label>
                <select
                  value={playerInfo.state}
                  onChange={(e) => setPlayerInfo({...playerInfo, state: e.target.value})}
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  required
                  autoComplete="address-level1"
                >
                  <option value="">Select state</option>
                  {['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">USTA Number (Optional)</label>
              <input
                type="text"
                value={playerInfo.ustaNumber}
                onChange={(e) => setPlayerInfo({...playerInfo, ustaNumber: e.target.value})}
                placeholder="Enter USTA number to sync UTR"
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <p className="text-gray-500 text-xs mt-1">We'll automatically sync your UTR rating from USTA</p>
            </div>

            <div className="border-t border-gray-800 pt-5 mt-6">
              <h3 className="text-white font-light mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-400" />
                Set Your UTR Goal 🎯
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Current UTR (if known)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={playerInfo.currentUTR}
                    onChange={(e) => setPlayerInfo({...playerInfo, currentUTR: e.target.value})}
                    placeholder="e.g., 3.25"
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Goal UTR</label>
                  <input
                    type="number"
                    step="0.01"
                    value={playerInfo.goalUTR}
                    onChange={(e) => setPlayerInfo({...playerInfo, goalUTR: e.target.value})}
                    placeholder="e.g., 5.00"
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-gray-400 text-sm mb-2">Target Date</label>
                <input
                  type="month"
                  value={playerInfo.goalDate}
                  onChange={(e) => setPlayerInfo({...playerInfo, goalDate: e.target.value})}
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              {playerInfo.currentUTR && playerInfo.goalUTR && (
                <div className="mt-4 p-4 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 border border-cyan-400/30 rounded-lg">
                  <p className="text-cyan-400 text-sm">
                    🚀 Awesome! You want to improve by {(parseFloat(playerInfo.goalUTR) - parseFloat(playerInfo.currentUTR)).toFixed(2)} points. 
                    Keep practicing and tracking your matches!
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setSignUpStep(1)}
                className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={playerInfo.age && playerInfo.age < 14 && loginForm.role !== 'parent'}
                className="flex-1 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-lg font-medium hover:from-cyan-300 hover:to-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete Setup 🎾
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const handleGoogleLogin = () => {
    // In real app, this would trigger Google OAuth
    setIsLoggedIn(true);
  };

  const LoginPage = () => (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="w-10 h-10 text-cyan-400" />
            <span className="text-3xl font-light text-white tracking-wider">
              TENNIS<span className="text-cyan-400">TRACK</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm">Track your journey to excellence</p>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
          <h2 className="text-2xl font-light text-white mb-6">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>

          {isSignUp && (
            <div className="mb-4 p-3 bg-cyan-400/10 border border-cyan-400/30 rounded-lg">
              <p className="text-cyan-400 text-sm">✨ Creating a new account</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">I am a...</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setLoginForm({...loginForm, role: 'player'})}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    loginForm.role === 'player'
                      ? 'bg-cyan-400 text-black'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  Player
                </button>
                <button
                  type="button"
                  onClick={() => setLoginForm({...loginForm, role: 'coach'})}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    loginForm.role === 'coach'
                      ? 'bg-cyan-400 text-black'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  Coach
                </button>
                <button
                  type="button"
                  onClick={() => setLoginForm({...loginForm, role: 'parent'})}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    loginForm.role === 'parent'
                      ? 'bg-cyan-400 text-black'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  Parent
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Email</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                autoComplete="current-password"
              />
            </div>

            {isSignUp && (loginForm.role === 'player' || loginForm.role === 'coach') && (
              <div>
                <label className="block text-gray-400 text-sm mb-2">Academy Code {loginForm.role === 'coach' ? '' : '(Optional)'}</label>
                <input
                  type="text"
                  value={playerInfo.academyCode || ''}
                  onChange={(e) => setPlayerInfo({...playerInfo, academyCode: e.target.value.toUpperCase()})}
                  placeholder="Enter your academy code"
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">{loginForm.role === 'coach' ? 'Enter your academy code to join as a coach' : 'Get this code from your academy to connect'}</p>
              </div>
            )}

            {isSignUp && loginForm.role === 'parent' && (
              <div>
                <label className="block text-gray-400 text-sm mb-2">Academy Code</label>
                <input
                  type="text"
                  value={playerInfo.academyCode || ''}
                  onChange={(e) => setPlayerInfo({...playerInfo, academyCode: e.target.value.toUpperCase()})}
                  placeholder="Enter your child's academy code"
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleLogin(e);
              }}
              className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-lg font-medium hover:from-cyan-300 hover:to-blue-400 transition-all"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-900 text-gray-500">or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setSignUpStep(1);
              }}
              className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>

          {!isSignUp && (
            <div className="mt-3 text-center">
              <button className="text-gray-500 text-sm hover:text-gray-400 transition-colors">
                Forgot password?
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          By continuing, you agree to TennisTrack's Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );

  if (!isLoggedIn) {
    if (signUpStep === 2) return PlayerInfoForm();
    return LoginPage();
  }

  const Navigation = () => (
    <div className={`flex items-center justify-between p-4 border-b ${theme.navBorder} ${theme.navBg}`}>
      <div className="flex items-center gap-3">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
          <Menu className={`w-6 h-6 ${theme.textMuted}`} />
        </button>
        <div className="flex items-center gap-2">
          <Trophy className="w-7 h-7 text-cyan-400" />
          <span className={`text-xl font-light ${theme.text} tracking-wider`}>TENNIS<span className="text-cyan-400">TRACK</span></span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => setDarkMode(!darkMode)} className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} transition-colors`}>
          {darkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
        </button>
        <div className="relative">
          <Bell 
            onClick={() => setActiveView('notifications')}
            className={`w-5 h-5 ${theme.textMuted} cursor-pointer hover:text-cyan-400 transition-colors`} 
          />
          {userRole === 'coach' && notifications.length > 0 && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {notifications.length > 9 ? '9+' : notifications.length}
            </div>
          )}
        </div>
        <Settings 
          onClick={() => setActiveView('settings')}
          className="w-5 h-5 text-gray-400 cursor-pointer hover:text-cyan-400 transition-colors" 
        />
        <button 
          onClick={handleLogout}
          className="text-gray-400 text-sm hover:text-cyan-400 transition-colors"
        >
          Logout
        </button>
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => setActiveView('settings')}
        >
          {/* Display badges */}
          {(userSettings.displayBadges || []).length > 0 && (
            <div className="flex gap-1">
              {(userSettings.displayBadges || []).slice(0, 3).map(badgeId => {
                const achievement = achievements.find(a => a.id === badgeId);
                if (!achievement) return null;
                return (
                  <div 
                    key={badgeId} 
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 flex items-center justify-center text-sm"
                    title={achievement.title}
                  >
                    {achievement.icon}
                  </div>
                );
              })}
            </div>
          )}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xl font-medium group-hover:scale-110 transition-transform">
            {userSettings.profileEmoji}
          </div>
        </div>
      </div>
    </div>
  );

  const Sidebar = () => (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-black border-r border-gray-800 transform transition-transform duration-200 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-4 border-b border-gray-800 lg:hidden">
          <button onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6 text-gray-300" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <SidebarItem icon={<Target />} label="Dashboard" view="dashboard" />
          <SidebarItem icon={<Calendar />} label="Calendar" view="calendar" />
          {(userRole === 'player' || userRole === 'parent') && (
            <>
              <SidebarItem icon={<Trophy />} label="Match Records" view="matches" />
              <SidebarItem icon={<Star />} label="Achievements" view="achievements" />
              <SidebarItem icon={<Crosshair />} label="Goals" view="goals" />
              <SidebarItem icon={<Search />} label="Scouting" view="scouting" />
              <SidebarItem icon={<BookOpen />} label="Journal" view="journal" />
              <SidebarItem icon={<Clock />} label="My Schedule" view="scheduler" />
            </>
          )}
          <SidebarItem icon={<MessageSquare />} label="Coach Notes" view="notes" />
          <SidebarItem icon={<Users />} label="Team Chat" view="chat" />
          {userRole === 'coach' && (
            <>
              <SidebarItem icon={<Users />} label="My Students" view="students" />
              <SidebarItem icon={<ClipboardList />} label="Drills" view="drills" />
              <SidebarItem icon={<Clock />} label="Scheduler" view="scheduler" />
              <SidebarItem icon={<Bell />} label="Notifications" view="notifications" />
            </>
          )}
          {userRole === 'parent' && (
            <SidebarItem icon={<DollarSign />} label="Expenses" view="expenses" />
          )}
          <SidebarItem icon={<Dumbbell />} label="Warmup" view="warmup" />
          <SidebarItem icon={<User />} label="Profile" view="profile" />
          <SidebarItem icon={<Image />} label="Media" view="media" />
        </div>
        
        <div className="flex-shrink-0 p-4 border-t border-gray-800">
          <div className="space-y-2">
            <button
              onClick={() => setUserRole('player')}
              className={`w-full px-3 py-2 rounded-lg text-sm transition-all ${userRole === 'player' ? 'bg-cyan-400 text-black' : 'text-gray-400 hover:bg-gray-900'}`}
            >
              Player View
            </button>
            <button
              onClick={() => setUserRole('coach')}
              className={`w-full px-3 py-2 rounded-lg text-sm transition-all ${userRole === 'coach' ? 'bg-cyan-400 text-black' : 'text-gray-400 hover:bg-gray-900'}`}
            >
              Coach View
            </button>
            <button
              onClick={() => setUserRole('parent')}
              className={`w-full px-3 py-2 rounded-lg text-sm transition-all ${userRole === 'parent' ? 'bg-cyan-400 text-black' : 'text-gray-400 hover:bg-gray-900'}`}
            >
              Parent View
            </button>
          </div>
        </div>
      </div>
    </>
  );

  const SidebarItem = ({ icon, label, view }) => (
    <button
      onClick={() => { setActiveView(view); setSidebarOpen(false); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        activeView === view
          ? 'bg-gradient-to-r from-cyan-400/20 to-blue-600/20 text-cyan-400 border border-cyan-400/30'
          : 'text-gray-400 hover:bg-gray-900 hover:text-gray-200'
      }`}
    >
      {React.cloneElement(icon, { className: 'w-5 h-5' })}
      <span className="font-light">{label}</span>
    </button>
  );

  const Dashboard = () => {
    // Coach Dashboard
    if (userRole === 'coach') {
      // Calculate team stats
      const totalStudentMatches = students.reduce((sum, s) => sum + (s.matches || 0), 0);
      const totalStudentPractices = students.reduce((sum, s) => sum + (s.practices || 0), 0);
      const todayStr = new Date().toISOString().split('T')[0];
      const todayLessons = bookedLessons.filter(l => l.date === todayStr);
      const upcomingLessons = bookedLessons.filter(l => new Date(l.date) >= new Date()).sort((a,b) => new Date(a.date) - new Date(b.date));
      const pendingRequests = bookedLessons.filter(l => l.status === 'pending');
      
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-light text-white">Coach Dashboard</h2>
              <p className="text-gray-400 mt-1">Welcome back, {userSettings.username || 'Coach'}!</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 text-center">
              <div className="text-3xl font-light text-cyan-400">{students.length}</div>
              <div className="text-gray-500 text-xs mt-1">Students</div>
            </div>
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 text-center">
              <div className="text-3xl font-light text-green-400">{todayLessons.length}</div>
              <div className="text-gray-500 text-xs mt-1">Today's Sessions</div>
            </div>
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 text-center">
              <div className="text-3xl font-light text-yellow-400">{pendingRequests.length}</div>
              <div className="text-gray-500 text-xs mt-1">Pending Requests</div>
            </div>
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 text-center">
              <div className="text-3xl font-light text-blue-400">{drills.filter(d => d.status === 'active').length}</div>
              <div className="text-gray-500 text-xs mt-1">Active Drills</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            <button onClick={() => setActiveView('scheduler')} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-xl text-sm font-medium whitespace-nowrap">
              <Clock className="w-4 h-4" /> Schedule Session
            </button>
            <button onClick={() => setActiveView('drills')} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-400 to-emerald-500 text-black rounded-xl text-sm font-medium whitespace-nowrap">
              <ClipboardList className="w-4 h-4" /> Assign Drill
            </button>
            <button onClick={() => setActiveView('notes')} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-400 to-pink-500 text-black rounded-xl text-sm font-medium whitespace-nowrap">
              <MessageSquare className="w-4 h-4" /> Send Note
            </button>
          </div>

          {/* Today's Schedule + Upcoming */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="text-lg font-light text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                Today's Schedule
              </h3>
              {todayLessons.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-3xl mb-2">📅</div>
                  <p className="text-sm">No sessions scheduled today</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {todayLessons.map(lesson => (
                    <div key={lesson.id} className="flex items-center justify-between p-3 bg-black rounded-lg border border-gray-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-8 bg-cyan-400 rounded-full" />
                        <div>
                          <div className="text-white text-sm">{lesson.student}</div>
                          <div className="text-gray-500 text-xs">{lesson.time} · {lesson.duration}min</div>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-xs ${lesson.status === 'confirmed' ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'}`}>{lesson.status}</span>
                    </div>
                  ))}
                </div>
              )}
              {/* Next upcoming if no today */}
              {todayLessons.length === 0 && upcomingLessons.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="text-gray-500 text-xs mb-2">Next session:</div>
                  <div className="text-white text-sm">{upcomingLessons[0].student} — {new Date(upcomingLessons[0].date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {upcomingLessons[0].time}</div>
                </div>
              )}
            </div>

            {/* Pending Requests */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="text-lg font-light text-white mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-yellow-400" />
                Pending Requests ({pendingRequests.length})
              </h3>
              {pendingRequests.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-3xl mb-2">✅</div>
                  <p className="text-sm">All caught up!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {pendingRequests.map(req => (
                    <div key={req.id} className="flex items-center justify-between p-3 bg-black rounded-lg border border-yellow-400/20">
                      <div>
                        <div className="text-white text-sm">{req.student}</div>
                        <div className="text-gray-500 text-xs">{new Date(req.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {req.time}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setBookedLessons(prev => prev.map(l => l.id === req.id ? {...l, status: 'confirmed'} : l))} className="px-3 py-1 bg-green-400 text-black rounded text-xs font-medium">Accept</button>
                        <button onClick={() => setBookedLessons(prev => prev.filter(l => l.id !== req.id))} className="px-3 py-1 bg-gray-800 text-red-400 rounded text-xs">Decline</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Student Overview */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h3 className="text-lg font-light text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              Student Overview
            </h3>
            {students.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">📚</div>
                <p className="text-gray-400">No students yet</p>
                <p className="text-gray-500 text-sm mt-1">Share your coach code to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {students.map(student => {
                  const nextLesson = upcomingLessons.find(l => l.student === student.name);
                  return (
                    <div 
                      key={student.id}
                      onClick={() => { setSelectedStudent(student); setActiveView('students'); }}
                      className="flex items-center gap-4 p-4 bg-black rounded-xl border border-gray-800 hover:border-cyan-400/30 transition-all cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-2xl flex-shrink-0">
                        {student.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-light">{student.name}</div>
                        <div className="text-gray-500 text-xs">UTR: {student.currentUTR} → {student.goalUTR} · {student.matches || 0} matches · {student.practices || 0} practices</div>
                      </div>
                      <div className="text-right flex-shrink-0 hidden md:block">
                        {nextLesson ? (
                          <div className="text-xs text-cyan-400">Next: {new Date(nextLesson.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                        ) : (
                          <div className="text-xs text-gray-600">No session scheduled</div>
                        )}
                        <div className="text-xs text-gray-500">{student.lastActive}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-600 flex-shrink-0" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Academy Info + Code */}
          <div className="bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-xl border border-cyan-400/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">{academy.emoji}</div>
              <div>
                <h3 className="text-lg font-light text-white">{academy.name}</h3>
                <p className="text-gray-400 text-sm">{academy.location}</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-gray-500 text-xs mb-1">Academy Coaches</div>
              <div className="flex gap-2 flex-wrap">
                {academy.coaches.map(c => (
                  <div key={c.id} className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 rounded-full border border-gray-700">
                    <span>{c.emoji}</span>
                    <span className="text-xs text-gray-300">{c.name}</span>
                    <span className="text-xs text-gray-600">· {c.role}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 px-4 py-3 bg-black border border-cyan-400/30 rounded-lg">
                <div className="text-xs text-gray-500 mb-0.5">Academy Code</div>
                <div className="text-cyan-400 text-xl font-mono font-bold tracking-wider">
                  {academy.code}
                </div>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(academy.code);
                  alert('Academy code copied!');
                }}
                className="px-4 py-3 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors font-medium"
              >
                Copy Code
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-2">Share this code with students and parents to join your academy.</p>
          </div>
        </div>
      );
    }

    // Parent Dashboard
    if (userRole === 'parent') {
      const totalWins = matches.filter(m => m.result === 'Win').length;
      const totalMatches = matches.length;
      const winRate = totalMatches > 0 ? ((totalWins / totalMatches) * 100).toFixed(0) : 0;
      const totalPracticeHrs = (practices.reduce((sum, p) => sum + (p.duration || 0), 0) / 60).toFixed(1);
      const currentUTRVal = parseFloat(playerInfo.currentUTR) || 3.52;
      const goalUTRVal = parseFloat(playerInfo.goalUTR) || 5.0;
      const recentMatches = matches.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
      
      // This week's activity
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const weekPractices = practices.filter(p => new Date(p.date) > oneWeekAgo);
      const weekMatches = matches.filter(m => new Date(m.date) > oneWeekAgo);
      const weekHours = (weekPractices.reduce((sum, p) => sum + (p.duration || 0), 0) / 60).toFixed(1);

      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-light text-white">Parent Dashboard</h2>
            <p className="text-gray-400 mt-1">Overview of {playerInfo.name || 'your child'}'s tennis progress</p>
          </div>

          {/* Weekly Summary Card */}
          <div className="bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-2xl border border-purple-400/30 p-6">
            <h3 className="text-white text-xl font-light mb-4 flex items-center gap-2">
              📋 This Week's Summary
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-black/40 rounded-xl p-4 text-center">
                <div className="text-3xl font-light text-purple-400">{weekPractices.length}</div>
                <div className="text-xs text-gray-400 mt-1">Practice Sessions</div>
              </div>
              <div className="bg-black/40 rounded-xl p-4 text-center">
                <div className="text-3xl font-light text-pink-400">{weekHours}h</div>
                <div className="text-xs text-gray-400 mt-1">Hours on Court</div>
              </div>
              <div className="bg-black/40 rounded-xl p-4 text-center">
                <div className="text-3xl font-light text-cyan-400">{weekMatches.length}</div>
                <div className="text-xs text-gray-400 mt-1">Matches Played</div>
              </div>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
              <div className="text-gray-400 text-sm mb-1">UTR Rating</div>
              <div className="text-3xl font-light text-cyan-400">{currentUTRVal}</div>
              <div className="text-xs text-gray-500">Goal: {goalUTRVal}</div>
            </div>
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
              <div className="text-gray-400 text-sm mb-1">Win Rate</div>
              <div className="text-3xl font-light text-green-400">{winRate}%</div>
              <div className="text-xs text-gray-500">{totalWins}W - {totalMatches - totalWins}L</div>
            </div>
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
              <div className="text-gray-400 text-sm mb-1">Total Hours</div>
              <div className="text-3xl font-light text-blue-400">{totalPracticeHrs}</div>
              <div className="text-xs text-gray-500">{practices.filter(p => p.duration).length} sessions</div>
            </div>
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
              <div className="text-gray-400 text-sm mb-1">Streak</div>
              <div className="text-3xl font-light text-orange-400">{practiceStreak}🔥</div>
              <div className="text-xs text-gray-500">days in a row</div>
            </div>
          </div>

          {/* UTR Progress Visual */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h3 className="text-lg font-light text-white mb-4">UTR Progress</h3>
            <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden mb-2">
              <div 
                className="absolute h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
                style={{ width: `${(currentUTRVal / goalUTRVal) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-cyan-400">{currentUTRVal} current</span>
              <span className="text-gray-400">{(goalUTRVal - currentUTRVal).toFixed(2)} to go</span>
              <span className="text-gray-500">{goalUTRVal} goal</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Match Results */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="text-lg font-light text-white mb-4 flex items-center gap-2">
                🎾 Recent Matches
              </h3>
              <div className="space-y-2">
                {recentMatches.map(m => (
                  <div key={m.id} className={`flex items-center justify-between p-3 rounded-lg border ${m.result === 'Win' ? 'bg-green-400/5 border-green-400/20' : 'bg-red-400/5 border-red-400/20'}`}>
                    <div>
                      <div className="text-white text-sm">vs {m.opponent}</div>
                      <div className="text-gray-500 text-xs">{new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${m.result === 'Win' ? 'text-green-400' : 'text-red-400'}`}>{m.result}</div>
                      <div className="text-gray-400 text-xs">{m.score}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coach Communication */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="text-lg font-light text-white mb-4 flex items-center gap-2">
                📝 Coach Feedback
              </h3>
              {coachFeedback.length > 0 ? (
                <div className="space-y-3">
                  {coachFeedback.map(f => (
                    <div key={f.id} className="p-4 bg-black rounded-lg border border-gray-800">
                      <div className="text-sm text-gray-400 mb-2">{f.date}</div>
                      <div className="text-white text-sm font-light mb-2">{f.feedback}</div>
                      <div className="flex gap-2 flex-wrap">
                        {f.areas.map(area => (
                          <span key={area} className="px-2 py-1 bg-cyan-400/10 text-cyan-400 text-xs rounded-full border border-cyan-400/20">{area}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No coach feedback yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Schedule */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h3 className="text-lg font-light text-white mb-4 flex items-center gap-2">
              📅 Upcoming Schedule
            </h3>
            <div className="space-y-2">
              {practices.filter(p => new Date(p.date) > new Date()).sort((a,b) => new Date(a.date) - new Date(b.date)).slice(0, 5).map(p => (
                <div key={p.id} className="flex items-center justify-between p-3 bg-black rounded-lg border border-gray-800">
                  <div>
                    <div className="text-white text-sm">{p.notes || p.type}</div>
                    <div className="text-gray-500 text-xs">{new Date(p.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {p.time}</div>
                  </div>
                  {p.duration && <div className="text-blue-400 text-sm">{p.duration} min</div>}
                </div>
              ))}
              {practices.filter(p => new Date(p.date) > new Date()).length === 0 && (
                <div className="text-center py-4 text-gray-500 text-sm">No upcoming events scheduled</div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Player/Parent Dashboard
    const currentUTR = parseFloat(playerInfo.currentUTR) || 3.52;
    const goalUTR = parseFloat(playerInfo.goalUTR) || 5.0;
    const progress = ((currentUTR / goalUTR) * 100).toFixed(0);
    const lastChange = utrHistory.length > 1 ? utrHistory[utrHistory.length - 1].change : 0;
    const isImproving = lastChange > 0;

    // Calculate milestones
    const milestones = [];
    for (let i = Math.ceil(currentUTR); i <= Math.floor(goalUTR); i++) {
      milestones.push({
        level: i,
        reached: currentUTR >= i,
        distance: i - currentUTR
      });
    }

    return (
    <div className="space-y-6">
      {/* UTR Goal Tracker - Enhanced */}
      {playerInfo.goalUTR && (
        <div className="bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-purple-500/10 rounded-2xl border border-cyan-400/30 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-white text-2xl font-light mb-1 flex items-center gap-2">
                Your UTR Journey 
                {isImproving && <span className="text-green-400">📈</span>}
              </h3>
              <p className="text-gray-400 text-sm">
                Goal: {goalUTR} UTR by {playerInfo.goalDate ? new Date(playerInfo.goalDate + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'your target date'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-light text-cyan-400 mb-1">{currentUTR}</div>
              <div className="text-xs text-gray-400">Current UTR</div>
              {lastChange !== 0 && (
                <div className={`text-sm mt-1 ${lastChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {lastChange > 0 ? '▲' : '▼'} {Math.abs(lastChange).toFixed(2)}
                </div>
              )}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden mb-4">
            <div 
              className="absolute h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-500 shadow-lg shadow-cyan-400/50"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex justify-between text-sm mb-6">
            <span className="text-gray-400">{progress}% to goal</span>
            <span className="text-cyan-400 font-medium">{(goalUTR - currentUTR).toFixed(2)} points to go!</span>
          </div>

          {/* Milestones */}
          <div className="mb-6">
            <h4 className="text-white text-sm font-light mb-3">🎯 Milestones</h4>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {milestones.map(milestone => (
                <div 
                  key={milestone.level}
                  className={`flex-shrink-0 w-24 p-3 rounded-xl border transition-all ${
                    milestone.reached
                      ? 'bg-gradient-to-br from-green-400/20 to-emerald-500/20 border-green-400/30'
                      : 'bg-gray-800/50 border-gray-700'
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-2xl mb-1 ${milestone.reached ? 'text-green-400' : 'text-gray-500'}`}>
                      {milestone.reached ? '✓' : '🔒'}
                    </div>
                    <div className={`text-lg font-light ${milestone.reached ? 'text-green-400' : 'text-gray-400'}`}>
                      {milestone.level}.0
                    </div>
                    {!milestone.reached && (
                      <div className="text-xs text-gray-500 mt-1">
                        {milestone.distance.toFixed(2)} away
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Streak */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-400/10 to-red-500/10 border border-orange-400/30 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🔥</div>
              <div>
                <div className="text-white font-light">Practice Streak</div>
                <div className="text-xs text-gray-400">Keep it going!</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-light text-orange-400">{practiceStreak}</div>
              <div className="text-xs text-gray-400">days</div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setShowAddPractice(true)}
          className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-xl hover:border-blue-400/50 transition-all"
        >
          <Plus className="w-5 h-5 text-blue-400" />
          <span className="text-blue-400 font-light">Log Practice</span>
        </button>
        <button
          onClick={() => setShowAddMatch(true)}
          className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl hover:border-green-400/50 transition-all"
        >
          <Plus className="w-5 h-5 text-green-400" />
          <span className="text-green-400 font-light">Log Match</span>
        </button>
      </div>

      {/* UTR History Chart */}
      {utrHistory.length > 0 && (() => {
        const sorted = utrHistory.slice().sort((a,b) => new Date(a.date) - new Date(b.date));
        const minUTR = Math.floor(Math.min(...sorted.map(e => e.utr)) * 2) / 2;
        const maxUTR = Math.ceil(Math.max(...sorted.map(e => e.utr)) * 2) / 2 + 0.5;
        const chartW = 100;
        const chartH = 50;
        const padL = 8;
        const padB = 6;
        const points = sorted.map((entry, i) => {
          const x = padL + (i / (sorted.length - 1)) * (chartW - padL - 2);
          const y = chartH - padB - ((entry.utr - minUTR) / (maxUTR - minUTR)) * (chartH - padB - 4);
          return { x, y, ...entry };
        });
        const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
        const areaPath = linePath + ` L${points[points.length-1].x},${chartH - padB} L${points[0].x},${chartH - padB} Z`;
        const gridLines = [];
        for (let v = minUTR; v <= maxUTR; v += 0.5) {
          const y = chartH - padB - ((v - minUTR) / (maxUTR - minUTR)) * (chartH - padB - 4);
          gridLines.push({ y, label: v.toFixed(1) });
        }

        return (
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-light text-white flex items-center gap-2">
              📊 UTR Progress
            </h3>
            <button onClick={() => setShowAddUTR(true)} className="flex items-center gap-1 px-3 py-1.5 bg-cyan-400 text-black rounded-lg text-sm font-medium">
              <Plus className="w-4 h-4" /> Add UTR
            </button>
          </div>

          {/* SVG Chart */}
          <div className="mb-4">
            <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-48">
              {/* Grid lines */}
              {gridLines.map((line, i) => (
                <g key={i}>
                  <line x1={padL} y1={line.y} x2={chartW - 2} y2={line.y} stroke="#374151" strokeWidth="0.2" />
                  <text x={padL - 1} y={line.y + 1} fill="#6B7280" fontSize="2.5" textAnchor="end">{line.label}</text>
                </g>
              ))}
              {/* Area fill */}
              <path d={areaPath} fill="url(#utrGradient)" opacity="0.3" />
              {/* Line */}
              <path d={linePath} fill="none" stroke="#22D3EE" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round" />
              {/* Data points */}
              {points.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="1.2" fill="#22D3EE" stroke="#111827" strokeWidth="0.4" />
                  {(i === 0 || i === points.length - 1) && (
                    <text x={p.x} y={p.y - 2.5} fill="#22D3EE" fontSize="2.5" textAnchor="middle" fontWeight="bold">{p.utr}</text>
                  )}
                </g>
              ))}
              {/* Date labels */}
              {points.filter((_, i) => i === 0 || i === Math.floor(points.length / 2) || i === points.length - 1).map((p, i) => (
                <text key={i} x={p.x} y={chartH - 1} fill="#6B7280" fontSize="2" textAnchor="middle">
                  {new Date(p.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                </text>
              ))}
              <defs>
                <linearGradient id="utrGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Stats summary */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-2 bg-black rounded-lg">
              <div className="text-lg font-light text-cyan-400">{sorted[0].utr}</div>
              <div className="text-xs text-gray-500">Starting</div>
            </div>
            <div className="text-center p-2 bg-black rounded-lg">
              <div className="text-lg font-light text-white">{sorted[sorted.length - 1].utr}</div>
              <div className="text-xs text-gray-500">Current</div>
            </div>
            <div className="text-center p-2 bg-black rounded-lg">
              <div className="text-lg font-light text-green-400">+{(sorted[sorted.length - 1].utr - sorted[0].utr).toFixed(2)}</div>
              <div className="text-xs text-gray-500">Total Growth</div>
            </div>
          </div>

          {/* History list */}
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {sorted.slice().reverse().map((entry, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 bg-black rounded-lg border border-gray-800">
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-6 rounded-full ${entry.source === 'Tournament' ? 'bg-purple-400' : entry.source === 'Initial' ? 'bg-gray-500' : 'bg-cyan-400'}`} />
                  <div>
                    <div className="text-gray-400 text-xs">{new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    <div className="text-gray-600 text-xs">{entry.source}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-white text-sm font-light">{entry.utr}</div>
                  {entry.change !== 0 && (
                    <div className={`text-xs px-1.5 py-0.5 rounded ${entry.change > 0 ? 'bg-green-400/15 text-green-400' : 'bg-red-400/15 text-red-400'}`}>
                      {entry.change > 0 ? '+' : ''}{entry.change.toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        );
      })()}

      {/* Add UTR Entry Modal */}
      {showAddUTR && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-y-auto">
          <div className="min-h-full flex items-start justify-center p-4 py-8">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-light text-white">Add UTR Entry</h3>
                <button onClick={() => setShowAddUTR(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <p className="text-gray-500 text-sm mb-4">Add a historical or current UTR from myutr.com</p>
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Date</label>
                  <input type="date" value={newUTREntry.date} onChange={e => setNewUTREntry({...newUTREntry, date: e.target.value})} className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400" style={{ colorScheme: 'dark' }} />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">UTR Rating</label>
                  <input type="number" step="0.01" min="1" max="16" value={newUTREntry.utr} onChange={e => setNewUTREntry({...newUTREntry, utr: e.target.value})} placeholder="e.g. 3.52" className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400" />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Source</label>
                  <select value={newUTREntry.source} onChange={e => setNewUTREntry({...newUTREntry, source: e.target.value})} className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400">
                    <option value="UTR Update">UTR Update</option>
                    <option value="Tournament">Tournament</option>
                    <option value="Historical">Historical Entry</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => {
                    if (newUTREntry.date && newUTREntry.utr) {
                      const utrVal = parseFloat(newUTREntry.utr);
                      const sorted = [...utrHistory].sort((a,b) => new Date(a.date) - new Date(b.date));
                      const prevEntry = sorted.filter(e => new Date(e.date) < new Date(newUTREntry.date)).pop();
                      const change = prevEntry ? utrVal - prevEntry.utr : 0;
                      setUtrHistory(prev => [...prev, { date: newUTREntry.date, utr: utrVal, change: parseFloat(change.toFixed(2)), source: newUTREntry.source }]);
                      // Update current UTR if this is the latest entry
                      const latestDate = sorted.length > 0 ? sorted[sorted.length - 1].date : '';
                      if (newUTREntry.date >= latestDate) {
                        setPlayerInfo(prev => ({...prev, currentUTR: newUTREntry.utr}));
                      }
                      setNewUTREntry({ date: '', utr: '', source: 'UTR Update' });
                      setShowAddUTR(false);
                    }
                  }} className="flex-1 py-3 bg-cyan-400 text-black rounded-lg font-medium">Add Entry</button>
                  <button onClick={() => setShowAddUTR(false)} className="px-6 py-3 bg-gray-800 text-white rounded-lg">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Achievements */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-light text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            Recent Achievements
          </h3>
          <button
            onClick={() => setActiveView('achievements')}
            className="text-cyan-400 text-sm hover:text-cyan-300 flex items-center gap-1"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {achievements.filter(a => a.unlocked).slice(0, 4).map(achievement => (
            <div 
              key={achievement.id}
              onClick={() => {
                setSelectedAchievement(achievement);
                setActiveView('achievements');
              }}
              className="p-4 rounded-xl border transition-all cursor-pointer bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border-yellow-400/30 hover:scale-105"
            >
              <div className="text-4xl mb-2 text-center">{achievement.icon}</div>
              <div className="text-center">
                <div className="text-sm font-light mb-1 text-yellow-400">
                  {achievement.title}
                </div>
                <div className="text-xs text-yellow-400">✓ Unlocked!</div>
              </div>
            </div>
          ))}
          {achievements.filter(a => a.unlocked).length === 0 && (
            <div className="col-span-4 text-center py-8 text-gray-500">
              <p>No achievements unlocked yet</p>
              <p className="text-sm mt-1">Keep practicing to earn your first achievement!</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          onClick={() => setActiveView('calendar')}
          className="cursor-pointer hover:scale-105 transition-transform"
        >
          <StatCard title="Upcoming Events" value={practices.filter(p => new Date(p.date) > new Date()).length} subtitle="Click to view calendar" />
        </div>
        <InteractiveWinRate matches={matches} />
        <InteractivePracticeHours practices={practices} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-lg font-light text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" />
            Upcoming Schedule
          </h3>
          <div className="space-y-3">
            {practices.slice(0, 3).map(p => (
              <div key={p.id} className="flex items-center justify-between p-3 bg-black rounded-lg border border-gray-800">
                <div>
                  <div className="text-white font-light">{p.type}</div>
                  <div className="text-sm text-gray-400">{p.date} at {p.time}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-lg font-light text-white mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            Recent Coach Feedback
          </h3>
          <div className="space-y-3">
            {coachFeedback.map(f => (
              <div key={f.id} className="p-4 bg-black rounded-lg border border-gray-800">
                <div className="text-sm text-gray-400 mb-2">{f.date}</div>
                <div className="text-white text-sm font-light mb-2">{f.feedback}</div>
                <div className="flex gap-2 flex-wrap">
                  {f.areas.map(area => (
                    <span key={area} className="px-2 py-1 bg-cyan-400/10 text-cyan-400 text-xs rounded-full border border-cyan-400/20">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )};

  const StatCard = ({ title, value, subtitle }) => (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800 p-6 hover:border-cyan-400/30 transition-all">
      <div className="text-gray-400 text-sm font-light mb-2">{title}</div>
      <div className="text-4xl font-light text-white mb-1">{value}</div>
      <div className="text-xs text-gray-500">{subtitle}</div>
    </div>
  );

  // Interactive Match Win Rate Card
  const InteractiveWinRate = ({ matches: matchData }) => {
    const [expanded, setExpanded] = useState(false);
    
    const wins = matchData.filter(m => m.result === 'Win').length;
    const losses = matchData.filter(m => m.result === 'Loss').length;
    const total = matchData.length;
    const winRate = total > 0 ? ((wins / total) * 100).toFixed(0) : 0;

    // Group by month
    const monthlyStats = {};
    matchData.forEach(m => {
      const d = new Date(m.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      if (!monthlyStats[key]) monthlyStats[key] = { label, wins: 0, losses: 0, matches: [] };
      if (m.result === 'Win') monthlyStats[key].wins++;
      else monthlyStats[key].losses++;
      monthlyStats[key].matches.push(m);
    });
    const sortedMonths = Object.keys(monthlyStats).sort();

    // Head-to-head
    const h2h = {};
    matchData.forEach(m => {
      if (!h2h[m.opponent]) h2h[m.opponent] = { wins: 0, losses: 0 };
      if (m.result === 'Win') h2h[m.opponent].wins++;
      else h2h[m.opponent].losses++;
    });

    // Running win rate over time for sparkline
    let runningWins = 0;
    const rateOverTime = matchData
      .slice().sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((m, i) => {
        if (m.result === 'Win') runningWins++;
        return { rate: (runningWins / (i + 1)) * 100 };
      });
    const maxRate = Math.max(...rateOverTime.map(r => r.rate), 1);
    const minRate = Math.min(...rateOverTime.map(r => r.rate));

    return (
      <div className="relative">
        <div 
          onClick={() => setExpanded(!expanded)}
          className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800 p-6 hover:border-green-400/30 transition-all cursor-pointer"
        >
          <div className="text-gray-400 text-sm font-light mb-2">Match Win Rate</div>
          <div className="flex items-end gap-3">
            <div className="text-4xl font-light text-white">{winRate}%</div>
            <div className="flex-1 flex items-end gap-px h-8 mb-1">
              {rateOverTime.slice(-12).map((r, i) => (
                <div key={i} className="flex-1 bg-green-400/40 rounded-t" style={{ height: `${Math.max(((r.rate - minRate + 10) / (maxRate - minRate + 20)) * 100, 10)}%` }} />
              ))}
            </div>
          </div>
          <div className="text-xs text-gray-500">{wins}W - {losses}L · tap to expand</div>
        </div>

        {expanded && (
          <div className="fixed inset-0 bg-black bg-opacity-80 z-50 overflow-y-auto" onClick={() => setExpanded(false)}>
            <div className="min-h-full flex items-start justify-center p-4 py-8">
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 max-w-3xl w-full" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-light text-white">Match Win Rate</h3>
                  <p className="text-gray-400 text-sm mt-1">{wins} wins, {losses} losses across {total} matches</p>
                </div>
                <button onClick={() => setExpanded(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Big win rate display */}
              <div className="flex items-center gap-6 mb-6 p-4 bg-black rounded-xl border border-gray-800">
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
                    <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1f2937" strokeWidth="3" />
                    <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray={`${winRate}, 100`} strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-light text-green-400">{winRate}%</span>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <div className="text-center"><div className="text-2xl font-light text-green-400">{wins}</div><div className="text-xs text-gray-500">Wins</div></div>
                  <div className="text-center"><div className="text-2xl font-light text-red-400">{losses}</div><div className="text-xs text-gray-500">Losses</div></div>
                  <div className="text-center"><div className="text-2xl font-light text-cyan-400">{total}</div><div className="text-xs text-gray-500">Total</div></div>
                </div>
              </div>

              {/* Monthly breakdown bar chart */}
              <div className="mb-6">
                <h4 className="text-white font-light mb-3">Monthly Breakdown</h4>
                <div className="space-y-2">
                  {sortedMonths.map(key => {
                    const m = monthlyStats[key];
                    const mTotal = m.wins + m.losses;
                    const mRate = ((m.wins / mTotal) * 100).toFixed(0);
                    return (
                      <div key={key} className="flex items-center gap-3">
                        <div className="w-16 text-gray-400 text-sm">{m.label}</div>
                        <div className="flex-1 flex h-6 rounded-lg overflow-hidden bg-gray-800">
                          {m.wins > 0 && <div className="bg-green-500 flex items-center justify-center text-xs text-black font-medium" style={{ width: `${(m.wins / mTotal) * 100}%` }}>{m.wins}W</div>}
                          {m.losses > 0 && <div className="bg-red-500/70 flex items-center justify-center text-xs text-white font-medium" style={{ width: `${(m.losses / mTotal) * 100}%` }}>{m.losses}L</div>}
                        </div>
                        <div className="w-12 text-right text-sm text-gray-400">{mRate}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Head to head records */}
              <div className="mb-6">
                <h4 className="text-white font-light mb-3">Head-to-Head Records</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {Object.entries(h2h).sort((a,b) => (b[1].wins + b[1].losses) - (a[1].wins + a[1].losses)).map(([opp, record]) => (
                    <div key={opp} className="flex items-center justify-between p-3 bg-black rounded-lg border border-gray-800">
                      <span className="text-white text-sm">{opp}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 text-sm font-medium">{record.wins}W</span>
                        <span className="text-gray-600">-</span>
                        <span className="text-red-400 text-sm font-medium">{record.losses}L</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Match calendar */}
              <div>
                <h4 className="text-white font-light mb-3">Match History</h4>
                <div className="space-y-2">
                  {matchData.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).map(m => (
                    <div key={m.id} className={`flex items-center justify-between p-3 rounded-lg border ${m.result === 'Win' ? 'bg-green-400/5 border-green-400/20' : 'bg-red-400/5 border-red-400/20'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${m.result === 'Win' ? 'bg-green-400' : 'bg-red-400'}`} />
                        <div>
                          <div className="text-white text-sm">vs {m.opponent}</div>
                          <div className="text-gray-500 text-xs">{new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${m.result === 'Win' ? 'text-green-400' : 'text-red-400'}`}>{m.result}</div>
                        <div className="text-gray-400 text-xs">{m.score}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </div>
        )}
      </div>
    );
  };

  // Interactive Practice Hours Card
  const InteractivePracticeHours = ({ practices: practiceData }) => {
    const [expanded, setExpanded] = useState(false);

    // Group by month
    const monthlyHours = {};
    practiceData.forEach(p => {
      if (!p.duration) return;
      const d = new Date(p.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      if (!monthlyHours[key]) monthlyHours[key] = { label, minutes: 0, sessions: 0, focusAreas: {} };
      monthlyHours[key].minutes += p.duration;
      monthlyHours[key].sessions++;
      (p.focusAreas || []).forEach(area => {
        monthlyHours[key].focusAreas[area] = (monthlyHours[key].focusAreas[area] || 0) + 1;
      });
    });
    const sortedMonths = Object.keys(monthlyHours).sort();
    const monthValues = sortedMonths.map(k => monthlyHours[k].minutes / 60);
    const maxHours = Math.max(...monthValues, 1);
    const avgHours = monthValues.length > 0 ? (monthValues.reduce((a, b) => a + b, 0) / monthValues.length) : 0;
    
    const totalHours = (practiceData.reduce((sum, p) => sum + (p.duration || 0), 0) / 60).toFixed(1);
    const thisMonthKey = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
    const thisMonthHours = monthlyHours[thisMonthKey] ? (monthlyHours[thisMonthKey].minutes / 60).toFixed(1) : '0';

    // Focus area totals
    const allFocusAreas = {};
    practiceData.forEach(p => {
      (p.focusAreas || []).forEach(area => {
        allFocusAreas[area] = (allFocusAreas[area] || 0) + 1;
      });
    });

    // Trend: compare last 2 months
    const lastTwo = sortedMonths.slice(-2);
    let trend = 'steady';
    let trendPct = 0;
    if (lastTwo.length === 2) {
      const prev = monthlyHours[lastTwo[0]].minutes;
      const curr = monthlyHours[lastTwo[1]].minutes;
      trendPct = prev > 0 ? (((curr - prev) / prev) * 100).toFixed(0) : 0;
      trend = curr > prev ? 'up' : curr < prev ? 'down' : 'steady';
    }

    return (
      <div className="relative">
        <div 
          onClick={() => setExpanded(!expanded)}
          className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800 p-6 hover:border-blue-400/30 transition-all cursor-pointer"
        >
          <div className="text-gray-400 text-sm font-light mb-2">Practice Hours</div>
          <div className="flex items-end gap-3">
            <div className="text-4xl font-light text-white">{thisMonthHours}h</div>
            <div className="flex-1 flex items-end gap-px h-8 mb-1">
              {sortedMonths.slice(-6).map((key, i) => {
                const h = monthlyHours[key].minutes / 60;
                return <div key={i} className="flex-1 bg-blue-400/40 rounded-t" style={{ height: `${Math.max((h / maxHours) * 100, 8)}%` }} />;
              })}
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>This month</span>
            {trend !== 'steady' && (
              <span className={trend === 'up' ? 'text-green-400' : 'text-red-400'}>
                {trend === 'up' ? '▲' : '▼'} {Math.abs(trendPct)}%
              </span>
            )}
            <span>· tap to expand</span>
          </div>
        </div>

        {expanded && (
          <div className="fixed inset-0 bg-black bg-opacity-80 z-50 overflow-y-auto" onClick={() => setExpanded(false)}>
            <div className="min-h-full flex items-start justify-center p-4 py-8">
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 max-w-3xl w-full" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-light text-white">Practice Hours</h3>
                  <p className="text-gray-400 text-sm mt-1">{totalHours} total hours across {practiceData.filter(p => p.duration).length} sessions</p>
                </div>
                <button onClick={() => setExpanded(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Trend summary */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-black rounded-xl border border-gray-800 text-center">
                  <div className="text-3xl font-light text-blue-400">{thisMonthHours}h</div>
                  <div className="text-xs text-gray-500 mt-1">This Month</div>
                </div>
                <div className="p-4 bg-black rounded-xl border border-gray-800 text-center">
                  <div className="text-3xl font-light text-cyan-400">{avgHours.toFixed(1)}h</div>
                  <div className="text-xs text-gray-500 mt-1">Monthly Avg</div>
                </div>
                <div className="p-4 bg-black rounded-xl border border-gray-800 text-center">
                  <div className={`text-3xl font-light ${trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
                    {trend === 'up' ? '▲' : trend === 'down' ? '▼' : '–'} {Math.abs(trendPct)}%
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Trend</div>
                </div>
              </div>

              {/* Month by month bar chart */}
              <div className="mb-6">
                <h4 className="text-white font-light mb-3">Month by Month</h4>
                <div className="space-y-2">
                  {sortedMonths.map(key => {
                    const m = monthlyHours[key];
                    const hours = (m.minutes / 60).toFixed(1);
                    const pct = (m.minutes / 60 / maxHours) * 100;
                    const isAboveAvg = m.minutes / 60 > avgHours;
                    return (
                      <div key={key} className="flex items-center gap-3">
                        <div className="w-16 text-gray-400 text-sm">{m.label}</div>
                        <div className="flex-1 h-7 bg-gray-800 rounded-lg overflow-hidden relative">
                          <div className={`h-full rounded-lg flex items-center px-2 ${isAboveAvg ? 'bg-blue-500' : 'bg-blue-500/50'}`} style={{ width: `${Math.max(pct, 5)}%` }}>
                            {pct > 20 && <span className="text-xs text-white font-medium">{hours}h</span>}
                          </div>
                          {/* Avg line */}
                          <div className="absolute top-0 bottom-0 border-l-2 border-dashed border-cyan-400/50" style={{ left: `${(avgHours / maxHours) * 100}%` }} />
                        </div>
                        <div className="w-16 text-right text-sm text-gray-400">{m.sessions} sess</div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <div className="w-4 border-t-2 border-dashed border-cyan-400/50" />
                  <span>Average ({avgHours.toFixed(1)}h/mo)</span>
                </div>
              </div>

              {/* Focus area breakdown */}
              <div className="mb-6">
                <h4 className="text-white font-light mb-3">Time by Focus Area</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(allFocusAreas).sort((a,b) => b[1] - a[1]).map(([area, count]) => (
                    <div key={area} className="px-3 py-2 bg-black rounded-lg border border-gray-800 flex items-center gap-2">
                      <span className="text-cyan-400 text-sm">{area}</span>
                      <span className="text-gray-500 text-xs">{count} sessions</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent sessions */}
              <div>
                <h4 className="text-white font-light mb-3">Recent Sessions</h4>
                <button
                  onClick={() => { setExpanded(false); setShowAddPractice(true); }}
                  className="w-full mb-3 py-2 flex items-center justify-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors text-sm"
                >
                  <span className="text-lg">+</span> Log New Practice
                </button>
                <div className="space-y-2">
                  {practiceData.filter(p => p.duration).slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10).map(p => (
                    <div key={p.id} className="flex items-center justify-between p-3 bg-black rounded-lg border border-gray-800">
                      <div>
                        <div className="text-white text-sm">{p.notes || 'Practice'}</div>
                        <div className="text-gray-500 text-xs">{new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          {(p.focusAreas || []).slice(0, 2).map(a => (
                            <span key={a} className="px-1.5 py-0.5 bg-cyan-400/10 text-cyan-400 text-xs rounded">{a}</span>
                          ))}
                        </div>
                        <div className="text-blue-400 text-sm font-medium">{(p.duration / 60).toFixed(1)}h</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </div>
        )}
      </div>
    );
  };

  const CalendarView = () => {
    const [currentDate, setCurrentDate] = React.useState(new Date(2026, 0, 1)); // January 2026
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [showAddEvent, setShowAddEvent] = React.useState(false);
    const [showDayEvents, setShowDayEvents] = React.useState(false);
    const [newEvent, setNewEvent] = React.useState({
      type: 'Practice',
      date: '',
      fromTime: '',
      toTime: '',
      title: '',
      notes: ''
    });

    // Generate time options in 15-min increments
    const timeOptions = [];
    for (let h = 6; h <= 21; h++) {
      for (let m = 0; m < 60; m += 15) {
        const hour24 = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        const period = h >= 12 ? 'PM' : 'AM';
        const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
        const label = `${hour12}:${String(m).padStart(2, '0')} ${period}`;
        timeOptions.push({ value: hour24, label });
      }
    }

    const eventTypes = {
      Practice: { color: 'bg-blue-500', textColor: 'text-blue-400', borderColor: 'border-blue-400' },
      Match: { color: 'bg-green-500', textColor: 'text-green-400', borderColor: 'border-green-400' },
      Tournament: { color: 'bg-purple-500', textColor: 'text-purple-400', borderColor: 'border-purple-400' }
    };

    const handleAddEvent = () => {
      if (!newEvent.date || !newEvent.fromTime) {
        alert('Please fill in date and start time');
        return;
      }

      // Calculate duration if both times provided
      let duration = 0;
      if (newEvent.fromTime && newEvent.toTime) {
        const [fh, fm] = newEvent.fromTime.split(':').map(Number);
        const [th, tm] = newEvent.toTime.split(':').map(Number);
        duration = (th * 60 + tm) - (fh * 60 + fm);
        if (duration < 0) duration = 0;
      }

      const timeDisplay = newEvent.toTime 
        ? `${newEvent.fromTime} - ${newEvent.toTime}`
        : newEvent.fromTime;

      const eventToAdd = {
        id: practices.length + 1,
        date: newEvent.date,
        time: timeDisplay,
        duration: duration > 0 ? duration : undefined,
        type: newEvent.type,
        title: newEvent.title || newEvent.type,
        notes: newEvent.notes
      };

      setPractices([...practices, eventToAdd].sort((a, b) => new Date(a.date) - new Date(b.date)));
      
      setNewEvent({
        type: 'Practice',
        date: '',
        fromTime: '',
        toTime: '',
        title: '',
        notes: ''
      });
      setShowAddEvent(false);
      alert('Event added successfully!');
    };

    const handleDeleteEvent = (eventId) => {
      if (confirm('Are you sure you want to delete this event?')) {
        setPractices(practices.filter(p => p.id !== eventId));
      }
    };

    const handleDayClick = (day) => {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayEvents = getEventsForDate(day);
      
      if (dayEvents.length > 0) {
        // Show events for this day
        setSelectedDate(dateStr);
        setShowDayEvents(true);
      } else {
        // Add new event for this day
        setNewEvent({
          ...newEvent,
          date: dateStr
        });
        setShowAddEvent(true);
      }
    };

    // Calendar logic
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const prevMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };
    
    const nextMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const getEventsForDate = (day) => {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      return practices.filter(p => p.date === dateStr);
    };

    const calendarDays = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day);
    }

    const selectedDayEvents = selectedDate ? practices.filter(p => p.date === selectedDate) : [];

    return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-light text-white">Calendar</h2>
        <button 
          onClick={() => setShowAddEvent(true)}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors">
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      {/* Legend */}
      <div className="flex gap-4 p-4 bg-gray-900 rounded-lg border border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-gray-400 text-sm">Practice</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-400 text-sm">Match</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span className="text-gray-400 text-sm">Tournament</span>
        </div>
        <div className="flex-1" />
        <div className="text-gray-400 text-sm">💡 Click any day to add/view events</div>
      </div>

      {/* Calendar */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        {/* Month Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-400 rotate-180" />
          </button>
          <h3 className="text-xl font-light text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-gray-500 text-sm font-medium py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const events = getEventsForDate(day);
            const isToday = day === new Date().getDate() && 
                           currentDate.getMonth() === new Date().getMonth() &&
                           currentDate.getFullYear() === new Date().getFullYear();

            return (
              <div
                key={day}
                onClick={() => handleDayClick(day)}
                className={`aspect-square p-2 rounded-lg border transition-all cursor-pointer ${
                  isToday 
                    ? 'border-cyan-400 bg-cyan-400/10 hover:bg-cyan-400/20' 
                    : events.length > 0
                    ? 'border-gray-700 bg-black hover:border-cyan-400/30'
                    : 'border-gray-800 hover:border-gray-700 bg-black hover:bg-gray-900'
                }`}
              >
                <div className={`text-sm mb-1 ${isToday ? 'text-cyan-400 font-medium' : 'text-gray-400'}`}>
                  {day}
                </div>
                <div className="space-y-1">
                  {events.slice(0, 2).map(event => {
                    const style = eventTypes[event.type] || eventTypes.Practice;
                    return (
                      <div
                        key={event.id}
                        className={`w-full h-1.5 rounded-full ${style.color}`}
                        title={`${event.type}: ${event.time}`}
                      />
                    );
                  })}
                  {events.length > 2 && (
                    <div className="text-xs text-gray-500">+{events.length - 2}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Day Events Modal */}
      {showDayEvents && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-y-auto">
          <div className="min-h-full flex items-start justify-center p-4 py-8">
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 max-w-xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-light text-white">
                Events on {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </h3>
              <button onClick={() => setShowDayEvents(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              {selectedDayEvents.map(event => {
                const style = eventTypes[event.type] || eventTypes.Practice;
                return (
                  <div key={event.id} className={`p-4 bg-black rounded-lg border ${style.borderColor}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${style.color}`}></div>
                        <div>
                          <div className={`font-light text-lg ${style.textColor}`}>{event.title || event.type}</div>
                          <div className="text-gray-400 text-sm">{event.time}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          handleDeleteEvent(event.id);
                          setShowDayEvents(false);
                        }}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        title="Delete event"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    {event.notes && (
                      <div className="text-gray-400 text-sm mt-2 ml-6">{event.notes}</div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                setNewEvent({...newEvent, date: selectedDate});
                setShowDayEvents(false);
                setShowAddEvent(true);
              }}
              className="w-full py-3 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors font-medium"
            >
              Add Another Event
            </button>
          </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-y-auto">
          <div className="min-h-full flex items-start justify-center p-4 py-8">
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 max-w-xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-light text-white">Add Event</h3>
              <button onClick={() => setShowAddEvent(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Event Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.keys(eventTypes).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setNewEvent({...newEvent, type})}
                      className={`px-4 py-3 rounded-lg transition-all ${
                        newEvent.type === type
                          ? `${eventTypes[type].textColor} bg-${type === 'Practice' ? 'blue' : type === 'Match' ? 'green' : 'purple'}-500/20 border ${eventTypes[type].borderColor}`
                          : 'bg-gray-800 text-gray-400 border border-gray-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Date</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">From</label>
                    <select
                      value={newEvent.fromTime}
                      onChange={(e) => {
                        const from = e.target.value;
                        // Auto-set "to" time 1 hour later if not set
                        let to = newEvent.toTime;
                        if (!to && from) {
                          const [h, m] = from.split(':').map(Number);
                          const newH = Math.min(h + 1, 21);
                          to = `${String(newH).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
                        }
                        setNewEvent({...newEvent, fromTime: from, toTime: to});
                      }}
                      className="w-full px-3 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 text-sm"
                    >
                      <option value="">Start</option>
                      {timeOptions.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">To</label>
                    <select
                      value={newEvent.toTime}
                      onChange={(e) => setNewEvent({...newEvent, toTime: e.target.value})}
                      className="w-full px-3 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 text-sm"
                    >
                      <option value="">End</option>
                      {timeOptions
                        .filter(t => !newEvent.fromTime || t.value > newEvent.fromTime)
                        .map(t => (
                          <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Duration display */}
              {newEvent.fromTime && newEvent.toTime && (() => {
                const [fh, fm] = newEvent.fromTime.split(':').map(Number);
                const [th, tm] = newEvent.toTime.split(':').map(Number);
                const mins = (th * 60 + tm) - (fh * 60 + fm);
                if (mins > 0) {
                  const hrs = Math.floor(mins / 60);
                  const remMins = mins % 60;
                  return (
                    <div className="p-3 bg-cyan-400/10 border border-cyan-400/20 rounded-lg">
                      <span className="text-cyan-400 text-sm">
                        ⏱ Duration: {hrs > 0 ? `${hrs}h ` : ''}{remMins > 0 ? `${remMins}min` : ''}
                      </span>
                    </div>
                  );
                }
                return null;
              })()}

              <div>
                <label className="block text-gray-400 text-sm mb-2">Title (Optional)</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder={`e.g., ${newEvent.type} with Coach`}
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Notes</label>
                <textarea
                  value={newEvent.notes}
                  onChange={(e) => setNewEvent({...newEvent, notes: e.target.value})}
                  placeholder="Any additional details..."
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  rows="3"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleAddEvent}
                  className="flex-1 py-3 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors font-medium"
                >
                  Add Event
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddEvent(false)}
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
      )}

      {/* Events List Below Calendar */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-lg font-light text-white mb-4">Upcoming Events</h3>
        {practices.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No events scheduled</p>
            <p className="text-sm mt-1">Add your first event to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {practices.map(p => {
              const style = eventTypes[p.type] || eventTypes.Practice;
              return (
                <div key={p.id} className={`p-4 bg-black rounded-lg border ${style.borderColor} hover:border-opacity-50 transition-all`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <div className={`w-3 h-3 rounded-full ${style.color}`}></div>
                        <div className={`font-light text-lg ${style.textColor}`}>{p.title || p.type}</div>
                      </div>
                      <div className="text-gray-400 text-sm ml-6">{p.date} at {p.time}</div>
                      {p.notes && <div className="text-gray-500 text-sm mt-2 ml-6">{p.notes}</div>}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )};

  const handleAddMatch = () => {
    if (!newMatch.date || !newMatch.opponent) {
      alert('Please fill in date and opponent');
      return;
    }

    const score = newMatch.sets.map(s => `${s.myScore}-${s.opponentScore}`).join(', ');
    
    const matchToAdd = {
      id: Date.now(),
      date: newMatch.date,
      opponent: newMatch.opponent,
      result: newMatch.result,
      score: score,
      sets: newMatch.sets,
      overallNotes: newMatch.overallNotes
    };

    setMatches([matchToAdd, ...matches]);
    
    if (academy.connected) {
      const notification = {
        id: Date.now(),
        type: 'match',
        student: playerInfo.name || 'Student',
        message: `${playerInfo.name || 'Student'} logged a new match: ${newMatch.result} vs ${newMatch.opponent}`,
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString()
      };
      setNotifications(prev => [notification, ...prev]);
    }

    setNewMatch({
      date: '',
      opponent: '',
      result: 'Win',
      sets: [
        { set: 1, myScore: '', opponentScore: '', notes: '' },
        { set: 2, myScore: '', opponentScore: '', notes: '' }
      ],
      overallNotes: ''
    });
    setShowAddMatch(false);
    alert('Match added successfully!');
  };

  const addSet = () => {
    setNewMatch({
      ...newMatch,
      sets: [...newMatch.sets, { set: newMatch.sets.length + 1, myScore: '', opponentScore: '', notes: '' }]
    });
  };

  const MatchRecords = () => {
    return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-light text-white">Match Records</h2>
        <button 
          onClick={() => setShowAddMatch(true)}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors">
          <Plus className="w-4 h-4" />
          Add Match
        </button>
      </div>

      <div className="space-y-4">
        {matches.map(m => (
          <div key={m.id} className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-white text-xl font-light">vs {m.opponent}</div>
                <div className="text-gray-400 text-sm mt-1">{m.date}</div>
              </div>
              <div className={`px-4 py-1 rounded-full ${m.result === 'Win' ? 'bg-green-400/20 text-green-400 border border-green-400/30' : 'bg-red-400/20 text-red-400 border border-red-400/30'}`}>
                {m.result}
              </div>
            </div>
            
            <div className="text-cyan-400 text-lg mb-4">{m.score}</div>
            
            <div className="space-y-3 mb-4">
              {m.sets.map((set, i) => (
                <div key={i} className="p-3 bg-black rounded-lg border border-gray-800">
                  <div className="text-white font-light mb-1">Set {set.set}: {set.score}</div>
                  <div className="text-gray-400 text-sm">{set.notes}</div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-black rounded-lg border border-cyan-400/20">
              <div className="text-gray-400 text-sm mb-1">Overall Notes</div>
              <div className="text-white text-sm font-light">{m.overallNotes}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )};

  const CoachNotes = () => {
    const [selectedNoteStudent, setSelectedNoteStudent] = useState(null);
    const [newQuestion, setNewQuestion] = useState('');
    const [newNote, setNewNote] = useState('');

    const handleSendQuestion = () => {
      if (newQuestion.trim() && selectedNoteStudent) {
        const question = {
          id: coachQuestions.length + 1,
          question: newQuestion,
          studentId: selectedNoteStudent.id,
          date: new Date().toLocaleDateString()
        };
        setCoachQuestions([...coachQuestions, question]);
        setNewQuestion('');
        alert('Question sent to student!');
      }
    };

    const handleSaveNote = () => {
      if (newNote.trim() && selectedNoteStudent) {
        const note = {
          id: sessionNotes.length + 1,
          studentId: selectedNoteStudent.id,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          coach: userSettings.username || 'Coach',
          title: 'Session Note',
          content: newNote
        };
        setSessionNotes([...sessionNotes, note]);
        setNewNote('');
        alert('Note saved successfully!');
      }
    };

    // Coach view - see all students and their conversations
    if (userRole === 'coach') {
      if (selectedNoteStudent) {
        const studentNotes = sessionNotes.filter(n => n.studentId === selectedNoteStudent.id);
        
        return (
          <div className="space-y-4">
            <button
              onClick={() => setSelectedNoteStudent(null)}
              className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              Back to Students
            </button>

            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-2xl">
                    {selectedNoteStudent.emoji}
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-white">{selectedNoteStudent.name}</h3>
                    <p className="text-gray-400 text-sm">Coaching Notes & Communication</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowWhiteboard(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors"
                >
                  📋 Open Whiteboard
                </button>
              </div>

              {/* Send Question to Student */}
              <div className="mb-6">
                <h4 className="text-white font-light mb-3">Send Question to Student</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendQuestion()}
                    placeholder="Ask about their last match, technique, etc..."
                    className="flex-1 px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    onClick={handleSendQuestion}
                    className="px-6 py-3 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>

              {/* Shared Notes */}
              <div className="mb-6">
                <h4 className="text-white font-light mb-3">Session Notes ({studentNotes.length})</h4>
                <div className="space-y-3">
                  {studentNotes.length === 0 ? (
                    <div className="p-4 bg-black rounded-lg border border-gray-800 text-center text-gray-500">
                      No notes yet. Add your first session note below!
                    </div>
                  ) : (
                    studentNotes.map(note => (
                      <div key={note.id} className="p-4 bg-black rounded-lg border border-gray-800">
                        <div className="text-sm text-gray-400 mb-2">{note.date}</div>
                        <div className="text-white font-light mb-2">{note.title}</div>
                        <div className="text-gray-400 text-sm">{note.content}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Add New Note */}
              <div>
                <h4 className="text-white font-light mb-3">Add Session Note</h4>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Document today's session, observations, things to work on..."
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 mb-3"
                  rows="4"
                />
                <button
                  onClick={handleSaveNote}
                  className="px-6 py-3 bg-green-400 text-black rounded-lg hover:bg-green-300 transition-colors"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        );
      }

      // Coach view - list all students
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-light text-white">Student Notes & Communication</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map(student => (
              <div
                key={student.id}
                onClick={() => setSelectedNoteStudent(student)}
                className="bg-gray-900 rounded-xl border border-gray-800 p-6 hover:border-cyan-400/30 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-2xl">
                    {student.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-light">{student.name}</div>
                    <div className="text-gray-400 text-sm">View notes & chat</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Student view - original implementation
    return (
    <div className="space-y-4">
      <h2 className="text-2xl font-light text-white">Coach Communication</h2>
      
      {academy.connected && (
        <div className="bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-xl border border-cyan-400/30 p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{academy.emoji}</div>
            <div>
              <div className="text-white text-sm font-medium">{academy.name}</div>
              <div className="text-gray-400 text-xs">{academy.coaches.map(c => c.name).join(' · ')}</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-lg font-light text-white mb-4">Shared Notes</h3>
          <div className="space-y-3">
            {sessionNotes.map(note => (
              <div key={note.id} className="p-4 bg-black rounded-lg border border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-400">{note.date}</div>
                  {note.coach && <div className="text-xs text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">{note.coach}</div>}
                </div>
                <div className="text-white font-light mb-2">{note.title}</div>
                <div className="text-gray-400 text-sm">{note.content}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-lg font-light text-white mb-4">Coach Questions</h3>
          <div className="space-y-3">
            {coachQuestions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No questions from your coach yet</p>
              </div>
            ) : (
              coachQuestions.map(q => (
                <div key={q.id} className="p-4 bg-black rounded-lg border border-cyan-400/20">
                  <div className="text-white font-light mb-2">{q.question}</div>
                  <div className="text-xs text-gray-500 mb-3">{q.date}</div>
                  {q.response ? (
                    <div className="p-3 bg-green-400/10 border border-green-400/30 rounded-lg">
                      <div className="text-green-400 text-sm mb-1">✓ Response sent</div>
                      <div className="text-gray-400 text-sm">{q.response}</div>
                    </div>
                  ) : (
                    <div>
                      <textarea
                        placeholder="Type your response..."
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400 mb-2"
                        rows="3"
                        id={`q-response-${q.id}`}
                      />
                      <button
                        onClick={() => {
                          const el = document.getElementById(`q-response-${q.id}`);
                          const val = el?.value?.trim();
                          if (val) {
                            setCoachQuestions(prev => prev.map(cq => cq.id === q.id ? {...cq, response: val} : cq));
                          }
                        }}
                        className="w-full py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors text-sm font-medium"
                      >
                        Send Response
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )};

  const TeamChat = () => {
    const handleSendMessage = () => {
      if (chatMessage.trim() === '') return;
      
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      
      const newMessage = {
        id: teamChat.length + 1,
        user: 'You',
        message: chatMessage,
        time: timeString
      };
      
      setTeamChat([...teamChat, newMessage]);
      setChatMessage('');
      
      // Keep focus on input after sending
      setTimeout(() => {
        document.getElementById('chat-input')?.focus();
      }, 0);
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    };

    const addSticker = (sticker) => {
      setChatMessage(chatMessage + sticker);
      // Keep focus on input after adding sticker
      setTimeout(() => {
        document.getElementById('chat-input')?.focus();
      }, 0);
    };

    return (
    <div className="space-y-4">
      <h2 className="text-2xl font-light text-white">Team Chat</h2>
      <div className="bg-gray-900 rounded-xl border border-gray-800 h-[600px] flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {teamChat.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.user === 'You' ? 'flex-row-reverse' : ''}`}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                {msg.user[0]}
              </div>
              <div className={`flex-1 max-w-md ${msg.user === 'You' ? 'text-right' : ''}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-white font-light text-sm ${msg.user === 'You' ? 'order-2' : ''}`}>
                    {msg.user}
                  </span>
                  <span className={`text-gray-500 text-xs ${msg.user === 'You' ? 'order-1' : ''}`}>
                    {msg.time}
                  </span>
                </div>
                <div className={`inline-block px-4 py-2 rounded-2xl ${
                  msg.user === 'You' 
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black' 
                    : 'bg-gray-800 text-gray-300'
                }`}>
                  {msg.message}
                </div>
                {msg.user === 'You' && (
                  <div className="flex items-center justify-end gap-1 mt-0.5">
                    <CheckCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-xs text-gray-500">Read</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          {/* Typing indicator */}
          {teamChat.length > 0 && teamChat[teamChat.length - 1]?.user === 'You' && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xs font-medium flex-shrink-0">C</div>
              <div className="px-4 py-2 bg-gray-800 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-gray-800 p-4">
          <div className="flex gap-2 mb-3">
            <button 
              onClick={() => addSticker('🎾')}
              className="px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-xl"
            >
              🎾
            </button>
            <button 
              onClick={() => addSticker('💪')}
              className="px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-xl"
            >
              💪
            </button>
            <button 
              onClick={() => addSticker('🔥')}
              className="px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-xl"
            >
              🔥
            </button>
            <button 
              onClick={() => addSticker('⭐')}
              className="px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-xl"
            >
              ⭐
            </button>
            <button 
              onClick={() => addSticker('🏆')}
              className="px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-xl"
            >
              🏆
            </button>
            <button 
              onClick={() => addSticker('👏')}
              className="px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-xl"
            >
              👏
            </button>
            <button 
              onClick={() => addSticker('🎉')}
              className="px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-xl"
            >
              🎉
            </button>
            <button 
              onClick={() => addSticker('👍')}
              className="px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-xl"
            >
              👍
            </button>
          </div>
          <div className="flex gap-2">
            <input
              id="chat-input"
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Send encouragement to teammates..."
              className="flex-1 px-4 py-3 bg-black border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400"
              autoFocus
            />
            <button 
              onClick={handleSendMessage}
              className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-lg hover:from-cyan-300 hover:to-blue-400 transition-all font-medium"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )};

  const AchievementsView = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const categories = ['All', 'Beginner', 'Streaks', 'Practice', 'Matches', 'UTR', 'Social', 'Special'];
    
    const rarityColors = {
      common: 'from-gray-400 to-gray-600',
      uncommon: 'from-green-400 to-emerald-600',
      rare: 'from-blue-400 to-blue-600',
      epic: 'from-purple-400 to-purple-600',
      legendary: 'from-yellow-400 to-orange-600'
    };

    const rarityBorders = {
      common: 'border-gray-500/30',
      uncommon: 'border-green-400/30',
      rare: 'border-blue-400/30',
      epic: 'border-purple-400/30',
      legendary: 'border-yellow-400/30'
    };

    const rarityGlow = {
      common: '',
      uncommon: 'shadow-green-400/20',
      rare: 'shadow-blue-400/20',
      epic: 'shadow-purple-400/30',
      legendary: 'shadow-yellow-400/40'
    };

    const filteredAchievements = selectedCategory === 'All' 
      ? achievements 
      : achievements.filter(a => a.category === selectedCategory);

    const unlockedCount = achievements.filter(a => a.unlocked).length;
    const totalPoints = unlockedCount * 100;

    return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-light text-white mb-2 flex items-center gap-3">
            🏆 Achievement Wall
          </h2>
          <p className="text-gray-400">Unlock achievements and earn rewards!</p>
        </div>
        <div className="flex gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-xl border border-cyan-400/30">
            <div className="text-3xl font-light text-cyan-400">{unlockedCount}/{achievements.length}</div>
            <div className="text-xs text-gray-400 mt-1">Unlocked</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-xl border border-yellow-400/30">
            <div className="text-3xl font-light text-yellow-400">{totalPoints}</div>
            <div className="text-xs text-gray-400 mt-1">Points</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-white font-light">Overall Progress</span>
          <span className="text-cyan-400 font-medium">{((unlockedCount / achievements.length) * 100).toFixed(0)}%</span>
        </div>
        <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="absolute h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-500 shadow-lg shadow-cyan-400/50"
            style={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-medium'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAchievements.map(achievement => (
          <div 
            key={achievement.id}
            className={`relative p-5 rounded-xl border transition-all transform hover:scale-105 ${
              achievement.unlocked
                ? `bg-gradient-to-br ${rarityColors[achievement.rarity]}/20 ${rarityBorders[achievement.rarity]} shadow-lg ${rarityGlow[achievement.rarity]}`
                : 'bg-gray-900/50 border-gray-800 opacity-60'
            }`}
          >
            {/* Rarity Badge */}
            {achievement.unlocked && (
              <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${rarityColors[achievement.rarity]} text-white`}>
                {achievement.rarity}
              </div>
            )}

            {/* Icon */}
            <div className="text-center mb-3">
              <div className={`text-6xl mb-2 ${achievement.unlocked ? 'animate-bounce-slow' : 'grayscale'}`}>
                {achievement.unlocked ? achievement.icon : '🔒'}
              </div>
            </div>

            {/* Title & Description */}
            <div className="text-center mb-3">
              <div className={`text-lg font-light mb-1 ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
                {achievement.title}
              </div>
              <div className="text-xs text-gray-500">
                {achievement.description}
              </div>
            </div>

            {/* Progress Bar for Locked Achievements */}
            {!achievement.unlocked && achievement.progress !== undefined && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{achievement.progress}/{achievement.goal}</span>
                </div>
                <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="absolute h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    style={{ width: `${(achievement.progress / achievement.goal) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Unlocked Badge */}
            {achievement.unlocked && (
              <div className="text-center mt-3">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${rarityColors[achievement.rarity]} text-white`}>
                  ✓ Unlocked!
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Rarity Legend */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h3 className="text-white font-light mb-4">Rarity Levels</h3>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${rarityColors.common}`}></div>
            <span className="text-gray-400 text-sm">Common</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${rarityColors.uncommon}`}></div>
            <span className="text-gray-400 text-sm">Uncommon</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${rarityColors.rare}`}></div>
            <span className="text-gray-400 text-sm">Rare</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${rarityColors.epic}`}></div>
            <span className="text-gray-400 text-sm">Epic</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${rarityColors.legendary}`}></div>
            <span className="text-gray-400 text-sm">Legendary</span>
          </div>
        </div>
      </div>
    </div>
  );};

  const StudentsView = () => {
    if (selectedStudent) {
      return (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedStudent(null)}
            className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            Back to Students
          </button>

          {/* Student Detail View */}
          <div className="bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-xl border border-cyan-400/30 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-3xl">
                {selectedStudent.emoji}
              </div>
              <div>
                <h2 className="text-2xl font-light text-white">{selectedStudent.name}</h2>
                <p className="text-gray-400">{selectedStudent.email}</p>
                <p className="text-gray-500 text-sm">Last active: {selectedStudent.lastActive}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black/50 rounded-lg p-4">
                <div className="text-gray-400 text-sm">Current UTR</div>
                <div className="text-cyan-400 text-2xl font-light">{selectedStudent.currentUTR}</div>
              </div>
              <div className="bg-black/50 rounded-lg p-4">
                <div className="text-gray-400 text-sm">Goal UTR</div>
                <div className="text-white text-2xl font-light">{selectedStudent.goalUTR}</div>
              </div>
              <div className="bg-black/50 rounded-lg p-4">
                <div className="text-gray-400 text-sm">Matches</div>
                <div className="text-white text-2xl font-light">{selectedStudent.matches}</div>
              </div>
              <div className="bg-black/50 rounded-lg p-4">
                <div className="text-gray-400 text-sm">Practices</div>
                <div className="text-white text-2xl font-light">{selectedStudent.practices}</div>
              </div>
            </div>
          </div>

          {/* Student's Matches and Practices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="text-lg font-light text-white mb-4">Recent Matches</h3>
              <div className="space-y-3">
                {matches.slice(0, 3).map(m => (
                  <div key={m.id} className="p-3 bg-black rounded-lg border border-gray-800">
                    <div className="flex justify-between items-start mb-1">
                      <div className="text-white text-sm">vs {m.opponent}</div>
                      <div className={`text-xs px-2 py-0.5 rounded ${m.result === 'Win' ? 'bg-green-400/20 text-green-400' : 'bg-red-400/20 text-red-400'}`}>
                        {m.result}
                      </div>
                    </div>
                    <div className="text-gray-400 text-xs">{m.date}</div>
                    <div className="text-cyan-400 text-sm mt-1">{m.score}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="text-lg font-light text-white mb-4">Recent Practices</h3>
              <div className="space-y-3">
                {practices.slice(0, 3).map(p => (
                  <div key={p.id} className="p-3 bg-black rounded-lg border border-gray-800">
                    <div className="text-white text-sm">{p.type}</div>
                    <div className="text-gray-400 text-xs">{p.date} at {p.time}</div>
                    {p.focusAreas && p.focusAreas.length > 0 && (
                      <div className="flex gap-1 flex-wrap mt-2">
                        {p.focusAreas.map(area => (
                          <span key={area} className="px-1.5 py-0.5 bg-cyan-400/10 text-cyan-400 text-xs rounded">
                            {area}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-light text-white">My Students</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map(student => (
            <div
              key={student.id}
              onClick={() => setSelectedStudent(student)}
              className="bg-gray-900 rounded-xl border border-gray-800 p-6 hover:border-cyan-400/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-2xl">
                  {student.emoji}
                </div>
                <div className="flex-1">
                  <div className="text-white font-light">{student.name}</div>
                  <div className="text-gray-400 text-sm">{student.email}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-black rounded-lg p-2">
                  <div className="text-gray-500 text-xs">UTR</div>
                  <div className="text-cyan-400 font-light">{student.currentUTR}</div>
                </div>
                <div className="bg-black rounded-lg p-2">
                  <div className="text-gray-500 text-xs">Goal</div>
                  <div className="text-white font-light">{student.goalUTR}</div>
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{student.matches} matches</span>
                <span className="text-gray-400">{student.practices} practices</span>
              </div>

              <div className="text-gray-500 text-xs mt-3">Last active: {student.lastActive}</div>
            </div>
          ))}
        </div>

        {students.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-400">No students connected yet</p>
            <p className="text-gray-500 text-sm mt-2">Share your coach code with students to get started</p>
          </div>
        )}
      </div>
    );
  };

  const NotificationsView = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-light text-white">Notifications</h2>
      
      {notifications.length === 0 ? (
        <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-800">
          <div className="text-6xl mb-4">🔔</div>
          <p className="text-gray-400">No notifications yet</p>
          <p className="text-gray-500 text-sm mt-2">You'll see updates when students log matches and practices</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(notif => (
            <div key={notif.id} className="bg-gray-900 rounded-xl border border-gray-800 p-4 hover:border-cyan-400/30 transition-all">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                  notif.type === 'match' ? 'bg-green-400/20' : 'bg-blue-400/20'
                }`}>
                  {notif.type === 'match' ? '🎾' : '💪'}
                </div>
                <div className="flex-1">
                  <div className="text-white font-light">{notif.message}</div>
                  <div className="text-gray-500 text-sm mt-1">
                    {notif.date} at {notif.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const SettingsView = () => {
    const [editMode, setEditMode] = useState({
      username: false,
      password: false,
      emoji: false,
      badges: false
    });

    const [tempSettings, setTempSettings] = useState({
      username: userSettings.username || playerInfo.name || 'User',
      newPassword: '',
      confirmPassword: ''
    });

    const emojiOptions = ['👤', '😀', '😎', '🎾', '⚡', '🔥', '⭐', '🏆', '💪', '🚀', '🎯', '👑', '💎', '🌟', '⚽', '🏀', '⚾', '🎸', '🎮', '🐶', '🐱', '🦁', '🐯'];

    const unlockedAchievements = achievements.filter(a => a.unlocked);

    const toggleBadge = (achievementId) => {
      const currentBadges = userSettings.displayBadges || [];
      
      if (currentBadges.includes(achievementId)) {
        // Remove badge
        setUserSettings({
          ...userSettings,
          displayBadges: currentBadges.filter(id => id !== achievementId)
        });
      } else {
        // Add badge (max 3)
        if (currentBadges.length >= 3) {
          alert('You can only display 3 badges at a time. Remove one first!');
          return;
        }
        setUserSettings({
          ...userSettings,
          displayBadges: [...currentBadges, achievementId]
        });
      }
    };

    const handleSaveUsername = () => {
      setUserSettings({...userSettings, username: tempSettings.username});
      setPlayerInfo({...playerInfo, name: tempSettings.username});
      setEditMode({...editMode, username: false});
    };

    const handleSavePassword = () => {
      if (tempSettings.newPassword !== tempSettings.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      if (tempSettings.newPassword.length < 6) {
        alert('Password must be at least 6 characters');
        return;
      }
      setLoginForm({...loginForm, password: tempSettings.newPassword});
      setTempSettings({...tempSettings, newPassword: '', confirmPassword: ''});
      setEditMode({...editMode, password: false});
      alert('Password updated successfully!');
    };

    const handleSelectEmoji = (emoji) => {
      setUserSettings({...userSettings, profileEmoji: emoji});
      setEditMode({...editMode, emoji: false});
    };

    const copyCoachCode = () => {
      try {
        navigator.clipboard.writeText(academy.code);
        alert('Academy code copied to clipboard!');
      } catch(e) {
        alert('Academy code: ' + academy.code);
      }
    };

    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-light text-white">Settings</h2>

        {/* Profile Section */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-xl font-light text-white mb-6 flex items-center gap-2">
            👤 Profile Settings
          </h3>

          {/* Profile Emoji */}
          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-3">Profile Picture</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-4xl">
                {userSettings.profileEmoji}
              </div>
              {!editMode.emoji ? (
                <button
                  onClick={() => setEditMode({...editMode, emoji: true})}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Change Emoji
                </button>
              ) : (
                <button
                  onClick={() => setEditMode({...editMode, emoji: false})}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>

            {editMode.emoji && (
              <div className="mt-4 p-4 bg-black rounded-lg border border-gray-700">
                <div className="grid grid-cols-8 gap-2">
                  {emojiOptions.map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => handleSelectEmoji(emoji)}
                      className={`text-3xl p-2 rounded-lg hover:bg-gray-800 transition-colors ${
                        userSettings.profileEmoji === emoji ? 'bg-cyan-400/20 ring-2 ring-cyan-400' : ''
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Badges */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <div>
                <label className="block text-gray-400 text-sm">Profile Badges</label>
                <p className="text-gray-500 text-xs mt-1">Choose up to 3 achievements to display on your profile ({userSettings.displayBadges?.length || 0}/3)</p>
              </div>
              {!editMode.badges ? (
                <button
                  onClick={() => setEditMode({...editMode, badges: true})}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  Manage Badges
                </button>
              ) : (
                <button
                  onClick={() => setEditMode({...editMode, badges: false})}
                  className="px-4 py-2 bg-green-400 text-black rounded-lg hover:bg-green-300 transition-colors text-sm"
                >
                  Done
                </button>
              )}
            </div>

            {/* Display current badges */}
            {!editMode.badges && (
              <div className="flex gap-3">
                {(userSettings.displayBadges || []).length === 0 ? (
                  <div className="text-gray-500 text-sm">No badges selected</div>
                ) : (
                  (userSettings.displayBadges || []).map(badgeId => {
                    const achievement = achievements.find(a => a.id === badgeId);
                    if (!achievement) return null;
                    return (
                      <div key={badgeId} className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 rounded-lg">
                        <span className="text-2xl">{achievement.icon}</span>
                        <span className="text-yellow-400 text-sm">{achievement.title}</span>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* Badge selection modal */}
            {editMode.badges && (
              <div className="mt-4 p-4 bg-black rounded-lg border border-gray-700">
                <h4 className="text-white text-sm mb-3">Select Your Badges (Unlocked Only)</h4>
                {unlockedAchievements.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No achievements unlocked yet</p>
                    <p className="text-sm mt-1">Unlock achievements to display them as badges!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto">
                    {unlockedAchievements.map(achievement => {
                      const isSelected = (userSettings.displayBadges || []).includes(achievement.id);
                      return (
                        <button
                          key={achievement.id}
                          onClick={() => toggleBadge(achievement.id)}
                          className={`p-3 rounded-lg border transition-all ${
                            isSelected
                              ? 'bg-gradient-to-br from-yellow-400/30 to-orange-500/30 border-yellow-400/50 ring-2 ring-yellow-400'
                              : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          <div className="text-3xl mb-1 text-center">{achievement.icon}</div>
                          <div className="text-xs text-center text-yellow-400">{achievement.title}</div>
                          {isSelected && (
                            <div className="text-center text-xs text-yellow-400 mt-1">✓ Selected</div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Username */}
          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2">Username / Display Name</label>
            {!editMode.username ? (
              <div className="flex items-center gap-3">
                <div className="flex-1 px-4 py-3 bg-black border border-gray-700 rounded-lg text-white">
                  {tempSettings.username}
                </div>
                <button
                  onClick={() => setEditMode({...editMode, username: true})}
                  className="px-4 py-3 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors"
                >
                  Edit
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={tempSettings.username}
                  onChange={(e) => setTempSettings({...tempSettings, username: e.target.value})}
                  className="flex-1 px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  autoFocus
                />
                <button
                  onClick={handleSaveUsername}
                  className="px-4 py-3 bg-green-400 text-black rounded-lg hover:bg-green-300 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode({...editMode, username: false})}
                  className="px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Email (Read-only) */}
          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2">Email</label>
            <div className="px-4 py-3 bg-black border border-gray-700 rounded-lg text-gray-500">
              {loginForm.email}
            </div>
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Password</label>
            {!editMode.password ? (
              <div className="flex items-center gap-3">
                <div className="flex-1 px-4 py-3 bg-black border border-gray-700 rounded-lg text-white">
                  ••••••••
                </div>
                <button
                  onClick={() => setEditMode({...editMode, password: true})}
                  className="px-4 py-3 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors"
                >
                  Change Password
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="password"
                  placeholder="New password"
                  value={tempSettings.newPassword}
                  onChange={(e) => setTempSettings({...tempSettings, newPassword: e.target.value})}
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={tempSettings.confirmPassword}
                  onChange={(e) => setTempSettings({...tempSettings, confirmPassword: e.target.value})}
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleSavePassword}
                    className="px-4 py-3 bg-green-400 text-black rounded-lg hover:bg-green-300 transition-colors"
                  >
                    Save Password
                  </button>
                  <button
                    onClick={() => {
                      setEditMode({...editMode, password: false});
                      setTempSettings({...tempSettings, newPassword: '', confirmPassword: ''});
                    }}
                    className="px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Academy Code Section - For Coaches */}
        {userRole === 'coach' && (
          <div className="bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-xl border border-cyan-400/30 p-6">
            <h3 className="text-xl font-light text-white mb-4 flex items-center gap-2">
              🎾 Academy Code
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Share this code with students and parents so they can join your academy
            </p>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 px-6 py-4 bg-black border border-cyan-400/30 rounded-lg">
                <div className="text-cyan-400 text-2xl font-mono font-bold tracking-wider text-center">
                  {academy.code}
                </div>
              </div>
              <button
                onClick={copyCoachCode}
                className="px-6 py-4 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors font-medium"
              >
                Copy Code
              </button>
            </div>

            <div className="p-4 bg-cyan-400/5 rounded-lg border border-cyan-400/20">
              <p className="text-cyan-400 text-sm">
                💡 <strong>How it works:</strong> Students and parents enter this code during signup to automatically join {academy.name}
              </p>
            </div>
          </div>
        )}

        {/* Account Info */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h3 className="text-xl font-light text-white mb-4">Account Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Account Type</span>
              <span className="text-white capitalize">{userRole}</span>
            </div>
            {playerInfo.dob && (
              <div className="flex justify-between">
                <span className="text-gray-400">Date of Birth</span>
                <span className="text-white">{playerInfo.dob}</span>
              </div>
            )}
            {playerInfo.city && (
              <div className="flex justify-between">
                <span className="text-gray-400">Location</span>
                <span className="text-white">{playerInfo.city}, {playerInfo.state}</span>
              </div>
            )}
            {playerInfo.ustaNumber && (
              <div className="flex justify-between">
                <span className="text-gray-400">USTA Number</span>
                <span className="text-white">{playerInfo.ustaNumber}</span>
              </div>
            )}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-900/20 rounded-xl border border-red-500/30 p-6">
          <h3 className="text-xl font-light text-red-400 mb-4">Danger Zone</h3>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    );
  };

  const JournalView = () => {
    const [entries, setEntries] = useState([
      { id: 1, date: '2026-01-15', mood: '😊', title: 'Great practice today', content: 'Worked on my serve toss and it felt much more consistent. Coach said my forehand is improving too.', tags: ['Serve', 'Forehand'] },
      { id: 2, date: '2026-01-12', mood: '😤', title: 'Tough loss but learned a lot', content: 'Lost to Sarah in 3 sets. Need to stay focused during tiebreaks. My backhand broke down under pressure.', tags: ['Match', 'Mental Game'] },
    ]);
    const [showNewEntry, setShowNewEntry] = useState(false);
    const [newEntry, setNewEntry] = useState({ mood: '😊', title: '', content: '', tags: [] });

    const moodOptions = ['😊', '😤', '😎', '🤔', '💪', '😴', '🔥', '😰'];
    const tagOptions = ['Serve', 'Forehand', 'Backhand', 'Volley', 'Mental Game', 'Fitness', 'Match', 'Tournament'];

    const handleAddEntry = () => {
      if (!newEntry.title || !newEntry.content) return;
      const entry = {
        id: entries.length + 1,
        date: new Date().toISOString().split('T')[0],
        ...newEntry
      };
      setEntries([entry, ...entries]);
      setNewEntry({ mood: '😊', title: '', content: '', tags: [] });
      setShowNewEntry(false);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-light text-white">Tennis Journal</h2>
            <p className="text-gray-400 mt-1">Reflect on your journey</p>
          </div>
          <button
            onClick={() => setShowNewEntry(true)}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Entry
          </button>
        </div>

        {showNewEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-y-auto">
            <div className="min-h-full flex items-start justify-center p-4 py-8">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-light text-white">New Journal Entry</h3>
                <button onClick={() => setShowNewEntry(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">How are you feeling?</label>
                  <div className="flex gap-2">
                    {moodOptions.map(m => (
                      <button
                        key={m}
                        onClick={() => setNewEntry({...newEntry, mood: m})}
                        className={`text-3xl p-2 rounded-lg transition-all ${newEntry.mood === m ? 'bg-cyan-400/20 ring-2 ring-cyan-400 scale-110' : 'hover:bg-gray-800'}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Title</label>
                  <input
                    type="text"
                    value={newEntry.title}
                    onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                    placeholder="What happened today?"
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Your thoughts</label>
                  <textarea
                    value={newEntry.content}
                    onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                    placeholder="Write about your practice, match, or anything tennis-related..."
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                    rows="5"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {tagOptions.map(tag => (
                      <button
                        key={tag}
                        onClick={() => {
                          const tags = newEntry.tags.includes(tag)
                            ? newEntry.tags.filter(t => t !== tag)
                            : [...newEntry.tags, tag];
                          setNewEntry({...newEntry, tags});
                        }}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${
                          newEntry.tags.includes(tag)
                            ? 'bg-cyan-400 text-black'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddEntry}
                    className="flex-1 py-3 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors font-medium"
                  >
                    Save Entry
                  </button>
                  <button
                    onClick={() => setShowNewEntry(false)}
                    className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {entries.map(entry => (
            <div key={entry.id} className="bg-gray-900 rounded-xl border border-gray-800 p-6 hover:border-cyan-400/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{entry.mood}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white text-lg font-light">{entry.title}</h3>
                    <span className="text-gray-500 text-sm">{new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{entry.content}</p>
                  <div className="flex gap-2 flex-wrap">
                    {entry.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-cyan-400/10 text-cyan-400 text-xs rounded-full border border-cyan-400/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const MediaView = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-light text-white">Shared Media</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors">
          <Plus className="w-4 h-4" />
          Upload
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="aspect-square bg-gray-900 rounded-xl border border-gray-800 hover:border-cyan-400/30 transition-all cursor-pointer flex items-center justify-center">
            <Image className="w-12 h-12 text-gray-700" />
          </div>
        ))}
      </div>
    </div>
  );

  // Bottom Nav Component for mobile
  const BottomNav = () => {
    const playerTabs = [
      { icon: <Target className="w-5 h-5" />, label: 'Home', view: 'dashboard' },
      { icon: <Calendar className="w-5 h-5" />, label: 'Calendar', view: 'calendar' },
      { icon: <Trophy className="w-5 h-5" />, label: 'Matches', view: 'matches' },
      { icon: <Star className="w-5 h-5" />, label: 'Goals', view: 'goals' },
      { icon: <Settings className="w-5 h-5" />, label: 'More', view: 'more' },
    ];
    const coachTabs = [
      { icon: <Target className="w-5 h-5" />, label: 'Home', view: 'dashboard' },
      { icon: <Users className="w-5 h-5" />, label: 'Students', view: 'students' },
      { icon: <MessageSquare className="w-5 h-5" />, label: 'Notes', view: 'notes' },
      { icon: <Bell className="w-5 h-5" />, label: 'Alerts', view: 'notifications' },
      { icon: <Settings className="w-5 h-5" />, label: 'More', view: 'more' },
    ];
    const parentTabs = [
      { icon: <Target className="w-5 h-5" />, label: 'Home', view: 'dashboard' },
      { icon: <Calendar className="w-5 h-5" />, label: 'Calendar', view: 'calendar' },
      { icon: <Trophy className="w-5 h-5" />, label: 'Matches', view: 'matches' },
      { icon: <Star className="w-5 h-5" />, label: 'Expenses', view: 'expenses' },
      { icon: <Settings className="w-5 h-5" />, label: 'More', view: 'more' },
    ];
    const tabs = userRole === 'coach' ? coachTabs : userRole === 'parent' ? parentTabs : playerTabs;

    return (
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 z-40 px-1 pb-1 pt-1">
        <div className="flex justify-around">
          {tabs.map(tab => (
            <button
              key={tab.view}
              onClick={() => {
                if (tab.view === 'more') setShowMoreMenu(prev => !prev);
                else { setActiveView(tab.view); setShowMoreMenu(false); }
              }}
              className={`flex flex-col items-center py-1.5 px-2 rounded-lg transition-all ${
                activeView === tab.view ? 'text-cyan-400' : 'text-gray-500'
              }`}
            >
              {tab.icon}
              <span className="text-xs mt-0.5">{tab.label}</span>
            </button>
          ))}
        </div>
        {/* More menu overlay */}
        {showMoreMenu && (
          <div className="absolute bottom-full left-0 right-0 bg-gray-900 border-t border-gray-800 p-3 mb-0 rounded-t-xl shadow-xl">
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: '🎾', label: 'Matches', view: 'matches' },
                { icon: '📅', label: 'Calendar', view: 'calendar' },
                { icon: '⭐', label: 'Achievements', view: 'achievements' },
                { icon: '📓', label: 'Journal', view: 'journal' },
                { icon: '💬', label: 'Team Chat', view: 'chat' },
                { icon: '📝', label: 'Coach Notes', view: 'notes' },
                { icon: '🎯', label: 'Goals', view: 'goals' },
                { icon: '🔍', label: 'Scouting', view: 'scouting' },
                { icon: '👤', label: 'Profile', view: 'profile' },
                { icon: '📸', label: 'Media', view: 'media' },
                { icon: '💪', label: 'Warmup', view: 'warmup' },
                ...(userRole === 'parent' ? [{ icon: '💰', label: 'Expenses', view: 'expenses' }] : []),
                ...(userRole === 'coach' ? [{ icon: '📋', label: 'Drills', view: 'drills' }, { icon: '🗓', label: 'Scheduler', view: 'scheduler' }] : []),
                ...(userRole !== 'coach' ? [{ icon: '🗓', label: 'Book Lesson', view: 'scheduler' }] : []),
                { icon: '⚙️', label: 'Settings', view: 'settings' },
              ].map(item => (
                <button
                  key={item.view}
                  onClick={() => { setActiveView(item.view); setShowMoreMenu(false); }}
                  className={`flex flex-col items-center p-3 rounded-lg transition-all ${
                    activeView === item.view ? 'bg-cyan-400/10 text-cyan-400' : 'text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  <span className="text-xl mb-1">{item.icon}</span>
                  <span className="text-xs">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Weekly Goals & Season Goals View
  const GoalsView = () => {
    const [newGoalText, setNewGoalText] = useState('');
    const [newGoalFocus, setNewGoalFocus] = useState('');
    const [goalTab, setGoalTab] = useState('weekly');
    const [showAddSeasonGoal, setShowAddSeasonGoal] = useState(false);
    const [newSeasonGoal, setNewSeasonGoal] = useState({ title: '', target: '', deadline: '', icon: '🎯' });

    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-light text-white">Goals</h2>
        
        {/* Tab switch */}
        <div className="flex gap-2 p-1 bg-gray-900 rounded-lg border border-gray-800">
          <button onClick={() => setGoalTab('weekly')} className={`flex-1 py-2 rounded-lg text-sm transition-all ${goalTab === 'weekly' ? 'bg-cyan-400 text-black font-medium' : 'text-gray-400'}`}>This Week</button>
          <button onClick={() => setGoalTab('season')} className={`flex-1 py-2 rounded-lg text-sm transition-all ${goalTab === 'season' ? 'bg-cyan-400 text-black font-medium' : 'text-gray-400'}`}>Season Goals</button>
        </div>

        {goalTab === 'weekly' && (
          <div className="space-y-4">
            {/* Add weekly goal */}
            <div className="flex gap-2">
              <input
                value={newGoalText}
                onChange={e => setNewGoalText(e.target.value)}
                placeholder="Add a goal for this week..."
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400"
                onKeyDown={e => {
                  if (e.key === 'Enter' && newGoalText.trim()) {
                    setWeeklyGoals(prev => [...prev, { id: Date.now(), text: newGoalText.trim(), completed: false, focusArea: newGoalFocus || 'General' }]);
                    setNewGoalText(''); setNewGoalFocus('');
                  }
                }}
              />
              <button
                onClick={() => {
                  if (newGoalText.trim()) {
                    setWeeklyGoals(prev => [...prev, { id: Date.now(), text: newGoalText.trim(), completed: false, focusArea: newGoalFocus || 'General' }]);
                    setNewGoalText(''); setNewGoalFocus('');
                  }
                }}
                className="px-4 py-3 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            {/* Focus area tags for new goal */}
            <div className="flex flex-wrap gap-1">
              {focusAreaOptions.map(area => (
                <button key={area} onClick={() => setNewGoalFocus(area)} className={`px-2 py-1 rounded text-xs transition-all ${newGoalFocus === area ? 'bg-cyan-400 text-black' : 'bg-gray-800 text-gray-500'}`}>{area}</button>
              ))}
            </div>

            {/* Progress summary */}
            <div className="p-4 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 border border-cyan-400/30 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Weekly Progress</span>
                <span className="text-cyan-400 font-light text-lg">{weeklyGoals.filter(g => g.completed).length}/{weeklyGoals.length}</span>
              </div>
              <div className="mt-2 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all" style={{ width: `${weeklyGoals.length > 0 ? (weeklyGoals.filter(g => g.completed).length / weeklyGoals.length * 100) : 0}%` }} />
              </div>
            </div>

            {/* Goals list */}
            <div className="space-y-2">
              {weeklyGoals.map(goal => (
                <div key={goal.id} className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${goal.completed ? 'bg-green-400/5 border-green-400/20' : 'bg-gray-900 border-gray-800'}`}>
                  <button
                    onClick={() => setWeeklyGoals(prev => prev.map(g => g.id === goal.id ? {...g, completed: !g.completed} : g))}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${goal.completed ? 'border-green-400 bg-green-400 text-black' : 'border-gray-600'}`}
                  >
                    {goal.completed && '✓'}
                  </button>
                  <div className="flex-1">
                    <div className={`text-sm ${goal.completed ? 'text-gray-500 line-through' : 'text-white'}`}>{goal.text}</div>
                    {goal.progress !== undefined && (
                      <div className="text-xs text-gray-500 mt-1">{goal.progress}/{goal.goal} completed</div>
                    )}
                  </div>
                  <span className="px-2 py-0.5 bg-cyan-400/10 text-cyan-400 text-xs rounded">{goal.focusArea}</span>
                  <button onClick={() => setWeeklyGoals(prev => prev.filter(g => g.id !== goal.id))} className="text-gray-600 hover:text-red-400 text-sm">✕</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {goalTab === 'season' && (
          <div className="space-y-4">
            <button
              onClick={() => setShowAddSeasonGoal(true)}
              className="w-full py-3 flex items-center justify-center gap-2 bg-gray-900 border border-dashed border-gray-700 rounded-xl text-gray-400 hover:border-cyan-400/50 hover:text-cyan-400 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Season Goal
            </button>

            {seasonGoals.map(goal => {
              const pct = goal.target > 0 ? Math.min((goal.current / goal.target) * 100, 100) : 0;
              const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
              return (
                <div key={goal.id} className="bg-gray-900 rounded-xl border border-gray-800 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{goal.icon}</span>
                      <div>
                        <div className="text-white font-light">{goal.title}</div>
                        <div className="text-xs text-gray-500">{daysLeft > 0 ? `${daysLeft} days left` : 'Past deadline'}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-cyan-400 font-light">{typeof goal.current === 'number' && goal.current % 1 !== 0 ? goal.current.toFixed(2) : goal.current}</div>
                      <div className="text-xs text-gray-500">of {typeof goal.target === 'number' && goal.target % 1 !== 0 ? goal.target.toFixed(1) : goal.target}</div>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${pct >= 100 ? 'bg-green-400' : pct >= 50 ? 'bg-cyan-400' : 'bg-blue-500'}`} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="text-right mt-1 text-xs text-gray-500">{pct.toFixed(0)}%</div>
                </div>
              );
            })}

            {/* Add season goal modal */}
            {showAddSeasonGoal && (
              <div className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-y-auto">
                <div className="min-h-full flex items-start justify-center p-4 py-8">
                <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 max-w-md w-full">
                  <h3 className="text-xl font-light text-white mb-4">Add Season Goal</h3>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      {['🎯','🏆','⏱','🥇','🌪','💪','📈','🎾'].map(e => (
                        <button key={e} onClick={() => setNewSeasonGoal({...newSeasonGoal, icon: e})} className={`text-xl p-1 rounded ${newSeasonGoal.icon === e ? 'bg-cyan-400/20 ring-1 ring-cyan-400' : ''}`}>{e}</button>
                      ))}
                    </div>
                    <input value={newSeasonGoal.title} onChange={e => setNewSeasonGoal({...newSeasonGoal, title: e.target.value})} placeholder="Goal title" className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400" />
                    <input type="number" value={newSeasonGoal.target} onChange={e => setNewSeasonGoal({...newSeasonGoal, target: e.target.value})} placeholder="Target number" className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400" />
                    <input type="date" value={newSeasonGoal.deadline} onChange={e => setNewSeasonGoal({...newSeasonGoal, deadline: e.target.value})} className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400" style={{ colorScheme: 'dark' }} />
                    <div className="flex gap-2">
                      <button onClick={() => {
                        if (newSeasonGoal.title && newSeasonGoal.target) {
                          setSeasonGoals(prev => [...prev, { id: Date.now(), ...newSeasonGoal, type: 'custom', current: 0, target: Number(newSeasonGoal.target) }]);
                          setNewSeasonGoal({ title: '', target: '', deadline: '', icon: '🎯' });
                          setShowAddSeasonGoal(false);
                        }
                      }} className="flex-1 py-3 bg-cyan-400 text-black rounded-lg font-medium">Save</button>
                      <button onClick={() => setShowAddSeasonGoal(false)} className="px-6 py-3 bg-gray-800 text-white rounded-lg">Cancel</button>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Opponent Scouting View
  const ScoutingView = () => {
    const [selectedOpp, setSelectedOpp] = useState(null);
    const [showAddOpponent, setShowAddOpponent] = useState(false);
    const [newOpp, setNewOpp] = useState({ name: '', strengths: '', weaknesses: '', notes: '', rating: '' });

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-light text-white">Opponent Scouting</h2>
          <button onClick={() => setShowAddOpponent(true)} className="flex items-center gap-2 px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        {!selectedOpp ? (
          <div className="space-y-3">
            {opponents.map(opp => {
              const h2hMatches = matches.filter(m => m.opponent === opp.name);
              const wins = h2hMatches.filter(m => m.result === 'Win').length;
              const losses = h2hMatches.filter(m => m.result === 'Loss').length;
              return (
                <div key={opp.id} onClick={() => setSelectedOpp(opp)} className="bg-gray-900 rounded-xl border border-gray-800 p-5 hover:border-cyan-400/30 cursor-pointer transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-light text-lg">{opp.name}</div>
                      {opp.rating && <div className="text-gray-500 text-xs mt-0.5">UTR ~{opp.rating}</div>}
                    </div>
                    <div className="flex items-center gap-3">
                      {h2hMatches.length > 0 && (
                        <div className="text-sm">
                          <span className="text-green-400">{wins}W</span>
                          <span className="text-gray-600 mx-1">-</span>
                          <span className="text-red-400">{losses}L</span>
                        </div>
                      )}
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            <button onClick={() => setSelectedOpp(null)} className="text-cyan-400 text-sm flex items-center gap-1">
              <ChevronRight className="w-4 h-4 rotate-180" /> Back to all opponents
            </button>

            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-light text-white">{selectedOpp.name}</h3>
                  {selectedOpp.rating && <div className="text-gray-500 text-sm">UTR ~{selectedOpp.rating}</div>}
                </div>
                {(() => {
                  const h2h = matches.filter(m => m.opponent === selectedOpp.name);
                  const w = h2h.filter(m => m.result === 'Win').length;
                  const l = h2h.filter(m => m.result === 'Loss').length;
                  return h2h.length > 0 ? (
                    <div className="text-center">
                      <div className="text-lg"><span className="text-green-400">{w}W</span> - <span className="text-red-400">{l}L</span></div>
                      <div className="text-xs text-gray-500">Head to Head</div>
                    </div>
                  ) : null;
                })()}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-green-400/5 border border-green-400/20 rounded-xl">
                  <div className="text-green-400 text-sm font-medium mb-2">Strengths</div>
                  <div className="space-y-1">
                    {selectedOpp.strengths.map((s, i) => <div key={i} className="text-gray-300 text-sm flex items-center gap-2"><span className="text-green-400">+</span> {s}</div>)}
                  </div>
                </div>
                <div className="p-4 bg-red-400/5 border border-red-400/20 rounded-xl">
                  <div className="text-red-400 text-sm font-medium mb-2">Weaknesses</div>
                  <div className="space-y-1">
                    {selectedOpp.weaknesses.map((w, i) => <div key={i} className="text-gray-300 text-sm flex items-center gap-2"><span className="text-red-400">-</span> {w}</div>)}
                  </div>
                </div>
              </div>

              {selectedOpp.notes && (
                <div className="p-4 bg-cyan-400/5 border border-cyan-400/20 rounded-xl mb-4">
                  <div className="text-cyan-400 text-sm font-medium mb-1">Game Plan Notes</div>
                  <div className="text-gray-300 text-sm">{selectedOpp.notes}</div>
                </div>
              )}

              {/* Match history vs this opponent */}
              <div>
                <div className="text-gray-400 text-sm font-medium mb-2">Match History</div>
                <div className="space-y-2">
                  {matches.filter(m => m.opponent === selectedOpp.name).sort((a,b) => new Date(b.date) - new Date(a.date)).map(m => (
                    <div key={m.id} className={`flex items-center justify-between p-3 rounded-lg border ${m.result === 'Win' ? 'bg-green-400/5 border-green-400/20' : 'bg-red-400/5 border-red-400/20'}`}>
                      <div className="text-gray-400 text-sm">{new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-300 text-sm">{m.score}</span>
                        <span className={`text-sm font-medium ${m.result === 'Win' ? 'text-green-400' : 'text-red-400'}`}>{m.result}</span>
                      </div>
                    </div>
                  ))}
                  {matches.filter(m => m.opponent === selectedOpp.name).length === 0 && (
                    <div className="text-center py-4 text-gray-500 text-sm">No matches recorded</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Opponent Modal */}
        {showAddOpponent && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-y-auto">
            <div className="min-h-full flex items-start justify-center p-4 py-8">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 max-w-md w-full">
              <h3 className="text-xl font-light text-white mb-4">Add Opponent</h3>
              <div className="space-y-3">
                <input value={newOpp.name} onChange={e => setNewOpp({...newOpp, name: e.target.value})} placeholder="Name" className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400" />
                <input value={newOpp.rating} onChange={e => setNewOpp({...newOpp, rating: e.target.value})} placeholder="Estimated UTR (optional)" className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400" />
                <textarea value={newOpp.strengths} onChange={e => setNewOpp({...newOpp, strengths: e.target.value})} placeholder="Strengths (one per line)" rows="3" className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 text-sm" />
                <textarea value={newOpp.weaknesses} onChange={e => setNewOpp({...newOpp, weaknesses: e.target.value})} placeholder="Weaknesses (one per line)" rows="3" className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 text-sm" />
                <textarea value={newOpp.notes} onChange={e => setNewOpp({...newOpp, notes: e.target.value})} placeholder="Game plan notes" rows="2" className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 text-sm" />
                <div className="flex gap-2">
                  <button onClick={() => {
                    if (newOpp.name) {
                      setOpponents(prev => [...prev, {
                        id: Date.now(), name: newOpp.name, rating: newOpp.rating ? Number(newOpp.rating) : null,
                        strengths: newOpp.strengths.split('\n').filter(Boolean), weaknesses: newOpp.weaknesses.split('\n').filter(Boolean), notes: newOpp.notes
                      }]);
                      setNewOpp({ name: '', strengths: '', weaknesses: '', notes: '', rating: '' });
                      setShowAddOpponent(false);
                    }
                  }} className="flex-1 py-3 bg-cyan-400 text-black rounded-lg font-medium">Save</button>
                  <button onClick={() => setShowAddOpponent(false)} className="px-6 py-3 bg-gray-800 text-white rounded-lg">Cancel</button>
                </div>
              </div>
            </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Profile View
  const ProfileView = () => {
    // Coach Profile - simple and clean
    if (userRole === 'coach') {
      const totalStudentMatches = students.reduce((sum, s) => sum + (s.matches || 0), 0);
      const totalStudentWins = students.reduce((sum, s) => sum + (s.wins || Math.round((s.matches || 0) * 0.65)), 0);
      const teamWinRate = totalStudentMatches > 0 ? ((totalStudentWins / totalStudentMatches) * 100).toFixed(0) : 0;

      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-light text-white">Coach Profile</h2>

          {/* Profile Card */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-cyan-400/10 rounded-2xl border border-gray-800 p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl">{userSettings.profileEmoji}</div>
              <div>
                <div className="text-2xl font-light text-white">{userSettings.username || 'Coach'}</div>
                <div className="text-cyan-400 text-sm">Tennis Coach</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-black/40 rounded-xl">
                <div className="text-2xl font-light text-cyan-400">{students.length}</div>
                <div className="text-xs text-gray-500">Students</div>
              </div>
              <div className="text-center p-3 bg-black/40 rounded-xl">
                <div className="text-2xl font-light text-green-400">{totalStudentMatches}</div>
                <div className="text-xs text-gray-500">Team Matches</div>
              </div>
              <div className="text-center p-3 bg-black/40 rounded-xl">
                <div className="text-2xl font-light text-blue-400">{teamWinRate}%</div>
                <div className="text-xs text-gray-500">Team Win Rate</div>
              </div>
            </div>
          </div>

          {/* Academy Info */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
            <h3 className="text-white font-light mb-3">Academy</h3>
            <div className="flex items-center gap-3 mb-4 p-3 bg-black rounded-lg border border-gray-800">
              <div className="text-3xl">{academy.emoji}</div>
              <div>
                <div className="text-white font-light">{academy.name}</div>
                <div className="text-gray-500 text-xs">{academy.location}</div>
              </div>
            </div>
            <div className="text-gray-500 text-xs mb-2">Academy Code</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 px-4 py-3 bg-black border border-cyan-400/30 rounded-lg">
                <div className="text-cyan-400 text-xl font-mono font-bold tracking-wider">{academy.code}</div>
              </div>
              <button onClick={() => { navigator.clipboard.writeText(academy.code); alert('Copied!'); }} className="px-4 py-3 bg-cyan-400 text-black rounded-lg font-medium">Copy</button>
            </div>
            <p className="text-gray-500 text-xs mt-2">Share with students so they can join</p>
          </div>

          {/* Coaches at Academy */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
            <h3 className="text-white font-light mb-3">Coaches ({academy.coaches.length})</h3>
            <div className="space-y-2">
              {academy.coaches.map(c => (
                <div key={c.id} className="flex items-center gap-3 p-3 bg-black rounded-lg border border-gray-800">
                  <div className="text-2xl">{c.emoji}</div>
                  <div className="flex-1">
                    <div className="text-white text-sm">{c.name}</div>
                    <div className="text-gray-500 text-xs">{c.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coach Chat - Internal */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
            <h3 className="text-white font-light mb-3 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              Coach Chat
            </h3>
            <p className="text-gray-500 text-xs mb-3">Private chat between academy coaches</p>
            <div className="bg-black rounded-xl border border-gray-800 h-72 flex flex-col">
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {coachChat.map(msg => (
                  <div key={msg.id} className={`flex gap-2 ${msg.user === (userSettings.username || 'Coach Mike') ? 'flex-row-reverse' : ''}`}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-sm flex-shrink-0">
                      {msg.emoji}
                    </div>
                    <div className={`max-w-[75%] ${msg.user === (userSettings.username || 'Coach Mike') ? 'text-right' : ''}`}>
                      <div className={`text-xs mb-0.5 ${msg.user === (userSettings.username || 'Coach Mike') ? 'text-cyan-400' : 'text-gray-500'}`}>{msg.user} · {msg.time}</div>
                      <div className={`inline-block px-3 py-2 rounded-2xl text-sm ${
                        msg.user === (userSettings.username || 'Coach Mike')
                          ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black'
                          : 'bg-gray-800 text-gray-300'
                      }`}>{msg.message}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-800 p-3 flex gap-2">
                <input
                  value={coachChatInput}
                  onChange={e => setCoachChatInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && coachChatInput.trim()) {
                      setCoachChat(prev => [...prev, { id: Date.now(), user: userSettings.username || 'Coach Mike', message: coachChatInput, time: new Date().toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'}), emoji: '👨‍🏫' }]);
                      setCoachChatInput('');
                    }
                  }}
                  placeholder="Message coaches..."
                  className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400"
                />
                <button onClick={() => {
                  if (coachChatInput.trim()) {
                    setCoachChat(prev => [...prev, { id: Date.now(), user: userSettings.username || 'Coach Mike', message: coachChatInput, time: new Date().toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'}), emoji: '👨‍🏫' }]);
                    setCoachChatInput('');
                  }
                }} className="px-3 py-2 bg-cyan-400 text-black rounded-lg"><Send className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          {/* Student Roster */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
            <h3 className="text-white font-light mb-3">Your Students ({students.length})</h3>
            {students.length === 0 ? (
              <div className="text-center py-6 text-gray-500 text-sm">No students connected yet</div>
            ) : (
              <div className="space-y-2">
                {students.map(s => (
                  <div key={s.id} className="flex items-center gap-3 p-3 bg-black rounded-lg border border-gray-800">
                    <div className="text-2xl">{s.emoji}</div>
                    <div className="flex-1">
                      <div className="text-white text-sm">{s.name}</div>
                      <div className="text-gray-500 text-xs">UTR: {s.currentUTR} · {s.matches || 0} matches</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    // Player/Parent Profile
    const totalWins = matches.filter(m => m.result === 'Win').length;
    const totalLosses = matches.filter(m => m.result === 'Loss').length;
    const totalMatches = matches.length;
    const winRate = totalMatches > 0 ? ((totalWins / totalMatches) * 100).toFixed(0) : 0;
    const totalHours = (practices.reduce((sum, p) => sum + (p.duration || 0), 0) / 60).toFixed(1);
    const currentUTR = parseFloat(playerInfo.currentUTR) || 3.52;
    const displayBadges = achievements.filter(a => userSettings.displayBadges.includes(a.id));
    const equippedBanner = banners.find(b => b.equipped);
    const rarityColors = { rare: 'text-blue-400 border-blue-400/30 bg-blue-400/5', epic: 'text-purple-400 border-purple-400/30 bg-purple-400/5', legendary: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5' };
    const [showBanners, setShowBanners] = useState(false);

    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-light text-white">Profile</h2>

        {/* Profile Card with Banner */}
        <div className="rounded-2xl border border-gray-800 overflow-hidden">
          {/* Banner */}
          <div className={`h-24 bg-gradient-to-r ${equippedBanner ? equippedBanner.gradient : 'from-gray-800 to-gray-900'} relative`}>
            {equippedBanner && (
              <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 bg-black/50 rounded-full backdrop-blur-sm">
                <span className="text-xs">{equippedBanner.icon}</span>
                <span className="text-xs text-white">{equippedBanner.name}</span>
              </div>
            )}
            <button onClick={() => setShowBanners(true)} className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 rounded-lg text-xs text-white hover:bg-black/70 backdrop-blur-sm transition-colors">Change Banner</button>
          </div>

          <div className="bg-gray-900 p-6 -mt-8 relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl bg-gray-900 rounded-full p-1 border-2 border-gray-800">{userSettings.profileEmoji}</div>
              <div>
                <div className="text-2xl font-light text-white">{playerInfo.name || userSettings.username || 'Player'}</div>
                <div className="text-gray-400 text-sm">{playerInfo.city}{playerInfo.city && playerInfo.state ? ', ' : ''}{playerInfo.state}</div>
                {playerInfo.ustaNumber && <div className="text-gray-500 text-xs mt-0.5">USTA #{playerInfo.ustaNumber}</div>}
              </div>
            </div>

            {/* Academy badge */}
            {academy.connected && (
              <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-cyan-400/5 rounded-lg border border-cyan-400/20">
                <span className="text-lg">{academy.emoji}</span>
                <div>
                  <div className="text-cyan-400 text-sm font-medium">{academy.name}</div>
                  <div className="text-gray-500 text-xs">{academy.location}</div>
                </div>
              </div>
            )}

            {/* Display badges */}
            {displayBadges.length > 0 && (
              <div className="flex gap-2 mb-4 flex-wrap">
                {displayBadges.map(badge => (
                  <div key={badge.id} className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 rounded-full border border-gray-700">
                    <span>{badge.icon}</span>
                    <span className="text-xs text-gray-300">{badge.title}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-3">
              <div className="text-center p-3 bg-black/40 rounded-xl">
                <div className="text-2xl font-light text-cyan-400">{currentUTR}</div>
                <div className="text-xs text-gray-500">UTR</div>
              </div>
              <div className="text-center p-3 bg-black/40 rounded-xl">
                <div className="text-2xl font-light text-green-400">{winRate}%</div>
                <div className="text-xs text-gray-500">Win Rate</div>
              </div>
              <div className="text-center p-3 bg-black/40 rounded-xl">
                <div className="text-2xl font-light text-blue-400">{totalHours}h</div>
                <div className="text-xs text-gray-500">Practice</div>
              </div>
              <div className="text-center p-3 bg-black/40 rounded-xl">
                <div className="text-2xl font-light text-orange-400">{practiceStreak}🔥</div>
                <div className="text-xs text-gray-500">Streak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Season Record */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <h3 className="text-white font-light mb-3">Season Record</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1f2937" strokeWidth="3" />
                <path d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray={`${winRate}, 100`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-lg font-light text-white">{winRate}%</div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between"><span className="text-gray-400 text-sm">Wins</span><span className="text-green-400">{totalWins}</span></div>
              <div className="flex justify-between"><span className="text-gray-400 text-sm">Losses</span><span className="text-red-400">{totalLosses}</span></div>
              <div className="flex justify-between"><span className="text-gray-400 text-sm">Total</span><span className="text-white">{totalMatches}</span></div>
            </div>
          </div>
        </div>

        {/* Banners Collection */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <h3 className="text-white font-light mb-3">Banners ({banners.filter(b => b.unlocked).length}/{banners.length})</h3>
          <div className="grid grid-cols-2 gap-2">
            {banners.map(b => (
              <div key={b.id} className={`relative rounded-xl overflow-hidden ${!b.unlocked ? 'opacity-40' : 'cursor-pointer'}`}
                onClick={() => { if (b.unlocked) { setBanners(prev => prev.map(bn => ({...bn, equipped: bn.id === b.id}))); } }}>
                <div className={`h-16 bg-gradient-to-r ${b.gradient} flex items-center justify-center`}>
                  <span className="text-2xl">{b.icon}</span>
                </div>
                <div className="bg-black/80 px-2 py-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white font-medium">{b.name}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded border ${rarityColors[b.rarity]}`}>{b.rarity}</span>
                  </div>
                  {b.unlocked ? (
                    <div className="text-xs text-green-400 mt-0.5">{b.equipped ? '✓ Equipped' : 'Tap to equip'}</div>
                  ) : (
                    <div className="mt-1">
                      <div className="text-xs text-gray-500">{b.requirement}</div>
                      {b.progress !== undefined && (
                        <div className="mt-1">
                          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-400 rounded-full" style={{width: `${(b.progress / b.goal) * 100}%`}} />
                          </div>
                          <div className="text-xs text-gray-600 mt-0.5">{b.progress}/{b.goal}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <h3 className="text-white font-light mb-3">Achievements ({achievements.filter(a => a.unlocked).length}/{achievements.length})</h3>
          <div className="flex flex-wrap gap-2">
            {achievements.filter(a => a.unlocked).map(a => (
              <div key={a.id} className="flex items-center gap-1.5 px-3 py-1.5 bg-black rounded-full border border-gray-700">
                <span>{a.icon}</span>
                <span className="text-xs text-gray-300">{a.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Banner Picker Modal */}
        {showBanners && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-y-auto">
            <div className="min-h-full flex items-start justify-center p-4 py-8">
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 max-w-lg w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-light text-white">Choose Banner</h3>
                  <button onClick={() => setShowBanners(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                </div>
                <div className="space-y-3">
                  <div className="rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-gray-600"
                    onClick={() => { setBanners(prev => prev.map(b => ({...b, equipped: false}))); setShowBanners(false); }}>
                    <div className="h-16 bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">No Banner</span>
                    </div>
                  </div>
                  {banners.filter(b => b.unlocked).map(b => (
                    <div key={b.id} className={`rounded-xl overflow-hidden cursor-pointer border-2 ${b.equipped ? 'border-cyan-400' : 'border-transparent hover:border-gray-600'}`}
                      onClick={() => { setBanners(prev => prev.map(bn => ({...bn, equipped: bn.id === b.id}))); setShowBanners(false); }}>
                      <div className={`h-16 bg-gradient-to-r ${b.gradient} flex items-center justify-between px-4`}>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{b.icon}</span>
                          <span className="text-white font-medium text-sm">{b.name}</span>
                        </div>
                        {b.equipped && <span className="text-white text-xs bg-black/40 px-2 py-0.5 rounded-full">Current</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Expense Tracker View (Parent)
  const ExpenseView = () => {
    const [showAddExpense, setShowAddExpense] = useState(false);
    const [newExpense, setNewExpense] = useState({ date: '', category: 'Lessons', description: '', amount: '' });
    const categories = ['Lessons', 'Tournament', 'Equipment', 'Travel', 'Membership', 'Other'];
    const categoryColors = { Lessons: 'text-blue-400', Tournament: 'text-purple-400', Equipment: 'text-cyan-400', Travel: 'text-yellow-400', Membership: 'text-green-400', Other: 'text-gray-400' };

    const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
    const byCategory = {};
    expenses.forEach(e => { byCategory[e.category] = (byCategory[e.category] || 0) + e.amount; });
    const topCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);

    // Monthly totals
    const monthlyTotals = {};
    expenses.forEach(e => {
      const d = new Date(e.date);
      const key = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      monthlyTotals[key] = (monthlyTotals[key] || 0) + e.amount;
    });

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-light text-white">Expense Tracker</h2>
          <button onClick={() => setShowAddExpense(true)} className="flex items-center gap-2 px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800 p-5">
            <div className="text-gray-400 text-sm">Total Spent</div>
            <div className="text-3xl font-light text-white mt-1">${totalSpent.toLocaleString()}</div>
            <div className="text-xs text-gray-500 mt-1">{expenses.length} transactions</div>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-800 p-5">
            <div className="text-gray-400 text-sm">Top Category</div>
            {topCategory.length > 0 && (
              <>
                <div className={`text-xl font-light mt-1 ${categoryColors[topCategory[0][0]] || 'text-white'}`}>{topCategory[0][0]}</div>
                <div className="text-xs text-gray-500 mt-1">${topCategory[0][1].toLocaleString()}</div>
              </>
            )}
          </div>
        </div>

        {/* Category breakdown */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <h3 className="text-white font-light mb-3">By Category</h3>
          <div className="space-y-2">
            {topCategory.map(([cat, amt]) => (
              <div key={cat} className="flex items-center gap-3">
                <div className={`w-20 text-sm ${categoryColors[cat] || 'text-gray-400'}`}>{cat}</div>
                <div className="flex-1 h-5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400/40 rounded-full" style={{ width: `${(amt / totalSpent) * 100}%` }} />
                </div>
                <div className="w-16 text-right text-sm text-gray-400">${amt}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction list */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <h3 className="text-white font-light mb-3">Recent Transactions</h3>
          <div className="space-y-2">
            {expenses.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).map(e => (
              <div key={e.id} className="flex items-center justify-between p-3 bg-black rounded-lg border border-gray-800">
                <div>
                  <div className="text-white text-sm">{e.description}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-xs ${categoryColors[e.category]}`}>{e.category}</span>
                    <span className="text-gray-600 text-xs">·</span>
                    <span className="text-gray-500 text-xs">{new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
                <div className="text-white font-light">${e.amount}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Add expense modal */}
        {showAddExpense && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-y-auto">
            <div className="min-h-full flex items-start justify-center p-4 py-8">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 max-w-md w-full">
              <h3 className="text-xl font-light text-white mb-4">Add Expense</h3>
              <div className="space-y-3">
                <input type="date" value={newExpense.date || new Date().toISOString().split('T')[0]} onChange={e => setNewExpense({...newExpense, date: e.target.value})} className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400" style={{ colorScheme: 'dark' }} />
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button key={cat} onClick={() => setNewExpense({...newExpense, category: cat})} className={`px-3 py-1.5 rounded-lg text-sm ${newExpense.category === cat ? 'bg-cyan-400 text-black' : 'bg-gray-800 text-gray-400'}`}>{cat}</button>
                  ))}
                </div>
                <input value={newExpense.description} onChange={e => setNewExpense({...newExpense, description: e.target.value})} placeholder="Description" className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400" />
                <input type="number" value={newExpense.amount} onChange={e => setNewExpense({...newExpense, amount: e.target.value})} placeholder="Amount ($)" className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400" />
                <div className="flex gap-2">
                  <button onClick={() => {
                    if (newExpense.description && newExpense.amount) {
                      setExpenses(prev => [...prev, { id: Date.now(), ...newExpense, date: newExpense.date || new Date().toISOString().split('T')[0], amount: Number(newExpense.amount) }]);
                      setNewExpense({ date: '', category: 'Lessons', description: '', amount: '' });
                      setShowAddExpense(false);
                    }
                  }} className="flex-1 py-3 bg-cyan-400 text-black rounded-lg font-medium">Save</button>
                  <button onClick={() => setShowAddExpense(false)} className="px-6 py-3 bg-gray-800 text-white rounded-lg">Cancel</button>
                </div>
              </div>
            </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Coach Drills View
  const DrillsView = () => {
    const [showAddDrill, setShowAddDrill] = useState(false);
    const [newDrill, setNewDrill] = useState({ title: '', description: '', focusArea: 'Serve', dueDate: '', assignedTo: [] });

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-light text-white">Drills & Homework</h2>
          <button onClick={() => setShowAddDrill(true)} className="flex items-center gap-2 px-4 py-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300">
            <Plus className="w-4 h-4" /> Assign Drill
          </button>
        </div>

        {/* Active drills */}
        <div className="space-y-3">
          {drills.map(drill => (
            <div key={drill.id} className="bg-gray-900 rounded-xl border border-gray-800 p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-white font-light text-lg">{drill.title}</div>
                  <span className="px-2 py-0.5 bg-cyan-400/10 text-cyan-400 text-xs rounded">{drill.focusArea}</span>
                </div>
                <div className={`px-2 py-1 rounded text-xs ${drill.status === 'active' ? 'bg-green-400/10 text-green-400' : 'bg-gray-800 text-gray-500'}`}>
                  {drill.status === 'active' ? 'Active' : 'Completed'}
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-3">{drill.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div>Assigned to: {drill.assignedTo.map(id => students.find(s => s.id === id)?.name || `Student ${id}`).join(', ')}</div>
                {drill.dueDate && <div>Due: {new Date(drill.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Add drill modal */}
        {showAddDrill && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-y-auto">
            <div className="min-h-full flex items-start justify-center p-4 py-8">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 max-w-md w-full">
              <h3 className="text-xl font-light text-white mb-4">Assign New Drill</h3>
              <div className="space-y-3">
                <input value={newDrill.title} onChange={e => setNewDrill({...newDrill, title: e.target.value})} placeholder="Drill title" className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400" />
                <textarea value={newDrill.description} onChange={e => setNewDrill({...newDrill, description: e.target.value})} placeholder="Instructions for the student" rows="3" className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 text-sm" />
                <div className="flex flex-wrap gap-2">
                  {focusAreaOptions.map(area => (
                    <button key={area} onClick={() => setNewDrill({...newDrill, focusArea: area})} className={`px-3 py-1.5 rounded-lg text-sm ${newDrill.focusArea === area ? 'bg-cyan-400 text-black' : 'bg-gray-800 text-gray-400'}`}>{area}</button>
                  ))}
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">Assign to:</label>
                  <div className="flex flex-wrap gap-2">
                    {students.map(s => (
                      <button key={s.id} onClick={() => {
                        const ids = newDrill.assignedTo.includes(s.id) ? newDrill.assignedTo.filter(i => i !== s.id) : [...newDrill.assignedTo, s.id];
                        setNewDrill({...newDrill, assignedTo: ids});
                      }} className={`px-3 py-1.5 rounded-lg text-sm ${newDrill.assignedTo.includes(s.id) ? 'bg-cyan-400 text-black' : 'bg-gray-800 text-gray-400'}`}>
                        {s.emoji} {s.name}
                      </button>
                    ))}
                  </div>
                </div>
                <input type="date" value={newDrill.dueDate} onChange={e => setNewDrill({...newDrill, dueDate: e.target.value})} className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400" style={{ colorScheme: 'dark' }} />
                <div className="flex gap-2">
                  <button onClick={() => {
                    if (newDrill.title) {
                      setDrills(prev => [...prev, { id: Date.now(), ...newDrill, status: 'active' }]);
                      setNewDrill({ title: '', description: '', focusArea: 'Serve', dueDate: '', assignedTo: [] });
                      setShowAddDrill(false);
                    }
                  }} className="flex-1 py-3 bg-cyan-400 text-black rounded-lg font-medium">Assign</button>
                  <button onClick={() => setShowAddDrill(false)} className="px-6 py-3 bg-gray-800 text-white rounded-lg">Cancel</button>
                </div>
              </div>
            </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Lesson Scheduler View
  const SchedulerView = () => {
    const [showAddSlot, setShowAddSlot] = useState(false);
    const [showScheduleSession, setShowScheduleSession] = useState(false);
    const [newSlot, setNewSlot] = useState({ day: 'Monday', from: '', to: '' });
    const [newSession, setNewSession] = useState({ studentId: '', date: '', time: '', duration: 60, notes: '' });
    const [schedTab, setSchedTab] = useState('sessions');
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    if (userRole === 'coach') {
      const upcomingLessons = bookedLessons.filter(l => new Date(l.date) >= new Date()).sort((a,b) => new Date(a.date) - new Date(b.date));
      const pastLessons = bookedLessons.filter(l => new Date(l.date) < new Date()).sort((a,b) => new Date(b.date) - new Date(a.date));

      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-light text-white">Schedule</h2>
            <div className="flex gap-2">
              <button onClick={() => setShowScheduleSession(true)} className="flex items-center gap-1 px-3 py-1.5 bg-cyan-400 text-black rounded-lg text-sm font-medium"><Plus className="w-4 h-4" /> Schedule Session</button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 p-1 bg-gray-900 rounded-lg border border-gray-800">
            <button onClick={() => setSchedTab('sessions')} className={`flex-1 py-2 rounded-lg text-sm transition-all ${schedTab === 'sessions' ? 'bg-cyan-400 text-black font-medium' : 'text-gray-400'}`}>Sessions</button>
            <button onClick={() => setSchedTab('availability')} className={`flex-1 py-2 rounded-lg text-sm transition-all ${schedTab === 'availability' ? 'bg-cyan-400 text-black font-medium' : 'text-gray-400'}`}>Availability</button>
          </div>

          {schedTab === 'sessions' && (
            <div className="space-y-4">
              {/* Upcoming */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
                <h3 className="font-light text-white mb-3">Upcoming Sessions ({upcomingLessons.length})</h3>
                {upcomingLessons.length === 0 ? (
                  <div className="text-center py-6 text-gray-500 text-sm">No upcoming sessions</div>
                ) : (
                  <div className="space-y-2">
                    {upcomingLessons.map(lesson => (
                      <div key={lesson.id} className="flex items-center justify-between p-3 bg-black rounded-lg border border-gray-800">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-8 bg-cyan-400 rounded-full" />
                          <div>
                            <div className="text-white text-sm">{lesson.student}</div>
                            <div className="text-gray-500 text-xs">{new Date(lesson.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {lesson.time} · {lesson.duration}min</div>
                            {lesson.notes && <div className="text-gray-600 text-xs mt-0.5">{lesson.notes}</div>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-xs ${lesson.status === 'confirmed' ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'}`}>{lesson.status}</span>
                          {lesson.status === 'pending' && (
                            <button onClick={() => setBookedLessons(prev => prev.map(l => l.id === lesson.id ? {...l, status: 'confirmed'} : l))} className="px-2 py-0.5 bg-green-400 text-black rounded text-xs">Confirm</button>
                          )}
                          <button onClick={() => setBookedLessons(prev => prev.filter(l => l.id !== lesson.id))} className="text-red-400 text-xs hover:text-red-300">✕</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Past */}
              {pastLessons.length > 0 && (
                <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
                  <h3 className="font-light text-gray-400 mb-3">Past Sessions</h3>
                  <div className="space-y-2">
                    {pastLessons.slice(0, 5).map(lesson => (
                      <div key={lesson.id} className="flex items-center justify-between p-3 bg-black rounded-lg border border-gray-800 opacity-60">
                        <div>
                          <div className="text-white text-sm">{lesson.student}</div>
                          <div className="text-gray-500 text-xs">{new Date(lesson.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {lesson.time}</div>
                        </div>
                        <span className="text-green-400 text-xs">Completed</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {schedTab === 'availability' && (
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-light text-white">Open Availability</h3>
                  <button onClick={() => setShowAddSlot(true)} className="flex items-center gap-1 px-3 py-1.5 bg-gray-800 text-cyan-400 rounded-lg text-sm"><Plus className="w-4 h-4" /> Add Slot</button>
                </div>
                <p className="text-gray-500 text-xs mb-3">Students can see these times and request sessions</p>
                <div className="space-y-2">
                  {coachSlots.length === 0 ? (
                    <div className="text-center py-6 text-gray-500 text-sm">No availability set</div>
                  ) : (
                    coachSlots.map(slot => (
                      <div key={slot.id} className="flex items-center justify-between p-3 bg-black rounded-lg border border-gray-800">
                        <div className="flex items-center gap-3">
                          <span className="text-cyan-400 font-medium text-sm w-24">{slot.day}</span>
                          <span className="text-gray-400 text-sm">{slot.from} - {slot.to}</span>
                        </div>
                        <button onClick={() => setCoachSlots(prev => prev.filter(s => s.id !== slot.id))} className="text-red-400 text-sm hover:text-red-300">Remove</button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Schedule Session Modal */}
          {showScheduleSession && (
            <div className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-y-auto">
              <div className="min-h-full flex items-start justify-center p-4 py-8">
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-light text-white">Schedule Session</h3>
                  <button onClick={() => setShowScheduleSession(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Student</label>
                    <select value={newSession.studentId} onChange={e => setNewSession({...newSession, studentId: e.target.value})} className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400">
                      <option value="">Select student</option>
                      {students.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Date</label>
                    <input type="date" value={newSession.date} onChange={e => setNewSession({...newSession, date: e.target.value})} className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 cursor-pointer" style={{ colorScheme: 'dark' }} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Time</label>
                      <select value={newSession.time} onChange={e => setNewSession({...newSession, time: e.target.value})} className="w-full px-3 py-3 bg-black border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400">
                        <option value="">Select time</option>
                        {practiceTimeOptions.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Duration</label>
                      <select value={newSession.duration} onChange={e => setNewSession({...newSession, duration: Number(e.target.value)})} className="w-full px-3 py-3 bg-black border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400">
                        <option value={30}>30 min</option>
                        <option value={45}>45 min</option>
                        <option value={60}>60 min</option>
                        <option value={90}>90 min</option>
                        <option value={120}>2 hours</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-1">Notes (optional)</label>
                    <input value={newSession.notes} onChange={e => setNewSession({...newSession, notes: e.target.value})} placeholder="Focus on serve today..." className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 text-sm" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => {
                      if (newSession.studentId && newSession.date && newSession.time) {
                        const student = students.find(s => s.id === Number(newSession.studentId));
                        setBookedLessons(prev => [...prev, {
                          id: Date.now(), student: student?.name || 'Student', date: newSession.date,
                          time: newSession.time, duration: newSession.duration, status: 'confirmed', notes: newSession.notes
                        }]);
                        setNewSession({ studentId: '', date: '', time: '', duration: 60, notes: '' });
                        setShowScheduleSession(false);
                      }
                    }} className="flex-1 py-3 bg-cyan-400 text-black rounded-lg font-medium">Schedule</button>
                    <button onClick={() => setShowScheduleSession(false)} className="px-6 py-3 bg-gray-800 text-white rounded-lg">Cancel</button>
                  </div>
                </div>
              </div>
              </div>
            </div>
          )}

          {/* Add Availability Modal */}
          {showAddSlot && (
            <div className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-y-auto">
              <div className="min-h-full flex items-start justify-center p-4 py-8">
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 max-w-md w-full">
                <h3 className="text-xl font-light text-white mb-4">Add Availability</h3>
                <div className="space-y-3">
                  <select value={newSlot.day} onChange={e => setNewSlot({...newSlot, day: e.target.value})} className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400">
                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <div className="grid grid-cols-2 gap-2">
                    <select value={newSlot.from} onChange={e => setNewSlot({...newSlot, from: e.target.value})} className="px-3 py-3 bg-black border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400">
                      <option value="">From</option>
                      {practiceTimeOptions.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                    <select value={newSlot.to} onChange={e => setNewSlot({...newSlot, to: e.target.value})} className="px-3 py-3 bg-black border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400">
                      <option value="">To</option>
                      {practiceTimeOptions.filter(t => !newSlot.from || t.value > newSlot.from).map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { if (newSlot.from && newSlot.to) { setCoachSlots(prev => [...prev, {id: Date.now(), ...newSlot}]); setNewSlot({day:'Monday',from:'',to:''}); setShowAddSlot(false); }}} className="flex-1 py-3 bg-cyan-400 text-black rounded-lg font-medium">Save</button>
                    <button onClick={() => setShowAddSlot(false)} className="px-6 py-3 bg-gray-800 text-white rounded-lg">Cancel</button>
                  </div>
                </div>
              </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Student/Parent view — see schedule & book
    const myLessons = bookedLessons.filter(l => l.student === (playerInfo.name || 'Student')).sort((a,b) => new Date(a.date) - new Date(b.date));
    const upcomingMine = myLessons.filter(l => new Date(l.date) >= new Date());
    const pastMine = myLessons.filter(l => new Date(l.date) < new Date());

    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-light text-white">My Schedule</h2>

        {/* Upcoming sessions */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <h3 className="font-light text-white mb-3">Upcoming Sessions ({upcomingMine.length})</h3>
          {upcomingMine.length === 0 ? (
            <div className="text-center py-6 text-gray-500 text-sm">No upcoming sessions</div>
          ) : (
            <div className="space-y-2">
              {upcomingMine.map(l => (
                <div key={l.id} className="flex items-center justify-between p-3 bg-black rounded-lg border border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-8 rounded-full ${l.status === 'confirmed' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                    <div>
                      <div className="text-white text-sm">{new Date(l.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</div>
                      <div className="text-gray-500 text-xs">{l.time} · {l.duration}min{l.coach ? ` · ${l.coach}` : ''}</div>
                      {l.notes && <div className="text-cyan-400 text-xs mt-0.5">{l.notes}</div>}
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs ${l.status === 'confirmed' ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'}`}>{l.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Academy availability - book a session */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
          <h3 className="font-light text-white mb-2">Academy Availability</h3>
          <p className="text-gray-500 text-xs mb-3">Tap to request a session</p>
          <div className="space-y-2">
            {coachSlots.length === 0 ? (
              <div className="text-center py-6 text-gray-500 text-sm">No availability set yet</div>
            ) : (
              coachSlots.map(slot => (
                <div key={slot.id} className="flex items-center justify-between p-3 bg-black rounded-lg border border-gray-800">
                  <div>
                    <span className="text-cyan-400 font-medium text-sm">{slot.day}</span>
                    <span className="text-gray-400 text-sm ml-2">{slot.from} - {slot.to}</span>
                  </div>
                  <button onClick={() => {
                    const nextDate = (() => { const d = new Date(); const dayIdx = days.indexOf(slot.day); const curr = d.getDay(); const diff = (dayIdx + 1 - curr + 7) % 7 || 7; d.setDate(d.getDate() + diff); return d.toISOString().split('T')[0]; })();
                    setBookedLessons(prev => [...prev, { id: Date.now(), student: playerInfo.name || 'Student', date: nextDate, time: slot.from, duration: 60, status: 'pending' }]);
                    alert('Session request sent to coach!');
                  }} className="px-3 py-1.5 bg-cyan-400 text-black rounded-lg text-sm font-medium">Request</button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Past sessions */}
        {pastMine.length > 0 && (
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-5">
            <h3 className="font-light text-gray-400 mb-3">Past Sessions</h3>
            <div className="space-y-2">
              {pastMine.slice(0, 5).map(l => (
                <div key={l.id} className="flex items-center justify-between p-3 bg-black rounded-lg border border-gray-800 opacity-60">
                  <div className="text-white text-sm">{new Date(l.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {l.time}</div>
                  <span className="text-green-400 text-xs">Completed</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Warmup/Cooldown View
  const WarmupView = () => {
    const [activeRoutine, setActiveRoutine] = useState(null);
    const [currentExercise, setCurrentExercise] = useState(0);
    const [routineTab, setRoutineTab] = useState('warmup');

    const filteredRoutines = warmupRoutines.filter(r => r.type === routineTab);

    if (activeRoutine) {
      const routine = warmupRoutines.find(r => r.id === activeRoutine);
      const exercise = routine.exercises[currentExercise];
      const progress = ((currentExercise + 1) / routine.exercises.length) * 100;

      return (
        <div className="space-y-4">
          <button onClick={() => { setActiveRoutine(null); setCurrentExercise(0); }} className="text-cyan-400 text-sm flex items-center gap-1">
            <ChevronRight className="w-4 h-4 rotate-180" /> Back
          </button>
          <div className="text-center">
            <h2 className={`text-2xl font-light ${theme.text}`}>{routine.name}</h2>
            <p className={`text-sm ${theme.textMuted} mt-1`}>Exercise {currentExercise + 1} of {routine.exercises.length}</p>
          </div>

          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-400 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>

          <div className={`${theme.card} rounded-2xl border ${theme.cardBorder} p-8 text-center`}>
            <div className="text-5xl mb-4">{routine.type === 'warmup' ? '🔥' : '❄️'}</div>
            <h3 className={`text-2xl font-light ${theme.text} mb-2`}>{exercise.name}</h3>
            <div className="text-cyan-400 text-lg">{exercise.duration}</div>
            {exercise.reps && <div className={`${theme.textMuted} text-sm mt-1`}>{exercise.reps} reps</div>}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setCurrentExercise(Math.max(0, currentExercise - 1))}
              disabled={currentExercise === 0}
              className={`flex-1 py-3 rounded-xl font-medium ${currentExercise === 0 ? 'bg-gray-800 text-gray-600' : `${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}`}
            >Previous</button>
            {currentExercise < routine.exercises.length - 1 ? (
              <button onClick={() => setCurrentExercise(currentExercise + 1)} className="flex-1 py-3 bg-cyan-400 text-black rounded-xl font-medium">Next</button>
            ) : (
              <button onClick={() => { setActiveRoutine(null); setCurrentExercise(0); alert('Routine complete! 🎉'); }} className="flex-1 py-3 bg-green-400 text-black rounded-xl font-medium">Done! 🎉</button>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <h2 className={`text-2xl font-light ${theme.text}`}>Warmup & Cooldown</h2>
        
        <div className={`flex gap-2 p-1 ${theme.card} rounded-lg border ${theme.cardBorder}`}>
          <button onClick={() => setRoutineTab('warmup')} className={`flex-1 py-2 rounded-lg text-sm transition-all ${routineTab === 'warmup' ? 'bg-cyan-400 text-black font-medium' : theme.textMuted}`}>🔥 Warmup</button>
          <button onClick={() => setRoutineTab('cooldown')} className={`flex-1 py-2 rounded-lg text-sm transition-all ${routineTab === 'cooldown' ? 'bg-cyan-400 text-black font-medium' : theme.textMuted}`}>❄️ Cooldown</button>
        </div>

        <div className="space-y-3">
          {filteredRoutines.map(routine => (
            <div key={routine.id} className={`${theme.card} rounded-xl border ${theme.cardBorder} p-5`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className={`font-light ${theme.text}`}>{routine.name}</h3>
                  <div className={`text-xs ${theme.textDim} mt-0.5`}>{routine.duration} min · {routine.exercises.length} exercises</div>
                </div>
                <button onClick={() => setActiveRoutine(routine.id)} className="flex items-center gap-1 px-4 py-2 bg-cyan-400 text-black rounded-lg text-sm font-medium">
                  <Zap className="w-4 h-4" /> Start
                </button>
              </div>
              <div className="flex flex-wrap gap-1">
                {routine.exercises.map((ex, i) => (
                  <span key={i} className={`px-2 py-1 ${darkMode ? 'bg-black' : 'bg-gray-100'} rounded text-xs ${theme.textMuted}`}>{ex.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Onboarding Component
  const OnboardingOverlay = () => {
    const steps = [
      { title: 'Welcome to TennisTracker! 🎾', desc: 'Your all-in-one tennis companion for tracking matches, practices, and progress.', icon: '🎾' },
      { title: 'Log Your Matches', desc: 'Record every match with set-by-set scores, notes, and opponent details. Track your win rate over time.', icon: '🏆' },
      { title: 'Track Practice Hours', desc: 'Log practice sessions with focus areas and time. Watch your monthly trends.', icon: '📊' },
      { title: 'Set Goals & Scout Opponents', desc: 'Set weekly and season goals. Keep scouting notes on opponents with strengths and weaknesses.', icon: '🎯' },
      { title: 'Connect with Your Coach', desc: 'Get feedback, assigned drills, and book lessons — all in one place.', icon: '👨‍🏫' },
    ];
    const step = steps[onboardingStep];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-[60] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-6">{step.icon}</div>
          <h2 className="text-2xl font-light text-white mb-3">{step.title}</h2>
          <p className="text-gray-400 mb-8 text-sm leading-relaxed">{step.desc}</p>
          
          {/* Dots */}
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === onboardingStep ? 'bg-cyan-400 w-6' : 'bg-gray-700'}`} />
            ))}
          </div>
          
          <div className="flex gap-3 justify-center">
            {onboardingStep < steps.length - 1 ? (
              <>
                <button onClick={() => setShowOnboarding(false)} className="px-6 py-2.5 text-gray-500 text-sm">Skip</button>
                <button onClick={() => setOnboardingStep(onboardingStep + 1)} className="px-8 py-2.5 bg-cyan-400 text-black rounded-xl font-medium">Next</button>
              </>
            ) : (
              <button onClick={() => setShowOnboarding(false)} className="px-8 py-2.5 bg-cyan-400 text-black rounded-xl font-medium">Get Started!</button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`h-screen ${theme.bg} ${theme.text} flex flex-col overflow-hidden`}>
      {/* Onboarding */}
      {showOnboarding && isLoggedIn && <OnboardingOverlay />}
      
      <Navigation />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto overflow-x-hidden pb-20 lg:pb-8">
          {activeView === 'dashboard' && <Dashboard />}
          {activeView === 'achievements' && <AchievementsView />}
          {activeView === 'calendar' && <CalendarView />}
          {activeView === 'matches' && <MatchRecords />}
          {activeView === 'notes' && <CoachNotes />}
          {activeView === 'chat' && <TeamChat />}
          {activeView === 'media' && <MediaView />}
          {activeView === 'students' && <StudentsView />}
          {activeView === 'notifications' && <NotificationsView />}
          {activeView === 'settings' && <SettingsView />}
          {activeView === 'journal' && <JournalView />}
          {activeView === 'goals' && <GoalsView />}
          {activeView === 'scouting' && <ScoutingView />}
          {activeView === 'profile' && <ProfileView />}
          {activeView === 'expenses' && <ExpenseView />}
          {activeView === 'drills' && <DrillsView />}
          {activeView === 'scheduler' && <SchedulerView />}
          {activeView === 'warmup' && <WarmupView />}
        </main>
      </div>

      {/* Bottom Nav (mobile only) */}
      <BottomNav />

      {/* Add Practice Modal */}
      {showAddPractice && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-y-auto">
          <div className="min-h-full flex items-start justify-center p-4 py-8">
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 max-w-xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-light text-white">Log Practice Session</h3>
              <button onClick={() => setShowAddPractice(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Date */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Date</label>
                <input
                  type="date"
                  value={newPractice.date || new Date().toISOString().split('T')[0]}
                  onChange={(e) => setNewPractice({...newPractice, date: e.target.value})}
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                  style={{ colorScheme: 'dark' }}
                />
              </div>

              {/* From / To Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">From</label>
                  <select
                    value={newPractice.fromTime}
                    onChange={(e) => {
                      const from = e.target.value;
                      let to = newPractice.toTime;
                      if (!to && from) {
                        const [h, m] = from.split(':').map(Number);
                        const newH = Math.min(h + 1, 21);
                        to = `${String(newH).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
                      }
                      setNewPractice({...newPractice, fromTime: from, toTime: to});
                    }}
                    className="w-full px-3 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 text-sm"
                  >
                    <option value="">Start time</option>
                    {practiceTimeOptions.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">To</label>
                  <select
                    value={newPractice.toTime}
                    onChange={(e) => setNewPractice({...newPractice, toTime: e.target.value})}
                    className="w-full px-3 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 text-sm"
                  >
                    <option value="">End time</option>
                    {practiceTimeOptions
                      .filter(t => !newPractice.fromTime || t.value > newPractice.fromTime)
                      .map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Duration display */}
              {newPractice.fromTime && newPractice.toTime && (() => {
                const [fh, fm] = newPractice.fromTime.split(':').map(Number);
                const [th, tm] = newPractice.toTime.split(':').map(Number);
                const mins = (th * 60 + tm) - (fh * 60 + fm);
                if (mins > 0) {
                  const hrs = Math.floor(mins / 60);
                  const remMins = mins % 60;
                  return (
                    <div className="p-3 bg-cyan-400/10 border border-cyan-400/20 rounded-lg">
                      <span className="text-cyan-400 text-sm">
                        ⏱ Duration: {hrs > 0 ? `${hrs}h ` : ''}{remMins > 0 ? `${remMins}min` : ''}
                      </span>
                    </div>
                  );
                }
                return null;
              })()}

              {/* Focus Areas */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">What did you work on?</label>
                <div className="flex flex-wrap gap-2">
                  {focusAreaOptions.map(area => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => {
                        const areas = newPractice.focusAreas.includes(area)
                          ? newPractice.focusAreas.filter(a => a !== area)
                          : [...newPractice.focusAreas, area];
                        setNewPractice({...newPractice, focusAreas: areas});
                      }}
                      className={`px-3 py-2 rounded-lg text-sm transition-all ${
                        newPractice.focusAreas.includes(area)
                          ? 'bg-cyan-400 text-black font-medium'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Notes</label>
                <textarea
                  value={newPractice.notes}
                  onChange={(e) => setNewPractice({...newPractice, notes: e.target.value})}
                  placeholder="What went well? What to improve?"
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  rows="3"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleAddPractice}
                  className="flex-1 py-3 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors font-medium"
                >
                  Save Practice
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddPractice(false)}
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
      )}

      {/* Add Match Modal */}
      {showAddMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-y-auto">
          <div className="min-h-full flex items-start justify-center p-4 py-8">
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-light text-white">Log New Match</h3>
              <button onClick={() => setShowAddMatch(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Date</label>
                  <input
                    type="date"
                    value={newMatch.date || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setNewMatch({...newMatch, date: e.target.value})}
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Opponent</label>
                  <input
                    type="text"
                    value={newMatch.opponent}
                    onChange={(e) => setNewMatch({...newMatch, opponent: e.target.value})}
                    placeholder="Opponent name"
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Result</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setNewMatch({...newMatch, result: 'Win'})}
                    className={`flex-1 py-2 rounded-lg ${newMatch.result === 'Win' ? 'bg-green-400 text-black' : 'bg-gray-800 text-gray-400'}`}
                  >
                    Win
                  </button>
                  <button
                    onClick={() => setNewMatch({...newMatch, result: 'Loss'})}
                    className={`flex-1 py-2 rounded-lg ${newMatch.result === 'Loss' ? 'bg-red-400 text-black' : 'bg-gray-800 text-gray-400'}`}
                  >
                    Loss
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-gray-400 text-sm">Set Scores</label>
                  <button onClick={addSet} className="text-cyan-400 text-sm hover:text-cyan-300">+ Add Set</button>
                </div>
                {newMatch.sets.map((set, idx) => (
                  <div key={idx} className="mb-4 p-4 bg-black rounded-lg border border-gray-800">
                    <div className="text-white mb-2">Set {set.set}</div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-gray-500 text-xs mb-1">My Score</label>
                        <input
                          type="number"
                          value={set.myScore}
                          onChange={(e) => {
                            const newSets = [...newMatch.sets];
                            newSets[idx].myScore = e.target.value;
                            setNewMatch({...newMatch, sets: newSets});
                          }}
                          className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-500 text-xs mb-1">Opponent Score</label>
                        <input
                          type="number"
                          value={set.opponentScore}
                          onChange={(e) => {
                            const newSets = [...newMatch.sets];
                            newSets[idx].opponentScore = e.target.value;
                            setNewMatch({...newMatch, sets: newSets});
                          }}
                          className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-500 text-xs mb-1">Set Notes</label>
                      <textarea
                        value={set.notes}
                        onChange={(e) => {
                          const newSets = [...newMatch.sets];
                          newSets[idx].notes = e.target.value;
                          setNewMatch({...newMatch, sets: newSets});
                        }}
                        placeholder="What happened in this set?"
                        className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 text-sm"
                        rows="2"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Overall Match Notes</label>
                <textarea
                  value={newMatch.overallNotes}
                  onChange={(e) => setNewMatch({...newMatch, overallNotes: e.target.value})}
                  placeholder="How did you feel? What did you learn?"
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                  rows="3"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddMatch}
                  className="flex-1 py-3 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors font-medium"
                >
                  Save Match
                </button>
                <button
                  onClick={() => setShowAddMatch(false)}
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
      )}

      {/* Whiteboard Modal - only render when showing */}
      {showWhiteboard && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto">
          <div className="min-h-full flex items-start justify-center p-4 py-8">
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 max-w-6xl w-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-light text-white">📋 Coaching Whiteboard</h3>
              <button 
                type="button"
                onClick={() => setShowWhiteboard(false)} 
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg mb-2">🎨 Whiteboard feature coming soon!</p>
              <p className="text-sm">Draw diagrams, strategies, and technique illustrations</p>
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default TennisApp;