import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USER,
  INITIAL_ROUTINES,
  INITIAL_HYDRATION_LOGS,
  INITIAL_HYDRATION_WEEK,
  INITIAL_SLEEP_RECORDS,
  INITIAL_MEAL_CHECKINS,
  INITIAL_BUDDIES,
  WEEKLY_ANALYTICS,
} from './defaultData';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  USER: 'recharge_user',
  ROUTINES: 'recharge_routines',
  HYDRATION_LOGS: 'recharge_hydration_logs',
  HYDRATION_TARGET: 'recharge_hydration_target',
  HYDRATION_WEEK: 'recharge_hydration_week',
  SLEEP_RECORDS: 'recharge_sleep_records',
  MEALS: 'recharge_meals',
  BUDDIES: 'recharge_buddies',
  AUTH: 'recharge_auth_status',
  ONBOARDING: 'recharge_onboarding_status',
};

export const AppProvider = ({ children }) => {
  // Authentication & Onboarding
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
    return saved !== null ? JSON.parse(saved) : true; // default true for seamless prototype demonstration
  });

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ONBOARDING);
    return saved !== null ? JSON.parse(saved) : true;
  });

  // User Profile & Preferences
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  // Daily Routines
  const [routines, setRoutines] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROUTINES);
    return saved ? JSON.parse(saved) : INITIAL_ROUTINES;
  });

  // Hydration
  const [hydrationLogs, setHydrationLogs] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HYDRATION_LOGS);
    return saved ? JSON.parse(saved) : INITIAL_HYDRATION_LOGS;
  });

  const [hydrationTarget, setHydrationTarget] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HYDRATION_TARGET);
    return saved ? JSON.parse(saved) : 2500;
  });

  const [hydrationWeek, setHydrationWeek] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HYDRATION_WEEK);
    return saved ? JSON.parse(saved) : INITIAL_HYDRATION_WEEK;
  });

  // Sleep
  const [sleepRecords, setSleepRecords] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SLEEP_RECORDS);
    return saved ? JSON.parse(saved) : INITIAL_SLEEP_RECORDS;
  });

  // Meal Check-ins
  const [mealCheckins, setMealCheckins] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MEALS);
    return saved ? JSON.parse(saved) : INITIAL_MEAL_CHECKINS;
  });

  // Study Buddies
  const [buddies, setBuddies] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BUDDIES);
    return saved ? JSON.parse(saved) : INITIAL_BUDDIES;
  });

  // Notifications & Toasts
  const [toasts, setToasts] = useState([]);
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Hydration Sprint',
      message: 'You are 1,000ml away from your exam prep target today!',
      time: '15m ago',
      read: false,
      type: 'hydration',
    },
    {
      id: 'notif-2',
      title: 'Peer Encouragement',
      message: 'Ananya Verma sent you a Study Cheer ⚡',
      time: '1 hour ago',
      read: false,
      type: 'buddy',
    },
    {
      id: 'notif-3',
      title: 'Upcoming Exam Milestone',
      message: 'INT335 Design Thinking exam in 4 days. Keep up your steady routine!',
      time: '3 hours ago',
      read: true,
      type: 'exam',
    },
  ]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING, JSON.stringify(hasCompletedOnboarding));
  }, [hasCompletedOnboarding]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROUTINES, JSON.stringify(routines));
  }, [routines]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HYDRATION_LOGS, JSON.stringify(hydrationLogs));
  }, [hydrationLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HYDRATION_TARGET, JSON.stringify(hydrationTarget));
  }, [hydrationTarget]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HYDRATION_WEEK, JSON.stringify(hydrationWeek));
  }, [hydrationWeek]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SLEEP_RECORDS, JSON.stringify(sleepRecords));
  }, [sleepRecords]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(mealCheckins));
  }, [mealCheckins]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BUDDIES, JSON.stringify(buddies));
  }, [buddies]);

  // Toast helper
  const showToast = (title, message = '', type = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth Handlers
  const login = (email, password) => {
    setIsAuthenticated(true);
    showToast('Welcome Back!', 'Successfully signed into RECHARGE demo.', 'success');
    return true;
  };

  const demoLogin = () => {
    setIsAuthenticated(true);
    setUser(INITIAL_USER);
    showToast('Demo Access Granted', 'Exploring RECHARGE as Rohan Sharma (INT335).', 'success');
  };

  const signup = (name, email, password) => {
    setIsAuthenticated(true);
    setUser((prev) => ({
      ...prev,
      name: name || 'Student User',
      email: email || 'student@university.edu',
    }));
    setHasCompletedOnboarding(false);
    showToast('Account Created', 'Welcome to RECHARGE! Let us configure your exam routine.', 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('Logged Out', 'You have exited the session.', 'info');
  };

  const completeOnboarding = (onboardingData) => {
    setUser((prev) => ({
      ...prev,
      name: onboardingData.name || prev.name,
      university: onboardingData.university || prev.university,
      program: onboardingData.program || prev.program,
      examStartDate: onboardingData.examStartDate || prev.examStartDate,
      examEndDate: onboardingData.examEndDate || prev.examEndDate,
      subjects: onboardingData.subjects || prev.subjects,
      preferences: {
        ...prev.preferences,
        targetWakeUp: onboardingData.wakeUpTime || prev.preferences.targetWakeUp,
        targetBedtime: onboardingData.bedtime || prev.preferences.targetBedtime,
        dailyStudyHours: onboardingData.studyHours || prev.preferences.dailyStudyHours,
        hydrationTarget: onboardingData.hydrationTarget || prev.preferences.hydrationTarget,
      },
    }));
    setHasCompletedOnboarding(true);
    showToast('Routine Ready', 'Your exam week companion is all set!', 'success');
  };

  // Routine Handlers
  const toggleRoutine = (id) => {
    setRoutines((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          const nextCompleted = !item.completed;
          if (nextCompleted) {
            showToast('Activity Completed', `Great job on: ${item.title}!`, 'success');
          }
          return { ...item, completed: nextCompleted };
        }
        return item;
      });
      return updated;
    });
  };

  const addRoutine = (newActivity) => {
    const item = {
      id: 'rt-' + Date.now(),
      completed: false,
      ...newActivity,
    };
    setRoutines((prev) => [...prev, item]);
    showToast('Routine Added', `"${newActivity.title}" added to today's schedule.`);
  };

  const editRoutine = (id, updatedFields) => {
    setRoutines((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
    showToast('Routine Updated', 'Schedule item changes saved.');
  };

  const deleteRoutine = (id) => {
    setRoutines((prev) => prev.filter((item) => item.id !== id));
    showToast('Routine Removed', 'Item removed from schedule.', 'info');
  };

  // Hydration Handlers
  const currentWaterIntake = hydrationLogs.reduce((sum, item) => sum + item.amount, 0);

  const addWater = (amount, label = 'Quick Log') => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const newLog = {
      id: 'hy-' + Date.now(),
      time: `${hours}:${mins}`,
      amount: Number(amount),
      label,
    };
    setHydrationLogs((prev) => [newLog, ...prev]);

    // Update today's entry in hydrationWeek
    setHydrationWeek((prev) =>
      prev.map((d) => {
        if (d.day === 'Today') {
          const newIntake = d.intake + Number(amount);
          return {
            ...d,
            intake: newIntake,
            percentage: Math.min(Math.round((newIntake / d.target) * 100), 100),
          };
        }
        return d;
      })
    );

    showToast('Hydration Logged', `+${amount}ml recorded! Brain power restored.`, 'hydration');
  };

  const removeWaterLog = (id) => {
    const logToRemove = hydrationLogs.find((l) => l.id === id);
    if (!logToRemove) return;
    setHydrationLogs((prev) => prev.filter((l) => l.id !== id));

    // deduct from today
    setHydrationWeek((prev) =>
      prev.map((d) => {
        if (d.day === 'Today') {
          const newIntake = Math.max(0, d.intake - logToRemove.amount);
          return {
            ...d,
            intake: newIntake,
            percentage: Math.min(Math.round((newIntake / d.target) * 100), 100),
          };
        }
        return d;
      })
    );
    showToast('Water Log Removed', `-${logToRemove.amount}ml entry removed.`, 'info');
  };

  const updateHydrationTarget = (newTarget) => {
    const targetVal = Number(newTarget);
    setHydrationTarget(targetVal);
    setUser((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, hydrationTarget: targetVal },
    }));
    setHydrationWeek((prev) =>
      prev.map((d) => (d.day === 'Today' ? { ...d, target: targetVal } : d))
    );
    showToast('Target Updated', `Daily water goal set to ${targetVal}ml.`);
  };

  // Sleep Handlers
  const addSleepRecord = (record) => {
    const newRecord = {
      id: 'sl-' + Date.now(),
      ...record,
    };
    setSleepRecords((prev) => [newRecord, ...prev]);
    showToast('Sleep Recorded', `${record.durationHours} hours logged for ${record.day || 'today'}.`, 'success');
  };

  // Meal Handlers
  const toggleMealCheckin = (mealKey, customNotes = '') => {
    setMealCheckins((prev) => {
      const current = prev[mealKey];
      const nextChecked = !current.checked;
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const updated = {
        ...prev,
        [mealKey]: {
          checked: nextChecked,
          time: nextChecked ? timeStr : null,
          notes: customNotes || current.notes || (nextChecked ? 'Checked in on time' : ''),
        },
      };

      if (nextChecked) {
        showToast('Meal Checked In', `Recorded ${mealKey.toUpperCase()}! Eating well powers memory.`, 'success');
      } else {
        showToast('Meal Unchecked', `Cleared ${mealKey} check-in.`, 'info');
      }
      return updated;
    });
  };

  // Buddy Handlers
  const toggleConnectBuddy = (buddyId) => {
    setBuddies((prev) =>
      prev.map((b) => {
        if (b.id === buddyId) {
          const nextState = !b.connected;
          showToast(
            nextState ? 'Connected with Buddy!' : 'Buddy Disconnected',
            nextState
              ? `You are now supporting ${b.name} through exam week.`
              : `Removed ${b.name} from your study circle.`,
            nextState ? 'success' : 'info'
          );
          return { ...b, connected: nextState };
        }
        return b;
      })
    );
  };

  const sendEncouragement = (buddyId, emoji = '⚡', message = 'Keep going!') => {
    setBuddies((prev) =>
      prev.map((b) => {
        if (b.id === buddyId) {
          return {
            ...b,
            encouragementCount: (b.encouragementCount || 0) + 1,
          };
        }
        return b;
      })
    );
    showToast('Cheer Sent!', `${emoji} Sent to study buddy!`, 'success');
  };

  // User Settings Update
  const updateUserSettings = (updatedUser) => {
    setUser(updatedUser);
    if (updatedUser.preferences?.hydrationTarget) {
      setHydrationTarget(updatedUser.preferences.hydrationTarget);
    }
    showToast('Settings Saved', 'Your preferences have been updated locally.');
  };

  // Reset Everything to Initial Mock Data
  const resetDemoData = () => {
    localStorage.clear();
    setUser(INITIAL_USER);
    setRoutines(INITIAL_ROUTINES);
    setHydrationLogs(INITIAL_HYDRATION_LOGS);
    setHydrationTarget(2500);
    setHydrationWeek(INITIAL_HYDRATION_WEEK);
    setSleepRecords(INITIAL_SLEEP_RECORDS);
    setMealCheckins(INITIAL_MEAL_CHECKINS);
    setBuddies(INITIAL_BUDDIES);
    setIsAuthenticated(true);
    setHasCompletedOnboarding(true);
    showToast('Demo Data Reset', 'All states have been restored to initial sample data.', 'info');
  };

  // Derived Metrics for quick dashboard access
  const totalRoutines = routines.length;
  const completedRoutines = routines.filter((r) => r.completed).length;
  const routineCompletionPercentage =
    totalRoutines > 0 ? Math.round((completedRoutines / totalRoutines) * 100) : 0;

  const latestSleep = sleepRecords[sleepRecords.length - 1] || sleepRecords[0];
  const averageSleep =
    sleepRecords.length > 0
      ? (
          sleepRecords.reduce((acc, curr) => acc + curr.durationHours, 0) /
          sleepRecords.length
        ).toFixed(1)
      : '7.5';

  const mealsCheckedCount = Object.values(mealCheckins).filter((m) => m.checked).length;
  const studyBreaksCompleted = routines.filter(
    (r) => (r.category === 'Break' || r.category === 'Hydration') && r.completed
  ).length;

  return (
    <AppContext.Provider
      value={{
        // Auth & Onboarding
        isAuthenticated,
        hasCompletedOnboarding,
        login,
        demoLogin,
        signup,
        logout,
        completeOnboarding,

        // User
        user,
        updateUserSettings,

        // Routines
        routines,
        toggleRoutine,
        addRoutine,
        editRoutine,
        deleteRoutine,
        totalRoutines,
        completedRoutines,
        routineCompletionPercentage,

        // Hydration
        hydrationLogs,
        currentWaterIntake,
        hydrationTarget,
        hydrationWeek,
        addWater,
        removeWaterLog,
        updateHydrationTarget,

        // Sleep
        sleepRecords,
        latestSleep,
        averageSleep,
        addSleepRecord,

        // Meals
        mealCheckins,
        mealsCheckedCount,
        toggleMealCheckin,

        // Study Breaks
        studyBreaksCompleted,

        // Buddies
        buddies,
        toggleConnectBuddy,
        sendEncouragement,

        // Analytics
        weeklyAnalytics: WEEKLY_ANALYTICS,

        // UI Feedback & Reset
        toasts,
        showToast,
        removeToast,
        notifications,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

